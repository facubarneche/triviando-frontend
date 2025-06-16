import { cookies } from 'next/headers';

/**
 * Recupera el ID del usuario desde las cookies renderizadas del lado del servidor (SSR).
 *
 * @returns Una promesa que resuelve con el ID del usuario si se encuentra, o `null` si no está presente.
 *
 * La función accede a la cookie `usuario`, analiza su valor como JSON
 * y extrae la propiedad `id`. Si la cookie no está configurada o no se puede analizar,
 * devuelve `null`.
 */
export const getUserId = async () => {
  const cookieStore = await cookies();
  const user = cookieStore.get('usuario')?.value;
  return user ? JSON.parse(user).id : null;
};
