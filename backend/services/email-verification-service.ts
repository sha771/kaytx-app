import { db } from '../db/connection';
import { users } from '../db/drizzle-schema';
import { eq, and, gt } from 'drizzle-orm';
import crypto from 'crypto';
import { createLogger } from '../lib/production-logger';
import { EmailCampaignService } from './email-campaign-service';

const logger = createLogger('EmailVerificationService');
const emailService = new EmailCampaignService();

export class EmailVerificationService {
  /**
   * Generate and send a verification email to a user
   */
  async sendVerificationEmail(userId: string): Promise<boolean> {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
      if (!user) {
        throw new Error('User not found');
      }

      if (user.emailVerified) {
        return true;
      }

      // Generate secure token
      const token = crypto.randomBytes(32).toString('hex');
      const expires = new Date();
      expires.setHours(expires.getHours() + 24); // 24 hour expiry

      // Update user with token
      await db.update(users)
        .set({
          emailVerificationToken: token,
          emailVerificationExpires: expires,
          updatedAt: new Date()
        })
        .where(eq(users.id, userId));

      // Send email (in production this would use a real template)
      const verificationUrl = `${process.env.APP_DOMAIN || 'http://localhost:3000'}/verify-email?token=${token}`;
      
      await emailService.sendEmail({
        to: user.email,
        subject: 'Verify your email address',
        body: `Please verify your email by clicking here: ${verificationUrl}`,
        organizationId: user.organizationId || 'system'
      });

      logger.info(`Verification email sent to user ${userId}`);
      return true;
    } catch (error) {
      logger.error(`Failed to send verification email: ${error}`);
      return false;
    }
  }

  /**
   * Verify a user's email with a token
   */
  async verifyEmail(token: string): Promise<boolean> {
    try {
      const [user] = await db.select()
        .from(users)
        .where(and(
          eq(users.emailVerificationToken, token),
          gt(users.emailVerificationExpires, new Date())
        ))
        .limit(1);

      if (!user) {
        logger.warn(`Invalid or expired verification token: ${token}`);
        return false;
      }

      // Mark as verified
      await db.update(users)
        .set({
          emailVerified: true,
          emailVerificationToken: null,
          emailVerificationExpires: null,
          status: 'active',
          updatedAt: new Date()
        })
        .where(eq(users.id, user.id));

      logger.info(`Email verified successfully for user ${user.id}`);
      return true;
    } catch (error) {
      logger.error(`Email verification failed: ${error}`);
      return false;
    }
  }
}

export const emailVerificationService = new EmailVerificationService();
