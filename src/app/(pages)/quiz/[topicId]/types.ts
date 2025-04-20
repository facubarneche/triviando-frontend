interface IOptionDTO {
  opcion: string;
  correcta: boolean;
}

interface IOption {
  option: string;
  correctAnswer: boolean;
}

export interface IQuizDTO {
  id: string;
  topicId: string;
  enunciado: string;
  opciones: IOptionDTO[];
  explicacion: string;
}

export interface IQuiz {
  id: string;
  question: string;
  options: IOption[];
  explanation: string;
}
