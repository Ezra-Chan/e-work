import { User } from 'src/user/entities/user.entity';
import { Department } from './entities/department.entity';

export type DepartmentTree = Department & {
  users: User[];
  children: DepartmentTree[] | Department[];
};

export type FindAllUsersOptions = {
  /**
   * 是否懒加载，是则不加载子部门的用户
   */
  lazy?: boolean;
  /**
   * 是否平铺，是则平铺展示所有用户，不含部门
   */
  flat?: boolean;
};
