import NewTopicCard from '@/app/(pages)/[username]/topics/components/NewTopicCard';
import { render, fireEvent, screen } from '@testing-library/react';

describe('NewTopicCard', () => {
  const onGenerateTopic = jest.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders card content', () => {
    render(<NewTopicCard onGenerateTopic={onGenerateTopic} />);
    expect(screen.getByText('Crear Nuevo Tema')).toBeInTheDocument();
    expect(screen.getByText('Personaliza tus preguntas')).toBeInTheDocument();
    expect(screen.getByText('Generado con IA')).toBeInTheDocument();
  });

  it('opens modal on card click', () => {
    render(<NewTopicCard onGenerateTopic={onGenerateTopic} />);
    const card =
      screen.getByText('Crear Nuevo Tema').closest('[role="button"]') ||
      screen.getByText('Crear Nuevo Tema').closest('.cursor-pointer');
    if (card) {
      fireEvent.click(card);
      // Busca el modal por su rol de diálogo
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    } else {
      // Si no encuentra el card, busca por el texto directamente
      fireEvent.click(screen.getByText('Crear Nuevo Tema'));
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    }
  });

  it('closes modal when onClose is called', () => {
    render(<NewTopicCard onGenerateTopic={onGenerateTopic} />);
    // Open the modal first
    const card =
      screen.getByText('Crear Nuevo Tema').closest('[role="button"]') ||
      screen.getByText('Crear Nuevo Tema').closest('.cursor-pointer');
    if (card) {
      fireEvent.click(card);
    } else {
      fireEvent.click(screen.getByText('Crear Nuevo Tema'));
    }
    // Now try to close the modal by clicking the close button (adjust the name if needed)
    fireEvent.click(screen.getByRole('button', { name: /cerrar|close/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('does not open modal if card is not clicked', () => {
    render(<NewTopicCard onGenerateTopic={onGenerateTopic} />);
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});
