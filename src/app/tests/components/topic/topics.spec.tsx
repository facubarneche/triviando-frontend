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
    <button data-testid="new-topic-card" onClick={() => props.onCreateTopic('Nuevo', 'Contexto')}>
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
  topicService: { createTopic: jest.fn() },
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

describe('Topics component', () => {
  beforeEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  it('renders initial topics', () => {
    render(<Topics topics={mockTopics} creating="LoaderTopic" onCreateTopic={jest.fn()} />);
    expect(screen.getByText('Math')).toBeInTheDocument();
    expect(screen.getByText('Science')).toBeInTheDocument();
  });

  it('renders NewTopicCard', () => {
    render(<Topics topics={mockTopics} creating="LoaderTopic" onCreateTopic={jest.fn()} />);
    expect(screen.getByTestId('new-topic-card')).toBeInTheDocument();
  });

  it('shows loader when creating is passed and topic does not exist', () => {
    render(<Topics topics={mockTopics} creating="LoaderTopic" onCreateTopic={jest.fn()} />);
    expect(screen.getByTestId('topic-card-loader')).toHaveTextContent('LoaderTopic');
  });

  it('removes loader when topic with same name exists', () => {
    render(<Topics topics={mockTopics} creating="Math" onCreateTopic={jest.fn()} />);
    expect(screen.queryByTestId('topic-card-loader')).not.toBeInTheDocument();
  });

  it('handles error when topic creation fails', async () => {
    (topicService.createTopic as jest.Mock).mockRejectedValueOnce(new Error('fail'));

    const onCreateTopic = async (name: string, context: string) => {
      try {
        await topicService.createTopic(name, context);
      } catch (error) {
        handleError(error);
      }
    };

    render(<Topics topics={mockTopics} creating="LoaderTopic" onCreateTopic={onCreateTopic} />);
    fireEvent.click(screen.getByTestId('new-topic-card'));

    await waitFor(() => expect(handleError).toHaveBeenCalled());
  });

  it('syncs localTopics when props change', () => {
    const { rerender } = render(
      <Topics topics={mockTopics} creating="LoaderTopic" onCreateTopic={jest.fn()} />,
    );
    expect(screen.getByText('Math')).toBeInTheDocument();
    rerender(
      <Topics
        topics={[{ name: 'History', icon: '📜', color: '#ccc', questionsCount: 1 }]}
        creating="LoaderTopic"
        onCreateTopic={jest.fn()}
      />,
    );
    expect(screen.getByText('History')).toBeInTheDocument();
  });
});
