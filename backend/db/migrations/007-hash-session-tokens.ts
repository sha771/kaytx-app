import { db as pgDb } from '../connection';
import { sessions } from '../drizzle-schema';
import { hashAccessToken, hashRefreshToken } from '../../lib/auth';
import { eq } from 'drizzle-orm';
import { logger } from '../../lib/production-logger';

/**
 * Migration 007: Fix Plain Text Session Tokens
 * 
 * CRITICAL SECURITY FIX
 * This migration hashes all plain text session tokens and refresh tokens
 * to ensure they're not stored in clear text in the database.
 */

export async function up(): Promise<void> {
  logger.info('🔒 Starting critical security migration: Hashing plain text session tokens...');
  
  try {
    // Get all sessions that might have plain text tokens
    const allSessions = await pgDb.select().from(sessions);
    
    let updatedCount = 0;
    let errorCount = 0;
    
    for (const session of allSessions) {
      try {
        // Check if token is already hashed (hashed tokens are 64-char hex strings)
        const tokenIsHashed = session.token.length === 64 && /^[a-f0-9]{64}$/i.test(session.token);
        const refreshTokenIsHashed = session.refreshToken.length === 64 && /^[a-f0-9]{64}$/i.test(session.refreshToken);
        
        if (!tokenIsHashed || !refreshTokenIsHashed) {
          // This session has plain text tokens - hash them
          const updates: any = {};
          
          if (!tokenIsHashed) {
            updates.token = hashAccessToken(session.token);
          }
          
          if (!refreshTokenIsHashed) {
            updates.refreshToken = hashRefreshToken(session.refreshToken);
          }
          
          await pgDb
            .update(sessions)
            .set(updates)
            .where(eq(sessions.id, session.id));
            
          updatedCount++;
        }
      } catch (error) {
        logger.error(`❌ Failed to update session ${session.id}:`, error);
        errorCount++;
      }
    }
    
    logger.info(`✅ Migration completed successfully!`);
    logger.info(`📊 Results: ${updatedCount} sessions updated, ${errorCount} errors`);
    
    if (errorCount > 0) {
      logger.warn(`⚠️  ${errorCount} sessions failed to update. Manual review required.`);
    }
    
  } catch (error) {
    logger.error('❌ Migration failed:', error);
    throw error;
  }
}

export async function down(): Promise<void> {
  logger.info('⚠️  WARNING: Downgrading this migration is not recommended as it would expose tokens in plain text');
  logger.info('⚠️  This would be a critical security vulnerability');
  
  // Note: We don't implement down() for security reasons
  // Reverting this would expose all tokens in plain text
  throw new Error('Cannot revert security migration: Would expose tokens in plain text');
}

// Run migration if called directly
if (require.main === module) {
  up()
    .then(() => {
      logger.info('✅ Migration 007 completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('❌ Migration 007 failed:', error);
      process.exit(1);
    });
}
