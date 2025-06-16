import { leaderBoardService } from '../../services/leaderBoardService';

jest.mock('../../services/baseService', () => {
  return {
    BaseService: class {
      axiosService = {
        get: jest.fn(),
      };
    },
  };
});

describe('LeaderBoardService', () => {
  const mockData = { result: 'success' };
  const mockedAxiosGet = leaderBoardService['axiosService'].get as jest.Mock;

  beforeEach(() => {
    mockedAxiosGet.mockReset();
  });

  describe('getWeeklyRanking', () => {
    it('should call correct endpoint without userId', async () => {
      mockedAxiosGet.mockResolvedValueOnce({ data: mockData });
      const result = await leaderBoardService.getWeeklyRanking({ page: 2 });
      expect(mockedAxiosGet).toHaveBeenCalledWith('/users/ranking-semanal', {
        params: { page: 2 },
      });
      expect(result).toBe(mockData);
    });

    it('should call correct endpoint with userId', async () => {
      mockedAxiosGet.mockResolvedValueOnce({ data: mockData });
      const result = await leaderBoardService.getWeeklyRanking({ userId: 5, page: 1 });
      expect(mockedAxiosGet).toHaveBeenCalledWith('/users/ranking-semanal/5', {
        params: { page: 1 },
      });
      expect(result).toBe(mockData);
    });
  });

  describe('getHistoricalRanking', () => {
    it('should call correct endpoint without userId', async () => {
      mockedAxiosGet.mockResolvedValueOnce({ data: mockData });
      const result = await leaderBoardService.getHistoricalRanking({ page: 3 });
      expect(mockedAxiosGet).toHaveBeenCalledWith('/users/ranking', { params: { page: 3 } });
      expect(result).toBe(mockData);
    });

    it('should call correct endpoint with userId', async () => {
      mockedAxiosGet.mockResolvedValueOnce({ data: mockData });
      const result = await leaderBoardService.getHistoricalRanking({ userId: 10, page: 4 });
      expect(mockedAxiosGet).toHaveBeenCalledWith('/users/ranking/10', { params: { page: 4 } });
      expect(result).toBe(mockData);
    });
  });
});
