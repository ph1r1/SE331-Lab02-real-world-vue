<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
import type { EventItem } from '@/type'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import EventService from '@/services/EventService'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import type { AxiosResponse } from 'axios'

const events: Ref<Array<EventItem>> = ref([])
const totalEvent = ref<number>(0)
const router = useRouter()

const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})

EventService.getEvent(3, props.page)
  .then((response) => {
    events.value = response.data
    totalEvent.value = response.headers['x-total-count']
  })
  .catch(() => {
    router.push({ name: 'NetworkError' })
  })

onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  EventService.getEvent(3, toPage)
    .then((response: AxiosResponse<EventItem[]>) => {
      events.value = response.data
      totalEvent.value = response.headers['x-total-count']
      next()
    })
    .catch(() => {
      router.push({ name: 'NetworkError' })
    })
})

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvent.value / 3)
  return props.page.valueOf() < totalPages
})
</script>

<template>
  <h1 class="mb-4">Events For Good</h1>
  <main class="flex flex-col items-center">
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
    <div class="flex w-[290px]">
      <RouterLink
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        class="flex-1 !text-left"
        >Prev Page</RouterLink
      >
      <RouterLink
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        class="flex-1 !text-right"
        >Next Page</RouterLink
      >
    </div>
  </main>
</template>

<!-- color: #2c3e50; -->