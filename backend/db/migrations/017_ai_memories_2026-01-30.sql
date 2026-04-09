CREATE TABLE IF NOT EXISTS ai_memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(30) NOT NULL,
  content TEXT NOT NULL,
  importance NUMERIC(3,2) NOT NULL DEFAULT 0,
  tags JSONB NOT NULL DEFAULT '[]',
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ai_memories_org_user_created_idx
  ON ai_memories(organization_id, user_id, created_at);

CREATE INDEX IF NOT EXISTS ai_memories_org_type_idx
  ON ai_memories(organization_id, type);
