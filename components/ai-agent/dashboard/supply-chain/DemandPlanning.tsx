import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, BarChart3, AlertTriangle, Target, ArrowUp, ArrowDown } from 'lucide-react-native';

export default function DemandPlanning() {
  const { theme } = useTheme();

  const demandMetrics = [
    { label: 'Forecast Accuracy', value: '96.4%', change: '+2.1%', trend: 'up' as const, color: '#10B981' },
    { label: 'Demand Coverage', value: '94.8%', change: '+1.8%', trend: 'up' as const, color: '#3B82F6' },
    { label: 'Seasonal Variance', value: '12.3%', change: '-2.4%', trend: 'up' as const, color: '#06B6D4' },
    { label: 'Regional Variance', value: '8.7%', change: '-1.2%', trend: 'up' as const, color: '#8B5CF6' },
    { label: 'SKU Accuracy', value: '93.2%', change: '+1.5%', trend: 'up' as const, color: '#F59E0B' },
  ];

  const demandForecasts = [
    { product: 'Product Line A', region: 'North America', forecast: '124K', actual: '118K', variance: '+5.1%', trend: 'up' as const, confidence: 96 },
    { product: 'Product Line B', region: 'Europe', forecast: '89K', actual: '92K', variance: '-3.3%', trend: 'down' as const, confidence: 94 },
    { product: 'Product Line C', region: 'Asia Pacific', forecast: '156K', actual: '148K', variance: '+5.4%', trend: 'up' as const, confidence: 92 },
    { product: 'Product Line D', region: 'Latin America', forecast: '67K', actual: '64K', variance: '+4.7%', trend: 'up' as const, confidence: 89 },
  ];

  const demandAlerts = [
    { product: 'Product Line A', alert: 'Demand surge expected', severity: 'high' as const, impact: '+23%', timeframe: 'Q4 2026', recommendation: 'Increase inventory by 25%' },
    { product: 'Product Line C', alert: 'Seasonal decline predicted', severity: 'medium' as const, impact: '-15%', timeframe: 'Q1 2027', recommendation: 'Reduce production by 10%' },
    { product: 'Product Line B', alert: 'Regional variability', severity: 'low' as const, impact: '±8%', timeframe: 'Q3 2026', recommendation: 'Monitor regional trends' },
  ];

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return '#10B981';
      case 'down': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'high': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <TrendingUp size={20} color="#3B82F6" />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Demand Planning & Forecasting Engine
        </Text>
      </View>

      {/* Demand Metrics */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
        {demandMetrics.map((metric, index) => (
          <View 
            key={index}
            style={[styles.metricCard, { backgroundColor: 'rgba(59, 130, 246, 0.08)', borderColor: `${metric.color}30` }]}
          >
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
              {metric.label}
            </Text>
            <Text style={[styles.metricValue, { color: metric.color }]}>
              {metric.value}
            </Text>
            <View style={styles.metricChange}>
              <Text style={[styles.changeText, { color: '#10B981' }]}>
                {metric.change}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Demand Forecasts */}
      <View style={styles.forecastsSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
          Demand Forecast Performance
        </Text>
        <View style={styles.forecastsList}>
          {demandForecasts.map((forecast, index) => (
            <View 
              key={index}
              style={[styles.forecastCard, { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}
            >
              <View style={styles.forecastHeader}>
                <View style={styles.forecastInfo}>
                  <Text style={[styles.forecastProduct, { color: theme.colors.text }]}>
                    {forecast.product}
                  </Text>
                  <Text style={[styles.forecastRegion, { color: theme.colors.textSecondary }]}>
                    {forecast.region}
                  </Text>
                </View>
                <View style={[styles.confidenceBadge, { backgroundColor: '#3B82F6' + '20' }]}>
                  <Text style={[styles.confidenceText, { color: '#3B82F6' }]}>
                    {forecast.confidence}% confidence
                  </Text>
                </View>
              </View>
              <View style={styles.forecastMetrics}>
                <View style={styles.forecastMetric}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Forecast
                  </Text>
                  <Text style={[styles.forecastValue, { color: '#8B5CF6' }]}>
                    {forecast.forecast}
                  </Text>
                </View>
                <View style={styles.forecastMetric}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Actual
                  </Text>
                  <Text style={[styles.actualValue, { color: '#06B6D4' }]}>
                    {forecast.actual}
                  </Text>
                </View>
                <View style={styles.forecastMetric}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Variance
                  </Text>
                  <View style={styles.varianceContainer}>
                    {forecast.trend === 'up' ? <ArrowUp size={12} color={getTrendColor(forecast.trend)} /> : <ArrowDown size={12} color={getTrendColor(forecast.trend)} />}
                    <Text style={[styles.varianceValue, { color: getTrendColor(forecast.trend) }]}>
                      {forecast.variance}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Demand Alerts */}
      <View style={styles.alertsSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
          Demand Alerts & Recommendations
        </Text>
        <View style={styles.alertsList}>
          {demandAlerts.map((alert, index) => (
            <View 
              key={index}
              style={[styles.alertCard, { backgroundColor: 'rgba(239, 68, 68, 0.05)', borderColor: `${getSeverityColor(alert.severity)}30` }]}
            >
              <View style={styles.alertHeader}>
                <AlertTriangle size={16} color={getSeverityColor(alert.severity)} />
                <View style={styles.alertInfo}>
                  <Text style={[styles.alertProduct, { color: theme.colors.text }]}>
                    {alert.product}
                  </Text>
                  <Text style={[styles.alertDescription, { color: theme.colors.textSecondary }]}>
                    {alert.alert}
                  </Text>
                </View>
                <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(alert.severity) + '20' }]}>
                  <Text style={[styles.severityText, { color: getSeverityColor(alert.severity) }]}>
                    {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                  </Text>
                </View>
              </View>
              <View style={styles.alertMetrics}>
                <View style={styles.alertMetric}>
                  <Target size={12} color="#8B5CF6" />
                  <Text style={[styles.alertMetricLabel, { color: theme.colors.textSecondary }]}>
                    Impact: {alert.impact}
                  </Text>
                </View>
                <View style={styles.alertMetric}>
                  <BarChart3 size={12} color="#06B6D4" />
                  <Text style={[styles.alertMetricLabel, { color: theme.colors.textSecondary }]}>
                    {alert.timeframe}
                  </Text>
                </View>
              </View>
              <View style={styles.recommendation}>
                <Text style={[styles.recommendationLabel, { color: theme.colors.textSecondary }]}>
                  AI Recommendation:
                </Text>
                <Text style={[styles.recommendationText, { color: '#10B981' }]}>
                  {alert.recommendation}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  metricsScroll: {
    marginHorizontal: -8,
    marginBottom: 16,
  },
  metricCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 8,
    minWidth: 120,
    borderWidth: 1,
  },
  metricLabel: {
    fontSize: 10,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricChange: {
    marginTop: 4,
  },
  changeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  forecastsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  forecastsList: {
    gap: 8,
  },
  forecastCard: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
  },
  forecastHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  forecastInfo: {
    flex: 1,
  },
  forecastProduct: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  forecastRegion: {
    fontSize: 11,
  },
  confidenceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  confidenceText: {
    fontSize: 11,
    fontWeight: '600',
  },
  forecastMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  forecastMetric: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  forecastValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  actualValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  varianceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  varianceValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  alertsSection: {
    marginBottom: 8,
  },
  alertsList: {
    gap: 8,
  },
  alertCard: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  alertInfo: {
    flex: 1,
  },
  alertProduct: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  alertDescription: {
    fontSize: 11,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  severityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  alertMetrics: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  alertMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  alertMetricLabel: {
    fontSize: 10,
  },
  recommendation: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 8,
    padding: 8,
  },
  recommendationLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  recommendationText: {
    fontSize: 11,
    fontWeight: '600',
  },
});