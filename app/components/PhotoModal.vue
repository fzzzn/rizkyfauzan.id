<template>
    <!-- Shared photo lightbox: same look and behaviour on every page. -->
    <ClientOnly>
        <Teleport to="body">
            <div
v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
                @click="close">
                <div class="relative max-w-6xl max-h-full">
                    <!-- Close button -->
                    <button
                        class="absolute top-4 right-4 z-20 w-8 h-8 bg-black hover:bg-black/80 text-white rounded-full transition duration-200 flex items-center justify-center cursor-pointer"
                        aria-label="Close modal" @click.stop="close">
                        <Icon name="heroicons:x-mark" size="16" />
                    </button>

                    <!-- Modal image -->
                    <OptimizedImg
v-if="src.startsWith('/')" :src="src" :alt="alt"
                        class="block w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-2xl"
                        loading="eager" fetchpriority="high" @click.stop />
                    <img
v-else :src="src" :alt="alt" width="500" height="500"
                        class="block w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-2xl"
                        @click.stop>
                </div>
            </div>
        </Teleport>
    </ClientOnly>
</template>

<script setup lang="ts">
const props = defineProps<{
    open: boolean
    src: string
    alt?: string
}>()

const emit = defineEmits<{
    'update:open': [value: boolean]
}>()

const close = () => {
    emit('update:open', false)
}

// Close on escape key, and restore body scroll when the modal closes or the
// page goes away.
const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        close()
    }
}

watch(() => props.open, (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
})

onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
})
</script>
