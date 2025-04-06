import { createRouter, createWebHistory } from "vue-router";
import ZzzView from "@/views/ZzzAchievement/ZzzView.vue";
import ProfileView from "@/views/User/ProfileView.vue"

const routes = [
    {
        path: "/",
        component: ZzzView,
        meta: {
        },
    },
    {
        path: "/zzz",
        component: ZzzView,
        meta: {
            title: '绝区零成就',
        }
    },
    {
        path: "/space",
        component: ProfileView,
        meta: {
            title: '个人空间',
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
