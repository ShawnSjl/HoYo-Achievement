import { defineStore } from "pinia";
import {login, register } from "@/api/user";
import { isTokenExpired } from "@/utils/jwt";

export const useAuthStore = defineStore({
    id: "auth",
    state: () => ({
        token: localStorage.getItem("jwt_token") || null,
        user: JSON.parse(localStorage.getItem("user")) || null,
    }),
    actions: {
        async loginUser(credentials) {
            try {
                const response = await login(credentials);
                if (response.data.token) {
                    this.token = response.data.token;
                    this.user = response.data.user;

                    localStorage.setItem("jwt_token", this.token);
                    localStorage.setItem('user', JSON.stringify(this.user))
                } else {
                    throw new Error('Login failed.');
                }
            } catch (error) {
                console.error('Login error:', error);
                throw error;
            }
        },

        async registerUser(credentials) {
            try {
                const response = await register(credentials);
                if (response.data.user) {
                    await this.loginUser(credentials);
                } else {
                    throw new Error('Register failed.');
                }
            } catch (error) {
                console.error('Register error:', error);
                throw error;
            }
        },

        logoutUser() {
            this.token = null;
            this.user = null;

            localStorage.removeItem("jwt_token");
            localStorage.removeItem('user')
        },

        isAuthenticated() {
            return !!this.token && !isTokenExpired(this.token);
        },

        loadUser() {
            if (this.token && !isTokenExpired(this.token)) {
                this.user = JSON.parse(localStorage.getItem("user"));
            } else {
                this.logoutUser();
            }
        }
    },
    persist: true,
})