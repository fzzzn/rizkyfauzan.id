<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

useSeoMeta({
    title: 'About Me',
    description: 'Learn more about Rizky Fauzan Hanif.',
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
                <p class="mt-6 text-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sit debitis sed rerum inventore
                    possimus
                    repellendus fuga molestias culpa mollitia quam, vel nam similique laudantium cupiditate laboriosam
                    consequuntur quo itaque, asperiores quia! Itaque expedita ratione dolorum. Magnam temporibus,
                    perspiciatis
                    sunt praesentium maxime quisquam architecto neque, eveniet obcaecati fuga nobis omnis deserunt
                    consectetur
                    rem, amet nulla exercitationem sit nisi minima facilis ullam reiciendis.
                </p>
                <p class="mt-6 text-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sit debitis sed rerum inventore
                    possimus
                    repellendus fuga molestias culpa mollitia quam, vel nam similique laudantium cupiditate laboriosam
                    consequuntur quo itaque, asperiores quia! Itaque expedita ratione dolorum. Magnam temporibus,
                    perspiciatis
                    sunt praesentium maxime quisquam architecto neque, eveniet obcaecati fuga nobis omnis deserunt
                    consectetur
                    rem, amet nulla exercitationem sit nisi minima facilis ullam reiciendis.
                </p>
                <p class="mt-6 text-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sit debitis sed rerum inventore
                    possimus
                    repellendus fuga molestias culpa mollitia quam, vel nam similique laudantium cupiditate laboriosam
                    consequuntur quo itaque, asperiores quia! Itaque expedita ratione dolorum. Magnam temporibus,
                    perspiciatis
                    sunt praesentium maxime quisquam architecto neque, eveniet obcaecati fuga nobis omnis deserunt
                    consectetur
                    rem, amet nulla exercitationem sit nisi minima facilis ullam reiciendis.
                </p>
                <p class="mt-6 text-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sit debitis sed rerum inventore
                    possimus
                    repellendus fuga molestias culpa mollitia quam, vel nam similique laudantium cupiditate laboriosam
                    consequuntur quo itaque, asperiores quia! Itaque expedita ratione dolorum. Magnam temporibus,
                    perspiciatis
                    sunt praesentium maxime quisquam architecto neque, eveniet obcaecati fuga nobis omnis deserunt
                    consectetur
                    rem, amet nulla exercitationem sit nisi minima facilis ullam reiciendis.
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
v-if="isModalOpen"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
                @click="closeModal">
                <div class="relative max-w-4xl max-h-full">
                    <!-- Close button -->
                    <button
                        class="absolute flex-shrink-0 flex items-center justify-center top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 transition-colors"
                        aria-label="Close modal" @click="closeModal">
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