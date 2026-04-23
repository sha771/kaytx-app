import { Context } from 'hono';

export interface AuthContext {
  userId: string;
  sessionId?: string;
  organizationId: string;
}

export interface Variables {
  auth: AuthContext;
}

export type AppContext = Context<{ Variables: Variables }>;
