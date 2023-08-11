import request from '../request';
import { NewResponse } from '../request/types';

/**
 * 获取用户信息
 * @param id 用户ID
 */
export const getUserInfo = (id: number): Promise<NewResponse<IUserInfo>> =>
  request.get(`/user/${id}`);

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

/**
 * 删除用户
 * @param id 用户ID
 */
export const deleteUser = (id: number) => request.delete(`/user/${id}`);

/**
 * 启用/禁用用户
 * @param id 用户ID
 */
export const disableUser = (id: number) => request.get(`/user/disable/${id}`);

/**
 * 查询用户人脸列表
 * @param id 用户ID
 * @param role 用户角色ID
 * @returns 人脸列表
 */
export const getUserFaces = (userId?: number, roleId?: number) =>
  request.post(`/face/user/list`, { userId, roleId });

/**
 * 上传人脸
 * @param userId 用户ID
 * @param roleId 用户角色ID
 * @param base 图片base64
 */
export const createFace = ({
  userId,
  roleId,
  base,
}: {
  userId?: number;
  roleId?: number;
  base: string;
}) => request.post(`/face`, { userId, roleId, base });
