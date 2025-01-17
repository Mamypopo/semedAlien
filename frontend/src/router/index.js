import { createRouter, createWebHistory } from 'vue-router'
import ReqCodeList from '@/views/ReqCodelist.vue'
import MedicalHistoryList from '../views/MedicalHistoryList.vue'
import DoctorAssessment from '../views/DoctorAssessment.vue'
import TakeAhistory from '../views/TakeAhistory.vue'
import AlienList from '@/views/AlienList.vue'
import AlienDetail from '@/views/AlienDetail.vue'
import AlienSearch from '@/views/AlienSearch.vue'
import RegisterComponent from '../views/auth/Register.vue'
import LoginComponent from '../views/auth/Login.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login' 
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginComponent,
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterComponent,
      meta: { requiresGuest: true }
    },  
    {
      path: '/aliens',
      name: 'AlienList',
      component: AlienList,
      meta: { requiresAuth: true }
    },
    {
      path: '/aliens/:alcode',
      name: 'AlienDetail',
      component: AlienDetail,
      meta: { requiresAuth: true }
    },
    {
      path: '/aliensearch',
      name: 'AlienSearch',
      component: AlienSearch,
      meta: { requiresAuth: true }
    },
    {
      path: '/reqcodes',
      name: 'ReqCodeList',
      component: ReqCodeList,
      meta: { requiresAuth: true }
    },
    {
      path: '/aliens/TakeAhistory',
      name: 'MedicalHistory',
      component: TakeAhistory,
      meta: { requiresAuth: true }

    },
    {
      path: '/aliens/medical-histories',
      name: 'MedicalHistoryList',
      component: MedicalHistoryList,
      meta: { requiresAuth: true }
    },
    {
      path: '/aliens/Doctor-Assessment',
      name: 'DoctorAssessment',
      component: DoctorAssessment,
      meta: { requiresAuth: true }
    },
  
  ],
  
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Redirect to Login if not authenticated and accessing protected routes
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  }
  // Redirect to main page if already authenticated and accessing guest-only routes
  else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/aliens') // เปลี่ยนเส้นทางไปหน้าแรกของผู้ใช้ที่ล็อกอินแล้ว
  }
  // Proceed as normal
  else {
    next()
  }
})
export default router
