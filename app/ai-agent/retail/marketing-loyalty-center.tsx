/**
 * =============================================================================
 * MARKETING & LOYALTY CENTER
 * =============================================================================
 *
 * A comprehensive marketing and loyalty dashboard that monitors campaign
 * performance, loyalty memberships, customer acquisition, engagement metrics,
 * and retention programs across the retail marketing ecosystem.
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
  Heart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Target,
  Activity,
  Zap,
  Users,
  Megaphone,
  Award,
  Gift,
  Star,
  Mail,
  MessageSquare,
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Theme Colors
const THEME = {
  background: '#03050A',
  card: '#0A0F1E',
  cardLight: '#121829',
  neonCyan: '#00F0FF',
  electricBlue: '#3B82F6',
  emeraldGreen: '#10B981',
  purple: '#8B5CF6',
  amber: '#F59E0B',
  red: '#EF4444',
  magenta: '#EC4899',
  text: '#E2E8F0',
  textMuted: '#94A3B8',
  border: '#1E293B',
};

// Marketing Metrics
const MARKETING_METRICS = {
  activeCampaigns: '124',
  totalImpressions: '847M',
  clickThroughRate: 4.2,
  conversionRate: 2.8,
  customerAcquisitionCost: '$42',
  returnOnAdSpend: 420,
};

// Campaign Performance
const CAMPAIGN_PERFORMANCE = [
  { campaign: 'Summer Sale 2024', impressions: '124M', clicks: '5.2M', conversions: '89K', roas: 520, status: 'excellent' },
  { campaign: 'Back to School', impressions: '89M', clicks: '3.8M', conversions: '67K', roas: 480, status: 'excellent' },
  { campaign: 'Loyalty Rewards Push', impressions: '67M', clicks: '2.4M', conversions: '45K', roas: 380, status: 'good' },
  { campaign: 'New Product Launch', impressions: '45M', clicks: '1.8M', conversions: '28K', roas: 340, status: 'good' },
  { campaign: 'Holiday Preview', impressions: '34M', clicks: '1.2M', conversions: '18K', roas: 290, status: 'review' },
];

// Loyalty Program Metrics
const LOYALTY_METRICS = {
  totalMembers: '34M',
  activeMembers: '28.4M',
  enrollmentRate: 71,
  redemptionRate: 68,
  avgPointsBalance: '2,450',
  tierDistribution: 'Platinum: 12%, Gold: 28%, Silver: 44%, Bronze: 16%',
};

// Channel Performance
const CHANNEL_PERFORMANCE = [
  { channel: 'Email', reach: '24M', engagement: 18, conversion: 3.2, cost: '$0.08' },
  { channel: 'Social Media', reach: '45M', engagement: 8, conversion: 1.8, cost: '$0.12' },
  { channel: 'SMS', reach: '12M', engagement: 42, conversion: 5.4, cost: '$0.15' },
  { channel: 'Push Notifications', reach: '28M', engagement: 15, conversion: 2.8, cost: '$0.05' },
  { channel: 'In-App', reach: '18M', engagement: 24, conversion: 4.2, cost: '$0.03' },
];

export default function MarketingLoyaltyCenter() {
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
          <ArrowUpRight size={12} color={THEME.emeraldGreen} />
          <Text style={[styles.trendText, { color: THEME.emeraldGreen }]}>{change}%</Text>
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

  const renderCampaignCard = (campaign: typeof CAMPAIGN_PERFORMANCE[0]) => {
    const statusColors = {
      excellent: THEME.emeraldGreen,
      good: THEME.electricBlue,
      review: THEME.amber,
      critical: THEME.red,
    };
    const color = statusColors[campaign.status as keyof typeof statusColors];

    return (
      <BlurView key={campaign.campaign} intensity={20} tint="dark" style={styles.campaignCard}>
        <Text style={styles.campaignName}>{campaign.campaign}</Text>
        <View style={styles.campaignMetrics}>
          <View style={styles.campaignMetric}>
            <Text style={styles.campaignMetricLabel}>Impressions</Text>
            <Text style={[styles.campaignMetricValue, { color: THEME.neonCyan }]}>{campaign.impressions}</Text>
          </View>
          <View style={styles.campaignMetric}>
            <Text style={styles.campaignMetricLabel}>Clicks</Text>
            <Text style={[styles.campaignMetricValue, { color: THEME.electricBlue }]}>{campaign.clicks}</Text>
          </View>
          <View style={styles.campaignMetric}>
            <Text style={styles.campaignMetricLabel}>Conversions</Text>
            <Text style={[styles.campaignMetricValue, { color: THEME.emeraldGreen }]}>{campaign.conversions}</Text>
          </View>
          <View style={styles.campaignMetric}>
            <Text style={styles.campaignMetricLabel}>ROAS</Text>
            <Text style={[styles.campaignMetricValue, { color: color }]}>{campaign.roas}%</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: color + '20' }]}>
          <Text style={[styles.statusText, { color }]}>{campaign.status.toUpperCase()}</Text>
        </View>
      </BlurView>
    );
  };

  const renderChannelCard = (channel: typeof CHANNEL_PERFORMANCE[0]) => {
    const channelIcons = {
      Email: Mail,
      'Social Media': MessageSquare,
      SMS: MessageSquare,
      'Push Notifications': Megaphone,
      'In-App': Activity,
    };
    const Icon = channelIcons[channel.channel as keyof typeof channelIcons];

    return (
      <BlurView key={channel.channel} intensity={20} tint="dark" style={styles.channelCard}>
        <View style={styles.channelHeader}>
          <Icon size={16} color={THEME.purple} />
          <Text style={styles.channelName}>{channel.channel}</Text>
        </View>
        <View style={styles.channelMetrics}>
          <View style={styles.channelMetric}>
            <Text style={styles.channelMetricLabel}>Reach</Text>
            <Text style={[styles.channelMetricValue, { color: THEME.neonCyan }]}>{channel.reach}</Text>
          </View>
          <View style={styles.channelMetric}>
            <Text style={styles.channelMetricLabel}>Engagement</Text>
            <Text style={[styles.channelMetricValue, { color: THEME.electricBlue }]}>{channel.engagement}%</Text>
          </View>
          <View style={styles.channelMetric}>
            <Text style={styles.channelMetricLabel}>Conversion</Text>
            <Text style={[styles.channelMetricValue, { color: THEME.emeraldGreen }]}>{channel.conversion}%</Text>
          </View>
          <View style={styles.channelMetric}>
            <Text style={styles.channelMetricLabel}>Cost</Text>
            <Text style={[styles.channelMetricValue, { color: THEME.amber }]}>{channel.cost}</Text>
          </View>
        </View>
      </BlurView>
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
            <Heart size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Marketing & Loyalty Center</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Marketing Metrics */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <BarChart3 size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Marketing Metrics</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.metricsCard}>
            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <Megaphone size={20} color={THEME.neonCyan} />
                <Text style={styles.metricLabel}>Active Campaigns</Text>
                <Text style={[styles.metricValue, { color: THEME.neonCyan }]}>{MARKETING_METRICS.activeCampaigns}</Text>
              </View>
              <View style={styles.metricItem}>
                <Users size={20} color={THEME.electricBlue} />
                <Text style={styles.metricLabel}>Total Impressions</Text>
                <Text style={[styles.metricValue, { color: THEME.electricBlue }]}>{MARKETING_METRICS.totalImpressions}</Text>
              </View>
              <View style={styles.metricItem}>
                <Target size={20} color={THEME.emeraldGreen} />
                <Text style={styles.metricLabel}>CTR</Text>
                <Text style={[styles.metricValue, { color: THEME.emeraldGreen }]}>{MARKETING_METRICS.clickThroughRate}%</Text>
              </View>
              <View style={styles.metricItem}>
                <TrendingUp size={20} color={THEME.purple} />
                <Text style={styles.metricLabel}>Conversion Rate</Text>
                <Text style={[styles.metricValue, { color: THEME.purple }]}>{MARKETING_METRICS.conversionRate}%</Text>
              </View>
              <View style={styles.metricItem}>
                <Award size={20} color={THEME.amber} />
                <Text style={styles.metricLabel}>CAC</Text>
                <Text style={[styles.metricValue, { color: THEME.amber }]}>{MARKETING_METRICS.customerAcquisitionCost}</Text>
              </View>
              <View style={styles.metricItem}>
                <Zap size={20} color={THEME.magenta} />
                <Text style={styles.metricLabel}>ROAS</Text>
                <Text style={[styles.metricValue, { color: THEME.magenta }]}>{MARKETING_METRICS.returnOnAdSpend}%</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Campaign Performance */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Megaphone size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Campaign Performance</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.campaignsScroll}>
            <View style={styles.campaignsContainer}>
              {CAMPAIGN_PERFORMANCE.map((campaign) => renderCampaignCard(campaign))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Loyalty Program Metrics */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Gift size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Loyalty Program</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.loyaltyCard}>
            <View style={styles.loyaltyMetrics}>
              <View style={styles.loyaltyMetric}>
                <Star size={20} color={THEME.neonCyan} />
                <Text style={styles.loyaltyMetricLabel}>Total Members</Text>
                <Text style={[styles.loyaltyMetricValue, { color: THEME.neonCyan }]}>{LOYALTY_METRICS.totalMembers}</Text>
              </View>
              <View style={styles.loyaltyMetric}>
                <Activity size={20} color={THEME.electricBlue} />
                <Text style={styles.loyaltyMetricLabel}>Active Members</Text>
                <Text style={[styles.loyaltyMetricValue, { color: THEME.electricBlue }]}>{LOYALTY_METRICS.activeMembers}</Text>
              </View>
              <View style={styles.loyaltyMetric}>
                <Target size={20} color={THEME.emeraldGreen} />
                <Text style={styles.loyaltyMetricLabel}>Enrollment Rate</Text>
                <Text style={[styles.loyaltyMetricValue, { color: THEME.emeraldGreen }]}>{LOYALTY_METRICS.enrollmentRate}%</Text>
              </View>
              <View style={styles.loyaltyMetric}>
                <Award size={20} color={THEME.purple} />
                <Text style={styles.loyaltyMetricLabel}>Redemption Rate</Text>
                <Text style={[styles.loyaltyMetricValue, { color: THEME.purple }]}>{LOYALTY_METRICS.redemptionRate}%</Text>
              </View>
              <View style={styles.loyaltyMetric}>
                <Gift size={20} color={THEME.amber} />
                <Text style={styles.loyaltyMetricLabel}>Avg Points Balance</Text>
                <Text style={[styles.loyaltyMetricValue, { color: THEME.amber }]}>{LOYALTY_METRICS.avgPointsBalance}</Text>
              </View>
            </View>
            <View style={styles.tierDistribution}>
              <Text style={styles.tierLabel}>Tier Distribution</Text>
              <Text style={styles.tierValue}>{LOYALTY_METRICS.tierDistribution}</Text>
            </View>
          </BlurView>
        </Animated.View>

        {/* Channel Performance */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <MessageSquare size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Channel Performance</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.channelsScroll}>
            <View style={styles.channelsContainer}>
              {CHANNEL_PERFORMANCE.map((channel) => renderChannelCard(channel))}
            </View>
          </ScrollView>
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
  metricsCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metricItem: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginTop: 8,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  campaignsScroll: {
    marginBottom: 0,
  },
  campaignsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  campaignCard: {
    width: 200,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  campaignName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 12,
  },
  campaignMetrics: {
    gap: 8,
    marginBottom: 12,
  },
  campaignMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  campaignMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  campaignMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  loyaltyCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  loyaltyMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
  },
  loyaltyMetric: {
    width: (SCREEN_WIDTH - 96) / 2,
    backgroundColor: THEME.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  loyaltyMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginTop: 8,
    marginBottom: 4,
  },
  loyaltyMetricValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  tierDistribution: {
    backgroundColor: THEME.card,
    borderRadius: 12,
    padding: 16,
  },
  tierLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 8,
  },
  tierValue: {
    fontSize: 13,
    color: THEME.textMuted,
  },
  channelsScroll: {
    marginBottom: 0,
  },
  channelsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  channelCard: {
    width: 160,
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
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  channelMetrics: {
    gap: 8,
  },
  channelMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  channelMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  channelMetricValue: {
    fontSize: 14,
    fontWeight: '600,
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
