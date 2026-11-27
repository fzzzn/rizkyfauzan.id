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

  const body = await readBody<{ pinned?: unknown; message?: unknown }>(event)

  // Mode 1: Admin pin/unpin
  if (typeof body?.pinned === 'boolean') {
    if (!isAdminUser(user)) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden',
      })
    }

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
  }

  // Mode 2: Author editing their own message
  if (typeof body?.message === 'string') {
    const MAX_MESSAGE_LENGTH = 1000
    const message = body.message.trim()

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

    const { data, error } = await supabase
      .from('guestbook')
      .update({ message })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()

    if (error) {
      console.error('Guestbook edit error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to update message.',
      })
    }

    if (!data || data.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Message not found or you do not have permission to edit it.',
      })
    }

    return data[0]
  }

  throw createError({
    statusCode: 400,
    statusMessage: 'Provide either a boolean "pinned" field or a string "message" field.',
  })
})
