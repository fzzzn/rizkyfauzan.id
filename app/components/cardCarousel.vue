<template>
    <div>
        <div class="flex items-center max-w-7xl mx-auto gap-4" @mouseenter="stopAutoSlide" @mouseleave="startAutoSlide">
            <!-- Left Arrow -->
            <button
v-if="showArrows"
                class="bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-colors shrink-0 flex items-center justify-center"
                @click="manualPrevSlide">
                <Icon name="heroicons:chevron-left" size="20" />
            </button>

            <!-- Slides Container -->
            <div
class="flex-1 overflow-hidden rounded-lg select-none" @touchstart="handleTouchStart"
                @touchmove="handleTouchMove" @touchend="handleTouchEnd" @mousedown="handleMouseDown"
                @mousemove="handleMouseMove">
                <div
ref="carouselRef" class="flex transition-transform duration-300 ease-in-out"
                    :class="{ 'cursor-grabbing': isDragging, 'cursor-grab': !isDragging }"
                    :style="{ transform: `translateX(-${getTransform()}%)` }">
                    <div
v-for="item in extendedItems" :key="item.cloneId || item.id" class="shrink-0 px-2"
                        :style="{ width: `${slideWidth}%` }">
                        <div
class="relative" :class="[
                            enableModal ? 'cursor-pointer hover:shadow-lg transition-all duration-200' : ''
                        ]" @click="openModal(item)">
                            <slot :item="item" />

                            <!-- Card Number Indicator on each card -->
                            <div
v-if="showCardNumber"
                                class="absolute bottom-2 right-2 text-black/30 px-2 py-1 text-xs font-medium">
                                {{ getCardNumber(item) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Arrow -->
            <button
v-if="showArrows"
                class="bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-colors shrink-0 flex items-center justify-center"
                @click="manualNextSlide">
                <Icon name="heroicons:chevron-right" size="20" />
            </button>
        </div>

        <!-- Dots Indicator -->
        <div v-if="showDots" class="flex md:hidden justify-center mt-6 space-x-2">
            <button
v-for="(item, index) in items" :key="index" :class="[
                'w-3 h-3 rounded-full transition-colors',
                getActualSlideIndex() === index ? 'bg-black' : 'bg-gray-300'
            ]" @click="manualGoToSlide(index)" />
        </div>

        <!-- Modal -->
        <Teleport v-if="enableModal" to="body">
            <div
v-if="isModalOpen && selectedItem"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
                @click="closeModal">
                <div class="relative max-w-4xl max-h-full">
                    <!-- Close button -->
                    <button
                        class="shrink-0 flex items-center justify-center absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 transition-colors"
                        aria-label="Close modal" @click="closeModal">
                        <Icon name="heroicons:x-mark" size="16" />
                    </button>

                    <!-- Modal content -->
                    <div class="bg-white rounded-2xl overflow-hidden max-w-4xl max-h-[90vh]">
                        <!-- Modal slot for custom content -->
                        <slot name="modal" :item="selectedItem">
                            <!-- Default modal content -->
                            <div class="relative">
                                <NuxtImg
v-if="selectedItem.image" :src="selectedItem.image"
                                    :alt="selectedItem.title || 'Image'" class="w-full object-contain" @click.stop />
                            </div>

                            <div class="p-6">
                                <div v-if="selectedItem.date" class="text-sm text-gray-500 mb-2">{{ selectedItem.date }}
                                </div>
                                <h3 v-if="selectedItem.title" class="text-xl font-bold">{{ selectedItem.title }}</h3>
                                <p v-if="selectedItem.description" class="text-gray-700 leading-relaxed text-md">{{
                                    selectedItem.description }}</p>
                            </div>
                        </slot>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed, type Ref, type ComputedRef } from 'vue'

interface CarouselItem {
    id: string | number
    title?: string
    description?: string
    date?: string
    image?: string
    [key: string]: any
}

interface ExtendedItem extends CarouselItem {
    cloneId?: string
}

interface Props {
    items: CarouselItem[]
    autoSlideDelay?: number
    showDots?: boolean
    showArrows?: boolean
    enableModal?: boolean
    slidesToShow?: number
    slidesToShowMobile?: number
    showCardNumber?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    autoSlideDelay: 4000,
    showDots: true,
    showArrows: true,
    enableModal: false,
    slidesToShow: 3,
    slidesToShowMobile: 1,
    showCardNumber: true
})

const emit = defineEmits<{
    'item-click': [item: CarouselItem]
}>()

const currentSlide: Ref<number> = ref(1)
const autoSlideInterval: Ref<number | null> = ref(null)
const isTransitioning: Ref<boolean> = ref(false)
const carouselRef: Ref<HTMLElement | null> = ref(null)
const isMobile: Ref<boolean> = ref(false)

// Touch/Swipe state
const touchStartX: Ref<number> = ref(0)
const touchEndX: Ref<number> = ref(0)
const isDragging: Ref<boolean> = ref(false)
const swipeThreshold: number = 50 // Minimum swipe distance

// Modal state
const isModalOpen: Ref<boolean> = ref(false)
const selectedItem: Ref<CarouselItem | null> = ref(null)

// Create extended array with clones for infinite scroll
const extendedItems: Ref<ExtendedItem[]> = ref([])

// Calculate current slides to show based on screen size
const currentSlidesToShow: ComputedRef<number> = computed(() => {
    return isMobile.value ? props.slidesToShowMobile : props.slidesToShow
})

// Calculate slide width based on current slides to show
const slideWidth: ComputedRef<number> = computed(() => {
    return 100 / currentSlidesToShow.value
})

// Get card number for a specific item
const getCardNumber = (item: ExtendedItem): number => {
    // Find the original index in the items array
    const originalIndex = props.items.findIndex((originalItem: CarouselItem) =>
        originalItem.id === item.id ||
        (originalItem.title === item.title && originalItem.date === item.date)
    )
    return originalIndex !== -1 ? originalIndex + 1 : 1
}

// Check if mobile
const checkMobile = (): void => {
    isMobile.value = window.innerWidth < 768 // md breakpoint
}

const initializeCarousel = (): void => {
    const original = props.items
    // Add clones at both ends for smooth infinite scroll
    const maxSlides = Math.max(props.slidesToShow, props.slidesToShowMobile)
    const clonesAtStart = original.slice(-maxSlides).map((item, index) => ({
        ...item,
        cloneId: `clone-start-${index}`
    }))
    const clonesAtEnd = original.slice(0, maxSlides).map((item, index) => ({
        ...item,
        cloneId: `clone-end-${index}`
    }))

    extendedItems.value = [
        ...clonesAtStart,
        ...original,
        ...clonesAtEnd
    ]
}

// Touch event handlers
const handleTouchStart = (e: TouchEvent): void => {
    if (e.touches[0]) {
        touchStartX.value = e.touches[0].clientX
        isDragging.value = true
        stopAutoSlide()
    }
}

const handleTouchMove = (e: TouchEvent): void => {
    if (!isDragging.value || !e.touches[0]) return
    touchEndX.value = e.touches[0].clientX
}

const handleTouchEnd = (): void => {
    if (!isDragging.value) return

    const swipeDistance = touchStartX.value - touchEndX.value

    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swiped left - go to next slide
            nextSlide()
        } else {
            // Swiped right - go to previous slide
            prevSlide()
        }
    }

    isDragging.value = false
    startAutoSlide()
}

// Mouse event handlers for desktop drag support
const handleMouseDown = (e: MouseEvent): void => {
    touchStartX.value = e.clientX
    isDragging.value = true
    stopAutoSlide()
    e.preventDefault()
}

const handleMouseMove = (e: MouseEvent): void => {
    if (!isDragging.value) return
    touchEndX.value = e.clientX
}

const handleMouseUp = (): void => {
    if (!isDragging.value) return

    const swipeDistance = touchStartX.value - touchEndX.value

    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Dragged left - go to next slide
            nextSlide()
        } else {
            // Dragged right - go to previous slide
            prevSlide()
        }
    }

    isDragging.value = false
    startAutoSlide()
}

const nextSlide = async (): Promise<void> => {
    if (isTransitioning.value) return
    isTransitioning.value = true

    currentSlide.value++

    // If we've moved past the original items
    if (currentSlide.value > props.items.length) {
        await nextTick()
        setTimeout(() => {
            if (carouselRef.value) {
                carouselRef.value.style.transition = 'none'
                currentSlide.value = 1

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

const prevSlide = async (): Promise<void> => {
    if (isTransitioning.value) return
    isTransitioning.value = true

    currentSlide.value--

    // If we've moved before the original items
    if (currentSlide.value < 1) {
        await nextTick()
        setTimeout(() => {
            if (carouselRef.value) {
                carouselRef.value.style.transition = 'none'
                currentSlide.value = props.items.length

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

const goToSlide = (index: number): void => {
    if (isTransitioning.value) return
    isTransitioning.value = true
    currentSlide.value = index + 1
    setTimeout(() => {
        isTransitioning.value = false
    }, 300)
}

// Get the actual slide index for indicators
const getActualSlideIndex = (): number => {
    if (currentSlide.value < 1) return props.items.length - 1
    if (currentSlide.value > props.items.length) return 0
    return currentSlide.value - 1
}

// Calculate transform based on current slide and slides to show
const getTransform = (): number => {
    const maxSlides = Math.max(props.slidesToShow, props.slidesToShowMobile)
    const slideIndex = currentSlide.value + maxSlides - 1
    return slideIndex * slideWidth.value
}

// Modal functions
const openModal = (item: ExtendedItem): void => {
    // Prevent modal opening if we're dragging
    if (isDragging.value) return

    if (props.enableModal) {
        selectedItem.value = item
        isModalOpen.value = true
        document.body.style.overflow = 'hidden'
    }
    emit('item-click', item)
}

const closeModal = (): void => {
    isModalOpen.value = false
    selectedItem.value = null
    document.body.style.overflow = ''
}

const handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
        closeModal()
    }
}

const handleResize = (): void => {
    const wasMobile = isMobile.value
    checkMobile()

    // If screen size changed between mobile/desktop, restart auto-slide with fresh timing
    if (wasMobile !== isMobile.value) {
        stopAutoSlide()
        setTimeout(() => {
            startAutoSlide()
        }, 100)
    }
}

const startAutoSlide = (): void => {
    // Clear any existing interval first
    stopAutoSlide()

    autoSlideInterval.value = window.setInterval(() => {
        nextSlide()
    }, props.autoSlideDelay)
}

const stopAutoSlide = (): void => {
    if (autoSlideInterval.value !== null) {
        clearInterval(autoSlideInterval.value)
        autoSlideInterval.value = null
    }
}

// Manual navigation with auto-slide restart
const manualNextSlide = (): void => {
    nextSlide()
    startAutoSlide()
}

const manualPrevSlide = (): void => {
    prevSlide()
    startAutoSlide()
}

const manualGoToSlide = (index: number): void => {
    goToSlide(index)
    startAutoSlide()
}

onMounted(() => {
    checkMobile()
    initializeCarousel()

    // Start auto-slide after a short delay to ensure everything is initialized
    setTimeout(() => {
        startAutoSlide()
    }, 100)

    window.addEventListener('resize', handleResize)

    // Add mouse event listeners for desktop drag
    if (carouselRef.value) {
        carouselRef.value.addEventListener('mouseleave', handleMouseUp)
        document.addEventListener('mouseup', handleMouseUp)
    }

    if (props.enableModal) {
        document.addEventListener('keydown', handleKeydown)
    }
})

onUnmounted(() => {
    stopAutoSlide()
    window.removeEventListener('resize', handleResize)
    document.removeEventListener('mouseup', handleMouseUp)

    if (props.enableModal) {
        document.removeEventListener('keydown', handleKeydown)
        document.body.style.overflow = ''
    }
})
</script>

<!-- USAGE -->
<!-- <script setup>
useSeoMeta({
    title: 'Achievements',
    description: 'Explore my professional achievements.',
})

const achievements = ref([
    {
        id: 1,
        title: "Network Security Excellence",
        description: "Led implementation of enterprise-grade security protocols",
        date: "2024",
        image: "avatar.png"
    },
    {
        id: 2,
        title: "Infrastructure Optimization",
        description: "Reduced network latency by 40% through strategic optimization",
        date: "2023",
        image: "avatar.png"
    },
    {
        id: 3,
        title: "Team Leadership Award",
        description: "Recognized for outstanding team management and project delivery",
        date: "2023",
        image: "avatar.png"
    },
    {
        id: 4,
        title: "Innovation in Networking",
        description: "Developed custom solutions for complex network challenges",
        date: "2022",
        image: "avatar.png"
    }
])
</script>

<template>
    <div class="p-6">
        <h1 class="text-3xl font-bold mb-8">
            Achievements
        </h1>

        <cardCarousel 
            :items="achievements" 
            :auto-slide-delay="4000"
            :enable-modal="true"
            :slides-to-show="3"
        >
            <template #default="{ item }">
                <div class="bg-white border border-gray-200 rounded-lg p-6">
                    <div class="flex flex-col gap-4">
                        <div>
                            <NuxtImg
                                :src="item.image" 
                                :alt="item.title"
                                class="w-full h-48 object-cover rounded-lg" />
                        </div>
                        <div>
                            <div class="text-sm text-gray-500 mb-0.5">{{ item.date }}</div>
                            <h3 class="text-xl font-bold mb-1.5">{{ item.title }}</h3>
                            <p class="text-gray-700 leading-relaxed text-md">{{ item.description }}</p>
                        </div>
                    </div>
                </div>
            </template>
        </cardCarousel>
    </div>
</template> -->

