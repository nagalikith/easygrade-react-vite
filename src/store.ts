// Types for authentication

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';


interface AuthState {
    accessToken: string | null;
    setAccessToken: (token: string) => void;
    clearAccessToken: () => void;
  }
// Zustand auth store with persistence
export const useAuthStore = create<AuthState>()(
    persist(
      (set) => ({
        accessToken: typeof window !== 'undefined' ? sessionStorage.getItem('auth-storage') : null,
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