<script setup lang="ts">
import { type EventOrganizer, type EventItem } from '@/type'
import OrganizerService from '@/services/OrganizerService'
import { ref } from 'vue'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import ImageUpload from '@/components/ImageUpload.vue'

const store = useMessageStore()

const event = ref<EventItem>({
  id: 0,
  category: '',
  title: '',
  description: '',
  location: '',
  date: '',
  time: '',
  organizer: {
    id: 0,
    name: ''
  },
  images: [],
  petsAllowed: false
})

const router = useRouter()
function saveEvent() {
  EventService.saveEvent(event.value)
    .then((response) => {
      console.log(response.data)
      router.push({
        name: 'event-detail',
        params: { id: response.data.id }
      })
      store.updateMessage('You are successfully add a new event for ' + response.data.title)
      setTimeout(() => {
        store.resetMessage()
      }, 3000)
    })
    .catch(() => {
      router.push({ name: 'network-error' })
    })
}

const organizers = ref<EventOrganizer[]>([])
OrganizerService.getOrganizers()
  .then((response) => {
    organizers.value = response.data
  })
  .catch(() => {
    router.push({ name: 'network-error' })
  })
</script>

<template>
  <div>
    <h1>Create an event</h1>
    <form @submit.prevent="saveEvent">
      <BaseInput v-model="event.category" type="text" label="Category" />

      <BaseInput v-model="event.title" type="text" label="Title" />

      <BaseInput v-model="event.description" type="text" label="Description" />

      <BaseInput v-model="event.location" type="text" label="Location" />

      <h3>Who is your organizer?</h3>
      <BaseSelect
        :options="organizers"
        v-model="event.organizer.id"
        label="Select an Organizer"
      />

      <h3>The Image of the event</h3>
      <ImageUpload v-model="event.images" />

      <button type="submit">Submit</button>
    </form>

    <pre>{{ event }}</pre>
  </div>
</template>
