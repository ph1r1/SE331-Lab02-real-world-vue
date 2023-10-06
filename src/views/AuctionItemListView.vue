<script setup lang="ts">
import AuctionCard from '../components/AuctionItemCard.vue'
import type { AuctionItem } from '@/type'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import AuctionItemService from '@/services/AuctionItemService'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import type { AxiosResponse } from 'axios'
import BaseInput from '@/components/BaseInput.vue'

const auctionItems: Ref<Array<AuctionItem>> = ref([])
const totalItem = ref<number>(0)
const router = useRouter()

const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})

AuctionItemService.getAuctionItems(3, props.page)
  .then((response) => {
    auctionItems.value = response.data
    totalItem.value = response.headers['x-total-count']
  })
  .catch(() => {
    router.push({ name: 'NetworkError' })
  })

onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  // EventService.getEvent(3, toPage)
  let queryFunction
  if (keyword.value === null || keyword.value === '') {
    queryFunction = AuctionItemService.getAuctionItems(3, toPage)
  } else {
    queryFunction = AuctionItemService.getAuctionItemsByKeyword(keyword.value, 3, toPage)
  }
  queryFunction
    .then((response: AxiosResponse<AuctionItem[]>) => {
      auctionItems.value = response.data
      totalItem.value = response.headers['x-total-count']
      next()
    })
    .catch(() => {
      router.push({ name: 'NetworkError' })
    })
})

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalItem.value / 3)
  return props.page.valueOf() < totalPages
})

const keyword = ref('')
function updateKeyword(value: string) {
  let queryFunction
  console.log(keyword.value)
  if (keyword.value === '') {
    queryFunction = AuctionItemService.getAuctionItems(3, 1)
  } else {
    queryFunction = AuctionItemService.getAuctionItemsByKeyword(keyword.value, 3, 1)
  }
  queryFunction
    .then((response: AxiosResponse<AuctionItem[]>) => {
      auctionItems.value = response.data
      console.log('events', auctionItems.value)
      totalItem.value = response.headers['x-total-count']
      console.log('totalEvent', totalItem.value)
    })
    .catch(() => {
      router.push({ name: 'NetworkError' })
    })
}
</script>

<template>
  <h1 class="mb-4">Auction Items</h1>
  <main class="flex flex-col items-center">
    <div class="w-64">
      <BaseInput v-model="keyword" type="text" label="Search..." @input="updateKeyword" />
    </div>

    <AuctionCard v-for="item in auctionItems" :key="item.id" :auctionItem="item"></AuctionCard>

    <div class="flex w-[290px]"> 
      <RouterLink
        :to="{ name: 'auction-list', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        class="flex-1 !text-left"
        >Prev Page</RouterLink
      >
      <RouterLink
        :to="{ name: 'auction-list', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        class="flex-1 !text-right"
        >Next Page</RouterLink
      >
    </div>
  </main>
</template>
