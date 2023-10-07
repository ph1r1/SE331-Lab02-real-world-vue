<script setup lang="ts">
import { type OrganizerItem } from '@/type'
import type { PropType } from 'vue'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'

const store = useMessageStore()
const { message } = storeToRefs(store)
defineProps({
  organizer: {
    type: Object as PropType<OrganizerItem>,
    require: true
  }
})
</script>

<template>
  <div v-if="organizer" class="my-4">
    <div class="animate-flashMessage mb-4" v-if="message">
      <h4>{{ message }}</h4>
    </div>
    <p>{{ organizer.id }}</p>
    <p>{{ organizer.name }}</p>
    <div class="flex flex-row flex-wrap justify-center">
      <img v-for="image in organizer.image" :key="image" :src="image" alt="events image" class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg" />
    </div>
  </div>
</template>
