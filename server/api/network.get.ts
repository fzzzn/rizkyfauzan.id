interface CloudflareRequestMeta {
  asn?: number
  asOrganization?: string
  colo?: string
  country?: string
  city?: string
  httpProtocol?: string
  tlsVersion?: string
}

export default defineEventHandler((event) => {
  setResponseHeader(event, 'Cache-Control', 'no-store')

  const cf = ((event.context?.cloudflare as { request?: { cf?: CloudflareRequestMeta } } | undefined)?.request?.cf
    || (event.context?.cloudflare as { cf?: CloudflareRequestMeta } | undefined)?.cf
    || {}) as CloudflareRequestMeta

  const ip = getRequestHeader(event, 'cf-connecting-ip')
    || getRequestHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim()
    || event.node.req.socket?.remoteAddress
    || 'unknown'

  const isIPv6 = ip.includes(':') && ip !== '::1'
  const isLocal = ip === '::1' || ip === '127.0.0.1' || ip === '::ffff:127.0.0.1' || ip === 'unknown'

  return {
    ip,
    ipVersion: isLocal ? 'local' : (isIPv6 ? 'IPv6' : 'IPv4'),
    asn: cf.asn ? `AS${cf.asn}` : null,
    organization: cf.asOrganization || null,
    colo: cf.colo || null,
    location: [cf.city, cf.country].filter(Boolean).join(', ') || null,
    httpProtocol: cf.httpProtocol || null,
    tlsVersion: cf.tlsVersion || null,
  }
})
