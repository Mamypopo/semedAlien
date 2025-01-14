<template>
    <div class="container mx-auto px-4 py-8 max-w-6xl">
      <!-- Header -->
      <div class="mb-6 flex justify-between items-center bg-blue-100 p-4 rounded-lg shadow">
        <h2 class="text-3xl font-bold text-blue-800">👨‍🔧 รายการคนต่างด้าว</h2>
        <button 
          @click="syncData"
          class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          🔄 Sync Data
        </button>
      </div>
  
      <!-- Error Message -->
      <div v-if="error" class="mb-4">
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow">
          <p>{{ error }}</p>
        </div>
      </div>
  
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="ml-2 text-blue-600 font-medium">กำลังโหลดข้อมูล...</p>
      </div>
  
      <!-- Table -->
      <div v-else class="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Alien Code
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ชื่อ-นามสกุล (EN)
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ชื่อ-นามสกุล (TH)
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                นายจ้าง
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ประเภทกิจการ
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                สัญชาติ
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="alien in aliens" :key="alien.alcode" class="hover:bg-gray-50 transition">
              <td class="px-6 py-4 whitespace-nowrap">{{ alien.alcode }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ alien.alprefixen }} {{ alien.alname_en }} {{ alien.alsname_en }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ alien.alprefix_th }} {{ alien.alname_th }} {{ alien.alsname_th }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">{{ alien.employer?.empname }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ alien.employer?.btname }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ getNationality(alien.alnation) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <router-link 
                  :to="`/aliens/${alien.alcode}`"
                  class="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                >
                  ✏️ อัพเดทข้อมูล
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  

<script>
import { alienService } from '@/services/alien'

export default {
  name: 'AlienList',
  data() {
    return {
      aliens: [],
      loading: false,
      error: null
    }
  },

  methods: {
    async fetchAliens() {
      this.loading = true
      try {
        const response = await alienService.getList()
        this.aliens = response.data.list
      } catch (error) {
        this.error = 'Failed to fetch alien list'
        console.error('Error:', error)
      } finally {
        this.loading = false
      }
    },

    async syncData() {
      try {
        await alienService.syncData()
        // Refresh list after sync
        await this.fetchAliens()
        // อาจจะเพิ่ม notification แจ้งว่า sync สำเร็จ
      } catch (error) {
        this.error = 'Failed to sync data'
        console.error('Sync Error:', error)
      }
    },
    getNationality(code) {
      const nationalities = {
        'M': 'เมียนมา',
        'L': 'ลาว',
        'C': 'กัมพูชา',
        'V': 'เวียดนาม'
      }
      return nationalities[code] || code
    }
  },

  mounted() {
    this.fetchAliens()
  }
}
</script> 