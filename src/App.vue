<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// import { useMessageStore } from './stores/message'
// import { storeToRefs } from 'pinia'

// const store = useMessageStore()
// const { message } = storeToRefs(store)
</script>

<template>
  <header class="max-h-screen leading-normal">
    <!-- <div v-if="message" class="animate-flashMessage">
      <h4 class="text-[20px]">{{ message }}</h4>
    </div> -->
    <h1>Created by ph1r1</h1>
    <nav class="p-[30px] font-bold text-[#2c3e50]">
      <RouterLink :to="{ name: 'event-list' }" :class="{ 'text-[#42b983]': $route.name === 'event-list' }">Home</RouterLink> |
      <RouterLink :to="{ name: 'about' }" :class="{ 'text-[#42b983]': $route.name === 'about' }">About</RouterLink> |
      <RouterLink :to="{ name: 'add-event' }" :class="{ 'text-[#42b983]': $route.name === 'add-event' }">New Event</RouterLink> |
      <RouterLink :to="{ name: 'organizer-list' }" :class="{ 'text-[#42b983]': $route.name === 'organizer-list' }">Organizer</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
