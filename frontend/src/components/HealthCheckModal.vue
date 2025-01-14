<template>
  <div class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full my-4 max-h-screen overflow-y-auto">
      <!-- Header -->
      <div class="px-6 py-4 border-b">
        <h3 class="text-lg font-semibold">บันทึกผลตรวจสุขภาพ</h3>
      </div>

      <!-- Body -->
      <div class="p-6 space-y-4">
        <!-- ข้อมูลคนต่างด้าว -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <p><span class="font-medium">เลขบัตร:</span> {{ alien?.alcode }}</p>
          <p>
            <span class="font-medium">ชื่อ-นามสกุล:</span> {{ alien?.alprefixen }}
            {{ alien?.alnameen }} {{ alien?.alsnameen }}
          </p>
        </div>

        <!-- ฟอร์มข้อมูลตรวจสุขภาพ -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block mb-1"
              >โรงพยาบาลที่ตรวจสุขภาพ <span class="text-red-500">*</span></label
            >
            <input
              v-model="healthData.alchknos"
              type="text"
              class="w-full p-2 border rounded"
              maxlength="500"
            />
          </div>
          <div>
            <label class="block mb-1">ผลการตรวจสุขภาพ <span class="text-red-500">*</span></label>
            <select v-model="healthData.alchkstatus" class="w-full p-2 border rounded">
              <option value="1">ตรวจผ่าน</option>
              <option value="2">ตรวจผ่านแบบมีเงื่อนไขที่ต้องรักษาและติดตามผล</option>
              <option value="3">ตรวจไม่ผ่าน</option>
            </select>
          </div>
          <div>
            <label class="block mb-1">วันที่ตรวจสุขภาพ <span class="text-red-500">*</span></label>
            <input v-model="healthData.alchkdate" type="date" class="w-full p-2 border rounded" />
          </div>
          <div>
            <label class="block mb-1"
              >รหัสจังหวัดที่ตรวจสุขภาพ <span class="text-red-500">*</span></label
            >
            <input
              v-model="healthData.alchkprovid"
              type="text"
              class="w-full p-2 border rounded"
              maxlength="2"
            />
          </div>
          <div>
            <label class="block mb-1"
              >เลขที่ใบอนุญาตประกอบวิชาชีพ <span class="text-red-500">*</span></label
            >
            <input
              v-model="healthData.licenseno"
              type="text"
              class="w-full p-2 border rounded"
              maxlength="50"
            />
          </div>
          <div>
            <label class="block mb-1"
              >ชื่อ-นามสกุลแพทย์ พร้อมคำนำหน้า <span class="text-red-500">*</span></label
            >
            <input
              v-model="healthData.chkname"
              type="text"
              class="w-full p-2 border rounded"
              maxlength="100"
            />
          </div>
          <div class="sm:col-span-2">
            <label class="block mb-1">ตำแหน่งแพทย์ <span class="text-red-500">*</span></label>
            <input
              v-model="healthData.chkposition"
              type="text"
              class="w-full p-2 border rounded"
              maxlength="100"
            />
          </div>
          <div class="sm:col-span-2">
            <label class="block mb-1">รายละเอียดผลตรวจสุขภาพเพิ่มเติม</label>
            <textarea
              v-model="healthData.alchkdesc"
              class="w-full p-2 border rounded"
              rows="3"
              maxlength="500"
            ></textarea>
          </div>
          <div class="sm:col-span-2">
            <label class="block mb-1">URL เอกสารอ้างอิงผลการตรวจสุขภาพ</label>
            <input
              v-model="healthData.alchkdoc"
              type="text"
              class="w-full p-2 border rounded"
              maxlength="500"
            />
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t flex justify-end gap-2">
        <button @click="$emit('close')" class="px-4 py-2 border rounded hover:bg-gray-100">
          ยกเลิก
        </button>
        <button
          @click="handleSubmit"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          :disabled="loading"
        >
          {{ loading ? 'กำลังบันทึก...' : 'บันทึก' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HealthCheckModal',
  props: {
    alien: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      showConfirmModal: true,
      healthData: {
        alchknos: '',
        alchkstatus: '1',
        alchkdate: '',
        alchkprovid: '',
        licenseno: '',
        chkname: '',
        chkposition: '',
        alchkdesc: '',
        alchkdoc: '',
      },
    }
  },
  methods: {
    async handleSubmit() {
      // ตรวจสอบข้อมูลที่จำเป็น
      const requiredFields = [
        'alchknos',
        'alchkstatus',
        'alchkdate',
        'alchkprovid',
        'licenseno',
        'chkname',
        'chkposition',
      ]
      const missingFields = requiredFields.filter((field) => !this.healthData[field])

      if (missingFields.length > 0) {
        alert('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน')
        return
      }

      try {
        this.loading = true
        // ส่งข้อมูลกลับไปที่ parent
        this.$emit('submit', {
          ...this.healthData,
          alcode: this.alien.alcode,
        })
      } catch (error) {
        alert(error.message)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
