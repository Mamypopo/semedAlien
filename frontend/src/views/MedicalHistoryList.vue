<template>
  <div class="container mx-auto px-4 py-8">
    <!-- ส่วนค้นหา -->
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <div class="flex items-end">
          <button
            @click="searchHistory"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            ค้นหาประวัติ
          </button>
        </div>
      </div>
    </div>

    <!-- แสดงข้อมูลแรงงาน -->
    <div v-if="histories?.length" class="bg-white shadow-md rounded px-8 pt-6 pb-8">
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-4">ข้อมูลแรงงานต่างด้าว</h2>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-1">HN</label>
            <div>{{ histories[0].ForeignWorkers?.hn || '-' }}</div>
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-1">Alien Code</label>
            <div>{{ histories[0].alcode }}</div>
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-1">วันที่ลงทะเบียน</label>
            <div>{{ formatDate(histories[0].ForeignWorkers.createdOn) }}</div>
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-1">ชื่อ-นามสกุล (EN)</label>
            <div>
              {{ histories[0].ForeignWorkers?.alname_en }}
              {{ histories[0].ForeignWorkers?.alsname_en }}
            </div>
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-1">ชื่อ-นามสกุล (TH)</label>
            <div>
              {{ histories[0].ForeignWorkers?.alname_th }}
              {{ histories[0].ForeignWorkers?.alsname_th }}
            </div>
          </div>
        </div>
      </div>

      <!-- แสดงประวัติทั้งหมด -->
      <div>
        <h2 class="text-xl font-semibold mb-4">ประวัติการซักประวัติ</h2>
        <div class="space-y-4">
          <!-- วนลูปแสดงประวัติแต่ละรายการ -->
          <div
            v-for="history in histories"
            :key="history.id"
            class="bg-gray-50 rounded-lg p-4 border border-gray-200"
          >
            <div class="text-sm text-gray-500 mb-2">
              วันที่ซักประวัติ: {{ formatDate(history.createdOn) }}
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-gray-700 text-sm font-bold mb-1">ส่วนสูง</label>
                <div>{{ history.height || '-' }} ซม.</div>
              </div>
              <div>
                <label class="block text-gray-700 text-sm font-bold mb-1">น้ำหนัก</label>
                <div>{{ history.weight || '-' }} กก.</div>
              </div>
              <div>
                <label class="block text-gray-700 text-sm font-bold mb-1">สีผิว</label>
                <div>{{ history.skin_color || '-' }}</div>
              </div>
              <div>
                <label class="block text-gray-700 text-sm font-bold mb-1">ความดันโลหิต</label>
                <div>{{ history.systolic_bp || '-' }}/{{ history.diastolic_bp || '-' }} mmHg</div>
              </div>
              <div>
                <label class="block text-gray-700 text-sm font-bold mb-1">ชีพจร</label>
                <div>{{ history.pulse_rate || '-' }} ครั้ง/นาที</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ไม่พบข้อมูล -->
    <div v-else-if="searched" class="text-center py-8">
      <p class="text-gray-600">ไม่พบประวัติการซักประวัติ</p>
    </div>
  </div>
</template>

<script>
import { medicalHistoryService } from '../services/medical-history'
import Swal from 'sweetalert2'

export default {
  name: 'MedicalHistoryList',

  data() {
    return {
      searchForm: {
        hn: '',
        alcode: '',
      },
      histories: [],
      searched: false,
    }
  },

  methods: {
    async searchHistory() {
      try {
        this.searched = true
        if (!this.searchForm.hn && !this.searchForm.alcode) {
          Swal.fire({
            icon: 'warning',
            title: 'กรุณากรอกข้อมูล',
            text: 'กรุณากรอก HN หรือ Alien Code',
          })
          return
        }

        let response
        if (this.searchForm.hn) {
          try {
            response = await medicalHistoryService.getByHN(this.searchForm.hn)
          } catch (error) {
            Swal.fire({
              icon: 'info',
              title: 'ไม่พบข้อมูลจาก HN',
              text: 'กรุณาลองค้นหาด้วย Alien Code แทน',
              confirmButtonText: 'ตกลง',
            })
            return
          }
        } else {
          try {
            response = await medicalHistoryService.getByAlcode(this.searchForm.alcode)
          } catch (error) {
            Swal.fire({
              icon: 'info',
              title: 'ไม่พบข้อมูลจาก Alien Code',
              text: 'กรุณาลองค้นหาด้วย HN แทน',
              confirmButtonText: 'ตกลง',
            })
            return
          }
        }

        if (!response?.data?.histories?.length) {
          this.histories = []
          Swal.fire({
            icon: 'info',
            title: 'ไม่พบประวัติ',
            text: 'ไม่พบประวัติการซักประวัติของแรงงานรายนี้',
            confirmButtonText: 'ตกลง',
          })
          return
        }

        this.histories = response.data.histories
      } catch (error) {
        console.error('Error searching history:', error)
        this.histories = []
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถค้นหาข้อมูลได้ กรุณาลองใหม่อีกครั้ง',
          confirmButtonText: 'ตกลง',
        })
      }
    },

    formatDate(date) {
      if (!date) return '-'
      try {
        // แปลงวันที่เป็นภาษาไทย
        return new Date(date).toLocaleDateString('th-TH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      } catch (error) {
        console.error('Error formatting date:', error)
        return '-'
      }
    },
  },
}
</script>
