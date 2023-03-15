import { defineConfig, loadEnv } from 'vite';
import type { ConfigEnv } from 'vite';
import ReactivityTransform from '@vue-macros/reactivity-transform/vite';
import Vue from '@vitejs/plugin-vue';
// import VueJsx from '@vitejs/plugin-vue-jsx'
import viteCompression from 'vite-plugin-compression';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import * as path from 'path';
import type { ViteEnv } from './src/vite-env';

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd()) as unknown as ViteEnv;
  return {
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        api: path.resolve(__dirname, 'src/api'),
        assets: path.resolve(__dirname, 'src/assets'),
        components: path.resolve(__dirname, 'src/components'),
      },
      extensions: ['.js', '.json', '.ts', '.vue'],
    },
    plugins: [
      Vue(),
      ReactivityTransform(),
      AutoImport({
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
        imports: ['vue', 'vue-router', '@vueuse/core'],
      }),
      Components({
        resolvers: [
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'],
          }),
          ElementPlusResolver(),
        ],
      }),
      Icons({
        autoInstall: true,
      }),
      // * gzip compress
      env.VITE_BUILD_GZIP === 'true' &&
        viteCompression({
          verbose: true,
          disable: false,
          threshold: 10240,
          algorithm: 'gzip',
          ext: '.gz',
        }),
    ],
    server: {
      port: env.VITE_PORT,
      open: env.VITE_OPEN === 'true',
      hmr: {
        port: env.VITE_PORT,
      },
      proxy: {
        [env.VITE_PREFIX]: {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(env.VITE_PREFIX, ''),
        },
      },
    },
    css: {
      devSourcemap: true,
    },
    // * 打包去除 console.log && debugger
    esbuild: {
      pure: env.VITE_DROP_CONSOLE === 'true' ? ['console.log', 'debugger'] : [],
    },
  };
});
