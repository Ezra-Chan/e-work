import { defineConfig, loadEnv } from 'vite';
import type { ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import * as path from 'path';

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());
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
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: ['vue', 'vue-router'],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    server: {
      // port: 8080,
      // hmr: {
      //   host: "127.0.0.1",
      //   port: 8080,
      // },
      proxy: {
        [env.VITE_PREFIX]: {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(env.VITE_PREFIX, ''),
        },
      },
    },
  };
});
