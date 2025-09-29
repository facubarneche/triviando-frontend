/**
 * Server-Side Authentication Utilities
 * Para uso exclusivo en Server Components y Server Actions
 */

import { cookies } from 'next/headers';
import { decodeJwtToken, type JwtClaims } from '@/app/security/jwtUtils';

/**
 * Obtiene el ID del usuario en contexto Server-Side (SSR/SSG)
 *
 * USAR SOLO EN:
 * - Server Components
 * - Server Actions
 * - API Routes
 * - Middleware
 *
 * @returns Promise<number | null> - ID del usuario o null si no autenticado
 */
export const getUserIdSSR = async (): Promise<number | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return null;
    }

    const decoded: JwtClaims = decodeJwtToken(token);
    return decoded.id || null;
  } catch (error) {
    console.error('Error getting userId in SSR:', error);
    return null;
  }
};

/**
 * Obtiene el token JWT completo en contexto Server-Side
 *
 * @returns Promise<string | null> - Token JWT o null si no existe
 */
export const getTokenSSR = async (): Promise<string | null> => {
  try {
    const cookieStore = await cookies();
    return cookieStore.get('token')?.value || null;
  } catch (error) {
    console.error('Error getting token in SSR:', error);
    return null;
  }
};

/**
 * Obtiene toda la información del usuario decodificada del JWT en SSR
 *
 * @returns Promise<JwtClaims | null> - Claims del usuario o null
 */
export const getUserClaimsSSR = async (): Promise<JwtClaims | null> => {
  try {
    const token = await getTokenSSR();

    if (!token) {
      return null;
    }

    return decodeJwtToken(token);
  } catch (error) {
    console.error('Error getting user claims in SSR:', error);
    return null;
  }
};
