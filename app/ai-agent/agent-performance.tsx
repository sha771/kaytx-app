 
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
  TriangleAlert,
  Clock,
  Brain,
  Database,
  Shield,
  Crown,
  Star,
  Award,
  ChartBarBig,
  Headphones,
  Megaphone,
  Settings,
  Download,
  Share2,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Timer,
  Minus,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import { trpc } from '@/lib/trpc';

const { width } = Dimensions.get('window');

interface PerformanceMetric {
  id: string;
  agentName: string;
  agentType: 'main' | 'sub';
  parentAgent?: string;
  category: string;
  icon: React.ComponentType<any>;
  color: string;
  tasksCompleted: number;
  tasksCompletedChange: number;
  successRate: number;
  successRateChange: number;
  efficiency: number;
  efficiencyChange: number;
  avgResponseTime: string;
  responseTimeChange: number;
  tokensUsed: number;
  costPerTask: string;
  satisfaction: number;
  satisfactionChange: number;
  errorRate: number;
  peakHours: string;
  rank: number;
  trend: 'up' | 'down' | 'stable';
  weeklyData: number[];
}

interface LeaderboardEntry {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  score: number;
  change: number;
  badge: 'gold' | 'silver' | 'bronze' | null;
  highlights: string[];
}

interface CategoryPerformance {
  category: string;
  color: string;
  icon: React.ComponentType<any>;
  avgSuccess: number;
  avgEfficiency: number;
  totalTasks: number;
  topAgent: string;
}

const mockPerformanceData: PerformanceMetric[] = [
  { id: '1', agentName: 'AI Receptionist', agentType: 'sub', parentAgent: 'Customer Experience AI', category: 'customer', icon: Headphones, color: '#007AFF', tasksCompleted: 3240, tasksCompletedChange: 15, successRate: 96, successRateChange: 2.1, efficiency: 98, efficiencyChange: 1.5, avgResponseTime: '0.8s', responseTimeChange: -12, tokensUsed: 45200, costPerTask: '$0.08', satisfaction: 4.9, satisfactionChange: 0.2, errorRate: 0.4, peakHours: '9AM-11AM', rank: 1, trend: 'up', weeklyData: [92, 94, 93, 95, 96, 96, 96] },
  { id: '2', agentName: 'AI Fraud Detection', agentType: 'sub', parentAgent: 'Data & Intelligence AI', category: 'data', icon: Shield, color: '#FF2D55', tasksCompleted: 12450, tasksCompletedChange: 22, successRate: 99, successRateChange: 0.5, efficiency: 99, efficiencyChange: 0.3, avgResponseTime: '0.3s', responseTimeChange: -8, tokensUsed: 89200, costPerTask: '$0.02', satisfaction: 4.8, satisfactionChange: 0.1, errorRate: 0.05, peakHours: 'All Day', rank: 2, trend: 'up', weeklyData: [98, 98, 99, 99, 99, 99, 99] },
  { id: '3', agentName: 'AI Compliance Monitoring', agentType: 'sub', parentAgent: 'Operations & Management AI', category: 'operations', icon: Settings, color: '#5856D6', tasksCompleted: 1890, tasksCompletedChange: 8, successRate: 99, successRateChange: 0.2, efficiency: 99, efficiencyChange: 0.5, avgResponseTime: '0.5s', responseTimeChange: -5, tokensUsed: 23400, costPerTask: '$0.05', satisfaction: 4.9, satisfactionChange: 0.0, errorRate: 0.1, peakHours: '2PM-4PM', rank: 3, trend: 'stable', weeklyData: [99, 99, 99, 99, 99, 99, 99] },
  { id: '4', agentName: 'AI Strategy Advisor', agentType: 'sub', parentAgent: 'Analysis & Performance AI', category: 'analysis', icon: Brain, color: '#AF52DE', tasksCompleted: 70, tasksCompletedChange: 40, successRate: 99, successRateChange: 1.0, efficiency: 99, efficiencyChange: 2.0, avgResponseTime: '3.2s', responseTimeChange: -10, tokensUsed: 34500, costPerTask: '$2.50', satisfaction: 5.0, satisfactionChange: 0.0, errorRate: 0.0, peakHours: 'On Demand', rank: 4, trend: 'up', weeklyData: [97, 97, 98, 98, 99, 99, 99] },
  { id: '5', agentName: 'AI CMO', agentType: 'sub', parentAgent: 'Marketing & Growth AI', category: 'marketing', icon: Megaphone, color: '#FF9500', tasksCompleted: 890, tasksCompletedChange: 18, successRate: 94, successRateChange: 2.5, efficiency: 97, efficiencyChange: 1.8, avgResponseTime: '2.1s', responseTimeChange: -15, tokensUsed: 67800, costPerTask: '$0.35', satisfaction: 4.8, satisfactionChange: 0.3, errorRate: 0.8, peakHours: '10AM-12PM', rank: 5, trend: 'up', weeklyData: [90, 91, 92, 93, 93, 94, 94] },
  { id: '6', agentName: 'AI Pricing Strategist', agentType: 'sub', parentAgent: 'Sales & Revenue AI', category: 'sales', icon: TrendingUp, color: '#34C759', tasksCompleted: 180, tasksCompletedChange: 25, successRate: 93, successRateChange: 3.0, efficiency: 96, efficiencyChange: 2.5, avgResponseTime: '1.8s', responseTimeChange: -20, tokensUsed: 23400, costPerTask: '$0.45', satisfaction: 4.7, satisfactionChange: 0.4, errorRate: 1.2, peakHours: '1PM-3PM', rank: 6, trend: 'up', weeklyData: [88, 89, 90, 91, 92, 93, 93] },
  { id: '7', agentName: 'AI Workflow Automation', agentType: 'sub', parentAgent: 'Operations & Management AI', category: 'operations', icon: Settings, color: '#5856D6', tasksCompleted: 1560, tasksCompletedChange: 12, successRate: 98, successRateChange: 0.8, efficiency: 99, efficiencyChange: 0.5, avgResponseTime: '0.6s', responseTimeChange: -10, tokensUsed: 34500, costPerTask: '$0.06', satisfaction: 4.8, satisfactionChange: 0.1, errorRate: 0.2, peakHours: '8AM-10AM', rank: 7, trend: 'stable', weeklyData: [97, 97, 98, 98, 98, 98, 98] },
  { id: '8', agentName: 'AI Customer Support', agentType: 'sub', parentAgent: 'Customer Experience AI', category: 'customer', icon: Headphones, color: '#007AFF', tasksCompleted: 4520, tasksCompletedChange: 10, successRate: 93, successRateChange: 1.5, efficiency: 95, efficiencyChange: 1.2, avgResponseTime: '1.5s', responseTimeChange: -8, tokensUsed: 67800, costPerTask: '$0.12', satisfaction: 4.6, satisfactionChange: 0.2, errorRate: 1.2, peakHours: '10AM-2PM', rank: 8, trend: 'up', weeklyData: [91, 91, 92, 92, 93, 93, 93] },
  { id: '9', agentName: 'AI Negotiator', agentType: 'sub', parentAgent: 'Sales & Revenue AI', category: 'sales', icon: TrendingUp, color: '#34C759', tasksCompleted: 450, tasksCompletedChange: -5, successRate: 86, successRateChange: -2.0, efficiency: 84, efficiencyChange: -1.5, avgResponseTime: '2.5s', responseTimeChange: 5, tokensUsed: 45600, costPerTask: '$0.65', satisfaction: 4.2, satisfactionChange: -0.3, errorRate: 2.1, peakHours: '2PM-5PM', rank: 12, trend: 'down', weeklyData: [89, 88, 87, 87, 86, 86, 86] },
  { id: '10', agentName: 'AI SEO Agent', agentType: 'sub', parentAgent: 'Marketing & Growth AI', category: 'marketing', icon: Megaphone, color: '#FF9500', tasksCompleted: 670, tasksCompletedChange: 5, successRate: 88, successRateChange: 1.0, efficiency: 85, efficiencyChange: 2.0, avgResponseTime: '2.8s', responseTimeChange: -5, tokensUsed: 56700, costPerTask: '$0.28', satisfaction: 4.3, satisfactionChange: 0.1, errorRate: 1.8, peakHours: '11AM-1PM', rank: 11, trend: 'up', weeklyData: [85, 86, 86, 87, 87, 88, 88] },
];

const leaderboard: LeaderboardEntry[] = [
  { id: '1', name: 'AI Receptionist', icon: Headphones, color: '#007AFF', score: 98, change: 2, badge: 'gold', highlights: ['Fastest response', 'Highest satisfaction'] },
  { id: '2', name: 'AI Fraud Detection', icon: Shield, color: '#FF2D55', score: 97, change: 1, badge: 'silver', highlights: ['99% accuracy', 'Zero false positives'] },
  { id: '3', name: 'AI Compliance Monitoring', icon: Settings, color: '#5856D6', score: 96, change: 0, badge: 'bronze', highlights: ['Perfect record', '99.9% uptime'] },
  { id: '4', name: 'AI Strategy Advisor', icon: Brain, color: '#AF52DE', score: 95, change: 3, badge: null, highlights: ['Executive favorite'] },
  { id: '5', name: 'AI CMO', icon: Megaphone, color: '#FF9500', score: 94, change: 2, badge: null, highlights: ['Best ROI impact'] },
];

const categoryPerformance: CategoryPerformance[] = [
  { category: 'Customer', color: '#007AFF', icon: Headphones, avgSuccess: 94, avgEfficiency: 96, totalTasks: 15420, topAgent: 'AI Receptionist' },
  { category: 'Sales', color: '#34C759', icon: TrendingUp, avgSuccess: 89, avgEfficiency: 91, totalTasks: 8950, topAgent: 'AI Pricing Strategist' },
  { category: 'Marketing', color: '#FF9500', icon: Megaphone, avgSuccess: 91, avgEfficiency: 93, totalTasks: 12340, topAgent: 'AI CMO' },
  { category: 'Operations', color: '#5856D6', icon: Settings, avgSuccess: 96, avgEfficiency: 98, totalTasks: 6780, topAgent: 'AI Compliance' },
  { category: 'Data', color: '#FF2D55', icon: ChartBarBig, avgSuccess: 93, avgEfficiency: 94, totalTasks: 9450, topAgent: 'AI Fraud Detection' },
  { category: 'Analysis', color: '#AF52DE', icon: Brain, avgSuccess: 95, avgEfficiency: 97, totalTasks: 7890, topAgent: 'AI Strategy Advisor' },
];

export default function AgentPerformanceScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  
  // Fetch real aggregate performance data from tRPC
  const { data: statsData } = trpc.aiAgents.getStats.useQuery({ category: 'all' });
  trpc.aiAgents.getActivity.useQuery({ limit: 50 });

  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month' | 'quarter'>('week');
  const [selectedView, setSelectedView] = useState<'leaderboard' | 'detailed' | 'categories'>('leaderboard');
  const [sortBy, setSortBy] = useState<'rank' | 'success' | 'efficiency' | 'tasks'>('rank');
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

  const sortedData = useMemo(() => {
    const data = [...mockPerformanceData];
    switch (sortBy) {
      case 'success':
        return data.sort((a, b) => b.successRate - a.successRate);
      case 'efficiency':
        return data.sort((a, b) => b.efficiency - a.efficiency);
      case 'tasks':
        return data.sort((a, b) => b.tasksCompleted - a.tasksCompleted);
      default:
        return data.sort((a, b) => a.rank - b.rank);
    }
  }, [sortBy]);

  const overallStats = useMemo(() => {
    const avgSuccess = Math.round(mockPerformanceData.reduce((acc, d) => acc + d.successRate, 0) / mockPerformanceData.length * 10) / 10;
    const avgEfficiency = Math.round(mockPerformanceData.reduce((acc, d) => acc + d.efficiency, 0) / mockPerformanceData.length * 10) / 10;
    const totalTasks = mockPerformanceData.reduce((acc, d) => acc + d.tasksCompleted, 0);
    const avgSatisfaction = Math.round(mockPerformanceData.reduce((acc, d) => acc + d.satisfaction, 0) / mockPerformanceData.length * 10) / 10;
    const totalTokens = mockPerformanceData.reduce((acc, d) => acc + d.tokensUsed, 0);
    const improving = mockPerformanceData.filter(d => d.trend === 'up').length;
    const declining = mockPerformanceData.filter(d => d.trend === 'down').length;
    return { avgSuccess, avgEfficiency, totalTasks, avgSatisfaction, totalTokens, improving, declining };
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return Minus;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return '#34C759';
      case 'down': return '#FF3B30';
      default: return '#8E8E93';
    }
  };

  const getBadgeColor = (badge: string | null) => {
    switch (badge) {
      case 'gold': return '#FFD700';
      case 'silver': return '#C0C0C0';
      case 'bronze': return '#CD7F32';
      default: return 'transparent';
    }
  };

  const renderSparkline = (data: number[], color: string) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    return (
      <View style={styles.sparkline}>
        {data.map((value, index) => {
          const height = ((value - min) / range) * 24 + 4;
          return (
            <View
              key={index}
              style={[
                styles.sparklineBar,
                { height, backgroundColor: index === data.length - 1 ? color : `${color}50` }
              ]}
            />
          );
        })}
      </View>
    );
  };

  const renderOverviewCard = () => (
    <View style={[styles.overviewCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.overviewHeader}>
        <View style={styles.overviewIconBg}>
          <Award size={28} color="#FFD700" />
        </View>
        <View style={styles.overviewInfo}>
          <Text style={[styles.overviewLabel, { color: theme.colors.secondaryText }]}>Global AI Efficiency Score</Text>
          <Text style={[styles.overviewScore, { color: theme.colors.text }]}>
            {statsData?.avgSuccessRate ?? 94.8}%
          </Text>
        </View>
        <View style={styles.trendIndicators}>
          <View style={[styles.trendItem, { backgroundColor: '#34C75915' }]}>
            <TrendingUp size={14} color="#34C759" />
            <Text style={[styles.trendValue, { color: '#34C759' }]}>{'+2.4%'}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.overviewStats}>
        <View style={styles.overviewStat}>
          <Text style={[styles.overviewStatValue, { color: theme.colors.text }]}>
            {statsData?.totalTasks ? (statsData.totalTasks / 1000).toFixed(1) + 'K' : '45.2K'}
          </Text>
          <Text style={[styles.overviewStatLabel, { color: theme.colors.secondaryText }]}>Tasks Done</Text>
        </View>
        <View style={styles.overviewStatDivider} />
        <View style={styles.overviewStat}>
          <Text style={[styles.overviewStatValue, { color: theme.colors.text }]}>
            {statsData?.avgHealthScore ?? 91}%
          </Text>
          <Text style={[styles.overviewStatLabel, { color: theme.colors.secondaryText }]}>Health</Text>
        </View>
        <View style={styles.overviewStatDivider} />
        <View style={styles.overviewStat}>
          <Text style={[styles.overviewStatValue, { color: theme.colors.text }]}>
            {statsData?.activeConnections ?? 21}
          </Text>
          <Text style={[styles.overviewStatLabel, { color: theme.colors.secondaryText }]}>Active</Text>
        </View>
        <View style={styles.overviewStatDivider} />
        <View style={styles.overviewStat}>
          <Text style={[styles.overviewStatValue, { color: '#AF52DE' }]}>{overallStats.avgSatisfaction}</Text>
          <Text style={[styles.overviewStatLabel, { color: theme.colors.secondaryText }]}>Rating</Text>
        </View>
      </View>
    </View>
  );

  const renderLeaderboardEntry = (entry: LeaderboardEntry, index: number) => (
    <TouchableOpacity 
      key={entry.id}
      style={[styles.leaderboardItem, { backgroundColor: theme.colors.cardBackground }]}
      activeOpacity={0.7}
    >
      <View style={[styles.rankBadge, { backgroundColor: entry.badge ? `${getBadgeColor(entry.badge)}30` : 'rgba(0,0,0,0.05)' }]}>
        {entry.badge ? (
          <Crown size={16} color={getBadgeColor(entry.badge)} />
        ) : (
          <Text style={[styles.rankText, { color: theme.colors.secondaryText }]}>{index + 1}</Text>
        )}
      </View>
      <View style={[styles.leaderIconBg, { backgroundColor: `${entry.color}20` }]}>
        <entry.icon size={18} color={entry.color} />
      </View>
      <View style={styles.leaderInfo}>
        <Text style={[styles.leaderName, { color: theme.colors.text }]}>{entry.name}</Text>
        <View style={styles.highlightsRow}>
          {entry.highlights.slice(0, 2).map((h, i) => (
            <View key={i} style={[styles.highlightBadge, { backgroundColor: `${entry.color}15` }]}>
              <Text style={[styles.highlightText, { color: entry.color }]}>{h}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.leaderScore}>
        <Text style={[styles.scoreValue, { color: entry.color }]}>{entry.score}</Text>
        <View style={[styles.changeIndicator, { backgroundColor: entry.change >= 0 ? '#34C75920' : '#FF3B3020' }]}>
          {entry.change >= 0 ? (
            <ArrowUpRight size={10} color="#34C759" />
          ) : (
            <ArrowDownRight size={10} color="#FF3B30" />
          )}
          <Text style={[styles.changeText, { color: entry.change >= 0 ? '#34C759' : '#FF3B30' }]}>
            {Math.abs(entry.change)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderDetailedCard = (data: PerformanceMetric) => {
    const TrendIcon = getTrendIcon(data.trend);
    const trendColor = getTrendColor(data.trend);
    const isExpanded = expandedAgent === data.id;

    return (
      <TouchableOpacity
        key={data.id}
        style={[styles.detailedCard, { backgroundColor: theme.colors.cardBackground }]}
        onPress={() => setExpandedAgent(isExpanded ? null : data.id)}
        activeOpacity={0.7}
      >
        <View style={styles.detailedHeader}>
          <View style={[styles.rankCircle, { backgroundColor: data.rank <= 3 ? '#FFD70030' : 'rgba(0,0,0,0.05)' }]}>
            <Text style={[styles.rankCircleText, { color: data.rank <= 3 ? '#FFD700' : theme.colors.secondaryText }]}>
              #{data.rank}
            </Text>
          </View>
          <View style={[styles.detailedIconBg, { backgroundColor: `${data.color}20` }]}>
            <data.icon size={18} color={data.color} />
          </View>
          <View style={styles.detailedInfo}>
            <Text style={[styles.detailedName, { color: theme.colors.text }]} numberOfLines={1}>{data.agentName}</Text>
            <Text style={[styles.detailedParent, { color: theme.colors.secondaryText }]}>{data.parentAgent}</Text>
          </View>
          <View style={[styles.trendBadge, { backgroundColor: `${trendColor}20` }]}>
            <TrendIcon size={12} color={trendColor} />
          </View>
        </View>

        <View style={styles.detailedMetrics}>
          <View style={styles.detailedMetricItem}>
            <Text style={[styles.detailedMetricValue, { color: theme.colors.text }]}>{data.successRate}%</Text>
            <Text style={[styles.detailedMetricChange, { color: data.successRateChange >= 0 ? '#34C759' : '#FF3B30' }]}>
              {data.successRateChange >= 0 ? '+' : ''}{data.successRateChange}%
            </Text>
            <Text style={[styles.detailedMetricLabel, { color: theme.colors.secondaryText }]}>Success</Text>
          </View>
          <View style={styles.detailedMetricItem}>
            <Text style={[styles.detailedMetricValue, { color: theme.colors.text }]}>{data.efficiency}%</Text>
            <Text style={[styles.detailedMetricChange, { color: data.efficiencyChange >= 0 ? '#34C759' : '#FF3B30' }]}>
              {data.efficiencyChange >= 0 ? '+' : ''}{data.efficiencyChange}%
            </Text>
            <Text style={[styles.detailedMetricLabel, { color: theme.colors.secondaryText }]}>Efficiency</Text>
          </View>
          <View style={styles.detailedMetricItem}>
            <Text style={[styles.detailedMetricValue, { color: theme.colors.text }]}>{data.tasksCompleted.toLocaleString()}</Text>
            <Text style={[styles.detailedMetricChange, { color: data.tasksCompletedChange >= 0 ? '#34C759' : '#FF3B30' }]}>
              {data.tasksCompletedChange >= 0 ? '+' : ''}{data.tasksCompletedChange}%
            </Text>
            <Text style={[styles.detailedMetricLabel, { color: theme.colors.secondaryText }]}>Tasks</Text>
          </View>
          <View style={styles.detailedMetricItem}>
            <Text style={[styles.detailedMetricValue, { color: theme.colors.text }]}>{data.satisfaction}</Text>
            <Text style={[styles.detailedMetricChange, { color: data.satisfactionChange >= 0 ? '#34C759' : '#FF3B30' }]}>
              {data.satisfactionChange >= 0 ? '+' : ''}{data.satisfactionChange}
            </Text>
            <Text style={[styles.detailedMetricLabel, { color: theme.colors.secondaryText }]}>Rating</Text>
          </View>
        </View>

        {renderSparkline(data.weeklyData, data.color)}

        {isExpanded && (
          <View style={[styles.expandedSection, { borderTopColor: theme.colors.border }]}>
            <View style={styles.expandedRow}>
              <View style={styles.expandedItem}>
                <Clock size={12} color={theme.colors.secondaryText} />
                <Text style={[styles.expandedLabel, { color: theme.colors.secondaryText }]}>Response</Text>
                <Text style={[styles.expandedValue, { color: theme.colors.text }]}>{data.avgResponseTime}</Text>
              </View>
              <View style={styles.expandedItem}>
                <TriangleAlert size={12} color={data.errorRate > 1.5 ? '#FF3B30' : theme.colors.secondaryText} />
                <Text style={[styles.expandedLabel, { color: theme.colors.secondaryText }]}>Error Rate</Text>
                <Text style={[styles.expandedValue, { color: data.errorRate > 1.5 ? '#FF3B30' : theme.colors.text }]}>{data.errorRate}%</Text>
              </View>
              <View style={styles.expandedItem}>
                <DollarSign size={12} color={theme.colors.secondaryText} />
                <Text style={[styles.expandedLabel, { color: theme.colors.secondaryText }]}>Cost/Task</Text>
                <Text style={[styles.expandedValue, { color: theme.colors.text }]}>{data.costPerTask}</Text>
              </View>
              <View style={styles.expandedItem}>
                <Timer size={12} color={theme.colors.secondaryText} />
                <Text style={[styles.expandedLabel, { color: theme.colors.secondaryText }]}>Peak Hours</Text>
                <Text style={[styles.expandedValue, { color: theme.colors.text }]}>{data.peakHours}</Text>
              </View>
            </View>
            <View style={styles.tokensRow}>
              <Database size={12} color={theme.colors.secondaryText} />
              <Text style={[styles.tokensText, { color: theme.colors.secondaryText }]}>
                {(data.tokensUsed / 1000).toFixed(1)}K tokens used this period
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderCategoryCard = (cat: CategoryPerformance) => (
    <View key={cat.category} style={[styles.categoryCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.categoryHeader}>
        <View style={[styles.categoryIconBg, { backgroundColor: `${cat.color}20` }]}>
          <cat.icon size={18} color={cat.color} />
        </View>
        <Text style={[styles.categoryName, { color: theme.colors.text }]}>{cat.category}</Text>
      </View>
      <View style={styles.categoryMetrics}>
        <View style={styles.categoryMetricItem}>
          <Text style={[styles.categoryMetricValue, { color: cat.color }]}>{cat.avgSuccess}%</Text>
          <Text style={[styles.categoryMetricLabel, { color: theme.colors.secondaryText }]}>Success</Text>
        </View>
        <View style={styles.categoryMetricItem}>
          <Text style={[styles.categoryMetricValue, { color: cat.color }]}>{cat.avgEfficiency}%</Text>
          <Text style={[styles.categoryMetricLabel, { color: theme.colors.secondaryText }]}>Efficiency</Text>
        </View>
        <View style={styles.categoryMetricItem}>
          <Text style={[styles.categoryMetricValue, { color: cat.color }]}>{(cat.totalTasks / 1000).toFixed(1)}K</Text>
          <Text style={[styles.categoryMetricLabel, { color: theme.colors.secondaryText }]}>Tasks</Text>
        </View>
      </View>
      <View style={styles.categoryProgressBg}>
        <Animated.View 
          style={[
            styles.categoryProgressFill, 
            { 
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', `${cat.avgSuccess}%`]
              }), 
              backgroundColor: cat.color 
            }
          ]} 
        />
      </View>
      <View style={styles.topAgentRow}>
        <Star size={12} color="#FFD700" />
        <Text style={[styles.topAgentText, { color: theme.colors.secondaryText }]}>Top: {cat.topAgent}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Agent Performance</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            Rankings & Analytics
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
        {(['day', 'week', 'month', 'quarter'] as const).map((period) => (
          <TouchableOpacity
            key={period}
            style={[styles.periodTab, selectedPeriod === period && { backgroundColor: theme.colors.primary }]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text style={[styles.periodText, { color: selectedPeriod === period ? '#fff' : theme.colors.secondaryText }]}>
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.viewSelector}>
        {(['leaderboard', 'detailed', 'categories'] as const).map((view) => (
          <TouchableOpacity
            key={view}
            style={[styles.viewTab, selectedView === view && { borderBottomColor: theme.colors.primary, borderBottomWidth: 2 }]}
            onPress={() => setSelectedView(view)}
          >
            <Text style={[styles.viewTabText, { color: selectedView === view ? theme.colors.primary : theme.colors.secondaryText }]}>
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {renderOverviewCard()}

        {selectedView === 'leaderboard' && (
          <>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Top Performers</Text>
            {leaderboard.map((entry, index) => renderLeaderboardEntry(entry, index))}
          </>
        )}

        {selectedView === 'detailed' && (
          <>
            <View style={styles.sortRow}>
              <Text style={[styles.sortLabel, { color: theme.colors.secondaryText }]}>Sort by:</Text>
              {(['rank', 'success', 'efficiency', 'tasks'] as const).map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[styles.sortOption, sortBy === option && { backgroundColor: theme.colors.primary }]}
                  onPress={() => setSortBy(option)}
                >
                  <Text style={[styles.sortOptionText, { color: sortBy === option ? '#fff' : theme.colors.secondaryText }]}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {sortedData.map(renderDetailedCard)}
          </>
        )}

        {selectedView === 'categories' && (
          <>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Category Performance</Text>
            <View style={styles.categoriesGrid}>
              {categoryPerformance.map(renderCategoryCard)}
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
    marginBottom: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 12,
    padding: 4,
  },
  periodTab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
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
    fontSize: 13,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  overviewCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  overviewIconBg: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#FFD70020',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  overviewInfo: {
    flex: 1,
  },
  overviewLabel: {
    fontSize: 11,
    marginBottom: 2,
  },
  overviewScore: {
    fontSize: 32,
    fontWeight: '800',
  },
  trendIndicators: {
    gap: 6,
  },
  trendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  trendValue: {
    fontSize: 12,
    fontWeight: '700',
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overviewStat: {
    alignItems: 'center',
    flex: 1,
  },
  overviewStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  overviewStatValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  overviewStatLabel: {
    fontSize: 10,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 8,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    marginBottom: 10,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  rankText: {
    fontSize: 14,
    fontWeight: '700',
  },
  leaderIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  leaderInfo: {
    flex: 1,
  },
  leaderName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  highlightsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  highlightBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  highlightText: {
    fontSize: 9,
    fontWeight: '600',
  },
  leaderScore: {
    alignItems: 'flex-end',
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  changeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 2,
    marginTop: 2,
  },
  changeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sortLabel: {
    fontSize: 12,
  },
  sortOption: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  sortOptionText: {
    fontSize: 11,
    fontWeight: '600',
  },
  detailedCard: {
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },
  detailedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rankCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  rankCircleText: {
    fontSize: 11,
    fontWeight: '700',
  },
  detailedIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  detailedInfo: {
    flex: 1,
  },
  detailedName: {
    fontSize: 14,
    fontWeight: '600',
  },
  detailedParent: {
    fontSize: 11,
    marginTop: 2,
  },
  trendBadge: {
    padding: 6,
    borderRadius: 8,
  },
  detailedMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailedMetricItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailedMetricValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  detailedMetricChange: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 1,
  },
  detailedMetricLabel: {
    fontSize: 9,
    marginTop: 2,
  },
  sparkline: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 28,
    gap: 4,
    justifyContent: 'center',
  },
  sparklineBar: {
    width: 16,
    borderRadius: 2,
  },
  expandedSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  expandedRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  expandedItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.03)',
    padding: 8,
    borderRadius: 8,
    gap: 4,
    flexWrap: 'wrap',
  },
  expandedLabel: {
    fontSize: 9,
    flex: 1,
  },
  expandedValue: {
    fontSize: 11,
    fontWeight: '600',
  },
  tokensRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tokensText: {
    fontSize: 11,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryCard: {
    width: (width - 50) / 2,
    padding: 12,
    borderRadius: 14,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  categoryIconBg: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
  },
  categoryMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryMetricItem: {
    alignItems: 'center',
  },
  categoryMetricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  categoryMetricLabel: {
    fontSize: 9,
    marginTop: 1,
  },
  categoryProgressBg: {
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderRadius: 2,
    marginBottom: 8,
  },
  categoryProgressFill: {
    height: 4,
    borderRadius: 2,
  },
  topAgentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  topAgentText: {
    fontSize: 10,
  },
});
