 
import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Bot,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Clock,
  DollarSign,
  Brain,
  Activity,
  Target,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Crown,
  Star,
  Award,
  BarChart3,
  Layers,
  Headphones,
  Megaphone,
  Settings,
  ChevronRight,
  Share2,
  Download,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

Dimensions.get('window');

interface AgentSummaryData {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<any>;
  color: string;
  totalAgents: number;
  activeAgents: number;
  tasksToday: number;
  tasksWeek: number;
  successRate: number;
  successRateChange: number;
  efficiency: number;
  efficiencyChange: number;
  avgResponseTime: string;
  responseTimeChange: number;
  costSavings: string;
  costSavingsChange: number;
  topPerformer: string;
  topPerformerScore: number;
  needsAttention: string[];
  recentAchievements: string[];
}

interface OverallMetric {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ComponentType<any>;
  color: string;
  trend: 'up' | 'down' | 'neutral';
}

interface TimelineEvent {
  id: string;
  time: string;
  agentName: string;
  event: string;
  type: 'success' | 'warning' | 'info' | 'milestone';
  impact: string;
}

const agentSummaries: AgentSummaryData[] = [
  {
    id: 'customer-experience',
    name: 'Customer Experience AI',
    category: 'Customer Support',
    icon: Headphones,
    color: '#007AFF',
    totalAgents: 8,
    activeAgents: 7,
    tasksToday: 1542,
    tasksWeek: 15420,
    successRate: 94,
    successRateChange: 2.3,
    efficiency: 96,
    efficiencyChange: 1.8,
    avgResponseTime: '1.2s',
    responseTimeChange: -15,
    costSavings: '$28,400',
    costSavingsChange: 18,
    topPerformer: 'AI Receptionist',
    topPerformerScore: 98,
    needsAttention: ['AI Complaint Handling Agent - training mode'],
    recentAchievements: ['100K tickets milestone', 'Best satisfaction score'],
  },
  {
    id: 'sales-revenue',
    name: 'Sales & Revenue AI',
    category: 'Sales Operations',
    icon: TrendingUp,
    color: '#34C759',
    totalAgents: 9,
    activeAgents: 8,
    tasksToday: 895,
    tasksWeek: 8950,
    successRate: 89,
    successRateChange: -1.2,
    efficiency: 91,
    efficiencyChange: 2.1,
    avgResponseTime: '2.1s',
    responseTimeChange: -8,
    costSavings: '$42,800',
    costSavingsChange: 24,
    topPerformer: 'AI Pricing Strategist',
    topPerformerScore: 96,
    needsAttention: ['AI Negotiator - declining success rate'],
    recentAchievements: ['$1M pipeline influenced', 'Best Q4 start'],
  },
  {
    id: 'marketing-growth',
    name: 'Marketing & Growth AI',
    category: 'Marketing',
    icon: Megaphone,
    color: '#FF9500',
    totalAgents: 9,
    activeAgents: 8,
    tasksToday: 1234,
    tasksWeek: 12340,
    successRate: 91,
    successRateChange: 3.5,
    efficiency: 93,
    efficiencyChange: 2.8,
    avgResponseTime: '1.8s',
    responseTimeChange: -12,
    costSavings: '$35,600',
    costSavingsChange: 21,
    topPerformer: 'AI CMO',
    topPerformerScore: 97,
    needsAttention: ['AI SEO Agent - training mode'],
    recentAchievements: ['Campaign ROI record', '2.5x engagement achieved'],
  },
  {
    id: 'operations',
    name: 'Operations & Management AI',
    category: 'Operations',
    icon: Settings,
    color: '#5856D6',
    totalAgents: 8,
    activeAgents: 7,
    tasksToday: 678,
    tasksWeek: 6780,
    successRate: 96,
    successRateChange: 1.1,
    efficiency: 98,
    efficiencyChange: 0.8,
    avgResponseTime: '0.9s',
    responseTimeChange: -20,
    costSavings: '$18,200',
    costSavingsChange: 15,
    topPerformer: 'AI Compliance Monitoring',
    topPerformerScore: 99,
    needsAttention: [],
    recentAchievements: ['Zero compliance issues', '99.9% uptime'],
  },
  {
    id: 'data-intelligence',
    name: 'Data & Intelligence AI',
    category: 'Analytics',
    icon: BarChart3,
    color: '#FF2D55',
    totalAgents: 8,
    activeAgents: 7,
    tasksToday: 945,
    tasksWeek: 9450,
    successRate: 93,
    successRateChange: 2.1,
    efficiency: 94,
    efficiencyChange: 1.5,
    avgResponseTime: '2.5s',
    responseTimeChange: -10,
    costSavings: '$22,400',
    costSavingsChange: 19,
    topPerformer: 'AI Fraud Detection',
    topPerformerScore: 99,
    needsAttention: ['AI Forecasting Agent - training mode'],
    recentAchievements: ['$500K fraud prevented', 'Accuracy record'],
  },
  {
    id: 'analysis-performance',
    name: 'Analysis & Performance AI',
    category: 'Intelligence',
    icon: Brain,
    color: '#AF52DE',
    totalAgents: 10,
    activeAgents: 9,
    tasksToday: 789,
    tasksWeek: 7890,
    successRate: 95,
    successRateChange: 1.8,
    efficiency: 97,
    efficiencyChange: 2.2,
    avgResponseTime: '1.5s',
    responseTimeChange: -18,
    costSavings: '$19,600',
    costSavingsChange: 16,
    topPerformer: 'AI Strategy Advisor',
    topPerformerScore: 99,
    needsAttention: [],
    recentAchievements: ['Executive dashboard launched', 'Best insights quality'],
  },
];

const overallMetrics: OverallMetric[] = [
  { id: '1', label: 'Total AI Workforce', value: '52', change: 4, changeLabel: 'new agents', icon: Bot, color: '#007AFF', trend: 'up' },
  { id: '2', label: 'Active Agents', value: '46', change: 3, changeLabel: 'more active', icon: Activity, color: '#34C759', trend: 'up' },
  { id: '3', label: 'Tasks Today', value: '6,083', change: 12, changeLabel: 'vs yesterday', icon: CheckCircle, color: '#FF9500', trend: 'up' },
  { id: '4', label: 'Weekly Tasks', value: '60,830', change: 18, changeLabel: 'vs last week', icon: Layers, color: '#5856D6', trend: 'up' },
  { id: '5', label: 'Avg Success Rate', value: '93.2%', change: 1.9, changeLabel: 'improvement', icon: Target, color: '#FF2D55', trend: 'up' },
  { id: '6', label: 'Total Savings', value: '$167K', change: 22, changeLabel: 'this month', icon: DollarSign, color: '#AF52DE', trend: 'up' },
];

const timelineEvents: TimelineEvent[] = [
  { id: '1', time: '2 min ago', agentName: 'AI Receptionist', event: 'Handled 1000th call today', type: 'milestone', impact: '+12% efficiency' },
  { id: '2', time: '15 min ago', agentName: 'AI Fraud Detection', event: 'Blocked $45K fraudulent transaction', type: 'success', impact: 'High value save' },
  { id: '3', time: '32 min ago', agentName: 'AI Negotiator', event: 'Deal negotiation exceeded authority limit', type: 'warning', impact: 'Escalated to manager' },
  { id: '4', time: '1 hour ago', agentName: 'AI Campaign Optimizer', event: 'Achieved 4.2x ROAS on holiday campaign', type: 'success', impact: '+$24K revenue' },
  { id: '5', time: '2 hours ago', agentName: 'AI CMO', event: 'Q4 marketing strategy approved', type: 'milestone', impact: 'Strategic initiative' },
  { id: '6', time: '3 hours ago', agentName: 'AI Content Generator', event: 'Published viral blog post (50K views)', type: 'success', impact: '2.5x avg engagement' },
];

export default function AgentSummaryScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('week');
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.15, duration: 1500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
      ])
    );
    pulse.start();

    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: false,
    }).start();

    return () => pulse.stop();
  }, [progressAnim, pulseAnim]);

  const totalStats = useMemo(() => {
    const totalAgents = agentSummaries.reduce((acc, a) => acc + a.totalAgents, 0);
    const activeAgents = agentSummaries.reduce((acc, a) => acc + a.activeAgents, 0);
    const tasksToday = agentSummaries.reduce((acc, a) => acc + a.tasksToday, 0);
    const tasksWeek = agentSummaries.reduce((acc, a) => acc + a.tasksWeek, 0);
    const avgSuccess = Math.round(agentSummaries.reduce((acc, a) => acc + a.successRate, 0) / agentSummaries.length * 10) / 10;
    const avgEfficiency = Math.round(agentSummaries.reduce((acc, a) => acc + a.efficiency, 0) / agentSummaries.length * 10) / 10;
    const totalSavings = agentSummaries.reduce((acc, a) => acc + parseFloat(a.costSavings.replace(/[$,]/g, '')), 0);
    const needsAttention = agentSummaries.reduce((acc, a) => acc + a.needsAttention.length, 0);
    return { totalAgents, activeAgents, tasksToday, tasksWeek, avgSuccess, avgEfficiency, totalSavings, needsAttention };
  }, []);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'milestone': return Award;
      default: return Sparkles;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'success': return '#34C759';
      case 'warning': return '#FF9500';
      case 'milestone': return '#AF52DE';
      default: return '#007AFF';
    }
  };

  const renderOverallScore = () => {
    const score = Math.round((totalStats.avgSuccess + totalStats.avgEfficiency) / 2);
    const grade = score >= 95 ? 'S' : score >= 90 ? 'A' : score >= 85 ? 'B' : score >= 80 ? 'C' : 'D';
    const gradeColor = score >= 95 ? '#FFD700' : score >= 90 ? '#34C759' : score >= 85 ? '#007AFF' : score >= 80 ? '#FF9500' : '#FF3B30';

    return (
      <View style={[styles.scoreCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.scoreHeader}>
          <Animated.View style={[styles.scoreIconBg, { transform: [{ scale: pulseAnim }] }]}>
            <Crown size={32} color="#FFD700" />
          </Animated.View>
          <View style={styles.scoreInfo}>
            <Text style={[styles.scoreLabel, { color: theme.colors.secondaryText }]}>AI Workforce Performance</Text>
            <View style={styles.scoreValueRow}>
              <Text style={[styles.scoreValue, { color: theme.colors.text }]}>{score}%</Text>
              <View style={[styles.gradeBadge, { backgroundColor: `${gradeColor}20` }]}>
                <Text style={[styles.gradeText, { color: gradeColor }]}>Grade {grade}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.scoreBarContainer}>
          <Animated.View 
            style={[
              styles.scoreBar, 
              { 
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', `${score}%`]
                }),
                backgroundColor: gradeColor
              }
            ]} 
          />
        </View>
        <View style={styles.scoreStatsRow}>
          <View style={styles.scoreStat}>
            <Text style={[styles.scoreStatValue, { color: '#34C759' }]}>{totalStats.activeAgents}/{totalStats.totalAgents}</Text>
            <Text style={[styles.scoreStatLabel, { color: theme.colors.secondaryText }]}>Active</Text>
          </View>
          <View style={styles.scoreStatDivider} />
          <View style={styles.scoreStat}>
            <Text style={[styles.scoreStatValue, { color: '#007AFF' }]}>{totalStats.avgSuccess}%</Text>
            <Text style={[styles.scoreStatLabel, { color: theme.colors.secondaryText }]}>Success</Text>
          </View>
          <View style={styles.scoreStatDivider} />
          <View style={styles.scoreStat}>
            <Text style={[styles.scoreStatValue, { color: '#FF9500' }]}>{totalStats.avgEfficiency}%</Text>
            <Text style={[styles.scoreStatLabel, { color: theme.colors.secondaryText }]}>Efficiency</Text>
          </View>
          <View style={styles.scoreStatDivider} />
          <View style={styles.scoreStat}>
            <Text style={[styles.scoreStatValue, { color: '#AF52DE' }]}>${(totalStats.totalSavings / 1000).toFixed(0)}K</Text>
            <Text style={[styles.scoreStatLabel, { color: theme.colors.secondaryText }]}>Savings</Text>
          </View>
        </View>
        {totalStats.needsAttention > 0 && (
          <View style={[styles.attentionBanner, { backgroundColor: '#FF950015' }]}>
            <AlertTriangle size={14} color="#FF9500" />
            <Text style={[styles.attentionText, { color: '#FF9500' }]}>
              {totalStats.needsAttention} agent{totalStats.needsAttention > 1 ? 's' : ''} need attention
            </Text>
          </View>
        )}
      </View>
    );
  };

  const renderMetricCard = (metric: OverallMetric) => {
    const TrendIcon = metric.trend === 'up' ? ArrowUpRight : metric.trend === 'down' ? ArrowDownRight : Activity;
    const trendColor = metric.trend === 'up' ? '#34C759' : metric.trend === 'down' ? '#FF3B30' : '#8E8E93';

    return (
      <View key={metric.id} style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={[styles.metricIconBg, { backgroundColor: `${metric.color}20` }]}>
          <metric.icon size={18} color={metric.color} />
        </View>
        <Text style={[styles.metricValue, { color: theme.colors.text }]}>{metric.value}</Text>
        <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]} numberOfLines={1}>{metric.label}</Text>
        <View style={[styles.metricTrendBadge, { backgroundColor: `${trendColor}15` }]}>
          <TrendIcon size={10} color={trendColor} />
          <Text style={[styles.metricTrendText, { color: trendColor }]}>
            +{metric.change}%
          </Text>
        </View>
      </View>
    );
  };

  const renderAgentSummaryCard = (agent: AgentSummaryData) => {
    const isExpanded = expandedAgent === agent.id;
    const successColor = agent.successRateChange >= 0 ? '#34C759' : '#FF3B30';
    const efficiencyColor = agent.efficiencyChange >= 0 ? '#34C759' : '#FF3B30';

    return (
      <TouchableOpacity
        key={agent.id}
        style={[styles.agentCard, { backgroundColor: theme.colors.cardBackground }]}
        onPress={() => setExpandedAgent(isExpanded ? null : agent.id)}
        activeOpacity={0.7}
      >
        <View style={styles.agentHeader}>
          <View style={[styles.agentIconBg, { backgroundColor: `${agent.color}20` }]}>
            <agent.icon size={22} color={agent.color} />
          </View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]} numberOfLines={1}>{agent.name}</Text>
            <Text style={[styles.agentCategory, { color: theme.colors.secondaryText }]}>{agent.category}</Text>
          </View>
          <View style={styles.agentQuickStats}>
            <View style={[styles.quickStatBadge, { backgroundColor: `${agent.color}15` }]}>
              <Text style={[styles.quickStatText, { color: agent.color }]}>{agent.activeAgents}/{agent.totalAgents}</Text>
            </View>
            <ChevronRight 
              size={16} 
              color={theme.colors.secondaryText}
              style={{ transform: [{ rotate: isExpanded ? '90deg' : '0deg' }] }}
            />
          </View>
        </View>

        <View style={styles.agentMetricsRow}>
          <View style={styles.agentMetricItem}>
            <Text style={[styles.agentMetricValue, { color: theme.colors.text }]}>
              {selectedPeriod === 'today' ? agent.tasksToday.toLocaleString() : agent.tasksWeek.toLocaleString()}
            </Text>
            <Text style={[styles.agentMetricLabel, { color: theme.colors.secondaryText }]}>Tasks</Text>
          </View>
          <View style={styles.agentMetricItem}>
            <View style={styles.metricWithChange}>
              <Text style={[styles.agentMetricValue, { color: theme.colors.text }]}>{agent.successRate}%</Text>
              <Text style={[styles.metricChange, { color: successColor }]}>
                {agent.successRateChange >= 0 ? '+' : ''}{agent.successRateChange}%
              </Text>
            </View>
            <Text style={[styles.agentMetricLabel, { color: theme.colors.secondaryText }]}>Success</Text>
          </View>
          <View style={styles.agentMetricItem}>
            <View style={styles.metricWithChange}>
              <Text style={[styles.agentMetricValue, { color: theme.colors.text }]}>{agent.efficiency}%</Text>
              <Text style={[styles.metricChange, { color: efficiencyColor }]}>
                {agent.efficiencyChange >= 0 ? '+' : ''}{agent.efficiencyChange}%
              </Text>
            </View>
            <Text style={[styles.agentMetricLabel, { color: theme.colors.secondaryText }]}>Efficiency</Text>
          </View>
          <View style={styles.agentMetricItem}>
            <Text style={[styles.agentMetricValue, { color: '#34C759' }]}>{agent.costSavings}</Text>
            <Text style={[styles.agentMetricLabel, { color: theme.colors.secondaryText }]}>Savings</Text>
          </View>
        </View>

        <View style={styles.progressBarBg}>
          <Animated.View 
            style={[
              styles.progressBarFill, 
              { 
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', `${agent.successRate}%`]
                }), 
                backgroundColor: agent.color 
              }
            ]} 
          />
        </View>

        {isExpanded && (
          <View style={[styles.expandedContent, { borderTopColor: theme.colors.border }]}>
            <View style={styles.expandedRow}>
              <View style={styles.expandedItem}>
                <Clock size={14} color={theme.colors.secondaryText} />
                <Text style={[styles.expandedLabel, { color: theme.colors.secondaryText }]}>Avg Response</Text>
                <Text style={[styles.expandedValue, { color: theme.colors.text }]}>{agent.avgResponseTime}</Text>
                <Text style={[styles.expandedChange, { color: '#34C759' }]}>{agent.responseTimeChange}%</Text>
              </View>
              <View style={styles.expandedItem}>
                <Star size={14} color="#FFD700" />
                <Text style={[styles.expandedLabel, { color: theme.colors.secondaryText }]}>Top Performer</Text>
                <Text style={[styles.expandedValue, { color: theme.colors.text }]} numberOfLines={1}>{agent.topPerformer}</Text>
                <Text style={[styles.expandedChange, { color: '#34C759' }]}>{agent.topPerformerScore}%</Text>
              </View>
            </View>

            {agent.needsAttention.length > 0 && (
              <View style={[styles.attentionBox, { backgroundColor: '#FF950010' }]}>
                <AlertTriangle size={14} color="#FF9500" />
                <View style={styles.attentionContent}>
                  <Text style={[styles.attentionTitle, { color: '#FF9500' }]}>Needs Attention</Text>
                  {agent.needsAttention.map((item, index) => (
                    <Text key={index} style={[styles.attentionItem, { color: theme.colors.secondaryText }]}>• {item}</Text>
                  ))}
                </View>
              </View>
            )}

            {agent.recentAchievements.length > 0 && (
              <View style={[styles.achievementsBox, { backgroundColor: '#34C75910' }]}>
                <Award size={14} color="#34C759" />
                <View style={styles.achievementsContent}>
                  <Text style={[styles.achievementsTitle, { color: '#34C759' }]}>Recent Achievements</Text>
                  {agent.recentAchievements.map((item, index) => (
                    <Text key={index} style={[styles.achievementItem, { color: theme.colors.secondaryText }]}>🏆 {item}</Text>
                  ))}
                </View>
              </View>
            )}

            <TouchableOpacity 
              style={[styles.viewDetailsBtn, { backgroundColor: `${agent.color}15` }]}
              onPress={() => router.push('/ai-agent/agent-insights')}
            >
              <Text style={[styles.viewDetailsText, { color: agent.color }]}>View Full Analytics</Text>
              <ChevronRight size={16} color={agent.color} />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderTimelineEvent = (event: TimelineEvent) => {
    const EventIcon = getEventIcon(event.type);
    const eventColor = getEventColor(event.type);

    return (
      <View key={event.id} style={[styles.timelineItem, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={[styles.timelineIconBg, { backgroundColor: `${eventColor}20` }]}>
          <EventIcon size={14} color={eventColor} />
        </View>
        <View style={styles.timelineContent}>
          <Text style={[styles.timelineAgent, { color: theme.colors.text }]}>{event.agentName}</Text>
          <Text style={[styles.timelineEvent, { color: theme.colors.secondaryText }]}>{event.event}</Text>
          <View style={styles.timelineMeta}>
            <Text style={[styles.timelineTime, { color: theme.colors.secondaryText }]}>{event.time}</Text>
            <View style={[styles.impactBadge, { backgroundColor: `${eventColor}15` }]}>
              <Text style={[styles.impactText, { color: eventColor }]}>{event.impact}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.title, { color: theme.colors.text }]}>AI Agent Summary</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            Comprehensive Overview
          </Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={[styles.headerBtn, { backgroundColor: theme.colors.cardBackground }]}>
            <Share2 size={18} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerBtn, { backgroundColor: theme.colors.cardBackground }]}>
            <Download size={18} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.periodSelector}>
        {(['today', 'week', 'month'] as const).map((period) => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodTab,
              selectedPeriod === period && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text style={[
              styles.periodText,
              { color: selectedPeriod === period ? '#fff' : theme.colors.secondaryText }
            ]}>
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {renderOverallScore()}

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Metrics</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.metricsScroll}
        >
          {overallMetrics.map(renderMetricCard)}
        </ScrollView>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Agent Teams Performance</Text>
        {agentSummaries.map(renderAgentSummaryCard)}

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Live Activity Timeline</Text>
        <View style={styles.timelineSection}>
          {timelineEvents.map(renderTimelineEvent)}
        </View>

        <TouchableOpacity 
          style={[styles.viewAllBtn, { backgroundColor: theme.colors.cardBackground }]}
          onPress={() => router.push('/ai-agent/agent-history')}
        >
          <Clock size={18} color={theme.colors.primary} />
          <Text style={[styles.viewAllText, { color: theme.colors.primary }]}>View Full History</Text>
          <ChevronRight size={18} color={theme.colors.primary} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerCenter: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerBtn: {
    padding: 10,
    borderRadius: 12,
  },
  periodSelector: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 12,
    padding: 4,
  },
  periodTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  periodText: {
    fontSize: 13,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  scoreCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  scoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  scoreIconBg: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#FFD70020',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  scoreInfo: {
    flex: 1,
  },
  scoreLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  scoreValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: '800',
  },
  gradeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  gradeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  scoreBarContainer: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderRadius: 4,
    marginBottom: 14,
  },
  scoreBar: {
    height: 8,
    borderRadius: 4,
  },
  scoreStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreStat: {
    alignItems: 'center',
    flex: 1,
  },
  scoreStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  scoreStatValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  scoreStatLabel: {
    fontSize: 10,
    marginTop: 2,
  },
  attentionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    borderRadius: 10,
    marginTop: 12,
  },
  attentionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 8,
  },
  metricsScroll: {
    gap: 10,
    marginBottom: 16,
  },
  metricCard: {
    width: 120,
    padding: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  metricIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 6,
  },
  metricTrendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 3,
  },
  metricTrendText: {
    fontSize: 10,
    fontWeight: '600',
  },
  agentCard: {
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  agentIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  agentCategory: {
    fontSize: 12,
  },
  agentQuickStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quickStatBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  quickStatText: {
    fontSize: 12,
    fontWeight: '600',
  },
  agentMetricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  agentMetricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricWithChange: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  agentMetricValue: {
    fontSize: 15,
    fontWeight: '700',
  },
  metricChange: {
    fontSize: 10,
    fontWeight: '600',
  },
  agentMetricLabel: {
    fontSize: 10,
    marginTop: 2,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderRadius: 2,
  },
  progressBarFill: {
    height: 4,
    borderRadius: 2,
  },
  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  expandedRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  expandedItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.03)',
    padding: 10,
    borderRadius: 10,
    gap: 6,
    flexWrap: 'wrap',
  },
  expandedLabel: {
    fontSize: 10,
    flex: 1,
  },
  expandedValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  expandedChange: {
    fontSize: 10,
    fontWeight: '600',
  },
  attentionBox: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    gap: 10,
    marginBottom: 10,
  },
  attentionContent: {
    flex: 1,
  },
  attentionTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  attentionItem: {
    fontSize: 11,
    lineHeight: 16,
  },
  achievementsBox: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    gap: 10,
    marginBottom: 10,
  },
  achievementsContent: {
    flex: 1,
  },
  achievementsTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  achievementItem: {
    fontSize: 11,
    lineHeight: 16,
  },
  viewDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    gap: 6,
  },
  viewDetailsText: {
    fontSize: 13,
    fontWeight: '600',
  },
  timelineSection: {
    gap: 8,
    marginBottom: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
  },
  timelineIconBg: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  timelineContent: {
    flex: 1,
  },
  timelineAgent: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  timelineEvent: {
    fontSize: 12,
    marginBottom: 6,
    lineHeight: 16,
  },
  timelineMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timelineTime: {
    fontSize: 10,
  },
  impactBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  impactText: {
    fontSize: 10,
    fontWeight: '600',
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 8,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
