import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");

    // Don't send Authorization for login or register
    if (
        token &&
        config.url !== "login/" &&
        config.url !== "register/"
    ) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default API;