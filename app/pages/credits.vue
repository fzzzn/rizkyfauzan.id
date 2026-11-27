<template>
    <div class="p-6">
        <div class="max-w-5xl mx-auto">
            <PageHeader
title="Credits"
                description="Acknowledgements and thanks to the people and projects that made this website possible." />

            <div class="grid gap-x-12 gap-y-10 sm:grid-cols-2">
                <section v-for="group in creditGroups" :key="group.title" data-reveal>
                    <h2 class="text-sm font-bold uppercase tracking-widest text-muted">{{ group.title }}</h2>
                    <ul class="mt-4 space-y-2 text-lg">
                        <li v-for="item in group.items" :key="item.label">
                            <a
v-if="item.href" :href="item.href" target="_blank" rel="noopener noreferrer"
                                class="underline underline-offset-4 decoration-1 hover:text-muted transition-colors">
                                {{ item.label }}
                            </a>
                            <span v-else class="font-bold">{{ item.label }}</span>
                            <span v-if="item.note" class="text-muted"> — {{ item.note }}</span>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
useScrollReveal()

interface CreditItem {
    label: string
    href?: string
    note?: string
}

interface CreditGroup {
    title: string
    items: CreditItem[]
}

const creditGroups: CreditGroup[] = [
    {
        title: 'Design',
        items: [
            {
                label: "Miukyo's personal website",
                href: 'https://miukyo.my.id',
                note: 'design inspiration',
            },
        ],
    },
    {
        title: 'Built with',
        items: [
            { label: 'Nuxt', href: 'https://nuxt.com', note: 'framework' },
            { label: 'Vue', href: 'https://vuejs.org', note: 'UI' },
            { label: 'Tailwind CSS', href: 'https://tailwindcss.com', note: 'styling' },
            { label: 'GSAP', href: 'https://gsap.com', note: 'animation' },
            { label: 'TypeScript', href: 'https://www.typescriptlang.org', note: 'types' },
        ],
    },
    {
        title: 'Type & icons',
        items: [
            { label: 'Inter, Antonio & JetBrains Mono', href: 'https://fonts.google.com', note: 'Google Fonts' },
            { label: 'Heroicons, Line MD & Simple Icons', href: 'https://iconify.design', note: 'Iconify' },
        ],
    },
    {
        title: 'Services',
        items: [
            { label: 'Cloudflare Pages', href: 'https://pages.cloudflare.com', note: 'hosting' },
            { label: 'Supabase', href: 'https://supabase.com', note: 'guestbook' },
            { label: 'ImageKit', href: 'https://imagekit.io', note: 'images' },
            { label: 'Umami', href: 'https://umami.is', note: 'analytics' },
        ],
    },
]

useSeoMeta({
    title: 'Credits — Website Design',
    description: 'Credits for the design, open-source software, fonts, icons, and services behind rizkyfauzan.id, the personal website of Rizky Fauzan Hanif.',
    ogTitle: 'Credits — rizkyfauzan.id',
    ogDescription: 'Design inspiration, open-source software, fonts, icons, and services behind rizkyfauzan.id.',
})

usePageOgImage('credits', 'Credits — rizkyfauzan.id')
</script>
