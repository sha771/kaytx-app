import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Settings,
  Globe,
  Shield,
  Bell,
  Database,
  Server,
  Key,
  Lock,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  TriangleAlert,
  Check,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function AIAgentsGlobalSettingsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [settings, setSettings] = useState({
    // General
    autoUpdateAgents: true,
    defaultLanguage: 'english',
    enableAnalytics: true,
    
    // Security
    requireApprovalForChanges: true,
    encryptDataUploads: true,
    twoFactorAuth: false,
    auditLogging: true,
    
    // Performance
    autoScaleAgents: true,
    maxConcurrentTasks: 100,
    cacheEnabled: true,
    
    // Notifications
    trainingCompleteAlerts: true,
    errorNotifications: true,
    weeklyReports: true,
    costAlerts: true,
    
    // Data Management
    autoBackupDocuments: true,
    retentionPeriod: 90,
    enableDataSync: true,
  });

  const [saved, setSaved] = useState(false);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
    setSaved(false);
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

  const handleSave = () => {
    // Would save to backend/storage in real implementation
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const SettingItem = ({ 
    icon: Icon, 
    label, 
    description, 
    settingKey,
    type = 'toggle'
  }: { 
    icon: any, 
    label: string, 
    description: string, 
    settingKey: keyof typeof settings,
    type?: 'toggle' | 'value'
  }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingIcon}>
        <Icon size={20} color={colors.primary} />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingLabel, { color: colors.text }]}>{label}</Text>
        <Text style={[styles.settingDescription, { color: colors.text + '60' }]}>{description}</Text>
      </View>
      {type === 'toggle' ? (
        <Switch
          value={settings[settingKey] as boolean}
          onValueChange={() => toggleSetting(settingKey)}
          trackColor={{ false: '#767577', true: colors.primary + '80' }}
          thumbColor={settings[settingKey] ? colors.primary : '#f4f3f4'}
        />
      ) : (
        <TouchableOpacity style={styles.valueButton}>
          <Text style={[styles.valueText, { color: colors.primary }]}>
            {String(settings[settingKey])}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Settings size={22} color={colors.primary} />
            <Text style={[styles.headerTitle, { color: colors.text }]}>Global AI Settings</Text>
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            {saved ? (
              <Check size={24} color="#10B981" />
            ) : (
              <Save size={24} color={colors.primary} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Info Banner */}
        <Animated.View entering={FadeInUp} style={[styles.infoBanner, { backgroundColor: colors.primary + '15' }]}>
          <TriangleAlert size={20} color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.text }]}>
            These settings apply globally to all AI agents and employees
          </Text>
        </Animated.View>

        {/* General Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text + '60' }]}>GENERAL</Text>
          <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <SettingItem
              icon={RefreshCw}
              label="Auto-update Agents"
              description="Automatically update agent configurations when new versions are available"
              settingKey="autoUpdateAgents"
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingItem
              icon={Globe}
              label="Default Language"
              description="Primary language for all agent interactions"
              settingKey="defaultLanguage"
              type="value"
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingItem
              icon={Database}
              label="Enable Analytics"
              description="Collect usage analytics to improve agent performance"
              settingKey="enableAnalytics"
            />
          </View>
        </View>

        {/* Security Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text + '60' }]}>SECURITY</Text>
          <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <SettingItem
              icon={Shield}
              label="Require Approval"
              description="Require admin approval for major configuration changes"
              settingKey="requireApprovalForChanges"
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingItem
              icon={Lock}
              label="Encrypt Data Uploads"
              description="Encrypt all training documents and data uploads"
              settingKey="encryptDataUploads"
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingItem
              icon={Key}
              label="Two-Factor Authentication"
              description="Require 2FA for accessing agent management"
              settingKey="twoFactorAuth"
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingItem
              icon={Eye}
              label="Audit Logging"
              description="Log all agent actions and configuration changes"
              settingKey="auditLogging"
            />
          </View>
        </View>

        {/* Performance Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text + '60' }]}>PERFORMANCE</Text>
          <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <SettingItem
              icon={Server}
              label="Auto-scale Agents"
              description="Automatically scale agent resources based on demand"
              settingKey="autoScaleAgents"
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingItem
              icon={Database}
              label="Max Concurrent Tasks"
              description="Maximum number of tasks agents can handle simultaneously"
              settingKey="maxConcurrentTasks"
              type="value"
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingItem
              icon={RefreshCw}
              label="Response Caching"
              description="Cache common agent responses for faster performance"
              settingKey="cacheEnabled"
            />
          </View>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text + '60' }]}>NOTIFICATIONS</Text>
          <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <SettingItem
              icon={Check}
              label="Training Complete Alerts"
              description="Notify when agent training is completed"
              settingKey="trainingCompleteAlerts"
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingItem
              icon={TriangleAlert}
              label="Error Notifications"
              description="Alert when agents encounter errors"
              settingKey="errorNotifications"
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingItem
              icon={Database}
              label="Weekly Reports"
              description="Receive weekly performance reports"
              settingKey="weeklyReports"
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingItem
              icon={Database}
              label="Cost Alerts"
              description="Alert when approaching budget limits"
              settingKey="costAlerts"
            />
          </View>
        </View>

        {/* Data Management Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text + '60' }]}>DATA MANAGEMENT</Text>
          <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <SettingItem
              icon={Database}
              label="Auto-backup Documents"
              description="Automatically backup uploaded training documents"
              settingKey="autoBackupDocuments"
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingItem
              icon={Database}
              label="Data Retention Period"
              description="Days to keep processed documents before archive"
              settingKey="retentionPeriod"
              type="value"
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <SettingItem
              icon={RefreshCw}
              label="Enable Data Sync"
              description="Sync agent data across devices"
              settingKey="enableDataSync"
            />
          </View>
        </View>

        {/* Reset Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text + '60' }]}>DANGER ZONE</Text>
          <View style={[styles.sectionCard, { backgroundColor: '#EF444415', borderColor: '#EF4444' }]}>
            <TouchableOpacity style={styles.dangerButton}>
              <TriangleAlert size={20} color="#EF4444" />
              <View style={styles.dangerContent}>
                <Text style={[styles.dangerLabel, { color: '#EF4444' }]}>Reset All Agents</Text>
                <Text style={[styles.dangerDescription, { color: colors.text + '60' }]}>
                  Reset all agents to default configuration
                </Text>
              </View>
            </TouchableOpacity>
            <View style={[styles.divider, { backgroundColor: '#EF444430' }]} />
            <TouchableOpacity style={styles.dangerButton}>
              <Trash2Icon size={20} color="#EF4444" />
              <View style={styles.dangerContent}>
                <Text style={[styles.dangerLabel, { color: '#EF4444' }]}>Clear All Training Data</Text>
                <Text style={[styles.dangerDescription, { color: colors.text + '60' }]}>
                  Delete all uploaded training documents
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Icon wrapper for Trash2
function Trash2Icon({ size, color }: { size: number; color: string }) {
  return (
    <View style={{ width: size, height: size }}>
      <TriangleAlert size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { borderBottomWidth: 1 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  backButton: { padding: 4 },
  headerTitleContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  saveButton: { padding: 8 },
  content: { padding: 16 },
  infoBanner: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, borderRadius: 12, marginBottom: 20 },
  infoText: { flex: 1, fontSize: 14 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 12, fontWeight: '600', letterSpacing: 0.5, marginBottom: 10, marginLeft: 4 },
  sectionCard: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  settingItem: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  settingIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000008' },
  settingContent: { flex: 1, marginLeft: 12, marginRight: 12 },
  settingLabel: { fontSize: 15, fontWeight: '600' },
  settingDescription: { fontSize: 12, marginTop: 2 },
  valueButton: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, backgroundColor: '#00000008' },
  valueText: { fontSize: 14, fontWeight: '500' },
  divider: { height: 1, marginLeft: 68 },
  dangerButton: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  dangerContent: { flex: 1, marginLeft: 12 },
  dangerLabel: { fontSize: 15, fontWeight: '600' },
  dangerDescription: { fontSize: 12, marginTop: 2 },
});
