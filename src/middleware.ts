import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const cookieUsuario = request.cookies.get('usuario');
  const url = request.nextUrl;

  // Si no hay cookie y la ruta es "/", redirige a /login
  if (!cookieUsuario && url.pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si hay cookie y la ruta es "/", redirige a /topics
  if (cookieUsuario && url.pathname === '/') {
    return NextResponse.redirect(new URL('/topics', request.url));
  }

  if (url.pathname.includes('/profile')) {
    const userIdFromPath = url.pathname.split('/')[1];
    const userIdFromCookie = cookieUsuario ? JSON.parse(cookieUsuario.value).id : null;

    if (`${userIdFromPath}` !== `${userIdFromCookie}`) {
      const response = NextResponse.redirect(new URL('/unauthorized', request.url));
      response.cookies.set('unauthorized', 'true', { path: '/' });
      return response;
    }
  }

  return NextResponse.next(); // Permite continuar si todo está bien
}
