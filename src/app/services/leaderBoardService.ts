import { BaseService } from './baseService';

class LeaderBoardService extends BaseService {
  getHistoricalRanking = async (userId: number) => {
    const { data } = await this.axiosService.get(`/api/v1/users/ranking/${userId}`);
    return data;
  };
}

export const leaderBoardService = new LeaderBoardService();
