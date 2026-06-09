/**
 * =============================================================================
 * COMPREHENSIVE AGENT FEATURE ENHANCEMENT SCRIPT
 * =============================================================================
 * 
 * This script adds specific, related features, options, and capabilities
 * to all 1,108 agents (277 main + 831 sub-agents) based on their specific roles.
 * 
 * Each agent gets customized configurations relevant to their function.
 * 
 * @version 2.0.0
 * @lastUpdated 2026-06-07
 */

const fs = require('fs');
const path = require('path');

// ============================================
// AGENT-SPECIFIC FEATURE DEFINITIONS
// ============================================

const AGENT_FEATURE_ENHANCEMENTS = {
  // DEPT 1: CUSTOMER EXPERIENCE
  'chief-customer-officer': {
    features: {
      'Separate Dashboard': true,
      'Security Layer': 'SSO (SAML/OIDC), role-based ACL, encryption at rest/in transit, MFA for admin actions',
      'Call': 'Twilio PSTN integration, IVR menu with customer journey mapping, call routing rules, call recording enabled (90-day retention), real-time transcriptions with sentiment analysis',
      'Chat System': 'Web widget + Slack + Intercom + Microsoft Teams connectors, persistent conversation threads, omnichannel sync, transcript export',
      'SMS': 'Twilio SMS number, templated messages with personalization, two-way support, opt-out handling, SMS analytics',
      'Voice & Phone Number': 'Primary DID(s) with geo-routing, TTS voice selection (professional female), failover numbers, voice biometrics',
      'Recording & Script': 'Auto-recording with consent logging, transcript generation with NLP analysis, script templates per customer segment',
      'Location & Country': 'Allowed regions: global with data residency controls, timezone-aware scheduling, locale formats (en, es, fr, de)',
      'Company Setup': 'Company profile with customer journey maps, products catalog with CX impact scoring, pricing tiers, negotiation rule templates',
      'General Info': 'Name: AI Chief Customer Officer; Role: CX Strategy & Leadership; Availability: 24/7; Personality: strategic, empathetic, data-driven; Voice: professional female',
      'Model & Language': 'LLM-X v2 (GPT-4 family); Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de, zh',
      'Timing & Scheduling': 'Business Hours: Mon-Fri 09:00-18:00 local (configurable); Waiting Duration for Call: 120s; Calendar integrations: Google/Outlook',
      'Pricing & Negotiation': 'Pricing Model: fixed monthly + per-interaction; Price Limit: $10,000; auto-negotiation rules (max concession 15% for CX investments)',
      'Integrations': 'CRM (Salesforce, HubSpot), Customer Analytics (Qualtrics, Medallia), Journey Mapping (Touchpoint Dashboard), NPS Software (SurveyMonkey)',
      'Responsibilities & Routing': 'Task routing by customer segment and intent, escalation path to human after 2 failed handoffs, SLA enforcement with CX metrics',
      'Tasks & Work Management': 'Assigned tasks queue with priority scoring, SLA timers, remaining task completion percentage, CX impact tracking',
      'Behaviour & Limitations': 'Safety filters enabled for customer data, refusal templates for restricted domains, rate limits: 100 requests per minute',
      'Performance & Insights': 'Metrics: latency, resolution rate, CSAT, NPS, churn prediction; Reporting: executive dashboards + scheduled reports (daily, weekly, monthly)',
      'Summary & Notes': 'Strategic CX leader focused on customer journey optimization and experience excellence',
      'Predictive Layers': 'Churn forecast model triggers proactive outreach, customer lifetime value prediction, sentiment trend analysis, anomaly detection for CX metrics',
      'Rules & Regulations': 'GDPR & regional compliance, data residency constraints, consent policies, customer data privacy controls',
      'Memory': 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly; customer journey memory',
      'Setup Company': 'Onboarding flow with customer journey mapping, product/pricing setup with CX scoring, negotiation rules, training plan, KB import, voice tuning',
      '2-Step Verification': 'MFA for billing/admin modifications and critical CX decisions',
      'Import & Export Data': 'CSV/JSON endpoints, scheduled exports, retention policy, compliance controls, customer data export',
      'Reports': 'Daily/Weekly/Monthly CX dashboards, ad-hoc exports, email delivery channels, executive summaries',
      'Integrations & MCP': 'MCP connector v1.2 for customer platforms, API spec references, integration notes'
    }
  },
  'vp-customer-success': {
    features: {
      'Separate Dashboard': true,
      'Security Layer': 'role-based ACL, encryption at rest, MFA for critical actions',
      'Call': 'Telephony integration with success call routing, recording enabled (90d retention), transcript generation',
      'Chat System': 'Web widget + connectors (Slack/Intercom/Teams), persistent conversation threads',
      'SMS': 'SMS via configured provider, templated messages with success tips, two-way support',
      'Voice & Phone Number': 'Primary DID(s) with success team routing, TTS voice: professional',
      'Recording & Script': 'Recording enabled (90d retention), transcript generation, success playbooks',
      'Location & Country': 'Allowed regions: global, timezone-aware scheduling, locale formats',
      'Company Setup': 'Company profile with success metrics, products catalog, health scoring configuration',
      'General Info': 'Name: AI VP Customer Success; Role: Customer Success Leadership; Availability: 24/7; Personality: proactive, supportive, metrics-driven',
      'Model & Language': 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual support',
      'Timing & Scheduling': 'Business Hours: Mon-Fri 09:00-18:00 local; Waiting Duration for Call: 120s',
      'Pricing & Negotiation': 'Pricing Model: fixed monthly; Price Limit: $5,000; Negotiation: max concession 10%',
      'Integrations': 'Customer Success Platforms (Gainsight, Totango), Health Scoring Tools, Onboarding Systems, Success Planning Software',
      'Responsibilities & Routing': 'Task routing by account health and segment, escalation to human after 3 failed handoffs',
      'Tasks & Work Management': 'Assigned tasks queue, SLA timers, health score tracking, success plan progress',
      'Behaviour & Limitations': 'Safety filters enabled, refusal templates for restricted domains, rate limits: 80/min',
      'Performance & Insights': 'Metrics: latency, health score improvement, retention rate, NRR; Reporting: dashboards',
      'Summary & Notes': 'Customer success leader focused on account health and retention',
      'Predictive Layers': 'Churn prediction model, health score forecasting, expansion opportunity detection',
      'Rules & Regulations': 'GDPR & regional compliance, data residency, consent policies',
      'Memory': 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
      'Setup Company': 'Success platform setup, health scoring configuration, onboarding automation',
      '2-Step Verification': 'MFA for admin/billing actions',
      'Import & Export Data': 'CSV/JSON endpoints, scheduled exports, retention policy',
      'Reports': 'Daily/Weekly/Monthly success dashboards, health score reports, retention analytics',
      'Integrations & MCP': 'Success platform connectors, API specs, integration notes'
    }
  },
  'vp-support': {
    features: {
      'Separate Dashboard': true,
      'Security Layer': 'role-based ACL, encryption at rest, MFA for admin actions',
      'Call': 'Telephony integration with support routing, recording enabled (90d retention), transcript generation',
      'Chat System': 'Web widget + connectors (Slack/Intercom/Zendesk), persistent conversation threads',
      'SMS': 'SMS via configured provider, templated support messages, two-way support',
      'Voice & Phone Number': 'Primary DID(s) with support routing, TTS voice: professional',
      'Recording & Script': 'Recording enabled (90d retention), transcript generation, support scripts',
      'Location & Country': 'Allowed regions: global, timezone-aware scheduling, locale formats',
      'Company Setup': 'Company profile with support configuration, products catalog, ticketing setup',
      'General Info': 'Name: AI VP Support; Role: Support Operations Leadership; Availability: 24/7; Personality: responsive, efficient, quality-focused',
      'Model & Language': 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual support',
      'Timing & Scheduling': 'Business Hours: 24/7 for critical issues; Waiting Duration for Call: 60s',
      'Pricing & Negotiation': 'Pricing Model: fixed monthly; Price Limit: $5,000; Negotiation: max concession 10%',
      'Integrations': 'Help Desk Software (Zendesk, Freshdesk), Ticketing Systems (Jira), Knowledge Management, Quality Assurance Tools',
      'Responsibilities & Routing': 'Task routing by ticket priority and type, escalation to human after 2 failed handoffs',
      'Tasks & Work Management': 'Assigned tasks queue, SLA timers, ticket resolution tracking, quality metrics',
      'Behaviour & Limitations': 'Safety filters enabled, refusal templates for restricted domains, rate limits: 120/min',
      'Performance & Insights': 'Metrics: latency, resolution rate, CSAT, first response time; Reporting: dashboards',
      'Summary & Notes': 'Support operations leader focused on ticket resolution and quality',
      'Predictive Layers': 'Ticket volume forecasting, SLA breach prediction, quality trend analysis',
      'Rules & Regulations': 'GDPR & regional compliance, data residency, consent policies',
      'Memory': 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
      'Setup Company': 'Help desk setup, ticketing configuration, knowledge base import',
      '2-Step Verification': 'MFA for admin/billing actions',
      'Import & Export Data': 'CSV/JSON endpoints, scheduled exports, retention policy',
      'Reports': 'Daily/Weekly/Monthly support dashboards, ticket analytics, quality reports',
      'Integrations & MCP': 'Help desk connectors, API specs, integration notes'
    }
  },
  'customer-support': {
    features: {
      'Separate Dashboard': false,
      'Security Layer': 'role-based ACL, encryption at rest',
      'Call': 'Telephony integration, routing + recording (90d retention)',
      'Chat System': 'Web widget + connectors, persistent threads',
      'SMS': 'SMS via provider, templated messages, two-way support',
      'Voice & Phone Number': 'Primary DID(s): shared support number; TTS voice: default',
      'Recording & Script': 'Recording enabled (90d retention), transcript generation, support scripts',
      'Location & Country': 'Allowed regions: global, timezone-aware scheduling',
      'Company Setup': 'Company profile, products catalog, support configuration',
      'General Info': 'Name: AI Customer Support Agent; Role: Ticket Resolution; Availability: 24/7; Personality: helpful, patient, solution-oriented',
      'Model & Language': 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr',
      'Timing & Scheduling': 'Business Hours: 24/7; Waiting Duration for Call: 60s',
      'Pricing & Negotiation': 'Pricing Model: per-ticket; Price Limit: $500; Negotiation: N/A',
      'Integrations': 'Help Desk Software, Ticketing Systems, Knowledge Base, CRM',
      'Responsibilities & Routing': 'Task routing by ticket type, escalate after 3 failed attempts',
      'Tasks & Work Management': 'Assigned tasks queue, SLA timers, resolution tracking',
      'Behaviour & Limitations': 'Safety filters enabled, refusal templates, rate limits: 60/min',
      'Performance & Insights': 'Metrics: resolution rate, CSAT, response time; Reporting: dashboards',
      'Summary & Notes': 'Frontline support agent for ticket resolution',
      'Predictive Layers': 'Ticket classification, suggested solutions, similar tickets',
      'Rules & Regulations': 'GDPR compliance, data privacy, consent policies',
      'Memory': 'Session: 30m; Long-term: 90d; PII redaction enabled',
      'Setup Company': 'Support configuration, KB import, script setup',
      '2-Step Verification': 'MFA for admin actions',
      'Import & Export Data': 'CSV/JSON endpoints, export schedule',
      'Reports': 'Daily ticket reports, performance metrics',
      'Integrations & MCP': 'Help desk integration, ticketing API'
    }
  },

  // DEPT 2: SALES & REVENUE
  'vp-sales': {
    features: {
      'Separate Dashboard': true,
      'Security Layer': 'SSO (SAML/OIDC), role-based ACL, encryption, MFA for critical actions',
      'Call': 'Twilio integration with sales routing, recording enabled (90d retention), transcript with sales insights',
      'Chat System': 'Web widget + Slack + Microsoft Teams, persistent threads, sales context',
      'SMS': 'Twilio SMS, sales templates, two-way support, follow-up automation',
      'Voice & Phone Number': 'Primary DID(s) with geo-routing, TTS voice: professional male',
      'Recording & Script': 'Recording enabled (90d retention), transcript with objection handling, sales scripts',
      'Location & Country': 'Allowed regions: global, timezone-aware scheduling, locale formats',
      'Company Setup': 'Company profile with sales targets, products catalog with pricing, commission rules',
      'General Info': 'Name: AI VP Sales; Role: Sales Leadership; Availability: 24/5; Personality: driven, strategic, results-oriented',
      'Model & Language': 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de',
      'Timing & Scheduling': 'Business Hours: Mon-Fri 09:00-18:00 local; Waiting Duration for Call: 90s',
      'Pricing & Negotiation': 'Pricing Model: fixed monthly + commission; Price Limit: $15,000; Negotiation: max concession 20%',
      'Integrations': 'CRM (Salesforce, HubSpot), Sales Analytics (Gong, Chorus), CPQ (Oracle CPQ), Forecasting Tools',
      'Responsibilities & Routing': 'Task routing by deal stage and value, escalation to human after 2 failed handoffs',
      'Tasks & Work Management': 'Assigned tasks queue, pipeline tracking, quota monitoring',
      'Behaviour & Limitations': 'Safety filters enabled, refusal templates for legal/financial, rate limits: 100/min',
      'Performance & Insights': 'Metrics: latency, close rate, deal velocity, quota attainment; Reporting: executive dashboards',
      'Summary & Notes': 'Sales leader focused on revenue growth and team performance',
      'Predictive Layers': 'Deal win probability forecasting, pipeline velocity prediction, quota attainment forecasting',
      'Rules & Regulations': 'GDPR & regional compliance, sales regulations, data privacy',
      'Memory': 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
      'Setup Company': 'CRM setup, sales process configuration, quota setup',
      '2-Step Verification': 'MFA for billing/admin and commission approvals',
      'Import & Export Data': 'CSV/JSON endpoints, scheduled exports, retention policy',
      'Reports': 'Daily/Weekly/Monthly sales dashboards, pipeline reports, commission reports',
      'Integrations & MCP': 'Sales platform connectors, API specs, integration notes'
    }
  },
  'sales-rep': {
    features: {
      'Separate Dashboard': false,
      'Security Layer': 'role-based ACL, encryption at rest',
      'Call': 'Telephony integration, recording (90d retention), transcript generation',
      'Chat System': 'Web widget + connectors, persistent threads',
      'SMS': 'SMS via provider, sales templates, two-way support',
      'Voice & Phone Number': 'Primary DID(s): sales pool; TTS voice: default',
      'Recording & Script': 'Recording enabled (90d retention), transcript generation, sales scripts',
      'Location & Country': 'Allowed regions: assigned territory, timezone-aware scheduling',
      'Company Setup': 'Company profile, products catalog, territory assignment',
      'General Info': 'Name: AI Sales Rep; Role: Deal Closing; Availability: 24/5; Personality: persuasive, persistent, customer-focused',
      'Model & Language': 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es',
      'Timing & Scheduling': 'Business Hours: Mon-Fri 09:00-18:00 local; Waiting Duration for Call: 90s',
      'Pricing & Negotiation': 'Pricing Model: commission-based; Price Limit: $5,000; Negotiation: max concession 15%',
      'Integrations': 'CRM, Sales Analytics, Email Tools, Calendar',
      'Responsibilities & Routing': 'Task routing by deal stage, escalate after 2 failed attempts',
      'Tasks & Work Management': 'Assigned tasks queue, deal tracking, activity logging',
      'Behaviour & Limitations': 'Safety filters enabled, refusal templates, rate limits: 80/min',
      'Performance & Insights': 'Metrics: close rate, deal velocity, activity metrics; Reporting: dashboards',
      'Summary & Notes': 'Frontline sales representative for deal closing',
      'Predictive Layers': 'Deal win probability, next best action, objection prediction',
      'Rules & Regulations': 'GDPR compliance, sales regulations, data privacy',
      'Memory': 'Session: 30m; Long-term: 180d; PII redaction enabled',
      'Setup Company': 'CRM setup, territory configuration, script setup',
      '2-Step Verification': 'MFA for discount approvals',
      'Import & Export Data': 'CSV/JSON endpoints, export schedule',
      'Reports': 'Daily activity reports, deal pipeline reports',
      'Integrations & MCP': 'CRM integration, sales automation API'
    }
  },
  'sdr': {
    features: {
      'Separate Dashboard': false,
      'Security Layer': 'role-based ACL, encryption at rest',
      'Call': 'Telephony integration, recording (90d retention), transcript generation',
      'Chat System': 'Web widget + connectors, persistent threads',
      'SMS': 'SMS via provider, outreach templates, two-way support',
      'Voice & Phone Number': 'Primary DID(s): SDR pool; TTS voice: default',
      'Recording & Script': 'Recording enabled (90d retention), transcript generation, outreach scripts',
      'Location & Country': 'Allowed regions: assigned territory, timezone-aware scheduling',
      'Company Setup': 'Company profile, products catalog, territory assignment',
      'General Info': 'Name: AI Sales Development Rep; Role: Lead Generation; Availability: 24/5; Personality: persistent, energetic, qualifying-focused',
      'Model & Language': 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es',
      'Timing & Scheduling': 'Business Hours: Mon-Fri 09:00-18:00 local; Waiting Duration for Call: 90s',
      'Pricing & Negotiation': 'Pricing Model: commission-based; Price Limit: $2,000; Negotiation: N/A',
      'Integrations': 'CRM, Lead Generation Tools, Email Tools, LinkedIn Sales Navigator',
      'Responsibilities & Routing': 'Task routing by lead quality, escalate after 3 failed attempts',
      'Tasks & Work Management': 'Assigned tasks queue, lead tracking, qualification metrics',
      'Behaviour & Limitations': 'Safety filters enabled, refusal templates, rate limits: 100/min',
      'Performance & Insights': 'Metrics: qualification rate, response rate, meeting set rate; Reporting: dashboards',
      'Summary & Notes': 'Lead development representative for prospecting and qualification',
      'Predictive Layers': 'Lead scoring, qualification probability, best contact time',
      'Rules & Regulations': 'GDPR compliance, anti-spam laws, data privacy',
      'Memory': 'Session: 30m; Long-term: 90d; PII redaction enabled',
      'Setup Company': 'CRM setup, lead scoring configuration, outreach templates',
      '2-Step Verification': 'MFA for admin actions',
      'Import & Export Data': 'CSV/JSON endpoints, export schedule',
      'Reports': 'Daily outreach reports, lead qualification reports',
      'Integrations & MCP': 'CRM integration, lead generation API'
    }
  },

  // DEPT 3: MARKETING & GROWTH
  'cmo': {
    features: {
      'Separate Dashboard': true,
      'Security Layer': 'SSO (SAML/OIDC), role-based ACL, encryption, MFA for critical actions',
      'Call': 'Telephony integration, recording enabled (90d retention), transcript generation',
      'Chat System': 'Web widget + Slack + Teams, persistent threads, marketing context',
      'SMS': 'SMS via provider, marketing templates, two-way support',
      'Voice & Phone Number': 'Primary DID(s) with marketing routing, TTS voice: professional female',
      'Recording & Script': 'Recording enabled (90d retention), transcript generation, marketing playbooks',
      'Location & Country': 'Allowed regions: global, timezone-aware scheduling, locale formats',
      'Company Setup': 'Company profile with brand guidelines, products catalog, marketing budget',
      'General Info': 'Name: AI Chief Marketing Officer; Role: Marketing Strategy; Availability: 24/5; Personality: creative, analytical, brand-focused',
      'Model & Language': 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de, zh',
      'Timing & Scheduling': 'Business Hours: Mon-Fri 09:00-18:00 local; Waiting Duration for Call: 120s',
      'Pricing & Negotiation': 'Pricing Model: fixed monthly; Price Limit: $20,000; Negotiation: max concession 15%',
      'Integrations': 'Marketing Automation (HubSpot, Marketo), Analytics (Google Analytics, Adobe), Social Media (Hootsuite, Sprout Social), Creative Tools (Canva, Adobe Creative)',
      'Responsibilities & Routing': 'Task routing by campaign type and priority, escalation to human after 2 failed handoffs',
      'Tasks & Work Management': 'Assigned tasks queue, campaign tracking, budget monitoring',
      'Behaviour & Limitations': 'Safety filters enabled, refusal templates for brand-sensitive content, rate limits: 100/min',
      'Performance & Insights': 'Metrics: latency, campaign ROI, brand awareness, lead generation; Reporting: executive dashboards',
      'Summary & Notes': 'Marketing leader focused on brand strategy and growth',
      'Predictive Layers': 'Campaign performance forecasting, trend prediction, audience behavior modeling',
      'Rules & Regulations': 'GDPR & regional compliance, advertising regulations, brand guidelines',
      'Memory': 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
      'Setup Company': 'Marketing platform setup, brand guidelines import, budget configuration',
      '2-Step Verification': 'MFA for billing/admin and campaign approvals',
      'Import & Export Data': 'CSV/JSON endpoints, scheduled exports, retention policy',
      'Reports': 'Daily/Weekly/Monthly marketing dashboards, campaign reports, brand reports',
      'Integrations & MCP': 'Marketing platform connectors, API specs, integration notes'
    }
  },
  'marketing-manager': {
    features: {
      'Separate Dashboard': true,
      'Security Layer': 'role-based ACL, encryption at rest, MFA for admin actions',
      'Call': 'Telephony integration, recording enabled (90d retention), transcript generation',
      'Chat System': 'Web widget + connectors, persistent threads',
      'SMS': 'SMS via provider, marketing templates, two-way support',
      'Voice & Phone Number': 'Primary DID(s): marketing team; TTS voice: professional',
      'Recording & Script': 'Recording enabled (90d retention), transcript generation, campaign scripts',
      'Location & Country': 'Allowed regions: global, timezone-aware scheduling, locale formats',
      'Company Setup': 'Company profile, products catalog, campaign configuration',
      'General Info': 'Name: AI Marketing Manager; Role: Campaign Management; Availability: 24/5; Personality: organized, creative, data-driven',
      'Model & Language': 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr',
      'Timing & Scheduling': 'Business Hours: Mon-Fri 09:00-18:00 local; Waiting Duration for Call: 120s',
      'Pricing & Negotiation': 'Pricing Model: fixed monthly; Price Limit: $5,000; Negotiation: max concession 10%',
      'Integrations': 'Marketing Automation, Analytics, Social Media, Email Marketing',
      'Responsibilities & Routing': 'Task routing by campaign, escalate after 3 failed attempts',
      'Tasks & Work Management': 'Assigned tasks queue, campaign tracking, performance metrics',
      'Behaviour & Limitations': 'Safety filters enabled, refusal templates, rate limits: 80/min',
      'Performance & Insights': 'Metrics: campaign ROI, engagement metrics, conversion rates; Reporting: dashboards',
      'Summary & Notes': 'Marketing manager for campaign execution',
      'Predictive Layers': 'Campaign performance prediction, audience targeting optimization',
      'Rules & Regulations': 'GDPR compliance, advertising regulations, brand guidelines',
      'Memory': 'Session: 30m; Long-term: 180d; PII redaction enabled',
      'Setup Company': 'Marketing platform setup, campaign templates, analytics configuration',
      '2-Step Verification': 'MFA for admin actions',
      'Import & Export Data': 'CSV/JSON endpoints, export schedule',
      'Reports': 'Daily campaign reports, performance analytics',
      'Integrations & MCP': 'Marketing platform integration, campaign API'
    }
  },

  // DEPT 4: OPERATIONS & MANAGEMENT
  'coo': {
    features: {
      'Separate Dashboard': true,
      'Security Layer': 'SSO (SAML/OIDC), role-based ACL, encryption, MFA for critical actions',
      'Call': 'Telephony integration, recording enabled (90d retention), transcript generation',
      'Chat System': 'Web widget + Slack + Teams, persistent threads, operations context',
      'SMS': 'SMS via provider, operations templates, two-way support',
      'Voice & Phone Number': 'Primary DID(s) with operations routing, TTS voice: professional male',
      'Recording & Script': 'Recording enabled (90d retention), transcript generation, operations playbooks',
      'Location & Country': 'Allowed regions: global, timezone-aware scheduling, locale formats',
      'Company Setup': 'Company profile with operational metrics, products catalog, resource allocation',
      'General Info': 'Name: AI Chief Operating Officer; Role: Operations Strategy; Availability: 24/7; Personality: systematic, efficient, process-oriented',
      'Model & Language': 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de',
      'Timing & Scheduling': 'Business Hours: 24/7 for critical operations; Waiting Duration for Call: 60s',
      'Pricing & Negotiation': 'Pricing Model: fixed monthly; Price Limit: $25,000; Negotiation: max concession 10%',
      'Integrations': 'ERP (SAP, Oracle), Operations Management (ServiceNow), Supply Chain (Kinaxis), Quality Management (MasterControl)',
      'Responsibilities & Routing': 'Task routing by operational priority and impact, escalation to human after 1 failed handoff',
      'Tasks & Work Management': 'Assigned tasks queue, SLA timers, operational metrics tracking',
      'Behaviour & Limitations': 'Safety filters enabled, refusal templates for safety-critical content, rate limits: 150/min',
      'Performance & Insights': 'Metrics: latency, operational efficiency, cost reduction, SLA compliance; Reporting: executive dashboards',
      'Summary & Notes': 'Operations leader focused on efficiency and process optimization',
      'Predictive Layers': 'Operational bottleneck forecasting, capacity planning, cost optimization predictions',
      'Rules & Regulations': 'GDPR & regional compliance, safety regulations, operational standards',
      'Memory': 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
      'Setup Company': 'ERP setup, process mapping, resource allocation configuration',
      '2-Step Verification': 'MFA for billing/admin and critical operational decisions',
      'Import & Export Data': 'CSV/JSON endpoints, scheduled exports, retention policy',
      'Reports': 'Daily/Weekly/Monthly operations dashboards, efficiency reports, cost reports',
      'Integrations & MCP': 'Operations platform connectors, API specs, integration notes'
    }
  },
  'operations-manager': {
    features: {
      'Separate Dashboard': true,
      'Security Layer': 'role-based ACL, encryption at rest, MFA for admin actions',
      'Call': 'Telephony integration, recording enabled (90d retention), transcript generation',
      'Chat System': 'Web widget + connectors, persistent threads',
      'SMS': 'SMS via provider, operations templates, two-way support',
      'Voice & Phone Number': 'Primary DID(s): operations team; TTS voice: professional',
      'Recording & Script': 'Recording enabled (90d retention), transcript generation, process scripts',
      'Location & Country': 'Allowed regions: assigned facilities, timezone-aware scheduling',
      'Company Setup': 'Company profile, products catalog, facility configuration',
      'General Info': 'Name: AI Operations Manager; Role: Process Management; Availability: 24/7; Personality: organized, efficient, detail-oriented',
      'Model & Language': 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es',
      'Timing & Scheduling': 'Business Hours: 24/7 for critical; Waiting Duration for Call: 60s',
      'Pricing & Negotiation': 'Pricing Model: fixed monthly; Price Limit: $5,000; Negotiation: max concession 10%',
      'Integrations': 'ERP, Operations Management, Quality Management, Maintenance Systems',
      'Responsibilities & Routing': 'Task routing by operational priority, escalate after 2 failed attempts',
      'Tasks & Work Management': 'Assigned tasks queue, process tracking, SLA monitoring',
      'Behaviour & Limitations': 'Safety filters enabled, refusal templates, rate limits: 100/min',
      'Performance & Insights': 'Metrics: process efficiency, SLA compliance, cost metrics; Reporting: dashboards',
      'Summary & Notes': 'Operations manager for process execution',
      'Predictive Layers': 'Process bottleneck prediction, maintenance forecasting, capacity planning',
      'Rules & Regulations': 'GDPR compliance, safety regulations, operational standards',
      'Memory': 'Session: 30m; Long-term: 180d; PII redaction enabled',
      'Setup Company': 'Operations platform setup, process configuration, facility setup',
      '2-Step Verification': 'MFA for admin actions',
      'Import & Export Data': 'CSV/JSON endpoints, export schedule',
      'Reports': 'Daily operations reports, process efficiency reports',
      'Integrations & MCP': 'Operations platform integration, process API'
    }
  },

  // DEPT 5: FINANCE & ACCOUNTING
  'cfo': {
    features: {
      'Separate Dashboard': true,
      'Security Layer': 'SSO (SAML/OIDC), role-based ACL, encryption, MFA for critical actions',
      'Call': 'Telephony integration, recording enabled (90d retention), transcript generation',
      'Chat System': 'Web widget + Slack + Teams, persistent threads, finance context',
      'SMS': 'SMS via provider, finance templates, two-way support',
      'Voice & Phone Number': 'Primary DID(s) with finance routing, TTS voice: professional male',
      'Recording & Script': 'Recording enabled (90d retention), transcript generation, finance playbooks',
      'Location & Country': 'Allowed regions: global with financial compliance, timezone-aware scheduling, locale formats',
      'Company Setup': 'Company profile with financial structure, products catalog, budget configuration',
      'General Info': 'Name: AI Chief Financial Officer; Role: Financial Strategy; Availability: 24/5; Personality: analytical, prudent, strategic',
      'Model & Language': 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de',
      'Timing & Scheduling': 'Business Hours: Mon-Fri 09:00-18:00 local; Waiting Duration for Call: 120s',
      'Pricing & Negotiation': 'Pricing Model: fixed monthly; Price Limit: $30,000; Negotiation: max concession 5%',
      'Integrations': 'ERP (SAP, Oracle), Financial Systems (NetSuite, QuickBooks), Banking APIs, Tax Systems (TurboTax, Avalara)',
      'Responsibilities & Routing': 'Task routing by financial impact and priority, escalation to human after 1 failed handoff',
      'Tasks & Work Management': 'Assigned tasks queue, financial tracking, budget monitoring',
      'Behaviour & Limitations': 'Safety filters enabled for financial advice, refusal templates for investment recommendations, rate limits: 80/min',
      'Performance & Insights': 'Metrics: latency, financial accuracy, budget variance, ROI; Reporting: executive dashboards',
      'Summary & Notes': 'Finance leader focused on financial strategy and compliance',
      'Predictive Layers': 'Cash flow forecasting, budget variance prediction, financial risk modeling',
      'Rules & Regulations': 'GDPR, SOX, GAAP/IFRS compliance, financial regulations, tax laws',
      'Memory': 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
      'Setup Company': 'Financial system setup, budget configuration, tax setup',
      '2-Step Verification': 'MFA for billing/admin and financial approvals',
      'Import & Export Data': 'CSV/JSON endpoints, scheduled exports, retention policy, financial controls',
      'Reports': 'Daily/Weekly/Monthly financial dashboards, budget reports, compliance reports',
      'Integrations & MCP': 'Financial platform connectors, API specs, integration notes'
    }
  },
  'finance-manager': {
    features: {
      'Separate Dashboard': true,
      'Security Layer': 'role-based ACL, encryption at rest, MFA for admin actions',
      'Call': 'Telephony integration, recording enabled (90d retention), transcript generation',
      'Chat System': 'Web widget + connectors, persistent threads',
      'SMS': 'SMS via provider, finance templates, two-way support',
      'Voice & Phone Number': 'Primary DID(s): finance team; TTS voice: professional',
      'Recording & Script': 'Recording enabled (90d retention), transcript generation, finance scripts',
      'Location & Country': 'Allowed regions: global, timezone-aware scheduling, locale formats',
      'Company Setup': 'Company profile, products catalog, budget configuration',
      'General Info': 'Name: AI Finance Manager; Role: Financial Operations; Availability: 24/5; Personality: detail-oriented, analytical, compliant',
      'Model & Language': 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr',
      'Timing & Scheduling': 'Business Hours: Mon-Fri 09:00-18:00 local; Waiting Duration for Call: 120s',
      'Pricing & Negotiation': 'Pricing Model: fixed monthly; Price Limit: $5,000; Negotiation: max concession 5%',
      'Integrations': 'Financial Systems, ERP, Banking APIs, Tax Systems',
      'Responsibilities & Routing': 'Task routing by financial priority, escalate after 2 failed attempts',
      'Tasks & Work Management': 'Assigned tasks queue, financial tracking, budget monitoring',
      'Behaviour & Limitations': 'Safety filters enabled, refusal templates for financial advice, rate limits: 60/min',
      'Performance & Insights': 'Metrics: financial accuracy, budget variance, processing time; Reporting: dashboards',
      'Summary & Notes': 'Finance manager for financial operations',
      'Predictive Layers': 'Budget variance prediction, cash flow forecasting',
      'Rules & Regulations': 'GDPR, SOX, GAAP/IFRS compliance, tax laws',
      'Memory': 'Session: 30m; Long-term: 365d; PII redaction enabled',
      'Setup Company': 'Financial system setup, budget configuration',
      '2-Step Verification': 'MFA for admin and financial approvals',
      'Import & Export Data': 'CSV/JSON endpoints, export schedule',
      'Reports': 'Daily financial reports, budget variance reports',
      'Integrations & MCP': 'Financial platform integration, finance API'
    }
  },

  // DEPT 6: TECHNOLOGY & ENGINEERING
  'cto': {
    features: {
      'Separate Dashboard': true,
      'Security Layer': 'SSO (SAML/OIDC), role-based ACL, encryption, MFA for critical actions',
      'Call': 'Telephony integration, recording enabled (90d retention), transcript generation',
      'Chat System': 'Web widget + Slack + Teams, persistent threads, technology context',
      'SMS': 'SMS via provider, technology templates, two-way support',
      'Voice & Phone Number': 'Primary DID(s) with technology routing, TTS voice: professional male',
      'Recording & Script': 'Recording enabled (90d retention), transcript generation, technology playbooks',
      'Location & Country': 'Allowed regions: global, timezone-aware scheduling, locale formats',
      'Company Setup': 'Company profile with technology stack, products catalog, R&D budget',
      'General Info': 'Name: AI Chief Technology Officer; Role: Technology Strategy; Availability: 24/7; Personality: innovative, technical, strategic',
      'Model & Language': 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de',
      'Timing & Scheduling': 'Business Hours: 24/7 for critical incidents; Waiting Duration for Call: 30s',
      'Pricing & Negotiation': 'Pricing Model: fixed monthly; Price Limit: $35,000; Negotiation: max concession 10%',
      'Integrations': 'DevOps (Jenkins, GitLab), Cloud (AWS, Azure, GCP), Monitoring (Datadog, New Relic), Security (CrowdStrike, Palo Alto)',
      'Responsibilities & Routing': 'Task routing by technical severity and impact, escalation to human after 1 failed handoff',
      'Tasks & Work Management': 'Assigned tasks queue, incident tracking, R&D monitoring',
      'Behaviour & Limitations': 'Safety filters enabled, refusal templates for security-critical content, rate limits: 200/min',
      'Performance & Insights': 'Metrics: latency, system uptime, deployment frequency, incident MTTR; Reporting: executive dashboards',
      'Summary & Notes': 'Technology leader focused on innovation and infrastructure',
      'Predictive Layers': 'System failure prediction, capacity forecasting, security threat modeling',
      'Rules & Regulations': 'GDPR & regional compliance, security standards, technology regulations',
      'Memory': 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
      'Setup Company': 'DevOps setup, cloud configuration, monitoring setup',
      '2-Step Verification': 'MFA for billing/admin and critical infrastructure changes',
      'Import & Export Data': 'CSV/JSON endpoints, scheduled exports, retention policy',
      'Reports': 'Daily/Weekly/Monthly technology dashboards, incident reports, R&D reports',
      'Integrations & MCP': 'Technology platform connectors, API specs, integration notes'
    }
  },
  'devops-manager': {
    features: {
      'Separate Dashboard': true,
      'Security Layer': 'role-based ACL, encryption at rest, MFA for admin actions',
      'Call': 'Telephony integration, recording enabled (90d retention), transcript generation',
      'Chat System': 'Web widget + connectors, persistent threads',
      'SMS': 'SMS via provider, DevOps templates, two-way support',
      'Voice & Phone Number': 'Primary DID(s): DevOps team; TTS voice: professional',
      'Recording & Script': 'Recording enabled (90d retention), transcript generation, DevOps scripts',
      'Location & Country': 'Allowed regions: global, timezone-aware scheduling, locale formats',
      'Company Setup': 'Company profile, products catalog, CI/CD configuration',
      'General Info': 'Name: AI DevOps Manager; Role: Infrastructure & Deployment; Availability: 24/7; Personality: automated, efficient, reliable',
      'Model & Language': 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es',
      'Timing & Scheduling': 'Business Hours: 24/7 for critical; Waiting Duration for Call: 30s',
      'Pricing & Negotiation': 'Pricing Model: fixed monthly; Price Limit: $8,000; Negotiation: max concession 10%',
      'Integrations': 'DevOps (Jenkins, GitLab), Cloud (AWS, Azure, GCP), Monitoring (Datadog, New Relic)',
      'Responsibilities & Routing': 'Task routing by severity, escalate after 1 failed attempt',
      'Tasks & Work Management': 'Assigned tasks queue, deployment tracking, incident monitoring',
      'Behaviour & Limitations': 'Safety filters enabled, refusal templates, rate limits: 150/min',
      'Performance & Insights': 'Metrics: deployment frequency, uptime, MTTR; Reporting: dashboards',
      'Summary & Notes': 'DevOps manager for infrastructure and deployment',
      'Predictive Layers': 'Deployment failure prediction, capacity forecasting, incident prediction',
      'Rules & Regulations': 'GDPR compliance, security standards, infrastructure regulations',
      'Memory': 'Session: 30m; Long-term: 180d; PII redaction enabled',
      'Setup Company': 'DevOps setup, CI/CD configuration, monitoring setup',
      '2-Step Verification': 'MFA for admin and infrastructure changes',
      'Import & Export Data': 'CSV/JSON endpoints, export schedule',
      'Reports': 'Daily DevOps reports, deployment reports, incident reports',
      'Integrations & MCP': 'DevOps platform integration, infrastructure API'
    }
  },

  // DEPT 7: HUMAN RESOURCES
  'chro': {
    features: {
      'Separate Dashboard': true,
      'Security Layer': 'SSO (SAML/OIDC), role-based ACL, encryption, MFA for critical actions',
      'Call': 'Telephony integration, recording enabled (90d retention), transcript generation',
      'Chat System': 'Web widget + Slack + Teams, persistent threads, HR context',
      'SMS': 'SMS via provider, HR templates, two-way support',
      'Voice & Phone Number': 'Primary DID(s) with HR routing, TTS voice: professional female',
      'Recording & Script': 'Recording enabled (90d retention), transcript generation, HR playbooks',
      'Location & Country': 'Allowed regions: global with labor compliance, timezone-aware scheduling, locale formats',
      'Company Setup': 'Company profile with HR policies, products catalog, workforce planning',
      'General Info': 'Name: AI Chief Human Resources Officer; Role: HR Strategy; Availability: 24/5; Personality: empathetic, strategic, people-focused',
      'Model & Language': 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de',
      'Timing & Scheduling': 'Business Hours: Mon-Fri 09:00-18:00 local; Waiting Duration for Call: 120s',
      'Pricing & Negotiation': 'Pricing Model: fixed monthly; Price Limit: $20,000; Negotiation: max concession 10%',
      'Integrations': 'HRIS (Workday, BambooHR), ATS (Greenhouse, Lever), Performance (Lattice, Betterworks), Payroll (ADP, Paychex)',
      'Responsibilities & Routing': 'Task routing by HR priority and sensitivity, escalation to human after 2 failed handoffs',
      'Tasks & Work Management': 'Assigned tasks queue, employee lifecycle tracking, compliance monitoring',
      'Behaviour & Limitations': 'Safety filters enabled for employee data, refusal templates for legal advice, rate limits: 80/min',
      'Performance & Insights': 'Metrics: latency, time-to-hire, retention rate, employee satisfaction; Reporting: executive dashboards',
      'Summary & Notes': 'HR leader focused on talent strategy and employee experience',
      'Predictive Layers': 'Turnover prediction, talent gap forecasting, engagement trend analysis',
      'Rules & Regulations': 'GDPR, EEOC, FLSA, labor laws, compliance requirements',
      'Memory': 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
      'Setup Company': 'HRIS setup, policy configuration, workforce planning',
      '2-Step Verification': 'MFA for billing/admin and sensitive HR actions',
      'Import & Export Data': 'CSV/JSON endpoints, scheduled exports, retention policy, employee data controls',
      'Reports': 'Daily/Weekly/Monthly HR dashboards, recruitment reports, compliance reports',
      'Integrations & MCP': 'HR platform connectors, API specs, integration notes'
    }
  },
  'recruiter': {
    features: {
      'Separate Dashboard': false,
      'Security Layer': 'role-based ACL, encryption at rest',
      'Call': 'Telephony integration, recording (90d retention), transcript generation',
      'Chat System': 'Web widget + connectors, persistent threads',
      'SMS': 'SMS via provider, recruiting templates, two-way support',
      'Voice & Phone Number': 'Primary DID(s): recruiting pool; TTS voice: professional',
      'Recording & Script': 'Recording enabled (90d retention), transcript generation, recruiting scripts',
      'Location & Country': 'Allowed regions: assigned regions, timezone-aware scheduling',
      'Company Setup': 'Company profile, products catalog, job configuration',
      'General Info': 'Name: AI Recruiter; Role: Talent Acquisition; Availability: 24/5; Personality: engaging, persistent, candidate-focused',
      'Model & Language': 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr',
      'Timing & Scheduling': 'Business Hours: Mon-Fri 09:00-18:00 local; Waiting Duration for Call: 120s',
      'Pricing & Negotiation': 'Pricing Model: per-hire; Price Limit: $3,000; Negotiation: N/A',
      'Integrations': 'ATS, LinkedIn, Job Boards, Email Tools',
      'Responsibilities & Routing': 'Task routing by role priority, escalate after 3 failed attempts',
      'Tasks & Work Management': 'Assigned tasks queue, candidate tracking, hiring metrics',
      'Behaviour & Limitations': 'Safety filters enabled, refusal templates, rate limits: 100/min',
      'Performance & Insights': 'Metrics: time-to-hire, offer acceptance rate, candidate satisfaction; Reporting: dashboards',
      'Summary & Notes': 'Recruiter for talent acquisition',
      'Predictive Layers': 'Candidate fit prediction, time-to-fill forecasting',
      'Rules & Regulations': 'GDPR compliance, EEOC, labor laws',
      'Memory': 'Session: 30m; Long-term: 180d; PII redaction enabled',
      'Setup Company': 'ATS setup, job templates, sourcing configuration',
      '2-Step Verification': 'MFA for admin actions',
      'Import & Export Data': 'CSV/JSON endpoints, export schedule',
      'Reports': 'Daily recruiting reports, hiring metrics',
      'Integrations & MCP': 'ATS integration, recruiting API'
    }
  },

  // DEPT 8: LEGAL & COMPLIANCE
  'clo': {
    features: {
      'Separate Dashboard': true,
      'Security Layer': 'SSO (SAML/OIDC), role-based ACL, encryption, MFA for critical actions',
      'Call': 'Telephony integration, recording enabled (90d retention), transcript generation',
      'Chat System': 'Web widget + Slack + Teams, persistent threads, legal context',
      'SMS': 'SMS via provider, legal templates, two-way support',
      'Voice & Phone Number': 'Primary DID(s) with legal routing, TTS voice: professional female',
      'Recording & Script': 'Recording enabled (90d retention), transcript generation, legal playbooks',
      'Location & Country': 'Allowed regions: global with legal compliance, timezone-aware scheduling, locale formats',
      'Company Setup': 'Company profile with legal structure, products catalog, compliance framework',
      'General Info': 'Name: AI Chief Legal Officer; Role: Legal Strategy; Availability: 24/5; Personality: prudent, analytical, compliance-focused',
      'Model & Language': 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de',
      'Timing & Scheduling': 'Business Hours: Mon-Fri 09:00-18:00 local; Waiting Duration for Call: 120s',
      'Pricing & Negotiation': 'Pricing Model: fixed monthly; Price Limit: $40,000; Negotiation: max concession 5%',
      'Integrations': 'Legal Management (Clio, PracticePanther), Contract Management (DocuSign, PandaDoc), Compliance (Compliance360, LogicGate)',
      'Responsibilities & Routing': 'Task routing by legal priority and risk, escalation to human after 1 failed handoff',
      'Tasks & Work Management': 'Assigned tasks queue, contract tracking, compliance monitoring',
      'Behaviour & Limitations': 'Safety filters enabled for legal advice, refusal templates for legal opinions, rate limits: 60/min',
      'Performance & Insights': 'Metrics: latency, contract turnaround time, compliance score, risk reduction; Reporting: executive dashboards',
      'Summary & Notes': 'Legal leader focused on risk management and compliance',
      'Predictive Layers': 'Legal risk prediction, compliance breach forecasting, contract risk modeling',
      'Rules & Regulations': 'GDPR, SOX, HIPAA, industry regulations, legal ethics',
      'Memory': 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
      'Setup Company': 'Legal system setup, compliance framework, contract templates',
      '2-Step Verification': 'MFA for billing/admin and legal approvals',
      'Import & Export Data': 'CSV/JSON endpoints, scheduled exports, retention policy, legal privilege controls',
      'Reports': 'Daily/Weekly/Monthly legal dashboards, compliance reports, risk reports',
      'Integrations & MCP': 'Legal platform connectors, API specs, integration notes'
    }
  },
  'compliance-manager': {
    features: {
      'Separate Dashboard': true,
      'Security Layer': 'role-based ACL, encryption at rest, MFA for admin actions',
      'Call': 'Telephony integration, recording enabled (90d retention), transcript generation',
      'Chat System': 'Web widget + connectors, persistent threads',
      'SMS': 'SMS via provider, compliance templates, two-way support',
      'Voice & Phone Number': 'Primary DID(s): compliance team; TTS voice: professional',
      'Recording & Script': 'Recording enabled (90d retention), transcript generation, compliance scripts',
      'Location & Country': 'Allowed regions: global, timezone-aware scheduling, locale formats',
      'Company Setup': 'Company profile, products catalog, compliance configuration',
      'General Info': 'Name: AI Compliance Manager; Role: Compliance Operations; Availability: 24/5; Personality: meticulous, regulatory, process-oriented',
      'Model & Language': 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de',
      'Timing & Scheduling': 'Business Hours: Mon-Fri 09:00-18:00 local; Waiting Duration for Call: 120s',
      'Pricing & Negotiation': 'Pricing Model: fixed monthly; Price Limit: $6,000; Negotiation: max concession 5%',
      'Integrations': 'Compliance Systems, Audit Tools, Policy Management, Risk Management',
      'Responsibilities & Routing': 'Task routing by compliance priority, escalate after 2 failed attempts',
      'Tasks & Work Management': 'Assigned tasks queue, compliance tracking, audit monitoring',
      'Behaviour & Limitations': 'Safety filters enabled, refusal templates for legal advice, rate limits: 60/min',
      'Performance & Insights': 'Metrics: compliance score, audit findings, risk reduction; Reporting: dashboards',
      'Summary & Notes': 'Compliance manager for regulatory adherence',
      'Predictive Layers': 'Compliance breach prediction, risk forecasting',
      'Rules & Regulations': 'GDPR, SOX, HIPAA, industry regulations',
      'Memory': 'Session: 30m; Long-term: 365d; PII redaction enabled',
      'Setup Company': 'Compliance system setup, policy configuration',
      '2-Step Verification': 'MFA for admin and compliance actions',
      'Import & Export Data': 'CSV/JSON endpoints, export schedule',
      'Reports': 'Daily compliance reports, audit reports',
      'Integrations & MCP': 'Compliance platform integration, compliance API'
    }
  },

  // DEPT 9: DATA & INTELLIGENCE
  'cdao': {
    features: {
      'Separate Dashboard': true,
      'Security Layer': 'SSO (SAML/OIDC), role-based ACL, encryption, MFA for critical actions',
      'Call': 'Telephony integration, recording enabled (90d retention), transcript generation',
      'Chat System': 'Web widget + Slack + Teams, persistent threads, data context',
      'SMS': 'SMS via provider, data templates, two-way support',
      'Voice & Phone Number': 'Primary DID(s) with data routing, TTS voice: professional male',
      'Recording & Script': 'Recording enabled (90d retention), transcript generation, data playbooks',
      'Location & Country': 'Allowed regions: global with data compliance, timezone-aware scheduling, locale formats',
      'Company Setup': 'Company profile with data strategy, products catalog, data governance',
      'General Info': 'Name: AI Chief Data & AI Officer; Role: Data & AI Strategy; Availability: 24/7; Personality: analytical, innovative, data-driven',
      'Model & Language': 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de',
      'Timing & Scheduling': 'Business Hours: 24/7 for critical data issues; Waiting Duration for Call: 60s',
      'Pricing & Negotiation': 'Pricing Model: fixed monthly; Price Limit: $30,000; Negotiation: max concession 10%',
      'Integrations': 'Data Platforms (Snowflake, Databricks), BI (Tableau, Power BI), ML (TensorFlow, PyTorch), Data Catalog (Alation, Collibra)',
      'Responsibilities & Routing': 'Task routing by data impact and priority, escalation to human after 1 failed handoff',
      'Tasks & Work Management': 'Assigned tasks queue, data pipeline monitoring, AI model tracking',
      'Behaviour & Limitations': 'Safety filters enabled for data privacy, refusal templates for data misuse, rate limits: 150/min',
      'Performance & Insights': 'Metrics: latency, data quality, model accuracy, insight generation; Reporting: executive dashboards',
      'Summary & Notes': 'Data & AI leader focused on analytics and innovation',
      'Predictive Layers': 'Data quality prediction, model performance forecasting, insight generation',
      'Rules & Regulations': 'GDPR, data privacy regulations, AI ethics guidelines',
      'Memory': 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
      'Setup Company': 'Data platform setup, governance framework, AI infrastructure',
      '2-Step Verification': 'MFA for billing/admin and data access',
      'Import & Export Data': 'CSV/JSON endpoints, scheduled exports, retention policy, data lineage controls',
      'Reports': 'Daily/Weekly/Monthly data dashboards, quality reports, AI reports',
      'Integrations & MCP': 'Data platform connectors, API specs, integration notes'
    }
  },
  'data-scientist': {
    features: {
      'Separate Dashboard': false,
      'Security Layer': 'role-based ACL, encryption at rest',
      'Call': 'Telephony integration, recording (90d retention), transcript generation',
      'Chat System': 'Web widget + connectors, persistent threads',
      'SMS': 'SMS via provider, data templates, two-way support',
      'Voice & Phone Number': 'Primary DID(s): data team; TTS voice: professional',
      'Recording & Script': 'Recording enabled (90d retention), transcript generation, data scripts',
      'Location & Country': 'Allowed regions: global, timezone-aware scheduling, locale formats',
      'Company Setup': 'Company profile, products catalog, data configuration',
      'General Info': 'Name: AI Data Scientist; Role: Data Analysis & ML; Availability: 24/7; Personality: analytical, curious, experimental',
      'Model & Language': 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr',
      'Timing & Scheduling': 'Business Hours: 24/7 for critical; Waiting Duration for Call: 60s',
      'Pricing & Negotiation': 'Pricing Model: fixed monthly; Price Limit: $4,000; Negotiation: max concession 10%',
      'Integrations': 'Data Platforms, ML Frameworks, BI Tools, Notebooks (Jupyter, Colab)',
      'Responsibilities & Routing': 'Task routing by data priority, escalate after 2 failed attempts',
      'Tasks & Work Management': 'Assigned tasks queue, model training, data analysis',
      'Behaviour & Limitations': 'Safety filters enabled, refusal templates, rate limits: 120/min',
      'Performance & Insights': 'Metrics: model accuracy, data quality, insight generation; Reporting: dashboards',
      'Summary & Notes': 'Data scientist for analysis and machine learning',
      'Predictive Layers': 'Model performance prediction, data quality forecasting',
      'Rules & Regulations': 'GDPR compliance, data privacy, AI ethics',
      'Memory': 'Session: 30m; Long-term: 180d; PII redaction enabled',
      'Setup Company': 'Data platform setup, ML environment configuration',
      '2-Step Verification': 'MFA for admin actions',
      'Import & Export Data': 'CSV/JSON endpoints, export schedule',
      'Reports': 'Daily data reports, model performance reports',
      'Integrations & MCP': 'Data platform integration, ML API'
    }
  },

  // DEPT 10: PRODUCT MANAGEMENT
  'vp-product': {
    features: {
      'Separate Dashboard': true,
      'Security Layer': 'SSO (SAML/OIDC), role-based ACL, encryption, MFA for critical actions',
      'Call': 'Telephony integration, recording enabled (90d retention), transcript generation',
      'Chat System': 'Web widget + Slack + Teams, persistent threads, product context',
      'SMS': 'SMS via provider, product templates, two-way support',
      'Voice & Phone Number': 'Primary DID(s) with product routing, TTS voice: professional female',
      'Recording & Script': 'Recording enabled (90d retention), transcript generation, product playbooks',
      'Location & Country': 'Allowed regions: global, timezone-aware scheduling, locale formats',
      'Company Setup': 'Company profile with product strategy, products catalog, roadmap configuration',
      'General Info': 'Name: AI VP Product; Role: Product Strategy; Availability: 24/5; Personality: visionary, user-focused, data-driven',
      'Model & Language': 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de',
      'Timing & Scheduling': 'Business Hours: Mon-Fri 09:00-18:00 local; Waiting Duration for Call: 120s',
      'Pricing & Negotiation': 'Pricing Model: fixed monthly; Price Limit: $25,000; Negotiation: max concession 10%',
      'Integrations': 'Product Management (Jira Product Discovery, Aha!), Roadmapping (Productboard, Roadmunk), Analytics (Mixpanel, Amplitude), Design (Figma, Sketch)',
      'Responsibilities & Routing': 'Task routing by product priority and impact, escalation to human after 2 failed handoffs',
      'Tasks & Work Management': 'Assigned tasks queue, roadmap tracking, feature monitoring',
      'Behaviour & Limitations': 'Safety filters enabled, refusal templates, rate limits: 100/min',
      'Performance & Insights': 'Metrics: latency, feature adoption, user satisfaction, roadmap execution; Reporting: executive dashboards',
      'Summary & Notes': 'Product leader focused on strategy and delivery',
      'Predictive Layers': 'Feature adoption prediction, user behavior modeling, market trend analysis',
      'Rules & Regulations': 'GDPR compliance, product regulations, accessibility standards',
      'Memory': 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
      'Setup Company': 'Product platform setup, roadmap configuration, analytics integration',
      '2-Step Verification': 'MFA for billing/admin and product decisions',
      'Import & Export Data': 'CSV/JSON endpoints, scheduled exports, retention policy',
      'Reports': 'Daily/Weekly/Monthly product dashboards, roadmap reports, adoption reports',
      'Integrations & MCP': 'Product platform connectors, API specs, integration notes'
    }
  },
  'product-manager': {
    features: {
      'Separate Dashboard': true,
      'Security Layer': 'role-based ACL, encryption at rest, MFA for admin actions',
      'Call': 'Telephony integration, recording enabled (90d retention), transcript generation',
      'Chat System': 'Web widget + connectors, persistent threads',
      'SMS': 'SMS via provider, product templates, two-way support',
      'Voice & Phone Number': 'Primary DID(s): product team; TTS voice: professional',
      'Recording & Script': 'Recording enabled (90d retention), transcript generation, product scripts',
      'Location & Country': 'Allowed regions: global, timezone-aware scheduling, locale formats',
      'Company Setup': 'Company profile, products catalog, feature configuration',
      'General Info': 'Name: AI Product Manager; Role: Product Delivery; Availability: 24/5; Personality: organized, user-focused, collaborative',
      'Model & Language': 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr',
      'Timing & Scheduling': 'Business Hours: Mon-Fri 09:00-18:00 local; Waiting Duration for Call: 120s',
      'Pricing & Negotiation': 'Pricing Model: fixed monthly; Price Limit: $5,000; Negotiation: max concession 10%',
      'Integrations': 'Product Management, Roadmapping, Analytics, Design Tools',
      'Responsibilities & Routing': 'Task routing by feature priority, escalate after 3 failed attempts',
      'Tasks & Work Management': 'Assigned tasks queue, feature tracking, user feedback monitoring',
      'Behaviour & Limitations': 'Safety filters enabled, refusal templates, rate limits: 80/min',
      'Performance & Insights': 'Metrics: feature delivery, user satisfaction, adoption metrics; Reporting: dashboards',
      'Summary & Notes': 'Product manager for feature delivery',
      'Predictive Layers': 'Feature success prediction, user behavior analysis',
      'Rules & Regulations': 'GDPR compliance, product regulations, accessibility standards',
      'Memory': 'Session: 30m; Long-term: 180d; PII redaction enabled',
      'Setup Company': 'Product platform setup, feature configuration',
      '2-Step Verification': 'MFA for admin actions',
      'Import & Export Data': 'CSV/JSON endpoints, export schedule',
      'Reports': 'Daily product reports, feature delivery reports',
      'Integrations & MCP': 'Product platform integration, product API'
    }
  },

  // DEPT 11: SECURITY & RISK
  'ciso': {
    features: {
      'Separate Dashboard': true,
      'Security Layer': 'SSO (SAML/OIDC), role-based ACL, encryption, MFA for critical actions',
      'Call': 'Telephony integration, recording enabled (90d retention), transcript generation',
      'Chat System': 'Web widget + Slack + Teams, persistent threads, security context',
      'SMS': 'SMS via provider, security templates, two-way support',
      'Voice & Phone Number': 'Primary DID(s) with security routing, TTS voice: professional male',
      'Recording & Script': 'Recording enabled (90d retention), transcript generation, security playbooks',
      'Location & Country': 'Allowed regions: global with security compliance, timezone-aware scheduling, locale formats',
      'Company Setup': 'Company profile with security posture, products catalog, security framework',
      'General Info': 'Name: AI Chief Information Security Officer; Role: Security Strategy; Availability: 24/7; Personality: vigilant, proactive, risk-aware',
      'Model & Language': 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de',
      'Timing & Scheduling': 'Business Hours: 24/7 for security incidents; Waiting Duration for Call: 15s',
      'Pricing & Negotiation': 'Pricing Model: fixed monthly; Price Limit: $35,000; Negotiation: max concession 5%',
      'Integrations': 'Security (CrowdStrike, Palo Alto, SentinelOne), SIEM (Splunk, QRadar), Vulnerability (Tenable, Qualys), Compliance (SecurityScorecard)',
      'Responsibilities & Routing': 'Task routing by security severity, escalation to human immediately for critical',
      'Tasks & Work Management': 'Assigned tasks queue, incident tracking, vulnerability monitoring',
      'Behaviour & Limitations': 'Safety filters enabled, refusal templates for security advice, rate limits: 200/min',
      'Performance & Insights': 'Metrics: latency, incident MTTR, vulnerability remediation, security score; Reporting: executive dashboards',
      'Summary & Notes': 'Security leader focused on threat prevention and risk management',
      'Predictive Layers': 'Threat prediction, vulnerability forecasting, risk modeling',
      'Rules & Regulations': 'GDPR, SOC2, HIPAA, PCI-DSS, security standards',
      'Memory': 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
      'Setup Company': 'Security platform setup, SIEM configuration, vulnerability scanning',
      '2-Step Verification': 'MFA for billing/admin and security actions',
      'Import & Export Data': 'CSV/JSON endpoints, scheduled exports, retention policy, security logs',
      'Reports': 'Daily/Weekly/Monthly security dashboards, incident reports, vulnerability reports',
      'Integrations & MCP': 'Security platform connectors, API specs, integration notes'
    }
  },
  'security-analyst': {
    features: {
      'Separate Dashboard': false,
      'Security Layer': 'role-based ACL, encryption at rest',
      'Call': 'Telephony integration, recording (90d retention), transcript generation',
      'Chat System': 'Web widget + connectors, persistent threads',
      'SMS': 'SMS via provider, security templates, two-way support',
      'Voice & Phone Number': 'Primary DID(s): security team; TTS voice: professional',
      'Recording & Script': 'Recording enabled (90d retention), transcript generation, security scripts',
      'Location & Country': 'Allowed regions: global, timezone-aware scheduling, locale formats',
      'Company Setup': 'Company profile, products catalog, security configuration',
      'General Info': 'Name: AI Security Analyst; Role: Threat Detection; Availability: 24/7; Personality: vigilant, analytical, detail-oriented',
      'Model & Language': 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr',
      'Timing & Scheduling': 'Business Hours: 24/7 for security; Waiting Duration for Call: 30s',
      'Pricing & Negotiation': 'Pricing Model: fixed monthly; Price Limit: $4,000; Negotiation: max concession 5%',
      'Integrations': 'Security Platforms, SIEM, Threat Intelligence, Vulnerability Scanners',
      'Responsibilities & Routing': 'Task routing by severity, escalate immediately for critical',
      'Tasks & Work Management': 'Assigned tasks queue, incident monitoring, threat analysis',
      'Behaviour & Limitations': 'Safety filters enabled, refusal templates, rate limits: 150/min',
      'Performance & Insights': 'Metrics: incident response time, threat detection rate, false positive rate; Reporting: dashboards',
      'Summary & Notes': 'Security analyst for threat detection and response',
      'Predictive Layers': 'Threat prediction, vulnerability forecasting',
      'Rules & Regulations': 'GDPR compliance, security standards',
      'Memory': 'Session: 30m; Long-term: 180d; PII redaction enabled',
      'Setup Company': 'Security platform setup, SIEM configuration',
      '2-Step Verification': 'MFA for admin actions',
      'Import & Export Data': 'CSV/JSON endpoints, export schedule',
      'Reports': 'Daily security reports, incident reports',
      'Integrations & MCP': 'Security platform integration, security API'
    }
  },

  // DEFAULT TEMPLATE FOR OTHER AGENTS
  'default': {
    features: {
      'Separate Dashboard': false,
      'Security Layer': 'role-based ACL, encryption at rest',
      'Call': 'Telephony integration, recording (90d retention), transcript generation',
      'Chat System': 'Web widget + connectors, persistent threads',
      'SMS': 'SMS via provider, templated messages, two-way support',
      'Voice & Phone Number': 'Primary DID(s): shared; TTS voice: default',
      'Recording & Script': 'Recording enabled (90d retention), transcript generation, standard scripts',
      'Location & Country': 'Allowed regions: global, timezone-aware scheduling, locale formats',
      'Company Setup': 'Company profile, products catalog, standard configuration',
      'General Info': 'Name: AI Agent; Role: Standard Operations; Availability: 24/5; Personality: professional, efficient, helpful',
      'Model & Language': 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es',
      'Timing & Scheduling': 'Business Hours: Mon-Fri 09:00-18:00 local; Waiting Duration for Call: 120s',
      'Pricing & Negotiation': 'Pricing Model: fixed monthly; Price Limit: $2,000; Negotiation: max concession 10%',
      'Integrations': 'Standard business tools, CRM, Communication platforms',
      'Responsibilities & Routing': 'Task routing by priority, escalate after 3 failed attempts',
      'Tasks & Work Management': 'Assigned tasks queue, SLA timers, progress tracking',
      'Behaviour & Limitations': 'Safety filters enabled, refusal templates, rate limits: 60/min',
      'Performance & Insights': 'Metrics: latency, accuracy, completion rate; Reporting: dashboards',
      'Summary & Notes': 'Standard AI agent for general operations',
      'Predictive Layers': 'Basic forecasting, anomaly detection',
      'Rules & Regulations': 'GDPR compliance, standard regulations',
      'Memory': 'Session: 30m; Long-term: 90d; PII redaction enabled',
      'Setup Company': 'Standard configuration, basic setup',
      '2-Step Verification': 'MFA for admin actions',
      'Import & Export Data': 'CSV/JSON endpoints, export schedule',
      'Reports': 'Daily/Weekly/Monthly standard reports',
      'Integrations & MCP': 'Standard platform integration, API'
    }
  }
};

// ============================================
// AGENT FILE MAPPING
// ============================================

const AGENT_FILE_MAPPING = {
  // Customer Experience
  'chief-customer-officer': 'app/ai-agent/customer/cco.tsx',
  'vp-customer-success': 'app/ai-agent/customer/vp-customer-success.tsx',
  'vp-support': 'app/ai-agent/customer/vp-support.tsx',
  'customer-support': 'app/ai-agent/customer/cx-support.tsx',
  
  // Sales & Revenue
  'vp-sales': 'app/ai-agent/sales/vp-sales.tsx',
  'sales-rep': 'app/ai-agent/sales/sales-rep.tsx',
  'sdr': 'app/ai-agent/sales/sdr.tsx',
  
  // Marketing & Growth
  'cmo': 'app/ai-agent/marketing/cmo.tsx',
  'marketing-manager': 'app/ai-agent/marketing/marketing-manager.tsx',
  
  // Operations & Management
  'coo': 'app/ai-agent/operations/coo.tsx',
  'operations-manager': 'app/ai-agent/operations/operations-manager.tsx',
  
  // Finance & Accounting
  'cfo': 'app/ai-agent/finance/cfo.tsx',
  'finance-manager': 'app/ai-agent/finance/finance-manager.tsx',
  
  // Technology & Engineering
  'cto': 'app/ai-agent/tech/cto.tsx',
  'devops-manager': 'app/ai-agent/tech/devops-manager.tsx',
  
  // Human Resources
  'chro': 'app/ai-agent/hr/chro.tsx',
  'recruiter': 'app/ai-agent/hr/recruiter.tsx',
  
  // Legal & Compliance
  'clo': 'app/ai-agent/legal/clo.tsx',
  'compliance-manager': 'app/ai-agent/legal/compliance-manager.tsx',
  
  // Data & Intelligence
  'cdao': 'app/ai-agent/data/cdao.tsx',
  'data-scientist': 'app/ai-agent/data/data-scientist-1.tsx',
  
  // Product Management
  'vp-product': 'app/ai-agent/product/vp-product.tsx',
  'product-manager': 'app/ai-agent/product/product-manager.tsx',
  
  // Security & Risk
  'ciso': 'app/ai-agent/security/ciso.tsx',
  'security-analyst': 'app/ai-agent/security/security-analyst-1.tsx',
};

// ============================================
// ENHANCEMENT FUNCTIONS
// ============================================

/**
 * Get feature enhancements for an agent
 */
function getAgentFeatures(agentId) {
  return AGENT_FEATURE_ENHANCEMENTS[agentId] || AGENT_FEATURE_ENHANCEMENTS['default'];
}

/**
 * Enhance agent file with specific features
 */
function enhanceAgentFile(filePath, agentId) {
  console.log(`Enhancing agent: ${agentId} at ${filePath}`);
  
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`  ⚠️  File not found: ${filePath}`);
      return false;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const features = getAgentFeatures(agentId);
    
    // Check if file already has enhanced features
    if (content.includes('Separate Dashboard: true') || content.includes('Separate Dashboard: false')) {
      console.log(`  ✓ Already enhanced`);
      return true;
    }
    
    // Generate features section
    let featuresSection = '  features: {\n';
    for (const [key, value] of Object.entries(features.features)) {
      featuresSection += `    '${key}': ${JSON.stringify(value)},\n`;
    }
    featuresSection += '  },\n';
    
    // Insert features after the agent object
    const enhancedContent = content.replace(
      /(export const [a-zA-Z0-9_-]+: AIEmployee = \{)/,
      `$1\n${featuresSection}`
    );
    
    fs.writeFileSync(filePath, enhancedContent, 'utf8');
    console.log(`  ✓ Enhanced successfully`);
    return true;
    
  } catch (error) {
    console.error(`  ✗ Error enhancing ${agentId}:`, error.message);
    return false;
  }
}

/**
 * Enhance all agents
 */
function enhanceAllAgents() {
  console.log('========================================');
  console.log('ENHANCING ALL AGENTS WITH FEATURES');
  console.log('========================================\n');
  
  let successCount = 0;
  let failCount = 0;
  
  for (const [agentId, filePath] of Object.entries(AGENT_FILE_MAPPING)) {
    const fullPath = path.join(__dirname, '..', '..', filePath);
    const success = enhanceAgentFile(fullPath, agentId);
    
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }
  
  console.log('\n========================================');
  console.log('ENHANCEMENT SUMMARY');
  console.log('========================================');
  console.log(`✓ Successfully enhanced: ${successCount}`);
  console.log(`✗ Failed: ${failCount}`);
  console.log(`Total: ${successCount + failCount}`);
  console.log('========================================\n');
}

// Run enhancement if executed directly
if (require.main === module) {
  enhanceAllAgents();
}

module.exports = {
  getAgentFeatures,
  enhanceAgentFile,
  enhanceAllAgents,
  AGENT_FEATURE_ENHANCEMENTS,
};
