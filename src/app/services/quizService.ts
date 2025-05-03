import { BaseService } from './baseService';

class QuizService extends BaseService {
  getQuiz = async (topicId: string) => {
    const { data } = await this.axiosService.get('/preguntas', {
      params: { topico: topicId },
    });

    return data;
  };
}

export const quizService = new QuizService();
