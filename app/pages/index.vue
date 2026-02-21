<template>
    <div class="h-full">
        <main class="h-full p-6 flex-col gap-8 lg:gap-24 flex lg:flex-row items-center justify-center">
            <section aria-label="Profile Photo of Rizky Fauzan Hanif">
                <NuxtImg src="https://assets.rizkyfauzan.id/avatar-with-bg.webp"
                    alt="Rizky Fauzan Hanif - Network Engineer and MikroTik Certified Professional"
                    class="object-cover w-80 lg:w-125 aspect-square rounded-xl cursor-pointer" loading="eager" fetchpriority="high" @click="openModal" />
            </section>
            <section class="text-center flex flex-col lg:text-left" aria-label="About Rizky Fauzan Hanif">
                <h1 class="text-5xl lg:text-8xl font-bold tracking-tighter">Rizky Fauzan Hanif</h1>
                <h2 class="text-2xl lg:text-4xl mt-2 font-bold">Network Engineer</h2>
                <div class="flex flex-col">
                    <p
                        class="mt-12 absolute left-0 text-sm lg:text-base lg:relative w-full bottom-5 flex flex-col lg:flex-row items-center justify-between lg:gap-3 font-bold">
                        <span>Want to know more about me?</span>
                        <span class="h-px grow bg-black hidden md:block" />
                        <RouterLink to="/about" class="group" aria-label="Learn more about Rizky Fauzan Hanif">
                            <span class="relative">
                                Learn more about me
                                <span
                                    class="absolute left-0 bottom-0 h-full w-full max-w-0 backdrop-invert transition-all group-hover:max-w-full" />
                            </span>
                        </RouterLink>
                    </p>
                </div>
            </section>
        </main>

        <!-- Modal -->
        <ClientOnly>
            <Teleport to="body">
                <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
                    @click="closeModal">
                    <div class="relative max-w-6xl max-h-full">
                        <!-- Close button -->
                        <button
                            class="absolute top-4 right-4 z-20 w-8 h-8 bg-black hover:bg-black/80 text-white rounded-full transition duration-200 flex items-center justify-center cursor-pointer"
                            aria-label="Close modal" @click.stop="closeModal">
                            <Icon name="heroicons:x-mark" size="16" />
                        </button>

                        <!-- Modal image -->
                        <NuxtImg src="https://assets.rizkyfauzan.id/avatar-with-bg.webp"
                            class="max-w-full max-h-[90vh] object-contain rounded-2xl" alt="Rizky Fauzan Hanif - Full size"
                            @click.stop />
                    </div>
                </div>
            </Teleport>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
useSeoMeta({
    title: 'Rizky Fauzan Hanif - Network Engineer | MikroTik MTCNA & MTCTCE Certified',
    description: 'Rizky Fauzan Hanif is a Network Engineer specializing in MikroTik RouterOS, networking infrastructure, and cybersecurity. MTCNA & MTCTCE certified professional based in Yogyakarta, Indonesia.',
    ogTitle: 'Rizky Fauzan Hanif - Network Engineer | MikroTik Certified',
    ogDescription: 'Network Engineer specializing in MikroTik, networking, and cybersecurity. MTCNA & MTCTCE certified professional based in Yogyakarta, Indonesia.',
    ogImage: 'https://rizkyfauzan.id/og-image.png',
    twitterCard: 'summary_large_image',
})

useHead({
    htmlAttrs: {
        lang: 'en',
    },
})

const isModalOpen = ref(false)

const openModal = () => {
    isModalOpen.value = true
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
}

const closeModal = () => {
    isModalOpen.value = false
    // Restore body scroll
    document.body.style.overflow = ''
}

// Close modal on escape key
const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        closeModal()
    }
}

onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
    // Ensure body scroll is restored
    document.body.style.overflow = ''
})
</script>