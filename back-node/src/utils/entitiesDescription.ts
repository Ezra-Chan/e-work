/**
 * @description: 用户实体类字段描述
 */
export const UserDesc = {
  id: '用户ID',
  realName: '姓名',
  sex: '性别',
  loginName: '登录名',
  password: '密码',
  roleId: '角色ID',
  departmentId: '部门ID',
  avatar: '头像',
  email: '邮箱',
  phoneNumber: '手机号',
  idCard: '身份证号',
  bankCard: '银行卡号',
  education: '学历',
  graduateSchool: '毕业院校',
  leaderId: '上级领导',
  address: '住址',
  signature: '个性签名',
  lastLoginIp: '最后登录IP',
  lastLoginTime: '最后登录时间',
  joinTime: '加入时间',
  updateTime: '更新时间',
  enabled: '是否启用',
};

/**
 * @description: 部门实体类字段描述
 */
export const DepartmentDesc = {
  id: '部门ID',
  name: '部门名',
  manager: '部门管理者',
  email: '部门邮箱',
  parentId: '上级部门ID',
};

/**
 * @description: 角色实体类字段描述
 */
export const RoleDesc = {
  id: '角色ID',
  name: '角色名',
  permissions: '权限',
};
