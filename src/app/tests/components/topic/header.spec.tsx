/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { loginService } from '@/app/services/loginService';
import Header from '@/app/(pages)/[username]/topics/components/Header';

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({ children, href }: any) => <a href={href}>{children}</a>;
  MockLink.displayName = 'MockLink';
  return { __esModule: true, default: MockLink };
});

// Mock lucide-react
jest.mock('lucide-react', () => ({
  LogOut: (props: any) => <svg data-testid="logout-icon" {...props} />,
  Trophy: (props: any) => <svg data-testid="trophy-icon" {...props} />,
  User: (props: any) => <svg data-testid="user-icon" {...props} />,
  ChevronDown: (props: any) => <svg data-testid="chevron-down-icon" {...props} />,
  Crown: (props: any) => <svg data-testid="crown-icon" {...props} />,
}));

// Mock framer-motion
jest.mock('framer-motion', () => {
  const validProps = ['className', 'style', 'onClick', 'children', 'id', 'role', 'title'];

  const filterProps = (props: Record<string, any>) =>
    Object.keys(props)
      .filter((key) => validProps.includes(key))
      .reduce((acc, key) => {
        acc[key] = props[key];
        return acc;
      }, {} as Record<string, any>);

  return {
    motion: {
      div: ({ children, ...props }: any) => <div {...filterProps(props)}>{children}</div>,
      button: ({ children, ...props }: any) => <button {...filterProps(props)}>{children}</button>,
      span: ({ children, ...props }: any) => <span {...filterProps(props)}>{children}</span>,
    },
    AnimatePresence: ({ children }: any) => children,
  };
});

// Mock next/navigation useParams
jest.mock('next/navigation', () => ({
  useParams: jest.fn(() => ({ username: 'testuser' })),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

// Mock loginService
jest.mock('@/app/services/loginService', () => ({
  loginService: {
    getUsuarioActual: jest.fn(),
  },
}));

// Mock Zustand store
jest.mock('@/app/stores/userStore', () => ({
  useUserStore: jest.fn(() => ({
    user: null,
  })),
}));

// Mock CloudinaryAvatar
jest.mock('@/app/components/CloudinaryAvatar', () => ({
  CloudinaryAvatar: ({ fallbackText, alt }: any) => (
    <div data-testid="cloudinary-avatar" title={alt}>
      {fallbackText}
    </div>
  ),
}));

// Mock cloudinary avatar service
jest.mock('@/app/services/cloudinaryAvatarService', () => ({
  cloudinaryAvatarService: {
    getCurrentUserAvatar: jest.fn().mockResolvedValue(null),
  },
}));

// Mock hooks
jest.mock('@/app/hooks/useInitializeUser', () => ({
  useInitializeUser: jest.fn(),
}));

jest.mock('@/app/hooks/useUserAvatar', () => ({
  useUserAvatar: jest.fn(() => ({
    avatarPublicId: null,
  })),
}));

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the header logo', () => {
    (loginService.getUsuarioActual as jest.Mock).mockReturnValue({ username: 'testuser' });
    render(<Header />);
    expect(screen.getByAltText('trivIAndo')).toBeInTheDocument();
  });

  it('renders the Perfil option in dropdown when clicked', async () => {
    (loginService.getUsuarioActual as jest.Mock).mockReturnValue({ username: 'testuser' });
    render(<Header />);

    // Click to open dropdown
    const userButton = screen.getByRole('button', { name: /testuser/i });
    fireEvent.click(userButton);

    // Wait for dropdown to appear and check for Perfil option
    await waitFor(() => {
      expect(screen.getByText('Perfil')).toBeInTheDocument();
    });
  });

  it('renders the Trophy button for leaderboard', () => {
    (loginService.getUsuarioActual as jest.Mock).mockReturnValue({ username: 'testuser' });
    render(<Header />);
    const trophyButton = screen.getByRole('button', { name: '' }); // Trophy button has no aria-label
    expect(trophyButton).toBeInTheDocument();
  });

  it('renders the Cerrar Sesión option in dropdown when clicked', async () => {
    (loginService.getUsuarioActual as jest.Mock).mockReturnValue({ username: 'testuser' });
    render(<Header />);

    // Click to open dropdown
    const userButton = screen.getByRole('button', { name: /testuser/i });
    fireEvent.click(userButton);

    // Wait for dropdown to appear and check for logout option
    await waitFor(() => {
      expect(screen.getByText('Cerrar Sesión')).toBeInTheDocument();
      expect(screen.getByTestId('logout-icon')).toBeInTheDocument();
    });
  });
});
