import { ContextVariableMap } from 'hono';
import { Role } from '../lib/rbac';

interface AuthContext {
  userId: string;
  role: Role;
  organizationId?: string;
  email: string;
}

declare module 'hono' {
  interface ContextVariableMap {
    authContext: AuthContext;
    validatedBody: unknown;
    validatedQuery: unknown;
    validatedParams: unknown;
  }
}