import { create } from 'zustand';

export interface Usuario {
  id: number;
  lastName: string;
  name: string;
  username: string;
  avatar?: string; // Cloudinary public_id for the avatar
  token?: string; // JWT token para autenticación
}

interface UserState {
  user: Usuario | null;
  isAuthenticated: boolean;
  setUser: (user: Usuario) => void;
  clearUser: () => void;
  updateUser: (userData: Partial<Usuario>) => void;
  setAvatar: (avatarPublicId: string) => void;
}

export const useUserStore = create<UserState>()((set, get) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user: Usuario) => {
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

  updateUser: (userData: Partial<Usuario>) => {
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
