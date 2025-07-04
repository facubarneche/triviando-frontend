import { v2 as cloudinary } from 'cloudinary';

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Servicio server-side para obtener avatares de múltiples usuarios desde Cloudinary
 */
export class CloudinaryServerService {
  /**
   * Obtiene los avatares de múltiples usuarios por sus IDs
   */
  static async getUsersAvatars(userIds: number[]): Promise<Record<number, string | null>> {
    const avatars: Record<number, string | null> = {};

    try {
      // Buscar avatares en paralelo para todos los usuarios
      const promises = userIds.map(async (userId) => {
        try {
          const result = await cloudinary.search
            .expression(`tags:user_${userId} AND tags:avatar`)
            .sort_by('created_at', 'desc')
            .max_results(1)
            .execute();

          if (result.resources && result.resources.length > 0) {
            return { userId, avatar: result.resources[0].public_id };
          }
          return { userId, avatar: null };
        } catch (error) {
          console.error(`Error fetching avatar for user ${userId}:`, error);
          return { userId, avatar: null };
        }
      });

      const results = await Promise.all(promises);

      // Convertir array de resultados a objeto
      results.forEach(({ userId, avatar }) => {
        avatars[userId] = avatar;
      });

      return avatars;
    } catch (error) {
      console.error('Error fetching users avatars:', error);
      // Devolver objeto vacío si hay error
      return userIds.reduce((acc, userId) => {
        acc[userId] = null;
        return acc;
      }, {} as Record<number, string | null>);
    }
  }

  /**
   * Obtiene el avatar de un usuario específico
   */
  static async getUserAvatar(userId: number): Promise<string | null> {
    const avatars = await this.getUsersAvatars([userId]);
    return avatars[userId] || null;
  }
}
