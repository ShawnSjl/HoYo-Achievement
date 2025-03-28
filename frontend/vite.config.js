import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [vue()],
    server: {
        port: 5173,  // 自定义端口
        open: true   // 启动后自动打开浏览器
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
        }
    }
});
