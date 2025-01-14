<template>
  <div class="container mx-auto p-6 space-y-6">
    <!-- Header Section -->
    <div class="flex justify-between items-center bg-blue-50 p-4 rounded-lg shadow">
      <h1 class="text-2xl font-semibold text-gray-800">รายการคนต่างด้าว</h1>
      <button
        @click="showAddModal = true"
        class="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        เพิ่มคนต่างด้าว
      </button>
    </div>

    <!-- Table Section -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
            >
              เลขบัตร
            </th>
            <th
              class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
            >
              ชื่อ-นามสกุล
            </th>
            <th
              class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
            >
              สัญชาติ
            </th>
            <th
              class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
            >
              วันเกิด
            </th>
            <th
              class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
            >
              จัดการ
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <!-- Rows -->
          <tr v-for="alien in aliens" :key="alien.alcode" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              {{ alien.alcode }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              {{ alien.alprefixen }} {{ alien.alnameen }} {{ alien.alsnameen }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              {{ alien.alnation }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              {{ alien.albdate }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button
                class="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                @click="openHealthCheckModal(alien)"
              >
                ส่งข้อมูล
              </button>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-if="aliens.length === 0">
            <td colspan="5" class="px-6 py-4 text-center text-gray-500">
              <div class="flex flex-col items-center">
                <svg
                  class="w-12 h-12 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 17v-6h6v6m-6 0h6m-9-2h.01M9 11V9m6 2V9m0 0h.01M3 9a9 9 0 0118 0m-9 9a9 9 0 0018 0"
                  />
                </svg>
                <p class="text-sm text-gray-600 mt-2">ไม่พบข้อมูลคนต่างด้าว</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Alien Form Modal -->
    <AlienForm v-if="showAddModal" @close="showAddModal = false" @saved="onSaved" />

    <HealthCheckModal
      v-if="showHealthCheckModal"
      :alien="selectedAlien"
      @close="closeHealthCheckModal"
      @submit="handleHealthCheckSubmit"
    />
  </div>
</template>

<script>
import { useAlienStore } from '@/stores/alienStore'
import AlienForm from '../components/AlienForm.vue'
import HealthCheckModal from '../components/HealthCheckModal.vue'

export default {
  name: 'AlienListPage',

  components: {
    AlienForm,
    HealthCheckModal,
  },

  data() {
    return {
      store: useAlienStore(),
      showAddModal: false,
      showHealthCheckModal: false,
      selectedAlien: null,
    }
  },

  computed: {
    aliens() {
      return this.store.aliens
    },
  },

  async created() {
    await this.store.fetchAliens()
  },

  methods: {
    openHealthCheckModal(alien) {
      this.selectedAlien = alien
      this.showHealthCheckModal = true
    },

    closeHealthCheckModal() {
      this.showHealthCheckModal = false
      this.selectedAlien = null
    },

    handleHealthCheckSubmit(healthData) {
      console.log('Health check data:', healthData)
      // TODO: ส่งข้อมูลไป API
      this.closeHealthCheckModal()
    },

    async onSaved() {
      this.showAddModal = false
      await this.store.fetchAliens()
    },
  },
}
</script>
