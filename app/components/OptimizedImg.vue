<script setup lang="ts">
import { optimizedImages } from '~/generated/images'

/**
 * Renders a `<picture>` with AVIF and WebP `<source>` elements using the
 * responsive variants generated at build time by scripts/optimize-images.mjs.
 * Unlike @nuxt/image this needs no runtime processing, so it works on
 * Cloudflare Workers.
 *
 * Files without generated variants (e.g. remote or un-optimized sources) fall
 * back to a plain `<img>` with the original src.
 */
defineOptions({
  inheritAttrs: false,
})

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
const resolvedSizes = computed(() => props.sizes ?? image.value?.sizes)
</script>

<template>
  <picture v-if="image?.avifSrcset || image?.webpSrcset" class="contents">
    <source
      v-if="image.avifSrcset"
      type="image/avif"
      :srcset="image.avifSrcset"
      :sizes="resolvedSizes"
    >
    <source
      v-if="image.webpSrcset"
      type="image/webp"
      :srcset="image.webpSrcset"
      :sizes="resolvedSizes"
    >
    <img
      v-bind="$attrs"
      :src="image.src"
      :width="image.width"
      :height="image.height"
      :alt="alt"
      :loading="loading"
      :fetchpriority="fetchpriority"
      :decoding="decoding"
    >
  </picture>
  <img
    v-else
    v-bind="$attrs"
    :src="image?.src ?? src"
    :width="image?.width"
    :height="image?.height"
    :alt="alt"
    :loading="loading"
    :fetchpriority="fetchpriority"
    :decoding="decoding"
  >
</template>
