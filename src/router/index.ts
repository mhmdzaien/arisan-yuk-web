import { createRouter, createWebHistory } from 'vue-router'
import BodyLayout from '@/components/layouts/BodyLayout.vue'
import HomePage from '@/pages/Home.vue'
import MemberPage from '@/pages/member/Member.vue'
import FormMemberPage from '@/pages/member/Form.vue'

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
          name: 'Home',
          component: HomePage
        },
        {
          path: '/member',
          name: 'Member',
          component: MemberPage
        },
        {
          path: '/member/:id',
          name: 'Edit Member',
          component: FormMemberPage
        },
        {
          path: '/transaksi',
          name: 'Transaksi',
          component: TransaksiPage
        }
      ]
    }
  ]
})

export default router
