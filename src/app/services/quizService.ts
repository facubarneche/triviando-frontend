import { BaseService } from './baseService';

class QuizService extends BaseService {
  getQuiz = async (topic: string) => {
    const { data } = await this.axiosService.get('/preguntas', {
      params: { topico: topic },
    });

    return data;
  };

  //TODO: Tipar
  getQuizAnswer = async (body: any) => {
    const { data } = await this.axiosService.post('/answers', body);

    return data;
  };
}

export const quizService = new QuizService();
