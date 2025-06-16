import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import * as userServiceModule from '@/app/services/userService';
import * as loginServiceModule from '@/app/services/loginService';
import { StreakModal } from '@/app/components/modals/StreakModal';

describe('StreakModal', () => {
  const mockUserId = 123;
  const mockStreakData = { rachaActual: 5 };

  beforeEach(() => {
    jest.spyOn(loginServiceModule.loginService, 'getUserId').mockReturnValue(mockUserId);
    jest.spyOn(userServiceModule.userService, 'getStreak').mockResolvedValue(mockStreakData);
    localStorage.clear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders modal with streak data when not shown today', async () => {
    render(<StreakModal />);
    await waitFor(() => {
      expect(screen.getByText('¡Racha de días consecutivos!')).toBeInTheDocument();
      expect(screen.getByText('¡Felicitaciones!')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(
        screen.getByText(/Has ingresado a la aplicación durante 5 días consecutivos/),
      ).toBeInTheDocument();
    });
  });

  it('does not open modal if already shown today', async () => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('streakModalLastShown', today);
    render(<StreakModal />);
    await waitFor(() => {
      expect(screen.queryByText('¡Racha de días consecutivos!')).not.toBeInTheDocument();
    });
  });

  it('sets streakModalLastShown in localStorage when closing modal', async () => {
    render(<StreakModal />);
    await waitFor(() => {
      expect(screen.getByText('¡Genial!')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('¡Genial!'));
    const today = new Date().toISOString().split('T')[0];
    expect(localStorage.getItem('streakModalLastShown')).toBe(today);
  });

  it('handles error from userService gracefully', async () => {
    jest.spyOn(userServiceModule.userService, 'getStreak').mockRejectedValue(new Error('fail'));
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<StreakModal />);
    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalledWith('Error al verificar la racha:', expect.any(Error));
    });
    errorSpy.mockRestore();
  });

  it('renders streak number in the badge', async () => {
    render(<StreakModal />);
    await waitFor(() => {
      expect(screen.getByText('5')).toBeInTheDocument();
    });
  });
});
