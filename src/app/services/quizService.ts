import { LetterType } from '../(pages)/[username]/quiz/[topic]/types';
import { BaseService } from './baseService';
import { loginService } from './loginService';

interface IAnswerRequestDTO {
  user: { id: number };
  questionId: string;
  optionSelected: LetterType;
  millisecondsSpent: number;
}

class QuizService extends BaseService {
  getQuiz = async (topic: string) => {
    const userId = loginService.getUserId();
    const { data } = await this.axiosService.get('/preguntas', {
      params: { topico: topic, userId: userId },
    });

    return data;
  };

  getQuizAnswer = async (body: IAnswerRequestDTO) => {
    const { data } = await this.axiosService.post('/answers', body);
    return data;
  };

  generateQuiz = (topic: string) =>
    this.axiosService.post(`/preguntas/generate`, {
      topic,
      promptContext: '',
      promptType: 'questionPrompter',
    });
}

export const quizService = new QuizService();
