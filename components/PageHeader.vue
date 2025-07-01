<template>
  <div class="mb-12 flex flex-col items-center">
    <h1 class="text-6xl md:text-8xl leading-[1.2] font-[antonio] uppercase font-bold">
      {{ title }}
    </h1>
    <p v-if="description" class="text-lg text-gray-700 max-w-3xl mt-2">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  }
})
</script>