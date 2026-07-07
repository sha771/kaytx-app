import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { ArrowDown, CheckCircle, Clock, AlertCircle, Zap } from 'lucide-react-native';

interface PipelineStep {
  id: string;
  name: string;
  status: 'completed' | 'active' | 'pending' | 'error';
  duration?: string;
  latency?: string;
  description?: string;
}

interface ExecutionPipelineProps {
  steps: PipelineStep[];
  totalLatency: string;
  fillRate: number;
  slippage: number;
}

export default function ExecutionPipeline({ steps, totalLatency, fillRate, slippage }: ExecutionPipelineProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'active': return '#3B82F6';
      case 'pending': return '#6B7280';
      case 'error': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'active': return Zap;
      case 'pending': return Clock;
      case 'error': return AlertCircle;
      default: return Clock;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Zap size={20} color={theme.colors.primary} />
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Execution Pipeline
          </Text>
        </View>
      </View>

      {/* Pipeline Metrics */}
      <View style={styles.metricsRow}>
        <View style={[styles.metricCard, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Total Latency
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {totalLatency}
          </Text>
        </View>
        <View style={[styles.metricCard, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Fill Rate
          </Text>
          <Text style={[styles.metricValue, { color: '#10B981' }]}>
            {fillRate.toFixed(1)}%
          </Text>
        </View>
        <View style={[styles.metricCard, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Slippage
          </Text>
          <Text style={[styles.metricValue, { color: slippage < 0.1 ? '#10B981' : '#F59E0B' }]}>
            {slippage.toFixed(2)}%
          </Text>
        </View>
      </View>

      {/* Pipeline Steps */}
      <View style={styles.pipelineContainer}>
        {steps.map((step, index) => {
          const Icon = getStatusIcon(step.status);
          const color = getStatusColor(step.status);
          const isLast = index === steps.length - 1;

          return (
            <View key={step.id} style={styles.stepContainer}>
              <View style={styles.stepContent}>
                <View style={[styles.stepIcon, { backgroundColor: color + '20' }]}>
                  <Icon size={20} color={color} />
                </View>
                <View style={styles.stepInfo}>
                  <Text style={[styles.stepName, { color: theme.colors.text }]}>
                    {step.name}
                  </Text>
                  <Text style={[styles.stepDescription, { color: theme.colors.textSecondary }]}>
                    {step.description}
                  </Text>
                  <View style={styles.stepMeta}>
                    {step.duration && (
                      <Text style={[styles.stepMetaText, { color: theme.colors.textSecondary }]}>
                        Duration: {step.duration}
                      </Text>
                    )}
                    {step.latency && (
                      <Text style={[styles.stepMetaText, { color: theme.colors.textSecondary }]}>
                        Latency: {step.latency}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
              {!isLast && (
                <ArrowDown size={16} color={theme.colors.border} style={styles.arrow} />
              )}
            </View>
          );
        })}
      </View>

      {/* Success Metrics */}
      <View style={[styles.successSection, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.successTitle, { color: theme.colors.text }]}>
          Today's Performance
        </Text>
        <View style={styles.successRow}>
          <View style={styles.successItem}>
            <Text style={[styles.successValue, { color: '#10B981' }]}>
              2,847
            </Text>
            <Text style={[styles.successLabel, { color: theme.colors.textSecondary }]}>
              Executions
            </Text>
          </View>
          <View style={styles.successItem}>
            <Text style={[styles.successValue, { color: '#10B981' }]}>
              99.2%
            </Text>
            <Text style={[styles.successLabel, { color: theme.colors.textSecondary }]}>
              Success Rate
            </Text>
          </View>
          <View style={styles.successItem}>
            <Text style={[styles.successValue, { color: '#3B82F6' }]}>
              12ms
            </Text>
            <Text style={[styles.successLabel, { color: theme.colors.textSecondary }]}>
              Avg Latency
            </Text>
          </View>
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
    marginBottom: 16,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
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
  pipelineContainer: {
    marginBottom: 16,
  },
  stepContainer: {
    marginBottom: 8,
  },
  stepContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepInfo: {
    flex: 1,
  },
  stepName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 12,
    marginBottom: 4,
  },
  stepMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  stepMetaText: {
    fontSize: 10,
  },
  arrow: {
    marginLeft: 28,
    marginVertical: 4,
  },
  successSection: {
    padding: 16,
    borderRadius: 12,
  },
  successTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  successRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  successItem: {
    alignItems: 'center',
  },
  successValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  successLabel: {
    fontSize: 11,
  },
});
