 
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Animated,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Brain,
  Database,
  Network,
  Users,
  RefreshCw,
  Zap,
  Sparkles,
  CircleCheck,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

Dimensions.get('window');
const ACCENT_COLOR = '#AF52DE';
const GRADIENT_COLORS = ['#0f172a', '#1e293b'] as const;

interface CoreCapability {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  enabled: boolean;
  category: 'memory' | 'learning' | 'intelligence' | 'adaptation';
  impact: 'critical' | 'high' | 'medium';
  performance: number;
  features: string[];
  appliesTo: string;
  dataProcessed: string;
  lastUpdated: string;
  recentActions: string[];
  healthScore: number;
  weeklyGrowth: number;
  agentsConnected: number;
  requestsPerMinute: number;
}

const initialCapabilities: CoreCapability[] = [
  {
    id: 'cc-1',
    name: 'Memory & Context Engine',
    description: 'Remembers customers, deals, objections, and learns from outcomes',
    icon: Database,
    enabled: true,
    category: 'memory',
    impact: 'critical',
    performance: 98,
    features: ['Customer Memory', 'Deal History', 'Objection Tracking', 'Outcome Learning', 'Context Persistence', 'Relationship Mapping'],
    appliesTo: 'All Agents',
    dataProcessed: '2.4M records',
    lastUpdated: '2 min ago',
    recentActions: ['Stored 1,234 customer interactions', 'Updated 456 deal records', 'Learned 89 new patterns'],
    healthScore: 99,
    weeklyGrowth: 15,
    agentsConnected: 42,
    requestsPerMinute: 1250,
  },
  {
    id: 'cc-2',
    name: 'Cross-Department Intelligence',
    description: 'Shares insights and knowledge across all agents seamlessly',
    icon: Network,
    enabled: true,
    category: 'intelligence',
    impact: 'critical',
    performance: 95,
    features: ['Knowledge Sharing', 'Insight Distribution', 'Cross-functional Alerts', 'Unified Data Layer', 'Department Sync', 'Real-time Updates'],
    appliesTo: 'All Agents',
    dataProcessed: '890K syncs/day',
    lastUpdated: '1 min ago',
    recentActions: ['Synced insights across 6 departments', 'Distributed 45 alerts', 'Updated unified data layer'],
    healthScore: 96,
    weeklyGrowth: 22,
    agentsConnected: 42,
    requestsPerMinute: 890,
  },
  {
    id: 'cc-3',
    name: 'Personalized Responses',
    description: 'Tailors responses based on customer history and preferences',
    icon: Users,
    enabled: true,
    category: 'adaptation',
    impact: 'high',
    performance: 92,
    features: ['History-based Personalization', 'Preference Learning', 'Tone Adaptation', 'Cultural Awareness', 'Channel Optimization', 'Timing Intelligence'],
    appliesTo: 'Customer-facing Agents',
    dataProcessed: '1.2M profiles',
    lastUpdated: '5 min ago',
    recentActions: ['Personalized 2,340 responses', 'Adapted tone for 890 interactions', 'Optimized 456 channel preferences'],
    healthScore: 93,
    weeklyGrowth: 18,
    agentsConnected: 24,
    requestsPerMinute: 560,
  },
  {
    id: 'cc-4',
    name: 'Continuous Learning',
    description: 'Improves from every interaction with automated model refinement',
    icon: RefreshCw,
    enabled: true,
    category: 'learning',
    impact: 'critical',
    performance: 97,
    features: ['Outcome Analysis', 'Model Refinement', 'Pattern Recognition', 'Error Correction', 'Performance Optimization', 'A/B Testing'],
    appliesTo: 'All Agents',
    dataProcessed: '456K learnings',
    lastUpdated: '30 sec ago',
    recentActions: ['Refined 12 ML models', 'Corrected 34 error patterns', 'Completed 89 A/B tests'],
    healthScore: 98,
    weeklyGrowth: 25,
    agentsConnected: 42,
    requestsPerMinute: 2100,
  },
  {
    id: 'cc-5',
    name: 'Real-time Adaptation',
    description: 'Adapts strategies in real-time based on changing conditions',
    icon: Zap,
    enabled: true,
    category: 'adaptation',
    impact: 'high',
    performance: 94,
    features: ['Dynamic Strategy', 'Condition Monitoring', 'Instant Adjustment', 'Risk Response', 'Opportunity Detection', 'Market Reaction'],
    appliesTo: 'All Agents',
    dataProcessed: '12K/min',
    lastUpdated: 'Real-time',
    recentActions: ['Adjusted 234 strategies', 'Detected 56 opportunities', 'Responded to 12 market changes'],
    healthScore: 95,
    weeklyGrowth: 20,
    agentsConnected: 42,
    requestsPerMinute: 3400,
  },
  {
    id: 'cc-6',
    name: 'Predictive Intelligence',
    description: 'Anticipates needs and outcomes proactively',
    icon: Brain,
    enabled: true,
    category: 'intelligence',
    impact: 'critical',
    performance: 91,
    features: ['Needs Prediction', 'Outcome Forecasting', 'Opportunity Scoring', 'Risk Prediction', 'Trend Analysis', 'Proactive Alerts'],
    appliesTo: 'All Agents',
    dataProcessed: '234K predictions/day',
    lastUpdated: '3 min ago',
    recentActions: ['Generated 1,234 predictions', 'Scored 567 opportunities', 'Sent 89 proactive alerts'],
    healthScore: 92,
    weeklyGrowth: 28,
    agentsConnected: 42,
    requestsPerMinute: 780,
  },
];

export default function CoreIntelligenceLayerScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [capabilities, setCapabilities] = useState<CoreCapability[]>(initialCapabilities);
  const [expandedCapability, setExpandedCapability] = useState<string | null>(null);
  
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 1500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
      ])
    ).start();
  }, [fadeAnim, pulseAnim]);

  const stats = useMemo(() => ({
    active: capabilities.filter(c => c.enabled).length,
    total: capabilities.length,
    health: 98,
    throughput: '12.4K/min',
  }), [capabilities]);

  const toggleCapability = useCallback((capId: string) => {
    setCapabilities(prev => prev.map(cap => 
      cap.id === capId ? { ...cap, enabled: !cap.enabled } : cap
    ));
  }, []);

  const renderCapability = (cap: CoreCapability) => {
    const isExpanded = expandedCapability === cap.id;
    const categoryColor = cap.category === 'memory' ? '#007AFF' : 
                         cap.category === 'intelligence' ? '#AF52DE' :
                         cap.category === 'learning' ? '#34C759' : '#FF9500';

    return (
      <View key={cap.id} style={[styles.capCard, { backgroundColor: theme.colors.cardBackground }]}>
        <TouchableOpacity
          style={styles.capHeader}
          onPress={() => setExpandedCapability(isExpanded ? null : cap.id)}
        >
          <View style={[styles.capIconContainer, { backgroundColor: categoryColor + '15' }]}>
            <cap.icon size={22} color={categoryColor} />
            {cap.enabled && (
              <Animated.View style={[styles.onlineIndicator, { transform: [{ scale: pulseAnim }], backgroundColor: '#34C759' }]} />
            )}
          </View>
          <View style={styles.capInfo}>
            <View style={styles.nameRow}>
              <Text style={[styles.capName, { color: theme.colors.text }]}>{cap.name}</Text>
              <View style={[styles.impactBadge, { backgroundColor: cap.impact === 'critical' ? '#FF3B3015' : '#FF950015' }]}>
                <Text style={[styles.impactText, { color: cap.impact === 'critical' ? '#FF3B30' : '#FF9500' }]}>
                  {cap.impact.toUpperCase()}
                </Text>
              </View>
            </View>
            <Text style={[styles.capDesc, { color: theme.colors.secondaryText }]} numberOfLines={1}>
              {cap.description}
            </Text>
          </View>
          <Switch
            value={cap.enabled}
            onValueChange={() => toggleCapability(cap.id)}
            trackColor={{ false: '#767577', true: categoryColor }}
            thumbColor={cap.enabled ? '#fff' : '#f4f3f4'}
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.expandedContent}>
            <View style={styles.expandedStats}>
              <View style={styles.expandedStatItem}>
                <Text style={[styles.expandedStatLabel, { color: theme.colors.secondaryText }]}>Performance</Text>
                <Text style={[styles.expandedStatValue, { color: theme.colors.text }]}>{cap.performance}%</Text>
              </View>
              <View style={styles.expandedStatItem}>
                <Text style={[styles.expandedStatLabel, { color: theme.colors.secondaryText }]}>Data</Text>
                <Text style={[styles.expandedStatValue, { color: theme.colors.text }]}>{cap.dataProcessed}</Text>
              </View>
              <View style={styles.expandedStatItem}>
                <Text style={[styles.expandedStatLabel, { color: theme.colors.secondaryText }]}>Agents</Text>
                <Text style={[styles.expandedStatValue, { color: theme.colors.text }]}>{cap.agentsConnected}</Text>
              </View>
            </View>
            <View style={styles.featureContainer}>
              {cap.features.map((feature, i) => (
                <View key={i} style={[styles.featureTag, { backgroundColor: theme.colors.background }]}>
                  <CircleCheck size={10} color="#34C759" />
                  <Text style={[styles.featureText, { color: theme.colors.secondaryText }]}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
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

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LinearGradient colors={GRADIENT_COLORS} style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Core Intelligence</Text>
            <Text style={styles.headerSubtitle}>{stats.active}/{stats.total} Components Active</Text>
          </View>
          <View style={styles.healthCircle}>
            <Text style={styles.healthValue}>{stats.health}%</Text>
          </View>
        </View>

        <View style={styles.mainStatsRow}>
          <View style={styles.mainStatItem}>
            <Text style={styles.mainStatValue}>{stats.throughput}</Text>
            <Text style={styles.mainStatLabel}>Throughput</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.mainStatItem}>
            <Text style={styles.mainStatValue}>24ms</Text>
            <Text style={styles.mainStatLabel}>Latency</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.mainStatItem}>
            <Text style={styles.mainStatValue}>99.9%</Text>
            <Text style={styles.mainStatLabel}>Accuracy</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Unified Capabilities</Text>
          <Sparkles size={18} color={ACCENT_COLOR} />
        </View>

        {capabilities.map(renderCapability)}
        
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingBottom: 25, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  navBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  backButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  headerTitleContainer: { flex: 1, marginLeft: 15 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#fff' },
  headerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  healthCircle: { width: 44, height: 44, borderRadius: 22, borderWidth: 3, borderColor: '#34C759', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(52, 199, 89, 0.1)' },
  healthValue: { fontSize: 14, fontWeight: '800', color: '#fff' },
  mainStatsRow: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: 15, alignItems: 'center' },
  mainStatItem: { flex: 1, alignItems: 'center' },
  mainStatValue: { fontSize: 18, fontWeight: '800', color: '#fff' },
  mainStatLabel: { fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 4, textTransform: 'uppercase' },
  statDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.1)' },
  scrollContent: { paddingTop: 25, paddingHorizontal: 20 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '800' },
  capCard: { borderRadius: 20, marginBottom: 15, overflow: 'hidden' },
  capHeader: { flexDirection: 'row', alignItems: 'center', padding: 15 },
  capIconContainer: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  onlineIndicator: { position: 'absolute', top: -2, right: -2, width: 10, height: 10, borderRadius: 5, borderWidth: 2, borderColor: '#fff' },
  capInfo: { flex: 1, marginLeft: 12 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  capName: { fontSize: 16, fontWeight: '700' },
  impactBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  impactText: { fontSize: 8, fontWeight: '800' },
  capDesc: { fontSize: 12, marginTop: 2 },
  expandedContent: { padding: 15, paddingTop: 0 },
  expandedStats: { flexDirection: 'row', gap: 20, marginBottom: 15 },
  expandedStatItem: { flex: 1 },
  expandedStatLabel: { fontSize: 10, textTransform: 'uppercase', marginBottom: 2 },
  expandedStatValue: { fontSize: 14, fontWeight: '700' },
  featureContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  featureTag: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, gap: 4 },
  featureText: { fontSize: 10, fontWeight: '600' },
});
