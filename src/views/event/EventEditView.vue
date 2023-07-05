<script setup lang="ts">
import { type EventItem } from '@/type'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const props = defineProps({
  event: {
    type: Object as PropType<EventItem>,
    require: true
  }
})

const router = useRouter()
const store = useMessageStore()

const edit = () => {
  store.updateMessage('The data has been updated')
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({
    name: 'event-detail',
    params: {
      id: props.event?.id
    }
  })
}
</script>

<template>
  <p class="my-4">Edit the event here</p>
  <button @click="edit" class="rounded-md bg-green-600 px-3 py-2 text-[0.8125rem] font-semibold text-white hover:bg-green-500">Edit Me</button>
</template>
