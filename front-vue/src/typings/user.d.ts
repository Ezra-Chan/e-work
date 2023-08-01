enum SEX {
  MALE = '男',
  FEMALE = '女',
}

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

declare interface IRole {
  id: number;
  name: string;
}

declare interface IDepartment {
  id: number;
  name: string;
  manager: IUserInfo;
  parent: IDepartment;
  children: IDepartment[];
}

declare interface IUserInfo {
  id: number;
  realName: string;
  sex: SEX;
  loginName: string;
  password: string;
  role: IRole;
  department: IDepartment;
  deptName: string;
  avatar?: string;
  email?: string;
  phoneNumber?: string;
  idCard?: string;
  bankCard?: string;
  education?: EDUCATION;
  graduateSchool?: string;
  leader?: IUserInfo;
  address?: string;
  signature?: string;
  enable?: boolean;
  joinTime?: Date;
  updateTime?: Date;
  lastLoginIp?: string;
  lastLoginTime?: Date;
}
