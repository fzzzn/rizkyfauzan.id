<template>
    <div class="md:h-[94vh] lg:h-screen md:py-4 md:px-4 lg:py-6 lg:px-6 flex flex-col">
        <div class="flex-1 md:border md:rounded-xl md:border-black/30 flex flex-col md:overflow-hidden relative">
            <navigation-bar />
            <main class="flex-1 md:overflow-hidden relative">
                <div class="min-h-[80vh] h-full p-6 overflow-y-auto relative">
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
