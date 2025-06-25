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
    render(<Topics topics={mockTopics} />);
    expect(screen.getByText('Math')).toBeInTheDocument();
    expect(screen.getByText('Science')).toBeInTheDocument();
  });

  it('renders NewTopicCard', () => {
    render(<Topics topics={mockTopics} />);
    expect(screen.getByTestId('new-topic-card')).toBeInTheDocument();
  });

  it('shows loader when creating is set in sessionStorage', () => {
    sessionStorage.setItem('creatingTopic', 'LoaderTopic');
    render(<Topics topics={mockTopics} />);
    expect(screen.getByTestId('topic-card-loader')).toHaveTextContent('LoaderTopic');
  });

  it('removes loader when topic with same name exists', async () => {
    sessionStorage.setItem('creatingTopic', 'Math');
    render(<Topics topics={mockTopics} />);
    expect(screen.queryByTestId('topic-card-loader')).not.toBeInTheDocument();
  });

  it('handles error when topic creation fails', async () => {
    (topicService.createTopic as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    render(<Topics topics={mockTopics} />);
    fireEvent.click(screen.getByTestId('new-topic-card'));
    await waitFor(() => expect(handleError).toHaveBeenCalled());
  });

  it('syncs localTopics when props change', () => {
    const { rerender } = render(<Topics topics={mockTopics} />);
    expect(screen.getByText('Math')).toBeInTheDocument();
    rerender(
      <Topics topics={[{ name: 'History', icon: '📜', color: '#ccc', questionsCount: 1 }]} />,
    );
    expect(screen.getByText('History')).toBeInTheDocument();
  });
});
