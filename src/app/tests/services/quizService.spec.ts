/* eslint-disable @typescript-eslint/no-explicit-any */
import { quizService } from '../../services/quizService';

// Mock useUserStore
jest.mock('../../stores/userStore', () => ({
  useUserStore: {
    getState: jest.fn(),
  },
}));

import { useUserStore } from '../../stores/userStore';

const mockGet = jest.fn();
const mockPost = jest.fn();

// Mock axiosService methods directly on the quizService instance
(quizService as any).axiosService = {
  get: mockGet,
  post: mockPost,
};

describe('quizService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getQuiz', () => {
    it('should call axiosService.get with correct params', async () => {
      (useUserStore.getState as jest.Mock).mockReturnValue({
        user: { id: 123 },
      });
      mockGet.mockResolvedValue({ data: { quiz: 'data' } });

      const result = await quizService.getQuiz('math');

      expect(useUserStore.getState).toHaveBeenCalled();
      expect(mockGet).toHaveBeenCalledWith('/preguntas', {
        params: { topico: 'math', userId: 123 },
      });
      expect(result).toEqual({ quiz: 'data' });
    });
  });

  describe('getQuizAnswer', () => {
    it('should call axiosService.post with correct body', async () => {
      const body = {
        user: { id: 1 },
        questionId: 'q1',
        optionSelected: 'A' as any,
        millisecondsSpent: 1000,
      };
      mockPost.mockResolvedValue({ data: { correct: true } });

      const result = await quizService.getQuizAnswer(body);

      expect(mockPost).toHaveBeenCalledWith('/answers', body);
      expect(result).toEqual({ correct: true });
    });
  });

  describe('generateQuiz', () => {
    it('should call axiosService.post with correct payload', async () => {
      mockPost.mockResolvedValue({ data: { generated: true } });

      await quizService.generateQuiz('science');

      expect(mockPost).toHaveBeenCalledWith('/preguntas/generate', {
        topic: 'science',
        promptType: 'questionPrompter',
      });
    });
  });
});
