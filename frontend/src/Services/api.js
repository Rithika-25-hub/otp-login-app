import axios from "axios";

const api = axios.create({
    baseURL: "https://otp-login-app-f56k.onrender.com/api"
});

export default api;