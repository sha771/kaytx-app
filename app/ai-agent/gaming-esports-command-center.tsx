/**
 * =============================================================================
 * GAMING & ESPORTS AI COMMAND CENTER
 * =============================================================================
 *
 * A futuristic enterprise-grade Gaming & Esports AI Operating System that manages
 * autonomous AI agents responsible for player intelligence, esports operations,
 * game analytics, live events, tournaments, monetization, community management,
 * anti-cheat systems, content creation, sponsorship performance, audience engagement,
 * and revenue optimization.
 *
 * @version 1.0.0
 * @lastUpdated 2026-06-25
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import {
  ChevronLeft,
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  Shield,
  Brain,
  Zap,
  Globe,
  Gamepad2,
  Trophy,
  MessageSquare,
  ShoppingBag,
  Lock,
  Video,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  BarChart3,
  PieChart,
  LineChart,
  Map,
  Server,
  Cpu,
  Target,
  Flame,
  Award,
  Clock,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Eye,
  Heart,
  Star,
  Crown,
  Swords,
  Radio,
  Monitor,
  Wifi,
  Database,
  Settings,
  ChevronRight,
  LayoutDashboard,
  User,
  Gamepad,
  ChartBarBig,
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import Svg, { Path, Circle, Defs, LinearGradient, Stop, Line, Rect } from 'react-native-svg';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Theme Colors
const THEME = {
  background: '#03050A',
  card: '#0A0F1E',
  cardLight: '#121829',
  neonCyan: '#00F0FF',
  electricPurple: '#8B5CF6',
  neonGreen: '#10B981',
  amber: '#F59E0B',
  red: '#EF4444',
  magenta: '#EC4899',
  text: '#E2E8F0',
  textMuted: '#94A3B8',
  border: '#1E293B',
};

// Executive KPI Data
const EXECUTIVE_KPIS = {
  players: {
    monthlyActive: { value: '120M', change: 12.5, trend: 'up' },
    dailyActive: { value: '45M', change: 8.3, trend: 'up' },
    concurrent: { value: '8.5M', change: 15.2, trend: 'up' },
    retention: { value: '82%', change: 3.1, trend: 'up' },
    sessionDuration: { value: '4.2h', change: -2.4, trend: 'down' },
  },
  revenue: {
    total: { value: '$5.4B', change: 18.7, trend: 'up' },
    inGamePurchases: { value: '$2.8B', change: 22.3, trend: 'up' },
    battlePass: { value: '$1.2B', change: 15.8, trend: 'up' },
    marketplace: { value: '$890M', change: 31.2, trend: 'up' },
    sponsorship: { value: '$510M', change: 45.6, trend: 'up' },
  },
  esports: {
    activeTournaments: { value: '234', change: 28.5, trend: 'up' },
    liveViewers: { value: '210M', change: 52.3, trend: 'up' },
    prizePool: { value: '$45M', change: 67.8, trend: 'up' },
    teamParticipation: { value: '1,847', change: 19.4, trend: 'up' },
    matchCompletion: { value: '94%', change: 2.1, trend: 'up' },
  },
  community: {
    discordMembers: { value: '8.5M', change: 35.7, trend: 'up' },
    socialEngagement: { value: '450M', change: 42.1, trend: 'up' },
    communityGrowth: { value: '28%', change: 12.3, trend: 'up' },
    creatorActivity: { value: '12,450', change: 28.9, trend: 'up' },
    sentiment: { value: '87%', change: 5.4, trend: 'up' },
  },
  ai: {
    moderationActions: { value: '2.4M', change: 156.7, trend: 'up' },
    fraudPrevention: { value: '847K', change: 89.3, trend: 'up' },
    matchPredictions: { value: '94%', change: 8.2, trend: 'up' },
    engagementOptimization: { value: '+$420M', change: 67.5, trend: 'up' },
    revenueImpact: { value: '$420M', change: 67.5, trend: 'up' },
  },
};

// AI Gaming Agents
const AI_GAMING_AGENTS = [
  {
    id: 'phoenix',
    name: 'Agent Phoenix',
    role: 'Player Intelligence Agent',
    color: THEME.neonCyan,
    icon: Users,
    responsibilities: [
      'Player behavior analysis',
      'Retention optimization',
      'Churn prediction',
      'Segmentation',
    ],
    metrics: {
      playersAnalyzed: '45M',
      retentionImprovement: '+18%',
      churnReduction: '-23%',
    },
    status: 'active',
    efficiency: 94,
  },
  {
    id: 'titan',
    name: 'Agent Titan',
    role: 'Live Operations Agent',
    color: THEME.electricPurple,
    icon: Radio,
    responsibilities: [
      'Event management',
      'Game updates',
      'Seasonal operations',
      'Live balancing',
    ],
    metrics: {
      eventsManaged: '1,247',
      uptimeSuccess: '99.7%',
      engagementLift: '+32%',
    },
    status: 'active',
    efficiency: 91,
  },
  {
    id: 'spectre',
    name: 'Agent Spectre',
    role: 'Anti-Cheat Agent',
    color: THEME.red,
    icon: Shield,
    responsibilities: [
      'Cheat detection',
      'Fraud prevention',
      'Security monitoring',
      'Toxicity detection',
    ],
    metrics: {
      threatsBlocked: '847K',
      accuracyRate: '98.2%',
      accountsProtected: '12.4M',
    },
    status: 'active',
    efficiency: 97,
  },
  {
    id: 'arena',
    name: 'Agent Arena',
    role: 'Esports Operations Agent',
    color: THEME.amber,
    icon: Trophy,
    responsibilities: [
      'Tournament management',
      'Match scheduling',
      'Team coordination',
      'Competitive analytics',
    ],
    metrics: {
      tournamentsManaged: '234',
      matchesProcessed: '45,892',
      viewerGrowth: '+67%',
    },
    status: 'active',
    efficiency: 89,
  },
  {
    id: 'nexus',
    name: 'Agent Nexus',
    role: 'Monetization Agent',
    color: THEME.neonGreen,
    icon: DollarSign,
    responsibilities: [
      'Store optimization',
      'Offer recommendations',
      'Pricing intelligence',
      'Revenue forecasting',
    ],
    metrics: {
      revenueInfluenced: '$420M',
      purchaseConversion: '+28%',
      offerPerformance: '+45%',
    },
    status: 'active',
    efficiency: 92,
  },
];

// AI Insights
const AI_INSIGHTS = [
  {
    id: 1,
    type: 'warning',
    title: 'Player Retention Alert',
    message: 'Player retention for new users dropped 8% after recent update.',
    impact: 'High',
    action: 'Rollback update or implement retention campaign',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    type: 'opportunity',
    title: 'Battle Pass Conversion',
    message: 'Battle Pass conversion opportunity identified worth $12M.',
    impact: 'High',
    action: 'Launch targeted promotion campaign',
    timestamp: '4 hours ago',
  },
  {
    id: 3,
    type: 'prediction',
    title: 'Esports Finals Projection',
    message: 'Esports finals projected to exceed 18M concurrent viewers.',
    impact: 'Medium',
    action: 'Prepare infrastructure scaling',
    timestamp: '6 hours ago',
  },
  {
    id: 4,
    type: 'security',
    title: 'Suspicious Activity',
    message: 'Suspicious activity detected in ranked matchmaking.',
    impact: 'Critical',
    action: 'Immediate investigation required',
    timestamp: '8 hours ago',
  },
  {
    id: 5,
    type: 'positive',
    title: 'Community Sentiment',
    message: 'Community sentiment improved 15% following latest event.',
    impact: 'Medium',
    action: 'Continue event strategy',
    timestamp: '12 hours ago',
  },
];

// Real-Time Activity Feed
const ACTIVITY_FEED = [
  { id: 1, type: 'match', message: 'Championship finals match started', time: '2 min ago', icon: Swords },
  { id: 2, type: 'tournament', message: 'New tournament launched: Summer Championship', time: '5 min ago', icon: Trophy },
  { id: 3, type: 'player', message: 'Player milestone: 100M accounts reached', time: '8 min ago', icon: Crown },
  { id: 4, type: 'purchase', message: 'Record purchase: Legendary bundle sold', time: '12 min ago', icon: ShoppingBag },
  { id: 5, type: 'security', message: 'Security threat blocked: DDoS attempt', time: '15 min ago', icon: Shield },
  { id: 6, type: 'creator', message: 'Top creator went live with 500K viewers', time: '18 min ago', icon: Video },
  { id: 7, type: 'event', message: 'Event challenge completed: 1M participants', time: '22 min ago', icon: Target },
  { id: 8, type: 'viewership', message: 'Record viewership: 25M concurrent', time: '25 min ago', icon: Eye },
];

// Navigation Items
const NAVIGATION_ITEMS = [
  { id: 'executive', label: 'Executive Dashboard', icon: LayoutDashboard, route: '/ai-agent/gaming-esports-command-center' },
  { id: 'agents', label: 'AI Gaming Agents', icon: Brain, route: '/ai-agent/gaming-esports' },
  { id: 'players', label: 'Player Intelligence', icon: Users, route: '/ai-agent/gaming-esports/player-development-coach' },
  { id: 'analytics', label: 'Game Analytics', icon: BarChart3, route: '/ai-agent/gaming-esports/analytics-director' },
  { id: 'live', label: 'Live Operations', icon: Radio, route: '/ai-agent/gaming-esports/live-operations-director' },
  { id: 'esports', label: 'Esports Center', icon: Trophy, route: '/ai-agent/gaming-esports/esports-director' },
  { id: 'tournament', label: 'Tournament Management', icon: Swords, route: '/ai-agent/gaming-esports/tournament-organizer' },
  { id: 'community', label: 'Community Hub', icon: MessageSquare, route: '/ai-agent/gaming-esports/community-manager' },
  { id: 'monetization', label: 'Monetization', icon: DollarSign, route: '/ai-agent/gaming-esports/monetization-designer' },
  { id: 'security', label: 'Anti-Cheat & Security', icon: Shield, route: '/ai-agent/gaming-esports/anti-cheat-specialist' },
  { id: 'creators', label: 'Content & Creators', icon: Video, route: '/ai-agent/gaming-esports/stream-manager' },
  { id: 'settings', label: 'Settings', icon: Settings, route: '/ai-agent/settings' },
];

export default function GamingEsportsCommandCenter() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [selectedNav, setSelectedNav] = useState('executive');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderTrendIndicator = (change: number, trend: string) => {
    if (trend === 'up') {
      return (
        <View style={styles.trendUp}>
          <ArrowUpRight size={12} color={THEME.neonGreen} />
          <Text style={[styles.trendText, { color: THEME.neonGreen }]}>{change}%</Text>
        </View>
      );
    } else if (trend === 'down') {
      return (
        <View style={styles.trendDown}>
          <ArrowDownRight size={12} color={THEME.red} />
          <Text style={[styles.trendText, { color: THEME.red }]}>{change}%</Text>
        </View>
      );
    }
    return (
      <View style={styles.trendNeutral}>
        <Minus size={12} color={THEME.textMuted} />
        <Text style={[styles.trendText, { color: THEME.textMuted }]}>{change}%</Text>
      </View>
    );
  };

  const renderKPICard = (title: string, value: string, change: number, trend: string, color: string) => (
    <BlurView intensity={20} tint="dark" style={styles.kpiCard}>
      <View style={styles.kpiHeader}>
        <Text style={styles.kpiTitle}>{title}</Text>
        {renderTrendIndicator(change, trend)}
      </View>
      <Text style={[styles.kpiValue, { color }]}>{value}</Text>
    </BlurView>
  );

  const renderAgentCard = (agent: typeof AI_GAMING_AGENTS[0]) => {
    const Icon = agent.icon;
    return (
      <Animated.View entering={FadeInUp.delay(agent.id.length * 50).springify()} style={styles.agentCard}>
        <BlurView intensity={30} tint="dark" style={styles.agentCardBlur}>
          <View style={styles.agentHeader}>
            <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}>
              <Icon size={24} color={agent.color} />
            </View>
            <View style={styles.agentInfo}>
              <Text style={styles.agentName}>{agent.name}</Text>
              <Text style={styles.agentRole}>{agent.role}</Text>
            </View>
            <View style={[styles.agentStatus, { backgroundColor: agent.color + '30' }]}>
              <View style={[styles.agentStatusDot, { backgroundColor: agent.color }]} />
              <Text style={[styles.agentStatusText, { color: agent.color }]}>{agent.status}</Text>
            </View>
          </View>

          <View style={styles.agentResponsibilities}>
            <Text style={styles.sectionLabel}>Responsibilities</Text>
            {agent.responsibilities.map((resp, idx) => (
              <View key={idx} style={styles.responsibilityItem}>
                <CheckCircle size={14} color={THEME.neonGreen} />
                <Text style={styles.responsibilityText}>{resp}</Text>
              </View>
            ))}
          </View>

          <View style={styles.agentMetrics}>
            {Object.entries(agent.metrics).map(([key, value]) => (
              <View key={key} style={styles.metricItem}>
                <Text style={styles.metricLabel}>{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
                <Text style={[styles.metricValue, { color: agent.color }]}>{value}</Text>
              </View>
            ))}
          </View>

          <View style={styles.agentEfficiency}>
            <Text style={styles.efficiencyLabel}>Efficiency Score</Text>
            <View style={styles.efficiencyBar}>
              <View style={[styles.efficiencyFill, { width: `${agent.efficiency}%`, backgroundColor: agent.color }]} />
            </View>
            <Text style={[styles.efficiencyValue, { color: agent.color }]}>{agent.efficiency}%</Text>
          </View>
        </BlurView>
      </Animated.View>
    );
  };

  const renderInsightCard = (insight: typeof AI_INSIGHTS[0]) => {
    const colors = {
      warning: THEME.amber,
      opportunity: THEME.neonGreen,
      prediction: THEME.electricPurple,
      security: THEME.red,
      positive: THEME.neonCyan,
    };
    const icons = {
      warning: AlertTriangle,
      opportunity: Target,
      prediction: Sparkles,
      security: Shield,
      positive: CheckCircle,
    };
    const Icon = icons[insight.type as keyof typeof icons];
    const color = colors[insight.type as keyof typeof colors];

    return (
      <Animated.View entering={FadeInUp.delay(insight.id * 100).springify()} style={styles.insightCard}>
        <BlurView intensity={20} tint="dark" style={styles.insightCardBlur}>
          <View style={styles.insightHeader}>
            <View style={[styles.insightIcon, { backgroundColor: color + '20' }]}>
              <Icon size={20} color={color} />
            </View>
            <View style={styles.insightMeta}>
              <Text style={styles.insightTitle}>{insight.title}</Text>
              <Text style={styles.insightTime}>{insight.timestamp}</Text>
            </View>
            <View style={[styles.insightImpact, { backgroundColor: color + '30' }]}>
              <Text style={[styles.insightImpactText, { color }]}>{insight.impact}</Text>
            </View>
          </View>
          <Text style={styles.insightMessage}>{insight.message}</Text>
          <View style={styles.insightAction}>
            <Text style={styles.insightActionLabel}>Suggested Action:</Text>
            <Text style={styles.insightActionText}>{insight.action}</Text>
          </View>
        </BlurView>
      </Animated.View>
    );
  };

  const renderActivityItem = (activity: typeof ACTIVITY_FEED[0]) => {
    const Icon = activity.icon;
    const colors = {
      match: THEME.neonCyan,
      tournament: THEME.amber,
      player: THEME.electricPurple,
      purchase: THEME.neonGreen,
      security: THEME.red,
      creator: THEME.magenta,
      event: THEME.neonCyan,
      viewership: THEME.electricPurple,
    };

    return (
      <View style={styles.activityItem}>
        <View style={[styles.activityIcon, { backgroundColor: colors[activity.type as keyof typeof colors] + '20' }]}>
          <Icon size={16} color={colors[activity.type as keyof typeof colors]} />
        </View>
        <Text style={styles.activityMessage}>{activity.message}</Text>
        <Text style={styles.activityTime}>{activity.time}</Text>
      </View>
    );
  };

  const renderSparkline = (data: number[], color: string) => {
    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);
    const range = maxVal - minVal || 1;
    const chartWidth = 100;
    const chartHeight = 40;

    const points = data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * chartWidth;
      const y = chartHeight - ((val - minVal) / range) * chartHeight;
      return `${x},${y}`;
    }).join(' ');

    return (
      <Svg width={chartWidth} height={chartHeight}>
        <Defs>
          <LinearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={color} stopOpacity="0.3" />
            <Stop offset="1" stopColor={color} stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Path
          d={`M 0,${chartHeight} L ${points} L ${chartWidth},${chartHeight} Z`}
          fill={`url(#gradient-${color})`}
        />
        <Path
          d={`M ${points}`}
          stroke={color}
          strokeWidth={2}
          fill="none"
        />
      </Svg>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: THEME.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={THEME.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerTitle}>
            <Gamepad2 size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Gaming & Esports AI Command Center</Text>
          </View>
          <View style={styles.headerMeta}>
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
            <Text style={styles.timeText}>{currentTime}</Text>
          </View>
        </View>
      </View>

      {/* Executive KPI Bar */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll}>
        <View style={styles.kpiContainer}>
          {/* Player KPIs */}
          <View style={styles.kpiSection}>
            <Text style={styles.kpiSectionTitle}>Player KPIs</Text>
            <View style={styles.kpiRow}>
              {renderKPICard('Monthly Active', EXECUTIVE_KPIS.players.monthlyActive.value, EXECUTIVE_KPIS.players.monthlyActive.change, EXECUTIVE_KPIS.players.monthlyActive.trend, THEME.neonCyan)}
              {renderKPICard('Daily Active', EXECUTIVE_KPIS.players.dailyActive.value, EXECUTIVE_KPIS.players.dailyActive.change, EXECUTIVE_KPIS.players.dailyActive.trend, THEME.neonCyan)}
              {renderKPICard('Concurrent', EXECUTIVE_KPIS.players.concurrent.value, EXECUTIVE_KPIS.players.concurrent.change, EXECUTIVE_KPIS.players.concurrent.trend, THEME.neonCyan)}
              {renderKPICard('Retention', EXECUTIVE_KPIS.players.retention.value, EXECUTIVE_KPIS.players.retention.change, EXECUTIVE_KPIS.players.retention.trend, THEME.neonCyan)}
              {renderKPICard('Session Duration', EXECUTIVE_KPIS.players.sessionDuration.value, EXECUTIVE_KPIS.players.sessionDuration.change, EXECUTIVE_KPIS.players.sessionDuration.trend, THEME.neonCyan)}
            </View>
          </View>

          {/* Revenue KPIs */}
          <View style={styles.kpiSection}>
            <Text style={styles.kpiSectionTitle}>Revenue KPIs</Text>
            <View style={styles.kpiRow}>
              {renderKPICard('Total Revenue', EXECUTIVE_KPIS.revenue.total.value, EXECUTIVE_KPIS.revenue.total.change, EXECUTIVE_KPIS.revenue.total.trend, THEME.neonGreen)}
              {renderKPICard('In-Game Purchases', EXECUTIVE_KPIS.revenue.inGamePurchases.value, EXECUTIVE_KPIS.revenue.inGamePurchases.change, EXECUTIVE_KPIS.revenue.inGamePurchases.trend, THEME.neonGreen)}
              {renderKPICard('Battle Pass', EXECUTIVE_KPIS.revenue.battlePass.value, EXECUTIVE_KPIS.revenue.battlePass.change, EXECUTIVE_KPIS.revenue.battlePass.trend, THEME.neonGreen)}
              {renderKPICard('Marketplace', EXECUTIVE_KPIS.revenue.marketplace.value, EXECUTIVE_KPIS.revenue.marketplace.change, EXECUTIVE_KPIS.revenue.marketplace.trend, THEME.neonGreen)}
              {renderKPICard('Sponsorship', EXECUTIVE_KPIS.revenue.sponsorship.value, EXECUTIVE_KPIS.revenue.sponsorship.change, EXECUTIVE_KPIS.revenue.sponsorship.trend, THEME.neonGreen)}
            </View>
          </View>

          {/* Esports KPIs */}
          <View style={styles.kpiSection}>
            <Text style={styles.kpiSectionTitle}>Esports KPIs</Text>
            <View style={styles.kpiRow}>
              {renderKPICard('Active Tournaments', EXECUTIVE_KPIS.esports.activeTournaments.value, EXECUTIVE_KPIS.esports.activeTournaments.change, EXECUTIVE_KPIS.esports.activeTournaments.trend, THEME.amber)}
              {renderKPICard('Live Viewers', EXECUTIVE_KPIS.esports.liveViewers.value, EXECUTIVE_KPIS.esports.liveViewers.change, EXECUTIVE_KPIS.esports.liveViewers.trend, THEME.amber)}
              {renderKPICard('Prize Pool', EXECUTIVE_KPIS.esports.prizePool.value, EXECUTIVE_KPIS.esports.prizePool.change, EXECUTIVE_KPIS.esports.prizePool.trend, THEME.amber)}
              {renderKPICard('Team Participation', EXECUTIVE_KPIS.esports.teamParticipation.value, EXECUTIVE_KPIS.esports.teamParticipation.change, EXECUTIVE_KPIS.esports.teamParticipation.trend, THEME.amber)}
              {renderKPICard('Match Completion', EXECUTIVE_KPIS.esports.matchCompletion.value, EXECUTIVE_KPIS.esports.matchCompletion.change, EXECUTIVE_KPIS.esports.matchCompletion.trend, THEME.amber)}
            </View>
          </View>

          {/* Community KPIs */}
          <View style={styles.kpiSection}>
            <Text style={styles.kpiSectionTitle}>Community KPIs</Text>
            <View style={styles.kpiRow}>
              {renderKPICard('Discord Members', EXECUTIVE_KPIS.community.discordMembers.value, EXECUTIVE_KPIS.community.discordMembers.change, EXECUTIVE_KPIS.community.discordMembers.trend, THEME.magenta)}
              {renderKPICard('Social Engagement', EXECUTIVE_KPIS.community.socialEngagement.value, EXECUTIVE_KPIS.community.socialEngagement.change, EXECUTIVE_KPIS.community.socialEngagement.trend, THEME.magenta)}
              {renderKPICard('Community Growth', EXECUTIVE_KPIS.community.communityGrowth.value, EXECUTIVE_KPIS.community.communityGrowth.change, EXECUTIVE_KPIS.community.communityGrowth.trend, THEME.magenta)}
              {renderKPICard('Creator Activity', EXECUTIVE_KPIS.community.creatorActivity.value, EXECUTIVE_KPIS.community.creatorActivity.change, EXECUTIVE_KPIS.community.creatorActivity.trend, THEME.magenta)}
              {renderKPICard('Sentiment Score', EXECUTIVE_KPIS.community.sentiment.value, EXECUTIVE_KPIS.community.sentiment.change, EXECUTIVE_KPIS.community.sentiment.trend, THEME.magenta)}
            </View>
          </View>

          {/* AI KPIs */}
          <View style={styles.kpiSection}>
            <Text style={styles.kpiSectionTitle}>AI KPIs</Text>
            <View style={styles.kpiRow}>
              {renderKPICard('Moderation Actions', EXECUTIVE_KPIS.ai.moderationActions.value, EXECUTIVE_KPIS.ai.moderationActions.change, EXECUTIVE_KPIS.ai.moderationActions.trend, THEME.electricPurple)}
              {renderKPICard('Fraud Prevention', EXECUTIVE_KPIS.ai.fraudPrevention.value, EXECUTIVE_KPIS.ai.fraudPrevention.change, EXECUTIVE_KPIS.ai.fraudPrevention.trend, THEME.electricPurple)}
              {renderKPICard('Match Predictions', EXECUTIVE_KPIS.ai.matchPredictions.value, EXECUTIVE_KPIS.ai.matchPredictions.change, EXECUTIVE_KPIS.ai.matchPredictions.trend, THEME.electricPurple)}
              {renderKPICard('Engagement Opt', EXECUTIVE_KPIS.ai.engagementOptimization.value, EXECUTIVE_KPIS.ai.engagementOptimization.change, EXECUTIVE_KPIS.ai.engagementOptimization.trend, THEME.electricPurple)}
              {renderKPICard('Revenue Impact', EXECUTIVE_KPIS.ai.revenueImpact.value, EXECUTIVE_KPIS.ai.revenueImpact.change, EXECUTIVE_KPIS.ai.revenueImpact.trend, THEME.electricPurple)}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Chief Gaming Officer Command Center */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Crown size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Chief Gaming Officer Command Center</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.commandCenterCard}>
            <View style={styles.commandCenterGrid}>
              <View style={styles.commandCenterMetric}>
                <Text style={styles.metricLabel}>Monthly Active Players</Text>
                <Text style={[styles.metricValueLarge, { color: THEME.neonCyan }]}>120M</Text>
                {renderSparkline([95, 102, 98, 110, 115, 120], THEME.neonCyan)}
              </View>
              <View style={styles.commandCenterMetric}>
                <Text style={styles.metricLabel}>Concurrent Players</Text>
                <Text style={[styles.metricValueLarge, { color: THEME.electricPurple }]}>8.5M</Text>
                {renderSparkline([7.2, 7.8, 7.5, 8.1, 8.3, 8.5], THEME.electricPurple)}
              </View>
              <View style={styles.commandCenterMetric}>
                <Text style={styles.metricLabel}>Revenue</Text>
                <Text style={[styles.metricValueLarge, { color: THEME.neonGreen }]}>$5.4B</Text>
                {renderSparkline([4.2, 4.5, 4.3, 4.8, 5.1, 5.4], THEME.neonGreen)}
              </View>
              <View style={styles.commandCenterMetric}>
                <Text style={styles.metricLabel}>Live Viewers</Text>
                <Text style={[styles.metricValueLarge, { color: THEME.amber }]}>210M</Text>
                {renderSparkline([150, 170, 165, 185, 195, 210], THEME.amber)}
              </View>
              <View style={styles.commandCenterMetric}>
                <Text style={styles.metricLabel}>Retention Rate</Text>
                <Text style={[styles.metricValueLarge, { color: THEME.magenta }]}>82%</Text>
                {renderSparkline([78, 79, 80, 81, 81, 82], THEME.magenta)}
              </View>
              <View style={styles.commandCenterMetric}>
                <Text style={styles.metricLabel}>AI Revenue Impact</Text>
                <Text style={[styles.metricValueLarge, { color: THEME.electricPurple }]}>+$420M</Text>
                {renderSparkline([280, 320, 350, 380, 400, 420], THEME.electricPurple)}
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* AI Gaming Agents */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Brain size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>AI Gaming Agents</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.agentsScroll}>
            <View style={styles.agentsContainer}>
              {AI_GAMING_AGENTS.map((agent) => renderAgentCard(agent))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* AI Insights Center */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Sparkles size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>AI Insights Center</Text>
          </View>
          <View style={styles.insightsContainer}>
            {AI_INSIGHTS.map((insight) => renderInsightCard(insight))}
          </View>
        </Animated.View>

        {/* Real-Time Gaming Activity Feed */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Activity size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Real-Time Gaming Activity Feed</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.activityFeedCard}>
            <View style={styles.activityFeed}>
              {ACTIVITY_FEED.map((activity) => renderActivityItem(activity))}
            </View>
          </BlurView>
        </Animated.View>

        {/* System Health & AI Infrastructure */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Server size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>System Health & AI Infrastructure</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.systemHealthCard}>
            <View style={styles.systemHealthGrid}>
              <View style={styles.healthItem}>
                <View style={styles.healthIcon}>
                  <Server size={20} color={THEME.neonGreen} />
                </View>
                <Text style={styles.healthLabel}>Game Servers</Text>
                <Text style={[styles.healthValue, { color: THEME.neonGreen }]}>99.97%</Text>
                <View style={styles.healthBar}>
                  <View style={[styles.healthBarFill, { width: '99.7%', backgroundColor: THEME.neonGreen }]} />
                </View>
              </View>
              <View style={styles.healthItem}>
                <View style={styles.healthIcon}>
                  <Wifi size={20} color={THEME.neonGreen} />
                </View>
                <Text style={styles.healthLabel}>Matchmaking</Text>
                <Text style={[styles.healthValue, { color: THEME.neonGreen }]}>99.8%</Text>
                <View style={styles.healthBar}>
                  <View style={[styles.healthBarFill, { width: '99.8%', backgroundColor: THEME.neonGreen }]} />
                </View>
              </View>
              <View style={styles.healthItem}>
                <View style={styles.healthIcon}>
                  <Cpu size={20} color={THEME.neonGreen} />
                </View>
                <Text style={styles.healthLabel}>AI Services</Text>
                <Text style={[styles.healthValue, { color: THEME.neonGreen }]}>99.9%</Text>
                <View style={styles.healthBar}>
                  <View style={[styles.healthBarFill, { width: '99.9%', backgroundColor: THEME.neonGreen }]} />
                </View>
              </View>
              <View style={styles.healthItem}>
                <View style={styles.healthIcon}>
                  <Shield size={20} color={THEME.neonGreen} />
                </View>
                <Text style={styles.healthLabel}>Security Platform</Text>
                <Text style={[styles.healthValue, { color: THEME.neonGreen }]}>100%</Text>
                <View style={styles.healthBar}>
                  <View style={[styles.healthBarFill, { width: '100%', backgroundColor: THEME.neonGreen }]} />
                </View>
              </View>
              <View style={styles.healthItem}>
                <View style={styles.healthIcon}>
                  <Video size={20} color={THEME.neonGreen} />
                </View>
                <Text style={styles.healthLabel}>Streaming Infrastructure</Text>
                <Text style={[styles.healthValue, { color: THEME.neonGreen }]}>99.5%</Text>
                <View style={styles.healthBar}>
                  <View style={[styles.healthBarFill, { width: '99.5%', backgroundColor: THEME.neonGreen }]} />
                </View>
              </View>
              <View style={styles.healthItem}>
                <View style={styles.healthIcon}>
                  <Database size={20} color={THEME.neonGreen} />
                </View>
                <Text style={styles.healthLabel}>Database Systems</Text>
                <Text style={[styles.healthValue, { color: THEME.neonGreen }]}>99.9%</Text>
                <View style={styles.healthBar}>
                  <View style={[styles.healthBarFill, { width: '99.9%', backgroundColor: THEME.neonGreen }]} />
                </View>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Player Intelligence Hub */}
        <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Users size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Player Intelligence Hub</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.intelligenceCard}>
            <View style={styles.intelligenceGrid}>
              <View style={styles.intelligenceMetric}>
                <Text style={styles.intelligenceLabel}>Player Segments</Text>
                <Text style={[styles.intelligenceValue, { color: THEME.neonCyan }]}>12</Text>
                <Text style={styles.intelligenceSub}>Active segments</Text>
              </View>
              <View style={styles.intelligenceMetric}>
                <Text style={styles.intelligenceLabel}>Retention Rate</Text>
                <Text style={[styles.intelligenceValue, { color: THEME.neonGreen }]}>82%</Text>
                <Text style={styles.intelligenceSub}>+3.1% vs last month</Text>
              </View>
              <View style={styles.intelligenceMetric}>
                <Text style={styles.intelligenceLabel}>Churn Risk</Text>
                <Text style={[styles.intelligenceValue, { color: THEME.amber }]}>8.5%</Text>
                <Text style={styles.intelligenceSub}>High risk players</Text>
              </View>
              <View style={styles.intelligenceMetric}>
                <Text style={styles.intelligenceLabel}>Avg Progression</Text>
                <Text style={[styles.intelligenceValue, { color: THEME.electricPurple }]}>Lvl 47</Text>
                <Text style={styles.intelligenceSub}>Mean player level</Text>
              </View>
              <View style={styles.intelligenceMetric}>
                <Text style={styles.intelligenceLabel}>Engagement Score</Text>
                <Text style={[styles.intelligenceValue, { color: THEME.magenta }]}>87/100</Text>
                <Text style={styles.intelligenceSub}>Daily active score</Text>
              </View>
            </View>
            <View style={styles.intelligenceVisualization}>
              <Text style={styles.vizTitle}>Player Journey Map</Text>
              <View style={styles.journeySteps}>
                <View style={[styles.journeyStep, { backgroundColor: THEME.neonCyan + '30' }]}>
                  <Text style={styles.journeyStepLabel}>Onboarding</Text>
                  <Text style={[styles.journeyStepValue, { color: THEME.neonCyan }]}>94%</Text>
                </View>
                <View style={styles.journeyArrow}>
                  <ChevronRight size={16} color={THEME.textMuted} />
                </View>
                <View style={[styles.journeyStep, { backgroundColor: THEME.neonGreen + '30' }]}>
                  <Text style={styles.journeyStepLabel}>First Purchase</Text>
                  <Text style={[styles.journeyStepValue, { color: THEME.neonGreen }]}>67%</Text>
                </View>
                <View style={styles.journeyArrow}>
                  <ChevronRight size={16} color={THEME.textMuted} />
                </View>
                <View style={[styles.journeyStep, { backgroundColor: THEME.electricPurple + '30' }]}>
                  <Text style={styles.journeyStepLabel}>Level 10</Text>
                  <Text style={[styles.journeyStepValue, { color: THEME.electricPurple }]}>52%</Text>
                </View>
                <View style={styles.journeyArrow}>
                  <ChevronRight size={16} color={THEME.textMuted} />
                </View>
                <View style={[styles.journeyStep, { backgroundColor: THEME.magenta + '30' }]}>
                  <Text style={styles.journeyStepLabel}>Loyal</Text>
                  <Text style={[styles.journeyStepValue, { color: THEME.magenta }]}>38%</Text>
                </View>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Game Analytics Command Center */}
        <Animated.View entering={FadeInUp.delay(600).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <BarChart3 size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Game Analytics Command Center</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.analyticsCard}>
            <View style={styles.analyticsGrid}>
              <View style={styles.analyticsMetric}>
                <Text style={styles.analyticsLabel}>Match Activity</Text>
                <Text style={[styles.analyticsValue, { color: THEME.neonCyan }]}>2.4M/day</Text>
                {renderSparkline([2.1, 2.2, 2.3, 2.4, 2.5, 2.4], THEME.neonCyan)}
              </View>
              <View style={styles.analyticsMetric}>
                <Text style={styles.analyticsLabel}>Avg Session</Text>
                <Text style={[styles.analyticsValue, { color: THEME.electricPurple }]}>4.2h</Text>
                {renderSparkline([4.0, 4.1, 4.2, 4.3, 4.2, 4.2], THEME.electricPurple)}
              </View>
              <View style={styles.analyticsMetric}>
                <Text style={styles.analyticsLabel}>Economy Balance</Text>
                <Text style={[styles.analyticsValue, { color: THEME.neonGreen }]}>98.2%</Text>
                {renderSparkline([97, 97.5, 98, 98.2, 98.1, 98.2], THEME.neonGreen)}
              </View>
              <View style={styles.analyticsMetric}>
                <Text style={styles.analyticsLabel}>Feature Usage</Text>
                <Text style={[styles.analyticsValue, { color: THEME.amber }]}>76%</Text>
                {renderSparkline([72, 74, 75, 76, 77, 76], THEME.amber)}
              </View>
              <View style={styles.analyticsMetric}>
                <Text style={styles.analyticsLabel}>Gameplay Perf</Text>
                <Text style={[styles.analyticsValue, { color: THEME.magenta }]}>92 FPS</Text>
                {renderSparkline([88, 90, 91, 92, 93, 92], THEME.magenta)}
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Live Operations Center */}
        <Animated.View entering={FadeInUp.delay(700).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Radio size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Live Operations Center</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.liveOpsCard}>
            <View style={styles.liveOpsGrid}>
              <View style={styles.liveOpsItem}>
                <View style={[styles.liveOpsIcon, { backgroundColor: THEME.neonCyan + '20' }]}>
                  <Flame size={20} color={THEME.neonCyan} />
                </View>
                <Text style={styles.liveOpsLabel}>Live Events</Text>
                <Text style={[styles.liveOpsValue, { color: THEME.neonCyan }]}>12 Active</Text>
                <Text style={styles.liveOpsSub}>4.2M participants</Text>
              </View>
              <View style={styles.liveOpsItem}>
                <View style={[styles.liveOpsIcon, { backgroundColor: THEME.electricPurple + '20' }]}>
                  <Calendar size={20} color={THEME.electricPurple} />
                </View>
                <Text style={styles.liveOpsLabel}>Seasonal Content</Text>
                <Text style={[styles.liveOpsValue, { color: THEME.electricPurple }]}>Season 7</Text>
                <Text style={styles.liveOpsSub}>45 days remaining</Text>
              </View>
              <View style={styles.liveOpsItem}>
                <View style={[styles.liveOpsIcon, { backgroundColor: THEME.neonGreen + '20' }]}>
                  <Server size={20} color={THEME.neonGreen} />
                </View>
                <Text style={styles.liveOpsLabel}>Server Performance</Text>
                <Text style={[styles.liveOpsValue, { color: THEME.neonGreen }]}>99.7%</Text>
                <Text style={styles.liveOpsSub}>24ms avg latency</Text>
              </View>
              <View style={styles.liveOpsItem}>
                <View style={[styles.liveOpsIcon, { backgroundColor: THEME.amber + '20' }]}>
                  <Zap size={20} color={THEME.amber} />
                </View>
                <Text style={styles.liveOpsLabel}>Feature Releases</Text>
                <Text style={[styles.liveOpsValue, { color: THEME.amber }]}>8 This Month</Text>
                <Text style={styles.liveOpsSub}>3 pending review</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Esports Command Center */}
        <Animated.View entering={FadeInUp.delay(800).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Trophy size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Esports Command Center</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.esportsCard}>
            <View style={styles.esportsGrid}>
              <View style={styles.esportsMetric}>
                <Text style={styles.esportsLabel}>Active Leagues</Text>
                <Text style={[styles.esportsValue, { color: THEME.neonCyan }]}>8</Text>
                <Text style={styles.esportsSub}>Global competitions</Text>
              </View>
              <View style={styles.esportsMetric}>
                <Text style={styles.esportsLabel}>Live Matches</Text>
                <Text style={[styles.esportsValue, { color: THEME.red }]}>24</Text>
                <Text style={styles.esportsSub}>Currently streaming</Text>
              </View>
              <View style={styles.esportsMetric}>
                <Text style={styles.esportsLabel}>Tournament Status</Text>
                <Text style={[styles.esportsValue, { color: THEME.neonGreen }]}>Active</Text>
                <Text style={styles.esportsSub}>World Championship</Text>
              </View>
              <View style={styles.esportsMetric}>
                <Text style={styles.esportsLabel}>Team Rankings</Text>
                <Text style={[styles.esportsValue, { color: THEME.electricPurple }]}>1,847</Text>
                <Text style={styles.esportsSub}>Registered teams</Text>
              </View>
              <View style={styles.esportsMetric}>
                <Text style={styles.esportsLabel}>Viewer Metrics</Text>
                <Text style={[styles.esportsValue, { color: THEME.amber }]}>210M</Text>
                <Text style={styles.esportsSub}>Monthly viewers</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Tournament Management Hub */}
        <Animated.View entering={FadeInUp.delay(900).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Swords size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Tournament Management Hub</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.tournamentCard}>
            <View style={styles.tournamentGrid}>
              <View style={styles.tournamentMetric}>
                <Text style={styles.tournamentLabel}>Registrations</Text>
                <Text style={[styles.tournamentValue, { color: THEME.neonCyan }]}>45,892</Text>
                <Text style={styles.tournamentSub}>Players registered</Text>
              </View>
              <View style={styles.tournamentMetric}>
                <Text style={styles.tournamentLabel}>Match Scheduling</Text>
                <Text style={[styles.tournamentValue, { color: THEME.electricPurple }]}>1,247</Text>
                <Text style={styles.tournamentSub}>Matches scheduled</Text>
              </View>
              <View style={styles.tournamentMetric}>
                <Text style={styles.tournamentLabel}>Team Participation</Text>
                <Text style={[styles.tournamentValue, { color: THEME.neonGreen }]}>847</Text>
                <Text style={styles.tournamentSub}>Active teams</Text>
              </View>
              <View style={styles.tournamentMetric}>
                <Text style={styles.tournamentLabel}>Referee Operations</Text>
                <Text style={[styles.tournamentValue, { color: THEME.amber }]}>156</Text>
                <Text style={styles.tournamentSub}>Active referees</Text>
              </View>
              <View style={styles.tournamentMetric}>
                <Text style={styles.tournamentLabel}>Prize Distribution</Text>
                <Text style={[styles.tournamentValue, { color: THEME.magenta }]}>$45M</Text>
                <Text style={styles.tournamentSub}>Total prize pool</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Community Intelligence Center */}
        <Animated.View entering={FadeInUp.delay(1000).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <MessageSquare size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Community Intelligence Center</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.communityCard}>
            <View style={styles.communityGrid}>
              <View style={styles.communityMetric}>
                <Text style={styles.communityLabel}>Community Growth</Text>
                <Text style={[styles.communityValue, { color: THEME.neonCyan }]}>+28%</Text>
                {renderSparkline([20, 22, 24, 25, 27, 28], THEME.neonCyan)}
              </View>
              <View style={styles.communityMetric}>
                <Text style={styles.communityLabel}>Discord Activity</Text>
                <Text style={[styles.communityValue, { color: THEME.magenta }]}>8.5M</Text>
                {renderSparkline([7.8, 8.0, 8.2, 8.3, 8.4, 8.5], THEME.magenta)}
              </View>
              <View style={styles.communityMetric}>
                <Text style={styles.communityLabel}>Social Engagement</Text>
                <Text style={[styles.communityValue, { color: THEME.electricPurple }]}>450M</Text>
                {renderSparkline([380, 400, 420, 430, 440, 450], THEME.electricPurple)}
              </View>
              <View style={styles.communityMetric}>
                <Text style={styles.communityLabel}>Sentiment Analysis</Text>
                <Text style={[styles.communityValue, { color: THEME.neonGreen }]}>87%</Text>
                {renderSparkline([82, 84, 85, 86, 86, 87], THEME.neonGreen)}
              </View>
              <View style={styles.communityMetric}>
                <Text style={styles.communityLabel}>Creator Communities</Text>
                <Text style={[styles.communityValue, { color: THEME.amber }]}>12,450</Text>
                {renderSparkline([11000, 11500, 11800, 12000, 12200, 12450], THEME.amber)}
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Monetization Engine */}
        <Animated.View entering={FadeInUp.delay(1100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <DollarSign size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Monetization Engine</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.monetizationCard}>
            <View style={styles.monetizationGrid}>
              <View style={styles.monetizationMetric}>
                <Text style={styles.monetizationLabel}>Store Revenue</Text>
                <Text style={[styles.monetizationValue, { color: THEME.neonGreen }]}>$2.8B</Text>
                {renderSparkline([2.4, 2.5, 2.6, 2.7, 2.75, 2.8], THEME.neonGreen)}
              </View>
              <View style={styles.monetizationMetric}>
                <Text style={styles.monetizationLabel}>Battle Pass Sales</Text>
                <Text style={[styles.monetizationValue, { color: THEME.electricPurple }]}>$1.2B</Text>
                {renderSparkline([1.0, 1.05, 1.1, 1.15, 1.18, 1.2], THEME.electricPurple)}
              </View>
              <View style={styles.monetizationMetric}>
                <Text style={styles.monetizationLabel}>Cosmetics Performance</Text>
                <Text style={[styles.monetizationValue, { color: THEME.magenta }]}>$890M</Text>
                {renderSparkline([750, 800, 820, 850, 870, 890], THEME.magenta)}
              </View>
              <View style={styles.monetizationMetric}>
                <Text style={styles.monetizationLabel}>Marketplace Transactions</Text>
                <Text style={[styles.monetizationValue, { color: THEME.amber }]}>$890M</Text>
                {renderSparkline([700, 750, 780, 820, 860, 890], THEME.amber)}
              </View>
              <View style={styles.monetizationMetric}>
                <Text style={styles.monetizationLabel}>Offer Conversions</Text>
                <Text style={[styles.monetizationValue, { color: THEME.neonCyan }]}>28%</Text>
                {renderSparkline([24, 25, 26, 27, 27.5, 28], THEME.neonCyan)}
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Anti-Cheat & Security Command Center */}
        <Animated.View entering={FadeInUp.delay(1200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Shield size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Anti-Cheat & Security Command Center</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.securityCard}>
            <View style={styles.securityGrid}>
              <View style={styles.securityMetric}>
                <Text style={styles.securityLabel}>Cheating Incidents</Text>
                <Text style={[styles.securityValue, { color: THEME.red }]}>1,247</Text>
                <Text style={styles.securitySub}>This month</Text>
              </View>
              <View style={styles.securityMetric}>
                <Text style={styles.securityLabel}>Fraud Attempts</Text>
                <Text style={[styles.securityValue, { color: THEME.amber }]}>847</Text>
                <Text style={styles.securitySub}>Blocked attempts</Text>
              </View>
              <View style={styles.securityMetric}>
                <Text style={styles.securityLabel}>Toxicity Detection</Text>
                <Text style={[styles.securityValue, { color: THEME.electricPurple }]}>2.4M</Text>
                <Text style={styles.securitySub}>Actions taken</Text>
              </View>
              <View style={styles.securityMetric}>
                <Text style={styles.securityLabel}>Account Security</Text>
                <Text style={[styles.securityValue, { color: THEME.neonGreen }]}>99.9%</Text>
                <Text style={styles.securitySub}>Protected accounts</Text>
              </View>
              <View style={styles.securityMetric}>
                <Text style={styles.securityLabel}>Suspicious Activity</Text>
                <Text style={[styles.securityValue, { color: THEME.amber }]}>156</Text>
                <Text style={styles.securitySub}>Under investigation</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Content & Creator Hub */}
        <Animated.View entering={FadeInUp.delay(1300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Video size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Content & Creator Hub</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.creatorCard}>
            <View style={styles.creatorGrid}>
              <View style={styles.creatorMetric}>
                <Text style={styles.creatorLabel}>Active Streamers</Text>
                <Text style={[styles.creatorValue, { color: THEME.neonCyan }]}>12,450</Text>
                {renderSparkline([11000, 11500, 11800, 12000, 12200, 12450], THEME.neonCyan)}
              </View>
              <View style={styles.creatorMetric}>
                <Text style={styles.creatorLabel}>Influencers</Text>
                <Text style={[styles.creatorValue, { color: THEME.magenta }]}>2,847</Text>
                {renderSparkline([2500, 2600, 2700, 2750, 2800, 2847], THEME.magenta)}
              </View>
              <View style={styles.creatorMetric}>
                <Text style={styles.creatorLabel}>Creator Revenue</Text>
                <Text style={[styles.creatorValue, { color: THEME.neonGreen }]}>$180M</Text>
                {renderSparkline([150, 160, 165, 170, 175, 180], THEME.neonGreen)}
              </View>
              <View style={styles.creatorMetric}>
                <Text style={styles.creatorLabel}>Content Performance</Text>
                <Text style={[styles.creatorValue, { color: THEME.electricPurple }]}>8.2M</Text>
                {renderSparkline([7.5, 7.8, 7.9, 8.0, 8.1, 8.2], THEME.electricPurple)}
              </View>
              <View style={styles.creatorMetric}>
                <Text style={styles.creatorLabel}>Campaign Reach</Text>
                <Text style={[styles.creatorValue, { color: THEME.amber }]}>450M</Text>
                {renderSparkline([380, 400, 420, 430, 440, 450], THEME.amber)}
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Global Gaming Operations */}
        <Animated.View entering={FadeInUp.delay(1400).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Globe size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Global Gaming Operations</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.globalOpsCard}>
            <View style={styles.globalOpsGrid}>
              <View style={styles.regionItem}>
                <Text style={styles.regionLabel}>North America</Text>
                <Text style={[styles.regionValue, { color: THEME.neonCyan }]}>45M Players</Text>
                <Text style={[styles.regionRevenue, { color: THEME.neonGreen }]}>$2.1B Revenue</Text>
              </View>
              <View style={styles.regionItem}>
                <Text style={styles.regionLabel}>Europe</Text>
                <Text style={[styles.regionValue, { color: THEME.neonCyan }]}>38M Players</Text>
                <Text style={[styles.regionRevenue, { color: THEME.neonGreen }]}>$1.8B Revenue</Text>
              </View>
              <View style={styles.regionItem}>
                <Text style={styles.regionLabel}>Asia Pacific</Text>
                <Text style={[styles.regionValue, { color: THEME.neonCyan }]}>32M Players</Text>
                <Text style={[styles.regionRevenue, { color: THEME.neonGreen }]}>$1.2B Revenue</Text>
              </View>
              <View style={styles.regionItem}>
                <Text style={styles.regionLabel}>Latin America</Text>
                <Text style={[styles.regionValue, { color: THEME.neonCyan }]}>4M Players</Text>
                <Text style={[styles.regionRevenue, { color: THEME.neonGreen }]}>$180M Revenue</Text>
              </View>
              <View style={styles.regionItem}>
                <Text style={styles.regionLabel}>Middle East</Text>
                <Text style={[styles.regionValue, { color: THEME.neonCyan }]}>1M Players</Text>
                <Text style={[styles.regionRevenue, { color: THEME.neonGreen }]}>$120M Revenue</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.navScroll}>
          <View style={styles.navContainer}>
            {NAVIGATION_ITEMS.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedNav === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.navItem, isSelected && styles.navItemSelected]}
                  onPress={() => {
                    setSelectedNav(item.id);
                    if (item.route !== '/ai-agent/gaming-esports-command-center') {
                      router.push(item.route as any);
                    }
                  }}
                >
                  <Icon size={20} color={isSelected ? THEME.neonCyan : THEME.textMuted} />
                  <Text style={[styles.navLabel, isSelected && styles.navLabelSelected]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: THEME.border,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    flexDirection: 'flex-row',
    alignItems: 'center',
    gap: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: THEME.text,
  },
  headerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 4,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: THEME.red,
  },
  liveText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.red,
  },
  timeText: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  kpiScroll: {
    maxHeight: 280,
  },
  kpiContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  kpiSection: {
    marginRight: 16,
  },
  kpiSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.textMuted,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  kpiRow: {
    gap: 8,
  },
  kpiCard: {
    borderRadius: 12,
    padding: 16,
    width: 160,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  kpiTitle: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  trendUp: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendDown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendNeutral: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.text,
  },
  commandCenterCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  commandCenterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  commandCenterMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    padding: 16,
    backgroundColor: THEME.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  metricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
    color: THEME.text,
  },
  metricValueLarge: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  agentsScroll: {
    marginBottom: 0,
  },
  agentsContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 4,
  },
  agentCard: {
    width: 280,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: THEME.border,
  },
  agentCardBlur: {
    padding: 16,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  agentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.text,
  },
  agentRole: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  agentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  agentStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  agentStatusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  agentResponsibilities: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.textMuted,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  responsibilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  responsibilityText: {
    fontSize: 12,
    color: THEME.text,
  },
  agentMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  metricItem: {
    flex: 1,
    minWidth: '45%',
  },
  agentEfficiency: {
    marginBottom: 0,
  },
  efficiencyLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  efficiencyBar: {
    height: 6,
    backgroundColor: THEME.cardLight,
    borderRadius: 3,
    marginBottom: 6,
    overflow: 'hidden',
  },
  efficiencyFill: {
    height: '100%',
    borderRadius: 3,
  },
  efficiencyValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  insightsContainer: {
    gap: 12,
  },
  insightCard: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: THEME.border,
  },
  insightCardBlur: {
    padding: 16,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  insightMeta: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  insightTime: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  insightImpact: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  insightImpactText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  insightMessage: {
    fontSize: 14,
    color: THEME.text,
    marginBottom: 12,
    lineHeight: 20,
  },
  insightAction: {
    backgroundColor: THEME.card,
    padding: 12,
    borderRadius: 8,
  },
  insightActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.textMuted,
    marginBottom: 4,
  },
  insightActionText: {
    fontSize: 13,
    color: THEME.text,
  },
  activityFeedCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  activityFeed: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: THEME.border,
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityMessage: {
    flex: 1,
    fontSize: 14,
    color: THEME.text,
  },
  activityTime: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  systemHealthCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  systemHealthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  healthItem: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  healthIcon: {
    marginBottom: 12,
  },
  healthLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  healthValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  healthBar: {
    height: 4,
    backgroundColor: THEME.cardLight,
    borderRadius: 2,
    overflow: 'hidden',
  },
  healthBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  intelligenceCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  intelligenceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 20,
  },
  intelligenceMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  intelligenceLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  intelligenceValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  intelligenceSub: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  intelligenceVisualization: {
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  vizTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 16,
  },
  journeySteps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  journeyStep: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  journeyStepLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  journeyStepValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  journeyArrow: {
    paddingHorizontal: 8,
  },
  analyticsCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  analyticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  analyticsMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  analyticsLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  analyticsValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  liveOpsCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  liveOpsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  liveOpsItem: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  liveOpsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  liveOpsLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  liveOpsValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  liveOpsSub: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  esportsCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  esportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  esportsMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  esportsLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  esportsValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  esportsSub: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  tournamentCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  tournamentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  tournamentMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  tournamentLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  tournamentValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  tournamentSub: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  communityCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  communityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  communityMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  communityLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  communityValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  monetizationCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  monetizationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  monetizationMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  monetizationLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  monetizationValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  securityCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  securityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  securityMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  securityLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  securityValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  securitySub: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  creatorCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  creatorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  creatorMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  creatorLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  creatorValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  globalOpsCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  globalOpsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  regionItem: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  regionLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  regionValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  regionRevenue: {
    fontSize: 14,
    fontWeight: '600',
  },
  bottomNav: {
    borderTopWidth: 1,
    borderTopColor: THEME.border,
    backgroundColor: THEME.card,
  },
  navScroll: {
    maxHeight: 80,
  },
  navContainer: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: THEME.cardLight,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  navItemSelected: {
    backgroundColor: THEME.neonCyan + '10',
    borderColor: THEME.neonCyan,
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: THEME.textMuted,
  },
  navLabelSelected: {
    color: THEME.neonCyan,
  },
});
