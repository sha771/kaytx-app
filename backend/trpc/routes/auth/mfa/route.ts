import { z } from 'zod';
import { permissionProcedure } from '../../../create-context';
import { db as pgDb } from '../../../../db/connection';
import { users } from '../../../../db/drizzle-schema';
import { eq } from 'drizzle-orm';
import { generateBase32Secret, buildOtpauthUrl } from '../../../../lib/mfa-totp';
import { consumeRecoveryCode, encryptTotpSecret, generateNewRecoveryCodeRecords, normalizeRecoveryCodes, verifyTotpForUser } from '../../../../lib/mfa';
import { verifyPassword } from '../../../../lib/auth';
import { logAudit, AuditActions } from '../../../../lib/audit';
import { Permission } from '../../../../lib/rbac';

const enableMfaSchema = z.object({
  token: z.string().length(6),
});

const disableMfaSchema = z.object({
  password: z.string().min(1),
});

const regenerateRecoveryCodesSchema = z.object({
  totp: z.string().length(6).optional(),
  recoveryCode: z.string().min(1).optional(),
});

export const enableMFAProcedure = permissionProcedure(Permission.SECURITY_MFA_ENABLE)
  .input(enableMfaSchema)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.user.id;
    const ipAddress = ctx.req.headers.get('x-forwarded-for') || ctx.req.headers.get('x-real-ip') || 'unknown';

    const [user] = await pgDb.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user) {
      throw new Error('User not found');
    }

    if (user.twoFactorEnabled) {
      throw new Error('MFA is already enabled');
    }

    const mfaSecretKey = (user as any).twoFactorSecret;
    if (!mfaSecretKey) {
      throw new Error('MFA setup not initiated. Please start MFA setup first.');
    }

    const isValid = verifyTotpForUser(mfaSecretKey, input.token);
    if (!isValid) {
      logAudit({
        userId,
        action: AuditActions.USER_2FA_ENABLE,
        resource: 'user',
        ipAddress,
        metadata: { reason: 'invalid_token' },
        status: 'failure',
      });
      throw new Error('Invalid verification code');
    }

    const { plain: recoveryCodes, records: recoveryCodeRecords } = generateNewRecoveryCodeRecords(10);

    await pgDb
      .update(users)
      .set({
        twoFactorEnabled: true,
        twoFactorRecoveryCodes: recoveryCodeRecords,
        updatedAt: new Date(),
      } as any)
      .where(eq(users.id, userId));

    logAudit({
      userId,
      action: AuditActions.USER_2FA_ENABLE,
      resource: 'user',
      ipAddress,
      status: 'success',
    });

    return { success: true, message: 'MFA enabled successfully', recoveryCodes };
  });

export const setupMFAProcedure = permissionProcedure(Permission.SECURITY_MFA_SETUP)
  .mutation(async ({ ctx }) => {
    const userId = ctx.user.id;
    const ipAddress = ctx.req.headers.get('x-forwarded-for') || ctx.req.headers.get('x-real-ip') || 'unknown';

    const [user] = await pgDb.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user) {
      throw new Error('User not found');
    }

    if (user.twoFactorEnabled) {
      throw new Error('MFA is already enabled');
    }

    const secret = generateBase32Secret(20);
    const secretStored = encryptTotpSecret(secret);

    await pgDb
      .update(users)
      .set({
        twoFactorSecret: secretStored,
        updatedAt: new Date(),
      } as any)
      .where(eq(users.id, userId));

    const otpauthUrl = buildOtpauthUrl({
      issuer: 'Enterprise AI Platform',
      accountName: user.email,
      secret,
    });

    logAudit({
      userId,
      action: AuditActions.USER_2FA_ENABLE,
      resource: 'user',
      ipAddress,
      metadata: { step: 'setup_initiated' },
      status: 'success',
    });

    return {
      secret,
      otpauthUrl,
      message: 'Scan the QR code with your authenticator app, then verify the code to enable MFA',
    };
  });

export const disableMFAProcedure = permissionProcedure(Permission.SECURITY_MFA_DISABLE)
  .input(disableMfaSchema)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.user.id;
    const ipAddress = ctx.req.headers.get('x-forwarded-for') || ctx.req.headers.get('x-real-ip') || 'unknown';

    const [user] = await pgDb.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.twoFactorEnabled) {
      throw new Error('MFA is not enabled');
    }

    const okPassword = await verifyPassword(input.password, (user as any).passwordHash);
    if (!okPassword) {
      logAudit({
        userId,
        action: AuditActions.USER_2FA_DISABLE,
        resource: 'user',
        resourceId: userId,
        ipAddress,
        metadata: { reason: 'invalid_password' },
        status: 'failure',
      });
      throw new Error('Invalid password');
    }

    await pgDb
      .update(users)
      .set({
        twoFactorEnabled: false,
        twoFactorSecret: null,
        twoFactorRecoveryCodes: [],
        updatedAt: new Date(),
      } as any)
      .where(eq(users.id, userId));

    logAudit({
      userId,
      action: AuditActions.USER_2FA_DISABLE,
      resource: 'user',
      ipAddress,
      status: 'success',
    });

    return { success: true, message: 'MFA disabled successfully' };
  });

export const regenerateMFARecoveryCodesProcedure = permissionProcedure(Permission.SECURITY_MFA_REGENERATE_CODES)
   .input(regenerateRecoveryCodesSchema)
   .mutation(async ({ input, ctx }) => {
     const userId = ctx.user.id;
     const ipAddress = ctx.req.headers.get('x-forwarded-for') || ctx.req.headers.get('x-real-ip') || 'unknown';

     const [user] = await pgDb.select().from(users).where(eq(users.id, userId)).limit(1);
     if (!user) {
       throw new Error('User not found');
     }

     if (!user.twoFactorEnabled) {
       throw new Error('MFA is not enabled');
     }

     const totpOk = input.totp ? verifyTotpForUser((user as any).twoFactorSecret, input.totp) : false;
     let recoveryOk = false;

     if (!totpOk && input.recoveryCode) {
       const current = normalizeRecoveryCodes((user as any).twoFactorRecoveryCodes);
       const consumed = consumeRecoveryCode(current, input.recoveryCode);
       recoveryOk = consumed.ok;
     }

     if (!totpOk && !recoveryOk) {
       logAudit({
         userId,
         action: AuditActions.USER_2FA_ENABLE,
         resource: 'user',
         resourceId: userId,
         ipAddress,
         metadata: { step: 'recovery_codes_regenerate', reason: 'mfa_verification_required' },
         status: 'failure',
       });
       throw new Error('MFA verification required');
     }

     const { plain: recoveryCodes, records: recoveryCodeRecords } = generateNewRecoveryCodeRecords(10);

     await pgDb.update(users).set({
       twoFactorRecoveryCodes: recoveryCodeRecords,
       updatedAt: new Date(),
     } as any).where(eq(users.id, userId));

     logAudit({
       userId,
       action: AuditActions.USER_2FA_ENABLE,
       resource: 'user',
       resourceId: userId,
       ipAddress,
       metadata: { step: 'recovery_codes_regenerate' },
       status: 'success',
     });

     return { success: true, recoveryCodes };
   });

export const getMFAStatusProcedure = permissionProcedure(Permission.SECURITY_MFA_STATUS_READ)
  .input(z.object({}).optional())
  .query(async ({ ctx, input }) => {
    const userId = ctx.user.id;

    const [user] = await pgDb.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user) {
      throw new Error('User not found');
    }

    return {
      enabled: Boolean(user.twoFactorEnabled),
      canSetup: !user.twoFactorEnabled,
    };
  });
