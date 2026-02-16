export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const cfEnv = (event.context?.cloudflare?.env || {}) as Record<string, string>

  return {
    runtimeConfig: {
      supabaseUrl: config.supabaseUrl ? 'SET' : 'EMPTY',
      supabaseKey: config.supabaseKey ? 'SET' : 'EMPTY',
    },
    cloudflareEnv: {
      NUXT_SUPABASE_URL: cfEnv.NUXT_SUPABASE_URL ? 'SET' : 'EMPTY',
      NUXT_SUPABASE_KEY: cfEnv.NUXT_SUPABASE_KEY ? 'SET' : 'EMPTY',
      allKeys: Object.keys(cfEnv),
    },
    contextKeys: Object.keys(event.context || {}),
    cloudflareKeys: Object.keys(event.context?.cloudflare || {}),
  }
})
