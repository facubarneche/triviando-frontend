import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuestionFeedback from '@/app/(pages)/[username]/quiz/[topic]/components/QuestionFeedback';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: React.ComponentProps<'p'>) => <p {...props}>{children}</p>,
  },
}));

// Mock AnimatedContainer component
jest.mock('@/app/components/AnimatedContainer', () => {
  return function MockAnimatedContainer({ children, ...props }: React.ComponentProps<'div'>) {
    return <div {...props}>{children}</div>;
  };
});

// Mock FeedbackModal component
jest.mock('@/app/(pages)/[username]/quiz/[topic]/components/FeedbackModal', () => {
  return function MockFeedbackModal({
    isOpen,
    onClose,
    onSubmit,
  }: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (feedbackType: string, description?: string) => void;
  }) {
    if (!isOpen) return null;
    return (
      <div data-testid="feedback-modal">
        <button onClick={() => onSubmit('negative', 'test description')}>Submit Feedback</button>
        <button onClick={onClose}>Close Modal</button>
      </div>
    );
  };
});

describe('QuestionFeedback', () => {
  const mockOnFeedbackSubmit = jest.fn();

  const defaultProps = {
    onFeedbackSubmit: mockOnFeedbackSubmit,
    disabled: false,
    resetKey: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders thumbs up and thumbs down buttons', () => {
      render(<QuestionFeedback {...defaultProps} />);

      expect(screen.getByTestId('thumbs-up-button')).toBeInTheDocument();
      expect(screen.getByTestId('thumbs-down-button')).toBeInTheDocument();
    });

    it('renders buttons with correct initial styling', () => {
      render(<QuestionFeedback {...defaultProps} />);

      const thumbsUpButton = screen.getByTestId('thumbs-up-button');
      const thumbsDownButton = screen.getByTestId('thumbs-down-button');

      expect(thumbsUpButton).toHaveClass('text-gray-400');
      expect(thumbsDownButton).toHaveClass('text-gray-400');
    });

    it('renders buttons as enabled by default', () => {
      render(<QuestionFeedback {...defaultProps} />);

      const thumbsUpButton = screen.getByTestId('thumbs-up-button');
      const thumbsDownButton = screen.getByTestId('thumbs-down-button');

      expect(thumbsUpButton).not.toBeDisabled();
      expect(thumbsDownButton).not.toBeDisabled();
    });
  });

  describe('Disabled State', () => {
    it('renders buttons as disabled when disabled prop is true', () => {
      render(<QuestionFeedback {...defaultProps} disabled={true} />);

      const thumbsUpButton = screen.getByTestId('thumbs-up-button');
      const thumbsDownButton = screen.getByTestId('thumbs-down-button');

      expect(thumbsUpButton).toBeDisabled();
      expect(thumbsDownButton).toBeDisabled();
    });

    it('applies disabled styling when disabled', () => {
      render(<QuestionFeedback {...defaultProps} disabled={true} />);

      const thumbsUpButton = screen.getByTestId('thumbs-up-button');
      const thumbsDownButton = screen.getByTestId('thumbs-down-button');

      expect(thumbsUpButton).toHaveClass('opacity-50', 'cursor-not-allowed');
      expect(thumbsDownButton).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('does not respond to clicks when disabled', async () => {
      const user = userEvent.setup();
      render(<QuestionFeedback {...defaultProps} disabled={true} />);

      const thumbsUpButton = screen.getByTestId('thumbs-up-button');
      await user.click(thumbsUpButton);

      expect(mockOnFeedbackSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Positive Feedback', () => {
    it('calls onFeedbackSubmit with "positive" when thumbs up is clicked', async () => {
      const user = userEvent.setup();
      render(<QuestionFeedback {...defaultProps} />);

      const thumbsUpButton = screen.getByTestId('thumbs-up-button');
      await user.click(thumbsUpButton);

      expect(mockOnFeedbackSubmit).toHaveBeenCalledWith('positive');
    });

    it('updates button styling when thumbs up is selected', async () => {
      const user = userEvent.setup();
      render(<QuestionFeedback {...defaultProps} />);

      const thumbsUpButton = screen.getByTestId('thumbs-up-button');
      await user.click(thumbsUpButton);

      expect(thumbsUpButton).toHaveClass('text-green-600', 'bg-green-50');
    });

    it('deselects positive feedback when clicked again', async () => {
      const user = userEvent.setup();
      render(<QuestionFeedback {...defaultProps} />);

      const thumbsUpButton = screen.getByTestId('thumbs-up-button');

      // First click to select
      await user.click(thumbsUpButton);
      expect(mockOnFeedbackSubmit).toHaveBeenCalledWith('positive');

      // Second click to deselect
      mockOnFeedbackSubmit.mockClear();
      await user.click(thumbsUpButton);
      expect(mockOnFeedbackSubmit).toHaveBeenCalledWith('none');
    });

    it('resets styling when positive feedback is deselected', async () => {
      const user = userEvent.setup();
      render(<QuestionFeedback {...defaultProps} />);

      const thumbsUpButton = screen.getByTestId('thumbs-up-button');

      // Select and then deselect
      await user.click(thumbsUpButton);
      await user.click(thumbsUpButton);

      expect(thumbsUpButton).toHaveClass('text-gray-400');
      expect(thumbsUpButton).not.toHaveClass('text-green-600', 'bg-green-50');
    });

    it('deselects negative feedback when positive is selected', async () => {
      const user = userEvent.setup();
      render(<QuestionFeedback {...defaultProps} />);

      const thumbsUpButton = screen.getByTestId('thumbs-up-button');
      const thumbsDownButton = screen.getByTestId('thumbs-down-button');

      // First select negative (this will open modal, but our mock will handle it)
      await user.click(thumbsDownButton);

      // Then select positive
      await user.click(thumbsUpButton);

      expect(thumbsUpButton).toHaveClass('text-green-600', 'bg-green-50');
      expect(thumbsDownButton).toHaveClass('text-gray-400');
    });
  });

  describe('Negative Feedback', () => {
    it('opens feedback modal when thumbs down is clicked', async () => {
      const user = userEvent.setup();
      render(<QuestionFeedback {...defaultProps} />);

      const thumbsDownButton = screen.getByTestId('thumbs-down-button');
      await user.click(thumbsDownButton);

      expect(screen.getByTestId('feedback-modal')).toBeInTheDocument();
    });

    it('deselects negative feedback when clicked again while selected', async () => {
      const user = userEvent.setup();
      render(<QuestionFeedback {...defaultProps} />);

      const thumbsDownButton = screen.getByTestId('thumbs-down-button');

      // Mock the component state to simulate negative feedback being selected
      await user.click(thumbsDownButton);

      // Submit feedback through modal to set negative state
      const submitButton = screen.getByText('Submit Feedback');
      await user.click(submitButton);

      // Now clicking thumbs down again should deselect
      mockOnFeedbackSubmit.mockClear();
      await user.click(thumbsDownButton);

      expect(mockOnFeedbackSubmit).toHaveBeenCalledWith('none');
    });

    it('handles negative feedback submission through modal', async () => {
      const user = userEvent.setup();
      render(<QuestionFeedback {...defaultProps} />);

      const thumbsDownButton = screen.getByTestId('thumbs-down-button');
      await user.click(thumbsDownButton);

      const submitButton = screen.getByText('Submit Feedback');
      await user.click(submitButton);

      expect(mockOnFeedbackSubmit).toHaveBeenCalledWith('negative', 'test description');
    });

    it('updates button styling after negative feedback submission', async () => {
      const user = userEvent.setup();
      render(<QuestionFeedback {...defaultProps} />);

      const thumbsDownButton = screen.getByTestId('thumbs-down-button');
      await user.click(thumbsDownButton);

      const submitButton = screen.getByText('Submit Feedback');
      await user.click(submitButton);

      expect(thumbsDownButton).toHaveClass('text-red-600', 'bg-red-50');
    });

    it('closes modal when close button is clicked', async () => {
      const user = userEvent.setup();
      render(<QuestionFeedback {...defaultProps} />);

      const thumbsDownButton = screen.getByTestId('thumbs-down-button');
      await user.click(thumbsDownButton);

      expect(screen.getByTestId('feedback-modal')).toBeInTheDocument();

      const closeButton = screen.getByText('Close Modal');
      await user.click(closeButton);

      expect(screen.queryByTestId('feedback-modal')).not.toBeInTheDocument();
    });
  });

  describe('Reset Functionality', () => {
    it('resets state when resetKey changes', () => {
      const { rerender } = render(<QuestionFeedback {...defaultProps} resetKey={1} />);

      // Simulate state change by changing resetKey
      rerender(<QuestionFeedback {...defaultProps} resetKey={2} />);

      const thumbsUpButton = screen.getByTestId('thumbs-up-button');
      const thumbsDownButton = screen.getByTestId('thumbs-down-button');

      // Check that buttons are reset to initial state
      expect(thumbsUpButton).toHaveClass('text-gray-400');
      expect(thumbsDownButton).toHaveClass('text-gray-400');
    });

    it('does not reset when resetKey stays the same', async () => {
      const user = userEvent.setup();
      const { rerender } = render(<QuestionFeedback {...defaultProps} resetKey={1} />);

      // Select positive feedback
      const thumbsUpButton = screen.getByTestId('thumbs-up-button');
      await user.click(thumbsUpButton);

      // Rerender with same resetKey
      rerender(<QuestionFeedback {...defaultProps} resetKey={1} />);

      // State should be preserved
      expect(thumbsUpButton).toHaveClass('text-green-600', 'bg-green-50');
    });

    it('closes modal when resetKey changes', async () => {
      const user = userEvent.setup();
      const { rerender } = render(<QuestionFeedback {...defaultProps} resetKey={1} />);

      // Open modal
      const thumbsDownButton = screen.getByTestId('thumbs-down-button');
      await user.click(thumbsDownButton);
      expect(screen.getByTestId('feedback-modal')).toBeInTheDocument();

      // Change resetKey
      rerender(<QuestionFeedback {...defaultProps} resetKey={2} />);

      // Modal should be closed
      expect(screen.queryByTestId('feedback-modal')).not.toBeInTheDocument();
    });
  });

  describe('Mutual Exclusivity', () => {
    it('ensures only one feedback type can be selected at a time', async () => {
      const user = userEvent.setup();
      render(<QuestionFeedback {...defaultProps} />);

      const thumbsUpButton = screen.getByTestId('thumbs-up-button');
      const thumbsDownButton = screen.getByTestId('thumbs-down-button');

      // Select positive
      await user.click(thumbsUpButton);
      expect(thumbsUpButton).toHaveClass('text-green-600', 'bg-green-50');

      // Select negative through modal
      await user.click(thumbsDownButton);
      const submitButton = screen.getByText('Submit Feedback');
      await user.click(submitButton);

      // Check that only negative is selected
      expect(thumbsDownButton).toHaveClass('text-red-600', 'bg-red-50');
      expect(thumbsUpButton).toHaveClass('text-gray-400');
      expect(thumbsUpButton).not.toHaveClass('text-green-600', 'bg-green-50');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes when disabled', () => {
      render(<QuestionFeedback {...defaultProps} disabled={true} />);

      const thumbsUpButton = screen.getByTestId('thumbs-up-button');
      const thumbsDownButton = screen.getByTestId('thumbs-down-button');

      expect(thumbsUpButton).toHaveAttribute('disabled');
      expect(thumbsDownButton).toHaveAttribute('disabled');
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<QuestionFeedback {...defaultProps} />);

      const thumbsUpButton = screen.getByTestId('thumbs-up-button');

      // Focus and activate with keyboard
      thumbsUpButton.focus();
      await user.keyboard('{Enter}');

      expect(mockOnFeedbackSubmit).toHaveBeenCalledWith('positive');
    });
  });

  describe('Edge Cases', () => {
    it('handles rapid clicking gracefully', async () => {
      const user = userEvent.setup();
      render(<QuestionFeedback {...defaultProps} />);

      const thumbsUpButton = screen.getByTestId('thumbs-up-button');

      // Rapid clicks
      await user.click(thumbsUpButton);
      await user.click(thumbsUpButton);
      await user.click(thumbsUpButton);

      // Should handle toggle correctly
      expect(mockOnFeedbackSubmit).toHaveBeenCalledTimes(3);
      expect(mockOnFeedbackSubmit).toHaveBeenNthCalledWith(1, 'positive');
      expect(mockOnFeedbackSubmit).toHaveBeenNthCalledWith(2, 'none');
      expect(mockOnFeedbackSubmit).toHaveBeenNthCalledWith(3, 'positive');
    });

    it('handles undefined resetKey gracefully', () => {
      render(<QuestionFeedback onFeedbackSubmit={mockOnFeedbackSubmit} />);

      expect(screen.getByTestId('thumbs-up-button')).toBeInTheDocument();
      expect(screen.getByTestId('thumbs-down-button')).toBeInTheDocument();
    });

    it('handles resetKey of different types', () => {
      const { rerender } = render(<QuestionFeedback {...defaultProps} resetKey="question-1" />);

      // Change to different string
      rerender(<QuestionFeedback {...defaultProps} resetKey="question-2" />);

      const thumbsUpButton = screen.getByTestId('thumbs-up-button');
      expect(thumbsUpButton).toHaveClass('text-gray-400');
    });
  });
});
