export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const provider = query.provider as string

  if (!provider || !['google', 'github', 'discord'].includes(provider)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid provider. Must be google, github, or discord.',
    })
  }

  const config = useRuntimeConfig()
  const origin = getRequestURL(event).origin

  // Generate PKCE values
  const codeVerifier = generateCodeVerifier()
  const codeChallenge = await generateCodeChallenge(codeVerifier)

  // Store code_verifier in httpOnly cookie
  const isSecure = !getRequestURL(event).hostname.includes('localhost')
  setCookie(event, 'sb-pkce-verifier', codeVerifier, {
    httpOnly: true,
    secure: isSecure,
    sameSite: 'lax',
    path: '/',
    maxAge: 300, // 5 minutes
  })

  // Construct Supabase OAuth URL with PKCE
  const params = new URLSearchParams({
    provider,
    redirect_to: `${origin}/api/auth/callback`,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  })

  const authUrl = `${config.supabaseUrl}/auth/v1/authorize?${params}`

  return sendRedirect(event, authUrl)
})
