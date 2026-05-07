import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  ChartBarBig,
  ChartPie,
  ChartLine,
  Users,
  Zap,
  Target,
  Clock,
  DollarSign,
  MessageSquare,
  CircleCheck,
  TriangleAlert,
  Lightbulb,
  Brain,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Eye,
  ListFilter,
  Calendar,
  RefreshCw,
  Award,
  Flame,
  Shield,
  Cpu,
  Database,
  Globe,
  Layers,
  Star,
  Crown,
  ChevronRight,
  Minus,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

interface MetricCard {
  id: string;
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ComponentType<any>;
  color: string;
  trend: 'up' | 'down' | 'neutral';
  sparkline?: number[];
}

interface InsightItem {
  id: string;
  title: string;
  description: string;
  type: 'success' | 'warning' | 'info' | 'opportunity' | 'critical';
  impact: 'high' | 'medium' | 'low';
  agentName: string;
  agentCategory: string;
  actionable: boolean;
  metric?: string;
  priority: number;
  timestamp: string;
  recommendation?: string;
}

interface PerformanceData {
  agentName: string;
  category: string;
  successRate: number;
  tasksCompleted: number;
  avgResponseTime: string;
  satisfaction: number;
  color: string;
  trend: 'up' | 'down' | 'stable';
  efficiency: number;
  costPerTask: string;
}

interface TrendData {
  label: string;
  current: number;
  previous: number;
  change: number;
}

const metricsData: MetricCard[] = [
  { id: '1', title: 'Total Tasks Completed', value: '58,430', change: 12.5, changeLabel: 'vs last week', icon: CircleCheck, color: '#34C759', trend: 'up', sparkline: [45, 52, 48, 61, 55, 67, 72] },
  { id: '2', title: 'Overall Success Rate', value: '94.2%', change: 2.8, changeLabel: 'vs last week', icon: Target, color: '#007AFF', trend: 'up', sparkline: [91, 92, 91, 93, 94, 93, 94] },
  { id: '3', title: 'Avg Response Time', value: '1.4s', change: -15, changeLabel: 'improvement', icon: Clock, color: '#FF9500', trend: 'up', sparkline: [2.1, 1.9, 1.8, 1.6, 1.5, 1.4, 1.4] },
  { id: '4', title: 'Cost Savings', value: '$142K', change: 18.3, changeLabel: 'this month', icon: DollarSign, color: '#5856D6', trend: 'up', sparkline: [95, 105, 112, 125, 130, 138, 142] },
  { id: '5', title: 'Customer Satisfaction', value: '4.8/5', change: 0.3, changeLabel: 'points up', icon: Users, color: '#FF2D55', trend: 'up', sparkline: [4.5, 4.5, 4.6, 4.6, 4.7, 4.8, 4.8] },
  { id: '6', title: 'Active Agents', value: '48/52', change: 4, changeLabel: 'more active', icon: Users, color: '#AF52DE', trend: 'up', sparkline: [42, 43, 44, 45, 46, 47, 48] },
  { id: '7', title: 'AI Efficiency Score', value: '96.5%', change: 3.2, changeLabel: 'improvement', icon: Cpu, color: '#00C7BE', trend: 'up', sparkline: [92, 93, 94, 95, 95, 96, 96] },
  { id: '8', title: 'Tokens Processed', value: '12.4M', change: 8.5, changeLabel: 'vs last week', icon: Database, color: '#FF6B6B', trend: 'up', sparkline: [10.2, 10.8, 11.1, 11.5, 11.9, 12.1, 12.4] },
];

const insightsData: InsightItem[] = [
  {
    id: '1',
    title: 'Customer Support efficiency peaked',
    description: 'AI Customer Support Agent achieved 98% resolution rate today, highest this quarter. Auto-resolution improved by 15%.',
    type: 'success',
    impact: 'high',
    agentName: 'AI Customer Support Agent',
    agentCategory: 'customer',
    actionable: true,
    metric: '+23% efficiency',
    priority: 1,
    timestamp: '2 hours ago',
    recommendation: 'Consider expanding scope to handle more complex tickets.',
  },
  {
    id: '2',
    title: 'Negotiation success rate declining',
    description: 'AI Negotiator success rate dropped 8% this week. Analysis shows new pricing models require additional training data.',
    type: 'warning',
    impact: 'high',
    agentName: 'AI Negotiator',
    agentCategory: 'sales',
    actionable: true,
    metric: '-8% success',
    priority: 2,
    timestamp: '4 hours ago',
    recommendation: 'Update training data with latest pricing strategies and market conditions.',
  },
  {
    id: '3',
    title: 'Marketing ROI opportunity detected',
    description: 'AI Campaign Optimizer identified untapped audience segment with 3x conversion potential in the tech vertical.',
    type: 'opportunity',
    impact: 'high',
    agentName: 'AI Campaign Optimizer',
    agentCategory: 'marketing',
    actionable: true,
    metric: '3x potential ROI',
    priority: 3,
    timestamp: '6 hours ago',
    recommendation: 'Allocate 15% of Q4 budget to test this segment.',
  },
  {
    id: '4',
    title: 'Critical: Fraud spike detected',
    description: 'AI Fraud Detection flagged 40% more suspicious activities. Pattern suggests coordinated attack.',
    type: 'critical',
    impact: 'high',
    agentName: 'AI Fraud Detection Agent',
    agentCategory: 'data',
    actionable: true,
    metric: '+40% flags',
    priority: 1,
    timestamp: '1 hour ago',
    recommendation: 'Review flagged transactions immediately and consider temporary rule tightening.',
  },
  {
    id: '5',
    title: 'Lead qualification improving',
    description: 'AI SDR has improved lead quality score by 15% through enhanced qualification criteria and scoring model.',
    type: 'success',
    impact: 'medium',
    agentName: 'AI Lead Development Rep',
    agentCategory: 'sales',
    actionable: false,
    metric: '+15% quality',
    priority: 4,
    timestamp: '8 hours ago',
  },
  {
    id: '6',
    title: 'Content engagement surge',
    description: 'AI Content Generator produced content with 2.5x average engagement rate this week across all channels.',
    type: 'success',
    impact: 'medium',
    agentName: 'AI Content Generator',
    agentCategory: 'marketing',
    actionable: false,
    metric: '2.5x engagement',
    priority: 5,
    timestamp: '12 hours ago',
  },
  {
    id: '7',
    title: 'Operations bottleneck identified',
    description: 'AI Process Optimization Agent detected workflow bottleneck causing 20% delay in order fulfillment.',
    type: 'warning',
    impact: 'medium',
    agentName: 'AI Process Optimization Agent',
    agentCategory: 'operations',
    actionable: true,
    metric: '20% delay',
    priority: 3,
    timestamp: '5 hours ago',
    recommendation: 'Implement parallel processing for order verification step.',
  },
  {
    id: '8',
    title: 'New market opportunity',
    description: 'AI Competitive Intelligence identified emerging competitor weakness in enterprise segment.',
    type: 'opportunity',
    impact: 'high',
    agentName: 'AI Competitive Intelligence Agent',
    agentCategory: 'marketing',
    actionable: true,
    metric: 'Market gap',
    priority: 4,
    timestamp: '1 day ago',
    recommendation: 'Prepare targeted enterprise campaign within 2 weeks.',
  },
];

const performanceData: PerformanceData[] = [
  { agentName: 'Customer Experience AI', category: 'customer', successRate: 94, tasksCompleted: 15420, avgResponseTime: '1.2s', satisfaction: 4.8, color: '#007AFF', trend: 'up', efficiency: 96, costPerTask: '$0.12' },
  { agentName: 'Sales & Revenue AI', category: 'sales', successRate: 89, tasksCompleted: 8950, avgResponseTime: '2.1s', satisfaction: 4.6, color: '#34C759', trend: 'up', efficiency: 91, costPerTask: '$0.18' },
  { agentName: 'Marketing & Growth AI', category: 'marketing', successRate: 91, tasksCompleted: 12340, avgResponseTime: '1.8s', satisfaction: 4.5, color: '#FF9500', trend: 'stable', efficiency: 93, costPerTask: '$0.15' },
  { agentName: 'Operations & Management AI', category: 'operations', successRate: 96, tasksCompleted: 6780, avgResponseTime: '0.9s', satisfaction: 4.9, color: '#5856D6', trend: 'up', efficiency: 98, costPerTask: '$0.08' },
  { agentName: 'Data & Intelligence AI', category: 'data', successRate: 93, tasksCompleted: 9450, avgResponseTime: '2.5s', satisfaction: 4.7, color: '#FF2D55', trend: 'up', efficiency: 94, costPerTask: '$0.22' },
  { agentName: 'Analysis & Performance AI', category: 'analysis', successRate: 95, tasksCompleted: 7890, avgResponseTime: '1.5s', satisfaction: 4.8, color: '#AF52DE', trend: 'up', efficiency: 97, costPerTask: '$0.14' },
];

const trendData: TrendData[] = [
  { label: 'Tasks/Hour', current: 245, previous: 218, change: 12.4 },
  { label: 'Avg Confidence', current: 94.2, previous: 91.8, change: 2.6 },
  { label: 'Error Rate', current: 2.1, previous: 3.4, change: -38.2 },
  { label: 'Cost/Task', current: 0.14, previous: 0.18, change: -22.2 },
];

export default function AgentInsightsScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month' | 'quarter'>('week');
  const [selectedInsightType, setSelectedInsightType] = useState<string>('all');
  const [selectedView, setSelectedView] = useState<'overview' | 'performance' | 'insights'>('overview');
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const periods = ['day', 'week', 'month', 'quarter'];
  const insightTypes = ['all', 'success', 'warning', 'opportunity', 'critical', 'info'];

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 1500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
      ])
    );
    pulse.start();

    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    return () => pulse.stop();
  }, [progressAnim, pulseAnim]);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success': return CircleCheck;
      case 'warning': return TriangleAlert;
      case 'opportunity': return Lightbulb;
      case 'critical': return Shield;
      case 'info': return Eye;
      default: return Sparkles;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'success': return '#34C759';
      case 'warning': return '#FF9500';
      case 'opportunity': return '#007AFF';
      case 'critical': return '#FF3B30';
      case 'info': return '#5856D6';
      default: return '#8E8E93';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return '#FF3B30';
      case 'medium': return '#FF9500';
      case 'low': return '#34C759';
      default: return '#8E8E93';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return Minus;
    }
  };

  const filteredInsights = useMemo(() => {
    const results = selectedInsightType === 'all' 
      ? insightsData 
      : insightsData.filter(i => i.type === selectedInsightType);
    return results.sort((a, b) => a.priority - b.priority);
  }, [selectedInsightType]);

  const overallScore = useMemo(() => {
    const avgSuccess = performanceData.reduce((acc, p) => acc + p.successRate, 0) / performanceData.length;
    const avgEfficiency = performanceData.reduce((acc, p) => acc + p.efficiency, 0) / performanceData.length;
    return Math.round((avgSuccess + avgEfficiency) / 2);
  }, []);

  const renderSparkline = (data: number[], color: string) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    return (
      <View style={styles.sparkline}>
        {data.map((value, index) => {
          const height = ((value - min) / range) * 20 + 4;
          return (
            <View
              key={index}
              style={[
                styles.sparklineBar,
                { 
                  height, 
                  backgroundColor: index === data.length - 1 ? color : `${color}50`,
                }
              ]}
            />
          );
        })}
      </View>
    );
  };

  const renderMetricCard = (metric: MetricCard) => {
    const TrendIcon = metric.trend === 'up' ? ArrowUpRight : metric.trend === 'down' ? ArrowDownRight : Minus;
    const trendColor = metric.trend === 'up' ? '#34C759' : metric.trend === 'down' ? '#FF3B30' : '#8E8E93';
    
    return (
      <View key={metric.id} style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.metricHeader}>
          <View style={[styles.metricIconBg, { backgroundColor: `${metric.color}20` }]}>
            <metric.icon size={16} color={metric.color} />
          </View>
          <View style={[styles.trendBadge, { backgroundColor: `${trendColor}15` }]}>
            <TrendIcon size={10} color={trendColor} />
            <Text style={[styles.trendText, { color: trendColor }]}>
              {metric.change > 0 ? '+' : ''}{metric.change}%
            </Text>
          </View>
        </View>
        <Text style={[styles.metricValue, { color: theme.colors.text }]}>{metric.value}</Text>
        <Text style={[styles.metricTitle, { color: theme.colors.secondaryText }]} numberOfLines={1}>{metric.title}</Text>
        {metric.sparkline && renderSparkline(metric.sparkline, metric.color)}
        <Text style={[styles.metricChange, { color: theme.colors.secondaryText }]}>{metric.changeLabel}</Text>
      </View>
    );
  };

  const renderInsightCard = (insight: InsightItem) => {
    const InsightIcon = getInsightIcon(insight.type);
    const insightColor = getInsightColor(insight.type);
    
    return (
      <TouchableOpacity 
        key={insight.id}
        style={[styles.insightCard, { backgroundColor: theme.colors.cardBackground }]}
        activeOpacity={0.7}
      >
        <View style={styles.insightHeader}>
          <View style={[styles.insightIconBg, { backgroundColor: `${insightColor}20` }]}>
            <InsightIcon size={18} color={insightColor} />
          </View>
          <View style={styles.insightBadges}>
            <View style={[styles.impactBadge, { backgroundColor: `${getImpactColor(insight.impact)}20` }]}>
              <Text style={[styles.impactText, { color: getImpactColor(insight.impact) }]}>
                {insight.impact}
              </Text>
            </View>
            {insight.actionable && (
              <View style={[styles.actionBadge, { backgroundColor: `${theme.colors.primary}20` }]}>
                <Zap size={10} color={theme.colors.primary} />
                <Text style={[styles.actionText, { color: theme.colors.primary }]}>Action</Text>
              </View>
            )}
          </View>
        </View>
        <Text style={[styles.insightTitle, { color: theme.colors.text }]}>{insight.title}</Text>
        <Text style={[styles.insightDesc, { color: theme.colors.secondaryText }]}>{insight.description}</Text>
        {insight.recommendation && (
          <View style={[styles.recommendationBox, { backgroundColor: `${insightColor}10` }]}>
            <Lightbulb size={12} color={insightColor} />
            <Text style={[styles.recommendationText, { color: theme.colors.text }]}>{insight.recommendation}</Text>
          </View>
        )}
        <View style={styles.insightFooter}>
          <Text style={[styles.insightAgent, { color: theme.colors.secondaryText }]}>{insight.agentName}</Text>
          {insight.metric && (
            <View style={[styles.metricBadge, { backgroundColor: `${insightColor}15` }]}>
              <Text style={[styles.metricBadgeText, { color: insightColor }]}>{insight.metric}</Text>
            </View>
          )}
        </View>
        <Text style={[styles.insightTimestamp, { color: theme.colors.secondaryText }]}>{insight.timestamp}</Text>
      </TouchableOpacity>
    );
  };

  const renderPerformanceBar = (data: PerformanceData) => {
    const TrendIcon = getTrendIcon(data.trend);
    
    return (
      <View key={data.agentName} style={[styles.perfCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.perfHeader}>
          <View style={[styles.perfDot, { backgroundColor: data.color }]} />
          <Text style={[styles.perfName, { color: theme.colors.text }]} numberOfLines={1}>{data.agentName}</Text>
          <TrendIcon size={14} color={data.trend === 'up' ? '#34C759' : data.trend === 'down' ? '#FF3B30' : '#8E8E93'} />
          <Text style={[styles.perfRate, { color: data.color }]}>{data.successRate}%</Text>
        </View>
        <View style={styles.perfBarBg}>
          <Animated.View 
            style={[
              styles.perfBarFill, 
              { 
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', `${data.successRate}%`]
                }), 
                backgroundColor: data.color 
              }
            ]} 
          />
        </View>
        <View style={styles.perfMeta}>
          <View style={styles.perfMetaItem}>
            <CircleCheck size={10} color={theme.colors.secondaryText} />
            <Text style={[styles.perfMetaText, { color: theme.colors.secondaryText }]}>
              {data.tasksCompleted.toLocaleString()}
            </Text>
          </View>
          <View style={styles.perfMetaItem}>
            <Clock size={10} color={theme.colors.secondaryText} />
            <Text style={[styles.perfMetaText, { color: theme.colors.secondaryText }]}>
              {data.avgResponseTime}
            </Text>
          </View>
          <View style={styles.perfMetaItem}>
            <Cpu size={10} color={theme.colors.secondaryText} />
            <Text style={[styles.perfMetaText, { color: theme.colors.secondaryText }]}>
              {data.efficiency}%
            </Text>
          </View>
          <View style={styles.perfMetaItem}>
            <DollarSign size={10} color={theme.colors.secondaryText} />
            <Text style={[styles.perfMetaText, { color: theme.colors.secondaryText }]}>
              {data.costPerTask}
            </Text>
          </View>
          <View style={styles.perfMetaItem}>
            <Star size={10} color="#FF9500" fill="#FF9500" />
            <Text style={[styles.perfMetaText, { color: theme.colors.secondaryText }]}>
              {data.satisfaction}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderTrendCard = (trend: TrendData, index: number) => {
    const isPositive = (trend.label === 'Error Rate' || trend.label === 'Cost/Task') ? trend.change < 0 : trend.change > 0;
    
    return (
      <View key={index} style={[styles.trendCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.trendLabel, { color: theme.colors.secondaryText }]}>{trend.label}</Text>
        <Text style={[styles.trendValue, { color: theme.colors.text }]}>
          {trend.label.includes('Cost') ? `$${trend.current.toFixed(2)}` : trend.current.toFixed(1)}
          {trend.label.includes('%') || trend.label.includes('Confidence') || trend.label.includes('Rate') ? '%' : ''}
        </Text>
        <View style={[styles.trendChangeBadge, { backgroundColor: isPositive ? '#34C75920' : '#FF3B3020' }]}>
          {isPositive ? (
            <ArrowUpRight size={10} color="#34C759" />
          ) : (
            <ArrowDownRight size={10} color="#FF3B30" />
          )}
          <Text style={[styles.trendChangeText, { color: isPositive ? '#34C759' : '#FF3B30' }]}>
            {Math.abs(trend.change).toFixed(1)}%
          </Text>
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
          <Text style={[styles.title, { color: theme.colors.text }]}>Agent Insights</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            Analytics & Intelligence Dashboard
          </Text>
        </View>
        <TouchableOpacity style={[styles.filterButton, { backgroundColor: theme.colors.cardBackground }]}>
          <Calendar size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.periodSelector}>
        {periods.map((period) => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodTab,
              selectedPeriod === period && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => setSelectedPeriod(period as any)}
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

      <View style={styles.viewSelector}>
        {(['overview', 'performance', 'insights'] as const).map((view) => (
          <TouchableOpacity
            key={view}
            style={[
              styles.viewTab,
              selectedView === view && { backgroundColor: theme.colors.cardBackground, borderBottomColor: theme.colors.primary, borderBottomWidth: 2 },
            ]}
            onPress={() => setSelectedView(view)}
          >
            <Text style={[
              styles.viewTabText,
              { color: selectedView === view ? theme.colors.primary : theme.colors.secondaryText }
            ]}>
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {selectedView === 'overview' && (
          <>
            <View style={[styles.scoreCard, { backgroundColor: theme.colors.cardBackground }]}>
              <View style={styles.scoreHeader}>
                <Animated.View style={[styles.scoreIconBg, { transform: [{ scale: pulseAnim }] }]}>
                  <Crown size={28} color="#FFD700" />
                </Animated.View>
                <View style={styles.scoreInfo}>
                  <Text style={[styles.scoreLabel, { color: theme.colors.secondaryText }]}>Overall AI Performance Score</Text>
                  <Text style={[styles.scoreValue, { color: theme.colors.text }]}>{overallScore}%</Text>
                </View>
                <View style={[styles.scoreBadge, { backgroundColor: '#34C75920' }]}>
                  <Text style={[styles.scoreBadgeText, { color: '#34C759' }]}>Excellent</Text>
                </View>
              </View>
              <View style={styles.scoreBarContainer}>
                <Animated.View 
                  style={[
                    styles.scoreBar, 
                    { 
                      width: progressAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', `${overallScore}%`]
                      }),
                      backgroundColor: overallScore > 90 ? '#34C759' : overallScore > 75 ? '#FF9500' : '#FF3B30'
                    }
                  ]} 
                />
              </View>
            </View>

            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Metrics</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.metricsScroll}
            >
              {metricsData.map(renderMetricCard)}
            </ScrollView>

            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Weekly Trends</Text>
            <View style={styles.trendsGrid}>
              {trendData.map(renderTrendCard)}
            </View>

            <View style={[styles.summaryCard, { backgroundColor: theme.colors.cardBackground }]}>
              <View style={styles.summaryHeader}>
                <Brain size={24} color={theme.colors.primary} />
                <Text style={[styles.summaryTitle, { color: theme.colors.text }]}>AI Summary</Text>
              </View>
              <Text style={[styles.summaryText, { color: theme.colors.secondaryText }]}>
                Your AI workforce processed 58,430 tasks this week with a 94.2% success rate. 
                Customer Experience AI showed the highest improvement (+23%), while the AI Negotiator 
                needs attention due to declining performance. Three high-impact opportunities and one 
                critical security alert require immediate action.
              </Text>
              <View style={styles.summaryStats}>
                <View style={styles.summaryStatItem}>
                  <Text style={[styles.summaryStatValue, { color: '#34C759' }]}>+12%</Text>
                  <Text style={[styles.summaryStatLabel, { color: theme.colors.secondaryText }]}>Efficiency</Text>
                </View>
                <View style={styles.summaryStatItem}>
                  <Text style={[styles.summaryStatValue, { color: '#007AFF' }]}>$142K</Text>
                  <Text style={[styles.summaryStatLabel, { color: theme.colors.secondaryText }]}>Saved</Text>
                </View>
                <View style={styles.summaryStatItem}>
                  <Text style={[styles.summaryStatValue, { color: '#FF9500' }]}>4</Text>
                  <Text style={[styles.summaryStatLabel, { color: theme.colors.secondaryText }]}>Actions</Text>
                </View>
                <View style={styles.summaryStatItem}>
                  <Text style={[styles.summaryStatValue, { color: '#FF3B30' }]}>1</Text>
                  <Text style={[styles.summaryStatLabel, { color: theme.colors.secondaryText }]}>Critical</Text>
                </View>
              </View>
            </View>
          </>
        )}

        {selectedView === 'performance' && (
          <>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Agent Performance</Text>
            <View style={styles.performanceSection}>
              {performanceData.map(renderPerformanceBar)}
            </View>
          </>
        )}

        {selectedView === 'insights' && (
          <>
            <View style={styles.insightsHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.insightFiltersScroll}>
              <View style={styles.insightFilters}>
                {insightTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.insightFilterChip,
                      selectedInsightType === type && { backgroundColor: getInsightColor(type) + '30' },
                    ]}
                    onPress={() => setSelectedInsightType(type)}
                  >
                    <Text style={[
                      styles.insightFilterText,
                      { color: selectedInsightType === type ? getInsightColor(type) : theme.colors.secondaryText }
                    ]}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            
            <View style={styles.insightsGrid}>
              {filteredInsights.map(renderInsightCard)}
            </View>
          </>
        )}
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
  filterButton: {
    padding: 10,
    borderRadius: 12,
  },
  periodSelector: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 10,
    padding: 4,
  },
  periodTab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  periodText: {
    fontSize: 12,
    fontWeight: '600',
  },
  viewSelector: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  viewTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  viewTabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    paddingBottom: 40,
  },
  scoreCard: {
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  scoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreIconBg: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#FFD70020',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  scoreInfo: {
    flex: 1,
  },
  scoreLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: '800',
  },
  scoreBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  scoreBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  scoreBarContainer: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderRadius: 4,
  },
  scoreBar: {
    height: 8,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    paddingHorizontal: 20,
    marginBottom: 12,
    marginTop: 8,
  },
  metricsScroll: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    width: 140,
    padding: 12,
    borderRadius: 14,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  metricIconBg: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 2,
  },
  trendText: {
    fontSize: 9,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  metricTitle: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 6,
  },
  sparkline: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 24,
    gap: 3,
    marginBottom: 6,
  },
  sparklineBar: {
    width: 12,
    borderRadius: 2,
  },
  metricChange: {
    fontSize: 9,
  },
  trendsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 16,
  },
  trendCard: {
    width: (width - 50) / 2,
    padding: 12,
    borderRadius: 12,
  },
  trendLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  trendValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  trendChangeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 3,
  },
  trendChangeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  performanceSection: {
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 16,
  },
  perfCard: {
    padding: 14,
    borderRadius: 12,
  },
  perfHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  perfDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  perfName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  perfRate: {
    fontSize: 16,
    fontWeight: '700',
  },
  perfBarBg: {
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderRadius: 3,
    marginBottom: 10,
  },
  perfBarFill: {
    height: 6,
    borderRadius: 3,
  },
  perfMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  perfMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  perfMetaText: {
    fontSize: 10,
  },
  insightsHeader: {
    marginBottom: 8,
  },
  insightFiltersScroll: {
    marginBottom: 12,
  },
  insightFilters: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
  },
  insightFilterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  insightFilterText: {
    fontSize: 12,
    fontWeight: '600',
  },
  insightsGrid: {
    paddingHorizontal: 20,
    gap: 10,
  },
  insightCard: {
    padding: 14,
    borderRadius: 14,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  insightIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightBadges: {
    flexDirection: 'row',
    gap: 6,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  impactText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  actionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 3,
  },
  actionText: {
    fontSize: 10,
    fontWeight: '600',
  },
  insightTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  insightDesc: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
  recommendationBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    borderRadius: 8,
    gap: 8,
    marginBottom: 10,
  },
  recommendationText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
  },
  insightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  insightAgent: {
    fontSize: 11,
  },
  metricBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  metricBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  insightTimestamp: {
    fontSize: 10,
  },
  summaryCard: {
    margin: 20,
    padding: 16,
    borderRadius: 16,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  summaryText: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.08)',
  },
  summaryStatItem: {
    alignItems: 'center',
  },
  summaryStatValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  summaryStatLabel: {
    fontSize: 10,
    marginTop: 2,
  },
});

