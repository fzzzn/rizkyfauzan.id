<template>
    <div class="h-screen lg:py-6 lg:px-6 flex flex-col">
        <div class="flex-1 flex flex-col lg:rounded-xl lg:border lg:border-black/30 lg:overflow-hidden relative">
            <navigation-bar />
            <main class="flex-1 lg:overflow-hidden relative">
                <div class="h-full overflow-y-auto relative">
                    <slot />
                </div>
            </main>
            <!-- Footer hidden on mobile, shown on desktop -->
            <web-footer class="hidden lg:block" />
        </div>
        <!-- Footer shown on mobile, hidden on desktop -->
        <web-footer class="block lg:hidden" />
    </div>
</template>

<script setup lang="ts">
useHead({
    htmlAttrs: {
        lang: 'en',
    },
    meta: [
        { property: 'og:image', content: 'https://rizkyfauzan.id/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:type', content: 'image/png' },
        { name: 'twitter:image', content: 'https://rizkyfauzan.id/og-image.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
        { rel: 'canonical', href: 'https://rizkyfauzan.id' },
    ],
})
</script>

<style>
/* Global scrollbar hiding */
* {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

*::-webkit-scrollbar {
    display: none;
}
</style>
