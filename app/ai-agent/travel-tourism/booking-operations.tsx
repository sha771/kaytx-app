import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Calendar, CheckCircle, DollarSign, Clock, Target, TrendingUp,
  AlertTriangle, Activity, ArrowUpRight, CreditCard, XCircle, Zap
} from 'lucide-react-native';
import { TRAVEL_COLORS, BOOKING_FUNNEL } from '@/constants/travelTourism';

const { width } = Dimensions.get('window');

export default function BookingOperations() {
  const BOOKING_METRICS = [
    { label: 'Total Bookings', value: '14.2M', icon: Calendar, color: TRAVEL_COLORS.oceanBlue, trend: '+12.4%', trendUp: true },
    { label: 'Booking Revenue', value: '$12.8B', icon: DollarSign, color: TRAVEL_COLORS.emeraldGreen, trend: '+18.2%', trendUp: true },
    { label: 'Conversion Rate', value: '4.8%', icon: Target, color: TRAVEL_COLORS.purple, trend: '+1.2%', trendUp: true },
    { label: 'Cancellation Rate', value: '2.4%', icon: XCircle, color: TRAVEL_COLORS.red, trend: '-0.8%', trendUp: true },
    { label: 'Avg Processing Time', value: '2.4s', icon: Clock, color: TRAVEL_COLORS.amber, trend: '-0.6s', trendUp: true },
    { label: 'Payment Success', value: '98.6%', icon: CheckCircle, color: TRAVEL_COLORS.neonCyan, trend: '+1.4%', trendUp: true },
  ];

  const RESERVATION_STATUS = [
    { status: 'Confirmed', count: '8.4M', revenue: '$8.8B', percentage: '59.2%', color: TRAVEL_COLORS.emeraldGreen },
    { status: 'Pending', count: '3.2M', revenue: '$2.8B', percentage: '22.5%', color: TRAVEL_COLORS.amber },
    { status: 'Processing', count: '1.8M', revenue: '$1.0B', percentage: '12.7%', color: TRAVEL_COLORS.oceanBlue },
    { status: 'Cancelled', count: '420K', revenue: '$120M', percentage: '3.0%', color: TRAVEL_COLORS.red },
    { status: 'Refunded', count: '380K', revenue: '$80M', percentage: '2.6%', color: TRAVEL_COLORS.purple },
  ];

  const BOOKING_ALERTS = [
    { type: 'critical', message: 'Payment gateway experiencing intermittent failures - activating backup', impact: 'Critical', time: '1h ago' },
    { type: 'warning', message: 'Booking volume spike detected - scale capacity by 40%', impact: 'High', time: '2h ago' },
    { type: 'success', message: 'Automated booking system reduced processing time by 35%', impact: 'Positive', time: '4h ago' },
    { type: 'info', message: 'New payment method integration completed for 12 regions', impact: 'Low', time: '6h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Booking Operations Metrics</Text>
      <View style={styles.metricsGrid}>
        {BOOKING_METRICS.map((metric, index) => (
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

  const renderBookingFunnel = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Booking Funnel</Text>
      {BOOKING_FUNNEL.map((stage) => (
        <View key={stage.stage} style={[styles.funnelCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: stage.color }]}>
          <View style={styles.funnelHeader}>
            <Target size={20} color={stage.color} />
            <Text style={styles.funnelStage}>{stage.stage}</Text>
            <Text style={styles.funnelValue}>{stage.value}</Text>
          </View>
          <View style={styles.funnelMetrics}>
            <View style={styles.funnelMetric}>
              <Text style={styles.funnelMetricLabel}>Conversion</Text>
              <Text style={styles.funnelMetricValue}>{stage.conversion}</Text>
            </View>
            <View style={styles.funnelMetric}>
              <Text style={styles.funnelMetricLabel}>Dropoff</Text>
              <Text style={[styles.funnelMetricValue, { color: '#EF4444' }]}>{stage.dropoff}</Text>
            </View>
          </View>
          <View style={styles.funnelBar}>
            <View style={[styles.funnelBarFill, { width: stage.conversion, backgroundColor: stage.color }]} />
          </View>
        </View>
      ))}
    </View>
  );

  const renderReservationStatus = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Reservation Status</Text>
      <View style={styles.statusGrid}>
        {RESERVATION_STATUS.map((status) => (
          <View key={status.status} style={[styles.statusCard, { backgroundColor: status.color + '10', borderColor: status.color }]}>
            <CheckCircle size={24} color={status.color} />
            <Text style={styles.statusValue}>{status.count}</Text>
            <Text style={styles.statusLabel}>{status.status}</Text>
            <Text style={styles.statusPercentage}>{status.percentage}</Text>
            <Text style={styles.statusRevenue}>{status.revenue}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Booking Alerts</Text>
      {BOOKING_ALERTS.map((alert, index) => (
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
            {alert.type === 'info' && <Zap size={20} color="#3B82F6" />}
            <Text style={styles.alertMessage}>{alert.message}</Text>
          </View>
          <View style={styles.alertFooter}>
            <View style={[styles.impactBadge, { backgroundColor: alert.impact === 'Critical' ? '#EF444420' : alert.impact === 'High' ? '#F59E0B20' : '#3B82F620' }]}>
              <Text style={[styles.impactText, { color: alert.impact === 'Critical' ? '#EF4444' : alert.impact === 'High' ? '#F59E0B' : '#3B82F6' }]}>{alert.impact}</Text>
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
        <Calendar size={32} color={TRAVEL_COLORS.oceanBlue} />
        <View>
          <Text style={styles.headerTitle}>Booking Operations Center</Text>
          <Text style={styles.headerSubtitle}>Reservation management and booking automation</Text>
        </View>
      </View>

      {renderMetrics()}
      {renderBookingFunnel()}
      {renderReservationStatus()}
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
  funnelCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  funnelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  funnelStage: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  funnelValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  funnelMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  funnelMetric: {
    alignItems: 'center',
  },
  funnelMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  funnelMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  funnelBar: {
    height: 8,
    backgroundColor: '#1E293B',
    borderRadius: 4,
    overflow: 'hidden',
  },
  funnelBarFill: {
    height: '100%',
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statusCard: {
    width: (width - 64) / 3 - 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    alignItems: 'center',
  },
  statusValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statusLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statusRevenue: {
    fontSize: 12,
    color: '#10B981',
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
