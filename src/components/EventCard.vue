<template>
  <RouterLink class="text-[#2c3e50]" :to="{ name: 'event-detail', params: { id: event?.id } }">
    <div class="event-class">
      <div class="p-5 w-[250px] cursor-pointer border border-solid border-[#39495c] mb-[18px] hover:scale-[1.01] hover:shadow-custom">
        <span>@{{ event?.time }} on {{ event?.date }}</span>
        <h4>{{ event?.title }}</h4>
        <span>by</span>
        <h5>{{event?.organizer.name}}</h5>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { EventItem } from '@/type'
import type { PropType } from 'vue'

const props = defineProps({
  event: {
    type: Object as PropType<EventItem>,
    require: true
  }
})
</script>
