import { Role } from 'src/role/entities/role.entity';

export interface ISimpleUser {
  id: number;
  realName: string;
  role: Role;
  loginName: string;
  avatar: string;
  deptName: string;
}
