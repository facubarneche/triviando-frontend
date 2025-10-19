/**
 * Client-Side Authentication Hooks
 * Para uso exclusivo en Client Components
 */

import { useUserStore } from '@/app/stores/userStore';
import { useMemo } from 'react';
import type { Usuario } from '@/app/domain/User';

/**
 * Hook para obtener el ID del usuario actual (Client-Side)
 *
 * USAR SOLO EN:
 * - Client Components
 * - Components con "use client"
 *
 * @returns number | null - ID del usuario o null si no autenticado
 */
export const useCurrentUserId = (): number | null => {
  const user = useUserStore((state) => state.user);
  return useMemo(() => user?.id || null, [user?.id]);
};

/**
 * Hook para obtener toda la información del usuario actual
 *
 * @returns Usuario | null - Información completa del usuario o null
 */
export const useCurrentUser = (): Usuario | null => {
  return useUserStore((state) => state.user);
};

/**
 * Hook para obtener propiedades específicas del usuario
 * Optimizado para re-renders mínimos
 *
 * @param selector - Función selectora para extraer propiedades específicas
 * @returns T | null - Propiedad seleccionada o null
 */
export const useUserProperty = <T>(selector: (user: Usuario) => T): T | null => {
  return useUserStore((state) => (state.user ? selector(state.user) : null));
};

/**
 * Hook para obtener el username del usuario actual
 *
 * @returns string | null - Username o null si no autenticado
 */
export const useCurrentUsername = (): string | null => {
  return useUserProperty((user) => user.username);
};

/**
 * Hook para verificar si el usuario está autenticado
 *
 * @returns boolean - true si está autenticado, false si no
 */
export const useIsAuthenticated = (): boolean => {
  const user = useUserStore((state) => state.user);
  return useMemo(() => !!user?.id, [user?.id]);
};
