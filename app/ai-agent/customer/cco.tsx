import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { MessageSquare } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'cco',
    name: 'cco',
    title: 'AI Chief Customer Officer',
    description: 'The AI Chief Customer Officer leads customer experience strategy, oversees all customer-facing operations, and drives customer-centric initiatives across the organization.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Strategic Planning","Team Leadership","Customer Journey Mapping","Sentiment Analysis","Churn Prediction","Personalization Strategy","Multi-channel Orchestration"],
    icon: MessageSquare,
    color: '#2196F3',
    type: 'employee' as const,
    humanCost: '$163k/year',
    aiCost: '$3k/year',
    efficiency: '54x efficiency improvement',
    replacesRole: 'cco',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12',
      tasksAutomatedDaily: 1415,
      responseTime: '0.5s',
      accuracyRate: '97.9%',
    },
    hierarchy: {
      department: 'Customer',
      level: 'executive',
      reportsTo: 'ceo',
      manages: ['vp-customer-success', 'vp-support', 'vp-experience', 'vp-retention', 'vp-loyalty'],
    },
    specializedCapabilities: [
      'Customer Journey Mapping',
      'Sentiment Analysis',
      'Churn Prediction',
      'Personalization Engine',
      'Multi-channel Support',
      'Ticket Prioritization',
      'Knowledge Base Management',
      'Customer Health Scoring',
      'Feedback Analysis',
      'Loyalty Program Management'
    ],
    integrationOptions: [
      'CRM Integration',
      'Help Desk Integration',
      'Social Media Monitoring',
      'Live Chat Platform',
      'Email Ticketing System',
      'Phone System Integration',
      'Survey Platform Integration',
      'Analytics Dashboard'
    ],
    automationFeatures: [
      'Automated Ticket Routing',
      'Smart Response Suggestions',
      'FAQ Auto-Responses',
      'Escalation Triggers',
      'Follow-up Automation',
      'Customer Onboarding Flows',
      'Retention Campaign Automation',
      'Satisfaction Survey Automation'
    ],
    kpiMetrics: [
      'Customer Satisfaction Score (CSAT)',
      'Net Promoter Score (NPS)',
      'First Response Time',
      'Resolution Time',
      'Ticket Volume',
      'Churn Rate',
      'Customer Lifetime Value',
      'Retention Rate'
    ],
    customOptions: {
      empathyLevel: 'high',
      responseStyle: 'conversational',
      escalationThreshold: 'medium',
      personalizationEnabled: true,
      multiLanguageSupport: true
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: true,
      anomalyDetection: true,
      sentimentAnalysis: true,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts customer behavior and churn risk' },
      { id: 'sentiment', enabled: true, name: 'Sentiment Core', description: 'Real-time emotion detection and satisfaction tracking' },
      { id: 'anomaly', enabled: true, name: 'Anomaly Detector', description: 'Detects unusual patterns in customer behavior' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'cx_1', name: 'Ticket Resolution', category: 'Operations', description: 'Resolve support tickets', level: 'expert' },
      { id: 'cx_2', name: 'Complaint Handling', category: 'Operations', description: 'Manage customer complaints', level: 'expert' },
      { id: 'cx_4', name: 'Escalation Routing', category: 'Operations', description: 'Route complex issues', level: 'expert' },
      { id: 'cx_5', name: 'Satisfaction Surveys', category: 'Analytics', description: 'Conduct CSAT surveys', level: 'advanced' },
      { id: 'cx_6', name: 'Empathy Scoring', category: 'Analytics', description: 'Score customer empathy', level: 'advanced' }
    ],
    personality: [
      { trait: 'Professionalism', value: 9, description: 'Maintains formal, business-appropriate tone' },
      { trait: 'Empathy', value: 10, description: 'Shows understanding and emotional intelligence' },
      { trait: 'Proactivity', value: 8, description: 'Takes initiative in interactions' },
      { trait: 'Efficiency', value: 8, description: 'Delivers quick, concise responses' },
      { trait: 'Analytical', value: 9, description: 'Breaks down problems logically' }
    ]
    comprehensiveFeatures: {
  "communicationChannels": {
    "call": {
      "enabled": true,
      "provider": "Twilio",
      "features": [
        "PBX Integration",
        "IVR Menu",
        "Call Routing",
        "Call Recording",
        "Transcriptions"
      ],
      "recordingRetention": "90 days",
      "consentLogging": true
    },
    "chatSystem": {
      "enabled": true,
      "platforms": [
        "Web Widget",
        "Slack",
        "Intercom",
        "Microsoft Teams"
      ],
      "persistentThreads": true,
      "transcriptExport": true
    },
    "sms": {
      "enabled": true,
      "provider": "Twilio",
      "features": [
        "Templated Messages",
        "Two-Way Support",
        "Opt-Out Handling"
      ],
      "number": "TBD"
    },
    "voice": {
      "enabled": true,
      "primaryDID": "TBD",
      "ttsVoice": "default",
      "failoverNumbers": [],
      "geoRouting": true
    },
    "recording": {
      "enabled": true,
      "autoRecording": true,
      "consentLogging": true,
      "transcriptGeneration": true,
      "scriptTemplates": []
    },
    "location": {
      "allowedRegions": [
        "Global"
      ],
      "timezoneAware": true,
      "localeFormats": [
        "en-US",
        "en-GB",
        "es-ES",
        "fr-FR",
        "de-DE"
      ]
    }
  },
  "companySetup": {
    "profile": {
      "enabled": true,
      "fields": [
        "Company Name",
        "Industry",
        "Size",
        "Location"
      ]
    },
    "products": {
      "enabled": true,
      "catalog": true,
      "pricingTiers": true
    },
    "negotiationRules": {
      "enabled": true,
      "templates": true,
      "maxConcession": "10%"
    }
  },
  "generalInfo": {
    "name": "",
    "role": "",
    "availability": "24/7",
    "personality": "professional",
    "tone": "conversational",
    "voice": "neutral"
  },
  "modelConfig": {
    "modelName": "LLM-X v2",
    "modelFamily": "GPT-4",
    "version": "latest",
    "primaryLanguage": "en-US",
    "fallbackLanguages": [
      "es",
      "fr",
      "de"
    ],
    "multilingualSupport": true
  },
  "timing": {
    "businessHours": {
      "enabled": true,
      "schedule": "Mon-Fri 09:00-18:00 local",
      "timezone": "UTC",
      "holidays": []
    },
    "waitingDuration": {
      "call": 120,
      "chat": 30,
      "sms": 0
    },
    "appointmentScheduling": {
      "enabled": true,
      "calendars": [
        "Google",
        "Outlook"
      ],
      "timezoneHandling": "automatic"
    }
  },
  "pricing": {
    "pricingModel": "fixed monthly",
    "priceLimit": "TBD",
    "negotiationRules": {
      "enabled": true,
      "maxConcession": "10%",
      "autoNegotiation": false
    }
  },
  "integrations": {
    "crm": [
      "Salesforce",
      "HubSpot",
      "Zendesk"
    ],
    "ticketing": [
      "Zendesk",
      "Freshdesk",
      "Jira"
    ],
    "calendar": [
      "Google Calendar",
      "Outlook Calendar"
    ],
    "telephony": [
      "Twilio",
      "Vonage",
      "RingCentral"
    ],
    "analytics": [
      "Google Analytics",
      "Mixpanel",
      "Amplitude"
    ],
    "mcpConnectors": []
  },
  "responsibilities": {
    "taskRouting": {
      "method": "intent-based",
      "escalationPath": "human after 3 failed handoffs",
      "slaEnforcement": true
    },
    "appointmentScheduling": {
      "enabled": true,
      "rules": []
    }
  },
  "taskManagement": {
    "assignedTasks": {
      "queue": true,
      "slaTimers": true,
      "dependencies": true
    },
    "progressTracking": {
      "enabled": true,
      "metrics": [
        "completion percentage",
        "time remaining"
      ]
    }
  },
  "behaviour": {
    "safetyFilters": {
      "enabled": true,
      "restrictedDomains": [
        "legal",
        "medical",
        "financial advice"
      ]
    },
    "refusalTemplates": {
      "enabled": true
    },
    "rateLimits": {
      "enabled": true,
      "requestsPerMinute": 60
    }
  },
  "performance": {
    "metrics": {
      "latency": true,
      "accuracy": true,
      "successRate": true,
      "userSatisfaction": true
    },
    "reporting": {
      "dashboards": true,
      "scheduledReports": true,
      "cadence": [
        "daily",
        "weekly",
        "monthly"
      ]
    }
  },
  "summary": {
    "enabled": true,
    "adminNotes": "",
    "handoverContext": true
  },
  "predictive": {
    "forecasting": {
      "enabled": true,
      "models": []
    },
    "anomalyDetection": {
      "enabled": true,
      "triggers": []
    }
  },
  "regulations": {
    "compliance": {
      "gdpr": true,
      "hipaa": false,
      "soc2": false,
      "regional": true
    },
    "dataResidency": {
      "enabled": true,
      "regions": []
    },
    "consentPolicies": {
      "enabled": true
    }
  },
  "memory": {
    "session": {
      "duration": "30 minutes",
      "retention": true
    },
    "longTerm": {
      "duration": "365 days",
      "retention": true
    },
    "piiRedaction": {
      "enabled": true
    },
    "purgeSchedule": "quarterly"
  },
  "detailedSetup": {
    "onboardingFlow": true,
    "productPricingSetup": true,
    "negotiationRulesSetup": true,
    "trainingPlan": true,
    "knowledgeBaseImport": true,
    "voicePersonalityTuning": true,
    "businessHoursSetup": true,
    "additionalConfigs": []
  },
  "twoStepVerification": {
    "enabled": true,
    "criticalActions": [
      "billing",
      "admin modifications",
      "data export"
    ],
    "deviceCheck": true
  },
  "importExport": {
    "endpoints": [
      "CSV",
      "JSON"
    ],
    "scheduledExports": true,
    "retentionPolicy": true,
    "complianceControls": true
  },
  "reports": {
    "types": [
      "performance",
      "usage",
      "errors",
      "compliance"
    ],
    "cadence": [
      "daily",
      "weekly",
      "monthly"
    ],
    "deliveryChannels": [
      "email",
      "dashboard",
      "webhook"
    ]
  },
  "mcpIntegrations": {
    "connectors": [],
    "apiSpecs": [],
    "mapping": []
  }
}};

  return <AgentPageWrapper agent={agent} />;
}
