<template>
    <!-- Shared photo lightbox: same look and behaviour on every page. -->
    <ClientOnly>
        <Teleport to="body">
            <div
v-if="open" ref="overlay" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
                @click="close">
                <div ref="content" class="relative max-w-6xl max-h-full">
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
import gsap from 'gsap'

const props = defineProps<{
    open: boolean
    src: string
    alt?: string
}>()

const emit = defineEmits<{
    'update:open': [value: boolean]
}>()

const overlay = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
// Killed before closing so a quick reopen cannot leave a half-faded overlay
// in front of the page, and on unmount so nothing ticks after the page is gone.
let tween: gsap.core.Tween | null = null

const close = () => {
    if (!overlay.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        emit('update:open', false)
        return
    }
    tween?.kill()
    tween = gsap.to([overlay.value, content.value], {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => emit('update:open', false),
    })
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

// Open fades the backdrop while the image settles from slightly small; close
// reverses it. Both run only when the modal actually opens or closes.
watch(() => props.open, (isOpen) => {
    if (!isOpen) return
    tween?.kill()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(overlay.value, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' })
    tween = gsap.fromTo(content.value, { opacity: 0, scale: 0.96 }, {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: 'power3.out',
        clearProps: 'transform',
    })
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
    tween?.kill()
    document.body.style.overflow = ''
})
</script>
