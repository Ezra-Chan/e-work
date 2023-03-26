import { defineStore, createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import piniaPersistConfig from '@/config/piniaPersist';
import { DEFAULT_PRIMARY } from '@/config/config';
import { GlobalState } from './interface';

export const GlobalStore = defineStore({
  id: 'globslState',
  state: (): GlobalState => ({
    token: '',
    userInfo: '',
    // 折叠菜单
    isCollapse: false,
    // 黑暗模式
    isDark: false,
    // 默认 primary 主题颜色
    primary: DEFAULT_PRIMARY,
    // 面包屑导航
    breadcrumb: true,
    // 面包屑导航图标
    breadcrumbIcon: true,
  }),
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo;
    },
    setIsCollapse(isCollapse: boolean) {
      this.isCollapse = isCollapse;
    },
    setIsDark(isDark: boolean) {
      this.isDark = isDark;
    },
    setPrimary(primary: string) {
      this.primary = primary;
    },
    setBreadcrumb(breadcrumb: boolean) {
      this.breadcrumb = breadcrumb;
    },
    setBreadcrumbIcon(breadcrumbIcon: boolean) {
      this.breadcrumbIcon = breadcrumbIcon;
    },
  },
  persist: piniaPersistConfig('GlobalState'),
});

// piniaPersist(持久化)
const store = createPinia();
store.use(piniaPluginPersistedstate);

export default store;
