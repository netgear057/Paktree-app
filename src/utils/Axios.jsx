import axios from "axios";
import { API } from "../config/apiCongig";

const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: true, // 🔴 REQUIRED for cookies
});

let isRefreshing = false;
let failedQueue = [];

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

    // console.log("Interceptor triggered:", error.response?.status); // debug

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try { 
       await axiosInstance.post("/users/refresh");
        processQueue();
         return axiosInstance(originalRequest);
         } catch (err) { processQueue(err); // ❌ Refresh failed → force logout
          window.location.href = "/login"; 
          return Promise.reject(err);
         } finally { isRefreshing = false;

          }
         }
    

    return Promise.reject(error);
  }
);


export default axiosInstance;

