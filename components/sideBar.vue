<template>
    <div class="flex items-center h-full">
        <button class="cursor-pointer text-black flex items-center h-full w-full justify-center" @click="handleOpen">
            <Icon
name="heroicons-outline:menu-alt-2" size="24"
                class="text-black/60 hover:text-black transition duration-200" />
        </button>

        <div
v-show="isOpen" ref="backdrop" class="fixed inset-0 w-full h-full bg-white/10 backdrop-blur-sm z-30"
            @click="handleClose" />

        <div
v-show="isOpen" ref="sidebarPanel"
            class="fixed md:absolute left-0 top-0 h-full w-[100vw] md:w-[60vw] lg:w-[40vw] bg-black md:rounded-lg z-40 md:z-50 overflow-hidden flex flex-col">
            <div class="absolute -bottom-10 left-0 text-white/30 pointer-events-none">
                <span class="text-[8rem] md:text-[10rem]">💤</span>
            </div>

            <!-- Header - Fixed -->
            <div class="flex-shrink-0 py-6 px-6">
                <div class="flex justify-between">
                    <div class="items-center">
                        <span class="text-base text-center font-light text-white/60 font-mono">Discover</span>
                    </div>
                    <button class="text-white items-center cursor-pointer" @click="handleClose">
                        <Icon name="line-md:arrow-close-left" size="24" class="text-white" />
                    </button>
                </div>
            </div>

            <!-- Menu List - Scrollable -->
            <div class="flex-1 overflow-y-auto px-4 pb-6 scrollbar-hide">
                <div class="space-y-2">
                    <NuxtLink
    v-for="(item, index) in menuList" :key="index" :to="item.href" :class="[
        'relative flex py-2 px-3 gap-2 group w-fit transition-all duration-300 rounded-lg',
        isActiveRoute(item.href)
            ? 'text-black bg-white'
            : 'text-white hover:text-black'
    ]" @mouseenter="onHover(index)" @mouseleave="onLeave(index)">
    <span :ref="el => menuRef[index] = el" class="text-2xl md:text-5xl font-mono z-10">
        {{ item.menu }}
    </span>
    <div
        :class="[
            'absolute inset-0 left-0 h-full rounded-lg transition-all duration-300 z-0',
            isActiveRoute(item.href)
                ? 'w-full rounded-lg bg-white'
                : 'w-0 group-hover:w-full rounded-lg group-hover:bg-white'
        ]" />
    <span
        :ref="el => infoRef[index] = el" :class="[
            'text-sm md:text-lg transform-all duration-300 z-10',
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
    { menu: "Achievements", href: "/achievements", pageInfo: "\\o/" },
    { menu: "Certificates", href: "/certificates", pageInfo: "📜" },
    { menu: "Guestbook", href: "/guestbook", pageInfo: "✍️" },
    { menu: "Contact", href: "/contact", pageInfo: "@_@" },
    { menu: "Resume", href: "/resume", pageInfo: "T_T" },
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

const handleOpen = () => {
    isOpen.value = true

    // Prevent body scroll
    document.body.style.overflow = 'hidden'

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

const handleClose = () => {
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
        }
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
    // Re-enable body scroll if component is unmounted while sidebar is open
    document.body.style.overflow = ''
    // Clean up SplitText instances
    splitInstances.value.forEach(instance => {
        if (instance && instance.revert) {
            instance.revert()
        }
    })
})

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