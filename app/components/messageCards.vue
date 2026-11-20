<template>
  <div class="bg-surface border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
    <div class="flex items-start space-x-4">
      <img v-if="showAvatar" :src="message.avatar_url" :alt="message.username"
        class="h-12 w-12 rounded-full shrink-0 object-cover" @error="showAvatar = false">
      <div v-else class="h-12 w-12 rounded-full shrink-0 bg-muted/20 flex items-center justify-center" aria-hidden="true">
        <Icon name="mdi:account" size="28" class="text-muted" />
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-bold text-fg">{{ message.username }}</h3>
            <p class="text-sm text-muted">{{ formatDate(message.created_at) }}</p>
          </div>
          <button v-if="canDelete"
            class="bg-inverse-bg text-inverse-fg px-3 py-1 rounded-lg hover:opacity-80 transition-opacity text-sm font-semibold"
            @click="confirmDelete">
            Delete
          </button>
        </div>
        <div class="mt-4">
          <p class="text-secondary leading-relaxed whitespace-pre-wrap">{{ message.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Message {
  id: number | string
  username: string
  avatar_url: string
  message: string
  created_at: string
  user_id: string
}

interface User {
  id: string | number
}

interface Props {
  message: Message
  currentUser: User | null
}

const props = withDefaults(defineProps<Props>(), {
  currentUser: null
})

const emit = defineEmits<{
  delete: [id: number | string]
}>()

const canDelete = computed((): boolean => {
  return props.currentUser !== null && props.currentUser.id.toString() === props.message.user_id.toString()
})

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const confirmDelete = (): void => {
  if (confirm('Are you sure you want to delete this message?')) {
    emit('delete', props.message.id)
  }
}

const showAvatar = ref(true)
</script>