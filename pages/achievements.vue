<script setup>
useSeoMeta({
    title: 'Achievements',
    description: 'Explore my professional achievements.',
})

const achievements = ref([
    {
        id: 1,
        title: "Network Security Excellence",
        description: "Led implementation of enterprise-grade security protocols",
        date: "2024",
        image: "logo.png"
    },
    {
        id: 2,
        title: "Infrastructure Optimization",
        description: "Reduced network latency by 40% through strategic optimization",
        date: "2023",
        image: "logo.png"
    },
    {
        id: 3,
        title: "Team Leadership Award",
        description: "Recognized for outstanding team management and project delivery",
        date: "2023",
        image: "logo.png"
    },
    {
        id: 4,
        title: "Innovation in Networking",
        description: "Developed custom solutions for complex network challenges",
        date: "2022",
        image: "logo.png"
    }
])
</script>

<template>
    <div class="p-6">
        <h1 class="text-3xl font-bold mb-8">
            Achievements
        </h1>

        <cardCarousel 
            :items="achievements" 
            :auto-slide-delay="4000"
            :enable-modal="true"
        >
            <template #default="{ item }">
                <div class="bg-white border border-gray-200 rounded-lg p-6">
                    <div class="flex flex-col md:flex-row gap-6">
                        <div class="md:w-1/3">
                            <NuxtImg
                                :src="item.image" 
                                :alt="item.title"
                                class="w-full h-48 object-cover rounded-lg" />
                        </div>
                        <div class="md:w-2/3">
                            <div class="text-sm text-gray-500 mb-0.5">{{ item.date }}</div>
                            <h3 class="text-2xl font-bold mb-1.5">{{ item.title }}</h3>
                            <p class="text-gray-700 leading-relaxed">{{ item.description }}</p>
                        </div>
                    </div>
                </div>
            </template>
        </cardCarousel>
    </div>
</template>