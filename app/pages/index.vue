<template>
    <div class="h-full">
        <main class="h-full p-6 flex-col gap-8 lg:gap-24 flex lg:flex-row items-center justify-center">
            <section aria-label="Profile Photo of Rizky Fauzan Hanif">
                <img
ref="photoEl" src="https://assets.rizkyfauzan.id/avatar-with-bg.webp"
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
        <PhotoModal
v-model:open="isModalOpen" src="https://assets.rizkyfauzan.id/avatar-with-bg.webp"
            alt="Rizky Fauzan Hanif - Full size" />
    </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

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

let introTimeline: gsap.core.Timeline | null = null
let nameSplit: SplitText | null = null

/**
 * Entrance animation: photo first, then the name (word by word), the role, and
 * the call to action. Skipped when the visitor prefers reduced motion, in which
 * case the page is left in its final state and the text is never split.
 */
const playIntro = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || !nameEl.value) return

    const heading = nameEl.value

    // autoSplit re-runs onSplit when the line breaks change (e.g. resizing
    // between the mobile and desktop layouts), so the animation is rebuilt for
    // the new words instead of animating stale elements.
    nameSplit = SplitText.create(heading, {
        type: 'words',
        autoSplit: true,
        onSplit: (self: SplitText) => {
            introTimeline?.kill()

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

            introTimeline.from(self.words, {
                y: '0.6em',
                opacity: 0,
                duration: 0.7,
                stagger: 0.07,
                clearProps: 'transform,opacity',
            }, 0.15)

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

            return introTimeline
        },
    })
}

const openModal = () => {
    isModalOpen.value = true
}

onMounted(() => {
    playIntro()
})

onUnmounted(() => {
    // Kill the intro so no animation ticks after the page is gone, and put the
    // split text back to its original markup.
    introTimeline?.kill()
    introTimeline = null
    nameSplit?.revert()
    nameSplit = null
})
</script>