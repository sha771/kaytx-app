import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  TrendingUp, DollarSign, Target, CheckCircle, Clock, Activity,
  ArrowUpRight, AlertTriangle, Zap, Percent, BarChart3
} from 'lucide-react-native';
import { TRAVEL_COLORS } from '@/constants/travelTourism';

const { width } = Dimensions.get('window');

export default function AgentCompass() {
  const COMPASS_METRICS = [
    { label: 'Revenue Impact', value: '+$910M', icon: DollarSign, color: TRAVEL_COLORS.emeraldGreen, trend: '+24.6%', trendUp: true },
    { label: 'Pricing Accuracy', value: '96.4%', icon: Target, color: TRAVEL_COLORS.neonCyan, trend: '+3.2%', trendUp: true },
    { label: 'Occupancy Growth', value: '+12.4%', icon: TrendingUp, color: TRAVEL_COLORS.purple, trend: '+4.8%', trendUp: true },
    { label: 'Dynamic Adjustments', value: '1.2M', icon: Zap, color: TRAVEL_COLORS.amber, trend: '+38.2%', trendUp: true },
    { label: 'Forecast Precision', value: '94.8%', icon: BarChart3, color: TRAVEL_COLORS.oceanBlue, trend: '+2.6%', trendUp: true },
    { label: 'Profit Margin', value: '28.4%', icon: Percent, color: TRAVEL_COLORS.magenta, trend: '+2.4%', trendUp: true },
  ];

  const PRICING_CATEGORIES = [
    { category: 'Dynamic Pricing', adjustments: '1.2M', revenue: '+$420M', accuracy: '96.4%', color: TRAVEL_COLORS.emeraldGreen },
    { category: 'Seasonal Pricing', periods: '24', revenue: '+$280M', accuracy: '94.2%', color: TRAVEL_COLORS.neonCyan },
    { category: 'Package Pricing', packages: '8,400', revenue: '+$180M', accuracy: '92.8%', color: TRAVEL_COLORS.purple },
    { category: 'Promotional Pricing', campaigns: '486', revenue: '+$30M', accuracy: '88.4%', color: TRAVEL_COLORS.amber },
  ];

  const COMPASS_ALERTS = [
    { type: 'opportunity', message: 'Dynamic pricing opportunity worth $34M identified for summer season', impact: 'High', time: '2h ago' },
    { type: 'trend', message: 'Price elasticity analysis shows 18% increase in booking volume', impact: 'Medium', time: '4h ago' },
    { type: 'success', message: 'Revenue optimization generated $910M impact this quarter', impact: 'Positive', time: '6h ago' },
    { type: 'info', message: 'New pricing algorithm deployed for luxury segment', impact: 'Low', time: '8h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Agent Compass Metrics</Text>
      <View style={styles.metricsGrid}>
        {COMPASS_METRICS.map((metric, index) => (
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

  const renderPricingCategories = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Pricing Categories Performance</Text>
      <View style={styles.categoriesList}>
        {PRICING_CATEGORIES.map((category) => (
          <View key={category.category} style={[styles.categoryCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: category.color }]}>
            <View style={styles.categoryHeader}>
              <Zap size={20} color={category.color} />
              <Text style={styles.categoryName}>{category.category}</Text>
            </View>
            <View style={styles.categoryMetrics}>
              <View style={styles.categoryMetric}>
                <Text style={styles.categoryMetricLabel}>Adjustments</Text>
                <Text style={styles.categoryMetricValue}>{category.adjustments}</Text>
              </View>
              <View style={styles.categoryMetric}>
                <Text style={styles.categoryMetricLabel}>Revenue</Text>
                <Text style={[styles.categoryMetricValue, { color: '#10B981' }]}>{category.revenue}</Text>
              </View>
              <View style={styles.categoryMetric}>
                <Text style={styles.categoryMetricLabel}>Accuracy</Text>
                <Text style={styles.categoryMetricValue}>{category.accuracy}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Compass Alerts</Text>
      {COMPASS_ALERTS.map((alert, index) => (
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
            {alert.type === 'info' && <Zap size={20} color="#8B5CF6" />}
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
        <TrendingUp size={32} color={TRAVEL_COLORS.emeraldGreen} />
        <View>
          <Text style={styles.headerTitle}>Agent Compass</Text>
          <Text style={styles.headerSubtitle}>Revenue Optimization Agent - Dynamic pricing and revenue intelligence</Text>
        </View>
      </View>

      {renderMetrics()}
      {renderPricingCategories()}
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
