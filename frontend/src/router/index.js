import { createRouter, createWebHistory } from "vue-router";
import ZzzAchievement from "@/views/ZzzAchievement/AchievementMain.vue";
import UserProfile from "@/views/User/Profile.vue"

const routes = [
    { path: "/", component: ZzzAchievement },
    { path: "/zzz", component: ZzzAchievement },
    { path: "/space", component: UserProfile },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
