import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

interface JwtClaims {
  id: number;
  sub: string; // username
  fullname: string;
  account: 'FREE' | 'PREMIUM';
  exp: number;
  iat?: number;
}

function isTokenExpired(token: string): boolean {
  try {
    const claims = jwtDecode<JwtClaims>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return claims.exp < currentTime;
  } catch {
    return true;
  }
}

export function middleware(request: NextRequest) {
  const tokenCookie = request.cookies.get('token');
  const url = request.nextUrl;

  // Redirección inicial según login
  if (!tokenCookie && url.pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const profileMatch = url.pathname.match(/^\/([^\/]+)\/profile$/);

  if (profileMatch) {
    const usernameFromUrl = profileMatch[1];

    if (!tokenCookie) {
      // Si no hay token pero se intenta acceder al perfil, redirigir a login
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const token = tokenCookie.value;

      // Verificar si el token ha expirado
      if (isTokenExpired(token)) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      // Decodificar el token para obtener el username
      const claims = jwtDecode<JwtClaims>(token);
      const usernameFromToken = claims.sub;

      if (!usernameFromToken) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }

      // Comparación case-insensitive entre username de URL y token
      if (usernameFromUrl.toLowerCase() !== usernameFromToken.toLowerCase()) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    } catch (error) {
      console.error('Error parsing JWT token:', error, 'Token value:', tokenCookie.value);
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}
