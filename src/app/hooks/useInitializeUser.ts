import { useEffect, useCallback } from 'react';
import { useUserStore } from '../stores/userStore';
import { loginService } from '../services/loginService';
import { cloudinaryAvatarService } from '../services/cloudinaryAvatarService';

/**
 * Hook para inicializar el estado del usuario desde las cookies
 * cuando la aplicación se carga y buscar su avatar en Cloudinary
 */
export const useInitializeUser = () => {
  const { user, setUser, setAvatar } = useUserStore();

  const initializeUserAndAvatar = useCallback(async () => {
    try {
      const currentUser = loginService.getUsuarioActual();
      if (currentUser && (!user || user.id !== currentUser.id)) {
        setUser(currentUser);

        // Buscar avatar del usuario en Cloudinary
        try {
          const avatar = await cloudinaryAvatarService.getCurrentUserAvatar();
          if (avatar) {
            setAvatar(avatar);
          }
        } catch {
          // Error fetching avatar, continue without it
        }
      }
    } catch {
      // Error initializing user, continue silently
    }
  }, [user, setUser, setAvatar]);

  useEffect(() => {
    initializeUserAndAvatar();
  }, [initializeUserAndAvatar]);

  return user;
};
