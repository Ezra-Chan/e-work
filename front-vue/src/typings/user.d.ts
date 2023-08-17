/**
 * @description: 性别
 */
enum SEX {
  MALE = '男',
  FEMALE = '女',
}

/**
 * @description: 学历
 */
enum EDUCATION {
  NULL = '无',
  PRIMARY = '小学',
  JUNIOR_HIGH = '初中',
  SECONDARY = '中专',
  SENIOR_HIGH = '高中',
  JUNIOR_COLLEGE = '大专',
  UNDERGRADUATE = '本科',
  MASTER = '硕士',
  DOCTOR = '博士',
  OTHER = '其它',
}

/**
 * @description: 婚姻状况
 */
enum MARITAL_STATUS {
  UNMARRIED = '未婚',
  MARRIED = '已婚',
  DIVORCED = '离异',
  WIDOWED = '丧偶',
}

/**
 * @description: 员工类型
 */
enum EMPLOYEE_TYPE {
  FULL_TIME = '全职',
  PART_TIME = '兼职',
  INTERNSHIP = '实习',
  OUTSOURCING = '外包',
}

/**
 * @description: 员工状态
 */
enum EMPLOYEE_STATUS {
  ON_JOB = '正式',
  PROBATION = '试用',
  LEAVE = '离职',
  RETIRE = '退休',
  OTHER = '其它',
}

/**
 * @description: 政治面貌
 */
enum POLITICAL_STATUS {
  PARTY_MEMBER = '党员',
  LEAGUE_MEMBER = '团员',
  MASS = '群众',
  OTHER = '其它',
}

/**
 * @description: 角色
 */
declare interface IRole {
  id: number;
  name: string;
}

/**
 * @description: 职位
 */
declare interface IPosition {
  id: number;
  name: string;
}

/**
 * @description: 部门
 */
declare interface IDepartment {
  id: number;
  name: string;
  manager?: IUserInfo;
  parent?: IDepartment;
  children?: IDepartment[];
}

/**
 * @description: 用户信息
 */
declare interface IUserInfo {
  // 个人信息
  id: number;
  loginName: string;
  password?: string;
  realName: string;
  sex?: SEX;
  avatar?: string;
  email?: string;
  phoneNumber?: string;
  idCard?: string;
  maritalStatus?: MARITAL_STATUS;
  nativePlace?: string;
  politicalStatus?: POLITICAL_STATUS;
  nation?: string;
  accountLocation?: string;
  address?: string;
  signature?: string;

  // 学历信息
  education?: EDUCATION;
  graduateSchool?: string;
  graduateTime?: string;

  // 工作信息
  role?: IRole;
  roleId?: number;
  roleName?: string;
  deptName?: string;
  position?: IPosition;
  department?: IDepartment;
  leader?: Partial<IUserInfo>;
  joinTime?: Date;
  employeeType?: EMPLOYEE_TYPE;
  employeeStatus?: EMPLOYEE_STATUS;

  // 账户信息
  bankCard?: string;
  socialSecurity?: string;
  accumulationFund?: string;

  // 其它信息
  enable?: boolean;
  updateTime?: Date;
  lastLoginIp?: string;
  lastLoginTime?: Date;
}

declare interface IFaceInfo {
  face_token: string;
  ctime: string;
}

declare interface IUserFaceList {
  face_list: (IFaceInfo | string)[];
}
