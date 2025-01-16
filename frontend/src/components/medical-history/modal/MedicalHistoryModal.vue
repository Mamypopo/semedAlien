<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <!-- Modal Header -->
      <div class="px-6 py-4 border-b">
        <h2 class="text-xl font-semibold">ซักประวัติแรงงานต่างด้าว</h2>
      </div>

      <!-- Modal Body -->
      <div class="px-6 py-4">
        <!-- ข้อมูลแรงงานต่างด้าว -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-3">ข้อมูลพื้นฐาน</h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-1">HN</label>
              <div class="text-gray-900">{{ alien.hn || '-' }}</div>
            </div>
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-1">Alien Code</label>
              <div class="text-gray-900">{{ alien.alcode }}</div>
            </div>
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-1">ชื่อ-นามสกุล TH</label>
              <div class="text-gray-900">{{ alien.alname_th }} {{ alien.alsname_th }}</div>
            </div>
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-1">ชื่อ-นามสกุล en</label>
              <div class="text-gray-900">{{ alien.alname_en }} {{ alien.alsname_en }}</div>
            </div>
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-1">วันที่ลงทะเบียน</label>
              <div class="text-gray-900">{{ formatDate(alien.createdOn) }}</div>
            </div>
          </div>
        </div>

        <!-- ฟอร์มซักประวัติ -->
        <div>
          <h3 class="text-lg font-semibold mb-3">ข้อมูลการซักประวัติ</h3>
          <div class="grid grid-cols-2 gap-4">
            <!-- ส่วนสูง -->
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2"> ส่วนสูง (ซม.) </label>
              <input
                v-model="form.height"
                type="number"
                step="0.01"
                class="border rounded w-full py-2 px-3"
              />
            </div>

            <!-- น้ำหนัก -->
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2"> น้ำหนัก (กก.) </label>
              <input
                v-model="form.weight"
                type="number"
                step="0.01"
                class="border rounded w-full py-2 px-3"
              />
            </div>

            <!-- สีผิว -->
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2">สีผิว</label>
              <select v-model="form.skin_color" class="border rounded w-full py-2 px-3">
                <option disabled value="">กรุณาเลือกสีผิว</option>
                <option value="สีขาวซีด">สีขาวซีด</option>
                <option value="สีขาว">สีขาว</option>
                <option value="สีขาวเหลือง">สีขาวเหลือง</option>
                <option value="สีน้ำตาลอ่อน">สีน้ำตาลอ่อน</option>
                <option value="สีน้ำตาลเข้ม">สีน้ำตาลเข้ม</option>
                <option value="สีดำ">สีดำ</option>
              </select>
            </div>

            <!-- ความดันตัวบน -->
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2"> ความดันตัวบน </label>
              <input
                v-model="form.systolic_bp"
                type="number"
                class="border rounded w-full py-2 px-3"
              />
            </div>

            <!-- ความดันตัวล่าง -->
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2"> ความดันตัวล่าง </label>
              <input
                v-model="form.diastolic_bp"
                type="number"
                class="border rounded w-full py-2 px-3"
              />
            </div>

            <!-- ชีพจร -->
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2"> ชีพจร </label>
              <input
                v-model="form.pulse_rate"
                type="number"
                class="border rounded w-full py-2 px-3"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="px-6 py-4 border-t flex justify-end gap-2">
        <button
          @click="$emit('close')"
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          ยกเลิก
        </button>
        <button
          @click="handleSave"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          บันทึก
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { medicalHistoryService } from '../../../services/medical-history.js'
import Swal from 'sweetalert2'

export default {
  name: 'MedicalHistoryModal',

  props: {
    alien: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      form: {
        height: null,
        weight: null,
        skin_color: '',
        systolic_bp: null,
        diastolic_bp: null,
        pulse_rate: null,
      },
    }
  },

  methods: {
    async handleSave() {
      const result = await Swal.fire({
        title: 'ยืนยันการบันทึก',
        text: 'คุณต้องการบันทึกข้อมูลนี้หรือไม่?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'บันทึก',
        cancelButtonText: 'ยกเลิก',
      })

      if (result.isConfirmed) {
        const saveData = {
          ...this.form,
          alcode: this.alien.alcode,
        }

        this.$emit('save', saveData)

        Swal.fire({
          title: 'สำเร็จ',
          text: 'บันทึกข้อมูลเรียบร้อยแล้ว',
          icon: 'success',
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
