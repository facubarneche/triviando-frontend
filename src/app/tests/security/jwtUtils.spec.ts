/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  getUserInfoFromToken, 
  isTokenExpired, 
  extractTokenFromCookie,
  decodeJwtToken,
  getValidTokenClaims
} from '../../security/jwtUtils';

// Mock jwtDecode
jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(),
}));

import { jwtDecode } from 'jwt-decode';

describe('jwtUtils', () => {
  const mockValidClaims = {
    id: 123,
    sub: 'testuser',
    fullname: 'Test User',
    account: 'FREE' as const,
    exp: Math.floor(Date.now() / 1000) + 3600, // Valid for 1 hour
    iat: Math.floor(Date.now() / 1000),
  };

  const mockExpiredClaims = {
    ...mockValidClaims,
    exp: Math.floor(Date.now() / 1000) - 3600, // Expired 1 hour ago
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserInfoFromToken', () => {
    it('should return user info for valid token', () => {
      jest.mocked(jwtDecode).mockReturnValue(mockValidClaims);

      const result = getUserInfoFromToken('valid.jwt.token');

      expect(result).toEqual({
        id: 123,
        username: 'testuser',
        fullname: 'Test User',
        account: 'FREE',
        isExpired: false,
      });
      expect(jwtDecode).toHaveBeenCalledWith('valid.jwt.token');
    });

    it('should return null for invalid token', () => {
      jest.mocked(jwtDecode).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      const result = getUserInfoFromToken('invalid.token');

      expect(result).toBeNull();
    });

    it('should return null for malformed claims', () => {
      jest.mocked(jwtDecode).mockReturnValue({
        // Missing required fields
        exp: Math.floor(Date.now() / 1000) + 3600,
      });

      const result = getUserInfoFromToken('malformed.token');

      expect(result).toBeNull();
    });
  });

  describe('isTokenExpired', () => {
    it('should return false for valid token', () => {
      jest.mocked(jwtDecode).mockReturnValue(mockValidClaims);

      const result = isTokenExpired('valid.token');

      expect(result).toBe(false);
    });

    it('should return true for expired token', () => {
      jest.mocked(jwtDecode).mockReturnValue(mockExpiredClaims);

      const result = isTokenExpired('expired.token');

      expect(result).toBe(true);
    });

    it('should return true for invalid token', () => {
      jest.mocked(jwtDecode).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      const result = isTokenExpired('invalid.token');

      expect(result).toBe(true);
    });

    it('should return true for token without exp claim', () => {
      jest.mocked(jwtDecode).mockReturnValue({
        id: 123,
        sub: 'testuser',
        // Missing exp claim
      });

      const result = isTokenExpired('no-exp.token');

      expect(result).toBe(true);
    });
  });

  describe('decodeJwtToken', () => {
    it('should decode valid token with required fields', () => {
      jest.mocked(jwtDecode).mockReturnValue(mockValidClaims);

      const result = decodeJwtToken('valid.token');

      expect(result).toEqual(mockValidClaims);
    });

    it('should throw error for token missing required fields', () => {
      jest.mocked(jwtDecode).mockReturnValue({
        // Missing id, sub, exp
        fullname: 'Test User',
      } as any);

      expect(() => decodeJwtToken('incomplete.token')).toThrow('Token JWT inválido o malformado');
    });

    it('should throw error for invalid token', () => {
      jest.mocked(jwtDecode).mockImplementation(() => {
        throw new Error('Invalid token format');
      });

      expect(() => decodeJwtToken('invalid.token')).toThrow('Token JWT inválido o malformado');
    });
  });

  describe('getValidTokenClaims', () => {
    it('should return claims for valid non-expired token', () => {
      jest.mocked(jwtDecode).mockReturnValue(mockValidClaims);

      const result = getValidTokenClaims('valid.token');

      expect(result).toEqual(mockValidClaims);
    });

    it('should return null for expired token', () => {
      jest.mocked(jwtDecode).mockReturnValue(mockExpiredClaims);

      const result = getValidTokenClaims('expired.token');

      expect(result).toBeNull();
    });

    it('should return null for invalid token', () => {
      jest.mocked(jwtDecode).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      const result = getValidTokenClaims('invalid.token');

      expect(result).toBeNull();
    });
  });

  describe('extractTokenFromCookie', () => {
    it('should return token value directly', () => {
      const tokenValue = 'valid.jwt.token';

      const result = extractTokenFromCookie(tokenValue);

      expect(result).toBe('valid.jwt.token');
    });

    it('should return token for any valid string', () => {
      const tokenValue = 'my.jwt.token';

      const result = extractTokenFromCookie(tokenValue);

      expect(result).toBe('my.jwt.token');
    });

    it('should return null for empty string', () => {
      const result = extractTokenFromCookie('');

      expect(result).toBeNull();
    });

    it('should handle non-empty token values', () => {
      const result = extractTokenFromCookie('some.jwt.value');

      expect(result).toBe('some.jwt.value');
    });
  });

  describe('Edge cases', () => {
    it('should handle malformed JWT structure', () => {
      jest.mocked(jwtDecode).mockReturnValue('not-an-object');

      const userInfo = getUserInfoFromToken('malformed.token');
      const isExpired = isTokenExpired('malformed.token');

      expect(userInfo).toBeNull();
      expect(isExpired).toBe(true);
    });

    it('should handle numeric exp as string', () => {
      jest.mocked(jwtDecode).mockReturnValue({
        ...mockValidClaims,
        exp: '1234567890', // String instead of number
      });

      const result = isTokenExpired('string-exp.token');

      expect(result).toBe(true); // Should handle gracefully
    });
  });
});