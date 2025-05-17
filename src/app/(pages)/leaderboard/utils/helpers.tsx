import { getUserId } from '@/app/lib/getUserId';

export const styledRank = (rank: number) => {
  const rankStyles: Record<number, string> = {
    1: 'bg-yellow-400 text-yellow-900',
    2: 'bg-gray-300 text-gray-700',
    3: 'bg-amber-700 text-amber-100',
  };

  return rankStyles[rank] || 'bg-purple-400';
};

export const parseLeaderboardData = (users: ILeaderBoardContentDTO[]): ILeaderContentBoard[] => {
  return users.map((user) => ({
    rank: user.position,
    username: user.fullName,
    score: user.score,
    avatar: '/placeholder-user.jpg',
  }));
};

export const getProp = async (page: number) => {
  return page ? { page } : { page, userId: await getUserId() };
};
