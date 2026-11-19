import sharp from 'sharp'
import { mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { join, extname, basename, relative } from 'node:path'

const PUBLIC_DIR = './public'
const OUTPUT_DIR = join(PUBLIC_DIR, 'images')
const CACHE_FILE = 'node_modules/.cache/optimize-images.json'
const MANIFEST_FILE = 'app/generated/images.ts'
const MANIFEST_DIR = 'app/generated'

// Output widths in pixels. Sources narrower than a width are not upscaled.
const WIDTHS = [400, 800, 1200, 1600]
const FORMATS = ['webp', 'avif']
const QUALITY = { webp: 82, avif: 55 }
const RAW_EXTENSIONS = ['.png', '.jpg', '.jpeg']

// Files that must keep their exact name or path (icons, manifest, social preview).
const SKIP_PATTERNS = [/^favicon\./, /^apple-touch-icon\./, /^web-app-manifest-/, /^og-image\./, /^favicon-\d+/]

// Bump when the options above change so cached results are regenerated.
const CACHE_VERSION = 2

const toUrl = (path) => `/${relative(PUBLIC_DIR, path).split('\\').join('/')}`

const isRawImage = (file) =>
  RAW_EXTENSIONS.includes(extname(file).toLowerCase()) && !SKIP_PATTERNS.some((p) => p.test(file))

const listRawImages = async () => {
  const entries = await readdir(PUBLIC_DIR, { withFileTypes: true }).catch(() => [])

  return entries
    .filter((entry) => entry.isFile() && isRawImage(entry.name))
    .map((entry) => entry.name)
    .sort()
}

const readCache = async () => {
  try {
    return JSON.parse(await readFile(CACHE_FILE, 'utf8'))
  } catch {
    return {}
  }
}

const writeCache = async (cache) => {
  await mkdir(join(CACHE_FILE, '..'), { recursive: true })
  await writeFile(CACHE_FILE, JSON.stringify(cache, null, 2))
}

const sourceStamp = async (file) => {
  const stats = await stat(join(PUBLIC_DIR, file))

  return `${stats.size}:${stats.mtimeMs}`
}

/** Widths a source produced in the previous run, including its own width. */
const cachedWidths = (entry) => Object.values(entry?.variants ?? {}).flatMap((list) => list.map((v) => v.width))

const variantPath = (file, width, format) => join(OUTPUT_DIR, `${basename(file, extname(file))}-${width}.${format}`)

const widthsFor = (file, extra = []) => [...new Set([...WIDTHS, ...extra])]

const variantPaths = (file, extra = []) =>
  FORMATS.flatMap((format) => widthsFor(file, extra).map((width) => variantPath(file, width, format)))

const fileExists = (path) => stat(path).then(() => true, () => false)

/** Resize one source into every configured format and width. */
const generateVariants = async (file) => {
  const inputPath = join(PUBLIC_DIR, file)
  const { width: sourceWidth } = await sharp(inputPath).metadata()

  const widths = [...WIDTHS.filter((width) => width < sourceWidth), sourceWidth]
  const variants = {}

  for (const format of FORMATS) {
    variants[format] = []

    for (const width of widths) {
      const output = variantPath(file, width, format)
      const info = await sharp(inputPath)
        .resize({ width, withoutEnlargement: true })
        .toFormat(format, { quality: QUALITY[format] })
        .toFile(output)

      variants[format].push({ url: toUrl(output), width: info.width, height: info.height, bytes: info.size })
    }
  }

  return variants
}

/**
 * Reshape variants into what a template needs. `src` is the largest WebP so a
 * plain <img> still looks right when srcset is ignored.
 */
const toManifestEntry = (variants) => {
  const webp = variants.webp
  const largest = webp[webp.length - 1]

  // AVIF first, then WebP: browsers pick the first format they support.
  const preferred = ['avif', 'webp']
  const srcset = preferred.flatMap((format) => variants[format].map((v) => `${v.url} ${v.width}w`)).join(', ')

  return {
    src: largest.url,
    width: largest.width,
    height: largest.height,
    srcset: webp.length > 1 ? srcset : undefined,
    sizes: webp.length > 1 ? '(min-width: 1024px) 640px, 100vw' : undefined,
  }
}

/**
 * True when the cached entry is current and every file it produced still
 * exists. Only produced widths are checked: small sources skip larger widths.
 */
const canReuse = async (file, entry, stamp) => {
  if (!entry || entry.version !== CACHE_VERSION || entry.stamp !== stamp) return false

  const produced = cachedWidths(entry)
  const paths = FORMATS.flatMap((format) => produced.map((width) => variantPath(file, width, format)))
  const checks = await Promise.all(paths.map(fileExists))

  return checks.every(Boolean)
}

/** Remove files in public/images that do not belong to a current source. */
const sweepOrphans = async (sources, cache) => {
  const entries = await readdir(OUTPUT_DIR, { withFileTypes: true }).catch(() => [])
  const known = [...sources, ...Object.keys(cache)]
  const tracked = new Set(
    known.flatMap((file) => variantPaths(file, cachedWidths(cache[file])).map((path) => basename(path)))
  )

  for (const entry of entries) {
    if (!entry.isFile() || tracked.has(entry.name)) continue

    await rm(join(OUTPUT_DIR, entry.name), { force: true })
    console.log(`🗑️  removed untracked variant ${entry.name}`)
  }
}

/**
 * Emit the manifest consumed by app/components/OptimizedImg.vue. Everything is
 * pre-generated at build time because Cloudflare Workers cannot run sharp/ipx.
 */
const renderManifest = (manifest) => {
  return `// Generated by scripts/optimize-images.mjs — do not edit by hand.
export interface OptimizedImage {
  src: string
  width?: number
  height?: number
  srcset?: string
  sizes?: string
}

export const optimizedImages: Record<string, OptimizedImage> = ${JSON.stringify(manifest, null, 2)}
`
}

async function main() {
  const force = process.argv.includes('--force')
  const sources = await listRawImages()
  const cache = await readCache()
  const manifest = {}
  const processed = new Set()
  const failed = []

  if (sources.length) {
    await mkdir(OUTPUT_DIR, { recursive: true })
  }

  for (const file of sources) {
    const cached = cache[file]
    const stamp = await sourceStamp(file)
    const reuse = !force && (await canReuse(file, cached, stamp))

    processed.add(file)

    if (reuse) {
      manifest[file] = cached.entry
      console.log(`⏭️  ${file} (unchanged)`)

      continue
    }

    try {
      const variants = await generateVariants(file)
      const size = (await stat(join(PUBLIC_DIR, file))).size
      const summary = Object.entries(variants)
        .map(([format, list]) => `${format} ×${list.length}, max ${Math.round(list[list.length - 1].bytes / 1024)} KB`)
        .join(' · ')

      console.log(`✅ ${file} (${Math.round(size / 1024)} KB) → ${summary}`)

      manifest[file] = toManifestEntry(variants)
      cache[file] = { version: CACHE_VERSION, stamp, entry: manifest[file], variants }
    } catch (err) {
      console.error(`❌ ${file}: ${err.message}`)
      delete cache[file]
      failed.push(file)
    }
  }

  // Forget cache entries for sources that no longer exist.
  for (const file of Object.keys(cache)) {
    if (processed.has(file)) continue

    delete cache[file]
    console.log(`🗑️  removed stale entry for ${file}`)
  }

  await sweepOrphans(sources, cache)
  await writeCache(cache)

  await mkdir(MANIFEST_DIR, { recursive: true })
  await writeFile(MANIFEST_FILE, renderManifest(manifest))

  if (failed.length) {
    throw new Error(`Failed to optimize: ${failed.join(', ')}`)
  }

  console.log(`\n✨ ${Object.keys(manifest).length} image(s) ready, manifest written to ${MANIFEST_FILE}`)
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exitCode = 1
})
