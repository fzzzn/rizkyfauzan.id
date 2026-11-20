<template>
    <div class="p-6">
        <PageHeader title="Credits"
            description="Acknowledgements and thanks to the people who inspired me in building this website." />

        <p data-reveal class="mt-6 text-xl lg:text-2xl text-center">The style and design of this website are inspired by
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
useScrollReveal()

useSeoMeta({
    title: 'Credits',
    description: 'Credits and acknowledgements for the design and inspiration behind rizkyfauzan.id, the personal website of Rizky Fauzan Hanif.',
    ogTitle: 'Credits - Rizky Fauzan Hanif',
    ogDescription: 'Acknowledgements and thanks to the people who inspired the design of rizkyfauzan.id.',
})
</script>