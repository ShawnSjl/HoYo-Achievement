import { createRouter, createWebHistory } from "vue-router";
import ZzzView from "@/views/ZzzAchievement/ZzzView.vue";
import UserProfile from "@/views/User/Profile.vue"

const routes = [
    { path: "/", component: ZzzView },
    { path: "/zzz", component: ZzzView },
    { path: "/space", component: UserProfile },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
