-- Auth + audit schema alignment
-- Generated: 2026-01-30

-- ---------------------------------------------------------------------------
-- Users: add missing consent fields referenced by auth/register
-- ---------------------------------------------------------------------------
ALTER TABLE users ADD COLUMN IF NOT EXISTS terms_accepted BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS terms_accepted_at TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS privacy_policy_accepted BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS privacy_policy_accepted_at TIMESTAMP;

-- ---------------------------------------------------------------------------
-- Audit logs: align legacy schema with current drizzle-schema/lib/audit usage
-- Legacy (001_initial_schema) used: resource_type, created_at
-- Current expects: resource, status, severity, metadata, timestamp
-- ---------------------------------------------------------------------------
ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS resource VARCHAR(100);
ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'success';
ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS severity severity NOT NULL DEFAULT 'info';
ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS metadata JSONB NOT NULL DEFAULT '{}';
ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS timestamp TIMESTAMP NOT NULL DEFAULT NOW();

-- Backfill resource from legacy resource_type where possible
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name='audit_logs' AND column_name='resource_type'
  ) THEN
    UPDATE audit_logs
    SET resource = COALESCE(resource, resource_type)
    WHERE resource IS NULL;
  END IF;
END $$;

-- Backfill timestamp from legacy created_at if present
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name='audit_logs' AND column_name='created_at'
  ) THEN
    UPDATE audit_logs
    SET timestamp = COALESCE(timestamp, created_at)
    WHERE timestamp IS NULL;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS audit_timestamp_idx ON audit_logs(timestamp);
