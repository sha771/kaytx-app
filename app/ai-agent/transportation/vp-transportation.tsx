import React from 'react';
import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
import { Briefcase } from 'lucide-react-native';

export default function AgentPage() {
  const agent = {
    id: 'vp-transportation',
    name: 'vp-transportation',
    title: 'AI VP Transportation',
    description: 'The AI VP Transportation leads transportation strategy, oversees fleet management and logistics, manages routing and tracking, and drives transportation excellence across the organization.',
    capabilities: ["Task Automation","Data Processing","Workflow Management","Transportation Strategy","Fleet Management","Logistics Coordination","Route Optimization","Tracking Systems","Customs Management","Team Leadership"],
    icon: Briefcase,
    color: '#007AFF',
    type: 'employee' as const,
    humanCost: '$195k/year',
    aiCost: '$3k/year',
    efficiency: '65x efficiency improvement',
    replacesRole: 'vp-transportation',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14',
      tasksAutomatedDaily: 1237,
      responseTime: '1.2s',
      accuracyRate: '96.6%',
    },
    hierarchy: {
      department: 'Transportation',
      level: 'executive',
      reportsTo: 'coo',
      manages: ['vp-logistics-operations', 'fleet-manager', 'distribution-manager', 'warehouse-manager', 'dispatcher'],
    },
    specializedCapabilities: [
      'Fleet Management',
      'Route Optimization',
      'Dispatch Operations',
      'Tracking',
      'Customs Management',
      'Freight Brokerage',
      'Last Mile Coordination',
      'Warehouse Operations',
      'Distribution Management',
      'Transportation Analytics'
    ],
    integrationOptions: [
      'Fleet Management',
      'Route Planning',
      'Tracking Systems',
      'Customs Platforms',
      'Freight Systems',
      'Warehouse Management',
      'Distribution Platforms',
      'Analytics Tools'
    ],
    automationFeatures: [
      'Route Planning',
      'Dispatch Automation',
      'Fleet Tracking',
      'Customs Processing',
      'Freight Matching',
      'Warehouse Operations',
      'Report Generation',
      'Alert Management'
    ],
    kpiMetrics: [
      'On-Time Delivery',
      'Fleet Utilization',
      'Route Efficiency',
      'Transportation Cost',
      'Delivery Accuracy',
      'Fleet Safety',
      'Customs Compliance',
      'Customer Satisfaction'
    ],
    customOptions: {
      routeOptimization: 'dynamic',
      fleetEfficiency: 'high',
      costFocus: 'optimization',
      sustainability: 'priority',
      safetyStandard: 'highest'
    },
    advancedFeatures: {
      a2aCommunication: true,
      d2dCommunication: true,
      selfImprovement: true,
      selfLearning: true,
      predictiveInsights: true,
      anomalyDetection: true,
      sentimentAnalysis: false,
      unlimitedMemory: true,
      taskHistory: true,
      crossAgentCollaboration: true,
      departmentIntegration: true,
    },
    intelligenceFeatures: [
      { id: 'predictive', enabled: true, name: 'Predictive Engine', description: 'Forecasts transportation needs and delays' },
      { id: 'anomaly', enabled: true, name: 'Anomaly Detector', description: 'Detects transportation anomalies and disruptions' }
    ],
    agentType: 'learning',
    skills: [
      { id: 'trans_1', name: 'Fleet Management', category: 'Operations', description: 'Manage fleet', level: 'expert' },
      { id: 'trans_2', name: 'Route Optimization', category: 'Analytics', description: 'Optimize routes', level: 'expert' },
      { id: 'trans_3', name: 'Dispatch', category: 'Operations', description: 'Coordinate dispatch', level: 'expert' },
      { id: 'trans_4', name: 'Tracking', category: 'Operations', description: 'Track shipments', level: 'expert' },
      { id: 'trans_5', name: 'Customs Management', category: 'Operations', description: 'Manage customs', level: 'expert' }
    ],
    personality: [
      { trait: 'Analytical', value: 10, description: 'Breaks down problems logically' },
      { trait: 'Professionalism', value: 10, description: 'Maintains formal, business-appropriate tone' },
      { trait: 'Efficiency', value: 9, description: 'Delivers quick, concise responses' },
      { trait: 'Proactivity', value: 9, description: 'Takes initiative in interactions' },
      { trait: 'Assertiveness', value: 8, description: 'Confidently guides conversations' }
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
