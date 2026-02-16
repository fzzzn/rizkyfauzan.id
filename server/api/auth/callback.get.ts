export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const code = query.code as string

  if (!code) {
    return sendRedirect(event, '/guestbook?error=missing_code')
  }

  const codeVerifier = getCookie(event, 'sb-pkce-verifier')
  if (!codeVerifier) {
    return sendRedirect(event, '/guestbook?error=missing_verifier')
  }

  const { url: supabaseUrl, key: supabaseKey } = getSupabaseConfig(event)

  // Exchange code for session directly via Supabase REST API
  // This avoids the client library's storage issues with PKCE
  const tokenResponse = await $fetch<{
    access_token: string
    refresh_token: string
    user: { id: string; email?: string; user_metadata: Record<string, unknown> }
  }>(`${supabaseUrl}/auth/v1/token?grant_type=pkce`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseKey,
    },
    body: {
      auth_code: code,
      code_verifier: codeVerifier,
    },
  }).catch((err) => {
    console.error('Token exchange error:', err.data || err.message)
    return null
  })

  if (!tokenResponse?.access_token) {
    return sendRedirect(event, '/guestbook?error=token_exchange_failed')
  }

  // Set session tokens in httpOnly cookies
  const isSecure = getRequestURL(event).hostname !== 'localhost'
  const cookieOptions = {
    httpOnly: true,
    secure: isSecure,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 28800, // 8 hours
  }

  setCookie(event, 'sb-access-token', tokenResponse.access_token, cookieOptions)
  setCookie(event, 'sb-refresh-token', tokenResponse.refresh_token, cookieOptions)

  // Clean up PKCE cookie
  deleteCookie(event, 'sb-pkce-verifier')

  return sendRedirect(event, '/guestbook')
})
