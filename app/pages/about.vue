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
            <nav data-intro="paragraph" aria-label="Explore more" class="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-lg lg:text-xl font-bold">
                <NuxtLink to="/certificates" class="underline underline-offset-4 decoration-1 hover:text-muted transition-colors">
                    View certifications
                </NuxtLink>
                <NuxtLink to="/achievements" class="underline underline-offset-4 decoration-1 hover:text-muted transition-colors">
                    See achievements
                </NuxtLink>
                <NuxtLink to="/contact" class="underline underline-offset-4 decoration-1 hover:text-muted transition-colors">
                    Get in touch
                </NuxtLink>
            </nav>
        </div>
        <div class="lg:flex-2/6">
            <button
                type="button"
                class="block w-full rounded-xl cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
                aria-label="View portrait photo full size"
                @click="openModal">
                <OptimizedImg
                    src="/fauzan-history.png"
                    data-intro="photo"
                    class="object-cover rounded-xl w-full lg:h-172 aspect-3/4 lg:grayscale lg:hover:grayscale-0 transition-all duration-200"
                    alt="Rizky Fauzan Hanif"
                    loading="eager"
                    fetchpriority="high" />
            </button>
        </div>

        <!-- Modal -->
        <PhotoModal
v-model:open="isModalOpen" src="/fauzan-history-full.png"
            alt="Rizky Fauzan Hanif - Full size" />
    </div></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

useAboutIntro()

useSeoMeta({
    title: 'About Me — Network Engineer',
    description: 'About Rizky Fauzan Hanif — Network Engineer in Yogyakarta specializing in MikroTik, cloud engineering, and cybersecurity. MTCNA, MTCTCE & IPv6 Sage.',
    ogTitle: 'About Rizky Fauzan Hanif — Network Engineer',
    ogDescription: 'Passionate Network Engineer with expertise in Kubernetes, Docker, BGP, VPNs, firewalls, and network security. Based in Yogyakarta, Indonesia.',
})

useSchemaOrg([
    defineWebPage({
        '@type': 'ProfilePage',
    }),
])

usePageOgImage('about', 'About Rizky Fauzan Hanif — Network Engineer')

const isModalOpen = ref(false)

const openModal = () => {
    isModalOpen.value = true
}
</script>