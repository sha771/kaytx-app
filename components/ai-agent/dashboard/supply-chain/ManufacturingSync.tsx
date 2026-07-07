import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Cog, Factory, AlertTriangle, CheckCircle, TrendingUp, Activity } from 'lucide-react-native';

export default function ManufacturingSync() {
  const { theme } = useTheme();

  const manufacturingMetrics = [
    { label: 'Production Orders', value: '1,248', change: '+84', trend: 'up' as const, color: '#3B82F6' },
    { label: 'Material Availability', value: '96.2%', change: '+2.4%', trend: 'up' as const, color: '#10B981' },
    { label: 'Production Efficiency', value: '94.8%', change: '+1.8%', trend: 'up' as const, color: '#06B6D4' },
    { label: 'Supply Alignment', value: '92.4%', change: '+3.2%', trend: 'up' as const, color: '#8B5CF6' },
    { label: 'Delay Reduction', value: '67%', change: '+12%', trend: 'up' as const, color: '#F59E0B' },
  ];

  const productionLines = [
    { line: 'Production Line A', location: 'Factory #1', efficiency: 96, materialStatus: 'optimal' as const, output: '12.4K units', delays: 0 },
    { line: 'Production Line B', location: 'Factory #2', efficiency: 94, materialStatus: 'optimal' as const, output: '10.8K units', delays: 1 },
    { line: 'Production Line C', location: 'Factory #3', efficiency: 91, materialStatus: 'good' as const, output: '9.2K units', delays: 2 },
    { line: 'Production Line D', location: 'Factory #4', efficiency: 89, materialStatus: 'warning' as const, output: '8.4K units', delays: 3 },
  ];

  const manufacturingAlerts = [
    { line: 'Production Line D', alert: 'Material shortage expected', severity: 'high' as const, material: 'Component X-12', impact: '15% reduction' },
    { line: 'Production Line C', alert: 'Supply chain misalignment', severity: 'medium' as const, material: 'Material Y-45', impact: '8% reduction' },
  ];

  const getMaterialStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return '#10B981';
      case 'good': return '#3B82F6';
      case 'warning': return '#F59E0B';
      case 'critical': return '#EF4444';
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
        <Cog size={20} color="#3B82F6" />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Manufacturing Synchronization Hub
        </Text>
      </View>

      {/* Manufacturing Metrics */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
        {manufacturingMetrics.map((metric, index) => (
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

      {/* Production Lines */}
      <View style={styles.productionSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
          Production Line Status
        </Text>
        <View style={styles.productionList}>
          {productionLines.map((line, index) => (
            <View 
              key={index}
              style={[styles.productionCard, { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}
            >
              <View style={styles.productionHeader}>
                <View style={styles.productionInfo}>
                  <View style={styles.productionIconContainer}>
                    <Factory size={16} color="#3B82F6" />
                  </View>
                  <View>
                    <Text style={[styles.productionLine, { color: theme.colors.text }]}>
                      {line.line}
                    </Text>
                    <Text style={[styles.productionLocation, { color: theme.colors.textSecondary }]}>
                      {line.location}
                    </Text>
                  </View>
                </View>
                <View style={[styles.materialBadge, { backgroundColor: getMaterialStatusColor(line.materialStatus) + '20' }]}>
                  <Text style={[styles.materialText, { color: getMaterialStatusColor(line.materialStatus) }]}>
                    {line.materialStatus.charAt(0).toUpperCase() + line.materialStatus.slice(1)}
                  </Text>
                </View>
              </View>

              <View style={styles.productionMetrics}>
                <View style={styles.productionMetric}>
                  <Activity size={12} color="#10B981" />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Efficiency: {line.efficiency}%
                  </Text>
                </View>
                <View style={styles.productionMetric}>
                  <TrendingUp size={12} color="#8B5CF6" />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Output: {line.output}
                  </Text>
                </View>
                <View style={styles.productionMetric}>
                  {line.delays === 0 ? (
                    <CheckCircle size={12} color="#10B981" />
                  ) : (
                    <AlertTriangle size={12} color="#F59E0B" />
                  )}
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Delays: {line.delays}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Manufacturing Alerts */}
      <View style={styles.alertsSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
          Manufacturing Alerts
        </Text>
        <View style={styles.alertsList}>
          {manufacturingAlerts.map((alert, index) => (
            <View 
              key={index}
              style={[styles.alertCard, { backgroundColor: 'rgba(239, 68, 68, 0.05)', borderColor: `${getSeverityColor(alert.severity)}30` }]}
            >
              <View style={styles.alertHeader}>
                <AlertTriangle size={16} color={getSeverityColor(alert.severity)} />
                <View style={styles.alertInfo}>
                  <Text style={[styles.alertLine, { color: theme.colors.text }]}>
                    {alert.line}
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
              <View style={styles.alertDetails}>
                <View style={styles.alertDetail}>
                  <Text style={[styles.alertDetailLabel, { color: theme.colors.textSecondary }]}>
                    Material: {alert.material}
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
  productionSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  productionList: {
    gap: 8,
  },
  productionCard: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
  },
  productionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  productionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  productionIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productionLine: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  productionLocation: {
    fontSize: 11,
  },
  materialBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  materialText: {
    fontSize: 11,
    fontWeight: '600',
  },
  productionMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  productionMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricLabel: {
    fontSize: 10,
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
  alertLine: {
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
  alertDetails: {
    flexDirection: 'row',
    gap: 12,
  },
  alertDetail: {
    flex: 1,
  },
  alertDetailLabel: {
    fontSize: 10,
  },
});