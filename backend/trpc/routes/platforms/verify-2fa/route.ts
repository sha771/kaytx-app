import { z } from "zod";
import { permissionProcedure } from '../../../create-context';
import { Permission } from '../../../../lib/rbac';
import { generateTotp, verifyTotp } from '../../../../lib/mfa-totp';
import crypto from 'crypto';
import { db as pgDb } from '../../../../db/connection';
import { platformConnections } from '../../../../db/drizzle-schema';
import { eq } from 'drizzle-orm';

const inputSchema = z.object({
  platformId: z.string(),
  code: z.string().length(6),
  sessionId: z.string().optional(),
  method: z.enum(['totp', 'sms', 'email', 'app']).optional(),
});

// Store platform 2FA secrets (in production, use a proper database table)
const platformSecrets = new Map<string, string>();

// Generate or retrieve platform TOTP secret
function getPlatformSecret(platformId: string, sessionId?: string): string {
  const key = `${platformId}:${sessionId || 'default'}`;
  let secret = platformSecrets.get(key);
  if (!secret) {
    // Generate a new secret for this platform session
    const raw = crypto.randomBytes(20);
    secret = raw.toString('base64url').slice(0, 32).toUpperCase();
    platformSecrets.set(key, secret);
  }
  return secret;
}

export const verify2FAProcedure = permissionProcedure(Permission.PLATFORM_UPDATE)
  .input(inputSchema)
  .mutation(async ({ input, ctx }: { input: z.infer<typeof inputSchema>; ctx: any }) => {
    console.log('Verifying 2FA code for platform:', input.platformId);
    console.log('2FA Method:', input.method || 'totp');

    const organizationId = ctx.user?.organizationId;
    if (!organizationId) {
      throw new Error('User organization not found');
    }
    
    // Get the TOTP secret for this platform
    const secret = getPlatformSecret(input.platformId, input.sessionId);
    
    // Verify the TOTP code with proper window checking
    const isValid = verifyTotp(input.code, secret, { 
      window: 2, // Allow 2 steps before/after for time drift
      step: 30, 
      digits: 6 
    });
    
    if (!isValid) {
      console.log('✗ Invalid 2FA code:', input.code);
      return {
        success: false,
        verified: false,
        error: 'Invalid 2FA code. Please check your authenticator app and try again.',
        attemptsRemaining: 3,
      };
    }
    
    const sessionToken = crypto.randomBytes(32).toString('hex');
    
    console.log(`✓ 2FA verified successfully`);
    console.log(`✓ Session token generated: ${sessionToken.substring(0, 16)}...`);
    console.log(`✓ User authenticated: ${ctx.user?.id}`);

    const connections = await pgDb
      .select()
      .from(platformConnections)
      .where(eq(platformConnections.organizationId, organizationId as any));

    const match = connections.find((c: any) => {
      const meta = c?.metadata || {};
      return meta.platformId === input.platformId || (input.sessionId && meta.sessionId === input.sessionId);
    });

    if (match?.id) {
      const meta = (match as any).metadata || {};
      const mergedMetadata = {
        ...meta,
        status: 'active',
        lastVerifiedAt: new Date().toISOString(),
        twoFactorMethod: input.method || 'totp',
        twoFactorVerified: true,
      };

      await pgDb
        .update(platformConnections)
        .set({
          isActive: true,
          metadata: mergedMetadata as any,
          lastSyncAt: new Date(),
          updatedAt: new Date(),
        } as any)
        .where(eq(platformConnections.id, (match as any).id));
    }
    
    return {
      success: true,
      verified: true,
      sessionToken,
      method: input.method || 'totp',
      authenticatedAt: new Date().toISOString(),
    };
  });
