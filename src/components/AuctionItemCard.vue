<template>
    <!-- <RouterLink class="text-[#2c3e50]" :to="{ name: 'event-detail', params: { id: event?.id } }"> -->
      <div class="event-class">
        <div class="p-5 w-[250px] cursor-pointer border border-solid border-[#39495c] mb-[18px] hover:scale-[1.01] hover:shadow-custom">
          <h4>Name: {{ auctionItem?.name }}</h4>
          <h4>Desc: {{ auctionItem?.description }}</h4>
          <h4>Type: {{ auctionItem?.type }}</h4>
        </div>
      </div>
    <!-- </RouterLink> -->
  </template>
  
  <script setup lang="ts">
  import type { AuctionItem } from '@/type'
  import type { PropType } from 'vue'
  
  const props = defineProps({
    auctionItem: {
      type: Object as PropType<AuctionItem>,
      require: true
    }
  })
  </script>
  