import LearnTogether from '@/app/(pages)/quiz/[topicId]/components/LearnTogether';
import { IQuiz } from '@/app/(pages)/quiz/[topicId]/types';
import { render, screen } from '@testing-library/react';

const mockQuestion: IQuiz = {
  id: 'asdasdasdasd123123123',
  question: '¿Cuál es la capital de Francia?',
  options: [
    { option: 'Berlín', correctAnswer: false },
    { option: 'Madrid', correctAnswer: false },
    { option: 'París', correctAnswer: true },
    { option: 'Londres', correctAnswer: false },
  ],
  explanation: 'París es la capital porque...',
};

describe('LearnTogether component', () => {
  it('muestra la pregunta, respuesta y explicación cuando isLoadingExplanation es false', () => {
    render(
      <LearnTogether
        showExplanation={true}
        setShowExplanation={jest.fn()}
        isLoadingExplanation={false}
        currentQuestion={mockQuestion}
        explanation={mockQuestion.explanation}
      />,
    );

    expect(screen.getByText('Pregunta:')).toBeInTheDocument();
    expect(screen.getByText(mockQuestion.question)).toBeInTheDocument();
    expect(screen.getByText('Respuesta correcta:')).toBeInTheDocument();
    expect(screen.getByText(mockQuestion.options[2].option)).toBeInTheDocument();
    expect(screen.getByText('Explicación:')).toBeInTheDocument();
    expect(screen.getByText('París es la capital porque...')).toBeInTheDocument();
  });
});
