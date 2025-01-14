<template>
  <div
    class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-start justify-center p-4 z-50 overflow-y-auto"
  >
    <div class="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-4">
      <!-- Header -->
      <div class="px-6 py-4 border-b">
        <h3 class="text-xl font-semibold">เพิ่มข้อมูลคนต่างด้าว</h3>
      </div>

      <!-- Body -->
      <div class="p-6">
        <!-- ส่วนค้นหา -->
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block mb-2"
              >เลขที่คำขอ (Reqcode) <span class="text-red-500">*</span></label
            >
            <input
              v-model="searchParams.reqcode"
              type="text"
              maxlength="20"
              class="w-full p-2 border rounded"
              placeholder="เช่น xx-xx-xxxxxx"
            />
          </div>
          <div>
            <label class="block mb-2"
              >เลขบัตรประจำตัว (Alcode) <span class="text-red-500">*</span></label
            >
            <input
              v-model="searchParams.alcode"
              type="text"
              maxlength="13"
              class="w-full p-2 border rounded"
              placeholder="กรุณากรอกเลขบัตรประจำตัว"
            />
          </div>
          <div class="col-span-2">
            <button
              @click="searchAlien"
              class="px-4 py-2 bg-blue-600 text-white rounded w-full hover:bg-blue-700"
              :disabled="loading"
            >
              {{ loading ? 'กำลังค้นหา...' : 'ค้นหา' }}
            </button>
          </div>
        </div>

        <!-- ข้อมูลบริษัท -->
        <div v-if="formData.empname" class="mb-6 grid grid-cols-2 gap-4">
          <div>
            <label class="block mb-2">ชื่อบริษัท</label>
            <input
              v-model="formData.empname"
              type="text"
              class="w-full p-2 border rounded"
              readonly
            />
          </div>
          <div>
            <label class="block mb-2">ที่อยู่บริษัท</label>
            <input
              v-model="formData.wkaddress"
              type="text"
              class="w-full p-2 border rounded"
              readonly
            />
          </div>
          <div>
            <label class="block mb-2">เลขที่คำขอ</label>
            <input
              v-model="formData.reqcode"
              type="text"
              class="w-full p-2 border rounded"
              readonly
            />
          </div>
          <div>
            <label class="block mb-2">ประเภทธุรกิจ</label>
            <input
              v-model="formData.btname"
              type="text"
              class="w-full p-2 border rounded"
              readonly
            />
          </div>
        </div>

        <!-- ข้อมูลคนต่างด้าว -->
        <div v-if="formData.alcode" class="grid grid-cols-2 gap-4">
          <!-- ข้อมูลพื้นฐาน -->
          <div>
            <label class="block mb-2">เลขบัตร</label>
            <input
              v-model="formData.alcode"
              type="text"
              class="w-full p-2 border rounded"
              readonly
            />
          </div>
          <div>
            <label class="block mb-2">ประเภท</label>
            <input
              :value="formData.altype === '1' ? 'ขึ้นทะเบียนคนต่างด้าว' : 'ลูกจ้างต่างด้าว'"
              type="text"
              class="w-full p-2 border rounded"
              readonly
            />
          </div>

          <!-- ชื่อภาษาอังกฤษ -->
          <div>
            <label class="block mb-2">คำนำหน้า (EN)</label>
            <input
              v-model="formData.alprefixen"
              type="text"
              class="w-full p-2 border rounded"
              readonly
            />
          </div>
          <div>
            <label class="block mb-2">ชื่อ-สกุล (EN)</label>
            <input
              :value="`${formData.alnameen || ''} ${formData.alsnameen || ''}`"
              type="text"
              class="w-full p-2 border rounded"
              readonly
            />
          </div>

          <!-- ชื่อภาษาไทย -->
          <div>
            <label class="block mb-2">คำนำหน้า (TH)</label>
            <input v-model="formData.alprefix" type="text" class="w-full p-2 border rounded" />
          </div>
          <div>
            <label class="block mb-2">ชื่อ (TH) <span class="text-red-500">*</span></label>
            <input v-model="formData.alnameth" type="text" class="w-full p-2 border rounded" />
          </div>
          <div>
            <label class="block mb-2">นามสกุล (TH) <span class="text-red-500">*</span></label>
            <input v-model="formData.alsnameth" type="text" class="w-full p-2 border rounded" />
          </div>

          <!-- ข้อมูลทั่วไป -->
          <div>
            <label class="block mb-2">วันเกิด <span class="text-red-500">*</span></label>
            <input v-model="formData.albdate" type="date" class="w-full p-2 border rounded" />
          </div>
          <div>
            <label class="block mb-2">เพศ</label>
            <input
              :value="formData.algender === '1' ? 'ชาย' : 'หญิง'"
              type="text"
              class="w-full p-2 border rounded"
              readonly
            />
          </div>
          <div>
            <label class="block mb-2">สัญชาติ</label>
            <input
              v-model="formData.alnation"
              type="text"
              class="w-full p-2 border rounded"
              readonly
            />
          </div>
          <div>
            <label class="block mb-2">ประเภทอาชีพ</label>
            <input
              v-model="formData.alposid"
              type="text"
              class="w-full p-2 border rounded"
              readonly
            />
          </div>

          <!-- ข้อมูลเพิ่มเติม -->
          <div>
            <label class="block mb-2">ชื่อเล่น <span class="text-red-500">*</span></label>
            <input v-model="formData.nickname" type="text" class="w-full p-2 border rounded" />
          </div>
          <div>
            <label class="block mb-2">อีเมล</label>
            <input v-model="formData.email" type="email" class="w-full p-2 border rounded" />
          </div>
          <div>
            <label class="block mb-2">กรุ๊ปเลือด <span class="text-red-500">*</span></label>
            <select v-model="formData.bloodtype" class="w-full p-2 border rounded">
              <option value="">เลือกกรุ๊ปเลือด</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="O">O</option>
              <option value="AB">AB</option>
            </select>
          </div>
          <div>
            <label class="block mb-2">ศาสนา <span class="text-red-500">*</span></label>
            <select v-model="formData.religion" class="w-full p-2 border rounded">
              <option value="">เลือกศาสนา</option>
              <option value="BUDDHIST">พุทธ</option>
              <option value="CHRISTIAN">คริสต์</option>
              <option value="ISLAM">อิสลาม</option>
              <option value="OTHER">อื่นๆ</option>
            </select>
          </div>

          <!-- ข้อมูลการติดต่อ -->
          <div>
            <label class="block mb-2">เบอร์โทร 1 <span class="text-red-500">*</span></label>
            <input
              v-model="formData.phone1"
              type="tel"
              class="w-full p-2 border rounded"
              maxlength="10"
            />
          </div>
          <div>
            <label class="block mb-2">เบอร์โทร 2</label>
            <input
              v-model="formData.phone2"
              type="tel"
              class="w-full p-2 border rounded"
              maxlength="10"
            />
          </div>

          <!-- ที่อยู่ -->
          <div class="col-span-2">
            <label class="block mb-2">ที่อยู่ <span class="text-red-500">*</span></label>
            <input v-model="formData.address" type="text" class="w-full p-2 border rounded" />
          </div>
          <div>
            <label class="block mb-2">ตำบล <span class="text-red-500">*</span></label>
            <input v-model="formData.district" type="text" class="w-full p-2 border rounded" />
          </div>
          <div>
            <label class="block mb-2">อำเภอ <span class="text-red-500">*</span></label>
            <input v-model="formData.subdistrict" type="text" class="w-full p-2 border rounded" />
          </div>
          <div>
            <label class="block mb-2">จังหวัด <span class="text-red-500">*</span></label>
            <input v-model="formData.province" type="text" class="w-full p-2 border rounded" />
          </div>
          <div>
            <label class="block mb-2">รหัสไปรษณีย์ <span class="text-red-500">*</span></label>
            <input
              v-model="formData.postalcode"
              type="text"
              class="w-full p-2 border rounded"
              maxlength="5"
            />
          </div>

          <!-- หมายเหตุ -->
          <div class="col-span-2">
            <label class="block mb-2">หมายเหตุ</label>
            <textarea v-model="formData.note" class="w-full p-2 border rounded" rows="3"></textarea>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t flex justify-end gap-2">
        <button @click="$emit('close')" class="px-4 py-2 border rounded hover:bg-gray-100">
          ยกเลิก
        </button>
        <button
          @click="saveData"
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          :disabled="loading || !formData.alcode"
        >
          {{ loading ? 'กำลังบันทึก...' : 'บันทึก' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useAlienStore } from '@/stores/alienStore'

export default {
  emits: ['close', 'saved'],
  data() {
    return {
      store: useAlienStore(),
      searchParams: {
        reqcode: '',
        alcode: '',
        token: 'semend',
      },
      loading: false,
      formData: {
        // ข้อมูลจาก API รัฐบาล
        reqcode: '',
        alcode: '',
        altype: '',
        alprefix: '',
        alprefixen: '',
        alnameen: '',
        alsnameen: '',
        algender: '',
        alnation: '',
        alposid: '',
        empname: '',
        wkaddress: '',
        btname: '',

        // ข้อมูลที่ต้องกรอกเพิ่ม
        alnameth: '',
        alsnameth: '',
        nickname: '',
        email: '',
        bloodtype: '',
        religion: '',
        phone1: '',
        phone2: '',
        address: '',
        district: '',
        subdistrict: '',
        province: '',
        postalcode: '',
        note: '',
        albdate: null,
      },
    }
  },

  methods: {
    async searchAlien() {
      if (!this.searchParams.reqcode || !this.searchParams.alcode) {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน')
        return
      }

      try {
        this.loading = true
        console.log('Searching with params:', this.searchParams)

        const result = await this.store.searchByAlcode({
          reqcode: this.searchParams.reqcode,
          alcode: this.searchParams.alcode,
          token: this.searchParams.token,
        })

        if (result) {
          this.formData = {
            ...this.formData,
            ...result.company,
            ...result.alien,
          }
        }
      } catch (error) {
        alert(error.message)
      } finally {
        this.loading = false
      }
    },

    async saveData() {
      try {
        console.log(this.formData)

        if (!this.formData.alnameth || !this.formData.alsnameth) {
          alert('กรุณากรอกชื่อ-นามสกุลภาษาไทย')
          return
        }

        const requiredFields = [
          'nickname',
          'bloodType',
          'religion',
          'phone1',
          'address',
          'subdistrict',
          'district',
          'province',
          'zipcode',
        ]

        // const missingFields = requiredFields.filter((field) => !this.formData[field])
        // if (missingFields.length > 0) {
        //   alert('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน')
        //   return
        // }

        this.loading = true
        await this.store.createAlien(this.formData)
        console.log(this.formData)
        this.$emit('saved')
      } catch (error) {
        alert(error.message)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
