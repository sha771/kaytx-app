import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Key,
  Plus,
  Copy,
  Eye,
  EyeOff,
  Trash2,
  Check,
  RefreshCw,
  Shield,
  TriangleAlert,
  Globe,
  Database,
  Cloud,
  Lock,
  Calendar,
  MessageSquare,
  Mail,
  FileText,
  CreditCard,
  Code,
  ExternalLink,
  ChevronRight,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const integrations = [
  {
    id: 'slack',
    name: 'Slack',
    description: 'Send notifications and receive commands from Slack',
    icon: MessageSquare,
    color: '#4A154B',
    connected: true,
    category: 'communication',
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Sync agent schedules with Google Calendar',
    icon: Calendar,
    color: '#4285F4',
    connected: true,
    category: 'calendar',
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'CRM integration for sales agents',
    icon: Cloud,
    color: '#00A1E0',
    connected: false,
    category: 'crm',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payment processing for billing agents',
    icon: CreditCard,
    color: '#635BFF',
    connected: true,
    category: 'payments',
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Code repository integration',
    icon: Code,
    color: '#181717',
    connected: false,
    category: 'dev',
  },
  {
    id: 'zendesk',
    name: 'Zendesk',
    description: 'Customer support ticket integration',
    icon: MessageSquare,
    color: '#03363D',
    connected: false,
    category: 'support',
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Marketing and sales automation',
    icon: Globe,
    color: '#FF7A59',
    connected: false,
    category: 'marketing',
  },
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    description: 'Accounting and finance integration',
    icon: FileText,
    color: '#2CA01C',
    connected: false,
    category: 'accounting',
  },
];

const apiKeys = [
  {
    id: 'key_001',
    name: 'Production API Key',
    key: 'ka_live_51H8m...8x2k9L',
    fullKey: 'ka_live_51H8mPj9kL2nQ8x2k9L',
    created: '2026-01-15',
    lastUsed: '2026-03-01 08:42:15',
    scopes: ['agents:read', 'agents:write', 'analytics:read'],
    status: 'active',
  },
  {
    id: 'key_002',
    name: 'Development API Key',
    key: 'ka_test_9x7m...3p5qR',
    fullKey: 'ka_test_9x7mKj3p5qR',
    created: '2026-02-20',
    lastUsed: '2026-03-01 10:15:33',
    scopes: ['agents:read', 'agents:write', 'training:write'],
    status: 'active',
  },
  {
    id: 'key_003',
    name: 'Read-Only Analytics',
    key: 'ka_live_2n4p...7x9mK',
    fullKey: 'ka_live_2n4p7x9mK',
    created: '2026-02-28',
    lastUsed: 'Never',
    scopes: ['analytics:read'],
    status: 'inactive',
  },
];

export default function IntegrationsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [activeTab, setActiveTab] = useState<'integrations' | 'apikeys'>('integrations');
  const [visibleKeys, setVisibleKeys] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newKeyName, setNewKeyName] = useState('');
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys(prev =>
      prev.includes(keyId) ? prev.filter(k => k !== keyId) : [...prev, keyId]
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

  const copyToClipboard = (text: string) => {
    Alert.alert('Copied', 'API key copied to clipboard');
  };

  const deleteKey = (keyId: string) => {
    Alert.alert(
      'Delete API Key',
      'This action cannot be undone. The key will be permanently revoked.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => console.log('Delete', keyId) },
      ]
    );
  };

  const createNewKey = () => {
    if (!newKeyName.trim()) {
      Alert.alert('Error', 'Please enter a key name');
      return;
    }
    Alert.alert('Success', `New API key "${newKeyName}" created`);
    setNewKeyName('');
    setShowNewKeyModal(false);
  };

  const filteredIntegrations = integrations.filter(i =>
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <Key size={22} color={colors.primary} />
            <Text style={[styles.titleText, { color: colors.text }]}>Integrations & API</Text>
          </View>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'integrations' && { backgroundColor: colors.primary }]}
            onPress={() => setActiveTab('integrations')}
          >
            <Database size={16} color={activeTab === 'integrations' ? '#fff' : colors.text} />
            <Text style={[styles.tabText, { color: activeTab === 'integrations' ? '#fff' : colors.text }]}>
              Integrations
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'apikeys' && { backgroundColor: colors.primary }]}
            onPress={() => setActiveTab('apikeys')}
          >
            <Lock size={16} color={activeTab === 'apikeys' ? '#fff' : colors.text} />
            <Text style={[styles.tabText, { color: activeTab === 'apikeys' ? '#fff' : colors.text }]}>
              API Keys
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Database size={20} color={colors.text + '60'} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder={activeTab === 'integrations' ? 'Search integrations...' : 'Search API keys...'}
            placeholderTextColor={colors.text + '40'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp}>
          {activeTab === 'integrations' ? (
            <View style={styles.integrationsGrid}>
              {filteredIntegrations.map((integration, index) => (
                <Animated.View
                  key={integration.id}
                  entering={FadeInUp.delay(index * 50)}
                  style={[styles.integrationCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                >
                  <View style={styles.integrationHeader}>
                    <View style={[styles.integrationIcon, { backgroundColor: integration.color + '15' }]}>
                      <integration.icon size={24} color={integration.color} />
                    </View>
                    <View style={styles.integrationStatus}>
                      <View style={[styles.statusBadge, integration.connected ? styles.connected : styles.disconnected]}>
                        <View style={[styles.statusDot, { backgroundColor: integration.connected ? '#10B981' : '#EF4444' }]} />
                        <Text style={[styles.statusText, { color: integration.connected ? '#10B981' : '#EF4444' }]}>
                          {integration.connected ? 'Connected' : 'Disconnected'}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <Text style={[styles.integrationName, { color: colors.text }]}>{integration.name}</Text>
                  <Text style={[styles.integrationDesc, { color: colors.text + '60' }]}>
                    {integration.description}
                  </Text>

                  <TouchableOpacity style={styles.configureBtn}>
                    <Text style={[styles.configureText, { color: colors.primary }]}>
                      {integration.connected ? 'Configure' : 'Connect'}
                    </Text>
                    <ChevronRight size={16} color={colors.primary} />
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          ) : (
            <View style={styles.apiKeysSection}>
              <View style={[styles.securityBanner, { backgroundColor: colors.primary + '10', borderColor: colors.primary }]}
              >
                <Shield size={24} color={colors.primary} />
                <View style={styles.securityInfo}>
                  <Text style={[styles.securityTitle, { color: colors.text }]}>Secure Your API Keys</Text>
                  <Text style={[styles.securityDesc, { color: colors.text + '60' }]}>
                    Never share your API keys publicly. Rotate keys regularly for security.
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.createKeyBtn, { backgroundColor: colors.primary }]}
                onPress={() => setShowNewKeyModal(true)}
              >
                <Plus size={20} color="#fff" />
                <Text style={styles.createKeyText}>Create New API Key</Text>
              </TouchableOpacity>

              {apiKeys.map((apiKey, index) => (
                <Animated.View
                  key={apiKey.id}
                  entering={FadeInUp.delay(index * 50)}
                  style={[styles.apiKeyCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                >
                  <View style={styles.apiKeyHeader}>
                    <View style={styles.apiKeyInfo}>
                      <Text style={[styles.apiKeyName, { color: colors.text }]}>{apiKey.name}</Text>
                      <View style={[styles.apiKeyStatus, apiKey.status === 'active' ? styles.activeBadge : styles.inactiveBadge]}
                      >
                        <Text style={[styles.apiKeyStatusText, { color: apiKey.status === 'active' ? '#10B981' : '#EF4444' }]}>
                          {apiKey.status === 'active' ? 'Active' : 'Inactive'}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.apiKeyActions}>
                      <TouchableOpacity onPress={() => toggleKeyVisibility(apiKey.id)}>
                        {visibleKeys.includes(apiKey.id) ? (
                          <Eye size={20} color={colors.text + '60'} />
                        ) : (
                          <EyeOff size={20} color={colors.text + '60'} />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => copyToClipboard(apiKey.fullKey)}>
                        <Copy size={20} color={colors.text + '60'} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => deleteKey(apiKey.id)}>
                        <Trash2 size={20} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={[styles.keyDisplay, { backgroundColor: colors.border + '30' }]}>
                    <Code size={16} color={colors.text + '40'} />
                    <Text style={[styles.keyText, { color: colors.text }]}>
                      {visibleKeys.includes(apiKey.id) ? apiKey.fullKey : apiKey.key}
                    </Text>
                  </View>

                  <View style={styles.keyMeta}>
                    <Text style={[styles.keyMetaText, { color: colors.text + '40' }]}>
                      Created: {apiKey.created}
                    </Text>
                    <Text style={[styles.keyMetaText, { color: colors.text + '40' }]}>
                      Last used: {apiKey.lastUsed}
                    </Text>
                  </View>

                  <View style={styles.scopesContainer}>
                    {apiKey.scopes.map(scope => (
                      <View key={scope} style={[styles.scopeChip, { backgroundColor: colors.primary + '15' }]}>
                        <Text style={[styles.scopeText, { color: colors.primary }]}>{scope}</Text>
                      </View>
                    ))}
                  </View>
                </Animated.View>
              ))}

              <View style={styles.apiDocsCard}>
                <View style={styles.apiDocsHeader}>
                  <Code size={24} color={colors.primary} />
                  <Text style={[styles.apiDocsTitle, { color: colors.text }]}>API Documentation</Text>
                </View>
                <Text style={[styles.apiDocsDesc, { color: colors.text + '60' }]}>
                  Explore our comprehensive API documentation and SDKs to integrate with your applications.
                </Text>
                <TouchableOpacity style={[styles.apiDocsBtn, { backgroundColor: colors.primary + '15' }]}>
                  <ExternalLink size={16} color={colors.primary} />
                  <Text style={[styles.apiDocsBtnText, { color: colors.primary }]}>View Documentation</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Animated.View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {showNewKeyModal && (
        <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
          <View style={[styles.modal, { backgroundColor: colors.card }]}>
            <View style={styles.modalHeader}>
              <Key size={24} color={colors.primary} />
              <Text style={[styles.modalTitle, { color: colors.text }]}>Create New API Key</Text>
            </View>
            <Text style={[styles.modalDesc, { color: colors.text + '60' }]}>
              Enter a name for your new API key. This will help you identify it later.
            </Text>
            <TextInput
              style={[styles.modalInput, { color: colors.text, backgroundColor: colors.border + '30' }]}
              placeholder="e.g., Production Server"
              placeholderTextColor={colors.text + '40'}
              value={newKeyName}
              onChangeText={setNewKeyName}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn, { borderColor: colors.border }]}
                onPress={() => setShowNewKeyModal(false)}
              >
                <Text style={[styles.cancelText, { color: colors.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.createBtn, { backgroundColor: colors.primary }]} 
                onPress={createNewKey}
              >
                <Text style={styles.createText}>Create Key</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { borderBottomWidth: 1 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  headerTitle: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  titleText: { fontSize: 18, fontWeight: '600' },
  tabContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#00000008',
  },
  tabText: { fontSize: 14, fontWeight: '500' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#00000008',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: 44, fontSize: 16 },
  content: { flex: 1, padding: 16 },
  integrationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  integrationCard: {
    width: '48%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  integrationHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  integrationIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  integrationStatus: {},
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  connected: { backgroundColor: '#10B98115' },
  disconnected: { backgroundColor: '#EF444415' },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, fontWeight: '600' },
  integrationName: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  integrationDesc: { fontSize: 13, lineHeight: 18, marginBottom: 12 },
  configureBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  configureText: { fontSize: 14, fontWeight: '600' },
  apiKeysSection: { gap: 12 },
  securityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderLeftWidth: 4,
  },
  securityInfo: { flex: 1 },
  securityTitle: { fontSize: 15, fontWeight: '600', marginBottom: 2 },
  securityDesc: { fontSize: 13, lineHeight: 18 },
  createKeyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
  },
  createKeyText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  apiKeyCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  apiKeyHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  apiKeyInfo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  apiKeyName: { fontSize: 15, fontWeight: '600' },
  apiKeyStatus: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  activeBadge: { backgroundColor: '#10B98115' },
  inactiveBadge: { backgroundColor: '#EF444415' },
  apiKeyStatusText: { fontSize: 11, fontWeight: '600' },
  apiKeyActions: { flexDirection: 'row', gap: 12 },
  keyDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  keyText: { fontSize: 13, fontFamily: 'monospace' },
  keyMeta: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  keyMetaText: { fontSize: 12 },
  scopesContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  scopeChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  scopeText: { fontSize: 11, fontWeight: '600' },
  apiDocsCard: {
    backgroundColor: '#00000005',
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
  },
  apiDocsHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  apiDocsTitle: { fontSize: 16, fontWeight: '600' },
  apiDocsDesc: { fontSize: 14, lineHeight: 20, marginBottom: 16 },
  apiDocsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 10,
  },
  apiDocsBtnText: { fontSize: 14, fontWeight: '600' },
  bottomSpacing: { height: 40 },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    padding: 24,
  },
  modalHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  modalTitle: { fontSize: 18, fontWeight: '600' },
  modalDesc: { fontSize: 14, lineHeight: 20, marginBottom: 16 },
  modalInput: {
    padding: 14,
    borderRadius: 12,
    fontSize: 15,
    marginBottom: 20,
  },
  modalActions: { flexDirection: 'row', gap: 10 },
  modalBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  cancelBtn: { borderWidth: 1 },
  cancelText: { fontSize: 15, fontWeight: '600' },
  createBtn: {},
  createText: { color: '#fff', fontSize: 15, fontWeight: '600' },
});
