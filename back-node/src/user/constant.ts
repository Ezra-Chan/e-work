import { User } from './entities/user.entity';

export enum UserMessage {
  NOT_FOUND = '用户不存在',
  ALREADY_EXISTS = '已存在',
  USER_DISABLED = '账号已禁用',
  ERROR_LOGIN_NAME_OR_PASSWORD = '用户名或密码错误',
  INVALID_FIELD = '无效字段',
}

export interface IUser extends User {
  deptId?: number;
  deptName?: string;
  nationId?: number;
  nationName?: string;
  roleId?: number;
  roleName?: string;
  positionId?: number;
  positionName?: string;
  leaderId?: number;
  leaderName?: string;
}
