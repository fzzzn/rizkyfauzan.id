<template>
    <div class="p-6">
        <!-- Header -->
        <PageHeader title="Guestbook" />

        <!-- Error Display -->
        <div
            v-if="error"
            role="alert"
            class="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 px-3 py-2 sm:px-4 sm:py-3 rounded-lg mb-4 sm:mb-6 text-sm sm:text-base flex items-center justify-between gap-3">
            <span>Error: {{ error }}</span>
            <button
                type="button"
                class="shrink-0 text-xs font-semibold underline cursor-pointer"
                aria-label="Dismiss error"
                @click="error = null">
                Dismiss
            </button>
        </div>

        <!-- User Info or Sign In -->
        <div class="mb-6 sm:mb-8">
            <div v-if="user" class="bg-surface border border-border rounded-lg p-4 sm:p-6">
                <div
                    class="flex flex-row items-center justify-between mb-4 sm:mb-6">
                    <div class="flex items-center space-x-3 sm:space-x-4 min-w-0">
                        <Icon
v-if="!user.user_metadata?.avatar_url" name="mdi:account" size="48"
                            class="text-muted shrink-0" aria-hidden="true" />
                        <OptimizedImg
v-else :src="user.user_metadata.avatar_url" :alt="user.user_metadata?.full_name || 'User'"
                            sizes="48px" loading="lazy" class="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover shrink-0" />
                        <div class="min-w-0 flex-1">
                            <div class="flex items-center gap-2">
                                <h3 class="text-lg sm:text-xl font-bold text-fg truncate">
                                    {{ user.user_metadata?.full_name || user.user_metadata?.user_name || 'User' }}
                                </h3>
                                <span
                                    v-if="user.isAdmin"
                                    class="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-inverse-bg text-inverse-fg shrink-0">
                                    Admin
                                </span>
                            </div>
                            <p class="text-xs sm:text-sm text-muted truncate">
                                {{ user.email ? `Signed in as ${user.email}` : 'Signed in' }}
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 shrink-0">
                        <template v-if="confirmingSignOut">
                            <button
                                type="button"
                                :disabled="signingOut"
                                class="bg-red-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm sm:text-base cursor-pointer disabled:opacity-50"
                                @click="signOut">
                                {{ signingOut ? 'Signing Out...' : 'Confirm' }}
                            </button>
                            <button
                                type="button"
                                :disabled="signingOut"
                                class="border border-border text-fg px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-border/40 transition-colors font-semibold text-sm sm:text-base cursor-pointer disabled:opacity-50"
                                @click="confirmingSignOut = false">
                                Cancel
                            </button>
                        </template>
                        <button
                            v-else
                            type="button"
                            class="bg-inverse-bg text-inverse-fg px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:opacity-80 transition-opacity font-semibold text-sm sm:text-base cursor-pointer"
                            @click="confirmingSignOut = true">
                            Sign Out
                        </button>
                    </div>
                </div>

                <!-- Message Form -->
                <div>
                    <h2 class="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Leave a Message</h2>
                    <form @submit.prevent="submitMessage">
                        <label for="guestbook-message" class="sr-only">Message</label>
                        <textarea
                            id="guestbook-message"
                            v-model="newMessage"
                            placeholder="Write your message here..."
                            rows="3"
                            :maxlength="MAX_MESSAGE_LENGTH"
                            class="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-border bg-bg text-fg placeholder:text-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-inverse-bg focus:border-transparent text-sm sm:text-base resize-none"
                            required />
                        <div class="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <span
                                class="text-xs text-muted"
                                :class="{ 'text-red-600 dark:text-red-400 font-medium': newMessage.length >= MAX_MESSAGE_LENGTH }">
                                {{ newMessage.length }} / {{ MAX_MESSAGE_LENGTH }}
                            </span>
                            <button
                                type="submit"
                                :disabled="!newMessage || newMessage.trim().length === 0 || submitting"
                                class="bg-inverse-bg text-inverse-fg px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:opacity-80 transition-opacity font-semibold disabled:opacity-50 text-sm sm:text-base w-full sm:w-auto cursor-pointer">
                                {{ submitting ? 'Posting...' : 'Post Message' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Login prompt for non-authenticated users -->
            <div v-else class="bg-surface border border-border rounded-lg p-6 sm:p-8 text-center">
                <h2 class="text-xl sm:text-2xl font-bold text-fg mb-2 sm:mb-3">Want to leave a message?</h2>
                <p class="text-secondary mb-4 sm:mb-6 text-sm sm:text-base">Sign in with Google, GitHub, or Discord to
                    share your
                    thoughts and join the conversation!</p>
                <div class="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center sm:items-center">
                    <button
:disabled="!!signingIn"
                        class="bg-inverse-bg text-inverse-fg px-4 py-2.5 sm:px-6 sm:py-3 cursor-pointer rounded-lg hover:opacity-80 transition-opacity font-semibold disabled:opacity-50 flex items-center justify-center space-x-2 w-full sm:w-auto text-sm sm:text-base"
                        @click="signInWithGoogle">
                        <Icon name="logos:google-icon" size="18" />
                        <span>{{ signingIn === 'google' ? 'Signing In...' : 'Google' }}</span>
                    </button>

                    <button
:disabled="!!signingIn"
                        class="bg-neutral-900 dark:bg-neutral-800 border border-border text-white px-4 py-2.5 sm:px-6 sm:py-3 cursor-pointer rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center space-x-2 w-full sm:w-auto text-sm sm:text-base"
                        @click="signInWithGitHub">
                        <Icon name="mdi:github" size="18" />
                        <span>{{ signingIn === 'github' ? 'Signing In...' : 'GitHub' }}</span>
                    </button>

                    <button
:disabled="!!signingIn"
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
            <div v-if="loading" class="space-y-4 sm:space-y-6">
                <div
v-for="n in 3" :key="n"
                    class="bg-surface border border-border rounded-lg p-6 animate-pulse">
                    <div class="flex items-start space-x-4">
                        <div class="h-12 w-12 rounded-full bg-muted/20 shrink-0" />
                        <div class="flex-1 space-y-3">
                            <div class="h-4 w-1/3 bg-muted/20 rounded" />
                            <div class="h-3 w-1/5 bg-muted/20 rounded" />
                            <div class="h-3 w-full bg-muted/20 rounded" />
                            <div class="h-3 w-4/5 bg-muted/20 rounded" />
                        </div>
                    </div>
                </div>
            </div>

            <div v-else-if="messages.length === 0" class="text-center py-8 sm:py-12">
                <p class="text-muted text-base sm:text-lg">No messages yet. Be the first to leave one!</p>
            </div>

            <div v-else>
                <h2 data-reveal class="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Messages</h2>
                <div class="space-y-4 sm:space-y-6">
                    <MessageCards
                        v-for="message in messages"
                        :key="message.id"
                        :message="message"
                        :current-user="user ? { id: user.id, isAdmin: user.isAdmin } : null"
                        data-reveal
                        @delete="deleteMessage"
                        @pin="togglePin"
                        @edit="editMessage" />
                </div>
                <div v-if="hasMore" class="mt-8 flex justify-center">
                    <button
                        type="button"
                        :disabled="loadingMore"
                        class="border border-border text-fg px-6 py-2.5 rounded-lg hover:bg-fg/5 transition-colors font-semibold text-sm sm:text-base cursor-pointer disabled:opacity-50"
                        @click="loadMore">
                        {{ loadingMore ? 'Loading...' : 'Load More Messages' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'

// Messages load asynchronously, so the reveal is re-run once they render.
const { start: startReveals } = useScrollReveal()

interface GuestbookMessage {
    id: number | string
    user_id: string
    username: string
    avatar_url: string
    message: string
    created_at: string
    pinned?: boolean
    is_owner?: boolean
}

interface AuthUser {
    id: string
    email?: string
    isAdmin?: boolean
    user_metadata: {
        full_name?: string
        user_name?: string
        avatar_url?: string
    }
}

type SignInProvider = 'google' | 'github' | 'discord' | false

const getErrorMessage = (err: unknown): string => {
    if (typeof err === 'object' && err !== null) {
        const data = (err as { data?: { statusMessage?: string } }).data
        if (data?.statusMessage) return data.statusMessage
        const message = (err as { message?: string }).message
        if (message) return message
    }
    return 'Unknown error'
}

// Add SEO meta
useSeoMeta({
    title: 'Guestbook — Leave a Message',
    description: 'Leave a message on the guestbook of Rizky Fauzan Hanif. Sign in with Google, GitHub, or Discord to share your thoughts.',
    ogTitle: 'Guestbook — Leave a Message for Rizky Fauzan',
    ogDescription: 'Join the conversation and leave a message on the guestbook. Connect with the community.',
})

usePageOgImage('guestbook', 'Guestbook — Leave a Message for Rizky Fauzan')
usePageBreadcrumb('Guestbook', '/guestbook')

const MAX_MESSAGE_LENGTH = 1000
const PAGE_SIZE = 20

// Reactive data
const user: Ref<AuthUser | null> = ref(null)
const messages: Ref<GuestbookMessage[]> = ref([])
const newMessage: Ref<string> = ref('')
const loading: Ref<boolean> = ref(true)
const loadingMore: Ref<boolean> = ref(false)
const hasMore: Ref<boolean> = ref(false)
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

interface GuestbookPageResponse {
    items: GuestbookMessage[]
    hasMore: boolean
}

// Fetch messages
const fetchMessages = async (preserveError = false): Promise<void> => {
    loading.value = true
    if (!preserveError) {
        error.value = null
    }
    try {
        const data = await $fetch<GuestbookPageResponse>('/api/guestbook', {
            query: { offset: 0, limit: PAGE_SIZE },
        })
        messages.value = data?.items || []
        hasMore.value = Boolean(data?.hasMore)
    } catch (err) {
        console.error('Error fetching messages:', err)
        error.value = getErrorMessage(err)
    } finally {
        loading.value = false
    }
}

const loadMore = async (): Promise<void> => {
    if (loadingMore.value || !hasMore.value) return
    loadingMore.value = true
    try {
        const data = await $fetch<GuestbookPageResponse>('/api/guestbook', {
            query: { offset: messages.value.length, limit: PAGE_SIZE },
        })
        const existingIds = new Set(messages.value.map(m => m.id))
        const nextItems = (data?.items || []).filter(m => !existingIds.has(m.id))
        messages.value = [...messages.value, ...nextItems]
        hasMore.value = Boolean(data?.hasMore)
    } catch (err) {
        console.error('Error loading more messages:', err)
        error.value = getErrorMessage(err)
    } finally {
        loadingMore.value = false
    }
}

// Submit new message
const submitMessage = async (): Promise<void> => {
    if (!newMessage.value || newMessage.value.trim().length === 0 || !user.value) return

    submitting.value = true
    error.value = null
    try {
        await $fetch('/api/guestbook', {
            method: 'POST',
            body: { message: newMessage.value.trim() },
        })

        newMessage.value = ''
        await fetchMessages()
    } catch (err) {
        console.error('Error submitting message:', err)
        error.value = 'Error submitting message: ' + getErrorMessage(err)
    } finally {
        submitting.value = false
    }
}

// Delete message
const deleteMessage = async (messageId: string | number): Promise<void> => {
    error.value = null
    try {
        await $fetch(`/api/guestbook/${messageId}`, {
            method: 'DELETE',
        })

        await fetchMessages()
    } catch (err) {
        console.error('Error deleting message:', err)
        error.value = 'Error deleting message: ' + getErrorMessage(err)
    }
}

// Pin or unpin message (admin only)
const togglePin = async ({ id, pinned }: { id: string | number; pinned: boolean }): Promise<void> => {
    error.value = null
    try {
        await $fetch(`/api/guestbook/${id}`, {
            method: 'PATCH',
            body: { pinned },
        })

        await fetchMessages()
    } catch (err) {
        console.error('Error pinning message:', err)
        error.value = 'Error updating pinned message: ' + getErrorMessage(err)
    }
}

// Edit own message
const editMessage = async ({ id, message }: { id: string | number; message: string }): Promise<void> => {
    error.value = null
    try {
        await $fetch(`/api/guestbook/${id}`, {
            method: 'PATCH',
            body: { message },
        })

        await fetchMessages()
    } catch (err) {
        console.error('Error editing message:', err)
        error.value = 'Error updating message: ' + getErrorMessage(err)
    }
}

const confirmingSignOut: Ref<boolean> = ref(false)
const signingOut: Ref<boolean> = ref(false)

// Sign out
const signOut = async (): Promise<void> => {
    signingOut.value = true
    error.value = null
    try {
        await $fetch('/api/auth/signout', { method: 'POST' })
        user.value = null
        confirmingSignOut.value = false
    } catch (err) {
        console.error('Error signing out:', err)
        error.value = 'Error signing out: ' + getErrorMessage(err)
    } finally {
        signingOut.value = false
    }
}

// Fetch user and messages on mount
onMounted(async () => {
    // Show auth errors from callback redirect
    const route = useRoute()
    const hasAuthError = Boolean(route.query.error)
    if (route.query.error) {
        const errorMessages: Record<string, string> = {
            missing_code: 'Authentication failed: no authorization code received.',
            missing_verifier: 'Authentication failed: session expired. Please try again.',
            token_exchange_failed: 'Authentication failed: could not complete sign in. Please try again.',
            config_missing: 'Authentication is unavailable: the server is not configured.',
            auth_failed: 'Authentication failed. Please try again.',
        }
        error.value = errorMessages[route.query.error as string] || `Authentication error: ${route.query.error}`
    }

    await Promise.all([fetchUser(), fetchMessages(hasAuthError)])
})

// Reveal newly rendered message cards both after initial load and after posting.
watch(messages, async () => {
    await nextTick()
    startReveals()
})
</script>
