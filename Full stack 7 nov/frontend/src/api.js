import axios from 'axios';

// Access Vite env variable
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL, // ✅ now works in Vite
  //headers: { 'Content-Type': 'application/json' },
});

// Optional: attach JWT token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
