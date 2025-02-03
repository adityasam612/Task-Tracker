// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { authService } from '@/services/authService'
import HomeView from '@/views/HomeView.vue'
import UserView from '@/views/UserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
      meta: { requiresAuth: true }
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
    {
      path: '/logout',
      name: 'logout',
      component: () => import('@/views/LogoutView.vue')
    },
    {
      path: '/User',
      name: 'user',
      component: () => import('@/views/UserView.vue'),

    }
  ]
})


router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
    next('/');
  } else {
    next();
  }
})

export default router
