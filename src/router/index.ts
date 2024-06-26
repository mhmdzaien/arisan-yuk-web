import { createRouter, createWebHistory } from 'vue-router'
import BodyLayout from '@/components/layouts/BodyLayout.vue'
import HomePage from '@/pages/Home.vue'
import MemberPage from '@/pages/member/Member.vue'
import FormMemberPage from '@/pages/member/Form.vue'
import IuranPage from '@/pages/iuran/Iuran.vue'
import TransaksiPage from '@/pages/transaksi/Transaksi.vue'
import FormIuranPage from '@/pages/iuran/FormIuran.vue'

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
          path: '/member/:iuranId?',
          name: 'Member',
          component: MemberPage
        },
        {
          path: '/member/form/:id',
          name: 'Edit Member',
          component: FormMemberPage
        },
        {
          path: '/transaksi',
          name: 'Transaksi',
          component: TransaksiPage
        },
        {
          path: '/iuran',
          name: 'Iuran',
          component: IuranPage,
          meta: {
            canBack: true
          }
        },
        {
          path: '/iuran/form/:id?',
          name: 'Form Iuran',
          component: FormIuranPage,
          meta: {
            canBack: true
          }
        }
      ]
    }
  ]
})

export default router
