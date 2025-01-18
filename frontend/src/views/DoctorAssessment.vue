<template>
  <div class="container mx-auto px-4 py-8 max-w-6xl">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-800">แบบประเมินสุขภาพแรงงานต่างด้าว</h1>
      <p class="text-gray-600">
        โดย {{ doctorInfo.chkname }} (เลขที่ใบอนุญาต: {{ doctorInfo.licenseno }})
      </p>
    </div>

    <!-- ส่วนค้นหา -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">HN</label>
          <input
            v-model="searchForm.hn"
            type="text"
            class="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="ระบุ HN"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Alien Code</label>
          <input
            v-model="searchForm.alcode"
            type="text"
            class="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="ระบุ Alien Code"
          />
        </div>
        <div class="flex items-end">
          <button
            @click="searchPatient"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-150 ease-in-out flex items-center justify-center gap-2"
            :disabled="isLoading"
          >
            <i class="fas fa-search text-sm"></i>
            <span>{{ isLoading ? 'กำลังค้นหา...' : 'ค้นหา' }}</span>
          </button>
        </div>
      </div>
    </div>

    <div v-if="histories && histories.length > 0 && !showSummary" class="space-y-8">
      <!-- ข้อมูลต่างด้าว -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-800">ข้อมูลผู้ป่วย</h2>
          <div class="flex gap-4">
            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              HN: {{ histories[0]?.ForeignWorkers?.hn || '-' }}
            </span>
            <span class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
              Alien Code: {{ histories[0]?.ForeignWorkers?.alcode || '-' }}
            </span>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-6">
          <div class="space-y-2">
            <p class="text-sm text-gray-600">ชื่อ-สกุล (ไทย)</p>
            <p class="font-medium">
              {{ histories[0]?.ForeignWorkers?.alname_th || '-' }}
              {{ histories[0]?.ForeignWorkers?.alsname_th || '-' }}
            </p>
          </div>
          <div class="space-y-2">
            <p class="text-sm text-gray-600">ชื่อ-สกุล (อังกฤษ)</p>
            <p class="font-medium">
              {{ histories[0]?.ForeignWorkers?.alname_en || '-' }}
              {{ histories[0]?.ForeignWorkers?.alsname_en || '-' }}
            </p>
          </div>
        </div>
      </div>

      <!-- ข้อมูลการซักประวัติ -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-6">ข้อมูลการซักประวัติ</h2>
        <div class="grid grid-cols-3 gap-6">
          <div class="p-4 bg-gray-50 rounded-lg">
            <p class="text-sm text-gray-600 mb-1">ส่วนสูง</p>
            <p class="text-lg font-semibold">{{ histories[0]?.height || '-' }} ซม.</p>
          </div>
          <div class="p-4 bg-gray-50 rounded-lg">
            <p class="text-sm text-gray-600 mb-1">น้ำหนัก</p>
            <p class="text-lg font-semibold">{{ histories[0]?.weight || '-' }} กก.</p>
          </div>
          <div class="p-4 bg-gray-50 rounded-lg">
            <p class="text-sm text-gray-600 mb-1">ความดันโลหิต</p>
            <p class="text-lg font-semibold">
              {{ histories[0]?.systolic_bp || '-' }}/{{ histories[0]?.diastolic_bp || '-' }} mmHg
            </p>
          </div>
          <div class="p-4 bg-gray-50 rounded-lg">
            <p class="text-sm text-gray-600 mb-1">ชีพจร</p>
            <p class="text-lg font-semibold">{{ histories[0]?.pulse_rate || '-' }} ครั้ง/นาที</p>
          </div>
          <div class="p-4 bg-gray-50 rounded-lg">
            <p class="text-sm text-gray-600 mb-1">สีผิว</p>
            <p class="text-lg font-semibold">{{ histories[0]?.skin_color || '-' }}</p>
          </div>
        </div>
      </div>

      <!-- แบบประเมินของแพทย์ -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-6">แบบประเมินโดยแพทย์</h2>
        <form @submit.prevent="saveAssessment" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <!-- คอลัมน์ซ้าย -->
            <div class="space-y-6">
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">สุขภาพจิต</label>
                <textarea
                  v-model="form.mental_health"
                  class="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="บันทึกผลการตรวจสุขภาพจิต"
                ></textarea>
              </div>

              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">ตรวจวัณโรค</label>
                <textarea
                  v-model="form.tuberculosis"
                  class="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="บันทึกผลการตรวจวัณโรค"
                ></textarea>
              </div>

              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">ตรวจโรคเรื้อน</label>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input type="radio" v-model="form.leprosy" value="ปกติ" class="text-blue-600" />
                    <span class="ml-2">ปกติ</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      type="radio"
                      v-model="form.leprosy"
                      value="ผิดปกติ"
                      class="text-blue-600"
                    />
                    <span class="ml-2">ผิดปกติ/ให้การรักษา</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      type="radio"
                      v-model="form.leprosy"
                      value="ระยะติดต่อ"
                      class="text-blue-600"
                    />
                    <span class="ml-2">ระยะติดต่อ/อาการเป็นที่น่ารังเกียจ</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- คอลัมน์ขวา -->
            <div class="space-y-6">
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">ตรวจโรคเท้าช้าง</label>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input
                      type="radio"
                      v-model="form.elephantiasis"
                      value="ปกติ"
                      class="text-blue-600"
                    />
                    <span class="ml-2">ปกติ</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      type="radio"
                      v-model="form.elephantiasis"
                      value="ผิดปกติ"
                      class="text-blue-600"
                    />
                    <span class="ml-2">ผิดปกติ/ให้การรักษา</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      type="radio"
                      v-model="form.elephantiasis"
                      value="อาการรุนแรง"
                      class="text-blue-600"
                    />
                    <span class="ml-2">อาการเป็นที่น่ารังเกียจ</span>
                  </label>
                </div>
              </div>

              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">ตรวจโรคซิฟิลิส</label>
                <textarea
                  v-model="form.syphilis"
                  class="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="บันทึกผลการตรวจโรคซิฟิลิส"
                ></textarea>
              </div>

              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">ตรวจสารเสพติด</label>
                <textarea
                  v-model="form.drug_addicted"
                  class="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="บันทึกผลการตรวจสารเสพติด"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- ส่วนล่าง -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >ตรวจโรคพิษสุราเรื้อรัง</label
              >
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    type="radio"
                    v-model="form.alcoholism"
                    value="ปกติ"
                    class="text-blue-600"
                  />
                  <span class="ml-2">ปกติ</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="radio"
                    v-model="form.alcoholism"
                    value="ผิดปกติ"
                    class="text-blue-600"
                  />
                  <span class="ml-2">ปรากฏอาการ</span>
                </label>
              </div>
            </div>

            <div v-if="isFemale" class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2">การตั้งครรภ์</label>
              <textarea
                v-model="form.pregnancy"
                class="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                placeholder="บันทึกผลการตรวจการตั้งครรภ์"
              ></textarea>
            </div>
          </div>

          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700 mb-2">บันทึกเพิ่มเติม</label>
            <textarea
              v-model="form.other_exam"
              class="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              placeholder="บันทึกผลการตรวจอื่นๆ เพิ่มเติม"
            ></textarea>
          </div>

          <!-- ผลการตรวจและปุ่มบันทึก -->
          <div class="border-t pt-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div class="flex items-center gap-6">
                <label class="flex items-center">
                  <input
                    type="radio"
                    v-model="form.alchkstatus"
                    value="1"
                    class="w-4 h-4 text-green-600 border-gray-300"
                  />
                  <span class="ml-2 text-sm font-medium">ผ่านการตรวจ</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="radio"
                    v-model="form.alchkstatus"
                    value="2"
                    class="w-4 h-4 text-red-600 border-gray-300"
                  />
                  <span class="ml-2 text-sm font-medium">ไม่ผ่านการตรวจ</span>
                </label>
              </div>

              <div class="flex gap-4">
                <button
                  type="button"
                  @click="resetForm"
                  class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-150"
                >
                  บันทึกการประเมิน
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- กรณีไม่พบข้อมูล -->
    <div
      v-if="notFound"
      class="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center"
    >
      <div class="text-gray-500">
        <i class="fas fa-search text-4xl mb-4"></i>
        <p class="text-lg">ไม่พบข้อมูลที่ค้นหา</p>
      </div>
    </div>

    <!-- ส่วนแสดงผลหลังบันทึก -->
    <div v-if="showSummary" class="mt-8 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold text-gray-800">สรุปผลการตรวจ</h2>
        <div class="flex gap-4">
          <button
            @click="showSummary = false"
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-150 flex items-center gap-2"
          >
            <i class="fas fa-edit"></i>
            แก้ไข
          </button>
          <button
            @click="downloadPDF"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-150 flex items-center gap-2"
          >
            <i class="fas fa-download"></i>
            ดาวน์โหลด PDF
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td class="px-6 py-4 whitespace-nowrap bg-gray-50 w-1/4">
                <div class="text-sm font-medium text-gray-700">ชื่อ-สกุล</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ histories[0]?.ForeignWorkers?.alname_th }}
                  {{ histories[0]?.ForeignWorkers?.alsname_th }}
                </div>
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap bg-gray-50">
                <div class="text-sm font-medium text-gray-700">ผลการตรวจ</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2 py-1 text-sm font-medium rounded-full',
                    form.alchkstatus === '1'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800',
                  ]"
                >
                  {{ form.alchkstatus === '1' ? 'ผ่านการตรวจ' : 'ไม่ผ่านการตรวจ' }}
                </span>
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap bg-gray-50">
                <div class="text-sm font-medium text-gray-700">แพทย์ผู้ตรวจ</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ doctorInfo.chkname }}</div>
                <div class="text-sm text-gray-500">เลขที่ใบอนุญาต: {{ doctorInfo.licenseno }}</div>
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap bg-gray-50">
                <div class="text-sm font-medium text-gray-700">วันที่ตรวจ</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ new Date().toLocaleDateString('th-TH', { dateStyle: 'long' }) }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { medicalHistoryService } from '@/services/medical-history'
import { healthCheckService } from '@/services/health-check.service'
import { downloadMedicalCertificate } from '@/services/medical.service'
import { useAuthStore } from '@/stores/auth'
import Swal from 'sweetalert2'

export default {
  name: 'DoctorAssessment',
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },

  data() {
    return {
      searchForm: {
        hn: '',
        alcode: '',
      },
      histories: [],
      notFound: false,
      isLoading: false,
      isFemale: false,
      form: {
        mental_health: '',
        tuberculosis: '',
        leprosy: 'ปกติ',
        elephantiasis: 'ปกติ',
        syphilis: '',
        drug_addicted: '',
        alcoholism: 'ปกติ',
        pregnancy: '',
        other_exam: '',
        alchkstatus: '1',
      },
      healthCheckId: null,
      showSummary: false,
    }
  },
  computed: {
    doctorInfo() {
      const user = this.authStore.user
      return {
        licenseno: user?.licenseno || '',
        chkname: user?.chkname || '',
        chkposition: user?.chkposition || '',
      }
    },
  },

  methods: {
    async searchPatient() {
      try {
        this.isLoading = true

        if (!this.searchForm.hn && !this.searchForm.alcode) {
          Swal.fire({
            icon: 'warning',
            title: 'กรุณากรอกข้อมูล',
            text: 'กรุณากรอก HN หรือ Alien Code',
          })
          return
        }
        const params = this.searchForm.hn
          ? { hn: this.searchForm.hn }
          : { alcode: this.searchForm.alcode.trim() }

        const response = await medicalHistoryService.getLatest(params)

        if (response?.data?.data) {
          const { medicalHistory, healthCheck } = response.data.data

          this.histories = [medicalHistory]
          if (healthCheck?.id) {
            this.healthCheckId = healthCheck.id
          }
          this.isFemale = medicalHistory.ForeignWorkers?.gender === 'F'
          this.notFound = false

          if (medicalHistory.doctor_assessment_status === 'COMPLETED') {
            this.form = {
              mental_health: medicalHistory.doctor_mental_health || '',
              tuberculosis: medicalHistory.doctor_tuberculosis || '',
              leprosy: medicalHistory.doctor_leprosy || 'ปกติ',
              elephantiasis: medicalHistory.doctor_elephantiasis || 'ปกติ',
              syphilis: medicalHistory.doctor_syphilis || '',
              drug_addicted: medicalHistory.doctor_drug_addicted || '',
              alcoholism: medicalHistory.doctor_alcoholism || 'ปกติ',
              pregnancy: medicalHistory.doctor_pregnancy || '',
              other_exam: medicalHistory.doctor_other_exam || '',
            }
          } else {
            this.resetForm()
          }
        } else {
          this.histories = []
          this.healthCheckId = null
          this.notFound = true
          this.resetForm()
          Swal.fire({
            icon: 'info',
            title: 'ไม่พบประวัติ',
            text: 'ไม่พบประวัติการซักประวัติของแรงงานรายนี้',
          })
        }
      } catch (error) {
        console.error('Search error:', error)
        this.histories = []
        this.healthCheckId = null
        this.notFound = true
        this.resetForm()
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: error.message || 'ไม่สามารถค้นหาข้อมูลได้',
        })
      } finally {
        this.isLoading = false
      }
    },

    resetForm() {
      Object.keys(this.form).forEach((key) => {
        if (key === 'leprosy' || key === 'elephantiasis' || key === 'alcoholism') {
          this.form[key] = 'ปกติ'
        } else if (key === 'pregnancy') {
          this.form[key] = 'ไม่ตั้งครรภ์'
        } else {
          this.form[key] = ''
        }
      })
    },

    async saveAssessment() {
      try {
        const requiredFields = [
          'mental_health',
          'tuberculosis',
          'leprosy',
          'elephantiasis',
          'syphilis',
          'drug_addicted',
          'alcoholism',
        ]
        if (this.isFemale) requiredFields.push('pregnancy')

        const emptyFields = requiredFields.filter((field) => !this.form[field])
        if (emptyFields.length > 0) {
          Swal.fire({
            icon: 'warning',
            title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
            text: 'กรุณากรอกข้อมูลในทุกช่องที่จำเป็น',
          })
          return
        }
        const result = await Swal.fire({
          title: 'ยืนยันการบันทึก',
          text: 'คุณต้องการบันทึกผลการตรวจใช่หรือไม่?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'บันทึก',
          cancelButtonText: 'ยกเลิก',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        })

        if (!result.isConfirmed) return

        const assessmentData = {
          mental_health: this.form.mental_health,
          tuberculosis: this.form.tuberculosis,
          leprosy: this.form.leprosy,
          elephantiasis: this.form.elephantiasis,
          syphilis: this.form.syphilis,
          drug_addicted: this.form.drug_addicted,
          alcoholism: this.form.alcoholism,
          other_exam: this.form.other_exam,
        }
        if (!this.isFemale) {
          delete assessmentData.pregnancy
        }
        await medicalHistoryService.saveDoctorAssessment(this.histories[0].id, assessmentData)

        const healthCheckData = {
          alcode: this.histories[0].ForeignWorkers.alcode,
          licenseno: this.doctorInfo.licenseno,
          chkname: this.doctorInfo.chkname,
          chkposition: this.doctorInfo.chkposition,
          alchkdate: new Date().toISOString().split('T')[0],
          alchkstatus: Number(this.form.alchkstatus),
          alchkdesc: this.form.other_exam,
        }

        await healthCheckService.updateHealthCheck(this.healthCheckId, healthCheckData)
        Swal.fire({
          icon: 'success',
          title: 'บันทึกสำเร็จ',
          text: 'บันทึกการประเมินเรียบร้อยแล้ว',
        })
        this.showSummary = true
      } catch (error) {
        console.error('Save assessment error:', error)
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถบันทึกข้อมูลได้',
        })
      }
    },
    async downloadPDF() {
      try {
        this.isDownloading = true
        const id = parseInt(this.histories[0].id)

        const response = await downloadMedicalCertificate(id)
        const blob = new Blob([response], { type: 'application/pdf' })
        const url = window.URL.createObjectURL(blob)

        window.open(url, '_blank')

        setTimeout(() => {
          window.URL.revokeObjectURL(url)
        }, 100)

        this.isDownloading = false
      } catch (error) {
        console.error('Print PDF error:', error)
        await Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถพิมพ์ PDF ได้',
        })
        this.isDownloading = false
      }
    },
  },
}
</script>
