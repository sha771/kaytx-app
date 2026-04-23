-- Agent Memory System Schema
-- Generated: 2026-01-31

-- Enable pgvector extension for vector embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Agent memories with vector embeddings
CREATE TABLE IF NOT EXISTS agent_memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  content_type VARCHAR(50) DEFAULT 'text' NOT NULL, -- text, image, audio, video, document
  embedding vector(1536), -- OpenAI embedding dimension
  metadata JSONB DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  importance_score DECIMAL(3,2) DEFAULT 0.5, -- 0.00 to 1.00
  access_count INTEGER DEFAULT 0,
  last_accessed_at TIMESTAMP,
  memory_type VARCHAR(50) DEFAULT 'episodic' NOT NULL, -- episodic, semantic, procedural, working
  context_window JSONB DEFAULT '{}', -- Related context information
  summary TEXT, -- AI-generated summary for long memories
  is_archived BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP, -- For temporary memories
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Memory relationships and associations
CREATE TABLE IF NOT EXISTS memory_associations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_memory_id UUID NOT NULL REFERENCES agent_memories(id) ON DELETE CASCADE,
  target_memory_id UUID NOT NULL REFERENCES agent_memories(id) ON DELETE CASCADE,
  association_type VARCHAR(50) NOT NULL, -- related, causal, temporal, semantic
  strength DECIMAL(3,2) DEFAULT 0.5, -- 0.00 to 1.00
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(source_memory_id, target_memory_id, association_type)
);

-- Memory search index for similarity search
CREATE INDEX IF NOT EXISTS agent_memories_embedding_idx ON agent_memories USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Memory metadata indexes
CREATE INDEX IF NOT EXISTS agent_memories_agent_idx ON agent_memories(agent_id);
CREATE INDEX IF NOT EXISTS agent_memories_org_idx ON agent_memories(organization_id);
CREATE INDEX IF NOT EXISTS agent_memories_type_idx ON agent_memories(memory_type);
CREATE INDEX IF NOT EXISTS agent_memories_importance_idx ON agent_memories(importance_score DESC);
CREATE INDEX IF NOT EXISTS agent_memories_tags_idx ON agent_memories USING GIN(tags);
CREATE INDEX IF NOT EXISTS agent_memories_created_idx ON agent_memories(created_at DESC);
CREATE INDEX IF NOT EXISTS agent_memories_accessed_idx ON agent_memories(last_accessed_at DESC);
CREATE INDEX IF NOT EXISTS agent_memories_expires_idx ON agent_memories(expires_at);

-- Memory associations indexes
CREATE INDEX IF NOT EXISTS memory_associations_source_idx ON memory_associations(source_memory_id);
CREATE INDEX IF NOT EXISTS memory_associations_target_idx ON memory_associations(target_memory_id);
CREATE INDEX IF NOT EXISTS memory_associations_type_idx ON memory_associations(association_type);

-- Memory summarization jobs
CREATE TABLE IF NOT EXISTS memory_summarization_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  memory_id UUID REFERENCES agent_memories(id) ON DELETE CASCADE,
  job_type VARCHAR(50) NOT NULL, -- summarize, compress, extract_entities
  status VARCHAR(30) DEFAULT 'pending' NOT NULL, -- pending, running, completed, failed
  input_data JSONB,
  result_data JSONB,
  error_message TEXT,
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,
  scheduled_at TIMESTAMP DEFAULT NOW(),
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Memory pruning and archival
CREATE TABLE IF NOT EXISTS memory_archival_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  job_type VARCHAR(50) NOT NULL, -- prune, archive, delete
  criteria JSONB NOT NULL, -- age, importance, access_count, etc.
  status VARCHAR(30) DEFAULT 'pending' NOT NULL,
  affected_memory_count INTEGER DEFAULT 0,
  processed_memory_count INTEGER DEFAULT 0,
  error_message TEXT,
  scheduled_at TIMESTAMP DEFAULT NOW(),
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Memory context windows for efficient retrieval
CREATE TABLE IF NOT EXISTS memory_context_windows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  window_name VARCHAR(100) NOT NULL,
  memory_ids UUID[] NOT NULL,
  context_type VARCHAR(50) DEFAULT 'conversation' NOT NULL, -- conversation, session, project
  metadata JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);

-- Indexes for context windows
CREATE INDEX IF NOT EXISTS memory_context_windows_agent_idx ON memory_context_windows(agent_id);
CREATE INDEX IF NOT EXISTS memory_context_windows_type_idx ON memory_context_windows(context_type);
CREATE INDEX IF NOT EXISTS memory_context_windows_active_idx ON memory_context_windows(is_active, expires_at);

-- Memory access patterns for optimization
CREATE TABLE IF NOT EXISTS memory_access_patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  memory_id UUID NOT NULL REFERENCES agent_memories(id) ON DELETE CASCADE,
  access_type VARCHAR(50) NOT NULL, -- search, retrieve, update, associate
  query_embedding vector(1536),
  query_context JSONB,
  result_score DECIMAL(5,4), -- Similarity score
  access_time TIMESTAMP DEFAULT NOW(),
  session_id UUID
);

-- Access pattern indexes
CREATE INDEX IF NOT EXISTS memory_access_patterns_agent_idx ON memory_access_patterns(agent_id);
CREATE INDEX IF NOT EXISTS memory_access_patterns_memory_idx ON memory_access_patterns(memory_id);
CREATE INDEX IF NOT EXISTS memory_access_patterns_time_idx ON memory_access_patterns(access_time DESC);
CREATE INDEX IF NOT EXISTS memory_access_patterns_session_idx ON memory_access_patterns(session_id);

-- Summarization job indexes
CREATE INDEX IF NOT EXISTS memory_summarization_jobs_agent_idx ON memory_summarization_jobs(agent_id);
CREATE INDEX IF NOT EXISTS memory_summarization_jobs_status_idx ON memory_summarization_jobs(status, scheduled_at);
CREATE INDEX IF NOT EXISTS memory_summarization_jobs_memory_idx ON memory_summarization_jobs(memory_id);

-- Archival job indexes
CREATE INDEX IF NOT EXISTS memory_archival_jobs_agent_idx ON memory_archival_jobs(agent_id);
CREATE INDEX IF NOT EXISTS memory_archival_jobs_status_idx ON memory_archival_jobs(status, scheduled_at);

-- Add RLS policies for agent memories (if needed)
ALTER TABLE agent_memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE memory_associations ENABLE ROW LEVEL SECURITY;
ALTER TABLE memory_summarization_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE memory_archival_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE memory_context_windows ENABLE ROW LEVEL SECURITY;
ALTER TABLE memory_access_patterns ENABLE ROW LEVEL SECURITY;

-- Comments for documentation
COMMENT ON TABLE agent_memories IS 'Core storage for agent memories with vector embeddings';
COMMENT ON TABLE memory_associations IS 'Relationships between memories';
COMMENT ON TABLE memory_summarization_jobs IS 'Background jobs for memory processing';
COMMENT ON TABLE memory_archival_jobs IS 'Background jobs for memory lifecycle management';
COMMENT ON TABLE memory_context_windows IS 'Pre-computed context for efficient retrieval';
COMMENT ON TABLE memory_access_patterns IS 'Analytics for memory access optimization';

COMMENT ON COLUMN agent_memories.embedding IS 'Vector embedding for semantic search (1536 dimensions for OpenAI)';
COMMENT ON COLUMN agent_memories.importance_score IS 'ML-calculated importance for retention decisions';
COMMENT ON COLUMN agent_memories.memory_type IS 'Type of memory: episodic, semantic, procedural, working';
COMMENT ON COLUMN agent_memories.context_window IS 'Related context information for retrieval';
COMMENT ON COLUMN memory_associations.strength IS 'Strength of association between memories';
COMMENT ON COLUMN memory_access_patterns.query_embedding IS 'Embedding of the query for pattern analysis';
