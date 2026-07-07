import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Target, TrendingUp, ArrowUpRight, ArrowDownRight,
  BarChart3, Users, DollarSign, Activity, Heart,
  Award, Megaphone, Mail, Gift, Star, CheckCircle,
  AlertTriangle, MoreHorizontal, Zap
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function MarketingLoyaltyPage() {
  const MARKETING_METRICS = [
    { label: 'Campaign Performance', value: '94.2%', icon: Target, color: '#10B981', trend: '+5.8%', trendUp: true },
    { label: 'Loyalty Memberships', value: '28.5M', icon: Award, color: '#3B82F6', trend: '+12.7%', trendUp: true },
    { label: 'Customer Acquisition', value: '+18.4%', icon: Users, color: '#8B5CF6', trend: '+3.2%', trendUp: true },
    { label: 'Engagement Rate', value: '67.8%', icon: Heart, color: '#F59E0B', trend: '+4.6%', trendUp: true },
    { label: 'Retention Programs', value: '+14.2%', icon: Activity, color: '#EC4899', trend: '+2.8%', trendUp: true },
    { label: 'Marketing ROI', value: '4.2x', icon: DollarSign, color: '#06B6D4', trend: '+0.8%', trendUp: true },
  ];

  const ACTIVE_CAMPAIGNS = [
    { campaign: 'Summer Sale 2024', type: 'Promotion', reach: '12.4M', engagement: '68%', conversion: '12%', revenue: '$42.8M', status: 'Active', color: '#10B981' },
    { campaign: 'Loyalty Upgrade Drive', type: 'Retention', reach: '5.8M', engagement: '74%', conversion: '18%', revenue: '$12.6M', status: 'Active', color: '#3B82F6' },
    { campaign: 'New Product Launch', type: 'Acquisition', reach: '8.6M', engagement: '62%', conversion: '8%', revenue: '$18.4M', status: 'Active', color: '#8B5CF6' },
    { campaign: 'Back to School', type: 'Seasonal', reach: '6.2M', engagement: '71%', conversion: '15%', revenue: '$24.2M', status: 'Active', color: '#F59E0B' },
  ];

  const LOYALTY_PROGRAMS = [
    { program: 'Platinum Elite', members: '2.4M', benefits: '5% cashback, free shipping, exclusive access', retention: '94.2%', spend: '$2,840', color: '#8B5CF6' },
    { program: 'Gold Premium', members: '8.2M', benefits: '3% cashback, free shipping over $50', retention: '88.6%', spend: '$1,420', color: '#F59E0B' },
    { program: 'Silver Standard', members: '12.8M', benefits: '1% cashback, birthday rewards', retention: '82.4%', spend: '$680', color: '#6B7280' },
    { program: 'Bronze Basic', members: '5.1M', benefits: 'Special offers, points system', retention: '76.8%', spend: '$340', color: '#CD7F32' },
  ];

  const CHANNEL_PERFORMANCE = [
    { channel: 'Email', reach: '24.8M', openRate: '42%', clickRate: '18%', conversion: '8%', roi: '4.2x', color: '#3B82F6' },
    { channel: 'Social Media', reach: '18.4M', engagement: '68%', clickRate: '12%', conversion: '6%', roi: '3.8x', color: '#EC4899' },
    { channel: 'SMS', reach: '8.6M', openRate: '94%', clickRate: '28%', conversion: '14%', roi: '5.2x', color: '#10B981' },
    { channel: 'In-App', reach: '12.2M', engagement: '78%', clickRate: '22%', conversion: '16%', roi: '6.4x', color: '#8B5CF6' },
    { channel: 'Direct Mail', reach: '4.2M', response: '12%', conversion: '4%', roi: '2.8x', color: '#F59E0B' },
  ];

  const LOYALTY_TIERS_GROWTH = [
    { tier: 'Platinum', current: '2.4M', target: '3.0M', progress: '80%', growth: '+18.4%', color: '#8B5CF6' },
    { tier: 'Gold', current: '8.2M', target: '10.0M', progress: '82%', growth: '+14.2%', color: '#F59E0B' },
    { tier: 'Silver', current: '12.8M', target: '15.0M', progress: '85%', growth: '+12.8%', color: '#6B7280' },
    { tier: 'Bronze', current: '5.1M', target: '6.0M', progress: '85%', growth: '+10.6%', color: '#CD7F32' },
  ];

  const MARKETING_ALERTS = [
    { type: 'warning', message: 'Email campaign showing 8% below average open rate', impact: 'Medium', time: '2h ago' },
    { type: 'critical', message: 'Social media ad spend exceeding budget by 15%', impact: 'High', time: '4h ago' },
    { type: 'info', message: 'New loyalty program opportunity identified', impact: 'Low', time: '6h ago' },
    { type: 'success', message: 'Summer Sale campaign exceeded revenue target by 22%', impact: 'Positive', time: '8h ago' },
  ];

  const renderMarketingMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Marketing Metrics</Text>
      <View style={styles.metricsGrid}>
        {MARKETING_METRICS.map((metric, index) => (
          <View key={index} style={[styles.metricCard, { backgroundColor: metric.color + '10', borderColor: metric.color }]}>
            <metric.icon size={24} color={metric.color} />
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={styles.metricLabel}>{metric.label}</Text>
            <View style={styles.metricTrend}>
              {metric.trendUp ? <ArrowUpRight size={12} color="#10B981" /> : <ArrowDownRight size={12} color="#EF4444" />}
              <Text style={[styles.metricTrendText, { color: metric.trendUp ? '#10B981' : '#EF4444' }]}>{metric.trend}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderActiveCampaigns = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Active Campaigns</Text>
      <View style={styles.campaignsGrid}>
        {ACTIVE_CAMPAIGNS.map((campaign) => (
          <View key={campaign.campaign} style={[styles.campaignCard, { backgroundColor: campaign.color + '10', borderColor: campaign.color }]}>
            <Megaphone size={24} color={campaign.color} />
            <Text style={styles.campaignName}>{campaign.campaign}</Text>
            <View style={[styles.campaignType, { backgroundColor: campaign.color + '20' }]}>
              <Text style={[styles.campaignTypeText, { color: campaign.color }]}>{campaign.type}</Text>
            </View>
            <View style={styles.campaignMetrics}>
              <View style={styles.campaignMetric}>
                <Users size={12} color="#6B7280" />
                <Text style={styles.campaignMetricText}>{campaign.reach}</Text>
              </View>
              <View style={styles.campaignMetric}>
                <Heart size={12} color="#6B7280" />
                <Text style={styles.campaignMetricText}>{campaign.engagement}</Text>
              </View>
              <View style={styles.campaignMetric}>
                <Target size={12} color="#6B7280" />
                <Text style={styles.campaignMetricText}>{campaign.conversion}</Text>
              </View>
            </View>
            <View style={styles.campaignRevenue}>
              <DollarSign size={14} color="#10B981" />
              <Text style={styles.campaignRevenueText}>{campaign.revenue}</Text>
            </View>
            <View style={[styles.campaignStatus, { backgroundColor: '#10B98120' }]}>
              <CheckCircle size={12} color="#10B981" />
              <Text style={styles.campaignStatusText}>{campaign.status}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderLoyaltyPrograms = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Loyalty Programs</Text>
      {LOYALTY_PROGRAMS.map((program) => (
        <View key={program.program} style={[styles.loyaltyCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: program.color }]}>
          <View style={styles.loyaltyHeader}>
            <Award size={20} color={program.color} />
            <Text style={styles.loyaltyProgram}>{program.program}</Text>
            <Text style={styles.loyaltyMembers}>{program.members} members</Text>
          </View>
          <Text style={styles.loyaltyBenefits}>{program.benefits}</Text>
          <View style={styles.loyaltyMetrics}>
            <View style={styles.loyaltyMetric}>
              <Text style={styles.loyaltyMetricLabel}>Retention</Text>
              <Text style={styles.loyaltyMetricValue}>{program.retention}</Text>
            </View>
            <View style={styles.loyaltyMetric}>
              <Text style={styles.loyaltyMetricLabel}>Avg Spend</Text>
              <Text style={styles.loyaltyMetricValue}>{program.spend}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderChannelPerformance = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Channel Performance</Text>
      <View style={styles.channelList}>
        {CHANNEL_PERFORMANCE.map((channel) => (
          <View key={channel.channel} style={[styles.channelCard, { backgroundColor: channel.color + '10', borderColor: channel.color }]}>
            <View style={styles.channelHeader}>
              {channel.channel === 'Email' && <Mail size={20} color={channel.color} />}
              {channel.channel === 'Social Media' && <Heart size={20} color={channel.color} />}
              {channel.channel === 'SMS' && <Zap size={20} color={channel.color} />}
              {channel.channel === 'In-App' && <Target size={20} color={channel.color} />}
              {channel.channel === 'Direct Mail' && <Gift size={20} color={channel.color} />}
              <Text style={styles.channelName}>{channel.channel}</Text>
              <Text style={styles.channelReach}>{channel.reach}</Text>
            </View>
            <View style={styles.channelMetrics}>
              <View style={styles.channelMetric}>
                <Text style={styles.channelMetricLabel}>Open/Engage</Text>
                <Text style={styles.channelMetricValue}>{channel.openRate || channel.engagement}</Text>
              </View>
              <View style={styles.channelMetric}>
                <Text style={styles.channelMetricLabel}>Click</Text>
                <Text style={styles.channelMetricValue}>{channel.clickRate}</Text>
              </View>
              <View style={styles.channelMetric}>
                <Text style={styles.channelMetricLabel}>Conversion</Text>
                <Text style={styles.channelMetricValue}>{channel.conversion}</Text>
              </View>
              <View style={styles.channelMetric}>
                <Text style={styles.channelMetricLabel}>ROI</Text>
                <Text style={[styles.channelMetricValue, { color: '#10B981' }]}>{channel.roi}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderLoyaltyTiersGrowth = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Loyalty Tiers Growth</Text>
      {LOYALTY_TIERS_GROWTH.map((tier) => (
        <View key={tier.tier} style={[styles.tierCard, { backgroundColor: '#0A0F1A' }]}>
          <View style={styles.tierHeader}>
            <Star size={20} color={tier.color} />
            <Text style={styles.tierName}>{tier.tier}</Text>
            <Text style={styles.tierCurrent}>{tier.current}</Text>
          </View>
          <View style={styles.tierProgress}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: tier.progress, backgroundColor: tier.color }]} />
            </View>
            <Text style={styles.progressText}>{tier.progress}</Text>
          </View>
          <View style={styles.tierTarget}>
            <Text style={styles.tierTargetLabel}>Target: {tier.target}</Text>
            <Text style={[styles.tierGrowth, { color: '#10B981' }]}>{tier.growth}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderMarketingAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Marketing Alerts</Text>
      {MARKETING_ALERTS.map((alert, index) => (
        <View key={index} style={[styles.alertCard, { 
          backgroundColor: alert.type === 'critical' ? '#EF444410' : 
                       alert.type === 'warning' ? '#F59E0B10' : 
                       alert.type === 'success' ? '#10B98110' : '#3B82F610',
          borderLeftColor: alert.type === 'critical' ? '#EF4444' : 
                          alert.type === 'warning' ? '#F59E0B' : 
                          alert.type === 'success' ? '#10B981' : '#3B82F6',
          borderLeftWidth: 3
        }]}>
          <View style={styles.alertHeader}>
            {alert.type === 'critical' && <AlertTriangle size={20} color="#EF4444" />}
            {alert.type === 'warning' && <AlertTriangle size={20} color="#F59E0B" />}
            {alert.type === 'success' && <CheckCircle size={20} color="#10B981" />}
            {alert.type === 'info' && <Activity size={20} color="#3B82F6" />}
            <Text style={styles.alertMessage}>{alert.message}</Text>
          </View>
          <View style={styles.alertFooter}>
            <View style={[styles.impactBadge, { backgroundColor: alert.impact === 'High' ? '#EF444420' : alert.impact === 'Medium' ? '#F59E0B20' : '#3B82F620' }]}>
              <Text style={[styles.impactText, { color: alert.impact === 'High' ? '#EF4444' : alert.impact === 'Medium' ? '#F59E0B' : '#3B82F6' }]}>{alert.impact}</Text>
            </View>
            <Text style={styles.alertTime}>{alert.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Target size={32} color="#8B5CF6" />
        <View>
          <Text style={styles.headerTitle}>Marketing & Loyalty Center</Text>
          <Text style={styles.headerSubtitle}>Campaign performance and loyalty program optimization</Text>
        </View>
      </View>

      {renderMarketingMetrics()}
      {renderActiveCampaigns()}
      {renderLoyaltyPrograms()}
      {renderChannelPerformance()}
      {renderLoyaltyTiersGrowth()}
      {renderMarketingAlerts()}
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
    padding: 24,
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: (width - 64) / 3 - 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricTrendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  campaignsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  campaignCard: {
    width: (width - 64) / 2 - 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    alignItems: 'center',
  },
  campaignName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  campaignType: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  campaignTypeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  campaignMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  campaignMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  campaignMetricText: {
    fontSize: 11,
    color: '#6B7280',
  },
  campaignRevenue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  campaignRevenueText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10B981',
  },
  campaignStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  campaignStatusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#10B981',
  },
  loyaltyCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  loyaltyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  loyaltyProgram: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  loyaltyMembers: {
    fontSize: 12,
    color: '#6B7280',
  },
  loyaltyBenefits: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  loyaltyMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  loyaltyMetric: {
    alignItems: 'center',
  },
  loyaltyMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  loyaltyMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  channelList: {
    gap: 12,
  },
  channelCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  channelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  channelName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  channelReach: {
    fontSize: 12,
    color: '#6B7280',
  },
  channelMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  channelMetric: {
    alignItems: 'center',
  },
  channelMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  channelMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tierCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  tierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tierName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  tierCurrent: {
    fontSize: 12,
    color: '#6B7280',
  },
  tierProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#1E293B',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  tierTarget: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tierTargetLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  tierGrowth: {
    fontSize: 12,
    fontWeight: '600',
  },
  alertCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  alertMessage: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
  },
  alertFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  impactText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  alertTime: {
    fontSize: 12,
    color: '#6B7280',
  },
});
