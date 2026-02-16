export default defineEventHandler(async (event) => {
  const { client } = await createAuthenticatedSupabaseClient(event)

  if (client) {
    await client.auth.signOut()
  }

  // Clear session cookies
  deleteCookie(event, 'sb-access-token')
  deleteCookie(event, 'sb-refresh-token')

  return { success: true }
})
