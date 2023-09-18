import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NProgress from '@/config/nprogress';

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
      {
        path: '/menuManage',
        name: 'MenuManage',
        meta: {
          title: '菜单管理',
          keepAlive: true,
          requireAuth: true,
        },
        component: () => import('@/views/menu/MenuManage.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(to => {
  NProgress.start();
  if (to.meta?.requireAuth) {
    const { token, userInfo } = JSON.parse(
      localStorage.getItem('GlobalState') || '{}'
    );
    if (!token || !userInfo) {
      return '/login';
    }
  }
});

/**
 * @description 路由跳转错误
 * */
router.onError(error => {
  NProgress.done();
  console.warn('路由错误', error.message);
});

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
  NProgress.done();
});

export default router;
