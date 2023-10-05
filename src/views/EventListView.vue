<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
import type { EventItem } from '@/type'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import EventService from '@/services/EventService'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import type { AxiosResponse } from 'axios'
import BaseInput from '@/components/BaseInput.vue'

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
  // EventService.getEvent(3, toPage)
  let queryFunction
  if (keyword.value === null || keyword.value === '') {
    queryFunction = EventService.getEvent(3, toPage)
  } else {
    queryFunction = EventService.getEventsByKeyword(keyword.value, 3, toPage)
  }
  queryFunction
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

const keyword = ref('')
function updateKeyword(value: string) {
  let queryFunction
  if (keyword.value === '') {
    queryFunction = EventService.getEvent(3, 1)
  } else {
    queryFunction = EventService.getEventsByKeyword(keyword.value, 3, 1)
  }
  queryFunction
    .then((response: AxiosResponse<EventItem[]>) => {
      events.value = response.data
      console.log('events', events.value)
      totalEvent.value = response.headers['x-total-count']
      console.log('totalEvent', totalEvent.value)
    })
    .catch(() => {
      router.push({ name: 'NetworkError' })
    })
}
</script>

<template>
  <h1 class="mb-4">Events For Good</h1>
  <main class="flex flex-col items-center">
    <div class="w-64">
      <BaseInput v-model="keyword" type="text" label="Search..." @input="updateKeyword" />
    </div>

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
