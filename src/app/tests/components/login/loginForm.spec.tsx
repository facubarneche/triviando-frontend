import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { loginService } from '@/app/services/loginService';
import { toast } from 'react-toastify';
import LoginPage from '@/app/(pages)/login/components/LoginForm';
import { handleError } from '@/app/utils/errorHandler';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/app/services/loginService', () => ({
  loginService: { login: jest.fn() },
}));
jest.mock('react-toastify', () => ({
  toast: { success: jest.fn() },
}));
jest.mock('@/app/utils/errorHandler', () => ({
  handleError: jest.fn(),
}));
jest.mock('@/app/components/logo', () => {
  const MockLogo = () => <div data-testid="logo" />;
  MockLogo.displayName = 'MockLogo';
  return MockLogo;
});

describe('LoginPage', () => {
  const push = jest.fn();

  // Mock crypto.randomUUID for environments where it's not available (like jsdom)
  beforeAll(() => {
    if (!globalThis.crypto) {
      // @ts-expect-error: Mock crypto
      globalThis.crypto = {};
    }
    let uuidCounter = 0;
    // @ts-expect-error: Mock UUID
    globalThis.crypto.randomUUID = jest.fn(() => `mocked-uuid-${uuidCounter++}`);
  });

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
    jest.clearAllMocks();
  });

  it('renders form fields and buttons', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continuar con google/i })).toBeInTheDocument();
    expect(screen.getByText(/¿no tienes una cuenta/i)).toBeInTheDocument();
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('updates email and password fields', () => {
    render(<LoginPage />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);

    fireEvent.change(emailInput, { target: { value: 'test@email.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    expect((emailInput as HTMLInputElement).value).toBe('test@email.com');
    expect((passwordInput as HTMLInputElement).value).toBe('123456');
  });

  it('calls loginService and redirects on successful login', async () => {
    (loginService.login as jest.Mock).mockResolvedValue({});
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'pass' } });
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(loginService.login).toHaveBeenCalledWith({ email: 'a@b.com', password: 'pass' });
      expect(toast.success).toHaveBeenCalledWith('Inicio de sesión exitoso');
      expect(push).toHaveBeenCalledWith('/topics');
    });
  });

  it('calls handleError on login failure', async () => {
    const error = new Error('fail');
    (loginService.login as jest.Mock).mockRejectedValue(error);
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'pass' } });
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(handleError).toHaveBeenCalledWith(error);
    });
  });

  it('Google login button is disabled', () => {
    render(<LoginPage />);
    const googleBtn = screen.getByRole('button', { name: /continuar con google/i });
    expect(googleBtn).toBeDisabled();
  });

  it('forgot password link navigates to /forgot-password', () => {
    render(<LoginPage />);
    const forgotLink = screen.getByText(/¿olvidaste tu contraseña/i);
    expect(forgotLink).toHaveAttribute('href', '/forgot-password');
  });

  it('register link navigates to /register', () => {
    render(<LoginPage />);
    const registerLink = screen.getByText(/regístrate/i);
    expect(registerLink).toHaveAttribute('href', '/register');
  });
});
