<script lang="ts" setup>
useSeoMeta({
    title: 'Home',
    description: 'Homepage',
})
</script>

<template>
    <div class="p-6 pt-24 flex flex-col items-center gap-6 justify-center">
        <div class="">
            <NuxtImg
                src="/logo.png"
                class="object-cover aspect-square rounded-full w-[250px]" />
        </div>
        <div>
            <h1 class="text-3xl font-bold capitalize">rizky fauzan hanif</h1>
        </div>
    </div>
</template>