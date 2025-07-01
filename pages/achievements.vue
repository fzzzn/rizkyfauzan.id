<script setup>
useSeoMeta({
    title: 'Achievements',
    description: 'Explore my professional achievements and milestones.',
})

const achievements = ref([
    {
        title: "Juara 1 Olimpiade Jaringan MikroTik 2024",
        // description: "",
        date: "2024",
        image: "https://ik.imagekit.io/fauzan/certificates/sertifikat-ojm-2024",
    },
    {
        title: "Juara 3 LKS ITNSA Provinsi DIY 2024",
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