// ===== AXIOS INTERCEPTOR SETUP =====
// src/context/axiosConfig.js

import axios from 'axios';
import { Store } from '../Store/Store'; // ✅ your Redux store
import { logout } from './authSlice'; // ✅ correct import path to your slice

// ✅ Use env variable for dynamic base URL
const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  process.env.REACT_APP_API_BASE_URL ||
  'https://ecommernceapi-ctz4.onrender.com/api/v1';

// ✅ Create axios instance
const axiosInstance = axios.create({
  baseURL,
});

// ✅ Request interceptor: attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('flowerfarm_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor: handle unauthorized (401)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Store.dispatch(logout());
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
