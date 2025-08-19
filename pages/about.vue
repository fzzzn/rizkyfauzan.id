<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

useSeoMeta({
    title: 'About Me',
    description: 'Learn about Rizky Fauzan Hanif, a passionate Network Engineer student at SMKN 2 Depok Sleman with certifications in MikroTik MTCNA, MTCTCE, and IPv6 Sage.',
})

const isModalOpen = ref(false)

const openModal = () => {
    isModalOpen.value = true
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
}

const closeModal = () => {
    isModalOpen.value = false
    // Restore body scroll
    document.body.style.overflow = ''
}

// Close modal on escape key
const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        closeModal()
    }
}

onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
    // Ensure body scroll is restored
    document.body.style.overflow = ''
})
</script>

<template>
    <div>
        <div
            class="p-8 mb-12 flex flex-col-reverse items-center justify-center lg:flex-row gap-2 lg:gap-10 lg:justify-end lg:items-start">
            <div class="lg:flex-4/6">
                <h1 class="text-6xl md:text-8xl leading-[1.2] font-[antonio] uppercase font-bold">
                    Hi, I am Rizky Fauzan Hanif!
                </h1>
                <p class="mt-6 text-xl lg:text-2xl text-justify">
                    A passionate Network Engineer with interests in Cloud Engineering and
                    Cybersecurity, based in Sleman, Special Region of Yogyakarta. Currently, I am a student at SMK
                    Negeri 2 Depok Sleman. I enjoy exploring and learning new technologies such as Kubernetes, Docker,
                    virtualization, BGP, VPNs, firewalls, traffic control, IPv6, and network security.
                </p>
                <p class="mt-6 text-xl lg:text-2xl text-justify">
                    To deepen my knowledge, I have earned MikroTik Certified Network Associate (MTCNA), MikroTik
                    Certified Traffic Control Engineer (MTCTCE), and IPv6 Sage by Hurricane Electric, as well as
                    additional certifications in programming, cybersecurity, and cloud computing.
                </p>
                <p class="mt-6 text-xl lg:text-2xl text-justify">
                    I care about infrastructure that is reliable, maintainable, and scalable.
                </p>
            </div>
            <div class="lg:flex-2/6">
                <NuxtImg
src="/avatar.png"
                    class="object-cover rounded-xl h-full w-full lg:h-[75vh] aspect-[5/3] lg:aspect-[3/4] cursor-pointer hover:opacity-90 transition-opacity"
                    alt="Rizky Fauzan Hanif" @click="openModal" />
            </div>
        </div>

        <!-- Modal -->
        <Teleport to="body">
            <div
v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
                @click="closeModal">
                <div class="relative max-w-6xl max-h-full">
                    <!-- Close button -->
                    <button
                        class="absolute top-4 right-4 z-20 w-8 h-8 bg-black hover:bg-black/80 text-white rounded-full transition duration-200 flex items-center justify-center cursor-pointer"
                        aria-label="Close modal" @click.stop="closeModal">
                        <Icon name="heroicons:x-mark" size="16" />
                    </button>

                    <!-- Modal image -->
                    <NuxtImg
src="/avatar.png" class="max-w-full max-h-[90vh] object-contain rounded-2xl"
                        alt="Rizky Fauzan Hanif - Full size" @click.stop />
                </div>
            </div>
        </Teleport>
    </div>
</template>