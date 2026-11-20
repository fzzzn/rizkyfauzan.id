<template>
  <div>
    <!-- Card -->
    <div 
      class="bg-surface border border-border rounded-lg p-6 w-full md:w-80 lg:w-120 hover:shadow-lg transition-shadow h-full flex flex-col cursor-pointer"
      @click="openModal"
    >
      <div class="flex flex-col gap-4 h-full">
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
          <p class="text-secondary leading-relaxed text-sm flex-1">{{ item.description }}</p>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        leave-active-class="transition duration-150 ease-in"
        leave-to-class="opacity-0"
      >
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
        @click="closeModal">
        <div class="relative w-full max-w-3xl max-h-full modal-content">
          <!-- Modal content -->
          <div class="bg-surface rounded-lg overflow-hidden w-full max-h-[90vh] flex flex-col relative" @click.stop>
            <!-- Close button -->
           <button
              class="absolute top-4 right-4 z-20 w-8 h-8 bg-black hover:bg-black/80 text-white rounded-full transition duration-200 flex items-center justify-center cursor-pointer"
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
              <p class="text-secondary leading-relaxed text-base md:text-lg">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, type Ref } from 'vue'
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

const openModal = (): void => {
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = (): void => {
  isModalOpen.value = false
  document.body.style.overflow = ''
}

const handleKeydown = (event: KeyboardEvent): void => {
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

<style scoped>
.modal-content {
  animation: modal-pop 0.2s ease-out;
}

@keyframes modal-pop {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>