<template>
  <div>
    <!-- Card -->
    <div 
      class="bg-white border border-gray-200 rounded-lg p-6 w-full md:w-80 lg:w-120 hover:shadow-lg transition-shadow h-full flex flex-col cursor-pointer"
      @click="openModal"
    >
      <div class="flex flex-col gap-4 h-full">
        <div class="flex-shrink-0">
          <NuxtImg
            :src="item.image" 
            :alt="`${item.title} - ${item.description || 'Certificate or achievement image'}`"
            class="w-full aspect-[3/2] object-cover rounded-lg hover:opacity-90 transition-opacity"
            loading="lazy"
            format="webp"
            quality="80"
          />
        </div>
        <div class="flex flex-col flex-1">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm text-gray-500">{{ item.date }}</span>
          </div>
          <h3 class="text-xl font-bold mb-2">{{ item.title }}</h3>
          <p class="text-gray-700 leading-relaxed text-sm flex-1">{{ item.description }}</p>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
        @click="closeModal">
        <div class="relative w-full max-w-6xl max-h-full">
          <!-- Modal content -->
          <div class="bg-white rounded-lg overflow-hidden w-full max-h-[90vh] flex flex-col relative" @click.stop>
            <!-- Close button -->
           <button
              class="absolute top-4 right-4 z-20 w-8 h-8 bg-black hover:bg-black/80 text-white rounded-full transition duration-200 flex items-center justify-center cursor-pointer"
              aria-label="Close modal"
              @click.stop="closeModal">
              <Icon name="heroicons:x-mark" size="16" />
            </button>
            
            <!-- Image - Original aspect ratio with blur background -->
            <div class="relative flex-shrink-0 flex items-center justify-center min-h-[200px] overflow-hidden">
              <!-- Blurred background -->
              <div class="absolute inset-0">
                <NuxtImg
                  :src="item.image" 
                  :alt="item.title"
                  class="w-full h-full object-cover object-center filter blur-md opacity-60" 
                />
              </div>
              
              <!-- Sharp foreground image -->
              <div class="relative z-10">
                <NuxtImg
                  :src="item.image" 
                  :alt="item.title"
                  class="max-w-full max-h-[60vh] object-contain" 
                />
              </div>
            </div>
            
            <!-- Content - Scrollable -->
            <div class="p-4 md:p-6 overflow-y-auto flex-1">
              <div class="text-sm text-gray-500 mb-2">{{ item.date }}</div>
              <h3 class="text-xl md:text-2xl lg:text-3xl font-bold mb-4">{{ item.title }}</h3>
              <p class="text-gray-700 leading-relaxed text-base md:text-lg">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
})

// Modal state
const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
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