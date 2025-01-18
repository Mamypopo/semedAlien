<template>
  <div class="container mx-auto px-4 py-8">
    <!-- ส่วนค้นหา -->
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2">HN</label>
          <input
            v-model="searchForm.hn"
            type="text"
            class="border rounded w-full py-2 px-3"
            placeholder="ระบุ HN"
          />
        </div>
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2">Alien Code</label>
          <input
            v-model="searchForm.alcode"
            type="text"
            class="border rounded w-full py-2 px-3"
            placeholder="ระบุ Alien Code"
          />
        </div>
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2">ชื่อ-นามสกุล</label>
          <input
            v-model="searchForm.name"
            type="text"
            class="border rounded w-full py-2 px-3"
            placeholder="ระบุชื่อ-นามสกุล"
          />
        </div>
        <div class="flex items-end">
          <button
            @click="searchAliens"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            ค้นหา
          </button>
        </div>
      </div>
    </div>

    <!-- แสดงผลการค้นหา -->
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8">
      <table class="min-w-full">
        <thead>
          <tr>
            <th class="px-6 py-3 border-b text-left">HN</th>
            <th class="px-6 py-3 border-b text-left">Alien Code</th>
            <th class="px-6 py-3 border-b text-left">ชื่อ-นามสกุล</th>
            <th class="px-6 py-3 border-b text-left">วันที่ลงทะเบียน</th>
            <th class="px-6 py-3 border-b text-center">การจัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="alien in aliens" :key="alien.alcode">
            <td class="px-6 py-4 border-b">{{ alien.hn || '-' }}</td>
            <td class="px-6 py-4 border-b">{{ alien.alcode }}</td>
            <td class="px-6 py-4 border-b">{{ alien.alname_en }}{{ alien.alsname_en }}</td>
            <td class="px-6 py-4 border-b">{{ formatDate(alien.createdOn) }}</td>
            <td class="px-6 py-4 border-b text-center">
              <button
                @click="openMedicalForm(alien)"
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
              >
                ซักประวัติ
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <MedicalHistoryModal
      v-if="showModal"
      :alien="selectedAlien"
      @close="showModal = false"
      @save="save"
    />
  </div>
</template>

<script>
import MedicalHistoryModal from '../components/medical-history/modal/MedicalHistoryModal.vue'
import { alienService } from '../services/alien'
import { medicalHistoryService } from '../services/medical-history'
import Swal from 'sweetalert2'

export default {
  name: 'MedicalHistorySearch',

  components: {
    MedicalHistoryModal,
  },

  data() {
    return {
      searchForm: {
        hn: '',
        alcode: '',
        name: '',
      },
      aliens: [],
      showModal: false,
      selectedAlien: null,
    }
  },

  methods: {
    async searchAliens() {
      try {
        if (!this.searchForm.hn && !this.searchForm.alcode && !this.searchForm.name) {
          Swal.fire({
            icon: 'warning',
            title: 'กรุณากรอกข้อมูล',
            text: 'กรุณากรอกข้อมูลอย่างน้อย 1 รายการเพื่อค้นหา',
          })
          return
        }

        const params = {}
        if (this.searchForm.hn) params.hn = this.searchForm.hn
        if (this.searchForm.alcode) params.alcode = this.searchForm.alcode
        if (this.searchForm.name) params.name = this.searchForm.name

        const { data } = await alienService.search(params)
        this.aliens = data

        if (data.length === 0) {
          Swal.fire({
            icon: 'info',
            title: 'ไม่พบข้อมูล',
            text: 'ไม่พบข้อมูลที่ตรงตามเงื่อนไขการค้นหา',
          })
        }
      } catch (error) {
        console.error('Error searching aliens:', error)
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถค้นหาข้อมูลได้',
        })
      }
    },

    openMedicalForm(alien) {
      this.selectedAlien = alien
      this.showModal = true
    },

    async save(formData) {
      try {
        await medicalHistoryService.takeHistory(formData)
        this.showModal = false
        Swal.fire({
          icon: 'success',
          title: 'บันทึกสำเร็จ',
          text: 'บันทึกข้อมูลการซักประวัติเรียบร้อยแล้ว',
        })
      } catch (error) {
        console.error('Error saving medical history:', error)
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถบันทึกข้อมูลได้',
        })
      }
    },

    formatDate(date) {
      if (!date) return '-'
      return new Date(date).toLocaleDateString('th-TH')
    },
  },
}
</script>
