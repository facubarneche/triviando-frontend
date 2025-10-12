import { IFeedbackDTO, LetterType } from '../(pages)/[username]/quiz/[topic]/types';
import { BaseService } from './baseService';
import { useUserStore } from '../stores/userStore';

interface IAnswerRequestDTO {
  user: { id: number };
  questionId: string;
  optionSelected: LetterType;
  millisecondsSpent: number;
}

class QuizService extends BaseService {
  getQuiz = async (topic: string) => {
    const userId = useUserStore.getState().user?.id;
    if (!userId) throw new Error('Usuario no autenticado');

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
      promptType: 'questionPrompter',
    });

  sendFeedback = async (feedbackData: IFeedbackDTO) => {
    const userId = useUserStore.getState().user?.id;
    if (!userId) throw new Error('Usuario no autenticado');

    this.axiosService.post('/preguntas/send-feedback', {
      ...feedbackData,
      userId,
    });
  };
}

export const quizService = new QuizService();
