import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const cookieUsuario = request.cookies.get('usuario');
  const url = request.nextUrl;

  // Redirección inicial según login
  if (!cookieUsuario && url.pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const profileMatch = url.pathname.match(/^\/([^\/]+)\/profile$/);

  if (profileMatch) {
    const usernameFromUrl = profileMatch[1];

    if (!cookieUsuario) {
      // Si no hay cookie pero se intenta acceder al perfil, redirigir a login
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const rawCookieValue = cookieUsuario.value;
      let user;

      // Intentar parsear la cookie directamente primero
      try {
        user = JSON.parse(rawCookieValue);
      } catch {
        // Si falla, intentar con decodeURIComponent
        user = JSON.parse(decodeURIComponent(rawCookieValue));
      }

      const usernameFromCookie = user?.username;

      if (!usernameFromCookie) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }

      // Comparación case-insensitive entre username de URL y cookie
      if (usernameFromUrl.toLowerCase() !== usernameFromCookie.toLowerCase()) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    } catch (error) {
      console.error('Error parsing user cookie:', error, 'Cookie value:', cookieUsuario.value);
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}
