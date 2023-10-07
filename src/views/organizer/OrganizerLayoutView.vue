<script setup lang="ts">
import { useOrganizerStore } from '@/stores/organizer';
import { storeToRefs } from 'pinia';
import { ref } from 'vue'

const store = useOrganizerStore()
const organizer = storeToRefs(store).organizer
const id = ref(organizer?.value?.id)
</script>

<template>
  <div v-if="organizer">
    <h1 class="mb-4">{{ organizer.name }}</h1>
    <div class="font-bold text-[#2c3e50]">
      <router-link :to="{ name: 'organizer-detail', params: { id } }" :class="{ 'text-green-500': $route.name === 'organizer-detail' }">Details</router-link>
    </div>

    <RouterView :organizer="organizer"></RouterView>
  </div>
</template>
