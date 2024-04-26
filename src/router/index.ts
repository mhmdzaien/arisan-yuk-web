import { createRouter, createWebHistory } from 'vue-router'
import BodyLayout from '@/components/layouts/BodyLayout.vue'
import HomePage from '@/pages/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BodyLayout,
      children: [
        {
          path: '',
          component: HomePage
        }
      ]
    }
  ]
})

export default router
