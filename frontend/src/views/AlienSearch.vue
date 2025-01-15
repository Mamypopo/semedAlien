<template>
    <div class="container mx-auto px-4 py-8">
      <!-- หัวข้อและคำอธิบาย -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">ค้นหาข้อมูลคนต่างด้าว</h1>
        <p class="text-gray-600">กรอก Alien Code เพื่อค้นหาข้อมูล</p>
      </div>
  
       <!-- ส่วนค้นหา -->
    <div class="mb-6 p-6 bg-white rounded-lg shadow-md">
      <div class="flex flex-col md:flex-row md:items-end gap-4">
        <div class="flex-grow">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Alien Code
          </label>
          <input 
            v-model="searchAlcode"
            type="text"
            placeholder="ระบุ Alien Code เช่น 2023000000001"
            class="border rounded-lg w-full py-2.5 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            @keyup.enter="searchAlien"
          />
        </div>
        <button 
          @click="searchAlien"
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          :disabled="!searchAlcode || loading"
        >
          <div class="flex items-center justify-center gap-2">
            <svg v-if="loading" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-if="loading">กำลังค้นหา...</span>
            <span v-else>ค้นหา</span>
          </div>
        </button>
      </div>

      <div v-if="loading || notFound" class="mt-6">
        <div :class="[
          'border-l-4 p-4',
          loading ? 'bg-blue-50 border-blue-400' : 'bg-yellow-50 border-yellow-400'
        ]">
          <p :class="[
            'text-sm',
            loading ? 'text-blue-700' : 'text-yellow-700'
          ]">
            {{ loading ? 'กำลังค้นหาข้อมูล...' : 'ไม่พบข้อมูลในระบบ' }}
          </p>
        </div>
      </div>
  
        <!-- แสดงข้อมูลที่ค้นพบ -->
        <div v-else-if="foundData" class="mt-6">
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alien Code</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่อ-นามสกุล (EN)</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่อ-นามสกุล (TH)</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">นายจ้าง</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ประเภทกิจการ</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สัญชาติ</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ foundData.alcode }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ foundData.alprefixen }} {{ foundData.alname_en }} {{ foundData.alsname_en }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ foundData.alprefix_th }} {{ foundData.alname_th }} {{ foundData.alsname_th }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ foundData.employer?.empname }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ foundData.employer?.btname }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ getNationality(foundData.alnation) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <router-link 
                      :to="`/aliens/${foundData.alcode}`"
                      class="text-blue-600 hover:text-blue-900 inline-flex items-center gap-1"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      แก้ไข
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
     
      </div>
      <div class="p-4">
    <!-- คำแนะนำการใช้งาน -->
    <div class="bg-gray-50 rounded-lg p-4">
      <h3 class="text-sm font-semibold text-gray-700 mb-2">คำแนะนำการใช้งาน:</h3>
      <ul class="text-sm text-gray-600 space-y-1">
        <li>กรอก Alien Code ให้ถูกต้องตามรูปแบบ เช่น <strong>2023000000001</strong></li>
        <li>สามารถกดปุ่ม Enter เพื่อค้นหาได้ทันที ถ้าไม่มีข้อมูลระบบจะดึงข้อมูลจาก API อัตโนมัติ</li>
        <li>หากไม่มีข้อมูล กรุณาตรวจสอบ Alien Code อีกครั้ง</li>
      </ul>
    </div>
  </div>

    </div>
  </template>
  

<script>
import { alienService } from '@/services/alien'
import Swal from 'sweetalert2'

export default {
  name: 'AlienSearch',
  data() {
    return {
      searchAlcode: '',
      loading: false,
      notFound: false,
      foundData: null
    }
  },
 
  methods: {
    getNationality(code) {
      const nationalities = {
        'M': 'เมียนมา',
        'L': 'ลาว',
        'C': 'กัมพูชา',
        'V': 'เวียดนาม'
      }
      return nationalities[code] || code
    },

    async searchAlien() {
      if (!this.searchAlcode) return

      this.loading = true
      this.notFound = false
      this.foundData = null

      try {
        const response = await alienService.getByCode(this.searchAlcode)
        if (response.data.alien) {
          this.foundData = response.data.alien
        } else {
          this.notFound = true
        }
      } catch (error) {
        console.error('Search error:', error)
        await Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถค้นหาข้อมูลได้ กรุณาลองใหม่อีกครั้ง'
        })
      } finally {
        this.loading = false
      }
    }
  }
}
</script> 