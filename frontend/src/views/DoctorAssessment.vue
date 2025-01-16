<template>
  <div class="container mx-auto px-4 py-8">
    <!-- ส่วนแสดงข้อมูลการซักประวัติ -->
    <div v-if="history" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 class="text-xl font-semibold mb-4">ข้อมูลการซักประวัติ</h2>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <p class="text-sm font-semibold">ส่วนสูง:</p>
          <p>{{ history.height }} ซม.</p>
        </div>
        <div>
          <p class="text-sm font-semibold">น้ำหนัก:</p>
          <p>{{ history.weight }} กก.</p>
        </div>
        <div>
          <p class="text-sm font-semibold">สีผิว:</p>
          <p>{{ history.skin_color }}</p>
        </div>
        <div>
          <p class="text-sm font-semibold">ความดันโลหิต:</p>
          <p>{{ history.systolic_bp }}/{{ history.diastolic_bp }} mmHg</p>
        </div>
        <div>
          <p class="text-sm font-semibold">ชีพจร:</p>
          <p>{{ history.pulse_rate }} ครั้ง/นาที</p>
        </div>
      </div>
    </div>

    <!-- ฟอร์มประเมินของแพทย์ -->
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8">
      <h2 class="text-xl font-semibold mb-4">แบบประเมินโดยแพทย์</h2>
      <form @submit.prevent="saveAssessment">
        <!-- สุขภาพจิต -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2"> สุขภาพจิต (กรอกเอง) </label>
          <textarea
            v-model="form.mental_health"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="2"
          ></textarea>
        </div>

        <!-- ตรวจวัณโรค -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2"> ตรวจวัณโรค (กรอกเอง) </label>
          <textarea
            v-model="form.tuberculosis"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="2"
          ></textarea>
        </div>

        <!-- ตรวจโรคเรื้อน -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2"> ตรวจโรคเรื้อน </label>
          <div class="mt-2 space-y-2">
            <label class="inline-flex items-center">
              <input type="radio" v-model="form.leprosy" value="1" class="form-radio" />
              <span class="ml-2">ปกติ</span>
            </label>
            <br />
            <label class="inline-flex items-center">
              <input type="radio" v-model="form.leprosy" value="2" class="form-radio" />
              <span class="ml-2">ผิดปกติ/ให้การรักษา</span>
            </label>
            <br />
            <label class="inline-flex items-center">
              <input type="radio" v-model="form.leprosy" value="3" class="form-radio" />
              <span class="ml-2">ระยะติดต่อ/อาการเป็นที่น่ารังเกียจ</span>
            </label>
          </div>
        </div>

        <!-- ตรวจโรคเท้าช้าง -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2"> ตรวจโรคเท้าช้าง </label>
          <div class="mt-2 space-y-2">
            <label class="inline-flex items-center">
              <input type="radio" v-model="form.elephantiasis" value="1" class="form-radio" />
              <span class="ml-2">ปกติ</span>
            </label>
            <br />
            <label class="inline-flex items-center">
              <input type="radio" v-model="form.elephantiasis" value="2" class="form-radio" />
              <span class="ml-2">ผิดปกติ/ให้การรักษา</span>
            </label>
            <br />
            <label class="inline-flex items-center">
              <input type="radio" v-model="form.elephantiasis" value="3" class="form-radio" />
              <span class="ml-2">อาการเป็นที่น่ารังเกียจ</span>
            </label>
          </div>
        </div>

        <!-- ตรวจโรคซิฟิลิส -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            ตรวจโรคซิฟิลิส (กรอกเอง)
          </label>
          <textarea
            v-model="form.syphilis"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="2"
          ></textarea>
        </div>

        <!-- ตรวจสารเสพติด -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            ตรวจสารเสพติด (กรอกเอง)
          </label>
          <textarea
            v-model="form.drug_addicted"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="2"
          ></textarea>
        </div>

        <!-- ตรวจโรคพิษสุราเรื้อรัง -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2"> ตรวจโรคพิษสุราเรื้อรัง </label>
          <div class="mt-2 space-y-2">
            <label class="inline-flex items-center">
              <input type="radio" v-model="form.alcoholism" value="1" class="form-radio" />
              <span class="ml-2">ปกติ</span>
            </label>
            <br />
            <label class="inline-flex items-center">
              <input type="radio" v-model="form.alcoholism" value="2" class="form-radio" />
              <span class="ml-2">ปรากฏอาการ</span>
            </label>
          </div>
        </div>

        <!-- ตรวจการตั้งครรภ์ (แสดงเฉพาะเพศหญิง) -->
        <div v-if="isFemale" class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2"> ตรวจการตั้งครรภ์ </label>
          <div class="mt-2 space-y-2">
            <label class="inline-flex items-center">
              <input type="radio" v-model="form.pregnancy" value="1" class="form-radio" />
              <span class="ml-2">ไม่ตั้งครรภ์</span>
            </label>
            <br />
            <label class="inline-flex items-center">
              <input type="radio" v-model="form.pregnancy" value="2" class="form-radio" />
              <span class="ml-2">ตั้งครรภ์</span>
            </label>
          </div>
        </div>

        <!-- ตรวจอื่นๆ -->
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2"> ตรวจอื่นๆ (กรอกเอง) </label>
          <textarea
            v-model="form.other_exam"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
          ></textarea>
        </div>

        <!-- ปุ่มบันทึก -->
        <div class="flex justify-end gap-4">
          <button
            type="button"
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            @click="$router.back()"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            บันทึกการประเมิน
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { medicalHistoryService } from '@/services/medical-history'
import Swal from 'sweetalert2'

export default {
  name: 'DoctorAssessment',

  data() {
    return {
      history: null,
      isFemale: false,
      form: {
        mental_health: '',
        tuberculosis: '',
        leprosy: '1',
        elephantiasis: '1',
        syphilis: '',
        drug_addicted: '',
        alcoholism: '1',
        pregnancy: '1',
        other_exam: '',
      },
    }
  },

  async created() {
    await this.loadHistory()
  },

  methods: {
    async loadHistory() {
      try {
        // ถ้ามี alcode
        const response = await medicalHistoryService.getByAlcode(this.$route.params.alcode)
        // หรือถ้ามี HN
        // const response = await medicalHistoryService.getByHN(this.$route.params.hn)

        this.history = response.data
        this.isFemale = this.history?.ForeignWorkers?.gender === 'F'
      } catch (error) {
        console.error('Load history error:', error)
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถโหลดข้อมูลได้',
        })
      }
    },

    async saveAssessment() {
      try {
        await medicalHistoryService.saveDoctorAssessment(this.$route.params.id, this.form)
        Swal.fire({
          icon: 'success',
          title: 'บันทึกสำเร็จ',
          text: 'บันทึกการประเมินเรียบร้อยแล้ว',
        })
      } catch (error) {
        console.error('Save assessment error:', error)
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถบันทึกข้อมูลได้',
        })
      }
    },
  },
}
</script>
