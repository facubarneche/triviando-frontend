/* eslint-disable @typescript-eslint/no-explicit-any */
import { topicService } from '../../services/topicService';

jest.mock('../../services/baseService', () => {
  class MockBaseService {
    axiosService = {
      get: jest.fn(),
      post: jest.fn(),
    };
  }
  return { BaseService: MockBaseService };
});

describe('TopicService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTopics', () => {
    it('should call axiosService.get with correct URL and return data', async () => {
      const mockData = { topics: ['math', 'science'] };
      (topicService as any).axiosService.get = jest.fn().mockResolvedValue({ data: mockData });

      const result = await topicService.getTopics({ id: 42 });

      expect((topicService as any).axiosService.get).toHaveBeenCalledWith('/preguntas/topicos/42');
      expect(result).toEqual(mockData);
    });
  });

  describe('createTopic', () => {
    it('should call axiosService.post with correct payload and return data', async () => {
      const mockData = { id: 1, topic: 'history' };
      (topicService as any).axiosService.post = jest.fn().mockResolvedValue({ data: mockData });

      const result = await topicService.createTopic('history', 'context info');

      expect((topicService as any).axiosService.post).toHaveBeenCalledWith('/preguntas/generate', {
        topic: 'history',
        promptContext: 'context info',
        promptType: 'topicPrompter',
      });
      expect(result).toEqual(mockData);
    });
  });

  describe('error handling', () => {
    it('should throw if getTopics fails', async () => {
      (topicService as any).axiosService.get = jest
        .fn()
        .mockRejectedValue(new Error('Network error'));
      await expect(topicService.getTopics({ id: 1 })).rejects.toThrow('Network error');
    });

    it('should throw if createTopic fails', async () => {
      (topicService as any).axiosService.post = jest
        .fn()
        .mockRejectedValue(new Error('Post error'));
      await expect(topicService.createTopic('fail', 'context')).rejects.toThrow('Post error');
    });
  });
});
