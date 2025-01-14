import { createRouter, createWebHistory } from 'vue-router'
import AlienListPage from '@/views/AlienListPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/aliens'
    },
    {
      path: '/aliens',
      name: 'AlienList',
      component: AlienListPage
    }
  ],
})

export default router
