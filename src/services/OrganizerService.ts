import axios from 'axios'
import type { Organizer } from '@/types'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getOrganizers(perPage?: number, page?: number) {
    if (perPage !== undefined && page !== undefined) {
      return apiClient.get('/organizers?_limit=' + perPage + '&_page=' + page)
    }
    return apiClient.get('/organizers')
  },
  getOrganizer(id: number) {
    return apiClient.get('/organizers/' + id)
  },
  saveOrganizer(organizer: Organizer) {
    return apiClient.post('/organizers', organizer)
  },
}