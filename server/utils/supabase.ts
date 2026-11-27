import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { H3Event } from 'h3'

/**
 * Whether the request is being served locally (plain HTTP is acceptable).
 */
export function isLocalRequest(event: H3Event): boolean {
  const hostname = getRequestURL(event).hostname
  return ['localhost', '127.0.0.1', '::1', '[::1]'].includes(hostname)
}

/**
 * Reject cross-site mutating requests by verifying the Origin (or Referer)
 * header matches the request host.
 */
export function assertSameOrigin(event: H3Event): void {
  const origin = getRequestHeader(event, 'origin') || getRequestHeader(event, 'referer')
  if (!origin) return

  const expectedHost = getRequestURL(event).host
  try {
    const originHost = new URL(origin).host
    if (originHost !== expectedHost) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden',
      })
    }
  } catch (err) {
    if ((err as { statusCode?: number })?.statusCode === 403) throw err
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    })
  }
}

const ADMIN_EMAILS = new Set([
  'rizkyfauzanid@gmail.com',
  'contact@rizkyfauzan.id',
  'rizkyfauzanhanif984@gmail.com',
])

/**
 * Whether the authenticated Supabase user is a guestbook administrator.
 */
export function isAdminUser(user: { email?: string | null } | null | undefined): boolean {
  const email = user?.email?.trim().toLowerCase()
  return Boolean(email && ADMIN_EMAILS.has(email))
}

export function getSupabaseConfig(event: H3Event) {
  const config = useRuntimeConfig(event)

  // Cloudflare Pages bindings fallback
  const cfEnv = (event.context?.cloudflare?.env || {}) as Record<string, string>

  const url = config.supabaseUrl || cfEnv.NUXT_SUPABASE_URL || ''
  const key = config.supabaseKey || cfEnv.NUXT_SUPABASE_KEY || ''

  return { url, key }
}

/**
 * Create a Supabase client for anonymous/public operations (e.g. fetching messages).
 */
export function createAnonSupabaseClient(event: H3Event): SupabaseClient {
  const { url, key } = getSupabaseConfig(event)
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

  const { url, key } = getSupabaseConfig(event)
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
    const isSecure = !isLocalRequest(event)
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
