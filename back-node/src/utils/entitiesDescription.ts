/**
 * @description: 用户实体类字段描述
 */
export const UserDesc = {
  // 个人信息
  id: '用户ID',
  loginName: '登录名',
  password: '密码',
  realName: '姓名',
  sex: '性别',
  avatar: '头像',
  email: '邮箱',
  phoneNumber: '手机号',
  idCard: '身份证号',
  maritalStatus: '婚姻状况',
  nativePlace: '籍贯',
  politicalStatus: '政治面貌',
  nation: '民族',
  accountLocation: '户口所在地',
  address: '住址',
  signature: '个性签名',
  // 学历信息
  education: '学历',
  graduateSchool: '毕业院校',
  graduateTime: '毕业时间',
  // 工作信息
  role: '角色ID',
  department: '部门ID',
  position: '职位ID',
  leader: '直接主管',
  joinTime: '入职日期',
  employeeType: '员工类型',
  employeeStatus: '员工状态',
  // 账户信息
  bankCard: '银行卡号',
  socialSecurity: '社保卡号',
  accumulationFund: '公积金号',
  // 其它信息
  updateTime: '更新时间',
  lastLoginIp: '最后登录IP',
  lastLoginTime: '最后登录时间',
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
  parent: '上级部门ID',
};

/**
 * @description: 角色实体类字段描述
 */
export const RoleDesc = {
  id: '角色ID',
  name: '角色名',
  permissions: '权限',
};

export const FaceDesc = {
  base: 'base64编码的图片',
  userId: '用户ID',
  roleId: '角色ID',
};

export const NationDesc = {
  id: '民族ID',
  name: '民族名',
};

export const PositionDesc = {
  id: '职位ID',
  name: '职位名',
};

export const MenuDesc = {
  id: '菜单ID',
  name: '菜单名',
  parentId: '上级菜单ID',
  icon: '图标',
  path: '路径',
  component: '组件',
  sort: '排序',
  permission: '权限',
  enabled: '是否启用',
};
