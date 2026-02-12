<template>
    <div>
        <slot />
    </div>
</template>

<script setup lang="ts">
useHead({
    link: [
        {
            rel: 'og:image',
            href: '/og-image.png',
        },
        {
            rel: 'twitter:image',
            href: '/og-image.png'
        }
    ]
})
</script>
