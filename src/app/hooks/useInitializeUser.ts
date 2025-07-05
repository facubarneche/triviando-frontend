import { useEffect } from 'react';
import { useUserStore } from '../stores/userStore';
import { loginService } from '../services/loginService';
import { cloudinaryAvatarService } from '../services/cloudinaryAvatarService';

/**
 * Hook para inicializar el estado del usuario desde las cookies
 * cuando la aplicación se carga y buscar su avatar en Cloudinary
 */
export const useInitializeUser = () => {
  const { user, setUser, setAvatar } = useUserStore();

  useEffect(() => {
    const initializeUserAndAvatar = async () => {
      // Solo inicializar si no hay usuario en el store
      if (!user) {
        try {
          const currentUser = loginService.getUsuarioActual();
          if (currentUser) {
            setUser(currentUser);

            // Buscar avatar del usuario en Cloudinary
            const avatar = await cloudinaryAvatarService.getCurrentUserAvatar();
            if (avatar) {
              setAvatar(avatar);
            }
          }
        } catch {
          // Error initializing user, continue silently
        }
      }
    };

    initializeUserAndAvatar();
  }, [user, setUser, setAvatar]);

  return user;
};
