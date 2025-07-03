import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Usuario {
  id: number;
  lastName: string;
  name: string;
  username: string;
}

interface UserState {
  user: Usuario | null;
  isAuthenticated: boolean;
  setUser: (user: Usuario) => void;
  clearUser: () => void;
  updateUser: (userData: Partial<Usuario>) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      setUser: (user: Usuario) => {
        set({ 
          user, 
          isAuthenticated: true 
        });
      },
      
      clearUser: () => {
        set({ 
          user: null, 
          isAuthenticated: false 
        });
      },
      
      updateUser: (userData: Partial<Usuario>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ 
            user: { ...currentUser, ...userData } 
          });
        }
      },
    }),
    {
      name: 'user-storage', // nombre para localStorage
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }), // solo persistir user e isAuthenticated
    }
  )
);
