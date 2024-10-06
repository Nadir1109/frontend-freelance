import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@/assets/global.css';
import '@/assets/base.css';
import '@/assets/main.css';
import './assets/register.css';
import './assets/navbar.css';
import './assets/login.css';

createApp(App)
    .use(router)
    .mount('#app');
