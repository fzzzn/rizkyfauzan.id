export default defineEventHandler(async (event) => {
  const { client: supabase, user } = await createAuthenticatedSupabaseClient(event)

  if (!user || !supabase) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const body = await readBody<{ message: string }>(event)

  if (!body.message || body.message.trim().length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Message is required',
    })
  }

  const messageData = {
    user_id: user.id,
    username: user.user_metadata?.full_name || user.user_metadata?.user_name || 'Anonymous',
    avatar_url: user.user_metadata?.avatar_url || '/guest.png',
    message: body.message.trim(),
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
