import { createRouter, createWebHistory } from 'vue-router'
import { authService } from '@/services/authService'
import Home from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue')
    },

  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !authService.isAuthenticated()) {
    next('/login')
  } else {
    next()
  }
})

export default router
