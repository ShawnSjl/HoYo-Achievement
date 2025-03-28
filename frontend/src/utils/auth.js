import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const register = async (username, password) => {
    return axios.post(`${API_URL}/register`, { username, password });
};

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

export const getProfile = async () => {
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}/profile`, {
        headers: { Authorization: token }
    });
};
