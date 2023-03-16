declare type LoginType = 0 | 1;

declare type LoginFormType = {
  account: string;
  password: string;
  verificationCode: string;
  rememberMe: boolean;
};
