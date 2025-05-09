import { render, screen } from '@testing-library/react';
import Card from '@/app/(pages)/leaderboard/components/Card';
import '@testing-library/jest-dom';

const mockLeaderBoardData = {
  content: [
    { id: 1, fullName: 'Jane Doe', score: 100 },
    { id: 2, fullName: 'John Smith', score: 80 },
  ],
  totalElements: 2,
  totalPages: 1,
  last: true,
  first: true,
  numberOfElements: 2,
  size: 10,
  number: 0,
  empty: false,
};

describe('Card component', () => {
  it('renders ranking title and tabs', () => {
    render(<Card leaderBoardData={mockLeaderBoardData} />);

    expect(screen.getByText('🏆 Ranking')).toBeInTheDocument();
    expect(screen.getByText('Sigue de cerca a los mejores jugadores')).toBeInTheDocument();
    expect(screen.getByText('Historico')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Historico' })).toBeEnabled();
    expect(screen.getByRole('tab', { name: 'Esta Semana' })).toBeDisabled();
  });

  it('renders parsed leaderboard content', () => {
    render(<Card leaderBoardData={mockLeaderBoardData} />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('100 pts')).toBeInTheDocument();
    expect(screen.getByText('80 pts')).toBeInTheDocument();
  });
});
