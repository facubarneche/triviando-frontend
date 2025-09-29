import Cookies from 'js-cookie';
import { loginService } from '../../services/loginService';
import { LoginCredentials } from '../../domain/User';

// Mock dependencies
jest.mock('js-cookie', () => ({
  set: jest.fn(),
  get: jest.fn(),
  remove: jest.fn(),
}));

jest.mock('../../stores/userStore', () => ({
  useUserStore: {
    getState: jest.fn(() => ({
      setUser: jest.fn(),
      setAvatar: jest.fn(),
      clearUser: jest.fn(),
      user: null,
      isAuthenticated: false,
    })),
  },
}));

jest.mock('../../services/userService', () => ({
  userService: {
    getUserById: jest.fn(),
  },
}));

jest.mock('../../security/jwtUtils', () => ({
  getUserInfoFromToken: jest.fn(),
  isTokenExpired: jest.fn(),
}));

jest.mock('../../services/cloudinaryAvatarService', () => ({
  cloudinaryAvatarService: {
    getCurrentUserAvatar: jest.fn(),
  },
}));

import { useUserStore } from '../../stores/userStore';
import { userService } from '../../services/userService';
import { getUserInfoFromToken, isTokenExpired } from '../../security/jwtUtils';

const mockAxiosPost = jest.fn();
jest.spyOn(loginService['axiosService'], 'post').mockImplementation(mockAxiosPost);

describe('LoginService', () => {
  const mockUser = {
    id: 1,
    name: 'Test',
    lastName: 'User',
    username: 'testuser',
    email: 'test@example.com',
  };
  const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test';
  const mockTokenInfo = { id: 1, fullname: 'Test User', username: 'testuser', account: 'premium' };
  const credentials: LoginCredentials = { username: 'testuser', password: '1234' };

  const mockUserStore = {
    setUser: jest.fn(),
    setAvatar: jest.fn(),
    clearUser: jest.fn(),
    user: null,
    isAuthenticated: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useUserStore.getState as jest.Mock).mockReturnValue(mockUserStore);
    (getUserInfoFromToken as jest.Mock).mockReturnValue(mockTokenInfo);
    (isTokenExpired as jest.Mock).mockReturnValue(false);
    (userService.getUserById as jest.Mock).mockResolvedValue(mockUser);
  });

  it('should login and set token cookie', async () => {
    mockAxiosPost.mockResolvedValueOnce({ data: { token: mockToken } });

    const result = await loginService.login(credentials);

    expect(Cookies.set).toHaveBeenCalledWith('token', mockToken, {
      expires: 1,
      path: '/',
      sameSite: 'lax',
    });
    expect(mockUserStore.setUser).toHaveBeenCalled();
    expect(result.id).toBe(1);
    expect(result.username).toBe('testuser');
  });

  it('should remove token cookie on logout', () => {
    loginService.logout();
    expect(Cookies.remove).toHaveBeenCalledWith('token');
    expect(mockUserStore.clearUser).toHaveBeenCalled();
  });

  it('should return current user from store or token', () => {
    (Cookies.get as jest.Mock).mockReturnValue(mockToken);

    const result = loginService.getUsuarioActual();

    expect(result).toBeTruthy();
    expect(result?.username).toBe('testuser');
  });

  it('should return true if authenticated with valid token', () => {
    (Cookies.get as jest.Mock).mockReturnValue(mockToken);
    (isTokenExpired as jest.Mock).mockReturnValue(false);

    const result = loginService.isAuthenticated();

    expect(result).toBe(true);
  });
});
