import { createRouter, createWebHistory } from "vue-router";
import ZzzView from "@/views/ZzzAchievement/ZzzView.vue";
import ProfileView from "@/views/User/ProfileView.vue"

const routes = [
    { path: "/", component: ZzzView },
    { path: "/zzz", component: ZzzView },
    { path: "/space", component: ProfileView },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
