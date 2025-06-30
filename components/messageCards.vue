<template>
  <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
    <div class="flex items-start space-x-4">
      <img 
        :src="message.avatar_url" 
        :alt="message.username"
        class="h-12 w-12 rounded-full flex-shrink-0 object-cover"
      >
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-bold text-black">{{ message.username }}</h3>
            <p class="text-sm text-gray-500">{{ formatDate(message.created_at) }}</p>
          </div>
          <button
            v-if="canDelete"
            class="bg-black text-white px-3 py-1 rounded-lg hover:bg-gray-800 transition-colors text-sm font-semibold"
            @click="confirmDelete"
          >
            Delete
          </button>
        </div>
        <div class="mt-4">
          <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">{{ message.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: Object,
    required: true
  },
  currentUser: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['delete'])

const canDelete = computed(() => {
  return props.currentUser && props.currentUser.id === props.message.user_id
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const confirmDelete = () => {
  if (confirm('Are you sure you want to delete this message?')) {
    emit('delete', props.message.id)
  }
}
</script>