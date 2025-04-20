import { IQuiz, IQuizDTO } from './types';

export const parserQuiz = (quiz: IQuizDTO[]): IQuiz[] => {
  return quiz.map((item) => ({
    id: item.id,
    question: item.enunciado,
    options: item.opciones.map((option) => ({
      option: option.opcion,
      correctAnswer: option.correcta,
    })),
    explanation: item.explicacion,
  }));
};

export const explicationBackUp = `Lo sentimos, no pudimos generar una explicación en este momento. 
Intenta buscar información sobre el tema para mejorar el concepto.`;

export const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};
