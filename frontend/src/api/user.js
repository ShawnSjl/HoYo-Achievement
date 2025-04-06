import api from "@/utils/request";

// User login
export const login = (credentials) => {
    return api.post("/api/auth/login", credentials);
};

// User register
export const register = (credentials) => {
    return api.post("/api/auth/register", credentials);
};

export const getAllUsers = () => {
    return api.get("/api/auth/get-all");
}

export const changePassword = (credentials) => {
    return api.put("/api/auth/change-password", credentials);
}

export const deleteUser = (id) => {
    return api.delete("/api/auth/delete?id=${id}");
}

// User logout
export const logout = () => {
    localStorage.removeItem("jwt_token");
    window.location.href = "/";
}