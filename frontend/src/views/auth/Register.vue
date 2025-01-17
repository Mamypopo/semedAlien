<template>
    <div class="container mx-auto px-4 py-8 bg-blue-50 min-h-screen flex items-center justify-center">
      <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 border border-blue-200">
        <h2 class="text-2xl font-bold mb-6 text-center text-blue-600">สมัครสมาชิก</h2>
        
        <!-- Role Selection First -->
        <div class="mb-6">
          <label class="block text-gray-700 mb-2 font-medium">ประเภทผู้ใช้</label>
          <select 
            v-model="formData.role"
            class="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">-- เลือกประเภทผู้ใช้ --</option>
            <option value="STAFF">เจ้าหน้าที่</option>
            <option value="DOCTOR">แพทย์</option>
          </select>
        </div>
  
        <!-- Show rest of the form only after role is selected -->
        <form v-if="formData.role" @submit.prevent="handleSubmit">
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
          <div class="mb-4">
            <label class="block text-gray-700 mb-2 font-medium">รหัสผ่าน</label>
            <input 
              type="password" 
              v-model="formData.password"
              class="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            >
          </div>
  
          <!-- Full Name (Only for STAFF) -->
          <div v-if="formData.role === 'STAFF'" class="mb-4">
            <label class="block text-gray-700 mb-2 font-medium">ชื่อ-นามสกุล</label>
            <input 
              type="text" 
              v-model="formData.fullname"
              class="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            >
          </div>
  
          <!-- Phone -->
          <div class="mb-4">
            <label class="block text-gray-700 mb-2 font-medium">เบอร์โทรศัพท์</label>
            <input 
              type="tel" 
              v-model="formData.phone"
              class="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
          </div>
  
          <!-- Doctor Fields -->
          <div v-if="formData.role === 'DOCTOR'" class="space-y-4">
            <div class="mb-4">
              <label class="block text-gray-700 mb-2 font-medium">เลขที่ใบอนุญาต</label>
              <input 
                type="text" 
                v-model="formData.licenseno"
                class="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
            </div>
  
            <div class="mb-4">
              <label class="block text-gray-700 mb-2 font-medium">ชื่อแพทย์</label>
              <input 
                type="text" 
                v-model="formData.chkname"
                class="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
            </div>
            
            <div class="mb-4">
              <label class="block text-gray-700 mb-2 font-medium">ตำแหน่ง</label>
              <input 
                type="text" 
                v-model="formData.chkposition"
                class="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
            </div>
          </div>
  
          <!-- Register Code -->
          <div class="mb-6">
            <label class="block text-gray-700 mb-2 font-medium">รหัสลงทะเบียน</label>
            <input 
              type="text" 
              v-model="formData.registerCode"
              class="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            >
          </div>
  
          <!-- Error Message -->
          <div v-if="error" class="mb-4 text-red-500">
            {{ error }}
          </div>
  
          <!-- Submit Button -->
          <button 
            type="submit"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            :disabled="loading"
          >
            {{ loading ? 'กำลังสมัคร...' : 'สมัครสมาชิก' }}
          </button>
        </form>
  
        <!-- Login Link -->
        <div class="mt-4 text-center">
          <router-link to="/login" class="text-blue-600 hover:underline">
            มีบัญชีอยู่แล้ว? เข้าสู่ระบบ
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2'
  import { authService } from '@/services/auth' 
  import { useAuthStore } from '@/stores/auth'
  
  export default {
    name: 'RegisterComponent',
    
    data() {
      return {
        formData: {
          email: '',
          password: '',
          fullname: '',
          phone: '',
          role: '',
          licenseno: '',
          chkname: '',
          chkposition: '',
          registerCode: ''
        },
        loading: false,
        error: null
      }
    },
  
    methods: {
      async handleSubmit() {
        this.loading = true
        this.error = null
        
        try {
        const response = await authService.register(this.formData)
          
          const authStore = useAuthStore()
      
          authStore.setUser(response.data.user)
          authStore.setToken(response.data.token)
  
          // แสดง swal สำเร็จ
          Swal.fire({
            icon: 'success',
            title: 'สมัครสมาชิกสำเร็จ',
            text: 'ยินดีต้อนรับเข้าสู่ระบบ!',
            timer: 2000,
            showConfirmButton: false
          })
  
          this.$router.push('/')
          
        } catch (err) {
          this.error = err.response?.data?.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่'
  
          // แสดง swal ข้อผิดพลาด
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
  