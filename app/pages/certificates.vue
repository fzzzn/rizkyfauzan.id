<script setup>
useSeoMeta({
    title: 'Certificates - Rizky Fauzan Hanif',
    description: 'Professional certifications: MikroTik MTCNA, MTCTCE, and IPv6 Sage by Hurricane Electric. View verified networking and cybersecurity credentials.',
    ogTitle: 'Certificates - Rizky Fauzan Hanif',
    ogDescription: 'MikroTik MTCNA, MTCTCE, and IPv6 Sage certifications. Professional networking credentials and achievements.',
    ogImage: 'https://rizkyfauzan.id/og-image.png',
})

const certificates = ref([
    {
        title: "Mikrotik Certified Network Associate (MTCNA)",
        date: "10 October 2024",
        image: "https://ik.imagekit.io/fauzan/certificates/Sertifikat%20MTCNA%20Citraweb.png?updatedAt=1729822824599",
    },
    {
        title: "Mikrotik Certified Traffic Control Engineer (MTCTCE)",
        date: "10 October 2024",
        image: "https://ik.imagekit.io/fauzan/certificates/Sertifikat%20MTCTCE.png?updatedAt=1729822824599",
    },
    {
        title: "IPv6 Sage by Hurricane Electric",
        date: "29 January 2025",
        image: "https://ik.imagekit.io/fauzan/certificates/ipv6-certificate.png?updatedAt=1729822824599",
    },
])
</script>

<template>
    <div class="p-6">
        <PageHeader 
            title="Certificates" 
            description="" 
        />

        <div class="mb-16">
            <div class="flex flex-wrap justify-center gap-6">
                <ImageCard
                    v-for="certificate in certificates" 
                    :key="certificate.id"
                    :item="certificate"
                />
            </div>
        </div>
    </div>
</template>