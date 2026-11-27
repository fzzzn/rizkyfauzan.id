const ALLOWED_TYPES = new Set(['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SOA', 'CAA'])
const DOMAIN_RE = /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i

interface DohAnswer {
  name: string
  type: number
  TTL: number
  data: string
}

interface DohResponse {
  Status: number
  Answer?: DohAnswer[]
}

export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Cache-Control', 'no-store')

  const query = getQuery(event)
  const name = typeof query.name === 'string' ? query.name.trim().replace(/\.$/, '') : ''
  const type = typeof query.type === 'string' && ALLOWED_TYPES.has(query.type.toUpperCase())
    ? query.type.toUpperCase()
    : 'A'

  if (!name || !DOMAIN_RE.test(name)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid domain name.',
    })
  }

  try {
    const res = await $fetch<DohResponse>('https://cloudflare-dns.com/dns-query', {
      headers: {
        Accept: 'application/dns-json',
      },
      query: { name, type },
    })

    return {
      name,
      type,
      status: res.Status,
      answers: res.Answer || [],
    }
  } catch (err) {
    console.error('DoH lookup error:', err)
    throw createError({
      statusCode: 502,
      statusMessage: 'DNS lookup failed.',
    })
  }
})
