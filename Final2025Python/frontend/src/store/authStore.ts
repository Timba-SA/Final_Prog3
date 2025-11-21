import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Client } from '@/types/api';

export interface AuthUser {
  id: number;
  name: string;
  lastname: string;
  email: string;
  telephone?: string;
}

interface AuthStore {
  user: AuthUser | null;
  isAuthenticated: boolean;
  
  // Actions
  login: (user: AuthUser) => void;
  logout: () => void;
  updateUser: (user: Partial<AuthUser>) => void;
  setFromClient: (client: Client) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: (user: AuthUser) => {
        set({ user, isAuthenticated: true });
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      updateUser: (userData: Partial<AuthUser>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
      
      setFromClient: (client: Client) => {
        set({
          user: {
            id: client.id_key,
            name: client.name,
            lastname: client.lastname,
            email: client.email,
            telephone: client.telephone,
          },
          isAuthenticated: true,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
