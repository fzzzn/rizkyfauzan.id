<template>
    <div class="flex items-center h-full">
        <button class="cursor-pointer text-black flex items-center h-full w-full justify-center"
            aria-label="Open navigation menu" :aria-expanded="isOpen" aria-controls="sidebar-panel" @click="handleOpen">
            <Icon name="heroicons-outline:menu-alt-2" size="24"
                class="text-black/60 hover:text-black transition duration-200" />
        </button>

        <div v-show="isOpen" ref="backdrop" class="fixed inset-0 w-full h-full bg-white/10 backdrop-blur-sm z-30"
            @click="handleClose" />

        <div v-show="isOpen" id="sidebar-panel" ref="sidebarPanel"
            class="fixed lg:absolute left-0 top-0 h-full w-screen lg:w-130 bg-black lg:rounded-lg z-40 lg:z-50 overflow-hidden flex flex-col"
            role="dialog" aria-modal="true" aria-labelledby="sidebar-title">
            <div class="absolute -bottom-10 left-0 text-white/40 pointer-events-none">
                <span class="text-[10rem]" aria-hidden="true">💤</span>
            </div>

            <!-- Header - Fixed -->
            <div class="shrink-0 p-8">
                <div class="flex justify-between">
                    <div class="items-center">
                        <span id="sidebar-title"
                            class="text-sm text-center uppercase font tracking-tighter text-white font">Discover</span>
                    </div>
                    <button class="text-white items-center cursor-pointer" aria-label="Close navigation menu"
                        @click="handleClose">
                        <Icon name="line-md:arrow-close-left" size="24" class="text-white" />
                    </button>
                </div>
            </div>

            <!-- Menu List - Scrollable -->
            <nav class="flex-1 overflow-y-auto px-8 pb-8 scrollbar-hide" aria-label="Main navigation">
                <div class="space-y-2">
                    <NuxtLink v-for="(item, index) in menuList" :key="index" :to="item.href" :class="[
                        'relative flex py-2 px-3 gap-2 group w-fit transition-all duration-300 rounded-lg',
                        isActiveRoute(item.href)
                            ? 'text-black bg-white'
                            : 'text-white hover:text-black'
                    ]" :aria-current="isActiveRoute(item.href) ? 'page' : undefined" @mouseenter="onHover(index)"
                        @mouseleave="onLeave(index)">
                        <span :ref="el => menuRef[index] = el" class="text-4xl font-[Inter] uppercase font-black z-10 tracking-tighter">
                            {{ item.menu }}
                        </span>
                        <div :class="[
                            'absolute inset-0 left-0 h-full rounded-lg transition-all duration-300 z-0',
                            isActiveRoute(item.href)
                                ? 'w-full rounded-lg bg-white'
                                : 'w-0 group-hover:w-full rounded-lg group-hover:bg-white'
                        ]" />
                        <span :ref="el => infoRef[index] = el" :class="[
                            'text-lg transform-all duration-300 z-10',
                            isActiveRoute(item.href) ? 'block' : 'hidden group-hover:block'
                        ]" aria-hidden="true">
                            {{ item.pageInfo }}
                        </span>
                    </NuxtLink>
                </div>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick, type Ref } from 'vue'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

gsap.registerPlugin(SplitText)

interface MenuItem {
    menu: string
    href: string
    pageInfo: string
}

interface SplitTextInstance {
    chars?: Element[]
    revert: () => void
}

const route: RouteLocationNormalizedLoaded = useRoute()

const menuList: MenuItem[] = [
    { menu: "Home", href: "/", pageInfo: "UwU" },
    { menu: "About", href: "/about", pageInfo: ">_<" },
    { menu: "Achievements", href: "/achievements", pageInfo: "\\o/" },
    { menu: "Certificates", href: "/certificates", pageInfo: "📜" },
    { menu: "Contact", href: "/contact", pageInfo: "@_@" },
    { menu: "Guestbook", href: "/guestbook", pageInfo: "✍️" },
]

const backdrop: Ref<HTMLElement | null> = ref(null)
const sidebarPanel: Ref<HTMLElement | null> = ref(null)
const isOpen: Ref<boolean> = ref(false)
const infoRef: Ref<Array<Element | ComponentPublicInstance | null>> = ref([])
const menuRef: Ref<Array<Element | ComponentPublicInstance | null>> = ref([])
const splitInstances: Ref<(SplitTextInstance | null)[]> = ref([])

// Watch for route changes and close sidebar
watch(() => route.path, () => {
    if (isOpen.value) {
        handleClose()
    }
})

const isActiveRoute = (href: string): boolean => {
    if (href === '/') {
        return route.path === '/'
    }
    return route.path.startsWith(href)
}

const handleOpen = (): void => {
    isOpen.value = true

    // Prevent body scroll
    document.body.style.overflow = 'hidden'

    // Focus management for accessibility
    nextTick(() => {
        const firstLink = document.querySelector < HTMLElement > ('#sidebar-panel a')
        if (firstLink) {
            firstLink.focus()
        }
    })

    gsap.to(backdrop.value, {
        opacity: 1,
        visibility: "visible",
        duration: 0.2,
        ease: "power2.out"
    })

    gsap.to(sidebarPanel.value, {
        x: 0,
        duration: 0.4,
        ease: "power2.inOut"
    })
}

const handleClose = (): void => {
    gsap.to(backdrop.value, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out"
    })

    gsap.to(sidebarPanel.value, {
        x: -2000,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
            gsap.set(backdrop.value, { visibility: "hidden" })
            isOpen.value = false
            // Re-enable body scroll
            document.body.style.overflow = ''

            // Return focus to toggle button
            const toggleButton = document.querySelector < HTMLElement > ('[aria-label="Open navigation menu"]')
            if (toggleButton) {
                toggleButton.focus()
            }
        }
    })
}

const handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
        handleClose()
    }
}

onMounted(() => {
    document.addEventListener('keydown', handleKeydown)

    gsap.set(backdrop.value, {
        opacity: 0,
        visibility: "hidden"
    })

    gsap.set(sidebarPanel.value, {
        x: -2000
    })
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
    // Re-enable body scroll if component is unmounted while sidebar is open
    document.body.style.overflow = ''
    // Clean up SplitText instances
    splitInstances.value.forEach((instance: SplitTextInstance | null) => {
        if (instance && instance.revert) {
            instance.revert()
        }
    })
})

const onHover = (index: number): void => {
    const menuItem = menuList[index]
    const refElement = infoRef.value[index]

    if (!refElement || !menuItem || isActiveRoute(menuItem.href)) return

    // Get the actual DOM element (handle ComponentPublicInstance)
    const element = (refElement as any).$el || refElement

    // Clean up previous instance if it exists
    if (splitInstances.value[index]) {
        splitInstances.value[index]?.revert()
    }

    const split: SplitTextInstance = SplitText.create(element, { type: "chars" }) as SplitTextInstance
    splitInstances.value[index] = split

    if (split.chars) {
        gsap.from(split.chars, {
            opacity: 0,
            ease: "back.out(1.7)",
            scale: 2,
            stagger: 0.05,
            delay: 0.3
        })
    }
}

const onLeave = (index: number): void => {
    const menuItem = menuList[index]
    if (!menuRef.value[index] || !menuItem || isActiveRoute(menuItem.href)) return

    // Clean up SplitText instance on mouse leave
    if (splitInstances.value[index]) {
        splitInstances.value[index]?.revert()
        splitInstances.value[index] = null
    }
}
</script>

<style scoped>
/* Hide scrollbar but keep functionality */
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
</style>