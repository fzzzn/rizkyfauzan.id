export default defineEventHandler(async (event) => {
  assertSameOrigin(event)

  const { client: supabase, user } = await createAuthenticatedSupabaseClient(event)

  if (!user || !supabase) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Message ID is required',
    })
  }

  const { error } = await supabase
    .from('guestbook')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    console.error('Guestbook delete error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete message.',
    })
  }

  return { success: true }
})
