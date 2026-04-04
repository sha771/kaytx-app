import { z } from "zod";
import { protectedProcedure } from '../../../create-context';
import { platformAuthService, PlatformType } from '../../../services/platform-auth-service';

const inputSchema = z.object({
  platformId: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  platformName: z.string(),
});

export const connectCredentialsProcedure = protectedProcedure
  .input(inputSchema)
  .mutation(async ({ input, ctx }: { input: z.infer<typeof inputSchema>; ctx: any }) => {
    try {
      console.log('Connecting with credentials for platform:', input.platformName);

      const userId = ctx.session?.userId;
      if (!userId) {
        throw new Error('User not authenticated');
      }

      // Store credentials securely
      const platformType = input.platformName.toLowerCase() as PlatformType;
      const credentials = {
        email: input.email,
        password: input.password,
      };

      const stored = await platformAuthService.storeCredentials(
        input.platformId,
        platformType,
        userId,
        credentials
      );

      if (!stored) {
        throw new Error('Failed to store credentials');
      }

      // Simulate 2FA check - in real implementation, would validate against platform
      const needs2FA = Math.random() > 0.3;

      if (needs2FA) {
        return {
          success: true,
          requires2FA: true,
          accountName: input.email,
          sessionId: `session-${Date.now()}`,
          twoFactorMethods: ['totp', 'sms', 'email'],
          connectionMethod: 'cloud' as const,
        };
      }

      return {
        success: true,
        requires2FA: false,
        accountName: input.email,
        sessionId: `session-${Date.now()}`,
        authenticated: true,
        connectionMethod: 'cloud' as const,
      };
    } catch (error: any) {
      console.error('Failed to connect with credentials:', error);
      throw new Error(error.message || 'Failed to connect with credentials');
    }
  });
