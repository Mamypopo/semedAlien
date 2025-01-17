import { defineStore } from 'pinia'
import { authService } from '@/services/auth'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    return {
      user: null,
      token: token || null,
      loading: false
    }
  },

  getters: {
    isAuthenticated: (state) => {
        if (!state.token) return false
        const payload = JSON.parse(atob(state.token.split('.')[1]))
        return payload.exp * 1000 > Date.now() 
    },   

    isDoctor: (state) => state.user?.role === 'DOCTOR',
    isStaff: (state) => state.user?.role === 'STAFF',
    userFullName: (state) => {
      if (!state.user) return ''
      return state.user.role === 'DOCTOR' ? state.user.chkname : state.user.fullname
    },
  },

  actions: {
    setUser(user) {
      this.user = user
    },

    setToken(token) {
        if (this.token === token) return
        this.token = token
        if (token) {
          localStorage.setItem('token', token)
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        } else {
          localStorage.removeItem('token')
          delete api.defaults.headers.common['Authorization']
        }
      },

      async fetchUser() {
        if (this.loading || !this.token) return
        
        this.loading = true
        try {
          const response = await authService.getMe()
          console.log('User data received:', response.data)
          this.user = response.data.user
        } catch (err) {
          console.error('Error fetching user:', err)
          this.logout()
        } finally {
          this.loading = false
        }
      },
      

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
    }
  }
}) 