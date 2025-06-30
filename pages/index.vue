<script lang="ts" setup>
useSeoMeta({
    title: 'Home',
    description: 'Homepage',
})
</script>

<template>
    <div
        class="lg:px-48 min-h-[83vh] flex-col gap-12 lg:gap-28 flex lg:flex-row lg:justify-between items-center justify-center">
        <div class="">
            <NuxtImg src="/logo.png" class="object-cover w-[50vw] lg:w-[60vh] aspect-square rounded-xl" />
        </div>
        <div class="text-center flex flex-col gap-1 lg:text-left">
            <h1 class="text-5xl md:text-6xl lg:text-8xl font-black font-[Antonio] uppercase">rizky fauzan hanif</h1>
            <h2 class="text-2xl md:text-4xl mt-3 font-semibold">Network Engineer</h2>
            <p
                class="mt-8 absolute left-0 text-sm md:text-base md:relative w-full bottom-5 flex flex-col md:flex-row items-center justify-between md:gap-3 font-bold">
                <span>Want to know more about me?</span>
                <span class="mt-1 h-[2px] flex-grow bg-black hidden md:block"/>
                <RouterLink to="/about" class="group">
                    <span class="relative">
                        Learn more
                        <span
                            class="absolute left-0 bottom-0 h-full w-full max-w-0 backdrop-invert transition-all group-hover:max-w-full"/>
                    </span>
                </RouterLink>
            </p>
        </div>
    </div>
</template>