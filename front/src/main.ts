import { createApp } from 'vue';
import store from '@/store';
import router from '@/router';
import App from '@/App.vue';
import 'element-plus/theme-chalk/dark/css-vars.css';

createApp(App).use(store).use(router).mount('#app');
