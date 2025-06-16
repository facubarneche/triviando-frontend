import LearnTogether from '@/app/(pages)/quiz/[topic]/components/LearnTogether';
import { IQuiz } from '@/app/(pages)/quiz/[topic]/types';
import { render, screen, fireEvent } from '@testing-library/react';

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

// Use a unique question for the last test to avoid duplicate keys
const mockQuestion2: IQuiz = {
  id: 'idquestion2',
  question: '¿Cuál es la capital de Alemania?',
  options: [
    { id: 'id5', letter: 'A', text: 'Berlín' },
    { id: 'id6', letter: 'B', text: 'Madrid' },
    { id: 'id7', letter: 'C', text: 'París' },
    { id: 'id8', letter: 'D', text: 'Londres' },
  ],
  explanation: 'Berlín es la capital de Alemania.',
  difficulty: 'LOW',
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

  it('muestra el loader y el mensaje cuando isLoadingExplanation es true', () => {
    render(
      <LearnTogether
        showExplanation={true}
        setShowExplanation={jest.fn()}
        isLoadingExplanation={true}
        currentQuestion={mockQuestion}
        explanation=""
        correctOption={{ text: 'París', letter: 'C' }}
      />,
    );

    expect(screen.getByText('Generando explicación...')).toBeInTheDocument();
    // Check for the SVG loader by its class or by its container
    expect(document.querySelector('svg.lucide-loader-circle')).toBeInTheDocument();
  });

  it('no muestra el diálogo cuando showExplanation es false', () => {
    render(
      <LearnTogether
        showExplanation={false}
        setShowExplanation={jest.fn()}
        isLoadingExplanation={false}
        currentQuestion={mockQuestion}
        explanation={mockQuestion.explanation}
        correctOption={{ text: 'París', letter: 'C' }}
      />,
    );
    expect(screen.queryByText('Aprendamos juntos')).not.toBeInTheDocument();
  });

  it('llama a setShowExplanation(false) al hacer click en "Entendido"', () => {
    const setShowExplanation = jest.fn();
    const explanation = 'Berlín es la capital de Alemania.';
    render(
      <LearnTogether
        showExplanation={true}
        setShowExplanation={setShowExplanation}
        isLoadingExplanation={false}
        currentQuestion={mockQuestion2}
        explanation={explanation}
        correctOption={{ text: 'Berlín', letter: 'A' }}
      />,
    );
    // Simula el click en el botón "Entendido"
    const button = screen.getByRole('button', { name: /entendido/i });
    fireEvent.click(button);
    expect(setShowExplanation).toHaveBeenCalledWith(false);
  });
});
