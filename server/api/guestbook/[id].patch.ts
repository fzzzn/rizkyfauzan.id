export default defineEventHandler(async (event) => {
  assertSameOrigin(event)

  const { client: supabase, user } = await createAuthenticatedSupabaseClient(event)

  if (!user || !supabase) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  if (!isAdminUser(user)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    })
  }

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Message ID is required',
    })
  }

  const body = await readBody<{ pinned?: unknown }>(event)
  if (typeof body?.pinned !== 'boolean') {
    throw createError({
      statusCode: 400,
      statusMessage: 'A boolean "pinned" field is required',
    })
  }

  // Keep a single pinned message at the top (like YouTube chat): unpin any
  // previously pinned entry before pinning a new one.
  if (body.pinned) {
    const { error: unpinError } = await supabase
      .from('guestbook')
      .update({ pinned: false })
      .eq('pinned', true)
      .neq('id', id)

    if (unpinError) {
      console.error('Guestbook unpin error:', unpinError)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to update pinned message.',
      })
    }
  }

  const { data, error } = await supabase
    .from('guestbook')
    .update({ pinned: body.pinned })
    .eq('id', id)
    .select()

  if (error) {
    console.error('Guestbook pin error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update pinned message.',
    })
  }

  if (!data || data.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Message not found or you do not have permission to pin it.',
    })
  }

  return data[0]
})
