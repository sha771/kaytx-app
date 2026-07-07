/**
 * =============================================================================
 * CONTENT & CREATOR HUB
 * =============================================================================
 *
 * A comprehensive content and creator dashboard that tracks streamers,
 * influencers, creator revenue, content performance, and campaign reach.
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
  Video,
  Users,
  TrendingUp,
  DollarSign,
  Award,
  Star,
  Heart,
  Share2,
  Play,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Flame,
  Zap,
  BarChart3,
  Mic,
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

// Content Data
const CONTENT_DATA = {
  streamers: {
    total: 847,
    active: 567,
    concurrentViewers: 2400000,
    totalWatchTime: 84700000,
  },
  influencers: {
    total: 234,
    active: 189,
    followers: 45000000,
    engagementRate: 8.7,
  },
  creatorRevenue: {
    total: 8900000,
    streaming: 4500000,
    content: 2800000,
    sponsorships: 1600000,
  },
  contentPerformance: {
    totalViews: 156000000,
    avgWatchTime: '12:34',
    engagementRate: 9.2,
    viralContent: 45,
  },
  campaignReach: {
    activeCampaigns: 12,
    totalReach: 67000000,
    engagement: 8900000,
    conversions: 124000,
  },
};

// Top Streamers
const TOP_STREAMERS = [
  { id: 1, name: 'ProGamer2024', platform: 'Twitch', viewers: '245K', followers: '2.1M', revenue: '$450K', status: 'live' },
  { id: 2, name: 'StreamQueen', platform: 'Twitch', viewers: '189K', followers: '1.8M', revenue: '$380K', status: 'live' },
  { id: 3, name: 'GameMaster', platform: 'YouTube', viewers: '156K', followers: '1.5M', revenue: '$320K', status: 'offline' },
  { id: 4, name: 'EsportsAnalyst', platform: 'Twitch', viewers: '98K', followers: '890K', revenue: '$180K', status: 'live' },
  { id: 5, name: 'ContentKing', platform: 'YouTube', viewers: '0', followers: '3.2M', revenue: '$520K', status: 'offline' },
];

// Top Influencers
const TOP_INFLUENCERS = [
  { id: 1, name: 'GamingLegend', platform: 'Twitter', followers: '8.5M', engagement: '12.4%', revenue: '$280K' },
  { id: 2, name: 'EsportsStar', platform: 'Instagram', followers: '6.2M', engagement: '8.9%', revenue: '$220K' },
  { id: 3, name: 'ProPlayer', platform: 'TikTok', followers: '12.4M', engagement: '15.6%', revenue: '$340K' },
  { id: 4, name: 'GameReviewer', platform: 'YouTube', followers: '4.8M', engagement: '7.2%', revenue: '$180K' },
  { id: 5, name: 'StreamHighlight', platform: 'Twitter', followers: '3.2M', engagement: '10.1%', revenue: '$150K' },
];

// AI Insights
const AI_INSIGHTS = [
  {
    type: 'streaming',
    title: 'Streaming Opportunity',
    message: 'Weekend streaming hours showing 45% higher viewership. Recommend weekend incentives.',
    impact: 'High',
    action: 'Launch weekend streaming bonus program',
  },
  {
    type: 'content',
    title: 'Content Performance',
    message: 'Short-form content (under 60s) achieving 67% higher engagement. Pivot strategy.',
    impact: 'Medium',
    action: 'Prioritize short-form content production',
  },
  {
    type: 'campaign',
    title: 'Campaign Reach',
    message: 'Current campaign reach 23% above projections. Consider expanding scope.',
    impact: 'Positive',
    action: 'Scale successful campaign elements',
  },
];

export default function ContentCreatorHub() {
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

  const renderTrendIndicator = (trend: string) => {
    if (trend === 'up') {
      return <ArrowUpRight size={16} color={THEME.neonGreen} />;
    } else if (trend === 'down') {
      return <ArrowDownRight size={16} color={THEME.red} />;
    }
    return <View style={styles.trendNeutral} />;
  };

  const renderStreamerCard = (streamer: typeof TOP_STREAMERS[0]) => {
    const statusColors = {
      live: THEME.red,
      offline: THEME.textMuted,
    };
    const statusColor = statusColors[streamer.status as keyof typeof statusColors];

    return (
      <BlurView key={streamer.id} intensity={20} tint="dark" style={styles.streamerCard}>
        <View style={styles.streamerHeader}>
          <Text style={styles.streamerName}>{streamer.name}</Text>
          <View style={[styles.streamerStatus, { backgroundColor: statusColor + '30' }]}>
            <View style={[styles.streamerStatusDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.streamerStatusText, { color: statusColor }]}>{streamer.status.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.streamerDetails}>
          <View style={styles.streamerDetail}>
            <Text style={styles.streamerDetailLabel}>Platform</Text>
            <Text style={styles.streamerDetailValue}>{streamer.platform}</Text>
          </View>
          <View style={styles.streamerDetail}>
            <Text style={styles.streamerDetailLabel}>Viewers</Text>
            <Text style={[styles.streamerDetailValue, { color: THEME.neonCyan }]}>{streamer.viewers}</Text>
          </View>
          <View style={styles.streamerDetail}>
            <Text style={styles.streamerDetailLabel}>Followers</Text>
            <Text style={[styles.streamerDetailValue, { color: THEME.electricPurple }]}>{streamer.followers}</Text>
          </View>
          <View style={styles.streamerDetail}>
            <Text style={styles.streamerDetailLabel}>Revenue</Text>
            <Text style={[styles.streamerDetailValue, { color: THEME.neonGreen }]}>{streamer.revenue}</Text>
          </View>
        </View>
      </BlurView>
    );
  };

  const renderInfluencerCard = (influencer: typeof TOP_INFLUENCERS[0]) => (
    <BlurView key={influencer.id} intensity={20} tint="dark" style={styles.influencerCard}>
      <View style={styles.influencerHeader}>
        <Text style={styles.influencerName}>{influencer.name}</Text>
        <View style={[styles.influencerPlatform, { backgroundColor: THEME.cardLight }]}>
          <Text style={styles.influencerPlatformText}>{influencer.platform}</Text>
        </View>
      </View>
      <View style={styles.influencerDetails}>
        <View style={styles.influencerDetail}>
          <Text style={styles.influencerDetailLabel}>Followers</Text>
          <Text style={[styles.influencerDetailValue, { color: THEME.neonCyan }]}>{influencer.followers}</Text>
        </View>
        <View style={styles.influencerDetail}>
          <Text style={styles.influencerDetailLabel}>Engagement</Text>
          <Text style={[styles.influencerDetailValue, { color: THEME.neonGreen }]}>{influencer.engagement}</Text>
        </View>
        <View style={styles.influencerDetail}>
          <Text style={styles.influencerDetailLabel}>Revenue</Text>
          <Text style={[styles.influencerDetailValue, { color: THEME.amber }]}>{influencer.revenue}</Text>
        </View>
      </View>
    </BlurView>
  );

  const renderInsightCard = (insight: typeof AI_INSIGHTS[0]) => {
    const typeColors = {
      streaming: THEME.red,
      content: THEME.neonCyan,
      campaign: THEME.neonGreen,
    };
    const typeIcons = {
      streaming: Video,
      content: Mic,
      campaign: Share2,
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
            <Video size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Content & Creator Hub</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Streamers */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Play size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Streamers</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.streamersCard}>
            <View style={styles.streamersGrid}>
              <View style={styles.streamersMetric}>
                <Text style={styles.streamersLabel}>Total</Text>
                <Text style={[styles.streamersValue, { color: THEME.neonCyan }]}>{CONTENT_DATA.streamers.total}</Text>
              </View>
              <View style={styles.streamersMetric}>
                <Text style={styles.streamersLabel}>Active</Text>
                <Text style={[styles.streamersValue, { color: THEME.red }]}>{CONTENT_DATA.streamers.active}</Text>
              </View>
              <View style={styles.streamersMetric}>
                <Text style={styles.streamersLabel}>Concurrent Viewers</Text>
                <Text style={[styles.streamersValue, { color: THEME.neonGreen }]}>{(CONTENT_DATA.streamers.concurrentViewers / 1000000).toFixed(1)}M</Text>
              </View>
              <View style={styles.streamersMetric}>
                <Text style={styles.streamersLabel}>Total Watch Time</Text>
                <Text style={[styles.streamersValue, { color: THEME.electricPurple }]}>{(CONTENT_DATA.streamers.totalWatchTime / 1000000).toFixed(0)}Mh</Text>
              </View>
            </View>
          </BlurView>
          <View style={styles.streamersContainer}>
            {TOP_STREAMERS.map((streamer) => renderStreamerCard(streamer))}
          </View>
        </Animated.View>

        {/* Influencers */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Star size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Influencers</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.influencersCard}>
            <View style={styles.influencersGrid}>
              <View style={styles.influencersMetric}>
                <Text style={styles.influencersLabel}>Total</Text>
                <Text style={[styles.influencersValue, { color: THEME.neonCyan }]}>{CONTENT_DATA.influencers.total}</Text>
              </View>
              <View style={styles.influencersMetric}>
                <Text style={styles.influencersLabel}>Active</Text>
                <Text style={[styles.influencersValue, { color: THEME.neonGreen }]}>{CONTENT_DATA.influencers.active}</Text>
              </View>
              <View style={styles.influencersMetric}>
                <Text style={styles.influencersLabel}>Total Followers</Text>
                <Text style={[styles.influencersValue, { color: THEME.electricPurple }]}>{(CONTENT_DATA.influencers.followers / 1000000).toFixed(0)}M</Text>
              </View>
              <View style={styles.influencersMetric}>
                <Text style={styles.influencersLabel}>Engagement Rate</Text>
                <Text style={[styles.influencersValue, { color: THEME.amber }]}>{CONTENT_DATA.influencers.engagementRate}%</Text>
              </View>
            </View>
          </BlurView>
          <View style={styles.influencersContainer}>
            {TOP_INFLUENCERS.map((influencer) => renderInfluencerCard(influencer))}
          </View>
        </Animated.View>

        {/* Creator Revenue */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <DollarSign size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Creator Revenue</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.revenueCard}>
            <View style={styles.revenueGrid}>
              <View style={styles.revenueMetric}>
                <Text style={styles.revenueLabel}>Total</Text>
                <Text style={[styles.revenueValue, { color: THEME.neonCyan }]}>${(CONTENT_DATA.creatorRevenue.total / 1000000).toFixed(1)}M</Text>
              </View>
              <View style={styles.revenueMetric}>
                <Text style={styles.revenueLabel}>Streaming</Text>
                <Text style={[styles.revenueValue, { color: THEME.red }]}>${(CONTENT_DATA.creatorRevenue.streaming / 1000000).toFixed(1)}M</Text>
              </View>
              <View style={styles.revenueMetric}>
                <Text style={styles.revenueLabel}>Content</Text>
                <Text style={[styles.revenueValue, { color: THEME.electricPurple }]}>${(CONTENT_DATA.creatorRevenue.content / 1000000).toFixed(1)}M</Text>
              </View>
              <View style={styles.revenueMetric}>
                <Text style={styles.revenueLabel}>Sponsorships</Text>
                <Text style={[styles.revenueValue, { color: THEME.neonGreen }]}>${(CONTENT_DATA.creatorRevenue.sponsorships / 1000000).toFixed(1)}M</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Content Performance */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Content Performance</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.performanceCard}>
            <View style={styles.performanceGrid}>
              <View style={styles.performanceMetric}>
                <Text style={styles.performanceLabel}>Total Views</Text>
                <Text style={[styles.performanceValue, { color: THEME.neonCyan }]}>{(CONTENT_DATA.contentPerformance.totalViews / 1000000).toFixed(0)}M</Text>
              </View>
              <View style={styles.performanceMetric}>
                <Text style={styles.performanceLabel}>Avg Watch Time</Text>
                <Text style={[styles.performanceValue, { color: THEME.electricPurple }]}>{CONTENT_DATA.contentPerformance.avgWatchTime}</Text>
              </View>
              <View style={styles.performanceMetric}>
                <Text style={styles.performanceLabel}>Engagement Rate</Text>
                <Text style={[styles.performanceValue, { color: THEME.neonGreen }]}>{CONTENT_DATA.contentPerformance.engagementRate}%</Text>
              </View>
              <View style={styles.performanceMetric}>
                <Text style={styles.performanceLabel}>Viral Content</Text>
                <Text style={[styles.performanceValue, { color: THEME.amber }]}>{CONTENT_DATA.contentPerformance.viralContent}</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Campaign Reach */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Share2 size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Campaign Reach</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.campaignCard}>
            <View style={styles.campaignGrid}>
              <View style={styles.campaignMetric}>
                <Text style={styles.campaignLabel}>Active Campaigns</Text>
                <Text style={[styles.campaignValue, { color: THEME.neonCyan }]}>{CONTENT_DATA.campaignReach.activeCampaigns}</Text>
              </View>
              <View style={styles.campaignMetric}>
                <Text style={styles.campaignLabel}>Total Reach</Text>
                <Text style={[styles.campaignValue, { color: THEME.electricPurple }]}>{(CONTENT_DATA.campaignReach.totalReach / 1000000).toFixed(0)}M</Text>
              </View>
              <View style={styles.campaignMetric}>
                <Text style={styles.campaignLabel}>Engagement</Text>
                <Text style={[styles.campaignValue, { color: THEME.neonGreen }]}>{(CONTENT_DATA.campaignReach.engagement / 1000000).toFixed(1)}M</Text>
              </View>
              <View style={styles.campaignMetric}>
                <Text style={styles.campaignLabel}>Conversions</Text>
                <Text style={[styles.campaignValue, { color: THEME.amber }]}>{(CONTENT_DATA.campaignReach.conversions / 1000).toFixed(0)}K</Text>
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
  streamersCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 16,
  },
  streamersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  streamersMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  streamersLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  streamersValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  streamersContainer: {
    gap: 12,
  },
  streamerCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  streamerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  streamerName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  streamerStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  streamerStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  streamerStatusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  streamerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  streamerDetail: {
    flex: 1,
  },
  streamerDetailLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  streamerDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.text,
  },
  influencersCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 16,
  },
  influencersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  influencersMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  influencersLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  influencersValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  influencersContainer: {
    gap: 12,
  },
  influencerCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  influencerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  influencerName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  influencerPlatform: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  influencerPlatformText: {
    fontSize: 10,
    fontWeight: '600',
    color: THEME.textMuted,
  },
  influencerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  influencerDetail: {
    flex: 1,
  },
  influencerDetailLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  influencerDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.text,
  },
  revenueCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  revenueGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  revenueMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  revenueLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  revenueValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  performanceCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  performanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  performanceMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  performanceLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  performanceValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  campaignCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  campaignGrid: {
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
  trendNeutral: {
    width: 16,
    height: 16,
  },
});
