-- Migration: Company Brain Knowledge Graph & Memory System
-- Date: 2026-07-16
-- Description: Create tables for knowledge graph, memory system, AI reasoning, 
--              context engine, intelligence layer, and company understanding

-- Enable pgvector extension for embedding similarity search
CREATE EXTENSION IF NOT EXISTS vector;

-- ==================== KNOWLEDGE GRAPH TABLES ====================

-- Knowledge Nodes - Main knowledge entity in the graph
CREATE TABLE IF NOT EXISTS knowledge_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  type VARCHAR(100) NOT NULL,
  label VARCHAR(500) NOT NULL,
  content TEXT,
  summary TEXT,
  source_type VARCHAR(100),
  source_id TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  confidence_score DECIMAL(3,2) DEFAULT 0.50,
  importance_score DECIMAL(3,2) DEFAULT 0.50,
  embedding_vector vector(1536),
  tags JSONB DEFAULT '[]' NOT NULL,
  properties JSONB DEFAULT '{}' NOT NULL,
  metadata JSONB DEFAULT '{}' NOT NULL,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  department_id VARCHAR(100),
  project_ids JSONB DEFAULT '[]' NOT NULL,
  access_count INTEGER DEFAULT 0 NOT NULL,
  last_accessed_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS knowledge_nodes_org_idx ON knowledge_nodes(organization_id);
CREATE INDEX IF NOT EXISTS knowledge_nodes_type_idx ON knowledge_nodes(type);
CREATE INDEX IF NOT EXISTS knowledge_nodes_status_idx ON knowledge_nodes(status);
CREATE INDEX IF NOT EXISTS knowledge_nodes_created_by_idx ON knowledge_nodes(created_by);
CREATE INDEX IF NOT EXISTS knowledge_nodes_created_at_idx ON knowledge_nodes(created_at);
CREATE INDEX IF NOT EXISTS knowledge_nodes_embedding_idx ON knowledge_nodes USING ivfflat (embedding_vector vector_cosine_ops);

-- Knowledge Relationships - Graph edges
CREATE TABLE IF NOT EXISTS knowledge_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  source_node_id UUID NOT NULL REFERENCES knowledge_nodes(id) ON DELETE CASCADE,
  target_node_id UUID NOT NULL REFERENCES knowledge_nodes(id) ON DELETE CASCADE,
  type VARCHAR(100) NOT NULL,
  weight DECIMAL(3,2) DEFAULT 1.0 NOT NULL,
  properties JSONB DEFAULT '{}' NOT NULL,
  metadata JSONB DEFAULT '{}' NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS knowledge_relationships_org_idx ON knowledge_relationships(organization_id);
CREATE INDEX IF NOT EXISTS knowledge_relationships_source_idx ON knowledge_relationships(source_node_id);
CREATE INDEX IF NOT EXISTS knowledge_relationships_target_idx ON knowledge_relationships(target_node_id);
CREATE INDEX IF NOT EXISTS knowledge_relationships_type_idx ON knowledge_relationships(type);
CREATE UNIQUE INDEX IF NOT EXISTS knowledge_relationships_st_idx ON knowledge_relationships(source_node_id, target_node_id, type);

-- Knowledge Persons
CREATE TABLE IF NOT EXISTS knowledge_persons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  node_id UUID REFERENCES knowledge_nodes(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  department VARCHAR(255),
  role VARCHAR(255),
  skills JSONB DEFAULT '[]' NOT NULL,
  expertise JSONB DEFAULT '[]' NOT NULL,
  metadata JSONB DEFAULT '{}' NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS knowledge_persons_org_idx ON knowledge_persons(organization_id);
CREATE INDEX IF NOT EXISTS knowledge_persons_user_idx ON knowledge_persons(user_id);
CREATE INDEX IF NOT EXISTS knowledge_persons_node_idx ON knowledge_persons(node_id);

-- Knowledge Projects
CREATE TABLE IF NOT EXISTS knowledge_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  node_id UUID REFERENCES knowledge_nodes(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'active',
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  metadata JSONB DEFAULT '{}' NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS knowledge_projects_org_idx ON knowledge_projects(organization_id);
CREATE INDEX IF NOT EXISTS knowledge_projects_node_idx ON knowledge_projects(node_id);

-- Knowledge Clients
CREATE TABLE IF NOT EXISTS knowledge_clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  node_id UUID REFERENCES knowledge_nodes(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  industry VARCHAR(255),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  metadata JSONB DEFAULT '{}' NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS knowledge_clients_org_idx ON knowledge_clients(organization_id);
CREATE INDEX IF NOT EXISTS knowledge_clients_node_idx ON knowledge_clients(node_id);

-- Knowledge Documents
CREATE TABLE IF NOT EXISTS knowledge_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  node_id UUID REFERENCES knowledge_nodes(id) ON DELETE SET NULL,
  file_name VARCHAR(500) NOT NULL,
  file_type VARCHAR(100) NOT NULL,
  file_size INTEGER,
  file_path TEXT,
  content TEXT,
  mime_type VARCHAR(100),
  processing_status VARCHAR(50) DEFAULT 'pending',
  chunk_count INTEGER DEFAULT 0 NOT NULL,
  metadata JSONB DEFAULT '{}' NOT NULL,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS knowledge_documents_org_idx ON knowledge_documents(organization_id);
CREATE INDEX IF NOT EXISTS knowledge_documents_node_idx ON knowledge_documents(node_id);
CREATE INDEX IF NOT EXISTS knowledge_documents_status_idx ON knowledge_documents(processing_status);

-- Knowledge Document Chunks
CREATE TABLE IF NOT EXISTS knowledge_document_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  document_id UUID NOT NULL REFERENCES knowledge_documents(id) ON DELETE CASCADE,
  chunk_index INTEGER NOT NULL,
  chunk_content TEXT NOT NULL,
  chunk_summary TEXT,
  embedding_vector vector(1536),
  token_count INTEGER,
  metadata JSONB DEFAULT '{}' NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS knowledge_doc_chunks_org_idx ON knowledge_document_chunks(organization_id);
CREATE INDEX IF NOT EXISTS knowledge_doc_chunks_doc_idx ON knowledge_document_chunks(document_id);
CREATE INDEX IF NOT EXISTS knowledge_doc_chunks_embedding_idx ON knowledge_document_chunks USING ivfflat (embedding_vector vector_cosine_ops);

-- ==================== MEMORY SYSTEM TABLES ====================

-- Memory Records - All memory types unified
CREATE TABLE IF NOT EXISTS memory_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  subtype VARCHAR(100),
  content TEXT NOT NULL,
  summary TEXT,
  importance DECIMAL(3,2) DEFAULT 0 NOT NULL,
  relevance_score DECIMAL(3,2) DEFAULT 0.50,
  embedding_vector vector(1536),
  context JSONB DEFAULT '{}' NOT NULL,
  tags JSONB DEFAULT '[]' NOT NULL,
  metadata JSONB DEFAULT '{}' NOT NULL,
  expires_at TIMESTAMP,
  accessed_at TIMESTAMP,
  access_count INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS memory_records_org_idx ON memory_records(organization_id);
CREATE INDEX IF NOT EXISTS memory_records_user_idx ON memory_records(user_id);
CREATE INDEX IF NOT EXISTS memory_records_type_idx ON memory_records(type);
CREATE INDEX IF NOT EXISTS memory_records_org_user_type_idx ON memory_records(organization_id, user_id, type);
CREATE INDEX IF NOT EXISTS memory_records_created_at_idx ON memory_records(created_at);
CREATE INDEX IF NOT EXISTS memory_records_embedding_idx ON memory_records USING ivfflat (embedding_vector vector_cosine_ops);

-- ==================== SEARCH & ANALYTICS TABLES ====================

-- Knowledge Search Queries
CREATE TABLE IF NOT EXISTS knowledge_search_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  query TEXT NOT NULL,
  query_type VARCHAR(50),
  result_count INTEGER DEFAULT 0 NOT NULL,
  click_count INTEGER DEFAULT 0 NOT NULL,
  successful BOOLEAN DEFAULT true NOT NULL,
  search_time INTEGER,
  filters JSONB DEFAULT '{}' NOT NULL,
  metadata JSONB DEFAULT '{}' NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS knowledge_search_queries_org_idx ON knowledge_search_queries(organization_id);
CREATE INDEX IF NOT EXISTS knowledge_search_queries_user_idx ON knowledge_search_queries(user_id);
CREATE INDEX IF NOT EXISTS knowledge_search_queries_query_idx ON knowledge_search_queries(query);
CREATE INDEX IF NOT EXISTS knowledge_search_queries_created_idx ON knowledge_search_queries(created_at);

-- Knowledge Contributions
CREATE TABLE IF NOT EXISTS knowledge_contributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  node_id UUID NOT NULL REFERENCES knowledge_nodes(id) ON DELETE CASCADE,
  contribution_type VARCHAR(50) NOT NULL,
  metadata JSONB DEFAULT '{}' NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS knowledge_contributions_org_idx ON knowledge_contributions(organization_id);
CREATE INDEX IF NOT EXISTS knowledge_contributions_user_idx ON knowledge_contributions(user_id);
CREATE INDEX IF NOT EXISTS knowledge_contributions_node_idx ON knowledge_contributions(node_id);

-- Knowledge Verifications
CREATE TABLE IF NOT EXISTS knowledge_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  node_id UUID NOT NULL REFERENCES knowledge_nodes(id) ON DELETE CASCADE,
  verified_by UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  status VARCHAR(50) NOT NULL,
  notes TEXT,
  metadata JSONB DEFAULT '{}' NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS knowledge_verifications_org_idx ON knowledge_verifications(organization_id);
CREATE INDEX IF NOT EXISTS knowledge_verifications_node_idx ON knowledge_verifications(node_id);
CREATE INDEX IF NOT EXISTS knowledge_verifications_verifier_idx ON knowledge_verifications(verified_by);

-- Knowledge Analytics
CREATE TABLE IF NOT EXISTS knowledge_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  metric_type VARCHAR(100) NOT NULL,
  metric_value DECIMAL(15,4) NOT NULL,
  period VARCHAR(50) NOT NULL,
  period_start TIMESTAMP NOT NULL,
  period_end TIMESTAMP NOT NULL,
  dimensions JSONB DEFAULT '{}' NOT NULL,
  metadata JSONB DEFAULT '{}' NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS knowledge_analytics_org_idx ON knowledge_analytics(organization_id);
CREATE INDEX IF NOT EXISTS knowledge_analytics_metric_idx ON knowledge_analytics(metric_type);
CREATE INDEX IF NOT EXISTS knowledge_analytics_period_idx ON knowledge_analytics(period, period_start);

-- ==================== INGESTION & INTEGRATION TABLES ====================

-- Knowledge Integration Syncs
CREATE TABLE IF NOT EXISTS knowledge_integration_syncs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  integration_type VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL,
  items_processed INTEGER DEFAULT 0 NOT NULL,
  items_created INTEGER DEFAULT 0 NOT NULL,
  items_updated INTEGER DEFAULT 0 NOT NULL,
  errors INTEGER DEFAULT 0 NOT NULL,
  error_log JSONB DEFAULT '[]' NOT NULL,
  started_at TIMESTAMP NOT NULL,
  completed_at TIMESTAMP,
  metadata JSONB DEFAULT '{}' NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS knowledge_integration_syncs_org_idx ON knowledge_integration_syncs(organization_id);
CREATE INDEX IF NOT EXISTS knowledge_integration_syncs_type_idx ON knowledge_integration_syncs(integration_type);

-- Knowledge Onboarding Progress
CREATE TABLE IF NOT EXISTS knowledge_onboarding_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(255) NOT NULL,
  department VARCHAR(255),
  progress DECIMAL(5,2) DEFAULT 0 NOT NULL,
  modules_completed INTEGER DEFAULT 0 NOT NULL,
  total_modules INTEGER DEFAULT 0 NOT NULL,
  current_module VARCHAR(255),
  completed_modules JSONB DEFAULT '[]' NOT NULL,
  learning_path JSONB DEFAULT '[]' NOT NULL,
  days_onboarded INTEGER DEFAULT 0 NOT NULL,
  estimated_completion INTEGER DEFAULT 21 NOT NULL,
  started_at TIMESTAMP NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMP,
  metadata JSONB DEFAULT '{}' NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS knowledge_onboarding_org_idx ON knowledge_onboarding_progress(organization_id);
CREATE UNIQUE INDEX IF NOT EXISTS knowledge_onboarding_user_idx ON knowledge_onboarding_progress(organization_id, user_id);

-- ==================== INTELLIGENCE & INSIGHTS TABLES ====================

-- Knowledge Insights - Auto-discovered intelligence
CREATE TABLE IF NOT EXISTS knowledge_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  subtype VARCHAR(100),
  title VARCHAR(500) NOT NULL,
  description TEXT,
  confidence DECIMAL(3,2) DEFAULT 0.50,
  severity VARCHAR(20) DEFAULT 'info' NOT NULL,
  actionable BOOLEAN DEFAULT false NOT NULL,
  suggested_actions JSONB DEFAULT '[]' NOT NULL,
  related_node_ids JSONB DEFAULT '[]' NOT NULL,
  metadata JSONB DEFAULT '{}' NOT NULL,
  resolved_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS knowledge_insights_org_idx ON knowledge_insights(organization_id);
CREATE INDEX IF NOT EXISTS knowledge_insights_type_idx ON knowledge_insights(type);
CREATE INDEX IF NOT EXISTS knowledge_insights_severity_idx ON knowledge_insights(severity);
CREATE INDEX IF NOT EXISTS knowledge_insights_created_idx ON knowledge_insights(created_at);

-- ==================== COMPANY UNDERSTANDING TABLES ====================

-- Company Structure - Departments, teams, roles
CREATE TABLE IF NOT EXISTS company_structure (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  parent_id UUID,
  head_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}' NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS company_structure_org_idx ON company_structure(organization_id);
CREATE INDEX IF NOT EXISTS company_structure_type_idx ON company_structure(type);
CREATE INDEX IF NOT EXISTS company_structure_parent_idx ON company_structure(parent_id);

-- Company Products/Services
CREATE TABLE IF NOT EXISTS company_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(255),
  pricing JSONB DEFAULT '{}' NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  metadata JSONB DEFAULT '{}' NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS company_products_org_idx ON company_products(organization_id);
CREATE INDEX IF NOT EXISTS company_products_type_idx ON company_products(type);

-- Company Goals & KPIs
CREATE TABLE IF NOT EXISTS company_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  target_value VARCHAR(255),
  current_value VARCHAR(255),
  unit VARCHAR(50),
  deadline TIMESTAMP,
  status VARCHAR(50) DEFAULT 'active',
  progress DECIMAL(5,2) DEFAULT 0 NOT NULL,
  metadata JSONB DEFAULT '{}' NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS company_goals_org_idx ON company_goals(organization_id);
CREATE INDEX IF NOT EXISTS company_goals_type_idx ON company_goals(type);

-- ==================== AI REASONING LOGS ====================

CREATE TABLE IF NOT EXISTS ai_reasoning_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  reasoning_type VARCHAR(50) NOT NULL,
  input_data JSONB NOT NULL,
  output_data JSONB NOT NULL,
  model_used VARCHAR(100),
  tokens_used INTEGER,
  processing_time INTEGER,
  confidence DECIMAL(3,2),
  metadata JSONB DEFAULT '{}' NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ai_reasoning_logs_org_idx ON ai_reasoning_logs(organization_id);
CREATE INDEX IF NOT EXISTS ai_reasoning_logs_user_idx ON ai_reasoning_logs(user_id);
CREATE INDEX IF NOT EXISTS ai_reasoning_logs_type_idx ON ai_reasoning_logs(reasoning_type);
CREATE INDEX IF NOT EXISTS ai_reasoning_logs_created_idx ON ai_reasoning_logs(created_at);

-- ==================== CONTEXT ENGINE TABLES ====================

CREATE TABLE IF NOT EXISTS context_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_type VARCHAR(50) NOT NULL,
  context JSONB DEFAULT '{}' NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  expires_at TIMESTAMP,
  metadata JSONB DEFAULT '{}' NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS context_sessions_org_idx ON context_sessions(organization_id);
CREATE INDEX IF NOT EXISTS context_sessions_user_idx ON context_sessions(user_id);
CREATE INDEX IF NOT EXISTS context_sessions_type_idx ON context_sessions(session_type);
CREATE INDEX IF NOT EXISTS context_sessions_active_idx ON context_sessions(is_active);

COMMENT ON MIGRATION IS 'Company Brain Knowledge Graph & Memory System - knowledge graph, memory, reasoning, context, intelligence, company understanding';
