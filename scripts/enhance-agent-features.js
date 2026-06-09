/**
 * Agent Feature Enhancement Script
 * Scans all 1,108 agents and adds comprehensive features and options
 * for main and sub agents in the KAYTX AI WORKFORCE file
 */

const fs = require('fs');
const path = require('path');

// Comprehensive feature template based on agent role
const featureTemplates = {
  // Executive Level Agents (C-suite, VPs)
  executive: {
    separateDashboard: true,
    securityLayer: 'SSO (SAML/OIDC), role-based ACL, encryption at rest/in transit, MFA for admin actions',
    call: 'Twilio PSTN integration, IVR menu, call routing rules, call recording enabled (90-day retention), transcriptions',
    chatSystem: 'Web widget + Slack + Intercom + Microsoft Teams connectors, persistent conversation threads, transcripts export',
    sms: 'Twilio SMS number, templated messages, two-way support, opt-out handling',
    voice: 'Primary DID(s), TTS voice selection, failover numbers, geo-routing',
    recording: 'Auto-recording with consent logging, transcript generation, script templates per flow',
    location: 'Allowed regions (US, EU, APAC), timezone-aware scheduling, locale formats',
    companySetup: 'Company profile, products catalog, pricing tiers, negotiation rule templates',
    model: 'LLM-X v2 (primary en-US), fallbacks LLM-Y, multilingual support (es, fr, de, zh)',
    timing: 'Business Hours (Mon-Fri 09:00-18:00 local), Waiting Duration for Call: 120s, calendar integrations',
    pricing: 'Pricing Model: fixed monthly + per-minute; Price Limit: $10000; auto-negotiation rules (max concession 15%)',
    integrations: 'CRM (Salesforce, HubSpot), Tickets (Zendesk), Calendar (Google/Outlook), Telephony (Twilio), MCP connector v2.0',
    responsibilities: 'Task routing by intent, escalation path to human after 3 failed handoffs, SLA enforcement',
    tasks: 'Assigned tasks queue, SLA timers, remaining task completion percentage',
    behaviour: 'Safety filters enabled, refusal templates for restricted domains (legal/medical/financial), rate limits: 120 req/min',
    performance: 'Metrics: latency, resolution rate, CSAT/NPS; Reporting: dashboards + scheduled reports (daily/weekly/monthly)',
    predictive: 'Forecasting models for department-specific KPIs, anomaly detection with configurable triggers',
    regulations: 'GDPR, SOC2, HIPAA (where applicable), data residency constraints, consent policies',
    memory: 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
    setup: 'Onboarding flow, product/pricing setup, negotiation rules, training plan, KB import, voice tuning',
    verification: 'MFA for billing/admin modifications and critical flows',
    importExport: 'CSV/JSON endpoints, scheduled exports, retention policy, compliance controls',
    reports: 'Daily/Weekly/Monthly dashboards, ad-hoc exports, email delivery channels, webhook notifications'
  },
  
  // Management Level Agents (Managers, Directors)
  management: {
    separateDashboard: true,
    securityLayer: 'SSO (SAML/OIDC), role-based ACL, encryption at rest/in transit, MFA for admin actions',
    call: 'Twilio PSTN integration, IVR menu, call routing rules, call recording enabled (90-day retention), transcriptions',
    chatSystem: 'Web widget + Slack + Intercom connectors, persistent conversation threads, transcripts export',
    sms: 'Twilio SMS number, templated messages, two-way support, opt-out handling',
    voice: 'Primary DID(s), TTS voice selection, geo-routing',
    recording: 'Auto-recording with consent logging, transcript generation, script templates',
    location: 'Allowed regions (US, EU), timezone-aware scheduling, locale formats',
    companySetup: 'Company profile, products catalog, pricing templates',
    model: 'LLM-X v2 (primary en-US), fallbacks LLM-Y, multilingual support (es, fr)',
    timing: 'Business Hours (Mon-Fri 09:00-18:00 local), Waiting Duration for Call: 120s, calendar integrations',
    pricing: 'Pricing Model: fixed monthly; Price Limit: $5000; auto-negotiation rules (max concession 10%)',
    integrations: 'CRM (Salesforce, HubSpot), Tickets (Zendesk), Calendar (Google/Outlook), Telephony (Twilio), MCP connector v1.5',
    responsibilities: 'Task routing by intent, escalation path to human after 3 failed handoffs, SLA enforcement',
    tasks: 'Assigned tasks queue, SLA timers, progress metrics',
    behaviour: 'Safety filters enabled, refusal templates for restricted domains, rate limits: 90 req/min',
    performance: 'Metrics: latency, resolution rate, CSAT; Reporting: dashboards + scheduled reports',
    predictive: 'Department-specific forecasting models, anomaly detection',
    regulations: 'GDPR, SOC2, data residency constraints, consent policies',
    memory: 'Session: 30m; Long-term: 365d; PII redaction enabled; purge schedule quarterly',
    setup: 'Onboarding flow, product/pricing setup, training plan, KB import',
    verification: 'MFA for billing/admin modifications',
    importExport: 'CSV/JSON endpoints, scheduled exports, retention policy',
    reports: 'Daily/Weekly/Monthly dashboards, ad-hoc exports, email delivery'
  },
  
  // Specialist/Analyst Level Agents
  specialist: {
    separateDashboard: false,
    securityLayer: 'role-based ACL, encryption at rest/in transit',
    call: 'Telephony integration (Twilio) — routing + recording',
    chatSystem: 'Web widget + connectors (Slack/Intercom) when available',
    sms: 'SMS via configured provider (Twilio) — templated messages',
    voice: 'Primary DID(s): shared; TTS voice: default',
    recording: 'Recording enabled (90d retention); transcript generation',
    location: 'Allowed regions: global; timezone-aware scheduling',
    companySetup: 'Company profile & product/pricing templates',
    model: 'LLM-X v2; Primary: en-US; Fallbacks: LLM-Y',
    timing: 'Business Hours: Mon-Fri 09:00-17:00 local; Waiting Duration for Call: 120s',
    pricing: 'Pricing Model: TBD; Price Limit: TBD; Negotiation: max concession 10%',
    integrations: 'Department-specific tools and platforms',
    responsibilities: 'Task routing by intent; escalate to human after 2 failed handoffs',
    tasks: 'Assigned tasks queue; SLA timers; progress metrics',
    behaviour: 'Safety filters enabled; refusal templates for restricted domains; rate limits: 60 req/min',
    performance: 'Metrics: latency, accuracy, success-rate; Reporting: dashboards',
    predictive: 'Specialized forecasting models; anomaly detection',
    regulations: 'GDPR & regional compliance where applicable',
    memory: 'Session: 30m; Long-term: 365d; PII redaction enabled',
    setup: 'Company profile & product/pricing templates',
    verification: 'MFA for admin/billing actions',
    importExport: 'CSV/JSON endpoints; scheduled exports; retention policy',
    reports: 'Daily/Weekly/Monthly dashboards; ad-hoc exports'
  },
  
  // Operational/Task Level Agents (Sub-agents)
  operational: {
    separateDashboard: false,
    securityLayer: 'role-based ACL, encryption at rest',
    call: 'Telephony integration when needed',
    chatSystem: 'Web widget when available',
    sms: 'SMS via configured provider when needed',
    voice: 'Shared DID; TTS voice: default',
    recording: 'Recording enabled (30d retention)',
    location: 'Allowed regions: global',
    companySetup: 'Basic company profile',
    model: 'LLM-X v2; Primary: en-US',
    timing: 'Business Hours: 24/7; Waiting Duration for Call: 60s',
    pricing: 'Pricing Model: usage-based; auto-negotiation disabled',
    integrations: 'Core department tools',
    responsibilities: 'Task routing by intent; escalate to human after 1 failed handoff',
    tasks: 'Assigned tasks queue; progress tracking',
    behaviour: 'Safety filters enabled; rate limits: 30 req/min',
    performance: 'Metrics: latency, accuracy; Reporting: basic dashboards',
    predictive: 'Basic anomaly detection',
    regulations: 'GDPR compliance where applicable',
    memory: 'Session: 15m; Long-term: 90d; PII redaction enabled',
    setup: 'Basic onboarding',
    verification: 'MFA for critical actions',
    importExport: 'CSV/JSON endpoints',
    reports: 'Weekly dashboards'
  }
};

// Department-specific feature enhancements
const departmentEnhancements = {
  customer: {
    predictive: 'Churn prediction models, customer lifetime value forecasting, sentiment-based engagement triggers',
    integrations: 'CRM (Salesforce, HubSpot, Zendesk), Help Desk (Freshdesk, Jira), Social Media Monitoring, Live Chat (Intercom, Drift), Email Ticketing (Zendesk), Phone System (Twilio, RingCentral), Survey Platform (SurveyMonkey, Qualtrics), Analytics Dashboard (Google Analytics, Mixpanel)',
    specialized: 'Customer Journey Mapping, Sentiment Analysis, Churn Prediction, Personalization Engine, Multi-channel Support, Ticket Prioritization, Knowledge Base Management, Customer Health Scoring, Feedback Analysis, Loyalty Program Management'
  },
  sales: {
    predictive: 'Sales forecasting models, lead scoring optimization, deal velocity prediction, revenue attribution',
    integrations: 'CRM Platform (Salesforce, HubSpot, Pipedrive), Lead Generation Tools (LinkedIn Sales Navigator, ZoomInfo), Email Automation (Outreach, SalesLoft), Calendar Integration (Calendly, Chili Piper), Video Conferencing (Zoom, Teams), E-signature Tools (DocuSign, PandaDoc), Proposal Software (PandaDoc, Proposify), Sales Intelligence Platforms (Gong, Chorus)',
    specialized: 'Lead Scoring & Qualification, Pipeline Management, Sales Forecasting, Proposal Generation, Negotiation Support, CRM Data Enrichment, Competitor Analysis, Pricing Optimization, Deal Intelligence, Revenue Attribution'
  },
  marketing: {
    predictive: 'Campaign performance forecasting, audience behavior prediction, content engagement modeling, trend detection',
    integrations: 'Marketing Automation Platforms (HubSpot, Marketo, Pardot), Social Media Tools (Hootsuite, Buffer, Sprout Social), SEO Tools (SEMrush, Ahrefs, Moz), Analytics Platforms (Google Analytics 4, Adobe Analytics), Content Management Systems (WordPress, Drupal), Email Marketing Tools (Mailchimp, Constant Contact), Advertising Platforms (Google Ads, Facebook Ads Manager), Social Listening Tools (Brandwatch, Mention)',
    specialized: 'Campaign Management, Content Generation, SEO Optimization, Social Media Management, Email Marketing, A/B Testing, Audience Segmentation, Brand Monitoring, Influencer Identification, Growth Hacking'
  },
  operations: {
    predictive: 'Operational capacity forecasting, supply chain disruption prediction, quality issue detection, cost optimization',
    integrations: 'ERP Systems (SAP, Oracle, NetSuite), Project Management Tools (Asana, Monday.com, Jira), Supply Chain Platforms (Kinaxis, E2Open), Quality Management Systems (MasterControl, ETQ), Monitoring Tools (Datadog, New Relic), Incident Management (PagerDuty, VictorOps), Asset Management (ServiceNow, Asset Panda), Inventory Systems (Fishbowl, DEAR)',
    specialized: 'Process Optimization, Workflow Automation, Resource Allocation, Supply Chain Management, Quality Control, Incident Response, Capacity Planning, Performance Monitoring, Cost Optimization, Risk Mitigation'
  },
  finance: {
    predictive: 'Cash flow forecasting, budget variance prediction, financial risk modeling, investment return projection',
    integrations: 'Accounting Software (QuickBooks, Xero, Sage), ERP Systems (SAP, Oracle, NetSuite), Banking Platforms (Stripe, Plaid, Treasury Prime), Payment Processors (PayPal, Square, Adyen), Tax Software (TurboTax, TaxJar), Compliance Tools (Workiva, OneTrust), Reporting Platforms (Tableau, Power BI), Data Warehouses (Snowflake, BigQuery)',
    specialized: 'Financial Analysis, Budget Management, Forecasting, Risk Assessment, Audit Support, Compliance Monitoring, Invoice Processing, Expense Tracking, Treasury Management, Financial Reporting'
  },
  tech: {
    predictive: 'System capacity forecasting, security threat prediction, bug trend analysis, performance degradation detection',
    integrations: 'Version Control (GitHub, GitLab, Bitbucket), CI/CD Platforms (Jenkins, CircleCI, GitHub Actions), Cloud Providers (AWS, Azure, GCP), Monitoring Tools (Datadog, New Relic, Prometheus), Issue Trackers (Jira, Linear, Asana), Code Quality Tools (SonarQube, CodeClimate), Security Scanners (Snyk, Veracode), Container Platforms (Docker, Kubernetes)',
    specialized: 'Code Review, Bug Detection, System Monitoring, DevOps Automation, Security Scanning, Performance Optimization, API Integration, Infrastructure Management, Technical Documentation, Release Management'
  },
  hr: {
    predictive: 'Workforce planning forecasting, attrition risk prediction, skill gap analysis, engagement trend modeling',
    integrations: 'ATS Platforms (Greenhouse, Lever, Workday), HRIS Systems (BambooHR, Workday, Dayforce), Payroll Systems (ADP, Paychex, Gusto), Learning Management (Cornerstone, Docebo, Udemy Business), Performance Tools (Lattice, 15Five, Culture Amp), Survey Platforms (SurveyMonkey, Culture Amp), Benefits Providers (Gusto, Zenefits), Background Check Services (Checkr, GoodHire)',
    specialized: 'Resume Screening, Interview Scheduling, Onboarding, Performance Management, Employee Engagement, Policy Compliance, Training Coordination, Benefits Administration, Workforce Planning, Culture Analysis'
  },
  legal: {
    predictive: 'Litigation risk prediction, compliance breach forecasting, contract renewal modeling, regulatory change impact',
    integrations: 'Legal Research Platforms (Westlaw, LexisNexis), Contract Management (DocuSign CLM, Ironclad), Compliance Tools (OneTrust, Workiva), E-Discovery (Relativity, Everlaw), Matter Management (Clio, PracticePanther), Billing Systems (TimeSolv, Bill4Time), Document Management (NetDocuments, iManage), Court Filing Systems (TyMetrix 360E, CourtExpress)',
    specialized: 'Legal Research, Contract Review, Compliance Monitoring, Litigation Support, Intellectual Property Management, Policy Drafting, Risk Assessment, Regulatory Tracking, Document Automation, Matter Management'
  },
  data: {
    predictive: 'Data quality forecasting, model performance prediction, data volume projection, insight generation modeling',
    integrations: 'Data Warehouses (Snowflake, BigQuery, Redshift), ETL Tools (Fivetran, Airbyte, dbt), BI Platforms (Tableau, Power BI, Looker), ML Platforms (DataRobot, H2O.ai, SageMaker), Data Catalogs (Alation, Collibra), Streaming Platforms (Kafka, Kinesis), Notebooks (Jupyter, Databricks), Orchestration (Airflow, Prefect)',
    specialized: 'Data Engineering, Data Science, Machine Learning, Business Intelligence, Data Governance, Data Quality, Data Visualization, Predictive Analytics, Data Mining, Data Strategy'
  },
  security: {
    predictive: 'Security threat prediction, vulnerability risk modeling, attack pattern detection, compliance breach forecasting',
    integrations: 'SIEM Platforms (Splunk, QRadar, LogRhythm), Vulnerability Scanners (Tenable, Qualys, Rapid7), Threat Intelligence (CrowdStrike, Palo Alto, FireEye), IAM Systems (Okta, Azure AD, Ping), Penetration Testing Tools (Burp Suite, Metasploit), Compliance Tools (OneTrust, Vanta), Incident Response (Cortex, Swimlane), Cloud Security (Prisma, Wiz)',
    specialized: 'Threat Detection, Vulnerability Management, Incident Response, Security Monitoring, Compliance Management, Penetration Testing, Security Architecture, Risk Assessment, Identity Management, Security Analytics'
  }
};

// Function to determine agent level based on title
function getAgentLevel(title) {
  const executiveKeywords = ['Chief', 'C-Suite', 'CIO', 'CTO', 'CFO', 'CMO', 'COO', 'CRO', 'CISO', 'CHRO', 'CLO', 'CDO', 'CAO'];
  const vpKeywords = ['VP', 'Vice President', 'Director'];
  const managerKeywords = ['Manager', 'Lead', 'Head'];
  
  if (executiveKeywords.some(keyword => title.includes(keyword))) {
    return 'executive';
  } else if (vpKeywords.some(keyword => title.includes(keyword))) {
    return 'management';
  } else if (managerKeywords.some(keyword => title.includes(keyword))) {
    return 'management';
  } else {
    return 'specialist';
  }
}

// Function to determine department from agent ID or title
function getDepartment(agentId, title) {
  const deptMap = {
    customer: ['customer', 'cx', 'support', 'success', 'loyalty', 'receptionist', 'ticket', 'complaint', 'feedback'],
    sales: ['sales', 'revenue', 'business-development', 'channel-partners', 'crm', 'proposal', 'negotiator', 'pricing', 'forecasting'],
    marketing: ['marketing', 'brand', 'growth', 'content', 'seo', 'social-media', 'email', 'ad-campaign', 'analytics'],
    operations: ['operations', 'supply-chain', 'quality', 'facilities', 'project-management', 'workflow', 'process', 'task'],
    finance: ['finance', 'accounting', 'treasury', 'investor', 'controller', 'budget', 'tax', 'audit'],
    tech: ['tech', 'engineering', 'infrastructure', 'ai-ml', 'security-tech', 'architect', 'devops', 'frontend', 'backend', 'sre', 'qa', 'data-engineer'],
    hr: ['hr', 'talent', 'learning', 'culture', 'compensation', 'recruiting', 'employee'],
    legal: ['legal', 'compliance', 'contracts', 'intellectual-property', 'governance'],
    data: ['data', 'analytics', 'business-intelligence', 'data-science', 'ml', 'bi'],
    security: ['security', 'cybersecurity', 'risk', 'privacy', 'soc', 'incident', 'penetration'],
    product: ['product', 'ux', 'release', 'roadmap'],
    research: ['research', 'innovation', 'rd', 'patent'],
    administrative: ['admin', 'office', 'executive-assistant', 'facilities', 'travel', 'document'],
    trading: ['trading', 'investment', 'portfolio', 'equity', 'forex', 'crypto', 'derivatives', 'quant'],
    realestate: ['real-estate', 'property', 'leasing', 'facilities', 'acquisition'],
    insurance: ['insurance', 'underwriting', 'claims', 'policy', 'actuary', 'risk', 'catastrophe'],
    healthcare: ['healthcare', 'medical', 'patient', 'billing', 'scheduling', 'telehealth'],
    manufacturing: ['manufacturing', 'production', 'quality', 'safety', 'supply-chain', 'maintenance', 'inventory'],
    transportation: ['transportation', 'logistics', 'fleet', 'warehouse', 'route', 'dispatch', 'tracking'],
    government: ['government', 'policy', 'regulatory', 'public', 'grants', 'transparency'],
    'supply-chain': ['procurement', 'logistics', 'warehouse', 'inventory', 'demand', 'supplier', 'shipping']
  };
  
  const lowerAgentId = agentId.toLowerCase();
  const lowerTitle = title.toLowerCase();
  
  for (const [dept, keywords] of Object.entries(deptMap)) {
    if (keywords.some(keyword => lowerAgentId.includes(keyword) || lowerTitle.includes(keyword))) {
      return dept;
    }
  }
  
  return 'general';
}

// Function to generate comprehensive features for an agent
function generateComprehensiveFeatures(agentId, title, isSubAgent = false) {
  const level = isSubAgent ? 'operational' : getAgentLevel(title);
  const department = getDepartment(agentId, title);
  
  const baseFeatures = featureTemplates[level];
  const deptEnhancements = departmentEnhancements[department] || {};
  
  // Merge base features with department-specific enhancements
  return {
    ...baseFeatures,
    ...deptEnhancements,
    // Add agent-specific customizations
    agentId: agentId,
    agentTitle: title,
    agentLevel: level,
    department: department,
    isSubAgent: isSubAgent
  };
}

// Function to format features for the KAYTX AI WORKFORCE file
function formatFeaturesForFile(features) {
  return `       - Separate Dashboard: ${features.separateDashboard}
       - Security Layer: ${features.securityLayer}
       - Call: ${features.call}
       - Chat System: ${features.chatSystem}
       - SMS: ${features.sms}
       - Voice & Phone Number: ${features.voice}
       - Recording & Script: ${features.recording}
       - Location & Country: ${features.location}
       - Company Setup: ${features.companySetup}
       - General Info: (Name, Role, Availability, Personality, Tone)
       - Model & Language: ${features.model}
       - Timing & Scheduling: ${features.timing}
       - Pricing & Negotiation: ${features.pricing}
       - Integrations: ${features.integrations}
       - Responsibilities & Routing: ${features.responsibilities}
       - Tasks & Work Management: ${features.tasks}
       - Behaviour & Limitations: ${features.behaviour}
       - Performance & Insights: ${features.performance}
       - Summary & Notes: ${features.agentTitle} - ${features.department} department ${features.agentLevel} level agent
       - Predictive Layers: ${features.predictive}
       - Rules & Regulations: ${features.regulations}
       - Memory: ${features.memory}
       - Setup Company (detailed): ${features.setup}
       - 2-Step Verification: ${features.verification}
       - Import & Export Data: ${features.importExport}
       - Reports: ${features.reports}
       - Integrations & MCP: ${features.integrations}`;
}

// Main function to process the KAYTX AI WORKFORCE file
function enhanceAgentFeaturesFile() {
  const filePath = path.join(__dirname, '../shaida the agents lib by shaida/KAYTX AI WORKFORCE - COMPLETE WITH SUB-AGENTS');
  
  console.log('Reading KAYTX AI WORKFORCE file...');
  let content = fs.readFileSync(filePath, 'utf8');
  
  console.log('Processing agents and adding comprehensive features...');
  
  // Split content into lines
  const lines = content.split('\n');
  let enhancedLines = [];
  let currentAgent = null;
  let inFeaturesSection = false;
  let processedCount = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect main agent entry (starts with number + dot + space + name)
    const agentMatch = line.match(/^(\d+)\.\s+(AI .+)$/);
    // Detect sub-agent entry (starts with spaces + arrow + space + name)
    const subAgentMatch = line.match(/^\s+→\s+(AI .+)$/);
    
    if (agentMatch) {
      currentAgent = {
        id: agentMatch[1],
        title: agentMatch[2].trim(),
        isSubAgent: false
      };
      enhancedLines.push(line);
    } else if (subAgentMatch) {
      currentAgent = {
        id: subAgentMatch[1].trim(),
        title: subAgentMatch[1].trim(),
        isSubAgent: true
      };
      enhancedLines.push(line);
    } else if (line.trim() === 'Features:') {
      inFeaturesSection = true;
      enhancedLines.push(line);
      
      // Generate and add comprehensive features
      if (currentAgent) {
        const features = generateComprehensiveFeatures(currentAgent.id, currentAgent.title, currentAgent.isSubAgent);
        const formattedFeatures = formatFeaturesForFile(features);
        enhancedLines.push(formattedFeatures);
        processedCount++;
        console.log(`Processed: ${currentAgent.title} (${currentAgent.isSubAgent ? 'Sub-agent' : 'Main agent'})`);
      }
    } else if (inFeaturesSection && line.trim() === '') {
      inFeaturesSection = false;
      enhancedLines.push(line);
    } else if (!inFeaturesSection) {
      enhancedLines.push(line);
    }
  }
  
  console.log(`Processed ${processedCount} agents`);
  
  // Write enhanced content back to file
  const backupPath = filePath + '.backup.' + Date.now();
  fs.writeFileSync(backupPath, content, 'utf8');
  console.log(`Backup created at: ${backupPath}`);
  
  fs.writeFileSync(filePath, enhancedLines.join('\n'), 'utf8');
  console.log('Enhanced features written to KAYTX AI WORKFORCE file');
}

// Run the enhancement
if (require.main === module) {
  try {
    enhanceAgentFeaturesFile();
    console.log('✅ Agent feature enhancement completed successfully');
  } catch (error) {
    console.error('❌ Error enhancing agent features:', error);
    process.exit(1);
  }
}

module.exports = {
  generateComprehensiveFeatures,
  formatFeaturesForFile,
  enhanceAgentFeaturesFile
};
