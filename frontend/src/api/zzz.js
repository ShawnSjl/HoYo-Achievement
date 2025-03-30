import api from "@/utils/request";

// Get all ZZZ achievement
export const zzzGetAll = () => {
    return api.get('/api/zzz/all');
}

// Get all ZZZ achievement
export const zzzGetAllByClassId = (class_id) => {
    return api.get('/api/zzz/class?id=' + class_id);
}

// Get table of complete ZZZ for login user
export const zzzGetUserCompleteTable = () => {
    return api.get('/api/zzz/user-complete');
}

// Get table of un complete ZZZ for login user
export const zzzGetUserUnCompleteTable = () => {
    return api.get('/api/zzz/user-un-complete');
}

export const zzzUpdateAchievement = (updates) => {
    return api.put("/api/zzz/user-update", updates);
};