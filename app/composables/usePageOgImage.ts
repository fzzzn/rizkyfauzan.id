const SITE_URL = 'https://rizkyfauzan.id'

export const usePageOgImage = (slug: string, alt: string) => {
  const url = `${SITE_URL}/og/${slug}.png`

  useSeoMeta({
    ogImage: {
      url,
      width: 1200,
      height: 630,
      type: 'image/png',
      alt,
    },
    twitterImage: {
      url,
      width: 1200,
      height: 630,
      alt,
    },
  })
}
