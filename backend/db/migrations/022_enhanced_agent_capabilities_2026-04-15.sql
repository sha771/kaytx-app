-- Migration: Enhanced AI Agent Capabilities (video-prompts.md)
-- Date: 2026-04-15
-- Description: Add support for A2A/D2D communication, self-improvement, self-learning, 
--              sensory capabilities, insights, task history, unlimited memory, and summary/notes

-- Add new columns to ai_agents table
ALTER TABLE ai_agents 
ADD COLUMN IF NOT EXISTS sensory_capabilities JSONB DEFAULT '{"vision": false, "hearing": false, "senses": []}' NOT NULL;

ALTER TABLE ai_agents 
ADD COLUMN IF NOT EXISTS memory_config JSONB DEFAULT '{"shortTerm": true, "mediumTerm": true, "longTerm": true, "infinite": false, "maxStorage": "unlimited"}' NOT NULL;

ALTER TABLE ai_agents 
ADD COLUMN IF NOT EXISTS self_learning_enabled BOOLEAN DEFAULT false NOT NULL;

ALTER TABLE ai_agents 
ADD COLUMN IF NOT EXISTS self_improvement_enabled BOOLEAN DEFAULT false NOT NULL;

ALTER TABLE ai_agents 
ADD COLUMN IF NOT EXISTS insights_config JSONB DEFAULT '{"enabled": true, "predictive": false, "confidenceThreshold": 0.8}' NOT NULL;

ALTER TABLE ai_agents 
ADD COLUMN IF NOT EXISTS summary_config JSONB DEFAULT '{"autoGenerate": true, "format": "bullet", "frequency": "session"}' NOT NULL;

ALTER TABLE ai_agents 
ADD COLUMN IF NOT EXISTS a2a_endpoints JSONB DEFAULT '[]' NOT NULL;

ALTER TABLE ai_agents 
ADD COLUMN IF NOT EXISTS d2d_endpoints JSONB DEFAULT '[]' NOT NULL;

ALTER TABLE ai_agents 
ADD COLUMN IF NOT EXISTS learning_metrics JSONB DEFAULT '{}' NOT NULL;

ALTER TABLE ai_agents 
ADD COLUMN IF NOT EXISTS improvement_goals JSONB DEFAULT '[]' NOT NULL;

-- Create task_history table for comprehensive task tracking
CREATE TABLE IF NOT EXISTS task_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES ai_agents(id) ON DELETE SET NULL,
  task_type VARCHAR(100) NOT NULL,
  task_name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  priority VARCHAR(20) DEFAULT 'medium',
  input_data JSONB DEFAULT '{}',
  output_data JSONB DEFAULT '{}',
  decisions_made JSONB DEFAULT '[]',
  outcome VARCHAR(50),
  effectiveness_score DECIMAL(3,2),
  duration_ms INTEGER,
  started_at TIMESTAMP NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMP,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create indexes for task_history
CREATE INDEX IF NOT EXISTS task_history_org_idx ON task_history(organization_id);
CREATE INDEX IF NOT EXISTS task_history_agent_idx ON task_history(agent_id);
CREATE INDEX IF NOT EXISTS task_history_status_idx ON task_history(status);
CREATE INDEX IF NOT EXISTS task_history_type_idx ON task_history(task_type);
CREATE INDEX IF NOT EXISTS task_history_started_idx ON task_history(started_at);

-- Create agent_memories table for unlimited memory system
CREATE TABLE IF NOT EXISTS agent_memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES ai_agents(id) ON DELETE SET NULL,
  memory_type VARCHAR(50) NOT NULL, -- short_term, medium_term, long_term, infinite
  category VARCHAR(100),
  title VARCHAR(255),
  content TEXT NOT NULL,
  context JSONB DEFAULT '{}',
  associations UUID[] DEFAULT '{}',
  importance_score DECIMAL(3,2) DEFAULT 0.5,
  access_count INTEGER DEFAULT 0,
  last_accessed_at TIMESTAMP,
  is_compressed BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create indexes for agent_memories
CREATE INDEX IF NOT EXISTS agent_memories_org_idx ON agent_memories(organization_id);
CREATE INDEX IF NOT EXISTS agent_memories_agent_idx ON agent_memories(agent_id);
CREATE INDEX IF NOT EXISTS agent_memories_type_idx ON agent_memories(memory_type);
CREATE INDEX IF NOT EXISTS agent_memories_category_idx ON agent_memories(category);
CREATE INDEX IF NOT EXISTS agent_memories_importance_idx ON agent_memories(importance_score);

-- Create insights table for storing generated insights
CREATE TABLE IF NOT EXISTS agent_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES ai_agents(id) ON DELETE SET NULL,
  insight_type VARCHAR(100) NOT NULL, -- descriptive, diagnostic, predictive, prescriptive
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  confidence_score DECIMAL(3,2),
  supporting_data JSONB DEFAULT '{}',
  recommendations JSONB DEFAULT '[]',
  priority VARCHAR(20) DEFAULT 'medium',
  status VARCHAR(50) DEFAULT 'active',
  related_insights UUID[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMP
);

-- Create indexes for agent_insights
CREATE INDEX IF NOT EXISTS agent_insights_org_idx ON agent_insights(organization_id);
CREATE INDEX IF NOT EXISTS agent_insights_agent_idx ON agent_insights(agent_id);
CREATE INDEX IF NOT EXISTS agent_insights_type_idx ON agent_insights(insight_type);
CREATE INDEX IF NOT EXISTS agent_insights_priority_idx ON agent_insights(priority);
CREATE INDEX IF NOT EXISTS agent_insights_status_idx ON agent_insights(status);

-- Create summaries table for generated summaries and notes
CREATE TABLE IF NOT EXISTS agent_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES ai_agents(id) ON DELETE SET NULL,
  summary_type VARCHAR(50) NOT NULL, -- conversation, task, meeting, session, daily, weekly, monthly
  title VARCHAR(255),
  content TEXT NOT NULL,
  format VARCHAR(20) DEFAULT 'bullet', -- narrative, bullet, structured
  source_ids UUID[] DEFAULT '{}',
  key_points JSONB DEFAULT '[]',
  action_items JSONB DEFAULT '[]',
  decisions JSONB DEFAULT '[]',
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create indexes for agent_summaries
CREATE INDEX IF NOT EXISTS agent_summaries_org_idx ON agent_summaries(organization_id);
CREATE INDEX IF NOT EXISTS agent_summaries_agent_idx ON agent_summaries(agent_id);
CREATE INDEX IF NOT EXISTS agent_summaries_type_idx ON agent_summaries(summary_type);
CREATE INDEX IF NOT EXISTS agent_summaries_created_idx ON agent_summaries(created_at);

-- Create agent_communications table for A2A and D2D communication tracking
CREATE TABLE IF NOT EXISTS agent_communications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES ai_agents(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES ai_agents(id) ON DELETE SET NULL,
  communication_type VARCHAR(50) NOT NULL, -- a2a, d2d
  message_type VARCHAR(100) NOT NULL, -- consultation, delegation, escalation, insight_sharing, mentoring
  priority VARCHAR(20) DEFAULT 'medium',
  subject VARCHAR(255),
  content TEXT NOT NULL,
  context JSONB DEFAULT '{}',
  attachments JSONB DEFAULT '[]',
  status VARCHAR(50) DEFAULT 'sent', -- sent, delivered, read, acknowledged, responded
  response_id UUID REFERENCES agent_communications(id),
  acknowledged_at TIMESTAMP,
  responded_at TIMESTAMP,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create indexes for agent_communications
CREATE INDEX IF NOT EXISTS agent_communications_org_idx ON agent_communications(organization_id);
CREATE INDEX IF NOT EXISTS agent_communications_sender_idx ON agent_communications(sender_id);
CREATE INDEX IF NOT EXISTS agent_communications_recipient_idx ON agent_communications(recipient_id);
CREATE INDEX IF NOT EXISTS agent_communications_type_idx ON agent_communications(communication_type);
CREATE INDEX IF NOT EXISTS agent_communications_status_idx ON agent_communications(status);
CREATE INDEX IF NOT EXISTS agent_communications_created_idx ON agent_communications(created_at);

-- Create agent_learning_log table for tracking self-learning activities
CREATE TABLE IF NOT EXISTS agent_learning_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES ai_agents(id) ON DELETE SET NULL,
  learning_type VARCHAR(100) NOT NULL, -- reinforcement, supervised, unsupervised, transfer, collaborative, experience
  lesson_title VARCHAR(255),
  lesson_content TEXT NOT NULL,
  source VARCHAR(100), -- interaction, feedback, data, peer_agent, self_reflection
  confidence_score DECIMAL(3,2),
  applied_to_task UUID,
  validated BOOLEAN DEFAULT false,
  validation_method VARCHAR(100),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create indexes for agent_learning_log
CREATE INDEX IF NOT EXISTS agent_learning_log_org_idx ON agent_learning_log(organization_id);
CREATE INDEX IF NOT EXISTS agent_learning_log_agent_idx ON agent_learning_log(agent_id);
CREATE INDEX IF NOT EXISTS agent_learning_log_type_idx ON agent_learning_log(learning_type);
CREATE INDEX IF NOT EXISTS agent_learning_log_created_idx ON agent_learning_log(created_at);

COMMENT ON MIGRATION IS 'Enhanced AI Agent Capabilities - video-prompts.md implementation';
