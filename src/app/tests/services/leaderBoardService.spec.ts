import { leaderBoardService } from '../../services/leaderBoardService';

// 🔧 MOCK DE nookies para evitar token undefined
jest.mock('nookies', () => ({
  parseCookies: jest.fn(() => ({
    usuario: JSON.stringify({ token: 'fake-test-token' }),
  })),
}));

// 🔧 MOCK de BaseService
jest.mock('../../services/baseService', () => {
  return {
    BaseService: class {
      axiosService = {
        get: jest.fn(),
      };
      token = 'fake-test-token';
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

      const result = await leaderBoardService.getWeeklyRanking({
        page: 2,
        token: 'fake-test-token',
      });

      expect(mockedAxiosGet).toHaveBeenCalledWith('/users/ranking-semanal', {
        params: { page: 2 },
        headers: { Authorization: 'Bearer fake-test-token' },
      });
      expect(result).toBe(mockData);
    });

    it('should call correct endpoint with userId', async () => {
      mockedAxiosGet.mockResolvedValueOnce({ data: mockData });

      const result = await leaderBoardService.getWeeklyRanking({
        userId: 5,
        page: 1,
        token: 'fake-test-token',
      });

      expect(mockedAxiosGet).toHaveBeenCalledWith('/users/ranking-semanal/5', {
        params: { page: 1 },
        headers: { Authorization: 'Bearer fake-test-token' },
      });
      expect(result).toBe(mockData);
    });
  });

  describe('getHistoricalRanking', () => {
    it('should call correct endpoint without userId', async () => {
      mockedAxiosGet.mockResolvedValueOnce({ data: mockData });

      const result = await leaderBoardService.getHistoricalRanking({
        page: 3,
        token: 'fake-test-token',
      });

      expect(mockedAxiosGet).toHaveBeenCalledWith('/users/ranking', {
        params: { page: 3 },
        headers: { Authorization: 'Bearer fake-test-token' },
      });
      expect(result).toBe(mockData);
    });

    it('should call correct endpoint with userId', async () => {
      mockedAxiosGet.mockResolvedValueOnce({ data: mockData });

      const result = await leaderBoardService.getHistoricalRanking({
        userId: 10,
        page: 4,
        token: 'fake-test-token',
      });

      expect(mockedAxiosGet).toHaveBeenCalledWith('/users/ranking/10', {
        params: { page: 4 },
        headers: { Authorization: 'Bearer fake-test-token' },
      });
      expect(result).toBe(mockData);
    });
  });
});
