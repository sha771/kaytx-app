-- Schema alignment migration
-- Generated: 2026-01-29

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ---------------------------------------------------------------------------
-- Align organizations table with drizzle-schema.ts
-- ---------------------------------------------------------------------------
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS tax_id VARCHAR(100);
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS address JSONB;
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS industry VARCHAR(100);
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS company_size VARCHAR(50);

-- ---------------------------------------------------------------------------
-- Align api_keys table with drizzle-schema.ts and enterprise API key handlers
-- ---------------------------------------------------------------------------
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS key TEXT;
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS hashed_key TEXT;
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS permissions JSONB NOT NULL DEFAULT '[]';
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS rate_limit INTEGER NOT NULL DEFAULT 1000;
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS usage_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS status VARCHAR(50) NOT NULL DEFAULT 'active';

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'api_keys' AND column_name = 'key_hash'
  ) THEN
    UPDATE api_keys
    SET hashed_key = COALESCE(hashed_key, key_hash)
    WHERE hashed_key IS NULL;
  END IF;
END $$;

UPDATE api_keys
SET key = COALESCE(key, 'key_' || substring(md5(id::text) from 1 for 24))
WHERE key IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS api_keys_key_uq ON api_keys(key);
CREATE UNIQUE INDEX IF NOT EXISTS api_keys_hashed_key_uq ON api_keys(hashed_key);
CREATE INDEX IF NOT EXISTS api_keys_org_idx ON api_keys(organization_id);

-- ---------------------------------------------------------------------------
-- Contacts (referenced by call_logs)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  email VARCHAR(255),
  phone VARCHAR(50),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  company VARCHAR(255),
  position VARCHAR(100),
  tags JSONB NOT NULL DEFAULT '[]',
  custom_fields JSONB NOT NULL DEFAULT '{}',
  source VARCHAR(100),
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  last_contacted_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS contact_org_idx ON contacts(organization_id);
CREATE INDEX IF NOT EXISTS contact_email_idx ON contacts(email);

-- ---------------------------------------------------------------------------
-- Call logs (used by Hono call recording endpoint)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS call_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  direction VARCHAR(20) NOT NULL,
  phone_number VARCHAR(50) NOT NULL,
  duration INTEGER NOT NULL DEFAULT 0,
  status VARCHAR(50) NOT NULL,
  recording_url TEXT,
  transcription TEXT,
  summary TEXT,
  sentiment VARCHAR(50),
  tags JSONB NOT NULL DEFAULT '[]',
  metadata JSONB NOT NULL DEFAULT '{}',
  started_at TIMESTAMP NOT NULL,
  ended_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS call_logs_org_created_at_idx ON call_logs(organization_id, created_at);
CREATE INDEX IF NOT EXISTS call_logs_user_idx ON call_logs(user_id);
CREATE INDEX IF NOT EXISTS call_logs_contact_idx ON call_logs(contact_id);
CREATE INDEX IF NOT EXISTS call_logs_call_id_idx ON call_logs((metadata->>'callId'));

-- ---------------------------------------------------------------------------
-- Notifications
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  priority priority NOT NULL DEFAULT 'medium',
  read BOOLEAN NOT NULL DEFAULT FALSE,
  action_url TEXT,
  metadata JSONB NOT NULL DEFAULT '{}',
  read_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS notification_user_idx ON notifications(user_id);
CREATE INDEX IF NOT EXISTS notification_read_idx ON notifications(read);
