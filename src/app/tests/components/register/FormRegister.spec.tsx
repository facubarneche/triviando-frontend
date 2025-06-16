import FormRegister from '@/app/(pages)/register/components/FormRegister';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock userService
jest.mock('@/app/services/userService', () => ({
  userService: {
    createUser: jest.fn().mockResolvedValue({ success: true }),
  },
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
    fireEvent.change(password, { target: { value: '12345678' } });
    fireEvent.change(confirmPassword, { target: { value: '12345678' } });

    expect(username).toHaveValue('facu');
    expect(email).toHaveValue('facu@email.com');
    expect(password).toHaveValue('12345678');
    expect(confirmPassword).toHaveValue('12345678');
  });

  it('debería enviar el formulario y redirigir a /topics', async () => {
    const { getByLabelText, getByText } = render(<FormRegister />);

    fireEvent.change(getByLabelText(/Nombre de usuario/i), { target: { value: 'facu' } });
    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'facu@mail.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña', { exact: true }), {
      target: { value: '12345678' },
    });
    fireEvent.change(screen.getByLabelText('Confirmar Contraseña'), {
      target: { value: '12345678' },
    });

    fireEvent.click(getByText(/Crear Cuenta/i));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/topics');
    });
  });

  //TODO: Agregar nuevamente al implementar la funcionalidad
  // it('debería redirigir al hacer click en "Continuar con Google"', () => {
  //   render(<FormRegister />);

  //   const googleButton = screen.getByRole('button', {
  //     name: /continuar con google/i,
  //   });

  //   fireEvent.click(googleButton);

  //   expect(pushMock).toHaveBeenCalledWith('/topics');
  // });

  it('debería mostrar un error si las contraseñas no coinciden', async () => {
    render(<FormRegister />);

    fireEvent.change(screen.getByLabelText(/nombre de usuario/i), {
      target: { value: 'facu' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'facu@email.com' },
    });
    fireEvent.change(screen.getByLabelText(/^contraseña$/i), {
      target: { value: '12345678' },
    });
    fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), {
      target: { value: '87654321' },
    });

    fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));

    expect(await screen.findByText(/las contraseñas deben coincidir/i)).toBeInTheDocument();
  });
});
