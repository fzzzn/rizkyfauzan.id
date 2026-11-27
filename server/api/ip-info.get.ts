const IPV4_RE = /^(?:\d{1,3}\.){3}\d{1,3}$/
const IPV6_RE = /^[0-9a-f:]+$/i

interface IpWhoisResponse {
  success: boolean
  ip?: string
  type?: string
  city?: string
  country_code?: string
  country?: string
  connection?: {
    asn?: number
    org?: string
    isp?: string
  }
}

export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Cache-Control', 'public, max-age=300')

  const query = getQuery(event)
  const ip = typeof query.ip === 'string' ? query.ip.trim() : ''

  const isV4 = IPV4_RE.test(ip)
  const isV6 = !isV4 && ip.includes(':') && IPV6_RE.test(ip)

  if (!ip || (!isV4 && !isV6)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid IP address.',
    })
  }

  try {
    const response = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
      signal: AbortSignal.timeout(4000),
    })

    if (!response.ok) {
      throw new Error(`ipwho.is returned ${response.status}`)
    }

    const data = await response.json() as IpWhoisResponse
    if (!data.success) {
      return {
        ip,
        asn: null,
        organization: null,
        location: null,
      }
    }

    const org = data.connection?.isp || data.connection?.org || null
    const location = [data.city, data.country_code || data.country].filter(Boolean).join(', ') || null

    return {
      ip: data.ip || ip,
      asn: data.connection?.asn ? `AS${data.connection.asn}` : null,
      organization: org,
      location,
    }
  } catch (err) {
    console.error('IP info lookup error:', err)
    return {
      ip,
      asn: null,
      organization: null,
      location: null,
    }
  }
})
