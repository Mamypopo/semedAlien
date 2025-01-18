<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800">Alien Details</h1>
        <router-link to="/aliens" class="px-4 py-2 text-gray-600 hover:text-gray-800">
          กลับไปหน้ารายชื่อ
        </router-link>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>

    <!-- Error Message -->
    <div
      v-else-if="error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
    >
      {{ error }}
    </div>

    <!-- Form -->
    <form
      v-else
      @submit.prevent="saveDetail"
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <!-- ข้อมูลส่วนตัว -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-4">ข้อมูลส่วนตัว</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Basic Info -->
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">Alien Code</label>
            <input
              v-model="form.alcode"
              type="text"
              disabled
              class="bg-gray-100 border rounded w-full py-2 px-3"
            />
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">ประเภทคนต่างด้าว</label>
            <select
              v-model="form.altype"
              class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="1">ประเภท 1 - ขึ้นทะเบียนคนต่างด้าวผิดกฏหมาย</option>
              <option value="2">ประเภท 2 - ต่ออายุคนต่างด้าว</option>
            </select>
          </div>

          <!-- Position (alposid) -->
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">ประเภทอาชีพ</label>
            <select
              v-model="form.alposid"
              class="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            >
              <option value="" disabled>เลือกประเภทอาชีพ</option>
              <option v-for="position in positions" :key="position.id" :value="position.id">
                {{ position.name }}
              </option>
            </select>
          </div>
          <!-- Name in English -->
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">คำนำหน้า (EN)</label>
            <select
              v-model="form.alprefix"
              class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">เลือกคำนำหน้า</option>
              <option value="1">MR.</option>
              <option value="2">MISS.</option>
              <option value="3">MRS.</option>
            </select>
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">ชื่อ (EN)</label>
            <input v-model="form.alname_en" type="text" class="border rounded w-full py-2 px-3" />
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">นามสกุล (EN)</label>
            <input v-model="form.alsname_en" type="text" class="border rounded w-full py-2 px-3" />
          </div>

          <!-- Name in Thai -->
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">คำนำหน้า (TH)</label>
            <select
              v-model="form.alprefix_th"
              class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">เลือกคำนำหน้า</option>
              <option value="นาย">นาย</option>
              <option value="นางสาว">นางสาว</option>
              <option value="นาง">นาง</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">ชื่อ (TH)</label>
            <input v-model="form.alname_th" type="text" class="border rounded w-full py-2 px-3" />
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">นามสกุล (TH)</label>
            <input v-model="form.alsname_th" type="text" class="border rounded w-full py-2 px-3" />
          </div>

          <!-- Personal Details -->
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">วันเกิด</label>
            <input v-model="form.albdate" type="date" class="border rounded w-full py-2 px-3" />
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">เพศ</label>
            <select v-model="form.algender" class="border rounded w-full py-2 px-3">
              <option value="1">ชาย</option>
              <option value="2">หญิง</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">สัญชาติ</label>
            <select
              v-model="form.alnation"
              class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">เลือกสัญชาติ</option>
              <option value="M">เมียนมา (Myanmar)</option>
              <option value="L">ลาว (Laos)</option>
              <option value="C">กัมพูชา (Cambodia)</option>
              <option value="V">เวียดนาม (Vietnam)</option>
            </select>
          </div>

          <!-- Additional Info -->
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">กรุ๊ปเลือด</label>
            <select
              v-model="form.blood_group"
              class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="" disabled>เลือกกรุ๊ปเลือด</option>
              <option value="B">B</option>
              <option value="A">A</option>
              <option value="O">O</option>
              <option value="AB">AB</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">ชื่อเล่น</label>
            <input v-model="form.nickname" type="text" class="border rounded w-full py-2 px-3" />
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">ศาสนา</label>
            <select
              v-model="form.religion"
              class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">เลือกศาสนา</option>
              <option value="Buddhism">พุทธ (Buddhism)</option>
              <option value="Christianity">คริสต์ (Christianity)</option>
              <option value="Islam">อิสลาม (Islam)</option>
              <option value="Hindu">ฮินดู (Hindu)</option>
              <option value="Sikhism">ซิกข์ (Sikhism)</option>
              <option value="No Religion">ไม่นับถือศาสนา (No Religion)</option>
              <option value="Others">อื่นๆ (Others)</option>
            </select>
          </div>

          <!-- Contact Info -->
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">เบอร์โทรศัพท์</label>
            <input v-model="form.phone_number" type="tel" class="border rounded w-full py-2 px-3" />
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">อีเมล</label>
            <input v-model="form.email" type="email" class="border rounded w-full py-2 px-3" />
          </div>
        </div>

        <!-- ที่อยู่ -->
        <div class="mt-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">ที่อยู่</label>
          <input v-model="form.address" type="text" class="border rounded w-full py-2 px-3 mb-2" />
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2">ตำบล</label>
              <input
                v-model="form.subdistrict"
                type="text"
                class="border rounded w-full py-2 px-3"
              />
            </div>
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2">เขต</label>
              <input v-model="form.district" type="text" class="border rounded w-full py-2 px-3" />
            </div>
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2">จังหวัด</label>
              <input v-model="form.province" type="text" class="border rounded w-full py-2 px-3" />
            </div>
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2">รหัสไปรษณีย์</label>
              <input
                v-model="form.postal_code"
                type="text"
                class="border rounded w-full py-2 px-3"
              />
            </div>
          </div>
        </div>

        <!-- หมายเหตุ -->
        <div class="mt-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">หมายเหตุ</label>
          <textarea
            v-model="form.remark"
            class="border rounded w-full py-2 px-3"
            rows="3"
          ></textarea>
        </div>
      </div>

      <!-- Health Check Information -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-4">Health Check Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">วันที่ตรวจสุขภาพ</label>
            <input
              v-model="form.healthCheck.alchkdate"
              type="date"
              class="border rounded w-full py-2 px-3"
            />
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >รหัสจังหวัดที่ตรวจสุขภาพ</label
            >
            <select v-model="form.healthCheck.alchkprovid" class="border rounded w-full py-2 px-3">
              <option value="">เลือกจังหวัด</option>
              <option v-for="province in provinces" :key="province.code" :value="province.code">
                {{ province.code }} - {{ province.name }}
              </option>
            </select>
          </div>

          <div class="col-span-2">
            <label class="block text-gray-700 text-sm font-bold mb-2">โรงพยาบาล</label>
            <input
              :value="'โรงพยาบาลซีเมดลีฟวิ่งแคร์'"
              type="text"
              readonly
              class="bg-gray-100 border rounded w-full py-2 px-3"
            />
          </div>
        </div>
      </div>

      <!-- Button -->
      <div class="flex items-center justify-end">
        <button
          type="button"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          :disabled="loading"
          @click="confirmSave"
        >
          บันทึกข้อมูล
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { alienService } from '@/services/alien'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'

import Swal from 'sweetalert2'

export default {
  name: 'AlienDetail',
  data() {
    const authStore = useAuthStore()
    return {
      loading: false,
      error: null,
      form: {
        alcode: '',
        altype: 1,
        alprefix: 1,
        alprefixen: '',
        alname_en: '',
        alsname_en: '',
        alprefix_th: '',
        alname_th: '',
        alsname_th: '',
        albdate: '',
        algender: 1,
        alnation: '',
        alposid: 1,
        blood_group: '',
        nickname: '',
        religion: '',
        phone_number: '',
        email: '',
        address: '',
        subdistrict: '',
        district: '',
        province: '',
        postal_code: '',
        remark: '',
        healthCheck: {
          id: null,
          alchkhos: 'โรงพยาบาลซีเมดลีฟวิ่งแคร์',
          alchkdate: new Date().toISOString().split('T')[0],
          alchkprovid: '',
        },
      },
      provinces: [
        { code: '10', name: 'กรุงเทพมหานคร' },
        { code: '11', name: 'สมุทรปราการ' },
        { code: '12', name: 'นนทบุรี' },
        { code: '13', name: 'ปทุมธานี' },
        { code: '14', name: 'พระนครศรีอยุธยา' },
        { code: '15', name: 'อ่างทอง' },
        { code: '16', name: 'ลพบุรี' },
        { code: '17', name: 'สิงห์บุรี' },
        { code: '18', name: 'ชัยนาท' },
        { code: '19', name: 'สระบุรี' },
        { code: '20', name: 'ชลบุรี' },
        { code: '21', name: 'ระยอง' },
        { code: '22', name: 'จันทบุรี' },
        { code: '23', name: 'ตราด' },
        { code: '24', name: 'ฉะเชิงเทรา' },
        { code: '25', name: 'ปราจีนบุรี' },
        { code: '26', name: 'นครนายก' },
        { code: '27', name: 'สระแก้ว' },
        { code: '30', name: 'นครราชสีมา' },
        { code: '31', name: 'บุรีรัมย์' },
        { code: '32', name: 'สุรินทร์' },
        { code: '33', name: 'ศรีสะเกษ' },
        { code: '34', name: 'อุบลราชธานี' },
        { code: '35', name: 'ยโสธร' },
        { code: '36', name: 'ชัยภูมิ' },
        { code: '37', name: 'อำนาจเจริญ' },
        { code: '38', name: 'บึงกาฬ' },
        { code: '39', name: 'หนองบัวลำภู' },
        { code: '40', name: 'ขอนแก่น' },
        { code: '41', name: 'อุดรธานี' },
        { code: '42', name: 'เลย' },
        { code: '43', name: 'หนองคาย' },
        { code: '44', name: 'มหาสารคาม' },
        { code: '45', name: 'ร้อยเอ็ด' },
        { code: '46', name: 'กาฬสินธุ์' },
        { code: '47', name: 'สกลนคร' },
        { code: '48', name: 'นครพนม' },
        { code: '49', name: 'มุกดาหาร' },
        { code: '50', name: 'เชียงใหม่' },
        { code: '51', name: 'ลำพูน' },
        { code: '52', name: 'ลำปาง' },
        { code: '53', name: 'แพร่' },
        { code: '54', name: 'น่าน' },
        { code: '55', name: 'พะเยา' },
        { code: '56', name: 'เชียงราย' },
        { code: '57', name: 'แม่ฮ่องสอน' },
        { code: '58', name: 'ตาก' },
        { code: '60', name: 'นครสวรรค์' },
        { code: '61', name: 'อุทัยธานี' },
        { code: '62', name: 'กำแพงเพชร' },
        { code: '63', name: 'พิจิตร' },
        { code: '64', name: 'พิษณุโลก' },
        { code: '65', name: 'สุโขทัย' },
        { code: '66', name: 'เพชรบูรณ์' },
        { code: '67', name: 'ราชบุรี' },
        { code: '70', name: 'กาญจนบุรี' },
        { code: '71', name: 'สุพรรณบุรี' },
        { code: '72', name: 'นครปฐม' },
        { code: '73', name: 'สมุทรสาคร' },
        { code: '74', name: 'สมุทรสงคราม' },
        { code: '75', name: 'เพชรบุรี' },
        { code: '76', name: 'ประจวบคีรีขันธ์' },
        { code: '77', name: 'ชุมพร' },
        { code: '80', name: 'ระนอง' },
        { code: '81', name: 'สุราษฎร์ธานี' },
        { code: '82', name: 'กระบี่' },
        { code: '83', name: 'ภูเก็ต' },
        { code: '84', name: 'พังงา' },
        { code: '85', name: 'นครศรีธรรมราช' },
        { code: '86', name: 'ตรัง' },
        { code: '87', name: 'พัทลุง' },
        { code: '90', name: 'สงขลา' },
        { code: '91', name: 'สตูล' },
        { code: '92', name: 'ปัตตานี' },
        { code: '93', name: 'ยะลา' },
        { code: '94', name: 'นราธิวาส' },
      ],
      positions: [
        { id: 1, name: 'กรรมกร' },
        { id: 2, name: 'ผู้รับใช้ในบ้าน' },
        { id: 3, name: 'ช่างเครื่องยนต์ในเรือประมงทะเล' },
        { id: 4, name: 'ผู้ประกอบงานด้านภาษา (กัมพูชา, ลาว, เมียนมา, เวียดนาม)' },
        { id: 5, name: 'งานขายของหน้าร้าน' },
        { id: 6, name: 'งานกิจกรรม' },
        { id: 7, name: 'งานเลี้ยงสัตว์' },
        { id: 8, name: 'งานป่าไม้' },
        { id: 9, name: 'งานประมง' },
        { id: 10, name: 'งานช่างก่ออิฐ' },
        { id: 11, name: 'งานช่างไม้' },
        { id: 12, name: 'งานช่างก่อสร้างอาคาร' },
        { id: 13, name: 'งานที่เกี่ยวกับเสื้อผ้าหรือหม่านวม' },
        { id: 14, name: 'งานทำมีด' },
        { id: 15, name: 'งานทำรองเท้า' },
        { id: 16, name: 'งานทำหมวก' },
        { id: 17, name: 'งานประดิษฐ์เครื่องแต่งกาย' },
        { id: 18, name: 'งานปั้นหรือทำเครื่องปั้นดินเผา' },
      ],
    }
  },

  methods: {
    async fetchAlienDetail() {
      this.loading = true
      try {
        const response = await alienService.getByCode(this.$route.params.alcode)

        const alien = response.data.alien
        this.form = {
          ...alien,
          albdate: alien.albdate ? new Date(alien.albdate).toISOString().split('T')[0] : '',
          altype: Number(alien.altype),
          alprefix: Number(alien.alprefix),
          algender: Number(alien.algender),
          alposid: Number(alien.alposid),
          blood_group: alien.blood_group ? alien.blood_group.trim() : '',
          healthCheck: {
            alchkhos: 'โรงพยาบาลซีเมดลีฟวิ่งแคร์',
            alchkdate: new Date().toISOString().split('T')[0],
            alchkprovid: '',
            alchkstatus: 0,
            alchkdesc: '',
            alchkdoc: '',
            chkname: '',
            chkposition: '',
            licenseno: '',
          },
        }
      } catch (error) {
        await Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#d33',
        })
        console.error('Error:', error)
      } finally {
        this.loading = false
      }
    },
    async confirmSave() {
      const result = await Swal.fire({
        title: 'ยืนยันการบันทึก',
        text: 'คุณต้องการบันทึกข้อมูลใช่หรือไม่?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
      })

      if (result.isConfirmed) {
        await this.saveDetail()
      }
    },
    async saveDetail() {
      this.loading = true
      try {
        const formData = {
          ...this.form,
          albdate: this.form.albdate
            ? new Date(this.form.albdate + 'T00:00:00Z').toISOString()
            : null,
          altype: Number(this.form.altype),
          alprefix: Number(this.form.alprefix),
          algender: Number(this.form.algender),
          alposid: Number(this.form.alposid),
          healthCheck: {
            alchkhos: 'โรงพยาบาลซีเมดลีฟวิ่งแคร์',
            alchkdate: this.form.healthCheck.alchkdate
              ? new Date(this.form.healthCheck.alchkdate).toISOString()
              : null,
            alchkprovid: this.form.healthCheck.alchkprovid?.substring(0, 2) || '',
            alchkstatus: 0,
            alchkdesc: '',
            alchkdoc: '',
            chkname: '',
            chkposition: '',
            licenseno: '',
          },
        }
        await alienService.saveDetail(formData)

        await Swal.fire({
          icon: 'success',
          title: 'บันทึกสำเร็จ',
          text: 'ข้อมูลถูกบันทึกเรียบร้อยแล้ว',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#3085d6',
        })

        this.$router.push('/aliens')
      } catch (error) {
        console.error('Save error:', error)
        await Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#d33',
        })
        console.error('Error:', error)
      } finally {
        this.loading = false
      }
    },
  },
  mounted() {
    this.fetchAlienDetail()
  },
}
</script>
