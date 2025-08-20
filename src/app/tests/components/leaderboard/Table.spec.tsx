import Table from '@/app/(pages)/[username]/leaderboard/components/Table';
import { render, screen } from '@testing-library/react';

const mockData = [
  { username: 'alice', rank: 1, avatar: '', score: 100, userId: 1 },
  { username: 'bob', rank: 2, avatar: '', score: 90, userId: 2 },
  { username: 'charlie', rank: 4, avatar: '', score: 80, userId: 3 },
];

describe('Table', () => {
  it('renders all users with their username and score', () => {
    render(<Table data={mockData} />);

    expect(screen.getByText('alice')).toBeInTheDocument();
    expect(screen.getByText('bob')).toBeInTheDocument();
    expect(screen.getByText('charlie')).toBeInTheDocument();

    expect(screen.getByText('100 pts')).toBeInTheDocument();
    expect(screen.getByText('90 pts')).toBeInTheDocument();
    expect(screen.getByText('80 pts')).toBeInTheDocument();
  });

  it('shows avatar fallback with initials if image is missing', () => {
    render(<Table data={mockData} />);
    expect(screen.getByText('AL')).toBeInTheDocument();
    expect(screen.getByText('BO')).toBeInTheDocument();
    expect(screen.getByText('CH')).toBeInTheDocument();
  });
});
