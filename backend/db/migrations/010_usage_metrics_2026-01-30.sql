CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS usage_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  metric_type VARCHAR(100) NOT NULL,
  value DECIMAL(15,2) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  period VARCHAR(50) NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}',
  recorded_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS usage_org_metric_idx ON usage_metrics(organization_id, metric_type);
CREATE INDEX IF NOT EXISTS usage_recorded_idx ON usage_metrics(recorded_at);
