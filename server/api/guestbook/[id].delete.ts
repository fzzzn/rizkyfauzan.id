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

  const admin = isAdminUser(user)
  const db = admin ? (createServiceSupabaseClient(event) ?? supabase) : supabase

  let query = db
    .from('guestbook')
    .delete()
    .eq('id', id)

  if (!admin) {
    query = query.eq('user_id', user.id)
  }

  const { data, error } = await query.select('id')

  if (error) {
    console.error('Guestbook delete error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete message.',
    })
  }

  if (!data || data.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Message not found or you do not have permission to delete it.',
    })
  }

  return { success: true }
})
