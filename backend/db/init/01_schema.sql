CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE user_role AS ENUM ('user', 'admin', 'enterprise_admin', 'super_admin');
CREATE TYPE user_status AS ENUM ('active', 'suspended', 'deleted', 'pending');
CREATE TYPE plan_type AS ENUM ('free', 'starter', 'professional', 'enterprise', 'custom');
CREATE TYPE org_status AS ENUM ('active', 'suspended', 'trial', 'cancelled');
CREATE TYPE subscription_status AS ENUM ('active', 'past_due', 'cancelled', 'trial', 'paused');
CREATE TYPE payment_method AS ENUM ('credit_card', 'debit_card', 'paypal', 'bank_transfer', 'wire', 'crypto');
CREATE TYPE invoice_status AS ENUM ('draft', 'pending', 'paid', 'overdue', 'cancelled', 'refunded');
CREATE TYPE compliance_type AS ENUM ('gdpr', 'hipaa', 'soc2', 'iso27001', 'pci_dss', 'ccpa');
CREATE TYPE data_retention_status AS ENUM ('active', 'archived', 'scheduled_deletion', 'deleted');
CREATE TYPE integration_status AS ENUM ('active', 'inactive', 'error', 'pending');
CREATE TYPE notification_type AS ENUM ('email', 'sms', 'push', 'in_app', 'webhook');
CREATE TYPE priority AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE severity AS ENUM ('info', 'warning', 'error', 'critical');

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone_number VARCHAR(50),
  avatar TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  email_verification_token TEXT,
  email_verification_expires TIMESTAMP,
  password_reset_token TEXT,
  password_reset_expires TIMESTAMP,
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  two_factor_secret TEXT,
  two_factor_recovery_codes JSONB DEFAULT '[]',
  role user_role DEFAULT 'user',
  status user_status DEFAULT 'active',
  organization_id UUID,
  last_login_at TIMESTAMP,
  last_login_ip VARCHAR(50),
  failed_login_attempts INTEGER DEFAULT 0,
  account_locked_until TIMESTAMP,
  preferences JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX email_idx ON users(email);
CREATE INDEX org_idx ON users(organization_id);

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  owner_id UUID NOT NULL REFERENCES users(id),
  logo TEXT,
  plan plan_type DEFAULT 'free',
  status org_status DEFAULT 'trial',
  max_users INTEGER DEFAULT 5,
  max_storage INTEGER DEFAULT 5120,
  trial_ends_at TIMESTAMP,
  billing_email VARCHAR(255) NOT NULL,
  settings JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX slug_idx ON organizations(slug);

CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  refresh_token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  refresh_expires_at TIMESTAMP NOT NULL,
  ip_address VARCHAR(50),
  user_agent TEXT,
  device_id VARCHAR(255),
  last_activity_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX user_session_idx ON sessions(user_id);

CREATE TABLE platform_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  metadata JSONB DEFAULT '{}',
  last_sync_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(organization_id, platform)
);

CREATE INDEX platform_connections_org_idx ON platform_connections(organization_id);

CREATE TABLE platform_sync_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  connection_id UUID REFERENCES platform_connections(id) ON DELETE CASCADE,
  job_type VARCHAR(50) NOT NULL,
  status VARCHAR(30) DEFAULT 'queued',
  payload JSONB DEFAULT '{}',
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 5,
  next_run_at TIMESTAMP DEFAULT NOW(),
  last_error TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX platform_sync_jobs_org_platform_status_next_run_idx ON platform_sync_jobs(organization_id, platform, status, next_run_at);
CREATE INDEX platform_sync_jobs_org_created_idx ON platform_sync_jobs(organization_id, created_at);

CREATE TABLE platform_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  event_id VARCHAR(255) NOT NULL,
  payload JSONB DEFAULT '{}',
  status VARCHAR(30) DEFAULT 'received',
  received_at TIMESTAMP DEFAULT NOW(),
  processed_at TIMESTAMP,
  UNIQUE(organization_id, platform, event_id)
);

CREATE INDEX platform_webhook_events_org_received_idx ON platform_webhook_events(organization_id, received_at);

CREATE TABLE platform_failed_operations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  operation_type VARCHAR(80) NOT NULL,
  payload JSONB DEFAULT '{}',
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 5,
  next_retry_at TIMESTAMP DEFAULT NOW(),
  last_error TEXT,
  status VARCHAR(30) DEFAULT 'failed',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX platform_failed_ops_org_platform_next_retry_idx ON platform_failed_operations(organization_id, platform, next_retry_at);

CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  participant_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  external_id VARCHAR(255),
  platform VARCHAR(50),
  status VARCHAR(50) DEFAULT 'active',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX conv_org_idx ON conversations(organization_id);
CREATE INDEX conv_user_idx ON conversations(participant_id);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  message_type VARCHAR(50) DEFAULT 'text',
  status VARCHAR(50) DEFAULT 'sent',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX msg_conv_idx ON messages(conversation_id);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(255) NOT NULL,
  resource_type VARCHAR(100),
  resource_id VARCHAR(255),
  changes JSONB,
  ip_address VARCHAR(50),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX audit_org_idx ON audit_logs(organization_id);
CREATE INDEX audit_user_idx ON audit_logs(user_id);

CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL UNIQUE REFERENCES organizations(id) ON DELETE CASCADE,
  data JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  key_hash TEXT NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  last_used_at TIMESTAMP,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX api_key_org_idx ON api_keys(organization_id);

CREATE TABLE webhooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  events TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX webhook_org_idx ON webhooks(organization_id);

CREATE TABLE integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  config JSONB DEFAULT '{}',
  status integration_status DEFAULT 'pending',
  last_error TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX integration_org_idx ON integrations(organization_id);

CREATE TABLE ai_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL,
  model VARCHAR(100),
  status VARCHAR(50) DEFAULT 'draft',
  config JSONB DEFAULT '{}',
  system_prompt TEXT,
  capabilities JSONB DEFAULT '[]',
  success_rate INTEGER DEFAULT 0,
  total_calls INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX ai_agents_org_id_idx ON ai_agents(organization_id);
CREATE INDEX ai_agents_type_idx ON ai_agents(type);
CREATE INDEX ai_agents_status_idx ON ai_agents(status);

CREATE TABLE ai_agent_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES ai_agents(id) ON DELETE SET NULL,
  agent_type VARCHAR(80),
  agent_name VARCHAR(255),
  event_type VARCHAR(80) NOT NULL,
  status VARCHAR(30) DEFAULT 'success',
  action TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX ai_agent_events_org_id_idx ON ai_agent_events(organization_id);
CREATE INDEX ai_agent_events_agent_id_idx ON ai_agent_events(agent_id);
CREATE INDEX ai_agent_events_agent_type_idx ON ai_agent_events(agent_type);
CREATE INDEX ai_agent_events_created_at_idx ON ai_agent_events(created_at);
CREATE INDEX ai_agent_events_event_type_idx ON ai_agent_events(event_type);

CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  call_id UUID,
  agent_id UUID REFERENCES ai_agents(id) ON DELETE SET NULL,
  type VARCHAR(50),
  participants JSONB DEFAULT '[]',
  messages JSONB DEFAULT '[]',
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX ai_conversations_org_idx ON ai_conversations(organization_id);
CREATE INDEX ai_conversations_call_idx ON ai_conversations(call_id);
CREATE INDEX ai_conversations_agent_idx ON ai_conversations(agent_id);

CREATE TABLE realtime_events (
  seq SERIAL PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  channel VARCHAR(100) NOT NULL,
  type VARCHAR(100) NOT NULL,
  payload JSONB DEFAULT '{}',
  timestamp INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX realtime_events_org_seq_idx ON realtime_events(organization_id, seq);
CREATE INDEX realtime_events_channel_seq_idx ON realtime_events(channel, seq);
CREATE INDEX realtime_events_created_at_idx ON realtime_events(created_at);

CREATE TABLE realtime_client_state (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  last_ack_seq INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);

CREATE INDEX realtime_client_state_org_idx ON realtime_client_state(organization_id);
CREATE INDEX realtime_client_state_user_idx ON realtime_client_state(user_id);

CREATE TABLE realtime_presence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  is_online BOOLEAN DEFAULT FALSE,
  last_seen_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);

CREATE INDEX realtime_presence_org_idx ON realtime_presence(organization_id);
CREATE INDEX realtime_presence_user_idx ON realtime_presence(user_id);
