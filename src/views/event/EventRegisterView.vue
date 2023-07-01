<script setup lang="ts">
import { ref } from 'vue'
import { type EventItem } from '@/type'
import EventService from '@/services/EventService'

const event = ref<EventItem | null>(null)

const props = defineProps({
  id: String
})

EventService.getEventById(Number(props.id))
  .then((response) => {
    event.value = response.data
  })
  .catch((err) => {
    console.log(err)
  })
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div class="nav">
      <router-link :to="{ name: 'event-detail', params: { id } }">Details</router-link> |
      <router-link :to="{ name: 'event-register', params: { id } }">Register</router-link> |
      <router-link :to="{ name: 'event-edit', params: { id } }">Edit</router-link>
    </div>
    <p>Registration form here</p>
  </div>
</template>
