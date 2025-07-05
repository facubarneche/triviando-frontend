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
    } catch {
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
    } catch {
      // Failed to save avatar, continue silently
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
    } catch {
      // Failed to remove avatar, continue silently
    }
  }

  /**
   * Clear all avatars (useful for logout)
   */
  clearAllAvatars(): void {
    try {
      localStorage.removeItem(AVATAR_STORAGE_KEY);
    } catch {
      // Failed to clear avatars, continue silently
    }
  }
}

export const avatarService = new AvatarService();
