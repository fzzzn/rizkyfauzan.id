export default defineEventHandler(async (event) => {
  const { user } = await createAuthenticatedSupabaseClient(event)

  if (!user) {
    return null
  }

  return {
    id: user.id,
    email: user.email,
    user_metadata: {
      full_name: user.user_metadata?.full_name || null,
      user_name: user.user_metadata?.user_name || null,
      avatar_url: user.user_metadata?.avatar_url || null,
    },
  }
})
