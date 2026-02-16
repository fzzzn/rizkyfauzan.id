import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { H3Event } from 'h3'

function getSupabaseConfig() {
  const config = useRuntimeConfig()
  return {
    url: config.supabaseUrl as string,
    key: config.supabaseKey as string,
  }
}

/**
 * Create a Supabase client for anonymous/public operations (e.g. fetching messages).
 */
export function createAnonSupabaseClient(): SupabaseClient {
  const { url, key } = getSupabaseConfig()
  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  })
}

/**
 * Create a Supabase client authenticated with the user's session from cookies.
 * Returns the client and the session user, or null if not authenticated.
 */
export async function createAuthenticatedSupabaseClient(event: H3Event) {
  const accessToken = getCookie(event, 'sb-access-token')
  const refreshToken = getCookie(event, 'sb-refresh-token')

  if (!accessToken || !refreshToken) {
    return { client: null, user: null }
  }

  const { url, key } = getSupabaseConfig()
  const supabase = createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  })

  const { data, error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  })

  if (error || !data.session) {
    deleteCookie(event, 'sb-access-token')
    deleteCookie(event, 'sb-refresh-token')
    return { client: null, user: null }
  }

  // If tokens were refreshed, update cookies
  if (data.session.access_token !== accessToken) {
    const isSecure = !getRequestURL(event).hostname.includes('localhost')
    setCookie(event, 'sb-access-token', data.session.access_token, {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      path: '/',
      maxAge: 28800,
    })
    setCookie(event, 'sb-refresh-token', data.session.refresh_token, {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      path: '/',
      maxAge: 28800,
    })
  }

  return { client: supabase, user: data.session.user }
}

/**
 * Base64url encode a Uint8Array.
 */
function base64url(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

/**
 * Generate a PKCE code verifier.
 */
export function generateCodeVerifier(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return base64url(array)
}

/**
 * Generate a PKCE code challenge from a code verifier.
 */
export async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(verifier)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return base64url(new Uint8Array(hash))
}
