<template>
    <div class="p-6">
        <PageHeader title="Credits"
            description="Acknowledgements and thanks to the people who inspired me in building this website." />

        <p class="mt-6 text-xl lg:text-2xl text-justify">The style and design of this website are inspired by
            <a href="https://miukyo.my.id" target="_blank" rel="noopener noreferrer" class="group"
                aria-label="Learn more about Miukyo's personal website">
                <span class="relative">
                    Miukyo's personal website
                    <span
                        class="absolute left-0 bottom-0 h-full w-full max-w-0 backdrop-invert transition-all group-hover:max-w-full" />
                </span>
            </a>.
        </p>
    </div>
</template>

<script setup lang="ts">
useSeoMeta({
    title: 'Credits - Rizky Fauzan Hanif',
    description: 'Professional certifications: MikroTik MTCNA, MTCTCE, and IPv6 Sage by Hurricane Electric. View verified networking and cybersecurity credentials.',
    ogTitle: 'Credits - Rizky Fauzan Hanif',
    ogDescription: 'MikroTik MTCNA, MTCTCE, and IPv6 Sage certifications. Professional networking credentials and achievements.',
    ogImage: 'https://rizkyfauzan.id/og-image.png',
})
</script>