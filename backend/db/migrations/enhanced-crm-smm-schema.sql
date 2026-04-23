-- ============================================
-- Enhanced CRM & SMM Database Schema
-- Migration: Add tables for new features
-- ============================================

-- ============================================
-- CRM: Revenue Intelligence Tables
-- ============================================

CREATE TABLE IF NOT EXISTS crm_revenue_forecasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  mrr DECIMAL(15,2) NOT NULL DEFAULT 0,
  projected_growth_percent DECIMAL(5,2) NOT NULL DEFAULT 0,
  confidence_score INTEGER CHECK (confidence_score >= 0 AND confidence_score <= 100),
  optimistic_scenario DECIMAL(15,2),
  realistic_scenario DECIMAL(15,2),
  pessimistic_scenario DECIMAL(15,2),
  risk_factors JSONB DEFAULT '[]',
  calculated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_revenue_forecasts_org ON crm_revenue_forecasts(organization_id);
CREATE INDEX idx_revenue_forecasts_date ON crm_revenue_forecasts(calculated_at);

CREATE TABLE IF NOT EXISTS crm_cohorts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  cohort_id VARCHAR(50) NOT NULL, -- YYYY-MM format
  acquisition_month DATE NOT NULL,
  initial_customers INTEGER NOT NULL DEFAULT 0,
  retention_by_month JSONB DEFAULT '{}',
  revenue_by_month JSONB DEFAULT '{}',
  churn_rate DECIMAL(5,4) DEFAULT 0,
  lifetime_value DECIMAL(15,2) DEFAULT 0,
  avg_revenue_per_user DECIMAL(15,2) DEFAULT 0,
  segment VARCHAR(50),
  acquisition_channel VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(organization_id, cohort_id)
);

CREATE INDEX idx_cohorts_org ON crm_cohorts(organization_id);
CREATE INDEX idx_cohorts_date ON crm_cohorts(acquisition_month);

CREATE TABLE IF NOT EXISTS crm_attribution_touchpoints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  deal_id UUID NOT NULL REFERENCES crm_deals(id) ON DELETE CASCADE,
  channel VARCHAR(100) NOT NULL,
  touch_order INTEGER NOT NULL,
  attribution_weight DECIMAL(5,2) NOT NULL, -- percentage
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  revenue_attributed DECIMAL(15,2) DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_attribution_deal ON crm_attribution_touchpoints(deal_id);
CREATE INDEX idx_attribution_channel ON crm_attribution_touchpoints(channel);

CREATE TABLE IF NOT EXISTS crm_channel_roi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  channel VARCHAR(100) NOT NULL,
  spend DECIMAL(15,2) DEFAULT 0,
  revenue DECIMAL(15,2) DEFAULT 0,
  roi_percent DECIMAL(7,2) DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  cost_per_acquisition DECIMAL(10,2),
  cost_per_lead DECIMAL(10,2),
  pipeline_generated DECIMAL(15,2) DEFAULT 0,
  influence_rate DECIMAL(5,2) DEFAULT 0,
  calculated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(organization_id, channel, calculated_at)
);

-- ============================================
-- CRM: Advanced AI Insights Tables
-- ============================================

CREATE TABLE IF NOT EXISTS crm_intent_signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID NOT NULL REFERENCES crm_contacts(id) ON DELETE CASCADE,
  signal_type VARCHAR(50) NOT NULL, -- website_visit, content_download, pricing_view, etc.
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  source VARCHAR(100),
  score INTEGER CHECK (score >= 0 AND score <= 100),
  details JSONB DEFAULT '{}',
  decay_factor DECIMAL(4,3) DEFAULT 1.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_intent_signals_contact ON crm_intent_signals(contact_id);
CREATE INDEX idx_intent_signals_type ON crm_intent_signals(signal_type);
CREATE INDEX idx_intent_signals_date ON crm_intent_signals(timestamp);

CREATE TABLE IF NOT EXISTS crm_competitor_mentions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID REFERENCES crm_contacts(id) ON DELETE CASCADE,
  competitor VARCHAR(100) NOT NULL,
  context TEXT,
  sentiment VARCHAR(20) CHECK (sentiment IN ('positive', 'negative', 'neutral')),
  platform VARCHAR(50),
  urgency BOOLEAN DEFAULT FALSE,
  recommended_response TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_competitor_mentions_contact ON crm_competitor_mentions(contact_id);
CREATE INDEX idx_competitor_mentions_name ON crm_competitor_mentions(competitor);

-- ============================================
-- CRM: Organizational Chart Tables
-- ============================================

CREATE TABLE IF NOT EXISTS crm_org_chart_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES crm_accounts(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES crm_contacts(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL, -- decision_maker, influencer, blocker, champion, user, economic_buyer, technical_buyer
  influence_score INTEGER CHECK (influence_score >= 0 AND influence_score <= 100),
  relationship_strength INTEGER CHECK (relationship_strength >= 0 AND relationship_strength <= 100),
  reporting_to UUID REFERENCES crm_contacts(id),
  manages UUID[] DEFAULT '{}',
  cross_functional_teams JSONB DEFAULT '[]',
  role_in_decision VARCHAR(100),
  pain_points JSONB DEFAULT '[]',
  motivations JSONB DEFAULT '[]',
  objections JSONB DEFAULT '[]',
  last_contact_date TIMESTAMP WITH TIME ZONE,
  total_interactions INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_org_chart_account ON crm_org_chart_nodes(account_id);
CREATE INDEX idx_org_chart_contact ON crm_org_chart_nodes(contact_id);

CREATE TABLE IF NOT EXISTS crm_account_intelligence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES crm_accounts(id) ON DELETE CASCADE,
  relationship_health INTEGER CHECK (relationship_health >= 0 AND relationship_health <= 100),
  total_employees INTEGER,
  known_contacts INTEGER DEFAULT 0,
  active_users INTEGER DEFAULT 0,
  penetration_rate DECIMAL(5,4) DEFAULT 0,
  strategic_initiatives JSONB DEFAULT '[]',
  recent_funding JSONB,
  recent_leadership JSONB,
  recent_expansion JSONB,
  competitive_landscape JSONB,
  incumbent_vendor VARCHAR(100),
  competitors_in_evaluation JSONB DEFAULT '[]',
  contract_renewal_date DATE,
  switching_likelihood INTEGER CHECK (switching_likelihood >= 0 AND switching_likelihood <= 100),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(account_id)
);

CREATE TABLE IF NOT EXISTS crm_product_gaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES crm_accounts(id) ON DELETE CASCADE,
  product_category VARCHAR(100) NOT NULL,
  current_spend DECIMAL(15,2) DEFAULT 0,
  estimated_opportunity DECIMAL(15,2) DEFAULT 0,
  competitor VARCHAR(100),
  fit_score INTEGER CHECK (fit_score >= 0 AND fit_score <= 100),
  priority INTEGER CHECK (priority >= 0 AND priority <= 10),
  recommended_approach TEXT,
  status VARCHAR(50) DEFAULT 'open', -- open, in_progress, closed_won, closed_lost
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_product_gaps_account ON crm_product_gaps(account_id);

-- ============================================
-- CRM: Smart Sequences Tables
-- ============================================

CREATE TABLE IF NOT EXISTS crm_smart_sequences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  trigger_type VARCHAR(50) NOT NULL, -- lead_score_change, intent_detected, etc.
  conditions JSONB NOT NULL DEFAULT '[]',
  actions JSONB NOT NULL DEFAULT '[]',
  ai_optimization JSONB DEFAULT '{"bestSendTime": true, "contentPersonalization": true, "channelOptimization": true}',
  enrolled_count INTEGER DEFAULT 0,
  completed_count INTEGER DEFAULT 0,
  converted_count INTEGER DEFAULT 0,
  avg_time_to_convert INTEGER, -- hours
  revenue_generated DECIMAL(15,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_smart_sequences_org ON crm_smart_sequences(organization_id);
CREATE INDEX idx_smart_sequences_active ON crm_smart_sequences(is_active);

CREATE TABLE IF NOT EXISTS crm_sequence_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sequence_id UUID NOT NULL REFERENCES crm_smart_sequences(id) ON DELETE CASCADE,
  contact_id UUID NOT NULL REFERENCES crm_contacts(id) ON DELETE CASCADE,
  current_step INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active', -- active, paused, completed, converted, exited
  started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP WITH TIME ZONE,
  converted_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}',
  UNIQUE(sequence_id, contact_id)
);

CREATE INDEX idx_sequence_enrollments_seq ON crm_sequence_enrollments(sequence_id);
CREATE INDEX idx_sequence_enrollments_contact ON crm_sequence_enrollments(contact_id);

-- ============================================
-- CRM: Data Enrichment Tables
-- ============================================

CREATE TABLE IF NOT EXISTS crm_data_enrichment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID NOT NULL REFERENCES crm_contacts(id) ON DELETE CASCADE,
  provider VARCHAR(50) NOT NULL, -- clearbit, zoominfo, linkedin, etc.
  enriched_at TIMESTAMP WITH TIME ZONE NOT NULL,
  confidence INTEGER CHECK (confidence >= 0 AND confidence <= 100),
  fields JSONB NOT NULL DEFAULT '{}',
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_data_enrichment_contact ON crm_data_enrichment(contact_id);
CREATE INDEX idx_data_enrichment_provider ON crm_data_enrichment(provider);

CREATE TABLE IF NOT EXISTS crm_trigger_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID REFERENCES crm_contacts(id) ON DELETE CASCADE,
  account_id UUID REFERENCES crm_accounts(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL, -- funding, acquisition, leadership_change, etc.
  event_date DATE NOT NULL,
  description TEXT,
  source VARCHAR(100),
  relevance_score INTEGER CHECK (relevance_score >= 0 AND relevance_score <= 100),
  recommended_action TEXT,
  notified_at TIMESTAMP WITH TIME ZONE,
  is_actioned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_trigger_events_contact ON crm_trigger_events(contact_id);
CREATE INDEX idx_trigger_events_account ON crm_trigger_events(account_id);
CREATE INDEX idx_trigger_events_type ON crm_trigger_events(event_type);

-- ============================================
-- SMM: Social Commerce Tables
-- ============================================

CREATE TABLE IF NOT EXISTS smm_shoppable_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES smm_accounts(id) ON DELETE CASCADE,
  content_id UUID REFERENCES smm_content(id) ON DELETE SET NULL,
  checkout_flow VARCHAR(50) NOT NULL DEFAULT 'native', -- native, redirect, messenger, instagram_shop, tiktok_shop
  shop_id VARCHAR(100),
  collection_id VARCHAR(100),
  is_promoted BOOLEAN DEFAULT FALSE,
  promotion_budget DECIMAL(10,2),
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  add_to_carts INTEGER DEFAULT 0,
  checkouts INTEGER DEFAULT 0,
  purchases INTEGER DEFAULT 0,
  revenue DECIMAL(15,2) DEFAULT 0,
  units_sold INTEGER DEFAULT 0,
  roas DECIMAL(7,2) DEFAULT 0, -- return on ad spend
  conversion_rate DECIMAL(5,4) DEFAULT 0,
  avg_order_value DECIMAL(10,2) DEFAULT 0,
  abandoned_carts INTEGER DEFAULT 0,
  recovered_carts INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_shoppable_content_org ON smm_shoppable_content(organization_id);
CREATE INDEX idx_shoppable_content_account ON smm_shoppable_content(account_id);

CREATE TABLE IF NOT EXISTS smm_shoppable_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shoppable_content_id UUID NOT NULL REFERENCES smm_shoppable_content(id) ON DELETE CASCADE,
  product_id VARCHAR(100) NOT NULL,
  sku VARCHAR(100) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  compare_at_price DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'USD',
  images JSONB DEFAULT '[]',
  inventory INTEGER DEFAULT 0,
  inventory_policy VARCHAR(20) DEFAULT 'deny', -- deny, continue
  variants JSONB DEFAULT '[]',
  attributes JSONB DEFAULT '{}',
  views INTEGER DEFAULT 0,
  purchases INTEGER DEFAULT 0,
  product_revenue DECIMAL(15,2) DEFAULT 0,
  product_conversion_rate DECIMAL(5,4) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_shoppable_products_content ON smm_shoppable_products(shoppable_content_id);

-- ============================================
-- SMM: Social Customer Service Tables
-- ============================================

CREATE TABLE IF NOT EXISTS smm_social_support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  mention_id VARCHAR(100) NOT NULL,
  platform VARCHAR(50) NOT NULL,
  external_ticket_id VARCHAR(100),
  priority VARCHAR(20) NOT NULL DEFAULT 'medium', -- low, medium, high, urgent, critical
  status VARCHAR(50) NOT NULL DEFAULT 'new', -- new, assigned, investigating, resolved, closed, escalated
  category VARCHAR(100),
  sentiment VARCHAR(20),
  author_influence VARCHAR(20), -- low, medium, high, viral
  assigned_to UUID REFERENCES users(id),
  ai_agent_id VARCHAR(100),
  crm_contact_id UUID REFERENCES crm_contacts(id),
  resolution TEXT,
  satisfaction INTEGER CHECK (satisfaction >= 0 AND satisfaction <= 5),
  response_time INTEGER, -- minutes
  handle_time INTEGER, -- minutes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_social_tickets_org ON smm_social_support_tickets(organization_id);
CREATE INDEX idx_social_tickets_status ON smm_social_support_tickets(status);
CREATE INDEX idx_social_tickets_priority ON smm_social_support_tickets(priority);
CREATE INDEX idx_social_tickets_crm ON smm_social_support_tickets(crm_contact_id);

CREATE TABLE IF NOT EXISTS smm_support_ticket_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES smm_social_support_tickets(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(255),
  is_from_brand BOOLEAN DEFAULT FALSE,
  is_ai_generated BOOLEAN DEFAULT FALSE,
  sentiment VARCHAR(20),
  attachments JSONB DEFAULT '[]',
  internal_note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_support_messages_ticket ON smm_support_ticket_messages(ticket_id);

-- ============================================
-- SMM: Influencer Management Tables
-- ============================================

CREATE TABLE IF NOT EXISTS smm_influencers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  handle VARCHAR(100) NOT NULL,
  name VARCHAR(255),
  avatar_url TEXT,
  bio TEXT,
  location VARCHAR(100),
  followers INTEGER DEFAULT 0,
  following INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,2) DEFAULT 0,
  avg_likes INTEGER DEFAULT 0,
  avg_comments INTEGER DEFAULT 0,
  audience_quality INTEGER CHECK (audience_quality >= 0 AND audience_quality <= 100),
  audience_demographics JSONB DEFAULT '{}',
  influence_tier VARCHAR(20), -- nano, micro, mid, macro, mega
  category VARCHAR(100),
  niche JSONB DEFAULT '[]',
  content_quality INTEGER CHECK (content_quality >= 0 AND content_quality <= 100),
  posting_frequency DECIMAL(4,2) DEFAULT 0, -- posts per week
  brand_safety INTEGER CHECK (brand_safety >= 0 AND brand_safety <= 100),
  previous_controversies JSONB DEFAULT '[]',
  content_flags JSONB DEFAULT '[]',
  competitor_mentions JSONB DEFAULT '[]',
  relationship_status VARCHAR(50) DEFAULT 'prospect', -- prospect, outreach, negotiating, active, inactive, blacklisted
  relationship_strength INTEGER CHECK (relationship_strength >= 0 AND relationship_strength <= 100),
  first_contact_date TIMESTAMP WITH TIME ZONE,
  last_contact_date TIMESTAMP WITH TIME ZONE,
  assigned_manager UUID REFERENCES users(id),
  tags JSONB DEFAULT '[]',
  notes JSONB DEFAULT '[]',
  estimated_value_per_post DECIMAL(10,2) DEFAULT 0,
  estimated_value_per_story DECIMAL(10,2) DEFAULT 0,
  estimated_value_per_reel DECIMAL(10,2) DEFAULT 0,
  ai_insights JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(organization_id, platform, handle)
);

CREATE INDEX idx_influencers_org ON smm_influencers(organization_id);
CREATE INDEX idx_influencers_platform ON smm_influencers(platform);
CREATE INDEX idx_influencers_status ON smm_influencers(relationship_status);

CREATE TABLE IF NOT EXISTS smm_influencer_collaborations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  influencer_id UUID NOT NULL REFERENCES smm_influencers(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES smm_campaigns(id) ON DELETE SET NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'planning', -- planning, contract_sent, contract_signed, in_progress, completed, cancelled, disputed
  contract_value DECIMAL(15,2) DEFAULT 0,
  contract_terms TEXT,
  content_rights VARCHAR(20) DEFAULT 'usage', -- usage, ownership, limited
  exclusivity BOOLEAN DEFAULT FALSE,
  exclusivity_period INTEGER, -- days
  start_date DATE,
  end_date DATE,
  milestones JSONB DEFAULT '[]',
  performance_metrics JSONB DEFAULT '{}',
  content_approvals JSONB DEFAULT '[]',
  payment_schedule JSONB DEFAULT '{}',
  communications JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_collaborations_influencer ON smm_influencer_collaborations(influencer_id);
CREATE INDEX idx_collaborations_campaign ON smm_influencer_collaborations(campaign_id);
CREATE INDEX idx_collaborations_status ON smm_influencer_collaborations(status);

-- ============================================
-- SMM: Community Management Tables
-- ============================================

CREATE TABLE IF NOT EXISTS smm_community_health (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES smm_accounts(id) ON DELETE CASCADE,
  calculated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  active_members INTEGER DEFAULT 0,
  new_members INTEGER DEFAULT 0,
  churned_members INTEGER DEFAULT 0,
  content_velocity DECIMAL(5,2) DEFAULT 0, -- posts per day
  response_rate DECIMAL(5,2) DEFAULT 0,
  avg_response_time INTEGER, -- minutes
  sentiment_trend VARCHAR(20), -- improving, stable, declining
  sentiment_positive DECIMAL(5,4) DEFAULT 0,
  sentiment_negative DECIMAL(5,4) DEFAULT 0,
  sentiment_neutral DECIMAL(5,4) DEFAULT 0,
  overall_health INTEGER CHECK (overall_health >= 0 AND overall_health <= 100),
  engagement_health INTEGER CHECK (engagement_health >= 0 AND engagement_health <= 100),
  support_health INTEGER CHECK (support_health >= 0 AND support_health <= 100),
  growth_health INTEGER CHECK (growth_health >= 0 AND growth_health <= 100),
  advocate_count INTEGER DEFAULT 0,
  advocate_engagement INTEGER DEFAULT 0,
  user_generated_content INTEGER DEFAULT 0,
  referral_rate DECIMAL(5,4) DEFAULT 0,
  crisis_indicators JSONB DEFAULT '[]',
  negative_trends JSONB DEFAULT '[]',
  emerging_issues JSONB DEFAULT '[]',
  ai_recommendations JSONB DEFAULT '{}',
  UNIQUE(account_id, calculated_at)
);

CREATE INDEX idx_community_health_account ON smm_community_health(account_id);

CREATE TABLE IF NOT EXISTS smm_crisis_signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES smm_accounts(id) ON DELETE CASCADE,
  signal_type VARCHAR(50) NOT NULL, -- sentiment_spike, volume_spike, negative_viral, etc.
  severity VARCHAR(20) NOT NULL, -- low, medium, high, critical
  detected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  description TEXT,
  affected_channels JSONB DEFAULT '[]',
  mentions_affected INTEGER DEFAULT 0,
  estimated_reach INTEGER DEFAULT 0,
  recommended_response TEXT,
  auto_alert_sent BOOLEAN DEFAULT FALSE,
  handled_by UUID REFERENCES users(id),
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_crisis_signals_org ON smm_crisis_signals(organization_id);
CREATE INDEX idx_crisis_signals_account ON smm_crisis_signals(account_id);
CREATE INDEX idx_crisis_signals_severity ON smm_crisis_signals(severity);

-- ============================================
-- SMM: Social Listening 2.0 Tables
-- ============================================

CREATE TABLE IF NOT EXISTS smm_social_listening_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  query VARCHAR(255) NOT NULL,
  performed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  brand_mentions_count INTEGER DEFAULT 0,
  competitor_mentions_count INTEGER DEFAULT 0,
  industry_trends JSONB DEFAULT '[]',
  sentiment_positive DECIMAL(5,4) DEFAULT 0,
  sentiment_negative DECIMAL(5,4) DEFAULT 0,
  sentiment_neutral DECIMAL(5,4) DEFAULT 0,
  crisis_alerts JSONB DEFAULT '[]',
  opportunities JSONB DEFAULT '[]',
  influencer_signals JSONB DEFAULT '[]',
  leads_generated JSONB DEFAULT '[]',
  raw_data JSONB DEFAULT '{}'
);

CREATE INDEX idx_listening_results_org ON smm_social_listening_results(organization_id);
CREATE INDEX idx_listening_results_query ON smm_social_listening_results(query);
CREATE INDEX idx_listening_results_date ON smm_social_listening_results(performed_at);

CREATE TABLE IF NOT EXISTS smm_social_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  source VARCHAR(100),
  context TEXT,
  author_handle VARCHAR(100),
  author_name VARCHAR(255),
  author_followers INTEGER DEFAULT 0,
  author_company VARCHAR(100),
  author_title VARCHAR(100),
  intent VARCHAR(50), -- researching, comparing, ready_to_buy, asking_recommendation
  score INTEGER CHECK (score >= 0 AND score <= 100),
  crm_contact_created BOOLEAN DEFAULT FALSE,
  crm_contact_id UUID REFERENCES crm_contacts(id),
  assigned_to UUID REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'new', -- new, contacted, qualified, converted, lost
  discovered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  contacted_at TIMESTAMP WITH TIME ZONE,
  converted_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_social_leads_org ON smm_social_leads(organization_id);
CREATE INDEX idx_social_leads_status ON smm_social_leads(status);
CREATE INDEX idx_social_leads_crm ON smm_social_leads(crm_contact_id);

-- ============================================
-- Create updated_at triggers
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all tables with updated_at
CREATE TRIGGER update_crm_revenue_forecasts_updated_at BEFORE UPDATE ON crm_revenue_forecasts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crm_cohorts_updated_at BEFORE UPDATE ON crm_cohorts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crm_org_chart_nodes_updated_at BEFORE UPDATE ON crm_org_chart_nodes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crm_account_intelligence_updated_at BEFORE UPDATE ON crm_account_intelligence FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crm_product_gaps_updated_at BEFORE UPDATE ON crm_product_gaps FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crm_smart_sequences_updated_at BEFORE UPDATE ON crm_smart_sequences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crm_data_enrichment_updated_at BEFORE UPDATE ON crm_data_enrichment FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_smm_shoppable_content_updated_at BEFORE UPDATE ON smm_shoppable_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_smm_shoppable_products_updated_at BEFORE UPDATE ON smm_shoppable_products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_smm_social_support_tickets_updated_at BEFORE UPDATE ON smm_social_support_tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_smm_influencers_updated_at BEFORE UPDATE ON smm_influencers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_smm_influencer_collaborations_updated_at BEFORE UPDATE ON smm_influencer_collaborations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_smm_social_leads_updated_at BEFORE UPDATE ON smm_social_leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
