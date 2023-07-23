/**
 * 参考：https://github.com/ywanzhou/vue3-template/tree/master/src/service
 * 应该源自coderwhy的课程
 */
import { AxiosResponse } from 'axios';
import Request from './request';
import type { RequestConfig, NewResponse } from './types';

// 重写返回类型
interface NewRequestConfig<T, R> extends RequestConfig<NewResponse<R>> {
  data?: T;
}

const request = new Request({
  baseURL: import.meta.env.VITE_PREFIX,
  timeout: 1000 * 60 * 1,
  interceptors: {
    // 请求拦截器
    requestInterceptors: config => config,
    // 响应拦截器
    responseInterceptors: (result: AxiosResponse) => {
      return result;
    },
  },
});

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {NewRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const newRequest = <D = any, T = any>(config: NewRequestConfig<D, T>) => {
  const { method = 'GET' } = config;
  if (method === 'get' || method === 'GET') {
    config.params = config.data;
  }
  return request.request<NewResponse<T>>(config);
};
// 取消请求
export const cancelRequest = (url: string | string[]) => {
  return request.cancelRequest(url);
};
// 取消全部请求
export const cancelAllRequest = () => {
  return request.cancelAllRequest();
};

export default request;
