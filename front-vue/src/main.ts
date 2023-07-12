import { createApp } from 'vue';
import store from '@/store';
import router from '@/router';
import App from '@/App.vue';
import 'virtual:uno.css';
import './assets/js/iconfont.js';
import 'element-plus/theme-chalk/dark/css-vars.css';

const less = import.meta.glob('assets/css/*.less');
for (const path in less) {
  less[path]();
}

createApp(App).use(store).use(router).mount('#app');
