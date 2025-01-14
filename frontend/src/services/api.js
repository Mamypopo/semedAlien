// ตั้งค่า axios instance
import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  api.interceptors.request.use(config => {
    config.timeout = 10000; // timeout 10 วินาที
    return config;
  })

 // Add error handling
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