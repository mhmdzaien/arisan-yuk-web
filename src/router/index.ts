import { createRouter, createWebHistory } from 'vue-router'
import BodyLayout from '@/components/layouts/BodyLayout.vue'
import HomePage from '@/pages/Home.vue'
import MemberPage from '@/pages/member/Member.vue'
import TransaksiPage from '@/pages/transaksi/Transaksi.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BodyLayout,
      children: [
        {
          path: '',
          redirect: '/home'
        },
        {
          path: '/home',
          component: HomePage
        },
        {
          path: '/member',
          component: MemberPage
        },
        {
          path: '/transaksi',
          component: TransaksiPage
        }
      ]
    }
  ]
})

export default router
