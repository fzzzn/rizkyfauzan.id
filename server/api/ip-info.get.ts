const IPV4_RE = /^(?:\d{1,3}\.){3}\d{1,3}$/
const IPV6_RE = /^[0-9a-f:]+$/i

interface IpInfoResult {
  ip: string
  asn: string | null
  organization: string | null
  location: string | null
}

interface IpInfoIoResponse {
  ip?: string
  city?: string
  country?: string
  org?: string
}

interface IpWhoisResponse {
  success: boolean
  ip?: string
  city?: string
  country_code?: string
  country?: string
  connection?: {
    asn?: number
    org?: string
    isp?: string
  }
}

async function fetchFromIpInfo(ip: string): Promise<IpInfoResult | null> {
  const response = await fetch(`https://ipinfo.io/${encodeURIComponent(ip)}/json`, {
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'rizkyfauzan.id/1.0',
    },
  })
  if (!response.ok) return null

  const data = await response.json() as IpInfoIoResponse
  if (!data.org && !data.city && !data.country) return null

  let asn: string | null = null
  let organization: string | null = null
  if (data.org) {
    const match = data.org.match(/^(AS\d+)\s*(.*)$/i)
    if (match) {
      asn = match[1]!.toUpperCase()
      organization = match[2]?.trim() || null
    } else {
      organization = data.org
    }
  }

  return {
    ip: data.ip || ip,
    asn,
    organization,
    location: [data.city, data.country].filter(Boolean).join(', ') || null,
  }
}

async function fetchFromIpWhois(ip: string): Promise<IpInfoResult | null> {
  const response = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'rizkyfauzan.id/1.0',
    },
  })
  if (!response.ok) return null

  const data = await response.json() as IpWhoisResponse
  if (!data.success) return null

  return {
    ip: data.ip || ip,
    asn: data.connection?.asn ? `AS${data.connection.asn}` : null,
    organization: data.connection?.isp || data.connection?.org || null,
    location: [data.city, data.country_code || data.country].filter(Boolean).join(', ') || null,
  }
}

export default defineEventHandler(async (event): Promise<IpInfoResult> => {
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
    const primary = await fetchFromIpInfo(ip)
    if (primary) return primary
  } catch (err) {
    console.error('ipinfo.io lookup error:', err)
  }

  try {
    const fallback = await fetchFromIpWhois(ip)
    if (fallback) return fallback
  } catch (err) {
    console.error('ipwho.is lookup error:', err)
  }

  return {
    ip,
    asn: null,
    organization: null,
    location: null,
  }
})
