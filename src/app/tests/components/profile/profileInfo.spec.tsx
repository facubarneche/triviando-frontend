import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { useParams, useRouter } from 'next/navigation';
import { userService } from '@/app/services/userService';
import { loginService } from '@/app/services/loginService';
import ProfileInfo from '@/app/(pages)/[username]/profile/components/ProfileInfo';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));
jest.mock('@/app/services/userService', () => ({
  userService: {
    getUserById: jest.fn(),
  },
}));
jest.mock('@/app/services/loginService', () => ({
  loginService: {
    getUsuarioActual: jest.fn(),
    getUserId: jest.fn(),
  },
}));

// Mock Zustand store
jest.mock('@/app/stores/userStore', () => ({
  useUserStore: jest.fn(() => ({
    user: null,
  })),
}));

// Mock avatar hook
jest.mock('@/app/hooks/useUserAvatar', () => ({
  useUserAvatar: jest.fn(() => ({
    avatarPublicId: null,
  })),
}));
jest.mock('@/app/utils/formatDateToMonthYear', () => ({
  formatDateToMonthYear: (date: string) => `formatted-${date}`,
}));
jest.mock('@/app/utils/errorHandler', () => ({
  handleError: jest.fn(),
}));
jest.mock('@/app/(pages)/[username]/profile/components/ProfileInfoSkeleton', () => ({
  ProfileInfoSkeleton: () => <div data-testid="skeleton" />,
}));

describe('ProfileInfo', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('renders skeleton while loading', async () => {
    (useParams as jest.Mock).mockReturnValue({ username: 'testuser' });
    (loginService.getUsuarioActual as jest.Mock).mockReturnValue({ username: 'testuser' });
    (loginService.getUserId as jest.Mock).mockReturnValue(1);
    (userService.getUserById as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(<ProfileInfo />);
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('renders user info when user is loaded', async () => {
    (useParams as jest.Mock).mockReturnValue({ username: 'testuser' });
    (loginService.getUsuarioActual as jest.Mock).mockReturnValue({ username: 'testuser' });
    (loginService.getUserId as jest.Mock).mockReturnValue(1);
    (userService.getUserById as jest.Mock).mockResolvedValue({
      username: 'testuser',
      name: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      joinDate: '2023-01-01',
    });

    render(<ProfileInfo />);
    await waitFor(() => expect(screen.getByText('testuser')).toBeInTheDocument());
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText(/Miembro desde formatted-2023-01-01/)).toBeInTheDocument();
    expect(screen.getByText('Editar Perfil')).toBeInTheDocument();
    expect(screen.getByText('Cerrar Sesión')).toBeInTheDocument();
  });



  it('shows error card if user is not found (not logged in user)', async () => {
    (useParams as jest.Mock).mockReturnValue({ username: 'otheruser' });
    (loginService.getUsuarioActual as jest.Mock).mockReturnValue({ username: 'testuser' });

    render(<ProfileInfo />);
    await waitFor(() =>
      expect(screen.getByText(/No se pudo cargar el perfil/)).toBeInTheDocument(),
    );
  });

  it('handles error from userService.getUserById', async () => {
    (useParams as jest.Mock).mockReturnValue({ username: 'testuser' });
    (loginService.getUsuarioActual as jest.Mock).mockReturnValue({ username: 'testuser' });
    (loginService.getUserId as jest.Mock).mockReturnValue(1);
    (userService.getUserById as jest.Mock).mockRejectedValue(new Error('fail'));

    render(<ProfileInfo />);
    await waitFor(() =>
      expect(screen.getByText(/No se pudo cargar el perfil/)).toBeInTheDocument(),
    );
  });

  it('navigates to edit profile on button click', async () => {
    (useParams as jest.Mock).mockReturnValue({ username: 'testuser' });
    (loginService.getUsuarioActual as jest.Mock).mockReturnValue({ username: 'testuser' });
    (loginService.getUserId as jest.Mock).mockReturnValue(1);
    (userService.getUserById as jest.Mock).mockResolvedValue({
      username: 'testuser',
      name: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      joinDate: '2023-01-01',
    });

    render(<ProfileInfo />);
    await waitFor(() => expect(screen.getByText('Editar Perfil')).toBeInTheDocument());
    fireEvent.click(screen.getByText('Editar Perfil'));
    expect(mockPush).toHaveBeenCalledWith('/testuser/profile/edit');
  });
});
