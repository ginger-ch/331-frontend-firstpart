<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Organizer } from '@/types'
import OrganizerService from '@/services/OrganizerService'
import { useRouter } from 'vue-router'

const props = defineProps<{
  id: string
}>()

const organizer = ref<Organizer | null>(null)
const imageUrl = ref<string>('')
const router = useRouter()

onMounted(async () => {
  try {
    const response = await OrganizerService.getOrganizer(Number(props.id))
    organizer.value = response.data

    // ตรวจสอบว่ามีชื่อไฟล์รูปภาพหรือไม่ ถ้ามีให้นำไปขอ Presigned URL
    if (organizer.value?.image) {
      imageUrl.value = await OrganizerService.getOrganizerImage(organizer.value.image)
    }
  } catch (error) {
    console.error('Failed to load organizer detail:', error)
    router.push({ name: 'network-error-view' })
  }
})
</script>

<template>
  <div v-if="organizer" class="flex flex-col items-center mt-6">
    <h1 class="text-3xl font-bold mb-4">{{ organizer.name }}</h1>
    <p v-if="organizer.address" class="text-gray-600 mb-4">{{ organizer.address }}</p>

    <!-- ใช้ imageUrl ที่ได้จาก Presigned URL -->
    <div v-if="imageUrl" class="mt-4">
      <img
        :src="imageUrl"
        alt="Organizer Image"
        class="max-w-md rounded-lg shadow-md border border-gray-200"
      />
    </div>
    <div v-else class="text-gray-400 mt-4 italic">
      No image available
    </div>
  </div>
</template>