import { userService } from '../../services/userService';
import axios from 'axios';

describe('UserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send correct payload when creating a user', async () => {
    const userPayload = {
      username: 'facuDev',
      email: 'facu@email.com',
      password: '12345678',
    };

    const mockResponse = { id: 1, message: 'User created successfully' };

    /**
     * A Jest mock function that simulates an asynchronous POST request,
     * resolving with an object containing the provided mock response data.
     *
     * @remarks
     * This mock is typically used in unit tests to replace actual HTTP POST calls,
     * allowing you to control and assert the returned data without making real network requests.
     *
     * @example
     * postMock.mockResolvedValue({ data: mockResponse });
     */
    const postMock = jest.fn().mockResolvedValue({ data: mockResponse });
    // @ts-expect-error: Mocking axiosService.post for test in createUser
    userService.axiosService.post = postMock;

    const result = await userService.createUser(userPayload);

    expect(postMock).toHaveBeenCalledWith('/users', {
      username: 'facuDev',
      email: 'facu@email.com',
      password: '12345678',
    });

    expect(result).toEqual(mockResponse);
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
    const mockUser = {
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

  it('should edit user by id and update cookie', async () => {
    const userData = {
      id: 2,
      name: 'Facu',
      lastName: 'Dev',
      username: 'facu',
      email: 'f@e.com',
      birthDate: '2000-01-01',
      phoneNumber: '123',
      countryCode: 'AR',
      currentPassword: 'oldpass',
    };
    const mockResponse = { success: true };
    const putMock = jest.fn().mockResolvedValue({ data: mockResponse });
    // @ts-expect-error: Mocking axiosService.put for test in editUserById
    userService.axiosService.put = putMock;

    const result = await userService.editUserById(userData);

    expect(putMock).toHaveBeenCalledWith('/users', userData);
    expect(result).toEqual(mockResponse);
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
});
