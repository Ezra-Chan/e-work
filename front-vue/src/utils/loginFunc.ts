import qs from 'querystringify';
import { GlobalStore } from '@/store';

const globalStore = GlobalStore();

export const handleLogin = (data: any, router: any) => {
  ElMessage.success('登录成功！欢迎');
  const { token, info } = data;
  globalStore.setGlobalState({ token, userInfo: info });
  const { href } = window.location;
  if (href.includes('returnUrl')) {
    const { returnUrl } = qs.parse(window.location.search) as any;
    router.push(returnUrl);
  } else {
    router.push('/');
  }
};
