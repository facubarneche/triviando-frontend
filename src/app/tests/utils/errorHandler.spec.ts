import { handleError } from '../../utils/errorHandler';
import { toast } from 'react-toastify';
import axios from 'axios';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock('axios');

describe('handleError', () => {
  const mockedToastError = toast.error as jest.Mock;
  const mockedIsAxiosError = axios.isAxiosError as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle 400 error with custom message', () => {
    mockedIsAxiosError.mockReturnValue(true);
    const error = {
      response: {
        status: 400,
        data: { error: 'Bad Request' },
      },
    };
    handleError(error);
    expect(mockedToastError).toHaveBeenCalledWith('Bad Request');
  });

  it('should handle 400 error with default message', () => {
    mockedIsAxiosError.mockReturnValue(true);
    const error = {
      response: {
        status: 400,
        data: {},
      },
    };
    handleError(error);
    expect(mockedToastError).toHaveBeenCalledWith('Petición incorrecta');
  });

  it('should handle 401 error with custom message', () => {
    mockedIsAxiosError.mockReturnValue(true);
    const error = {
      response: {
        status: 401,
        data: { message: 'Unauthorized' },
      },
    };
    handleError(error);
    expect(mockedToastError).toHaveBeenCalledWith('Unauthorized');
  });

  it('should handle 401 error with default message', () => {
    mockedIsAxiosError.mockReturnValue(true);
    const error = {
      response: {
        status: 401,
        data: {},
      },
    };
    handleError(error);
    expect(mockedToastError).toHaveBeenCalledWith('No autorizado. Verificá tus credenciales.');
  });

  it('should handle 403 error', () => {
    mockedIsAxiosError.mockReturnValue(true);
    const error = {
      response: {
        status: 403,
        data: {},
      },
    };
    handleError(error);
    expect(mockedToastError).toHaveBeenCalledWith('Acceso prohibido');
  });

  it('should handle 404 error', () => {
    mockedIsAxiosError.mockReturnValue(true);
    const error = {
      response: {
        status: 404,
        data: {},
      },
    };
    handleError(error);
    expect(mockedToastError).toHaveBeenCalledWith('Recurso no encontrado');
  });

  it('should handle 500 error', () => {
    mockedIsAxiosError.mockReturnValue(true);
    const error = {
      response: {
        status: 500,
        data: {},
      },
    };
    handleError(error);
    expect(mockedToastError).toHaveBeenCalledWith('Error interno del servidor');
  });

  it('should handle unknown status error', () => {
    mockedIsAxiosError.mockReturnValue(true);
    const error = {
      response: {
        status: 418,
        data: {},
      },
    };
    handleError(error);
    expect(mockedToastError).toHaveBeenCalledWith('Error desconocido');
  });

  it('should handle non-Axios errors', () => {
    mockedIsAxiosError.mockReturnValue(false);
    handleError(new Error('Some error'));
    expect(mockedToastError).toHaveBeenCalledWith('Error de conexión. Reintentá más tarde.');
  });
});
