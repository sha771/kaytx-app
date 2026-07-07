import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Shield, AlertTriangle, Globe, TrendingUp, Activity, MapPin } from 'lucide-react-native';

export default function RiskDisruption() {
  const { theme } = useTheme();

  const riskMetrics = [
    { label: 'Active Risks', value: '8,420', change: '+342', trend: 'up' as const, color: '#EF4444' },
    { label: 'Disruptions Prevented', value: '1,842', change: '+128', trend: 'up' as const, color: '#10B981' },
    { label: 'Prediction Accuracy', value: '95.2%', change: '+1.8%', trend: 'up' as const, color: '#3B82F6' },
    { label: 'Risk Mitigation', value: '94.7%', change: '+2.4%', trend: 'up' as const, color: '#06B6D4' },
    { label: 'Financial Impact', value: '$142M', change: '+$28M', trend: 'up' as const, color: '#F59E0B' },
  ];

  const globalRisks = [
    { type: 'Supplier Failure', region: 'Asia Pacific', severity: 'high' as const, probability: 78, impact: '$12.4M', status: 'monitoring' as const },
    { type: 'Geopolitical Tension', region: 'Europe', severity: 'medium' as const, probability: 45, impact: '$8.2M', status: 'monitoring' as const },
    { type: 'Weather Disruption', region: 'North America', severity: 'high' as const, probability: 62, impact: '$6.8M', status: 'mitigating' as const },
    { type: 'Port Congestion', region: 'Latin America', severity: 'medium' as const, probability: 54, impact: '$4.2M', status: 'resolved' as const },
  ];

  const riskCategories = [
    { category: 'Supplier Risks', count: 234, trend: 'up' as const, color: '#EF4444' },
    { category: 'Logistics Risks', count: 187, trend: 'down' as const, color: '#F59E0B' },
    { category: 'Demand Risks', count: 156, trend: 'stable' as const, color: '#3B82F6' },
    { category: 'Geopolitical Risks', count: 98, trend: 'up' as const, color: '#8B5CF6' },
    { category: 'Environmental Risks', count: 76, trend: 'down' as const, color: '#06B6D4' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'high': return '#EF4444';
      case 'critical': return '#DC2626';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'monitoring': return '#3B82F6';
      case 'mitigating': return '#F59E0B';
      case 'resolved': return '#10B981';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      case 'stable': return '→';
      default: return '';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Shield size={20} color="#3B82F6" />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Risk & Disruption Intelligence
        </Text>
      </View>

      {/* Risk Metrics */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
        {riskMetrics.map((metric, index) => (
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

      {/* Global Risk Map */}
      <View style={styles.riskMapSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
          Global Risk Monitoring
        </Text>
        <View style={styles.riskMap}>
          <View style={styles.mapPlaceholder}>
            <Globe size={48} color="#3B82F6" />
            <Text style={[styles.mapPlaceholderText, { color: theme.colors.textSecondary }]}>
              Global Risk Map Visualization
            </Text>
          </View>
        </View>
      </View>

      {/* Global Risks */}
      <View style={styles.risksSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
          Active Global Risks
        </Text>
        <View style={styles.risksList}>
          {globalRisks.map((risk, index) => (
            <View 
              key={index}
              style={[styles.riskCard, { backgroundColor: 'rgba(239, 68, 68, 0.05)', borderColor: `${getSeverityColor(risk.severity)}30` }]}
            >
              <View style={styles.riskHeader}>
                <View style={styles.riskInfo}>
                  <View style={styles.riskIconContainer}>
                    <AlertTriangle size={16} color={getSeverityColor(risk.severity)} />
                  </View>
                  <View>
                    <Text style={[styles.riskType, { color: theme.colors.text }]}>
                      {risk.type}
                    </Text>
                    <View style={styles.riskLocation}>
                      <MapPin size={12} color="#6B7280" />
                      <Text style={[styles.riskRegion, { color: theme.colors.textSecondary }]}>
                        {risk.region}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(risk.severity) + '20' }]}>
                  <Text style={[styles.severityText, { color: getSeverityColor(risk.severity) }]}>
                    {risk.severity.charAt(0).toUpperCase() + risk.severity.slice(1)}
                  </Text>
                </View>
              </View>

              <View style={styles.riskMetrics}>
                <View style={styles.riskMetric}>
                  <Activity size={12} color="#8B5CF6" />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Probability: {risk.probability}%
                  </Text>
                </View>
                <View style={styles.riskMetric}>
                  <TrendingUp size={12} color="#EF4444" />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Impact: {risk.impact}
                  </Text>
                </View>
                <View style={styles.riskMetric}>
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor(risk.status) }]} />
                  <Text style={[styles.statusText, { color: getStatusColor(risk.status) }]}>
                    {risk.status.charAt(0).toUpperCase() + risk.status.slice(1)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Risk Categories */}
      <View style={styles.categoriesSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
          Risk Categories
        </Text>
        <View style={styles.categoriesGrid}>
          {riskCategories.map((category, index) => (
            <View 
              key={index}
              style={[styles.categoryCard, { backgroundColor: `${category.color}10`, borderColor: `${category.color}30` }]}
            >
              <Text style={[styles.categoryName, { color: theme.colors.text }]}>
                {category.category}
              </Text>
              <Text style={[styles.categoryCount, { color: category.color }]}>
                {category.count}
              </Text>
              <View style={styles.categoryTrend}>
                <Text style={[styles.trendIcon, { color: category.color }]}>
                  {getTrendIcon(category.trend)}
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
  riskMapSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  riskMap: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  mapPlaceholder: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholderText: {
    fontSize: 12,
    marginTop: 8,
  },
  risksSection: {
    marginBottom: 16,
  },
  risksList: {
    gap: 8,
  },
  riskCard: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
  },
  riskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  riskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  riskIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  riskType: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  riskLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  riskRegion: {
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
  riskMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  riskMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricLabel: {
    fontSize: 10,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  categoriesSection: {
    marginBottom: 8,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryCard: {
    flex: 1,
    minWidth: 120,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
  },
  categoryName: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  categoryTrend: {
    alignSelf: 'flex-start',
  },
  trendIcon: {
    fontSize: 12,
    fontWeight: '600',
  },
});