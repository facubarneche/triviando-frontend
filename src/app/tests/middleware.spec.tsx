/* eslint-disable @typescript-eslint/no-explicit-any */
import { middleware } from '@/middleware';
import { NextResponse } from 'next/server';

jest.mock('next/server', () => ({
  NextResponse: {
    redirect: jest.fn((url) => ({ redirect: url })),
    next: jest.fn(() => ({ next: true })),
  },
}));

const createRequest = (pathname: string, cookieValue?: string) => ({
  cookies: {
    get: jest.fn(() => (cookieValue ? { value: cookieValue } : undefined)),
  },
  nextUrl: { pathname, match: RegExp.prototype.exec.bind(/^\/([^\/]+)\/profile$/) },
  url: 'http://localhost' + pathname,
});

describe('middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to /login if not logged in and at root', () => {
    const req = createRequest('/');
    const res = middleware(req as any);
    expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/login', req.url));
    expect(res).toEqual({ redirect: new URL('/login', req.url) });
  });

  it('allows logged in users to access root without redirect', () => {
    const user = encodeURIComponent(JSON.stringify({ username: 'john' }));
    const req = createRequest('/', user);
    const res = middleware(req as any);
    expect(NextResponse.next).toHaveBeenCalled();
    expect(res).toEqual({ next: true });
  });

  it('redirects to /unauthorized if profile username does not match cookie', () => {
    const user = encodeURIComponent(JSON.stringify({ username: 'john' }));
    const req = createRequest('/jane/profile', user);
    const res = middleware(req as any);
    expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/unauthorized', req.url));
    expect(res).toEqual({ redirect: new URL('/unauthorized', req.url) });
  });

  it('calls NextResponse.next if everything is fine', () => {
    const user = encodeURIComponent(JSON.stringify({ username: 'john' }));
    const req = createRequest('/john/profile', user);
    const res = middleware(req as any);
    expect(NextResponse.next).toHaveBeenCalled();
    expect(res).toEqual({ next: true });
  });

  it('allows access when username case differs between URL and cookie', () => {
    const user = encodeURIComponent(JSON.stringify({ username: 'MaxUser' }));
    const req = createRequest('/maxuser/profile', user);
    const res = middleware(req as any);
    expect(NextResponse.next).toHaveBeenCalled();
    expect(res).toEqual({ next: true });
  });

  it('allows access when URL has mixed case but cookie has different case', () => {
    const user = encodeURIComponent(JSON.stringify({ username: 'john' }));
    const req = createRequest('/JOHN/profile', user);
    const res = middleware(req as any);
    expect(NextResponse.next).toHaveBeenCalled();
    expect(res).toEqual({ next: true });
  });

  it('still blocks access when usernames are completely different (case-insensitive)', () => {
    const user = encodeURIComponent(JSON.stringify({ username: 'MaxUser' }));
    const req = createRequest('/differentuser/profile', user);
    const res = middleware(req as any);
    expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/unauthorized', req.url));
    expect(res).toEqual({ redirect: new URL('/unauthorized', req.url) });
  });
});
