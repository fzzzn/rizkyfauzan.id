<template>
    <div class="h-full">
        <main class="h-full p-6 flex-col gap-8 lg:gap-24 flex lg:flex-row items-center justify-center">
            <section aria-label="Profile Photo of Rizky Fauzan Hanif">
                <img
ref="photoEl" src="https://assets.rizkyfauzan.id/avatar-with-bg.webp"
                    alt="Rizky Fauzan Hanif - Network Engineer and MikroTik Certified Professional"
                    width="500" height="500"
                    class="object-cover w-75 lg:w-125 aspect-square rounded-2xl cursor-pointer hover:opacity-90 transition-opacity duration-200" loading="eager" fetchpriority="high" @click="openModal">
            </section>
            <section class="text-center flex flex-col lg:text-left" aria-label="About Rizky Fauzan Hanif">
                <h1 ref="nameEl" class="text-4xl lg:text-8xl font-bold tracking-tighter">Rizky Fauzan Hanif</h1>
                <p ref="roleEl" class="text-2xl lg:text-4xl mt-3 font-bold tracking-tighter">Network Engineer</p>
                <div
                    ref="ctaEl"
                    class="mt-12 flex flex-col md:flex-row items-center justify-center lg:justify-between gap-3 text-sm lg:text-base font-bold">
                    <span>Want to know more about me?</span>
                    <span class="h-px grow bg-fg hidden md:block" aria-hidden="true" />
                    <RouterLink to="/about" class="group" aria-label="Learn more about Rizky Fauzan Hanif">
                        <span class="relative">
                            Learn more about me
                            <span
                                class="absolute left-0 bottom-0 h-full w-full max-w-0 backdrop-invert transition-all group-hover:max-w-full"
                                aria-hidden="true" />
                        </span>
                    </RouterLink>
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
let claimed: HTMLElement[] = []

/**
 * Entrance animation: photo first, then the name (word by word), the role, and
 * the call to action. Skipped when the visitor prefers reduced motion, in which
 * case the page is left in its final state and the text is never split.
 */
const playIntro = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || !nameEl.value) return

    const heading = nameEl.value

    // Claim these elements before animating. The head script's MutationObserver
    // (nuxt.config.ts) re-hides matched elements on a timeout after client-side
    // navigation; without the claim that late hide can land mid-animation and
    // leave the hero half-hidden. Same safeguard useAboutIntro uses.
    claimed = [photoEl.value, heading, roleEl.value, ctaEl.value].filter(Boolean) as HTMLElement[]
    claimed.forEach((element) => element.setAttribute('data-reveal-active', ''))

    // autoSplit re-runs onSplit when the line breaks change (e.g. resizing
    // between the mobile and desktop layouts), so the animation is rebuilt for
    // the new words instead of animating stale elements.
    nameSplit = SplitText.create(heading, {
        type: 'words',
        autoSplit: true,
        onSplit: (self: SplitText) => {
            introTimeline?.kill()

            introTimeline = gsap.timeline({
                defaults: { ease: 'power3.out' },
                // Release the claim once the intro settles so the head script's
                // hide rule can no longer match these elements.
                onComplete: () => claimed.forEach((element) => element.removeAttribute('data-reveal-active')),
            })

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
    // Kill the intro so no animation ticks after the page is gone, put the
    // split text back to its original markup, and drop any leftover claim.
    introTimeline?.kill()
    introTimeline = null
    nameSplit?.revert()
    nameSplit = null
    claimed.forEach((element) => element.removeAttribute('data-reveal-active'))
    claimed = []
})
</script>