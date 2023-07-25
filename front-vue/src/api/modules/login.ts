import request from '../request';

export const getCaptcha = () =>
  request.instance?.defaults?.baseURL + '/auth/captcha';

export const accountLogin = (data: LoginFormType) =>
  request.post('/auth/login', data);

export const faceLogin = (base: string) =>
  request.post('/auth/faceLogin', { base });

export const logoutApi = () => request.post('/auth/logout');

export const getUserInfo = () => request.get('/user/1');
