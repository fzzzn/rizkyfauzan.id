<script setup>
const supabase = useSupabaseClient()

onMounted(async () => {
  const { data, error } = await supabase.auth.getSession()
  
  if (error) {
    console.error('Auth error:', error)
    await navigateTo('/guestbook?error=auth_failed')
  } else if (data.session) {
    console.log('Successfully authenticated')
    await navigateTo('/guestbook')
  } else {
    await navigateTo('/guestbook')
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"/>
      <p class="mt-4 text-gray-600">Completing sign in...</p>
    </div>
  </div>
</template>