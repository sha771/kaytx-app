 
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Switch,
  Alert,
} from 'react-native';
import {
  Phone,
  DollarSign,
  TrendingUp,
  Target,
  Clock,
  Users,
  CircleCheck,
  Activity,
  ChartBar,
  CircleAlert,
  PhoneCall,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Bell,
  Play,
  FileText,
  ShieldCheck,
  Globe,
  Signal,
  PlugZap,
  Shield,
  PhoneOff,
  ArrowLeft,
  Plus,
  Lock,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AIAssistantCapabilityMatrix } from '@/components/AIAssistantCapabilityMatrix';
import { aiNegotiationCapabilities } from '@/constants/aiAssistants';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AIAssistantPlaybook } from '@/components/AIAssistantPlaybook';
import { trpc } from '@/lib/trpc';
import { aiNegotiationPlaybook } from '@/constants/aiAssistantPlaybooks';
import { useRealtimeCalls } from '@/utils/realtimeCallingService';

const { width } = Dimensions.get('window');

export default function AINegotiationDashboard() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { activeCalls, endCall, callToDefault, defaultPhoneNumber } = useRealtimeCalls();
  const totalActiveCalls = activeCalls.length;

  const [showCallButton] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');
  const [liveCallsCount, setLiveCallsCount] = useState(3);
  const [aiAutopilotEnabled, setAiAutopilotEnabled] = useState<boolean>(true);
  const [missionFocus, setMissionFocus] = useState<'revenue' | 'pipeline'>('revenue');

  // tRPC data fetching
  const { data: statsData } = trpc.aiAgents.getStats.useQuery({ category: 'negotiation' });
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();

  const isEnterprise = useMemo(() => {
    return subscription?.plan === 'enterprise' || subscription?.plan === 'professional';
  }, [subscription]);

  const { data: activityData } = trpc.aiAgents.getActivity.useQuery({ category: 'negotiation', limit: 10 });
  // Note: Analytics queries disabled - re-enable when needed
  // const { data: _negotiationAnalytics } = trpc.negotiation.getAnalytics.useQuery({ period: selectedPeriod });
  const { data: deals } = trpc.negotiation.getDeals.useQuery();
  // const { data: _competitorAnalysis } = trpc.negotiation.getCompetitorAnalysis.useQuery();
  // const { data: _objectionHandling } = trpc.negotiation.getObjectionHandling.useQuery();

  const activeDeal = deals || [];
  const activities = activityData?.activities || [];

  const [negotiationSettings, setNegotiationSettings] = useState({
    autoAnswer: false,
    delaySeconds: 8,
    dealScoring: true,
    conversationIntel: true,
    competitorAnalysis: true,
    priceOptimization: true,
    objectionHandling: true,
    closingTactics: true,
  });

  const updateNegotiationSettings = trpc.negotiation.updateSettings.useMutation();

  const handleToggleSetting = async (key: keyof typeof negotiationSettings) => {
    const newValue = !negotiationSettings[key];
    
    // Optimistic update
    setNegotiationSettings(prev => ({ ...prev, [key]: newValue }));

    try {
      await updateNegotiationSettings.mutateAsync({
        [key]: newValue
      });
    } catch (error) {
      console.error(`Failed to update negotiation setting ${key}:`, error);
      // Revert on error
      setNegotiationSettings(prev => ({ ...prev, [key]: !newValue }));
      Alert.alert('Error', `Failed to update ${key}. Please try again.`);
    }
  };

  const handlePeriodChange = (period: 'today' | 'week' | 'month') => {
    setSelectedPeriod(period);
  };

  const handleQuickActionPress = useCallback((route: string) => {
    router.push(route as never);
  }, []);

  const toggleAutopilot = useCallback(() => {
    setAiAutopilotEnabled(prev => !prev);
  }, []);

  /*
  const _onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);
  */

  const handleCallPress = useCallback(() => {
    callToDefault('Prospect', 'voice');
  }, [callToDefault]);

  const handleEndCall = useCallback(() => {
    if (activeCalls.length > 0) {
      endCall(activeCalls[0].id);
    }
  }, [activeCalls, endCall]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCallsCount(prev => Math.max(0, prev + Math.floor(Math.random() * 3 - 1)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const telephonyProviders = useMemo(
    () => [
      {
        id: 'twilio',
        name: 'Twilio Voice',
        status: 'Operational',
        uptime: '99.999%',
        regions: '14 regions',
        latency: '92ms',
        icon: Phone,
        color: '#34C759',
      },
      {
        id: 'whatsapp',
        name: 'Meta WhatsApp',
        status: 'Synced',
        uptime: '99.995%',
        regions: 'Global',
        latency: '108ms',
        icon: PlugZap,
        color: '#FF9500',
      },
      {
        id: 'direct',
        name: 'Direct SIP Core',
        status: (statsData?.activeConnections ?? 0) > 2 ? 'Scaling' : 'Stable',
        uptime: '100%',
        regions: '7 sites',
        latency: '74ms',
        icon: Signal,
        color: '#007AFF',
      },
    ],
    [statsData?.activeConnections],
  );

  const enterpriseAlerts = useMemo(
    () => [
      {
        id: 'alert-1',
        title: 'High-value follow-ups pending',
        detail: '3 deals over $150K awaiting executive review',
        severity: 'high',
      },
      {
        id: 'alert-2',
        title: 'APAC coverage rerouted',
        detail: 'Traffic shifted to Singapore edge due to carrier maintenance',
        severity: 'medium',
      },
      {
        id: 'alert-3',
        title: 'Compliance sync required',
        detail: 'SOC 2 evidence refresh due in 48 hours',
        severity: 'low',
      },
    ],
    [],
  );

  const globalCoverage = useMemo(
    () => [
      { region: 'North America', qps: 328, conversion: 74, saturation: 'Balanced' },
      { region: 'EMEA', qps: 214, conversion: 69, saturation: 'Scaling' },
      { region: 'LATAM', qps: 138, conversion: 65, saturation: 'Green' },
      { region: 'APAC', qps: 256, conversion: 71, saturation: 'Balanced' },
    ],
    [],
  );

  const complianceTasks = useMemo(
    () => [
      { id: 'comp-1', label: 'PCI voice log masking', progress: 78, owner: 'Voice Trust Layer' },
      { id: 'comp-2', label: 'GDPR consent sync', progress: 56, owner: 'Data Fabric' },
      { id: 'comp-3', label: 'WhatsApp opt-in audit', progress: 92, owner: 'Channel Ops' },
    ],
    [],
  );

  const missionMetrics = useMemo(
    () => (
      missionFocus === 'revenue'
        ? [
          { label: 'Forecast', value: statsData?.totalTasks ? `$${((statsData.totalTasks * 1.5) / 10).toFixed(1)}M` : '$5.3M', delta: '+31%', color: '#34C759' },
          { label: 'Enterprise at risk', value: '3 deals', delta: '-2', color: '#FF9500' },
          { label: 'Upsell pipeline', value: statsData?.tasksToday ? `$${(statsData.tasksToday * 0.8).toFixed(1)}M` : '$1.1M', delta: '+12%', color: '#AF52DE' },
        ]
        : [
          { label: 'Active negotiations', value: `${(statsData?.activeConnections ?? 0) + (statsData?.tasksToday ?? 48)}`, delta: '+9%', color: '#007AFF' },
          { label: 'Avg cycle', value: '21 days', delta: '-4 days', color: '#34C759' },
          { label: 'Blocked stakeholders', value: '2', delta: '+1', color: '#FF3B30' },
        ]
    ),
    [missionFocus, statsData],
  );

  const getStatsForPeriod = () => {
    const baseStats = {
      today: {
        deals: { value: statsData?.tasksToday ? Math.round(statsData.tasksToday * 0.05).toString() : '12', change: '+8%', trending: 'up' as const },
        winRate: { value: statsData?.avgSuccessRate ? `${statsData.avgSuccessRate}%` : '75%', change: '+3%', trending: 'up' as const },
        revenue: { value: statsData?.totalTasks ? `$${Math.round(statsData.totalTasks * 0.04)}K` : '$186K', change: '+15%', trending: 'up' as const },
        avgDeal: { value: '$15.5K', change: '+7%', trending: 'up' as const },
        activeCalls: { value: (totalActiveCalls + (statsData?.activeConnections || 0)).toString(), change: 'Live', trending: 'up' as const },
        avgDuration: { value: '18:45', change: '+2m', trending: 'up' as const },
        convRate: { value: '68%', change: '+4%', trending: 'up' as const },
        followUps: { value: '23', change: '+5', trending: 'up' as const },
      },
      week: {
        deals: { value: '84', change: '+18%', trending: 'up' as const },
        winRate: { value: '72%', change: '+5%', trending: 'up' as const },
        revenue: { value: '$1.3M', change: '+23%', trending: 'up' as const },
        avgDeal: { value: '$15.4K', change: '+12%', trending: 'up' as const },
        activeCalls: { value: '57', change: '+12', trending: 'up' as const },
        avgDuration: { value: '19:15', change: '+3m', trending: 'up' as const },
        convRate: { value: '65%', change: '+8%', trending: 'up' as const },
        followUps: { value: '156', change: '+24', trending: 'up' as const },
      },
      month: {
        deals: { value: '342', change: '+26%', trending: 'up' as const },
        winRate: { value: '70%', change: '+7%', trending: 'up' as const },
        revenue: { value: '$5.3M', change: '+31%', trending: 'up' as const },
        avgDeal: { value: '$15.5K', change: '+4%', trending: 'up' as const },
        activeCalls: { value: '234', change: '+42', trending: 'up' as const },
        avgDuration: { value: '18:52', change: '+1m', trending: 'up' as const },
        convRate: { value: '67%', change: '+9%', trending: 'up' as const },
        followUps: { value: '687', change: '+98', trending: 'up' as const },
      },
    };

    const period = baseStats[selectedPeriod];
    return [
      {
        title: 'Autonomous Wins',
        ...period.deals,
        icon: Target,
        color: '#007AFF',
        bgColor: '#007AFF15',
      },
      {
        title: 'Deal Velocity',
        ...period.winRate,
        icon: Award,
        color: '#34C759',
        bgColor: '#34C75915',
      },
      {
        title: 'Revenue Flow',
        ...period.revenue,
        icon: DollarSign,
        color: '#FF9500',
        bgColor: '#FF950015',
      },
      {
        title: 'Closing Delta',
        ...period.avgDeal,
        icon: TrendingUp,
        color: '#AF52DE',
        bgColor: '#AF52DE15',
      },
    ];
  };

  const stats = getStatsForPeriod();

  const recentNegotiations = activities.slice(0, 3);

  const quickActions = [
    { id: '1', title: 'Start Call', icon: Phone, route: '/ai-negotiation/calls', color: '#007AFF' },
    { id: '2', title: 'View Deals', icon: Target, route: '/ai-negotiation/deals', color: '#34C759' },
    { id: '3', title: 'CRM', icon: Users, route: '/ai-negotiation/crm', color: '#FF9500' },
    { id: '4', title: 'Analytics', icon: ChartBar, route: '/ai-negotiation/analytics', color: '#AF52DE' },
    { id: '5', title: 'Scripts', icon: FileText, route: '/ai-negotiation/scripts', color: '#FF2D92' },
    { id: '6', title: 'Training', icon: Play, route: '/ai-negotiation/training', color: '#5856D6' },
  ];

  const aiInsights = [
    {
      type: 'success',
      message: 'Win rate increased by 5% this week - Great momentum!',
      icon: CircleCheck,
      color: '#34C759',
    },
    {
      type: 'warning',
      message: "3 high-value deals need follow-up today - Don&apos;t miss out!",
      icon: CircleAlert,
      color: '#FF9500',
    },
    {
      type: 'info',
      message: 'Best negotiation time: 10-11 AM - Schedule calls accordingly',
      icon: Activity,
      color: '#007AFF',
    },
    {
      type: 'tip',
      message: 'Discount offers under 15% convert 23% better',
      icon: Zap,
      color: '#AF52DE',
    },
  ];

  const performanceMetrics = [
    { label: 'Call to Close', value: '3.2 days', trend: -0.5, color: '#34C759' },
    { label: 'Avg Discount', value: '12.4%', trend: -2.1, color: '#34C759' },
    { label: 'Response Time', value: '1.2 hrs', trend: -0.3, color: '#34C759' },
    { label: 'Satisfaction', value: '4.8/5.0', trend: 0.2, color: '#34C759' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'AI Negotiation',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerRight: () => (
            <View style={styles.headerRight}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => router.push('/ai-negotiation/notifications')}
              >
                <Bell size={20} color={theme.colors.primary} />
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>2</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => router.push('/ai-negotiation/setup')}
              >
                <Activity size={20} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Premium Negotiation Header */}
        <View style={[styles.premiumHeader, { paddingTop: insets.top + 20, backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={theme.colors.text} />
            </TouchableOpacity>
            <Text style={[styles.premiumTitle, { color: theme.colors.text }]}>Deal Core</Text>
            <TouchableOpacity
              style={[
                styles.plusBtn,
                { backgroundColor: isEnterprise ? theme.colors.primary : theme.colors.secondaryText },
              ]}
              onPress={() => {
                if (!isEnterprise) {
                  router.push('/enterprise/billing');
                  return;
                }
                router.push('/ai-negotiation/phone-numbers');
              }}
            >
              {isEnterprise ? <Plus size={20} color="#fff" /> : <Lock size={20} color="#fff" />}
            </TouchableOpacity>
          </View>
          <View style={styles.headerMetrics}>
            <View style={styles.hMetric}>
              <Text style={[styles.hMetricVal, { color: theme.colors.text }]}>
                {statsData?.activeConnections ?? 48}
              </Text>
              <Text style={[styles.hMetricLab, { color: theme.colors.secondaryText }]}>Live Channels</Text>
            </View>
            <View style={styles.hMetricDivider} />
            <View style={styles.hMetric}>
              <Text style={[styles.hMetricVal, { color: '#34C759' }]}>
                ${statsData?.totalTasks ? ((statsData.totalTasks * 1500) / 1000000).toFixed(1) + 'M' : '5.3M'}
              </Text>
              <Text style={[styles.hMetricLab, { color: theme.colors.secondaryText }]}>Negotiated Value</Text>
            </View>
            <View style={styles.hMetricDivider} />
            <View style={styles.hMetric}>
              <Text style={[styles.hMetricVal, { color: theme.colors.text }]}>
                {statsData?.avgSuccessRate ?? 94}%
              </Text>
              <Text style={[styles.hMetricLab, { color: theme.colors.secondaryText }]}>Autonomy</Text>
            </View>
          </View>
        </View>

        <View style={styles.periodSelector}>
          {(['today', 'week', 'month'] as const).map(period => (
            <TouchableOpacity
              key={period}
              style={[styles.periodButton, selectedPeriod === period && { backgroundColor: theme.colors.primary }]}
              onPress={() => handlePeriodChange(period)}
              testID={`negotiation-period-${period}`}
            >
              <Text
                style={[
                  styles.periodText,
                  { color: selectedPeriod === period ? 'white' : theme.colors.secondaryText },
                ]}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {
          selectedPeriod === 'today' && (
            <View style={[styles.liveCallsBanner, { backgroundColor: theme.colors.cardBackground }]}
              testID="negotiation-live-banner"
            >
              <View style={styles.liveIndicator}>
                <View style={[styles.livePulse, { backgroundColor: '#FF3B30' }]} />
                <Text style={[styles.liveText, { color: theme.colors.text }]}>Live</Text>
              </View>
              <Text style={[styles.liveCallsText, { color: theme.colors.text }]}>{activeCalls.length + liveCallsCount} Active Negotiations</Text>
              <TouchableOpacity
                style={[styles.liveButton, { backgroundColor: theme.colors.primary }]}
                onPress={() => router.push('/ai-negotiation/calls')}
              >
                <Text style={styles.liveButtonText}>View All</Text>
              </TouchableOpacity>
            </View>
          )
        }

        <View style={styles.statsGrid}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trending === 'up' ? ArrowUpRight : ArrowDownRight;
            const isLive = Boolean((stat as { isLive?: boolean }).isLive);
            return (
              <TouchableOpacity
                key={index}
                style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}
                activeOpacity={0.7}
              >
                <View style={styles.statCardHeader}>
                  <View style={[styles.statIcon, { backgroundColor: stat.bgColor }]}>
                    <Icon size={22} color={stat.color} strokeWidth={2.5} />
                  </View>
                  {isLive && (
                    <View style={styles.liveBadge}>
                      <View style={styles.liveDotSmall} />
                    </View>
                  )}
                </View>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
                <Text style={[styles.statTitle, { color: theme.colors.secondaryText }]}>{stat.title}</Text>
                <View style={styles.statChange}>
                  {!isLive && <TrendIcon size={14} color={stat.trending === 'up' ? '#34C759' : '#FF3B30'} strokeWidth={2.5} />}
                  <Text
                    style={[
                      styles.statChangeText,
                      { color: isLive ? theme.colors.primary : stat.trending === 'up' ? '#34C759' : '#FF3B30' },
                    ]}
                  >
                    {stat.change}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Mission Control</Text>
            <View style={styles.missionTabs}>
              {(['revenue', 'pipeline'] as const).map(option => (
                <TouchableOpacity
                  key={option}
                  onPress={() => setMissionFocus(option)}
                  style={[styles.missionTab, missionFocus === option && { backgroundColor: theme.colors.primary }]}
                  testID={`mission-tab-${option}`}
                >
                  <Text style={{ color: missionFocus === option ? '#fff' : theme.colors.secondaryText, fontWeight: '700' }}>
                    {option === 'revenue' ? 'Revenue' : 'Pipeline'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.autopilotCard}>
            <View>
              <Text style={[styles.autopilotTitle, { color: theme.colors.text }]}>AI Autopilot</Text>
              <Text style={[styles.autopilotSubtitle, { color: theme.colors.secondaryText }]}>Routes live traffic across phone, WhatsApp, and SIP bridges</Text>
            </View>
            <Switch value={aiAutopilotEnabled} onValueChange={toggleAutopilot} trackColor={{ false: '#767577', true: theme.colors.primary }} />
          </View>
          <View style={styles.missionMetrics}>
            {missionMetrics.map(metric => (
              <View key={metric.label} style={[styles.missionMetricCard, { backgroundColor: theme.colors.cardBackground }]}
                testID={`mission-metric-${metric.label}`}
              >
                <Text style={[styles.missionMetricValue, { color: theme.colors.text }]}>{metric.value}</Text>
                <Text style={[styles.missionMetricLabel, { color: theme.colors.secondaryText }]}>{metric.label}</Text>
                <Text style={[styles.missionMetricDelta, { color: metric.color }]}>{metric.delta}</Text>
              </View>
            ))}
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.telephonyScroll}
            testID="telephony-grid"
          >
            {telephonyProviders.map(provider => {
              const Icon = provider.icon;
              return (
                <View key={provider.id} style={[styles.telephonyCard, { backgroundColor: theme.colors.cardBackground }]}
                >
                  <View style={[styles.telephonyIcon, { backgroundColor: `${provider.color}15` }]}>
                    <Icon size={20} color={provider.color} />
                  </View>
                  <Text style={[styles.telephonyName, { color: theme.colors.text }]}>{provider.name}</Text>
                  <Text style={[styles.telephonyStatus, { color: provider.color }]}>{provider.status}</Text>
                  <Text style={[styles.telephonyMeta, { color: theme.colors.secondaryText }]}>{provider.regions}</Text>
                  <Text style={[styles.telephonyMeta, { color: theme.colors.secondaryText }]}>{provider.uptime} • {provider.latency}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Negotiation Intelligence</Text>
          <View style={[styles.intelligenceCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.intelligenceOption}>
              <View style={styles.intelligenceLeft}>
                <View style={styles.premiumLabelRow}>
                  <Text style={[styles.intelligenceTitle, { color: theme.colors.text }]}>Auto-Answer Calls</Text>
                  {!isEnterprise && <Lock size={12} color={theme.colors.secondaryText} />}
                </View>
                <Text style={[styles.intelligenceSubtitle, { color: theme.colors.secondaryText }]}>AI negotiates immediately</Text>
              </View>
              <Switch
                value={isEnterprise ? negotiationSettings.autoAnswer : false}
                onValueChange={(v) => {
                  if (!isEnterprise) {
                    router.push('/enterprise/billing');
                    return;
                  }
                  setNegotiationSettings(prev => ({ ...prev, autoAnswer: v }));
                }}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={(isEnterprise && negotiationSettings.autoAnswer) ? '#fff' : '#f4f3f4'}
                disabled={!isEnterprise}
              />
            </View>

            {!negotiationSettings.autoAnswer && (
              <View style={styles.intelligenceOption}>
                <View style={styles.intelligenceLeft}>
                  <Text style={[styles.intelligenceTitle, { color: theme.colors.text }]}>Wait Time: {negotiationSettings.delaySeconds}s</Text>
                  <Text style={[styles.intelligenceSubtitle, { color: theme.colors.secondaryText }]}>Company has {negotiationSettings.delaySeconds}s to answer before AI negotiates</Text>
                </View>
              </View>
            )}

            <View style={styles.intelligenceOption}>
              <View style={styles.intelligenceLeft}>
                <Text style={[styles.intelligenceTitle, { color: theme.colors.text }]}>AI Deal Scoring</Text>
                <Text style={[styles.intelligenceSubtitle, { color: theme.colors.secondaryText }]}>Real-time probability & value prediction</Text>
              </View>
              <Switch
                value={negotiationSettings.dealScoring}
                onValueChange={() => handleToggleSetting('dealScoring')}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={negotiationSettings.dealScoring ? '#fff' : '#f4f3f4'}
              />
            </View>

            <View style={styles.intelligenceOption}>
              <View style={styles.intelligenceLeft}>
                <Text style={[styles.intelligenceTitle, { color: theme.colors.text }]}>Conversation Intelligence</Text>
                <Text style={[styles.intelligenceSubtitle, { color: theme.colors.secondaryText }]}>Detect buying signals & objections</Text>
              </View>
              <Switch
                value={negotiationSettings.conversationIntel}
                onValueChange={() => handleToggleSetting('conversationIntel')}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={negotiationSettings.conversationIntel ? '#fff' : '#f4f3f4'}
              />
            </View>

            <View style={styles.intelligenceOption}>
              <View style={styles.intelligenceLeft}>
                <Text style={[styles.intelligenceTitle, { color: theme.colors.text }]}>Competitor Analysis</Text>
                <Text style={[styles.intelligenceSubtitle, { color: theme.colors.secondaryText }]}>Track mentions & position accordingly</Text>
              </View>
              <Switch
                value={negotiationSettings.competitorAnalysis}
                onValueChange={() => handleToggleSetting('competitorAnalysis')}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={negotiationSettings.competitorAnalysis ? '#fff' : '#f4f3f4'}
              />
            </View>

            <View style={styles.intelligenceOption}>
              <View style={styles.intelligenceLeft}>
                <Text style={[styles.intelligenceTitle, { color: theme.colors.text }]}>Dynamic Price Optimization</Text>
                <Text style={[styles.intelligenceSubtitle, { color: theme.colors.secondaryText }]}>AI adjusts pricing within guidelines</Text>
              </View>
              <Switch
                value={negotiationSettings.priceOptimization}
                onValueChange={() => handleToggleSetting('priceOptimization')}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={negotiationSettings.priceOptimization ? '#fff' : '#f4f3f4'}
              />
            </View>

            <View style={styles.intelligenceOption}>
              <View style={styles.intelligenceLeft}>
                <Text style={[styles.intelligenceTitle, { color: theme.colors.text }]}>Objection Handling</Text>
                <Text style={[styles.intelligenceSubtitle, { color: theme.colors.secondaryText }]}>Auto-respond with proven frameworks</Text>
              </View>
              <Switch
                value={negotiationSettings.objectionHandling}
                onValueChange={() => handleToggleSetting('objectionHandling')}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={negotiationSettings.objectionHandling ? '#fff' : '#f4f3f4'}
              />
            </View>

            <View style={styles.intelligenceOption}>
              <View style={styles.intelligenceLeft}>
                <Text style={[styles.intelligenceTitle, { color: theme.colors.text }]}>Closing Tactics</Text>
                <Text style={[styles.intelligenceSubtitle, { color: theme.colors.secondaryText }]}>Use scarcity, urgency & social proof</Text>
              </View>
              <Switch
                value={negotiationSettings.closingTactics}
                onValueChange={() => handleToggleSetting('closingTactics')}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={negotiationSettings.closingTactics ? '#fff' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Metrics</Text>
          <View style={styles.metricsRow}>
            {performanceMetrics.map((metric, index) => (
              <View key={index} style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}
                testID={`performance-metric-${index}`}
              >
                <Text style={[styles.metricValue, { color: theme.colors.text }]}>{metric.value}</Text>
                <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>{metric.label}</Text>
                <Text style={[styles.metricTrend, { color: metric.color }]}>
                  {metric.trend > 0 ? '↑' : '↓'} {Math.abs(metric.trend)}{metric.label.includes('%') ? '%' : ''}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
          </View>
          <View style={styles.actionsGrid}>
            {quickActions.map(action => {
              const Icon = action.icon;
              return (
                <TouchableOpacity
                  key={action.id}
                  style={[styles.actionCard, { backgroundColor: theme.colors.cardBackground }]}
                  onPress={() => handleQuickActionPress(action.route)}
                  testID={`negotiation-quick-action-${action.id}`}
                >
                  <View style={[styles.actionIcon, { backgroundColor: `${action.color}20` }]}>
                    <Icon size={24} color={action.color} />
                  </View>
                  <Text style={[styles.actionTitle, { color: theme.colors.text }]}>{action.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Global Coverage</Text>
          <View style={styles.coverageGrid}>
            {globalCoverage.map(region => (
              <View key={region.region} style={[styles.coverageCard, { backgroundColor: theme.colors.cardBackground }]}
                testID={`coverage-card-${region.region}`}
              >
                <View style={styles.coverageHeader}>
                  <Globe size={18} color={theme.colors.primary} />
                  <Text style={[styles.coverageRegion, { color: theme.colors.text }]}>{region.region}</Text>
                </View>
                <Text style={[styles.coverageValue, { color: theme.colors.text }]}>{region.qps} qps</Text>
                <Text style={[styles.coverageLabel, { color: theme.colors.secondaryText }]}>Conversion {region.conversion}%</Text>
                <Text style={[styles.coverageSaturation, { color: region.saturation === 'Scaling' ? '#FF9500' : '#34C759' }]}>{region.saturation}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text>
          {aiInsights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <View
                key={index}
                style={[styles.insightCard, { backgroundColor: theme.colors.cardBackground, borderLeftColor: insight.color }]}
              >
                <Icon size={20} color={insight.color} />
                <Text style={[styles.insightText, { color: theme.colors.text }]}>{insight.message}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Enterprise Alerts</Text>
          {enterpriseAlerts.map(alert => (
            <View
              key={alert.id}
              style={[styles.alertCard, { backgroundColor: theme.colors.cardBackground }]}
              testID={`enterprise-alert-${alert.id}`}
            >
              <View style={[styles.alertSeverityDot, { backgroundColor: alert.severity === 'high' ? '#FF3B30' : alert.severity === 'medium' ? '#FF9500' : '#34C759' }]} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.alertTitle, { color: theme.colors.text }]}>{alert.title}</Text>
                <Text style={[styles.alertDetail, { color: theme.colors.secondaryText }]}>{alert.detail}</Text>
              </View>
              <Shield size={18} color={theme.colors.secondaryText} />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Trust & Compliance</Text>
          <View style={styles.complianceGrid}>
            {complianceTasks.map(task => (
              <View key={task.id} style={[styles.complianceCard, { backgroundColor: theme.colors.cardBackground }]}>
                <View style={styles.complianceHeader}>
                  <ShieldCheck size={18} color={theme.colors.primary} />
                  <Text style={[styles.complianceOwner, { color: theme.colors.secondaryText }]}>{task.owner}</Text>
                </View>
                <Text style={[styles.complianceLabel, { color: theme.colors.text }]}>{task.label}</Text>
                <View style={[styles.dealProgress, { backgroundColor: `${theme.colors.text}10` }]}
                  testID={`compliance-progress-${task.id}`}
                >
                  <View style={[styles.progressBar, { backgroundColor: theme.colors.primary, width: `${task.progress}%` }]} />
                </View>
                <Text style={[styles.complianceProgressValue, { color: theme.colors.secondaryText }]}>{task.progress}% complete</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ErrorBoundary fallbackMessage="Unable to load negotiation readiness" testID="negotiation-capability-boundary">
            <AIAssistantCapabilityMatrix
              title="Negotiation Capability Matrix"
              capabilities={aiNegotiationCapabilities}
              testID="negotiation-capability-matrix"
            />
          </ErrorBoundary>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Negotiations</Text>
            <TouchableOpacity onPress={() => router.push('/ai-negotiation/calls')}>
              <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          {recentNegotiations.map((item: any) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.negotiationCard, { backgroundColor: theme.colors.cardBackground }]}
              onPress={() => router.push('/ai-negotiation/calls')}
            >
              <View style={styles.negotiationHeader}>
                <View>
                  <Text style={[styles.negotiationName, { color: theme.colors.text }]}>{item.customerName}</Text>
                  <Text style={[styles.negotiationCompany, { color: theme.colors.secondaryText }]}>{item.customerCompany}</Text>
                </View>
                <View
                  style={[styles.statusBadge, { backgroundColor: item.status === 'active' ? '#34C75920' : item.status === 'completed' ? '#007AFF20' : '#FF950020' }]}
                >
                  <Text
                    style={[styles.statusText, { color: item.status === 'active' ? '#34C759' : item.status === 'completed' ? '#007AFF' : '#FF9500' }]}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
              <View style={styles.negotiationDetails}>
                <View style={styles.detailItem}>
                  <DollarSign size={14} color={theme.colors.secondaryText} />
                  <Text style={[styles.detailText, { color: theme.colors.secondaryText }]}>${item.dealValue.toLocaleString()}</Text>
                </View>
                {item.duration && (
                  <View style={styles.detailItem}>
                    <Clock size={14} color={theme.colors.secondaryText} />
                    <Text style={[styles.detailText, { color: theme.colors.secondaryText }]}>{item.duration}</Text>
                  </View>
                )}
                <View style={styles.detailItem}>
                  <Target size={14} color={theme.colors.secondaryText} />
                  <Text style={[styles.detailText, { color: theme.colors.secondaryText }]}>{item.priority}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Deals in Progress</Text>
            <TouchableOpacity onPress={() => router.push('/ai-negotiation/deals')}>
              <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          {activeDeal.map((deal: any) => (
            <TouchableOpacity
              key={deal.id}
              style={[styles.dealCard, { backgroundColor: theme.colors.cardBackground }]}
              onPress={() => router.push('/ai-negotiation/deals')}
            >
              <View style={styles.dealHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.dealTitle, { color: theme.colors.text }]}>{deal.title}</Text>
                  <Text style={[styles.dealCompany, { color: theme.colors.secondaryText }]}>{deal.customerCompany}</Text>
                </View>
                <View>
                  <Text style={[styles.dealValue, { color: theme.colors.text }]}>${deal.value.toLocaleString()}</Text>
                  <Text style={[styles.dealProbability, { color: '#34C759' }]}>{deal.probability}% likely</Text>
                </View>
              </View>
              <View style={[styles.dealProgress, { backgroundColor: `${theme.colors.text}10` }]}
                testID={`deal-progress-${deal.id}`}
              >
                <View style={[styles.progressBar, { backgroundColor: theme.colors.primary, width: `${deal.probability}%` }]} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <ErrorBoundary fallbackMessage="Unable to load AI Negotiation blueprint" testID="negotiation-playbook-boundary">
            <AIAssistantPlaybook
              title="Enterprise Playbook"
              subtitle="Blueprint of every negotiation surface, automation, and safeguard"
              stats={aiNegotiationPlaybook.heroStats}
              pages={aiNegotiationPlaybook.pages}
              testID="negotiation-playbook"
            />
          </ErrorBoundary>
        </View>

        {/* Real-time Call Status */}
        {
          activeCalls.length > 0 && (
            <View style={[styles.callStatusBar, { backgroundColor: '#34C759' }]}>
              <View style={styles.callStatusContent}>
                <PhoneCall size={16} color="white" />
                <Text style={styles.callStatusText}>
                  Call Active: {activeCalls[0].customerName} ({Math.floor(activeCalls[0].duration / 60)}:{String(activeCalls[0].duration % 60).padStart(2, '0')})
                </Text>
              </View>
              <TouchableOpacity
                style={styles.endCallButton}
                onPress={handleEndCall}
              >
                <PhoneOff size={16} color="white" />
              </TouchableOpacity>
            </View>
          )
        }
      </ScrollView>

      {/* Floating Call Button */}
      {
        showCallButton && activeCalls.length === 0 && (
          <TouchableOpacity
            style={[styles.floatingCallButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleCallPress}
            activeOpacity={0.9}
          >
            <PhoneCall size={28} color="white" strokeWidth={2.5} />
            <Text style={styles.floatingCallText}>Call {defaultPhoneNumber}</Text>
          </TouchableOpacity>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginRight: 8,
  },
  headerButton: {
    padding: 8,
    position: 'relative' as const,
  },
  notificationBadge: {
    position: 'absolute' as const,
    top: 6,
    right: 6,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  notificationBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 20,
  },
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  periodText: {
    fontSize: 15,
    fontWeight: '700',
  },
  liveCallsBanner: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 18,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FF3B3030',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  livePulse: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  liveText: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase' as const,
  },
  liveCallsText: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
    marginLeft: 12,
  },
  liveButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  liveButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    gap: 12,
    marginBottom: 8,
  },
  statCard: {
    width: (width - 52) / 2,
    padding: 18,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    ...Platform.select({
      web: {
        shadowOpacity: 0.05,
      },
    }),
  },
  statCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  liveBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  liveDotSmall: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  statTitle: {
    fontSize: 13,
    marginBottom: 10,
    lineHeight: 16,
  },
  statChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statChangeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  missionTabs: {
    flexDirection: 'row',
    gap: 8,
  },
  missionTab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#F2F2F7',
  },
  autopilotCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#F2F2F7',
    marginBottom: 16,
  },
  autopilotTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  autopilotSubtitle: {
    fontSize: 13,
  },
  missionMetrics: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  missionMetricCard: {
    flex: 1,
    padding: 14,
    borderRadius: 16,
  },
  missionMetricValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  missionMetricLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  missionMetricDelta: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '700',
  },
  telephonyScroll: {
    marginHorizontal: -4,
    paddingLeft: 4,
  },
  telephonyCard: {
    width: 180,
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
  },
  telephonyIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  telephonyName: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  telephonyStatus: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  telephonyMeta: {
    fontSize: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    minWidth: (width - 64) / 2,
    padding: 14,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    marginBottom: 6,
  },
  metricTrend: {
    fontSize: 12,
    fontWeight: '700',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: (width - 64) / 3,
    padding: 14,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  actionIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center' as const,
  },
  coverageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  coverageCard: {
    width: (width - 52) / 2,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  coverageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  coverageRegion: {
    fontSize: 15,
    fontWeight: '700',
  },
  coverageValue: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  coverageLabel: {
    fontSize: 12,
    marginBottom: 6,
  },
  coverageSaturation: {
    fontSize: 12,
    fontWeight: '700',
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    gap: 12,
  },
  alertSeverityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  alertDetail: {
    fontSize: 13,
  },
  complianceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  complianceCard: {
    width: (width - 52) / 2,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  complianceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  complianceOwner: {
    fontSize: 12,
  },
  complianceLabel: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 12,
  },
  complianceProgressValue: {
    marginTop: 8,
    fontSize: 12,
  },
  sectionHeaderCompact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 15,
    fontWeight: '600',
  },
  negotiationCard: {
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  negotiationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  negotiationName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  negotiationCompany: {
    fontSize: 13,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'capitalize' as const,
  },
  negotiationDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    textTransform: 'capitalize' as const,
  },
  dealCard: {
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  dealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  dealCompany: {
    fontSize: 13,
  },
  dealValue: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'right' as const,
    marginBottom: 2,
  },
  dealProbability: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right' as const,
  },
  dealProgress: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden' as const,
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  floatingCallButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    gap: 10,
  },
  floatingCallText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  callStatusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
  },
  callStatusContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  callStatusText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  endCallButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  intelligenceCard: {
    padding: 16,
    borderRadius: 16,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  premiumLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  intelligenceOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  intelligenceLeft: {
    flex: 1,
    marginRight: 12,
  },
  intelligenceTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  intelligenceSubtitle: {
    fontSize: 12,
    lineHeight: 16,
  },
  premiumHeader: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  premiumTitle: {
    fontSize: 20,
    fontWeight: '900',
    flex: 1,
    textAlign: 'center',
    letterSpacing: 1,
  },
  plusBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  hMetric: {
    alignItems: 'center',
  },
  hMetricVal: {
    fontSize: 18,
    fontWeight: '900',
  },
  hMetricLab: {
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
    opacity: 0.6,
  },
  hMetricDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(150,150,150,0.1)',
  },
});

