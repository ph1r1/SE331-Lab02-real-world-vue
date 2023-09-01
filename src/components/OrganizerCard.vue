<template>
    <!-- <RouterLink class="text-[#2c3e50]" :to="{ name: 'event-detail', params: { id: event?.id } }"> -->
      <div class="">
        <div class="p-5 w-[250px] cursor-pointer border border-solid border-[#39495c] mb-[18px] hover:scale-[1.01] hover:shadow-custom">
          <span>@{{ organizer?.id }} {{ organizer?.name }}</span>
          <h4>{{ organizer?.address }}</h4>
        </div>
      </div>
    <!-- </RouterLink> -->
  </template>
  
  <script setup lang="ts">
  import type { OrganizerItem } from '@/type'
  import type { PropType } from 'vue'
  
  const props = defineProps({
    organizer: {
      type: Object as PropType<OrganizerItem>,
      require: true
    }
  })
  </script>
  