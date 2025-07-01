<script setup>
useSeoMeta({
    title: 'Certificates',
    description: 'Explore my professional certificates.',
})

const certificates = ref([
    {
        title: "Mikrotik Certified Network Associate (MTCNA)",
        // date: "",
        image: "https://ik.imagekit.io/fauzan/certificates/Sertifikat%20MTCNA.png",
    },
    {
        title: "Mikrotik Certified Traffic Control Engineer (MTCTCE)",
        // description: "",
        // date: "",
        image: "https://ik.imagekit.io/fauzan/certificates/Sertifikat%20MTCTCE.png",
    },
    {
        title: "IPv6 Sage by Hurricane Electric",
        // description: "",
        // date: "",
        image: "https://ik.imagekit.io/fauzan/certificates/ipv6-certificate.png",
    },
])
</script>

<template>
    <div class="p-6">
        <PageHeader 
            title="Certificates" 
            description="Explore my professional certificates" 
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