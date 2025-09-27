import { useUserStore } from '../stores/userStore';
import { getUserIdCSR as getUserIdFromJWT } from './getUserIdCSR';

/**
 * Obtiene el ID del usuario del store Zustand, con fallback a JWT si es necesario
 * @returns ID del usuario o null si no está disponible
 */
export const getUserId = (): number | null => {
  // Primero intentar desde Zustand store
  const user = useUserStore.getState().user;
  if (user?.id) {
    return user.id;
  }

  // Fallback: obtener desde JWT (útil durante hidratación o cuando store no está inicializado)
  return getUserIdFromJWT();
};
