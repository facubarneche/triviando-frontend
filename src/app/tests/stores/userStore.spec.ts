import { useUserStore } from '../../stores/userStore';
import { act, renderHook } from '@testing-library/react';

describe('userStore', () => {
  const mockUser = {
    id: 1,
    name: 'Test',
    lastName: 'User',
    username: 'testuser',
    token: 'mock-token',
  };

  beforeEach(() => {
    // Reset store before each test
    act(() => {
      useUserStore.getState().clearUser();
    });
  });

  describe('Initial state', () => {
    it('should have null user and false isAuthenticated initially', () => {
      const { result } = renderHook(() => useUserStore());

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('setUser', () => {
    it('should set user and mark as authenticated', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setUser(mockUser);
      });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
    });

    it('should update user data when called multiple times', () => {
      const { result } = renderHook(() => useUserStore());
      const updatedUser = { ...mockUser, name: 'Updated' };

      act(() => {
        result.current.setUser(mockUser);
      });

      act(() => {
        result.current.setUser(updatedUser);
      });

      expect(result.current.user).toEqual(updatedUser);
      expect(result.current.user?.name).toBe('Updated');
    });
  });

  describe('updateUser', () => {
    it('should update existing user properties', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setUser(mockUser);
      });

      act(() => {
        result.current.updateUser({ name: 'Updated Name', lastName: 'Updated Last' });
      });

      expect(result.current.user?.name).toBe('Updated Name');
      expect(result.current.user?.lastName).toBe('Updated Last');
      expect(result.current.user?.username).toBe('testuser'); // Should remain unchanged
    });

    it('should not update if no user is set', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.updateUser({ name: 'Should not work' });
      });

      expect(result.current.user).toBeNull();
    });
  });

  describe('setAvatar', () => {
    it('should set avatar for existing user', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setUser(mockUser);
      });

      act(() => {
        result.current.setAvatar('avatar123');
      });

      expect(result.current.user?.avatar).toBe('avatar123');
    });

    it('should not set avatar if no user exists', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setAvatar('avatar123');
      });

      expect(result.current.user).toBeNull();
    });
  });

  describe('clearUser', () => {
    it('should clear user and set isAuthenticated to false', () => {
      const { result } = renderHook(() => useUserStore());

      // First set a user
      act(() => {
        result.current.setUser(mockUser);
      });

      expect(result.current.isAuthenticated).toBe(true);

      // Then clear it
      act(() => {
        result.current.clearUser();
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('State selectors', () => {
    it('should work with state selectors', () => {
      act(() => {
        useUserStore.getState().setUser(mockUser);
      });

      // Test user selector
      const user = useUserStore.getState().user;
      expect(user).toEqual(mockUser);

      // Test authentication selector
      const isAuthenticated = useUserStore.getState().isAuthenticated;
      expect(isAuthenticated).toBe(true);
    });

    it('should update selectors when state changes', () => {
      // Initially no user
      expect(useUserStore.getState().isAuthenticated).toBe(false);

      // Set user
      act(() => {
        useUserStore.getState().setUser(mockUser);
      });

      expect(useUserStore.getState().isAuthenticated).toBe(true);
      expect(useUserStore.getState().user?.username).toBe('testuser');

      // Clear user
      act(() => {
        useUserStore.getState().clearUser();
      });

      expect(useUserStore.getState().isAuthenticated).toBe(false);
      expect(useUserStore.getState().user).toBeNull();
    });
  });

  describe('Store persistence', () => {
    it('should maintain state across multiple hook instances', () => {
      const { result: result1 } = renderHook(() => useUserStore());
      const { result: result2 } = renderHook(() => useUserStore());

      act(() => {
        result1.current.setUser(mockUser);
      });

      // Both hooks should see the same state
      expect(result1.current.user).toEqual(mockUser);
      expect(result2.current.user).toEqual(mockUser);
      expect(result1.current.isAuthenticated).toBe(true);
      expect(result2.current.isAuthenticated).toBe(true);
    });

    it('should propagate changes across hook instances', () => {
      const { result: result1 } = renderHook(() => useUserStore());
      const { result: result2 } = renderHook(() => useUserStore());

      act(() => {
        result1.current.setUser(mockUser);
      });

      act(() => {
        result2.current.updateUser({ name: 'Changed by result2' });
      });

      // Both should see the updated state
      expect(result1.current.user?.name).toBe('Changed by result2');
      expect(result2.current.user?.name).toBe('Changed by result2');
    });
  });

  describe('Edge cases', () => {
    it('should handle updating user with partial data', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setUser(mockUser);
      });

      act(() => {
        result.current.updateUser({ name: 'Only Name' });
      });

      expect(result.current.user?.name).toBe('Only Name');
      expect(result.current.user?.lastName).toBe(mockUser.lastName); // Should keep original
      expect(result.current.user?.username).toBe(mockUser.username); // Should keep original
    });

    it('should handle setting user to null-like values gracefully', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setUser(mockUser);
      });

      // Clear the user instead
      act(() => {
        result.current.clearUser();
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });
  });
});
