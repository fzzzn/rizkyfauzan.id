const IMAGEKIT_HOSTNAME = 'ik.imagekit.io'

/**
 * Build an ImageKit transformation URL for a remote asset.
 * Non-ImageKit URLs are returned unchanged.
 */
export const imageKitUrl = (src: string, width: number, quality = 80): string => {
  if (!src) return src

  try {
    const url = new URL(src)

    if (url.hostname !== IMAGEKIT_HOSTNAME) return src

    url.searchParams.set('tr', `w-${width},q-${quality},f-auto`)

    return url.toString()
  } catch {
    return src
  }
}
