<script lang="ts" setup>
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
</script>

<template>
    <main
        class="lg:px-48 min-h-[83vh] flex-col gap-12 lg:gap-28 flex lg:flex-row lg:justify-between items-center justify-center">
        <section aria-label="Profile Photo of Rizky Fauzan Hanif">
            <NuxtImg
                src="/avatar-with-bg.webp"
                alt="Rizky Fauzan Hanif - Network Engineer and MikroTik Certified Professional"
                class="object-cover w-[50vw] lg:w-[60vh] aspect-square rounded-xl"
                loading="eager"
                fetchpriority="high"
            />
        </section>
        <section class="text-center flex flex-col gap-1 lg:text-left" aria-label="About Rizky Fauzan Hanif">
            <h1 class="text-5xl md:text-6xl lg:text-8xl font-black font-[Antonio] uppercase">
                Rizky Fauzan Hanif
            </h1>
            <h2 class="text-2xl md:text-4xl mt-3 font-semibold">Network Engineer</h2>
            <h3 class="text-base md:text-lg mt-2 text-gray-600">MikroTik Certified (MTCNA & MTCTCE)</h3>
            <p class="mt-4 text-base md:text-lg text-gray-700 max-w-xl">
                Specializing in MikroTik RouterOS, network infrastructure, IPv6, and cybersecurity solutions. Based in Yogyakarta, Indonesia.
            </p>
            <p
                class="mt-8 absolute left-0 text-sm md:text-base md:relative w-full bottom-5 flex flex-col md:flex-row items-center justify-between md:gap-3 font-bold">
                <span>Want to know more about me?</span>
                <span class="mt-1 h-0.5 grow bg-black hidden md:block" />
                <RouterLink to="/about" class="group" aria-label="Learn more about Rizky Fauzan Hanif, Network Engineer">
                    <span class="relative">
                        Learn more about me
                        <span
                            class="absolute left-0 bottom-0 h-full w-full max-w-0 backdrop-invert transition-all group-hover:max-w-full" />
                    </span>
                </RouterLink>
            </p>
        </section>
    </main>
</template>