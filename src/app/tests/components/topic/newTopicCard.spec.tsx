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

  it('calls onCreateTopic when modal create is triggered', async () => {
    render(<NewTopicCard onCreateTopic={onCreateTopic} />);
    // Open the modal first by clicking the card
    fireEvent.click(
      screen.getByText('Crear Nuevo Tema').closest('div[class*="rounded-lg"]') as HTMLElement,
    );
    // Fill in required fields before clicking "crear"
    fireEvent.change(screen.getByLabelText(/nombre del tema/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/contexto/i), { target: { value: 'Context' } });
    // Now click the "crear" button inside the modal
    fireEvent.click(screen.getByRole('button', { name: /crear/i }));
    // Ajusta los argumentos según lo que espera el componente
    expect(onCreateTopic).toHaveBeenCalledWith('Test', 'Context');
  });

  it('does not open modal if card is not clicked', () => {
    render(<NewTopicCard onCreateTopic={onCreateTopic} />);
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});
