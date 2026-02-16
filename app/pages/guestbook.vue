<template>
    <div class="p-6">
        <!-- Header -->
        <PageHeader title="Guestbook" />

        <!-- Error Display -->
        <div v-if="error"
            class="bg-red-50 border border-red-200 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded-lg mb-4 sm:mb-6 text-sm sm:text-base">
            Error: {{ error }}
        </div>

        <!-- User Info or Sign In -->
        <div class="mb-6 sm:mb-8">
            <div v-if="user" class="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                <div
                    class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
                    <div class="flex items-center space-x-3 sm:space-x-4">
                        <img :src="user.user_metadata?.avatar_url || '/guest.png'" :alt="user.user_metadata?.full_name || 'User'"
                            class="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover shrink-0">
                        <div class="min-w-0 flex-1">
                            <h3 class="text-lg sm:text-xl font-bold text-black truncate">{{ user.user_metadata?.full_name
                                || user.user_metadata?.user_name || 'User' }}</h3>
                            <p class="text-xs sm:text-sm text-gray-500">Signed in</p>
                        </div>
                    </div>
                    <button
                        class="bg-black text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-sm sm:text-base w-full sm:w-auto"
                        @click="signOut">
                        Sign Out
                    </button>
                </div>

                <!-- Message Form -->
                <div>
                    <h2 class="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Leave a Message</h2>
                    <form @submit.prevent="submitMessage">
                        <textarea v-model="newMessage" placeholder="Write your message here..." rows="3"
                            class="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base resize-none"
                            required />
                        <div class="mt-3 sm:mt-4 flex justify-end">
                            <button type="submit"
                                :disabled="!newMessage || newMessage.trim().length === 0 || submitting"
                                class="bg-black text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold disabled:opacity-50 text-sm sm:text-base w-full sm:w-auto">
                                {{ submitting ? 'Posting...' : 'Post Message' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Login prompt for non-authenticated users -->
            <div v-else class="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 text-center">
                <h2 class="text-xl sm:text-2xl font-bold text-black mb-2 sm:mb-3">Want to leave a message?</h2>
                <p class="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">Sign in with Google, GitHub, or Discord to
                    share your
                    thoughts and join the conversation!</p>
                <div class="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center sm:items-center">
                    <button :disabled="!!signingIn"
                        class="bg-black text-white px-4 py-2.5 sm:px-6 sm:py-3 cursor-pointer rounded-lg hover:bg-gray-800 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center space-x-2 w-full sm:w-auto text-sm sm:text-base"
                        @click="signInWithGoogle">
                        <Icon name="logos:google-icon" size="18" />
                        <span>{{ signingIn === 'google' ? 'Signing In...' : 'Google' }}</span>
                    </button>

                    <button :disabled="!!signingIn"
                        class="bg-gray-900 text-white px-4 py-2.5 sm:px-6 sm:py-3 cursor-pointer rounded-lg hover:bg-gray-700 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center space-x-2 w-full sm:w-auto text-sm sm:text-base"
                        @click="signInWithGitHub">
                        <Icon name="mdi:github" size="18" />
                        <span>{{ signingIn === 'github' ? 'Signing In...' : 'GitHub' }}</span>
                    </button>

                    <button :disabled="!!signingIn"
                        class="bg-indigo-600 text-white px-4 py-2.5 sm:px-6 sm:py-3 cursor-pointer rounded-lg hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center space-x-2 w-full sm:w-auto text-sm sm:text-base"
                        @click="signInWithDiscord">
                        <Icon name="simple-icons:discord" size="18" />
                        <span>{{ signingIn === 'discord' ? 'Signing In...' : 'Discord' }}</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Messages -->
        <div class="space-y-4 sm:space-y-6">
            <div v-if="loading" class="text-center py-8 sm:py-12">
                <div class="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-black" />
                <p class="mt-3 sm:mt-4 text-gray-600 text-base sm:text-lg">Loading messages...</p>
            </div>

            <div v-else-if="messages.length === 0" class="text-center py-8 sm:py-12">
                <p class="text-gray-500 text-base sm:text-lg">No messages yet. Be the first to leave one!</p>
            </div>

            <div v-else>
                <h2 class="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Messages</h2>
                <div class="mb-12 space-y-4 sm:space-y-6">
                    <MessageCards v-for="message in messages" :key="message.id" :message="message" :current-user="user ? { id: user.id } : null"
                        @delete="deleteMessage" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'

interface GuestbookMessage {
    id: number | string
    user_id: string
    username: string
    avatar_url: string
    message: string
    created_at: string
}

interface AuthUser {
    id: string
    email?: string
    user_metadata: {
        full_name?: string
        user_name?: string
        avatar_url?: string
    }
}

type SignInProvider = 'google' | 'github' | 'discord' | false

// Add SEO meta
useSeoMeta({
    title: 'Guestbook - Rizky Fauzan Hanif',
    description: 'Leave a message on the guestbook of Rizky Fauzan Hanif. Sign in with Google, GitHub, or Discord to share your thoughts.',
    ogTitle: 'Guestbook - Rizky Fauzan Hanif',
    ogDescription: 'Join the conversation and leave a message on the guestbook. Connect with the community.',
    ogImage: 'https://rizkyfauzan.id/og-image.png',
})

// Reactive data
const user: Ref<AuthUser | null> = ref(null)
const messages: Ref<GuestbookMessage[]> = ref([])
const newMessage: Ref<string> = ref('')
const loading: Ref<boolean> = ref(true)
const submitting: Ref<boolean> = ref(false)
const error: Ref<string | null> = ref(null)
const signingIn: Ref<SignInProvider> = ref(false)

// Fetch current user from server
const fetchUser = async (): Promise<void> => {
    try {
        const data = await $fetch<AuthUser | null>('/api/auth/user')
        user.value = data
    } catch {
        user.value = null
    }
}

// Sign in via server-side OAuth (redirects to provider)
const signInWithProvider = (provider: 'google' | 'github' | 'discord'): void => {
    signingIn.value = provider
    window.location.href = `/api/auth/login?provider=${provider}`
}

const signInWithGoogle = (): void => signInWithProvider('google')
const signInWithGitHub = (): void => signInWithProvider('github')
const signInWithDiscord = (): void => signInWithProvider('discord')

// Fetch messages
const fetchMessages = async (): Promise<void> => {
    loading.value = true
    error.value = null
    try {
        const data = await $fetch<GuestbookMessage[]>('/api/guestbook')
        messages.value = data || []
    } catch (err: any) {
        console.error('Error fetching messages:', err)
        error.value = err.data?.statusMessage || err.message
    } finally {
        loading.value = false
    }
}

// Submit new message
const submitMessage = async (): Promise<void> => {
    if (!newMessage.value || newMessage.value.trim().length === 0 || !user.value) return

    submitting.value = true
    try {
        await $fetch('/api/guestbook', {
            method: 'POST',
            body: { message: newMessage.value.trim() },
        })

        newMessage.value = ''
        await fetchMessages()
    } catch (err: any) {
        console.error('Error submitting message:', err)
        alert('Error submitting message: ' + (err.data?.statusMessage || err.message))
    } finally {
        submitting.value = false
    }
}

// Delete message
const deleteMessage = async (messageId: string | number): Promise<void> => {
    try {
        await $fetch(`/api/guestbook/${messageId}`, {
            method: 'DELETE',
        })

        await fetchMessages()
    } catch (err: any) {
        console.error('Error deleting message:', err)
        alert('Error deleting message: ' + (err.data?.statusMessage || err.message))
    }
}

// Sign out
const signOut = async (): Promise<void> => {
    try {
        await $fetch('/api/auth/signout', { method: 'POST' })
        user.value = null
    } catch (err: any) {
        console.error('Error signing out:', err)
    }
}

// Fetch user and messages on mount
onMounted(async () => {
    // Show auth errors from callback redirect
    const route = useRoute()
    if (route.query.error) {
        const errorMessages: Record<string, string> = {
            missing_code: 'Authentication failed: no authorization code received.',
            missing_verifier: 'Authentication failed: session expired. Please try again.',
            auth_failed: 'Authentication failed. Please try again.',
        }
        error.value = errorMessages[route.query.error as string] || `Authentication error: ${route.query.error}`
    }

    await fetchUser()
    await fetchMessages()
})
</script>
