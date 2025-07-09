import { BaseService } from './baseService';

class LeaderBoardService extends BaseService {
  private readonly getUserPosition = (userId?: number) => (userId ? `/${userId}` : '');

  getWeeklyRanking = async ({
    userId,
    page,
    token,
  }: {
    userId?: number;
    page: number;
    token: string;
  }) => {
    const { data } = await this.axiosService.get(
      `/users/ranking-semanal${this.getUserPosition(userId)}`,
      { params: { page }, headers: { Authorization: `Bearer ${token}` } },
    );
    return data;
  };

  getHistoricalRanking = async ({
    userId,
    page,
    token,
  }: {
    userId?: number;
    page: number;
    token: string;
  }) => {
    const { data } = await this.axiosService.get(`/users/ranking${this.getUserPosition(userId)}`, {
      params: { page },
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  };
}

export const leaderBoardService = new LeaderBoardService();
