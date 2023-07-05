<script setup lang="ts">
import { useEventStore } from '@/stores/event';
import { storeToRefs } from 'pinia';
import { ref } from 'vue'

const store = useEventStore()
const event = storeToRefs(store).event
const id = ref(event?.value?.id)
</script>

<template>
  <div v-if="event">
    <h1 class="mb-4">{{ event.title }}</h1>
    <div class="font-bold text-[#2c3e50]">
      <router-link :to="{ name: 'event-detail', params: { id } }" :class="{ 'text-green-500': $route.name === 'event-detail' }">Details</router-link> |
      <router-link :to="{ name: 'event-register', params: { id } }" :class="{ 'text-green-500': $route.name === 'event-register' }">Register</router-link> |
      <router-link :to="{ name: 'event-edit', params: { id } }" :class="{ 'text-green-500': $route.name === 'event-edit' }">Edit</router-link>
    </div>

    <RouterView :event="event"></RouterView>
  </div>
</template>
