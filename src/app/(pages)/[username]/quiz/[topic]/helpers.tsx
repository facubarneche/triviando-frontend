import { IQuiz, IQuizDTO } from './types';

export const parserQuiz = (quiz: IQuizDTO[]): IQuiz[] => {
  return quiz.map((item) => ({
    id: item.id,
    question: item.enunciado,
    options: item.options,
    explanation: item.explicacion,
    difficulty: item.difficulty,
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

export const feedbackOptions = [
  {
    id: 'incorrect-answer',
    label: 'La respuesta correcta no es correcta',
    description: 'La respuesta marcada como correcta está equivocada',
  },
  {
    id: 'wrong-topic',
    label: 'La pregunta no corresponde al tema',
    description: 'Esta pregunta no está relacionada con el tema seleccionado',
  },
  {
    id: 'unclear-question',
    label: 'La pregunta no está clara',
    description: 'La pregunta es confusa o está mal redactada',
  },
  {
    id: 'multiple-correct',
    label: 'Hay múltiples respuestas correctas',
    description: 'Más de una opción podría ser considerada correcta',
  },
  {
    id: 'other',
    label: 'Otro problema',
    description: 'Describe el problema específico que encontraste',
  },
];