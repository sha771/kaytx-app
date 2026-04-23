-- Add platform data storage tables
-- Generated: 2026-02-01

CREATE TABLE IF NOT EXISTS platform_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  platform_id VARCHAR(255) NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(organization_id, platform, platform_id)
);

CREATE INDEX IF NOT EXISTS platform_contacts_org_platform_idx 
  ON platform_contacts(organization_id, platform);
CREATE INDEX IF NOT EXISTS platform_contacts_email_idx 
  ON platform_contacts USING GIN ((data->>'email'));

CREATE TABLE IF NOT EXISTS platform_opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  platform_id VARCHAR(255) NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(organization_id, platform, platform_id)
);

CREATE INDEX IF NOT EXISTS platform_opportunities_org_platform_idx 
  ON platform_opportunities(organization_id, platform);

CREATE TABLE IF NOT EXISTS platform_deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  platform_id VARCHAR(255) NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(organization_id, platform, platform_id)
);

CREATE INDEX IF NOT EXISTS platform_deals_org_platform_idx 
  ON platform_deals(organization_id, platform);

CREATE TABLE IF NOT EXISTS platform_channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  platform_id VARCHAR(255) NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(organization_id, platform, platform_id)
);

CREATE INDEX IF NOT EXISTS platform_channels_org_platform_idx 
  ON platform_channels(organization_id, platform);

CREATE TABLE IF NOT EXISTS platform_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  platform_id VARCHAR(255) NOT NULL,
  channel_id VARCHAR(255),
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(organization_id, platform, platform_id)
);

CREATE INDEX IF NOT EXISTS platform_messages_org_platform_idx 
  ON platform_messages(organization_id, platform);
CREATE INDEX IF NOT EXISTS platform_messages_channel_idx 
  ON platform_messages(organization_id, platform, channel_id);
