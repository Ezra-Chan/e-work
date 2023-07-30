import request from '../request';

/**
 * 获取用户信息
 * @param id 用户ID
 */
export const getUserInfo = (id: number) => request.get(`/user/${id}`);

/**
 * 获取所有用户信息
 * @returns
 */
export const getAllUsers = () => request.get('/user');

/**
 * 注册用户
 * @param data 用户信息
 */
export const register = (data: IUserInfo) =>
  request.post('/user/register', data);

/**
 * 检查字段唯一性
 * @param field 字段名
 * @param value 字段值
 * @returns
 */
export const checkUnique = (field: string, value: any) =>
  request.get(`/user/checkUnique`, { field, value });

/**
 * 模糊搜索用户
 * @param keyword 关键词
 * @returns 用户列表
 */
export const searchUser = (keyword: any) =>
  request.get(`/user/search/${keyword}`);

/**
 * 更新用户信息
 * @param id 用户ID
 * @param data 用户信息
 * @returns
 */
export const updateUser = (id: number, data: IUserInfo) =>
  request.patch(`/user/${id}`, data);
