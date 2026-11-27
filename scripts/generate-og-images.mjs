import sharp from 'sharp'
import { mkdir, rm } from 'node:fs/promises'
import { join } from 'node:path'

const OUTPUT_DIR = './public/og'
const AVATAR_PATH = './public/avatar-with-bg.webp'
const WIDTH = 1200
const HEIGHT = 630

const PAGES = [
  {
    slug: 'index',
    path: '/',
    eyebrow: 'NETWORK ENGINEER · YOGYAKARTA',
    title: 'Rizky Fauzan Hanif',
    description: 'MikroTik RouterOS, IPv6, network security, and reliable infrastructure.',
  },
  {
    slug: 'about',
    path: '/about',
    eyebrow: 'ABOUT ME',
    title: 'Network, Cloud & Security',
    description: 'Building reliable, maintainable, and scalable networks from Yogyakarta, Indonesia.',
  },
  {
    slug: 'achievements',
    path: '/achievements',
    eyebrow: 'ACHIEVEMENTS',
    title: 'Competitions & Milestones',
    description: 'MikroTik Networking Olympiad Winner, LKS ITNSA, and LKS Cloud Computing.',
  },
  {
    slug: 'certificates',
    path: '/certificates',
    eyebrow: 'CERTIFICATIONS',
    title: 'MTCNA, MTCTCE & IPv6 Sage',
    description: 'Verified credentials in MikroTik networking, IPv6, cybersecurity, and cloud.',
  },
  {
    slug: 'contact',
    path: '/contact',
    eyebrow: 'CONTACT',
    title: 'Get in Touch',
    description: 'Available via email, LinkedIn, X, Instagram, Telegram, and Discord.',
  },
  {
    slug: 'guestbook',
    path: '/guestbook',
    eyebrow: 'GUESTBOOK',
    title: 'Leave a Message',
    description: 'Sign in with Google, GitHub, or Discord to share your thoughts.',
  },
  {
    slug: 'resume',
    path: '/resume',
    eyebrow: 'RESUME',
    title: 'Curriculum Vitae',
    description: 'Experience, skills, education, projects, and verified certifications (EN / ID).',
  },
  {
    slug: 'credits',
    path: '/credits',
    eyebrow: 'CREDITS',
    title: 'Acknowledgements',
    description: 'Design inspiration, open-source software, fonts, icons, and services.',
  },
]

const escapeXml = (str) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

const wrapText = (text, maxChars) => {
  const words = text.split(/\s+/)
  const lines = []
  let current = ''

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word
    if (candidate.length > maxChars && current) {
      lines.push(current)
      current = word
    } else {
      current = candidate
    }
  }
  if (current) lines.push(current)
  return lines
}

const buildCardSvg = ({ path, eyebrow, title, description }) => {
  const titleLines = wrapText(title, 22).slice(0, 2)
  const descLines = wrapText(description, 44).slice(0, 3)

  const titleStartY = 258
  const titleLineHeight = 68
  const descStartY = titleStartY + titleLines.length * titleLineHeight + 18
  const descLineHeight = 36

  const pillText = escapeXml(path)
  const pillWidth = Math.max(84, path.length * 14 + 34)
  const pillX = 1116 - pillWidth

  return `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#f5f5f5" />
  <rect x="36" y="36" width="1128" height="558" rx="24" fill="#ffffff" stroke="#d4d4d4" stroke-width="2" />

  <!-- Top bar -->
  <text x="84" y="102" font-family="DejaVu Sans, Liberation Sans, Arial, sans-serif" font-size="22" font-weight="900" letter-spacing="-0.5" fill="#0a0a0a">RIZKYFAUZAN.ID</text>
  <rect x="${pillX}" y="74" width="${pillWidth}" height="38" rx="10" fill="#0a0a0a" />
  <text x="${pillX + pillWidth / 2}" y="99" text-anchor="middle" font-family="DejaVu Sans Mono, Liberation Mono, monospace" font-size="18" font-weight="700" fill="#ffffff">${pillText}</text>
  <line x1="36" y1="132" x2="1164" y2="132" stroke="#e5e5e5" stroke-width="1.5" />

  <!-- Main content -->
  <text x="84" y="198" font-family="DejaVu Sans, Liberation Sans, Arial, sans-serif" font-size="16" font-weight="700" letter-spacing="2.5" fill="#737373">${escapeXml(eyebrow)}</text>

  ${titleLines
    .map(
      (line, idx) =>
        `<text x="84" y="${titleStartY + idx * titleLineHeight}" font-family="DejaVu Sans, Liberation Sans, Arial, sans-serif" font-size="56" font-weight="800" letter-spacing="-1.5" fill="#0a0a0a">${escapeXml(line)}</text>`
    )
    .join('\n  ')}

  ${descLines
    .map(
      (line, idx) =>
        `<text x="84" y="${descStartY + idx * descLineHeight}" font-family="DejaVu Sans, Liberation Sans, Arial, sans-serif" font-size="24" font-weight="400" fill="#525252">${escapeXml(line)}</text>`
    )
    .join('\n  ')}

  <!-- Avatar frame -->
  <rect x="854" y="182" width="262" height="262" rx="28" fill="#f5f5f5" stroke="#e5e5e5" stroke-width="2" />

  <!-- Footer -->
  <line x1="36" y1="520" x2="1164" y2="520" stroke="#e5e5e5" stroke-width="1.5" />
  <text x="84" y="562" font-family="DejaVu Sans, Liberation Sans, Arial, sans-serif" font-size="17" font-weight="600" fill="#737373">MTCNA · MTCTCE · IPv6 Sage</text>
  <text x="1116" y="562" text-anchor="end" font-family="DejaVu Sans Mono, Liberation Mono, monospace" font-size="16" fill="#737373">https://rizkyfauzan.id${escapeXml(path === '/' ? '' : path)}</text>
</svg>`
}

async function createRoundedAvatar(size, radius) {
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#ffffff" /></svg>`
  )

  return sharp(AVATAR_PATH)
    .resize(size, size, { fit: 'cover' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer()
}

async function main() {
  await rm(OUTPUT_DIR, { recursive: true, force: true })
  await mkdir(OUTPUT_DIR, { recursive: true })

  const avatar = await createRoundedAvatar(258, 26)

  for (const page of PAGES) {
    const svg = Buffer.from(buildCardSvg(page))
    const outPath = join(OUTPUT_DIR, `${page.slug}.png`)

    await sharp(svg)
      .composite([{ input: avatar, left: 856, top: 184 }])
      .png({ compressionLevel: 9, palette: true })
      .toFile(outPath)
  }

  console.log(`✨ Generated ${PAGES.length} per-page OG image(s) in ${OUTPUT_DIR}`)
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exitCode = 1
})
