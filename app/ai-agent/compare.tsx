import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  ArrowLeftRight,
  Plus,
  X,
  Check,
  Target,
  Zap,
  Clock,
  Award,
  TrendingUp,
  DollarSign,
  ChevronRight,
  Brain,
  Mic,
  User,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import {
  allAgents,
  agentCategories,
} from '@/constants/aiAgentHierarchy';

const { width } = Dimensions.get('window');

export default function AgentComparisonScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [showAgentSelector, setShowAgentSelector] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('');

  const comparedAgents = allAgents.filter(a => selectedAgents.includes(a.id));

  const addAgent = (agentId: string) => {
    if (selectedAgents.length < 4 && !selectedAgents.includes(agentId)) {
      setSelectedAgents([...selectedAgents, agentId]);
    }
    setShowAgentSelector(false);
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

  const removeAgent = (agentId: string) => {
    setSelectedAgents(selectedAgents.filter(id => id !== agentId));
  };

  const filteredAgents = filterCategory 
    ? allAgents.filter(a => a.category === filterCategory)
    : allAgents;

  const availableAgents = filteredAgents.filter(a => !selectedAgents.includes(a.id));

  const comparisonMetrics = [
    { key: 'successRate', label: 'Success Rate', icon: Target, suffix: '%' },
    { key: 'tasksCompleted', label: 'Tasks Done', icon: User, format: (v: number) => (v / 1000).toFixed(0) + 'K' },
    { key: 'averageResponseTime', label: 'Response', icon: Clock, suffix: 's' },
    { key: 'customerSatisfaction', label: 'Satisfaction', icon: Award, suffix: '/5' },
    { key: 'uptime', label: 'Uptime', icon: Zap },
  ];

  const costMetrics = [
    { key: 'humanCostEquivalent', label: 'Human Cost', icon: DollarSign },
    { key: 'aiCost', label: 'AI Cost', icon: DollarSign },
    { key: 'efficiency', label: 'Efficiency', icon: TrendingUp },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <GitCompare size={22} color={colors.primary} />
            <Text style={[styles.headerTitle, { color: colors.text }]}>Compare Agents</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        {/* Selected Agents Bar */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectedScroll}>
          {selectedAgents.length === 0 ? (
            <Text style={[styles.noSelectionText, { color: colors.text + '60' }]}>
              Select up to 4 agents to compare
            </Text>
          ) : (
            comparedAgents.map(agent => (
              <View key={agent.id} style={[styles.selectedChip, { backgroundColor: agent.color + '15', borderColor: agent.color }]}>
                <agent.icon size={16} color={agent.color} />
                <Text style={[styles.selectedText, { color: colors.text }]} numberOfLines={1}>
                  {agent.name}
                </Text>
                <TouchableOpacity onPress={() => removeAgent(agent.id)}>
                  <X size={14} color={colors.text + '60'} />
                </TouchableOpacity>
              </View>
            ))
          )}
          {selectedAgents.length < 4 && (
            <TouchableOpacity 
              style={[styles.addButton, { backgroundColor: colors.primary }]} 
              onPress={() => setShowAgentSelector(true)}
            >
              <Plus size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {comparedAgents.length > 0 ? (
          <>
            {/* Comparison Cards */}
            <Animated.View entering={FadeInUp} style={styles.comparisonContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {/* Empty header cell */}
                <View style={[styles.metricHeader, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <Text style={[styles.metricHeaderText, { color: colors.text + '60' }]}>Metrics</Text>
                </View>
                
                {comparedAgents.map(agent => (
                  <TouchableOpacity 
                    key={agent.id} 
                    style={[styles.agentColumn, { backgroundColor: agent.color + '08', borderColor: agent.color }]}
                    onPress={() => router.push(`/ai-agent/agent-configuration?id=${agent.id}`)}
                  >
                    <View style={[styles.agentIcon, { backgroundColor: agent.color + '15' }]}>
                      <agent.icon size={28} color={agent.color} />
                    </View>
                    <Text style={[styles.agentColumnName, { color: colors.text }]} numberOfLines={2}>
                      {agent.name}
                    </Text>
                    <View style={[styles.agentTypeBadge, { backgroundColor: agent.type === 'main_agent' ? '#8B5CF6' : '#3B82F6' }]}>
                      <Text style={styles.agentTypeText}>{agent.type === 'main_agent' ? 'Main' : 'Sub'}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Performance Metrics */}
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Performance</Text>
              {comparisonMetrics.map(metric => (
                <ScrollView 
                  key={metric.key} 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.metricRow}
                >
                  <View style={[styles.metricLabel, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <metric.icon size={16} color={colors.text + '60'} />
                    <Text style={[styles.metricLabelText, { color: colors.text }]}>{metric.label}</Text>
                  </View>
                  {comparedAgents.map(agent => {
                    const value = agent.performance?.[metric.key as keyof typeof agent.performance];
                    const displayValue = metric.format 
                      ? metric.format(value as number) 
                      : value + (metric.suffix || '');
                    const isBest = comparedAgents.length > 1 && metric.key !== 'averageResponseTime' && 
                      value === Math.max(...comparedAgents.map(a => a.performance?.[metric.key as keyof typeof a.performance] as number || 0));
                    
                    return (
                      <View key={agent.id} style={[styles.metricValue, { backgroundColor: isBest ? agent.color + '20' : colors.card, borderColor: colors.border }]}>
                        <Text style={[styles.metricValueText, { color: isBest ? agent.color : colors.text, fontWeight: isBest ? '700' : '500' }]}>
                          {displayValue}
                        </Text>
                        {isBest && <Check size={12} color={agent.color} style={styles.bestIndicator} />}
                      </View>
                    );
                  })}
                </ScrollView>
              ))}

              {/* Configuration Status */}
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Configuration</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricRow}>
                <View style={[styles.metricLabel, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <Brain size={16} color={colors.text + '60'} />
                  <Text style={[styles.metricLabelText, { color: colors.text }]}>Model</Text>
                </View>
                {comparedAgents.map(agent => (
                  <View key={agent.id} style={[styles.metricValue, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <Text style={[styles.metricValueText, { color: colors.text }]}>
                      {agent.configuration?.model?.primary || 'Default'}
                    </Text>
                  </View>
                ))}
              </ScrollView>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricRow}>
                <View style={[styles.metricLabel, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <Mic size={16} color={colors.text + '60'} />
                  <Text style={[styles.metricLabelText, { color: colors.text }]}>Voice</Text>
                </View>
                {comparedAgents.map(agent => (
                  <View key={agent.id} style={[styles.metricValue, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <Text style={[styles.metricValueText, { color: agent.configuration?.voice?.enabled ? '#10B981' : colors.text + '40' }]}>
                      {agent.configuration?.voice?.enabled ? 'Enabled' : 'Disabled'}
                    </Text>
                  </View>
                ))}
              </ScrollView>

              {/* Cost Comparison */}
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Cost Analysis</Text>
              {costMetrics.map(metric => (
                <ScrollView 
                  key={metric.key} 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.metricRow}
                >
                  <View style={[styles.metricLabel, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <metric.icon size={16} color={colors.text + '60'} />
                    <Text style={[styles.metricLabelText, { color: colors.text }]}>{metric.label}</Text>
                  </View>
                  {comparedAgents.map(agent => {
                    const value = agent[metric.key as keyof typeof agent];
                    return (
                      <View key={agent.id} style={[styles.metricValue, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <Text style={[styles.metricValueText, { color: colors.text }]}>
                          {String(value ?? '')}
                        </Text>
                      </View>
                    );
                  })}
                </ScrollView>
              ))}
            </Animated.View>

            {/* Winner Badge */}
            {comparedAgents.length > 1 && (
              <View style={[styles.winnerCard, { backgroundColor: colors.primary + '15', borderColor: colors.primary }]}>
                <Award size={24} color={colors.primary} />
                <Text style={[styles.winnerTitle, { color: colors.text }]}>Top Performer</Text>
                {(() => {
                  const winner = comparedAgents.reduce((best, agent) => 
                    (agent.performance?.successRate || 0) > (best.performance?.successRate || 0) ? agent : best
                  );
                  return (
                    <Text style={[styles.winnerName, { color: winner.color }]}>{winner.name}</Text>
                  );
                })()}
              </View>
            )}
          </>
        ) : (
          <View style={styles.emptyState}>
            <GitCompare size={64} color={colors.text + '20'} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>Compare AI Agents</Text>
            <Text style={[styles.emptySubtitle, { color: colors.text + '60' }]}>
              Select multiple agents to compare their performance, costs, and capabilities side-by-side
            </Text>
            <TouchableOpacity 
              style={[styles.emptyButton, { backgroundColor: colors.primary }]} 
              onPress={() => setShowAgentSelector(true)}
            >
              <Text style={styles.emptyButtonText}>Select Agents</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Agent Selector Modal */}
      {showAgentSelector && (
        <View style={styles.modalOverlay}>
          <View style={[styles.modal, { backgroundColor: colors.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Select Agent</Text>
              <TouchableOpacity onPress={() => setShowAgentSelector(false)}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            {/* Category Filter */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.modalFilterScroll}>
              <TouchableOpacity
                style={[styles.modalFilterChip, !filterCategory && { backgroundColor: colors.primary }]}
                onPress={() => setFilterCategory('')}
              >
                <Text style={[styles.modalFilterText, { color: !filterCategory ? '#fff' : colors.text }]}>All</Text>
              </TouchableOpacity>
              {agentCategories.map(cat => (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.modalFilterChip, filterCategory === cat.id && { backgroundColor: cat.color }]}
                  onPress={() => setFilterCategory(cat.id)}
                >
                  <Text style={[styles.modalFilterText, { color: filterCategory === cat.id ? '#fff' : colors.text }]}>
                    {cat.label.split(' ')[0]}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <ScrollView style={styles.agentList}>
              {availableAgents.map(agent => (
                <TouchableOpacity
                  key={agent.id}
                  style={[styles.agentListItem, { borderBottomColor: colors.border }]}
                  onPress={() => addAgent(agent.id)}
                >
                  <View style={[styles.agentListIcon, { backgroundColor: agent.color + '15' }]}>
                    <agent.icon size={24} color={agent.color} />
                  </View>
                  <View style={styles.agentListInfo}>
                    <Text style={[styles.agentListName, { color: colors.text }]}>{agent.name}</Text>
                    <Text style={[styles.agentListMeta, { color: colors.text + '60' }]}>
                      {agent.performance?.successRate}% success • {agent.humanCostEquivalent}
                    </Text>
                  </View>
                  <ChevronRight size={20} color={colors.text + '40'} />
                </TouchableOpacity>
              ))}
            </ScrollView>
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
  backButton: { padding: 4 },
  headerTitleContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  selectedScroll: { padding: 16, paddingTop: 8 },
  noSelectionText: { fontSize: 14, fontStyle: 'italic' },
  selectedChip: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, marginRight: 8 },
  selectedText: { fontSize: 13, fontWeight: '500', maxWidth: 120 },
  addButton: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  content: { flex: 1, padding: 16 },
  comparisonContainer: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginTop: 20, marginBottom: 10 },
  metricHeader: { width: 120, padding: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 12, marginRight: 8 },
  metricHeaderText: { fontSize: 12, fontWeight: '600', textTransform: 'uppercase' },
  agentColumn: { width: 140, padding: 12, alignItems: 'center', borderWidth: 1, borderRadius: 12, marginRight: 8 },
  agentIcon: { width: 56, height: 56, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  agentColumnName: { fontSize: 13, fontWeight: '600', textAlign: 'center', minHeight: 36 },
  agentTypeBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, marginTop: 6 },
  agentTypeText: { color: '#fff', fontSize: 10, fontWeight: '600' },
  metricRow: { marginBottom: 8 },
  metricLabel: { width: 120, flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderWidth: 1, borderRadius: 10, marginRight: 8 },
  metricLabelText: { fontSize: 13, fontWeight: '500' },
  metricValue: { width: 140, padding: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 10, marginRight: 8, flexDirection: 'row', gap: 4 },
  metricValueText: { fontSize: 14 },
  bestIndicator: { marginLeft: 2 },
  winnerCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, borderRadius: 12, borderWidth: 1, marginTop: 10 },
  winnerTitle: { fontSize: 14, fontWeight: '500' },
  winnerName: { fontSize: 16, fontWeight: '700', marginLeft: 'auto' },
  emptyState: { alignItems: 'center', padding: 48 },
  emptyTitle: { fontSize: 20, fontWeight: '600', marginTop: 20 },
  emptySubtitle: { fontSize: 14, textAlign: 'center', marginTop: 8, marginBottom: 24, paddingHorizontal: 32 },
  emptyButton: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10 },
  emptyButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  modalOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modal: { borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '70%' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: '#00000010' },
  modalTitle: { fontSize: 18, fontWeight: '600' },
  modalFilterScroll: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#00000010' },
  modalFilterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8, backgroundColor: '#00000008' },
  modalFilterText: { fontSize: 13, fontWeight: '500' },
  agentList: { padding: 16 },
  agentListItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1 },
  agentListIcon: { width: 48, height: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  agentListInfo: { flex: 1, marginLeft: 12 },
  agentListName: { fontSize: 15, fontWeight: '600' },
  agentListMeta: { fontSize: 12, marginTop: 2 },
});
