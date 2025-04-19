import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProblemModal from '@/app/(pages)/quiz/[topicId]/components/ProblemModal';
import { useRouter } from 'next/navigation';

// Mock del router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('ProblemModal', () => {
  it('muestra el mensaje de error y el botón de volver', async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(<ProblemModal />);

    expect(screen.getByText('No se pudieron cargar las preguntas')).toBeInTheDocument();
    expect(
      screen.getByText('Hubo un problema al generar el quiz. Por favor, intenta de nuevo.'),
    ).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /volver a temas/i });
    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(pushMock).toHaveBeenCalledWith('/topics');
  });
});
