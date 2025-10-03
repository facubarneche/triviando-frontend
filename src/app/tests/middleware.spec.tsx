/* eslint-disable @typescript-eslint/no-explicit-any */
import { middleware } from '@/middleware';
import { NextResponse } from 'next/server';

jest.mock('next/server', () => ({
  NextResponse: {
    redirect: jest.fn((url) => ({ redirect: url })),
    next: jest.fn(() => ({ next: true })),
  },
}));

// Mock jwtDecode
jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(),
}));

import { jwtDecode } from 'jwt-decode';

const createRequest = (pathname: string, tokenValue?: string) => ({
  cookies: {
    get: jest.fn((name: string) => {
      if (name === 'token' && tokenValue) {
        return { value: tokenValue };
      }
      return undefined;
    }),
  },
  nextUrl: { pathname, match: RegExp.prototype.exec.bind(/^\/([^\/]+)\/profile$/) },
  url: 'http://localhost' + pathname,
});

const mockValidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test';
const mockJwtClaims = {
  id: 1,
  sub: 'john', // username
  fullname: 'John Doe',
  account: 'FREE' as const,
  exp: Math.floor(Date.now() / 1000) + 3600, // Valid for 1 hour
};

describe('middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (jwtDecode as jest.Mock).mockReturnValue(mockJwtClaims);
  });

  it('redirects to /login if not logged in and at root', () => {
    const req = createRequest('/');
    const res = middleware(req as any);
    expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/login', req.url));
    expect(res).toEqual({ redirect: new URL('/login', req.url) });
  });

  it('allows logged in users to access root without redirect', () => {
    const req = createRequest('/', mockValidToken);
    const res = middleware(req as any);
    expect(NextResponse.next).toHaveBeenCalled();
    expect(res).toEqual({ next: true });
  });

  it('redirects to /unauthorized if profile username does not match token', () => {
    const req = createRequest('/jane/profile', mockValidToken);
    const res = middleware(req as any);
    expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/unauthorized', req.url));
    expect(res).toEqual({ redirect: new URL('/unauthorized', req.url) });
  });

  it('calls NextResponse.next if everything is fine', () => {
    const req = createRequest('/john/profile', mockValidToken);
    const res = middleware(req as any);
    expect(NextResponse.next).toHaveBeenCalled();
    expect(res).toEqual({ next: true });
  });

  it('allows access when username case differs between URL and token', () => {
    const mockClaims = { ...mockJwtClaims, sub: 'MaxUser' };
    (jwtDecode as jest.Mock).mockReturnValue(mockClaims);

    const req = createRequest('/maxuser/profile', mockValidToken);
    const res = middleware(req as any);
    expect(NextResponse.next).toHaveBeenCalled();
    expect(res).toEqual({ next: true });
  });

  it('allows access when URL has mixed case but token has different case', () => {
    const mockClaims = { ...mockJwtClaims, sub: 'john' };
    (jwtDecode as jest.Mock).mockReturnValue(mockClaims);

    const req = createRequest('/JOHN/profile', mockValidToken);
    const res = middleware(req as any);
    expect(NextResponse.next).toHaveBeenCalled();
    expect(res).toEqual({ next: true });
  });

  it('still blocks access when usernames are completely different (case-insensitive)', () => {
    const mockClaims = { ...mockJwtClaims, sub: 'MaxUser' };
    (jwtDecode as jest.Mock).mockReturnValue(mockClaims);

    const req = createRequest('/differentuser/profile', mockValidToken);
    const res = middleware(req as any);
    expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/unauthorized', req.url));
    expect(res).toEqual({ redirect: new URL('/unauthorized', req.url) });
  });
});
