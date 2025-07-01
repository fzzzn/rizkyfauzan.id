<template>
<div>
<slot />
</div>
</template>

<script lang="ts" setup>
useHead({
    link: [
        {
            rel: 'icon',
            type: 'image/png',
            href: '/logo.png'
        },
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
