import { z } from 'zod';
import { protectedProcedure } from '../../../create-context';

export const meProcedure = protectedProcedure
  .input(z.void().optional())
  .query(async ({ ctx }) => {
    return {
      id: ctx.user.id,
      email: ctx.user.email,
      firstName: ctx.user.firstName,
      lastName: ctx.user.lastName,
      phoneNumber: ctx.user.phoneNumber,
      emailVerified: ctx.user.emailVerified,
      twoFactorEnabled: ctx.user.twoFactorEnabled,
      role: ctx.user.role,
      organizationId: ctx.user.organizationId,
      status: ctx.user.status,
      failedLoginAttempts: ctx.user.failedLoginAttempts,
      accountLockedUntil: ctx.user.accountLockedUntil,
      createdAt: ctx.user.createdAt,
      lastLoginAt: ctx.user.lastLoginAt,
    };
  });

export default meProcedure;
