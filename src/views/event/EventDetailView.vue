<script setup lang="ts">
import { type EventItem } from '@/type'
import type { PropType } from 'vue'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'

const store = useMessageStore()
const { message } = storeToRefs(store)
defineProps({
  event: {
    type: Object as PropType<EventItem>,
    require: true
  }
})
</script>

<template>
  <div v-if="event" class="my-4">
    <div class="animate-flashMessage mb-4" v-if="message">
      <h4>{{ message }}</h4>
    </div>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
    <div class="flex flex-row flex-wrap justify-center">
      <img v-for="image in event.images" :key="image" :src="image" alt="events image" class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg" />
    </div>
  </div>
</template>
