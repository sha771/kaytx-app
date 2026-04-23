import { db } from '../connection';
import { organizations } from '../drizzle-schema';
import { sql } from 'drizzle-orm';
import { logger } from '../../lib/production-logger';

/**
 * Migration: Add encrypted fields for sensitive organization data
 * Adds encrypted fields for tax ID, billing email, and address
 */
export async function up(): Promise<void> {
  // Add encrypted fields to organizations table
  await db.execute(sql`
    ALTER TABLE organizations 
    ADD COLUMN IF NOT EXISTS tax_id_encrypted JSONB,
    ADD COLUMN IF NOT EXISTS billing_email_encrypted JSONB,
    ADD COLUMN IF NOT EXISTS address_encrypted JSONB;
  `);

  // Create indexes for encrypted fields
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS idx_organizations_tax_id_encrypted ON organizations USING GIN (tax_id_encrypted);
    CREATE INDEX IF NOT EXISTS idx_organizations_billing_email_encrypted ON organizations USING GIN (billing_email_encrypted);
    CREATE INDEX IF NOT EXISTS idx_organizations_address_encrypted ON organizations USING GIN (address_encrypted);
  `);

  // Migrate existing plaintext data to encrypted format
  const existingOrgs = await db.select({
    id: organizations.id,
    taxId: organizations.taxId,
    billingEmail: organizations.billingEmail,
    address: organizations.address
  }).from(organizations);

  for (const org of existingOrgs) {
    const updates: any = {};

    // Encrypt tax ID if exists
    if (org.taxId) {
      const { encryptField } = await import('../../lib/encryption');
      const { getFieldEncryptionKey } = await import('../../lib/encryption');
      const encryptionKey = getFieldEncryptionKey();
      updates.taxIdEncrypted = encryptField(org.taxId, encryptionKey);
    }

    // Encrypt billing email if exists
    if (org.billingEmail) {
      const { encryptField } = await import('../../lib/encryption');
      const { getFieldEncryptionKey } = await import('../../lib/encryption');
      const encryptionKey = getFieldEncryptionKey();
      updates.billingEmailEncrypted = encryptField(org.billingEmail, encryptionKey);
    }

    // Encrypt address if exists
    if (org.address) {
      const { encryptField } = await import('../../lib/encryption');
      const { getFieldEncryptionKey } = await import('../../lib/encryption');
      const encryptionKey = getFieldEncryptionKey();
      updates.addressEncrypted = encryptField(JSON.stringify(org.address), encryptionKey);
    }

    // Update organization with encrypted data
    if (Object.keys(updates).length > 0) {
      await db.update(organizations)
        .set(updates)
        .where(sql`id = ${org.id}`);
    }
  }

  logger.info('Migration 017: Encrypted organization PII fields added and data migrated');
}

export async function down(): Promise<void> {
  // Remove encrypted fields
  await db.execute(sql`
    ALTER TABLE organizations 
    DROP COLUMN IF EXISTS tax_id_encrypted,
    DROP COLUMN IF EXISTS billing_email_encrypted,
    DROP COLUMN IF EXISTS address_encrypted;
  `);

  logger.info('Migration 017: Encrypted organization PII fields removed');
}
