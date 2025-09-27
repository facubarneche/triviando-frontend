import { getUserId } from '../utils/getUserIdFromStore';

/**
 * Servicio para manejar avatares usando la API de Cloudinary
 */
export class CloudinaryAvatarService {
  private static instance: CloudinaryAvatarService;
  private cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  static getInstance(): CloudinaryAvatarService {
    if (!CloudinaryAvatarService.instance) {
      CloudinaryAvatarService.instance = new CloudinaryAvatarService();
    }
    return CloudinaryAvatarService.instance;
  }

  /**
   * Busca el avatar del usuario actual en Cloudinary usando el user_id en los metadatos
   */
  async getCurrentUserAvatar(): Promise<string | null> {
    const userId = getUserId();

    if (!userId) {
      return null;
    }

    try {
      // Usar nuestro endpoint de API interno para buscar el avatar
      const response = await fetch(`/api/user/avatar?userId=${userId}`);

      if (!response.ok) {
        return null;
      }

      const data = await response.json();

      // Devolver el public_id si existe
      return data.public_id || null;
    } catch {
      return null;
    }
  }

  /**
   * Obtiene las opciones para el upload widget con metadatos del usuario
   */
  getUploadOptions() {
    const userId = getUserId();
    if (!userId) return {};

    return {
      folder: 'avatars',
      resourceType: 'image' as const,
      clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
      maxFileSize: 10000000, // 10MB
      cropping: true,
      croppingAspectRatio: 1,
      context: {
        user_id: userId.toString(), // Metadatos para asociar con el usuario
        type: 'avatar',
      },
      tags: [`user_${userId}`, 'avatar'], // Tags para búsqueda
    };
  }
}

export const cloudinaryAvatarService = CloudinaryAvatarService.getInstance();
