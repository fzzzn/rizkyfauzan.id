<template>
    <ClientOnly>
        <Teleport to="body">
            <div
                v-if="isOpen"
                role="dialog"
                aria-modal="true"
                aria-label="RouterOS Easter Egg Terminal"
                class="print:hidden fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
                @click="close">
                <div
                    class="w-full max-w-2xl bg-[#0c0c0d] text-[#ededef] border border-[#27272a] rounded-xl shadow-2xl overflow-hidden font-mono text-xs sm:text-sm flex flex-col max-h-[80vh]"
                    @click.stop>
                    <!-- Terminal Title Bar -->
                    <div class="px-4 py-2.5 bg-[#161618] border-b border-[#27272a] flex items-center justify-between gap-2 shrink-0">
                        <div class="flex items-center gap-2 min-w-0">
                            <span class="w-2.5 h-2.5 rounded-full bg-[#3f3f46]" aria-hidden="true" />
                            <span class="w-2.5 h-2.5 rounded-full bg-[#3f3f46]" aria-hidden="true" />
                            <span class="w-2.5 h-2.5 rounded-full bg-[#3f3f46]" aria-hidden="true" />
                            <span class="ml-2 text-xs text-[#9a9aa2] truncate">
                                ssh fauzan@rizkyfauzan.id — RouterOS v7
                            </span>
                        </div>
                        <button
                            type="button"
                            class="text-[#9a9aa2] hover:text-[#ededef] transition-colors cursor-pointer px-1.5 py-0.5 text-xs"
                            aria-label="Close terminal"
                            @click="close">
                            ESC
                        </button>
                    </div>

                    <!-- Output Area -->
                    <div
                        ref="outputEl"
                        class="p-4 overflow-y-auto flex-1 space-y-2 leading-relaxed"
                        @click="focusInput">
                        <div v-for="(entry, idx) in entries" :key="idx">
                            <div v-if="entry.command !== undefined" class="flex items-start gap-2">
                                <span class="text-[#9a9aa2] shrink-0">[fauzan@rizkyfauzan.id] &gt;</span>
                                <span class="text-[#ededef] break-all">{{ entry.command }}</span>
                            </div>
                            <pre
                                v-if="entry.output"
                                class="whitespace-pre-wrap text-[#c8c8cc] mt-1 font-mono">{{ entry.output }}</pre>
                        </div>

                        <!-- Active Prompt -->
                        <form class="flex items-center gap-2 pt-1" @submit.prevent="submit">
                            <span class="text-[#9a9aa2] shrink-0">[fauzan@rizkyfauzan.id] &gt;</span>
                            <input
                                ref="inputEl"
                                v-model="currentInput"
                                type="text"
                                autocomplete="off"
                                autocapitalize="off"
                                spellcheck="false"
                                aria-label="Terminal command input"
                                class="flex-1 bg-transparent text-[#ededef] focus:outline-none min-w-0"
                                @keydown.up.prevent="browseHistory(-1)"
                                @keydown.down.prevent="browseHistory(1)"
                                @keydown.tab.prevent="autocomplete">
                        </form>
                    </div>
                </div>
            </div>
        </Teleport>
    </ClientOnly>
</template>

<script setup lang="ts">
interface TerminalEntry {
    command?: string
    output?: string
}

const BANNER = [
    '  MMM      MMM       KKK                          TTTTTTTTTTT      KKK',
    '  MMMM    MMMM       KKK                          TTTTTTTTTTT      KKK',
    '  MMM MMMM MMM  III  KKK  KKK  RRRRRR     OOOOOO      TTT     III  KKK  KKK',
    '  MMM  MM  MMM  III  KKKKK     RRR  RRR  OOO  OOO     TTT     III  KKKKK',
    '  MMM      MMM  III  KKK  KKK  RRRRRR    OOO  OOO     TTT     III  KKK  KKK',
    '  MMM      MMM  III  KKK  KKK  RRR  RRR   OOOOOO      TTT     III  KKK  KKK',
    '',
    '  rizkyfauzan.id RouterOS v7 (Cloudflare Edge) — type "help" for commands.',
].join('\n')

const VALID_ROUTES = ['/', '/about', '/projects', '/achievements', '/certificates', '/contact', '/guestbook', '/resume', '/net', '/credits']

const COMMANDS = [
    'help',
    'whoami',
    '/system resource print',
    '/ip route print',
    '/ipv6 address print',
    'ping',
    'neofetch',
    'cd ',
    'goto ',
    'dns',
    'clear',
    'exit',
]

const commonPrefix = (list: string[]): string => {
    if (!list.length) return ''
    let prefix = list[0]!
    for (let i = 1; i < list.length; i++) {
        while (!list[i]!.startsWith(prefix)) {
            prefix = prefix.slice(0, -1)
            if (!prefix) return ''
        }
    }
    return prefix
}

const router = useRouter()
const isOpen = useState<boolean>('router-terminal-open', () => false)
const entries = ref<TerminalEntry[]>([{ output: BANNER }])
const currentInput = ref('')
const history = ref<string[]>([])
const historyIndex = ref(-1)
const inputEl = ref<HTMLInputElement | null>(null)
const outputEl = ref<HTMLElement | null>(null)
let previousFocus: HTMLElement | null = null

const scrollToBottom = async () => {
    await nextTick()
    if (outputEl.value) {
        outputEl.value.scrollTop = outputEl.value.scrollHeight
    }
}

const focusInput = () => {
    inputEl.value?.focus()
}

const open = () => {
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    isOpen.value = true
}

const close = () => {
    if (!isOpen.value) return
    isOpen.value = false
    previousFocus?.focus()
    previousFocus = null
}

const pushEntry = async (command: string, output?: string) => {
    entries.value.push({ command, output })
    await scrollToBottom()
}

const runPing = async (rawCmd: string, target: string) => {
    const idx = entries.value.push({ command: rawCmd, output: `PING ${target} via Cloudflare Edge...` }) - 1
    await scrollToBottom()

    const lines: string[] = [`PING ${target} via Cloudflare Edge:`]
    for (let seq = 1; seq <= 3; seq++) {
        const start = performance.now()
        try {
            const res = await $fetch<{ ip: string; colo: string | null }>('/api/network', { query: { t: Date.now() + seq } })
            const ms = Math.max(1, Math.round(performance.now() - start))
            lines.push(`  seq=${seq} from=${res.colo || 'edge'} ip=${res.ip} time=${ms}ms`)
        } catch {
            lines.push(`  seq=${seq} timeout`)
        }
        entries.value[idx] = { command: rawCmd, output: lines.join('\n') }
        await scrollToBottom()
    }
}

const submit = async () => {
    const raw = currentInput.value.trim()
    currentInput.value = ''

    if (!raw) {
        await pushEntry('')
        return
    }

    history.value.push(raw)
    historyIndex.value = history.value.length

    const lower = raw.toLowerCase()

    if (lower === 'exit' || lower === 'quit') {
        close()
        return
    }

    if (lower === 'clear' || lower === 'cls') {
        entries.value = []
        return
    }

    if (lower === 'help' || lower === '?') {
        await pushEntry(raw, [
            'Available commands:',
            '  whoami                   Profile summary',
            '  /system resource print   System & stack info',
            '  /ip route print          Site routing table',
            '  /ipv6 address print      IPv6 status',
            '  ping [host]              Live edge RTT ping (3 packets)',
            '  neofetch                 Monochrome system card',
            '  cd <route>               Navigate to a page (e.g. cd /projects)',
            '  clear | exit             Clear screen or close session',
        ].join('\n'))
        return
    }

    if (lower === 'whoami') {
        await pushEntry(raw, 'Rizky Fauzan Hanif — Network Engineer (MTCNA, MTCTCE, IPv6 Sage)\nLocation: Sleman, Yogyakarta, Indonesia\nContact : contact@rizkyfauzan.id')
        return
    }

    if (lower === '/system resource print' || lower === 'sys' || lower === 'uname -a') {
        await pushEntry(raw, [
            '        platform: Cloudflare Pages (Edge SSR)',
            '       framework: Nuxt 4 + Vue 3 + Tailwind CSS v4',
            '        database: Supabase (PostgreSQL + RLS)',
            '  certifications: MTCNA · MTCTCE · IPv6 Sage',
            '          status: operational',
        ].join('\n'))
        return
    }

    if (lower === '/ip route print' || lower === 'ls' || lower === 'routes') {
        await pushEntry(raw, [
            'Flags: A - ACTIVE; c - CONNECT',
            '  #   DST-ADDRESS      GATEWAY',
            ...VALID_ROUTES.map((r, i) => `  ${i} Ac ${r.padEnd(16)} rizkyfauzan.id`),
        ].join('\n'))
        return
    }

    if (lower === '/ipv6 address print' || lower === '::1') {
        await pushEntry(raw, '  0 G ::1/128  interface=lo  comment="There is no place like ::1"\n  Certified IPv6 Sage by Hurricane Electric.')
        return
    }

    if (lower === 'neofetch') {
        await pushEntry(raw, [
            '  ┌──────────────┐  fauzan@rizkyfauzan.id',
            '  │  RIZKY       │  ─────────────────────',
            '  │  FAUZAN.ID   │  Role  : Network & DevOps Engineer',
            '  │  [MTCNA/TCE] │  Stack : VyOS, MikroTik, Proxmox, Docker',
            '  └──────────────┘  Web   : Nuxt 4, TypeScript, Cloudflare',
        ].join('\n'))
        return
    }

    if (lower === 'dns') {
        await pushEntry(raw, "It's always DNS.")
        return
    }

    if (lower.startsWith('sudo')) {
        await pushEntry(raw, 'fauzan is not in the sudoers file. This incident will be reported to the NOC.')
        return
    }

    if (lower === 'ping' || lower.startsWith('ping ')) {
        const target = raw.slice(4).trim() || 'rizkyfauzan.id'
        await runPing(raw, target)
        return
    }

    if (lower.startsWith('cd ') || lower.startsWith('goto ')) {
        const dest = raw.split(/\s+/)[1] || '/'
        const normalized = dest.startsWith('/') ? dest : `/${dest}`
        if (VALID_ROUTES.includes(normalized)) {
            await pushEntry(raw, `Routing to ${normalized}...`)
            close()
            router.push(normalized)
        } else {
            await pushEntry(raw, `no route to host: ${normalized} (try "/ip route print")`)
        }
        return
    }

    await pushEntry(raw, `bad command name "${raw}" — type "help" for available commands.`)
}

const browseHistory = (delta: number) => {
    if (!history.value.length) return
    const next = Math.min(Math.max(historyIndex.value + delta, 0), history.value.length)
    historyIndex.value = next
    currentInput.value = next === history.value.length ? '' : (history.value[next] ?? '')
}

const autocomplete = async () => {
    const raw = currentInput.value
    const lower = raw.toLowerCase()

    // Complete route argument for `cd ` or `goto `
    const navMatch = lower.match(/^(cd|goto)\s+(.*)$/)
    if (navMatch) {
        const verb = navMatch[1]!
        const arg = navMatch[2]!
        const normalizedArg = arg && !arg.startsWith('/') ? `/${arg}` : arg
        const matches = VALID_ROUTES.filter(r => r.startsWith(normalizedArg))
        if (matches.length === 1) {
            currentInput.value = `${verb} ${matches[0]}`
        } else if (matches.length > 1) {
            const prefix = commonPrefix(matches)
            if (prefix.length > normalizedArg.length) {
                currentInput.value = `${verb} ${prefix}`
            } else {
                await pushEntry(raw, matches.join('   '))
            }
        }
        return
    }

    // Complete top-level commands
    const matches = COMMANDS.filter(cmd => cmd.startsWith(lower))
    if (matches.length === 1) {
        currentInput.value = matches[0]!
    } else if (matches.length > 1) {
        const prefix = commonPrefix(matches)
        if (prefix.length > lower.length) {
            currentInput.value = prefix
        } else {
            await pushEntry(raw, matches.map(m => m.trim()).join('   '))
        }
    }
}

watch(isOpen, async (opened) => {
    if (!opened) return
    await nextTick()
    focusInput()
    await scrollToBottom()
})

const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen.value) {
        e.preventDefault()
        close()
        return
    }
    const target = e.target as HTMLElement | null
    const isEditable = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
    if (e.key === '`' && !e.ctrlKey && !e.metaKey && !e.altKey && !isEditable) {
        e.preventDefault()
        if (isOpen.value) close()
        else open()
    }
}

onMounted(() => {
    document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
    document.removeEventListener('keydown', onKeydown)
})
</script>
