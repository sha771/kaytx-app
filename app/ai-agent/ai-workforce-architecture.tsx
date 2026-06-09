import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import {
  Brain,
  ChevronRight,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const layers = [
  { id: 1, name: 'Governance', type: 'Security', flow: 'Rules', use: 'Compliance, ethics', color: '#F44336' },
  { id: 2, name: 'Leadership', type: 'Strategy', flow: 'Vision', use: 'Direction', color: '#FF9800' },
  { id: 3, name: 'Simulation', type: 'Testing', flow: 'Test', use: 'Test before doing', color: '#FFEB3B' },
  { id: 4, name: 'Intelligence', type: 'Analysis', flow: 'Predict', use: 'Analyze, predict', color: '#4CAF50' },
  { id: 5, name: 'Memory', type: 'Learning', flow: 'Remember', use: 'Remember, improve', color: '#00BCD4' },
  { id: 6, name: 'Translation', type: 'Communication', flow: 'Bridge', use: 'Business-AI bridge', color: '#2196F3' },
  { id: 7, name: 'Command', type: 'Control', flow: 'Orchestrate', use: 'Orchestration', color: '#9C27B0' },
  { id: 8, name: 'Enterprise', type: 'Operations', flow: 'Automate', use: 'Automation', color: '#673AB7' },
  { id: 9, name: 'Execution', type: 'Operations', flow: 'Execute', use: 'Department work', color: '#E91E63' },
  { id: 10, name: 'Workforce', type: 'Execution', flow: 'Do tasks', use: 'Task handling', color: '#795548' },
  { id: 11, name: 'Review & Display', type: 'Feedback', flow: 'Review & show', use: 'Results to users', color: '#607D8B' },
];

export const AIWorkforceArchitecture: React.FC = () => {
  const { theme } = useTheme();

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingTop: 50,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.text,
    },
    spacer: {
      width: 36,
    },
    content: {
      padding: 16,
    },
    layerCard: {
      backgroundColor: theme.colors.cardBackground,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    layerHeader: {
      flex: 1,
      marginRight: 12,
    },
    layerNumber: {
      fontSize: 14,
      fontWeight: '800',
    },
    layerName: {
      fontSize: 18,
      fontWeight: '700',
      marginTop: 4,
    },
    layerBody: {
      flex: 2,
    },
    layerType: {
      fontSize: 13,
      color: theme.colors.secondaryText,
      marginBottom: 4,
    },
    layerFlow: {
      fontSize: 13,
      color: theme.colors.secondaryText,
      marginBottom: 4,
    },
    layerUse: {
      fontSize: 13,
      color: theme.colors.secondaryText,
    },
    chevronContainer: {
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
  }), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Brain size={20} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>11-Layer AI Agent Architecture</Text>
        <View style={styles.spacer} />
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {layers.map((layer) => (
          <TouchableOpacity
            key={layer.id}
            style={[styles.layerCard, { borderLeftWidth: 4, borderLeftColor: layer.color }]}
          >
            <View style={styles.layerHeader}>
              <Text style={[styles.layerNumber, { color: layer.color }]}>
                Layer {layer.id}
              </Text>
              <Text style={styles.layerName}>{layer.name}</Text>
            </View>
            <View style={styles.layerBody}>
              <Text style={styles.layerType}>
                Work Type: {layer.type}
              </Text>
              <Text style={styles.layerFlow}>
                Flow: {layer.flow}
              </Text>
              <Text style={styles.layerUse}>
                Use Case: {layer.use}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.chevronContainer}
              activeOpacity={0.7}
            >
              <ChevronRight size={18} color={theme.colors.secondaryText} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
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
