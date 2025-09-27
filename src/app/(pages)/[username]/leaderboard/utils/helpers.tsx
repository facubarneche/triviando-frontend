import { useUserStore } from '@/app/stores/userStore';
import { CloudinaryServerService } from '@/app/services/cloudinaryServerService';

export const styledRank = (rank: number) => {
  const rankStyles: Record<number, string> = {
    1: 'bg-yellow-400 text-yellow-900',
    2: 'bg-gray-300 text-gray-700',
    3: 'bg-amber-700 text-amber-100',
  };

  return rankStyles[rank] || 'bg-purple-400';
};

export const parseLeaderboardData = async (
  users: ILeaderBoardContentDTO[],
): Promise<ILeaderContentBoard[]> => {
  // Extraer IDs de usuarios
  const userIds = users.map((user) => user.id);

  // Obtener avatares de Cloudinary
  const avatars = await CloudinaryServerService.getUsersAvatars(userIds);

  return users.map((user) => ({
    rank: user.position,
    username: user.username,
    score: user.score,
    avatar: avatars[user.id] || null,
    userId: user.id,
  }));
};

export const getProp = async (page: number) => {
  const userId = useUserStore.getState().user?.id;
  return page ? { page: page - 1 } : { page, userId };
};
