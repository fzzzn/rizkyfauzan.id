<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
    items: {
        type: Array,
        required: true
    },
    autoSlideDelay: {
        type: Number,
        default: 4000
    },
    showDots: {
        type: Boolean,
        default: true
    },
    showArrows: {
        type: Boolean,
        default: true
    }
})

const currentSlide = ref(1)
const autoSlideInterval = ref(null)
const isTransitioning = ref(false)
const carouselRef = ref(null)

// Create extended array with clones for infinite scroll
const extendedItems = ref([])

const initializeCarousel = () => {
    const original = props.items
    // Add last item at beginning and first item at end for seamless looping
    extendedItems.value = [
        { ...original[original.length - 1], cloneId: 'clone-last' },
        ...original,
        { ...original[0], cloneId: 'clone-first' }
    ]
}

const nextSlide = async () => {
    if (isTransitioning.value) return
    isTransitioning.value = true
    
    currentSlide.value++
    
    // If we've moved to the cloned first slide (at the end)
    if (currentSlide.value === props.items.length + 1) {
        await nextTick()
        // Wait for transition to complete
        setTimeout(() => {
            // Jump to the real first slide without transition
            if (carouselRef.value) {
                carouselRef.value.style.transition = 'none'
                currentSlide.value = 1
                
                // Re-enable transition after a brief moment
                setTimeout(() => {
                    if (carouselRef.value) {
                        carouselRef.value.style.transition = 'transform 300ms ease-in-out'
                    }
                    isTransitioning.value = false
                }, 50)
            }
        }, 300)
    } else {
        setTimeout(() => {
            isTransitioning.value = false
        }, 300)
    }
}

const prevSlide = async () => {
    if (isTransitioning.value) return
    isTransitioning.value = true
    
    currentSlide.value--
    
    // If we've moved to the cloned last slide (at the beginning)
    if (currentSlide.value === 0) {
        await nextTick()
        // Wait for transition to complete
        setTimeout(() => {
            // Jump to the real last slide without transition
            if (carouselRef.value) {
                carouselRef.value.style.transition = 'none'
                currentSlide.value = props.items.length
                
                // Re-enable transition after a brief moment
                setTimeout(() => {
                    if (carouselRef.value) {
                        carouselRef.value.style.transition = 'transform 300ms ease-in-out'
                    }
                    isTransitioning.value = false
                }, 50)
            }
        }, 300)
    } else {
        setTimeout(() => {
            isTransitioning.value = false
        }, 300)
    }
}

const goToSlide = (index) => {
    if (isTransitioning.value) return
    isTransitioning.value = true
    currentSlide.value = index + 1 // +1 because of clone at beginning
    setTimeout(() => {
        isTransitioning.value = false
    }, 300)
}

// Get the actual slide index for indicators (0-based)
const getActualSlideIndex = () => {
    if (currentSlide.value === 0) return props.items.length - 1
    if (currentSlide.value === props.items.length + 1) return 0
    return currentSlide.value - 1
}

const startAutoSlide = () => {
    autoSlideInterval.value = setInterval(() => {
        nextSlide()
    }, props.autoSlideDelay)
}

const stopAutoSlide = () => {
    if (autoSlideInterval.value) {
        clearInterval(autoSlideInterval.value)
        autoSlideInterval.value = null
    }
}

const restartAutoSlide = () => {
    stopAutoSlide()
    startAutoSlide()
}

// Manual navigation with auto-slide restart
const manualNextSlide = () => {
    nextSlide()
    restartAutoSlide()
}

const manualPrevSlide = () => {
    prevSlide()
    restartAutoSlide()
}

const manualGoToSlide = (index) => {
    goToSlide(index)
    restartAutoSlide()
}

onMounted(() => {
    initializeCarousel()
    startAutoSlide()
})

onUnmounted(() => {
    stopAutoSlide()
})
</script>

<template>
    <div class="flex items-center max-w-6xl mx-auto gap-4" @mouseenter="stopAutoSlide" @mouseleave="startAutoSlide">
        <!-- Left Arrow -->
        <button
            v-if="showArrows"
            class="bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-colors flex-shrink-0 flex items-center justify-center"
            @click="manualPrevSlide">
            <Icon name="heroicons:chevron-left" size="20" />
        </button>

        <!-- Slides Container -->
        <div class="flex-1 overflow-hidden rounded-lg">
            <div 
                ref="carouselRef"
                class="flex transition-transform duration-300 ease-in-out"
                :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
            >
                <div v-for="item in extendedItems" :key="item.cloneId || item.id" class="w-full flex-shrink-0 px-2">
                    <slot :item="item" />
                </div>
            </div>
        </div>

        <!-- Right Arrow -->
        <button
            v-if="showArrows"
            class="bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-colors flex-shrink-0 flex items-center justify-center"
            @click="manualNextSlide">
            <Icon name="heroicons:chevron-right" size="20" />
        </button>
    </div>

    <!-- Dots Indicator -->
    <div v-if="showDots" class="flex justify-center mt-6 space-x-2">
        <button
            v-for="(item, index) in items" 
            :key="index" 
            :class="[
                'w-3 h-3 rounded-full transition-colors',
                getActualSlideIndex() === index ? 'bg-black' : 'bg-gray-300'
            ]" 
            @click="manualGoToSlide(index)" />
    </div>
</template>