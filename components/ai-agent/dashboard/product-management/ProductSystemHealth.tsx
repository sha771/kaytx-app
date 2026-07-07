import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface SystemHealth {
  name: string;
  status: 'healthy' | 'degraded' | 'critical';
  uptime: number;
  lastCheck: string;
  metrics: {
    responseTime: number;
    errorRate: number;
  };
}

interface ProductSystemHealthProps {
  systems: SystemHealth[];
}

export default function ProductSystemHealth({ systems }: ProductSystemHealthProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return '#22C55E';
      case 'degraded': return '#F59E0B';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return '✓';
      case 'degraded': return '⚠';
      case 'critical': return '✗';
      default: return '?';
    }
  };

  const overallHealth = systems.every(s => s.status === 'healthy') ? 'healthy' :
                        systems.some(s => s.status === 'critical') ? 'critical' : 'degraded';

  const averageUptime = systems.reduce((acc, s) => acc + s.uptime, 0) / systems.length;
  const averageResponseTime = systems.reduce((acc, s) => acc + s.metrics.responseTime, 0) / systems.length;
  const averageErrorRate = systems.reduce((acc, s) => acc + s.metrics.errorRate, 0) / systems.length;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Product System Health
      </Text>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Overall Health Card */}
        <View style={[styles.overviewCard, { backgroundColor: theme.colors.background }]}>
          <View style={styles.overviewHeader}>
            <View style={[styles.healthIndicator, { backgroundColor: `${getStatusColor(overallHealth)}20` }]}>
              <Text style={[styles.healthIcon, { color: getStatusColor(overallHealth) }]}>
                {getStatusIcon(overallHealth)}
              </Text>
            </View>
            <View style={styles.overviewContent}>
              <Text style={[styles.overviewTitle, { color: theme.colors.text }]}>
                Overall System Health
              </Text>
              <Text style={[styles.overviewStatus, { color: getStatusColor(overallHealth) }]}>
                {overallHealth.charAt(0).toUpperCase() + overallHealth.slice(1)}
              </Text>
            </View>
          </View>

          <View style={styles.overviewMetrics}>
            <View style={styles.overviewMetric}>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                Avg Uptime
              </Text>
              <Text style={[styles.metricValue, { color: '#22C55E' }]}>
                {averageUptime.toFixed(2)}%
              </Text>
            </View>
            <View style={styles.overviewMetric}>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                Avg Response
              </Text>
              <Text style={[styles.metricValue, { color: averageResponseTime < 200 ? '#22C55E' : '#F59E0B' }]}>
                {averageResponseTime.toFixed(0)}ms
              </Text>
            </View>
            <View style={styles.overviewMetric}>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                Avg Error Rate
              </Text>
              <Text style={[styles.metricValue, { color: averageErrorRate < 1 ? '#22C55E' : '#EF4444' }]}>
                {averageErrorRate.toFixed(2)}%
              </Text>
            </View>
          </View>
        </View>

        {/* Individual System Health */}
        <View style={styles.systemsSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            System Components
          </Text>
          {systems.map((system) => (
            <View 
              key={system.name}
              style={[styles.systemCard, { 
                backgroundColor: theme.colors.background,
                borderColor: getStatusColor(system.status),
                borderLeftWidth: 4
              }]}
            >
              <View style={styles.systemHeader}>
                <View style={styles.systemInfo}>
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor(system.status) }]} />
                  <Text style={[styles.systemName, { color: theme.colors.text }]}>
                    {system.name}
                  </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(system.status)}20` }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(system.status) }]}>
                    {system.status}
                  </Text>
                </View>
              </View>

              <View style={styles.systemMetrics}>
                <View style={styles.metricRow}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Uptime
                  </Text>
                  <Text style={[styles.metricValue, { color: system.uptime > 99.9 ? '#22C55E' : '#F59E0B' }]}>
                    {system.uptime.toFixed(2)}%
                  </Text>
                </View>
                <View style={styles.metricRow}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Response Time
                  </Text>
                  <Text style={[styles.metricValue, { color: system.metrics.responseTime < 200 ? '#22C55E' : '#F59E0B' }]}>
                    {system.metrics.responseTime}ms
                  </Text>
                </View>
                <View style={styles.metricRow}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Error Rate
                  </Text>
                  <Text style={[styles.metricValue, { color: system.metrics.errorRate < 1 ? '#22C55E' : '#EF4444' }]}>
                    {system.metrics.errorRate}%
                  </Text>
                </View>
                <View style={styles.metricRow}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Last Check
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.textSecondary }]}>
                    {system.lastCheck}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Health Recommendations */}
        <View style={[styles.recommendationsCard, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            AI Health Recommendations
          </Text>
          <View style={styles.recommendationItem}>
            <Text style={styles.recommendationIcon}>💡</Text>
            <Text style={[styles.recommendationText, { color: theme.colors.textSecondary }]}>
              Analytics pipeline showing increased latency - consider scaling compute resources
            </Text>
          </View>
          <View style={styles.recommendationItem}>
            <Text style={styles.recommendationIcon}>⚡</Text>
            <Text style={[styles.recommendationText, { color: theme.colors.textSecondary }]}>
              Event tracking system operating optimally - no actions needed
            </Text>
          </View>
          <View style={styles.recommendationItem}>
            <Text style={styles.recommendationIcon}>🔧</Text>
            <Text style={[styles.recommendationText, { color: theme.colors.textSecondary }]}>
              Experimentation platform scheduled for maintenance in 2 hours
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  scrollContainer: {
    maxHeight: 700,
  },
  overviewCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  healthIndicator: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  healthIcon: {
    fontSize: 28,
    fontWeight: '700',
  },
  overviewContent: {
    flex: 1,
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  overviewStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  overviewMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  overviewMetric: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  systemsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  systemCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  systemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  systemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  systemName: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  systemMetrics: {
    gap: 8,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recommendationsCard: {
    borderRadius: 12,
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recommendationIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  recommendationText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
  },
});