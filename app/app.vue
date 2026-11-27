<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <CommandPalette />
  <SshTerminal />
</template>

<script setup lang="ts">
useSchemaOrg([
  defineWebSite({
    name: 'Rizky Fauzan Hanif',
    alternateName: 'rizkyfauzan.id',
  }),
])
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.5rem);
}
</style>
