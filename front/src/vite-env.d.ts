/// <reference types="vite/client" />
declare interface Window {
  token: string;
}
export declare interface ViteEnv {
  VITE_PREFIX: string;
  VITE_PORT: number;
  VITE_OPEN: boolean | string;
  VITE_GLOB_APP_TITLE: string;
  VITE_DROP_CONSOLE: boolean | string;
  VITE_BASE_URL: string;
  VITE_BUILD_GZIP: boolean | string;
}
