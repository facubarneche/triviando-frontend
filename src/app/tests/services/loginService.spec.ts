import Cookies from 'js-cookie';
import { loginService } from '../../services/loginService';
import { LoginCredentials } from '../../domain/User';

jest.mock('js-cookie', () => ({
  set: jest.fn(),
  get: jest.fn(),
  remove: jest.fn(),
}));

const mockAxiosPost = jest.fn();

jest.spyOn(loginService['axiosService'], 'post').mockImplementation(mockAxiosPost);

describe('LoginService', () => {
  const mockUser = { id: 1, nombre: 'Test', email: 'test@test.com' };
  const credentials: LoginCredentials = { email: 'test@test.com', password: '1234' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should login and set cookie', async () => {
    mockAxiosPost.mockResolvedValueOnce({ data: mockUser });
    await expect(loginService.login(credentials)).resolves.toEqual(mockUser);
    expect(Cookies.set).toHaveBeenCalledWith('usuario', JSON.stringify(mockUser), { expires: 1 });
  });

  it('should remove cookie on logout', () => {
    loginService.logout();
    expect(Cookies.remove).toHaveBeenCalledWith('usuario');
  });

  it('should return current user from cookie', () => {
    (Cookies.get as jest.Mock).mockReturnValueOnce(JSON.stringify(mockUser));
    expect(loginService.getUsuarioActual()).toEqual(mockUser);
  });

  it('should return null if no user cookie', () => {
    (Cookies.get as jest.Mock).mockReturnValueOnce(undefined);
    expect(loginService.getUsuarioActual()).toBeNull();
  });

  it('should return true if authenticated', () => {
    (Cookies.get as jest.Mock).mockReturnValueOnce('somevalue');
    expect(loginService.isAuthenticated()).toBe(true);
  });

  it('should return false if not authenticated', () => {
    (Cookies.get as jest.Mock).mockReturnValueOnce(undefined);
    expect(loginService.isAuthenticated()).toBe(false);
  });

  it('should throw error if user does not exist', () => {
    jest.spyOn(loginService, 'getUsuarioActual').mockReturnValueOnce(null);
    expect(() => loginService.getUserId()).toThrow('No se encontró el ID del usuario');
  });
});
