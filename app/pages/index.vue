<template>
    <div class="h-full">
        <main class="h-full p-6 flex-col gap-8 lg:gap-24 flex lg:flex-row items-center justify-center">
            <section aria-label="Profile Photo of Rizky Fauzan Hanif">
                <img ref="photoEl" src="https://assets.rizkyfauzan.id/avatar-with-bg.webp"
                    alt="Rizky Fauzan Hanif - Network Engineer and MikroTik Certified Professional"
                    width="500" height="500"
                    class="object-cover w-75 lg:w-125 aspect-square rounded-2xl cursor-pointer" loading="eager" fetchpriority="high" @click="openModal">
            </section>
            <section class="text-center flex flex-col lg:text-left" aria-label="About Rizky Fauzan Hanif">
                <h1 ref="nameEl" class="text-4xl lg:text-8xl font-bold tracking-tighter">Rizky Fauzan Hanif</h1>
                <h2 ref="roleEl" class="text-2xl lg:text-4xl mt-2 font-bold tracking-tighter">Network Engineer</h2>
                <div class="flex flex-col">
                    <p
                        ref="ctaEl"
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
                        <img src="https://assets.rizkyfauzan.id/avatar-with-bg.webp"
                            width="500" height="500"
                            class="max-w-full max-h-[90vh] object-contain rounded-2xl" alt="Rizky Fauzan Hanif - Full size"
                            @click.stop>
                    </div>
                </div>
            </Teleport>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'

useSeoMeta({
    title: 'Network Engineer | MikroTik MTCNA & MTCTCE Certified',
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

const photoEl = ref<HTMLElement | null>(null)
const nameEl = ref<HTMLElement | null>(null)
const roleEl = ref<HTMLElement | null>(null)
const ctaEl = ref<HTMLElement | null>(null)

/**
 * Wrap every word of an element in a span so it can be animated on its own.
 * The spaces are preserved as text nodes, so the layout and screen-reader
 * output stay the same. Returns the word spans.
 */
const splitWords = (element: HTMLElement): HTMLElement[] => {
    const words = (element.textContent ?? '').trim().split(/\s+/)
    element.textContent = ''

    return words.map((word, index) => {
        const span = document.createElement('span')
        span.textContent = word
        // Inline-block so each word can be transformed independently.
        span.style.display = 'inline-block'

        element.appendChild(span)
        if (index < words.length - 1) element.appendChild(document.createTextNode(' '))

        return span
    })
}

let introTimeline: gsap.core.Timeline | null = null

/**
 * Entrance animation: photo first, then the name, role, and call to action.
 * Skipped when the visitor prefers reduced motion, in which case the page is
 * simply left in its final state.
 */
const playIntro = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const words = nameEl.value ? splitWords(nameEl.value) : []

    introTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

    if (photoEl.value) {
        introTimeline.from(photoEl.value, {
            opacity: 0,
            scale: 0.94,
            y: 24,
            duration: 0.9,
            clearProps: 'transform,opacity',
        }, 0)
    }

    if (words.length) {
        introTimeline.from(words, {
            y: '0.6em',
            opacity: 0,
            duration: 0.7,
            stagger: 0.07,
            clearProps: 'transform,opacity',
        }, 0.15)
    }

    if (roleEl.value) {
        introTimeline.from(roleEl.value, {
            y: 16,
            opacity: 0,
            duration: 0.6,
            clearProps: 'transform,opacity',
        }, 0.45)
    }

    if (ctaEl.value) {
        introTimeline.from(ctaEl.value, {
            y: 12,
            opacity: 0,
            duration: 0.5,
            clearProps: 'transform,opacity',
        }, 0.6)
    }
}

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
    playIntro()
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
    // Kill the intro so no animation ticks after the page is gone, and put the
    // name back to plain text in case this component is ever kept alive.
    introTimeline?.kill()
    introTimeline = null
    // Ensure body scroll is restored
    document.body.style.overflow = ''
})
</script>