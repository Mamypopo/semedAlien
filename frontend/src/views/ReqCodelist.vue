<template>
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-gray-800">📋 Request Code List</h1>
        <span class="text-sm text-gray-500">Total: {{ reqCodes.length }}</span>
      </div>
  
      <!-- Input Section -->
      <div class="mb-6 bg-blue-50 p-4 rounded-lg shadow-lg">
        <div class="flex gap-4 items-center">
          <input 
            v-model="newReqCode" 
            type="text"
            placeholder="กรอกรหัสที่นี่"
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            @keyup.enter="createReqCode"
          >
          <button 
            @click="createReqCode"
            :disabled="!newReqCode"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            ➕ เพิ่ม
          </button>
        </div>
      </div>
  
      <!-- Error Alert -->
      <div v-if="error" class="mb-6">
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative shadow-lg" role="alert">
          <span class="block sm:inline">{{ error }}</span>
          <button @click="error = null" class="absolute top-0 bottom-0 right-0 px-4">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
  
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="ml-2 text-blue-600 font-medium">Loading...</p>
      </div>
  
      <!-- Request Codes Table -->
      <div v-else class="bg-white rounded-lg shadow overflow-hidden">
        <table v-if="reqCodes.length" class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                รหัสคำขอ
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                สร้างเมื่อ
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                จัดการ
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-100">
            <tr v-for="code in reqCodes" :key="code.id" class="hover:bg-gray-50 transition">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ code.reqcode }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ formatDate(code.createdOn) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <button 
                  @click="deleteReqCode(code.id)"
                  class="text-red-600 hover:text-red-900 text-sm font-medium hover:underline focus:outline-none"
                >
                  🗑️ ลบ
                </button>
              </td>
            </tr>
          </tbody>
        </table>
  
        <!-- Empty State -->
        <div 
          v-else 
          class="text-center py-12 px-4"
        >
          <svg 
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">ไม่มีรหัสคำขอ</h3>
          <p class="mt-1 text-sm text-gray-500">เริ่มต้นด้วยการเพิ่มรหัสคำขอใหม่</p>
        </div>
      </div>
    </div>
  </template>
  
  
  
  <script>
  import { reqCodeService } from '@/services/reqcode'
  import Swal from 'sweetalert2'

  export default {
    name: 'ReqCodeList',
    data() {
      return {
        reqCodes: [],
        newReqCode: '',
        loading: false,
        error: null
      }
    },
    methods: {
        async fetchReqCodes() {
      this.loading = true
      try {
        const response = await reqCodeService.getList()
        this.reqCodes = response.data.list
      } catch (error) {
        if (error.code === 'ERR_NETWORK') {
          await Swal.fire({
            icon: 'error',
            title: 'ไม่สามารถเชื่อมต่อได้',
            text: 'กรุณาตรวจสอบการเชื่อมต่อและลองใหม่อีกครั้ง',
            confirmButtonText: 'ตกลง',
            confirmButtonColor: '#d33'
          })
        } else {
          await Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง',
            confirmButtonText: 'ตกลง',
            confirmButtonColor: '#d33'
          })
        }
        console.error('Error:', error)
      } finally {
        this.loading = false
      }
    },
  
      async createReqCode() {
        if (!this.newReqCode) return
  
        try {
          await reqCodeService.create(this.newReqCode)
        await Swal.fire({
          icon: 'success',
          title: 'เพิ่มสำเร็จ',
          text: 'เพิ่ม ReqCode เรียบร้อยแล้ว',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#3085d6'
        })
        
          this.newReqCode = ''
          await this.fetchReqCodes()
        } catch (error) {
            await Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถเพิ่ม ReqCode ได้ กรุณาลองใหม่อีกครั้ง',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#d33'
        })
          console.error(error)
        }
      },
  
      async deleteReqCode(id) {
      const result = await Swal.fire({
        title: 'ยืนยันการลบ',
        text: "คุณต้องการลบ ReqCode นี้ใช่หรือไม่?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'ใช่, ลบเลย',
        cancelButtonText: 'ยกเลิก'
      })

      if (result.isConfirmed) {
        try {
          await reqCodeService.delete(id)
          await Swal.fire({
            icon: 'success',
            title: 'ลบสำเร็จ',
            text: 'ลบ ReqCode เรียบร้อยแล้ว',
            confirmButtonText: 'ตกลง',
            confirmButtonColor: '#3085d6'
          })
          
          await this.fetchReqCodes()
        } catch (error) {
          await Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่สามารถลบ ReqCode ได้ กรุณาลองใหม่อีกครั้ง',
            confirmButtonText: 'ตกลง',
            confirmButtonColor: '#d33'
          })
          console.error(error)
        }
      }
    },
  
      formatDate(date) {
        return new Date(date).toLocaleString('th-TH', {
          dateStyle: 'medium',
          timeStyle: 'short'
        })
      },
      
    },
    mounted() {
      this.fetchReqCodes()
    }
  }
  </script>