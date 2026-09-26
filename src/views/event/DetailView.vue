<script setup lang="ts">
import { onMounted, ref, toRefs, watch } from 'vue'
import { type Event } from '@/types'
import EventService from '@/services/EventService.ts'

const props = defineProps<{
  event: Event
}>()
const { event } = toRefs(props)

const imageUrls = ref<string[]>([])

const fetchImages = () => {
  if (props.event && props.event.images && props.event.images.length > 0) {
    EventService.getEventImages(props.event.images).then((urls) => {
      imageUrls.value = urls
    })
  } else {
    imageUrls.value = []
  }
}

onMounted(() => {
  fetchImages()
})

watch(
  () => props.event,
  () => {
    fetchImages()
  },
  { deep: true },
)
</script>
<template>
  <p>{{ event.title }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
  <p>Organized by {{ event.organizer?.name }}</p>
  <div class="flex flex-row flex-wrap justify-center">
    <img
      v-for="image in imageUrls"
      :key="image"
      :src="image"
      alt="events image"
      class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg"
    />
  </div>
</template>
