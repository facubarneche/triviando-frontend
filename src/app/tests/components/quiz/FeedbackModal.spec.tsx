import React from 'react';
import { render, screen } from '@testing-library/react';
import FeedbackModal from '@/app/(pages)/[username]/quiz/[topic]/components/FeedbackModal';

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

describe('FeedbackModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('does not render when isOpen is false', () => {
      render(<FeedbackModal {...defaultProps} isOpen={false} />);

      expect(screen.queryByText('Reportar Problema')).not.toBeInTheDocument();
    });
  });
});
