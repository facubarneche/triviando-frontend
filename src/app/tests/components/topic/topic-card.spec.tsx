/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopicCard from '@/app/components/topic-card';

jest.mock('next/link', () => {
  const MockLink = ({ children, href }: any) => (
    <a href={typeof href === 'string' ? href : href.pathname}>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return { __esModule: true, default: MockLink };
});
jest.mock('framer-motion', () => {
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

jest.mock('@/app/components/ui/card', () => ({
  Card: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  CardContent: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

const mockTopic = {
  name: 'Matemáticas',
  questionsCount: 12,
  color: 'bg-blue-500',
  icon: '🧮',
};

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
    expect(link).toHaveAttribute('href', '/quiz/Matemáticas');
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
});
