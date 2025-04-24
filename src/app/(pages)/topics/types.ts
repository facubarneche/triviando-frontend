export interface ITopicDTO {
  id: string;
  topico: string;
  cantidadPreguntas: number;
}

export interface ITopic {
  id: string;
  name: string;
  icon: string;
  color: string;
  questionsCount: number;
}
