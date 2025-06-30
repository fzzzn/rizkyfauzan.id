<script setup>
useSeoMeta({
    title: 'Achievements',
    description: 'Explore my professional achievements and milestones.',
})

const achievements = ref([
    {
        title: "Network Security Excellence Award",
        description: "Led implementation of enterprise-grade security protocols, reducing security incidents by 85% and protecting critical infrastructure across multiple data centers.",
        date: "2024",
        image: "/logo.png",
    },
    {
        title: "Infrastructure Optimization Champion",
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        date: "2023",
        image: "/logo.png",
    },
   
])

</script>

<template>
    <div class="p-6">
        <!-- Header -->
        <div class="mb-12">
            <h1 class="text-6xl md:text-8xl leading-[1.2] font-[antonio] uppercase font-bold">
                Achievements
            </h1>
            <!-- <p class="text-xl md:text-xl text-gray-700 max-w-3xl">
                My achievements as a Network Engineer.
            </p> -->
        </div>

        <div class="mb-16">
            <div class="flex flex-wrap justify-center gap-6">
                <div
v-for="achievement in achievements" :key="achievement.id"
                     class="bg-white border border-gray-200 rounded-lg p-6 w-full md:w-80 lg:w-120 hover:shadow-lg transition-shadow">
                    <div class="flex flex-col gap-4">
                        <div>
                            <NuxtImg
:src="achievement.image" :alt="achievement.title"
                                     class="w-full aspect-[3/2] object-cover rounded-lg" />
                        </div>
                        <div>
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-sm text-gray-500">{{ achievement.date }}</span>
                            </div>
                            <h3 class="text-xl font-bold mb-2">{{ achievement.title }}</h3>
                            <p class="text-gray-700 leading-relaxed text-sm">{{ achievement.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>