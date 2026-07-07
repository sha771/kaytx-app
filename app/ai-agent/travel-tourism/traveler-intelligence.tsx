import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Users, RefreshCw, Smile, Award, Target, TrendingUp, ArrowUpRight,
  Activity, Globe, Calendar, DollarSign, CheckCircle, Clock
} from 'lucide-react-native';
import { TRAVEL_COLORS, TRAVELER_SEGMENTS } from '@/constants/travelTourism';

const { width } = Dimensions.get('window');

export default function TravelerIntelligence() {
  const TRAVELER_METRICS = [
    { label: 'Active Travelers', value: '38M', icon: Users, color: TRAVEL_COLORS.purple, trend: '+15.6%', trendUp: true },
    { label: 'Returning Customers', value: '24.6M', icon: RefreshCw, color: TRAVEL_COLORS.oceanBlue, trend: '+22.4%', trendUp: true },
    { label: 'Customer Satisfaction', value: '94.2%', icon: Smile, color: TRAVEL_COLORS.emeraldGreen, trend: '+3.8%', trendUp: true },
    { label: 'Loyalty Members', value: '18.4M', icon: Award, color: TRAVEL_COLORS.amber, trend: '+28.6%', trendUp: true },
    { label: 'Net Promoter Score', value: '72', icon: Target, color: TRAVEL_COLORS.magenta, trend: '+5.4', trendUp: true },
    { label: 'Avg Travel Frequency', value: '3.2/year', icon: Calendar, color: TRAVEL_COLORS.neonCyan, trend: '+0.4', trendUp: true },
  ];

  const CUSTOMER_JOURNEY = [
    { stage: 'Awareness', travelers: '48.2M', conversion: '100%', dropoff: '0%', color: TRAVEL_COLORS.oceanBlue },
    { stage: 'Research', travelers: '28.4M', conversion: '58.9%', dropoff: '41.1%', color: TRAVEL_COLORS.neonCyan },
    { stage: 'Consideration', travelers: '18.6M', conversion: '38.6%', dropoff: '34.5%', color: TRAVEL_COLORS.purple },
    { stage: 'Booking', travelers: '8.4M', conversion: '17.4%', dropoff: '54.8%', color: TRAVEL_COLORS.amber },
    { stage: 'Travel', travelers: '7.8M', conversion: '16.2%', dropoff: '7.1%', color: TRAVEL_COLORS.emeraldGreen },
    { stage: 'Post-Travel', travelers: '6.2M', conversion: '12.9%', dropoff: '20.5%', color: TRAVEL_COLORS.magenta },
  ];

  const LOYALTY_TIER_ANALYSIS = [
    { tier: 'Platinum', members: '840K', revenue: '$2.8B', retention: '96.4%', benefits: 'Unlimited upgrades', color: TRAVEL_COLORS.amber },
    { tier: 'Gold', members: '3.2M', revenue: '$4.2B', retention: '92.8%', benefits: 'Priority boarding', color: TRAVEL_COLORS.emeraldGreen },
    { tier: 'Silver', members: '6.8M', revenue: '$3.8B', retention: '88.4%', benefits: 'Lounge access', color: TRAVEL_COLORS.oceanBlue },
    { tier: 'Bronze', members: '7.6M', revenue: '$2.0B', retention: '82.6%', benefits: 'Points earning', color: TRAVEL_COLORS.purple },
  ];

  const INTELLIGENCE_ALERTS = [
    { type: 'opportunity', message: 'Luxury segment showing 34% increase in repeat bookings', impact: 'High', time: '2h ago' },
    { type: 'trend', message: 'Customer satisfaction improved 3.8% with AI personalization', impact: 'Medium', time: '4h ago' },
    { type: 'success', message: 'Loyalty program enrollment up 28.6% this quarter', impact: 'Positive', time: '6h ago' },
    { type: 'info', message: 'New traveler segment identified: Eco-conscious millennials', impact: 'Low', time: '8h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Traveler Intelligence Metrics</Text>
      <View style={styles.metricsGrid}>
        {TRAVELER_METRICS.map((metric, index) => (
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

  const renderTravelerSegments = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Traveler Segments</Text>
      <View style={styles.segmentsList}>
        {TRAVELER_SEGMENTS.map((segment) => (
          <View key={segment.segment} style={[styles.segmentCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: TRAVEL_COLORS.purple }]}>
            <View style={styles.segmentHeader}>
              <Users size={20} color={TRAVEL_COLORS.purple} />
              <Text style={styles.segmentName}>{segment.segment}</Text>
              <Text style={styles.segmentCount}>{segment.count}</Text>
            </View>
            <View style={styles.segmentMetrics}>
              <View style={styles.segmentMetric}>
                <Text style={styles.segmentMetricLabel}>Revenue</Text>
                <Text style={styles.segmentMetricValue}>{segment.revenue}</Text>
              </View>
              <View style={styles.segmentMetric}>
                <Text style={styles.segmentMetricLabel}>Satisfaction</Text>
                <Text style={styles.segmentMetricValue}>{segment.satisfaction}</Text>
              </View>
              <View style={styles.segmentMetric}>
                <Text style={styles.segmentMetricLabel}>Growth</Text>
                <Text style={[styles.segmentMetricValue, { color: '#10B981' }]}>{segment.growth}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderCustomerJourney = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Customer Journey Map</Text>
      {CUSTOMER_JOURNEY.map((stage) => (
        <View key={stage.stage} style={[styles.journeyCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: stage.color }]}>
          <View style={styles.journeyHeader}>
            <Globe size={20} color={stage.color} />
            <Text style={styles.journeyStage}>{stage.stage}</Text>
            <Text style={styles.journeyTravelers}>{stage.travelers}</Text>
          </View>
          <View style={styles.journeyMetrics}>
            <View style={styles.journeyMetric}>
              <Text style={styles.journeyMetricLabel}>Conversion</Text>
              <Text style={styles.journeyMetricValue}>{stage.conversion}</Text>
            </View>
            <View style={styles.journeyMetric}>
              <Text style={styles.journeyMetricLabel}>Dropoff</Text>
              <Text style={[styles.journeyMetricValue, { color: '#EF4444' }]}>{stage.dropoff}</Text>
            </View>
          </View>
          <View style={styles.journeyBar}>
            <View style={[styles.journeyBarFill, { width: stage.conversion, backgroundColor: stage.color }]} />
          </View>
        </View>
      ))}
    </View>
  );

  const renderLoyaltyAnalysis = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Loyalty Tier Analysis</Text>
      <View style={styles.loyaltyList}>
        {LOYALTY_TIER_ANALYSIS.map((tier) => (
          <View key={tier.tier} style={[styles.loyaltyCard, { backgroundColor: tier.color + '10', borderColor: tier.color }]}>
            <Award size={24} color={tier.color} />
            <Text style={styles.loyaltyTier}>{tier.tier}</Text>
            <Text style={styles.loyaltyMembers}>{tier.members}</Text>
            <View style={styles.loyaltyMetrics}>
              <View style={styles.loyaltyMetric}>
                <DollarSign size={12} color="#6B7280" />
                <Text style={styles.loyaltyMetricText}>{tier.revenue}</Text>
              </View>
              <View style={styles.loyaltyMetric}>
                <RefreshCw size={12} color="#6B7280" />
                <Text style={styles.loyaltyMetricText}>{tier.retention}</Text>
              </View>
            </View>
            <Text style={styles.loyaltyBenefits}>{tier.benefits}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Intelligence Alerts</Text>
      {INTELLIGENCE_ALERTS.map((alert, index) => (
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
            {alert.type === 'info' && <Globe size={20} color="#8B5CF6" />}
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
        <Users size={32} color={TRAVEL_COLORS.purple} />
        <View>
          <Text style={styles.headerTitle}>Traveler Intelligence Hub</Text>
          <Text style={styles.headerSubtitle}>Customer behavior analytics and loyalty intelligence</Text>
        </View>
      </View>

      {renderMetrics()}
      {renderTravelerSegments()}
      {renderCustomerJourney()}
      {renderLoyaltyAnalysis()}
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
  segmentsList: {
    gap: 12,
  },
  segmentCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  segmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  segmentName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  segmentCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  segmentMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  segmentMetric: {
    alignItems: 'center',
  },
  segmentMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  segmentMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  journeyCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  journeyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  journeyStage: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  journeyTravelers: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  journeyMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  journeyMetric: {
    alignItems: 'center',
  },
  journeyMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  journeyMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  journeyBar: {
    height: 8,
    backgroundColor: '#1E293B',
    borderRadius: 4,
    overflow: 'hidden',
  },
  journeyBarFill: {
    height: '100%',
  },
  loyaltyList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  loyaltyCard: {
    width: (width - 64) / 2 - 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    alignItems: 'center',
  },
  loyaltyTier: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  loyaltyMembers: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  loyaltyMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  loyaltyMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  loyaltyMetricText: {
    fontSize: 11,
    color: '#6B7280',
  },
  loyaltyBenefits: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
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
