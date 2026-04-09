import { db } from '../connection';
import { sql } from 'drizzle-orm';
import { logger } from '../../lib/production-logger';

/**
 * Migration: Fix database schema mismatches and add missing fields
 * This migration addresses various schema inconsistencies and adds missing indexes/constraints
 */
export async function up(): Promise<void> {
  logger.info('Starting comprehensive schema fixes...');

  // 1. Add missing indexes for performance
  logger.info('Adding missing indexes...');
  
  // Users table indexes
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
    CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
    CREATE INDEX IF NOT EXISTS idx_users_organization_id ON users(organization_id);
    CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
    CREATE INDEX IF NOT EXISTS idx_users_last_login_at ON users(last_login_at);
    CREATE INDEX IF NOT EXISTS idx_users_email_verified ON users(email_verified);
    CREATE INDEX IF NOT EXISTS idx_users_two_factor_enabled ON users(two_factor_enabled);
  `);

  // Organizations table indexes
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS idx_organizations_owner_id ON organizations(owner_id);
    CREATE INDEX IF NOT EXISTS idx_organizations_plan ON organizations(plan);
    CREATE INDEX IF NOT EXISTS idx_organizations_status ON organizations(status);
    CREATE INDEX IF NOT EXISTS idx_organizations_created_at ON organizations(created_at);
    CREATE INDEX IF NOT EXISTS idx_organizations_trial_ends_at ON organizations(trial_ends_at);
  `);

  // Sessions table indexes
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
    CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON sessions(created_at);
    CREATE INDEX IF NOT EXISTS idx_sessions_last_activity_at ON sessions(last_activity_at);
    CREATE INDEX IF NOT EXISTS idx_sessions_ip_address ON sessions(ip_address);
  `);

  // Subscriptions table indexes
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS idx_subscriptions_organization_id ON subscriptions(organization_id);
    CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
    CREATE INDEX IF NOT EXISTS idx_subscriptions_plan ON subscriptions(plan);
    CREATE INDEX IF NOT EXISTS idx_subscriptions_next_billing_date ON subscriptions(next_billing_date);
    CREATE INDEX IF NOT EXISTS idx_subscriptions_created_at ON subscriptions(created_at);
  `);

  // Invoices table indexes
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS idx_invoices_organization_id ON invoices(organization_id);
    CREATE INDEX IF NOT EXISTS idx_invoices_subscription_id ON invoices(subscription_id);
    CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
    CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON invoices(due_date);
    CREATE INDEX IF NOT EXISTS idx_invoices_created_at ON invoices(created_at);
    CREATE INDEX IF NOT EXISTS idx_invoices_paid_at ON invoices(paid_at);
  `);

  // Payments table indexes
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS idx_payments_organization_id ON payments(organization_id);
    CREATE Index IF NOT EXISTS idx_payments_invoice_id ON payments(invoice_id);
    CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
    CREATE INDEX IF NOT EXISTS idx_payments_method ON payments(method);
    CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);
    CREATE INDEX IF NOT EXISTS idx_payments_processed_at ON payments(processed_at);
  `);

  // Audit logs table indexes (additional)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS idx_audit_action ON audit_logs(action);
    CREATE INDEX IF NOT EXISTS idx_audit_resource ON audit_logs(resource);
    CREATE INDEX IF NOT EXISTS idx_audit_status ON audit_logs(status);
    CREATE INDEX IF NOT EXISTS idx_audit_severity ON audit_logs(severity);
    CREATE INDEX IF NOT EXISTS idx_audit_ip_address ON audit_logs(ip_address);
  `);

  // 2. Add missing constraints and validations
  logger.info('Adding missing constraints...');
  
  // Ensure email addresses are lowercase
  await db.execute(sql`
    UPDATE users SET email = LOWER(email) WHERE email != LOWER(email);
  `);

  // Ensure organization slugs are lowercase and valid
  await db.execute(sql`
    UPDATE organizations SET slug = LOWER(REGEXP_REPLACE(slug, '[^a-z0-9-]', '-', 'g')) 
    WHERE slug != LOWER(slug) OR slug != REGEXP_REPLACE(slug, '[^a-z0-9-]', '-', 'g');
  `);

  // Add check constraints for data integrity
  await db.execute(sql`
    ALTER TABLE users ADD CONSTRAINT IF NOT EXISTS chk_users_email_format 
    CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
  `);

  await db.execute(sql`
    ALTER TABLE users ADD CONSTRAINT IF NOT EXISTS chk_users_failed_attempts 
    CHECK (failed_login_attempts >= 0);
  `);

  await db.execute(sql`
    ALTER TABLE organizations ADD CONSTRAINT IF NOT EXISTS chk_org_max_users 
    CHECK (max_users > 0);
  `);

  await db.execute(sql`
    ALTER TABLE organizations ADD CONSTRAINT IF NOT EXISTS chk_org_max_storage 
    CHECK (max_storage > 0);
  `);

  await db.execute(sql`
    ALTER TABLE invoices ADD CONSTRAINT IF NOT EXISTS chk_invoice_amount_positive 
    CHECK (amount > 0);
  `);

  await db.execute(sql`
    ALTER TABLE invoices ADD CONSTRAINT IF NOT EXISTS chk_invoice_total_positive 
    CHECK (total > 0);
  `);

  await db.execute(sql`
    ALTER TABLE payments ADD CONSTRAINT IF NOT EXISTS chk_payment_amount_positive 
    CHECK (amount > 0);
  `);

  // 3. Fix data type inconsistencies
  logger.info('Fixing data type inconsistencies...');
  
  // Ensure timestamps are properly set
  await db.execute(sql`
    UPDATE users SET updated_at = created_at WHERE updated_at IS NULL;
  `);

  await db.execute(sql`
    UPDATE organizations SET updated_at = created_at WHERE updated_at IS NULL;
  `);

  await db.execute(sql`
    UPDATE invoices SET updated_at = created_at WHERE updated_at IS NULL;
  `);

  // 4. Add missing default values
  logger.info('Adding missing default values...');
  
  // Set default preferences for users that don't have them
  await db.execute(sql`
    UPDATE users SET preferences = '{}' WHERE preferences IS NULL;
  `);

  await db.execute(sql`
    UPDATE users SET metadata = '{}' WHERE metadata IS NULL;
  `);

  await db.execute(sql`
    UPDATE organizations SET metadata = '{}' WHERE metadata IS NULL;
  `);

  await db.execute(sql`
    UPDATE subscriptions SET metadata = '{}' WHERE metadata IS NULL;
  `);

  await db.execute(sql`
    UPDATE invoices SET metadata = '{}' WHERE metadata IS NULL;
  `);

  await db.execute(sql`
    UPDATE payments SET metadata = '{}' WHERE metadata IS NULL;
  `);

  await db.execute(sql`
    UPDATE audit_logs SET metadata = '{}' WHERE metadata IS NULL;
  `);

  // 5. Clean up orphaned records
  logger.info('Cleaning up orphaned records...');
  
  // Remove sessions for users that don't exist
  await db.execute(sql`
    DELETE FROM sessions WHERE user_id NOT IN (SELECT id FROM users);
  `);

  // Remove subscriptions for organizations that don't exist
  await db.execute(sql`
    DELETE FROM subscriptions WHERE organization_id NOT IN (SELECT id FROM organizations);
  `);

  // Remove invoices for organizations that don't exist
  await db.execute(sql`
    DELETE FROM invoices WHERE organization_id NOT IN (SELECT id FROM organizations);
  `);

  // Remove payments for organizations that don't exist
  await db.execute(sql`
    DELETE FROM payments WHERE organization_id NOT IN (SELECT id FROM organizations);
  `);

  // Remove invoices that reference non-existent subscriptions
  await db.execute(sql`
    UPDATE invoices SET subscription_id = NULL 
    WHERE subscription_id IS NOT NULL AND subscription_id NOT IN (SELECT id FROM subscriptions);
  `);

  // Remove payments that reference non-existent invoices
  await db.execute(sql`
    UPDATE payments SET invoice_id = NULL 
    WHERE invoice_id IS NOT NULL AND invoice_id NOT IN (SELECT id FROM invoices);
  `);

  // 6. Add missing foreign key constraints if they don't exist
  logger.info('Adding missing foreign key constraints...');
  
  try {
    await db.execute(sql`
      ALTER TABLE sessions ADD CONSTRAINT IF NOT EXISTS fk_sessions_user_id 
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    `);
  } catch (e) {
    logger.info('Foreign key constraint for sessions.user_id may already exist');
  }

  try {
    await db.execute(sql`
      ALTER TABLE users ADD CONSTRAINT IF NOT EXISTS fk_users_organization_id 
      FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE SET NULL;
    `);
  } catch (e) {
    logger.info('Foreign key constraint for users.organization_id may already exist');
  }

  try {
    await db.execute(sql`
      ALTER TABLE organizations ADD CONSTRAINT IF NOT EXISTS fk_organizations_owner_id 
      FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE RESTRICT;
    `);
  } catch (e) {
    logger.info('Foreign key constraint for organizations.owner_id may already exist');
  }

  // 7. Update table statistics for query optimization
  logger.info('Updating table statistics...');
  await db.execute(sql`ANALYZE;`);

  logger.info('Schema fixes completed successfully!');
}

export async function down(): Promise<void> {
  logger.info('Rolling back schema fixes...');
  
  // Remove added indexes
  const indexes = [
    // Users
    'idx_users_status', 'idx_users_role', 'idx_users_organization_id', 
    'idx_users_created_at', 'idx_users_last_login_at', 'idx_users_email_verified', 'idx_users_two_factor_enabled',
    // Organizations
    'idx_organizations_owner_id', 'idx_organizations_plan', 'idx_organizations_status',
    'idx_organizations_created_at', 'idx_organizations_trial_ends_at',
    // Sessions
    'idx_sessions_user_id', 'idx_sessions_created_at', 'idx_sessions_last_activity_at', 'idx_sessions_ip_address',
    // Subscriptions
    'idx_subscriptions_organization_id', 'idx_subscriptions_status', 'idx_subscriptions_plan',
    'idx_subscriptions_next_billing_date', 'idx_subscriptions_created_at',
    // Invoices
    'idx_invoices_organization_id', 'idx_invoices_subscription_id', 'idx_invoices_status',
    'idx_invoices_due_date', 'idx_invoices_created_at', 'idx_invoices_paid_at',
    // Payments
    'idx_payments_organization_id', 'idx_payments_invoice_id', 'idx_payments_status',
    'idx_payments_method', 'idx_payments_created_at', 'idx_payments_processed_at',
    // Audit logs
    'idx_audit_action', 'idx_audit_resource', 'idx_audit_status', 'idx_audit_severity', 'idx_audit_ip_address'
  ];

  for (const indexName of indexes) {
    try {
      await db.execute(sql`DROP INDEX IF EXISTS ${indexName};`);
    } catch (e) {
      logger.info(`Failed to drop index ${indexName}:`, e);
    }
  }

  // Remove check constraints
  const constraints = [
    'chk_users_email_format', 'chk_users_failed_attempts',
    'chk_org_max_users', 'chk_org_max_storage',
    'chk_invoice_amount_positive', 'chk_invoice_total_positive',
    'chk_payment_amount_positive'
  ];

  for (const constraintName of constraints) {
    try {
      await db.execute(sql`ALTER TABLE users DROP CONSTRAINT IF EXISTS ${constraintName};`);
    } catch (e) {
      logger.info(`Failed to drop constraint ${constraintName}:`, e);
    }
  }

  logger.info('Schema fixes rollback completed!');
}
