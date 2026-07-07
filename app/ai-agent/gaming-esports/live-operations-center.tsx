/**
 * =============================================================================
 * LIVE OPERATIONS CENTER
 * =============================================================================
 *
 * A comprehensive live operations dashboard that tracks live events,
 * seasonal content, server performance, feature releases, and engagement campaigns.
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
  Radio,
  Flame,
  Calendar,
  Server,
  Zap,
  Clock,
  Play,
  Pause,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  DollarSign,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Activity,
  Target,
  BarChart3,
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

// Live Operations Data
const LIVE_OPS_DATA = {
  liveEvents: {
    active: 12,
    participants: 4200000,
    revenue: 89000000,
    engagement: 87,
  },
  seasonalContent: {
    currentSeason: 'Season 7',
    daysRemaining: 45,
    completionRate: 67,
    battlePassSales: 12400000,
  },
  serverPerformance: {
    uptime: 99.7,
    avgLatency: 24,
    peakConcurrent: 8500000,
    regionsOnline: 5,
  },
  featureReleases: {
    thisMonth: 8,
    pending: 3,
    deployed: 5,
    rollbackRate: 0.5,
  },
  engagementCampaigns: {
    active: 6,
    participants: 2800000,
    conversion: 34,
    satisfaction: 91,
  },
};

// Active Live Events
const LIVE_EVENTS = [
  { id: 1, name: 'Summer Championship', status: 'live', participants: '1.2M', viewers: '8.5M', duration: '2h 15m', revenue: '$12.4M' },
  { id: 2, name: 'Double XP Weekend', status: 'live', participants: '2.8M', viewers: 'N/A', duration: '48h', revenue: '$8.2M' },
  { id: 3, name: 'Limited Time Event', status: 'live', participants: '890K', viewers: '1.2M', duration: '6h', revenue: '$4.5M' },
  { id: 4, name: 'Community Challenge', status: 'scheduled', participants: '0', viewers: '0', duration: '24h', revenue: '$0' },
  { id: 5, name: 'Tournament Finals', status: 'scheduled', participants: '0', viewers: '0', duration: '4h', revenue: '$0' },
];

// Feature Release Timeline
const FEATURE_RELEASES = [
  { id: 1, name: 'New Character: Phoenix', status: 'deployed', date: '2 days ago', impact: 'High', satisfaction: 89 },
  { id: 2, name: 'Battle Pass Season 7', status: 'deployed', date: '5 days ago', impact: 'Critical', satisfaction: 92 },
  { id: 3, name: 'Ranked System Update', status: 'deployed', date: '1 week ago', impact: 'High', satisfaction: 85 },
  { id: 4, name: 'Marketplace Revamp', status: 'pending', date: 'Tomorrow', impact: 'Medium', satisfaction: 0 },
  { id: 5, name: 'Anti-Cheat Update', status: 'pending', date: 'In 3 days', impact: 'Critical', satisfaction: 0 },
];

// AI Insights
const AI_INSIGHTS = [
  {
    type: 'event',
    title: 'Event Performance',
    message: 'Summer Championship exceeding projections by 45%. Consider extending duration.',
    impact: 'High',
    action: 'Evaluate event extension options',
  },
  {
    type: 'server',
    title: 'Server Capacity',
    message: 'Asia Pacific servers approaching 85% capacity during peak hours. Recommend scaling.',
    impact: 'Medium',
    action: 'Scale Asia Pacific infrastructure',
  },
  {
    type: 'feature',
    title: 'Feature Rollout',
    message: 'New character adoption rate 67% higher than average. Plan similar content.',
    impact: 'Positive',
    action: 'Accelerate character development pipeline',
  },
];

export default function LiveOperationsCenter() {
  const router = useRouter();
  const { width } = useWindowDimensions();
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
    return null;
  };

  const renderEventCard = (event: typeof LIVE_EVENTS[0]) => {
    const statusColors = {
      live: THEME.neonGreen,
      scheduled: THEME.amber,
      ended: THEME.textMuted,
    };
    const statusColor = statusColors[event.status as keyof typeof statusColors];

    return (
      <BlurView key={event.id} intensity={20} tint="dark" style={styles.eventCard}>
        <View style={styles.eventHeader}>
          <Text style={styles.eventName}>{event.name}</Text>
          <View style={[styles.eventStatus, { backgroundColor: statusColor + '30' }]}>
            <View style={[styles.eventStatusDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.eventStatusText, { color: statusColor }]}>{event.status.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.eventMetrics}>
          <View style={styles.eventMetric}>
            <Text style={styles.eventMetricLabel}>Participants</Text>
            <Text style={[styles.eventMetricValue, { color: THEME.neonCyan }]}>{event.participants}</Text>
          </View>
          <View style={styles.eventMetric}>
            <Text style={styles.eventMetricLabel}>Viewers</Text>
            <Text style={[styles.eventMetricValue, { color: THEME.electricPurple }]}>{event.viewers}</Text>
          </View>
          <View style={styles.eventMetric}>
            <Text style={styles.eventMetricLabel}>Duration</Text>
            <Text style={[styles.eventMetricValue, { color: THEME.amber }]}>{event.duration}</Text>
          </View>
          <View style={styles.eventMetric}>
            <Text style={styles.eventMetricLabel}>Revenue</Text>
            <Text style={[styles.eventMetricValue, { color: THEME.neonGreen }]}>{event.revenue}</Text>
          </View>
        </View>
      </BlurView>
    );
  };

  const renderReleaseCard = (release: typeof FEATURE_RELEASES[0]) => {
    const statusColors = {
      deployed: THEME.neonGreen,
      pending: THEME.amber,
      failed: THEME.red,
    };
    const statusColor = statusColors[release.status as keyof typeof statusColors];

    return (
      <BlurView key={release.id} intensity={20} tint="dark" style={styles.releaseCard}>
        <View style={styles.releaseHeader}>
          <Text style={styles.releaseName}>{release.name}</Text>
          <View style={[styles.releaseStatus, { backgroundColor: statusColor + '30' }]}>
            <Text style={[styles.releaseStatusText, { color: statusColor }]}>{release.status.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.releaseDetails}>
          <View style={styles.releaseDetail}>
            <Text style={styles.releaseDetailLabel}>Date</Text>
            <Text style={styles.releaseDetailValue}>{release.date}</Text>
          </View>
          <View style={styles.releaseDetail}>
            <Text style={styles.releaseDetailLabel}>Impact</Text>
            <Text style={[styles.releaseDetailValue, { color: release.impact === 'Critical' ? THEME.red : release.impact === 'High' ? THEME.amber : THEME.neonGreen }]}>{release.impact}</Text>
          </View>
          {release.satisfaction > 0 && (
            <View style={styles.releaseDetail}>
              <Text style={styles.releaseDetailLabel}>Satisfaction</Text>
              <Text style={[styles.releaseDetailValue, { color: THEME.electricPurple }]}>{release.satisfaction}%</Text>
            </View>
          )}
        </View>
      </BlurView>
    );
  };

  const renderInsightCard = (insight: typeof AI_INSIGHTS[0]) => {
    const typeColors = {
      event: THEME.neonCyan,
      server: THEME.amber,
      feature: THEME.neonGreen,
    };
    const typeIcons = {
      event: Flame,
      server: Server,
      feature: Zap,
    };
    const Icon = typeIcons[insight.type as keyof typeof typeIcons];
    const color = typeColors[insight.type as keyof typeof typeColors];

    return (
      <Animated.View entering={FadeInUp.springify()} style={styles.insightCard}>
        <BlurView intensity={20} tint="dark" style={styles.insightCardBlur}>
          <View style={styles.insightHeader}>
            <View style={[styles.insightIcon, { backgroundColor: color + '20' }]}>
              <Icon size={20} color={color} />
            </View>
            <View style={styles.insightMeta}>
              <Text style={styles.insightTitle}>{insight.title}</Text>
              <View style={[styles.insightImpact, { backgroundColor: color + '30' }]}>
                <Text style={[styles.insightImpactText, { color }]}>{insight.impact}</Text>
              </View>
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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: THEME.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={THEME.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerTitle}>
            <Radio size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Live Operations Center</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Live Events Overview */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Flame size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Live Events</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.liveEventsCard}>
            <View style={styles.liveEventsGrid}>
              <View style={styles.liveEventMetric}>
                <Text style={styles.liveEventLabel}>Active Events</Text>
                <Text style={[styles.liveEventValue, { color: THEME.neonCyan }]}>{LIVE_OPS_DATA.liveEvents.active}</Text>
                <Text style={styles.liveEventSub}>{(LIVE_OPS_DATA.liveEvents.participants / 1000000).toFixed(1)}M participants</Text>
              </View>
              <View style={styles.liveEventMetric}>
                <Text style={styles.liveEventLabel}>Event Revenue</Text>
                <Text style={[styles.liveEventValue, { color: THEME.neonGreen }]}>${(LIVE_OPS_DATA.liveEvents.revenue / 1000000).toFixed(0)}M</Text>
                <Text style={styles.liveEventSub}>This month</Text>
              </View>
              <View style={styles.liveEventMetric}>
                <Text style={styles.liveEventLabel}>Engagement</Text>
                <Text style={[styles.liveEventValue, { color: THEME.electricPurple }]}>{LIVE_OPS_DATA.liveEvents.engagement}%</Text>
                <Text style={styles.liveEventSub}>Above average</Text>
              </View>
            </View>
          </BlurView>
          <View style={styles.eventsContainer}>
            {LIVE_EVENTS.map((event) => renderEventCard(event))}
          </View>
        </Animated.View>

        {/* Seasonal Content */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Calendar size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Seasonal Content</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.seasonalCard}>
            <View style={styles.seasonalHeader}>
              <Text style={styles.seasonalTitle}>{LIVE_OPS_DATA.seasonalContent.currentSeason}</Text>
              <View style={[styles.seasonalBadge, { backgroundColor: THEME.neonCyan + '30' }]}>
                <Text style={[styles.seasonalBadgeText, { color: THEME.neonCyan }]}>ACTIVE</Text>
              </View>
            </View>
            <View style={styles.seasonalMetrics}>
              <View style={styles.seasonalMetric}>
                <Text style={styles.seasonalMetricLabel}>Days Remaining</Text>
                <Text style={[styles.seasonalMetricValue, { color: THEME.amber }]}>{LIVE_OPS_DATA.seasonalContent.daysRemaining}</Text>
              </View>
              <View style={styles.seasonalMetric}>
                <Text style={styles.seasonalMetricLabel}>Completion Rate</Text>
                <Text style={[styles.seasonalMetricValue, { color: THEME.neonGreen }]}>{LIVE_OPS_DATA.seasonalContent.completionRate}%</Text>
              </View>
              <View style={styles.seasonalMetric}>
                <Text style={styles.seasonalMetricLabel}>Battle Pass Sales</Text>
                <Text style={[styles.seasonalMetricValue, { color: THEME.electricPurple }]}>{(LIVE_OPS_DATA.seasonalContent.battlePassSales / 1000000).toFixed(1)}M</Text>
              </View>
            </View>
            <View style={styles.seasonalProgress}>
              <Text style={styles.seasonalProgressLabel}>Season Progress</Text>
              <View style={styles.seasonalProgressBar}>
                <View style={[styles.seasonalProgressFill, { width: `${((90 - LIVE_OPS_DATA.seasonalContent.daysRemaining) / 90) * 100}%`, backgroundColor: THEME.neonCyan }]} />
              </View>
              <Text style={styles.seasonalProgressText}>{((90 - LIVE_OPS_DATA.seasonalContent.daysRemaining) / 90 * 100).toFixed(0)}% Complete</Text>
            </View>
          </BlurView>
        </Animated.View>

        {/* Server Performance */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Server size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Server Performance</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.serverCard}>
            <View style={styles.serverGrid}>
              <View style={styles.serverMetric}>
                <Text style={styles.serverLabel}>Uptime</Text>
                <Text style={[styles.serverValue, { color: THEME.neonGreen }]}>{LIVE_OPS_DATA.serverPerformance.uptime}%</Text>
                <View style={styles.serverBar}>
                  <View style={[styles.serverBarFill, { width: `${LIVE_OPS_DATA.serverPerformance.uptime}%`, backgroundColor: THEME.neonGreen }]} />
                </View>
              </View>
              <View style={styles.serverMetric}>
                <Text style={styles.serverLabel}>Avg Latency</Text>
                <Text style={[styles.serverValue, { color: THEME.electricPurple }]}>{LIVE_OPS_DATA.serverPerformance.avgLatency}ms</Text>
              </View>
              <View style={styles.serverMetric}>
                <Text style={styles.serverLabel}>Peak Concurrent</Text>
                <Text style={[styles.serverValue, { color: THEME.neonCyan }]}>{(LIVE_OPS_DATA.serverPerformance.peakConcurrent / 1000000).toFixed(1)}M</Text>
              </View>
              <View style={styles.serverMetric}>
                <Text style={styles.serverLabel}>Regions Online</Text>
                <Text style={[styles.serverValue, { color: THEME.amber }]}>{LIVE_OPS_DATA.serverPerformance.regionsOnline}/5</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Feature Releases */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Zap size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Feature Releases</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.releasesCard}>
            <View style={styles.releasesOverview}>
              <View style={styles.releasesMetric}>
                <Text style={styles.releasesLabel}>This Month</Text>
                <Text style={[styles.releasesValue, { color: THEME.neonCyan }]}>{LIVE_OPS_DATA.featureReleases.thisMonth}</Text>
              </View>
              <View style={styles.releasesMetric}>
                <Text style={styles.releasesLabel}>Pending</Text>
                <Text style={[styles.releasesValue, { color: THEME.amber }]}>{LIVE_OPS_DATA.featureReleases.pending}</Text>
              </View>
              <View style={styles.releasesMetric}>
                <Text style={styles.releasesLabel}>Deployed</Text>
                <Text style={[styles.releasesValue, { color: THEME.neonGreen }]}>{LIVE_OPS_DATA.featureReleases.deployed}</Text>
              </View>
              <View style={styles.releasesMetric}>
                <Text style={styles.releasesLabel}>Rollback Rate</Text>
                <Text style={[styles.releasesValue, { color: THEME.red }]}>{LIVE_OPS_DATA.featureReleases.rollbackRate}%</Text>
              </View>
            </View>
          </BlurView>
          <View style={styles.releasesContainer}>
            {FEATURE_RELEASES.map((release) => renderReleaseCard(release))}
          </View>
        </Animated.View>

        {/* Engagement Campaigns */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Engagement Campaigns</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.campaignsCard}>
            <View style={styles.campaignsGrid}>
              <View style={styles.campaignMetric}>
                <Text style={styles.campaignLabel}>Active Campaigns</Text>
                <Text style={[styles.campaignValue, { color: THEME.neonCyan }]}>{LIVE_OPS_DATA.engagementCampaigns.active}</Text>
              </View>
              <View style={styles.campaignMetric}>
                <Text style={styles.campaignLabel}>Participants</Text>
                <Text style={[styles.campaignValue, { color: THEME.electricPurple }]}>{(LIVE_OPS_DATA.engagementCampaigns.participants / 1000000).toFixed(1)}M</Text>
              </View>
              <View style={styles.campaignMetric}>
                <Text style={styles.campaignLabel}>Conversion</Text>
                <Text style={[styles.campaignValue, { color: THEME.neonGreen }]}>{LIVE_OPS_DATA.engagementCampaigns.conversion}%</Text>
              </View>
              <View style={styles.campaignMetric}>
                <Text style={styles.campaignLabel}>Satisfaction</Text>
                <Text style={[styles.campaignValue, { color: THEME.amber }]}>{LIVE_OPS_DATA.engagementCampaigns.satisfaction}%</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* AI Insights */}
        <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Brain size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>AI Insights</Text>
          </View>
          <View style={styles.insightsContainer}>
            {AI_INSIGHTS.map((insight) => renderInsightCard(insight))}
          </View>
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
  backButton: {
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
  liveEventsCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 16,
  },
  liveEventsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  liveEventMetric: {
    alignItems: 'center',
  },
  liveEventLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  liveEventValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  liveEventSub: {
    fontSize: 11,
    color: THEME.textMuted,
  },
  eventsContainer: {
    gap: 12,
  },
  eventCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  eventStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  eventStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  eventStatusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  eventMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventMetric: {
    alignItems: 'center',
  },
  eventMetricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  eventMetricValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  seasonalCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  seasonalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  seasonalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.text,
  },
  seasonalBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  seasonalBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  seasonalMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  seasonalMetric: {
    alignItems: 'center',
  },
  seasonalMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  seasonalMetricValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  seasonalProgress: {
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  seasonalProgressLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  seasonalProgressBar: {
    height: 8,
    backgroundColor: THEME.cardLight,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  seasonalProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  seasonalProgressText: {
    fontSize: 12,
    color: THEME.textMuted,
    textAlign: 'center',
  },
  serverCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  serverGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  serverMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  serverLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  serverValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  serverBar: {
    height: 4,
    backgroundColor: THEME.cardLight,
    borderRadius: 2,
    overflow: 'hidden',
  },
  serverBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  releasesCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 16,
  },
  releasesOverview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  releasesMetric: {
    alignItems: 'center',
  },
  releasesLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  releasesValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  releasesContainer: {
    gap: 12,
  },
  releaseCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  releaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  releaseName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  releaseStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  releaseStatusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  releaseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  releaseDetail: {
    flex: 1,
  },
  releaseDetailLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  releaseDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.text,
  },
  campaignsCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  campaignsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  campaignMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  campaignLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  campaignValue: {
    fontSize: 20,
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
    marginBottom: 4,
  },
  insightImpact: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
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
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
