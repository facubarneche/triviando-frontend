/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserIdSSR, getTokenSSR, getUserClaimsSSR } from '@/app/utils/auth/getUserIdSSR';

// Mock next/headers
jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

// Mock JWT decode function from security/jwtUtils
jest.mock('@/app/security/jwtUtils', () => ({
  decodeJwtToken: jest.fn(),
}));

import { cookies } from 'next/headers';
import { decodeJwtToken } from '@/app/security/jwtUtils';

const mockCookies = jest.mocked(cookies);
const mockDecodeJwtToken = jest.mocked(decodeJwtToken);

describe('SSR Auth Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTokenSSR', () => {
    it('should return token when cookie exists', async () => {
      const mockToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      const mockGet = jest.fn().mockReturnValue({ value: mockToken });
      const mockCookieStore = Promise.resolve({ get: mockGet });
      mockCookies.mockReturnValue(mockCookieStore as any);

      const result = await getTokenSSR();

      expect(mockCookies).toHaveBeenCalled();
      expect(mockGet).toHaveBeenCalledWith('token');
      expect(result).toBe(mockToken);
    });

    it('should return null when cookie does not exist', async () => {
      const mockGet = jest.fn().mockReturnValue(undefined);
      const mockCookieStore = Promise.resolve({ get: mockGet });
      mockCookies.mockReturnValue(mockCookieStore as any);

      const result = await getTokenSSR();

      expect(mockCookies).toHaveBeenCalled();
      expect(mockGet).toHaveBeenCalledWith('token');
      expect(result).toBeNull();
    });

    it('should return null when error occurs', async () => {
      mockCookies.mockRejectedValue(new Error('Cookie error'));

      const result = await getTokenSSR();

      expect(result).toBeNull();
    });
  });

  describe('getUserIdSSR', () => {
    it('should return user ID when valid token exists', async () => {
      const mockToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      const mockDecodedToken = { id: 123, name: 'John Doe' };

      const mockGet = jest.fn().mockReturnValue({ value: mockToken });
      const mockCookieStore = Promise.resolve({ get: mockGet });
      mockCookies.mockReturnValue(mockCookieStore as any);
      mockDecodeJwtToken.mockReturnValue(mockDecodedToken as any);

      const result = await getUserIdSSR();

      expect(mockCookies).toHaveBeenCalled();
      expect(mockDecodeJwtToken).toHaveBeenCalledWith(mockToken);
      expect(result).toBe(123);
    });

    it('should return null when token does not exist', async () => {
      const mockGet = jest.fn().mockReturnValue(undefined);
      const mockCookieStore = Promise.resolve({ get: mockGet });
      mockCookies.mockReturnValue(mockCookieStore as any);

      const result = await getUserIdSSR();

      expect(mockCookies).toHaveBeenCalled();
      expect(mockDecodeJwtToken).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it('should return null when token is invalid', async () => {
      const mockToken = 'invalid-token';

      const mockGet = jest.fn().mockReturnValue({ value: mockToken });
      const mockCookieStore = Promise.resolve({ get: mockGet });
      mockCookies.mockReturnValue(mockCookieStore as any);
      mockDecodeJwtToken.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      const result = await getUserIdSSR();

      expect(mockCookies).toHaveBeenCalled();
      expect(mockDecodeJwtToken).toHaveBeenCalledWith(mockToken);
      expect(result).toBeNull();
    });

    it('should return null when decoded token has no id', async () => {
      const mockToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      const mockDecodedToken = { name: 'John Doe' }; // No id property

      const mockGet = jest.fn().mockReturnValue({ value: mockToken });
      const mockCookieStore = Promise.resolve({ get: mockGet });
      mockCookies.mockReturnValue(mockCookieStore as any);
      mockDecodeJwtToken.mockReturnValue(mockDecodedToken as any);

      const result = await getUserIdSSR();

      expect(mockCookies).toHaveBeenCalled();
      expect(mockDecodeJwtToken).toHaveBeenCalledWith(mockToken);
      expect(result).toBeNull();
    });
  });

  describe('getUserClaimsSSR', () => {
    it('should return user claims when valid token exists', async () => {
      const mockToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      const mockDecodedToken = {
        id: 123,
        name: 'John Doe',
        username: 'johndoe',
        exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
      };

      const mockGet = jest.fn().mockReturnValue({ value: mockToken });
      const mockCookieStore = Promise.resolve({ get: mockGet });
      mockCookies.mockReturnValue(mockCookieStore as any);
      mockDecodeJwtToken.mockReturnValue(mockDecodedToken as any);

      const result = await getUserClaimsSSR();

      expect(mockCookies).toHaveBeenCalled();
      expect(mockDecodeJwtToken).toHaveBeenCalledWith(mockToken);
      expect(result).toEqual(mockDecodedToken);
    });

    it('should return null when token does not exist', async () => {
      const mockGet = jest.fn().mockReturnValue(undefined);
      const mockCookieStore = Promise.resolve({ get: mockGet });
      mockCookies.mockReturnValue(mockCookieStore as any);

      const result = await getUserClaimsSSR();

      expect(mockCookies).toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it('should return null when getTokenSSR throws error', async () => {
      mockCookies.mockRejectedValue(new Error('Cookie access error'));

      const result = await getUserClaimsSSR();

      expect(result).toBeNull();
    });

    it('should return null when decodeJwtToken throws error', async () => {
      const mockToken = 'invalid-token';

      const mockGet = jest.fn().mockReturnValue({ value: mockToken });
      const mockCookieStore = Promise.resolve({ get: mockGet });
      mockCookies.mockReturnValue(mockCookieStore as any);
      mockDecodeJwtToken.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      const result = await getUserClaimsSSR();

      expect(result).toBeNull();
    });
  });
});
