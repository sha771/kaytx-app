import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal, FlatList, TextInput, Switch, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Icons from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const layerData = {
  id: 'workforce',
  layerNumber: 10,
  name: 'Workforce',
  description: '1108+ AI Agents handling task execution with 24/7 productivity. This layer manages the complete workforce of specialized AI agents.',
  color: '#14B8A6',
  gradient: ['#14B8A6', '#0D9488'] as [string, string],
  agentCount: 1108,
  tokenUsage: 800,
  optimizedTokenUsage: 200,
  workType: 'Execution',
  flow: 'Do tasks',
  features: ['1108+ Specialized Agents', '24/7 Availability', 'Task Distribution', 'Performance Optimization', 'Continuous Learning', 'Scalable Execution'],
  components: [
    { id: 'reactive-agents', name: 'Reactive Agents', description: 'Respond to specific triggers', icon: 'Bot', route: '/ai-agent/workforce/reactive' },
    { id: 'learning-agents', name: 'Learning Agents', description: 'Improve from feedback', icon: 'Brain', route: '/ai-agent/workforce/learning' },
    { id: 'swarm-agents', name: 'Swarm Agents', description: 'Collaborative task handling', icon: 'Network', route: '/ai-agent/workforce/swarm' },
    { id: 'specialist-agents', name: 'Specialist Agents', description: 'Domain-specific experts', icon: 'Lightbulb', route: '/ai-agent/workforce/specialist' },
    { id: 'general-agents', name: 'General Agents', description: 'Multi-purpose agents', icon: 'Bot', route: '/ai-agent/workforce/general' },
    { id: 'assistant-agents', name: 'Assistant Agents', description: 'Helpdesk and support', icon: 'Users', route: '/ai-agent/workforce/assistant' },
    { id: 'automation-agents', name: 'Automation Agents', description: 'Process automation', icon: 'Zap', route: '/ai-agent/workforce/automation' },
    { id: 'analysis-agents', name: 'Analysis Agents', description: 'Data analysis', icon: 'BarChart3', route: '/ai-agent/workforce/analysis' },
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

const iconMap: Record<string, any> = { Bot: Icons.Bot, Brain: Icons.Brain, Network: Icons.Network, Lightbulb: Icons.Lightbulb, Users: Icons.Users, Zap: Icons.Zap, BarChart3: Icons.BarChart3 };

const LayerWorkforce = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'overview' | 'components' | 'environment' | 'options'>('overview');
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [showComponentModal, setShowComponentModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [environment, setEnvironment] = useState({ mode: 'balanced', scaling: 'auto', distribution: 'smart' });
  const [options, setOptions] = useState({ enableReactive: true, enableLearning: true, enableSwarm: true, enableSpecialist: true, enableGeneral: true, enableAssistant: true });

  const filteredComponents = useMemo(() => {
    if (!searchQuery) return layerData.components;
    return layerData.components.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const stats = useMemo(() => [
    { label: 'Active Agents', value: '1,108', icon: Icons.Bot, color: '#14B8A6', trend: '+156' },
    { label: 'Tasks/min', value: '4.2K', icon: Icons.Zap, color: '#F59E0B', trend: '+820' },
    { label: 'Uptime', value: '99.99%', icon: Icons.Activity, color: '#10B981', trend: '0%' },
    { label: 'Avg Rating', value: '4.8', icon: Icons.Star, color: '#EC4899', trend: '+0.2' },
  ], []);

  const workforceMetrics = useMemo(() => [
    { role: 'Sales Agents', active: 245, efficiency: 94, tasks: '1.2K/min' },
    { role: 'Support Agents', active: 189, efficiency: 92, tasks: '890/min' },
    { role: 'Data Agents', active: 156, efficiency: 97, tasks: '1.5K/min' },
    { role: 'Analysis Agents', active: 98, efficiency: 89, tasks: '560/min' },
  ], []);

  const renderOverview = () => (
    <View style={styles.overviewContainer}>
      <View style={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <View key={idx} style={[styles.statCard, { backgroundColor: colors.card }]}>
            <View style={styles.statHeader}>
              <stat.icon size={20} color={stat.color} />
              <Text style={[styles.statTrend, { color: stat.trend.startsWith('+') ? '#10B981' : '#6B7280' }]}>{stat.trend}</Text>
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Agent Performance</Text>
        <View style={[styles.workCard, { backgroundColor: colors.card }]}>
          {workforceMetrics.map((item, idx) => (
            <View key={idx} style={styles.workRow}>
              <View style={styles.workInfo}>
                <Text style={[styles.workRole, { color: colors.text }]}>{item.role}</Text>
                <View style={[styles.workBar, { backgroundColor: colors.border }]}>
                  <View style={[styles.workProgress, { width: `${item.efficiency}%`, backgroundColor: '#14B8A6' }]} />
                </View>
              </View>
              <View style={styles.workStats}>
                <Text style={[styles.workTasks, { color: colors.text }]}>{item.tasks}</Text>
                <Text style={[styles.workEff, { color: item.efficiency >= 90 ? '#10B981' : '#F59E0B' }]}>{item.efficiency}%</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Workforce Distribution</Text>
        <View style={[styles.distCard, { backgroundColor: colors.card }]}>
          {['Reactive', 'Learning', 'Swarm', 'Specialist', 'General', 'Assistant'].map((type, idx) => (
            <View key={type} style={styles.distRow}>
              <Text style={[styles.distLabel, { color: colors.text }]}>{type}</Text>
              <Text style={[styles.distValue, { color: layerData.color }]}>{Math.floor(Math.random() * 200) + 50}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Features</Text>
        <View style={styles.featuresGrid}>
          {layerData.features.map((feature, idx) => (
            <View key={idx} style={[styles.featureCard, { backgroundColor: colors.card }]}>
              <Icons.CheckCircle size={18} color="#14B8A6" />
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
        <TextInput style={[styles.searchInput, { color: colors.text }]} placeholder="Search agents..." placeholderTextColor={colors.textSecondary} value={searchQuery} onChangeText={setSearchQuery} />
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
        <Text style={[styles.envTitle, { color: colors.text }]}>Workforce Mode</Text>
        <View style={styles.modeButtons}>
          {(['conservative', 'balanced', 'aggressive'] as const).map(mode => (
            <TouchableOpacity key={mode} style={[styles.modeButton, environment.mode === mode && { backgroundColor: layerData.color }]} onPress={() => setEnvironment(prev => ({ ...prev, mode }))}>
              <Text style={[styles.modeButtonText, environment.mode === mode && { color: '#FFFFFF' }]}>{mode.charAt(0).toUpperCase() + mode.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.envSection}>
        <Text style={[styles.envTitle, { color: colors.text }]}>Scaling</Text>
        <View style={[styles.toggleCard, { backgroundColor: colors.card }]}>
          <View style={styles.toggleRow}>
            <View><Text style={[styles.toggleTitle, { color: colors.text }]}>Auto Scaling</Text><Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>Scale workforce automatically</Text></View>
            <Switch value={environment.scaling === 'auto'} onValueChange={(value) => setEnvironment(prev => ({ ...prev, scaling: value ? 'auto' : 'manual' }))} trackColor={{ false: colors.border, true: layerData.color + '80' }} thumbColor={environment.scaling === 'auto' ? layerData.color : '#f4f3f4'} />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={() => Alert.alert('Saved', 'Workforce environment updated.')}>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.saveButtonGradient}><Icons.Save size={20} color="#FFFFFF" /><Text style={styles.saveButtonText}>Save Environment</Text></LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderOptions = () => (
    <ScrollView style={styles.optionsContainer}>
      <View style={styles.optionsSection}>
        <Text style={[styles.optionsTitle, { color: colors.text }]}>Agent Types</Text>
        {[{ key: 'enableReactive', label: 'Reactive Agents', desc: 'Trigger-based' }, { key: 'enableLearning', label: 'Learning Agents', desc: 'Adaptive' }, { key: 'enableSwarm', label: 'Swarm Agents', desc: 'Collaborative' }, { key: 'enableSpecialist', label: 'Specialist Agents', desc: 'Domain experts' }, { key: 'enableGeneral', label: 'General Agents', desc: 'Multi-purpose' }, { key: 'enableAssistant', label: 'Assistant Agents', desc: 'Support' }].map(opt => (
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
            <View style={styles.headerTitleRow}><Text style={styles.layerNumber}>L10</Text><Text style={styles.headerTitle}>{layerData.name}</Text></View>
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
                  <TouchableOpacity style={[styles.modalActionButton, { backgroundColor: layerData.color }]} onPress={() => { setShowComponentModal(false); if (selectedComponent.route) router.push(selectedComponent.route as any); }}><Icons.ExternalLink size={18} color="#FFFFFF" /><Text style={styles.modalActionText}>Open Agent Group</Text></TouchableOpacity>
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
  container: { flex: 1 }, 
  header: { 
    padding: 16, 
    borderBottomLeftRadius: 24, 
    borderBottomRightRadius: 24, 
    backgroundColor: '#2F343A' 
  }, 
  headerTop: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12 
  }, 
  backButton: { 
    padding: 8, 
    marginRight: 8 
  }, 
  headerTitleContainer: { 
    flex: 1 
  }, 
  headerTitleRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8 
  }, 
  layerNumber: { 
    fontSize: 14, 
    fontWeight: '700', 
    color: '#FFFFFF', 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    paddingHorizontal: 8, 
    paddingVertical: 2, 
    borderRadius: 8 
  }, 
  headerTitle: { 
    fontSize: 22, 
    fontWeight: '700', 
    color: '#FFFFFF' 
  }, 
  headerSubtitle: { 
    fontSize: 13, 
    color: 'rgba(255,255,255,0.7)', 
    marginTop: 2 
  }, 
  settingsButton: { 
    padding: 8 
  }, 
  headerDescription: { 
    fontSize: 13, 
    color: 'rgba(255,255,255,0.8)', 
    lineHeight: 18, 
    marginBottom: 12 
  }, 
  headerStats: { 
    flexDirection: 'row', 
    gap: 16 
  }, 
  headerStat: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 4 
  }, 
  headerStatText: { 
    fontSize: 12, 
    color: 'rgba(255,255,255,0.8)' 
  }, 
  tabContainer: { 
    flexDirection: 'row', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    gap: 8, 
    backgroundColor: '#2F343A' 
  }, 
  tab: { 
    flex: 1, 
    alignItems: 'center', 
    paddingVertical: 8, 
    borderRadius: 10, 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    position: 'relative' 
  }, 
  tabActive: { 
    backgroundColor: 'rgba(255,255,255,0.15)' 
  }, 
  tabIndicator: { 
    position: 'absolute', 
    top: 0, 
    left: '20%', 
    right: '20%', 
    height: 3, 
    backgroundColor: '#FFFFFF', 
    borderBottomLeftRadius: 3, 
    borderBottomRightRadius: 3 
  }, 
  tabLabel: { 
    fontSize: 11, 
    color: 'rgba(255,255,255,0.6)', 
    marginTop: 4 
  }, 
  tabLabelActive: { 
    color: '#FFFFFF', 
    fontWeight: '600' 
  }, 
  content: { 
    flex: 1, 
    paddingHorizontal: 16 
  }, 
  overviewContainer: { 
    paddingVertical: 16 
  }, 
  statsGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 10, 
    marginBottom: 20 
  }, 
  statCard: { 
    width: (width - 42) / 2, 
    padding: 14, 
    borderRadius: 12, 
    alignItems: 'center', 
    backgroundColor: '#2F343A' 
  },
  statHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    alignItems: 'center' 
  },
  statTrend: { 
    fontSize: 11, 
    fontWeight: '600', 
    color: '#FFFFFF' 
  },
  statValue: { 
    fontSize: 20, 
    fontWeight: '700', 
    marginTop: 8, 
    color: '#FFFFFF' 
  },
  statLabel: { 
    fontSize: 11, 
    marginTop: 2, 
    color: '#FFFFFF' 
  },
  workCard: { 
    padding: 16, 
    borderRadius: 12, 
    backgroundColor: '#2F343A' 
  },
  workRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 10 
  },
  workInfo: { 
    flex: 1, 
    marginRight: 16 
  },
  workRole: { 
    fontSize: 14, 
    fontWeight: '600', 
    marginBottom: 6, 
    color: '#FFFFFF' 
  },
  workBar: { 
    height: 6, 
    borderRadius: 3, 
    overflow: 'hidden', 
    backgroundColor: '#4B5563' 
  },
  workProgress: { 
    height: '100%', 
    borderRadius: 3, 
    backgroundColor: '#8B9467' 
  },
  workStats: { 
    alignItems: 'flex-end' 
  },
  workTasks: { 
    fontSize: 12, 
    fontWeight: '500', 
    marginBottom: 2, 
    color: '#FFFFFF' 
  },
  workEff: { 
    fontSize: 12, 
    fontWeight: '700', 
    color: '#8B9467' 
  }, 
  section: { 
    marginBottom: 20 
  }, 
  sectionTitle: { 
    fontSize: 17, 
    fontWeight: '700', 
    marginBottom: 12, 
    color: '#FFFFFF' 
  }, 
  distCard: { 
    padding: 16, 
    borderRadius: 12, 
    backgroundColor: '#2F343A' 
  },
  distRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingVertical: 8 
  },
  distLabel: { 
    fontSize: 14, 
    color: '#FFFFFF' 
  },
  distValue: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#8B9467' 
  },
  featuresGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 8 
  },
  featureCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 10, 
    gap: 8, 
    backgroundColor: '#2F343A' 
  },
  featureText: { 
    fontSize: 13, 
    fontWeight: '500', 
    color: '#FFFFFF' 
  },
  componentsContainer: { 
    paddingVertical: 16 
  },
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#1F2937', 
    borderRadius: 10, 
    paddingHorizontal: 12, 
    height: 44, 
    marginBottom: 16 
  },
  searchInput: { 
    flex: 1, 
    fontSize: 14, 
    marginLeft: 8, 
    color: '#FFFFFF' 
  },
  componentsList: { 
    gap: 10 
  },
  componentCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 14, 
    borderRadius: 12, 
    backgroundColor: '#2F343A' 
  },
  componentIcon: { 
    width: 44, 
    height: 44, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12, 
    backgroundColor: '#4B5563' 
  },
  componentContent: { 
    flex: 1 
  },
  componentName: { 
    fontSize: 15, 
    fontWeight: '600', 
    marginBottom: 2, 
    color: '#FFFFFF' 
  },
  componentDescription: { 
    fontSize: 12, 
    color: '#FFFFFF' 
  },
  environmentContainer: { 
    paddingVertical: 16 
  },
  envSection: { 
    marginBottom: 24 
  },
  envTitle: { 
    fontSize: 16, 
    fontWeight: '700', 
    marginBottom: 12, 
    color: '#FFFFFF' 
  },
  modeButtons: { 
    flexDirection: 'row', 
    gap: 8 
  },
  modeButton: { 
    flex: 1, 
    paddingVertical: 10, 
    borderRadius: 10, 
    backgroundColor: '#374151', 
    alignItems: 'center' 
  },
  modeButtonText: { 
    fontSize: 12, 
    color: '#FFFFFF', 
    fontWeight: '500' 
  },
  toggleCard: { 
    padding: 14, 
    borderRadius: 12, 
    marginBottom: 10, 
    backgroundColor: '#2F343A' 
  },
  toggleRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  toggleTitle: { 
    fontSize: 14, 
    fontWeight: '600', 
    marginBottom: 2, 
    color: '#FFFFFF' 
  },
  toggleDescription: { 
    fontSize: 12, 
    color: '#FFFFFF' 
  },
  optionsContainer: { 
    paddingVertical: 16 
  },
  optionsSection: { 
    marginBottom: 24 
  },
  optionsTitle: { 
    fontSize: 16, 
    fontWeight: '700', 
    marginBottom: 12, 
    color: '#FFFFFF' 
  },
  optionCard: { 
    padding: 14, 
    borderRadius: 12, 
    marginBottom: 10, 
    backgroundColor: '#2F343A' 
  },
  optionRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  optionInfo: { 
    flex: 1, 
    marginRight: 12 
  },
  optionLabel: { 
    fontSize: 14, 
    fontWeight: '600', 
    marginBottom: 2, 
    color: '#FFFFFF' 
  },
  optionDesc: { 
    fontSize: 12, 
    color: '#FFFFFF' 
  },
  saveButton: { 
    marginTop: 8, 
    marginBottom: 32 
  },
  saveButtonGradient: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 14, 
    borderRadius: 12, 
    gap: 8 
  },
  saveButtonText: { 
    fontSize: 15, 
    fontWeight: '700', 
    color: '#FFFFFF' 
  },
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.8)', 
    justifyContent: 'flex-end' 
  },
  modalContent: { 
    borderTopLeftRadius: 24, 
    borderTopRightRadius: 24, 
    maxHeight: '80%', 
    backgroundColor: '#2F343A' 
  },
  modalHeader: { 
    padding: 20, 
    borderTopLeftRadius: 24, 
    borderTopRightRadius: 24 
  },
  modalHeaderRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  modalIconContainer: { 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  modalCloseButton: { 
    padding: 8 
  },
  modalTitle: { 
    fontSize: 22, 
    fontWeight: '700', 
    color: '#FFFFFF' 
  },
  modalBody: { 
    padding: 20 
  },
  modalDescription: { 
    fontSize: 15, 
    lineHeight: 22, 
    marginBottom: 20, 
    color: '#FFFFFF' 
  },
  modalActionButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 14, 
    borderRadius: 12, 
    gap: 8 
  },
  modalActionText: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#FFFFFF' 
  },
});

export default LayerWorkforce;
