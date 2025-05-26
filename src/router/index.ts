import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/pages/Dashboard.vue'
import ShowDetail from '@/pages/ShowDetail.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/show/:id', name: 'ShowDetail', component: ShowDetail },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
