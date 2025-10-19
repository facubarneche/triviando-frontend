import { userService } from '../../services/userService';
import type { IUserData } from '../../services/userService';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useUserStore } from '../../stores/userStore';
import { getUserInfoFromToken } from '../../security/jwtUtils';
import { cloudinaryAvatarService } from '../../services/cloudinaryAvatarService';

// Mock dependencies
jest.mock('js-cookie');
jest.mock('../../stores/userStore');
jest.mock('../../security/jwtUtils');
jest.mock('../../services/cloudinaryAvatarService');

describe('UserService', () => {
  const mockUserStore = {
    getState: jest.fn(() => ({
      setUser: jest.fn(),
      setAvatar: jest.fn(),
    })),
  };

  beforeEach(() => {
    // Setup mocks
    (useUserStore as unknown as jest.Mock).mockReturnValue(mockUserStore);
    (getUserInfoFromToken as jest.Mock).mockReturnValue({
      id: 1,
      username: 'facuDev',
      fullname: 'Facu Developer',
      account: 'FREE' as const,
    });
    (cloudinaryAvatarService.getCurrentUserAvatar as jest.Mock).mockResolvedValue(null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create user and update context correctly', async () => {
    const userPayload = {
      username: 'facuDev',
      email: 'facu@email.com',
      password: '12345678',
    };

    const mockResponse = { token: 'mock-jwt-token' };
    const mockTokenData = {
      id: 1,
      username: 'facuDev',
      fullname: 'Facu Developer',
      account: 'FREE' as const,
    };
    const mockUserData: IUserData = {
      id: 1,
      name: 'Facu',
      lastName: 'Developer',
      username: 'facuDev',
      email: 'facu@email.com',
      phoneNumber: '',
      countryCode: '',
      birthDate: '',
      joinDate: '',
      age: 0,
      avatar: 'avatar-id',
      account: 'FREE',
    };

    const postMock = jest.fn().mockResolvedValue({ data: mockResponse });
    const getUserByIdSpy = jest.spyOn(userService, 'getUserById').mockResolvedValue(mockUserData);
    const setUserMock = jest.fn();
    const setAvatarMock = jest.fn();

    // @ts-expect-error: Mocking axiosService.post for test in createUser
    userService.axiosService.post = postMock;

    (getUserInfoFromToken as jest.Mock).mockReturnValue(mockTokenData);
    (useUserStore.getState as jest.Mock).mockReturnValue({
      setUser: setUserMock,
      setAvatar: setAvatarMock,
    });
    (cloudinaryAvatarService.getCurrentUserAvatar as jest.Mock).mockResolvedValue(null);

    const result = await userService.createUser(userPayload);

    // Verify API call
    expect(postMock).toHaveBeenCalledWith('/users', userPayload);

    // Verify token storage
    expect(Cookies.set).toHaveBeenCalledWith('token', 'mock-jwt-token', {
      expires: 1,
      path: '/',
      sameSite: 'lax',
    });

    // Verify JWT decoding
    expect(getUserInfoFromToken).toHaveBeenCalledWith('mock-jwt-token');

    // Verify user data fetch
    expect(getUserByIdSpy).toHaveBeenCalledWith(1);

    // Verify store update
    expect(setUserMock).toHaveBeenCalledWith({
      id: 1,
      name: 'Facu',
      lastName: 'Developer',
      username: 'facuDev',
      email: 'facu@email.com',
      account: 'FREE',
      token: 'mock-jwt-token',
      avatar: 'avatar-id',
    });

    // Verify return value
    expect(result).toEqual({
      id: 1,
      name: 'Facu',
      lastName: 'Developer',
      username: 'facuDev',
      email: 'facu@email.com',
      account: 'FREE',
      token: 'mock-jwt-token',
      avatar: 'avatar-id',
    });

    getUserByIdSpy.mockRestore();
  });

  it('should throw error with backend message on createUser failure', async () => {
    const errorMsg = 'Email already exists';
    const error = {
      response: { data: { error: errorMsg } },
      isAxiosError: true,
    };
    jest.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    const postMock = jest.fn().mockRejectedValue(error);
    // @ts-expect-error: Mocking axiosService.post for test in createUser failure
    userService.axiosService.post = postMock;

    await expect(userService.createUser({ username: '', email: '', password: '' })).rejects.toThrow(
      errorMsg,
    );
  });

  it('should throw generic error on createUser unknown failure', async () => {
    jest.spyOn(axios, 'isAxiosError').mockReturnValue(false);
    const postMock = jest.fn().mockRejectedValue(new Error('fail'));
    // @ts-expect-error: Mocking axiosService.post for test in createUser unknown failure
    userService.axiosService.post = postMock;

    await expect(userService.createUser({ username: '', email: '', password: '' })).rejects.toThrow(
      'Registro fallido',
    );
  });

  it('should get user by id', async () => {
    const userId = 5;
    const mockUser: IUserData = {
      id: 5,
      name: 'Facu',
      lastName: 'Dev',
      username: 'facu',
      email: 'f@e.com',
      phoneNumber: '',
      countryCode: '',
      birthDate: '',
      joinDate: '',
      age: 20,
      account: 'FREE',
    };
    const getMock = jest.fn().mockResolvedValue({ data: mockUser });
    // @ts-expect-error: Mocking axiosService.get for test in getUserById
    userService.axiosService.get = getMock;

    const result = await userService.getUserById(userId);

    expect(getMock).toHaveBeenCalledWith(`/users/${userId}`);
    expect(result).toEqual(mockUser);
  });

  it('should throw error with backend message on getUserById failure', async () => {
    const errorMsg = 'User not found';
    const error = {
      response: { data: { error: errorMsg } },
      isAxiosError: true,
    };
    jest.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    const getMock = jest.fn().mockRejectedValue(error);
    // @ts-expect-error: Mocking axiosService.get for test in getUserById failure
    userService.axiosService.get = getMock;

    await expect(userService.getUserById(1)).rejects.toThrow(errorMsg);
  });

  it('should throw error with backend message on editUserById failure', async () => {
    const errorMsg = 'Edit failed';
    const error = {
      response: { data: { error: errorMsg } },
      isAxiosError: true,
    };
    jest.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    const putMock = jest.fn().mockRejectedValue(error);
    // @ts-expect-error: Mocking axiosService.put for test in editUserById failure
    userService.axiosService.put = putMock;

    await expect(userService.editUserById({ id: 1 })).rejects.toThrow(errorMsg);
  });

  it('should get user register date', async () => {
    const userId = 3;
    const mockDate = { registerDate: '2023-01-01' };
    const getMock = jest.fn().mockResolvedValue({ data: mockDate });
    // @ts-expect-error: Mocking axiosService.get for test in getUserRegisterDate
    userService.axiosService.get = getMock;

    const result = await userService.getUserRegisterDate(userId);

    expect(getMock).toHaveBeenCalledWith(`/users/${userId}/register-date`);
    expect(result).toEqual(mockDate);
  });

  it('should get user statistics', async () => {
    const userId = 4;
    const mockStats = { gamesPlayed: 10, wins: 5 };
    const getMock = jest.fn().mockResolvedValue({ data: mockStats });
    // @ts-expect-error: Mocking axiosService.get
    userService.axiosService.get = getMock;

    const result = await userService.getUserStatistics(userId);

    expect(getMock).toHaveBeenCalledWith(`/users/statistics/${userId}`);
    expect(result).toEqual(mockStats);
  });

  it('should get user streak', async () => {
    const userId = 7;
    const mockStreak = { streak: 12 };
    const getMock = jest.fn().mockResolvedValue({ data: mockStreak });
    // @ts-expect-error: Mocking axiosService.get
    userService.axiosService.get = getMock;

    const result = await userService.getStreak(userId);

    expect(getMock).toHaveBeenCalledWith(`/users/racha/${userId}`);
    expect(result).toEqual(mockStreak);
  });

  it('should throw generic error if axios error is not detected', async () => {
    jest.spyOn(axios, 'isAxiosError').mockReturnValue(false);
    const getMock = jest.fn().mockRejectedValue(new Error('fail'));
    // @ts-expect-error: Mocking axiosService.get
    userService.axiosService.get = getMock;

    await expect(userService.getUserById(1)).rejects.toThrow('Error al obtener el usuario');
    await expect(userService.getUserRegisterDate(1)).rejects.toThrow(
      'Error al obtener la fecha de registro del usuario',
    );
    await expect(userService.getUserStatistics(1)).rejects.toThrow(
      'Error al obtener las estadísticas del usuario',
    );
    await expect(userService.getStreak(1)).rejects.toThrow('Error al obtener la racha del usuario');
  });

  it('should throw error with backend message on getUserRegisterDate failure', async () => {
    const errorMsg = 'Register date not found';
    const error = {
      response: { data: { error: errorMsg } },
      isAxiosError: true,
    };
    jest.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    const getMock = jest.fn().mockRejectedValue(error);
    // @ts-expect-error: Mocking axiosService.get
    userService.axiosService.get = getMock;

    await expect(userService.getUserRegisterDate(1)).rejects.toThrow(errorMsg);
  });

  it('should throw error with backend message on getUserStatistics failure', async () => {
    const errorMsg = 'Statistics not found';
    const error = {
      response: { data: { error: errorMsg } },
      isAxiosError: true,
    };
    jest.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    const getMock = jest.fn().mockRejectedValue(error);
    // @ts-expect-error: Mocking axiosService.get
    userService.axiosService.get = getMock;

    await expect(userService.getUserStatistics(1)).rejects.toThrow(errorMsg);
  });

  it('should throw error with backend message on getStreak failure', async () => {
    const errorMsg = 'Streak not found';
    const error = {
      response: { data: { error: errorMsg } },
      isAxiosError: true,
    };
    jest.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    const getMock = jest.fn().mockRejectedValue(error);
    // @ts-expect-error: Mocking axiosService.get
    userService.axiosService.get = getMock;

    await expect(userService.getStreak(1)).rejects.toThrow(errorMsg);
  });
});
