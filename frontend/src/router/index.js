import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/Home/HomeView.vue";
import ZzzView from "@/views/ZzzAchievement/ZzzView.vue";
import ProfileView from "@/views/User/ProfileView.vue"

const routes = [
    {
        path: "/",
        component: HomeView,
        meta: {
            title: "首页",
            theme: 'light',
            color: '#FFFFFF'
        },
    },
    {
        path: "/zzz",
        component: ZzzView,
        meta: {
            title: '绝区零成就',
            theme: 'dark',
            color: '#000000'
        }
    },
    {
        path: "/space",
        component: ProfileView,
        meta: {
            title: '个人空间',
            theme: 'light',
            color: '#f6f6f6'
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
