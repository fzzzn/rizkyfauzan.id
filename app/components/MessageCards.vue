<template>
  <div
    class="bg-surface border rounded-lg p-6 hover:shadow-lg transition-shadow"
    :class="message.pinned ? 'border-fg/40 ring-1 ring-fg/15' : 'border-border'">
    <div
      v-if="message.pinned"
      class="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted mb-3">
      <Icon name="mdi:pin" size="14" class="text-fg" aria-hidden="true" />
      <span>Pinned</span>
    </div>
    <div class="flex items-start space-x-4">
      <img
        v-if="showAvatar"
        :src="message.avatar_url"
        :alt="message.username"
        class="h-12 w-12 rounded-full shrink-0 object-cover"
        @error="showAvatar = false">
      <div v-else class="h-12 w-12 rounded-full shrink-0 bg-muted/20 flex items-center justify-center" aria-hidden="true">
        <Icon name="mdi:account" size="28" class="text-muted" />
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between gap-2">
          <div>
            <h3 class="text-xl font-bold text-fg">{{ message.username }}</h3>
            <p class="text-sm text-muted">{{ formatDate(message.created_at) }}</p>
          </div>
          <div v-if="canPin || canDelete" class="flex items-center gap-2 shrink-0">
            <button
              v-if="canPin && !confirmingDelete"
              type="button"
              class="border border-border text-fg px-3 py-1 rounded-lg hover:bg-border/40 transition-colors text-sm font-semibold cursor-pointer inline-flex items-center gap-1"
              :aria-label="message.pinned ? 'Unpin message' : 'Pin message'"
              @click="handlePin">
              <Icon :name="message.pinned ? 'mdi:pin-off' : 'mdi:pin'" size="14" aria-hidden="true" />
              <span>{{ message.pinned ? 'Unpin' : 'Pin' }}</span>
            </button>
            <template v-if="canDelete">
              <template v-if="confirmingDelete">
                <button
                  type="button"
                  class="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold cursor-pointer"
                  @click="handleDelete">
                  Confirm
                </button>
                <button
                  type="button"
                  class="border border-border text-fg px-3 py-1 rounded-lg hover:bg-border/40 transition-colors text-sm font-semibold cursor-pointer"
                  @click="confirmingDelete = false">
                  Cancel
                </button>
              </template>
              <button
                v-else
                type="button"
                class="bg-inverse-bg text-inverse-fg px-3 py-1 rounded-lg hover:opacity-80 transition-opacity text-sm font-semibold cursor-pointer"
                @click="confirmingDelete = true">
                Delete
              </button>
            </template>
          </div>
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
  pinned?: boolean
}

interface User {
  id: string | number
  isAdmin?: boolean
}

interface Props {
  message: Message
  currentUser?: User | null
}

const props = withDefaults(defineProps<Props>(), {
  currentUser: null,
})

const emit = defineEmits<{
  delete: [id: number | string]
  pin: [payload: { id: number | string; pinned: boolean }]
}>()

const confirmingDelete = ref(false)
const showAvatar = ref(true)

const canPin = computed((): boolean => {
  return Boolean(props.currentUser?.isAdmin)
})

const canDelete = computed((): boolean => {
  if (!props.currentUser) return false
  return Boolean(props.currentUser.isAdmin) || props.currentUser.id.toString() === props.message.user_id.toString()
})

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const handleDelete = (): void => {
  confirmingDelete.value = false
  emit('delete', props.message.id)
}

const handlePin = (): void => {
  emit('pin', { id: props.message.id, pinned: !props.message.pinned })
}
</script>
