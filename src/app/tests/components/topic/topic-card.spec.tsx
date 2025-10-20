/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopicCard from '@/app/components/topic-card';

jest.mock('next/link', () => {
  const MockLink = ({ children, href, onClick }: any) => {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      onClick?.(event);
    };

    return (
      <a href={typeof href === 'string' ? href : href.pathname} onClick={handleClick}>
        {children}
      </a>
    );
  };
  MockLink.displayName = 'MockLink';
  return { __esModule: true, default: MockLink };
});
jest.mock('framer-motion', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const MockMotionDiv = React.forwardRef(({ whileHover, whileTap, ...props }: any, ref: any) => (
    <div ref={ref} {...props} />
  ));
  MockMotionDiv.displayName = 'MockMotionDiv';
  return {
    motion: {
      // Remove whileHover and other motion props before passing to div
      div: MockMotionDiv,
    },
  };
});

// Mock useParams from next/navigation
const mockPush = jest.fn();

jest.mock('next/navigation', () => {
  const actual = jest.requireActual('next/navigation');
  return {
    ...actual,
    useParams: () => ({ username: 'testuser' }),
    useRouter: () => ({ push: mockPush }),
  };
});
jest.mock('@/app/components/modals/GenerateQuestionsModal', () => ({
  GenerateQuestionsModal: ({ open, onClose, onSuccess, onPlanLimit }: any) => (
    <div data-testid="generate-modal">
      <span>{open ? 'open' : 'closed'}</span>
      <button type="button" onClick={onSuccess}>
        mock-success
      </button>
      <button
        type="button"
        onClick={() => {
          onPlanLimit?.('limit message');
          onClose();
        }}
      >
        mock-limit
      </button>
      <button type="button" onClick={onClose}>
        mock-close
      </button>
    </div>
  ),
}));

jest.mock('@/app/components/modals/QuestionLimitModal', () => ({
  QuestionLimitModal: ({ open, onClose }: any) => (
    <div data-testid="question-limit-modal">
      <span>{open ? 'open' : 'closed'}</span>
      <button type="button" onClick={onClose}>
        close-limit
      </button>
    </div>
  ),
}));

const mockRefresh = jest.fn().mockResolvedValue(undefined);

jest.mock('@/app/stores/topicCreationStore', () => ({
  useTopicCreationStore: (selector: any) =>
    selector({
      refreshCallback: mockRefresh,
    }),
}));

jest.mock('@/app/components/ui/card', () => ({
  Card: ({ children, ...props }: any) => {
    const { hover: _hover, ...rest } = props;
    void _hover;
    return <div {...rest}>{children}</div>;
  },
  CardContent: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

const mockTopic = {
  name: 'Matemáticas',
  questionsCount: 12,
  color: 'bg-blue-500',
  icon: '🧮',
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('TopicCard', () => {
  it('renders topic name', () => {
    render(<TopicCard topic={mockTopic} />);
    expect(screen.getByText('Matemáticas')).toBeInTheDocument();
  });

  it('renders questions count', () => {
    render(<TopicCard topic={mockTopic} />);
    expect(screen.getByText('12 preguntas')).toBeInTheDocument();
  });

  it('renders icon', () => {
    render(<TopicCard topic={mockTopic} />);
    expect(screen.getByText('🧮')).toBeInTheDocument();
  });

  it('renders with correct color class', () => {
    render(<TopicCard topic={mockTopic} />);
    const coloredDiv = screen.getByText('🧮').parentElement;
    expect(coloredDiv).toHaveClass('bg-blue-500');
  });

  it('links to the correct quiz page', () => {
    render(<TopicCard topic={mockTopic} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/testuser/quiz/Matem%C3%A1ticas');
  });

  it('renders with correct structure', () => {
    render(<TopicCard topic={mockTopic} />);
    expect(screen.getByRole('link').querySelector('.text-xl.font-bold.mb-1')).toHaveTextContent(
      'Matemáticas',
    );
    expect(
      screen.getByRole('link').querySelector('.text-sm.text-muted-foreground'),
    ).toHaveTextContent('12 preguntas');
  });

  it('opens generate modal when topic has zero questions', async () => {
    render(<TopicCard topic={{ ...mockTopic, questionsCount: 0 }} />);
    fireEvent.click(screen.getByRole('link'));
    await waitFor(() => expect(screen.getByTestId('generate-modal')).toHaveTextContent('open'));
  });

  it('navigates to quiz after generating questions successfully', async () => {
    render(<TopicCard topic={{ ...mockTopic, questionsCount: 0 }} />);
    fireEvent.click(screen.getByRole('link'));
    fireEvent.click(screen.getByText('mock-success'));
    await waitFor(() => {
      expect(mockRefresh).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith('/testuser/quiz/Matem%C3%A1ticas');
    });
  });

  it('shows question limit modal when plan limit is hit', async () => {
    render(<TopicCard topic={{ ...mockTopic, questionsCount: 0 }} />);
    fireEvent.click(screen.getByRole('link'));
    fireEvent.click(screen.getByText('mock-limit'));
    await waitFor(() =>
      expect(screen.getByTestId('question-limit-modal')).toHaveTextContent('open'),
    );
    expect(screen.getByTestId('generate-modal')).toHaveTextContent('closed');
  });
});
