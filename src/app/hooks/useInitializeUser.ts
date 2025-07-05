import { useEffect } from 'react';
import { useUserStore } from '../stores/userStore';
import { loginService } from '../services/loginService';

/**
 * Hook para inicializar el estado del usuario desde las cookies
 * cuando la aplicación se carga
 */
export const useInitializeUser = () => {
  const { user, setUser } = useUserStore();

  useEffect(() => {
    // Solo inicializar si no hay usuario en el store
    if (!user) {
      try {
        const currentUser = loginService.getUsuarioActual();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error initializing user:', error);
      }
    }
  }, [user, setUser]);

  return user;
};
