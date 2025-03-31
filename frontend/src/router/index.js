import { createRouter, createWebHistory } from "vue-router";
import ZzzAchievement from "@/views/ZzzAchievement/AchievementMain.vue";

const routes = [
    { path: "/", component: ZzzAchievement },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
