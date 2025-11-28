<script setup>
useSeoMeta({
    title: 'Contact',
    description: 'Get in touch with Rizky Fauzan Hanif.',
})

// Toast state
const showToast = ref(false)

// Discord status
const discordStatus = ref('offline')
const discordActivities = ref([])
const isLoadingStatus = ref(true)

// Discord user ID
const DISCORD_USER_ID = '536379400686665778'
const DISCORD_USERNAME = 'fzzzn_'

// Function to copy Discord username
const copyDiscord = async () => {
    const success = await copyDiscordUsername(DISCORD_USERNAME)
    if (success) {
        showToast.value = true
        setTimeout(() => {
            showToast.value = false
        }, 3000)
    }
}

// Function to fetch Discord status
const fetchStatus = async () => {
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

// Get status color
const getStatusColor = (status) => getDiscordStatusColor(status)

// Get status text
const getStatusText = (status) => getDiscordStatusText(status)

// Get primary activity for display
const getPrimaryActivityForDisplay = () => getPrimaryActivity(discordActivities.value)

// Function to calculate elapsed time
const getElapsedTime = (startTimestamp) => {
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

// Fetch status on mount
onMounted(() => {
    fetchStatus()

    // Refresh status every 60 seconds
    setInterval(fetchStatus, 60000)
})
</script>

<template>
    <div class="p-6">
        <!-- Toast Notification -->
        <Transition
            enter-active-class="transition ease-out duration-300" 
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0" 
            leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100 translate-y-0" 
            leave-to-class="opacity-0 translate-y-2">
            <div
                v-if="showToast"
                class="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-black text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2">
                <Icon name="heroicons:check-circle" size="20" class="text-green-400" />
                <span class="font-medium">Discord username copied to clipboard!</span>
            </div>
        </Transition>

        <!-- Header -->
        <PageHeader title="Contact" />

        <!-- Contact Cards -->
        <div class="flex flex-wrap justify-center gap-6 mb-12">
            <!-- Email -->
            <a
href="mailto:contact@rizkyfauzan.id"
                class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group w-full sm:w-80 flex items-center">
                <div class="flex items-center space-x-4">
                    <div class="shrink-0">
                        <Icon
name="heroicons:envelope" size="24"
                            class="text-black/60 group-hover:text-black transition-colors" />
                    </div>
                    <div class="min-w-0 flex-1">
                        <h3 class="text-lg font-bold text-black group-hover:text-gray-800">Email</h3>
                        <p class="text-gray-600 text-sm">contact@rizkyfauzan.id</p>
                    </div>
                </div>
            </a>

            <!-- LinkedIn -->
            <a
href="https://www.linkedin.com/in/rizky-fauzan-hanif" target="_blank" rel="noopener noreferrer"
                class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group w-full sm:w-80 flex items-center">
                <div class="flex items-center space-x-4">
                    <div class="shrink-0 relative">
                        <Icon
name="simple-icons:linkedin" size="24"
                            class="text-black/60 group-hover:text-black transition-colors" />
                    </div>
                    <div class="min-w-0 flex-1">
                        <h3 class="text-lg font-bold text-black group-hover:text-gray-800">LinkedIn</h3>
                        <p class="text-gray-600 text-sm">rizky-fauzan-hanif</p>
                    </div>
                </div>
            </a>

            <!-- X (Twitter) -->
            <a
href="https://x.com/fzzznh" target="_blank" rel="noopener noreferrer"
                class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group w-full sm:w-80 flex items-center">
                <div class="flex items-center space-x-4">
                    <div class="shrink-0">
                        <Icon
name="simple-icons:x" size="24"
                            class="text-black/60 group-hover:text-black transition-colors" />
                    </div>
                    <div class="min-w-0 flex-1">
                        <h3 class="text-lg font-bold text-black group-hover:text-gray-800">X (Twitter)</h3>
                        <p class="text-gray-600 text-sm">@fzzznh</p>
                    </div>
                </div>
            </a>

            <!-- Bluesky -->
            <a
href="https://bsky.app/profile/rizkyfauzan.id" target="_blank" rel="noopener noreferrer"
                class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group w-full sm:w-80 flex items-center">
                <div class="flex items-center space-x-4">
                    <div class="shrink-0">
                        <Icon
name="simple-icons:bluesky" size="24"
                            class="text-black/60 group-hover:text-black transition-colors" />
                    </div>
                    <div class="min-w-0 flex-1">
                        <h3 class="text-lg font-bold text-black group-hover:text-gray-800">Bluesky</h3>
                        <p class="text-gray-600 text-sm">rizkyfauzan.id</p>
                    </div>
                </div>
            </a>

            <!-- Instagram -->
            <a
href="https://instagram.com/fauzannnnh" target="_blank" rel="noopener noreferrer"
                class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group w-full sm:w-80 flex items-center">
                <div class="flex items-center space-x-4">
                    <div class="shrink-0">
                        <Icon
name="simple-icons:instagram" size="24"
                            class="text-black/60 group-hover:text-black transition-colors" />
                    </div>
                    <div class="min-w-0 flex-1">
                        <h3 class="text-lg font-bold text-black group-hover:text-gray-800">Instagram</h3>
                        <p class="text-gray-600 text-sm">@fauzannnnh</p>
                    </div>
                </div>
            </a>

            <!-- Discord -->
            <div
class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer w-full sm:w-80 relative"
                @click="copyDiscord">
                <div class="flex items-center space-x-4">
                    <div class="shrink-0 relative">
                        <Icon
name="simple-icons:discord" size="24"
                            class="text-black/60 group-hover:text-black transition-colors" />

                        <!-- Status indicator -->
                        <div class="absolute -bottom-1 -right-1 flex items-center">
                            <div
v-if="!isLoadingStatus" :class="[
                                'w-3 h-3 rounded-full border-2 border-white',
                                getStatusColor(discordStatus)
                            ]" />
                            <div v-else class="w-3 h-3 rounded-full border-2 border-white bg-gray-300 animate-pulse" />
                        </div>
                    </div>
                    <div class="min-w-0 flex-1">
                        <div class="flex items-center space-x-2">
                            <h3 class="text-lg font-bold text-black group-hover:text-gray-800">Discord</h3>
                            <span v-if="!isLoadingStatus" :class="getDiscordStatusBadgeClasses(discordStatus)">
                                {{ getStatusText(discordStatus) }}
                            </span>
                        </div>
                        <p class="text-gray-600 text-sm font-mono">{{ DISCORD_USERNAME }}</p>

                        <!-- Activity preview -->
                        <div
v-if="getPrimaryActivityForDisplay() && !isLoadingStatus"
                            class="mt-3 p-2 bg-gray-50 rounded border-l-2 border-black/20">
                            <p class="text-xs text-black font-medium truncate">
                                {{ formatActivity(getPrimaryActivityForDisplay()) }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Activity tooltip on hover -->
                <div
v-if="discordActivities.length > 0 && !isLoadingStatus"
                    class="absolute left-0 bottom-full mb-2 w-full bg-white border border-gray-200 text-black text-xs rounded-lg p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    <div class="space-y-2">
                        <div
v-for="activity in discordActivities" :key="activity.id"
                            class="border-b border-gray-100 last:border-b-0 pb-2 last:pb-0">
                            <p class="font-medium text-black">{{ formatActivity(activity) }}</p>
                            <p v-if="activity.timestamps?.start" class="text-gray-500 text-xs mt-1">
                                {{ getElapsedTime(activity.timestamps.start) }} elapsed
                            </p>
                        </div>
                    </div>
                    <!-- Arrow pointing down -->
                    <div
                        class="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-200" />
                </div>
            </div>

            <!-- Telegram -->
            <a
href="https://t.me/Fauzannnnh" target="_blank" rel="noopener noreferrer"
                class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group w-full sm:w-80 flex items-center">
                <div class="flex items-center space-x-4">
                    <div class="shrink-0">
                        <Icon
name="simple-icons:telegram" size="24"
                            class="text-black/60 group-hover:text-black transition-colors" />
                    </div>
                    <div class="min-w-0 flex-1">
                        <h3 class="text-lg font-bold text-black group-hover:text-gray-800">Telegram</h3>
                        <p class="text-gray-600 text-sm">@Fauzannnnh</p>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>