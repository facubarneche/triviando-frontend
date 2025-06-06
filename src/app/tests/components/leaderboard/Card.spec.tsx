import { render, screen, fireEvent } from '@testing-library/react';
import Card from '@/app/(pages)/leaderboard/components/Card';
import '@testing-library/jest-dom';

const mockLeaderBoardHistoricalData = {
  content: [
    { id: 1, username: 'John Smith', score: 80, position: 2 },
    { id: 2, username: 'Jane Doe', score: 100, position: 1 },
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

const mockLeaderBoardWeeklyData = {
  content: [
    { id: 1, username: 'John Smith', score: 20, position: 1 },
    { id: 2, username: 'Jane Doe', score: 10, position: 2 },
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
    render(<Card weekly={mockLeaderBoardWeeklyData} historical={mockLeaderBoardHistoricalData} />);

    expect(screen.getByText('🏆 Ranking')).toBeInTheDocument();
    expect(screen.getByText('Sigue de cerca a los mejores jugadores')).toBeInTheDocument();
    expect(screen.getByText('Historico')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Historico' })).toBeEnabled();
    expect(screen.getByRole('tab', { name: 'Esta Semana' })).toBeEnabled();
  });

  it('shows historical data when "Historico" tab is clicked', () => {
    render(<Card weekly={mockLeaderBoardWeeklyData} historical={mockLeaderBoardHistoricalData} />);
    const historicoTab = screen.getByRole('tab', { name: 'Historico' });
    fireEvent.click(historicoTab);

    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('100 pts')).toBeInTheDocument();
    expect(screen.getByText('80 pts')).toBeInTheDocument();
  });
});
