<script setup>
useSeoMeta({
    title: 'Certificates',
    description: 'Explore my professional certificates.',
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