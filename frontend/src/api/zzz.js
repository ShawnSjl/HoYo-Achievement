import api from "@/utils/request";

// Get default table for ZZZ
export const zzzDefaultTable = () => {
    return api.get('/api/zzz/all');
}

// Get table of ZZZ for login user
export const zzzGetUserTable = () => {
    return api.get('/api/zzz/user-all');
}

// Get table of complete ZZZ for login user
export const zzzGetUserCompleteTable = () => {
    return api.get('/api/zzz/user-complete');
}

// Get table of un complete ZZZ for login user
export const zzzGetUserUnCompleteTable = () => {
    return api.get('/api/zzz/user-un-complete');
}