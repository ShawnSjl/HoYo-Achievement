import api from "@/utils/request";

// Get all ZZZ achievement
export const zzzGetAll = () => {
    return api.get('/api/zzz/all');
}

// Update one ZZZ achievement status
export const zzzUpdateAchievement = (updates) => {
    return api.put("/api/zzz/user-update", updates);
};