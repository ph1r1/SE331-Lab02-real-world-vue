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

const register = () => {
  store.updateMessage('You are successfully registered for ' + props.event?.title)
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
  <p class="my-4">Registration form here</p>
  <button @click="register" class="rounded-md bg-green-600 px-3 py-2 text-[0.8125rem] font-semibold text-white hover:bg-green-500">Register Me</button>
</template>
