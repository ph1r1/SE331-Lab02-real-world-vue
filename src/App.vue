<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from './stores/message'
import { storeToRefs } from 'pinia'

const store = useMessageStore()
const { message } = storeToRefs(store)
</script>

<template>
  <header class="max-h-screen leading-normal">
    <div v-if="message" class="animate-yellowfade">
      <h4 class="text-[20px]">{{ message }}</h4>
    </div>
    <nav class="p-[30px] font-bold text-[#2c3e50]">
      <RouterLink :to="{ name: 'event-list' }" :class="{ 'text-green-500': $route.name === 'event-list' }">Home</RouterLink> |
      <RouterLink :to="{ name: 'about' }" :class="{ 'text-[#42b983]': $route.name === 'about' }">About</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
