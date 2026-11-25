const APEX_HOST = 'rizkyfauzan.id'

// Only https://www.rizkyfauzan.id redirects. Other hosts (previews, localhost)
// pass through untouched.
export default defineEventHandler((event) => {
    const host = getRequestHeader(event, 'host')?.split(':')[0]
    if (host !== `www.${APEX_HOST}`) return

    const url = getRequestURL(event)
    return sendRedirect(event, `https://${APEX_HOST}${url.pathname}${url.search}`, 301)
})
