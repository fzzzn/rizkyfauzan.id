<template>
    <div class="p-6">
        <PageHeader
            title="Achievements"
            description="Competition wins and milestones in networking and cloud computing." />

        <div class="mb-12">
            <div class="flex flex-wrap justify-center gap-6 items-stretch">
                <ImageCard
                    v-for="achievement in achievements"
                    :key="achievement.id"
                    :item="achievement"
                    data-reveal
                />
            </div>
        </div>

        <section v-if="moreAchievements.length" class="max-w-5xl mx-auto mb-16" data-reveal>
            <h2 class="text-sm font-bold uppercase tracking-widest text-muted mb-4">
                Recent Milestones
            </h2>
            <ul class="divide-y divide-border border-t border-b border-border">
                <li
                    v-for="item in moreAchievements"
                    :key="item.id"
                    class="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <span class="text-lg font-bold text-fg">{{ item.title }}</span>
                    <span class="text-sm text-muted shrink-0">{{ item.date }}</span>
                </li>
            </ul>
        </section>
    </div>
</template>

<script setup lang="ts">
import { featuredAchievements, additionalAchievements } from '~/data/resume'

useScrollReveal()

useSeoMeta({
    title: 'Achievements — MikroTik Olympiad Winner',
    description: '1st Place MikroTik Networking Olympiad 2024, 3rd Place LKS ITNSA DIY 2025, and 2nd Place LKS Cloud Computing DIY 2026 — achievements of Rizky Fauzan Hanif.',
    ogTitle: 'Achievements — MikroTik Olympiad Winner',
    ogDescription: 'Competition wins and professional milestones including MikroTik Networking Olympiad, LKS ITNSA, and LKS Cloud Computing.',
})

useSchemaOrg([
    defineWebPage({
        '@type': 'CollectionPage',
    }),
])

const achievements = featuredAchievements
const moreAchievements = additionalAchievements
</script>
