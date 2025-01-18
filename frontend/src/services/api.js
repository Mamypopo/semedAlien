// ตั้งค่า axios instance
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(config => {
  config.timeout = 10000;
  return config;
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ERR_NETWORK') {
      console.error('Network Error:', {
        message: 'Cannot connect to API server',
        url: error.config?.url,
        baseURL: error.config?.baseURL
      });
    }
    return Promise.reject(error);
  }
)


export default api