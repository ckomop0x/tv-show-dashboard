import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/pages/Dashboard.vue'

const routes = [
  {
    path: '/',
    component: Dashboard,
  },
  {
    path: '/show/:id',
    component: Dashboard, // 🟢 same view, handles modal logic
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
