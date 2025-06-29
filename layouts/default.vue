<template>
    <div class="h-screen lg:py-6 lg:px-6 flex flex-col">
        <div class="flex-1 lg:border lg:rounded-xl lg:border-black/30 flex flex-col lg:overflow-hidden relative">
            <navigation-bar />
            <main class="flex-1 lg:overflow-hidden relative">
                <div class="h-full p-4 overflow-y-auto relative">
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
