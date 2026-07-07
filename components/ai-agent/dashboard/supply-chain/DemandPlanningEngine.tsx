import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, BarChart3, Activity, Target, AlertTriangle, Calendar, MapPin } from 'lucide-react-native';

export default function DemandPlanningEngine() {
  const { theme } = useTheme();

  const demandMetrics = [
    { label: 'Total Demand', value: '8.4M units', change: '+420K units', trend: 'up' as const, color: '#3B82F6' },
    { label: 'Forecast Accuracy', value: '96.2%', change: '+1.8%', trend: 'up' as const, color: '#10B981' },
    { label: 'Demand Variability', value: '12.4%', change: '-2.1%', trend: 'up' as const, color: '#06B6D4' },
    { label: 'Seasonal Index', value: '1.24x', change: '+0.08x', trend: 'up' as const, color: '#8B5CF6' },
    { label: 'Demand-Supply Gap', value: '2.4%', change: '-0.8%', trend: 'up' as const, color: '#F59E0B' },
  ];

  const regionalDemand = [
    { 
      region: 'North America', 
      currentDemand: '3.2M units', 
      forecastedDemand: '3.4M units', 
      accuracy: 96, 
      trend: 'up' as const,
      seasonality: 'high' as const
    },
    { 
      region: 'Europe', 
      currentDemand: '2.8M units', 
      forecastedDemand: '2.9M units', 
      accuracy: 94, 
      trend: 'up' as const,
      seasonality: 'medium' as const
    },
    { 
      region: 'Asia Pacific', 
      currentDemand: '1.8M units', 
      forecastedDemand: '1.6M units', 
      accuracy: 92, 
      trend: 'stable' as const,
      seasonality: 'high' as const
    },
    { 
      region: 'Latin America', 
      currentDemand: '0.6M units', 
      forecastedDemand: '0.5M units', 
      accuracy: 88, 
      trend: 'up' as const,
      seasonality: 'low' as const
    },
  ];

  const demandAlerts = [
    { region: 'Asia Pacific', alert: 'Q4 seasonal surge expected', severity: 'medium' as const, impact: '+18%', timeline: '90 days' },
    { region: 'North America', alert: 'Unusual demand pattern detected', severity: 'low' as const, impact: '+4%', timeline: '30 days' },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      case 'stable': return '→';
      default: return '';
    }
  };

  const getSeasonalityColor = (seasonality: string) => {
    switch (seasonality) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
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

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 95) return '#10B981';
    if (accuracy >= 90) return '#3B82F6';
    if (accuracy >= 85) return '#06B6D4';
    return '#F59E0B';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <BarChart3 size={20} color="#3B82F6" />
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
              <TrendingUp size={12} color="#10B981" />
              <Text style={[styles.changeText, { color: '#10B981' }]}>
                {metric.change}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Regional Demand */}
      <View style={styles.regionalSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
          Regional Demand Analysis
        </Text>
        <View style={styles.regionalList}>
          {regionalDemand.map((region, index) => (
            <View 
              key={index}
              style={[styles.regionCard, { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}
            >
              <View style={styles.regionHeader}>
                <View style={styles.regionInfo}>
                  <MapPin size={16} color="#3B82F6" />
                  <Text style={[styles.regionName, { color: theme.colors.text }]}>
                    {region.region}
                  </Text>
                </View>
                <View style={[
                  styles.seasonalityBadge, 
                  { backgroundColor: getSeasonalityColor(region.seasonality) + '20' }
                ]}>
                  <Text style={[
                    styles.seasonalityText, 
                    { color: getSeasonalityColor(region.seasonality) }
                  ]}>
                    {region.seasonality.toUpperCase()} Seasonality
                  </Text>
                </View>
              </View>

              <View style={styles.regionMetrics}>
                <View style={styles.regionMetric}>
                  <Activity size={12} color="#3B82F6" />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Current Demand
                  </Text>
                  <Text style={[styles.metricValue, { color: '#3B82F6' }]}>
                    {region.currentDemand}
                  </Text>
                </View>

                <View style={styles.regionMetric}>
                  <Target size={12} color="#10B981" />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Forecasted Demand
                  </Text>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>
                    {region.forecastedDemand}
                  </Text>
                </View>

                <View style={styles.regionMetric}>
                  <TrendingUp size={12} color="#06B6D4" />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Trend
                  </Text>
                  <Text style={[styles.metricValue, { color: '#06B6D4' }]}>
                    {getTrendIcon(region.trend)}
                  </Text>
                </View>
              </View>

              <View style={styles.regionAccuracy}>
                <Text style={[styles.accuracyLabel, { color: theme.colors.textSecondary }]}>
                  Forecast Accuracy
                </Text>
                <View style={styles.accuracyBar}>
                  <View 
                    style={[
                      styles.accuracyFill, 
                      { 
                        backgroundColor: getAccuracyColor(region.accuracy),
                        width: `${region.accuracy}%`
                      }
                    ]} 
                  />
                </View>
                <Text style={[
                  styles.accuracyValue, 
                  { color: getAccuracyColor(region.accuracy) }
                ]}>
                  {region.accuracy}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Demand Alerts */}
      <View style={styles.alertsSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
          Demand Planning Alerts
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
                  <Text style={[styles.alertRegion, { color: theme.colors.text }]}>
                    {alert.region}
                  </Text>
                  <Text style={[styles.alertDescription, { color: theme.colors.textSecondary }]}>
                    {alert.alert}
                  </Text>
                </View>
                <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(alert.severity) + '20' }]}>
                  <Text style={[styles.severityText, { color: getSeverityColor(alert.severity) }]}>
                    {alert.severity.toUpperCase()}
                  </Text>
                </View>
              </View>
              <View style={styles.alertDetails}>
                <View style={styles.alertDetail}>
                  <Calendar size={12} color="#F59E0B" />
                  <Text style={[styles.alertDetailLabel, { color: theme.colors.textSecondary }]}>
                    Timeline: {alert.timeline}
                  </Text>
                </View>
                <View style={styles.alertDetail}>
                  <Text style={[styles.alertDetailLabel, { color: theme.colors.textSecondary }]}>
                    Impact: {alert.impact}
                  </Text>
                </View>
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
    marginBottom: 16,
  },
  metricCard: {
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    minWidth: 140,
    borderWidth: 1,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  regionalSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  regionalList: {
    gap: 12,
  },
  regionCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  regionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  regionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  regionName: {
    fontSize: 14,
    fontWeight: '600',
  },
  seasonalityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  seasonalityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  regionMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  regionMetric: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  regionAccuracy: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(59, 130, 246, 0.1)',
    paddingTop: 12,
  },
  accuracyLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 8,
  },
  accuracyBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  accuracyFill: {
    height: '100%',
    borderRadius: 4,
  },
  accuracyValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  alertsSection: {
    marginBottom: 8,
  },
  alertsList: {
    gap: 12,
  },
  alertCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertInfo: {
    flex: 1,
    marginLeft: 12,
  },
  alertRegion: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  alertDescription: {
    fontSize: 12,
    fontWeight: '500',
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
  alertDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alertDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  alertDetailLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
});