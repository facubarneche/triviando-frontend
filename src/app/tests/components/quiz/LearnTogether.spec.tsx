import LearnTogether from '@/app/(pages)/quiz/[topic]/components/LearnTogether';
import { IQuiz } from '@/app/(pages)/quiz/[topic]/types';
import { render, screen } from '@testing-library/react';

const mockQuestion: IQuiz = {
  id: 'idquestion1',
  question: '¿Cuál es la capital de Francia?',
  options: [
    { id: 'id1', letter: 'A', text: 'Berlín' },
    { id: 'id2', letter: 'B', text: 'Madrid' },
    { id: 'id3', letter: 'C', text: 'París' },
    { id: 'id4', letter: 'D', text: 'Londres' },
  ],
  explanation: 'París es la capital porque...',
  difficulty: 'MEDIUM',
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
        correctOption={{ text: 'París', letter: 'C' }}
      />,
    );

    expect(screen.getByText('Pregunta:')).toBeInTheDocument();
    expect(screen.getByText(mockQuestion.question)).toBeInTheDocument();
    expect(screen.getByText('Respuesta correcta:')).toBeInTheDocument();
    expect(screen.getByText(mockQuestion.options[2].text)).toBeInTheDocument();
    expect(screen.getByText('Explicación:')).toBeInTheDocument();
    expect(screen.getByText('París es la capital porque...')).toBeInTheDocument();
  });
});
