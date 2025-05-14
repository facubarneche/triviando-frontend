import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '@/app/(pages)/leaderboard/components/Header';

describe('Header', () => {
  it('renders the Back to Topics link', () => {
    render(<Header />);
    const link = screen.getByRole('link', { name: /Volver a Topicos/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/topics');
  });

  it('displays the ArrowLeft icon', () => {
    render(<Header />);
    const svg = screen.getByRole('link').querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
