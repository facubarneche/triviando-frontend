/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { loginService } from '@/app/services/loginService';
import Header from '@/app/(pages)/[username]/topics/components/Header';

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({ children, href }: any) => <a href={href}>{children}</a>;
  MockLink.displayName = 'MockLink';
  return MockLink;
});

// Mock lucide-react
jest.mock('lucide-react', () => ({
  LogOut: (props: any) => <svg data-testid="logout-icon" {...props} />,
}));

// Mock loginService
jest.mock('@/app/services/loginService', () => ({
  loginService: {
    getUsuarioActual: jest.fn(),
  },
}));

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the header title', () => {
    (loginService.getUsuarioActual as jest.Mock).mockReturnValue({ username: 'testuser' });
    render(<Header />);
    expect(screen.getByText('Elige un Tema')).toBeInTheDocument();
  });

  it('renders the Perfil button with correct link', () => {
    (loginService.getUsuarioActual as jest.Mock).mockReturnValue({ username: 'testuser' });
    render(<Header />);
    const perfilLink = screen.getByText('Perfil').closest('a');
    expect(perfilLink).toHaveAttribute('href', '/testuser/profile');
  });

  it('renders the Ranking button with correct link', () => {
    (loginService.getUsuarioActual as jest.Mock).mockReturnValue({ username: 'testuser' });
    render(<Header />);
    const rankingLink = screen.getByText('Ranking').closest('a');
    expect(rankingLink).toHaveAttribute('href', '/leaderboard');
  });

  it('renders the Salir button with logout icon and correct link', () => {
    (loginService.getUsuarioActual as jest.Mock).mockReturnValue({ username: 'testuser' });
    render(<Header />);
    const salirLink = screen.getByText('Salir').closest('a');
    expect(salirLink).toHaveAttribute('href', '/login');
    expect(screen.getByTestId('logout-icon')).toBeInTheDocument();
  });

  it('handles missing username gracefully', () => {
    (loginService.getUsuarioActual as jest.Mock).mockReturnValue(null);
    render(<Header />);
    const perfilLink = screen.getByText('Perfil').closest('a');
    expect(perfilLink).toHaveAttribute('href', '/undefined/profile');
  });
});
