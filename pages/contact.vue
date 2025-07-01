<script setup>
useSeoMeta({
    title: 'Contact',
    description: 'Get in touch with Rizky Fauzan Hanif.',
})

// Toast state
const showToast = ref(false)

// Function to copy Discord username
const copyDiscord = async () => {
    try {
        await navigator.clipboard.writeText('fzzzn_')
        showToast.value = true
        setTimeout(() => {
            showToast.value = false
        }, 3000)
    } catch (err) {
        console.error('Failed to copy: ', err)
    }
}
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
            leave-to-class="opacity-0 translate-y-2"
        >
            <div
v-if="showToast" 
                class="fixed top-4 right-4 z-50 bg-black text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2">
                <Icon name="heroicons:check-circle" size="20" class="text-green-400" />
                <span class="font-medium">Discord username copied to clipboard!</span>
            </div>
        </Transition>

        <!-- Header -->
        <PageHeader 
            title="Contact" 
            description="Get in touch with me through various platforms."
        />

        <!-- Contact Cards -->
        <div class="flex flex-wrap justify-center gap-6">
            <!-- Email -->
            <a
href="mailto:contact@rizkyfauzan.id"
                class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group w-full sm:w-80">
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
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

            <!-- X (Twitter) -->
            <a
href="https://x.com/fzzznh" target="_blank" rel="noopener noreferrer"
                class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group w-full sm:w-80">
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
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
                class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group w-full sm:w-80">
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
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
                class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group w-full sm:w-80">
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
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
class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer w-full sm:w-80"
                @click="copyDiscord">
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                        <Icon
name="simple-icons:discord" size="24"
                            class="text-black/60 group-hover:text-black transition-colors" />
                    </div>
                    <div class="min-w-0 flex-1">
                        <h3 class="text-lg font-bold text-black group-hover:text-gray-800">Discord</h3>
                        <p class="text-gray-600 text-sm">fzzzn_</p>
                        <p class="text-xs text-gray-400 mt-1">Click to copy</p>
                    </div>
                </div>
            </div>

            <!-- GitHub -->
            <a
href="https://github.com/fzzzn" target="_blank" rel="noopener noreferrer"
                class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group w-full sm:w-80">
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                        <Icon
name="simple-icons:github" size="24"
                            class="text-black/60 group-hover:text-black transition-colors" />
                    </div>
                    <div class="min-w-0 flex-1">
                        <h3 class="text-lg font-bold text-black group-hover:text-gray-800">GitHub</h3>
                        <p class="text-gray-600 text-sm">fzzzn</p>
                    </div>
                </div>
            </a>

            <!-- LinkedIn -->
            <a
href="https://www.linkedin.com/in/rizky-fauzan-hanif" target="_blank" rel="noopener noreferrer"
                class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group w-full sm:w-80">
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
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
        </div>
    </div>
</template>