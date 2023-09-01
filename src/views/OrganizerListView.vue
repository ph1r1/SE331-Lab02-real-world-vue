<script setup lang="ts">
import OrganizerCard from '../components/OrganizerCard.vue'
import type { OrganizerItem } from '@/type'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import OrganizerService from '@/services/OrganizerService'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import type { AxiosResponse } from 'axios'

const organizers: Ref<Array<OrganizerItem>> = ref([])
const totalOrganizer = ref<number>(0)
const router = useRouter()

const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})

OrganizerService.getOrganizer(3, props.page)
  .then((response) => {
    organizers.value = response.data
    totalOrganizer.value = response.headers['x-total-count']
  })
  .catch(() => {
    router.push({ name: 'NetworkError' })
  })

onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  OrganizerService.getOrganizer(3, toPage)
    .then((response: AxiosResponse<OrganizerItem[]>) => {
        organizers.value = response.data
      totalOrganizer.value = response.headers['x-total-count']
      next()
    })
    .catch(() => {
      router.push({ name: 'NetworkError' })
    })
})

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalOrganizer.value / 3)
  return props.page.valueOf() < totalPages
})
</script>

<template>
  <h1 class="mb-4">Organizerrrrrr</h1>
  <main class="flex flex-col items-center">
    <OrganizerCard v-for="organizer in organizers" :key="organizer.id" :organizer="organizer"></OrganizerCard>
    <div class="flex w-[290px]">
      <RouterLink
        :to="{ name: 'organizer-list', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        class="flex-1 !text-left"
        >Prev Page</RouterLink
      >
      <RouterLink
        :to="{ name: 'organizer-list', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        class="flex-1 !text-right"
        >Next Page</RouterLink
      >
    </div>
  </main>
</template>

<!-- color: #2c3e50; -->