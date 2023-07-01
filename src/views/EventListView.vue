<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
// import NewEventCard from '../components/NewEventCard.vue'
import type { EventItem } from '@/type'
import { ref, type Ref } from 'vue'
import axios from 'axios'

const events: Ref<Array<EventItem>> = ref([])

axios.get<EventItem[]>('http://localhost:3004/events').then((response) => {
  events.value = response.data
})
</script>

<template>
  <h1>Events For Good</h1>
  <main class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
    <!-- <NewEventCard v-for="event in events" :key="event.id" :event="event"></NewEventCard> -->
  </main>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
