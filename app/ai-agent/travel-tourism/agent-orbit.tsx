import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Plane, Car, Train, CheckCircle, Clock, Target, TrendingUp,
  AlertTriangle, Activity, ArrowUpRight, Route, MapPin
} from 'lucide-react-native';
import { TRAVEL_COLORS } from '@/constants/travelTourism';

const { width } = Dimensions.get('window');

export default function AgentOrbit() {
  const ORBIT_METRICS = [
    { label: 'Flights Tracked', value: '82,000', icon: Plane, color: TRAVEL_COLORS.amber, trend: '+8.2%', trendUp: true },
    { label: 'Delay Resolution', value: '94.8%', icon: CheckCircle, color: TRAVEL_COLORS.emeraldGreen, trend: '+2.4%', trendUp: true },
    { label: 'On-Time Performance', value: '91.2%', icon: Clock, color: TRAVEL_COLORS.oceanBlue, trend: '+1.8%', trendUp: true },
    { label: 'Routes Optimized', value: '4,200', icon: Route, color: TRAVEL_COLORS.purple, trend: '+12.6%', trendUp: true },
    { label: 'Ground Transport', value: '2.4M', icon: Car, color: TRAVEL_COLORS.neonCyan, trend: '+18.4%', trendUp: true },
    { label: 'Rail Connections', value: '840', icon: Train, color: TRAVEL_COLORS.magenta, trend: '+6.8%', trendUp: true },
  ];

  const AIRLINE_PERFORMANCE = [
    { airline: 'Delta', flights: '12,400', onTime: '92.4%', delays: '7.6%', color: TRAVEL_COLORS.oceanBlue },
    { airline: 'United', flights: '10,800', onTime: '89.8%', delays: '9.4%', color: TRAVEL_COLORS.neonCyan },
    { airline: 'American', flights: '11,200', onTime: '91.2%', delays: '8.2%', color: TRAVEL_COLORS.purple },
    { airline: 'Southwest', flights: '14,600', onTime: '88.6%', delays: '10.8%', color: TRAVEL_COLORS.amber },
  ];

  const ORBIT_ALERTS = [
    { type: 'critical', message: 'Weather disruption detected across 3 major airports - rerouting in progress', impact: 'Critical', time: '1h ago' },
    { type: 'warning', message: 'Ground transportation capacity strained in NYC region', impact: 'High', time: '2h ago' },
    { type: 'success', message: 'Route optimization reduced travel time by 18% on average', impact: 'Positive', time: '4h ago' },
    { type: 'info', message: 'New rail partnership added for European routes', impact: 'Low', time: '6h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Agent Orbit Metrics</Text>
      <View style={styles.metricsGrid}>
        {ORBIT_METRICS.map((metric, index) => (
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

  const renderAirlinePerformance = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Airline Performance</Text>
      <View style={styles.airlinesList}>
        {AIRLINE_PERFORMANCE.map((airline) => (
          <View key={airline.airline} style={[styles.airlineCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: airline.color }]}>
            <View style={styles.airlineHeader}>
              <Plane size={20} color={airline.color} />
              <Text style={styles.airlineName}>{airline.airline}</Text>
              <Text style={styles.airlineFlights}>{airline.flights}</Text>
            </View>
            <View style={styles.airlineMetrics}>
              <View style={styles.airlineMetric}>
                <Text style={styles.airlineMetricLabel}>On-Time</Text>
                <Text style={[styles.airlineMetricValue, { color: '#10B981' }]}>{airline.onTime}</Text>
              </View>
              <View style={styles.airlineMetric}>
                <Text style={styles.airlineMetricLabel}>Delays</Text>
                <Text style={[styles.airlineMetricValue, { color: '#F59E0B' }]}>{airline.delays}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Orbit Alerts</Text>
      {ORBIT_ALERTS.map((alert, index) => (
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
        <Plane size={32} color={TRAVEL_COLORS.amber} />
        <View>
          <Text style={styles.headerTitle}>Agent Orbit</Text>
          <Text style={styles.headerSubtitle}>Transportation Agent - Flight monitoring and route optimization</Text>
        </View>
      </View>

      {renderMetrics()}
      {renderAirlinePerformance()}
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
  airlinesList: {
    gap: 12,
  },
  airlineCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  airlineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  airlineName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  airlineFlights: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  airlineMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  airlineMetric: {
    alignItems: 'center',
  },
  airlineMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  airlineMetricValue: {
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
