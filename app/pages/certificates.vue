<template>
    <div class="p-6">
        <PageHeader
            title="Certificates"
            description="Verified certifications in MikroTik networking, IPv6, cybersecurity, and cloud." />

        <div class="mb-12">
            <div class="flex flex-wrap justify-center gap-6">
                <ImageCard
                    v-for="certificate in certificates"
                    :key="certificate.id"
                    :item="certificate"
                    data-reveal
                />
            </div>
        </div>

        <section v-if="moreCertificates.length" class="max-w-5xl mx-auto mb-16" data-reveal>
            <h2 class="text-sm font-bold uppercase tracking-widest text-muted mb-4">
                Additional Certifications
            </h2>
            <ul class="divide-y divide-border border-t border-b border-border">
                <li
                    v-for="cert in moreCertificates"
                    :key="cert.name"
                    class="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                        <a
                            :href="cert.link"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-lg font-bold text-fg underline underline-offset-4 decoration-1 hover:text-muted transition-colors">
                            {{ cert.name }}
                        </a>
                        <p class="text-sm text-muted mt-0.5">{{ cert.issuer }}</p>
                    </div>
                    <span class="text-sm text-muted shrink-0">{{ cert.date }}</span>
                </li>
            </ul>
        </section>
    </div>
</template>

<script setup lang="ts">
import { featuredCertificates, additionalCertificates } from '~/data/resume'

useScrollReveal()

useSeoMeta({
    title: 'Certificates — MTCNA, MTCTCE & IPv6 Sage',
    description: 'Professional certifications: MikroTik MTCNA, MTCTCE, IPv6 Sage by Hurricane Electric, Google Cybersecurity, and Cloud credentials.',
    ogTitle: 'Certificates — MTCNA, MTCTCE & IPv6 Sage',
    ogDescription: 'MikroTik MTCNA, MTCTCE, IPv6 Sage, Google Cybersecurity, and Cloud certifications.',
})

useSchemaOrg([
    defineWebPage({
        '@type': 'CollectionPage',
    }),
])

usePageOgImage('certificates', 'Certificates — MTCNA, MTCTCE & IPv6 Sage')
usePageBreadcrumb('Certificates', '/certificates')

const certificates = featuredCertificates
const moreCertificates = additionalCertificates
</script>
