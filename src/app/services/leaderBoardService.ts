import { BaseService } from './baseService';

class LeaderBoardService extends BaseService {
  private readonly getUserPosition = (userId?: number) => (userId ? `/${userId}` : '');

  getHistoricalRanking = async ({ userId, page }: { userId?: number; page: number }) => {
    const { data } = await this.axiosService.get(`/users/ranking${this.getUserPosition(userId)}`, {
      params: { page },
    });
    return data;
  };
}

export const leaderBoardService = new LeaderBoardService();
