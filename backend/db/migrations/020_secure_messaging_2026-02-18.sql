CREATE TABLE IF NOT EXISTS secure_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL,
  name VARCHAR(255),
  description TEXT,
  visibility VARCHAR(20) NOT NULL DEFAULT 'private',
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS secure_conversations_org_idx ON secure_conversations(organization_id);
CREATE INDEX IF NOT EXISTS secure_conversations_type_idx ON secure_conversations(type);

CREATE TABLE IF NOT EXISTS secure_conversation_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES secure_conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL DEFAULT 'member',
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_read_at TIMESTAMPTZ,
  UNIQUE(conversation_id, user_id)
);

CREATE INDEX IF NOT EXISTS secure_conversation_members_user_idx ON secure_conversation_members(user_id);
CREATE INDEX IF NOT EXISTS secure_conversation_members_conversation_idx ON secure_conversation_members(conversation_id);

ALTER TABLE messages
  ADD COLUMN IF NOT EXISTS secure_conversation_id UUID REFERENCES secure_conversations(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS messages_secure_conversation_idx ON messages(secure_conversation_id);
