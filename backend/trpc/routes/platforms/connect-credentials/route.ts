import { z } from "zod";
import { permissionProcedure } from '../../../create-context';
import { Permission } from '../../../../lib/rbac';
import { platformAuthService, PlatformType } from '../../../../services/platform-auth-service';
import { db as pgDb } from '../../../../db/connection';
import { platformConnections } from '../../../../db/drizzle-schema';

function normalizePlatformType(platformName: string): PlatformType {
  const n = platformName.trim().toLowerCase();
  if (n === 'x (twitter)' || n === 'twitter / x' || n === 'twitter') return 'twitter';
  if (n === 'facebook messenger' || n === 'messenger') return 'facebook';
  if (n === 'whatsapp') return 'whatsapp';
  if (n === 'instagram') return 'instagram';
  if (n === 'linkedin') return 'linkedin';
  if (n === 'slack') return 'slack';
  if (n === 'signal') return 'signal';
  if (n === 'telegram') return 'telegram';
  return n as PlatformType;
}

const inputSchema = z.object({
  platformId: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  platformName: z.string(),
});

export const connectCredentialsProcedure = permissionProcedure(Permission.PLATFORM_CREATE)
  .input(inputSchema)
  .mutation(async ({ input, ctx }: { input: z.infer<typeof inputSchema>; ctx: any }) => {
    try {
      console.log('Connecting with credentials for platform:', input.platformName);

      const userId = ctx.user?.id;
      const organizationId = ctx.user?.organizationId;
      if (!userId) {
        throw new Error('User not authenticated');
      }
      if (!organizationId) {
        throw new Error('User organization not found');
      }

      // Store credentials securely
      const platformType = normalizePlatformType(input.platformName);
      const credentials = {
        email: input.email,
        password: input.password,
      };

      // Simulate 2FA check - in real implementation, would validate against platform
      const needs2FA = Math.random() > 0.3;

      const sessionId = `session-${Date.now()}`;

      await pgDb
        .insert(platformConnections)
        .values({
          organizationId,
          platform: platformType,
          isActive: !needs2FA,
          metadata: {
            status: needs2FA ? 'pending_2fa' : 'active',
            platformId: input.platformId,
            platformName: input.platformName,
            accountName: input.email,
            credentialRef: `${userId}:${input.platformId}`,
            sessionId,
          },
          lastSyncAt: needs2FA ? null : new Date(),
        } as any)
        .onConflictDoUpdate({
          target: [platformConnections.organizationId, platformConnections.platform],
          set: {
            isActive: !needs2FA,
            metadata: {
              status: needs2FA ? 'pending_2fa' : 'active',
              platformId: input.platformId,
              platformName: input.platformName,
              accountName: input.email,
              credentialRef: `${userId}:${input.platformId}`,
              sessionId,
            },
            lastSyncAt: needs2FA ? null : new Date(),
            updatedAt: new Date(),
          },
        });

      const stored = await platformAuthService.storeCredentials(
        input.platformId,
        platformType,
        userId,
        credentials,
        { organizationId }
      );

      if (!stored) {
        throw new Error('Failed to store credentials');
      }

      if (needs2FA) {
        return {
          success: true,
          requires2FA: true,
          accountName: input.email,
          sessionId,
          encryptedCredentials: 'stored',
          twoFactorMethods: ['totp', 'sms', 'email'],
          connectionMethod: 'cloud' as const,
        };
      }

      return {
        success: true,
        requires2FA: false,
        accountName: input.email,
        sessionId,
        encryptedCredentials: 'stored',
        authenticated: true,
        connectionMethod: 'cloud' as const,
      };
    } catch (error: any) {
      console.error('Failed to connect with credentials:', error);
      throw new Error(error.message || 'Failed to connect with credentials');
    }
  });
