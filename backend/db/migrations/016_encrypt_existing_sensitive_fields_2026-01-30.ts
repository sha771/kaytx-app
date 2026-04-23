import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { webhooks, integrations } from '../drizzle-schema';
import { encrypt, encryptIntegrationCredentials, getFieldEncryptionKey } from '../../lib/encryption';
import { eq } from 'drizzle-orm';
import { logger } from '../../lib/production-logger';

/**
 * Migration to encrypt existing plaintext webhook secrets and integration credentials
 * This ensures all sensitive data is encrypted at rest using AES-256-GCM
 */
async function encryptExistingSensitiveFields() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  const client = postgres(process.env.DATABASE_URL);
  const db = drizzle(client);

  logger.info('Starting migration to encrypt existing sensitive fields...');

  try {
    // 1) Encrypt webhook secrets
    logger.info('Processing webhook secrets...');
    const allWebhooks = await db.select().from(webhooks);
    
    let webhooksMigrated = 0;
    let webhooksSkipped = 0;

    for (const webhook of allWebhooks) {
      try {
        // Check if already encrypted (JSON format)
        JSON.parse(webhook.secret);
        webhooksSkipped++;
        continue;
      } catch {
        // Not encrypted, proceed
      }

      const encryptionKey = getFieldEncryptionKey();
      const encryptedSecret = JSON.stringify(encrypt(webhook.secret, encryptionKey));

      await db
        .update(webhooks)
        .set({ secret: encryptedSecret })
        .where(eq(webhooks.id, webhook.id));

      webhooksMigrated++;
      logger.info(`Encrypted webhook secret for: ${webhook.id}`);
    }

    // 2) Encrypt integration credentials
    logger.info('Processing integration credentials...');
    const allIntegrations = await db.select().from(integrations);
    
    let integrationsMigrated = 0;
    let integrationsSkipped = 0;

    for (const integration of allIntegrations) {
      try {
        // Check if already encrypted (JSON format)
        JSON.parse((integration.credentials as any).toString());
        integrationsSkipped++;
        continue;
      } catch {
        // Not encrypted, proceed
      }

      const encryptedCredentials = encryptIntegrationCredentials(integration.credentials as any);

      await db
        .update(integrations)
        .set({ credentials: encryptedCredentials as any })
        .where(eq(integrations.id, integration.id));

      integrationsMigrated++;
      logger.info(`Encrypted credentials for integration: ${integration.id}`);
    }

    logger.info('Migration completed successfully!');
    logger.info(`Webhooks - Migrated: ${webhooksMigrated}, Skipped: ${webhooksSkipped}`);
    logger.info(`Integrations - Migrated: ${integrationsMigrated}, Skipped: ${integrationsSkipped}`);
  } catch (error) {
    logger.error('Migration failed:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Run the migration if this file is executed directly
if (require.main === module) {
  encryptExistingSensitiveFields()
    .then(() => {
      logger.info('Sensitive field encryption migration completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Sensitive field encryption migration failed:', error);
      process.exit(1);
    });
}

export { encryptExistingSensitiveFields };
