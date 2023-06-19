declare type LoginType = 0 | 1;

declare type LoginTypes = {
  type: LoginType;
  name: string;
};

declare type LoginFormType = {
  userName: string;
  password: string;
  code: string;
  rememberMe: boolean;
};

declare type InitLoginFormType = null | string;
