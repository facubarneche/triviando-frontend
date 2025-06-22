/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, fireEvent, screen } from '@testing-library/react';
import NewTopicCard from '@/app/(pages)/[username]/topics/components/NewTopicCard';

jest.mock('@/app/(pages)/topics/components/NewTopicModal', () => {
  const MockNewTopicModal = (props: any) =>
    props.isOpen ? (
      <div data-testid="modal">
        <button onClick={() => props.onClose()}>Close</button>
        <button onClick={() => props.onCreateTopic({ name: 'Test', context: 'Context' })}>
          Create
        </button>
      </div>
    ) : null;
  MockNewTopicModal.displayName = 'MockNewTopicModal';
  return MockNewTopicModal;
});

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
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('closes modal when onClose is called', () => {
    render(<NewTopicCard onCreateTopic={onCreateTopic} />);
    fireEvent.click(
      screen.getByText('Crear Nuevo Tema').closest('div[class*="rounded-lg"]') as HTMLElement,
    );
    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('calls onCreateTopic when modal create is triggered', async () => {
    render(<NewTopicCard onCreateTopic={onCreateTopic} />);
    fireEvent.click(
      screen.getByText('Crear Nuevo Tema').closest('div[class*="rounded-lg"]') as HTMLElement,
    );
    fireEvent.click(screen.getByText('Create'));
    expect(onCreateTopic).toHaveBeenCalledWith('Test', 'Context');
  });

  it('does not open modal if card is not clicked', () => {
    render(<NewTopicCard onCreateTopic={onCreateTopic} />);
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});
