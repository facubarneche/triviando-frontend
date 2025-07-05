import { getUserIdCSR } from './getUserIdCSR';

/**
 * Genera el public_id para el avatar basado en el ID del usuario
 * @param userId - ID del usuario
 * @returns public_id para Cloudinary
 */
export function generateAvatarPublicId(userId: number): string {
  return `avatars/user_${userId}`;
}

/**
 * Obtiene el public_id del avatar para el usuario actual
 * @returns public_id del avatar o null si no hay usuario
 */
export function getCurrentUserAvatarPublicId(): string | null {
  const userId = getUserIdCSR();
  if (!userId) return null;

  return generateAvatarPublicId(userId);
}

/**
 * Verifica si existe un avatar para el usuario en Cloudinary
 * Esta función podría expandirse para hacer una verificación real a Cloudinary
 * @param userId - ID del usuario
 * @returns boolean indicando si existe el avatar
 */
export function hasUserAvatar(): boolean {
  // Por ahora, asumimos que si tenemos el ID, podemos intentar cargar el avatar
  // CldImage manejará el caso de que no exista
  return true;
}
