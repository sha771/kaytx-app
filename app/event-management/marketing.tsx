import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  TrendingUp, Mail, Share2, DollarSign, CheckCircle, ArrowRight,
  BarChart3, Activity, Target, Users, Globe, Megaphone, Zap, Star
} from 'lucide-react-native';

export default function MarketingPromotionHub() {
  const router = useRouter();

  const MARKETING_STATS = [
    { label: 'Registrations', value: '12.4M', icon: Users, color: '#06B6D4', trend: '+14%' },
    { label: 'Conversion Rate', value: '24%', icon: Target, color: '#10B981', trend: '+4%' },
    { label: 'Social Engagement', value: '8.9M', icon: Share2, color: '#8B5CF6', trend: '+18%' },
    { label: 'Brand Reach', value: '156M', icon: Globe, color: '#F59E0B', trend: '+12%' },
  ];

  const CAMPAIGNS = [
    {
      id: 1,
      name: 'Tech Summit 2026 Launch',
      type: 'Email Campaign',
      status: 'active',
      sent: '2.4M',
      opened: '1.8M',
      clicked: '847K',
      converted: '124K',
      roi: 340,
      budget: '$240K',
      spent: '$180K',
      startDate: '2026-06-01',
      endDate: '2026-08-15'
    },
    {
      id: 2,
      name: 'Global Music Festival Social',
      type: 'Social Media',
      status: 'active',
      sent: '8.9M',
      opened: '6.2M',
      clicked: '3.4M',
      converted: '890K',
      roi: 520,
      budget: '$480K',
      spent: '$340K',
      startDate: '2026-05-15',
      endDate: '2026-09-20'
    },
    {
      id: 3,
      name: 'AI Innovation Conference',
      type: 'Multi-Channel',
      status: 'planned',
      sent: '0',
      opened: '0',
      clicked: '0',
      converted: '0',
      roi: 0,
      budget: '$320K',
      spent: '$0',
      startDate: '2026-07-01',
      endDate: '2026-10-10'
    },
  ];

  const CHANNEL_PERFORMANCE = [
    { channel: 'Email', reach: '4.2M', engagement: 42%, conversion: 24%, roi: 340, color: '#06B6D4' },
    { channel: 'Social Media', reach: '8.9M', engagement: 68%, conversion: 18%, roi: 520, color: '#8B5CF6' },
    { channel: 'Paid Ads', reach: '12.4M', engagement: 28%, conversion: 12%, roi: 280, color: '#10B981' },
    { channel: 'Influencer', reach: '2.8M', engagement: 54%, conversion: 22%, roi: 410, color: '#F59E0B' },
    { channel: 'Content Marketing', reach: '6.7M', engagement: 38%, conversion: 16%, roi: 320, color: '#EC4899' },
  ];

  const EMAIL_PERFORMANCE = [
    { metric: 'Total Sent', value: '4.2M', rate: 'N/A', color: '#06B6D4' },
    { metric: 'Open Rate', value: '42%', rate: '+4%', color: '#8B5CF6' },
    { metric: 'Click Rate', value: '18%', rate: '+6%', color: '#10B981' },
    { metric: 'Conversion', value: '24%', rate: '+8%', color: '#F59E0B' },
  ];

  const SOCIAL_PLATFORMS = [
    { platform: 'LinkedIn', followers: '2.4M', engagement: 8.7, posts: 847, color: '#0077B5' },
    { platform: 'Twitter/X', followers: '1.8M', engagement: 6.2, posts: 1240, color: '#1DA1F2' },
    { platform: 'Instagram', followers: '3.2M', engagement: 12.4, posts: 560, color: '#E4405F' },
    { platform: 'Facebook', followers: '4.1M', engagement: 5.8, posts: 340, color: '#1877F2' },
    { platform: 'YouTube', followers: '890K', engagement: 9.4, posts: 124, color: '#FF0000' },
  ];

  const AUDIENCE_GROWTH = [
    { period: 'This Week', newFollowers: '124K', engagement: '+8%', color: '#06B6D4' },
    { period: 'This Month', newFollowers: '847K', engagement: '+12%', color: '#8B5CF6' },
    { period: 'This Quarter', newFollowers: '2.4M', engagement: '+18%', color: '#10B981' },
    { period: 'This Year', newFollowers: '8.9M', engagement: '+24%', color: '#F59E0B' },
  ];

  const CAMPAIGN_ANALYTICS = [
    { metric: 'Avg ROI', value: '390x', target: '400x', color: '#10B981' },
    { metric: 'Conversion Rate', value: '24%', target: '28%', color: '#F59E0B' },
    { metric: 'Engagement Rate', value: '42%', target: '45%', color: '#06B6D4' },
    { metric: 'Cost Per Acquisition', value: '$12.40', target: '$10.00', color: '#8B5CF6' },
  ];

  const SOCIAL_ANALYTICS = [
    { platform: 'LinkedIn', impressions: '8.4M', engagement: '8.7%', clicks: '730K', conversions: '124K', color: '#0077B5' },
    { platform: 'Twitter/X', impressions: '12.2M', engagement: '6.2%', clicks: '756K', conversions: '89K', color: '#1DA1F2' },
    { platform: 'Instagram', impressions: '15.8M', engagement: '12.4%', clicks: '1.96M', conversions: '340K', color: '#E4405F' },
    { platform: 'Facebook', impressions: '18.4M', engagement: '5.8%', clicks: '1.07M', conversions: '156K', color: '#1877F2' },
  ];

  const CONTENT_PERFORMANCE = [
    { contentType: 'Video Posts', count: 124, avgEngagement: '15.8%', avgViews: '45.2K', color: '#06B6D4' },
    { contentType: 'Image Posts', count: 340, avgEngagement: '8.4%', avgViews: '28.6K', color: '#8B5CF6' },
    { contentType: 'Text Posts', count: 560, avgEngagement: '4.2%', avgViews: '12.4K', color: '#10B981' },
    { contentType: 'Stories', count: 890, avgEngagement: '18.6%', avgViews: '52.8K', color: '#F59E0B' },
  ];

  const AUDIENCE_SEGMENTS = [
    { segment: 'Professionals', count: '4.2M', engagement: '12%', conversion: '28%', color: '#06B6D4' },
    { segment: 'Students', count: '3.8M', engagement: '18%', conversion: '22%', color: '#8B5CF6' },
    { segment: 'Executives', count: '1.2M', engagement: '8%', conversion: '35%', color: '#FFD700' },
    { segment: 'Entrepreneurs', count: '2.4M', engagement: '15%', conversion: '32%', color: '#10B981' },
  ];

  const CONVERSION_FUNNEL = [
    { stage: 'Impressions', value: '54.8M', rate: 100, color: '#06B6D4' },
    { stage: 'Clicks', value: '4.5M', rate: 8.2, color: '#8B5CF6' },
    { stage: 'Sign-ups', value: '1.8M', rate: 40, color: '#10B981' },
    { stage: 'Registrations', value: '890K', rate: 49, color: '#F59E0B' },
    { stage: 'Purchases', value: '124K', rate: 14, color: '#EC4899' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'completed': return '#06B6D4';
      case 'planned': return '#F59E0B';
      case 'paused': return '#EF4444';
      default: return '#06B6D4';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Megaphone size={48} color="#06B6D4" />
        </View>
        <View>
          <Text style={styles.headerTitle}>Marketing & Promotion Hub</Text>
          <Text style={styles.headerSubtitle}>Campaigns & Audience Growth</Text>
        </View>
      </View>

      {/* Marketing Stats */}
      <View style={styles.statsContainer}>
        {MARKETING_STATS.map((stat, index) => (
          <View key={index} style={[styles.statCard, { borderColor: stat.color + '40' }]}>
            <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
              <stat.icon size={24} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <View style={[styles.trendBadge, { backgroundColor: stat.color + '20' }]}>
              <TrendingUp size={10} color={stat.color} />
              <Text style={[styles.trendText, { color: stat.color }]}>{stat.trend}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Channel Performance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Channel Performance</Text>
        {CHANNEL_PERFORMANCE.map((channel, index) => (
          <View key={index} style={[styles.channelCard, { borderColor: channel.color + '40' }]}>
            <View style={styles.channelHeader}>
              <Text style={styles.channelName}>{channel.channel}</Text>
              <Text style={[styles.channelRoi, { color: channel.color }]}>{channel.roi}x ROI</Text>
            </View>
            <View style={styles.channelMetrics}>
              <View style={styles.channelMetric}>
                <Globe size={14} color="#9CA3AF" />
                <Text style={styles.channelMetricLabel}>Reach: {channel.reach}</Text>
              </View>
              <View style={styles.channelMetric}>
                <Activity size={14} color="#9CA3AF" />
                <Text style={styles.channelMetricLabel}>Engagement: {channel.engagement}</Text>
              </View>
              <View style={styles.channelMetric}>
                <Target size={14} color="#9CA3AF" />
                <Text style={styles.channelMetricLabel}>Conversion: {channel.conversion}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Email Performance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Email Performance</Text>
        <View style={styles.emailGrid}>
          {EMAIL_PERFORMANCE.map((metric, index) => (
            <View key={index} style={[styles.emailCard, { borderColor: metric.color + '40' }]}>
              <Mail size={24} color={metric.color} />
              <Text style={styles.emailValue}>{metric.value}</Text>
              <Text style={styles.emailLabel}>{metric.metric}</Text>
              <View style={[styles.emailRate, { backgroundColor: metric.color + '20' }]}>
                <TrendingUp size={12} color={metric.color} />
                <Text style={[styles.emailRateText, { color: metric.color }]}>{metric.rate}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Social Platforms */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Social Platforms</Text>
        {SOCIAL_PLATFORMS.map((platform, index) => (
          <View key={index} style={[styles.platformCard, { borderColor: platform.color + '40' }]}>
            <View style={styles.platformHeader}>
              <View style={[styles.platformIcon, { backgroundColor: platform.color + '20' }]}>
                <Share2 size={24} color={platform.color} />
              </View>
              <View style={styles.platformInfo}>
                <Text style={styles.platformName}>{platform.platform}</Text>
                <Text style={styles.platformFollowers}>{platform.followers} followers</Text>
              </View>
              <View style={styles.platformEngagement}>
                <Star size={14} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.platformEngagementValue}>{platform.engagement}%</Text>
              </View>
            </View>
            <View style={styles.platformStats}>
              <View style={styles.platformStat}>
                <Text style={styles.platformStatLabel}>Posts</Text>
                <Text style={styles.platformStatValue}>{platform.posts}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Campaign Analytics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Campaign Analytics Dashboard</Text>
        <View style={styles.analyticsGrid}>
          {CAMPAIGN_ANALYTICS.map((metric, index) => (
            <View key={index} style={[styles.analyticsCard, { borderColor: metric.color + '40' }]}>
              <Text style={styles.analyticsValue}>{metric.value}</Text>
              <Text style={styles.analyticsMetric}>{metric.metric}</Text>
              <Text style={styles.analyticsTarget}>Target: {metric.target}</Text>
              <View style={[styles.analyticsIndicator, { backgroundColor: metric.color + '20' }]}>
                <TrendingUp size={10} color={metric.color} />
                <Text style={[styles.analyticsIndicatorText, { color: metric.color }]}>
                  {parseFloat(metric.value.replace('x', '').replace('%', '').replace('$', '')) >= parseFloat(metric.target.replace('x', '').replace('%', '').replace('$', '')) ? 'On Track' : 'Needs Attention'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Social Analytics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Social Media Analytics</Text>
        <Text style={styles.sectionDescription}>Platform-wise performance metrics</Text>
        {SOCIAL_ANALYTICS.map((platform, index) => (
          <View key={index} style={styles.socialAnalyticsCard}>
            <View style={styles.socialAnalyticsHeader}>
              <Text style={styles.socialAnalyticsPlatform}>{platform.platform}</Text>
              <View style={styles.socialAnalyticsStats}>
                <Text style={styles.socialAnalyticsImpressions}>{platform.impressions}</Text>
                <Text style={styles.socialAnalyticsEngagement}>{platform.engagement}</Text>
              </View>
            </View>
            <View style={styles.socialAnalyticsMetrics}>
              <View style={styles.socialAnalyticsMetric}>
                <Text style={styles.socialAnalyticsMetricLabel}>Clicks</Text>
                <Text style={styles.socialAnalyticsMetricValue}>{platform.clicks}</Text>
              </View>
              <View style={styles.socialAnalyticsMetric}>
                <Text style={styles.socialAnalyticsMetricLabel}>Conversions</Text>
                <Text style={styles.socialAnalyticsMetricValue}>{platform.conversions}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Content Performance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Content Performance</Text>
        <Text style={styles.sectionDescription}>Engagement metrics by content type</Text>
        {CONTENT_PERFORMANCE.map((content, index) => (
          <View key={index} style={styles.contentPerformanceCard}>
            <View style={styles.contentPerformanceHeader}>
              <Text style={styles.contentPerformanceType}>{content.contentType}</Text>
              <Text style={styles.contentPerformanceCount}>{content.count} posts</Text>
            </View>
            <View style={styles.contentPerformanceMetrics}>
              <View style={styles.contentPerformanceMetric}>
                <Text style={styles.contentPerformanceMetricLabel}>Avg Engagement</Text>
                <Text style={[styles.contentPerformanceMetricValue, { color: content.color }]}>{content.avgEngagement}</Text>
              </View>
              <View style={styles.contentPerformanceMetric}>
                <Text style={styles.contentPerformanceMetricLabel}>Avg Views</Text>
                <Text style={styles.contentPerformanceMetricValue}>{content.avgViews}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Audience Segments */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Audience Segmentation</Text>
        <Text style={styles.sectionDescription}>Performance by audience segment</Text>
        {AUDIENCE_SEGMENTS.map((segment, index) => (
          <View key={index} style={styles.segmentCard}>
            <View style={styles.segmentHeader}>
              <Text style={styles.segmentName}>{segment.segment}</Text>
              <Text style={styles.segmentCount}>{segment.count}</Text>
            </View>
            <View style={styles.segmentMetrics}>
              <View style={styles.segmentMetric}>
                <Text style={styles.segmentMetricLabel}>Engagement</Text>
                <Text style={[styles.segmentMetricValue, { color: segment.color }]}>{segment.engagement}</Text>
              </View>
              <View style={styles.segmentMetric}>
                <Text style={styles.segmentMetricLabel}>Conversion</Text>
                <Text style={[styles.segmentMetricValue, { color: segment.color }]}>{segment.conversion}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Conversion Funnel */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conversion Funnel</Text>
        <Text style={styles.sectionDescription}>End-to-end conversion tracking</Text>
        <View style={styles.funnelContainer}>
          {CONVERSION_FUNNEL.map((stage, index) => (
            <View key={index} style={styles.funnelStage}>
              <View style={styles.funnelStageHeader}>
                <Text style={styles.funnelStageName}>{stage.stage}</Text>
                <Text style={styles.funnelStageValue}>{stage.value}</Text>
              </View>
              <View style={styles.funnelStageBar}>
                <View 
                  style={[
                    styles.funnelStageFill, 
                    { width: `${stage.rate}%`, backgroundColor: stage.color }
                  ]} 
                />
              </View>
              <Text style={[styles.funnelStageRate, { color: stage.color }]}>{stage.rate}%</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Audience Growth */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Audience Growth</Text>
        <View style={styles.growthGrid}>
          {AUDIENCE_GROWTH.map((growth, index) => (
            <View key={index} style={[styles.growthCard, { borderColor: growth.color + '40' }]}>
              <Users size={24} color={growth.color} />
              <Text style={styles.growthValue}>{growth.newFollowers}</Text>
              <Text style={styles.growthLabel}>{growth.period}</Text>
              <View style={[styles.growthEngagement, { backgroundColor: growth.color + '20' }]}>
                <Activity size={12} color={growth.color} />
                <Text style={[styles.growthEngagementText, { color: growth.color }]}>{growth.engagement}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Campaigns */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Active Campaigns</Text>
        {CAMPAIGNS.map((campaign) => (
          <View key={campaign.id} style={[styles.campaignCard, { borderColor: getStatusColor(campaign.status) + '40' }]}>
            {/* Campaign Header */}
            <View style={styles.campaignHeader}>
              <View style={styles.campaignHeaderLeft}>
                <Text style={styles.campaignName}>{campaign.name}</Text>
                <Text style={styles.campaignType}>{campaign.type}</Text>
              </View>
              <View style={[styles.campaignStatus, { backgroundColor: getStatusColor(campaign.status) + '20' }]}>
                <Activity size={14} color={getStatusColor(campaign.status)} />
                <Text style={[styles.campaignStatusText, { color: getStatusColor(campaign.status) }]}>{campaign.status}</Text>
              </View>
            </View>

            {/* Funnel */}
            <View style={styles.funnelSection}>
              <Text style={styles.funnelTitle}>Campaign Funnel</Text>
              <View style={styles.funnelSteps}>
                <View style={styles.funnelStep}>
                  <Text style={styles.funnelStepLabel}>Sent</Text>
                  <Text style={styles.funnelStepValue}>{campaign.sent}</Text>
                </View>
                <View style={styles.funnelArrow}>→</View>
                <View style={styles.funnelStep}>
                  <Text style={styles.funnelStepLabel}>Opened</Text>
                  <Text style={styles.funnelStepValue}>{campaign.opened}</Text>
                </View>
                <View style={styles.funnelArrow}>→</View>
                <View style={styles.funnelStep}>
                  <Text style={styles.funnelStepLabel}>Clicked</Text>
                  <Text style={styles.funnelStepValue}>{campaign.clicked}</Text>
                </View>
                <View style={styles.funnelArrow}>→</View>
                <View style={styles.funnelStep}>
                  <Text style={styles.funnelStepLabel}>Converted</Text>
                  <Text style={[styles.funnelStepValue, { color: '#10B981' }]}>{campaign.converted}</Text>
                </View>
              </View>
            </View>

            {/* Budget */}
            <View style={styles.budgetSection}>
              <View style={styles.budgetItem}>
                <DollarSign size={16} color="#10B981" />
                <View>
                  <Text style={styles.budgetLabel}>Budget</Text>
                  <Text style={styles.budgetValue}>{campaign.budget}</Text>
                </View>
              </View>
              <View style={styles.budgetItem}>
                <TrendingUp size={16} color="#F59E0B" />
                <View>
                  <Text style={styles.budgetLabel}>Spent</Text>
                  <Text style={styles.budgetValue}>{campaign.spent}</Text>
                </View>
              </View>
              <View style={styles.budgetItem}>
                <Target size={16} color="#8B5CF6" />
                <View>
                  <Text style={styles.budgetLabel}>ROI</Text>
                  <Text style={styles.budgetValue}>{campaign.roi}x</Text>
                </View>
              </View>
            </View>

            {/* Dates */}
            <View style={styles.datesSection}>
              <View style={styles.dateItem}>
                <Text style={styles.dateLabel}>Start Date</Text>
                <Text style={styles.dateValue}>{campaign.startDate}</Text>
              </View>
              <View style={styles.dateItem}>
                <Text style={styles.dateLabel}>End Date</Text>
                <Text style={styles.dateValue}>{campaign.endDate}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.campaignButton, { backgroundColor: '#06B6D4' }]}
              onPress={() => router.push('/event-management/dashboard')}
            >
              <Text style={styles.campaignButtonText}>View Campaign Details</Text>
              <ArrowRight size={20} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#06B6D415', borderColor: '#06B6D440' }]}
          >
            <Mail size={24} color="#06B6D4" />
            <Text style={[styles.actionText, { color: '#06B6D4' }]}>New Campaign</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#8B5CF615', borderColor: '#8B5CF640' }]}
          >
            <Share2 size={24} color="#8B5CF6" />
            <Text style={[styles.actionText, { color: '#8B5CF6' }]}>Social Post</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#10B98115', borderColor: '#10B98140' }]}
          >
            <BarChart3 size={24} color="#10B981" />
            <Text style={[styles.actionText, { color: '#10B981' }]}>Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#F59E0B15', borderColor: '#F59E0B40' }]}
          >
            <Zap size={24} color="#F59E0B" />
            <Text style={[styles.actionText, { color: '#F59E0B' }]}>Boost Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03050A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#06B6D440',
    gap: 16,
  },
  headerIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#06B6D420',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '600',
  },
  section: {
    padding: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  channelCard: {
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  channelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  channelName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  channelRoi: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  channelMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  channelMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  channelMetricLabel: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  emailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  emailCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  emailValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  emailLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  emailRate: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  emailRateText: {
    fontSize: 11,
    fontWeight: '600',
  },
  platformCard: {
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  platformHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  platformIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  platformInfo: {
    flex: 1,
  },
  platformName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  platformFollowers: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  platformEngagement: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  platformEngagementValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F59E0B',
  },
  platformStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
  },
  platformStat: {
    alignItems: 'center',
  },
  platformStatLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  platformStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  growthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  growthCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  growthValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  growthLabel: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  growthEngagement: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  growthEngagementText: {
    fontSize: 11,
    fontWeight: '600',
  },
  campaignCard: {
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  campaignHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  campaignHeaderLeft: {
    flex: 1,
  },
  campaignName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  campaignType: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  campaignStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
  },
  campaignStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  funnelSection: {
    marginBottom: 16,
  },
  funnelTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  funnelSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
  },
  funnelStep: {
    alignItems: 'center',
  },
  funnelStepLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  funnelStepValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  funnelArrow: {
    fontSize: 18,
    color: '#6B7280',
  },
  budgetSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  budgetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  budgetLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  budgetValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  datesSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  dateItem: {
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  dateValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  campaignButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 12,
  },
  campaignButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionsSection: {
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    minWidth: 140,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  analyticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  analyticsCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  analyticsValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  analyticsMetric: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  analyticsTarget: {
    fontSize: 10,
    color: '#6B7280',
  },
  analyticsIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  analyticsIndicatorText: {
    fontSize: 11,
    fontWeight: '600',
  },
  socialAnalyticsCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  socialAnalyticsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  socialAnalyticsPlatform: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  socialAnalyticsStats: {
    alignItems: 'flex-end',
  },
  socialAnalyticsImpressions: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#06B6D4',
  },
  socialAnalyticsEngagement: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  socialAnalyticsMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  socialAnalyticsMetric: {
    alignItems: 'center',
  },
  socialAnalyticsMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  socialAnalyticsMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  contentPerformanceCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  contentPerformanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  contentPerformanceType: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  contentPerformanceCount: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  contentPerformanceMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contentPerformanceMetric: {
    alignItems: 'center',
  },
  contentPerformanceMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  contentPerformanceMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  segmentCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  segmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  segmentName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  segmentCount: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  segmentMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  segmentMetric: {
    alignItems: 'center',
  },
  segmentMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  segmentMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  funnelContainer: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
  },
  funnelStage: {
    marginBottom: 16,
  },
  funnelStageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  funnelStageName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  funnelStageValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  funnelStageBar: {
    height: 12,
    backgroundColor: '#1F2937',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 6,
  },
  funnelStageFill: {
    height: '100%',
    borderRadius: 6,
  },
  funnelStageRate: {
    fontSize: 12,
    fontWeight: '600',
  },
});
