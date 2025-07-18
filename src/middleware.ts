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

  if (cookieUsuario && profileMatch) {
    try {
      const user = JSON.parse(decodeURIComponent(cookieUsuario.value));
      const usernameFromUrl = profileMatch[1]; // lo que viene en la ruta
      const usernameFromCookie = user.username;

      if (!usernameFromCookie || usernameFromUrl !== usernameFromCookie) {
        // Redirigir a /unauthorized si no coinciden o no hay username
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    } catch (error) {
      console.error('Error parsing user cookie:', error);
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  } else if (!cookieUsuario && profileMatch) {
    // Si no hay cookie pero se intenta acceder al perfil, redirigir a login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

