<script setup>
useSeoMeta({
    title: 'Achievements',
    description: 'Explore my professional achievements and milestones.',
})

const achievements = ref([
    {
        title: "1st Place in the 2024 MikroTik Networking Olympiad",
        // description: "",
        date: "2024",
        image: "https://ik.imagekit.io/fauzan/certificates/sertifikat-ojm-2024",
    },
    {
        title: "3rd Place in the 2024 DIY Province ITNSA LKS",
        // description: "",
        date: "2024",
        image: "https://ik.imagekit.io/fauzan/certificates/sertifikat-lks-itnsa-2024",
    },
])
</script>

<template>
    <div class="p-6">
        <PageHeader 
            title="Achievements" 
            description="Explore my achievements" 
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