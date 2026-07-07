import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingDown, ArrowDown } from 'lucide-react-native';
import { SalesPipelineConfig } from './types';

interface SalesPipelineProps {
  config: SalesPipelineConfig;
}

export default function SalesPipeline({ config }: SalesPipelineProps) {
  const { theme } = useTheme();

  const maxStageValue = Math.max(...config.stages.map(s => s.value));

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Sales Pipeline
        </Text>
        <View style={styles.headerStats}>
          <View style={[styles.statBadge, { backgroundColor: '#10B981' + '20' }]}>
            <Text style={[styles.statValue, { color: '#10B981' }]}>
              ${(config.totalPipeline / 1000000).toFixed(1)}M
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Total Pipeline
            </Text>
          </View>
          <View style={[styles.statBadge, { backgroundColor: '#3B82F6' + '20' }]}>
            <Text style={[styles.statValue, { color: '#3B82F6' }]}>
              {config.conversionRate.toFixed(1)}%
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Conversion Rate
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.pipelineContainer}>
        {config.stages.map((stage, index) => {
          const width = (stage.value / maxStageValue) * 100;
          const isLast = index === config.stages.length - 1;
          
          return (
            <View key={index} style={styles.stageContainer}>
              <View style={styles.stageHeader}>
                <Text style={[styles.stageName, { color: theme.colors.text }]}>
                  {stage.name}
                </Text>
                <Text style={[styles.stageValue, { color: theme.colors.text }]}>
                  {stage.value.toLocaleString()}
                </Text>
              </View>
              
              <View style={[styles.stageBar, { backgroundColor: theme.colors.background }]}>
                <View 
                  style={[
                    styles.stageFill, 
                    { 
                      backgroundColor: index === config.stages.length - 1 ? '#10B981' : '#3B82F6',
                      width: `${width}%`
                    }
                  ]} 
                />
              </View>
              
              <View style={styles.stageMetrics}>
                <View style={styles.metric}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Conversion
                  </Text>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>
                    {stage.conversionRate.toFixed(1)}%
                  </Text>
                </View>
                <View style={styles.metric}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Revenue
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    ${(stage.revenue / 1000).toFixed(0)}K
                  </Text>
                </View>
              </View>

              {!isLast && (
                <View style={styles.arrowContainer}>
                  <ArrowDown size={16} color={theme.colors.border} />
                </View>
              )}
            </View>
          );
        })}
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
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  headerStats: {
    flexDirection: 'row',
    gap: 12,
  },
  statBadge: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
  },
  pipelineContainer: {
    gap: 16,
  },
  stageContainer: {
    gap: 8,
  },
  stageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stageName: {
    fontSize: 13,
    fontWeight: '500',
  },
  stageValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  stageBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  stageFill: {
    height: '100%',
    borderRadius: 4,
  },
  stageMetrics: {
    flexDirection: 'row',
    gap: 24,
  },
  metric: {
    gap: 2,
  },
  metricLabel: {
    fontSize: 10,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  arrowContainer: {
    alignItems: 'center',
    marginVertical: 4,
  },
});
