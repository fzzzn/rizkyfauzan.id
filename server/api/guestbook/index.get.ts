export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  
  if (!config.supabaseUrl || !config.supabaseKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase configuration is missing. Set NUXT_SUPABASE_URL and NUXT_SUPABASE_KEY environment variables.',
    })
  }

  const supabase = createAnonSupabaseClient(event)

  const { data, error } = await supabase
    .from('guestbook')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase query error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }

  return data
})
