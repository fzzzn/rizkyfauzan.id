<template>
    <div class="p-6">
        <PageHeader 
            title="Achievements" 
        />

        <div class="mb-16">
            <div class="flex flex-wrap justify-center gap-6 items-stretch">
                <ImageCard
                    v-for="achievement in achievements"
                    :key="achievement.id"
                    :item="achievement"
                    data-reveal
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

useScrollReveal()

useSeoMeta({
    title: 'Achievements — MikroTik Olympiad Winner',
    description: '1st Place MikroTik Networking Olympiad 2024, 3rd Place LKS ITNSA DIY Province 2025. Explore professional achievements and milestones of Rizky Fauzan Hanif.',
    ogTitle: 'Achievements — MikroTik Olympiad Winner',
    ogDescription: 'Competition wins and professional milestones including 1st Place MikroTik Networking Olympiad and LKS ITNSA achievements.',
})

const achievements = ref([
    {
        id: 1,
        title: "1st Place in the 2024 MikroTik Networking Olympiad",
        // description: "",
        date: "2024",
        image: "https://ik.imagekit.io/fauzan/certificates/sertifikat-ojm-2024?updatedAt=1729822824599",
    },
    {
        id: 2,
        title: "3rd Place in the 2025 DIY Province ITNSA LKS",
        // description: "",
        date: "2025",
        image: "https://ik.imagekit.io/fauzan/certificates/sertifikat-lks-itnsa-2025?updatedAt=1729822824599",
    },
])
</script>