<template>
    <div class=" mx-auto px-4 py-8  min-h-screen flex items-center justify-center">
      <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 border border-blue-200">
        <h2 class="text-2xl font-bold mb-6 text-center text-blue-600">เข้าสู่ระบบสำหรับบุคลากร</h2>
        
        <form @submit.prevent="handleSubmit">
          <!-- Email -->
          <div class="mb-4">
            <label class="block text-gray-700 mb-2 font-medium">อีเมล</label>
            <input 
              type="email" 
              v-model="formData.email"
              class="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            >
          </div>
  
          <!-- Password -->
          <div class="mb-6">
            <label class="block text-gray-700 mb-2 font-medium">รหัสผ่าน</label>
            <input 
              type="password" 
              v-model="formData.password"
              class="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            >
          </div>
  
          <!-- Submit Button -->
          <button 
            type="submit"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            :disabled="loading"
          >
            {{ loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ' }}
          </button>
        </form>
  
        <!-- Register Link -->
        <div class="mt-4 text-center">
          <router-link to="/register" class="text-blue-600 hover:underline">
            ยังไม่มีบัญชี? สมัครสมาชิก
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2'
  import api from '@/services/api'
  import { useAuthStore } from '@/stores/auth'
  import { authService } from '@/services/auth' 

  export default {
    name: 'LoginComponent',
    
    data() {
      return {
        formData: {
          email: '',
          password: ''
        },
        loading: false,
        error: null
      }
    },
    beforeMount() {
      const authStore = useAuthStore()
      if (authStore.isAuthenticated) {
        this.$router.push('/') 
      }
    },
    methods: {
      async handleSubmit() {
        this.loading = true
        this.error = null
        
        try {
            const response = await authService.login(this.formData)
            const authStore = useAuthStore()
        
          authStore.setUser(response.data.user)
          authStore.setToken(response.data.token)
  
          Swal.fire({
            icon: 'success',
            title: 'เข้าสู่ระบบสำเร็จ',
            text: 'ยินดีต้อนรับ!',
            timer: 2000,
            showConfirmButton: false
          })
  
          this.$router.push('/reqcodes')
        } catch (err) {
          this.error = err.response?.data?.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
  
          Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: this.error,
          })
        } finally {
          this.loading = false
        }
      }
    }
  }
  </script>
  
  <style>
  </style>
  