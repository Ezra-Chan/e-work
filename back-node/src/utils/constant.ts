/**
 * @description: 学历
 */
export enum EDUCATION {
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
 * @description: 性别
 */
export enum SEX {
  MALE = '男',
  FEMALE = '女',
}

/**
 * @description: 婚姻状况
 */
export enum MARITAL_STATUS {
  UNMARRIED = '未婚',
  MARRIED = '已婚',
  DIVORCED = '离异',
  WIDOWED = '丧偶',
}

/**
 * @description: 员工类型
 */
export enum EMPLOYEE_TYPE {
  FULL_TIME = '全职',
  PART_TIME = '兼职',
  INTERNSHIP = '实习',
  OUTSOURCING = '外包',
}

/**
 * @description: 员工状态
 */
export enum EMPLOYEE_STATUS {
  ON_JOB = '正式',
  PROBATION = '试用',
  LEAVE = '离职',
  RETIRE = '退休',
  OTHER = '其它',
}

/**
 * @description: 政治面貌
 */
export enum POLITICAL_STATUS {
  PARTY_MEMBER = '党员',
  LEAGUE_MEMBER = '团员',
  MASS = '群众',
  OTHER = '其它',
}
