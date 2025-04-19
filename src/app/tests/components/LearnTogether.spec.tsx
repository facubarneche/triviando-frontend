import LearnTogether from '@/app/(pages)/quiz/[topicId]/components/LearnTogether';
import { IQuiz } from '@/app/(pages)/quiz/[topicId]/types';
import { render, screen } from '@testing-library/react';

const mockQuestion: IQuiz = {
  id: 1,
  question: '¿Cuál es la capital de Francia?',
  correctAnswer: 'París',
  options: ['Madrid', 'París', 'Berlín', 'Roma'],
};

describe('LearnTogether component', () => {
  it('muestra la pregunta, respuesta y explicación cuando isLoadingExplanation es false', () => {
    const explanation = 'París es la capital porque...';

    render(
      <LearnTogether
        showExplanation={true}
        setShowExplanation={jest.fn()}
        isLoadingExplanation={false}
        currentQuestion={mockQuestion}
        explanation={explanation}
      />,
    );

    expect(screen.getByText('Pregunta:')).toBeInTheDocument();
    expect(screen.getByText(mockQuestion.question)).toBeInTheDocument();
    expect(screen.getByText('Respuesta correcta:')).toBeInTheDocument();
    expect(screen.getByText(mockQuestion.correctAnswer)).toBeInTheDocument();
    expect(screen.getByText('Explicación:')).toBeInTheDocument();
    expect(screen.getByText('París es la capital porque...')).toBeInTheDocument();
  });
});
