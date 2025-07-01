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
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        date: "2023",
        image: "/logo.png",
    },
])
</script>

<template>
    <div class="p-6">
        <PageHeader 
            title="Achievements" 
            description="Explore my professional achievements" 
        />

        <div class="mb-16">
            <div class="flex flex-wrap justify-center gap-6 items-stretch">
                <ImageCard
                    v-for="achievement in achievements" 
                    :key="achievement.id"
                    :item="achievement"
                />
            </div>
        </div>
    </div>
</template>