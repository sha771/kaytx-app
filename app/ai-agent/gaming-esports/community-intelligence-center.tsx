/**
 * =============================================================================
 * COMMUNITY INTELLIGENCE CENTER
 * =============================================================================
 *
 * A comprehensive community dashboard that tracks growth, Discord activity,
 * social engagement, sentiment analysis, and creator communities.
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
  Users,
  TrendingUp,
  MessageSquare,
  Heart,
  Share2,
  Smile,
  Frown,
  Meh,
  Star,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Flame,
  Zap,
  BarChart3,
  Globe,
  Hash,
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

// Community Data
const COMMUNITY_DATA = {
  growth: {
    totalMembers: 8470000,
    newMembers: 124000,
    growthRate: 1.47,
    activeMembers: 5200000,
  },
  discordActivity: {
    online: 2840000,
    activeChannels: 156,
    messagesToday: 847000,
    voiceUsers: 456000,
  },
  socialEngagement: {
    twitter: 2400000,
    instagram: 1800000,
    youtube: 3200000,
    tiktok: 4500000,
    totalEngagement: 11900000,
  },
  sentiment: {
    positive: 67,
    neutral: 24,
    negative: 9,
    trend: 'up',
  },
  creatorCommunities: {
    total: 847,
    active: 567,
    topCreators: 45,
    revenue: 8900000,
  },
};

// Discord Channels
const DISCORD_CHANNELS = [
  { id: 1, name: 'general', members: 2840000, activity: 'High', messages: 245000 },
  { id: 2, name: 'announcements', members: 5200000, activity: 'Medium', messages: 45000 },
  { id: 3, name: 'gameplay', members: 1800000, activity: 'High', messages: 187000 },
  { id: 4, name: 'strategies', members: 1200000, activity: 'Medium', messages: 89000 },
  { id: 5, name: 'off-topic', members: 2100000, activity: 'High', messages: 280000 },
];

// Social Platforms
const SOCIAL_PLATFORMS = [
  { id: 1, name: 'Twitter/X', followers: '2.4M', engagement: '8.7%', growth: '+12%', color: THEME.neonCyan },
  { id: 2, name: 'Instagram', followers: '1.8M', engagement: '6.2%', growth: '+8%', color: THEME.magenta },
  { id: 3, name: 'YouTube', followers: '3.2M', engagement: '4.5%', growth: '+15%', color: THEME.red },
  { id: 4, name: 'TikTok', followers: '4.5M', engagement: '12.3%', growth: '+24%', color: THEME.neonCyan },
];

// Top Creators
const TOP_CREATORS = [
  { id: 1, name: 'ProGamer2024', platform: 'YouTube', followers: '2.1M', engagement: '8.9%', revenue: '$450K' },
  { id: 2, name: 'StreamQueen', platform: 'Twitch', followers: '1.8M', engagement: '12.4%', revenue: '$380K' },
  { id: 3, name: 'GameMaster', platform: 'YouTube', followers: '1.5M', engagement: '7.2%', revenue: '$320K' },
  { id: 4, name: 'EsportsAnalyst', platform: 'Twitter', followers: '890K', engagement: '15.6%', revenue: '$180K' },
  { id: 5, name: 'ContentKing', platform: 'TikTok', followers: '3.2M', engagement: '18.2%', revenue: '$520K' },
];

// AI Insights
const AI_INSIGHTS = [
  {
    type: 'growth',
    title: 'Growth Opportunity',
    message: 'TikTok showing 24% growth. Increase content investment for maximum ROI.',
    impact: 'High',
    action: 'Allocate additional budget to TikTok content',
  },
  {
    type: 'sentiment',
    title: 'Sentiment Alert',
    message: 'Negative sentiment increased 3% after latest patch. Monitor closely.',
    impact: 'Medium',
    action: 'Investigate patch feedback and address concerns',
  },
  {
    type: 'creator',
    title: 'Creator Engagement',
    message: 'Top 45 creators driving 67% of community engagement. Expand creator program.',
    impact: 'Positive',
    action: 'Onboard additional high-potential creators',
  },
];

export default function CommunityIntelligenceCenter() {
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

  const renderChannelCard = (channel: typeof DISCORD_CHANNELS[0]) => {
    const activityColors = {
      High: THEME.neonGreen,
      Medium: THEME.amber,
      Low: THEME.textMuted,
    };
    const activityColor = activityColors[channel.activity as keyof typeof activityColors];

    return (
      <BlurView key={channel.id} intensity={20} tint="dark" style={styles.channelCard}>
        <View style={styles.channelHeader}>
          <Hash size={16} color={THEME.textMuted} />
          <Text style={styles.channelName}>{channel.name}</Text>
          <View style={[styles.channelActivity, { backgroundColor: activityColor + '30' }]}>
            <Text style={[styles.channelActivityText, { color: activityColor }]}>{channel.activity}</Text>
          </View>
        </View>
        <View style={styles.channelMetrics}>
          <View style={styles.channelMetric}>
            <Text style={styles.channelMetricLabel}>Members</Text>
            <Text style={[styles.channelMetricValue, { color: THEME.neonCyan }]}>{(channel.members / 1000000).toFixed(1)}M</Text>
          </View>
          <View style={styles.channelMetric}>
            <Text style={styles.channelMetricLabel}>Messages Today</Text>
            <Text style={[styles.channelMetricValue, { color: THEME.electricPurple }]}>{(channel.messages / 1000).toFixed(0)}K</Text>
          </View>
        </View>
      </BlurView>
    );
  };

  const renderSocialCard = (platform: typeof SOCIAL_PLATFORMS[0]) => (
    <BlurView key={platform.id} intensity={20} tint="dark" style={styles.socialCard}>
      <View style={styles.socialHeader}>
        <View style={[styles.socialIndicator, { backgroundColor: platform.color }]} />
        <Text style={styles.socialName}>{platform.name}</Text>
      </View>
      <View style={styles.socialMetrics}>
        <View style={styles.socialMetric}>
          <Text style={styles.socialMetricLabel}>Followers</Text>
          <Text style={[styles.socialMetricValue, { color: platform.color }]}>{platform.followers}</Text>
        </View>
        <View style={styles.socialMetric}>
          <Text style={styles.socialMetricLabel}>Engagement</Text>
          <Text style={[styles.socialMetricValue, { color: THEME.neonGreen }]}>{platform.engagement}</Text>
        </View>
        <View style={styles.socialMetric}>
          <Text style={styles.socialMetricLabel}>Growth</Text>
          <Text style={[styles.socialMetricValue, { color: THEME.amber }]}>{platform.growth}</Text>
        </View>
      </View>
    </BlurView>
  );

  const renderCreatorCard = (creator: typeof TOP_CREATORS[0]) => (
    <BlurView key={creator.id} intensity={20} tint="dark" style={styles.creatorCard}>
      <View style={styles.creatorHeader}>
        <Text style={styles.creatorName}>{creator.name}</Text>
        <View style={[styles.creatorPlatform, { backgroundColor: THEME.cardLight }]}>
          <Text style={styles.creatorPlatformText}>{creator.platform}</Text>
        </View>
      </View>
      <View style={styles.creatorMetrics}>
        <View style={styles.creatorMetric}>
          <Text style={styles.creatorMetricLabel}>Followers</Text>
          <Text style={[styles.creatorMetricValue, { color: THEME.neonCyan }]}>{creator.followers}</Text>
        </View>
        <View style={styles.creatorMetric}>
          <Text style={styles.creatorMetricLabel}>Engagement</Text>
          <Text style={[styles.creatorMetricValue, { color: THEME.neonGreen }]}>{creator.engagement}</Text>
        </View>
        <View style={styles.creatorMetric}>
          <Text style={styles.creatorMetricLabel}>Revenue</Text>
          <Text style={[styles.creatorMetricValue, { color: THEME.amber }]}>{creator.revenue}</Text>
        </View>
      </View>
    </BlurView>
  );

  const renderInsightCard = (insight: typeof AI_INSIGHTS[0]) => {
    const typeColors = {
      growth: THEME.neonCyan,
      sentiment: THEME.amber,
      creator: THEME.neonGreen,
    };
    const typeIcons = {
      growth: TrendingUp,
      sentiment: Smile,
      creator: Star,
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
            <Users size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Community Intelligence Center</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Growth Overview */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Community Growth</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.growthCard}>
            <View style={styles.growthGrid}>
              <View style={styles.growthMetric}>
                <Text style={styles.growthLabel}>Total Members</Text>
                <Text style={[styles.growthValue, { color: THEME.neonCyan }]}>{(COMMUNITY_DATA.growth.totalMembers / 1000000).toFixed(1)}M</Text>
              </View>
              <View style={styles.growthMetric}>
                <Text style={styles.growthLabel}>New Members</Text>
                <Text style={[styles.growthValue, { color: THEME.neonGreen }]}>+{(COMMUNITY_DATA.growth.newMembers / 1000).toFixed(0)}K</Text>
              </View>
              <View style={styles.growthMetric}>
                <Text style={styles.growthLabel}>Growth Rate</Text>
                <Text style={[styles.growthValue, { color: THEME.amber }]}>{COMMUNITY_DATA.growth.growthRate}%</Text>
              </View>
              <View style={styles.growthMetric}>
                <Text style={styles.growthLabel}>Active Members</Text>
                <Text style={[styles.growthValue, { color: THEME.electricPurple  }]}>{(COMMUNITY_DATA.growth.activeMembers / 1000000).toFixed(1)}M</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Discord Activity */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <MessageSquare size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Discord Activity</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.discordCard}>
            <View style={styles.discordGrid}>
              <View style={styles.discordMetric}>
                <Text style={styles.discordLabel}>Online</Text>
                <Text style={[styles.discordValue, { color: THEME.neonGreen }]}>{(COMMUNITY_DATA.discordActivity.online / 1000000).toFixed(1)}M</Text>
              </View>
              <View style={styles.discordMetric}>
                <Text style={styles.discordLabel}>Active Channels</Text>
                <Text style={[styles.discordValue, { color: THEME.electricPurple }]}>{COMMUNITY_DATA.discordActivity.activeChannels}</Text>
              </View>
              <View style={styles.discordMetric}>
                <Text style={styles.discordLabel}>Messages Today</Text>
                <Text style={[styles.discordValue, { color: THEME.neonCyan }]}>{(COMMUNITY_DATA.discordActivity.messagesToday / 1000).toFixed(0)}K</Text>
              </View>
              <View style={styles.discordMetric}>
                <Text style={styles.discordLabel}>Voice Users</Text>
                <Text style={[styles.discordValue, { color: THEME.amber }]}>{(COMMUNITY_DATA.discordActivity.voiceUsers / 1000).toFixed(0)}K</Text>
              </View>
            </View>
          </BlurView>
          <View style={styles.channelsContainer}>
            {DISCORD_CHANNELS.map((channel) => renderChannelCard(channel))}
          </View>
        </Animated.View>

        {/* Social Engagement */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Share2 size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Social Engagement</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.socialOverviewCard}>
            <View style={styles.socialOverviewGrid}>
              <View style={styles.socialOverviewMetric}>
                <Text style={styles.socialOverviewLabel}>Total Followers</Text>
                <Text style={[styles.socialOverviewValue, { color: THEME.neonCyan }]}>{(COMMUNITY_DATA.socialEngagement.totalEngagement / 1000000).toFixed(1)}M</Text>
              </View>
              <View style={styles.socialOverviewMetric}>
                <Text style={styles.socialOverviewLabel}>Avg Engagement</Text>
                <Text style={[styles.socialOverviewValue, { color: THEME.neonGreen }]}>{((COMMUNITY_DATA.socialEngagement.totalEngagement / COMMUNITY_DATA.growth.totalMembers) * 100).toFixed(1)}%</Text>
              </View>
            </View>
          </BlurView>
          <View style={styles.socialContainer}>
            {SOCIAL_PLATFORMS.map((platform) => renderSocialCard(platform))}
          </View>
        </Animated.View>

        {/* Sentiment Analysis */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Smile size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Sentiment Analysis</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.sentimentCard}>
            <View style={styles.sentimentGrid}>
              <View style={styles.sentimentMetric}>
                <Text style={styles.sentimentLabel}>Positive</Text>
                <Text style={[styles.sentimentValue, { color: THEME.neonGreen }]}>{COMMUNITY_DATA.sentiment.positive}%</Text>
                <View style={styles.sentimentBar}>
                  <View style={[styles.sentimentBarFill, { width: `${COMMUNITY_DATA.sentiment.positive}%`, backgroundColor: THEME.neonGreen }]} />
                </View>
              </View>
              <View style={styles.sentimentMetric}>
                <Text style={styles.sentimentLabel}>Neutral</Text>
                <Text style={[styles.sentimentValue, { color: THEME.amber }]}>{COMMUNITY_DATA.sentiment.neutral}%</Text>
                <View style={styles.sentimentBar}>
                  <View style={[styles.sentimentBarFill, { width: `${COMMUNITY_DATA.sentiment.neutral}%`, backgroundColor: THEME.amber }]} />
                </View>
              </View>
              <View style={styles.sentimentMetric}>
                <Text style={styles.sentimentLabel}>Negative</Text>
                <Text style={[styles.sentimentValue, { color: THEME.red }]}>{COMMUNITY_DATA.sentiment.negative}%</Text>
                <View style={styles.sentimentBar}>
                  <View style={[styles.sentimentBarFill, { width: `${COMMUNITY_DATA.sentiment.negative}%`, backgroundColor: THEME.red }]} />
                </View>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Creator Communities */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Star size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Creator Communities</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.creatorOverviewCard}>
            <View style={styles.creatorOverviewGrid}>
              <View style={styles.creatorOverviewMetric}>
                <Text style={styles.creatorOverviewLabel}>Total Creators</Text>
                <Text style={[styles.creatorOverviewValue, { color: THEME.neonCyan }]}>{COMMUNITY_DATA.creatorCommunities.total}</Text>
              </View>
              <View style={styles.creatorOverviewMetric}>
                <Text style={styles.creatorOverviewLabel}>Active</Text>
                <Text style={[styles.creatorOverviewValue, { color: THEME.neonGreen }]}>{COMMUNITY_DATA.creatorCommunities.active}</Text>
              </View>
              <View style={styles.creatorOverviewMetric}>
                <Text style={styles.creatorOverviewLabel}>Revenue</Text>
                <Text style={[styles.creatorOverviewValue, { color: THEME.amber }]}>${(COMMUNITY_DATA.creatorCommunities.revenue / 1000000).toFixed(1)}M</Text>
              </View>
            </View>
          </BlurView>
          <View style={styles.creatorsContainer}>
            {TOP_CREATORS.map((creator) => renderCreatorCard(creator))}
          </View>
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
  growthCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  growthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  growthMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  growthLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  growthValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  discordCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 16,
  },
  discordGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  discordMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  discordLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  discordValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  channelsContainer: {
    gap: 12,
  },
  channelCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  channelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  channelName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  channelActivity: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  channelActivityText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  channelMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  channelMetric: {
    flex: 1,
  },
  channelMetricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  channelMetricValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  socialOverviewCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 16,
  },
  socialOverviewGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  socialOverviewMetric: {
    alignItems: 'center',
  },
  socialOverviewLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  socialOverviewValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  socialContainer: {
    gap: 12,
  },
  socialCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  socialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  socialIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  socialName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  socialMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialMetric: {
    flex: 1,
  },
  socialMetricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  socialMetricValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  sentimentCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  sentimentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  sentimentMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  sentimentLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  sentimentValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  sentimentBar: {
    height: 4,
    backgroundColor: THEME.cardLight,
    borderRadius: 2,
    overflow: 'hidden',
  },
  sentimentBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  creatorOverviewCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 16,
  },
  creatorOverviewGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  creatorOverviewMetric: {
    alignItems: 'center',
  },
  creatorOverviewLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  creatorOverviewValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  creatorsContainer: {
    gap: 12,
  },
  creatorCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  creatorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  creatorName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  creatorPlatform: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  creatorPlatformText: {
    fontSize: 10,
    fontWeight: '600',
    color: THEME.textMuted,
  },
  creatorMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  creatorMetric: {
    flex: 1,
  },
  creatorMetricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  creatorMetricValue: {
    fontSize: 13,
    fontWeight: '600',
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
