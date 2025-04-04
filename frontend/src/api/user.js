import api from "@/utils/request";

// User login
export const login = (credentials) => {
    return api.post("/api/auth/login", credentials);
};

// User register
export const register = (credentials) => {
    return api.post("/api/auth/register", credentials);
};

// User logout
export const logout = () => {
    localStorage.removeItem("jwt_token");
    window.location.href = "/";
}