/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseService } from '../../services/baseService';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock del interceptor
const mockInterceptors = {
  request: {
    use: jest.fn(),
  },
  response: {
    use: jest.fn(),
  },
};

describe('BaseService', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    mockedAxios.create.mockClear();

    // Mock axios.create para que devuelva un objeto con interceptors
    mockedAxios.create.mockReturnValue({
      interceptors: mockInterceptors,
    } as any);
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should use NEXT_PUBLIC_API_URL_CLIENT when running on client', () => {
    (global as any).window = {};
    process.env.NEXT_PUBLIC_API_URL_CLIENT = 'http://client-url:4000';

    new BaseService();

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'http://client-url:4000/api/v1',
      withCredentials: true,
    });
  });

  it('should fallback to DEFAULT_API_URL on server if env var is not set', () => {
    (global as any).window = undefined;
    delete process.env.API_URL_SERVER;

    new BaseService();

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'http://localhost:8080/api/v1',
      withCredentials: true,
    });
  });

  it('should fallback to DEFAULT_API_URL on client if env var is not set', () => {
    (global as any).window = {};
    delete process.env.NEXT_PUBLIC_API_URL_CLIENT;

    new BaseService();

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'http://localhost:8080/api/v1',
      withCredentials: true,
    });
  });
});
