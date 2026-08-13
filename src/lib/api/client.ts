import axios from 'axios';

interface StoredAuth {
  token?: string;
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5062/api',
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('auth');
      if (stored) {
        const data = JSON.parse(stored) as StoredAuth;
        if (data.token) {
          config.headers.Authorization = `Bearer ${data.token}`;
        }
      }
    } catch {
      localStorage.removeItem('auth');
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('auth');
      document.cookie = 'token=; path=/; max-age=0';
      window.dispatchEvent(new Event('auth:unauthorized'));
    }
    return Promise.reject(error);
  }
);

export default apiClient;
