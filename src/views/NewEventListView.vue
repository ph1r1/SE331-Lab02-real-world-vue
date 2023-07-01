<script setup lang="ts">
import NewEventCard from '../components/NewEventCard.vue'
import type { EventItem } from '@/type'
import { ref, type Ref } from 'vue'
import StudentService from '@/services/StudentService'

const events: Ref<Array<EventItem>> = ref([])

StudentService.getEvent().then((response) => {
  events.value = response.data
})
</script>

<template>
  <h1>This is another view</h1>
  <main class="events">
    <NewEventCard v-for="event in events" :key="event.id" :event="event"></NewEventCard>
  </main>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
