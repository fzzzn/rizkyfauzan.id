export default defineEventHandler(async (event) => {
  const { url, key } = getSupabaseConfig(event)

  if (!url || !key) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase configuration is missing. Set NUXT_SUPABASE_URL and NUXT_SUPABASE_KEY environment variables.',
    })
  }

  const query = getQuery(event)
  const rawOffset = Number(query.offset)
  const rawLimit = Number(query.limit)
  const offset = Number.isFinite(rawOffset) && rawOffset >= 0 ? Math.floor(rawOffset) : 0
  const limit = Number.isFinite(rawLimit) && rawLimit >= 1 ? Math.min(Math.floor(rawLimit), 100) : 20

  const supabase = createAnonSupabaseClient(event)

  // Fetch one extra row to determine whether more pages exist without a separate COUNT query.
  const { data, error } = await supabase
    .from('guestbook')
    .select('*')
    .order('pinned', { ascending: false })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit)

  if (error) {
    console.error('Supabase query error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load guestbook messages.',
    })
  }

  const rows = data || []
  const hasMore = rows.length > limit
  const items = hasMore ? rows.slice(0, limit) : rows

  return { items, hasMore }
})
