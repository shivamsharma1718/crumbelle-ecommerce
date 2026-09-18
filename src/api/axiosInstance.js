import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Request interceptor – attach token ────────────────────
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('madhab_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response interceptor – handle 401 ────────────────────
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('madhab_token');
      localStorage.removeItem('madhab_user');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error);
  }
);

export default axiosInstance;
