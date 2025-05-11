import { BaseService } from './baseService';

class QuizService extends BaseService {
  getQuiz = async (topic: string) => {
    const { data } = await this.axiosService.get('/preguntas', {
      params: { topico: topic },
    });

    return data;
  };
}

export const quizService = new QuizService();
