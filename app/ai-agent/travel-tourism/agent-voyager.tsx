import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Compass, Map, Route, Calendar, Users, Target, TrendingUp,
  CheckCircle, Clock, Globe, Sparkles, Activity, ArrowUpRight, Smile
} from 'lucide-react-native';
import { TRAVEL_COLORS } from '@/constants/travelTourism';

const { width } = Dimensions.get('window');

export default function AgentVoyager() {
  const VOYAGER_METRICS = [
    { label: 'Trips Planned', value: '842K', icon: Calendar, color: TRAVEL_COLORS.neonCyan, trend: '+42.6%', trendUp: true },
    { label: 'Traveler Satisfaction', value: '96.4%', icon: Smile, color: TRAVEL_COLORS.emeraldGreen, trend: '+3.8%', trendUp: true },
    { label: 'Booking Conversion', value: '42.8%', icon: Target, color: TRAVEL_COLORS.purple, trend: '+5.2%', trendUp: true },
    { label: 'Avg Trip Duration', value: '7.2 days', icon: Clock, color: TRAVEL_COLORS.amber, trend: '+0.8%', trendUp: true },
    { label: 'Destinations Covered', value: '2,400', icon: Globe, color: TRAVEL_COLORS.oceanBlue, trend: '+12.4%', trendUp: true },
    { label: 'Personalization Score', value: '94.2%', icon: Sparkles, color: TRAVEL_COLORS.magenta, trend: '+6.4%', trendUp: true },
  ];

  const ITINERARY_TYPES = [
    { type: 'Luxury Escapes', count: '284K', revenue: '$1.8B', satisfaction: '97.2%', color: TRAVEL_COLORS.purple },
    { type: 'Adventure Tours', count: '186K', revenue: '$420M', satisfaction: '95.8%', color: TRAVEL_COLORS.emeraldGreen },
    { type: 'Family Vacations', count: '242K', revenue: '$680M', satisfaction: '94.6%', color: TRAVEL_COLORS.oceanBlue },
    { type: 'Business Trips', count: '98K', revenue: '$840M', satisfaction: '93.4%', color: TRAVEL_COLORS.amber },
    { type: 'Romantic Getaways', count: '32K', revenue: '$280M', satisfaction: '96.8%', color: TRAVEL_COLORS.magenta },
  ];

  const DESTINATION_RECOMMENDATIONS = [
    { destination: 'Santorini, Greece', match: '98%', travelers: '42K', bookings: '38K', revenue: '$84M', color: TRAVEL_COLORS.neonCyan },
    { destination: 'Kyoto, Japan', match: '96%', travelers: '38K', bookings: '34K', revenue: '$76M', color: TRAVEL_COLORS.oceanBlue },
    { destination: 'Maldives', match: '95%', travelers: '28K', bookings: '26K', revenue: '$120M', color: TRAVEL_COLORS.emeraldGreen },
    { destination: 'Swiss Alps', match: '94%', travelers: '24K', bookings: '22K', revenue: '$68M', color: TRAVEL_COLORS.purple },
  ];

  const VOYAGER_ALERTS = [
    { type: 'opportunity', message: 'Summer season demand projected to increase 34% for Mediterranean destinations', impact: 'High', time: '2h ago' },
    { type: 'trend', message: 'Eco-tourism preferences up 28% among luxury travelers', impact: 'Medium', time: '4h ago' },
    { type: 'success', message: 'Personalization accuracy improved to 94.2% with new AI model', impact: 'Positive', time: '6h ago' },
    { type: 'info', message: 'New destination partnerships added in Southeast Asia', impact: 'Low', time: '8h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Agent Voyager Metrics</Text>
      <View style={styles.metricsGrid}>
        {VOYAGER_METRICS.map((metric, index) => (
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

  const renderItineraryTypes = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Itinerary Types Performance</Text>
      <View style={styles.typesList}>
        {ITINERARY_TYPES.map((type) => (
          <View key={type.type} style={[styles.typeCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: type.color }]}>
            <View style={styles.typeHeader}>
              <Route size={20} color={type.color} />
              <Text style={styles.typeName}>{type.type}</Text>
              <Text style={styles.typeCount}>{type.count}</Text>
            </View>
            <View style={styles.typeMetrics}>
              <View style={styles.typeMetric}>
                <Text style={styles.typeMetricLabel}>Revenue</Text>
                <Text style={styles.typeMetricValue}>{type.revenue}</Text>
              </View>
              <View style={styles.typeMetric}>
                <Text style={styles.typeMetricLabel}>Satisfaction</Text>
                <Text style={styles.typeMetricValue}>{type.satisfaction}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderDestinationRecommendations = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Destination Recommendations</Text>
      <View style={styles.destinationsGrid}>
        {DESTINATION_RECOMMENDATIONS.map((dest) => (
          <View key={dest.destination} style={[styles.destCard, { backgroundColor: dest.color + '10', borderColor: dest.color }]}>
            <Globe size={24} color={dest.color} />
            <Text style={styles.destName}>{dest.destination}</Text>
            <Text style={styles.destMatch}>{dest.match} Match</Text>
            <View style={styles.destMetrics}>
              <View style={styles.destMetric}>
                <Users size={12} color="#6B7280" />
                <Text style={styles.destMetricText}>{dest.travelers}</Text>
              </View>
              <View style={styles.destMetric}>
                <CheckCircle size={12} color="#6B7280" />
                <Text style={styles.destMetricText}>{dest.bookings}</Text>
              </View>
            </View>
            <Text style={styles.destRevenue}>{dest.revenue}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Voyager Alerts</Text>
      {VOYAGER_ALERTS.map((alert, index) => (
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
            {alert.type === 'info' && <Sparkles size={20} color="#8B5CF6" />}
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
        <Compass size={32} color={TRAVEL_COLORS.neonCyan} />
        <View>
          <Text style={styles.headerTitle}>Agent Voyager</Text>
          <Text style={styles.headerSubtitle}>Trip Planning Agent - Personalized itineraries and destination recommendations</Text>
        </View>
      </View>

      {renderMetrics()}
      {renderItineraryTypes()}
      {renderDestinationRecommendations()}
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
  typesList: {
    gap: 12,
  },
  typeCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  typeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  typeName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  typeCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  typeMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  typeMetric: {
    alignItems: 'center',
  },
  typeMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  typeMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  destinationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  destCard: {
    width: (width - 64) / 2 - 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    alignItems: 'center',
  },
  destName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  destMatch: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  destMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  destMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  destMetricText: {
    fontSize: 11,
    color: '#6B7280',
  },
  destRevenue: {
    fontSize: 14,
    fontWeight: 'bold',
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
