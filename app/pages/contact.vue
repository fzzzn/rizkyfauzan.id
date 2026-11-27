<template>
    <div class="p-6">
        <!-- Toast Notification -->
        <Transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-2">
            <div v-if="showToast"
                class="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-inverse-bg text-inverse-fg px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2">
                <Icon name="heroicons:check-circle" size="20" class="text-green-400" />
                <span class="font-medium">Discord username copied to clipboard!</span>
            </div>
        </Transition>

        <!-- Header -->
        <PageHeader title="Contact" />

        <!-- Contact Cards. The inner grid is a single reveal batch, so the
             cards cascade in together instead of each firing its own trigger. -->
        <div class="mb-12">
            <div data-reveal-grid class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <!-- Email -->
                <a href="mailto:contact@rizkyfauzan.id"
                    class="bg-surface border border-border rounded-lg p-6 hover:shadow-lg hover:-translate-y-1 motion-reduce:transform-none transition-[transform,box-shadow,border-color] duration-300 ease-out group w-full flex items-center">
                    <div class="flex items-center space-x-4">
                        <div class="shrink-0">
                            <Icon name="heroicons:envelope" size="24"
                                class="text-muted group-hover:text-fg transition-colors" />
                        </div>
                        <div class="min-w-0 flex-1">
                            <h3 class="text-lg font-bold text-fg group-hover:text-secondary">Email</h3>
                            <p class="text-muted text-sm">contact@rizkyfauzan.id</p>
                        </div>
                    </div>
                </a>

                <!-- LinkedIn -->
                <a href="https://www.linkedin.com/in/rizky-fauzan-hanif" target="_blank" rel="noopener noreferrer"
                    class="bg-surface border border-border rounded-lg p-6 hover:shadow-lg hover:-translate-y-1 motion-reduce:transform-none transition-[transform,box-shadow,border-color] duration-300 ease-out group w-full flex items-center">
                    <div class="flex items-center space-x-4">
                        <div class="shrink-0 relative">
                            <Icon name="simple-icons:linkedin" size="24"
                                class="text-muted group-hover:text-fg transition-colors" />
                        </div>
                        <div class="min-w-0 flex-1">
                            <h3 class="text-lg font-bold text-fg group-hover:text-secondary">LinkedIn</h3>
                            <p class="text-muted text-sm">rizky-fauzan-hanif</p>
                        </div>
                    </div>
                </a>

                <!-- X (Twitter) -->
                <a href="https://x.com/rizkyfauzanid" target="_blank" rel="noopener noreferrer"
                    class="bg-surface border border-border rounded-lg p-6 hover:shadow-lg hover:-translate-y-1 motion-reduce:transform-none transition-[transform,box-shadow,border-color] duration-300 ease-out group w-full flex items-center">
                    <div class="flex items-center space-x-4">
                        <div class="shrink-0">
                            <Icon name="simple-icons:x" size="24"
                                class="text-muted group-hover:text-fg transition-colors" />
                        </div>
                        <div class="min-w-0 flex-1">
                            <h3 class="text-lg font-bold text-fg group-hover:text-secondary">X (Twitter)</h3>
                            <p class="text-muted text-sm">@rizkyfauzanid</p>
                        </div>
                    </div>
                </a>

                <!-- Instagram -->
                <a href="https://instagram.com/rizkyfauzan.id" target="_blank" rel="noopener noreferrer"
                    class="bg-surface border border-border rounded-lg p-6 hover:shadow-lg hover:-translate-y-1 motion-reduce:transform-none transition-[transform,box-shadow,border-color] duration-300 ease-out group w-full flex items-center">
                    <div class="flex items-center space-x-4">
                        <div class="shrink-0">
                            <Icon name="simple-icons:instagram" size="24"
                                class="text-muted group-hover:text-fg transition-colors" />
                        </div>
                        <div class="min-w-0 flex-1">
                            <h3 class="text-lg font-bold text-fg group-hover:text-secondary">Instagram</h3>
                            <p class="text-muted text-sm">@rizkyfauzan.id</p>
                        </div>
                    </div>
                </a>

                <!-- Telegram -->
                <a href="https://t.me/rizkyfauzanid" target="_blank" rel="noopener noreferrer"
                    class="bg-surface border border-border rounded-lg p-6 hover:shadow-lg hover:-translate-y-1 motion-reduce:transform-none transition-[transform,box-shadow,border-color] duration-300 ease-out group w-full flex items-center">
                    <div class="flex items-center space-x-4">
                        <div class="shrink-0">
                            <Icon name="simple-icons:telegram" size="24"
                                class="text-muted group-hover:text-fg transition-colors" />
                        </div>
                        <div class="min-w-0 flex-1">
                            <h3 class="text-lg font-bold text-fg group-hover:text-secondary">Telegram</h3>
                            <p class="text-muted text-sm">@rizkyfauzanid</p>
                        </div>
                    </div>
                </a>

                <!-- Discord. No data-reveal: it holds a hover activity tooltip, and
                     the reveal's inline transform would keep the card as the
                     tooltip's containing block, so the tooltip could never sit
                     outside the card and its hover fade would never play. -->
                <button
                    type="button"
                    class="bg-surface border border-border rounded-lg p-6 hover:shadow-lg hover:-translate-y-1 motion-reduce:transform-none transition-[transform,box-shadow,border-color] duration-300 ease-out group cursor-pointer w-full relative text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
                    :aria-label="`Copy Discord username ${DISCORD_USERNAME}`"
                    @click="copyDiscord">
                    <div class="flex items-center space-x-4">
                        <div class="shrink-0 relative">
                            <Icon
                                name="simple-icons:discord"
                                size="24"
                                class="text-muted group-hover:text-fg transition-colors" />
                        </div>
                        <div class="min-w-0 flex-1">
                            <div class="flex items-center space-x-2">
                                <h3 class="text-lg font-bold text-fg group-hover:text-secondary">Discord</h3>
                                <span v-if="!isLoadingStatus" :class="getDiscordStatusBadgeClasses(discordStatus)">
                                    {{ getStatusText(discordStatus) }}
                                </span>
                            </div>
                            <p class="text-muted text-sm font-mono">{{ DISCORD_USERNAME }}</p>
                        </div>
                    </div>

                    <!-- Discord Activity Tooltip -->
                    <div
                        v-if="discordActivities.length > 0 && !isLoadingStatus"
                        class="absolute left-0 top-full mt-2 w-full bg-surface border border-border text-fg text-xs rounded-lg p-3 shadow-lg opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                        <div class="space-y-2">
                            <div v-for="activity in discordActivities" :key="activity.id">
                                <p class="font-medium text-fg">{{ formatActivity(activity) }}</p>
                                <p v-if="activity.timestamps?.start" class="text-muted text-xs mt-1">
                                    {{ getElapsedTime(activity.timestamps.start) }} elapsed
                                </p>
                            </div>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import type { DiscordActivity } from '~/utils/discord'

// Reveal both the page header and the card grid. The cards live in one wrapper,
// so a single trigger and stagger replace per-card triggers, which make the
// grid pop in unevenly on shorter screens. A selector that misses the header
// would leave its heading hidden by the `data-reveal` start state for good.
useScrollReveal('[data-reveal], [data-reveal-grid]')

useSeoMeta({
    title: 'Contact — Network Engineer',
    description: 'Get in touch with Rizky Fauzan Hanif via email, LinkedIn, Twitter, Discord, or Telegram. Network Engineer available for opportunities and collaborations.',
    ogTitle: 'Contact Rizky Fauzan Hanif — Network Engineer',
    ogDescription: 'Connect with Rizky Fauzan Hanif - Network Engineer. Available via email, LinkedIn, Twitter, Discord, and Telegram.',
})

// Toast state
const showToast: Ref<boolean> = ref(false)

// Discord status
const discordStatus: Ref<string> = ref('offline')
const discordActivities: Ref<DiscordActivity[]> = ref([])
const isLoadingStatus: Ref<boolean> = ref(true)

// Discord user ID
const DISCORD_USER_ID = '536379400686665778'
const DISCORD_USERNAME = 'fzzzn_'

// Function to copy Discord username
const copyDiscord = async (): Promise<void> => {
    const success = await copyDiscordUsername(DISCORD_USERNAME)
    if (success) {
        showToast.value = true
        setTimeout(() => {
            showToast.value = false
        }, 3000)
    }
}

// Function to fetch Discord status
const fetchStatus = async (): Promise<void> => {
    isLoadingStatus.value = true
    const userData = await fetchDiscordStatus(DISCORD_USER_ID)

    if (userData) {
        discordStatus.value = userData.discord_status
        discordActivities.value = userData.activities
    } else {
        discordStatus.value = 'offline'
        discordActivities.value = []
    }

    isLoadingStatus.value = false
}

// Get status text
const getStatusText = (status: string): string => getDiscordStatusText(status)

// Function to calculate elapsed time
const getElapsedTime = (startTimestamp: number): string | null => {
    if (!startTimestamp) return null

    const now = Date.now()
    const start = new Date(startTimestamp).getTime()
    const elapsed = now - start

    const seconds = Math.floor(elapsed / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ${hours % 24}h`
    if (hours > 0) return `${hours}h ${minutes % 60}m`
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`
    return `${seconds}s`
}

// Refresh status every 60 seconds while the page is mounted
let statusInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
    fetchStatus()
    statusInterval = setInterval(fetchStatus, 60000)
})

onUnmounted(() => {
    if (statusInterval !== null) {
        clearInterval(statusInterval)
        statusInterval = null
    }
})
</script>