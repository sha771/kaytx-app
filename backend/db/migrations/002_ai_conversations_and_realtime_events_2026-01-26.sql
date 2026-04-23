-- Add AI conversations and realtime events persistence
-- Generated: 2026-01-26

ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verification_token TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verification_expires TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_reset_token TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_reset_expires TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS two_factor_secret TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS two_factor_recovery_codes JSONB DEFAULT '[]';

CREATE TABLE IF NOT EXISTS ai_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL,
  model VARCHAR(100),
  status VARCHAR(50) DEFAULT 'draft',
  config JSONB NOT NULL DEFAULT '{}',
  system_prompt TEXT,
  capabilities JSONB NOT NULL DEFAULT '[]',
  success_rate INTEGER NOT NULL DEFAULT 0,
  total_calls INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ai_agents_org_idx ON ai_agents(organization_id);
CREATE INDEX IF NOT EXISTS ai_agents_type_idx ON ai_agents(type);
CREATE INDEX IF NOT EXISTS ai_agents_status_idx ON ai_agents(status);

CREATE TABLE IF NOT EXISTS ai_agent_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES ai_agents(id) ON DELETE SET NULL,
  agent_type VARCHAR(80),
  agent_name VARCHAR(255),
  event_type VARCHAR(80) NOT NULL,
  status VARCHAR(30) DEFAULT 'success',
  action TEXT NOT NULL,
  details JSONB NOT NULL DEFAULT '{}',
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ai_agent_events_org_idx ON ai_agent_events(organization_id);
CREATE INDEX IF NOT EXISTS ai_agent_events_agent_idx ON ai_agent_events(agent_id);
CREATE INDEX IF NOT EXISTS ai_agent_events_event_type_idx ON ai_agent_events(event_type);
CREATE INDEX IF NOT EXISTS ai_agent_events_created_at_idx ON ai_agent_events(created_at);

CREATE TABLE IF NOT EXISTS ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  call_id UUID,
  agent_id UUID REFERENCES ai_agents(id) ON DELETE SET NULL,
  type VARCHAR(50),
  participants JSONB DEFAULT '[]',
  messages JSONB DEFAULT '[]',
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ai_conversations_org_idx ON ai_conversations(organization_id);
CREATE INDEX IF NOT EXISTS ai_conversations_call_idx ON ai_conversations(call_id);
CREATE INDEX IF NOT EXISTS ai_conversations_agent_idx ON ai_conversations(agent_id);

CREATE TABLE IF NOT EXISTS realtime_events (
  seq SERIAL PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  channel VARCHAR(100) NOT NULL,
  type VARCHAR(100) NOT NULL,
  payload JSONB DEFAULT '{}',
  timestamp INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS realtime_events_org_seq_idx ON realtime_events(organization_id, seq);
CREATE INDEX IF NOT EXISTS realtime_events_channel_seq_idx ON realtime_events(channel, seq);
CREATE INDEX IF NOT EXISTS realtime_events_created_at_idx ON realtime_events(created_at);
