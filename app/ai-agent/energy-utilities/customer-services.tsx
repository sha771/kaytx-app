import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Users, MessageSquare, Smile, Timer, CheckCircle, Activity, AlertTriangle,
  TrendingUp, Clock, ArrowUpRight, Gauge, Phone, Mail
} from 'lucide-react-native';
import { ENERGY_COLORS, CUSTOMER_SERVICE_DATA } from '@/constants/energyUtilities';

const { width } = Dimensions.get('window');

export default function CustomerServices() {
  const CUSTOMER_METRICS = [
    { label: 'Service Requests', value: '124K', icon: MessageSquare, color: ENERGY_COLORS.purple, trend: '-8.4%', trendUp: true },
    { label: 'Resolution Rate', value: '95.2%', icon: CheckCircle, color: ENERGY_COLORS.emeraldGreen, trend: '+4.8%', trendUp: true },
    { label: 'Avg Response Time', value: '12 min', icon: Timer, color: ENERGY_COLORS.neonCyan, trend: '-18.6%', trendUp: true },
    { label: 'Customer Satisfaction', value: '94.2%', icon: Smile, color: ENERGY_COLORS.electricBlue, trend: '+4.8%', trendUp: true },
    { label: 'Smart Meter Adoption', value: '87%', icon: Gauge, color: ENERGY_COLORS.amber, trend: '+14.2%', trendUp: true },
    { label: 'Restoration Time', value: '42 min', icon: Activity, color: ENERGY_COLORS.magenta, trend: '-18.6%', trendUp: true },
  ];

  const CUSTOMER_ALERTS = [
    { type: 'alert', message: 'Service request volume increased in northeast region - additional staff deployed', impact: 'Medium', time: '2h ago' },
    { type: 'opportunity', message: 'Customer satisfaction improvement could reduce churn by 12%', impact: 'High', time: '4h ago' },
    { type: 'success', message: 'Restoration time reduced to 42 minutes with AI-optimized dispatch', impact: 'Positive', time: '6h ago' },
    { type: 'trend', message: 'Smart meter adoption increased to 87% with enhanced customer education', impact: 'Medium', time: '8h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Customer Services Metrics</Text>
      <View style={styles.metricsGrid}>
        {CUSTOMER_METRICS.map((metric, index) => (
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

  const renderCustomerServices = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Customer Services</Text>
      <View style={styles.servicesList}>
        {CUSTOMER_SERVICE_DATA.map((service) => (
          <View key={service.metric} style={[styles.serviceCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: service.satisfaction === '99.2%' ? ENERGY_COLORS.emeraldGreen : service.satisfaction === '98.6%' ? ENERGY_COLORS.neonCyan : ENERGY_COLORS.amber }]}>
            <View style={styles.serviceHeader}>
              <Users size={20} color={service.satisfaction === '99.2%' ? ENERGY_COLORS.emeraldGreen : service.satisfaction === '98.6%' ? ENERGY_COLORS.neonCyan : ENERGY_COLORS.amber} />
              <Text style={styles.serviceName}>{service.metric}</Text>
              <Text style={styles.serviceTotal}>{service.total || service.accuracy}</Text>
            </View>
            <View style={styles.serviceMetrics}>
              <View style={styles.serviceMetric}>
                <CheckCircle size={12} color="#6B7280" />
                <Text style={styles.serviceMetricLabel}>Resolved/Accuracy</Text>
                <Text style={styles.serviceMetricValue}>{service.resolved || service.accuracy}</Text>
              </View>
              <View style={styles.serviceMetric}>
                <Timer size={12} color="#6B7280" />
                <Text style={styles.serviceMetricLabel}>Avg Time</Text>
                <Text style={styles.serviceMetricValue}>{service.avgTime}</Text>
              </View>
              <View style={styles.serviceMetric}>
                <Smile size={12} color="#6B7280" />
                <Text style={styles.serviceMetricLabel}>Satisfaction</Text>
                <Text style={styles.serviceMetricValue}>{service.satisfaction}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Customer Services Alerts</Text>
      {CUSTOMER_ALERTS.map((alert, index) => (
        <View key={index} style={[styles.alertCard, { 
          backgroundColor: alert.type === 'alert' ? '#EF444415' : 
                       alert.type === 'opportunity' ? '#10B98115' : 
                       alert.type === 'success' ? '#10B98115' : '#8B5CF615',
          borderLeftColor: alert.type === 'alert' ? '#EF4444' : 
                          alert.type === 'opportunity' ? '#10B981' : 
                          alert.type === 'success' ? '#10B981' : '#8B5CF6',
          borderLeftWidth: 3
        }]}>
          <View style={styles.alertHeader}>
            {alert.type === 'alert' && <AlertTriangle size={20} color="#EF4444" />}
            {alert.type === 'opportunity' && <TrendingUp size={20} color="#10B981" />}
            {alert.type === 'success' && <CheckCircle size={20} color="#10B981" />}
            {alert.type === 'trend' && <Activity size={20} color="#8B5CF6" />}
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
        <Users size={32} color={ENERGY_COLORS.purple} />
        <View>
          <Text style={styles.headerTitle}>Customer Services Hub</Text>
          <Text style={styles.headerSubtitle}>Service requests, billing, smart meters, and customer satisfaction</Text>
        </View>
      </View>

      {renderMetrics()}
      {renderCustomerServices()}
      {renderAlerts()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ENERGY_COLORS.deepSpaceBlack,
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
  servicesList: {
    gap: 12,
  },
  serviceCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  serviceName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  serviceTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  serviceMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  serviceMetric: {
    alignItems: 'center',
  },
  serviceMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  serviceMetricValue: {
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
