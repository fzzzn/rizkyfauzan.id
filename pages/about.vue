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
            class="p-8 flex flex-col-reverse items-center justify-center lg:flex-row gap-2 lg:gap-10 lg:justify-end lg:items-start">
            <div class="lg:flex-4/6">
                <h1 class="text-6xl md:text-8xl leading-[1.2] font-[antonio] uppercase font-bold">
                    Hi, I am Rizky Fauzan Hanif!
                </h1>
                <p class="mt-6 text-xl lg:text-2xl text-justify">
                    A passionate student at SMKN 2 Depok Sleman, dedicated to mastering networking, DevOps and
                    cybersecurity. I am fascinated by the power of networking technologies, from tunneling to building
                    secure infrastructures.
                </p>
                <p class="mt-6 text-xl lg:text-2xl text-justify">
                    To deepen my knowledge, I earned the MikroTik Certified Network Associate (MTCNA), MikroTik
                    Certified Traffic Control Engineer (MTCTCE), and IPv6 Sage by Hurricane Electric, honing my skills
                    in network setup, configuration, and troubleshooting.
                </p>
                <p class="mt-6 text-xl lg:text-2xl text-justify">
                    With a strong focus on network engineering and security, I am constantly exploring new technologies
                    to design secure, scalable networks. I've also earned certifications in cybersecurity and cloud
                    computing, further strengthening my technical foundation.
                </p>
                <p class="mt-6 text-xl lg:text-2xl text-justify">
                    I am eager to take on complex networking challenges and contribute to innovative, cutting-edge
                    solutions in the field!
                </p>
            </div>
            <div class="lg:flex-2/6">
                <NuxtImg
src="/logo.png"
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
src="/logo.png" class="max-w-full max-h-[90vh] object-contain rounded-2xl"
                        alt="Rizky Fauzan Hanif - Full size" @click.stop />
                </div>
            </div>
        </Teleport>
    </div>
</template>