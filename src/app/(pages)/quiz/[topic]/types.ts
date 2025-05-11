//TODO: Ver si iba null o no
type LetterType = 'A' | 'B' | 'C' | 'D';
type DifficultyType = 'LOEW' | 'MEDIUM' | 'HIGH';

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
