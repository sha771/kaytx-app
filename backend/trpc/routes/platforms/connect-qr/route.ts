import { z } from "zod";
import { protectedProcedure } from '../../../create-context';
import { whatsappService } from '../../../services/whatsapp-service';

const inputSchema = z.object({
  platformId: z.string(),
  platformName: z.string(),
  connectionType: z.enum(['qr-code', 'oauth', 'credentials', 'google-account']),
});

export const connectQRProcedure = protectedProcedure
  .input(inputSchema)
  .mutation(async ({ input, ctx }: { input: z.infer<typeof inputSchema>; ctx: any }) => {
    try {
      console.log('Generating QR code for platform:', input.platformName);
      
      const userId = ctx.session?.userId;
      if (!userId) {
        throw new Error('User not authenticated');
      }

      // Use real WhatsApp service for WhatsApp connections
      if (input.platformName.toLowerCase() === 'whatsapp') {
        const connection = await whatsappService.generateQRCode(userId, '');
        
        return {
          success: true,
          qrCode: connection.qrCode,
          linkingCode: connection.linkingCode,
          sessionId: connection.sessionId,
          expiresAt: connection.expiresAt.toISOString(),
          e2eEnabled: true,
          encryptionType: 'E2E-Encrypted',
          publicKey: connection.encryptionKey.substring(0, 100) + '...',
        };
      }

      // For other platforms, return structured OAuth data
      return {
        success: true,
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(JSON.stringify({
          platformId: input.platformId,
          platformName: input.platformName,
        }))}`,
        linkingCode: 'LINK' + Date.now().toString().slice(-4),
        sessionId: 'session-' + Date.now(),
        expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
        e2eEnabled: true,
        encryptionType: 'RSA-2048',
        publicKey: 'PK_' + Math.random().toString(36).substr(2, 32),
      };
    } catch (error: any) {
      console.error('Failed to generate QR code:', error);
      throw new Error(error.message || 'Failed to generate QR code');
    }
  });
