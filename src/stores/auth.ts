import { defineStore } from 'pinia'

import axios from 'axios'

import type { AxiosInstance } from 'axios'
import type { EventOrganizer } from '@/type'

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,

  withCredentials: false,

  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as EventOrganizer | null
  }),
  getters: {
    currentUserName(): string {
      return this.user?.name || ''
    }
  },

  actions: {
    async login(email: string, password: string) {
      const response = await apiClient.post('/api/v1/auth/authenticate', {
        username: email,
        password: password
      })
      this.token = response.data.access_token
      this.user = response.data.user
      localStorage.setItem('access_token', this.token as string)
      localStorage.setItem('user', JSON.stringify(this.user))
      return response
    },
    logout() {
      console.log('logout')
      this.token = null
      this.user = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
    },
    reload(token: string, user: EventOrganizer) {
      this.token = token
      this.user = user
    },
    isAdmin(): boolean {
      return this.user?.roles.includes('ROLE_ADMIN') || false
    }
  }
})
