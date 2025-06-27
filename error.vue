<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
    error: {
        type: Object as () => NuxtError,
        default: () => ({} as NuxtError)
    }
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
    <div>
        <p>Status code: {{ props.error?.statusCode }}</p>
        <button @click="handleError">Back to home</button>
    </div>
</template>
