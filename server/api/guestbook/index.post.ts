export default defineEventHandler(async (event) => {
  assertSameOrigin(event)

  const { client: supabase, user } = await createAuthenticatedSupabaseClient(event)

  if (!user || !supabase) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const body = await readBody<{ message?: unknown }>(event)
  const message = typeof body?.message === 'string' ? body.message.trim() : ''
  const MAX_MESSAGE_LENGTH = 1000
  const POST_COOLDOWN_MS = 60_000

  if (!message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Message is required',
    })
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    throw createError({
      statusCode: 400,
      statusMessage: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer`,
    })
  }

  const { data: recent, error: recentError } = await supabase
    .from('guestbook')
    .select('created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)

  if (recentError) {
    console.error('Guestbook rate-limit check error:', recentError)
  } else if (recent?.[0]?.created_at) {
    const elapsed = Date.now() - new Date(recent[0].created_at).getTime()
    if (elapsed >= 0 && elapsed < POST_COOLDOWN_MS) {
      const retryAfter = Math.ceil((POST_COOLDOWN_MS - elapsed) / 1000)
      setResponseHeader(event, 'Retry-After', retryAfter)
      throw createError({
        statusCode: 429,
        statusMessage: `Please wait ${retryAfter} seconds before posting again.`,
      })
    }
  }

  const messageData = {
    user_id: user.id,
    username: user.user_metadata?.full_name || user.user_metadata?.user_name || 'Anonymous',
    avatar_url: user.user_metadata?.avatar_url || '',
    message,
  }

  const { data, error } = await supabase
    .from('guestbook')
    .insert(messageData)
    .select()

  if (error) {
    console.error('Guestbook insert error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to post message.',
    })
  }

  return data
})
