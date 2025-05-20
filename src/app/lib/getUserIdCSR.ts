/**
 * Recupera el ID del usuario desde las cookies del lado del cliente.
 *
 * @returns El ID del usuario si se encuentra, o `null` si no está presente.
 *
 * La función accede a la cookie `usuario`, analiza su valor como JSON
 * y extrae la propiedad `id`. Si la cookie no está configurada o no se puede analizar,
 * devuelve `null`.
 */
export const getUserIdCSR = () => {
  const cookies = document.cookie.split('; ').find((row) => row.startsWith('usuario='));
  const user = cookies ? cookies.split('=')[1] : null;
  return user ? JSON.parse(decodeURIComponent(user)).id : null;
};
