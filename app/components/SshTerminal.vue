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
                    :class="[
                        'bg-bg text-fg border border-border rounded-xl shadow-2xl overflow-hidden font-mono text-xs sm:text-sm flex flex-col transition-[width,max-width,height] duration-200',
                        expanded
                            ? 'w-[95vw] max-w-6xl h-[88vh]'
                            : 'w-full max-w-4xl max-h-[82vh] md:resize',
                    ]"
                    @click.stop>
                    <!-- Terminal Title Bar -->
                    <div class="px-4 py-2.5 bg-surface border-b border-border flex items-center justify-between gap-2 shrink-0">
                        <div class="flex items-center gap-2 min-w-0">
                            <span class="w-2.5 h-2.5 rounded-full bg-faint" aria-hidden="true" />
                            <span class="w-2.5 h-2.5 rounded-full bg-faint" aria-hidden="true" />
                            <span class="w-2.5 h-2.5 rounded-full bg-faint" aria-hidden="true" />
                            <span class="ml-2 text-xs text-muted truncate">
                                fauzan@rizkyfauzan: ~ — Debian 13 (trixie)
                            </span>
                        </div>
                        <div class="flex items-center gap-2 shrink-0">
                            <button
                                type="button"
                                class="text-muted hover:text-fg transition-colors cursor-pointer px-1.5 py-0.5 text-xs"
                                :aria-label="expanded ? 'Restore terminal size' : 'Maximize terminal'"
                                @click="expanded = !expanded">
                                {{ expanded ? 'Restore' : 'Expand' }}
                            </button>
                            <button
                                type="button"
                                class="text-muted hover:text-fg transition-colors cursor-pointer px-1.5 py-0.5 text-xs"
                                aria-label="Close terminal"
                                @click="close">
                                ESC
                            </button>
                        </div>
                    </div>

                    <!-- Nano Editor Mode -->
                    <div v-if="nanoOpen" class="flex-1 flex flex-col min-h-[340px]">
                        <div class="px-4 py-1.5 bg-inverse-bg text-inverse-fg flex items-center justify-between text-xs shrink-0">
                            <span>GNU nano 8.3</span>
                            <span class="font-bold truncate mx-2">{{ nanoFilename }}</span>
                            <span>{{ nanoSaving ? 'Saving...' : 'Haste' }}</span>
                        </div>

                        <textarea
                            ref="nanoEl"
                            v-model="nanoContent"
                            placeholder="Write text here... Press Ctrl+O (or click Save) to upload to haste.zxn.my.id"
                            spellcheck="false"
                            aria-label="Nano editor buffer"
                            class="flex-1 w-full p-4 bg-bg text-fg placeholder:text-muted font-mono text-xs sm:text-sm focus:outline-none resize-none leading-relaxed"
                            @keydown.ctrl.o.prevent="saveNano"
                            @keydown.ctrl.s.prevent="saveNano"
                            @keydown.meta.s.prevent="saveNano"
                            @keydown.ctrl.x.prevent="exitNano" />

                        <div
                            v-if="nanoStatus"
                            class="px-4 py-1.5 border-t border-border bg-surface text-xs text-muted truncate">
                            {{ nanoStatus }}
                        </div>

                        <div class="px-4 py-2 border-t border-border bg-surface flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
                            <div class="flex items-center gap-3">
                                <button
                                    type="button"
                                    :disabled="nanoSaving || !nanoContent.trim()"
                                    class="inline-flex items-center gap-1.5 text-fg hover:underline cursor-pointer disabled:opacity-50"
                                    @click="saveNano">
                                    <kbd class="px-1.5 py-0.5 rounded bg-inverse-bg text-inverse-fg font-bold">^O</kbd>
                                    <span>Save to Haste</span>
                                </button>
                                <button
                                    type="button"
                                    :disabled="nanoSaving"
                                    class="inline-flex items-center gap-1.5 text-fg hover:underline cursor-pointer disabled:opacity-50"
                                    @click="exitNano">
                                    <kbd class="px-1.5 py-0.5 rounded bg-inverse-bg text-inverse-fg font-bold">^X</kbd>
                                    <span>Exit</span>
                                </button>
                            </div>
                            <span class="text-muted">{{ nanoContent.length }} chars</span>
                        </div>
                    </div>

                    <!-- Output Area -->
                    <div
                        v-else
                        ref="outputEl"
                        class="p-4 overflow-y-auto flex-1 space-y-2 leading-relaxed"
                        @click="focusInput">
                        <div v-for="(entry, idx) in entries" :key="idx">
                            <div v-if="entry.command !== undefined" class="flex items-start gap-2">
                                <span class="text-muted shrink-0">fauzan@rizkyfauzan:~$</span>
                                <span class="text-fg break-all">{{ entry.command }}</span>
                            </div>
                            <pre
                                v-if="entry.output"
                                class="whitespace-pre overflow-x-auto text-secondary mt-1 font-mono">{{ entry.output }}</pre>
                            <a
                                v-if="entry.link"
                                :href="entry.link"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-block mt-1 text-fg underline underline-offset-4 hover:text-muted break-all">
                                {{ entry.link }}
                            </a>
                        </div>

                        <!-- Active Prompt -->
                        <form class="flex items-center gap-2 pt-1" @submit.prevent="submit">
                            <span class="text-muted shrink-0">fauzan@rizkyfauzan:~$</span>
                            <input
                                ref="inputEl"
                                v-model="currentInput"
                                type="text"
                                autocomplete="off"
                                autocapitalize="off"
                                spellcheck="false"
                                aria-label="Terminal command input"
                                class="flex-1 bg-transparent text-fg focus:outline-none min-w-0"
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
import { featuredProjects, resumeTranslations } from '~/data/resume'

interface TerminalEntry {
    command?: string
    output?: string
    link?: string
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
    'id',
    'hostname',
    'pwd',
    'date',
    'uptime',
    'uname -a',
    'cat /etc/os-release',
    'cat /etc/motd',
    'cat /etc/hosts',
    'cat about.txt',
    'cat projects.txt',
    'cat skills.txt',
    'cat certs.txt',
    'cat contact.txt',
    'ls',
    'ip addr',
    'ip -6 addr',
    'ip route',
    'ss -tuln',
    'ps aux',
    'df -h',
    'free -h',
    'dig ',
    'curl ifconfig.me',
    'whois rizkyfauzan.id',
    'ping',
    'fastfetch',
    'neofetch',
    'cowsay ',
    'fortune',
    'theme',
    'history',
    'echo ',
    'nano ',
    'open ',
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

const route = useRoute()
const router = useRouter()
const { mode, cycle } = useColorMode()
const sessionStartedAt = Date.now()
const isOpen = useState<boolean>('ssh-terminal-open', () => false)
const entries = ref<TerminalEntry[]>([{ output: MOTD }])
const currentInput = ref('')
const history = ref<string[]>([])
const historyIndex = ref(-1)
const inputEl = ref<HTMLInputElement | null>(null)
const outputEl = ref<HTMLElement | null>(null)
const nanoEl = ref<HTMLTextAreaElement | null>(null)
const nanoOpen = ref(false)
const expanded = ref(false)
const nanoFilename = ref('untitled.txt')
const nanoContent = ref('')
const nanoSaving = ref(false)
const nanoStatus = ref('')
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
    nanoOpen.value = false
    isOpen.value = false
    previousFocus?.focus()
    previousFocus = null
}

const openNano = async (rawCmd: string, filename: string) => {
    await pushEntry(rawCmd)
    nanoFilename.value = filename || 'untitled.txt'
    nanoContent.value = ''
    nanoStatus.value = ''
    nanoOpen.value = true
    await nextTick()
    nanoEl.value?.focus()
}

const exitNano = async () => {
    if (nanoSaving.value) return
    nanoOpen.value = false
    nanoStatus.value = ''
    await nextTick()
    focusInput()
    await scrollToBottom()
}

const saveNano = async () => {
    if (nanoSaving.value || !nanoContent.value.trim()) return
    nanoSaving.value = true
    nanoStatus.value = 'Uploading to haste.zxn.my.id...'
    try {
        const res = await $fetch<{ key: string; url: string }>('/api/haste', {
            method: 'POST',
            body: { content: nanoContent.value },
        })
        let copiedNote = ''
        try {
            await navigator.clipboard.writeText(res.url)
            copiedNote = ' (copied to clipboard)'
        } catch {
            // Clipboard unavailable in restricted contexts.
        }
        nanoOpen.value = false
        nanoStatus.value = ''
        entries.value.push({
            output: `Saved "${nanoFilename.value}" to Haste${copiedNote}:`,
            link: res.url,
        })
        await nextTick()
        focusInput()
        await scrollToBottom()
    } catch (err) {
        const msg = (err as { data?: { statusMessage?: string }; message?: string })?.data?.statusMessage
            || (err as { message?: string })?.message
            || 'Failed to save to Haste.'
        nanoStatus.value = `Error: ${msg}`
    } finally {
        nanoSaving.value = false
    }
}

const pushEntry = async (command: string, output?: string) => {
    entries.value.push({ command, output })
    await scrollToBottom()
}

const LOCAL_PING_TARGETS = new Set(['', 'rizkyfauzan.id', 'www.rizkyfauzan.id', 'localhost', '::1', '127.0.0.1'])

const runPing = async (rawCmd: string, target: string) => {
    if (!LOCAL_PING_TARGETS.has(target.toLowerCase())) {
        await pushEntry(rawCmd, `ping: raw ICMP sockets are not permitted in the browser.\nTry "ping rizkyfauzan.id" for live HTTP RTT to the Cloudflare edge.`)
        return
    }

    const host = target || 'rizkyfauzan.id'
    const idx = entries.value.push({ command: rawCmd, output: `PING ${host} (HTTP RTT to Cloudflare Edge)...` }) - 1
    await scrollToBottom()

    const lines: string[] = [`PING ${host} (HTTP RTT to Cloudflare Edge):`]
    const times: number[] = []
    for (let seq = 1; seq <= 3; seq++) {
        const start = performance.now()
        try {
            const res = await $fetch<{ ip: string; colo: string | null }>('/api/network', { query: { t: Date.now() + seq } })
            const ms = Math.max(1, Math.round(performance.now() - start))
            times.push(ms)
            lines.push(`http_seq=${seq} edge=${res.colo || 'local'} client=${res.ip} time=${ms} ms`)
        } catch {
            lines.push(`Request timeout for http_seq ${seq}`)
        }
        entries.value[idx] = { command: rawCmd, output: lines.join('\n') }
        await scrollToBottom()
    }

    if (times.length) {
        const min = Math.min(...times)
        const max = Math.max(...times)
        const avg = Math.round(times.reduce((a, b) => a + b, 0) / times.length)
        lines.push(`--- ${host} http ping statistics ---`)
        lines.push(`3 requests sent, ${times.length} received, rtt min/avg/max = ${min}/${avg}/${max} ms`)
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
            '  whoami | id | hostname | pwd | date | uptime',
            '  uname -a | ps aux | df -h | free -h',
            '  cat /etc/os-release | /etc/motd | /etc/hosts',
            '  cat about.txt | projects.txt | skills.txt | certs.txt | contact.txt',
            '  ls                    List site routes & files',
            '  ip addr | ip -6 addr  Live visitor IP/ASN & IPv6 status',
            '  ip route | ss -tuln   Site routing table & listening sockets',
            '  dig <domain> [type]   Live DNS lookup via Cloudflare DoH (A, AAAA, MX, TXT...)',
            '  curl ifconfig.me      Print your public IP address',
            '  whois rizkyfauzan.id  Domain & owner summary',
            '  ping [host]           Live HTTP RTT ping to Cloudflare edge',
            '  nano [file]           Write & save text to haste.zxn.my.id',
            '  fastfetch | neofetch  Debian 13 system summary card',
            '  cowsay [text]         Classic ASCII cow',
            '  theme | fortune       Cycle theme or print a random quote',
            '  history | echo <text> Command history or print text',
            '  open <target>         Open notes, github, linkedin, or haste',
            '  cd <route>            Navigate to a page (e.g. cd /projects)',
            '  clear | exit          Clear screen or close session',
        ].join('\n'))
        return
    }

    if (lower === 'whoami') {
        await pushEntry(raw, 'fauzan (Rizky Fauzan Hanif — Network & DevOps Engineer)\nLocation: Sleman, Yogyakarta, Indonesia\nContact : contact@rizkyfauzan.id')
        return
    }

    if (lower === 'id') {
        await pushEntry(raw, 'uid=1000(fauzan) gid=1000(noc) groups=1000(noc),27(sudo),999(docker),1001(bgp)')
        return
    }

    if (lower === 'hostname') {
        await pushEntry(raw, 'rizkyfauzan.id')
        return
    }

    if (lower === 'pwd') {
        await pushEntry(raw, route.path === '/' ? '/home/fauzan' : `/home/fauzan${route.path}`)
        return
    }

    if (lower === 'date') {
        const now = new Date()
        const wib = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Asia/Jakarta',
            dateStyle: 'full',
            timeStyle: 'medium',
            hour12: false,
        }).format(now)
        await pushEntry(raw, `${wib} WIB (UTC+7)\n${now.toUTCString()}`)
        return
    }

    if (lower === 'uptime') {
        const secs = Math.max(1, Math.floor((Date.now() - sessionStartedAt) / 1000))
        const mins = Math.floor(secs / 60)
        const rem = secs % 60
        const upStr = mins > 0 ? `${mins} min, ${rem} sec` : `${secs} sec`
        await pushEntry(raw, `up ${upStr},  1 user,  load average: 0.01, 0.03, 0.05`)
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

    if (lower === 'cat /etc/motd') {
        await pushEntry(raw, MOTD)
        return
    }

    if (lower === 'cat /etc/hosts') {
        await pushEntry(raw, [
            '127.0.0.1       localhost',
            '127.0.1.1       rizkyfauzan.id rizkyfauzan',
            '::1             localhost ip6-localhost ip6-loopback',
            'ff02::1         ip6-allnodes',
            'ff02::2         ip6-allrouters',
        ].join('\n'))
        return
    }

    if (lower === 'cat about.txt') {
        await pushEntry(raw, resumeTranslations.en.aboutMe.join('\n\n'))
        return
    }

    if (lower === 'cat projects.txt') {
        await pushEntry(raw, featuredProjects.map(p => `- ${p.title} (${p.period})\n  ${p.summary}\n  Stack: ${p.stack.join(', ')}`).join('\n\n'))
        return
    }

    if (lower === 'cat skills.txt') {
        await pushEntry(raw, resumeTranslations.en.skills.map(s => `- ${s}`).join('\n'))
        return
    }

    if (lower === 'cat certs.txt') {
        await pushEntry(raw, resumeTranslations.en.certifications.map(c => `- ${c.name} (${c.issuer}, ${c.date})`).join('\n'))
        return
    }

    if (lower === 'cat contact.txt') {
        await pushEntry(raw, [
            'Email    : contact@rizkyfauzan.id',
            'GitHub   : https://github.com/fzzzn',
            'LinkedIn : https://linkedin.com/in/rizky-fauzan-hanif',
            'X        : https://x.com/rizkyfauzanid',
            'Telegram : https://t.me/rizkyfauzanid',
            'Discord  : fzzzn_',
        ].join('\n'))
        return
    }

    if (lower === 'ls' || lower === 'ls -la') {
        const dirs = VALID_ROUTES.filter(r => r !== '/').map(r => `${r.slice(1)}/`)
        const files = ['about.txt', 'projects.txt', 'skills.txt', 'certs.txt', 'contact.txt']
        await pushEntry(raw, [...dirs, ...files].join('  '))
        return
    }

    if (lower === 'ip a' || lower === 'ip addr') {
        try {
            const info = await $fetch<{
                ip: string
                ipVersion: string
                asn: string | null
                organization: string | null
                colo: string | null
                httpProtocol: string | null
                tlsVersion: string | null
            }>('/api/network')
            await pushEntry(raw, [
                '1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536',
                '    inet 127.0.0.1/8 scope host lo',
                '    inet6 ::1/128 scope host',
                '2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500',
                `    ${info.ipVersion === 'IPv6' ? 'inet6' : 'inet'} ${info.ip} scope global`,
                `    asn ${info.asn || 'local'}${info.organization ? ` (${info.organization})` : ''} · edge ${info.colo || 'localhost'}`,
                `    proto ${[info.httpProtocol, info.tlsVersion].filter(Boolean).join(' ') || 'HTTP'}`,
            ].join('\n'))
        } catch {
            await pushEntry(raw, 'ip: failed to query /api/network')
        }
        return
    }

    if (lower === 'ss -tuln' || lower === 'ss') {
        await pushEntry(raw, [
            'Netid  State   Local Address:Port   Process',
            'tcp    LISTEN  [::]:443             cloudflare-edge (https)',
            'udp    LISTEN  [::]:443             cloudflare-edge (http3/quic)',
            'tcp    LISTEN  [::]:179             bgpd (simulated)',
            'udp    LISTEN  [::]:51820           wireguard (simulated)',
            'tcp    LISTEN  127.0.0.1:9090       prometheus (simulated)',
        ].join('\n'))
        return
    }

    if (lower === 'ps' || lower === 'ps aux') {
        await pushEntry(raw, [
            'USER       PID %CPU %MEM COMMAND',
            'root         1  0.0  0.1 /sbin/init',
            'root       142  0.0  0.2 sshd: fauzan@pts/0',
            'fauzan     301  0.2  1.4 /usr/bin/node /srv/rizkyfauzan.id/worker.mjs',
            'fauzan     412  0.1  0.4 /usr/sbin/bgpd --config /etc/frr/bgpd.conf',
            'fauzan     518  0.0  0.1 -bash',
        ].join('\n'))
        return
    }

    if (lower === 'df' || lower === 'df -h') {
        await pushEntry(raw, [
            'Filesystem      Size  Used Avail Use% Mounted on',
            'cloudflare-edge  10G  1.9M   10G   1% /',
            'supabase-pg     500M   12M  488M   3% /srv/guestbook',
            'sharp-avif-cdn    1G  480K  1.0G   1% /var/www/images',
        ].join('\n'))
        return
    }

    if (lower === 'free' || lower === 'free -h') {
        await pushEntry(raw, [
            '               total        used        free      available',
            'Mem:           128Mi        18Mi       110Mi          110Mi',
            'Swap:             0B          0B          0B',
        ].join('\n'))
        return
    }

    if (lower === 'dig' || lower.startsWith('dig ')) {
        const parts = raw.split(/\s+/).slice(1)
        const domain = parts[0] || 'rizkyfauzan.id'
        const recordType = (parts[1] || 'A').toUpperCase()
        const idx = entries.value.push({ command: raw, output: `; Querying ${domain} (${recordType}) via Cloudflare DoH...` }) - 1
        await scrollToBottom()
        try {
            const res = await $fetch<{
                name: string
                type: string
                status: number
                answers: { name: string; TTL: number; data: string }[]
            }>('/api/dns', { query: { name: domain, type: recordType } })
            const lines = [
                `; <<>> DiG (Cloudflare DoH) <<>> ${res.name} ${res.type}`,
                `;; status: ${res.status === 0 ? 'NOERROR' : `RCODE_${res.status}`}, answers: ${res.answers.length}`,
                '',
            ]
            if (res.answers.length) {
                lines.push(';; ANSWER SECTION:')
                for (const ans of res.answers) {
                    lines.push(`${ans.name.padEnd(26)} ${String(ans.TTL).padStart(5)}  IN  ${res.type.padEnd(5)} ${ans.data}`)
                }
            } else {
                lines.push(`;; No ${res.type} records found for ${res.name}`)
            }
            entries.value[idx] = { command: raw, output: lines.join('\n') }
        } catch (err) {
            const msg = (err as { data?: { statusMessage?: string } })?.data?.statusMessage || 'DNS lookup failed.'
            entries.value[idx] = { command: raw, output: `dig: ${msg}` }
        }
        await scrollToBottom()
        return
    }

    if (lower === 'curl ifconfig.me' || lower === 'curl ip.me' || lower === 'curl icanhazip.com') {
        try {
            const info = await $fetch<{ ip: string }>('/api/network')
            await pushEntry(raw, info.ip)
        } catch {
            await pushEntry(raw, 'curl: (6) Could not resolve host')
        }
        return
    }

    if (lower.startsWith('curl ')) {
        await pushEntry(raw, 'Try "curl ifconfig.me" to print your public IP.')
        return
    }

    if (lower === 'whois' || lower.startsWith('whois ')) {
        await pushEntry(raw, [
            'Domain Name  : rizkyfauzan.id',
            'Registrant   : Rizky Fauzan Hanif',
            'Role         : Network & DevOps Engineer',
            'Location     : Sleman, Yogyakarta, Indonesia',
            'Credentials  : MTCNA · MTCTCE · Hurricane Electric IPv6 Sage',
            'Edge Network : Cloudflare Pages (HTTP/3, IPv6)',
        ].join('\n'))
        return
    }

    if (lower === 'cowsay' || lower.startsWith('cowsay ')) {
        const msg = raw.slice(6).trim() || getRandomQuote()
        const bar = '-'.repeat(Math.min(msg.length + 2, 48))
        await pushEntry(raw, [
            ` ${bar}`,
            `< ${msg} >`,
            ` ${bar}`,
            '        \\   ^__^',
            '         \\  (oo)\\_______',
            '            (__)\\       )\\/\\',
            '                ||----w |',
            '                ||     ||',
        ].join('\n'))
        return
    }

    if (lower.startsWith('open ')) {
        const target = raw.slice(5).trim().toLowerCase()
        const links: Record<string, string> = {
            notes: 'https://notes.rizkyfauzan.id',
            github: 'https://github.com/fzzzn',
            linkedin: 'https://linkedin.com/in/rizky-fauzan-hanif',
            haste: 'https://haste.zxn.my.id',
            x: 'https://x.com/rizkyfauzanid',
            telegram: 'https://t.me/rizkyfauzanid',
        }
        const url = links[target]
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer')
            await pushEntry(raw, `Opening ${url}...`)
        } else {
            await pushEntry(raw, `open: unknown target "${target}". Try: ${Object.keys(links).join(', ')}`)
        }
        return
    }

    if (lower === 'fortune') {
        await pushEntry(raw, `"${getRandomQuote()}"`)
        return
    }

    if (lower === 'theme') {
        cycle()
        await pushEntry(raw, `Color mode switched to: ${mode.value}`)
        return
    }

    if (lower === 'history') {
        await pushEntry(raw, history.value.map((cmd, idx) => `${String(idx + 1).padStart(3)}  ${cmd}`).join('\n'))
        return
    }

    if (lower === 'echo' || lower.startsWith('echo ')) {
        await pushEntry(raw, raw.slice(5))
        return
    }

    if (lower === 'nano' || lower.startsWith('nano ')) {
        const filename = raw.slice(4).trim() || 'untitled.txt'
        await openNano(raw, filename)
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
            ' Y$$.    `.`"Y$$$$P"\'         Loc    : Yogyakarta, Indonesia',
            ' `$$b      "-.__              Site   : https://rizkyfauzan.id',
            '  `Y$$',
            '   `Y$$.',
            '     `$$b.',
            '       `Y$$b.',
            '          `"Y$b._',
            '              `"""',
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

    if (lower === 'cd' || lower === 'cd ~' || lower.startsWith('cd ')) {
        const arg = raw.split(/\s+/)[1]
        const dest = !arg || arg === '~' ? '/' : arg
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
        if (nanoOpen.value) exitNano()
        else close()
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
