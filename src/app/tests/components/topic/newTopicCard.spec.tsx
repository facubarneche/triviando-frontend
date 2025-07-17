import NewTopicCard from '@/app/(pages)/[username]/topics/components/NewTopicCard';
import { render, fireEvent, screen } from '@testing-library/react';

describe('NewTopicCard', () => {
  const onCreateTopic = jest.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders card content', () => {
    render(<NewTopicCard onCreateTopic={onCreateTopic} />);
    expect(screen.getByText('Crear Nuevo Tema')).toBeInTheDocument();
    expect(screen.getByText('Personaliza tus preguntas')).toBeInTheDocument();
    expect(screen.getByText('Generado con IA')).toBeInTheDocument();
  });

  it('opens modal on card click', () => {
    render(<NewTopicCard onCreateTopic={onCreateTopic} />);
    fireEvent.click(
      screen.getByText('Crear Nuevo Tema').closest('div[class*="rounded-lg"]') as HTMLElement,
    );
    // Busca el modal por su rol de diálogo
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes modal when onClose is called', () => {
    render(<NewTopicCard onCreateTopic={onCreateTopic} />);
    // Open the modal first
    fireEvent.click(
      screen.getByText('Crear Nuevo Tema').closest('div[class*="rounded-lg"]') as HTMLElement,
    );
    // Now try to close the modal by clicking the close button (adjust the name if needed)
    fireEvent.click(screen.getByRole('button', { name: /cerrar|close/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('does not open modal if card is not clicked', () => {
    render(<NewTopicCard onCreateTopic={onCreateTopic} />);
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});
