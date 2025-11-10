<template>
    <div class="p-6">
        <!-- Header -->
        <PageHeader 
            title="Guestbook" 
        />

        <!-- Error Display -->
        <div
            v-if="error"
            class="bg-red-50 border border-red-200 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded-lg mb-4 sm:mb-6 text-sm sm:text-base">
            Error: {{ error }}
        </div>

        <!-- User Info or Sign In -->
        <div class="mb-6 sm:mb-8">
            <div v-if="user" class="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                <div
                    class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
                    <div class="flex items-center space-x-3 sm:space-x-4">
                        <img
                            :src="user.user_metadata.avatar_url" 
                            :alt="user.user_metadata.full_name"
                            class="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover flex-shrink-0">
                        <div class="min-w-0 flex-1">
                            <h3 class="text-lg sm:text-xl font-bold text-black truncate">{{ user.user_metadata.full_name || user.user_metadata.user_name }}</h3>
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
                        <textarea
                            v-model="newMessage" 
                            placeholder="Write your message here..." 
                            rows="3"
                            class="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base resize-none"
                            required 
                        />
                        <div class="mt-3 sm:mt-4 flex justify-end">
                            <button
                                type="submit" 
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
                <p class="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">Sign in with Google, GitHub, or Discord to share your
                    thoughts and join the conversation!</p>
                <div class="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center sm:items-center">
                    <button
                        :disabled="signingIn"
                        class="bg-black text-white px-4 py-2.5 sm:px-6 sm:py-3 cursor-pointer rounded-lg hover:bg-gray-800 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center space-x-2 w-full sm:w-auto text-sm sm:text-base"
                        @click="signInWithGoogle">
                        <Icon name="logos:google-icon" size="18" />
                        <span>{{ signingIn === 'google' ? 'Signing In...' : 'Google' }}</span>
                    </button>

                    <button
                        :disabled="signingIn"
                        class="bg-gray-900 text-white px-4 py-2.5 sm:px-6 sm:py-3 cursor-pointer rounded-lg hover:bg-gray-700 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center space-x-2 w-full sm:w-auto text-sm sm:text-base"
                        @click="signInWithGitHub">
                        <Icon name="mdi:github" size="18" />
                        <span>{{ signingIn === 'github' ? 'Signing In...' : 'GitHub' }}</span>
                    </button>

                    <button
                        :disabled="signingIn"
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
                    <MessageCards
                        v-for="message in messages" 
                        :key="message.id" 
                        :message="message" 
                        :current-user="user"
                        @delete="deleteMessage" 
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

// Add SEO meta
useSeoMeta({
    title: 'Guestbook',
    description: 'Leave a message and join the conversation on my guestbook.',
})

// Reactive data
const messages = ref([])
const newMessage = ref('')
const loading = ref(true)
const submitting = ref(false)
const error = ref(null)
const signingIn = ref(false)

// Google Sign In function
const signInWithGoogle = async () => {
    signingIn.value = 'google'
    try {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        })
        if (error) throw error
    } catch (error) {
        console.error('Error signing in with Google:', error.message)
        alert('Error signing in with Google: ' + error.message)
    } finally {
        signingIn.value = false
    }
}

// GitHub Sign In function
const signInWithGitHub = async () => {
    signingIn.value = 'github'
    try {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        })
        if (error) throw error
    } catch (error) {
        console.error('Error signing in with GitHub:', error.message)
        alert('Error signing in with GitHub: ' + error.message)
    } finally {
        signingIn.value = false
    }
}

// Discord Sign In function
const signInWithDiscord = async () => {
    signingIn.value = 'discord'
    try {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'discord',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        })
        if (error) throw error
    } catch (error) {
        console.error('Error signing in with Discord:', error.message)
        alert('Error signing in with Discord: ' + error.message)
    } finally {
        signingIn.value = false
    }
}

// Fetch messages
const fetchMessages = async () => {
    loading.value = true
    error.value = null
    try {
        const { data, error: fetchError } = await supabase
            .from('guestbook')
            .select('*')
            .order('created_at', { ascending: false })

        if (fetchError) {
            console.error('Supabase error:', fetchError)
            throw fetchError
        }

        messages.value = data || []
    } catch (err) {
        console.error('Error fetching messages:', err)
        error.value = err.message
    } finally {
        loading.value = false
    }
}

// Submit new message
const submitMessage = async () => {
    if (!newMessage.value || newMessage.value.trim().length === 0 || !user.value) return

    submitting.value = true
    try {
        const { error: insertError } = await supabase
            .from('guestbook')
            .insert({
                user_id: user.value.id,
                username: user.value.user_metadata.full_name || user.value.user_metadata.user_name,
                avatar_url: user.value.user_metadata.avatar_url,
                message: newMessage.value.trim()
            })
            .select()

        if (insertError) {
            console.error('Insert error:', insertError)
            throw insertError
        }

        newMessage.value = ''
        await fetchMessages()
    } catch (err) {
        console.error('Error submitting message:', err)
        alert('Error submitting message: ' + err.message)
    } finally {
        submitting.value = false
    }
}

// Delete message
const deleteMessage = async (messageId) => {
    try {
        const { error: deleteError } = await supabase
            .from('guestbook')
            .delete()
            .eq('id', messageId)

        if (deleteError) throw deleteError

        await fetchMessages()
    } catch (err) {
        console.error('Error deleting message:', err)
        alert('Error deleting message: ' + err.message)
    }
}

// Sign out
const signOut = async () => {
    try {
        await supabase.auth.signOut()
    } catch (err) {
        console.error('Error signing out:', err)
    }
}

// Fetch messages on mount
onMounted(async () => {
    await fetchMessages()
})

// Watch for auth changes and refetch messages
watch(user, async () => {
    await fetchMessages()
}, { immediate: true })

// Real-time subscription
onMounted(() => {
    const channel = supabase
        .channel('guestbook_changes')
        .on('postgres_changes',
            { event: '*', schema: 'public', table: 'guestbook' },
            () => {
                fetchMessages()
            }
        )
        .subscribe()

    onUnmounted(() => {
        supabase.removeChannel(channel)
    })
})
</script>
