import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Users, Heart, TrendingUp, Target, ArrowUpRight, 
  ArrowDownRight, BarChart3, Star, Award, 
  ShoppingBag, Clock, AlertTriangle, CheckCircle,
  DollarSign, Activity, Zap, Gift
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function CustomerIntelligencePage() {
  const CUSTOMER_METRICS = [
    { label: 'Active Customers', value: '48M', icon: Users, color: '#3B82F6', trend: '+18.2%', trendUp: true },
    { label: 'Repeat Purchase Rate', value: '34.2%', icon: Activity, color: '#10B981', trend: '+4.1%', trendUp: true },
    { label: 'Customer Satisfaction', value: '94.8%', icon: Star, color: '#F59E0B', trend: '+2.3%', trendUp: true },
    { label: 'Loyalty Members', value: '28.5M', icon: Award, color: '#8B5CF6', trend: '+12.7%', trendUp: true },
    { label: 'Customer LTV', value: '$1,840', icon: DollarSign, color: '#EC4899', trend: '+9.4%', trendUp: true },
    { label: 'Churn Rate', value: '2.4%', icon: AlertTriangle, color: '#EF4444', trend: '-0.8%', trendUp: true },
  ];

  const CUSTOMER_SEGMENTS = [
    { segment: 'Premium Members', count: '8.4M', percentage: '17.5%', avgSpend: '$2,840', retention: '94.2%', color: '#8B5CF6' },
    { segment: 'Regular Shoppers', count: '18.2M', percentage: '37.9%', avgSpend: '$1,420', retention: '88.6%', color: '#3B82F6' },
    { segment: 'Occasional Buyers', count: '14.8M', percentage: '30.8%', avgSpend: '$680', retention: '72.4%', color: '#10B981' },
    { segment: 'New Customers', count: '6.6M', percentage: '13.8%', avgSpend: '$340', retention: '58.2%', color: '#F59E0B' },
  ];

  const LOYALTY_TIERS = [
    { tier: 'Platinum', members: '2.4M', benefits: 'Free shipping, 5% cashback, exclusive access', color: '#8B5CF6' },
    { tier: 'Gold', members: '8.2M', benefits: 'Free shipping over $50, 3% cashback', color: '#F59E0B' },
    { tier: 'Silver', members: '12.8M', benefits: 'Free shipping over $100, 1% cashback', color: '#6B7280' },
    { tier: 'Bronze', members: '5.1M', benefits: 'Birthday rewards, special offers', color: '#CD7F32' },
  ];

  const CHURN_RISK_CUSTOMERS = [
    { customer: 'John Smith', segment: 'Regular', lastPurchase: '45 days ago', risk: 'High', ltv: '$2,840', actions: 'Send personalized offer' },
    { customer: 'Sarah Johnson', segment: 'Premium', lastPurchase: '38 days ago', risk: 'Medium', ltv: '$4,280', actions: 'Loyalty bonus' },
    { customer: 'Mike Davis', segment: 'Regular', lastPurchase: '52 days ago', risk: 'High', ltv: '$1,680', actions: 'Re-engagement campaign' },
    { customer: 'Emily Brown', segment: 'Occasional', lastPurchase: '60 days ago', risk: 'High', ltv: '$840', actions: 'Discount offer' },
  ];

  const PURCHASE_BEHAVIORS = [
    { behavior: 'Frequent Buyers', count: '12.4M', avgFrequency: '4.2/month', avgBasket: '$186', trend: '+12.4%', color: '#10B981' },
    { behavior: 'Weekend Shoppers', count: '18.6M', avgFrequency: '2.8/month', avgBasket: '$142', trend: '+8.2%', color: '#3B82F6' },
    { behavior: 'Deal Seekers', count: '14.2M', avgFrequency: '3.4/month', avgBasket: '$98', trend: '+15.8%', color: '#F59E0B' },
    { behavior: 'Impulse Buyers', count: '8.8M', avgFrequency: '2.2/month', avgBasket: '$124', trend: '+6.4%', color: '#EC4899' },
  ];

  const RETENTION_CAMPAIGNS = [
    { campaign: 'Win-Back Program', target: '2.4M', sent: '2.1M', opened: '68%', converted: '12%', revenue: '$8.4M', status: 'Active' },
    { campaign: 'Loyalty Upgrade', target: '5.8M', sent: '5.2M', opened: '74%', converted: '18%', revenue: '$12.6M', status: 'Active' },
    { campaign: 'Birthday Rewards', target: '4.2M', sent: '4.0M', opened: '82%', converted: '24%', revenue: '$6.8M', status: 'Active' },
    { campaign: 'Personalized Offers', target: '8.6M', sent: '7.8M', opened: '71%', converted: '15%', revenue: '$18.4M', status: 'Active' },
  ];

  const renderCustomerMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Customer Metrics</Text>
      <View style={styles.metricsGrid}>
        {CUSTOMER_METRICS.map((metric, index) => (
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

  const renderCustomerSegments = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Customer Segments</Text>
      <View style={styles.segmentsGrid}>
        {CUSTOMER_SEGMENTS.map((segment) => (
          <View key={segment.segment} style={[styles.segmentCard, { backgroundColor: segment.color + '10', borderColor: segment.color }]}>
            <Users size={24} color={segment.color} />
            <Text style={styles.segmentName}>{segment.segment}</Text>
            <Text style={styles.segmentCount}>{segment.count}</Text>
            <Text style={styles.segmentPercentage}>{segment.percentage} of total</Text>
            <View style={styles.segmentMetrics}>
              <View style={styles.segmentMetric}>
                <Text style={styles.segmentMetricValue}>{segment.avgSpend}</Text>
                <Text style={styles.segmentMetricLabel}>Avg Spend</Text>
              </View>
              <View style={styles.segmentMetric}>
                <Text style={styles.segmentMetricValue}>{segment.retention}</Text>
                <Text style={styles.segmentMetricLabel}>Retention</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderLoyaltyTiers = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Loyalty Program Tiers</Text>
      {LOYALTY_TIERS.map((tier) => (
        <View key={tier.tier} style={[styles.loyaltyCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: tier.color }]}>
          <View style={styles.loyaltyHeader}>
            <Award size={20} color={tier.color} />
            <Text style={styles.loyaltyTier}>{tier.tier}</Text>
            <Text style={styles.loyaltyMembers}>{tier.members} members</Text>
          </View>
          <Text style={styles.loyaltyBenefits}>{tier.benefits}</Text>
        </View>
      ))}
    </View>
  );

  const renderChurnRisk = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Churn Risk Analysis</Text>
      {CHURN_RISK_CUSTOMERS.map((customer, index) => (
        <View key={index} style={[styles.churnCard, { 
          backgroundColor: customer.risk === 'High' ? '#EF444410' : '#F59E0B10',
          borderLeftColor: customer.risk === 'High' ? '#EF4444' : '#F59E0B',
          borderLeftWidth: 3
        }]}>
          <View style={styles.churnHeader}>
            <Users size={20} color={customer.risk === 'High' ? '#EF4444' : '#F59E0B'} />
            <View style={styles.churnInfo}>
              <Text style={styles.churnCustomer}>{customer.customer}</Text>
              <Text style={styles.churnSegment}>{customer.segment}</Text>
            </View>
            <View style={[styles.riskBadge, { backgroundColor: customer.risk === 'High' ? '#EF444420' : '#F59E0B20' }]}>
              <Text style={[styles.riskText, { color: customer.risk === 'High' ? '#EF4444' : '#F59E0B' }]}>{customer.risk} Risk</Text>
            </View>
          </View>
          <View style={styles.churnDetails}>
            <View style={styles.churnDetail}>
              <Clock size={12} color="#6B7280" />
              <Text style={styles.churnDetailText}>{customer.lastPurchase}</Text>
            </View>
            <View style={styles.churnDetail}>
              <DollarSign size={12} color="#6B7280" />
              <Text style={styles.churnDetailText}>LTV: {customer.ltv}</Text>
            </View>
            <View style={styles.churnDetail}>
              <Zap size={12} color="#8B5CF6" />
              <Text style={[styles.churnDetailText, { color: '#8B5CF6' }]}>{customer.actions}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderPurchaseBehaviors = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Purchase Behaviors</Text>
      <View style={styles.behaviorsGrid}>
        {PURCHASE_BEHAVIORS.map((behavior) => (
          <View key={behavior.behavior} style={[styles.behaviorCard, { backgroundColor: behavior.color + '10', borderColor: behavior.color }]}>
            <ShoppingBag size={24} color={behavior.color} />
            <Text style={styles.behaviorName}>{behavior.behavior}</Text>
            <Text style={styles.behaviorCount}>{behavior.count}</Text>
            <View style={styles.behaviorMetrics}>
              <View style={styles.behaviorMetric}>
                <Text style={styles.behaviorMetricValue}>{behavior.avgFrequency}</Text>
                <Text style={styles.behaviorMetricLabel}>Frequency</Text>
              </View>
              <View style={styles.behaviorMetric}>
                <Text style={styles.behaviorMetricValue}>{behavior.avgBasket}</Text>
                <Text style={styles.behaviorMetricLabel}>Avg Basket</Text>
              </View>
            </View>
            <View style={styles.behaviorTrend}>
              <ArrowUpRight size={12} color="#10B981" />
              <Text style={styles.behaviorTrendText}>{behavior.trend}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderRetentionCampaigns = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Retention Campaigns</Text>
      {RETENTION_CAMPAIGNS.map((campaign) => (
        <View key={campaign.campaign} style={[styles.campaignCard, { backgroundColor: '#0A0F1A' }]}>
          <View style={styles.campaignHeader}>
            <Gift size={20} color="#8B5CF6" />
            <Text style={styles.campaignName}>{campaign.campaign}</Text>
            <View style={[styles.campaignStatus, { backgroundColor: '#10B98120' }]}>
              <Text style={styles.campaignStatusText}>{campaign.status}</Text>
            </View>
          </View>
          <View style={styles.campaignMetrics}>
            <View style={styles.campaignMetric}>
              <Text style={styles.campaignMetricLabel}>Target</Text>
              <Text style={styles.campaignMetricValue}>{campaign.target}</Text>
            </View>
            <View style={styles.campaignMetric}>
              <Text style={styles.campaignMetricLabel}>Sent</Text>
              <Text style={styles.campaignMetricValue}>{campaign.sent}</Text>
            </View>
            <View style={styles.campaignMetric}>
              <Text style={styles.campaignMetricLabel}>Opened</Text>
              <Text style={styles.campaignMetricValue}>{campaign.opened}</Text>
            </View>
            <View style={styles.campaignMetric}>
              <Text style={styles.campaignMetricLabel}>Converted</Text>
              <Text style={[styles.campaignMetricValue, { color: '#10B981' }]}>{campaign.converted}</Text>
            </View>
          </View>
          <View style={styles.campaignRevenue}>
            <DollarSign size={16} color="#10B981" />
            <Text style={styles.campaignRevenueValue}>Revenue: {campaign.revenue}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Users size={32} color="#8B5CF6" />
        <View>
          <Text style={styles.headerTitle}>Customer Intelligence Center</Text>
          <Text style={styles.headerSubtitle}>Advanced customer analytics and retention optimization</Text>
        </View>
      </View>

      {renderCustomerMetrics()}
      {renderCustomerSegments()}
      {renderLoyaltyTiers()}
      {renderChurnRisk()}
      {renderPurchaseBehaviors()}
      {renderRetentionCampaigns()}
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
  segmentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  segmentCard: {
    width: (width - 64) / 2 - 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    alignItems: 'center',
  },
  segmentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  segmentCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  segmentPercentage: {
    fontSize: 12,
    color: '#6B7280',
  },
  segmentMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  segmentMetric: {
    alignItems: 'center',
  },
  segmentMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  segmentMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  loyaltyCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 8,
  },
  loyaltyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  loyaltyTier: {
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
  churnCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  churnHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  churnInfo: {
    flex: 1,
  },
  churnCustomer: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  churnSegment: {
    fontSize: 12,
    color: '#6B7280',
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  riskText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  churnDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  churnDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  churnDetailText: {
    fontSize: 12,
    color: '#6B7280',
  },
  behaviorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  behaviorCard: {
    width: (width - 64) / 2 - 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    alignItems: 'center',
  },
  behaviorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  behaviorCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  behaviorMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  behaviorMetric: {
    alignItems: 'center',
  },
  behaviorMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  behaviorMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  behaviorTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  behaviorTrendText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  campaignCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  campaignHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  campaignName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  campaignStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  campaignStatusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#10B981',
  },
  campaignMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  campaignRevenue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  campaignRevenueValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
});
