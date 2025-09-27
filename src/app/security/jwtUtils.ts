import { jwtDecode } from 'jwt-decode';

/**
 * Interface para los claims del JWT token
 */
export interface JwtClaims {
  /** ID único del usuario */
  id: number;
  /** Tipo de cuenta del usuario */
  account: 'FREE' | 'PREMIUM';
  /** Nombre completo del usuario */
  fullname: string;
  /** Username (subject del JWT) */
  sub: string;
  /** Tiempo de expiración del token */
  exp: number;
  /** Tiempo de emisión del token */
  iat?: number;
  /** Issuer del token */
  iss?: string;
  /** Propiedades adicionales */
  [key: string]: unknown;
}

/**
 * Decodifica un token JWT y extrae los claims
 * @param token - Token JWT a decodificar
 * @returns Claims del token
 * @throws Error si el token es inválido o está malformado
 */
export const decodeJwtToken = (token: string): JwtClaims => {
  try {
    const decoded = jwtDecode<JwtClaims>(token);

    // Validaciones básicas
    if (!decoded.id || !decoded.sub || !decoded.exp) {
      throw new Error('Token JWT no contiene los campos requeridos');
    }

    return decoded;
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    throw new Error('Token JWT inválido o malformado');
  }
};

/**
 * Verifica si el token ha expirado
 * @param token - Token JWT a verificar
 * @returns true si el token ha expirado, false en caso contrario
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const claims = decodeJwtToken(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return claims.exp < currentTime;
  } catch {
    return true; // Si no se puede decodificar, considerar como expirado
  }
};

/**
 * Obtiene los claims del token si es válido y no ha expirado
 * @param token - Token JWT
 * @returns Claims si el token es válido, null si es inválido o expirado
 */
export const getValidTokenClaims = (token: string): JwtClaims | null => {
  try {
    if (isTokenExpired(token)) {
      return null;
    }
    return decodeJwtToken(token);
  } catch {
    return null;
  }
};

/**
 * Extrae el token directamente de la cookie 'token'
 * @param cookieValue - Valor de la cookie 'token' (directamente el JWT)
 * @returns Token JWT si existe, null en caso contrario
 */
export const extractTokenFromCookie = (cookieValue: string): string | null => {
  try {
    // La cookie 'token' contiene directamente el JWT
    return cookieValue || null;
  } catch (error) {
    console.error('Error extracting token from cookie:', error);
    return null;
  }
};

/**
 * Utility para obtener información básica del usuario desde el token
 * @param token - Token JWT
 * @returns Información básica del usuario
 */
export const getUserInfoFromToken = (token: string) => {
  try {
    const claims = getValidTokenClaims(token);
    if (!claims) return null;

    return {
      id: claims.id,
      username: claims.sub,
      fullname: claims.fullname,
      account: claims.account,
      isExpired: false,
    };
  } catch {
    return null;
  }
};
