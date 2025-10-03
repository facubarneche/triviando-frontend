import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';

interface JwtClaims {
  id: number;
  sub: string;
  fullname: string;
  account: 'FREE' | 'PREMIUM';
  exp: number;
}

/**
 * Recupera el ID del usuario desde el token JWT en cookies del lado del servidor (SSR).
 *
 * @returns Una promesa que resuelve con el ID del usuario si se encuentra, o `null` si no está presente.
 *
 * La función accede a la cookie `token`, decodifica el JWT
 * y extrae la propiedad `id`. Si la cookie no está configurada o el token es inválido,
 * devuelve `null`.
 */
export const getUserId = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  try {
    const claims = jwtDecode<JwtClaims>(token);

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
