<script setup lang="ts">
import type { Organizer } from '@/types'
import { ref } from 'vue'
import OrganizerService from '@/services/OrganizerService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const organizer = ref<Organizer>({
  id: null,
  organizationName: '',
  address: '',
})

const router = useRouter()
const store = useMessageStore()

function saveOrganizer() {
  OrganizerService.saveOrganizer(organizer.value)
    .then((response) => {
      router.push({ name: 'event-list-view' })
      store.updateMessage(
        'You have successfully added a new organizer: ' + response.data.organizationName
      )
      setTimeout(() => {
        store.resetMessage()
      }, 3000)
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}
</script>

<template>
  <div class="flex flex-col items-center">
    <h1 class="text-3xl font-bold mb-6">Create an Organization</h1>
    <form @submit.prevent="saveOrganizer" class="w-full max-w-md flex flex-col gap-4">
      <div>
        <label class="block text-gray-500 font-bold mb-1">Organization Name</label>
        <input
          v-model="organizer.organizationName"
          type="text"
          placeholder="Organization Name"
          required
          class="h-12 w-full px-3 text-lg border border-gray-400 rounded focus:border-emerald-500 focus:outline-none"
        />
      </div>

      <div>
        <label class="block text-gray-500 font-bold mb-1">Address</label>
        <input
          v-model="organizer.address"
          type="text"
          placeholder="Address"
          required
          class="h-12 w-full px-3 text-lg border border-gray-400 rounded focus:border-emerald-500 focus:outline-none"
        />
      </div>

      <button
        class="mt-4 flex w-fit mx-auto items-center justify-center h-12 px-8 rounded-md font-semibold border border-gray-400 hover:border-emerald-500 hover:scale-105 transition-all focus:outline-none"
        type="submit"
      >
        Submit
      </button>
    </form>

    <pre class="mt-6 text-sm text-gray-600">{{ organizer }}</pre>
  </div>
</template>