import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '@/app/(pages)/[username]/leaderboard/components/Header';

// Mock useParams from next/navigation
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useParams: jest.fn(() => ({ username: 'testuser' })),
}));

describe('Header', () => {
  it('renders the Back to Topics link', () => {
    render(<Header />);
    const link = screen.getByRole('link', { name: /Volver a Temas/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', expect.stringMatching(/.*\/topics$/));
  });

  it('displays the ArrowLeft icon', () => {
    render(<Header />);
    const link = screen.getByRole('link', { name: /Volver a Temas/i });
    const svg = link ? link.querySelector('svg') : null;
    expect(svg).toBeInTheDocument();
  });
});
