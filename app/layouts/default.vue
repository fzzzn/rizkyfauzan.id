<template>
    <div class="lg:h-screen md:py-4 md:px-4 lg:py-6 lg:px-6 flex flex-col">
        <div class="flex-1 md:border md:rounded-xl md:border-black/30 flex flex-col md:overflow-hidden relative">
            <navigation-bar />
            <main class="flex-1 md:overflow-hidden relative">
                <div class="min-h-[80vh] h-full overflow-y-auto relative">
                    <slot />
                </div>
            </main>
            <!-- Footer hidden on mobile, shown on desktop -->
            <web-footer class="hidden md:block" />
        </div>
        <!-- Footer shown on mobile, hidden on desktop -->
        <web-footer class="block md:hidden" />
    </div>
</template>

<script lang="ts" setup>
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
