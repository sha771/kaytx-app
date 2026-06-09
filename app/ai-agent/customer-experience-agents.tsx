import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Headphones,
  Search,
  Settings,
  Database,
  Brain,
  Mic,
  User,
  Zap,
  TrendingUp,
  ListFilter,
  Phone,
  MessageSquare,
  Ticket,
  ThumbsDown,
  Smile,
  HeartHandshake,
  Star,
  Users,
  ChartBarBig,
  ChartLine,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp, FadeInRight } from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import {
  AIAgent,
  customerExperienceSubAgents,
  getMainAgentByCategory,
} from '@/constants/aiAgentHierarchy';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

// Chart Data
const CUSTOMER_SATISFACTION_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [4.2, 4.4, 4.3, 4.6, 4.7, 4.8],
      color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
      strokeWidth: 2,
    },
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

const SUPPORT_TICKETS_DATA = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [450, 520, 480, 580, 550, 320, 380],
    },
  ],
};

const CHANNEL_DISTRIBUTION_DATA = [
  {
    name: 'Chat',
    population: 40,
    color: '#007AFF',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Email',
    population: 25,
    color: '#10B981',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Phone',
    population: 20,
    color: '#F59E0B',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Social',
    population: 15,
    color: '#8B5CF6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
];

const RESPONSE_TIME_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [5.2, 4.8, 4.5, 4.2, 3.9, 3.5],
      color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const NPS_SCORE_DATA = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      data: [45, 52, 58, 65],
      color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const ISSUE_RESOLUTION_DATA = [
  {
    name: 'First Contact',
    population: 55,
    color: '#10B981',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Second Contact',
    population: 25,
    color: '#3B82F6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Escalated',
    population: 15,
    color: '#F59E0B',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Pending',
    population: 5,
    color: '#EF4444',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
];

const CUSTOMER_LIFECYCLE_DATA = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      data: [1200, 1450, 1680, 1920],
      color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const SUPPORT_VOLUME_DATA = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [450, 520, 480, 550, 510, 280, 220],
      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const SATISFACTION_TREND_DATA = [
  {
    name: 'Very Satisfied',
    population: 45,
    color: '#10B981',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Satisfied',
    population: 30,
    color: '#3B82F6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Neutral',
    population: 15,
    color: '#F59E0B',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Dissatisfied',
    population: 10,
    color: '#EF4444',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
];

const RESOLUTION_RATE_DATA = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      data: [78, 82, 85, 89],
      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const ISSUE_CATEGORY_DATA = [
  {
    name: 'Technical',
    population: 35,
    color: '#10B981',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Billing',
    population: 25,
    color: '#3B82F6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Feature Request',
    population: 20,
    color: '#F59E0B',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'General',
    population: 20,
    color: '#8B5CF6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
];

export default function CustomerExperienceAgentsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const screenWidth = Dimensions.get('window').width;
  const [searchQuery, setSearchQuery] = useState('');

  const mainAgent = getMainAgentByCategory('customer-experience');
  const filteredAgents = customerExperienceSubAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfigure = (agentId: string) => {
    router.push(`/ai-agent/agent-configuration?id=${agentId}`);
  };

  const handleDataUpload = (agentId: string) => {
    router.push(`/ai-agent/agent-data-upload?id=${agentId}`);
  };

  const stats = {
    total: customerExperienceSubAgents.length,
    withVoice: customerExperienceSubAgents.filter(a => a.configuration?.voice.enabled).length,
    withTraining: customerExperienceSubAgents.filter(a => a.configuration?.training.enabled).length,
  };

  const renderLineChart = (data: any, title: string, color: string) => (
    <Animated.View entering={FadeInUp} style={[styles.chartCard, { backgroundColor: colors.card }]}>
      <View style={styles.chartHeader}>
        <Text style={[styles.chartTitle, { color: colors.text }]}>{title}</Text>
        <TouchableOpacity>
          <ChartLine size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <LineChart
        data={data}
        width={screenWidth - 64}
        height={200}
        chartConfig={{
          backgroundColor: colors.card,
          backgroundGradientFrom: colors.card,
          backgroundGradientTo: colors.card,
          decimalPlaces: 1,
          color: (opacity = 1) => color,
          labelColor: colors.text + '80',
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: color,
          },
        }}
        bezier
        style={styles.chart}
      />
    </Animated.View>
  );

  const renderBarChart = (data: any, title: string) => (
    <Animated.View entering={FadeInUp} style={[styles.chartCard, { backgroundColor: colors.card }]}>
      <View style={styles.chartHeader}>
        <Text style={[styles.chartTitle, { color: colors.text }]}>{title}</Text>
        <TouchableOpacity>
          <ChartBarBig size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <BarChart
        data={data}
        width={screenWidth - 64}
        height={200}
        chartConfig={{
          backgroundColor: colors.card,
          backgroundGradientFrom: colors.card,
          backgroundGradientTo: colors.card,
          decimalPlaces: 0,
          color: (opacity = 1) => colors.primary,
          labelColor: colors.text + '80',
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.chart}
      />
    </Animated.View>
  );

  const renderPieChart = (data: any, title: string) => (
    <Animated.View entering={FadeInUp} style={[styles.chartCard, { backgroundColor: colors.card }]}>
      <View style={styles.chartHeader}>
        <Text style={[styles.chartTitle, { color: colors.text }]}>{title}</Text>
        <TouchableOpacity>
          <ChartBarBig size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <PieChart
        data={data}
        width={screenWidth - 64}
        height={200}
        chartConfig={{
          backgroundColor: colors.card,
          backgroundGradientFrom: colors.card,
          backgroundGradientTo: colors.card,
          color: (opacity = 1) => colors.primary,
          labelColor: colors.text + '80',
          style: {
            borderRadius: 16,
          },
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        style={styles.chart}
      />
    </Animated.View>
  );

  const renderAgentCard = (agent: AIAgent, index: number) => (
    <Animated.View entering={FadeInUp.delay(index * 50)} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: '#007AFF15' }]}>
          <agent.icon size={24} color="#007AFF" />
        </View>
        <View style={styles.agentInfo}>
          <Text style={[styles.agentName, { color: colors.text }]}>{agent.name}</Text>
          <Text style={[styles.agentTitle, { color: colors.text + '80' }]} numberOfLines={1}>{agent.title}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: agent.status === 'active' ? '#007AFF' : '#FF9500' }]}>
          <Text style={styles.statusText}>{agent.status}</Text>
        </View>
      </View>

      <View style={styles.configRow}>
        {agent.configuration?.voice.enabled && (
          <View style={styles.configBadge}>
            <Mic size={12} color="#007AFF" />
            <Text style={[styles.configText, { color: colors.text }]}>{agent.configuration.voice.style}</Text>
          </View>
        )}
        {agent.configuration?.personality && (
          <View style={styles.configBadge}>
            <User size={12} color="#007AFF" />
            <Text style={[styles.configText, { color: colors.text }]}>{(agent.configuration.personality as any).empathy}/10 empathy</Text>
          </View>
        )}
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#007AFF' }]} onPress={() => handleConfigure(agent.id)}>
          <Settings size={14} color="#fff" />
          <Text style={styles.actionBtnText}>Configure</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtnOutline, { borderColor: colors.border }]} onPress={() => handleDataUpload(agent.id)}>
          <Database size={14} color={colors.text} />
          <Text style={[styles.actionBtnTextOutline, { color: colors.text }]}>Training Data</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Headphones size={22} color="#007AFF" />
            <Text style={[styles.title, { color: colors.text }]}>Customer Experience AI</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        {mainAgent && (
          <Animated.View entering={FadeInRight} style={[styles.mainCard, { backgroundColor: '#007AFF15' }]}>
            <mainAgent.icon size={28} color="#007AFF" />
            <View style={styles.mainInfo}>
              <Text style={[styles.mainName, { color: colors.text }]}>{mainAgent.name}</Text>
              <Text style={[styles.mainDesc, { color: colors.text + '80' }]} numberOfLines={1}>{mainAgent.description}</Text>
            </View>
            <TouchableOpacity style={[styles.manageBtn, { backgroundColor: '#007AFF' }]} onPress={() => handleConfigure(mainAgent.id)}>
              <Text style={styles.manageBtnText}>Manage</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        <View style={styles.statsRow}>
          <View style={[styles.statPill, { backgroundColor: colors.border + '30' }]}>
            <User size={14} color={colors.text} />
            <Text style={[styles.statValue, { color: colors.text }]}>{stats.total}</Text>
          </View>
          <View style={[styles.statPill, { backgroundColor: '#007AFF15' }]}>
            <Mic size={14} color="#007AFF" />
            <Text style={[styles.statValue, { color: '#007AFF' }]}>{stats.withVoice}</Text>
          </View>
          <View style={[styles.statPill, { backgroundColor: '#34C75915' }]}>
            <Zap size={14} color="#34C759" />
            <Text style={[styles.statValue, { color: '#34C759' }]}>{stats.withTraining}</Text>
          </View>
        </View>

        <View style={[styles.searchBox, { backgroundColor: colors.border + '30' }]}>
          <Search size={16} color={colors.text + '60'} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search agents..."
            placeholderTextColor={colors.text + '40'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Analytics Charts */}
      <View style={styles.chartsSection}>
        {renderLineChart(CUSTOMER_SATISFACTION_DATA, 'Customer Satisfaction (6 Months)', '#007AFF')}
        {renderBarChart(SUPPORT_TICKETS_DATA, 'Support Tickets (Weekly)')}
        {renderPieChart(CHANNEL_DISTRIBUTION_DATA, 'Channel Distribution')}
        {renderLineChart(RESPONSE_TIME_DATA, 'Response Time (6 Months)', '#10B981')}
        {renderLineChart(NPS_SCORE_DATA, 'NPS Score (Quarterly)', '#007AFF')}
        {renderPieChart(ISSUE_RESOLUTION_DATA, 'Issue Resolution')}
        {renderLineChart(CUSTOMER_LIFECYCLE_DATA, 'Customer Lifecycle (Quarterly)', '#10B981')}
        {renderLineChart(SUPPORT_VOLUME_DATA, 'Support Volume (Weekly)', '#3B82F6')}
        {renderPieChart(SATISFACTION_TREND_DATA, 'Satisfaction Trend')}
        {renderLineChart(RESOLUTION_RATE_DATA, 'Resolution Rate (Quarterly)', '#3B82F6')}
        {renderPieChart(ISSUE_CATEGORY_DATA, 'Issue Category Distribution')}
      </View>

      <FlatList
        data={filteredAgents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => renderAgentCard(item, index)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { borderBottomWidth: 1, paddingBottom: 16 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  backBtn: { padding: 4 },
  titleContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { fontSize: 17, fontWeight: '600' },
  mainCard: { marginHorizontal: 16, marginBottom: 12, padding: 14, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 12 },
  mainInfo: { flex: 1 },
  mainName: { fontSize: 15, fontWeight: '600' },
  mainDesc: { fontSize: 12, marginTop: 2 },
  manageBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 6 },
  manageBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  statsRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginBottom: 12 },
  statPill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  statValue: { fontSize: 13, fontWeight: '600' },
  searchBox: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, paddingHorizontal: 12, borderRadius: 10, height: 40 },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 15 },
  list: { padding: 16 },
  card: { borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconContainer: { width: 48, height: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  agentInfo: { flex: 1 },
  agentName: { fontSize: 15, fontWeight: '600' },
  agentTitle: { fontSize: 12, marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  statusText: { color: '#fff', fontSize: 10, fontWeight: '600', textTransform: 'uppercase' },
  configRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  configBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#00000008', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  configText: { fontSize: 11 },
  actionRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  actionBtnText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  actionBtnOutline: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, borderWidth: 1 },
  actionBtnTextOutline: { fontSize: 12, fontWeight: '600' },
  chartsSection: { paddingHorizontal: 16, paddingBottom: 16 },
  chartCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  chart: {
    borderRadius: 16,
  },
});
