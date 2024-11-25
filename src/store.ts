// store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null; // Define as string or null for clarity
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
}

// Zustand auth store with persistence
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null, // Initialize with null
      setAccessToken: (token) => set({ accessToken: token }),
      clearAccessToken: () => set({ accessToken: null }),
    }),
    {
      name: 'auth-storage', // Name of the key in storage
      storage: createJSONStorage(() => sessionStorage), // Use sessionStorage
      partialize: (state) => ({ accessToken: state.accessToken }), // Persist only accessToken
    }
  )
);
