<script lang="ts" setup>
useSeoMeta({
    title: 'Home',
    description: 'Network Engineer and student at SMKN 2 Depok Sleman. Specialized in MikroTik networking, cybersecurity, and infrastructure management with professional certifications.',
})
</script>

<template>
    <main
        class="lg:px-48 min-h-[83vh] flex-col gap-12 lg:gap-28 flex lg:flex-row lg:justify-between items-center justify-center">
        <section class="">
            <NuxtImg
                src="/avatar-with-bg.webp"
                alt="Avatar of Rizky Fauzan Hanif"
                class="object-cover w-[50vw] lg:w-[60vh] aspect-square rounded-xl"
                loading="eager"
                fetchpriority="high"
            />
        </section>
        <section class="text-center flex flex-col gap-1 lg:text-left">
            <h1 class="text-5xl md:text-6xl lg:text-8xl font-black font-[Antonio] uppercase">
                rizky fauzan hanif
            </h1>
            <h2 class="text-2xl md:text-4xl mt-3 font-semibold">Network Engineer</h2>
            <p
                class="mt-8 absolute left-0 text-sm md:text-base md:relative w-full bottom-5 flex flex-col md:flex-row items-center justify-between md:gap-3 font-bold">
                <span>Want to know more about me?</span>
                <span class="mt-1 h-0.5 grow bg-black hidden md:block" />
                <RouterLink to="/about" class="group" aria-label="Learn more about Rizky Fauzan Hanif">
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