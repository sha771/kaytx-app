import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Cpu,
  Zap,
  TrendingUp,
  TrendingDown,
  CircleCheck,
  CircleX,
  Clock,
  DollarSign,
  Settings,
  Plus,
  EllipsisVertical,
  Star,
  Activity,
  Server,
  Shield,
  ChevronRight,
  ChartBar,
  Download,
  RotateCcw,
  TriangleAlert,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Types
interface AIModel {
  id: string;
  name: string;
  provider: string;
  version: string;
  status: 'active' | 'inactive' | 'deprecated';
  capabilities: string[];
  costPerToken: number;
  latency: number;
  accuracy: number;
  usage: number;
  lastUpdated: string;
  description: string;
}

interface ModelPerformance {
  date: string;
  requests: number;
  avgLatency: number;
  errorRate: number;
  cost: number;
}

// Mock Data
const AI_MODELS: AIModel[] = [
  {
    id: '1',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    version: 'gpt-4-turbo-2026-01',
    status: 'active',
    capabilities: ['Text Generation', 'Code', 'Analysis', 'Reasoning'],
    costPerToken: 0.001,
    latency: 1.2,
    accuracy: 94.5,
    usage: 45678,
    lastUpdated: '2026-03-01',
    description: 'Most capable model for complex tasks requiring reasoning and analysis',
  },
  {
    id: '2',
    name: 'GPT-3.5 Turbo',
    provider: 'OpenAI',
    version: 'gpt-3.5-turbo-0125',
    status: 'active',
    capabilities: ['Text Generation', 'Code', 'Chat'],
    costPerToken: 0.0002,
    latency: 0.8,
    accuracy: 89.2,
    usage: 123456,
    lastUpdated: '2026-02-20',
    description: 'Fast and cost-effective for most conversational tasks',
  },
  {
    id: '3',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    version: 'claude-3-opus-20240229',
    status: 'active',
    capabilities: ['Text Generation', 'Analysis', 'Long Context', 'Reasoning'],
    costPerToken: 0.0015,
    latency: 1.5,
    accuracy: 93.8,
    usage: 23456,
    lastUpdated: '2026-02-28',
    description: 'Excellent for long-form content and complex reasoning',
  },
  {
    id: '4',
    name: 'Claude 3 Sonnet',
    provider: 'Anthropic',
    version: 'claude-3-sonnet-20240229',
    status: 'active',
    capabilities: ['Text Generation', 'Analysis', 'Balanced'],
    costPerToken: 0.0008,
    latency: 1.0,
    accuracy: 91.5,
    usage: 67890,
    lastUpdated: '2026-02-25',
    description: 'Balanced performance and cost for general use',
  },
  {
    id: '5',
    name: 'Gemini Pro',
    provider: 'Google',
    version: 'gemini-1.5-pro-002',
    status: 'inactive',
    capabilities: ['Text Generation', 'Multimodal', 'Code'],
    costPerToken: 0.0005,
    latency: 1.1,
    accuracy: 90.2,
    usage: 0,
    lastUpdated: '2026-03-02',
    description: 'Multimodal capabilities with competitive pricing',
  },
];

const PERFORMANCE_DATA: ModelPerformance[] = [
  { date: '2026-03-07', requests: 12500, avgLatency: 1.1, errorRate: 0.5, cost: 45.2 },
  { date: '2026-03-06', requests: 11800, avgLatency: 1.2, errorRate: 0.4, cost: 42.8 },
  { date: '2026-03-05', requests: 13200, avgLatency: 1.0, errorRate: 0.6, cost: 48.1 },
  { date: '2026-03-04', requests: 10900, avgLatency: 1.3, errorRate: 0.5, cost: 39.5 },
  { date: '2026-03-03', requests: 12100, avgLatency: 1.1, errorRate: 0.4, cost: 44.3 },
];

const PROVIDER_COLORS: Record<string, string> = {
  'OpenAI': '#10A37F',
  'Anthropic': '#D97757',
  'Google': '#4285F4',
  'Cohere': '#D6A44F',
  'Mistral': '#FF7000',
};

export default function ModelManagementScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [activeTab, setActiveTab] = useState<'models' | 'performance' | 'routing'>('models');
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredModels = AI_MODELS.filter(
    model =>
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeModels = AI_MODELS.filter(m => m.status === 'active');
  const totalRequests = PERFORMANCE_DATA.reduce((sum, d) => sum + d.requests, 0);
  const avgLatency = PERFORMANCE_DATA.reduce((sum, d) => sum + d.avgLatency, 0) / PERFORMANCE_DATA.length;
  const totalCost = PERFORMANCE_DATA.reduce((sum, d) => sum + d.cost, 0);

  const renderModelCard = (model: AIModel, index: number) => {
    const providerColor = PROVIDER_COLORS[model.provider] || colors.tint;
    const isExpanded = selectedModel?.id === model.id;

    return (
      <Animated.View
        key={model.id}
        entering={FadeInUp.delay(index * 50)}
        style={[styles.modelCard, { backgroundColor: colors.card }]}
      >
        <TouchableOpacity
          style={styles.modelHeader}
          onPress={() => setSelectedModel(isExpanded ? null : model)}
        >
          <View style={[styles.providerBadge, { backgroundColor: providerColor + '20' }]}>
            <Text style={[styles.providerText, { color: providerColor }]}>
              {model.provider}
            </Text>
          </View>

          <View style={styles.modelInfo}>
            <Text style={[styles.modelName, { color: colors.text }]}>
              {model.name}
            </Text>
            <Text style={[styles.modelVersion, { color: colors.icon }]}>
              {model.version}
            </Text>
          </View>

          <View style={[styles.statusBadge, { backgroundColor: model.status === 'active' ? '#10B981' + '15' : '#EF4444' + '15' }]}>
            <View style={[styles.statusDot, { backgroundColor: model.status === 'active' ? '#10B981' : '#EF4444' }]} />
            <Text style={[styles.statusText, { color: model.status === 'active' ? '#10B981' : '#EF4444' }]}>
              {model.status}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.modelQuickStats}>
          <View style={styles.quickStat}>
            <DollarSign size={14} color={colors.icon} />
            <Text style={[styles.quickStatValue, { color: colors.text }]}>
              ${model.costPerToken}/1K
            </Text>
          </View>
          <View style={styles.quickStat}>
            <Clock size={14} color={colors.icon} />
            <Text style={[styles.quickStatValue, { color: colors.text }]}>
              {model.latency}s
            </Text>
          </View>
          <View style={styles.quickStat}>
            <Activity size={14} color={colors.icon} />
            <Text style={[styles.quickStatValue, { color: colors.text }]}>
              {model.accuracy}%
            </Text>
          </View>
          <View style={styles.quickStat}>
            <ChartBarBig size={14} color={colors.icon} />
            <Text style={[styles.quickStatValue, { color: colors.text }]}>
              {model.usage.toLocaleString()}
            </Text>
          </View>
        </View>

        {isExpanded && (
          <Animated.View entering={FadeInUp} style={styles.modelDetails}>
            <Text style={[styles.modelDescription, { color: colors.text }]}>
              {model.description}
            </Text>

            <View style={styles.capabilitiesRow}>
              <Text style={[styles.capabilitiesLabel, { color: colors.icon }]}>
                Capabilities:
              </Text>
              <View style={styles.capabilitiesList}>
                {model.capabilities.map((cap, i) => (
                  <View key={i} style={[styles.capabilityChip, { backgroundColor: colors.tint + '15' }]}>
                    <CircleCheck size={10} color={colors.tint} />
                    <Text style={[styles.capabilityText, { color: colors.tint }]}>
                      {cap}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.modelActions}>
              <TouchableOpacity
                style={[styles.modelActionBtn, model.status === 'active' ? { backgroundColor: '#F59E0B' + '15' } : { backgroundColor: '#10B981' + '15' }]}
              >
                {model.status === 'active' ? (
                  <CircleX size={16} color="#F59E0B" />
                ) : (
                  <CircleCheck size={16} color="#10B981" />
                )}
                <Text style={[styles.modelActionText, { color: model.status === 'active' ? '#F59E0B' : '#10B981' }]}>
                  {model.status === 'active' ? 'Deactivate' : 'Activate'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modelActionBtn, { backgroundColor: colors.background }]}>
                <Settings size={16} color={colors.icon} />
                <Text style={[styles.modelActionText, { color: colors.icon }]}>
                  Configure
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modelActionBtn, { backgroundColor: colors.background }]}>
                <Download size={16} color={colors.icon} />
                <Text style={[styles.modelActionText, { color: colors.icon }]}>
                  Metrics
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={28} color={colors.text} />
          </TouchableOpacity>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              Model Management
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
              Configure and monitor AI models
            </Text>
          </View>
        </View>
        <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.tint }]}>
          <Plus size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Server size={20} color="#3B82F6" />
          <Text style={[styles.statValue, { color: colors.text }]}>{activeModels.length}</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Active Models</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Zap size={20} color="#10B981" />
          <Text style={[styles.statValue, { color: colors.text }]}>{(totalRequests / 1000).toFixed(1)}K</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Requests Today</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Clock size={20} color="#F59E0B" />
          <Text style={[styles.statValue, { color: colors.text }]}>{avgLatency.toFixed(1)}s</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Avg Latency</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#10B981' + '10' }]}>
          <DollarSign size={20} color="#10B981" />
          <Text style={[styles.statValue, { color: '#10B981' }]}>${totalCost.toFixed(0)}</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Total Cost</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'models' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('models')}
        >
          <Cpu size={16} color={activeTab === 'models' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'models' ? 'white' : colors.text }]}>
            Models
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'performance' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('performance')}
        >
          <Activity size={16} color={activeTab === 'performance' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'performance' ? 'white' : colors.text }]}>
            Performance
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'routing' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('routing')}
        >
          <Server size={16} color={activeTab === 'routing' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'routing' ? 'white' : colors.text }]}>
            Routing
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {activeTab === 'models' && (
          <>
            {/* Search */}
            <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search models or providers..."
                placeholderTextColor={colors.icon}
              />
            </View>

            {filteredModels.map((model, index) => renderModelCard(model, index))}

            <TouchableOpacity style={[styles.addModelCard, { backgroundColor: colors.tint + '15' }]}>
              <Cpu size={24} color={colors.tint} />
              <View style={styles.addModelText}>
                <Text style={[styles.addModelTitle, { color: colors.tint }]}>
                  Add Custom Model
                </Text>
                <Text style={[styles.addModelDesc, { color: colors.icon }]}>
                  Configure a new AI model provider
                </Text>
              </View>
              <ChevronRight size={20} color={colors.tint} />
            </TouchableOpacity>
          </>
        )}

        {activeTab === 'performance' && (
          <>
            <Animated.View entering={FadeInUp} style={[styles.performanceCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.performanceTitle, { color: colors.text }]}>
                Daily Performance Metrics
              </Text>
              {PERFORMANCE_DATA.map((data, index) => (
                <View key={data.date} style={styles.performanceRow}>
                  <View style={styles.performanceLeft}>
                    <Text style={[styles.performanceDate, { color: colors.text }]}>
                      {data.date}
                    </Text>
                    <View style={styles.performanceMetrics}>
                      <Text style={[styles.performanceMetric, { color: colors.icon }]}>
                        {data.requests.toLocaleString()} requests
                      </Text>
                      <Text style={[styles.performanceMetric, { color: colors.icon }]}>
                        • {data.avgLatency}s avg
                      </Text>
                    </View>
                  </View>
                  <View style={styles.performanceRight}>
                    <Text style={[styles.performanceCost, { color: '#10B981' }]}>
                      ${data.cost.toFixed(2)}
                    </Text>
                    <View
                      style={[
                        styles.errorBadge,
                        {
                          backgroundColor:
                            data.errorRate > 1 ? '#EF4444' + '15' : '#10B981' + '15',
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.errorText,
                          {
                            color: data.errorRate > 1 ? '#EF4444' : '#10B981',
                          },
                        ]}
                      >
                        {data.errorRate}% errors
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(100)} style={[styles.metricsSummary, { backgroundColor: colors.card }]}>
              <Text style={[styles.summaryTitle, { color: colors.text }]}>
                Cost Breakdown by Provider
              </Text>
              <View style={styles.providerRow}>
                <View style={styles.providerLeft}>
                  <View style={[styles.providerDot, { backgroundColor: '#10A37F' }]} />
                  <Text style={[styles.providerName, { color: colors.text }]}>
                    OpenAI
                  </Text>
                </View>
                <Text style={[styles.providerCost, { color: colors.text }]}>
                  $124.50 (67%)
                </Text>
              </View>
              <View style={styles.providerRow}>
                <View style={styles.providerLeft}>
                  <View style={[styles.providerDot, { backgroundColor: '#D97757' }]} />
                  <Text style={[styles.providerName, { color: colors.text }]}>
                    Anthropic
                  </Text>
                </View>
                <Text style={[styles.providerCost, { color: colors.text }]}>
                  $45.30 (24%)
                </Text>
              </View>
              <View style={styles.providerRow}>
                <View style={styles.providerLeft}>
                  <View style={[styles.providerDot, { backgroundColor: '#4285F4' }]} />
                  <Text style={[styles.providerName, { color: colors.text }]}>
                    Google
                  </Text>
                </View>
                <Text style={[styles.providerCost, { color: colors.text }]}>
                  $16.70 (9%)
                </Text>
              </View>
            </Animated.View>
          </>
        )}

        {activeTab === 'routing' && (
          <Animated.View entering={FadeInUp} style={[styles.routingCard, { backgroundColor: colors.card }]}>
            <View style={styles.routingHeader}>
              <Server size={20} color={colors.tint} />
              <Text style={[styles.routingTitle, { color: colors.text }]}>
                Smart Model Routing
              </Text>
            </View>
            <Text style={[styles.routingDescription, { color: colors.icon }]}>
              Automatically route requests to the optimal model based on task requirements
            </Text>

            <View style={styles.routingRules}>
              <Text style={[styles.rulesTitle, { color: colors.text }]}>
                Routing Rules
              </Text>

              <View style={styles.ruleItem}>
                <View style={styles.ruleLeft}>
                  <Star size={16} color="#F59E0B" />
                  <View style={styles.ruleInfo}>
                    <Text style={[styles.ruleName, { color: colors.text }]}>
                      High Accuracy Tasks
                    </Text>
                    <Text style={[styles.ruleRoute, { color: colors.icon }]}>
                      Route to: GPT-4 Turbo, Claude 3 Opus
                    </Text>
                  </View>
                </View>
                <ChevronRight size={18} color={colors.icon} />
              </View>

              <View style={styles.ruleItem}>
                <View style={styles.ruleLeft}>
                  <Zap size={16} color="#3B82F6" />
                  <View style={styles.ruleInfo}>
                    <Text style={[styles.ruleName, { color: colors.text }]}>
                      Low Latency Required
                    </Text>
                    <Text style={[styles.ruleRoute, { color: colors.icon }]}>
                      Route to: GPT-3.5 Turbo, Claude 3 Sonnet
                    </Text>
                  </View>
                </View>
                <ChevronRight size={18} color={colors.icon} />
              </View>

              <View style={styles.ruleItem}>
                <View style={styles.ruleLeft}>
                  <DollarSign size={16} color="#10B981" />
                  <View style={styles.ruleInfo}>
                    <Text style={[styles.ruleName, { color: colors.text }]}>
                      Cost-Optimized
                    </Text>
                    <Text style={[styles.ruleRoute, { color: colors.icon }]}>
                      Route to: GPT-3.5 Turbo, Gemini Pro
                    </Text>
                  </View>
                </View>
                <ChevronRight size={18} color={colors.icon} />
              </View>

              <View style={styles.ruleItem}>
                <View style={styles.ruleLeft}>
                  <Shield size={16} color="#8B5CF6" />
                  <View style={styles.ruleInfo}>
                    <Text style={[styles.ruleName, { color: colors.text }]}>
                      Complex Reasoning
                    </Text>
                    <Text style={[styles.ruleRoute, { color: colors.icon }]}>
                      Route to: GPT-4 Turbo, Claude 3 Opus
                    </Text>
                  </View>
                </View>
                <ChevronRight size={18} color={colors.icon} />
              </View>
            </View>

            <TouchableOpacity style={[styles.configureBtn, { backgroundColor: colors.tint }]}>
              <Settings size={16} color="white" />
              <Text style={styles.configureBtnText}>Configure Routing</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
  },
  searchContainer: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  searchInput: {
    fontSize: 15,
    padding: 0,
  },
  modelCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  modelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  providerBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginRight: 12,
  },
  providerText: {
    fontSize: 12,
    fontWeight: '600',
  },
  modelInfo: {
    flex: 1,
  },
  modelName: {
    fontSize: 16,
    fontWeight: '600',
  },
  modelVersion: {
    fontSize: 12,
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    gap: 5,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  modelQuickStats: {
    flexDirection: 'row',
    backgroundColor: '#00000005',
    borderRadius: 10,
    padding: 12,
    gap: 12,
  },
  quickStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  quickStatValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  modelDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  modelDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  capabilitiesRow: {
    marginBottom: 16,
  },
  capabilitiesLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
  },
  capabilitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  capabilityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    gap: 4,
  },
  capabilityText: {
    fontSize: 12,
    fontWeight: '500',
  },
  modelActions: {
    flexDirection: 'row',
    gap: 8,
  },
  modelActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  modelActionText: {
    fontSize: 13,
    fontWeight: '600',
  },
  addModelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  addModelText: {
    flex: 1,
  },
  addModelTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  addModelDesc: {
    fontSize: 13,
  },
  performanceCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  performanceTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 16,
  },
  performanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  performanceLeft: {
    flex: 1,
  },
  performanceDate: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  performanceMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  performanceMetric: {
    fontSize: 12,
  },
  performanceRight: {
    alignItems: 'flex-end',
  },
  performanceCost: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  errorBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  errorText: {
    fontSize: 11,
    fontWeight: '500',
  },
  metricsSummary: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 16,
  },
  providerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  providerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  providerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  providerName: {
    fontSize: 15,
    fontWeight: '500',
  },
  providerCost: {
    fontSize: 15,
    fontWeight: '600',
  },
  routingCard: {
    borderRadius: 16,
    padding: 16,
  },
  routingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  routingTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  routingDescription: {
    fontSize: 14,
    marginBottom: 20,
  },
  routingRules: {
    marginBottom: 16,
  },
  rulesTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  ruleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  ruleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ruleInfo: {
    flex: 1,
  },
  ruleName: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  ruleRoute: {
    fontSize: 12,
  },
  configureBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  configureBtnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
});
