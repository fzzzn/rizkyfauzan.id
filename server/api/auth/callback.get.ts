import { createClient } from '@supabase/supabase-js'

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

  // Extract the project ref from the URL for the storage key
  const projectRef = new URL(supabaseUrl).hostname.split('.')[0]
  const storageKey = `sb-${projectRef}-auth-token`

  // Create a Supabase client with a custom storage that has the code verifier
  const storage: Record<string, string> = {
    [`${storageKey}-code-verifier`]: codeVerifier,
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      flowType: 'pkce',
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
      storage: {
        getItem: (key: string) => storage[key] ?? null,
        setItem: (key: string, value: string) => { storage[key] = value },
        removeItem: (key: string) => { delete storage[key] },
      },
    },
  })

  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !data.session) {
    console.error('Auth callback error:', error?.message)
    return sendRedirect(event, '/guestbook?error=auth_failed')
  }

  // Set session tokens in httpOnly cookies
  const isSecure = !getRequestURL(event).hostname.includes('localhost')
  const cookieOptions = {
    httpOnly: true,
    secure: isSecure,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 28800, // 8 hours
  }

  setCookie(event, 'sb-access-token', data.session.access_token, cookieOptions)
  setCookie(event, 'sb-refresh-token', data.session.refresh_token, cookieOptions)

  // Clean up PKCE cookie
  deleteCookie(event, 'sb-pkce-verifier')

  return sendRedirect(event, '/guestbook')
})
