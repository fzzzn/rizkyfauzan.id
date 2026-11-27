<template>
  <div>
    <!-- Card -->
    <button
      type="button"
      class="bg-surface border border-border rounded-lg p-6 w-full md:w-80 lg:w-120 hover:shadow-lg transition-shadow h-full flex flex-col cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
      :aria-label="`View details for ${item.title}`"
      @click="openModal"
    >
      <div class="flex flex-col gap-4 h-full w-full">
        <div class="shrink-0">
          <img
            :src="imageKitUrl(item.image, 800)"
            :srcset="`${imageKitUrl(item.image, 400)} 400w, ${imageKitUrl(item.image, 800)} 800w, ${imageKitUrl(item.image, 1200)} 1200w`"
            sizes="(min-width: 768px) 480px, 100vw"
            :alt="`${item.title} - ${item.description || 'Certificate or achievement image'}`"
            class="w-full aspect-3/2 object-cover rounded-lg hover:opacity-90 transition-opacity"
            width="800"
            height="533"
            loading="lazy"
            decoding="async"
          >
        </div>
        <div class="flex flex-col flex-1">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm text-muted">{{ item.date }}</span>
          </div>
          <h3 class="text-xl font-bold mb-2">{{ item.title }}</h3>
          <p v-if="item.description" class="text-secondary leading-relaxed text-sm flex-1">{{ item.description }}</p>
        </div>
      </div>
    </button>

    <!-- Modal -->
    <Teleport to="body">
      <div
        v-if="isModalOpen"
        ref="overlay"
        role="dialog"
        aria-modal="true"
        :aria-label="item.title"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
        @click="closeModal">
        <div ref="content" class="relative w-full max-w-3xl max-h-full">
          <!-- Modal content -->
          <div class="bg-surface rounded-lg overflow-hidden w-full max-h-[90vh] flex flex-col relative" @click.stop>
            <!-- Close button -->
            <button
              ref="closeBtn"
              type="button"
              class="absolute top-4 right-4 z-20 w-8 h-8 bg-black hover:bg-black/80 text-white rounded-full transition duration-200 flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Close modal"
              @click.stop="closeModal">
              <Icon name="heroicons:x-mark" size="16" />
            </button>

            <!-- Image - Original aspect ratio with blur background -->
            <div class="relative shrink-0 flex items-center justify-center min-h-50 overflow-hidden">
              <!-- Blurred background -->
              <div class="absolute inset-0">
                <img
                  :src="imageKitUrl(item.image, 400, 50)"
                  alt=""
                  aria-hidden="true"
                  class="w-full h-full object-cover object-center filter blur-md opacity-60"
                >
              </div>

              <!-- Sharp foreground image -->
              <div class="relative z-10">
                <img
                  :src="imageKitUrl(item.image, 1600)"
                  :alt="item.title"
                  class="max-w-full max-h-[60vh] object-contain"
                  decoding="async"
                >
              </div>
            </div>

            <!-- Content - Scrollable -->
            <div class="p-4 md:p-6 overflow-y-auto flex-1">
              <div class="text-sm text-muted mb-2">{{ item.date }}</div>
              <h3 class="text-xl md:text-2xl lg:text-3xl font-bold mb-4">{{ item.title }}</h3>
              <p v-if="item.description" class="text-secondary leading-relaxed text-base md:text-lg">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted, type Ref } from 'vue'
import gsap from 'gsap'
import { imageKitUrl } from '~/utils/imagekit'

interface Item {
  image: string
  title: string
  description?: string
  date: string
}

interface Props {
  item: Item
}

defineProps<Props>()

// Modal state
const isModalOpen: Ref<boolean> = ref(false)
const overlay = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const closeBtn = ref<HTMLButtonElement | null>(null)
let previousFocus: HTMLElement | null = null
let tween: gsap.core.Tween | null = null

const openModal = (): void => {
  previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = (): void => {
  if (!isModalOpen.value) return
  if (!overlay.value || !content.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    isModalOpen.value = false
    return
  }
  tween?.kill()
  tween = gsap.to([overlay.value, content.value], {
    opacity: 0,
    duration: 0.2,
    ease: 'power2.in',
    onComplete: () => {
      isModalOpen.value = false
    },
  })
}

const handleKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape' && isModalOpen.value) {
    closeModal()
  }
}

watch(() => isModalOpen.value, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
  if (!isOpen) {
    previousFocus?.focus()
    previousFocus = null
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

watch(() => isModalOpen.value, async (isOpen) => {
  if (!isOpen) return
  tween?.kill()
  await nextTick()
  if (!isModalOpen.value || !overlay.value || !content.value) return
  closeBtn.value?.focus()
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
