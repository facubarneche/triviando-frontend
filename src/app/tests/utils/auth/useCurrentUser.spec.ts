import { renderHook } from '@testing-library/react';
import { useCurrentUser, useCurrentUserId, useIsAuthenticated } from '../../../utils/auth';

// Mock useUserStore
jest.mock('../../../stores/userStore', () => ({
  useUserStore: jest.fn(),
}));

import { useUserStore } from '../../../stores/userStore';

describe('Authentication Hooks', () => {
  const mockUser = {
    id: 1,
    name: 'Test',
    lastName: 'User',
    username: 'testuser',
    email: 'test@example.com',
    account: 'FREE' as const,
    token: 'mock-token',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useCurrentUser', () => {
    it('should return user when authenticated', () => {
      jest.mocked(useUserStore).mockReturnValue(mockUser);

      const { result } = renderHook(() => useCurrentUser());

      expect(result.current).toEqual(mockUser);
    });

    it('should return null when not authenticated', () => {
      jest.mocked(useUserStore).mockReturnValue(null);

      const { result } = renderHook(() => useCurrentUser());

      expect(result.current).toBeNull();
    });
  });

  describe('useCurrentUserId', () => {
    it('should return user id when authenticated', () => {
      jest.mocked(useUserStore).mockReturnValue(mockUser);

      const { result } = renderHook(() => useCurrentUserId());

      expect(result.current).toBe(1);
    });

    it('should return null when not authenticated', () => {
      jest.mocked(useUserStore).mockReturnValue(null);

      const { result } = renderHook(() => useCurrentUserId());

      expect(result.current).toBeNull();
    });
  });

  describe('useIsAuthenticated', () => {
    it('should return true when user has id', () => {
      jest.mocked(useUserStore).mockReturnValue(mockUser);

      const { result } = renderHook(() => useIsAuthenticated());

      expect(result.current).toBe(true);
    });

    it('should return false when no user', () => {
      jest.mocked(useUserStore).mockReturnValue(null);

      const { result } = renderHook(() => useIsAuthenticated());

      expect(result.current).toBe(false);
    });
  });
});
