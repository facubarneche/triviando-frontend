import { useUserStore } from '../stores/userStore';
import { userService } from '../services/userService';
import type { IUserData } from '../services/userService';

/**
 * Get user data by ID
 * @param userId - Optional user ID, if not provided will use current user from store
 * @returns Promise<IUserData | null>
 */
export const getUserWithAvatar = async (userId?: number): Promise<IUserData | null> => {
  try {
    const id = userId || useUserStore.getState().user?.id;
    if (!id) return null;

    const userData = await userService.getUserById(id);
    return userData;
  } catch {
    return null;
  }
};
