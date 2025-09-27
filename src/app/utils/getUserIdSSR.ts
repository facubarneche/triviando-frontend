import { useUserStore } from '../stores/userStore';
import { getUserId as getUserIdFromJWT } from './getUserId';

/**
 * Obtiene el ID del usuario del store Zustand para SSR, con fallback a JWT si es necesario
 * @returns Promise con ID del usuario o null si no está disponible
 */
export const getUserIdSSR = async (): Promise<number | null> => {
  // Primero intentar desde Zustand store
  const user = useUserStore.getState().user;
  if (user?.id) {
    return user.id;
  }

  // Fallback: obtener desde JWT (útil durante hidratación o cuando store no está inicializado)
  return await getUserIdFromJWT();
};
