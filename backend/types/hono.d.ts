/* Hono context type augmentation for backend routes */

interface AuthContext {
  userId: string;
  sessionId?: string;
  organizationId: string;
  email?: string;
  role?: string;
  permissions?: string[];
  user?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    organizationId?: string;
    [key: string]: any;
  };
}

interface ValidatedBody {
  [key: string]: any;
}

interface ValidatedParams {
  [key: string]: any;
}

interface ValidatedQuery {
  [key: string]: any;
}

declare module 'hono' {
  interface ContextVariableMap {
    auth: AuthContext;
    authContext: AuthContext;
    validatedBody: ValidatedBody;
    validatedParams: ValidatedParams;
    validatedQuery: ValidatedQuery;
  }
}

// Re-export Hono types for backend code that imports { Hono, Context, Next } from 'hono'
declare module 'hono' {
  export { Hono, Context, Next } from 'hono/types';
}

declare module 'hono/utils/http' {
  export function stream(c: any, cb: (stream: any) => Promise<void>): any;
}
