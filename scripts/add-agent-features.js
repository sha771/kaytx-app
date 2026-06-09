/**
 * Script to add comprehensive features to all 1,108 agents
 * Based on the KAYTX AI WORKFORCE feature template
 */

const fs = require('fs');
const path = require('path');

// Comprehensive feature template to add to each agent
const comprehensiveFeatures = {
  // Communication Channels
  communicationChannels: {
    call: {
      enabled: true,
      provider: 'Twilio',
      features: ['PBX Integration', 'IVR Menu', 'Call Routing', 'Call Recording', 'Transcriptions'],
      recordingRetention: '90 days',
      consentLogging: true
    },
    chatSystem: {
      enabled: true,
      platforms: ['Web Widget', 'Slack', 'Intercom', 'Microsoft Teams'],
      persistentThreads: true,
      transcriptExport: true
    },
    sms: {
      enabled: true,
      provider: 'Twilio',
      features: ['Templated Messages', 'Two-Way Support', 'Opt-Out Handling'],
      number: 'TBD'
    },
    voice: {
      enabled: true,
      primaryDID: 'TBD',
      ttsVoice: 'default',
      failoverNumbers: [],
      geoRouting: true
    },
    recording: {
      enabled: true,
      autoRecording: true,
      consentLogging: true,
      transcriptGeneration: true,
      scriptTemplates: []
    },
    location: {
      allowedRegions: ['Global'],
      timezoneAware: true,
      localeFormats: ['en-US', 'en-GB', 'es-ES', 'fr-FR', 'de-DE']
    }
  },
  
  // Company Setup
  companySetup: {
    profile: {
      enabled: true,
      fields: ['Company Name', 'Industry', 'Size', 'Location']
    },
    products: {
      enabled: true,
      catalog: true,
      pricingTiers: true
    },
    negotiationRules: {
      enabled: true,
      templates: true,
      maxConcession: '10%'
    }
  },
  
  // General Info
  generalInfo: {
    name: '',
    role: '',
    availability: '24/7',
    personality: 'professional',
    tone: 'conversational',
    voice: 'neutral'
  },
  
  // Model & Language
  modelConfig: {
    modelName: 'LLM-X v2',
    modelFamily: 'GPT-4',
    version: 'latest',
    primaryLanguage: 'en-US',
    fallbackLanguages: ['es', 'fr', 'de'],
    multilingualSupport: true
  },
  
  // Timing & Scheduling
  timing: {
    businessHours: {
      enabled: true,
      schedule: 'Mon-Fri 09:00-18:00 local',
      timezone: 'UTC',
      holidays: []
    },
    waitingDuration: {
      call: 120,
      chat: 30,
      sms: 0
    },
    appointmentScheduling: {
      enabled: true,
      calendars: ['Google', 'Outlook'],
      timezoneHandling: 'automatic'
    }
  },
  
  // Pricing & Negotiation
  pricing: {
    pricingModel: 'fixed monthly',
    priceLimit: 'TBD',
    negotiationRules: {
      enabled: true,
      maxConcession: '10%',
      autoNegotiation: false
    }
  },
  
  // Integrations
  integrations: {
    crm: ['Salesforce', 'HubSpot', 'Zendesk'],
    ticketing: ['Zendesk', 'Freshdesk', 'Jira'],
    calendar: ['Google Calendar', 'Outlook Calendar'],
    telephony: ['Twilio', 'Vonage', 'RingCentral'],
    analytics: ['Google Analytics', 'Mixpanel', 'Amplitude'],
    mcpConnectors: []
  },
  
  // Responsibilities & Routing
  responsibilities: {
    taskRouting: {
      method: 'intent-based',
      escalationPath: 'human after 3 failed handoffs',
      slaEnforcement: true
    },
    appointmentScheduling: {
      enabled: true,
      rules: []
    }
  },
  
  // Tasks & Work Management
  taskManagement: {
    assignedTasks: {
      queue: true,
      slaTimers: true,
      dependencies: true
    },
    progressTracking: {
      enabled: true,
      metrics: ['completion percentage', 'time remaining']
    }
  },
  
  // Behaviour & Limitations
  behaviour: {
    safetyFilters: {
      enabled: true,
      restrictedDomains: ['legal', 'medical', 'financial advice']
    },
    refusalTemplates: {
      enabled: true
    },
    rateLimits: {
      enabled: true,
      requestsPerMinute: 60
    }
  },
  
  // Performance & Insights
  performance: {
    metrics: {
      latency: true,
      accuracy: true,
      successRate: true,
      userSatisfaction: true
    },
    reporting: {
      dashboards: true,
      scheduledReports: true,
      cadence: ['daily', 'weekly', 'monthly']
    }
  },
  
  // Summary & Notes
  summary: {
    enabled: true,
    adminNotes: '',
    handoverContext: true
  },
  
  // Predictive Layers
  predictive: {
    forecasting: {
      enabled: true,
      models: []
    },
    anomalyDetection: {
      enabled: true,
      triggers: []
    }
  },
  
  // Rules & Regulations
  regulations: {
    compliance: {
      gdpr: true,
      hipaa: false,
      soc2: false,
      regional: true
    },
    dataResidency: {
      enabled: true,
      regions: []
    },
    consentPolicies: {
      enabled: true
    }
  },
  
  // Memory
  memory: {
    session: {
      duration: '30 minutes',
      retention: true
    },
    longTerm: {
      duration: '365 days',
      retention: true
    },
    piiRedaction: {
      enabled: true
    },
    purgeSchedule: 'quarterly'
  },
  
  // Setup Company (Detailed)
  detailedSetup: {
    onboardingFlow: true,
    productPricingSetup: true,
    negotiationRulesSetup: true,
    trainingPlan: true,
    knowledgeBaseImport: true,
    voicePersonalityTuning: true,
    businessHoursSetup: true,
    additionalConfigs: []
  },
  
  // 2-Step Verification
  twoStepVerification: {
    enabled: true,
    criticalActions: ['billing', 'admin modifications', 'data export'],
    deviceCheck: true
  },
  
  // Import & Export Data
  importExport: {
    endpoints: ['CSV', 'JSON'],
    scheduledExports: true,
    retentionPolicy: true,
    complianceControls: true
  },
  
  // Reports
  reports: {
    types: ['performance', 'usage', 'errors', 'compliance'],
    cadence: ['daily', 'weekly', 'monthly'],
    deliveryChannels: ['email', 'dashboard', 'webhook']
  },
  
  // MCP Integrations
  mcpIntegrations: {
    connectors: [],
    apiSpecs: [],
    mapping: []
  }
};

// Function to add features to an agent file
function addFeaturesToAgent(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if features already exist
    if (content.includes('communicationChannels') || 
        content.includes('companySetup') ||
        content.includes('modelConfig')) {
      console.log(`Skipping ${filePath} - features already exist`);
      return;
    }
    
    // Find the agent object and add features before the return statement
    const agentObjectEnd = content.indexOf('};');
    if (agentObjectEnd === -1) {
      console.log(`Skipping ${filePath} - agent object not found`);
      return;
    }
    
    // Generate feature string
    const featuresString = JSON.stringify(comprehensiveFeatures, null, 2);
    
    // Insert features before the closing brace
    const newContent = content.slice(0, agentObjectEnd) + 
      `,\n    comprehensiveFeatures: ${featuresString}` + 
      content.slice(agentObjectEnd);
    
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Added features to ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// Function to recursively find all agent files
function findAgentFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and similar directories
      if (!file.startsWith('.') && file !== 'node_modules' && file !== 'sub-agents') {
        findAgentFiles(filePath, fileList);
      }
    } else if (file.endsWith('.tsx') && file !== '[agentId].tsx' && file !== '_layout.tsx' && file !== 'index.tsx') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Main execution
const aiAgentDir = path.join(__dirname, '..', 'app', 'ai-agent');
console.log('Scanning for agent files...');
const agentFiles = findAgentFiles(aiAgentDir);
console.log(`Found ${agentFiles.length} agent files`);

console.log('Adding comprehensive features to agents...');
agentFiles.forEach(addFeaturesToAgent);

console.log('Feature addition complete!');
