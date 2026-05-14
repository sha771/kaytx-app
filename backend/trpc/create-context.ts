import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { validateSession, verifyToken } from "../lib/auth";
import { hasPermission, Permission, Role, normalizeRole } from "../lib/rbac";
import { db as pgDb } from "../db/connection";
import { users } from "../db/drizzle-schema";
import type { InferSelectModel } from "drizzle-orm";
import { eq } from "drizzle-orm";

type DbUser = InferSelectModel<typeof users>;

export const createContext = async (opts: FetchCreateContextFnOptions) => {
  const authHeader = opts.req.headers.get('authorization');
  const token = authHeader?.toLowerCase().startsWith('bearer ')
    ? authHeader.slice('bearer '.length).trim()
    : undefined;

  let user: DbUser | undefined;
  let sessionId: string | undefined;

  if (token) {
    const payload = verifyToken(token);

    // Fallback to validateSession if above fails
    if (!user) {
      const validation = await validateSession(token);
      if (validation.valid && validation.userId) {
        const [pgUser] = await pgDb.select().from(users).where(eq(users.id, validation.userId)).limit(1);
        if (pgUser) {
          user = pgUser as any;
        }
        sessionId = sessionId || validation.session?.id;
      }
    }
  }

  return {
    req: opts.req,
    user,
    sessionId,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;

// Legacy router factory for routers using {input, resolve} pattern
// Wraps each route into a proper tRPC procedure
export function createLegacyRouter(routes: Record<string, {
  input?: any;
  resolve: (args: { ctx: Context; input?: any }) => Promise<any>;
}>): any {
  const router: Record<string, any> = {};
  for (const [key, route] of Object.entries(routes)) {
    let proc = publicProcedure;
    if (route.input) {
      proc = proc.input(route.input);
    }
    router[key] = proc.resolve(route.resolve);
  }
  return createTRPCRouter(router);
}

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource',
    });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  const role = normalizeRole(ctx.user.role) as Role;
  if (role !== Role.ADMIN && role !== Role.ENTERPRISE_ADMIN && role !== Role.SUPER_ADMIN) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You do not have permission to access this resource',
    });
  }

  return next({
    ctx,
  });
});

export const permissionProcedure = <T extends Permission>(permission: T) =>
  protectedProcedure.use(async ({ ctx, next }) => {
    const role = normalizeRole(ctx.user.role) as Role;
    if (role !== Role.SUPER_ADMIN && !ctx.user.organizationId) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Organization context required',
      });
    }
    if (!hasPermission(role, permission)) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You do not have permission to access this resource',
      });
    }

    return next({ ctx });
  });

export const createInnerTRPCContext = (overrides: Partial<Context> = {}) => {
  return {
    req: new Request('http://localhost'),
    user: overrides.user || null,
    sessionId: overrides.sessionId || null,
  };
};
