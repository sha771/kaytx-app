import { z } from "zod";
import { protectedProcedure } from '../../../create-context';
import { platformAuthService, PlatformType } from '../../../services/platform-auth-service';

const inputSchema = z.object({
  platformId: z.string(),
  platformName: z.string(),
  redirectUri: z.string().optional(),
});

export const connectOAuthProcedure = protectedProcedure
  .input(inputSchema)
  .mutation(async ({ input, ctx }: { input: z.infer<typeof inputSchema>; ctx: any }) => {
    try {
      const userId = ctx.session?.userId;
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const platformType = input.platformName.toLowerCase() as PlatformType;

      // Generate OAuth URL
      const authUrl = platformAuthService.generateOAuthUrl(platformType, userId);

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

export const oauthCallbackProcedure = protectedProcedure
  .input(oauthCallbackSchema)
  .mutation(async ({ input, ctx }: { input: z.infer<typeof oauthCallbackSchema>; ctx: any }) => {
    try {
      const userId = ctx.session?.userId;
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const platformType = input.platformName.toLowerCase() as PlatformType;

      // Exchange code for tokens
      const tokens = await platformAuthService.exchangeOAuthCode(
        platformType,
        input.code,
        input.state
      );

      // Store credentials
      await platformAuthService.storeCredentials(
        input.platformId,
        platformType,
        userId,
        {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          expiresAt: new Date(Date.now() + tokens.expiresIn * 1000),
        }
      );

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
