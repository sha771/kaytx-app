import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Car, Train, Ship, CheckCircle, Clock, Target, TrendingUp,
  AlertTriangle, Activity, ArrowUpRight, Route, MapPin, Users
} from 'lucide-react-native';
import { TRAVEL_COLORS, TRANSPORTATION_MODES } from '@/constants/travelTourism';

const { width } = Dimensions.get('window');

export default function Transportation() {
  const TRANSPORT_METRICS = [
    { label: 'Car Rentals', value: '2.4M', icon: Car, color: TRAVEL_COLORS.oceanBlue, trend: '+18.4%', trendUp: true },
    { label: 'Rail Services', value: '1.8M', icon: Train, color: TRAVEL_COLORS.emeraldGreen, trend: '+22.6%', trendUp: true },
    { label: 'Shuttle Operations', value: '840K', icon: Route, color: TRAVEL_COLORS.purple, trend: '+14.2%', trendUp: true },
    { label: 'Cruise Activity', value: '420K', icon: Ship, color: TRAVEL_COLORS.amber, trend: '+28.4%', trendUp: true },
    { label: 'Fleet Utilization', value: '78.4%', icon: Target, color: TRAVEL_COLORS.neonCyan, trend: '+6.8%', trendUp: true },
    { label: 'On-Time Performance', value: '92.8%', icon: CheckCircle, color: TRAVEL_COLORS.magenta, trend: '+2.4%', trendUp: true },
  ];

  const FLEET_STATUS = [
    { fleet: 'Car Rental Fleet', total: '84,000', available: '18,400', inUse: '62,400', maintenance: '3,200', color: TRAVEL_COLORS.oceanBlue },
    { fleet: 'Rail Network', total: '2,400', available: '420', inUse: '1,840', maintenance: '140', color: TRAVEL_COLORS.emeraldGreen },
    { fleet: 'Shuttle Fleet', total: '12,400', available: '2,800', inUse: '8,600', maintenance: '1,000', color: TRAVEL_COLORS.purple },
    { fleet: 'Cruise Ships', total: '84', available: '12', inUse: '68', maintenance: '4', color: TRAVEL_COLORS.amber },
  ];

  const TRANSPORT_ALERTS = [
    { type: 'critical', message: 'Ground transportation capacity strained in NYC region - activate backup fleet', impact: 'Critical', time: '1h ago' },
    { type: 'warning', message: 'Rail network experiencing 15% increase in demand for holiday routes', impact: 'High', time: '2h ago' },
    { type: 'success', message: 'Route optimization reduced fuel consumption by 18%', impact: 'Positive', time: '4h ago' },
    { type: 'info', message: 'New cruise partnership added for Mediterranean routes', impact: 'Low', time: '6h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Transportation Metrics</Text>
      <View style={styles.metricsGrid}>
        {TRANSPORT_METRICS.map((metric, index) => (
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

  const renderTransportationModes = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Transportation Modes</Text>
      <View style={styles.modesList}>
        {TRANSPORTATION_MODES.map((mode) => (
          <View key={mode.mode} style={[styles.modeCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: TRAVEL_COLORS.oceanBlue }]}>
            <View style={styles.modeHeader}>
              <Car size={20} color={TRAVEL_COLORS.oceanBlue} />
              <Text style={styles.modeName}>{mode.mode}</Text>
              <Text style={styles.modeBookings}>{mode.bookings}</Text>
            </View>
            <View style={styles.modeMetrics}>
              <View style={styles.modeMetric}>
                <Text style={styles.modeMetricLabel}>Utilization</Text>
                <Text style={styles.modeMetricValue}>{mode.utilization}</Text>
              </View>
              <View style={styles.modeMetric}>
                <Text style={styles.modeMetricLabel}>Revenue</Text>
                <Text style={styles.modeMetricValue}>{mode.revenue}</Text>
              </View>
              <View style={styles.modeMetric}>
                <Text style={styles.modeMetricLabel}>Satisfaction</Text>
                <Text style={styles.modeMetricValue}>{mode.satisfaction}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderFleetStatus = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Fleet Status</Text>
      <View style={styles.fleetList}>
        {FLEET_STATUS.map((fleet) => (
          <View key={fleet.fleet} style={[styles.fleetCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: fleet.color }]}>
            <View style={styles.fleetHeader}>
              <Route size={20} color={fleet.color} />
              <Text style={styles.fleetName}>{fleet.fleet}</Text>
              <Text style={styles.fleetTotal}>{fleet.total}</Text>
            </View>
            <View style={styles.fleetMetrics}>
              <View style={styles.fleetMetric}>
                <Text style={styles.fleetMetricLabel}>Available</Text>
                <Text style={[styles.fleetMetricValue, { color: '#10B981' }]}>{fleet.available}</Text>
              </View>
              <View style={styles.fleetMetric}>
                <Text style={styles.fleetMetricLabel}>In Use</Text>
                <Text style={[styles.fleetMetricValue, { color: '#3B82F6' }]}>{fleet.inUse}</Text>
              </View>
              <View style={styles.fleetMetric}>
                <Text style={styles.fleetMetricLabel}>Maintenance</Text>
                <Text style={[styles.fleetMetricValue, { color: '#F59E0B' }]}>{fleet.maintenance}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Transportation Alerts</Text>
      {TRANSPORT_ALERTS.map((alert, index) => (
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
            {alert.type === 'info' && <MapPin size={20} color="#3B82F6" />}
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
        <Car size={32} color={TRAVEL_COLORS.oceanBlue} />
        <View>
          <Text style={styles.headerTitle}>Transportation Command Center</Text>
          <Text style={styles.headerSubtitle}>Ground transportation and mobility management</Text>
        </View>
      </View>

      {renderMetrics()}
      {renderTransportationModes()}
      {renderFleetStatus()}
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
  modesList: {
    gap: 12,
  },
  modeCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  modeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  modeName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  modeBookings: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modeMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  modeMetric: {
    alignItems: 'center',
  },
  modeMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  modeMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  fleetList: {
    gap: 12,
  },
  fleetCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  fleetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fleetName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  fleetTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  fleetMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  fleetMetric: {
    alignItems: 'center',
  },
  fleetMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  fleetMetricValue: {
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
