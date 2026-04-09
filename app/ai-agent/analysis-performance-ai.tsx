import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Activity,
  BarChart3,
  LineChart,
  Brain,
  Lightbulb,
  Users,
  Target,
  TrendingUp,
  Crown,
  ChevronRight,
  Play,
  Pause,
  RefreshCw,
  Power,
  Sparkles,
  Star,
  CheckCircle,
  Settings,
  Zap,
  Radio,
  Eye,
  Shield,
  Gauge,
  PieChart,
  Layers,
  Cpu,
  Database,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Flag,
  Briefcase,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

import { trpc } from '@/lib/trpc';
import { useAIAssistant } from '@/providers/AIAssistantProvider';

const ACCENT_COLOR = '#6366F1';
const GRADIENT_COLORS = ['#6366F1', '#8B5CF6'] as const;

interface SubAgent {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  enabled: boolean;
  status: 'active' | 'paused' | 'training' | 'inactive' | 'optimizing';
  tasksCompleted: number;
  successRate: number;
  lastActive: string;
  capabilities: string[];
  tier: 'standard' | 'premium' | 'enterprise';
  learningProgress: number;
  efficiency: number;
  insightsGenerated: number;
  reportsCreated: number;
  accuracy: number;
  trend: 'up' | 'down' | 'stable';
  recentActions: string[];
  healthScore: number;
  weeklyGrowth: number;
  dataAnalyzed: string;
  predictionsAccuracy: number;
  alertsTriggered: number;
}

const initialSubAgents: SubAgent[] = [
  {
    id: 'ap-1',
    name: 'Performance Monitoring AI',
    description: 'Real-time monitoring of all AI agents with health scoring',
    icon: Activity,
    enabled: true,
    status: 'active',
    tasksCompleted: 4560,
    successRate: 99,
    lastActive: '1 min ago',
    capabilities: ['Real-time Monitoring', 'Health Scoring', 'Alert Generation', 'Performance Tracking', 'Anomaly Detection', 'SLA Monitoring'],
    tier: 'enterprise',
    learningProgress: 97,
    efficiency: 99,
    insightsGenerated: 2340,
    reportsCreated: 567,
    accuracy: 99,
    trend: 'up',
    recentActions: ['Generated performance report', 'Detected 3 anomalies', 'Updated health scores'],
    healthScore: 99,
    weeklyGrowth: 8,
    dataAnalyzed: '12.5TB',
    predictionsAccuracy: 98,
    alertsTriggered: 45,
  },
  {
    id: 'ap-2',
    name: 'Business Intelligence AI',
    description: 'Transforms raw data into actionable business insights',
    icon: BarChart3,
    enabled: true,
    status: 'active',
    tasksCompleted: 3890,
    successRate: 96,
    lastActive: '3 min ago',
    capabilities: ['Data Visualization', 'KPI Tracking', 'Dashboard Creation', 'Trend Analysis', 'Competitive Intel', 'Market Research'],
    tier: 'enterprise',
    learningProgress: 94,
    efficiency: 97,
    insightsGenerated: 4567,
    reportsCreated: 890,
    accuracy: 97,
    trend: 'up',
    recentActions: ['Created executive dashboard', 'Analyzed Q1 performance', 'Generated market report'],
    healthScore: 97,
    weeklyGrowth: 15,
    dataAnalyzed: '8.9TB',
    predictionsAccuracy: 95,
    alertsTriggered: 23,
  },
  {
    id: 'ap-3',
    name: 'Predictive Analytics AI',
    description: 'ML-powered forecasting and trend prediction',
    icon: LineChart,
    enabled: true,
    status: 'active',
    tasksCompleted: 2340,
    successRate: 93,
    lastActive: '5 min ago',
    capabilities: ['Demand Forecasting', 'Revenue Prediction', 'Churn Prediction', 'Trend Analysis', 'Scenario Modeling', 'Risk Forecasting'],
    tier: 'enterprise',
    learningProgress: 91,
    efficiency: 94,
    insightsGenerated: 1890,
    reportsCreated: 456,
    accuracy: 94,
    trend: 'up',
    recentActions: ['Forecasted Q2 revenue', 'Predicted churn risk', 'Created demand model'],
    healthScore: 94,
    weeklyGrowth: 22,
    dataAnalyzed: '15.2TB',
    predictionsAccuracy: 92,
    alertsTriggered: 67,
  },
  {
    id: 'ap-4',
    name: 'Insight Generation AI',
    description: 'Automatically discovers and surfaces key insights',
    icon: Lightbulb,
    enabled: true,
    status: 'active',
    tasksCompleted: 5670,
    successRate: 95,
    lastActive: '2 min ago',
    capabilities: ['Auto-Discovery', 'Pattern Recognition', 'Correlation Analysis', 'Insight Prioritization', 'Recommendation Engine', 'Alert Generation'],
    tier: 'premium',
    learningProgress: 93,
    efficiency: 96,
    insightsGenerated: 8920,
    reportsCreated: 234,
    accuracy: 96,
    trend: 'up',
    recentActions: ['Discovered 12 new patterns', 'Generated 45 insights', 'Prioritized action items'],
    healthScore: 96,
    weeklyGrowth: 28,
    dataAnalyzed: '6.7TB',
    predictionsAccuracy: 93,
    alertsTriggered: 89,
  },
  {
    id: 'ap-5',
    name: 'Customer Behavior Analysis AI',
    description: 'Deep analysis of customer behavior and preferences',
    icon: Users,
    enabled: true,
    status: 'active',
    tasksCompleted: 3450,
    successRate: 94,
    lastActive: '8 min ago',
    capabilities: ['Behavior Tracking', 'Journey Analysis', 'Segment Analysis', 'Preference Detection', 'Engagement Scoring', 'Cohort Analysis'],
    tier: 'premium',
    learningProgress: 89,
    efficiency: 93,
    insightsGenerated: 3456,
    reportsCreated: 345,
    accuracy: 95,
    trend: 'up',
    recentActions: ['Analyzed 50K customer journeys', 'Identified 8 new segments', 'Updated preference models'],
    healthScore: 93,
    weeklyGrowth: 18,
    dataAnalyzed: '4.5TB',
    predictionsAccuracy: 91,
    alertsTriggered: 34,
  },
  {
    id: 'ap-6',
    name: 'Customer & Market Insights AI',
    description: 'Combined customer and market intelligence',
    icon: Target,
    enabled: true,
    status: 'training',
    tasksCompleted: 1890,
    successRate: 91,
    lastActive: '15 min ago',
    capabilities: ['Market Sizing', 'Competitive Analysis', 'Voice of Customer', 'Trend Detection', 'Opportunity Scoring', 'Gap Analysis'],
    tier: 'enterprise',
    learningProgress: 82,
    efficiency: 88,
    insightsGenerated: 1567,
    reportsCreated: 189,
    accuracy: 92,
    trend: 'up',
    recentActions: ['Completed market sizing', 'Analyzed competitor moves', 'Generated VoC report'],
    healthScore: 86,
    weeklyGrowth: 32,
    dataAnalyzed: '3.2TB',
    predictionsAccuracy: 88,
    alertsTriggered: 56,
  },
  {
    id: 'ap-7',
    name: 'ROI & Profitability Analysis AI',
    description: 'Financial impact and profitability analysis',
    icon: TrendingUp,
    enabled: true,
    status: 'active',
    tasksCompleted: 1234,
    successRate: 97,
    lastActive: '12 min ago',
    capabilities: ['ROI Calculation', 'Cost Analysis', 'Margin Analysis', 'Investment Tracking', 'Budget Optimization', 'Financial Modeling'],
    tier: 'enterprise',
    learningProgress: 95,
    efficiency: 98,
    insightsGenerated: 890,
    reportsCreated: 234,
    accuracy: 98,
    trend: 'stable',
    recentActions: ['Calculated campaign ROI', 'Analyzed profit margins', 'Optimized budget allocation'],
    healthScore: 98,
    weeklyGrowth: 10,
    dataAnalyzed: '2.1TB',
    predictionsAccuracy: 96,
    alertsTriggered: 12,
  },
  {
    id: 'ap-8',
    name: 'Goal & OKR Tracking AI',
    description: 'Tracks goals, OKRs, and KPIs with smart alerts',
    icon: Flag,
    enabled: true,
    status: 'active',
    tasksCompleted: 2890,
    successRate: 96,
    lastActive: '6 min ago',
    capabilities: ['OKR Management', 'Progress Tracking', 'Goal Alignment', 'Achievement Scoring', 'Deadline Alerts', 'Performance Review'],
    tier: 'premium',
    learningProgress: 92,
    efficiency: 95,
    insightsGenerated: 1234,
    reportsCreated: 567,
    accuracy: 97,
    trend: 'up',
    recentActions: ['Updated Q1 OKR progress', 'Generated achievement report', 'Sent deadline reminders'],
    healthScore: 95,
    weeklyGrowth: 14,
    dataAnalyzed: '1.8TB',
    predictionsAccuracy: 94,
    alertsTriggered: 78,
  },
  {
    id: 'ap-9',
    name: 'Executive Intelligence AI',
    description: 'Strategic advisor for executive decision-making',
    icon: Briefcase,
    enabled: true,
    status: 'active',
    tasksCompleted: 450,
    successRate: 99,
    lastActive: '30 min ago',
    capabilities: ['Strategic Analysis', 'Board Reporting', 'Executive Summaries', 'Decision Support', 'Risk Assessment', 'Scenario Planning'],
    tier: 'enterprise',
    learningProgress: 98,
    efficiency: 99,
    insightsGenerated: 234,
    reportsCreated: 89,
    accuracy: 99,
    trend: 'up',
    recentActions: ['Prepared board presentation', 'Analyzed strategic options', 'Generated executive brief'],
    healthScore: 99,
    weeklyGrowth: 5,
    dataAnalyzed: '890GB',
    predictionsAccuracy: 97,
    alertsTriggered: 8,
  },
];

export default function AnalysisPerformanceAIScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { activeAgents, toggleAgent } = useAIAssistant();
  
  // Fetch real data from tRPC
  const { data: statsData } = trpc.aiAgents.getStats.useQuery({ 
    category: 'analysis-performance' 
  });
  
  const toggleAgentMutation = trpc.aiAgents.toggleAgent.useMutation();

  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.2, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
    Animated.timing(progressAnim, { toValue: 1, duration: 1500, useNativeDriver: false }).start();
  }, [pulseAnim, progressAnim]);

  const toggleSubAgent = useCallback(async (agentId: string) => {
    try {
      const currentEnabled = activeAgents[agentId] ?? true;
      await toggleAgentMutation.mutateAsync({
        agentId,
        enabled: !currentEnabled,
        agentType: 'sub'
      });
      toggleAgent(agentId);
    } catch {
      console.error('Failed to toggle agent:');
    }
  }, [activeAgents, toggleAgent, toggleAgentMutation]);

  const toggleMainAgent = useCallback(async () => {
    try {
      const currentEnabled = activeAgents['main-ap'] ?? true;
      await toggleAgentMutation.mutateAsync({
        agentId: 'main-ap',
        enabled: !currentEnabled,
        agentType: 'main'
      });
      toggleAgent('main-ap');
    } catch {
      console.error('Failed to toggle main agent:');
    }
  }, [activeAgents, toggleAgent, toggleAgentMutation]);

  const mainAgentEnabled = activeAgents['main-ap'] ?? true;

  const stats = useMemo(() => {
    if (statsData) {
      return {
        activeAgents: statsData.activeAgents,
        totalInsights: Math.round(statsData.totalTasks * 0.2), // Mocking from tasks
        avgSuccess: statsData.avgSuccessRate,
        avgAccuracy: Math.round(statsData.avgSuccessRate * 0.99), // Mocking accuracy
        totalReports: Math.round(statsData.tasksToday * 0.15),
        avgHealth: statsData.avgHealthScore
      };
    }
    return { 
      activeAgents: 0, totalInsights: 0, avgSuccess: 0, 
      avgAccuracy: 0, totalReports: 0, avgHealth: 0 
    };
  }, [statsData]);

  // Sub-agents for the performance analysis module
  const subAgents = initialSubAgents;

  const activateAll = useCallback(async () => {
    try {
      await Promise.all(subAgents.map(sa => toggleAgentMutation.mutateAsync({
        agentId: sa.id,
        enabled: true,
        agentType: 'sub'
      })));
      subAgents.forEach(sa => toggleAgent(sa.id));
    } catch {
      console.error('Failed to activate all sub-agents:');
    }
  }, [subAgents, toggleAgent, toggleAgentMutation]);

  const deactivateAll = useCallback(async () => {
    try {
      await Promise.all(subAgents.map(sa => toggleAgentMutation.mutateAsync({
        agentId: sa.id,
        enabled: false,
        agentType: 'sub'
      })));
      subAgents.forEach(sa => toggleAgent(sa.id));
    } catch {
      console.error('Failed to deactivate all sub-agents:');
    }
  }, [subAgents, toggleAgent, toggleAgentMutation]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#34C759';
      case 'paused': return '#FF9500';
      case 'training': return '#007AFF';
      case 'inactive': return '#8E8E93';
      case 'optimizing': return '#AF52DE';
      default: return '#8E8E93';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return Play;
      case 'paused': return Pause;
      case 'training': return RefreshCw;
      case 'inactive': return Power;
      case 'optimizing': return Sparkles;
      default: return Power;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'enterprise': return '#AF52DE';
      case 'premium': return '#FF9500';
      case 'standard': return '#007AFF';
      default: return '#8E8E93';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'enterprise': return Crown;
      case 'premium': return Star;
      default: return CheckCircle;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return ArrowUpRight;
      case 'down': return ArrowDownRight;
      default: return Activity;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return '#34C759';
      case 'down': return '#FF3B30';
      default: return '#FF9500';
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return '#34C759';
    if (score >= 70) return '#FF9500';
    return '#FF3B30';
  };

  const renderSubAgent = (agent: SubAgent) => {
    const StatusIcon = getStatusIcon(agent.status);
    const TierIcon = getTierIcon(agent.tier);
    const TrendIcon = getTrendIcon(agent.trend);
    const isExpanded = expandedAgent === agent.id;

    return (
      <View key={agent.id} style={[styles.agentCard, { backgroundColor: theme.colors.cardBackground }]}>
        <TouchableOpacity
          style={styles.agentHeader}
          onPress={() => setExpandedAgent(isExpanded ? null : agent.id)}
          activeOpacity={0.7}
        >
          <View style={styles.agentIconWrapper}>
            <View style={[styles.agentIconContainer, { backgroundColor: `${ACCENT_COLOR}15` }]}>
              <agent.icon size={22} color={ACCENT_COLOR} />
            </View>
            {agent.status === 'active' && (
              <Animated.View style={[styles.liveIndicator, { transform: [{ scale: pulseAnim }] }]}>
                <View style={styles.liveIndicatorInner} />
              </Animated.View>
            )}
          </View>
          <View style={styles.agentInfo}>
            <View style={styles.agentTitleRow}>
              <Text style={[styles.agentName, { color: theme.colors.text }]} numberOfLines={1}>
                {agent.name}
              </Text>
              <View style={[styles.tierBadge, { backgroundColor: `${getTierColor(agent.tier)}15` }]}>
                <TierIcon size={10} color={getTierColor(agent.tier)} />
                <Text style={[styles.tierText, { color: getTierColor(agent.tier) }]}>{agent.tier}</Text>
              </View>
            </View>
            <Text style={[styles.agentDesc, { color: theme.colors.secondaryText }]} numberOfLines={1}>
              {agent.description}
            </Text>
            <View style={styles.agentMetaRow}>
              <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(agent.status)}20` }]}>
                <StatusIcon size={10} color={getStatusColor(agent.status)} />
                <Text style={[styles.statusText, { color: getStatusColor(agent.status) }]}>{agent.status}</Text>
              </View>
              <View style={[styles.healthBadge, { backgroundColor: `${getHealthColor(agent.healthScore)}15` }]}>
                <Shield size={10} color={getHealthColor(agent.healthScore)} />
                <Text style={[styles.healthText, { color: getHealthColor(agent.healthScore) }]}>{agent.healthScore}%</Text>
              </View>
              <View style={[styles.trendBadge, { backgroundColor: `${getTrendColor(agent.trend)}15` }]}>
                <TrendIcon size={10} color={getTrendColor(agent.trend)} />
                {agent.weeklyGrowth > 0 && (
                  <Text style={[styles.trendText, { color: getTrendColor(agent.trend) }]}>+{agent.weeklyGrowth}%</Text>
                )}
              </View>
            </View>
          </View>
          <View style={styles.agentActions}>
            <Switch
              value={agent.enabled && mainAgentEnabled}
              onValueChange={() => toggleSubAgent(agent.id)}
              trackColor={{ false: '#E5E5EA', true: `${ACCENT_COLOR}50` }}
              thumbColor={agent.enabled && mainAgentEnabled ? ACCENT_COLOR : '#fff'}
              disabled={!mainAgentEnabled}
            />
            <ChevronRight
              size={18}
              color={theme.colors.secondaryText}
              style={{ transform: [{ rotate: isExpanded ? '90deg' : '0deg' }] }}
            />
          </View>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.expandedContent}>
            <View style={[styles.divider, { backgroundColor: `${ACCENT_COLOR}30` }]} />
            
            <View style={styles.quickStats}>
              <View style={[styles.quickStatItem, { backgroundColor: theme.colors.background }]}>
                <Lightbulb size={14} color={ACCENT_COLOR} />
                <Text style={[styles.quickStatValue, { color: theme.colors.text }]}>{agent.insightsGenerated.toLocaleString()}</Text>
                <Text style={[styles.quickStatLabel, { color: theme.colors.secondaryText }]}>Insights</Text>
              </View>
              <View style={[styles.quickStatItem, { backgroundColor: theme.colors.background }]}>
                <BarChart3 size={14} color="#007AFF" />
                <Text style={[styles.quickStatValue, { color: theme.colors.text }]}>{agent.reportsCreated}</Text>
                <Text style={[styles.quickStatLabel, { color: theme.colors.secondaryText }]}>Reports</Text>
              </View>
              <View style={[styles.quickStatItem, { backgroundColor: theme.colors.background }]}>
                <Target size={14} color="#34C759" />
                <Text style={[styles.quickStatValue, { color: theme.colors.text }]}>{agent.accuracy}%</Text>
                <Text style={[styles.quickStatLabel, { color: theme.colors.secondaryText }]}>Accuracy</Text>
              </View>
              <View style={[styles.quickStatItem, { backgroundColor: theme.colors.background }]}>
                <Gauge size={14} color="#FF9500" />
                <Text style={[styles.quickStatValue, { color: theme.colors.text }]}>{agent.efficiency}%</Text>
                <Text style={[styles.quickStatLabel, { color: theme.colors.secondaryText }]}>Efficiency</Text>
              </View>
            </View>

            <View style={styles.liveMetrics}>
              <View style={[styles.liveMetricItem, { backgroundColor: `${ACCENT_COLOR}08` }]}>
                <Database size={16} color={ACCENT_COLOR} />
                <View style={styles.liveMetricContent}>
                  <Text style={[styles.liveMetricValue, { color: theme.colors.text }]}>{agent.dataAnalyzed}</Text>
                  <Text style={[styles.liveMetricLabel, { color: theme.colors.secondaryText }]}>Data Analyzed</Text>
                </View>
              </View>
              <View style={[styles.liveMetricItem, { backgroundColor: '#FF950008' }]}>
                <Activity size={16} color="#FF9500" />
                <View style={styles.liveMetricContent}>
                  <Text style={[styles.liveMetricValue, { color: theme.colors.text }]}>{agent.alertsTriggered}</Text>
                  <Text style={[styles.liveMetricLabel, { color: theme.colors.secondaryText }]}>Alerts Triggered</Text>
                </View>
              </View>
            </View>

            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Brain size={14} color={ACCENT_COLOR} />
                <Text style={[styles.progressLabel, { color: theme.colors.secondaryText }]}>AI Learning Progress</Text>
                <Text style={[styles.progressValue, { color: theme.colors.text }]}>{agent.learningProgress}%</Text>
              </View>
              <View style={[styles.progressBar, { backgroundColor: 'rgba(0,0,0,0.08)' }]}>
                <Animated.View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: progressAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', `${agent.learningProgress}%`]
                      }),
                      backgroundColor: ACCENT_COLOR 
                    }
                  ]} 
                />
              </View>
            </View>

            <View style={styles.recentActivitySection}>
              <View style={styles.sectionHeader}>
                <Radio size={14} color="#34C759" />
                <Text style={[styles.sectionLabel, { color: theme.colors.secondaryText }]}>Recent Activity</Text>
              </View>
              {agent.recentActions.slice(0, 3).map((action, index) => (
                <View key={index} style={styles.activityItem}>
                  <View style={[styles.activityDot, { backgroundColor: '#34C759' }]} />
                  <Text style={[styles.activityText, { color: theme.colors.text }]} numberOfLines={1}>{action}</Text>
                </View>
              ))}
            </View>

            <View style={styles.capabilitiesSection}>
              <View style={styles.sectionHeader}>
                <Sparkles size={14} color={ACCENT_COLOR} />
                <Text style={[styles.sectionLabel, { color: theme.colors.secondaryText }]}>Capabilities</Text>
              </View>
              <View style={styles.capabilitiesList}>
                {agent.capabilities.map((cap, index) => (
                  <View key={index} style={[styles.capabilityTag, { backgroundColor: `${ACCENT_COLOR}10` }]}>
                    <Text style={[styles.capabilityText, { color: ACCENT_COLOR }]}>{cap}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: `${ACCENT_COLOR}15` }]}>
                <Settings size={16} color={ACCENT_COLOR} />
                <Text style={[styles.actionButtonText, { color: ACCENT_COLOR }]}>Configure</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#007AFF15' }]}>
                <BarChart3 size={16} color="#007AFF" />
                <Text style={[styles.actionButtonText, { color: '#007AFF' }]}>Analytics</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#34C75915' }]}>
                <Eye size={16} color="#34C759" />
                <Text style={[styles.actionButtonText, { color: '#34C759' }]}>Monitor</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LinearGradient
        colors={GRADIENT_COLORS}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.headerGradient, { paddingTop: insets.top }]}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.title}>Analysis & Performance AI</Text>
            <Text style={styles.subtitle}>Insights, Analytics & Decision Support</Text>
          </View>
          <Switch
            value={mainAgentEnabled}
            onValueChange={toggleMainAgent}
            trackColor={{ false: 'rgba(255,255,255,0.3)', true: 'rgba(255,255,255,0.5)' }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.mainAgentCard}>
          <View style={styles.mainAgentHeader}>
            <View style={styles.mainAgentIcon}>
              <PieChart size={28} color="#fff" />
              {mainAgentEnabled && (
                <Animated.View style={[styles.mainLiveIndicator, { transform: [{ scale: pulseAnim }] }]}>
                  <View style={styles.mainLiveIndicatorInner} />
                </Animated.View>
              )}
            </View>
            <View style={styles.mainAgentTitleSection}>
              <Text style={styles.mainAgentTitle}>Main Agent</Text>
              <View style={[styles.mainStatusBadge, { backgroundColor: mainAgentEnabled ? 'rgba(52,199,89,0.3)' : 'rgba(142,142,147,0.3)' }]}>
                <View style={[styles.mainStatusDot, { backgroundColor: mainAgentEnabled ? '#34C759' : '#8E8E93' }]} />
                <Text style={[styles.mainStatusText, { color: '#fff' }]}>
                  {mainAgentEnabled ? 'Active' : 'Inactive'}
                </Text>
              </View>
            </View>
            <View style={styles.healthIndicator}>
              <View style={[styles.healthCircle, { borderColor: getHealthColor(stats.avgHealth) }]}>
                <Text style={styles.healthValue}>{stats.avgHealth}%</Text>
              </View>
              <Text style={styles.healthLabel}>Health</Text>
            </View>
          </View>
          <View style={styles.mainAgentStats}>
            <View style={styles.mainStat}>
              <Text style={styles.mainStatValue}>{stats.activeAgents}/{subAgents.length}</Text>
              <Text style={styles.mainStatLabel}>Sub-Agents</Text>
            </View>
            <View style={styles.mainStatDivider} />
            <View style={styles.mainStat}>
              <Text style={styles.mainStatValue}>{(stats.totalInsights / 1000).toFixed(1)}K</Text>
              <Text style={styles.mainStatLabel}>Insights</Text>
            </View>
            <View style={styles.mainStatDivider} />
            <View style={styles.mainStat}>
              <Text style={styles.mainStatValue}>{stats.totalReports.toLocaleString()}</Text>
              <Text style={styles.mainStatLabel}>Reports</Text>
            </View>
            <View style={styles.mainStatDivider} />
            <View style={styles.mainStat}>
              <Text style={styles.mainStatValue}>{stats.avgAccuracy}%</Text>
              <Text style={styles.mainStatLabel}>Accuracy</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.bulkActions}>
        <TouchableOpacity
          style={[styles.bulkButton, { backgroundColor: '#34C75915' }]}
          onPress={activateAll}
          disabled={!mainAgentEnabled}
        >
          <Zap size={16} color={mainAgentEnabled ? '#34C759' : '#8E8E93'} />
          <Text style={[styles.bulkButtonText, { color: mainAgentEnabled ? '#34C759' : '#8E8E93' }]}>Activate All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.bulkButton, { backgroundColor: '#FF3B3015' }]} onPress={deactivateAll}>
          <Power size={16} color="#FF3B30" />
          <Text style={[styles.bulkButtonText, { color: '#FF3B30' }]}>Deactivate All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionTitleRow}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
          <View style={[styles.countBadge, { backgroundColor: `${ACCENT_COLOR}15` }]}>
            <Text style={[styles.countText, { color: ACCENT_COLOR }]}>{stats.activeAgents} Active</Text>
          </View>
        </View>
        {subAgents.map(renderSubAgent)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerGradient: { paddingBottom: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 16 },
  backButton: { padding: 8, marginRight: 12, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12 },
  headerCenter: { flex: 1 },
  title: { fontSize: 22, fontWeight: '700', color: '#fff' },
  subtitle: { fontSize: 13, marginTop: 2, color: 'rgba(255,255,255,0.8)' },
  mainAgentCard: { marginHorizontal: 20, padding: 16, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 16 },
  mainAgentHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  mainAgentIcon: { width: 52, height: 52, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginRight: 12, position: 'relative' },
  mainLiveIndicator: { position: 'absolute', top: -2, right: -2, width: 14, height: 14, borderRadius: 7, backgroundColor: 'rgba(52, 199, 89, 0.4)', justifyContent: 'center', alignItems: 'center' },
  mainLiveIndicatorInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#34C759' },
  mainAgentTitleSection: { flex: 1 },
  mainAgentTitle: { fontSize: 16, fontWeight: '600', color: '#fff', marginBottom: 4 },
  mainStatusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start', gap: 6 },
  mainStatusDot: { width: 6, height: 6, borderRadius: 3 },
  mainStatusText: { fontSize: 12, fontWeight: '600' },
  healthIndicator: { alignItems: 'center' },
  healthCircle: { width: 48, height: 48, borderRadius: 24, borderWidth: 3, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)' },
  healthValue: { fontSize: 14, fontWeight: '700', color: '#fff' },
  healthLabel: { fontSize: 10, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  mainAgentStats: { flexDirection: 'row', alignItems: 'center' },
  mainStat: { flex: 1, alignItems: 'center' },
  mainStatValue: { fontSize: 20, fontWeight: '700', color: '#fff' },
  mainStatLabel: { fontSize: 11, marginTop: 2, color: 'rgba(255,255,255,0.7)' },
  mainStatDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.2)' },
  bulkActions: { flexDirection: 'row', marginHorizontal: 20, marginTop: 16, gap: 12 },
  bulkButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 12, gap: 8 },
  bulkButtonText: { fontSize: 14, fontWeight: '600' },
  content: { flex: 1, marginTop: 16 },
  contentContainer: { paddingHorizontal: 20, paddingBottom: 40 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  countBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  countText: { fontSize: 12, fontWeight: '600' },
  agentCard: { borderRadius: 16, marginBottom: 12, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  agentHeader: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  agentIconWrapper: { position: 'relative' },
  agentIconContainer: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  liveIndicator: { position: 'absolute', top: -2, right: 8, width: 12, height: 12, borderRadius: 6, backgroundColor: 'rgba(52, 199, 89, 0.3)', justifyContent: 'center', alignItems: 'center' },
  liveIndicatorInner: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#34C759' },
  agentInfo: { flex: 1 },
  agentTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  agentName: { fontSize: 15, fontWeight: '600', flex: 1 },
  tierBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, gap: 4 },
  tierText: { fontSize: 9, fontWeight: '600', textTransform: 'uppercase' },
  agentDesc: { fontSize: 12, marginBottom: 6 },
  agentMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, gap: 4 },
  statusText: { fontSize: 10, fontWeight: '600', textTransform: 'capitalize' },
  healthBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, gap: 4 },
  healthText: { fontSize: 10, fontWeight: '600' },
  trendBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, gap: 2 },
  trendText: { fontSize: 10, fontWeight: '600' },
  agentActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  expandedContent: { paddingHorizontal: 14, paddingBottom: 14 },
  divider: { height: 2, borderRadius: 1, marginBottom: 14 },
  quickStats: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  quickStatItem: { flex: 1, alignItems: 'center', padding: 10, borderRadius: 10 },
  quickStatValue: { fontSize: 14, fontWeight: '700', marginTop: 4 },
  quickStatLabel: { fontSize: 10, marginTop: 2 },
  liveMetrics: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  liveMetricItem: { flex: 1, flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, gap: 10 },
  liveMetricContent: { flex: 1 },
  liveMetricValue: { fontSize: 18, fontWeight: '700' },
  liveMetricLabel: { fontSize: 11, marginTop: 2 },
  progressSection: { marginBottom: 14 },
  progressHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  progressLabel: { flex: 1, fontSize: 12 },
  progressValue: { fontSize: 12, fontWeight: '600' },
  progressBar: { height: 6, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  recentActivitySection: { marginBottom: 14 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  sectionLabel: { fontSize: 12 },
  activityItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  activityDot: { width: 6, height: 6, borderRadius: 3 },
  activityText: { flex: 1, fontSize: 12 },
  capabilitiesSection: { marginBottom: 14 },
  capabilitiesList: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  capabilityTag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  capabilityText: { fontSize: 11, fontWeight: '500' },
  actionButtons: { flexDirection: 'row', gap: 8 },
  actionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 10, gap: 6 },
  actionButtonText: { fontSize: 12, fontWeight: '600' },
});
