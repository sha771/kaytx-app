import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal, FlatList, TextInput, Switch, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Icons from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const layerData = {
  id: 'translation',
  layerNumber: 6,
  name: 'Translation',
  description: 'Bridge between business language and AI, filtering and routing requests. This layer converts natural language into actionable AI commands.',
  color: '#F97316',
  gradient: ['#F97316', '#EA580C'] as [string, string],
  agentCount: 15,
  tokenUsage: 50,
  optimizedTokenUsage: 15,
  workType: 'Communication',
  flow: 'Bridge',
  features: ['Natural Language Understanding', 'Intent Recognition', 'Request Routing', 'Priority Management', 'Cross-Layer Coordination', 'Language Normalization'],
  components: [
    { id: 'business-translator', name: 'Business → AI Translation', description: 'Convert business language to AI commands', icon: 'Globe', route: '/ai-agent/translation/business' },
    { id: 'natural-language', name: 'Natural Language Processor', description: 'Understand human language', icon: 'MessageSquare', route: '/ai-agent/translation/nlp' },
    { id: 'intent-detector', name: 'Intent Detector', description: 'Identify user intent', icon: 'Search', route: '/ai-agent/translation/intent' },
    { id: 'request-filter', name: 'Request Filtering & Routing', description: 'Filter and route requests', icon: 'Workflow', route: '/ai-agent/translation/filter' },
    { id: 'priority-router', name: 'Priority Router', description: 'Route by priority', icon: 'Zap', route: '/ai-agent/translation/priority' },
    { id: 'department-router', name: 'Department Router', description: 'Route to correct department', icon: 'Layers', route: '/ai-agent/translation/department' },
    { id: 'cross-layer', name: 'Cross-Layer Coordination', description: 'Coordinate between layers', icon: 'Network', route: '/ai-agent/translation/cross-layer' },
    { id: 'context-bridge', name: 'Context Bridge', description: 'Pass context between layers', icon: 'Database', route: '/ai-agent/translation/context' },
    { id: 'language-normalizer', name: 'Language Normalizer', description: 'Standardize input formats', icon: 'Globe', route: '/ai-agent/translation/normalize' },
  ],
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

const iconMap: Record<string, any> = { Globe: Icons.Globe, MessageSquare: Icons.MessageSquare, Search: Icons.Search, Workflow: Icons.Workflow, Zap: Icons.Zap, Layers: Icons.Layers, Network: Icons.Network, Database: Icons.Database };

const LayerTranslation = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'overview' | 'components' | 'environment' | 'options'>('overview');
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [showComponentModal, setShowComponentModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [environment, setEnvironment] = useState({ mode: 'balanced', languages: 'all', autoDetect: true });
  const [options, setOptions] = useState({ enableNLU: true, enableIntent: true, enableRouting: true, enablePriority: true, enableCrossLayer: true, enableNormalization: true });

  const filteredComponents = useMemo(() => {
    if (!searchQuery) return layerData.components;
    return layerData.components.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const stats = useMemo(() => [
    { label: 'Requests Processed', value: '156K', icon: Icons.MessageSquare, color: '#F97316', trend: '+24K' },
    { label: 'Accuracy', value: '97.3%', icon: Icons.CheckCircle, color: '#10B981', trend: '+1.2%' },
    { label: 'Avg Response', value: '45ms', icon: Icons.Zap, color: '#6366F1', trend: '-12ms' },
    { label: 'Languages', value: '42', icon: Icons.Globe, color: '#EC4899', trend: '+5' },
  ], []);

  const languageMetrics = useMemo(() => [
    { lang: 'English', requests: 45200, accuracy: 99 },
    { lang: 'Spanish', requests: 32100, accuracy: 98 },
    { lang: 'French', requests: 18900, accuracy: 97 },
    { lang: 'German', requests: 15600, accuracy: 98 },
    { lang: 'Chinese', requests: 12400, accuracy: 96 },
  ], []);

  const renderOverview = () => (
    <View style={styles.overviewContainer}>
      <View style={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <View key={idx} style={[styles.statCard, { backgroundColor: colors.card }]}>
            <View style={styles.statHeader}>
              <stat.icon size={20} color={stat.color} />
              <Text style={[styles.statTrend, { color: stat.trend.startsWith('+') || stat.trend.startsWith('-') ? '#10B981' : '#EF4444' }]}>{stat.trend}</Text>
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Language Performance</Text>
        <View style={[styles.langCard, { backgroundColor: colors.card }]}>
          {languageMetrics.map((item, idx) => (
            <View key={idx} style={styles.langRow}>
              <View style={styles.langInfo}>
                <Text style={[styles.langName, { color: colors.text }]}>{item.lang}</Text>
                <View style={[styles.langBar, { backgroundColor: colors.border }]}>
                  <View style={[styles.langProgress, { width: `${item.accuracy}%`, backgroundColor: '#F97316' }]} />
                </View>
              </View>
              <View style={styles.langStats}>
                <Text style={[styles.langRequests, { color: colors.text }]}>{item.requests.toLocaleString()}</Text>
                <Text style={[styles.langAccuracy, { color: item.accuracy >= 95 ? '#10B981' : '#F59E0B' }]}>{item.accuracy}%</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Translation Pipeline</Text>
        <View style={[styles.pipelineCard, { backgroundColor: colors.card }]}>
          <View style={styles.pipelineStep}><View style={[styles.pipelineDot, { backgroundColor: '#F97316' }]} /><Text style={[styles.pipelineText, { color: colors.text }]}>Input</Text></View>
          <View style={[styles.pipelineLine, { backgroundColor: colors.border }]} />
          <View style={styles.pipelineStep}><View style={[styles.pipelineDot, { backgroundColor: '#6366F1' }]} /><Text style={[styles.pipelineText, { color: colors.text }]}>Process</Text></View>
          <View style={[styles.pipelineLine, { backgroundColor: colors.border }]} />
          <View style={styles.pipelineStep}><View style={[styles.pipelineDot, { backgroundColor: '#10B981' }]} /><Text style={[styles.pipelineText, { color: colors.text }]}>Output</Text></View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Features</Text>
        <View style={styles.featuresGrid}>
          {layerData.features.map((feature, idx) => (
            <View key={idx} style={[styles.featureCard, { backgroundColor: colors.card }]}>
              <Icons.CheckCircle size={18} color="#F97316" />
              <Text style={[styles.featureText, { color: colors.text }]}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderComponents = () => (
    <View style={styles.componentsContainer}>
      <View style={styles.searchContainer}>
        <Icons.Search size={18} color={colors.textSecondary} />
        <TextInput style={[styles.searchInput, { color: colors.text }]} placeholder="Search translators..." placeholderTextColor={colors.textSecondary} value={searchQuery} onChangeText={setSearchQuery} />
      </View>
      <FlatList data={filteredComponents} keyExtractor={(item) => item.id} renderItem={({ item }) => {
        const IconComponent = iconMap[item.icon] || Icons.Circle;
        return (
          <TouchableOpacity style={[styles.componentCard, { backgroundColor: colors.card }]} onPress={() => { setSelectedComponent(item); setShowComponentModal(true); }}>
            <View style={[styles.componentIcon, { backgroundColor: layerData.color + '20' }]}><IconComponent size={22} color={layerData.color} /></View>
            <View style={styles.componentContent}><Text style={[styles.componentName, { color: colors.text }]}>{item.name}</Text><Text style={[styles.componentDescription, { color: colors.textSecondary }]} numberOfLines={2}>{item.description}</Text></View>
            <Icons.ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        );
      }} contentContainerStyle={styles.componentsList} />
    </View>
  );

  const renderEnvironment = () => (
    <ScrollView style={styles.environmentContainer}>
      <View style={styles.envSection}>
        <Text style={[styles.envTitle, { color: colors.text }]}>Translation Mode</Text>
        <View style={styles.modeButtons}>
          {(['basic', 'balanced', 'advanced'] as const).map(mode => (
            <TouchableOpacity key={mode} style={[styles.modeButton, environment.mode === mode && { backgroundColor: layerData.color }]} onPress={() => setEnvironment(prev => ({ ...prev, mode }))}>
              <Text style={[styles.modeButtonText, environment.mode === mode && { color: '#FFFFFF' }]}>{mode.charAt(0).toUpperCase() + mode.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.envSection}>
        <Text style={[styles.envTitle, { color: colors.text }]}>Languages</Text>
        <View style={[styles.toggleCard, { backgroundColor: colors.card }]}>
          <View style={styles.toggleRow}>
            <View><Text style={[styles.toggleTitle, { color: colors.text }]}>Auto-detect</Text><Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>Detect language automatically</Text></View>
            <Switch value={environment.autoDetect} onValueChange={(value) => setEnvironment(prev => ({ ...prev, autoDetect: value }))} trackColor={{ false: colors.border, true: layerData.color + '80' }} thumbColor={environment.autoDetect ? layerData.color : '#f4f3f4'} />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={() => Alert.alert('Saved', 'Translation environment updated.')}>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.saveButtonGradient}><Icons.Save size={20} color="#FFFFFF" /><Text style={styles.saveButtonText}>Save Environment</Text></LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderOptions = () => (
    <ScrollView style={styles.optionsContainer}>
      <View style={styles.optionsSection}>
        <Text style={[styles.optionsTitle, { color: colors.text }]}>Translation Options</Text>
        {[{ key: 'enableNLU', label: 'Natural Language Understanding', desc: 'Parse human language' }, { key: 'enableIntent', label: 'Intent Recognition', desc: 'Identify user goals' }, { key: 'enableRouting', label: 'Request Routing', desc: 'Route to handlers' }, { key: 'enablePriority', label: 'Priority Management', desc: 'Handle urgency' }, { key: 'enableCrossLayer', label: 'Cross-Layer Coord', desc: 'Layer communication' }, { key: 'enableNormalization', label: 'Language Normalization', desc: 'Standardize inputs' }].map(opt => (
          <View key={opt.key} style={[styles.optionCard, { backgroundColor: colors.card }]}>
            <View style={styles.optionRow}>
              <View style={styles.optionInfo}><Text style={[styles.optionLabel, { color: colors.text }]}>{opt.label}</Text><Text style={[styles.optionDesc, { color: colors.textSecondary }]}>{opt.desc}</Text></View>
              <Switch value={options[opt.key as keyof typeof options] as boolean} onValueChange={(value) => setOptions(prev => ({ ...prev, [opt.key]: value }))} trackColor={{ false: colors.border, true: layerData.color + '80' }} thumbColor={options[opt.key as keyof typeof options] ? layerData.color : '#f4f3f4'} />
            </View>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={() => Alert.alert('Saved', 'Options updated.')}>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.saveButtonGradient}><Icons.Save size={20} color="#FFFFFF" /><Text style={styles.saveButtonText}>Save Options</Text></LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient colors={layerData.gradient} style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}><Icons.ArrowLeft size={24} color="#FFFFFF" /></TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <View style={styles.headerTitleRow}><Text style={styles.layerNumber}>L6</Text><Text style={styles.headerTitle}>{layerData.name}</Text></View>
            <Text style={styles.headerSubtitle}>{layerData.workType} Layer</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}><Icons.Settings size={22} color="#FFFFFF" /></TouchableOpacity>
        </View>
        <Text style={styles.headerDescription}>{layerData.description}</Text>
        <View style={styles.headerStats}>
          <View style={styles.headerStat}><Icons.Users size={16} color="rgba(255,255,255,0.8)" /><Text style={styles.headerStatText}>{layerData.agentCount} Agents</Text></View>
          <View style={styles.headerStat}><Icons.Zap size={16} color="rgba(255,255,255,0.8)" /><Text style={styles.headerStatText}>{layerData.optimizedTokenUsage} Tokens</Text></View>
          <View style={styles.headerStat}><Icons.Activity size={16} color="rgba(255,255,255,0.8)" /><Text style={styles.headerStatText}>{layerData.flow}</Text></View>
        </View>
      </LinearGradient>

      <View style={styles.tabContainer}>
        {[{ key: 'overview', label: 'Overview', icon: Icons.LayoutDashboard }, { key: 'components', label: 'Components', icon: Icons.Layers }, { key: 'environment', icon: Icons.Server, label: 'Environment' }, { key: 'options', label: 'Options', icon: Icons.Settings }].map(tab => (
          <TouchableOpacity key={tab.key} style={[styles.tab, activeTab === tab.key && styles.tabActive]} onPress={() => setActiveTab(tab.key as any)}>
            {activeTab === tab.key && <View style={styles.tabIndicator} />}
            <tab.icon size={18} color={activeTab === tab.key ? layerData.color : 'rgba(255,255,255,0.6)'} />
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'components' && renderComponents()}
        {activeTab === 'environment' && renderEnvironment()}
        {activeTab === 'options' && renderOptions()}
      </ScrollView>

      <Modal visible={showComponentModal} animationType="slide" transparent onRequestClose={() => setShowComponentModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            {selectedComponent && (
              <>
                <LinearGradient colors={layerData.gradient} style={styles.modalHeader}>
                  <View style={styles.modalHeaderRow}>
                    <View style={styles.modalIconContainer}>{React.createElement(iconMap[selectedComponent.icon] || Icons.Circle, { size: 28, color: '#FFFFFF' })}</View>
                    <TouchableOpacity style={styles.modalCloseButton} onPress={() => setShowComponentModal(false)}><Icons.X size={24} color="#FFFFFF" /></TouchableOpacity>
                  </View>
                  <Text style={styles.modalTitle}>{selectedComponent.name}</Text>
                </LinearGradient>
                <ScrollView style={styles.modalBody}>
                  <Text style={[styles.modalDescription, { color: colors.text }]}>{selectedComponent.description}</Text>
                  <TouchableOpacity style={[styles.modalActionButton, { backgroundColor: layerData.color }]} onPress={() => { setShowComponentModal(false); if (selectedComponent.route) router.push(selectedComponent.route as any); }}><Icons.ExternalLink size={18} color="#FFFFFF" /><Text style={styles.modalActionText}>Open Translator</Text></TouchableOpacity>
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 }, header: { padding: 16, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }, headerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 }, backButton: { padding: 8, marginRight: 8 }, headerTitleContainer: { flex: 1 }, headerTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 }, layerNumber: { fontSize: 14, fontWeight: '700', color: 'rgba(255,255,255,0.7)', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 }, headerTitle: { fontSize: 22, fontWeight: '700', color: '#FFFFFF' }, headerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 }, settingsButton: { padding: 8 }, headerDescription: { fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 18, marginBottom: 12 }, headerStats: { flexDirection: 'row', gap: 16 }, headerStat: { flexDirection: 'row', alignItems: 'center', gap: 4 }, headerStatText: { fontSize: 12, color: 'rgba(255,255,255,0.8)' }, tabContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, gap: 8 }, tab: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.1)', position: 'relative' }, tabActive: { backgroundColor: 'rgba(255,255,255,0.15)' }, tabIndicator: { position: 'absolute', top: 0, left: '20%', right: '20%', height: 3, backgroundColor: '#FFFFFF', borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }, tabLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4 }, tabLabelActive: { color: '#FFFFFF', fontWeight: '600' }, content: { flex: 1, paddingHorizontal: 16 }, overviewContainer: { paddingVertical: 16 }, statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },  statCard: { width: (width - 42) / 2, padding: 14, borderRadius: 12, alignItems: 'center' },
  statHeader: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' },
  statTrend: { fontSize: 11, fontWeight: '600' },
  statValue: { fontSize: 20, fontWeight: '700', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 2 },
  langCard: { padding: 16, borderRadius: 12 },
  langRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  langInfo: { flex: 1, marginRight: 16 },
  langName: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  langBar: { height: 6, borderRadius: 3, overflow: 'hidden' },
  langProgress: { height: '100%', borderRadius: 3 },
  langStats: { alignItems: 'flex-end' },
  langRequests: { fontSize: 12, fontWeight: '500', marginBottom: 2 },
  langAccuracy: { fontSize: 12, fontWeight: '700' }, section: { marginBottom: 20 }, sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 12 }, pipelineCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderRadius: 12 }, pipelineStep: { alignItems: 'center' }, pipelineDot: { width: 12, height: 12, borderRadius: 6, marginBottom: 6 }, pipelineLine: { flex: 1, height: 2, marginHorizontal: 8 }, pipelineText: { fontSize: 12, fontWeight: '500' }, featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, featureCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, gap: 8 }, featureText: { fontSize: 13, fontWeight: '500' }, componentsContainer: { paddingVertical: 16 }, searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1F2937', borderRadius: 10, paddingHorizontal: 12, height: 44, marginBottom: 16 }, searchInput: { flex: 1, fontSize: 14, marginLeft: 8 }, componentsList: { gap: 10 }, componentCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12 }, componentIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 }, componentContent: { flex: 1 }, componentName: { fontSize: 15, fontWeight: '600', marginBottom: 2 }, componentDescription: { fontSize: 12 }, environmentContainer: { paddingVertical: 16 }, envSection: { marginBottom: 24 }, envTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 }, modeButtons: { flexDirection: 'row', gap: 8 }, modeButton: { flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: '#374151', alignItems: 'center' }, modeButtonText: { fontSize: 12, color: '#FFFFFF', fontWeight: '500' }, toggleCard: { padding: 14, borderRadius: 12, marginBottom: 10 }, toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, toggleTitle: { fontSize: 14, fontWeight: '600', marginBottom: 2 }, toggleDescription: { fontSize: 12 }, optionsContainer: { paddingVertical: 16 }, optionsSection: { marginBottom: 24 }, optionsTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 }, optionCard: { padding: 14, borderRadius: 12, marginBottom: 10 }, optionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, optionInfo: { flex: 1, marginRight: 12 }, optionLabel: { fontSize: 14, fontWeight: '600', marginBottom: 2 }, optionDesc: { fontSize: 12 }, saveButton: { marginTop: 8, marginBottom: 32 }, saveButtonGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 12, gap: 8 }, saveButtonText: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' }, modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' }, modalContent: { borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '80%' }, modalHeader: { padding: 20, borderTopLeftRadius: 24, borderTopRightRadius: 24 }, modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }, modalIconContainer: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' }, modalCloseButton: { padding: 8 }, modalTitle: { fontSize: 22, fontWeight: '700', color: '#FFFFFF' }, modalBody: { padding: 20 }, modalDescription: { fontSize: 15, lineHeight: 22, marginBottom: 20 }, modalActionButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 12, gap: 8 }, modalActionText: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
});

export default LayerTranslation;
