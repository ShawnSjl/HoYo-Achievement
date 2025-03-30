import { createApp } from 'vue';  // Vue 3 API
import App from './App.vue';       // 导入 App.vue
import router from './router';     // 导入 Vue Router
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createPinia } from 'pinia'; // 导入 Pinia 状态管理
import './assets/style.css'

// 创建 Vue 应用实例
const app = createApp(App);

// 使用 Vue Router 和 Pinia
app.use(router);
app.use(ElementPlus);
app.use(createPinia());

// 挂载到 `index.html` 的 #app
app.mount('#app');
