export enum AuthMessage {
  ERROR_LOGIN_NAME_OR_PASSWORD = '用户名或密码错误',
  LOGIN_CAPTCHA_ERROR = '验证码错误',
  LOGIN_CAPTCHA_NULL = '验证码为空',
}

/**
 * @description: JWT秘钥
 */
export const jwtConstants = {
  secret: 'ework',
};
