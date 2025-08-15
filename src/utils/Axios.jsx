import axios from 'axios';
import { API } from '../config/apiCongig';

const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: true, // ✅ important
});

export default axiosInstance;
