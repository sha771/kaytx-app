import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingDown, ArrowDown, ArrowRight, Zap } from 'lucide-react-native';

interface PipelineStage {
  name: string;
  value: number;
  conversionRate: number;
  revenue: number;
}

interface SalesPipelineVisualizationProps {
  stages: PipelineStage[];
}

export default function SalesPipelineVisualization({ stages }: SalesPipelineVisualizationProps) {
  const { theme } = useTheme();

  const calculateDropOff = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return Math.round(((previous - current) / previous) * 100);
  };

  const getStageColor = (index: number) => {
    const colors = ['#3B82F6', '#06B6D4', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899', '#22C55E'];
    return colors[index % colors.length];
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  const formatNumber = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <TrendingDown size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Sales Pipeline Visualization
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.pipelineContainer}>
          {stages.map((stage, index) => {
            const previousStage = stages[index - 1];
            const dropOff = previousStage ? calculateDropOff(stage.value, previousStage.value) : 0;
            const stageColor = getStageColor(index);

            return (
              <View key={stage.name} style={styles.stageColumn}>
                <View style={[styles.stageCard, { borderTopColor: stageColor }]}>
                  <Text style={[styles.stageName, { color: theme.colors.text }]}>
                    {stage.name}
                  </Text>
                  
                  <View style={styles.stageMetrics}>
                    <View style={styles.metric}>
                      <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                        Volume
                      </Text>
                      <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                        {formatNumber(stage.value)}
                      </Text>
                    </View>

                    <View style={styles.metric}>
                      <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                        Conversion
                      </Text>
                      <Text style={[styles.metricValue, { color: stageColor }]}>
                        {stage.conversionRate}%
                      </Text>
                    </View>

                    {stage.revenue > 0 && (
                      <View style={styles.metric}>
                        <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                          Revenue
                        </Text>
                        <Text style={[styles.metricValue, { color: '#10B981' }]}>
                          {formatCurrency(stage.revenue)}
                        </Text>
                      </View>
                    )}
                  </View>

                  {dropOff > 0 && (
                    <View style={styles.dropOffContainer}>
                      <ArrowDown size={12} color="#EF4444" />
                      <Text style={[styles.dropOffText, { color: '#EF4444' }]}>
                        {dropOff}% drop-off
                      </Text>
                    </View>
                  )}
                </View>

                {index < stages.length - 1 && (
                  <View style={styles.arrowContainer}>
                    <ArrowDown size={16} color={theme.colors.textSecondary} />
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
            Total Pipeline Value
          </Text>
          <Text style={[styles.summaryValue, { color: '#10B981' }]}>
            {formatCurrency(stages.reduce((sum, stage) => sum + stage.revenue, 0))}
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
            Overall Conversion Rate
          </Text>
          <Text style={[styles.summaryValue, { color: '#3B82F6' }]}>
            {stages[stages.length - 1].conversionRate}%
          </Text>
        </View>
      </View>

      {/* Conversion Heatmap */}
      <View style={styles.heatmapSection}>
        <View style={styles.heatmapHeader}>
          <Zap size={16} color={theme.colors.primary} />
          <Text style={[styles.heatmapTitle, { color: theme.colors.text }]}>
            Conversion Heatmap
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.heatmapContainer}>
            {stages.map((stage, index) => {
              const heatIntensity = stage.conversionRate / 100;
              const heatColor = heatIntensity >= 0.7 ? '#10B981' : heatIntensity >= 0.5 ? '#3B82F6' : heatIntensity >= 0.3 ? '#F59E0B' : '#EF4444';
              return (
                <View key={stage.name} style={styles.heatmapColumn}>
                  <View style={[styles.heatmapCell, { backgroundColor: heatColor + '20', borderColor: heatColor }]}>
                    <Text style={[styles.heatmapStageName, { color: theme.colors.text }]}>
                      {stage.name}
                    </Text>
                    <Text style={[styles.heatmapConversionRate, { color: heatColor }]}>
                      {stage.conversionRate}%
                    </Text>
                  </View>
                  {index < stages.length - 1 && (
                    <ArrowRight size={16} color={theme.colors.textSecondary} style={styles.heatmapArrow} />
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
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
  pipelineContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingBottom: 16,
  },
  stageColumn: {
    alignItems: 'center',
  },
  stageCard: {
    width: 140,
    borderRadius: 12,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderTopWidth: 3,
  },
  stageName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  stageMetrics: {
    gap: 8,
  },
  metric: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    padding: 8,
  },
  metricLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  dropOffContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 8,
    padding: 4,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 6,
  },
  dropOffText: {
    fontSize: 10,
    fontWeight: '600',
  },
  arrowContainer: {
    paddingVertical: 4,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  heatmapSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  heatmapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  heatmapTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  heatmapContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 8,
  },
  heatmapColumn: {
    alignItems: 'center',
  },
  heatmapCell: {
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    minWidth: 100,
    alignItems: 'center',
  },
  heatmapStageName: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  heatmapConversionRate: {
    fontSize: 14,
    fontWeight: '700',
  },
  heatmapArrow: {
    marginTop: 8,
  }
});