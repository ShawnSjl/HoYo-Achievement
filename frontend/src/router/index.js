import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import ZzzAchievement from "@/views/ZzzAchievement/AchievementTable.vue";

const routes = [
    { path: "/login", component: Login },
    { path: "/", component: ZzzAchievement },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
