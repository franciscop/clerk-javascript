import type { Organization, Session, User } from '@clerk/backend-core';
import { ClerkJWTClaims, ServerGetToken } from '@clerk/types';
import type { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export type WithEdgeMiddlewareAuthOptions = {
  loadUser?: boolean;
  loadSession?: boolean;
  authorizedParties?: string[];
  jwtKey?: string;
  strict?: boolean;
};

export type WithEdgeMiddlewareAuthCallback<Return, Options extends WithEdgeMiddlewareAuthOptions> = (
  req: RequestWithAuth<Options>,
  event: NextFetchEvent,
) => Return;

export type WithEdgeMiddlewareAuthMiddlewareResult<CallbackReturn, Options extends WithEdgeMiddlewareAuthOptions> = (
  req: RequestWithAuth<Options>,
  event: NextFetchEvent,
) => Promise<Awaited<CallbackReturn>>;
export type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

export type RequestWithAuth<Options extends WithEdgeMiddlewareAuthOptions = any> = NextRequest & {
  auth: EdgeMiddlewareAuth;
} & (Options extends { loadSession: true } ? { session: Session | null } : {}) &
  (Options extends { loadUser: true } ? { user: User | null } : {}) &
  (Options extends { loadOrg: true } ? { organization: Organization | null } : {});

type NextMiddlewareReturnOptions = NextResponse | Response | null | undefined;
export type NextMiddlewareResult = NextMiddlewareReturnOptions;

export type WithAuthNextMiddlewareHandler<Options extends WithEdgeMiddlewareAuthOptions> = (
  req: RequestWithAuth<Options>,
  event: NextFetchEvent,
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

export type EdgeMiddlewareAuth = {
  sessionId: string | null;
  userId: string | null;
  getToken: ServerGetToken;
  claims: ClerkJWTClaims | null;
};

export type AuthData = {
  sessionId: string | null;
  session: Session | undefined | null;
  userId: string | null;
  user: User | undefined | null;
  getToken: ServerGetToken;
  claims: ClerkJWTClaims | null;
  organization: Organization | undefined | null;
};
