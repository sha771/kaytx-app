import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Map, Users, Star, DollarSign, CheckCircle, Clock, Target,
  TrendingUp, AlertTriangle, Activity, ArrowUpRight, Smile, Calendar
} from 'lucide-react-native';
import { TRAVEL_COLORS } from '@/constants/travelTourism';

const { width } = Dimensions.get('window');

export default function ToursExperiences() {
  const TOUR_METRICS = [
    { label: 'Tour Bookings', value: '2.4M', icon: Calendar, color: TRAVEL_COLORS.purple, trend: '+28.4%', trendUp: true },
    { label: 'Attractions Tracked', value: '12,400', icon: Map, color: TRAVEL_COLORS.oceanBlue, trend: '+18.6%', trendUp: true },
    { label: 'Guide Performance', value: '96.2%', icon: Star, color: TRAVEL_COLORS.amber, trend: '+4.2%', trendUp: true },
    { label: 'Customer Ratings', value: '4.8/5', icon: Smile, color: TRAVEL_COLORS.emeraldGreen, trend: '+0.3', trendUp: true },
    { label: 'Seasonal Demand', value: '+34%', icon: TrendingUp, color: TRAVEL_COLORS.neonCyan, trend: '+12.4%', trendUp: true },
    { label: 'Avg Tour Duration', value: '4.2h', icon: Clock, color: TRAVEL_COLORS.magenta, trend: '+0.2h', trendUp: true },
  ];

  const ATTRACTION_PERFORMANCE = [
    { attraction: 'Eiffel Tower', visitors: '1.2M', rating: '4.8', revenue: '$84M', color: TRAVEL_COLORS.purple },
    { attraction: 'Louvre Museum', visitors: '980K', rating: '4.7', revenue: '$68M', color: TRAVEL_COLORS.oceanBlue },
    { attraction: 'Colosseum', visitors: '840K', rating: '4.6', revenue: '$52M', color: TRAVEL_COLORS.emeraldGreen },
    { attraction: 'Sagrada Familia', visitors: '720K', rating: '4.9', revenue: '$48M', color: TRAVEL_COLORS.amber },
  ];

  const TOUR_CATEGORIES = [
    { category: 'Cultural Tours', bookings: '840K', revenue: '$420M', satisfaction: '96.4%', color: TRAVEL_COLORS.purple },
    { category: 'Adventure Tours', bookings: '620K', revenue: '$380M', satisfaction: '95.2%', color: TRAVEL_COLORS.emeraldGreen },
    { category: 'Food Tours', bookings: '480K', revenue: '$180M', satisfaction: '94.8%', color: TRAVEL_COLORS.amber },
    { category: 'Private Tours', bookings: '320K', revenue: '$520M', satisfaction: '97.6%', color: TRAVEL_COLORS.oceanBlue },
  ];

  const TOUR_ALERTS = [
    { type: 'opportunity', message: 'Cultural tours projected 42% increase for summer season', impact: 'High', time: '2h ago' },
    { type: 'trend', message: 'Private tours showing 38% growth among luxury travelers', impact: 'Medium', time: '4h ago' },
    { type: 'success', message: 'AI guide recommendations increased tour satisfaction by 12%', impact: 'Positive', time: '6h ago' },
    { type: 'info', message: 'New attraction partnership added in Southeast Asia', impact: 'Low', time: '8h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Tours & Experiences Metrics</Text>
      <View style={styles.metricsGrid}>
        {TOUR_METRICS.map((metric, index) => (
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

  const renderAttractionPerformance = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Attraction Performance</Text>
      <View style={styles.attractionsList}>
        {ATTRACTION_PERFORMANCE.map((attraction) => (
          <View key={attraction.attraction} style={[styles.attractionCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: attraction.color }]}>
            <View style={styles.attractionHeader}>
              <Map size={20} color={attraction.color} />
              <Text style={styles.attractionName}>{attraction.attraction}</Text>
              <Text style={styles.attractionVisitors}>{attraction.visitors}</Text>
            </View>
            <View style={styles.attractionMetrics}>
              <View style={styles.attractionMetric}>
                <Text style={styles.attractionMetricLabel}>Rating</Text>
                <Text style={styles.attractionMetricValue}>{attraction.rating}</Text>
              </View>
              <View style={styles.attractionMetric}>
                <Text style={styles.attractionMetricLabel}>Revenue</Text>
                <Text style={styles.attractionMetricValue}>{attraction.revenue}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderTourCategories = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Tour Categories</Text>
      <View style={styles.categoriesList}>
        {TOUR_CATEGORIES.map((category) => (
          <View key={category.category} style={[styles.categoryCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: category.color }]}>
            <View style={styles.categoryHeader}>
              <Calendar size={20} color={category.color} />
              <Text style={styles.categoryName}>{category.category}</Text>
              <Text style={styles.categoryBookings}>{category.bookings}</Text>
            </View>
            <View style={styles.categoryMetrics}>
              <View style={styles.categoryMetric}>
                <Text style={styles.categoryMetricLabel}>Revenue</Text>
                <Text style={styles.categoryMetricValue}>{category.revenue}</Text>
              </View>
              <View style={styles.categoryMetric}>
                <Text style={styles.categoryMetricLabel}>Satisfaction</Text>
                <Text style={styles.categoryMetricValue}>{category.satisfaction}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Tour Alerts</Text>
      {TOUR_ALERTS.map((alert, index) => (
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
            {alert.type === 'info' && <Map size={20} color="#8B5CF6" />}
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
        <Map size={32} color={TRAVEL_COLORS.purple} />
        <View>
          <Text style={styles.headerTitle}>Tours & Experiences Hub</Text>
          <Text style={styles.headerSubtitle}>Tour bookings and attraction management</Text>
        </View>
      </View>

      {renderMetrics()}
      {renderAttractionPerformance()}
      {renderTourCategories()}
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
  attractionsList: {
    gap: 12,
  },
  attractionCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  attractionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  attractionName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  attractionVisitors: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  attractionMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  attractionMetric: {
    alignItems: 'center',
  },
  attractionMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  attractionMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  categoriesList: {
    gap: 12,
  },
  categoryCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  categoryBookings: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  categoryMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  categoryMetric: {
    alignItems: 'center',
  },
  categoryMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  categoryMetricValue: {
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
