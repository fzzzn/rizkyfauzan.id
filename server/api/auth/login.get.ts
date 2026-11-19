export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const provider = query.provider as string

  if (!provider || !['google', 'github', 'discord'].includes(provider)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid provider. Must be google, github, or discord.',
    })
  }

  const { url: supabaseUrl, key: supabaseKey } = getSupabaseConfig(event)

  if (!supabaseUrl || !supabaseKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase configuration is missing. Set NUXT_SUPABASE_URL and NUXT_SUPABASE_KEY environment variables.',
    })
  }

  const requestUrl = getRequestURL(event)
  // Force https in production (Cloudflare terminates TLS before the worker)
  const origin = isLocalRequest(event)
    ? requestUrl.origin
    : `https://${requestUrl.host}`

  // Generate PKCE values. Supabase manages the OAuth state itself and strips
  // any custom state, so the code verifier cookie is what binds the callback
  // to this browser.
  const codeVerifier = generateCodeVerifier()
  const codeChallenge = await generateCodeChallenge(codeVerifier)

  // Store PKCE verifier in a short-lived httpOnly cookie
  const cookieOptions = {
    httpOnly: true,
    secure: !isLocalRequest(event),
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 300, // 5 minutes
  }

  setCookie(event, 'sb-pkce-verifier', codeVerifier, cookieOptions)

  // Construct Supabase OAuth URL with PKCE
  const params = new URLSearchParams({
    provider,
    redirect_to: `${origin}/api/auth/callback`,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  })

  const authUrl = `${supabaseUrl}/auth/v1/authorize?${params}`

  return sendRedirect(event, authUrl)
})
