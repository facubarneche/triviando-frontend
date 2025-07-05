import { useState, useEffect } from 'react';
import { useUserStore } from '../stores/userStore';
import { cloudinaryAvatarService } from '../services/cloudinaryAvatarService';

/**
 * Hook para manejar el avatar del usuario logueado
 * Busca automáticamente en Cloudinary y mantiene el estado sincronizado
 */
export function useUserAvatar() {
  const [avatarPublicId, setAvatarPublicId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, setAvatar } = useUserStore();

  useEffect(() => {
    const loadUserAvatar = async () => {
      setLoading(true);

      // Primero verificar si ya tenemos el avatar en el store
      if (user?.avatar) {
        setAvatarPublicId(user.avatar);
        setLoading(false);
        return;
      }

      // Si no está en el store, buscar en Cloudinary
      const cloudinaryAvatar = await cloudinaryAvatarService.getCurrentUserAvatar();

      if (cloudinaryAvatar) {
        setAvatarPublicId(cloudinaryAvatar);
        // Actualizar el store con el avatar encontrado
        setAvatar(cloudinaryAvatar);
      }

      setLoading(false);
    };

    loadUserAvatar();
  }, [user?.id, user?.avatar, setAvatar]);

  /**
   * Actualiza el avatar y lo sincroniza con el store
   */
  const updateAvatar = (publicId: string) => {
    setAvatarPublicId(publicId);
    setAvatar(publicId);
  };

  return {
    avatarPublicId,
    loading,
    updateAvatar,
  };
}
