import { userService } from '../../services/userService';

describe('UserService', () => {
  it('should send correct payload when creating a user', async () => {
    const userPayload = {
      username: 'facuDev',
      email: 'facu@email.com',
      password: '12345678',
    };

    const mockResponse = { id: 1, message: 'User created successfully' };

    // Mockeamos el método .post de la instancia axiosService
    const postMock = jest.fn().mockResolvedValue({ data: mockResponse });

    // @ts-expect-error Forzamos el reemplazo internamente (ya que es protected)
    userService.axiosService.post = postMock;

    const result = await userService.createUser(userPayload);

    expect(postMock).toHaveBeenCalledWith('/users', {
      fullName: 'facuDev',
      email: 'facu@email.com',
      password: '12345678',
      age: 30,
      phoneNumber: '+54 11 1234 5678',
      birthDate: '1995-07-15',
    });

    expect(result).toEqual(mockResponse);
  });
});
