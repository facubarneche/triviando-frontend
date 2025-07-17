import { IFeedbackDTO, LetterType } from '../(pages)/[username]/quiz/[topic]/types';
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

  generateQuiz = (topic: string, userId: number) =>
    this.axiosService.post(`/preguntas/generate`, {
      topic,
      userId,
      promptType: 'questionPrompter',
    });

  sendFeedback = async (feedbackData: IFeedbackDTO) => {
    const userId = loginService.getUserId();
    this.axiosService.post('/preguntas/send-feedback', {
      ...feedbackData,
      userId,
    });
  };
}

export const quizService = new QuizService();
