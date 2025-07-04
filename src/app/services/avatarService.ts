/**
 * Avatar management service for handling user avatars locally
 * Uses localStorage to persist avatar associations with user IDs
 */

const AVATAR_STORAGE_KEY = 'user_avatars';

interface UserAvatarData {
  [userId: number]: string; // userId -> cloudinary public_id
}

class AvatarService {
  /**
   * Get user avatar public_id from localStorage
   */
  getUserAvatar(userId: number): string | null {
    try {
      const avatarsData = localStorage.getItem(AVATAR_STORAGE_KEY);
      if (!avatarsData) return null;

      const avatars: UserAvatarData = JSON.parse(avatarsData);
      return avatars[userId] || null;
    } catch (error) {
      console.error('Error getting user avatar:', error);
      return null;
    }
  }

  /**
   * Save user avatar public_id to localStorage
   */
  saveUserAvatar(userId: number, publicId: string): void {
    try {
      const avatarsData = localStorage.getItem(AVATAR_STORAGE_KEY);
      const avatars: UserAvatarData = avatarsData ? JSON.parse(avatarsData) : {};

      avatars[userId] = publicId;
      localStorage.setItem(AVATAR_STORAGE_KEY, JSON.stringify(avatars));
    } catch (error) {
      console.error('Error saving user avatar:', error);
    }
  }

  /**
   * Remove user avatar from localStorage
   */
  removeUserAvatar(userId: number): void {
    try {
      const avatarsData = localStorage.getItem(AVATAR_STORAGE_KEY);
      if (!avatarsData) return;

      const avatars: UserAvatarData = JSON.parse(avatarsData);
      delete avatars[userId];
      localStorage.setItem(AVATAR_STORAGE_KEY, JSON.stringify(avatars));
    } catch (error) {
      console.error('Error removing user avatar:', error);
    }
  }

  /**
   * Clear all avatars (useful for logout)
   */
  clearAllAvatars(): void {
    try {
      localStorage.removeItem(AVATAR_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing avatars:', error);
    }
  }
}

export const avatarService = new AvatarService();
