CREATE EXTENSION IF NOT EXISTS pgcrypto;

ALTER TABLE webhooks ADD COLUMN IF NOT EXISTS name VARCHAR(255);
ALTER TABLE webhooks ADD COLUMN IF NOT EXISTS secret TEXT;
ALTER TABLE webhooks ADD COLUMN IF NOT EXISTS status VARCHAR(50) NOT NULL DEFAULT 'active';
ALTER TABLE webhooks ADD COLUMN IF NOT EXISTS headers JSONB NOT NULL DEFAULT '{}';
ALTER TABLE webhooks ADD COLUMN IF NOT EXISTS retry_attempts INTEGER NOT NULL DEFAULT 3;
ALTER TABLE webhooks ADD COLUMN IF NOT EXISTS last_triggered_at TIMESTAMP;
ALTER TABLE webhooks ADD COLUMN IF NOT EXISTS failure_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE webhooks ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE webhooks ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES users(id) ON DELETE SET NULL;

UPDATE webhooks
SET name = COALESCE(name, 'Webhook ' || substring(md5(id::text) from 1 for 8))
WHERE name IS NULL;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'webhooks' AND column_name = 'is_active'
  ) THEN
    UPDATE webhooks
    SET status = CASE
      WHEN is_active = TRUE THEN 'active'
      ELSE 'inactive'
    END
    WHERE status IS NULL OR status = '';
  END IF;
END $$;

UPDATE webhooks
SET status = COALESCE(NULLIF(status, ''), 'active')
WHERE status IS NULL OR status = '';

UPDATE webhooks
SET secret = COALESCE(secret, 'whsec_' || substring(md5(random()::text) from 1 for 32))
WHERE secret IS NULL;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'webhooks' AND column_name = 'events'
      AND udt_name = '_text'
  ) THEN
    ALTER TABLE webhooks ADD COLUMN IF NOT EXISTS events_jsonb JSONB;

    UPDATE webhooks
    SET events_jsonb = COALESCE(to_jsonb(events), '[]'::jsonb)
    WHERE events_jsonb IS NULL;

    ALTER TABLE webhooks DROP COLUMN events;
    ALTER TABLE webhooks RENAME COLUMN events_jsonb TO events;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'webhooks' AND column_name = 'events'
  ) THEN
    ALTER TABLE webhooks ALTER COLUMN events SET DEFAULT '[]'::jsonb;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS webhook_org_idx ON webhooks(organization_id);
