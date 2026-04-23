-- Add agent memory system with pgvector extension
-- Generated: 2026-01-31

-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Agent memories table for storing conversation memories
CREATE TABLE IF NOT EXISTS agent_memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  session_id VARCHAR(255),
  memory_type VARCHAR(50) NOT NULL DEFAULT 'conversation', -- conversation, context, summary, fact
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  embedding vector(1536), -- OpenAI embedding dimension
  importance_score FLOAT DEFAULT 1.0,
  access_count INTEGER DEFAULT 0,
  last_accessed_at TIMESTAMP,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Memory summaries for long-term storage
CREATE TABLE IF NOT EXISTS agent_memory_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  summary_type VARCHAR(50) NOT NULL DEFAULT 'daily', -- daily, weekly, monthly, topic
  title VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  key_points JSONB DEFAULT '[]',
  related_memory_ids UUID[] DEFAULT '{}',
  embedding vector(1536),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Memory contexts for tracking conversation context
CREATE TABLE IF NOT EXISTS agent_memory_contexts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  context_key VARCHAR(255) NOT NULL,
  context_value TEXT NOT NULL,
  context_type VARCHAR(50) NOT NULL DEFAULT 'user_preference', -- user_preference, project_info, conversation_state
  embedding vector(1536),
  strength FLOAT DEFAULT 1.0,
  last_used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(agent_id, context_key)
);

-- Memory search index using pgvector
CREATE INDEX IF NOT EXISTS agent_memories_embedding_idx ON agent_memories USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS agent_memory_summaries_embedding_idx ON agent_memory_summaries USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS agent_memory_contexts_embedding_idx ON agent_memory_contexts USING ivfflat (embedding vector_cosine_ops);

-- Performance indexes
CREATE INDEX IF NOT EXISTS agent_memories_agent_session_idx ON agent_memories(agent_id, session_id);
CREATE INDEX IF NOT EXISTS agent_memories_type_created_idx ON agent_memories(memory_type, created_at);
CREATE INDEX IF NOT EXISTS agent_memories_importance_idx ON agent_memories(importance_score DESC);
CREATE INDEX IF NOT EXISTS agent_memories_expires_idx ON agent_memories(expires_at);

CREATE INDEX IF NOT EXISTS agent_memory_summaries_agent_type_idx ON agent_memory_summaries(agent_id, summary_type);
CREATE INDEX IF NOT EXISTS agent_memory_summaries_created_idx ON agent_memory_summaries(created_at DESC);

CREATE INDEX IF NOT EXISTS agent_memory_contexts_agent_type_idx ON agent_memory_contexts(agent_id, context_type);
CREATE INDEX IF NOT EXISTS agent_memory_contexts_strength_idx ON agent_memory_contexts(strength DESC);

-- Memory statistics table
CREATE TABLE IF NOT EXISTS agent_memory_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  total_memories INTEGER DEFAULT 0,
  total_contexts INTEGER DEFAULT 0,
  total_summaries INTEGER DEFAULT 0,
  avg_importance_score FLOAT DEFAULT 0.0,
  last_pruned_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(agent_id)
);

-- Memory cleanup job tracking
CREATE TABLE IF NOT EXISTS agent_memory_cleanup_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  job_type VARCHAR(50) NOT NULL DEFAULT 'prune', -- prune, summarize, archive
  status VARCHAR(30) DEFAULT 'pending',
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  records_processed INTEGER DEFAULT 0,
  records_deleted INTEGER DEFAULT 0,
  error_message TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for cleanup jobs
CREATE INDEX IF NOT EXISTS agent_memory_cleanup_jobs_agent_status_idx ON agent_memory_cleanup_jobs(agent_id, status);
CREATE INDEX IF NOT EXISTS agent_memory_cleanup_jobs_created_idx ON agent_memory_cleanup_jobs(created_at DESC);

-- Memory access patterns for optimization
CREATE TABLE IF NOT EXISTS agent_memory_access_patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  memory_id UUID REFERENCES agent_memories(id) ON DELETE CASCADE,
  access_type VARCHAR(50) NOT NULL DEFAULT 'search', -- search, retrieve, update
  query_embedding vector(1536),
  similarity_score FLOAT,
  access_timestamp TIMESTAMP DEFAULT NOW(),
  session_id VARCHAR(255),
  metadata JSONB DEFAULT '{}'
);

-- Indexes for access patterns
CREATE INDEX IF NOT EXISTS agent_memory_access_patterns_agent_timestamp_idx ON agent_memory_access_patterns(agent_id, access_timestamp DESC);
CREATE INDEX IF NOT EXISTS agent_memory_access_patterns_memory_idx ON agent_memory_access_patterns(memory_id);

-- Enable RLS policies for security
ALTER TABLE agent_memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_memory_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_memory_contexts ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_memory_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_memory_cleanup_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_memory_access_patterns ENABLE ROW LEVEL SECURITY;

-- RLS Policies (simplified - in production would be more granular)
CREATE POLICY agent_memories_org_policy ON agent_memories
  FOR ALL TO authenticated
  USING (organization_id = current_setting('app.current_organization_id')::UUID);

CREATE POLICY agent_memory_summaries_org_policy ON agent_memory_summaries
  FOR ALL TO authenticated
  USING (organization_id = current_setting('app.current_organization_id')::UUID);

CREATE POLICY agent_memory_contexts_org_policy ON agent_memory_contexts
  FOR ALL TO authenticated
  USING (organization_id = current_setting('app.current_organization_id')::UUID);

-- Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_agent_memories_updated_at BEFORE UPDATE ON agent_memories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agent_memory_summaries_updated_at BEFORE UPDATE ON agent_memory_summaries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agent_memory_contexts_updated_at BEFORE UPDATE ON agent_memory_contexts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agent_memory_stats_updated_at BEFORE UPDATE ON agent_memory_stats
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
