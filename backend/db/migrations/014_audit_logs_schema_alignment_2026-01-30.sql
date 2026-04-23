CREATE EXTENSION IF NOT EXISTS pgcrypto;

ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS resource VARCHAR(100);
ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'success';
ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS severity severity NOT NULL DEFAULT 'info';
ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS metadata JSONB NOT NULL DEFAULT '{}';
ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS timestamp TIMESTAMP NOT NULL DEFAULT NOW();

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'audit_logs' AND column_name = 'resource_type'
  ) THEN
    UPDATE audit_logs
    SET resource = COALESCE(NULLIF(resource, ''), resource_type)
    WHERE resource IS NULL OR resource = '';
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'audit_logs' AND column_name = 'created_at'
  ) THEN
    UPDATE audit_logs
    SET timestamp = COALESCE(timestamp, created_at)
    WHERE timestamp IS NULL;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'audit_logs' AND column_name = 'resource_id'
      AND data_type <> 'uuid'
  ) THEN
    ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS resource_id_uuid UUID;

    UPDATE audit_logs
    SET resource_id_uuid = CASE
      WHEN resource_id ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
        THEN resource_id::uuid
      ELSE NULL
    END
    WHERE resource_id_uuid IS NULL;

    ALTER TABLE audit_logs RENAME COLUMN resource_id TO resource_id_legacy;
    ALTER TABLE audit_logs RENAME COLUMN resource_id_uuid TO resource_id;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS audit_org_idx ON audit_logs(organization_id);
CREATE INDEX IF NOT EXISTS audit_user_idx ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS audit_timestamp_idx ON audit_logs(timestamp);
