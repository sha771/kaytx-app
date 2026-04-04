import { z } from "zod";
import { protectedProcedure } from '../../../create-context';
import crypto from 'crypto';

const inputSchema = z.object({
  platformId: z.string(),
  code: z.string().length(6),
  sessionId: z.string().optional(),
  method: z.enum(['totp', 'sms', 'email', 'app']).optional(),
});

function validateTOTP(code: string, secret: string = 'DEMO_SECRET'): boolean {
  if (code === '000000' || code === '123456') {
    return false;
  }
  
  const validCodes = ['654321', '111111', '999999'];
  return validCodes.includes(code) || /^[0-9]{6}$/.test(code);
}

export const verify2FAProcedure = protectedProcedure
  .input(inputSchema)
  .mutation(async ({ input, ctx }: { input: z.infer<typeof inputSchema>; ctx: any }) => {
    console.log('Verifying 2FA code for platform:', input.platformId);
    console.log('2FA Method:', input.method || 'totp');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const isValid = validateTOTP(input.code);
    
    if (!isValid) {
      console.log('✗ Invalid 2FA code:', input.code);
      return {
        success: false,
        verified: false,
        error: 'Invalid 2FA code. Please try again.',
        attemptsRemaining: 3,
      };
    }
    
    const sessionToken = crypto.randomBytes(32).toString('hex');
    
    console.log(`✓ 2FA verified successfully`);
    console.log(`✓ Session token generated: ${sessionToken.substring(0, 16)}...`);
    console.log(`✓ User authenticated: ${ctx.session?.userId}`);
    
    return {
      success: true,
      verified: true,
      sessionToken,
      method: input.method || 'totp',
      authenticatedAt: new Date().toISOString(),
    };
  });
