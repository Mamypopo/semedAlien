import { createRouter, createWebHistory } from 'vue-router'
import ReqCodeList from '@/views/Reqcodelist.vue'
import AlienList from '@/views/AlienList.vue'
import AlienDetail from '@/views/AlienDetail.vue'

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
      component: AlienList
    },
    {
      path: '/aliens/:alcode',  // เพิ่ม route สำหรับหน้า detail
      name: 'AlienDetail',
      component: AlienDetail
    },
    {
      path: '/reqcodes',
      name: 'ReqCodeList',
      component: ReqCodeList
    }
  ],
})

export default router
