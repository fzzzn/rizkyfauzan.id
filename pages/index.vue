<script lang="ts" setup>
useSeoMeta({
    title: 'Home',
    description: 'Homepage',
})
</script>

<template>
    <div class="lg:px-48 min-h-[83vh] flex-col gap-12 lg:gap-28 flex lg:flex-row lg:justify-between items-center justify-center">
        <div class="">
            <NuxtImg src="/logo.png" class="object-cover w-[50vw] lg:w-[60vh] aspect-square rounded-xl" />
        </div>
        <div class="text-center flex flex-col gap-1 lg:text-left">
            <h1 class="text-5xl md:text-6xl lg:text-8xl font-black font-[Antonio] uppercase">rizky fauzan hanif</h1>
            <h2 class="text-2xl md:text-4xl mt-3 font-semibold">Network Engineer</h2>
        </div>
    </div>
</template>