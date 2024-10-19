import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';


// Types for authentication


interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
}

// Axios instance for API requests
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Zustand auth store with persistence
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (token) => set({ accessToken: token }),
      clearAccessToken: () => set({ accessToken: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ accessToken: state.accessToken }),
    }
  )
);

// Auth service
export const authService = {
  async login(credentials: { username: string; password: string }): Promise<void> {
    try {
      const response = await api.post('/login', credentials);
        if (response.data.accessToken) {
          useAuthStore.getState().setAccessToken(response.data.accessToken);
        }
    } catch (error) {
      useAuthStore.getState().clearAccessToken();
      throw new Error(
        error instanceof AxiosError ? error.response?.data?.message || 'Login failed' : 'Login failed'
      );
    }
  },


  async logout(): Promise<void> {
    await api.post('/logout').finally(() => useAuthStore.getState().clearAccessToken());
  },


  async makeAuthenticatedRequest<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await api.request<T>(config).catch((error) => {
      if (error.response?.status === 401) useAuthStore.getState().clearAccessToken();
      throw error;
    });
    return response.data;
  },
};

// Axios response interceptor for handling 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) useAuthStore.getState().clearAccessToken();
    return Promise.reject(error);
  }
);
