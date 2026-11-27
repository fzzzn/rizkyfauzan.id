<template>
    <div class="p-6">
        <PageHeader
            title="Projects"
            description="Selected networking, infrastructure, and software projects." />

        <div class="max-w-5xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            <article
                v-for="project in projects"
                :key="project.title"
                data-reveal
                class="bg-surface border border-border rounded-xl p-6 flex flex-col justify-between gap-5 hover:shadow-lg transition-shadow">
                <div>
                    <div class="flex items-start justify-between gap-3 mb-2">
                        <span class="text-xs font-mono uppercase tracking-wider text-muted">{{ project.role }}</span>
                        <span class="text-xs font-mono text-muted shrink-0">{{ project.period }}</span>
                    </div>
                    <h2 class="text-2xl font-bold text-fg mb-3">
                        <a
                            v-if="project.link"
                            :href="project.link"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="underline underline-offset-4 decoration-1 hover:text-muted transition-colors inline-flex items-center gap-1.5">
                            <span>{{ project.title }}</span>
                            <Icon name="heroicons:arrow-up-right" size="16" aria-hidden="true" />
                        </a>
                        <span v-else>{{ project.title }}</span>
                    </h2>
                    <p class="text-secondary leading-relaxed text-sm sm:text-base mb-4">
                        {{ project.summary }}
                    </p>
                    <ul class="space-y-1.5 text-sm text-secondary list-disc list-inside">
                        <li v-for="point in project.highlights" :key="point">
                            {{ point }}
                        </li>
                    </ul>
                </div>

                <div class="flex flex-wrap gap-2 pt-4 border-t border-border">
                    <span
                        v-for="tag in project.stack"
                        :key="tag"
                        class="text-xs font-mono px-2.5 py-1 rounded-md border border-border text-muted">
                        {{ tag }}
                    </span>
                </div>
            </article>
        </div>
    </div>
</template>

<script setup lang="ts">
import { featuredProjects } from '~/data/resume'

useScrollReveal()

useSeoMeta({
    title: 'Projects — Networking, Cloud & DevOps',
    description: 'Networking, virtualization, and DevOps projects by Rizky Fauzan Hanif: VyOS 10G routing, IPv6, Proxmox, MikroTik, and CI/CD pipelines.',
    ogTitle: 'Projects — Rizky Fauzan Hanif',
    ogDescription: 'Selected networking, infrastructure, and software projects in VyOS, MikroTik, Proxmox, IPv6, and Nuxt.',
})

useSchemaOrg([
    defineWebPage({
        '@type': 'CollectionPage',
    }),
])

usePageOgImage('projects', 'Projects — Rizky Fauzan Hanif')

const projects = featuredProjects
</script>
