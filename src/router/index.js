import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/process',
      name: 'process',
      component: () => import('../views/ProcessView.vue')
    },
    {
      path: '/sectors',
      name: 'sectors',
      component: () => import('../views/SectorsView.vue')
    },
    {
      path: '/investors',
      name: 'investors',
      component: () => import('../views/InvestorsView.vue')
    }
  ],
})

export default router
