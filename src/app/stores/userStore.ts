import { create } from 'zustand';
import type { Usuario as User } from '@/app/domain/User';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  updateUser: (userData: Partial<User>) => void;
  setAvatar: (avatarPublicId: string) => void;
}

export const useUserStore = create<UserState>()((set, get) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user: User) => {
    set({
      user,
      isAuthenticated: true,
    });
  },

  clearUser: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  updateUser: (userData: Partial<User>) => {
    const currentUser = get().user;
    if (currentUser) {
      set({
        user: { ...currentUser, ...userData },
      });
    }
  },

  setAvatar: (avatarPublicId: string) => {
    const currentUser = get().user;
    if (currentUser) {
      set({
        user: { ...currentUser, avatar: avatarPublicId },
      });
    }
  },
}));
