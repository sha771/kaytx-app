import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface PerformanceMetric {
  label: string;
  value: string;
  status: 'healthy' | 'warning' | 'critical';
  threshold?: string;
}

interface AIPerformanceObservabilityProps {
  metrics: PerformanceMetric[];
  modelLatency: number;
  tokenUsage: number;
  costPerConversation: number;
}

export default function AIPerformanceObservability({ 
  metrics, 
  modelLatency,
  tokenUsage,
  costPerConversation 
}: AIPerformanceObservabilityProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'healthy': return '✓';
      case 'warning': return '⚠';
      case 'critical': return '✗';
      default: return '';
    }
  };

  const MetricCard = ({ metric }: { metric: PerformanceMetric }) => (
    <View style={[styles.metricCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: `${getStatusColor(metric.status)}30`, borderWidth: 1 }]}>
      <View style={styles.metricHeader}>
        <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
          {metric.label}
        </Text>
        <View style={[
          styles.statusBadge, 
          { backgroundColor: `${getStatusColor(metric.status)}20`, borderColor: `${getStatusColor(metric.status)}40`, borderWidth: 1 }
        ]}>
          <Text style={[styles.statusBadgeText, { color: getStatusColor(metric.status) }]}>
            {getStatusIndicator(metric.status)}
          </Text>
        </View>
      </View>
      <Text style={[styles.metricValue, { color: getStatusColor(metric.status) }]}>
        {metric.value}
      </Text>
      {metric.threshold && (
        <Text style={[styles.metricThreshold, { color: 'rgba(255, 255, 255, 0.5)' }]}>
          Target: {metric.threshold}
        </Text>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
      <Text style={[styles.title, { color: '#10B981' }]}>
        AI Performance Observability
      </Text>

      {/* AI Quality Metrics */}
      <View style={styles.metricsGrid}>
        {metrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </View>

      {/* Model Performance */}
      <View style={[styles.performanceSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Model Performance
        </Text>
        <View style={styles.performanceRow}>
          <View style={styles.performanceItem}>
            <Text style={[styles.performanceLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
              Model Latency
            </Text>
            <Text style={[styles.performanceValue, { color: '#FFFFFF' }]}>
              {modelLatency}ms
            </Text>
            <View style={[styles.performanceBar, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
              <View 
                style={[
                  styles.performanceFill, 
                  { backgroundColor: modelLatency < 1000 ? '#10B981' : '#F59E0B', width: `${Math.min(modelLatency / 2000 * 100, 100)}%` }
                ]} 
              />
            </View>
          </View>
          <View style={styles.performanceItem}>
            <Text style={[styles.performanceLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
              Token Usage
            </Text>
            <Text style={[styles.performanceValue, { color: '#FFFFFF' }]}>
              {tokenUsage.toLocaleString()}
            </Text>
            <View style={[styles.performanceBar, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
              <View 
                style={[
                  styles.performanceFill, 
                  { backgroundColor: '#3B82F6', width: '65%' }
                ]} 
              />
            </View>
          </View>
        </View>
      </View>

      {/* Cost Analysis */}
      <View style={[styles.costSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Cost Analysis
        </Text>
        <View style={styles.costCard}>
          <Text style={[styles.costValue, { color: '#FFFFFF' }]}>
            ${costPerConversation.toFixed(3)}
          </Text>
          <Text style={[styles.costLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
            Cost per Conversation
          </Text>
          <View style={styles.costBreakdown}>
            <View style={styles.costItem}>
              <View style={[styles.costDot, { backgroundColor: '#10B981' }]} />
              <Text style={[styles.costItemText, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                Inference: 78%
              </Text>
            </View>
            <View style={styles.costItem}>
              <View style={[styles.costDot, { backgroundColor: '#3B82F6' }]} />
              <Text style={[styles.costItemText, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                Embedding: 15%
              </Text>
            </View>
            <View style={styles.costItem}>
              <View style={[styles.costDot, { backgroundColor: '#8B5CF6' }]} />
              <Text style={[styles.costItemText, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                Storage: 7%
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Health Indicators */}
      <View style={[styles.healthSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          System Health
        </Text>
        <View style={styles.healthGrid}>
          <View style={styles.healthItem}>
            <View style={[styles.healthIndicator, { backgroundColor: '#10B981' }]} />
            <Text style={[styles.healthLabel, { color: '#FFFFFF' }]}>
              API Gateway
            </Text>
            <Text style={[styles.healthStatus, { color: '#10B981' }]}>
              Healthy
            </Text>
          </View>
          <View style={styles.healthItem}>
            <View style={[styles.healthIndicator, { backgroundColor: '#10B981' }]} />
            <Text style={[styles.healthLabel, { color: '#FFFFFF' }]}>
              Vector DB
            </Text>
            <Text style={[styles.healthStatus, { color: '#10B981' }]}>
              Healthy
            </Text>
          </View>
          <View style={styles.healthItem}>
            <View style={[styles.healthIndicator, { backgroundColor: '#F59E0B' }]} />
            <Text style={[styles.healthLabel, { color: '#FFFFFF' }]}>
              Model Cache
            </Text>
            <Text style={[styles.healthStatus, { color: '#F59E0B' }]}>
              Warning
            </Text>
          </View>
          <View style={styles.healthItem}>
            <View style={[styles.healthIndicator, { backgroundColor: '#10B981' }]} />
            <Text style={[styles.healthLabel, { color: '#FFFFFF' }]}>
              Queue System
            </Text>
            <Text style={[styles.healthStatus, { color: '#10B981' }]}>
              Healthy
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginBottom: 12,
  },
  metricCard: {
    width: '50%',
    paddingHorizontal: 6,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricThreshold: {
    fontSize: 10,
  },
  performanceSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  performanceRow: {
    flexDirection: 'row',
    gap: 12,
  },
  performanceItem: {
    flex: 1,
  },
  performanceLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  performanceValue: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  performanceBar: {
    height: 8,
    borderRadius: 4,
  },
  performanceFill: {
    height: '100%',
    borderRadius: 4,
  },
  costSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  costCard: {
    alignItems: 'center',
    padding: 16,
  },
  costValue: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  costLabel: {
    fontSize: 12,
    marginBottom: 12,
  },
  costBreakdown: {
    flexDirection: 'row',
    gap: 16,
  },
  costItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  costDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  costItemText: {
    fontSize: 10,
  },
  healthSection: {
    padding: 16,
    borderRadius: 12,
  },
  healthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  healthItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(11, 15, 20, 0.4)',
  },
  healthIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  healthLabel: {
    flex: 1,
    fontSize: 11,
  },
  healthStatus: {
    fontSize: 10,
    fontWeight: '600',
  },
});