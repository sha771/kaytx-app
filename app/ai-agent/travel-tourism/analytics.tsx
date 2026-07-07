import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  BarChart3, LineChart, PieChart, TrendingUp, DollarSign, Users,
  CheckCircle, Clock, Target, AlertTriangle, Activity, ArrowUpRight
} from 'lucide-react-native';
import { TRAVEL_COLORS } from '@/constants/travelTourism';

const { width } = Dimensions.get('window');

export default function TravelAnalytics() {
  const ANALYTICS_METRICS = [
    { label: 'Total Revenue', value: '$12.8B', icon: DollarSign, color: TRAVEL_COLORS.emeraldGreen, trend: '+18.2%', trendUp: true },
    { label: 'Total Bookings', value: '14.2M', icon: Target, color: TRAVEL_COLORS.oceanBlue, trend: '+12.4%', trendUp: true },
    { label: 'Active Travelers', value: '38M', icon: Users, color: TRAVEL_COLORS.purple, trend: '+15.6%', trendUp: true },
    { label: 'AI Accuracy', value: '94.8%', icon: CheckCircle, color: TRAVEL_COLORS.neonCyan, trend: '+2.8%', trendUp: true },
    { label: 'Forecast Precision', value: '96.2%', icon: LineChart, color: TRAVEL_COLORS.amber, trend: '+3.4%', trendUp: true },
    { label: 'System Uptime', value: '99.9%', icon: Activity, color: TRAVEL_COLORS.magenta, trend: '+0.1%', trendUp: true },
  ];

  const REVENUE_BREAKDOWN = [
    { category: 'Flight Bookings', revenue: '$4.8B', percentage: '37.5%', color: TRAVEL_COLORS.oceanBlue },
    { category: 'Hotel Reservations', revenue: '$3.8B', percentage: '29.7%', color: TRAVEL_COLORS.magenta },
    { category: 'Tour Packages', revenue: '$2.4B', percentage: '18.8%', color: TRAVEL_COLORS.purple },
    { category: 'Transportation', revenue: '$1.2B', percentage: '9.4%', color: TRAVEL_COLORS.emeraldGreen },
    { category: 'Other Services', revenue: '$600M', percentage: '4.6%', color: TRAVEL_COLORS.amber },
  ];

  const PERFORMANCE_TRENDS = [
    { metric: 'Booking Conversion', current: '4.8%', previous: '4.2%', change: '+0.6%', trend: 'up', color: TRAVEL_COLORS.emeraldGreen },
    { metric: 'Customer Satisfaction', current: '94.2%', previous: '90.4%', change: '+3.8%', trend: 'up', color: TRAVEL_COLORS.emeraldGreen },
    { metric: 'Cancellation Rate', current: '2.4%', previous: '3.2%', change: '-0.8%', trend: 'up', color: TRAVEL_COLORS.emeraldGreen },
    { metric: 'Avg Booking Value', current: '$892', previous: '$822', change: '+$70', trend: 'up', color: TRAVEL_COLORS.emeraldGreen },
    { metric: 'Processing Time', current: '2.4s', previous: '3.0s', change: '-0.6s', trend: 'up', color: TRAVEL_COLORS.emeraldGreen },
  ];

  const ANALYTICS_ALERTS = [
    { type: 'opportunity', message: 'Revenue forecast indicates 22% growth for next quarter', impact: 'High', time: '2h ago' },
    { type: 'trend', message: 'Booking conversion rate improved 14% with AI optimization', impact: 'Medium', time: '4h ago' },
    { type: 'success', message: 'System performance metrics exceed all SLA targets', impact: 'Positive', time: '6h ago' },
    { type: 'info', message: 'New analytics dashboard deployed with real-time data', impact: 'Low', time: '8h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Analytics Overview</Text>
      <View style={styles.metricsGrid}>
        {ANALYTICS_METRICS.map((metric, index) => (
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

  const renderRevenueBreakdown = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Revenue Breakdown</Text>
      <View style={styles.revenueList}>
        {REVENUE_BREAKDOWN.map((item) => (
          <View key={item.category} style={[styles.revenueCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: item.color }]}>
            <View style={styles.revenueHeader}>
              <DollarSign size={20} color={item.color} />
              <Text style={styles.revenueCategory}>{item.category}</Text>
              <Text style={styles.revenueValue}>{item.revenue}</Text>
            </View>
            <View style={styles.revenueBar}>
              <View style={[styles.revenueBarFill, { width: item.percentage, backgroundColor: item.color }]} />
            </View>
            <Text style={styles.revenuePercentage}>{item.percentage}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderPerformanceTrends = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Performance Trends</Text>
      <View style={styles.trendsList}>
        {PERFORMANCE_TRENDS.map((trend) => (
          <View key={trend.metric} style={[styles.trendCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: trend.color }]}>
            <View style={styles.trendHeader}>
              <LineChart size={20} color={trend.color} />
              <Text style={styles.trendMetric}>{trend.metric}</Text>
              <Text style={styles.trendCurrent}>{trend.current}</Text>
            </View>
            <View style={styles.trendDetails}>
              <View style={styles.trendDetail}>
                <Text style={styles.trendDetailLabel}>Previous</Text>
                <Text style={styles.trendDetailValue}>{trend.previous}</Text>
              </View>
              <View style={styles.trendDetail}>
                <Text style={styles.trendDetailLabel}>Change</Text>
                <Text style={[styles.trendDetailValue, { color: trend.trend === 'up' ? '#10B981' : '#EF4444' }]}>{trend.change}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Analytics Alerts</Text>
      {ANALYTICS_ALERTS.map((alert, index) => (
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
            {alert.type === 'info' && <BarChart3 size={20} color="#8B5CF6" />}
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
        <BarChart3 size={32} color={TRAVEL_COLORS.neonCyan} />
        <View>
          <Text style={styles.headerTitle}>Travel Analytics</Text>
          <Text style={styles.headerSubtitle}>Comprehensive analytics and performance insights</Text>
        </View>
      </View>

      {renderMetrics()}
      {renderRevenueBreakdown()}
      {renderPerformanceTrends()}
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
  revenueList: {
    gap: 12,
  },
  revenueCard: {
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  revenueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  revenueCategory: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  revenueValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  revenueBar: {
    height: 8,
    backgroundColor: '#1E293B',
    borderRadius: 4,
    overflow: 'hidden',
  },
  revenueBarFill: {
    height: '100%',
  },
  revenuePercentage: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
  },
  trendsList: {
    gap: 12,
  },
  trendCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  trendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  trendMetric: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  trendCurrent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  trendDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  trendDetail: {
    alignItems: 'center',
  },
  trendDetailLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  trendDetailValue: {
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
