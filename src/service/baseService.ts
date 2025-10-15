import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true"
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
       config.headers["Authorization"] = `Bearer ${accessToken}`;
     }
     return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
