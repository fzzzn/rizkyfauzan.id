<template>
    <div class="flex items-center h-full">
        <button class="cursor-pointer text-black flex items-center h-full w-full justify-center" @click="handleOpen">
            <Icon name="heroicons-outline:menu-alt-2" size="20" class="text-black/60 hover:text-black transition duration-200" />
        </button>

        <div
v-show="isOpen" ref="backdrop" class="fixed inset-0 w-full h-full bg-white/10 backdrop-blur-sm z-30"
            @click="handleClose" />

        <div
v-show="isOpen" ref="sidebarPanel"
            class="absolute left-0 top-0 h-full w-[80vw] lg:w-[40vw] bg-black rounded-lg z-40 overflow-hidden flex flex-col">
            <div class="absolute -bottom-10 left-0 text-white/30 pointer-events-none">
                <span class="text-[8rem] lg:text-[10rem]">💤</span>
            </div>
            
            <!-- Header - Fixed -->
            <div class="flex-shrink-0 py-6 px-4">
                <div class="flex justify-between">
                    <div class="items-center">
                        <span class="text-base text-center font-light text-white/60 font-mono">Discover</span>
                    </div>
                    <button class="text-white items-center cursor-pointer" @click="handleClose">
                        <Icon name="line-md:arrow-close-left" size="20" class="text-white" />
                    </button>
                </div>
            </div>

            <!-- Menu List - Scrollable -->
            <div class="flex-1 overflow-y-auto px-4 pb-6 scrollbar-hide">
                <div class="space-y-2">
                    <NuxtLink
v-for="(item, index) in menuList" :key="index" :to="item.href" :class="[
                        'relative flex py-2 px-3 gap-2 group rounded w-fit transition-all duration-300',
                        isActiveRoute(item.href)
                            ? 'text-black bg-white'
                            : 'text-white hover:text-black'
                    ]" @mouseenter="onHover(index)" @mouseleave="onLeave(index)">
                        <span :ref="el => menuRef[index] = el" class="text-2xl lg:text-6xl font-mono z-10">
                            {{ item.menu }}
                        </span>
                        <div
:class="[
                            'absolute inset-0 left-0 h-full transition-all duration-300 z-0',
                            isActiveRoute(item.href)
                                ? 'w-full bg-white'
                                : 'w-0 group-hover:w-full group-hover:bg-white'
                        ]" />
                        <span
:ref="el => infoRef[index] = el" :class="[
                            'text-sm lg:text-lg transform-all duration-300 z-10',
                            isActiveRoute(item.href) ? 'block' : 'hidden group-hover:block'
                        ]">
                            {{ item.pageInfo }}
                        </span>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'

gsap.registerPlugin(SplitText)

const route = useRoute()

const menuList = [
    { menu: "Home", href: "/", pageInfo: "UwU" },
    { menu: "About", href: "/about", pageInfo: ">_<" },
    { menu: "Projects", href: "/projects", pageInfo: "^_^" },
    { menu: "Contact", href: "/contact", pageInfo: "@_@" },
    { menu: "Blog", href: "/blog", pageInfo: "o_o" },
    { menu: "Gallery", href: "/gallery", pageInfo: "~_~" },
]

const backdrop = ref(null)
const sidebarPanel = ref(null)
const isOpen = ref(false)
const infoRef = ref([])
const menuRef = ref([])
const splitInstances = ref([])

// Watch for route changes and close sidebar
watch(() => route.path, () => {
    if (isOpen.value) {
        handleClose()
    }
})

const isActiveRoute = (href) => {
    if (href === '/') {
        return route.path === '/'
    }
    return route.path.startsWith(href)
}

const handleClose = () => {
    gsap.to(backdrop.value, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
            gsap.set(backdrop.value, { visibility: "hidden" })
            isOpen.value = false
        }
    })

    gsap.to(sidebarPanel.value, {
        x: -2000,
        duration: 1,
        ease: "power2.out"
    })
}

const handleKeydown = (event) => {
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
    // Clean up SplitText instances
    splitInstances.value.forEach(instance => {
        if (instance && instance.revert) {
            instance.revert()
        }
    })
})

const handleOpen = () => {
    isOpen.value = true

    gsap.to(backdrop.value, {
        opacity: 1,
        visibility: "visible",
        duration: 0.2,
        ease: "power2.out"
    })

    gsap.to(sidebarPanel.value, {
        x: 0,
        duration: 0.2,
        ease: "power2.inOut"
    })
}

const onHover = (index) => {
    if (!infoRef.value[index] || isActiveRoute(menuList[index].href)) return

    // Clean up previous instance if it exists
    if (splitInstances.value[index]) {
        splitInstances.value[index].revert()
    }

    const split = SplitText.create(infoRef.value[index], { type: "chars" })
    splitInstances.value[index] = split

    gsap.from(split.chars, {
        opacity: 0,
        ease: "back.out(1.7)",
        scale: 2,
        stagger: 0.05,
        delay: 0.3
    })
}

const onLeave = (index) => {
    if (!menuRef.value[index] || isActiveRoute(menuList[index].href)) return

    // Clean up SplitText instance on mouse leave
    if (splitInstances.value[index]) {
        splitInstances.value[index].revert()
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