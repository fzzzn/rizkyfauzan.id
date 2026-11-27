<template>
    <div class="flex items-center h-full">
        <button
class="cursor-pointer text-fg flex items-center h-full w-full justify-center"
            aria-label="Open navigation menu" :aria-expanded="isOpen" aria-controls="sidebar-panel" @click="handleOpen">
            <Icon
name="heroicons-outline:menu-alt-2" size="24"
                class="text-muted hover:text-fg transition duration-200" />
        </button>

        <div
v-show="isOpen" ref="backdrop" class="fixed inset-0 w-full h-full bg-white/10 backdrop-blur-sm z-30"
            @click="handleClose" />

        <div
v-show="isOpen" id="sidebar-panel" ref="sidebarPanel"
            class="fixed lg:absolute left-0 top-0 h-full w-screen lg:w-130 bg-neutral-900 lg:rounded-lg z-40 lg:z-50 overflow-hidden flex flex-col"
            role="dialog" aria-modal="true" aria-labelledby="sidebar-title">
            <div class="absolute -bottom-10 left-0 text-white/40 pointer-events-none">
                <span class="text-[10rem]" aria-hidden="true">💤</span>
            </div>

            <!-- Header - Fixed -->
            <div class="shrink-0 p-8">
                <div class="flex justify-between">
                    <div class="items-center">
                        <span
id="sidebar-title"
                            class="text-sm text-center uppercase font tracking-tighter text-white font">Discover</span>
                    </div>
                    <button
class="text-white items-center cursor-pointer" aria-label="Close navigation menu"
                        @click="handleClose">
                        <Icon name="line-md:arrow-close-left" size="24" class="text-white" />
                    </button>
                </div>
            </div>

            <!-- Menu List - Scrollable -->
            <nav class="flex-1 overflow-y-auto px-8 pb-8 scrollbar-hide" aria-label="Main navigation">
                <div class="space-y-2">
                    <NuxtLink
v-for="item in menuList" :key="item.href" :to="item.href" :class="[
                        'relative flex py-2 px-3 gap-2 -mx-3 group w-fit transition-all duration-300 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
                        isActiveRoute(item.href)
                            ? 'text-black bg-white'
                            : 'text-white hover:text-black'
                    ]" :aria-current="isActiveRoute(item.href) ? 'page' : undefined" @click="navigate(item)">
                        <span class="text-4xl font-[Inter] uppercase font-black z-10 tracking-tighter">
                            {{ item.menu }}
                        </span>
                        <div
:class="[
                            'absolute inset-0 left-0 h-full rounded-lg transition-all duration-300 z-0',
                            isActiveRoute(item.href)
                                ? 'w-full rounded-lg bg-white'
                                : 'w-0 group-hover:w-full rounded-lg group-hover:bg-white'
                        ]" />
                        <!-- The label is kept in place while invisible, so the
                             link does not widen or reflow on hover. -->
                        <span
:class="[
                            'text-lg transform-all duration-300 z-10 whitespace-nowrap',
                            isActiveRoute(item.href) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
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
import type { RouteLocationNormalizedLoaded } from 'vue-router'

interface MenuItem {
    menu: string
    href: string
    pageInfo: string
}

const route: RouteLocationNormalizedLoaded = useRoute()

const menuList: MenuItem[] = [
    { menu: "Home", href: "/", pageInfo: "UwU" },
    { menu: "About", href: "/about", pageInfo: ">_<" },
    { menu: "Projects", href: "/projects", pageInfo: "🛠️" },
    { menu: "Achievements", href: "/achievements", pageInfo: "\\o/" },
    { menu: "Certificates", href: "/certificates", pageInfo: "📜" },
    { menu: "Contact", href: "/contact", pageInfo: "@_@" },
    { menu: "Guestbook", href: "/guestbook", pageInfo: "✍️" },
    { menu: "Resume", href: "/resume", pageInfo: "📄" },
]

const { sidebarOpen } = useSidebarState()

const backdrop: Ref<HTMLElement | null> = ref(null)
const sidebarPanel: Ref<HTMLElement | null> = ref(null)
const isOpen = sidebarOpen

// Kept so opening can reverse a close that is still playing instead of
// starting from wherever the panel happens to be, and so nothing ticks after
// the component is gone. The backdrop's visibility is switched, never tweened.
const panelTween: Ref<gsap.core.Tween | null> = ref(null)
const backdropTween: Ref<gsap.core.Tween | null> = ref(null)
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
// Off-screen in its own width on phones, clear of the page edge on desktop.
const panelStart = () => window.innerWidth < 1024 ? '-100%' : -2000
let closeTriggeredByLink = false

const isActiveRoute = (href: string): boolean => {
    if (href === '/') {
        return route.path === '/'
    }
    return route.path.startsWith(href)
}

const focusToggle = (): void => {
    document.querySelector<HTMLElement>('[aria-label="Open navigation menu"]')?.focus()
}

const handleOpen = (): void => {
    closeTriggeredByLink = false
    isOpen.value = true
    document.body.style.overflow = 'hidden'

    gsap.set(backdrop.value, { visibility: 'visible' })
    const panel = sidebarPanel.value
    if (reducedMotion() || !panel) {
        panelTween.value?.kill()
        backdropTween.value?.kill()
        gsap.set(backdrop.value, { opacity: 1 })
        gsap.set(panel, { x: 0 })
    } else {
        backdropTween.value = (backdropTween.value?.reversed() ?? false)
            ? backdropTween.value
            : gsap.to(backdrop.value, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        if (backdropTween.value?.reversed()) backdropTween.value.play()
        // Lands with a little weight; the closing ease is different so the
        // panel does not just retrace its open path.
        panelTween.value = (panelTween.value?.reversed() ?? false)
            ? panelTween.value
            : gsap.to(panel, { x: 0, duration: 0.55, ease: 'power3.out' })
        if (panelTween.value?.reversed()) panelTween.value.play()
    }

    nextTick(() => document.querySelector<HTMLElement>('#sidebar-panel a')?.focus())
}

const handleClose = (): void => {
    if (!isOpen.value) return
    const panel = sidebarPanel.value
    const restoreScroll = () => {
        isOpen.value = false
        document.body.style.overflow = ''
        // A link click already moved focus into the new page; pulling it back
        // to the menu button would drop the visitor at the top of the page.
        if (!closeTriggeredByLink) focusToggle()
    }

    if (reducedMotion() || !panel) {
        panelTween.value?.kill()
        backdropTween.value?.kill()
        gsap.set(panel, { x: panelStart() })
        gsap.set(backdrop.value, { opacity: 0, visibility: 'hidden' })
        restoreScroll()
        return
    }

    backdropTween.value?.kill()
    gsap.to(backdrop.value, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => gsap.set(backdrop.value, { visibility: 'hidden' }),
    })
    panelTween.value?.kill()
    panelTween.value = gsap.to(panel, {
        x: panelStart(),
        duration: 0.45,
        ease: 'power3.in',
        onComplete: restoreScroll,
    })
}

// The links carry their own @click, which sets the flag just before the route
// changes. The watcher then closes the menu for every route change, including
// back/forward navigation, instead of leaving the panel over the new page.
// Clicking the active page does not change route.path, so the watcher never
// fires; close here for that case. A real navigation is still left to the
// watcher so the close waits for the new page.
const navigate = (item: MenuItem): void => {
    closeTriggeredByLink = true
    if (route.path === item.href) handleClose()
}

const onDocumentKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') handleClose()
}

watch(() => route.path, () => {
    if (isOpen.value) handleClose()
})

onMounted(() => {
    document.addEventListener('keydown', onDocumentKeydown)
    gsap.set(backdrop.value, { opacity: 0, visibility: 'hidden' })
    gsap.set(sidebarPanel.value, { x: panelStart() })
})

onUnmounted(() => {
    document.removeEventListener('keydown', onDocumentKeydown)
    panelTween.value?.kill()
    backdropTween.value?.kill()
    document.body.style.overflow = ''
})
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