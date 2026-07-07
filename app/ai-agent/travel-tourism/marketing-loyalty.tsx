import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Megaphone, Users, Award, DollarSign, CheckCircle, Clock, Target,
  TrendingUp, AlertTriangle, Activity, ArrowUpRight, Heart, Gift
} from 'lucide-react-native';
import { TRAVEL_COLORS, MARKETING_METRICS, LOYALTY_DATA } from '@/constants/travelTourism';

const { width } = Dimensions.get('window');

export default function MarketingLoyalty() {
  const MARKETING_LOYALTY_METRICS = [
    { label: 'Campaign ROI', value: '420%', icon: DollarSign, color: TRAVEL_COLORS.emeraldGreen, trend: '+34.2%', trendUp: true },
    { label: 'Loyalty Members', value: '18.4M', icon: Award, color: TRAVEL_COLORS.amber, trend: '+28.6%', trendUp: true },
    { label: 'Customer Acquisition', value: '4.2M', icon: Users, color: TRAVEL_COLORS.purple, trend: '+22.4%', trendUp: true },
    { label: 'Referral Program', value: '840K', icon: Heart, color: TRAVEL_COLORS.magenta, trend: '+18.6%', trendUp: true },
    { label: 'Brand Engagement', value: '94.2%', icon: Target, color: TRAVEL_COLORS.neonCyan, trend: '+6.4%', trendUp: true },
    { label: 'Active Campaigns', value: '48', icon: Megaphone, color: TRAVEL_COLORS.oceanBlue, trend: '+12.4%', trendUp: true },
  ];

  const CAMPAIGN_PERFORMANCE = [
    { campaign: 'Summer Escape', impressions: '48.2M', clicks: '2.4M', conversions: '84K', roi: '420%', color: TRAVEL_COLORS.emeraldGreen },
    { campaign: 'Luxury Getaway', impressions: '28.4M', clicks: '1.8M', conversions: '62K', roi: '380%', color: TRAVEL_COLORS.purple },
    { campaign: 'Family Adventure', impressions: '36.8M', clicks: '2.2M', conversions: '78K', roi: '360%', color: TRAVEL_COLORS.oceanBlue },
    { campaign: 'Business Travel', impressions: '18.4M', clicks: '840K', conversions: '42K', roi: '320%', color: TRAVEL_COLORS.amber },
  ];

  const MARKETING_ALERTS = [
    { type: 'opportunity', message: 'Summer campaign projected 42% higher engagement than forecast', impact: 'High', time: '2h ago' },
    { type: 'trend', message: 'Loyalty program enrollment increased 28.6% this quarter', impact: 'Medium', time: '4h ago' },
    { type: 'success', message: 'Marketing campaigns generated $2.4B in revenue', impact: 'Positive', time: '6h ago' },
    { type: 'info', message: 'New referral program launched with 18% conversion rate', impact: 'Low', time: '8h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Marketing & Loyalty Metrics</Text>
      <View style={styles.metricsGrid}>
        {MARKETING_LOYALTY_METRICS.map((metric, index) => (
          <View key={index} style={[styles.metricCard, { backgroundColor: metric.color + '10', borderColor: metric.color }]}>
            <metric.icon size={24} color={metric.color} />
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={styles.metricLabel}>{metric.label}</Text>
            <View style={styles.metricTrend}>
              {metric.trendUp ? <ArrowUpRight size={12} color="#10B981" /> : <Activity size={12} color="#EF4444" />}
              <Text style={[styles.metricTrendText, { color: metric.trendUp ? '#10B981' : '#EF4444' }]}>{metric.trend}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderCampaignPerformance = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Campaign Performance</Text>
      <View style={styles.campaignsList}>
        {CAMPAIGN_PERFORMANCE.map((campaign) => (
          <View key={campaign.campaign} style={[styles.campaignCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: campaign.color }]}>
            <View style={styles.campaignHeader}>
              <Megaphone size={20} color={campaign.color} />
              <Text style={styles.campaignName}>{campaign.campaign}</Text>
              <Text style={[styles.campaignRoi, { color: '#10B981' }]}>{campaign.roi}</Text>
            </View>
            <View style={styles.campaignMetrics}>
              <View style={styles.campaignMetric}>
                <Text style={styles.campaignMetricLabel}>Impressions</Text>
                <Text style={styles.campaignMetricValue}>{campaign.impressions}</Text>
              </View>
              <View style={styles.campaignMetric}>
                <Text style={styles.campaignMetricLabel}>Clicks</Text>
                <Text style={styles.campaignMetricValue}>{campaign.clicks}</Text>
              </View>
              <View style={styles.campaignMetric}>
                <Text style={styles.campaignMetricLabel}>Conversions</Text>
                <Text style={styles.campaignMetricValue}>{campaign.conversions}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderLoyaltyData = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Loyalty Program Overview</Text>
      <View style={styles.loyaltyOverview}>
        <View style={[styles.loyaltyStatCard, { backgroundColor: TRAVEL_COLORS.amber + '10', borderColor: TRAVEL_COLORS.amber }]}>
          <Award size={32} color={TRAVEL_COLORS.amber} />
          <Text style={styles.loyaltyStatValue}>{LOYALTY_DATA.totalMembers}</Text>
          <Text style={styles.loyaltyStatLabel}>Total Members</Text>
        </View>
        <View style={[styles.loyaltyStatCard, { backgroundColor: TRAVEL_COLORS.emeraldGreen + '10', borderColor: TRAVEL_COLORS.emeraldGreen }]}>
          <Users size={32} color={TRAVEL_COLORS.emeraldGreen} />
          <Text style={styles.loyaltyStatValue}>{LOYALTY_DATA.activeMembers}</Text>
          <Text style={styles.loyaltyStatLabel}>Active Members</Text>
        </View>
        <View style={[styles.loyaltyStatCard, { backgroundColor: TRAVEL_COLORS.purple + '10', borderColor: TRAVEL_COLORS.purple }]}>
          <Gift size={32} color={TRAVEL_COLORS.purple} />
          <Text style={styles.loyaltyStatValue}>{LOYALTY_DATA.pointsIssued}</Text>
          <Text style={styles.loyaltyStatLabel}>Points Issued</Text>
        </View>
        <View style={[styles.loyaltyStatCard, { backgroundColor: TRAVEL_COLORS.oceanBlue + '10', borderColor: TRAVEL_COLORS.oceanBlue }]}>
          <DollarSign size={32} color={TRAVEL_COLORS.oceanBlue} />
          <Text style={styles.loyaltyStatValue}>{LOYALTY_DATA.rewardValue}</Text>
          <Text style={styles.loyaltyStatLabel}>Reward Value</Text>
        </View>
      </View>
      <View style={styles.tiersList}>
        {LOYALTY_DATA.tierDistribution.map((tier) => (
          <View key={tier.tier} style={[styles.tierCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: TRAVEL_COLORS.amber }]}>
            <View style={styles.tierHeader}>
              <Award size={20} color={TRAVEL_COLORS.amber} />
              <Text style={styles.tierName}>{tier.tier}</Text>
              <Text style={styles.tierMembers}>{tier.members}</Text>
            </View>
            <View style={styles.tierMetrics}>
              <View style={styles.tierMetric}>
                <Text style={styles.tierMetricLabel}>Benefits</Text>
                <Text style={styles.tierMetricValue}>{tier.benefits}</Text>
              </View>
              <View style={styles.tierMetric}>
                <Text style={styles.tierMetricLabel}>Retention</Text>
                <Text style={[styles.tierMetricValue, { color: '#10B981' }]}>{tier.retention}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Marketing Alerts</Text>
      {MARKETING_ALERTS.map((alert, index) => (
        <View key={index} style={[styles.alertCard, { 
          backgroundColor: alert.type === 'opportunity' ? '#10B98110' : 
                       alert.type === 'trend' ? '#3B82F610' : 
                       alert.type === 'success' ? '#10B98110' : '#8B5CF610',
          borderLeftColor: alert.type === 'opportunity' ? '#10B981' : 
                          alert.type === 'trend' ? '#3B82F6' : 
                          alert.type === 'success' ? '#10B981' : '#8B5CF6',
          borderLeftWidth: 3
        }]}>
          <View style={styles.alertHeader}>
            {alert.type === 'opportunity' && <TrendingUp size={20} color="#10B981" />}
            {alert.type === 'trend' && <Activity size={20} color="#3B82F6" />}
            {alert.type === 'success' && <CheckCircle size={20} color="#10B981" />}
            {alert.type === 'info' && <Megaphone size={20} color="#8B5CF6" />}
            <Text style={styles.alertMessage}>{alert.message}</Text>
          </View>
          <View style={styles.alertFooter}>
            <View style={[styles.impactBadge, { backgroundColor: alert.impact === 'High' ? '#EF444420' : alert.impact === 'Medium' ? '#F59E0B20' : '#3B82F620' }]}>
              <Text style={[styles.impactText, { color: alert.impact === 'High' ? '#EF4444' : alert.impact === 'Medium' ? '#F59E0B' : '#3B82F6' }]}>{alert.impact}</Text>
            </View>
            <Clock size={12} color="#6B7280" />
            <Text style={styles.alertTime}>{alert.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Megaphone size={32} color={TRAVEL_COLORS.oceanBlue} />
        <View>
          <Text style={styles.headerTitle}>Marketing & Loyalty Center</Text>
          <Text style={styles.headerSubtitle}>Campaign management and loyalty program</Text>
        </View>
      </View>

      {renderMetrics()}
      {renderCampaignPerformance()}
      {renderLoyaltyData()}
      {renderAlerts()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TRAVEL_COLORS.deepSpaceBlack,
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
  campaignsList: {
    gap: 12,
  },
  campaignCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  campaignHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  campaignName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  campaignRoi: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  campaignMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  campaignMetric: {
    alignItems: 'center',
  },
  campaignMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  campaignMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  loyaltyOverview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  loyaltyStatCard: {
    width: (width - 64) / 4 - 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    alignItems: 'center',
  },
  loyaltyStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  loyaltyStatLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  tiersList: {
    gap: 12,
  },
  tierCard: {
    padding: 16,
    borderRadius: 12,
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
  tierMembers: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tierMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  tierMetric: {
    alignItems: 'center',
  },
  tierMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  tierMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
