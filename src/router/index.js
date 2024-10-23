// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import XYHome from '@/components/XYHome.vue'
import XYBlogDetail from '@/components/XYBlogDetail.vue'

const routes = [
  {
    path: '/',
    name: 'XYHome',
    component: XYHome
  },
  {
    path: '/blog/:id',
    name: 'XYBlogDetail',
    component: XYBlogDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router