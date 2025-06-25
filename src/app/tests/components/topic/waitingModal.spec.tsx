import React from 'react';
import { render, screen } from '@testing-library/react';
import WaitingModal from '@/app/(pages)/[username]/quiz/[topic]/components/WaitingModal';

describe('WaitingModal', () => {
  it('renders without crashing', () => {
    render(<WaitingModal topic="Matemáticas" />);
    expect(screen.getByText(/Generando preguntas sobre Matemáticas/i)).toBeInTheDocument();
  });

  it('displays the correct topic', () => {
    render(<WaitingModal topic="Historia" />);
    expect(screen.getByText(/Generando preguntas sobre Historia/i)).toBeInTheDocument();
  });

  it('shows the informative message', () => {
    render(<WaitingModal topic="Arte" />);
    expect(
      screen.getByText(/Estamos preparando un quiz personalizado para ti/i),
    ).toBeInTheDocument();
  });

  it('has the correct structure and classes', () => {
    render(<WaitingModal topic="Geografía" />);
    const card = screen.getByText(/Generando preguntas sobre Geografía/i).closest('.flex');
    expect(card).toBeInTheDocument();
    expect(card?.parentElement).toHaveClass('border-0', 'shadow-2xl', 'bg-white/90');
  });
});
