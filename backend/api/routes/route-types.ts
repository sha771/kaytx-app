import type { ContextVariableMap, Context } from 'hono';
import { Role } from '../../lib/rbac';

export interface AuthContext {
  userId: string;
  role: Role;
  organizationId?: string;
  email: string;
}

export type RouteVariables = ContextVariableMap & {
  authContext: AuthContext;
  validatedBody: unknown;
  validatedQuery: unknown;
  validatedParams: unknown;
};

export type RouteContext = Context<{ Variables: RouteVariables }>;