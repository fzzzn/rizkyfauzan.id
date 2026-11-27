<template>
    <ClientOnly>
        <Teleport to="body">
            <!-- Toast feedback -->
            <Transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-2">
                <div
                    v-if="toastMessage"
                    role="status"
                    :class="[
                        'fixed bottom-8 left-1/2 -translate-x-1/2 z-[70] bg-inverse-bg text-inverse-fg px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2',
                        { 'palette-light': isResume },
                    ]">
                    <Icon name="heroicons:check-circle" size="18" />
                    <span>{{ toastMessage }}</span>
                </div>
            </Transition>

            <!-- Command Palette Dialog -->
            <div
                v-if="isOpen"
                role="dialog"
                aria-modal="true"
                aria-label="Command palette"
                :class="[
                    'print:hidden fixed inset-0 z-[60] flex items-start justify-center pt-[14vh] px-4 bg-black/60 backdrop-blur-xs',
                    { 'palette-light': isResume },
                ]"
                @click="close">
                <div
                    class="w-full max-w-lg bg-surface border border-border rounded-xl shadow-2xl overflow-hidden"
                    @click.stop>
                    <!-- Search input -->
                    <div class="flex items-center gap-3 px-4 py-3 border-b border-border">
                        <Icon name="heroicons:magnifying-glass" size="18" class="text-muted shrink-0" aria-hidden="true" />
                        <input
                            ref="inputEl"
                            v-model="query"
                            type="text"
                            placeholder="Type a command or search pages..."
                            class="w-full bg-transparent text-fg placeholder:text-muted text-sm sm:text-base focus:outline-none"
                            aria-label="Search commands"
                            @keydown.down.prevent="moveSelection(1)"
                            @keydown.up.prevent="moveSelection(-1)"
                            @keydown.enter.prevent="runSelected">
                        <kbd class="hidden sm:inline-flex items-center px-1.5 py-0.5 text-xs font-mono text-muted border border-border rounded">
                            ESC
                        </kbd>
                    </div>

                    <!-- Results -->
                    <div class="max-h-80 overflow-y-auto p-2">
                        <p v-if="filteredItems.length === 0" class="py-8 text-center text-sm text-muted">
                            No matching commands.
                        </p>
                        <ul v-else ref="listEl" role="listbox" class="space-y-1">
                            <li v-for="(item, index) in filteredItems" :key="item.id">
                                <button
                                    type="button"
                                    role="option"
                                    :aria-selected="index === selectedIndex"
                                    :class="[
                                        'w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-colors cursor-pointer',
                                        index === selectedIndex
                                            ? 'bg-inverse-bg text-inverse-fg'
                                            : 'text-fg hover:bg-border/40',
                                    ]"
                                    @mouseenter="selectedIndex = index"
                                    @click="execute(item)">
                                    <span class="flex items-center gap-3 min-w-0">
                                        <Icon :name="item.icon" size="18" class="shrink-0" aria-hidden="true" />
                                        <span class="font-medium truncate">{{ item.label }}</span>
                                    </span>
                                    <span
                                        :class="[
                                            'text-xs font-mono shrink-0',
                                            index === selectedIndex ? 'text-inverse-fg/75' : 'text-muted',
                                        ]">
                                        {{ item.hint }}
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </div>

                    <!-- Footer hints -->
                    <div class="px-4 py-2 border-t border-border flex items-center justify-between text-xs text-muted">
                        <span>Navigate with ↑↓ · Select with ↵</span>
                        <span class="font-mono">⌘K / Ctrl+K</span>
                    </div>
                </div>
            </div>
        </Teleport>
    </ClientOnly>
</template>

<script setup lang="ts">
interface CommandItem {
    id: string
    label: string
    hint: string
    icon: string
    keywords?: string
    keepOpen?: boolean
    action: () => void | Promise<void>
}

const route = useRoute()
const router = useRouter()
const { mode, cycle } = useColorMode()
const isResume = computed(() => route.path.startsWith('/resume'))

const isOpen = useState<boolean>('command-palette-open', () => false)
const query = ref('')
const selectedIndex = ref(0)
const inputEl = ref<HTMLInputElement | null>(null)
const listEl = ref<HTMLUListElement | null>(null)
const toastMessage = ref<string | null>(null)
let toastTimer: ReturnType<typeof setTimeout> | null = null
let previousFocus: HTMLElement | null = null

const showToast = (msg: string) => {
    toastMessage.value = msg
    if (toastTimer) clearTimeout(toastTimer)
    toastTimer = setTimeout(() => {
        toastMessage.value = null
    }, 2500)
}

const copyText = async (text: string, label: string) => {
    try {
        await navigator.clipboard.writeText(text)
        showToast(`${label} copied to clipboard`)
    } catch {
        showToast(`Could not copy ${label}`)
    }
}

const commands = computed<CommandItem[]>(() => [
    { id: 'nav-home', label: 'Home', hint: '/', icon: 'heroicons:home', action: () => { router.push('/') } },
    { id: 'nav-about', label: 'About', hint: '/about', icon: 'heroicons:user', action: () => { router.push('/about') } },
    { id: 'nav-projects', label: 'Projects', hint: '/projects', icon: 'heroicons:server-stack', keywords: 'work infrastructure vyos homelab', action: () => { router.push('/projects') } },
    { id: 'nav-achievements', label: 'Achievements', hint: '/achievements', icon: 'heroicons:trophy', action: () => { router.push('/achievements') } },
    { id: 'nav-certificates', label: 'Certificates', hint: '/certificates', icon: 'heroicons:academic-cap', keywords: 'mtcna mtctce ipv6', action: () => { router.push('/certificates') } },
    { id: 'nav-contact', label: 'Contact', hint: '/contact', icon: 'heroicons:envelope', action: () => { router.push('/contact') } },
    { id: 'nav-guestbook', label: 'Guestbook', hint: '/guestbook', icon: 'heroicons:chat-bubble-left-right', action: () => { router.push('/guestbook') } },
    { id: 'nav-resume', label: 'Resume', hint: '/resume', icon: 'heroicons:document-text', keywords: 'cv print', action: () => { router.push('/resume') } },
    { id: 'nav-net', label: 'Network Info', hint: '/net', icon: 'heroicons:globe-alt', keywords: 'ip ipv6 asn cloudflare connection', action: () => { router.push('/net') } },
    { id: 'nav-credits', label: 'Credits', hint: '/credits', icon: 'heroicons:heart', action: () => { router.push('/credits') } },
    {
        id: 'ext-notes',
        label: 'Open Notes',
        hint: 'notes.rizkyfauzan.id',
        icon: 'heroicons:book-open',
        keywords: 'blog docs',
        action: () => { window.open('https://notes.rizkyfauzan.id', '_blank', 'noopener,noreferrer') },
    },
    {
        id: 'act-theme',
        label: `Switch Theme (current: ${mode.value})`,
        hint: mode.value,
        icon: 'heroicons:swatch',
        keywords: 'dark light system color mode',
        keepOpen: true,
        action: () => {
            cycle()
            showToast(`Theme set to ${mode.value}`)
        },
    },
    {
        id: 'act-copy-email',
        label: 'Copy Email Address',
        hint: 'contact@rizkyfauzan.id',
        icon: 'heroicons:clipboard-document',
        keywords: 'mail',
        action: () => copyText('contact@rizkyfauzan.id', 'Email'),
    },
    {
        id: 'act-copy-discord',
        label: 'Copy Discord Username',
        hint: 'fzzzn_',
        icon: 'simple-icons:discord',
        keywords: 'chat',
        action: () => copyText('fzzzn_', 'Discord username'),
    },
])

const filteredItems = computed(() => {
    const q = query.value.trim().toLowerCase()
    if (!q) return commands.value
    return commands.value.filter((item) =>
        item.label.toLowerCase().includes(q)
        || item.hint.toLowerCase().includes(q)
        || (item.keywords?.toLowerCase().includes(q) ?? false),
    )
})

const open = () => {
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    query.value = ''
    selectedIndex.value = 0
    isOpen.value = true
}

const close = () => {
    if (!isOpen.value) return
    isOpen.value = false
    previousFocus?.focus()
    previousFocus = null
}

const moveSelection = (delta: number) => {
    const len = filteredItems.value.length
    if (!len) return
    selectedIndex.value = (selectedIndex.value + delta + len) % len
    nextTick(() => {
        const active = listEl.value?.children[selectedIndex.value] as HTMLElement | undefined
        active?.scrollIntoView({ block: 'nearest' })
    })
}

const execute = (item: CommandItem) => {
    if (!item.keepOpen) close()
    item.action()
}

const runSelected = () => {
    const item = filteredItems.value[selectedIndex.value]
    if (item) execute(item)
}

watch(query, () => {
    selectedIndex.value = 0
})

watch(isOpen, async (opened) => {
    if (!opened) return
    await nextTick()
    inputEl.value?.focus()
})

const onKeydown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (isOpen.value) close()
        else open()
    } else if (e.key === 'Escape' && isOpen.value) {
        e.preventDefault()
        close()
    }
}

onMounted(() => {
    document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
    document.removeEventListener('keydown', onKeydown)
    if (toastTimer) clearTimeout(toastTimer)
})
</script>

<style scoped>
.palette-light {
    --color-bg: #ffffff;
    --color-surface: #ffffff;
    --color-fg: #000000;
    --color-secondary: #333333;
    --color-muted: #737373;
    --color-faint: #b3b3b3;
    --color-border: #e5e5e5;
    --color-line: rgb(0 0 0 / 0.3);
    --color-inverse-bg: #000000;
    --color-inverse-fg: #ffffff;
    color-scheme: light;
}
</style>
