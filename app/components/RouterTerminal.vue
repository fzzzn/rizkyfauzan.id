<template>
    <ClientOnly>
        <Teleport to="body">
            <div
                v-if="isOpen"
                role="dialog"
                aria-modal="true"
                aria-label="Debian 13 SSH Terminal"
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
                                fauzan@rizkyfauzan: ~ — Debian 13 (trixie)
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
                                <span class="text-[#9a9aa2] shrink-0">fauzan@rizkyfauzan:~$</span>
                                <span class="text-[#ededef] break-all">{{ entry.command }}</span>
                            </div>
                            <pre
                                v-if="entry.output"
                                class="whitespace-pre-wrap text-[#c8c8cc] mt-1 font-mono">{{ entry.output }}</pre>
                        </div>

                        <!-- Active Prompt -->
                        <form class="flex items-center gap-2 pt-1" @submit.prevent="submit">
                            <span class="text-[#9a9aa2] shrink-0">fauzan@rizkyfauzan:~$</span>
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

const MOTD = [
    'Linux rizkyfauzan 6.12.0-trixie-amd64 #1 SMP PREEMPT_DYNAMIC Debian 13 (trixie)',
    '',
    'The programs included with the Debian GNU/Linux system are free software;',
    'the exact distribution terms for each program are described in the',
    'individual files in /usr/share/doc/*/copyright.',
    '',
    'Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent',
    'permitted by applicable law.',
    'Type "help" for available commands (Tab autocomplete supported).',
].join('\n')

const VALID_ROUTES = ['/', '/about', '/projects', '/achievements', '/certificates', '/contact', '/guestbook', '/resume', '/net', '/credits']

const COMMANDS = [
    'help',
    'whoami',
    'uname -a',
    'cat /etc/os-release',
    'ls',
    'ip route',
    'ip -6 addr',
    'ping',
    'fastfetch',
    'neofetch',
    'cd ',
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
const entries = ref<TerminalEntry[]>([{ output: MOTD }])
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
            lines.push(`64 bytes from ${res.colo || 'edge'} (${res.ip}): icmp_seq=${seq} ttl=64 time=${ms} ms`)
        } catch {
            lines.push(`Request timeout for icmp_seq ${seq}`)
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

    if (lower === 'exit' || lower === 'quit' || lower === 'logout') {
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
            '  whoami                Profile summary',
            '  uname -a              Kernel & OS version',
            '  cat /etc/os-release   Debian 13 (trixie) release info',
            '  ls                    List site routes',
            '  ip route              Site routing table',
            '  ip -6 addr            IPv6 loopback & certification',
            '  ping [host]           Live edge RTT ping (3 packets)',
            '  fastfetch | neofetch  System summary card',
            '  cd <route>            Navigate to a page (e.g. cd /projects)',
            '  clear | exit          Clear screen or close session',
        ].join('\n'))
        return
    }

    if (lower === 'whoami') {
        await pushEntry(raw, 'fauzan (Rizky Fauzan Hanif — Network & DevOps Engineer)\nLocation: Sleman, Yogyakarta, Indonesia\nContact : contact@rizkyfauzan.id')
        return
    }

    if (lower === 'uname' || lower === 'uname -a') {
        await pushEntry(raw, 'Linux rizkyfauzan 6.12.0-trixie-amd64 #1 SMP PREEMPT_DYNAMIC Debian 13 (trixie) x86_64 GNU/Linux')
        return
    }

    if (lower === 'cat /etc/os-release') {
        await pushEntry(raw, [
            'PRETTY_NAME="Debian GNU/Linux 13 (trixie)"',
            'NAME="Debian GNU/Linux"',
            'VERSION_ID="13"',
            'VERSION="13 (trixie)"',
            'VERSION_CODENAME=trixie',
            'ID=debian',
            'HOME_URL="https://rizkyfauzan.id/"',
        ].join('\n'))
        return
    }

    if (lower === 'ls' || lower === 'ls -la') {
        await pushEntry(raw, VALID_ROUTES.map(r => (r === '/' ? './' : `${r.slice(1)}/`)).join('  '))
        return
    }

    if (lower === 'ip route' || lower === 'ip r') {
        await pushEntry(raw, VALID_ROUTES.map(r => `${r.padEnd(15)} via rizkyfauzan.id dev eth0 proto static`).join('\n'))
        return
    }

    if (lower === 'ip -6 addr' || lower === 'ip -6 a' || lower === '::1') {
        await pushEntry(raw, [
            '1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536',
            '    inet6 ::1/128 scope host  # There is no place like ::1',
            '2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500',
            '    # Certified IPv6 Sage by Hurricane Electric',
        ].join('\n'))
        return
    }

    if (lower === 'fastfetch' || lower === 'neofetch') {
        await pushEntry(raw, [
            '       _,met$$$$$gg.          fauzan@rizkyfauzan',
            '    ,g$$$$$$$$$$$$$$$P.       ──────────────────',
            '  ,g$$P"     """Y$$.".        OS     : Debian GNU/Linux 13 (trixie)',
            ' ,$$P\'              `$$$.     Host   : Cloudflare Pages (Edge SSR)',
            '\',$$P       ,ggs.     `$$b:   Kernel : 6.12.0-trixie-amd64',
            '`d$$\'     ,$P"\'   .    $$$    Shell  : bash 5.2',
            ' $$P      d$\'     ,    $$P    Role   : Network & DevOps Engineer',
            ' $$:      $$.   -    ,d$$\'    Certs  : MTCNA · MTCTCE · IPv6 Sage',
            ' $$;      Y$b._   _,d$P\'      Stack  : Nuxt 4 · Vue 3 · Supabase',
        ].join('\n'))
        return
    }

    if (lower === 'dns') {
        await pushEntry(raw, "It's always DNS.")
        return
    }

    if (lower.startsWith('sudo')) {
        await pushEntry(raw, 'fauzan is not in the sudoers file. This incident will be reported.')
        return
    }

    if (lower === 'ping' || lower.startsWith('ping ')) {
        const target = raw.slice(4).trim() || 'rizkyfauzan.id'
        await runPing(raw, target)
        return
    }

    if (lower.startsWith('cd ')) {
        const dest = raw.split(/\s+/)[1] || '/'
        const normalized = dest.startsWith('/') ? dest : `/${dest}`
        if (VALID_ROUTES.includes(normalized)) {
            await pushEntry(raw, `Navigating to ${normalized}...`)
            close()
            router.push(normalized)
        } else {
            await pushEntry(raw, `bash: cd: ${dest}: No such file or directory (try "ls")`)
        }
        return
    }

    await pushEntry(raw, `bash: ${raw.split(/\s+/)[0]}: command not found (type "help")`)
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

    const navMatch = lower.match(/^cd\s+(.*)$/)
    if (navMatch) {
        const arg = navMatch[1]!
        const normalizedArg = arg && !arg.startsWith('/') ? `/${arg}` : arg
        const matches = VALID_ROUTES.filter(r => r.startsWith(normalizedArg))
        if (matches.length === 1) {
            currentInput.value = `cd ${matches[0]}`
        } else if (matches.length > 1) {
            const prefix = commonPrefix(matches)
            if (prefix.length > normalizedArg.length) {
                currentInput.value = `cd ${prefix}`
            } else {
                await pushEntry(raw, matches.join('   '))
            }
        }
        return
    }

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
