import { IQuiz } from './types';

export const questionsMock = (topic: string): IQuiz[] => [
  {
    id: 1,
    question: `¿Cuál es un tema importante en ${topic}?`,
    options: ['Opción A', 'Opción B', 'Opción C', 'Opción D', 'Opción E'],
    correctAnswer: 'Opción C',
  },
  {
    id: 2,
    question: `¿Quién es una figura destacada en ${topic}?`,
    options: ['Persona A', 'Persona B', 'Persona C', 'Persona D', 'Persona E'],
    correctAnswer: 'Persona B',
  },
  {
    id: 3,
    question: `¿En qué año ocurrió un evento importante en ${topic}?`,
    options: ['1950', '1970', '1990', '2000', '2010'],
    correctAnswer: '1990',
  },
  {
    id: 4,
    question: `¿Cuál es un concepto fundamental en ${topic}?`,
    options: ['Concepto A', 'Concepto B', 'Concepto C', 'Concepto D', 'Concepto E'],
    correctAnswer: 'Concepto D',
  },
  {
    id: 5,
    question: `¿Dónde se originó un aspecto importante de ${topic}?`,
    options: ['Lugar A', 'Lugar B', 'Lugar C', 'Lugar D', 'Lugar E'],
    correctAnswer: 'Lugar A',
  },
];

export const explicationMock = (currentQuestion: IQuiz) =>
  `Lo sentimos, no pudimos generar una explicación en este momento. 
      
La respuesta correcta es: ${currentQuestion.correctAnswer}

Intenta buscar más información sobre este tema para entender mejor el concepto.`;
