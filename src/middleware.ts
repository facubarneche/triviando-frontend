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

  // Rutas públicas que no requieren autenticación
  const publicRoutes = ['/login', '/register', '/policy', '/terms', '/unauthorized'];
  const isPublicRoute = publicRoutes.some((route) => url.pathname.startsWith(route));

  // Si es una ruta pública, permitir acceso
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Manejo de la ruta raíz '/'
  if (url.pathname === '/') {
    if (!tokenCookie) {
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

      // Redirigir usuario autenticado a su página de topics
      return NextResponse.redirect(new URL(`/${usernameFromToken}/topics`, request.url));
    } catch (error) {
      console.error('Error parsing JWT token:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Para todas las rutas protegidas (cualquier ruta con username), verificar autenticación
  const protectedRouteMatch = url.pathname.match(/^\/([^\/]+)(?:\/.*)?$/);

  if (protectedRouteMatch) {
    const usernameFromUrl = protectedRouteMatch[1];

    // Si no hay token, redirigir a login
    if (!tokenCookie) {
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

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.ico$|.*\\.mp3$).*)',
  ],
};
