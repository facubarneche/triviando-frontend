import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const cookieUsuario = request.cookies.get('usuario');
  const url = request.nextUrl;

  // Redirección inicial según login
  if (!cookieUsuario && url.pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (cookieUsuario && url.pathname === '/') {
    return NextResponse.redirect(new URL('/topics', request.url));
  }

  const profileMatch = url.pathname.match(/^\/([^\/]+)\/profile$/);

  if (cookieUsuario && profileMatch) {
    try {
      const user = JSON.parse(decodeURIComponent(cookieUsuario.value));
      const usernameFromUrl = profileMatch[1]; // lo que viene en la ruta
      const usernameFromCookie = user.username;

      if (usernameFromUrl !== usernameFromCookie) {
        // Redirigir a /unauthorized si no coinciden
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    } catch (err) {
      console.error('Error al parsear la cookie del usuario', err);
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}
