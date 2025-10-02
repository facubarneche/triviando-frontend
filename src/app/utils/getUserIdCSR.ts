import { jwtDecode } from 'jwt-decode';

interface JwtClaims {
  id: number;
  sub: string;
  fullname: string;
  account: 'FREE' | 'PREMIUM';
  exp: number;
}

/**
 * @deprecated Use useCurrentUserId() hook instead for React components
 *
 * Recupera el ID del usuario desde el token JWT en cookies del lado del cliente.
 *
 * @returns El ID del usuario si se encuentra, o `null` si no está presente.
 *
 * Para componentes React, usa: const userId = useCurrentUserId()
 * Esta función solo debe usarse en funciones utilitarias fuera de React.
 */
export const getUserIdCSR = () => {
  const cookies = document.cookie.split('; ').find((row) => row.startsWith('token='));
  const token = cookies ? cookies.split('=')[1] : null;

  if (!token) return null;

  try {
    const claims = jwtDecode<JwtClaims>(decodeURIComponent(token));

    // Verificar si el token ha expirado
    const currentTime = Math.floor(Date.now() / 1000);
    if (claims.exp < currentTime) {
      return null;
    }

    return claims.id;
  } catch {
    return null;
  }
};
