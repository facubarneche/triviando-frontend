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

  // Validar rutas con username dinámico (como /[username]/profile)
  // const pathSegments = url.pathname.split('/').filter(Boolean);

  // if (cookieUsuario && pathSegments.length > 1) {
  //   const usernameFromPath = pathSegments[0];
  //   const { username: usernameFromCookie } = JSON.parse(cookieUsuario.value);

  //   if (usernameFromPath !== usernameFromCookie) {
  //     const response = NextResponse.redirect(new URL('/unauthorized', request.url));
  //     response.cookies.set('unauthorized', 'true', { path: '/' });
  //     return response;
  //   }
  // }

  return NextResponse.next();
}
