import { getUserId } from '../../utils/getUserId';
import { cookies } from 'next/headers';

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

describe('getUserId', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the user id when the usuario cookie is present and valid', async () => {
    const mockCookieStore = {
      get: jest.fn().mockReturnValue({ value: JSON.stringify({ id: '123' }) }),
    };
    (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

    const result = await getUserId();
    expect(result).toBe('123');
    expect(mockCookieStore.get).toHaveBeenCalledWith('usuario');
  });

  it('should return null when the usuario cookie is not present', async () => {
    const mockCookieStore = {
      get: jest.fn().mockReturnValue(undefined),
    };
    (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

    const result = await getUserId();
    expect(result).toBeNull();
    expect(mockCookieStore.get).toHaveBeenCalledWith('usuario');
  });

  it('should return null when the usuario cookie does not have an id property', async () => {
    const mockCookieStore = {
      get: jest.fn().mockReturnValue({ value: JSON.stringify({ name: 'test' }) }),
    };
    (cookies as jest.Mock).mockResolvedValue(mockCookieStore);

    const result = await getUserId();
    expect(result).toBeUndefined();
  });
});
