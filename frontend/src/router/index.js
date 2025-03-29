import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import ZzzAchievement from "@/views/AchievementTab.vue";

const routes = [
    { path: "/login", component: Login },
    { path: "/", component: ZzzAchievement },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
