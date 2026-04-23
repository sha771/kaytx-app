import { db } from '../connection';
import { payments, invoices } from '../drizzle-schema';
import { sql } from 'drizzle-orm';
import { logger } from '../../lib/production-logger';

/**
 * Migration: Add encrypted fields for payment data
 * Adds encrypted fields for payment methods and sensitive payment information
 */
export async function up(): Promise<void> {
  // Add encrypted fields to payments table
  await db.execute(sql`
    ALTER TABLE payments 
    ADD COLUMN IF NOT EXISTS payment_method_details_encrypted JSONB,
    ADD COLUMN IF NOT EXISTS gateway_response_encrypted JSONB;
  `);

  // Add encrypted fields to invoices table
  await db.execute(sql`
    ALTER TABLE invoices 
    ADD COLUMN IF NOT EXISTS payment_method_id_encrypted JSONB,
    ADD COLUMN IF NOT EXISTS transaction_id_encrypted JSONB;
  `);

  // Create indexes for encrypted fields
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS idx_payments_method_details_encrypted ON payments USING GIN (payment_method_details_encrypted);
    CREATE INDEX IF NOT EXISTS idx_payments_gateway_response_encrypted ON payments USING GIN (gateway_response_encrypted);
    CREATE INDEX IF NOT EXISTS idx_invoices_payment_method_id_encrypted ON invoices USING GIN (payment_method_id_encrypted);
    CREATE INDEX IF NOT EXISTS idx_invoices_transaction_id_encrypted ON invoices USING GIN (transaction_id_encrypted);
  `);

  logger.info('Migration 018: Encrypted payment fields added');
}

export async function down(): Promise<void> {
  // Remove encrypted fields
  await db.execute(sql`
    ALTER TABLE payments 
    DROP COLUMN IF EXISTS payment_method_details_encrypted,
    DROP COLUMN IF EXISTS gateway_response_encrypted;
  `);

  await db.execute(sql`
    ALTER TABLE invoices 
    DROP COLUMN IF EXISTS payment_method_id_encrypted,
    DROP COLUMN IF EXISTS transaction_id_encrypted;
  `);

  logger.info('Migration 018: Encrypted payment fields removed');
}
