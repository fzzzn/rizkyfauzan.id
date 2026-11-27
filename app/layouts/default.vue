<template>
    <div class="h-screen lg:py-6 lg:px-6 flex flex-col">
        <a
            href="#main-content"
            class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-inverse-bg focus:text-inverse-fg focus:text-sm focus:font-semibold">
            Skip to main content
        </a>
        <div class="flex-1 flex flex-col lg:rounded-xl lg:border lg:border-line lg:overflow-hidden relative">
            <navigation-bar />
            <main id="main-content" tabindex="-1" class="flex-1 lg:overflow-hidden relative focus:outline-none">
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
