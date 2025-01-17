<template>
  <div>
    <nav class="bg-gray-900 text-white w-64 min-h-screen fixed left-0 top-0 shadow-lg">
      <div class="p-6 border-b border-gray-700">
        <h1 class="text-2xl font-bold text-blue-400">⚙️ Admin Panel</h1>
      </div>

      <div class="mt-4">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="block px-4 py-3 hover:bg-gray-800 transition-all rounded-l-lg"
          :class="{ 'bg-gray-800 text-blue-400': isActive(item.path) }"
        >
          <div class="flex items-center">
            <component v-if="item.icon" :is="item.icon" class="w-5 h-5 mr-3" />
            <span class="font-medium">{{ item.name }}</span>
          </div>
        </router-link>
        <div 
          @click="handleLogout" 
          class="block px-4 py-3 hover:bg-gray-800 transition-all rounded-l-lg cursor-pointer mt-4 text-red-400"
        >
          <div class="flex items-center">
            <span class="font-medium">ออกจากระบบ</span>
          </div>
        </div>
      </div>
    </nav>

    <div class="ml-64 p-8">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import Swal from 'sweetalert2'
export default {
  name: 'SidebarMenu',
  data() {
    return {
      menuItems: [
        {
          name: 'Request Codes',
          path: '/reqcodes',
        },
        {
          name: 'ค้นหาคนต่างด้าว',
          path: '/aliensearch',
        },
        {
          name: 'รายชื่อแรงงานต่างด้าว',
          path: '/aliens',
        },
        {
          name: 'ซักประวัติ',
          path: '/aliens/TakeAhistory',
        },
        {
          name: 'ดูประวัติ',
          path: '/aliens/medical-histories',
        },
        {
          name: 'แพทย์ประเมิน',
          path: '/aliens/Doctor-Assessment',
        },
      ],
    }
  },
  methods: {
    isActive(path) {
      return this.$route.path.startsWith(path)
    },
    async handleLogout() {
      // แสดง confirm dialog
      const result = await Swal.fire({
        title: 'ยืนยันการออกจากระบบ',
        text: 'คุณต้องการออกจากระบบใช่หรือไม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ออกจากระบบ',
        cancelButtonText: 'ยกเลิก'
      })

      if (result.isConfirmed) {
        const authStore = useAuthStore()
        authStore.logout()
        
        // แสดง success message
        await Swal.fire({
          icon: 'success',
          title: 'ออกจากระบบสำเร็จ',
          timer: 1500,
          showConfirmButton: false
        })
        
        this.$router.push('/login')
      }
    }
  },
}
</script>
