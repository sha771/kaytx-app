import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  FlatList,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Icons from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const layerData = {
  id: 'leadership',
  layerNumber: 2,
  name: 'Leadership',
  description: 'Strategic vision, board decisions, and high-level direction for the entire organization. This layer provides executive-level AI agents that drive company strategy and major initiatives.',
  color: '#F59E0B',
  gradient: ['#F59E0B', '#D97706'] as [string, string],
  agentCount: 32,
  tokenUsage: 0,
  optimizedTokenUsage: 0,
  workType: 'Strategy',
  flow: 'Vision',
  features: [
    'Strategic Planning',
    'Board Decisions',
    'Vision Casting',
    'Major Initiative Approval',
    'Stakeholder Communication',
    'Performance Oversight',
  ],
  components: [
    { id: 'ceo', name: 'AI CEO', description: 'Chief Executive Officer - Overall strategy', icon: 'Crown', route: '/ai-agent/executive/ceo' },
    { id: 'cfo', name: 'AI CFO', description: 'Chief Financial Officer - Financial strategy', icon: 'TrendingUp', route: '/ai-agent/executive/cfo' },
    { id: 'cto', name: 'AI CTO', description: 'Chief Technology Officer - Tech vision', icon: 'Brain', route: '/ai-agent/executive/cto' },
    { id: 'cmo', name: 'AI CMO', description: 'Chief Marketing Officer - Growth strategy', icon: 'Target', route: '/ai-agent/executive/cmo' },
    { id: 'coo', name: 'AI COO', description: 'Chief Operating Officer - Operations', icon: 'Settings', route: '/ai-agent/executive/coo' },
    { id: 'chro', name: 'AI CHRO', description: 'Chief HR Officer - Talent strategy', icon: 'Users', route: '/ai-agent/executive/chro' },
    { id: 'clo', name: 'AI CLO', description: 'Chief Legal Officer - Legal strategy', icon: 'Scale', route: '/ai-agent/executive/clo' },
    { id: 'ciso', name: 'AI CISO', description: 'Chief Security Officer - Security vision', icon: 'Shield', route: '/ai-agent/executive/ciso' },
    { id: 'cio', name: 'AI CIO', description: 'Chief Investment Officer', icon: 'TrendingUp', route: '/ai-agent/executive/cio' },
    { id: 'creo', name: 'AI CREO', description: 'Chief Real Estate Officer', icon: 'Building2', route: '/ai-agent/executive/creo' },
    { id: 'cro', name: 'AI CRO', description: 'Chief Risk Officer', icon: 'AlertTriangle', route: '/ai-agent/executive/cro' },
    { id: 'cmo-healthcare', name: 'AI CMO-Health', description: 'Chief Medical Officer', icon: 'Shield', route: '/ai-agent/executive/cmo-healthcare' },
    { id: 'cpo', name: 'AI CPO', description: 'Chief Product Officer', icon: 'Zap', route: '/ai-agent/executive/cpo' },
    { id: 'cao', name: 'AI CAO', description: 'Chief Analytics Officer', icon: 'BarChart3', route: '/ai-agent/executive/cao' },
    { id: 'cdo', name: 'AI CDO', description: 'Chief Data Officer', icon: 'Database', route: '/ai-agent/executive/cdo' },
    { id: 'cso', name: 'AI CSO', description: 'Chief Strategy Officer', icon: 'Target', route: '/ai-agent/executive/cso' },
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

const iconMap: Record<string, any> = {
  Crown: Icons.Crown,
  TrendingUp: Icons.TrendingUp,
  Brain: Icons.Brain,
  Target: Icons.Target,
  Settings: Icons.Settings,
  Users: Icons.Users,
  Scale: Icons.Scale,
  Shield: Icons.Shield,
  Building2: Icons.Building2,
  AlertTriangle: Icons.AlertTriangle,
  Zap: Icons.Zap,
  BarChart3: Icons.BarChart3,
  Database: Icons.Database,
};

interface LeadershipEnvironment {
  mode: 'advisory' | 'collaborative' | 'autonomous';
  decisionLevel: 'recommendation' | 'approval' | 'execution';
  boardIntegration: boolean;
  stakeholderUpdates: boolean;
  strategicPlanning: boolean;
  riskAssessment: boolean;
}

const LayerLeadership = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'components' | 'environment' | 'options'>('overview');
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [showComponentModal, setShowComponentModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [environment, setEnvironment] = useState<LeadershipEnvironment>({
    mode: 'collaborative',
    decisionLevel: 'recommendation',
    boardIntegration: true,
    stakeholderUpdates: true,
    strategicPlanning: true,
    riskAssessment: true,
  });

  const [options, setOptions] = useState({
    enableStrategicPlanning: true,
    enableBoardReports: true,
    enableStakeholderComm: true,
    enableRiskManagement: true,
    enableBudgetOversight: true,
    enablePerformanceTracking: true,
    enableInitiativeApproval: true,
    enableCrisisManagement: true,
  });

  const filteredComponents = useMemo(() => {
    if (!searchQuery) return layerData.components;
    return layerData.components.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const stats = useMemo(() => [
    { label: 'Active Leaders', value: '16', icon: Icons.Crown, color: '#F59E0B', trend: '+2' },
    { label: 'Decisions Made', value: '247', icon: Icons.CheckCircle, color: '#10B981', trend: '+45' },
    { label: 'Initiatives', value: '34', icon: Icons.Rocket, color: '#6366F1', trend: '+8' },
    { label: 'Stakeholders', value: '89', icon: Icons.Users, color: '#EC4899', trend: '+12' },
  ], []);

  const leadershipMetrics = useMemo(() => [
    { role: 'CEO', status: 'Active', decisions: 45, approvalRate: 98 },
    { role: 'CFO', status: 'Active', decisions: 38, approvalRate: 96 },
    { role: 'CTO', status: 'Active', decisions: 52, approvalRate: 99 },
    { role: 'COO', status: 'Active', decisions: 67, approvalRate: 97 },
    { role: 'CHRO', status: 'Active', decisions: 28, approvalRate: 95 },
  ], []);

  const renderOverview = () => (
    <View style={styles.overviewContainer}>
      <View style={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <View key={idx} style={[styles.statCard, { backgroundColor: colors.card }]}>
            <View style={styles.statHeader}>
              <stat.icon size={20} color={stat.color} />
              <Text style={[styles.statTrend, { color: stat.trend.startsWith('+') ? '#10B981' : '#EF4444' }]}>{stat.trend}</Text>
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Executive Performance</Text>
        <View style={[styles.execCard, { backgroundColor: colors.card }]}>
          {leadershipMetrics.map((exec, idx) => (
            <View key={idx} style={styles.execRow}>
              <View style={styles.execInfo}>
                <Text style={[styles.execRole, { color: colors.text }]}>{exec.role}</Text>
                <View style={[styles.execBar, { backgroundColor: colors.border }]}>
                  <View style={[styles.execProgress, { width: `${exec.approvalRate}%`, backgroundColor: '#F59E0B' }]} />
                </View>
              </View>
              <View style={styles.execStats}>
                <Text style={[styles.execDecisions, { color: colors.text }]}>{exec.decisions} dec</Text>
                <Text style={[styles.execRate, { color: exec.approvalRate >= 95 ? '#10B981' : '#F59E0B' }]}>{exec.approvalRate}%</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Layer Status</Text>
        <View style={[styles.statusCard, { backgroundColor: colors.card }]}>
          <View style={styles.statusRow}>
            <View style={styles.statusIndicator}>
              <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
              <Text style={[styles.statusText, { color: colors.text }]}>Operational</Text>
            </View>
            <Text style={[styles.statusValue, { color: '#10B981' }]}>Active</Text>
          </View>
          <View style={[styles.statusDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statusRow}>
            <Text style={[styles.statusLabel, { color: colors.textSecondary }]}>Active Leaders</Text>
            <Text style={[styles.statusValue, { color: colors.text }]}>16</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={[styles.statusLabel, { color: colors.textSecondary }]}>Pending Decisions</Text>
            <Text style={[styles.statusValue, { color: colors.text }]}>12</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={[styles.statusLabel, { color: colors.textSecondary }]}>Success Rate</Text>
            <Text style={[styles.statusValue, { color: '#10B981' }]}>97.8%</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Features</Text>
        <View style={styles.featuresGrid}>
          {layerData.features.map((feature, idx) => (
            <View key={idx} style={[styles.featureCard, { backgroundColor: colors.card }]}>
              <Icons.CheckCircle size={18} color="#F59E0B" />
              <Text style={[styles.featureText, { color: colors.text }]}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#F59E0B' }]}>
            <Icons.Target size={18} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>View Strategy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#10B981' }]}>
            <Icons.CheckCircle size={18} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Decisions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#6366F1' }]}>
            <Icons.FileText size={18} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Reports</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderComponents = () => (
    <View style={styles.componentsContainer}>
      <View style={styles.searchContainer}>
        <Icons.Search size={18} color={colors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search executives..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <FlatList
        data={filteredComponents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const IconComponent = iconMap[item.icon] || Icons.Circle;
          return (
            <TouchableOpacity
              style={[styles.componentCard, { backgroundColor: colors.card }]}
              onPress={() => {
                setSelectedComponent(item);
                setShowComponentModal(true);
              }}
            >
              <View style={[styles.componentIcon, { backgroundColor: layerData.color + '20' }]}>
                <IconComponent size={22} color={layerData.color} />
              </View>
              <View style={styles.componentContent}>
                <Text style={[styles.componentName, { color: colors.text }]}>{item.name}</Text>
                <Text style={[styles.componentDescription, { color: colors.textSecondary }]} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
              <Icons.ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.componentsList}
      />
    </View>
  );

  const renderEnvironment = () => (
    <ScrollView style={styles.environmentContainer}>
      <View style={styles.envSection}>
        <Text style={[styles.envTitle, { color: colors.text }]}>Mode</Text>
        <View style={styles.modeButtons}>
          {(['advisory', 'collaborative', 'autonomous'] as const).map(mode => (
            <TouchableOpacity
              key={mode}
              style={[styles.modeButton, environment.mode === mode && { backgroundColor: layerData.color }]}
              onPress={() => setEnvironment(prev => ({ ...prev, mode }))}
            >
              <Text style={[styles.modeButtonText, environment.mode === mode && { color: '#FFFFFF' }]}>
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.envSection}>
        <Text style={[styles.envTitle, { color: colors.text }]}>Decision Level</Text>
        <View style={styles.modeButtons}>
          {(['recommendation', 'approval', 'execution'] as const).map(level => (
            <TouchableOpacity
              key={level}
              style={[styles.modeButton, environment.decisionLevel === level && { backgroundColor: layerData.color }]}
              onPress={() => setEnvironment(prev => ({ ...prev, decisionLevel: level }))}
            >
              <Text style={[styles.modeButtonText, environment.decisionLevel === level && { color: '#FFFFFF' }]}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.envSection}>
        <Text style={[styles.envTitle, { color: colors.text }]}>Integration Options</Text>
        
        <View style={[styles.toggleCard, { backgroundColor: colors.card }]}>
          <View style={styles.toggleRow}>
            <View>
              <Text style={[styles.toggleTitle, { color: colors.text }]}>Board Integration</Text>
              <Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>Sync with board meetings</Text>
            </View>
            <Switch
              value={environment.boardIntegration}
              onValueChange={(value) => setEnvironment(prev => ({ ...prev, boardIntegration: value }))}
              trackColor={{ false: colors.border, true: layerData.color + '80' }}
              thumbColor={environment.boardIntegration ? layerData.color : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={[styles.toggleCard, { backgroundColor: colors.card }]}>
          <View style={styles.toggleRow}>
            <View>
              <Text style={[styles.toggleTitle, { color: colors.text }]}>Stakeholder Updates</Text>
              <Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>Auto-update stakeholders</Text>
            </View>
            <Switch
              value={environment.stakeholderUpdates}
              onValueChange={(value) => setEnvironment(prev => ({ ...prev, stakeholderUpdates: value }))}
              trackColor={{ false: colors.border, true: layerData.color + '80' }}
              thumbColor={environment.stakeholderUpdates ? layerData.color : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={[styles.toggleCard, { backgroundColor: colors.card }]}>
          <View style={styles.toggleRow}>
            <View>
              <Text style={[styles.toggleTitle, { color: colors.text }]}>Strategic Planning</Text>
              <Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>Enable planning tools</Text>
            </View>
            <Switch
              value={environment.strategicPlanning}
              onValueChange={(value) => setEnvironment(prev => ({ ...prev, strategicPlanning: value }))}
              trackColor={{ false: colors.border, true: layerData.color + '80' }}
              thumbColor={environment.strategicPlanning ? layerData.color : '#f4f3f4'}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={() => Alert.alert('Saved', 'Leadership environment updated.')}>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.saveButtonGradient}>
          <Icons.Save size={20} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>Save Environment</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderOptions = () => (
    <ScrollView style={styles.optionsContainer}>
      <View style={styles.optionsSection}>
        <Text style={[styles.optionsTitle, { color: colors.text }]}>Strategic</Text>
        {[
          { key: 'enableStrategicPlanning', label: 'Strategic Planning', desc: 'Long-term planning tools' },
          { key: 'enableBoardReports', label: 'Board Reports', desc: 'Automated board reporting' },
          { key: 'enableInitiativeApproval', label: 'Initiative Approval', desc: 'Approve major initiatives' },
        ].map(opt => (
          <View key={opt.key} style={[styles.optionCard, { backgroundColor: colors.card }]}>
            <View style={styles.optionRow}>
              <View style={styles.optionInfo}>
                <Text style={[styles.optionLabel, { color: colors.text }]}>{opt.label}</Text>
                <Text style={[styles.optionDesc, { color: colors.textSecondary }]}>{opt.desc}</Text>
              </View>
              <Switch
                value={options[opt.key as keyof typeof options] as boolean}
                onValueChange={(value) => setOptions(prev => ({ ...prev, [opt.key]: value }))}
                trackColor={{ false: colors.border, true: layerData.color + '80' }}
                thumbColor={options[opt.key as keyof typeof options] ? layerData.color : '#f4f3f4'}
              />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.optionsSection}>
        <Text style={[styles.optionsTitle, { color: colors.text }]}>Management</Text>
        {[
          { key: 'enableStakeholderComm', label: 'Stakeholder Comm', desc: 'Stakeholder communications' },
          { key: 'enableRiskManagement', label: 'Risk Management', desc: 'Enterprise risk oversight' },
          { key: 'enableBudgetOversight', label: 'Budget Oversight', desc: 'Financial oversight' },
          { key: 'enablePerformanceTracking', label: 'Performance Tracking', desc: 'Track KPIs and metrics' },
          { key: 'enableCrisisManagement', label: 'Crisis Management', desc: 'Crisis response planning' },
        ].map(opt => (
          <View key={opt.key} style={[styles.optionCard, { backgroundColor: colors.card }]}>
            <View style={styles.optionRow}>
              <View style={styles.optionInfo}>
                <Text style={[styles.optionLabel, { color: colors.text }]}>{opt.label}</Text>
                <Text style={[styles.optionDesc, { color: colors.textSecondary }]}>{opt.desc}</Text>
              </View>
              <Switch
                value={options[opt.key as keyof typeof options] as boolean}
                onValueChange={(value) => setOptions(prev => ({ ...prev, [opt.key]: value }))}
                trackColor={{ false: colors.border, true: layerData.color + '80' }}
                thumbColor={options[opt.key as keyof typeof options] ? layerData.color : '#f4f3f4'}
              />
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={() => Alert.alert('Saved', 'Leadership options updated.')}>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.saveButtonGradient}>
          <Icons.Save size={20} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>Save Options</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient colors={layerData.gradient} style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Icons.ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <View style={styles.headerTitleRow}>
              <Text style={styles.layerNumber}>L2</Text>
              <Text style={styles.headerTitle}>{layerData.name}</Text>
            </View>
            <Text style={styles.headerSubtitle}>{layerData.workType} Layer</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Icons.Settings size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.headerDescription}>{layerData.description}</Text>
        
        <View style={styles.headerStats}>
          <View style={styles.headerStat}>
            <Icons.Users size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.headerStatText}>{layerData.agentCount} Agents</Text>
          </View>
          <View style={styles.headerStat}>
            <Icons.Zap size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.headerStatText}>{layerData.optimizedTokenUsage} Tokens</Text>
          </View>
          <View style={styles.headerStat}>
            <Icons.Activity size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.headerStatText}>{layerData.flow}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.tabContainer}>
        {[
          { key: 'overview', label: 'Overview', icon: Icons.LayoutDashboard },
          { key: 'components', label: 'Components', icon: Icons.Layers },
          { key: 'environment', icon: Icons.Server, label: 'Environment' },
          { key: 'options', label: 'Options', icon: Icons.Settings },
        ].map(tab => (
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
                    <View style={styles.modalIconContainer}>
                      {React.createElement(iconMap[selectedComponent.icon] || Icons.Circle, { size: 28, color: '#FFFFFF' })}
                    </View>
                    <TouchableOpacity style={styles.modalCloseButton} onPress={() => setShowComponentModal(false)}>
                      <Icons.X size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.modalTitle}>{selectedComponent.name}</Text>
                </LinearGradient>
                
                <ScrollView style={styles.modalBody}>
                  <Text style={[styles.modalDescription, { color: colors.text }]}>{selectedComponent.description}</Text>
                  
                  <View style={styles.modalStats}>
                    <View style={[styles.modalStatItem, { backgroundColor: colors.card }]}>
                      <Icons.Activity size={20} color={layerData.color} />
                      <Text style={[styles.modalStatValue, { color: colors.text }]}>Active</Text>
                      <Text style={[styles.modalStatLabel, { color: colors.textSecondary }]}>Status</Text>
                    </View>
                    <View style={[styles.modalStatItem, { backgroundColor: colors.card }]}>
                      <Icons.CheckCircle size={20} color={layerData.color} />
                      <Text style={[styles.modalStatValue, { color: colors.text }]}>15</Text>
                      <Text style={[styles.modalStatLabel, { color: colors.textSecondary }]}>Decisions</Text>
                    </View>
                  </View>

                  <TouchableOpacity style={[styles.modalActionButton, { backgroundColor: layerData.color }]} onPress={() => { setShowComponentModal(false); if (selectedComponent.route) router.push(selectedComponent.route as any); }}>
                    <Icons.ExternalLink size={18} color="#FFFFFF" />
                    <Text style={styles.modalActionText}>Open Executive</Text>
                  </TouchableOpacity>
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
  header: { padding: 16, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  backButton: { padding: 8, marginRight: 8 },
  headerTitleContainer: { flex: 1 },
  headerTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  layerNumber: { fontSize: 14, fontWeight: '700', color: 'rgba(255,255,255,0.7)', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  settingsButton: { padding: 8 },
  headerDescription: { fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 18, marginBottom: 12 },
  headerStats: { flexDirection: 'row', gap: 16 },
  headerStat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  headerStatText: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
  tabContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.1)', position: 'relative' },
  tabActive: { backgroundColor: 'rgba(255,255,255,0.15)' },
  tabIndicator: { position: 'absolute', top: 0, left: '20%', right: '20%', height: 3, backgroundColor: '#FFFFFF', borderBottomLeftRadius: 3, borderBottomRightRadius: 3 },
  tabLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4 },
  tabLabelActive: { color: '#FFFFFF', fontWeight: '600' },
  content: { flex: 1, paddingHorizontal: 16 },
  overviewContainer: { paddingVertical: 16 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  statCard: { width: (width - 42) / 2, padding: 14, borderRadius: 12, alignItems: 'center' },
  statHeader: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' },
  statTrend: { fontSize: 11, fontWeight: '600' },
  statValue: { fontSize: 20, fontWeight: '700', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 2 },
  execCard: { padding: 16, borderRadius: 12 },
  execRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  execInfo: { flex: 1, marginRight: 16 },
  execRole: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  execBar: { height: 6, borderRadius: 3, overflow: 'hidden' },
  execProgress: { height: '100%', borderRadius: 3 },
  execStats: { alignItems: 'flex-end' },
  execDecisions: { fontSize: 12, fontWeight: '500', marginBottom: 2 },
  execRate: { fontSize: 12, fontWeight: '700' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 12 },
  statusCard: { padding: 16, borderRadius: 12 },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  statusIndicator: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 14, fontWeight: '500' },
  statusValue: { fontSize: 14, fontWeight: '600' },
  statusLabel: { fontSize: 13 },
  statusDivider: { height: 1, marginVertical: 4 },
  featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  featureCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, gap: 8 },
  featureText: { fontSize: 13, fontWeight: '500' },
  actionsRow: { flexDirection: 'row', gap: 10 },
  actionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 10, gap: 6 },
  actionButtonText: { fontSize: 12, fontWeight: '600', color: '#FFFFFF' },
  componentsContainer: { paddingVertical: 16 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1F2937', borderRadius: 10, paddingHorizontal: 12, height: 44, marginBottom: 16 },
  searchInput: { flex: 1, fontSize: 14, marginLeft: 8 },
  componentsList: { gap: 10 },
  componentCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12 },
  componentIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  componentContent: { flex: 1 },
  componentName: { fontSize: 15, fontWeight: '600', marginBottom: 2 },
  componentDescription: { fontSize: 12 },
  environmentContainer: { paddingVertical: 16 },
  envSection: { marginBottom: 24 },
  envTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  modeButtons: { flexDirection: 'row', gap: 8 },
  modeButton: { flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: '#374151', alignItems: 'center' },
  modeButtonText: { fontSize: 12, color: '#FFFFFF', fontWeight: '500' },
  toggleCard: { padding: 14, borderRadius: 12, marginBottom: 10 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  toggleTitle: { fontSize: 14, fontWeight: '600', marginBottom: 2 },
  toggleDescription: { fontSize: 12 },
  optionsContainer: { paddingVertical: 16 },
  optionsSection: { marginBottom: 24 },
  optionsTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  optionCard: { padding: 14, borderRadius: 12, marginBottom: 10 },
  optionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  optionInfo: { flex: 1, marginRight: 12 },
  optionLabel: { fontSize: 14, fontWeight: '600', marginBottom: 2 },
  optionDesc: { fontSize: 12 },
  saveButton: { marginTop: 8, marginBottom: 32 },
  saveButtonGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 12, gap: 8 },
  saveButtonText: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' },
  modalContent: { borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '80%' },
  modalHeader: { padding: 20, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  modalIconContainer: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  modalCloseButton: { padding: 8 },
  modalTitle: { fontSize: 22, fontWeight: '700', color: '#FFFFFF' },
  modalBody: { padding: 20 },
  modalDescription: { fontSize: 15, lineHeight: 22, marginBottom: 20 },
  modalStats: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  modalStatItem: { flex: 1, padding: 14, borderRadius: 12, alignItems: 'center' },
  modalStatValue: { fontSize: 16, fontWeight: '700', marginTop: 6 },
  modalStatLabel: { fontSize: 11, marginTop: 2 },
  modalActionButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 12, gap: 8 },
  modalActionText: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
});

export default LayerLeadership;
