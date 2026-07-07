import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface Experiment {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'draft';
  variantA: string;
  variantB: string;
  conversionRateA: number;
  conversionRateB: number;
  statisticalConfidence: number;
  lift: number;
  roi: string;
}

interface ExperimentationLabProps {
  experiments: Experiment[];
}

export default function ExperimentationLab({ experiments }: ExperimentationLabProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return '#22C55E';
      case 'completed': return '#3B82F6';
      case 'draft': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getWinningVariant = (experiment: Experiment) => {
    if (experiment.conversionRateB > experiment.conversionRateA) {
      return 'B';
    } else if (experiment.conversionRateA > experiment.conversionRateB) {
      return 'A';
    }
    return 'Tie';
  };

  const getLiftColor = (lift: number) => {
    if (lift > 0) return '#22C55E';
    if (lift < 0) return '#EF4444';
    return '#6B7280';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Experimentation & A/B Testing Lab
      </Text>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Lab Overview */}
        <View style={[styles.overviewCard, { backgroundColor: theme.colors.background }]}>
          <View style={styles.overviewMetric}>
            <Text style={[styles.overviewLabel, { color: theme.colors.textSecondary }]}>
              Active Experiments
            </Text>
            <Text style={[styles.overviewValue, { color: '#22C55E' }]}>
              {experiments.filter(e => e.status === 'running').length}
            </Text>
          </View>
          <View style={styles.overviewMetric}>
            <Text style={[styles.overviewLabel, { color: theme.colors.textSecondary }]}>
              Completed
            </Text>
            <Text style={[styles.overviewValue, { color: '#3B82F6' }]}>
              {experiments.filter(e => e.status === 'completed').length}
            </Text>
          </View>
          <View style={styles.overviewMetric}>
            <Text style={[styles.overviewLabel, { color: theme.colors.textSecondary }]}>
              Avg Conversion Lift
            </Text>
            <Text style={[styles.overviewValue, { color: '#8B5CF6' }]}>
              +{(experiments.reduce((acc, e) => acc + e.lift, 0) / experiments.length).toFixed(1)}%
            </Text>
          </View>
          <View style={styles.overviewMetric}>
            <Text style={[styles.overviewLabel, { color: theme.colors.textSecondary }]}>
              Total ROI
            </Text>
            <Text style={[styles.overviewValue, { color: '#10B981' }]}>
              $2.4M
            </Text>
          </View>
        </View>

        {/* Experiments List */}
        <View style={styles.experimentsSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Active Experiments
          </Text>
          {experiments.filter(e => e.status === 'running').map((experiment) => (
            <View 
              key={experiment.id}
              style={[styles.experimentCard, { 
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border 
              }]}
            >
              <View style={styles.experimentHeader}>
                <Text style={[styles.experimentName, { color: theme.colors.text }]}>
                  {experiment.name}
                </Text>
                <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(experiment.status)}20` }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(experiment.status) }]}>
                    {experiment.status}
                  </Text>
                </View>
              </View>

              {/* Variant Comparison */}
              <View style={styles.variantComparison}>
                <View style={styles.variant}>
                  <Text style={[styles.variantLabel, { color: theme.colors.textSecondary }]}>
                    Variant A
                  </Text>
                  <Text style={[styles.variantName, { color: theme.colors.text }]}>
                    {experiment.variantA}
                  </Text>
                  <Text style={[styles.variantRate, { color: theme.colors.text }]}>
                    {experiment.conversionRateA}%
                  </Text>
                </View>
                <View style={styles.vsBadge}>
                  <Text style={[styles.vsText, { color: theme.colors.textSecondary }]}>VS</Text>
                </View>
                <View style={styles.variant}>
                  <Text style={[styles.variantLabel, { color: theme.colors.textSecondary }]}>
                    Variant B
                  </Text>
                  <Text style={[styles.variantName, { color: theme.colors.text }]}>
                    {experiment.variantB}
                  </Text>
                  <Text style={[styles.variantRate, { color: getWinningVariant(experiment) === 'B' ? '#22C55E' : theme.colors.text }]}>
                    {experiment.conversionRateB}%
                  </Text>
                </View>
              </View>

              {/* Experiment Metrics */}
              <View style={styles.experimentMetrics}>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Winner
                  </Text>
                  <Text style={[styles.metricValue, { color: '#8B5CF6' }]}>
                    Variant {getWinningVariant(experiment)}
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Lift
                  </Text>
                  <Text style={[styles.metricValue, { color: getLiftColor(experiment.lift) }]}>
                    {experiment.lift > 0 ? '+' : ''}{experiment.lift}%
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Confidence
                  </Text>
                  <Text style={[styles.metricValue, { color: experiment.statisticalConfidence > 95 ? '#22C55E' : '#F59E0B' }]}>
                    {experiment.statisticalConfidence}%
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    ROI
                  </Text>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>
                    {experiment.roi}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Completed Experiments */}
        <View style={styles.experimentsSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Completed Experiments
          </Text>
          {experiments.filter(e => e.status === 'completed').map((experiment) => (
            <View 
              key={experiment.id}
              style={[styles.experimentCard, { 
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
                opacity: 0.8
              }]}
            >
              <View style={styles.experimentHeader}>
                <Text style={[styles.experimentName, { color: theme.colors.text }]}>
                  {experiment.name}
                </Text>
                <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(experiment.status)}20` }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(experiment.status) }]}>
                    {experiment.status}
                  </Text>
                </View>
              </View>

              <View style={styles.experimentMetrics}>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Final Lift
                  </Text>
                  <Text style={[styles.metricValue, { color: getLiftColor(experiment.lift) }]}>
                    {experiment.lift > 0 ? '+' : ''}{experiment.lift}%
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    ROI
                  </Text>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>
                    {experiment.roi}
                  </Text>
                </View>
              </View>
            </View>
          ))}
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
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  overviewMetric: {
    width: '50%',
    marginBottom: 12,
  },
  overviewLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  overviewValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  experimentsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  experimentCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  experimentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  experimentName: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  variantComparison: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  variant: {
    flex: 1,
    alignItems: 'center',
  },
  variantLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  variantName: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  variantRate: {
    fontSize: 18,
    fontWeight: '700',
  },
  vsBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    marginHorizontal: 12,
  },
  vsText: {
    fontSize: 10,
    fontWeight: '700',
  },
  experimentMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metricItem: {
    width: '25%',
    paddingRight: 8,
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
});
