import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Plane, CheckCircle, Clock, AlertTriangle, Activity, ArrowUpRight,
  MapPin, TrendingUp, Globe, Route, Target, XCircle
} from 'lucide-react-native';
import { TRAVEL_COLORS, FLIGHT_STATUS_DATA } from '@/constants/travelTourism';

const { width } = Dimensions.get('window');

export default function FlightOperations() {
  const FLIGHT_METRICS = [
    { label: 'Flights Monitored', value: '82,000', icon: Plane, color: TRAVEL_COLORS.amber, trend: '+8.2%', trendUp: true },
    { label: 'On-Time Performance', value: '91.2%', icon: CheckCircle, color: TRAVEL_COLORS.emeraldGreen, trend: '+1.8%', trendUp: true },
    { label: 'Avg Delay', value: '12min', icon: Clock, color: TRAVEL_COLORS.oceanBlue, trend: '-2.4min', trendUp: true },
    { label: 'Cancellations', value: '0.6%', icon: XCircle, color: TRAVEL_COLORS.red, trend: '-0.2%', trendUp: true },
    { label: 'Routes Tracked', value: '4,200', icon: Route, color: TRAVEL_COLORS.purple, trend: '+12.6%', trendUp: true },
    { label: 'Airports Connected', value: '840', icon: MapPin, color: TRAVEL_COLORS.neonCyan, trend: '+6.4%', trendUp: true },
  ];

  const AIRPORT_STATUS = [
    { airport: 'JFK New York', flights: '12,400', onTime: '92.4%', delays: '7.6%', color: TRAVEL_COLORS.oceanBlue },
    { airport: 'LAX Los Angeles', flights: '10,800', onTime: '89.8%', delays: '9.4%', color: TRAVEL_COLORS.neonCyan },
    { airport: 'LHR London', flights: '11,200', onTime: '91.2%', delays: '8.2%', color: TRAVEL_COLORS.purple },
    { airport: 'HND Tokyo', flights: '8,400', onTime: '94.6%', delays: '5.2%', color: TRAVEL_COLORS.emeraldGreen },
  ];

  const FLIGHT_ALERTS = [
    { type: 'critical', message: 'Weather disruption detected across 3 major airports - rerouting in progress', impact: 'Critical', time: '1h ago' },
    { type: 'warning', message: 'Air traffic congestion at JFK causing 15min average delays', impact: 'High', time: '2h ago' },
    { type: 'success', message: 'Route optimization reduced fuel consumption by 12%', impact: 'Positive', time: '4h ago' },
    { type: 'info', message: 'New airline partnership added for Pacific routes', impact: 'Low', time: '6h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Flight Operations Metrics</Text>
      <View style={styles.metricsGrid}>
        {FLIGHT_METRICS.map((metric, index) => (
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
        {FLIGHT_STATUS_DATA.map((airline) => (
          <View key={airline.airline} style={[styles.airlineCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: TRAVEL_COLORS.oceanBlue }]}>
            <View style={styles.airlineHeader}>
              <Plane size={20} color={TRAVEL_COLORS.oceanBlue} />
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
              <View style={styles.airlineMetric}>
                <Text style={styles.airlineMetricLabel}>Cancellations</Text>
                <Text style={[styles.airlineMetricValue, { color: '#EF4444' }]}>{airline.cancellations}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAirportStatus = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Airport Status</Text>
      <View style={styles.airportsList}>
        {AIRPORT_STATUS.map((airport) => (
          <View key={airport.airport} style={[styles.airportCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: airport.color }]}>
            <View style={styles.airportHeader}>
              <MapPin size={20} color={airport.color} />
              <Text style={styles.airportName}>{airport.airport}</Text>
              <Text style={styles.airportFlights}>{airport.flights}</Text>
            </View>
            <View style={styles.airportMetrics}>
              <View style={styles.airportMetric}>
                <Text style={styles.airportMetricLabel}>On-Time</Text>
                <Text style={styles.airportMetricValue}>{airport.onTime}</Text>
              </View>
              <View style={styles.airportMetric}>
                <Text style={styles.airportMetricLabel}>Delays</Text>
                <Text style={[styles.airportMetricValue, { color: '#F59E0B' }]}>{airport.delays}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Flight Alerts</Text>
      {FLIGHT_ALERTS.map((alert, index) => (
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
            {alert.type === 'info' && <Globe size={20} color="#3B82F6" />}
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
          <Text style={styles.headerTitle}>Flight Operations Command Center</Text>
          <Text style={styles.headerSubtitle}>Global flight monitoring and airline operations</Text>
        </View>
      </View>

      {renderMetrics()}
      {renderAirlinePerformance()}
      {renderAirportStatus()}
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
  airportsList: {
    gap: 12,
  },
  airportCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  airportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  airportName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  airportFlights: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  airportMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  airportMetric: {
    alignItems: 'center',
  },
  airportMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  airportMetricValue: {
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
