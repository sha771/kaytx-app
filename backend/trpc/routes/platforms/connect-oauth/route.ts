import { z } from "zod";
import { permissionProcedure } from '../../../create-context';
import { Permission } from '../../../../lib/rbac';
import { platformAuthService, PlatformType } from '../../../../services/platform-auth-service';
import { db as pgDb } from '../../../../db/connection';
import { platformConnections } from '../../../../db/drizzle-schema';
import { and, eq } from 'drizzle-orm';

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
  platformName: z.string(),
  redirectUri: z.string().optional(),
});

export const connectOAuthProcedure = permissionProcedure(Permission.PLATFORM_CREATE)
  .input(inputSchema)
  .mutation(async ({ input, ctx }: { input: z.infer<typeof inputSchema>; ctx: any }) => {
    try {
      const userId = ctx.user?.id;
      const organizationId = ctx.user?.organizationId;
      if (!userId) {
        throw new Error('User not authenticated');
      }
      if (!organizationId) {
        throw new Error('User organization not found');
      }

      const platformType = normalizePlatformType(input.platformName);

      // Generate OAuth URL
      const authUrl = platformAuthService.generateOAuthUrl(platformType, userId);

      await pgDb
        .insert(platformConnections)
        .values({
          organizationId,
          platform: platformType,
          isActive: false,
          metadata: {
            status: 'pending_oauth',
            platformId: input.platformId,
            platformName: input.platformName,
          },
        } as any)
        .onConflictDoUpdate({
          target: [platformConnections.organizationId, platformConnections.platform],
          set: {
            isActive: false,
            metadata: {
              status: 'pending_oauth',
              platformId: input.platformId,
              platformName: input.platformName,
            },
            updatedAt: new Date(),
          },
        });

      console.log(`[OAuth] Auth URL generated for ${platformType}`);

      return {
        success: true,
        authUrl,
        scopes: ['user_profile', 'user_media', 'email'],
        accountName: input.platformName,
      };
    } catch (error: any) {
      console.error('Failed to initiate OAuth:', error);
      throw new Error(error.message || 'Failed to initiate OAuth');
    }
  });

const oauthCallbackSchema = z.object({
  code: z.string(),
  state: z.string(),
  platformId: z.string(),
  platformName: z.string(),
});

export const oauthCallbackProcedure = permissionProcedure(Permission.PLATFORM_UPDATE)
  .input(oauthCallbackSchema)
  .mutation(async ({ input, ctx }: { input: z.infer<typeof oauthCallbackSchema>; ctx: any }) => {
    try {
      const userId = ctx.user?.id;
      const organizationId = ctx.user?.organizationId;
      if (!userId) {
        throw new Error('User not authenticated');
      }
      if (!organizationId) {
        throw new Error('User organization not found');
      }

      const platformType = normalizePlatformType(input.platformName);

      // Exchange code for tokens
      const tokens = await platformAuthService.exchangeOAuthCode(
        platformType,
        input.code,
        input.state
      );

      // Store credentials
      const stored = await platformAuthService.storeCredentials(
        input.platformId,
        platformType,
        userId,
        {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          expiresAt: new Date(Date.now() + tokens.expiresIn * 1000).toISOString(),
        },
        { organizationId }
      );

      if (!stored) {
        throw new Error('Failed to store credentials');
      }

      const [existing] = await pgDb
        .select()
        .from(platformConnections)
        .where(and(eq(platformConnections.organizationId, organizationId as any), eq(platformConnections.platform, platformType)))
        .limit(1);

      const existingMetadata = (existing as any)?.metadata || {};
      const mergedMetadata = {
        ...existingMetadata,
        status: 'active',
        platformId: input.platformId,
        platformName: input.platformName,
        credentialRef: `${userId}:${input.platformId}`,
        scope: tokens.scope,
        expiresAt: new Date(Date.now() + tokens.expiresIn * 1000).toISOString(),
      };

      await pgDb
        .update(platformConnections)
        .set({ isActive: true, metadata: mergedMetadata as any, lastSyncAt: new Date(), updatedAt: new Date() } as any)
        .where(and(eq(platformConnections.organizationId, organizationId as any), eq(platformConnections.platform, platformType)));

      // Validate credentials
      const isValid = await platformAuthService.validateCredentials(
        platformType,
        tokens.accessToken
      );

      if (!isValid) {
        throw new Error('Failed to validate credentials');
      }

      console.log(`[OAuth] Successfully connected ${platformType}`);

      return {
        success: true,
        authenticated: true,
        accountName: input.platformName,
        scope: tokens.scope,
        expiresIn: tokens.expiresIn,
      };
    } catch (error: any) {
      console.error('OAuth callback processing failed:', error);
      throw new Error(error.message || 'Failed to process OAuth callback');
    }
  });
