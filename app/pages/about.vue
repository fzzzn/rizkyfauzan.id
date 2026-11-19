<template>
    <div class="h-full">
    <div class="h-full p-6 flex flex-col items-center justify-center lg:flex-row gap-8 lg:justify-end lg:items-start">
        <div class="lg:flex-4/6">
            <h1 data-intro="heading" class="text-6xl md:text-8xl leading-[1.2] lg:-mt-4 font-[antonio] uppercase font-bold">
                Hi, I am Rizky Fauzan Hanif!
            </h1>
            <p data-intro="paragraph" class="mt-6 text-xl lg:text-2xl text-justify">
                A passionate Network Engineer with interests in Cloud Engineering and
                Cybersecurity, based in Sleman, Special Region of Yogyakarta. Currently, I am a student at SMK
                Negeri 2 Depok Sleman. I enjoy exploring and learning new technologies such as Kubernetes, Docker,
                virtualization, BGP, VPNs, firewalls, traffic control, IPv6, and network security.
            </p>
            <p data-intro="paragraph" class="mt-6 text-xl lg:text-2xl text-justify">
                To deepen my knowledge, I have earned MikroTik Certified Network Associate (MTCNA), MikroTik
                Certified Traffic Control Engineer (MTCTCE), and IPv6 Sage by Hurricane Electric, as well as
                additional certifications in programming, cybersecurity, and cloud computing.
            </p>
            <p data-intro="paragraph" class="mt-6 text-xl lg:text-2xl text-justify">
                I care about infrastructure that is reliable, maintainable, and scalable.
            </p>
        </div>
        <div class="lg:flex-2/6">
            <OptimizedImg src="/fauzan-history.png" data-intro="photo"
                class="object-cover rounded-xl w-full lg:h-172 aspect-3/4 cursor-pointer lg:grayscale lg:hover:grayscale-0 transition-all duration-200" alt="Rizky Fauzan Hanif"
                loading="eager" fetchpriority="high" @click="openModal" />
        </div>

        <!-- Modal -->
        <ClientOnly>
            <Teleport to="body">
                <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
                    @click="closeModal">
                    <!-- The padding leaves room for the close button and, more
                         importantly, keeps it off the photo. Pinned to the
                         photo it sat over the image, and the backdrop's dark
                         circle was invisible against the dark photo. -->
                    <div class="relative max-w-6xl max-h-full p-3 pt-15">
                        <!-- Close button -->
                        <button
                            class="absolute top-3 right-3 z-20 w-9 h-9 bg-white text-black hover:bg-white/85 rounded-full transition duration-200 flex items-center justify-center cursor-pointer"
                            aria-label="Close modal" @click.stop="closeModal">
                            <Icon name="heroicons:x-mark" size="18" />
                        </button>

                        <!-- Modal image. Explicit width/height keep the photo
                             at its own aspect ratio instead of stretching to
                             the srcset's size hint and spilling under the
                             close button. -->
                        <OptimizedImg src="/fauzan-history-full.png"
                            class="block w-auto h-auto max-w-full max-h-[80vh] object-contain rounded-2xl"
                            alt="Rizky Fauzan Hanif - Full size" @click.stop />
                    </div>
                </div>
            </Teleport>
        </ClientOnly>
    </div></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

useAboutIntro()

useSeoMeta({
    title: 'About Me',
    description: 'Learn about Rizky Fauzan Hanif, a passionate Network Engineer specializing in MikroTik, cloud engineering, and cybersecurity with MTCNA, MTCTCE, and IPv6 Sage certifications.',
    ogTitle: 'About - Rizky Fauzan Hanif',
    ogDescription: 'Passionate Network Engineer with expertise in Kubernetes, Docker, BGP, VPNs, firewalls, and network security. Based in Yogyakarta, Indonesia.',
    ogImage: 'https://rizkyfauzan.id/og-image.png',
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