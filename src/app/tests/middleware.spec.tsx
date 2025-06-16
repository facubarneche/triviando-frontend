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

  it('redirects to /topics if logged in and at root', () => {
    const user = encodeURIComponent(JSON.stringify({ username: 'john' }));
    const req = createRequest('/', user);
    const res = middleware(req as any);
    expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/topics', req.url));
    expect(res).toEqual({ redirect: new URL('/topics', req.url) });
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
});
