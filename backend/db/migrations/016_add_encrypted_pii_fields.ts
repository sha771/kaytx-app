import { db } from '../connection';
import { users } from '../drizzle-schema';
import { sql } from 'drizzle-orm';
import { logger } from '../../lib/production-logger';

/**
 * Migration: Add encrypted fields for sensitive PII data
 * Adds encrypted fields for phone number, address, tax ID, and emergency contact
 */
export async function up(): Promise<void> {
  // Add encrypted fields to users table
  await db.execute(sql`
    ALTER TABLE users 
    ADD COLUMN IF NOT EXISTS phone_number_encrypted JSONB,
    ADD COLUMN IF NOT EXISTS address_encrypted JSONB,
    ADD COLUMN IF NOT EXISTS tax_id_encrypted JSONB,
    ADD COLUMN IF NOT EXISTS emergency_contact_encrypted JSONB;
  `);

  // Create indexes for encrypted fields
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS idx_users_phone_encrypted ON users USING GIN (phone_number_encrypted);
    CREATE INDEX IF NOT EXISTS idx_users_address_encrypted ON users USING GIN (address_encrypted);
    CREATE INDEX IF NOT EXISTS idx_users_tax_id_encrypted ON users USING GIN (tax_id_encrypted);
    CREATE INDEX IF NOT EXISTS idx_users_emergency_contact_encrypted ON users USING GIN (emergency_contact_encrypted);
  `);

  // Migrate existing plaintext data to encrypted format
  const existingUsers = await db.select({
    id: users.id,
    phoneNumber: users.phoneNumber,
    metadata: users.metadata
  }).from(users);

  for (const user of existingUsers) {
    const updates: any = {};

    // Encrypt phone number if exists
    if (user.phoneNumber) {
      const { encryptField } = await import('../../lib/encryption');
      const { getFieldEncryptionKey } = await import('../../lib/encryption');
      const encryptionKey = getFieldEncryptionKey();
      updates.phoneNumberEncrypted = encryptField(user.phoneNumber, encryptionKey);
    }

    // Extract and encrypt address from metadata if exists
    if (user.metadata && typeof user.metadata === 'object') {
      const metadata = user.metadata as any;
      if (metadata.address) {
        const { encryptField } = await import('../../lib/encryption');
        const { getFieldEncryptionKey } = await import('../../lib/encryption');
        const encryptionKey = getFieldEncryptionKey();
        updates.addressEncrypted = encryptField(JSON.stringify(metadata.address), encryptionKey);
      }
      if (metadata.taxId) {
        const { encryptField } = await import('../../lib/encryption');
        const { getFieldEncryptionKey } = await import('../../lib/encryption');
        const encryptionKey = getFieldEncryptionKey();
        updates.taxIdEncrypted = encryptField(metadata.taxId, encryptionKey);
      }
      if (metadata.emergencyContact) {
        const { encryptField } = await import('../../lib/encryption');
        const { getFieldEncryptionKey } = await import('../../lib/encryption');
        const encryptionKey = getFieldEncryptionKey();
        updates.emergencyContactEncrypted = encryptField(JSON.stringify(metadata.emergencyContact), encryptionKey);
      }
    }

    // Update user with encrypted data
    if (Object.keys(updates).length > 0) {
      await db.update(users)
        .set(updates)
        .where(sql`id = ${user.id}`);
    }
  }

  // After migration, consider dropping plaintext columns in a future migration
  logger.info('Migration 016: Encrypted PII fields added and data migrated');
}

export async function down(): Promise<void> {
  // Remove encrypted fields
  await db.execute(sql`
    ALTER TABLE users 
    DROP COLUMN IF EXISTS phone_number_encrypted,
    DROP COLUMN IF EXISTS address_encrypted,
    DROP COLUMN IF EXISTS tax_id_encrypted,
    DROP COLUMN IF EXISTS emergency_contact_encrypted;
  `);

  logger.info('Migration 016: Encrypted PII fields removed');
}
