import { BaseService } from './baseService';

class LeaderBoardService extends BaseService {
  getUserPosition = (userId?: number) => (userId ? `/${userId}` : '');
  getHistoricalRanking = async ({ userId, page }: { userId?: number; page: number }) => {
    const { data } = await this.axiosService.get(
      `/api/v1/users/ranking${this.getUserPosition(userId)}`,
      {
        params: {
          size: 1, //TODO: Eliminar linea
          page,
        },
      },
    );
    return data;
  };
}

export const leaderBoardService = new LeaderBoardService();
