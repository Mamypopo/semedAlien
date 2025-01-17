<template>
  <div>
    <SidebarMenu v-if="isAuthenticated" class="sidebar" />

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SidebarMenu from '@/components/Sidebar.vue'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'App',
  components: {
    SidebarMenu,
  },
  computed: {
    isAuthenticated() {
      const authStore = useAuthStore()
      return authStore.isAuthenticated
    },
  },
}
</script>

<style scoped>
.sidebar {
  width: 250px; /* กำหนดความกว้าง Sidebar */
  float: left; /* เลื่อน Sidebar ไปทางซ้าย */
  margin-right: 20px; /* ระยะห่างระหว่าง Sidebar และ Content */
}

.content {
  margin-left: 270px; /* เลื่อน Content ไปทางขวาให้ห่างจาก Sidebar */
  padding: 20px;
}
</style>
