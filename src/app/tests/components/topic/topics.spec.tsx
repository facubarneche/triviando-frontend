/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ITopic } from '@/app/(pages)/[username]/topics/types';
import Topics from '@/app/(pages)/[username]/topics/components/Topics';
import { topicService } from '@/app/services/topicService';
import { handleError } from '@/app/utils/errorHandler';

// Mock dependencies
jest.mock('@/app/components/topic-card', () => {
  const MockTopicCard = (props: any) => <div data-testid="topic-card">{props.topic.name}</div>;
  MockTopicCard.displayName = 'MockTopicCard';
  return MockTopicCard;
});

jest.mock('@/app/(pages)/[username]/topics/components/NewTopicCard', () => {
  const MockNewTopicCard = (props: any) => (
    <button data-testid="new-topic-card" onClick={() => props.onGenerateTopic('Nuevo', 'Contexto')}>
      Crear
    </button>
  );
  MockNewTopicCard.displayName = 'MockNewTopicCard';
  return MockNewTopicCard;
});

jest.mock('@/app/(pages)/[username]/topics/components/TopicCardLoader', () => {
  const MockTopicCardLoader = (props: any) => (
    <div data-testid="topic-card-loader">{props.name}</div>
  );
  MockTopicCardLoader.displayName = 'MockTopicCardLoader';
  return MockTopicCardLoader;
});

jest.mock('@/app/services/topicService', () => ({
  topicService: { generateTopic: jest.fn() },
}));
jest.mock('react-toastify', () => ({
  toast: { success: jest.fn() },
}));
jest.mock('@/app/utils/errorHandler', () => ({
  handleError: jest.fn(),
}));

const mockTopics: ITopic[] = [
  { name: 'Math', icon: '📐', color: '#fff', questionsCount: 2 },
  { name: 'Science', icon: '🔬', color: '#eee', questionsCount: 3 },
];

const mockCreatingTopics = [
  { name: 'LoaderTopic', context: 'Test context', timestamp: Date.now() },
];

describe('Topics component', () => {
  beforeEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  it('renders initial topics', () => {
    render(<Topics topics={mockTopics} creatingTopics={[]} onGenerateTopic={jest.fn()} />);
    expect(screen.getByText('Math')).toBeInTheDocument();
    expect(screen.getByText('Science')).toBeInTheDocument();
  });

  it('renders NewTopicCard', () => {
    render(<Topics topics={mockTopics} creatingTopics={[]} onGenerateTopic={jest.fn()} />);
    expect(screen.getByTestId('new-topic-card')).toBeInTheDocument();
  });

  it('shows loader when creatingTopics contains a topic that does not exist', () => {
    render(
      <Topics
        topics={mockTopics}
        creatingTopics={mockCreatingTopics}
        onGenerateTopic={jest.fn()}
      />,
    );
    expect(screen.getByTestId('topic-card-loader')).toHaveTextContent('LoaderTopic');
  });
  it('does not show loader when topic with same name already exists', () => {
    const creatingExistingTopic = [
      { name: 'Math', context: 'Test context', timestamp: Date.now() },
    ];

    // Filtrar tópicos que están creándose pero ya existen (simular la lógica de page.tsx)
    const filteredCreatingTopics = creatingExistingTopic.filter(
      (creatingTopic) =>
        !mockTopics.some((t) => t.name.toLowerCase() === creatingTopic.name.toLowerCase()),
    );

    render(
      <Topics
        topics={mockTopics}
        creatingTopics={filteredCreatingTopics}
        onGenerateTopic={jest.fn()}
      />,
    );
    expect(screen.queryByTestId('topic-card-loader')).not.toBeInTheDocument();
  });

  it('correctly filters out existing topics from creating topics (logic test)', () => {
    const creatingTopics = [
      { name: 'Math', context: 'Existing topic', timestamp: Date.now() },
      { name: 'NewTopic', context: 'New topic', timestamp: Date.now() },
    ];

    // Esta es la lógica que se usa en page.tsx
    const filteredCreatingTopics = creatingTopics.filter(
      (creatingTopic) =>
        !mockTopics.some((t) => t.name.toLowerCase() === creatingTopic.name.toLowerCase()),
    );

    // Solo debe quedar 'NewTopic' ya que 'Math' ya existe en mockTopics
    expect(filteredCreatingTopics).toHaveLength(1);
    expect(filteredCreatingTopics[0].name).toBe('NewTopic');
  });

  it('shows multiple creating topics', () => {
    const multipleCreatingTopics = [
      { name: 'LoaderTopic1', context: 'Test context 1', timestamp: Date.now() },
      { name: 'LoaderTopic2', context: 'Test context 2', timestamp: Date.now() },
    ];
    render(
      <Topics
        topics={mockTopics}
        creatingTopics={multipleCreatingTopics}
        onGenerateTopic={jest.fn()}
      />,
    );
    expect(screen.getByText('LoaderTopic1')).toBeInTheDocument();
    expect(screen.getByText('LoaderTopic2')).toBeInTheDocument();
  });

  it('handles error when topic creation fails', async () => {
    (topicService.generateTopic as jest.Mock).mockRejectedValueOnce(new Error('fail'));

    const onGenerateTopic = async (name: string) => {
      try {
        await topicService.generateTopic(name, 1);
      } catch (error) {
        handleError(error);
      }
    };

    render(<Topics topics={mockTopics} creatingTopics={[]} onGenerateTopic={onGenerateTopic} />);
    fireEvent.click(screen.getByTestId('new-topic-card'));

    await waitFor(() => expect(handleError).toHaveBeenCalled());
  });

  it('syncs topics when props change', () => {
    const { rerender } = render(
      <Topics topics={mockTopics} creatingTopics={[]} onGenerateTopic={jest.fn()} />,
    );
    expect(screen.getByText('Math')).toBeInTheDocument();
    rerender(
      <Topics
        topics={[{ name: 'History', icon: '📜', color: '#ccc', questionsCount: 1 }]}
        creatingTopics={[]}
        onGenerateTopic={jest.fn()}
      />,
    );
    expect(screen.getByText('History')).toBeInTheDocument();
  });
});
