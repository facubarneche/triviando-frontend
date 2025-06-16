import React from 'react';
import { render, screen } from '@testing-library/react';
import TopicCardLoader from '@/app/(pages)/topics/components/TopicCardLoader';

describe('TopicCardLoader', () => {
  it('renders the loader with the provided name', () => {
    render(<TopicCardLoader name="Matemáticas" />);
    expect(screen.getByText('Matemáticas')).toBeInTheDocument();
  });

  it('renders the loading spinner', () => {
    render(<TopicCardLoader name="Ciencias" />);
    const spinner = document.querySelector(
      '.h-8.w-8.rounded-full.border-4.border-t-transparent.border-cyan-400.animate-spin.mx-auto',
    );
    expect(spinner).toBeInTheDocument();
  });

  it('shows the loading message', () => {
    render(<TopicCardLoader name="Historia" />);
    expect(screen.getByText('Generando preguntas con IA...')).toBeInTheDocument();
  });

  it('applies the correct classes to the container', () => {
    render(<TopicCardLoader name="Arte" />);
    const container = screen.getByText('Arte').closest('div');
    expect(container).toHaveClass('h-[200px]');
    expect(container).toHaveClass('bg-white/80');
    expect(container).toHaveClass('rounded-lg');
  });

  it('renders different names correctly', () => {
    render(<TopicCardLoader name="Geografía" />);
    expect(screen.getByText('Geografía')).toBeInTheDocument();
  });
});
