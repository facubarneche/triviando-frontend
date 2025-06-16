import { render, screen, waitFor } from '@testing-library/react';
import { loginService } from '@/app/services/loginService';
import { userService } from '@/app/services/userService';
import { handleError } from '@/app/utils/errorHandler';
import ProfileStatistics from '@/app/(pages)/[username]/profile/components/ProfileStatistics';

jest.mock('@/app/services/loginService');
jest.mock('@/app/services/userService');
jest.mock('@/app/utils/errorHandler');

const mockUser = { id: 'user123' };
const mockStatistics = {
  totalQuizzes: 10,
  correctAnswers: 7,
  totalQuestions: 10,
};

describe('ProfileStatistics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders statistics after fetching', async () => {
    (loginService.getUsuarioActual as jest.Mock).mockReturnValue(mockUser);
    (userService.getUserStatistics as jest.Mock).mockResolvedValue(mockStatistics);

    render(<ProfileStatistics />);
    await waitFor(() => {
      expect(screen.getByText('Total de Quizzes')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('Respuestas Correctas')).toBeInTheDocument();
      expect(screen.getByText('7')).toBeInTheDocument();
      expect(screen.getByText('de 10 preguntas')).toBeInTheDocument();
      expect(screen.getByText('Precisión')).toBeInTheDocument();
      expect(screen.getByText('70%')).toBeInTheDocument();
    });
  });

  it('shows 0% accuracy if totalQuestions is 0', async () => {
    (loginService.getUsuarioActual as jest.Mock).mockReturnValue(mockUser);
    (userService.getUserStatistics as jest.Mock).mockResolvedValue({
      totalQuizzes: 5,
      correctAnswers: 0,
      totalQuestions: 0,
    });

    render(<ProfileStatistics />);
    await waitFor(() => {
      expect(screen.getByText('0%')).toBeInTheDocument();
    });
  });

  it('calls handleError if user is not logged in', async () => {
    (loginService.getUsuarioActual as jest.Mock).mockReturnValue(null);

    render(<ProfileStatistics />);
    await waitFor(() => {
      expect(handleError).toHaveBeenCalled();
      expect(screen.getByText(/Cargando estadísticas/i)).toBeInTheDocument();
    });
  });

  it('calls handleError if fetching statistics fails', async () => {
    (loginService.getUsuarioActual as jest.Mock).mockReturnValue(mockUser);
    (userService.getUserStatistics as jest.Mock).mockRejectedValue(new Error('Network error'));

    render(<ProfileStatistics />);
    await waitFor(() => {
      expect(handleError).toHaveBeenCalled();
      expect(screen.getByText(/Cargando estadísticas/i)).toBeInTheDocument();
    });
  });
});
