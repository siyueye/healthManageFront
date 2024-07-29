import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') }, // 登录页
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/user/password',
      children: [
        {
          path: '/sport/manage',
          component: () => import('@/views/sport/SportManage.vue')
        },
        {
          path: '/ceshi/manage',
          component: () => import('@/views/test/prt.vue')
        },
       
        {
          path: '/weight/manage',
          component: () => import('@/views/weight/WeightManage.vue')
        },
        {
          path: '/weight/linechart',
          component: () => import('@/views/weight/Weightlinechart.vue')
        },
        {
          path: '/diet/manage',
          component: () => import('@/views/diet/DietManage.vue')
        },
        {
          path: '/calorie/manage',
          name: 'calorie',
          component: () => import('@/views/calorie/CalorieManage.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

// 登录访问拦截
router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') return '/login'
})

export default router
