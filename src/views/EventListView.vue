<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
import type { EventItem } from '@/type'
import { ref, watchEffect } from 'vue'
import type { Ref } from 'vue'
import EventService from '@/services/EventService'

const events: Ref<Array<EventItem>> = ref([])

const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})

watchEffect(() => {
  EventService.getEvent(2, props.page).then((response) => {
    events.value = response.data
  })
})
</script>

<template>
  <h1>Events For Good</h1>
  <main class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
    <RouterLink :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev" v-if="page != 1"
      >Prev Page</RouterLink
    >
    <RouterLink :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next" v-if="events.length != 0"
      >Next Page</RouterLink
    >
  </main>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
