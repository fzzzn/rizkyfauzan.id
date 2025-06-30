<script setup>
useSeoMeta({
    title: 'Certificates',
    description: 'Explore my professional certificates.',
})

const certificates = ref([
    {
        title: "Network Security Excellence Award",
        description: "Led implementation of enterprise-grade security protocols, reducing security incidents by 85% and protecting critical infrastructure across multiple data centers.",
        date: "2024",
        image: "/logo.png",
    },
    {
        title: "Infrastructure Optimization Champion",
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        date: "2023",
        image: "/logo.png",
    },
    {
        title: "Network Security Excellence Award",
        description: "Led implementation of enterprise-grade security protocols, reducing security incidents by 85% and protecting critical infrastructure across multiple data centers.",
        date: "2024",
        image: "/logo.png",
    },
    {
        title: "Infrastructure Optimization Champion",
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        date: "2023",
        image: "/logo.png",
    },
])

// Modal state
const isModalOpen = ref(false)
const selectedCertificate = ref(null)

const openModal = (certificate) => {
    selectedCertificate.value = certificate
    isModalOpen.value = true
    document.body.style.overflow = 'hidden'
}

const closeModal = () => {
    isModalOpen.value = false
    selectedCertificate.value = null
    document.body.style.overflow = ''
}

const handleKeydown = (event) => {
    if (event.key === 'Escape') {
        closeModal()
    }
}

onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
})
</script>

<template>
    <div class="p-6">
        <!-- Header -->
        <div class="mb-12">
            <h1 class="text-6xl md:text-8xl leading-[1.2] font-[antonio] uppercase font-bold">
                certificates
            </h1>
            <!-- <p class="text-xl md:text-xl text-gray-700 max-w-3xl">
                My certificates as a Network Engineer.
            </p> -->
        </div>

        <div class="mb-16">
            <div class="flex flex-wrap justify-center gap-6">
                <div
v-for="certificate in certificates" :key="certificate.id"
                     class="bg-white border border-gray-200 rounded-lg p-6 w-full md:w-80 lg:w-120 hover:shadow-lg transition-shadow">
                    <div class="flex flex-col gap-4">
                        <div>
                            <NuxtImg
:src="certificate.image" :alt="certificate.title"
                                     class="w-full aspect-[3/2] object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                                     @click="openModal(certificate)" />
                        </div>
                        <div>
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-sm text-gray-500">{{ certificate.date }}</span>
                            </div>
                            <h3 class="text-xl font-bold mb-2">{{ certificate.title }}</h3>
                            <p class="text-gray-700 leading-relaxed text-sm">{{ certificate.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <Teleport to="body">
            <div
v-if="isModalOpen && selectedCertificate"
                 class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
                 @click="closeModal">
                <div class="relative w-full max-w-4xl max-h-full">
                    <!-- Close button -->
                    <button
                        class="flex-shrink-0 flex items-center justify-center absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 transition-colors"
                        aria-label="Close modal"
                        @click="closeModal">
                        <Icon name="heroicons:x-mark" size="16" />
                    </button>
                    
                    <!-- Modal content -->
                    <div class="bg-white rounded-lg overflow-hidden w-full max-h-[90vh] flex flex-col" @click.stop>
                        <!-- Image - Fixed height -->
                        <div class="relative flex-shrink-0">
                            <NuxtImg
:src="selectedCertificate.image" 
                                     :alt="selectedCertificate.title"
                                     class="w-full object-cover h-48 md:h-64 lg:h-80" />
                        </div>
                        
                        <!-- Content - Scrollable -->
                        <div class="p-4 md:p-6 overflow-y-auto flex-1">
                            <div class="text-sm text-gray-500 mb-2">{{ selectedCertificate.date }}</div>
                            <h3 class="text-xl md:text-2xl lg:text-3xl font-bold mb-4">{{ selectedCertificate.title }}</h3>
                            <p class="text-gray-700 leading-relaxed text-base md:text-lg">{{ selectedCertificate.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<style scoped>
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>