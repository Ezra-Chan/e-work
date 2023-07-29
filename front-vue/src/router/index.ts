import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      keepAlive: true,
      requireAuth: false,
    },
    component: () => import('@/views/login/Index.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '首页',
      keepAlive: true,
      requireAuth: true,
    },
    component: () => import('@/views/home/Index.vue'),
    children: [
      {
        path: '/self',
        name: 'Self',
        meta: {
          title: '个人中心',
          keepAlive: true,
          requireAuth: true,
        },
        component: () => import('@/views/self/Index.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(to => {
  if (to.meta?.requireAuth) {
    const { token } = JSON.parse(localStorage.getItem('GlobalState') || '{}');
    if (!token) {
      return '/login';
    }
  }
});

export default router;
