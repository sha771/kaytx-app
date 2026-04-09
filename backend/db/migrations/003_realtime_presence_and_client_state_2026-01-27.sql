-- Add realtime presence and client state (offline replay support)
-- Generated: 2026-01-27

CREATE TABLE IF NOT EXISTS realtime_client_state (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  last_ack_seq INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);

CREATE INDEX IF NOT EXISTS realtime_client_state_org_idx ON realtime_client_state(organization_id);
CREATE INDEX IF NOT EXISTS realtime_client_state_user_idx ON realtime_client_state(user_id);

CREATE TABLE IF NOT EXISTS realtime_presence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  is_online BOOLEAN DEFAULT FALSE,
  last_seen_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);

CREATE INDEX IF NOT EXISTS realtime_presence_org_idx ON realtime_presence(organization_id);
CREATE INDEX IF NOT EXISTS realtime_presence_user_idx ON realtime_presence(user_id);
