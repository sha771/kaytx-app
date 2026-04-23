-- Add platform sync engine tables (jobs, webhook idempotency, failed-op queue)
-- Generated: 2026-01-27

CREATE TABLE IF NOT EXISTS platform_sync_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  connection_id UUID REFERENCES platform_connections(id) ON DELETE CASCADE,
  job_type VARCHAR(50) NOT NULL,
  status VARCHAR(30) DEFAULT 'queued',
  payload JSONB DEFAULT '{}',
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 5,
  next_run_at TIMESTAMP DEFAULT NOW(),
  last_error TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS platform_sync_jobs_org_platform_status_next_run_idx
  ON platform_sync_jobs(organization_id, platform, status, next_run_at);
CREATE INDEX IF NOT EXISTS platform_sync_jobs_org_created_idx
  ON platform_sync_jobs(organization_id, created_at);

CREATE TABLE IF NOT EXISTS platform_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  event_id VARCHAR(255) NOT NULL,
  payload JSONB DEFAULT '{}',
  status VARCHAR(30) DEFAULT 'received',
  received_at TIMESTAMP DEFAULT NOW(),
  processed_at TIMESTAMP,
  UNIQUE(organization_id, platform, event_id)
);

CREATE INDEX IF NOT EXISTS platform_webhook_events_org_received_idx
  ON platform_webhook_events(organization_id, received_at);

CREATE TABLE IF NOT EXISTS platform_failed_operations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  operation_type VARCHAR(80) NOT NULL,
  payload JSONB DEFAULT '{}',
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 5,
  next_retry_at TIMESTAMP DEFAULT NOW(),
  last_error TEXT,
  status VARCHAR(30) DEFAULT 'failed',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS platform_failed_ops_org_platform_next_retry_idx
  ON platform_failed_operations(organization_id, platform, next_retry_at);
