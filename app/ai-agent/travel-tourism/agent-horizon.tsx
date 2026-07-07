import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Calendar, CheckCircle, DollarSign, Clock, Target, TrendingUp,
  AlertTriangle, Activity, ArrowUpRight, CreditCard, Zap
} from 'lucide-react-native';
import { TRAVEL_COLORS } from '@/constants/travelTourism';

const { width } = Dimensions.get('window');

export default function AgentHorizon() {
  const HORIZON_METRICS = [
    { label: 'Bookings Processed', value: '4.2M', icon: Calendar, color: TRAVEL_COLORS.oceanBlue, trend: '+38.2%', trendUp: true },
    { label: 'Success Rate', value: '98.6%', icon: CheckCircle, color: TRAVEL_COLORS.emeraldGreen, trend: '+1.4%', trendUp: true },
    { label: 'Revenue Generated', value: '$8.4B', icon: DollarSign, color: TRAVEL_COLORS.purple, trend: '+22.4%', trendUp: true },
    { label: 'Avg Processing Time', value: '2.4s', icon: Clock, color: TRAVEL_COLORS.amber, trend: '-0.8s', trendUp: true },
    { label: 'Conversion Rate', value: '42.8%', icon: Target, color: TRAVEL_COLORS.magenta, trend: '+4.2%', trendUp: true },
    { label: 'Automation Rate', value: '94.2%', icon: Zap, color: TRAVEL_COLORS.neonCyan, trend: '+6.8%', trendUp: true },
  ];

  const BOOKING_CHANNELS = [
    { channel: 'Mobile App', bookings: '2.4M', revenue: '$4.8B', conversion: '46.2%', color: TRAVEL_COLORS.oceanBlue },
    { channel: 'Web Portal', bookings: '1.2M', revenue: '$2.8B', conversion: '38.4%', color: TRAVEL_COLORS.neonCyan },
    { channel: 'API Partners', bookings: '420K', revenue: '$620M', conversion: '52.8%', color: TRAVEL_COLORS.purple },
    { channel: 'Call Center', bookings: '120K', revenue: '$140M', conversion: '28.4%', color: TRAVEL_COLORS.emeraldGreen },
    { channel: 'Travel Agents', bookings: '60K', revenue: '$40M', conversion: '34.2%', color: TRAVEL_COLORS.amber },
  ];

  const HORIZON_ALERTS = [
    { type: 'critical', message: 'Payment gateway experiencing intermittent failures - activating backup systems', impact: 'Critical', time: '1h ago' },
    { type: 'warning', message: 'Booking volume spike detected - scale capacity by 40%', impact: 'High', time: '2h ago' },
    { type: 'success', message: 'New automation reduced processing time by 35%', impact: 'Positive', time: '4h ago' },
    { type: 'info', message: 'Partner API integration completed for 12 new airlines', impact: 'Low', time: '6h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Agent Horizon Metrics</Text>
      <View style={styles.metricsGrid}>
        {HORIZON_METRICS.map((metric, index) => (
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

  const renderBookingChannels = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Booking Channels Performance</Text>
      <View style={styles.channelsList}>
        {BOOKING_CHANNELS.map((channel) => (
          <View key={channel.channel} style={[styles.channelCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: channel.color }]}>
            <View style={styles.channelHeader}>
              <CreditCard size={20} color={channel.color} />
              <Text style={styles.channelName}>{channel.channel}</Text>
              <Text style={styles.channelBookings}>{channel.bookings}</Text>
            </View>
            <View style={styles.channelMetrics}>
              <View style={styles.channelMetric}>
                <Text style={styles.channelMetricLabel}>Revenue</Text>
                <Text style={styles.channelMetricValue}>{channel.revenue}</Text>
              </View>
              <View style={styles.channelMetric}>
                <Text style={styles.channelMetricLabel}>Conversion</Text>
                <Text style={styles.channelMetricValue}>{channel.conversion}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Horizon Alerts</Text>
      {HORIZON_ALERTS.map((alert, index) => (
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
          <Text style={styles.headerTitle}>Agent Horizon</Text>
          <Text style={styles.headerSubtitle}>Booking Operations Agent - Reservation management and booking automation</Text>
        </View>
      </View>

      {renderMetrics()}
      {renderBookingChannels()}
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
  channelsList: {
    gap: 12,
  },
  channelCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  channelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  channelName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  channelBookings: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
