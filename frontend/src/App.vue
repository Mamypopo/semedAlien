<template>
  <SidebarMenu>
    <router-view></router-view>
  </SidebarMenu>
</template>
<script>
import SidebarMenu from '@/components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    SidebarMenu
  }
}
</script>
<style></style>
