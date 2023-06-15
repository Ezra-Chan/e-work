/* GlobalState */
export interface GlobalState {
  token: string;
  userInfo: UserInfo | undefined;
  isCollapse: boolean;
  isDark: boolean;
  breadcrumb: boolean;
  breadcrumbIcon: boolean;
  primary: string;
}

interface UserInfo {
  id: number;
  userName: string;
  loginName: string;
  avatar: string;
}
