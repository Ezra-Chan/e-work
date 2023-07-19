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
 * @description: JWT秘钥
 */
export const jwtConstants = {
  secret: 'shinobi7414',
};
