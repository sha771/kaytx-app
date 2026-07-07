/**
 * =============================================================================
 * GAMING & ESPORTS AI COMMAND CENTER
 * =============================================================================
 *
 * A comprehensive enterprise-grade Gaming & Esports AI Operating System that manages
 * autonomous AI agents responsible for player intelligence, esports operations,
 * game analytics, live events, tournaments, monetization, community management,
 * anti-cheat systems, content creation, sponsorship performance, audience engagement,
 * and revenue optimization.
 *
 * @version 1.0.0
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
import Animated, { FadeInUp } from 'react-native-reanimated';
import {
  ChevronLeft,
  Brain,
  Flame,
  Shield,
  Trophy,
  DollarSign,
  Users,
  Activity,
  Zap,
  Globe,
  Video,
  BarChart3,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  X,
  LayoutDashboard,
  Gamepad2,
  Target,
  Calendar,
  MessageSquare,
  CreditCard,
  Lock,
  Mic,
  Settings,
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';

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
  player: {
    monthlyActivePlayers: { value: '120M', trend: '+8%', forecast: '+12%' },
    dailyActivePlayers: { value: '45M', trend: '+5%', forecast: '+8%' },
    concurrentPlayers: { value: '8.5M', trend: '+15%', forecast: '+18%' },
    playerRetention: { value: '82%', trend: '+3%', forecast: '+5%' },
    sessionDuration: { value: '2.4h', trend: '+7%', forecast: '+10%' },
  },
  revenue: {
    totalRevenue: { value: '$5.4B', trend: '+22%', forecast: '+28%' },
    inGamePurchases: { value: '$2.8B', trend: '+18%', forecast: '+24%' },
    battlePassRevenue: { value: '$1.2B', trend: '+25%', forecast: '+30%' },
    marketplaceRevenue: { value: '$800M', trend: '+15%', forecast: '+20%' },
    sponsorshipRevenue: { value: '$600M', trend: '+35%', forecast: '+40%' },
  },
  esports: {
    activeTournaments: { value: '45', trend: '+12%', forecast: '+15%' },
    liveViewers: { value: '210M', trend: '+28%', forecast: '+35%' },
    prizePoolValue: { value: '$45M', trend: '+40%', forecast: '+50%' },
    teamParticipation: { value: '1,240', trend: '+18%', forecast: '+25%' },
    matchCompletionRate: { value: '96%', trend: '+2%', forecast: '+4%' },
  },
  community: {
    discordMembers: { value: '8.5M', trend: '+15%', forecast: '+20%' },
    socialEngagement: { value: '124M', trend: '+22%', forecast: '+28%' },
    communityGrowth: { value: '+18%', trend: '+5%', forecast: '+8%' },
    creatorActivity: { value: '45K', trend: '+12%', forecast: '+18%' },
    sentimentScore: { value: '87%', trend: '+8%', forecast: '+12%' },
  },
  ai: {
    aiModerationActions: { value: '2.4M', trend: '+35%', forecast: '+45%' },
    fraudPreventionEvents: { value: '1.8M', trend: '+40%', forecast: '+50%' },
    matchPredictions: { value: '850K', trend: '+28%', forecast: '+35%' },
    engagementOptimization: { value: '+15%', trend: '+8%', forecast: '+12%' },
    revenueImpact: { value: '+$420M', trend: '+25%', forecast: '+35%' },
  },
};

// AI Gaming Agents
const AI_GAMING_AGENTS = [
  {
    id: 'phoenix',
    name: 'Agent Phoenix',
    role: 'Player Intelligence Agent',
    icon: Brain,
    color: THEME.neonCyan,
    status: 'active',
    metrics: {
      playersAnalyzed: '120M',
      retentionImprovement: '+15%',
      churnReduction: '-22%',
    },
    responsibilities: [
      'Player behavior analysis',
      'Retention optimization',
      'Churn prediction',
      'Segmentation',
    ],
  },
  {
    id: 'titan',
    name: 'Agent Titan',
    role: 'Live Operations Agent',
    icon: Flame,
    color: THEME.amber,
    status: 'active',
    metrics: {
      eventsManaged: '245',
      uptimeSuccess: '99.7%',
      playerEngagementLift: '+28%',
    },
    responsibilities: [
      'Event management',
      'Game updates',
      'Seasonal operations',
      'Live balancing',
    ],
  },
  {
    id: 'spectre',
    name: 'Agent Spectre',
    role: 'Anti-Cheat Agent',
    icon: Shield,
    color: THEME.red,
    status: 'active',
    metrics: {
      threatsBlocked: '1.8M',
      accuracyRate: '99.2%',
      accountsProtected: '45M',
    },
    responsibilities: [
      'Cheat detection',
      'Fraud prevention',
      'Security monitoring',
      'Toxicity detection',
    ],
  },
  {
    id: 'arena',
    name: 'Agent Arena',
    role: 'Esports Operations Agent',
    icon: Trophy,
    color: THEME.magenta,
    status: 'active',
    metrics: {
      tournamentsManaged: '45',
      matchesProcessed: '12K',
      viewerGrowth: '+35%',
    },
    responsibilities: [
      'Tournament management',
      'Match scheduling',
      'Team coordination',
      'Competitive analytics',
    ],
  },
  {
    id: 'nexus',
    name: 'Agent Nexus',
    role: 'Monetization Agent',
    icon: DollarSign,
    color: THEME.neonGreen,
    status: 'active',
    metrics: {
      revenueInfluenced: '+$420M',
      purchaseConversion: '+18%',
      offerPerformance: '+25%',
    },
    responsibilities: [
      'Store optimization',
      'Offer recommendations',
      'Pricing intelligence',
      'Revenue forecasting',
    ],
  },
];

// Navigation Items
const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard, route: '/ai-agent/gaming-esports/gaming-esports-command-center' },
  { id: 'agents', label: 'AI Gaming Agents', icon: Brain, route: '/ai-agent/gaming-esports/gaming-esports-command-center' },
  { id: 'player', label: 'Player Intelligence', icon: Users, route: '/ai-agent/gaming-esports/player-intelligence-hub' },
  { id: 'analytics', label: 'Game Analytics', icon: BarChart3, route: '/ai-agent/gaming-esports/game-analytics-command-center' },
  { id: 'live', label: 'Live Operations', icon: Flame, route: '/ai-agent/gaming-esports/live-operations-center' },
  { id: 'esports', label: 'Esports Center', icon: Trophy, route: '/ai-agent/gaming-esports/esports-command-center' },
  { id: 'tournament', label: 'Tournament Management', icon: Calendar, route: '/ai-agent/gaming-esports/tournament-management-hub' },
  { id: 'community', label: 'Community Hub', icon: MessageSquare, route: '/ai-agent/gaming-esports/community-intelligence-center' },
  { id: 'monetization', label: 'Monetization', icon: CreditCard, route: '/ai-agent/gaming-esports/monetization-engine' },
  { id: 'security', label: 'Anti-Cheat & Security', icon: Lock, route: '/ai-agent/gaming-esports/anti-cheat-security-command-center' },
  { id: 'creators', label: 'Content & Creators', icon: Mic, route: '/ai-agent/gaming-esports/content-creator-hub' },
  { id: 'global', label: 'Global Operations', icon: Globe, route: '/ai-agent/gaming-esports/global-gaming-operations' },
  { id: 'system', label: 'System Health', icon: Activity, route: '/ai-agent/gaming-esports/system-health-ai-infrastructure' },
];

// AI Insights
const AI_INSIGHTS = [
  {
    type: 'retention',
    title: 'Player Retention Alert',
    message: 'Player retention for new users dropped 8% after recent update. Investigation recommended.',
    impact: 'High',
    action: 'Analyze recent update impact',
    color: THEME.amber,
  },
  {
    type: 'revenue',
    title: 'Revenue Opportunity',
    message: 'Battle Pass conversion opportunity identified worth $12M. Targeted campaign recommended.',
    impact: 'Positive',
    action: 'Launch targeted campaign',
    color: THEME.neonGreen,
  },
  {
    type: 'esports',
    title: 'Esports Projection',
    message: 'Esports finals projected to exceed 18M concurrent viewers. Infrastructure scaling recommended.',
    impact: 'High',
    action: 'Scale streaming infrastructure',
    color: THEME.magenta,
  },
  {
    type: 'security',
    title: 'Security Alert',
    message: 'Suspicious activity detected in ranked matchmaking. Immediate investigation required.',
    impact: 'Critical',
    action: 'Investigate suspicious activity',
    color: THEME.red,
  },
  {
    type: 'community',
    title: 'Community Sentiment',
    message: 'Community sentiment improved 15% following latest event. Momentum building.',
    impact: 'Positive',
    action: 'Capitalize on positive momentum',
    color: THEME.neonCyan,
  },
];

// Real-Time Activity Feed
const ACTIVITY_FEED = [
  { id: 1, type: 'match', message: 'Match started: Team Liquid vs Cloud9', time: '2 min ago', icon: Gamepad2 },
  { id: 2, type: 'tournament', message: 'Tournament launched: Winter Championship 2026', time: '5 min ago', icon: Trophy },
  { id: 3, type: 'player', message: 'Player milestone: User #4521 reached Diamond rank', time: '8 min ago', icon: Users },
  { id: 4, type: 'purchase', message: 'Purchase completed: Battle Pass Season 12', time: '12 min ago', icon: CreditCard },
  { id: 5, type: 'security', message: 'Security threat blocked: Cheat attempt detected', time: '15 min ago', icon: Shield },
  { id: 6, type: 'creator', message: 'Content creator live: Ninja started streaming', time: '18 min ago', icon: Video },
  { id: 7, type: 'event', message: 'Event challenge completed: 10K players finished', time: '22 min ago', icon: Flame },
  { id: 8, type: 'viewership', message: 'Record viewership: 18.5M concurrent viewers', time: '25 min ago', icon: TrendingUp },
];

export default function GamingEsportsCommandCenter() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [currentTime, setCurrentTime] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

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

  const renderTrendIndicator = (trend: string) => {
    const isPositive = trend.includes('+');
    return (
      <View style={[styles.trendIndicator, isPositive ? styles.trendUp : styles.trendDown]}>
        {isPositive ? <ArrowUpRight size={12} color={THEME.neonGreen} /> : <ArrowDownRight size={12} color={THEME.red} />}
        <Text style={[styles.trendText, { color: isPositive ? THEME.neonGreen : THEME.red }]}>{trend}</Text>
      </View>
    );
  };

  const renderKPICard = (label: string, value: string, trend: string, forecast: string, color: string) => (
    <BlurView key={label} intensity={20} tint="dark" style={styles.kpiCard}>
      <Text style={styles.kpiLabel}>{label}</Text>
      <Text style={[styles.kpiValue, { color }]}>{value}</Text>
      <View style={styles.kpiTrends}>
        {renderTrendIndicator(trend)}
        <Text style={styles.kpiForecast}>Forecast: {forecast}</Text>
      </View>
    </BlurView>
  );

  const renderAgentCard = (agent: typeof AI_GAMING_AGENTS[0]) => {
    const Icon = agent.icon;
    return (
      <Animated.View key={agent.id} entering={FadeInUp.springify()} style={styles.agentCard}>
        <BlurView intensity={20} tint="dark" style={styles.agentCardBlur}>
          <View style={styles.agentHeader}>
            <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}>
              <Icon size={24} color={agent.color} />
            </View>
            <View style={styles.agentInfo}>
              <Text style={styles.agentName}>{agent.name}</Text>
              <Text style={styles.agentRole}>{agent.role}</Text>
            </View>
            <View style={[styles.agentStatus, { backgroundColor: agent.color + '30' }]}>
              <Text style={[styles.agentStatusText, { color: agent.color }]}>{agent.status.toUpperCase()}</Text>
            </View>
          </View>
          <View style={styles.agentMetrics}>
            {Object.entries(agent.metrics).map(([key, value]) => (
              <View key={key} style={styles.agentMetric}>
                <Text style={styles.agentMetricLabel}>{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
                <Text style={[styles.agentMetricValue, { color: agent.color }]}>{value}</Text>
              </View>
            ))}
          </View>
          <View style={styles.agentResponsibilities}>
            <Text style={styles.agentResponsibilitiesTitle}>Responsibilities</Text>
            {agent.responsibilities.map((resp, idx) => (
              <Text key={idx} style={styles.agentResponsibility}>• {resp}</Text>
            ))}
          </View>
        </BlurView>
      </Animated.View>
    );
  };

  const renderInsightCard = (insight: typeof AI_INSIGHTS[0]) => (
    <Animated.View key={insight.type} entering={FadeInUp.springify()} style={styles.insightCard}>
      <BlurView intensity={20} tint="dark" style={styles.insightCardBlur}>
        <View style={styles.insightHeader}>
          <View style={[styles.insightIndicator, { backgroundColor: insight.color }]} />
          <Text style={styles.insightTitle}>{insight.title}</Text>
          <View style={[styles.insightImpact, { backgroundColor: insight.color + '30' }]}>
            <Text style={[styles.insightImpactText, { color: insight.color }]}>{insight.impact}</Text>
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

  const renderActivityItem = (activity: typeof ACTIVITY_FEED[0]) => {
    const Icon = activity.icon;
    return (
      <View key={activity.id} style={styles.activityItem}>
        <View style={styles.activityIcon}>
          <Icon size={16} color={THEME.neonCyan} />
        </View>
        <View style={styles.activityContent}>
          <Text style={styles.activityMessage}>{activity.message}</Text>
          <Text style={styles.activityTime}>{activity.time}</Text>
        </View>
      </View>
    );
  };

  const renderSidebar = () => (
    <View style={[styles.sidebar, { width: sidebarOpen ? 280 : 0 }]}>
      <ScrollView style={styles.sidebarContent}>
        {NAVIGATION_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.sidebarItem, isActive && styles.sidebarItemActive]}
              onPress={() => {
                setActiveSection(item.id);
                if (item.route !== '/ai-agent/gaming-esports/gaming-esports-command-center') {
                  router.push(item.route as any);
                }
                setSidebarOpen(false);
              }}
            >
              <Icon size={20} color={isActive ? THEME.neonCyan : THEME.textMuted} />
              <Text style={[styles.sidebarItemText, isActive && { color: THEME.neonCyan }]}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: THEME.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSidebarOpen(!sidebarOpen)} style={styles.menuButton}>
          {sidebarOpen ? <X size={24} color={THEME.text} /> : <Menu size={24} color={THEME.text} />}
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerTitle}>
            <Gamepad2 size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Gaming & Esports AI Command Center</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Sidebar */}
      {renderSidebar()}

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Executive KPI Bar */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <LayoutDashboard size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Executive KPIs</Text>
          </View>

          {/* Player KPIs */}
          <Text style={styles.kpiCategory}>Player KPIs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll}>
            {renderKPICard('Monthly Active Players', EXECUTIVE_KPIS.player.monthlyActivePlayers.value, EXECUTIVE_KPIS.player.monthlyActivePlayers.trend, EXECUTIVE_KPIS.player.monthlyActivePlayers.forecast, THEME.neonCyan)}
            {renderKPICard('Daily Active Players', EXECUTIVE_KPIS.player.dailyActivePlayers.value, EXECUTIVE_KPIS.player.dailyActivePlayers.trend, EXECUTIVE_KPIS.player.dailyActivePlayers.forecast, THEME.neonCyan)}
            {renderKPICard('Concurrent Players', EXECUTIVE_KPIS.player.concurrentPlayers.value, EXECUTIVE_KPIS.player.concurrentPlayers.trend, EXECUTIVE_KPIS.player.concurrentPlayers.forecast, THEME.neonCyan)}
            {renderKPICard('Player Retention', EXECUTIVE_KPIS.player.playerRetention.value, EXECUTIVE_KPIS.player.playerRetention.trend, EXECUTIVE_KPIS.player.playerRetention.forecast, THEME.neonGreen)}
            {renderKPICard('Session Duration', EXECUTIVE_KPIS.player.sessionDuration.value, EXECUTIVE_KPIS.player.sessionDuration.trend, EXECUTIVE_KPIS.player.sessionDuration.forecast, THEME.electricPurple)}
          </ScrollView>

          {/* Revenue KPIs */}
          <Text style={styles.kpiCategory}>Revenue KPIs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll}>
            {renderKPICard('Total Revenue', EXECUTIVE_KPIS.revenue.totalRevenue.value, EXECUTIVE_KPIS.revenue.totalRevenue.trend, EXECUTIVE_KPIS.revenue.totalRevenue.forecast, THEME.neonGreen)}
            {renderKPICard('In-Game Purchases', EXECUTIVE_KPIS.revenue.inGamePurchases.value, EXECUTIVE_KPIS.revenue.inGamePurchases.trend, EXECUTIVE_KPIS.revenue.inGamePurchases.forecast, THEME.neonGreen)}
            {renderKPICard('Battle Pass Revenue', EXECUTIVE_KPIS.revenue.battlePassRevenue.value, EXECUTIVE_KPIS.revenue.battlePassRevenue.trend, EXECUTIVE_KPIS.revenue.battlePassRevenue.forecast, THEME.neonGreen)}
            {renderKPICard('Marketplace Revenue', EXECUTIVE_KPIS.revenue.marketplaceRevenue.value, EXECUTIVE_KPIS.revenue.marketplaceRevenue.trend, EXECUTIVE_KPIS.revenue.marketplaceRevenue.forecast, THEME.neonGreen)}
            {renderKPICard('Sponsorship Revenue', EXECUTIVE_KPIS.revenue.sponsorshipRevenue.value, EXECUTIVE_KPIS.revenue.sponsorshipRevenue.trend, EXECUTIVE_KPIS.revenue.sponsorshipRevenue.forecast, THEME.neonGreen)}
          </ScrollView>

          {/* Esports KPIs */}
          <Text style={styles.kpiCategory}>Esports KPIs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll}>
            {renderKPICard('Active Tournaments', EXECUTIVE_KPIS.esports.activeTournaments.value, EXECUTIVE_KPIS.esports.activeTournaments.trend, EXECUTIVE_KPIS.esports.activeTournaments.forecast, THEME.magenta)}
            {renderKPICard('Live Viewers', EXECUTIVE_KPIS.esports.liveViewers.value, EXECUTIVE_KPIS.esports.liveViewers.trend, EXECUTIVE_KPIS.esports.liveViewers.forecast, THEME.magenta)}
            {renderKPICard('Prize Pool Value', EXECUTIVE_KPIS.esports.prizePoolValue.value, EXECUTIVE_KPIS.esports.prizePoolValue.trend, EXECUTIVE_KPIS.esports.prizePoolValue.forecast, THEME.magenta)}
            {renderKPICard('Team Participation', EXECUTIVE_KPIS.esports.teamParticipation.value, EXECUTIVE_KPIS.esports.teamParticipation.trend, EXECUTIVE_KPIS.esports.teamParticipation.forecast, THEME.magenta)}
            {renderKPICard('Match Completion Rate', EXECUTIVE_KPIS.esports.matchCompletionRate.value, EXECUTIVE_KPIS.esports.matchCompletionRate.trend, EXECUTIVE_KPIS.esports.matchCompletionRate.forecast, THEME.neonGreen)}
          </ScrollView>

          {/* Community KPIs */}
          <Text style={styles.kpiCategory}>Community KPIs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll}>
            {renderKPICard('Discord Members', EXECUTIVE_KPIS.community.discordMembers.value, EXECUTIVE_KPIS.community.discordMembers.trend, EXECUTIVE_KPIS.community.discordMembers.forecast, THEME.electricPurple)}
            {renderKPICard('Social Engagement', EXECUTIVE_KPIS.community.socialEngagement.value, EXECUTIVE_KPIS.community.socialEngagement.trend, EXECUTIVE_KPIS.community.socialEngagement.forecast, THEME.electricPurple)}
            {renderKPICard('Community Growth', EXECUTIVE_KPIS.community.communityGrowth.value, EXECUTIVE_KPIS.community.communityGrowth.trend, EXECUTIVE_KPIS.community.communityGrowth.forecast, THEME.neonGreen)}
            {renderKPICard('Creator Activity', EXECUTIVE_KPIS.community.creatorActivity.value, EXECUTIVE_KPIS.community.creatorActivity.trend, EXECUTIVE_KPIS.community.creatorActivity.forecast, THEME.electricPurple)}
            {renderKPICard('Sentiment Score', EXECUTIVE_KPIS.community.sentimentScore.value, EXECUTIVE_KPIS.community.sentimentScore.trend, EXECUTIVE_KPIS.community.sentimentScore.forecast, THEME.neonGreen)}
          </ScrollView>

          {/* AI KPIs */}
          <Text style={styles.kpiCategory}>AI KPIs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll}>
            {renderKPICard('AI Moderation Actions', EXECUTIVE_KPIS.ai.aiModerationActions.value, EXECUTIVE_KPIS.ai.aiModerationActions.trend, EXECUTIVE_KPIS.ai.aiModerationActions.forecast, THEME.neonCyan)}
            {renderKPICard('Fraud Prevention Events', EXECUTIVE_KPIS.ai.fraudPreventionEvents.value, EXECUTIVE_KPIS.ai.fraudPreventionEvents.trend, EXECUTIVE_KPIS.ai.fraudPreventionEvents.forecast, THEME.red)}
            {renderKPICard('Match Predictions', EXECUTIVE_KPIS.ai.matchPredictions.value, EXECUTIVE_KPIS.ai.matchPredictions.trend, EXECUTIVE_KPIS.ai.matchPredictions.forecast, THEME.neonCyan)}
            {renderKPICard('Engagement Optimization', EXECUTIVE_KPIS.ai.engagementOptimization.value, EXECUTIVE_KPIS.ai.engagementOptimization.trend, EXECUTIVE_KPIS.ai.engagementOptimization.forecast, THEME.neonGreen)}
            {renderKPICard('Revenue Impact', EXECUTIVE_KPIS.ai.revenueImpact.value, EXECUTIVE_KPIS.ai.revenueImpact.trend, EXECUTIVE_KPIS.ai.revenueImpact.forecast, THEME.neonGreen)}
          </ScrollView>
        </Animated.View>

        {/* AI Gaming Agents */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Brain size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>AI Gaming Agents</Text>
          </View>
          <View style={styles.agentsContainer}>
            {AI_GAMING_AGENTS.map((agent) => renderAgentCard(agent))}
          </View>
        </Animated.View>

        {/* AI Insights Center */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Brain size={24} color={THEME.neonCyan} />
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
            {ACTIVITY_FEED.map((activity) => renderActivityItem(activity))}
          </BlurView>
        </Animated.View>

        {/* Chief Gaming Officer Command Center */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <LayoutDashboard size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Chief Gaming Officer Command Center</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.cgoCard}>
            <View style={styles.cgoGrid}>
              <View style={styles.cgoMetric}>
                <Text style={styles.cgoLabel}>Monthly Active Players</Text>
                <Text style={[styles.cgoValue, { color: THEME.neonCyan }]}>120M</Text>
              </View>
              <View style={styles.cgoMetric}>
                <Text style={styles.cgoLabel}>Concurrent Players</Text>
                <Text style={[styles.cgoValue, { color: THEME.neonGreen }]}>8.5M</Text>
              </View>
              <View style={styles.cgoMetric}>
                <Text style={styles.cgoLabel}>Revenue</Text>
                <Text style={[styles.cgoValue, { color: THEME.amber }]}>$5.4B</Text>
              </View>
              <View style={styles.cgoMetric}>
                <Text style={styles.cgoLabel}>Live Viewers</Text>
                <Text style={[styles.cgoValue, { color: THEME.magenta }]}>210M</Text>
              </View>
              <View style={styles.cgoMetric}>
                <Text style={styles.cgoLabel}>Retention Rate</Text>
                <Text style={[styles.cgoValue, { color: THEME.electricPurple }]}>82%</Text>
              </View>
              <View style={styles.cgoMetric}>
                <Text style={styles.cgoLabel}>AI Revenue Impact</Text>
                <Text style={[styles.cgoValue, { color: THEME.neonCyan }]}>+$420M</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>
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
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: THEME.border,
  },
  menuButton: {
    padding: 8,
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: THEME.text,
  },
  timeText: {
    fontSize: 12,
    color: THEME.textMuted,
    marginTop: 4,
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 73,
    bottom: 0,
    backgroundColor: THEME.card,
    borderRightWidth: 1,
    borderRightColor: THEME.border,
    zIndex: 100,
    overflow: 'hidden',
  },
  sidebarContent: {
    padding: 16,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
  },
  sidebarItemActive: {
    backgroundColor: THEME.neonCyan + '10',
  },
  sidebarItemText: {
    fontSize: 14,
    color: THEME.textMuted,
    fontWeight: '500',
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
  kpiCategory: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginTop: 16,
    marginBottom: 12,
  },
  kpiScroll: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  kpiCard: {
    width: 160,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
    marginRight: 12,
  },
  kpiLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  kpiTrends: {
    gap: 4,
  },
  trendIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendUp: {},
  trendDown: {},
  trendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  kpiForecast: {
    fontSize: 10,
    color: THEME.textMuted,
  },
  agentsContainer: {
    gap: 12,
  },
  agentCard: {
    borderRadius: 12,
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
    marginBottom: 12,
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
    marginBottom: 4,
  },
  agentRole: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  agentStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  agentStatusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  agentMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  agentMetric: {
    flex: 1,
  },
  agentMetricLabel: {
    fontSize: 10,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  agentMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  agentResponsibilities: {
    backgroundColor: THEME.card,
    padding: 12,
    borderRadius: 8,
  },
  agentResponsibilitiesTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 8,
  },
  agentResponsibility: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
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
  insightIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginRight: 12,
  },
  insightTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
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
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: THEME.border,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: THEME.neonCyan + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    fontSize: 13,
    color: THEME.text,
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 11,
    color: THEME.textMuted,
  },
  cgoCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  cgoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  cgoMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  cgoLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  cgoValue: {
    fontSize: 20,
    fontWeight: '700',
  },
});
