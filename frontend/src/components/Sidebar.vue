<template>
    <div>
      <!-- Sidebar -->
      <nav class="bg-gray-900 text-white w-64 min-h-screen fixed left-0 top-0 shadow-lg">
        <div class="p-6 border-b border-gray-700">
          <h1 class="text-2xl font-bold text-blue-400">⚙️ Admin Panel</h1>
        </div>
        
        <!-- Menu Items -->
        <div class="mt-4">
          <router-link 
            v-for="item in menuItems" 
            :key="item.path"
            :to="item.path"
            class="block px-4 py-3 hover:bg-gray-800 transition-all rounded-l-lg"
            :class="{ 'bg-gray-800 text-blue-400': isActive(item.path) }"
          >
            <div class="flex items-center">
              <!-- Add an icon if it exists -->
              <component v-if="item.icon" :is="item.icon" class="w-5 h-5 mr-3" />
              <span class="font-medium">{{ item.name }}</span>
            </div>
          </router-link>
        </div>
      </nav>
  
      <!-- Main content -->
      <div class="ml-64 p-8">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SidebarMenu',
    data() {
      return {
        menuItems: [
          {
            name: 'Alien List',
            path: '/aliens',
            icon: 'UserGroupIcon', // Example Tailwind Hero Icon
          },
          {
            name: 'Request Codes',
            path: '/reqcodes',
            icon: 'ClipboardListIcon', // Example Tailwind Hero Icon
          },
        ]
      }
    },
    methods: {
      isActive(path) {
        return this.$route.path.startsWith(path)
      }
    }
  }
  </script>
  