export type LetterType = 'A' | 'B' | 'C' | 'D';
type DifficultyType = 'LOW' | 'MEDIUM' | 'HIGH';

interface IOptionDTO {
  id: string;
  letter: LetterType;
  text: string;
}

interface IOption {
  id: string;
  letter: LetterType;
  text: string;
}

export interface IQuizDTO {
  id: string;
  topico: string;
  enunciado: string;
  options: IOptionDTO[];
  explicacion: string;
  difficulty: DifficultyType;
}

export interface IQuiz {
  id: string;
  question: string;
  options: IOption[];
  explanation: string;
  difficulty: DifficultyType;
}


export interface QuestionFeedbackProps {
  onFeedbackSubmit: (feedbackType: string, description?: string) => Promise<void>;
  disabled?: boolean;
}