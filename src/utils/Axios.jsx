import axios from "axios";
import { API } from "../config/apiCongig";

const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];
let isLoggingOut = false; // 🔒 HARD STOP FLAG

const processQueue = (error = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🚫 NEVER intercept refresh
    if (originalRequest.url.includes("/users/refresh")) {
      return Promise.reject(error);
    }

    // 🚫 STOP EVERYTHING after logout starts
    if (isLoggingOut) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => axiosInstance(originalRequest));
      }

      isRefreshing = true;

      try {
        await axiosInstance.post("/users/refresh");
        processQueue();
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err);

        // ✅ ONE-TIME logout
        isLoggingOut = true;

        // Let your app router handle navigation
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
