import { createApp } from 'vue';  // Vue 3 API
import App from './App.vue';       // 导入 App.vue
// import router from './router';     // （可选）导入 Vue Router
// import { createPinia } from 'pinia'; // （可选）导入 Pinia 状态管理

// 创建 Vue 应用实例
const app = createApp(App);

// 使用 Vue Router 和 Pinia（如果有的话）
// app.use(router);
// app.use(createPinia());

// 挂载到 `index.html` 的 #app
app.mount('#app');
