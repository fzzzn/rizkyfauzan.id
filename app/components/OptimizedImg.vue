<script setup lang="ts">
import { optimizedImages } from '~/generated/images'

/**
 * Renders an <img> using the responsive variants generated at build time by
 * scripts/optimize-images.mjs. Unlike @nuxt/image this needs no runtime
 * processing, so it works on Cloudflare Workers.
 *
 * Files without generated variants (e.g. remote or un-optimized sources) fall
 * back to a plain <img> with the original src.
 */
const props = withDefaults(defineProps<{
  src: string
  alt?: string
  sizes?: string
  loading?: 'lazy' | 'eager'
  fetchpriority?: 'high' | 'low' | 'auto'
  decoding?: 'async' | 'sync' | 'auto'
}>(), {
  alt: '',
  sizes: undefined,
  loading: 'lazy',
  fetchpriority: undefined,
  decoding: 'async',
})

const image = computed(() => optimizedImages[props.src.replace(/^\/+/, '')])
const srcset = computed(() => image.value?.srcset)
const resolvedSizes = computed(() => props.sizes ?? image.value?.sizes)
</script>

<template>
  <img
    :src="image?.src ?? src"
    :srcset="srcset"
    :sizes="srcset ? resolvedSizes : undefined"
    :width="image?.width"
    :height="image?.height"
    :alt="alt"
    :loading="loading"
    :fetchpriority="fetchpriority"
    :decoding="decoding"
  >
</template>
