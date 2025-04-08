import { createApp } from 'vue';  // Vue 3 API
import App from './App.vue';       // 导入 App.vue
import router from './router';     // 导入 Vue Router
import { createPinia } from 'pinia'; // 导入 Pinia 状态管理
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './assets/style.css'

// 创建 Vue 应用实例
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

router.beforeEach((to, from, next) => {
    const defaultTitle = '游戏成就'
    document.title = to.meta.title
        ? to.meta.title
        : defaultTitle
    next()
})

// 使用 Vue Router 和 Pinia
app.use(router);
app.use(ElementPlus);
app.use(pinia);

// 挂载到 `index.html` 的 #app
app.mount('#app');
