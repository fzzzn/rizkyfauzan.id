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
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-xl font-bold text-fg">{{ message.username }}</h3>
              <span
                v-if="message.is_owner"
                class="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-inverse-bg text-inverse-fg shrink-0">
                Owner
              </span>
            </div>
            <p class="text-sm text-muted">{{ formatDate(message.created_at) }}</p>
          </div>
          <div v-if="(canPin || canEdit || canDelete) && !editing" class="flex items-center gap-2 shrink-0">
            <button
              v-if="canPin && !confirmingDelete"
              type="button"
              class="border border-border text-fg px-3 py-1 rounded-lg hover:bg-border/40 transition-colors text-sm font-semibold cursor-pointer inline-flex items-center gap-1"
              :aria-label="message.pinned ? 'Unpin message' : 'Pin message'"
              @click="handlePin">
              <Icon :name="message.pinned ? 'mdi:pin-off' : 'mdi:pin'" size="14" aria-hidden="true" />
              <span>{{ message.pinned ? 'Unpin' : 'Pin' }}</span>
            </button>
            <button
              v-if="canEdit && !confirmingDelete"
              type="button"
              class="border border-border text-fg px-3 py-1 rounded-lg hover:bg-border/40 transition-colors text-sm font-semibold cursor-pointer"
              @click="startEdit">
              Edit
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
          <form v-if="editing" class="space-y-3" @submit.prevent="saveEdit">
            <label :for="`edit-message-${message.id}`" class="sr-only">Edit message</label>
            <textarea
              :id="`edit-message-${message.id}`"
              v-model="draft"
              rows="3"
              :maxlength="MAX_MESSAGE_LENGTH"
              class="w-full px-3 py-2 border border-border bg-bg text-fg rounded-lg focus:outline-none focus:ring-2 focus:ring-inverse-bg focus:border-transparent text-sm sm:text-base resize-none"
              required />
            <div class="flex items-center justify-between gap-2">
              <span class="text-xs text-muted">{{ draft.length }} / {{ MAX_MESSAGE_LENGTH }}</span>
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="border border-border text-fg px-3 py-1 rounded-lg hover:bg-border/40 transition-colors text-sm font-semibold cursor-pointer"
                  @click="cancelEdit">
                  Cancel
                </button>
                <button
                  type="submit"
                  :disabled="!draft.trim() || draft.trim() === message.message"
                  class="bg-inverse-bg text-inverse-fg px-3 py-1 rounded-lg hover:opacity-80 transition-opacity text-sm font-semibold cursor-pointer disabled:opacity-50">
                  Save
                </button>
              </div>
            </div>
          </form>
          <p v-else class="text-secondary leading-relaxed whitespace-pre-wrap">{{ message.message }}</p>
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
  is_owner?: boolean
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
  edit: [payload: { id: number | string; message: string }]
}>()

const MAX_MESSAGE_LENGTH = 1000
const confirmingDelete = ref(false)
const editing = ref(false)
const draft = ref('')
const showAvatar = ref(true)

const isAuthor = computed((): boolean => {
  return props.currentUser !== null && props.currentUser.id.toString() === props.message.user_id.toString()
})

const canPin = computed((): boolean => {
  return Boolean(props.currentUser?.isAdmin)
})

const canEdit = computed((): boolean => {
  return isAuthor.value
})

const canDelete = computed((): boolean => {
  if (!props.currentUser) return false
  return Boolean(props.currentUser.isAdmin) || isAuthor.value
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

const startEdit = (): void => {
  draft.value = props.message.message
  editing.value = true
}

const cancelEdit = (): void => {
  editing.value = false
  draft.value = ''
}

const saveEdit = (): void => {
  const trimmed = draft.value.trim()
  if (!trimmed) return
  editing.value = false
  emit('edit', { id: props.message.id, message: trimmed })
}
</script>
