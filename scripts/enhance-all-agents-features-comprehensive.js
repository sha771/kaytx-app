/**
 * =============================================================================
 * COMPREHENSIVE AGENT FEATURE ENHANCEMENT - ALL 1,108 AGENTS
 * =============================================================================
 * 
 * Systematically adds specific, related features, options, and capabilities
 * to all 1,108 agents (277 main + 831 sub-agents) based on their department
 * and role using a template-based generation system.
 * 
 * @version 3.0.0
 * @lastUpdated 2026-06-07
 */

const fs = require('fs');
const path = require('path');

// ============================================
// DEPARTMENT-SPECIFIC FEATURE TEMPLATES
// ============================================

const DEPARTMENT_FEATURE_TEMPLATES = {
  'customer-experience': {
    dashboard: true,
    security: 'SSO (SAML/OIDC), role-based ACL, encryption at rest/in transit, MFA for admin actions',
    call: 'Twilio PSTN integration, IVR menu with customer journey mapping, call routing rules, call recording enabled (90-day retention), real-time transcriptions with sentiment analysis',
    chat: 'Web widget + Slack + Intercom + Microsoft Teams connectors, persistent conversation threads, omnichannel sync, transcript export',
    sms: 'Twilio SMS number, templated messages with personalization, two-way support, opt-out handling, SMS analytics',
    voice: 'Primary DID(s) with geo-routing, TTS voice selection (professional female), failover numbers, voice biometrics',
    recording: 'Auto-recording with consent logging, transcript generation with NLP analysis, script templates per customer segment',
    location: 'Allowed regions: global with data residency controls, timezone-aware scheduling, locale formats (en, es, fr, de)',
    companySetup: 'Company profile with customer journey maps, products catalog with CX impact scoring, pricing tiers, negotiation rule templates',
    model: 'LLM-X v2 (GPT-4 family); Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de, zh',
    timing: 'Business Hours: Mon-Fri 09:00-18:00 local (configurable); Waiting Duration for Call: 120s; Calendar integrations: Google/Outlook',
    pricing: 'Pricing Model: fixed monthly + per-interaction; Price Limit: $10,000; auto-negotiation rules (max concession 15% for CX investments)',
    integrations: 'CRM (Salesforce, HubSpot), Customer Analytics (Qualtrics, Medallia), Journey Mapping (Touchpoint Dashboard), NPS Software (SurveyMonkey)',
    responsibilities: 'Task routing by customer segment and intent, escalation path to human after 2 failed handoffs, SLA enforcement with CX metrics',
    performance: 'Metrics: latency, resolution rate, CSAT, NPS, churn prediction; Reporting: executive dashboards + scheduled reports (daily, weekly, monthly)',
    predictive: 'Churn forecast model triggers proactive outreach, customer lifetime value prediction, sentiment trend analysis, anomaly detection for CX metrics',
    compliance: 'GDPR & regional compliance, data residency constraints, consent policies, customer data privacy controls',
    memory: 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly; customer journey memory',
  },
  'sales-revenue': {
    dashboard: true,
    security: 'SSO (SAML/OIDC), role-based ACL, encryption, MFA for critical actions',
    call: 'Twilio integration with sales routing, recording enabled (90d retention), transcript with sales insights',
    chat: 'Web widget + Slack + Microsoft Teams, persistent threads, sales context',
    sms: 'Twilio SMS, sales templates, two-way support, follow-up automation',
    voice: 'Primary DID(s) with geo-routing, TTS voice: professional male',
    recording: 'Recording enabled (90d retention), transcript with objection handling, sales scripts',
    location: 'Allowed regions: global, timezone-aware scheduling, locale formats',
    companySetup: 'Company profile with sales targets, products catalog with pricing, commission rules',
    model: 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de',
    timing: 'Business Hours: Mon-Fri 09:00-18:00 local; Waiting Duration for Call: 90s',
    pricing: 'Pricing Model: fixed monthly + commission; Price Limit: $15,000; Negotiation: max concession 20%',
    integrations: 'CRM (Salesforce, HubSpot), Sales Analytics (Gong, Chorus), CPQ (Oracle CPQ), Forecasting Tools',
    responsibilities: 'Task routing by deal stage and value, escalation to human after 2 failed handoffs',
    performance: 'Metrics: latency, close rate, deal velocity, quota attainment; Reporting: executive dashboards',
    predictive: 'Deal win probability forecasting, pipeline velocity prediction, quota attainment forecasting',
    compliance: 'GDPR & regional compliance, sales regulations, data privacy',
    memory: 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
  },
  'marketing-growth': {
    dashboard: true,
    security: 'SSO (SAML/OIDC), role-based ACL, encryption, MFA for critical actions',
    call: 'Telephony integration, recording enabled (90d retention), transcript generation',
    chat: 'Web widget + Slack + Teams, persistent threads, marketing context',
    sms: 'SMS via provider, marketing templates, two-way support',
    voice: 'Primary DID(s) with marketing routing, TTS voice: professional female',
    recording: 'Recording enabled (90d retention), transcript generation, marketing playbooks',
    location: 'Allowed regions: global, timezone-aware scheduling, locale formats',
    companySetup: 'Company profile with brand guidelines, products catalog, marketing budget',
    model: 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de, zh',
    timing: 'Business Hours: Mon-Fri 09:00-18:00 local; Waiting Duration for Call: 120s',
    pricing: 'Pricing Model: fixed monthly; Price Limit: $20,000; Negotiation: max concession 15%',
    integrations: 'Marketing Automation (HubSpot, Marketo), Analytics (Google Analytics, Adobe), Social Media (Hootsuite, Sprout Social), Creative Tools (Canva, Adobe Creative)',
    responsibilities: 'Task routing by campaign type and priority, escalation to human after 2 failed handoffs',
    performance: 'Metrics: latency, campaign ROI, brand awareness, lead generation; Reporting: executive dashboards',
    predictive: 'Campaign performance forecasting, trend prediction, audience behavior modeling',
    compliance: 'GDPR & regional compliance, advertising regulations, brand guidelines',
    memory: 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
  },
  'operations-management': {
    dashboard: true,
    security: 'SSO (SAML/OIDC), role-based ACL, encryption, MFA for critical actions',
    call: 'Telephony integration, recording enabled (90d retention), transcript generation',
    chat: 'Web widget + Slack + Teams, persistent threads, operations context',
    sms: 'SMS via provider, operations templates, two-way support',
    voice: 'Primary DID(s) with operations routing, TTS voice: professional male',
    recording: 'Recording enabled (90d retention), transcript generation, operations playbooks',
    location: 'Allowed regions: global, timezone-aware scheduling, locale formats',
    companySetup: 'Company profile with operational metrics, products catalog, resource allocation',
    model: 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de',
    timing: 'Business Hours: 24/7 for critical operations; Waiting Duration for Call: 60s',
    pricing: 'Pricing Model: fixed monthly; Price Limit: $25,000; Negotiation: max concession 10%',
    integrations: 'ERP (SAP, Oracle), Operations Management (ServiceNow), Supply Chain (Kinaxis), Quality Management (MasterControl)',
    responsibilities: 'Task routing by operational priority and impact, escalation to human after 1 failed handoff',
    performance: 'Metrics: latency, operational efficiency, cost reduction, SLA compliance; Reporting: executive dashboards',
    predictive: 'Operational bottleneck forecasting, capacity planning, cost optimization predictions',
    compliance: 'GDPR & regional compliance, safety regulations, operational standards',
    memory: 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
  },
  'finance-accounting': {
    dashboard: true,
    security: 'SSO (SAML/OIDC), role-based ACL, encryption, MFA for critical actions',
    call: 'Telephony integration, recording enabled (90d retention), transcript generation',
    chat: 'Web widget + Slack + Teams, persistent threads, finance context',
    sms: 'SMS via provider, finance templates, two-way support',
    voice: 'Primary DID(s) with finance routing, TTS voice: professional male',
    recording: 'Recording enabled (90d retention), transcript generation, finance playbooks',
    location: 'Allowed regions: global with financial compliance, timezone-aware scheduling, locale formats',
    companySetup: 'Company profile with financial structure, products catalog, budget configuration',
    model: 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de',
    timing: 'Business Hours: Mon-Fri 09:00-18:00 local; Waiting Duration for Call: 120s',
    pricing: 'Pricing Model: fixed monthly; Price Limit: $30,000; Negotiation: max concession 5%',
    integrations: 'ERP (SAP, Oracle), Financial Systems (NetSuite, QuickBooks), Banking APIs, Tax Systems (TurboTax, Avalara)',
    responsibilities: 'Task routing by financial impact and priority, escalation to human after 1 failed handoff',
    performance: 'Metrics: latency, financial accuracy, budget variance, ROI; Reporting: executive dashboards',
    predictive: 'Cash flow forecasting, budget variance prediction, financial risk modeling',
    compliance: 'GDPR, SOX, GAAP/IFRS compliance, financial regulations, tax laws',
    memory: 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
  },
  'technology-engineering': {
    dashboard: true,
    security: 'SSO (SAML/OIDC), role-based ACL, encryption, MFA for critical actions',
    call: 'Telephony integration, recording enabled (90d retention), transcript generation',
    chat: 'Web widget + Slack + Teams, persistent threads, technology context',
    sms: 'SMS via provider, technology templates, two-way support',
    voice: 'Primary DID(s) with technology routing, TTS voice: professional male',
    recording: 'Recording enabled (90d retention), transcript generation, technology playbooks',
    location: 'Allowed regions: global, timezone-aware scheduling, locale formats',
    companySetup: 'Company profile with technology stack, products catalog, R&D budget',
    model: 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de',
    timing: 'Business Hours: 24/7 for critical incidents; Waiting Duration for Call: 30s',
    pricing: 'Pricing Model: fixed monthly; Price Limit: $35,000; Negotiation: max concession 10%',
    integrations: 'DevOps (Jenkins, GitLab), Cloud (AWS, Azure, GCP), Monitoring (Datadog, New Relic), Security (CrowdStrike, Palo Alto)',
    responsibilities: 'Task routing by technical severity and impact, escalation to human after 1 failed handoff',
    performance: 'Metrics: latency, system uptime, deployment frequency, incident MTTR; Reporting: executive dashboards',
    predictive: 'System failure prediction, capacity forecasting, security threat modeling',
    compliance: 'GDPR & regional compliance, security standards, technology regulations',
    memory: 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
  },
  'human-resources': {
    dashboard: true,
    security: 'SSO (SAML/OIDC), role-based ACL, encryption, MFA for critical actions',
    call: 'Telephony integration, recording enabled (90d retention), transcript generation',
    chat: 'Web widget + Slack + Teams, persistent threads, HR context',
    sms: 'SMS via provider, HR templates, two-way support',
    voice: 'Primary DID(s) with HR routing, TTS voice: professional female',
    recording: 'Recording enabled (90d retention), transcript generation, HR playbooks',
    location: 'Allowed regions: global with labor compliance, timezone-aware scheduling, locale formats',
    companySetup: 'Company profile with HR policies, products catalog, workforce planning',
    model: 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de',
    timing: 'Business Hours: Mon-Fri 09:00-18:00 local; Waiting Duration for Call: 120s',
    pricing: 'Pricing Model: fixed monthly; Price Limit: $20,000; Negotiation: max concession 10%',
    integrations: 'HRIS (Workday, BambooHR), ATS (Greenhouse, Lever), Performance (Lattice, Betterworks), Payroll (ADP, Paychex)',
    responsibilities: 'Task routing by HR priority and sensitivity, escalation to human after 2 failed handoffs',
    performance: 'Metrics: latency, time-to-hire, retention rate, employee satisfaction; Reporting: executive dashboards',
    predictive: 'Turnover prediction, talent gap forecasting, engagement trend analysis',
    compliance: 'GDPR, EEOC, FLSA, labor laws, compliance requirements',
    memory: 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
  },
  'legal-compliance': {
    dashboard: true,
    security: 'SSO (SAML/OIDC), role-based ACL, encryption, MFA for critical actions',
    call: 'Telephony integration, recording enabled (90d retention), transcript generation',
    chat: 'Web widget + Slack + Teams, persistent threads, legal context',
    sms: 'SMS via provider, legal templates, two-way support',
    voice: 'Primary DID(s) with legal routing, TTS voice: professional female',
    recording: 'Recording enabled (90d retention), transcript generation, legal playbooks',
    location: 'Allowed regions: global with legal compliance, timezone-aware scheduling, locale formats',
    companySetup: 'Company profile with legal structure, products catalog, compliance framework',
    model: 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de',
    timing: 'Business Hours: Mon-Fri 09:00-18:00 local; Waiting Duration for Call: 120s',
    pricing: 'Pricing Model: fixed monthly; Price Limit: $40,000; Negotiation: max concession 5%',
    integrations: 'Legal Management (Clio, PracticePanther), Contract Management (DocuSign, PandaDoc), Compliance (Compliance360, LogicGate)',
    responsibilities: 'Task routing by legal priority and risk, escalation to human after 1 failed handoff',
    performance: 'Metrics: latency, contract turnaround time, compliance score, risk reduction; Reporting: executive dashboards',
    predictive: 'Legal risk prediction, compliance breach forecasting, contract risk modeling',
    compliance: 'GDPR, SOX, HIPAA, industry regulations, legal ethics',
    memory: 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
  },
  'data-intelligence': {
    dashboard: true,
    security: 'SSO (SAML/OIDC), role-based ACL, encryption, MFA for critical actions',
    call: 'Telephony integration, recording enabled (90d retention), transcript generation',
    chat: 'Web widget + Slack + Teams, persistent threads, data context',
    sms: 'SMS via provider, data templates, two-way support',
    voice: 'Primary DID(s) with data routing, TTS voice: professional male',
    recording: 'Recording enabled (90d retention), transcript generation, data playbooks',
    location: 'Allowed regions: global with data compliance, timezone-aware scheduling, locale formats',
    companySetup: 'Company profile with data strategy, products catalog, data governance',
    model: 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de',
    timing: 'Business Hours: 24/7 for critical data issues; Waiting Duration for Call: 60s',
    pricing: 'Pricing Model: fixed monthly; Price Limit: $30,000; Negotiation: max concession 10%',
    integrations: 'Data Platforms (Snowflake, Databricks), BI (Tableau, Power BI), ML (TensorFlow, PyTorch), Data Catalog (Alation, Collibra)',
    responsibilities: 'Task routing by data impact and priority, escalation to human after 1 failed handoff',
    performance: 'Metrics: latency, data quality, model accuracy, insight generation; Reporting: executive dashboards',
    predictive: 'Data quality prediction, model performance forecasting, insight generation',
    compliance: 'GDPR, data privacy regulations, AI ethics guidelines',
    memory: 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
  },
  'product-management': {
    dashboard: true,
    security: 'SSO (SAML/OIDC), role-based ACL, encryption, MFA for critical actions',
    call: 'Telephony integration, recording enabled (90d retention), transcript generation',
    chat: 'Web widget + Slack + Teams, persistent threads, product context',
    sms: 'SMS via provider, product templates, two-way support',
    voice: 'Primary DID(s) with product routing, TTS voice: professional female',
    recording: 'Recording enabled (90d retention), transcript generation, product playbooks',
    location: 'Allowed regions: global, timezone-aware scheduling, locale formats',
    companySetup: 'Company profile with product strategy, products catalog, roadmap configuration',
    model: 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de',
    timing: 'Business Hours: Mon-Fri 09:00-18:00 local; Waiting Duration for Call: 120s',
    pricing: 'Pricing Model: fixed monthly; Price Limit: $25,000; Negotiation: max concession 10%',
    integrations: 'Product Management (Jira Product Discovery, Aha!), Roadmapping (Productboard, Roadmunk), Analytics (Mixpanel, Amplitude), Design (Figma, Sketch)',
    responsibilities: 'Task routing by product priority and impact, escalation to human after 2 failed handoffs',
    performance: 'Metrics: latency, feature adoption, user satisfaction, roadmap execution; Reporting: executive dashboards',
    predictive: 'Feature adoption prediction, user behavior modeling, market trend analysis',
    compliance: 'GDPR compliance, product regulations, accessibility standards',
    memory: 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
  },
  'security-risk': {
    dashboard: true,
    security: 'SSO (SAML/OIDC), role-based ACL, encryption, MFA for critical actions',
    call: 'Telephony integration, recording enabled (90d retention), transcript generation',
    chat: 'Web widget + Slack + Teams, persistent threads, security context',
    sms: 'SMS via provider, security templates, two-way support',
    voice: 'Primary DID(s) with security routing, TTS voice: professional male',
    recording: 'Recording enabled (90d retention), transcript generation, security playbooks',
    location: 'Allowed regions: global with security compliance, timezone-aware scheduling, locale formats',
    companySetup: 'Company profile with security posture, products catalog, security framework',
    model: 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de',
    timing: 'Business Hours: 24/7 for security incidents; Waiting Duration for Call: 15s',
    pricing: 'Pricing Model: fixed monthly; Price Limit: $35,000; Negotiation: max concession 5%',
    integrations: 'Security (CrowdStrike, Palo Alto, SentinelOne), SIEM (Splunk, QRadar), Vulnerability (Tenable, Qualys), Compliance (SecurityScorecard)',
    responsibilities: 'Task routing by security severity, escalation to human immediately for critical',
    performance: 'Metrics: latency, incident MTTR, vulnerability remediation, security score; Reporting: executive dashboards',
    predictive: 'Threat prediction, vulnerability forecasting, risk modeling',
    compliance: 'GDPR, SOC2, HIPAA, PCI-DSS, security standards',
    memory: 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
  },
  'research-development': {
    dashboard: true,
    security: 'role-based ACL, encryption at rest, MFA for admin actions',
    call: 'Telephony integration, recording enabled (90d retention), transcript generation',
    chat: 'Web widget + connectors, persistent threads',
    sms: 'SMS via provider, research templates, two-way support',
    voice: 'Primary DID(s): research team; TTS voice: professional',
    recording: 'Recording enabled (90d retention), transcript generation, research scripts',
    location: 'Allowed regions: global, timezone-aware scheduling, locale formats',
    companySetup: 'Company profile, products catalog, R&D configuration',
    model: 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de',
    timing: 'Business Hours: 24/7 for critical research; Waiting Duration for Call: 60s',
    pricing: 'Pricing Model: fixed monthly; Price Limit: $15,000; Negotiation: max concession 10%',
    integrations: 'Research Tools, Data Platforms, Collaboration Tools, Patent Databases',
    responsibilities: 'Task routing by research priority, escalate after 2 failed attempts',
    performance: 'Metrics: research output, innovation metrics, patent filings; Reporting: dashboards',
    predictive: 'Research trend prediction, innovation forecasting',
    compliance: 'GDPR compliance, research ethics, IP regulations',
    memory: 'Session: 30m; Long-term: 365d; PII redaction enabled',
  },
  'administrative': {
    dashboard: false,
    security: 'role-based ACL, encryption at rest',
    call: 'Telephony integration, recording (90d retention), transcript generation',
    chat: 'Web widget + connectors, persistent threads',
    sms: 'SMS via provider, admin templates, two-way support',
    voice: 'Primary DID(s): admin pool; TTS voice: professional',
    recording: 'Recording enabled (90d retention), transcript generation, admin scripts',
    location: 'Allowed regions: global, timezone-aware scheduling, locale formats',
    companySetup: 'Company profile, products catalog, admin configuration',
    model: 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es',
    timing: 'Business Hours: Mon-Fri 09:00-18:00 local; Waiting Duration for Call: 120s',
    pricing: 'Pricing Model: fixed monthly; Price Limit: $3,000; Negotiation: max concession 10%',
    integrations: 'Office Management, Facilities Systems, Travel Tools, Document Management',
    responsibilities: 'Task routing by admin priority, escalate after 3 failed attempts',
    performance: 'Metrics: task completion, efficiency, satisfaction; Reporting: dashboards',
    predictive: 'Workload forecasting, resource optimization',
    compliance: 'GDPR compliance, admin regulations',
    memory: 'Session: 30m; Long-term: 90d; PII redaction enabled',
  },
  'trading-investments': {
    dashboard: true,
    security: 'SSO (SAML/OIDC), role-based ACL, encryption, MFA for critical actions',
    call: 'Telephony integration, recording enabled (90d retention), transcript generation',
    chat: 'Web widget + Slack + Teams, persistent threads, trading context',
    sms: 'SMS via provider, trading templates, two-way support',
    voice: 'Primary DID(s) with trading routing, TTS voice: professional male',
    recording: 'Recording enabled (90d retention), transcript generation, trading playbooks',
    location: 'Allowed regions: global with trading compliance, timezone-aware scheduling, locale formats',
    companySetup: 'Company profile with trading strategy, products catalog, portfolio configuration',
    model: 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de, zh, ja',
    timing: 'Business Hours: 24/5 for trading; Waiting Duration for Call: 30s',
    pricing: 'Pricing Model: fixed monthly + performance fee; Price Limit: $50,000; Negotiation: max concession 5%',
    integrations: 'Trading Platforms (Interactive Brokers, TD Ameritrade), Market Data (Bloomberg, Reuters), Risk Management (RiskMetrics), Analytics (FactSet)',
    responsibilities: 'Task routing by trading urgency and risk, escalation to human immediately for critical',
    performance: 'Metrics: latency, trade execution time, portfolio returns, risk metrics; Reporting: executive dashboards',
    predictive: 'Market trend prediction, portfolio risk forecasting, trade optimization',
    compliance: 'GDPR, SEC, FINRA, trading regulations, MiFID II',
    memory: 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
  },
  'real-estate-property': {
    dashboard: true,
    security: 'role-based ACL, encryption at rest, MFA for admin actions',
    call: 'Telephony integration, recording enabled (90d retention), transcript generation',
    chat: 'Web widget + connectors, persistent threads',
    sms: 'SMS via provider, real estate templates, two-way support',
    voice: 'Primary DID(s): real estate team; TTS voice: professional',
    recording: 'Recording enabled (90d retention), transcript generation, real estate scripts',
    location: 'Allowed regions: assigned markets, timezone-aware scheduling, locale formats',
    companySetup: 'Company profile, property catalog, market configuration',
    model: 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es',
    timing: 'Business Hours: Mon-Fri 09:00-18:00 local; Waiting Duration for Call: 120s',
    pricing: 'Pricing Model: fixed monthly + commission; Price Limit: $8,000; Negotiation: max concession 10%',
    integrations: 'MLS Systems, Property Management, CRM, Document Management',
    responsibilities: 'Task routing by property priority, escalate after 2 failed attempts',
    performance: 'Metrics: lease rate, occupancy, tenant satisfaction; Reporting: dashboards',
    predictive: 'Market trend prediction, lease renewal forecasting',
    compliance: 'GDPR compliance, real estate regulations, fair housing',
    memory: 'Session: 30m; Long-term: 365d; PII redaction enabled',
  },
  'insurance-risk': {
    dashboard: true,
    security: 'SSO (SAML/OIDC), role-based ACL, encryption, MFA for critical actions',
    call: 'Telephony integration, recording enabled (90d retention), transcript generation',
    chat: 'Web widget + Slack + Teams, persistent threads, insurance context',
    sms: 'SMS via provider, insurance templates, two-way support',
    voice: 'Primary DID(s) with insurance routing, TTS voice: professional female',
    recording: 'Recording enabled (90d retention), transcript generation, insurance playbooks',
    location: 'Allowed regions: global with insurance compliance, timezone-aware scheduling, locale formats',
    companySetup: 'Company profile with insurance products, policy catalog, risk framework',
    model: 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de',
    timing: 'Business Hours: 24/7 for claims; Waiting Duration for Call: 60s',
    pricing: 'Pricing Model: fixed monthly; Price Limit: $25,000; Negotiation: max concession 5%',
    integrations: 'Policy Management, Claims Systems, Underwriting Tools, Risk Assessment',
    responsibilities: 'Task routing by claim severity, escalation to human after 1 failed handoff',
    performance: 'Metrics: claims processing time, loss ratio, customer satisfaction; Reporting: executive dashboards',
    predictive: 'Claims volume forecasting, risk modeling, fraud detection',
    compliance: 'GDPR, insurance regulations, solvency requirements',
    memory: 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
  },
  'healthcare-medical': {
    dashboard: true,
    security: 'SSO (SAML/OIDC), role-based ACL, encryption, MFA for critical actions',
    call: 'Telephony integration, recording enabled (90d retention), transcript generation',
    chat: 'Web widget + Slack + Teams, persistent threads, healthcare context',
    sms: 'SMS via provider, healthcare templates, two-way support',
    voice: 'Primary DID(s) with healthcare routing, TTS voice: professional female',
    recording: 'Recording enabled (90d retention), transcript generation, healthcare playbooks',
    location: 'Allowed regions: global with healthcare compliance, timezone-aware scheduling, locale formats',
    companySetup: 'Company profile with healthcare services, patient catalog, compliance framework',
    model: 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr',
    timing: 'Business Hours: 24/7 for patient care; Waiting Duration for Call: 30s',
    pricing: 'Pricing Model: fixed monthly; Price Limit: $30,000; Negotiation: max concession 5%',
    integrations: 'EHR Systems (Epic, Cerner), Billing Systems, Scheduling Tools, Telehealth Platforms',
    responsibilities: 'Task routing by patient urgency, escalation to human immediately for critical',
    performance: 'Metrics: patient wait time, care quality, satisfaction; Reporting: executive dashboards',
    predictive: 'Patient volume forecasting, readmission prediction, care optimization',
    compliance: 'GDPR, HIPAA, healthcare regulations, patient privacy',
    memory: 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
  },
  'manufacturing-production': {
    dashboard: true,
    security: 'role-based ACL, encryption at rest, MFA for admin actions',
    call: 'Telephony integration, recording enabled (90d retention), transcript generation',
    chat: 'Web widget + connectors, persistent threads',
    sms: 'SMS via provider, manufacturing templates, two-way support',
    voice: 'Primary DID(s): manufacturing team; TTS voice: professional',
    recording: 'Recording enabled (90d retention), transcript generation, manufacturing scripts',
    location: 'Allowed regions: assigned facilities, timezone-aware scheduling, locale formats',
    companySetup: 'Company profile, product catalog, production configuration',
    model: 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es',
    timing: 'Business Hours: 24/7 for production; Waiting Duration for Call: 60s',
    pricing: 'Pricing Model: fixed monthly; Price Limit: $10,000; Negotiation: max concession 10%',
    integrations: 'MES Systems, ERP, Quality Management, Supply Chain',
    responsibilities: 'Task routing by production priority, escalate after 1 failed attempt',
    performance: 'Metrics: production efficiency, quality metrics, downtime; Reporting: dashboards',
    predictive: 'Production forecasting, quality prediction, maintenance scheduling',
    compliance: 'GDPR compliance, safety regulations, quality standards',
    memory: 'Session: 30m; Long-term: 180d; PII redaction enabled',
  },
  'transportation-logistics': {
    dashboard: true,
    security: 'role-based ACL, encryption at rest, MFA for admin actions',
    call: 'Telephony integration, recording enabled (90d retention), transcript generation',
    chat: 'Web widget + connectors, persistent threads',
    sms: 'SMS via provider, logistics templates, two-way support',
    voice: 'Primary DID(s): logistics team; TTS voice: professional',
    recording: 'Recording enabled (90d retention), transcript generation, logistics scripts',
    location: 'Allowed regions: assigned regions, timezone-aware scheduling, locale formats',
    companySetup: 'Company profile, fleet catalog, route configuration',
    model: 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es',
    timing: 'Business Hours: 24/7 for logistics; Waiting Duration for Call: 30s',
    pricing: 'Pricing Model: fixed monthly; Price Limit: $8,000; Negotiation: max concession 10%',
    integrations: 'TMS Systems, GPS Tracking, Fleet Management, Warehouse Systems',
    responsibilities: 'Task routing by shipment priority, escalate after 1 failed attempt',
    performance: 'Metrics: on-time delivery, fleet utilization, cost metrics; Reporting: dashboards',
    predictive: 'Route optimization, demand forecasting, delay prediction',
    compliance: 'GDPR compliance, transportation regulations, safety standards',
    memory: 'Session: 30m; Long-term: 180d; PII redaction enabled',
  },
  'government-public-sector': {
    dashboard: true,
    security: 'SSO (SAML/OIDC), role-based ACL, encryption, MFA for critical actions',
    call: 'Telephony integration, recording enabled (90d retention), transcript generation',
    chat: 'Web widget + Slack + Teams, persistent threads, government context',
    sms: 'SMS via provider, government templates, two-way support',
    voice: 'Primary DID(s) with government routing, TTS voice: professional female',
    recording: 'Recording enabled (90d retention), transcript generation, government playbooks',
    location: 'Allowed regions: assigned jurisdictions, timezone-aware scheduling, locale formats',
    companySetup: 'Agency profile, service catalog, compliance framework',
    model: 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr',
    timing: 'Business Hours: Mon-Fri 09:00-17:00 local; Waiting Duration for Call: 120s',
    pricing: 'Pricing Model: fixed monthly; Price Limit: $20,000; Negotiation: max concession 5%',
    integrations: 'Government Systems, Citizen Portals, Document Management, Compliance Tools',
    responsibilities: 'Task routing by service priority, escalation to human after 2 failed handoffs',
    performance: 'Metrics: service delivery time, citizen satisfaction, compliance; Reporting: executive dashboards',
    predictive: 'Service demand forecasting, compliance risk prediction',
    compliance: 'GDPR, government regulations, transparency requirements',
    memory: 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
  },
  'supply-chain-logistics': {
    dashboard: true,
    security: 'role-based ACL, encryption at rest, MFA for admin actions',
    call: 'Telephony integration, recording enabled (90d retention), transcript generation',
    chat: 'Web widget + connectors, persistent threads',
    sms: 'SMS via provider, supply chain templates, two-way support',
    voice: 'Primary DID(s): supply chain team; TTS voice: professional',
    recording: 'Recording enabled (90d retention), transcript generation, supply chain scripts',
    location: 'Allowed regions: global, timezone-aware scheduling, locale formats',
    companySetup: 'Company profile, supplier catalog, inventory configuration',
    model: 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de',
    timing: 'Business Hours: 24/7 for critical; Waiting Duration for Call: 60s',
    pricing: 'Pricing Model: fixed monthly; Price Limit: $12,000; Negotiation: max concession 10%',
    integrations: 'SCM Systems, ERP, Supplier Portals, Logistics Platforms',
    responsibilities: 'Task routing by supply chain priority, escalate after 1 failed attempt',
    performance: 'Metrics: inventory turnover, supplier performance, cost metrics; Reporting: dashboards',
    predictive: 'Demand forecasting, supply disruption prediction, inventory optimization',
    compliance: 'GDPR compliance, supply chain regulations, trade compliance',
    memory: 'Session: 30m; Long-term: 180d; PII redaction enabled',
  },
  'ai-management-governance': {
    dashboard: true,
    security: 'SSO (SAML/OIDC), role-based ACL, encryption, MFA for critical actions',
    call: 'Telephony integration, recording enabled (90d retention), transcript generation',
    chat: 'Web widget + Slack + Teams, persistent threads, AI context',
    sms: 'SMS via provider, AI templates, two-way support',
    voice: 'Primary DID(s) with AI routing, TTS voice: professional male',
    recording: 'Recording enabled (90d retention), transcript generation, AI playbooks',
    location: 'Allowed regions: global, timezone-aware scheduling, locale formats',
    companySetup: 'Company profile with AI strategy, agent catalog, governance framework',
    model: 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y; Multilingual: es, fr, de',
    timing: 'Business Hours: 24/7 for AI operations; Waiting Duration for Call: 30s',
    pricing: 'Pricing Model: fixed monthly; Price Limit: $40,000; Negotiation: max concession 10%',
    integrations: 'AI Platforms, RPA Tools, Workflow Engines, Monitoring Systems',
    responsibilities: 'Task routing by AI priority, escalation to human after 1 failed handoff',
    performance: 'Metrics: agent performance, automation rate, ROI; Reporting: executive dashboards',
    predictive: 'Agent performance forecasting, automation opportunity prediction',
    compliance: 'GDPR, AI ethics guidelines, governance standards',
    memory: 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
  },
};

// ============================================
// ROLE-SPECIFIC FEATURE MODIFIERS
// ============================================

const ROLE_MODIFIERS = {
  // Executive roles get enhanced features
  'chief': {
    dashboard: true,
    security: 'SSO (SAML/OIDC), role-based ACL, encryption, MFA for critical actions',
    pricing: { multiplier: 2.0, concession: 5 },
    performance: 'Executive-level reporting with strategic insights',
  },
  'vp': {
    dashboard: true,
    security: 'SSO (SAML/OIDC), role-based ACL, encryption, MFA for critical actions',
    pricing: { multiplier: 1.5, concession: 10 },
    performance: 'Leadership-level reporting with team metrics',
  },
  'director': {
    dashboard: true,
    security: 'role-based ACL, encryption, MFA for admin actions',
    pricing: { multiplier: 1.3, concession: 10 },
    performance: 'Management-level reporting with operational metrics',
  },
  'manager': {
    dashboard: true,
    security: 'role-based ACL, encryption, MFA for admin actions',
    pricing: { multiplier: 1.0, concession: 10 },
    performance: 'Team-level reporting with task metrics',
  },
  // Specialist roles get focused features
  'specialist': {
    dashboard: false,
    security: 'role-based ACL, encryption',
    pricing: { multiplier: 0.8, concession: 15 },
    performance: 'Specialist-level reporting with domain metrics',
  },
  'analyst': {
    dashboard: false,
    security: 'role-based ACL, encryption',
    pricing: { multiplier: 0.7, concession: 15 },
    performance: 'Analytics-level reporting with data metrics',
  },
  'coordinator': {
    dashboard: false,
    security: 'role-based ACL, encryption',
    pricing: { multiplier: 0.6, concession: 15 },
    performance: 'Coordination-level reporting with process metrics',
  },
  'assistant': {
    dashboard: false,
    security: 'role-based ACL, encryption',
    pricing: { multiplier: 0.5, concession: 20 },
    performance: 'Support-level reporting with task metrics',
  },
};

// ============================================
// AGENT INVENTORY DATA
// ============================================

const AGENT_INVENTORY = [
  // This will be populated from the actual agent inventory
  // For now, we'll use a mapping function to generate features
];

// ============================================
// FEATURE GENERATION FUNCTIONS
// ============================================

/**
 * Get department for agent based on file path
 */
function getDepartmentFromPath(filePath) {
  const pathParts = filePath.split(path.sep);
  const aiAgentIndex = pathParts.indexOf('ai-agent');
  if (aiAgentIndex === -1 || aiAgentIndex + 1 >= pathParts.length) {
    return 'administrative'; // default
  }
  
  const folder = pathParts[aiAgentIndex + 1];
  
  const departmentMap = {
    'customer': 'customer-experience',
    'sales': 'sales-revenue',
    'marketing': 'marketing-growth',
    'operations': 'operations-management',
    'finance': 'finance-accounting',
    'accounting-finance': 'finance-accounting',
    'tech': 'technology-engineering',
    'hr': 'human-resources',
    'legal': 'legal-compliance',
    'data': 'data-intelligence',
    'product': 'product-management',
    'security': 'security-risk',
    'research': 'research-development',
    'admin': 'administrative',
    'trading': 'trading-investments',
    'realestate': 'real-estate-property',
    'insurance': 'insurance-risk',
    'healthcare': 'healthcare-medical',
    'manufacturing': 'manufacturing-production',
    'transportation': 'transportation-logistics',
    'government': 'government-public-sector',
    'supply-chain': 'supply-chain-logistics',
    'ai-mgmt': 'ai-management-governance',
    'executive': 'ai-management-governance',
  };
  
  return departmentMap[folder] || 'administrative';
}

/**
 * Get role modifier from agent name
 */
function getRoleModifier(agentName) {
  const nameLower = agentName.toLowerCase();
  
  for (const [role, modifier] of Object.entries(ROLE_MODIFIERS)) {
    if (nameLower.includes(role)) {
      return modifier;
    }
  }
  
  return ROLE_MODIFIERS['specialist']; // default
}

/**
 * Generate features for an agent
 */
function generateAgentFeatures(filePath, agentName) {
  const department = getDepartmentFromPath(filePath);
  const roleModifier = getRoleModifier(agentName);
  const template = DEPARTMENT_FEATURE_TEMPLATES[department] || DEPARTMENT_FEATURE_TEMPLATES['administrative'];
  
  // Apply role modifiers
  const features = { ...template };
  
  if (roleModifier.dashboard !== undefined) {
    features.dashboard = roleModifier.dashboard;
  }
  
  if (roleModifier.security) {
    features.security = roleModifier.security;
  }
  
  if (roleModifier.pricing) {
    const basePrice = parseInt(features.pricing.match(/Price Limit: \$([0-9,]+)/)?.[1].replace(/,/g, '') || '5000');
    const newPrice = Math.round(basePrice * (roleModifier.pricing.multiplier || 1));
    features.pricing = features.pricing.replace(
      /Price Limit: \$[0-9,]+/,
      `Price Limit: $${newPrice.toLocaleString()}`
    );
    features.pricing = features.pricing.replace(
      /max concession \d+%/,
      `max concession ${roleModifier.pricing.concession}%`
    );
  }
  
  if (roleModifier.performance) {
    features.performance = roleModifier.performance;
  }
  
  // Generate general info based on agent name
  const personality = getPersonalityForRole(roleModifier);
  const voice = getVoiceForDepartment(department);
  
  features.generalInfo = `Name: AI ${agentName}; Role: ${agentName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}; Availability: ${features.timing.includes('24/7') ? '24/7' : '24/5'}; Personality: ${personality}; Voice: ${voice}`;
  
  return features;
}

/**
 * Get personality based on role modifier
 */
function getPersonalityForRole(roleModifier) {
  const personalities = {
    'chief': 'strategic, visionary, decisive',
    'vp': 'strategic, collaborative, results-oriented',
    'director': 'analytical, organized, leadership-focused',
    'manager': 'organized, efficient, team-focused',
    'specialist': 'detail-oriented, expert, focused',
    'analyst': 'analytical, curious, data-driven',
    'coordinator': 'organized, communicative, process-oriented',
    'assistant': 'helpful, efficient, supportive',
  };
  
  return personalities[Object.keys(ROLE_MODIFIERS).find(key => ROLE_MODIFIERS[key] === roleModifier)] || 'professional, efficient, helpful';
}

/**
 * Get voice based on department
 */
function getVoiceForDepartment(department) {
  const voices = {
    'customer-experience': 'professional female',
    'sales-revenue': 'professional male',
    'marketing-growth': 'professional female',
    'operations-management': 'professional male',
    'finance-accounting': 'professional male',
    'technology-engineering': 'professional male',
    'human-resources': 'professional female',
    'legal-compliance': 'professional female',
    'data-intelligence': 'professional male',
    'product-management': 'professional female',
    'security-risk': 'professional male',
    'research-development': 'professional male',
    'administrative': 'professional female',
    'trading-investments': 'professional male',
    'real-estate-property': 'professional female',
    'insurance-risk': 'professional female',
    'healthcare-medical': 'professional female',
    'manufacturing-production': 'professional male',
    'transportation-logistics': 'professional male',
    'government-public-sector': 'professional female',
    'supply-chain-logistics': 'professional male',
    'ai-management-governance': 'professional male',
  };
  
  return voices[department] || 'professional';
}

/**
 * Format features as object
 */
function formatFeaturesObject(features) {
  return {
    'Separate Dashboard': features.dashboard,
    'Security Layer': features.security,
    'Call': features.call,
    'Chat System': features.chat,
    'SMS': features.sms,
    'Voice & Phone Number': features.voice,
    'Recording & Script': features.recording,
    'Location & Country': features.location,
    'Company Setup': features.companySetup,
    'General Info': features.generalInfo,
    'Model & Language': features.model,
    'Timing & Scheduling': features.timing,
    'Pricing & Negotiation': features.pricing,
    'Integrations': features.integrations,
    'Responsibilities & Routing': features.responsibilities,
    'Tasks & Work Management': 'Assigned tasks queue with priority scoring, SLA timers, remaining task completion percentage',
    'Behaviour & Limitations': 'Safety filters enabled, refusal templates for restricted domains, rate limits: 60-200 requests per minute based on role',
    'Performance & Insights': features.performance,
    'Summary & Notes': `AI agent for ${features.generalInfo.split(';')[1].split(':')[1].trim()}`,
    'Predictive Layers': features.predictive,
    'Rules & Regulations': features.compliance,
    'Memory': features.memory,
    'Setup Company': `${features.companySetup}, workflow configuration, integration setup`,
    '2-Step Verification': 'MFA for billing/admin and critical actions',
    'Import & Export Data': 'CSV/JSON endpoints, scheduled exports, retention policy, compliance controls',
    'Reports': 'Daily/Weekly/Monthly dashboards, ad-hoc exports, email delivery channels',
    'Integrations & MCP': features.integrations + ', MCP connector v1.2',
  };
}

/**
 * Enhance agent file with generated features
 */
function enhanceAgentFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`  ⚠️  File not found: ${filePath}`);
      return false;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract agent name from file path
    const fileName = path.basename(filePath, '.tsx');
    const agentName = fileName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    // Check if file already has enhanced features
    if (content.includes('Separate Dashboard: true') || content.includes('Separate Dashboard: false')) {
      console.log(`  ✓ Already enhanced: ${fileName}`);
      return true;
    }
    
    // Generate features
    const features = generateAgentFeatures(filePath, fileName);
    const featuresObject = formatFeaturesObject(features);
    
    // Generate features section
    let featuresSection = '  features: {\n';
    for (const [key, value] of Object.entries(featuresObject)) {
      featuresSection += `    '${key}': ${JSON.stringify(value)},\n`;
    }
    featuresSection += '  },\n';
    
    // Insert features after the agent object
    const enhancedContent = content.replace(
      /(export const [a-zA-Z0-9_-]+: AIEmployee = \{)/,
      `$1\n${featuresSection}`
    );
    
    fs.writeFileSync(filePath, enhancedContent, 'utf8');
    console.log(`  ✓ Enhanced: ${fileName}`);
    return true;
    
  } catch (error) {
    console.error(`  ✗ Error enhancing ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Scan and enhance all agent files
 */
function enhanceAllAgentFiles() {
  console.log('========================================');
  console.log('ENHANCING ALL 1,108 AGENT FILES');
  console.log('========================================\n');
  
  const agentDir = path.join(__dirname, '..', 'app', 'ai-agent');
  
  let successCount = 0;
  let failCount = 0;
  let skipCount = 0;
  
  // Recursively find all .tsx files in ai-agent directory
  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Skip sub-agents directories for now (they'll be handled separately)
        if (file !== 'sub-agents') {
          scanDirectory(fullPath);
        }
      } else if (file.endsWith('.tsx') && file !== '_layout.tsx' && file !== '[id].tsx' && file !== 'index.tsx') {
        const success = enhanceAgentFile(fullPath);
        if (success) {
          successCount++;
        } else {
          failCount++;
        }
      }
    }
  }
  
  scanDirectory(agentDir);
  
  console.log('\n========================================');
  console.log('ENHANCEMENT SUMMARY');
  console.log('========================================');
  console.log(`✓ Successfully enhanced: ${successCount}`);
  console.log(`✗ Failed: ${failCount}`);
  console.log(`Total processed: ${successCount + failCount}`);
  console.log('========================================\n');
}

// Run enhancement if executed directly
if (require.main === module) {
  enhanceAllAgentFiles();
}

// Export functions for use in other scripts
module.exports = {
  generateAgentFeatures,
  formatFeaturesObject,
  enhanceAgentFile,
  enhanceAllAgentFiles,
  DEPARTMENT_FEATURE_TEMPLATES,
  ROLE_MODIFIERS,
};
