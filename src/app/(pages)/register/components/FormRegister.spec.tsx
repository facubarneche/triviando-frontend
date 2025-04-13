import { render, screen, fireEvent } from '@testing-library/react';
import FormRegister from './FormRegister';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';

// Mock del useRouter de Next.js
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('FormRegister', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    jest.clearAllMocks();
  });

  it('debería permitir escribir en los campos', () => {
    render(<FormRegister />);

    const username = screen.getByLabelText(/nombre de usuario/i);
    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/^contraseña$/i);
    const confirmPassword = screen.getByLabelText(/confirmar contraseña/i);

    fireEvent.change(username, { target: { value: 'facu' } });
    fireEvent.change(email, { target: { value: 'facu@email.com' } });
    fireEvent.change(password, { target: { value: '123456' } });
    fireEvent.change(confirmPassword, { target: { value: '123456' } });

    expect(username).toHaveValue('facu');
    expect(email).toHaveValue('facu@email.com');
    expect(password).toHaveValue('123456');
    expect(confirmPassword).toHaveValue('123456');
  });

  it('debería enviar el formulario y redirigir a /topics', () => {
    render(<FormRegister />);

    fireEvent.change(screen.getByLabelText(/nombre de usuario/i), {
      target: { value: 'facu' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'facu@email.com' },
    });
    fireEvent.change(screen.getByLabelText(/^contraseña$/i), {
      target: { value: '123456' },
    });
    fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));

    expect(pushMock).toHaveBeenCalledWith('/topics');
  });

  it('debería redirigir al hacer click en "Continuar con Google"', () => {
    render(<FormRegister />);

    const googleButton = screen.getByRole('button', {
      name: /continuar con google/i,
    });

    fireEvent.click(googleButton);

    expect(pushMock).toHaveBeenCalledWith('/topics');
  });
});
