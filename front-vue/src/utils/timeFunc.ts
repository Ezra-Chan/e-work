import dayjs from 'dayjs';

/**
 * 根据身份证号提取出生日期
 * @param idCard 身份证号
 * @returns 出生日期
 */
export const getBirthdayByIdCard = (idCard: string): string => {
  let birthday = '';
  if (idCard) {
    if (idCard.length === 15) {
      birthday = '19' + idCard.substring(6, 12);
    } else if (idCard.length === 18) {
      birthday = idCard.substring(6, 14);
    }
    birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-');
  }
  return birthday;
};

/**
 * 根据出生日期计算当前年龄
 * @param birthday 出生日期
 * @returns 年龄
 */
export const getAgeByBirthday = (birthday: string): number => {
  const birthDate = dayjs(birthday);
  const now = dayjs();
  const diff = now.diff(birthDate, 'year');
  return Math.round(diff);
};

/**
 * 根据身份证号计算当前年龄
 * @param idCard 身份证号
 * @returns 年龄
 */
export const getAgeByIdCard = (idCard: string = ''): number => {
  const birthday = getBirthdayByIdCard(idCard);
  return getAgeByBirthday(birthday);
};
