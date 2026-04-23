-- GDPR privacy settings and data subject requests
-- Generated: 2026-01-28

CREATE TABLE IF NOT EXISTS privacy_settings (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  settings JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS data_export_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(30) NOT NULL DEFAULT 'pending',
  requested_at TIMESTAMP NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMP,
  format VARCHAR(10) NOT NULL,
  options JSONB NOT NULL DEFAULT '{}',
  result JSONB,
  expires_at TIMESTAMP,
  error TEXT
);

CREATE INDEX IF NOT EXISTS data_export_requests_user_idx ON data_export_requests(user_id, requested_at);

CREATE TABLE IF NOT EXISTS data_deletion_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(30) NOT NULL DEFAULT 'pending',
  requested_at TIMESTAMP NOT NULL DEFAULT NOW(),
  scheduled_for TIMESTAMP NOT NULL,
  completed_at TIMESTAMP,
  reason TEXT,
  delete_type VARCHAR(20) NOT NULL,
  data_types JSONB NOT NULL DEFAULT '[]',
  cancellation_deadline TIMESTAMP NOT NULL,
  error TEXT
);

CREATE INDEX IF NOT EXISTS data_deletion_requests_user_idx ON data_deletion_requests(user_id, requested_at);

CREATE TABLE IF NOT EXISTS consent_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  consent_type VARCHAR(100) NOT NULL,
  version VARCHAR(20) NOT NULL,
  granted BOOLEAN NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
  ip_address VARCHAR(50),
  user_agent TEXT
);

CREATE INDEX IF NOT EXISTS consent_records_user_idx ON consent_records(user_id, timestamp);

CREATE TABLE IF NOT EXISTS data_access_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  accessed_by TEXT NOT NULL,
  access_type VARCHAR(20) NOT NULL,
  data_type VARCHAR(100) NOT NULL,
  reason TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
  ip_address VARCHAR(50),
  success BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS data_access_logs_user_idx ON data_access_logs(user_id, timestamp);
