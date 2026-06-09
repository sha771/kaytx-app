/**
 * Agent Feature Enhancement Script v2
 * Directly replaces empty feature sections with comprehensive features
 */

const fs = require('fs');
const path = require('path');

// Feature templates
const featureTemplates = {
  executive: {
    separateDashboard: 'true — admin & ops dashboards with role-scoped views (admin, ops, analytics)',
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
  management: {
    separateDashboard: 'true — department-specific dashboards with role-based access',
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
  specialist: {
    separateDashboard: 'false — uses shared department dashboard',
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
  operational: {
    separateDashboard: 'false — uses shared operational dashboard',
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

function getAgentLevel(title) {
  const executiveKeywords = ['Chief', 'CIO', 'CTO', 'CFO', 'CMO', 'COO', 'CRO', 'CISO', 'CHRO', 'CLO', 'CDO', 'CAO'];
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

function formatFeatures(features) {
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
       - Summary & Notes: Agent configured for enterprise operations with comprehensive integrations
       - Predictive Layers: ${features.predictive}
       - Rules & Regulations: ${features.regulations}
       - Memory: ${features.memory}
       - Setup Company (detailed): ${features.setup}
       - 2-Step Verification: ${features.verification}
       - Import & Export Data: ${features.importExport}
       - Reports: ${features.reports}
       - Integrations & MCP: ${features.integrations}`;
}

function enhanceAgentFeaturesFile() {
  const filePath = path.join(__dirname, '../shaida the agents lib by shaida/KAYTX AI WORKFORCE - COMPLETE WITH SUB-AGENTS');
  
  console.log('Reading KAYTX AI WORKFORCE file...');
  let content = fs.readFileSync(filePath, 'utf8');
  
  console.log('Processing agents and adding comprehensive features...');
  
  // Split content into lines
  const lines = content.split('\n');
  let enhancedLines = [];
  let currentTitle = null;
  let isSubAgent = false;
  let processedCount = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    // Detect main agent (number + dot + AI + name)
    if (/^\d+\.\s+AI\s+/.test(line)) {
      currentTitle = trimmedLine.replace(/^\d+\.\s+/, '');
      isSubAgent = false;
      enhancedLines.push(line);
    } 
    // Detect sub-agent (arrow + AI + name)
    else if (/^→\s+AI\s+/.test(trimmedLine)) {
      currentTitle = trimmedLine.replace(/^→\s+/, '');
      isSubAgent = true;
      enhancedLines.push(line);
    } 
    // Detect Features section
    else if (trimmedLine === 'Features:') {
      enhancedLines.push(line);
      
      // Check if next lines have empty features
      if (currentTitle) {
        const level = isSubAgent ? 'operational' : getAgentLevel(currentTitle);
        const features = featureTemplates[level];
        const formattedFeatures = formatFeatures(features);
        
        // Add the formatted features
        enhancedLines.push(formattedFeatures);
        processedCount++;
        
        if (processedCount % 50 === 0) {
          console.log(`Processed ${processedCount} agents...`);
        }
        
        // Skip the next ~20 lines (empty feature lines)
        i += 20;
        currentTitle = null; // Reset current title
      }
    } 
    // Skip empty feature lines that will be replaced
    else if (trimmedLine.startsWith('- Separate Dashboard:') && trimmedLine.endsWith(':')) {
      // Skip this line - it will be replaced
    }
    else if (trimmedLine.startsWith('- Security Layer:') && trimmedLine.endsWith(':')) {
      // Skip this line - it will be replaced
    }
    else if (trimmedLine.startsWith('- Call:') && trimmedLine.endsWith(':')) {
      // Skip this line - it will be replaced
    }
    else if (trimmedLine.startsWith('- Chat System:') && trimmedLine.endsWith(':')) {
      // Skip this line - it will be replaced
    }
    else if (trimmedLine.startsWith('- SMS:') && trimmedLine.endsWith(':')) {
      // Skip this line - it will be replaced
    }
    else if (trimmedLine.startsWith('- Voice & Phone Number:') && trimmedLine.endsWith(':')) {
      // Skip this line - it will be replaced
    }
    else if (trimmedLine.startsWith('- Recording & Script:') && trimmedLine.endsWith(':')) {
      // Skip this line - it will be replaced
    }
    else if (trimmedLine.startsWith('- Location & Country:') && trimmedLine.endsWith(':')) {
      // Skip this line - it will be replaced
    }
    else if (trimmedLine.startsWith('- Company Setup:') && trimmedLine.endsWith(':')) {
      // Skip this line - it will be replaced
    }
    else if (trimmedLine.startsWith('- Model & Language:') && trimmedLine.endsWith(':')) {
      // Skip this line - it will be replaced
    }
    else if (trimmedLine.startsWith('- Timing & Scheduling:') && trimmedLine.endsWith(':')) {
      // Skip this line - it will be replaced
    }
    else if (trimmedLine.startsWith('- Pricing & Negotiation:') && trimmedLine.endsWith(':')) {
      // Skip this line - it will be replaced
    }
    else if (trimmedLine.startsWith('- Integrations:') && trimmedLine.endsWith(':')) {
      // Skip this line - it will be replaced
    }
    else if (trimmedLine.startsWith('- Responsibilities & Routing:') && trimmedLine.endsWith(':')) {
      // Skip this line - it will be replaced
    }
    else if (trimmedLine.startsWith('- Tasks & Work Management:') && trimmedLine.endsWith(':')) {
      // Skip this line - it will be replaced
    }
    else if (trimmedLine.startsWith('- Behaviour & Limitations:') && trimmedLine.endsWith(':')) {
      // Skip this line - it will be replaced
    }
    else if (trimmedLine.startsWith('- Performance & Insights:') && trimmedLine.endsWith(':')) {
      // Skip this line - it will be replaced
    }
    else if (trimmedLine.startsWith('- Summary & Notes:') && trimmedLine.endsWith(':')) {
      // Skip this line - it will be replaced
    }
    else if (trimmedLine.startsWith('- Predictive Layers:') && trimmedLine.endsWith(':')) {
      // Skip this line - it will be replaced
    }
    else if (trimmedLine.startsWith('- Rules & Regulations:') && trimmedLine.endsWith(':')) {
      // Skip this line - it will be replaced
    }
    else if (trimmedLine.startsWith('- Memory:') && trimmedLine.endsWith(':')) {
      // Skip this line - it will be replaced
    }
    else if (trimmedLine.startsWith('- Setup Company (detailed):') && trimmedLine.endsWith(':')) {
      // Skip this line - it will be replaced
    }
    else if (trimmedLine.startsWith('- 2-Step Verification:') && trimmedLine.endsWith(':')) {
      // Skip this line - it will be replaced
    }
    else if (trimmedLine.startsWith('- Import & Export Data:') && trimmedLine.endsWith(':')) {
      // Skip this line - it will be replaced
    }
    else if (trimmedLine.startsWith('- Reports:') && trimmedLine.endsWith(':')) {
      // Skip this line - it will be replaced
    }
    else if (trimmedLine.startsWith('- Integrations & MCP:') && trimmedLine.endsWith(':')) {
      // Skip this line - it will be replaced
    }
    else {
      enhancedLines.push(line);
    }
  }
  
  console.log(`Total processed: ${processedCount} agents`);
  
  // Create backup
  const backupPath = filePath + '.backup.' + Date.now();
  fs.writeFileSync(backupPath, content, 'utf8');
  console.log(`Backup created at: ${backupPath}`);
  
  // Write enhanced content
  fs.writeFileSync(filePath, enhancedLines.join('\n'), 'utf8');
  console.log('Enhanced features written to KAYTX AI WORKFORCE file');
}

if (require.main === module) {
  try {
    enhanceAgentFeaturesFile();
    console.log('✅ Agent feature enhancement completed successfully');
  } catch (error) {
    console.error('❌ Error enhancing agent features:', error);
    process.exit(1);
  }
}
