export default defineEventHandler(async (event) => {
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

  const messageData = {
    user_id: user.id,
    username: user.user_metadata?.full_name || user.user_metadata?.user_name || 'Anonymous',
    avatar_url: user.user_metadata?.avatar_url || '/guest.png',
    message,
  }

  const { data, error } = await supabase
    .from('guestbook')
    .insert(messageData)
    .select()

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }

  return data
})
