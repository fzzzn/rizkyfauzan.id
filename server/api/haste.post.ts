const HASTE_BASE_URL = 'https://haste.zxn.my.id'
const MAX_CONTENT_LENGTH = 50_000

export default defineEventHandler(async (event) => {
  assertSameOrigin(event)

  const body = await readBody<{ content?: unknown }>(event)
  const content = typeof body?.content === 'string' ? body.content : ''

  if (!content.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Content cannot be empty.',
    })
  }

  if (content.length > MAX_CONTENT_LENGTH) {
    throw createError({
      statusCode: 400,
      statusMessage: `Content must be ${MAX_CONTENT_LENGTH} characters or fewer.`,
    })
  }

  try {
    const response = await $fetch<{ key?: string }>(`${HASTE_BASE_URL}/documents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
      body: content,
    })

    if (!response?.key) {
      throw new Error('Missing document key in Haste response')
    }

    return {
      key: response.key,
      url: `${HASTE_BASE_URL}/${response.key}`,
    }
  } catch (err) {
    console.error('Haste save error:', err)
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to save document to haste.zxn.my.id.',
    })
  }
})
