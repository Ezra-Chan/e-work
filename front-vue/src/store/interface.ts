/* GlobalState */
export interface GlobalState {
  token: string;
  userInfo: IUserInfo | undefined;
  isCollapse: boolean;
  isDark: boolean;
  breadcrumb: boolean;
  breadcrumbIcon: boolean;
  primary: string;
}
