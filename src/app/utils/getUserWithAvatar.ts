import { getUserId } from './getUserIdFromStore';
import { userService } from '../services/userService';
import type { IUserData } from '../services/userService';

/**
 * Get user avatar from userService by user ID from client side
 * This is used when we need the full user data including avatar in client components
 */
export const getUserWithAvatar = async (): Promise<IUserData | null> => {
  try {
    const userId = getUserId();
    if (!userId) return null;

    const userData = await userService.getUserById(userId);
    return userData;
  } catch {
    return null;
  }
};
