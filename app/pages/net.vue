<template>
    <div class="p-6">
        <PageHeader
            title="Network Info"
            description="Your live connection details as seen from the Cloudflare edge." />

        <div class="max-w-3xl mx-auto mb-16">
            <div v-if="pending" class="bg-surface border border-border rounded-xl p-6 animate-pulse space-y-4">
                <div class="h-6 w-1/3 bg-muted/20 rounded" />
                <div class="h-10 w-2/3 bg-muted/20 rounded" />
                <div class="grid grid-cols-2 gap-4 pt-4">
                    <div v-for="n in 4" :key="n" class="h-16 bg-muted/20 rounded-lg" />
                </div>
            </div>

            <div
                v-else-if="error || !info"
                class="bg-surface border border-border rounded-xl p-6 text-center text-muted">
                Could not inspect connection metadata right now.
            </div>

            <div v-else class="bg-surface border border-border rounded-xl overflow-hidden">
                <!-- IP Hero -->
                <div class="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div class="min-w-0 space-y-3">
                        <div>
                            <div class="flex flex-wrap items-center gap-2 mb-1.5">
                                <span class="text-xs font-mono uppercase tracking-wider text-muted">
                                    {{ info.ipVersion === 'IPv6' ? 'IPv6 Address' : 'Your IP Address' }}
                                </span>
                                <span
                                    :class="[
                                        'text-xs font-mono font-bold px-2 py-0.5 rounded-full border',
                                        info.ipVersion === 'IPv6'
                                            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-400'
                                            : 'border-border text-muted',
                                    ]">
                                    {{ info.ipVersion === 'IPv6' ? 'IPv6 Ready' : info.ipVersion }}
                                </span>
                                <span
                                    v-if="isDualStack"
                                    class="text-xs font-mono font-bold px-2 py-0.5 rounded-full border bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-400">
                                    Dual-Stack
                                </span>
                            </div>
                            <p class="text-xl sm:text-2xl font-mono font-bold text-fg break-all">
                                {{ info.ip }}
                            </p>
                        </div>

                        <div v-if="secondaryIp" class="flex flex-wrap items-center gap-2 pt-1">
                            <span class="text-xs font-mono uppercase tracking-wider text-muted">
                                {{ secondaryLabel }}:
                            </span>
                            <span class="text-sm sm:text-base font-mono font-semibold text-secondary break-all">
                                {{ secondaryIp }}
                            </span>
                            <button
                                type="button"
                                class="text-xs font-mono text-muted hover:text-fg underline underline-offset-2 cursor-pointer"
                                @click="copySecondaryIp">
                                {{ copiedSecondary ? 'Copied' : 'Copy' }}
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 shrink-0">
                        <button
                            type="button"
                            :disabled="pinging"
                            class="border border-border text-fg px-4 py-2 rounded-lg hover:bg-fg/5 transition-colors text-sm font-semibold cursor-pointer inline-flex items-center justify-center gap-2 disabled:opacity-50"
                            @click="runPingTest">
                            <Icon name="heroicons:signal" size="16" aria-hidden="true" />
                            <span>{{ pinging ? 'Pinging...' : 'Ping Edge' }}</span>
                        </button>
                        <button
                            type="button"
                            class="bg-inverse-bg text-inverse-fg px-4 py-2 rounded-lg hover:opacity-80 transition-opacity text-sm font-semibold cursor-pointer inline-flex items-center justify-center gap-2"
                            @click="copyIp">
                            <Icon :name="copied ? 'heroicons:check' : 'heroicons:clipboard-document'" size="16" aria-hidden="true" />
                            <span>{{ copied ? 'Copied' : 'Copy IP' }}</span>
                        </button>
                    </div>
                </div>

                <!-- Latency results -->
                <div
                    v-if="latencyStats"
                    class="px-6 py-3.5 border-b border-border bg-bg/50 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <span class="text-muted">
                        Edge RTT (3 pings):
                        <strong class="text-fg">{{ latencyStats.min }} ms</strong> min ·
                        <strong class="text-fg">{{ latencyStats.avg }} ms</strong> avg
                    </span>
                    <span class="text-muted">
                        [{{ latencyStats.samples.map(s => `${s}ms`).join(', ') }}]
                    </span>
                </div>

                <!-- Edge Telemetry Grid -->
                <dl class="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:gap-px bg-border">
                    <div class="bg-surface p-5">
                        <dt class="text-xs font-mono uppercase tracking-wider text-muted">ASN & Network</dt>
                        <dd class="mt-1.5 text-base font-bold text-fg">
                            {{ info.asn ? `${info.asn}${info.organization ? ` · ${info.organization}` : ''}` : 'Local / Unavailable' }}
                        </dd>
                    </div>
                    <div class="bg-surface p-5">
                        <dt class="text-xs font-mono uppercase tracking-wider text-muted">Cloudflare Edge PoP</dt>
                        <dd class="mt-1.5 text-base font-mono font-bold text-fg">
                            {{ info.colo || 'Local Dev' }}
                        </dd>
                    </div>
                    <div class="bg-surface p-5">
                        <dt class="text-xs font-mono uppercase tracking-wider text-muted">Protocol & TLS</dt>
                        <dd class="mt-1.5 text-base font-mono font-bold text-fg">
                            {{ [info.httpProtocol, info.tlsVersion].filter(Boolean).join(' · ') || 'Local HTTP' }}
                        </dd>
                    </div>
                    <div class="bg-surface p-5">
                        <dt class="text-xs font-mono uppercase tracking-wider text-muted">Approximate Location</dt>
                        <dd class="mt-1.5 text-base font-bold text-fg">
                            {{ info.location || 'Localhost' }}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface NetworkInfo {
    ip: string
    ipVersion: 'IPv6' | 'IPv4' | 'local'
    asn: string | null
    organization: string | null
    colo: string | null
    location: string | null
    httpProtocol: string | null
    tlsVersion: string | null
}

useScrollReveal()

useSeoMeta({
    title: 'Network Info — IPv6 & Edge Inspector',
    description: 'Inspect your live IPv4/IPv6 connection, ASN, TLS version, and Cloudflare edge PoP on rizkyfauzan.id.',
    ogTitle: 'Network Info — rizkyfauzan.id',
    ogDescription: 'Live IPv4/IPv6, ASN, and Cloudflare edge telemetry for your connection.',
})

usePageOgImage('net', 'Network Info — IPv6 & Edge Inspector')

const { data: info, pending, error } = await useFetch<NetworkInfo>('/api/network', {
    server: false,
})

const copied = ref(false)
const copiedSecondary = ref(false)
const secondaryIp = ref<string | null>(null)
const secondaryLabel = ref<'IPv4' | 'IPv6'>('IPv4')
const pinging = ref(false)
const latencyStats = ref<{ min: number; avg: number; samples: number[] } | null>(null)
let copyTimer: ReturnType<typeof setTimeout> | null = null
let secondaryCopyTimer: ReturnType<typeof setTimeout> | null = null

const isDualStack = computed(() => Boolean(secondaryIp.value))

const detectAlternateStack = async (primaryVersion: NetworkInfo['ipVersion']) => {
    if (primaryVersion === 'local') return
    const checkV4 = primaryVersion === 'IPv6'
    const endpoint = checkV4
        ? 'https://api4.ipify.org?format=json'
        : 'https://api6.ipify.org?format=json'
    secondaryLabel.value = checkV4 ? 'IPv4' : 'IPv6'

    try {
        const res = await fetch(endpoint, { signal: AbortSignal.timeout(3000) })
        if (!res.ok) return
        const data = await res.json() as { ip?: string }
        if (data?.ip && data.ip !== info.value?.ip) {
            secondaryIp.value = data.ip
        }
    } catch {
        // Single-stack network or timeout — leave secondaryIp null.
    }
}

watch(info, (val) => {
    if (val && !secondaryIp.value) {
        detectAlternateStack(val.ipVersion)
    }
}, { immediate: true })

const copySecondaryIp = async () => {
    if (!secondaryIp.value) return
    try {
        await navigator.clipboard.writeText(secondaryIp.value)
        copiedSecondary.value = true
        if (secondaryCopyTimer) clearTimeout(secondaryCopyTimer)
        secondaryCopyTimer = setTimeout(() => {
            copiedSecondary.value = false
        }, 2000)
    } catch {
        // Ignore clipboard errors in restricted contexts.
    }
}

const runPingTest = async () => {
    if (pinging.value) return
    pinging.value = true
    const samples: number[] = []
    try {
        for (let i = 0; i < 3; i++) {
            const start = performance.now()
            await $fetch('/api/network', { query: { t: Date.now() + i } })
            samples.push(Math.max(1, Math.round(performance.now() - start)))
        }
        const min = Math.min(...samples)
        const avg = Math.round(samples.reduce((sum, n) => sum + n, 0) / samples.length)
        latencyStats.value = { min, avg, samples }
    } catch {
        latencyStats.value = null
    } finally {
        pinging.value = false
    }
}

const copyIp = async () => {
    if (!info.value?.ip) return
    try {
        await navigator.clipboard.writeText(info.value.ip)
        copied.value = true
        if (copyTimer) clearTimeout(copyTimer)
        copyTimer = setTimeout(() => {
            copied.value = false
        }, 2000)
    } catch {
        // Ignore clipboard errors in restricted contexts.
    }
}

onUnmounted(() => {
    if (copyTimer) clearTimeout(copyTimer)
    if (secondaryCopyTimer) clearTimeout(secondaryCopyTimer)
})
</script>
