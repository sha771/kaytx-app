import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Hotel, Building2, Users, DollarSign, CheckCircle, Clock, Target,
  TrendingUp, AlertTriangle, Activity, ArrowUpRight, Star, Smile
} from 'lucide-react-native';
import { TRAVEL_COLORS } from '@/constants/travelTourism';

const { width } = Dimensions.get('window');

export default function AgentAurora() {
  const AURORA_METRICS = [
    { label: 'Hotels Managed', value: '45,000', icon: Building2, color: TRAVEL_COLORS.magenta, trend: '+12.4%', trendUp: true },
    { label: 'Occupancy Rate', value: '87%', icon: Hotel, color: TRAVEL_COLORS.emeraldGreen, trend: '+4.2%', trendUp: true },
    { label: 'Guest Satisfaction', value: '94.8%', icon: Smile, color: TRAVEL_COLORS.oceanBlue, trend: '+2.8%', trendUp: true },
    { label: 'RevPAR', value: '$253', icon: DollarSign, color: TRAVEL_COLORS.purple, trend: '+8.6%', trendUp: true },
    { label: 'Service Quality', value: '96.2%', icon: Star, color: TRAVEL_COLORS.amber, trend: '+3.4%', trendUp: true },
    { label: 'Check-in Time', value: '2.4min', icon: Clock, color: TRAVEL_COLORS.neonCyan, trend: '-0.6min', trendUp: true },
  ];

  const HOTEL_CHAINS = [
    { chain: 'Marriott', hotels: '8,400', occupancy: '89.2%', revpar: '$253', satisfaction: '94.8%', color: TRAVEL_COLORS.magenta },
    { chain: 'Hilton', hotels: '7,200', occupancy: '86.4%', revpar: '$232', satisfaction: '93.6%', color: TRAVEL_COLORS.oceanBlue },
    { chain: 'Hyatt', hotels: '4,800', occupancy: '88.8%', revpar: '$277', satisfaction: '95.2%', color: TRAVEL_COLORS.purple },
    { chain: 'IHG', hotels: '6,400', occupancy: '84.6%', revpar: '$167', satisfaction: '92.4%', color: TRAVEL_COLORS.emeraldGreen },
  ];

  const AURORA_ALERTS = [
    { type: 'opportunity', message: 'Luxury segment occupancy projected to reach 95% during holiday season', impact: 'High', time: '2h ago' },
    { type: 'trend', message: 'Guest satisfaction improved 3.4% with new AI concierge service', impact: 'Medium', time: '4h ago' },
    { type: 'success', message: 'Automated check-in reduced wait time by 65%', impact: 'Positive', time: '6h ago' },
    { type: 'info', message: 'New property partnership added in Asia Pacific region', impact: 'Low', time: '8h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Agent Aurora Metrics</Text>
      <View style={styles.metricsGrid}>
        {AURORA_METRICS.map((metric, index) => (
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

  const renderHotelChains = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Hotel Chain Performance</Text>
      <View style={styles.chainsList}>
        {HOTEL_CHAINS.map((chain) => (
          <View key={chain.chain} style={[styles.chainCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: chain.color }]}>
            <View style={styles.chainHeader}>
              <Hotel size={20} color={chain.color} />
              <Text style={styles.chainName}>{chain.chain}</Text>
              <Text style={styles.chainHotels}>{chain.hotels}</Text>
            </View>
            <View style={styles.chainMetrics}>
              <View style={styles.chainMetric}>
                <Text style={styles.chainMetricLabel}>Occupancy</Text>
                <Text style={styles.chainMetricValue}>{chain.occupancy}</Text>
              </View>
              <View style={styles.chainMetric}>
                <Text style={styles.chainMetricLabel}>RevPAR</Text>
                <Text style={styles.chainMetricValue}>{chain.revpar}</Text>
              </View>
              <View style={styles.chainMetric}>
                <Text style={styles.chainMetricLabel}>Satisfaction</Text>
                <Text style={styles.chainMetricValue}>{chain.satisfaction}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Aurora Alerts</Text>
      {AURORA_ALERTS.map((alert, index) => (
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
            {alert.type === 'info' && <Star size={20} color="#8B5CF6" />}
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
        <Hotel size={32} color={TRAVEL_COLORS.magenta} />
        <View>
          <Text style={styles.headerTitle}>Agent Aurora</Text>
          <Text style={styles.headerSubtitle}>Hospitality Agent - Hotel operations and guest experience</Text>
        </View>
      </View>

      {renderMetrics()}
      {renderHotelChains()}
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
  chainsList: {
    gap: 12,
  },
  chainCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  chainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  chainName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  chainHotels: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  chainMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  chainMetric: {
    alignItems: 'center',
  },
  chainMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  chainMetricValue: {
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
