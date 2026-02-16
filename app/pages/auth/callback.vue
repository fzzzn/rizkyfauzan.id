<script setup>
// OAuth callback is now handled server-side at /api/auth/callback.
// This page exists as a fallback redirect.
onMounted(async () => {
  await navigateTo('/guestbook')
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"/>
      <p class="mt-4 text-gray-600">Redirecting...</p>
    </div>
  </div>
</template>