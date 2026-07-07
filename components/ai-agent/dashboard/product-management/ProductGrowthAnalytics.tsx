import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface GrowthMetric {
  id: string;
  name: string;
  value: number;
  change: string;
  trend: 'up' | 'down';
  period: string;
}

interface CohortData {
  cohort: string;
  retention: number[];
  size: number;
}

interface ProductGrowthAnalyticsProps {
  growthMetrics: GrowthMetric[];
  cohortData: CohortData[];
}

export default function ProductGrowthAnalytics({ growthMetrics, cohortData }: ProductGrowthAnalyticsProps) {
  const { theme } = useTheme();

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return '#22C55E';
      case 'down': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      default: return '→';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Product Growth Analytics
      </Text>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Growth Metrics Grid */}
        <View style={styles.metricsGrid}>
          {growthMetrics.map((metric) => (
            <View 
              key={metric.id}
              style={[styles.metricCard, { backgroundColor: theme.colors.background }]}
            >
              <Text style={[styles.metricName, { color: theme.colors.textSecondary }]}>
                {metric.name}
              </Text>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                {metric.value.toLocaleString()}
              </Text>
              <View style={styles.metricChange}>
                <Text style={[styles.trendIcon, { color: getTrendColor(metric.trend) }]}>
                  {getTrendIcon(metric.trend)}
                </Text>
                <Text style={[styles.changeText, { color: getTrendColor(metric.trend) }]}>
                  {metric.change}
                </Text>
              </View>
              <Text style={[styles.metricPeriod, { color: theme.colors.textSecondary }]}>
                {metric.period}
              </Text>
            </View>
          ))}
        </View>

        {/* Growth Funnel */}
        <View style={[styles.funnelCard, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            Growth Funnel
          </Text>
          <View style={styles.funnelStages}>
            <View style={styles.funnelStage}>
              <View style={styles.stageHeader}>
                <Text style={[styles.stageName, { color: theme.colors.text }]}>
                  Awareness
                </Text>
                <Text style={[styles.stageValue, { color: theme.colors.text }]}>
                  2.4M
                </Text>
              </View>
              <View style={styles.funnelBar}>
                <View style={[styles.funnelFill, { width: '100%', backgroundColor: '#8B5CF6' }]} />
              </View>
              <Text style={[styles.stageRate, { color: theme.colors.textSecondary }]}>
                100%
              </Text>
            </View>

            <View style={styles.funnelStage}>
              <View style={styles.stageHeader}>
                <Text style={[styles.stageName, { color: theme.colors.text }]}>
                  Acquisition
                </Text>
                <Text style={[styles.stageValue, { color: theme.colors.text }]}>
                  840K
                </Text>
              </View>
              <View style={styles.funnelBar}>
                <View style={[styles.funnelFill, { width: '35%', backgroundColor: '#3B82F6' }]} />
              </View>
              <Text style={[styles.stageRate, { color: theme.colors.textSecondary }]}>
                35% conversion
              </Text>
            </View>

            <View style={styles.funnelStage}>
              <View style={styles.stageHeader}>
                <Text style={[styles.stageName, { color: theme.colors.text }]}>
                  Activation
                </Text>
                <Text style={[styles.stageValue, { color: theme.colors.text }]}>
                  504K
                </Text>
              </View>
              <View style={styles.funnelBar}>
                <View style={[styles.funnelFill, { width: '21%', backgroundColor: '#06B6D4' }]} />
              </View>
              <Text style={[styles.stageRate, { color: theme.colors.textSecondary }]}>
                60% conversion
              </Text>
            </View>

            <View style={styles.funnelStage}>
              <View style={styles.stageHeader}>
                <Text style={[styles.stageName, { color: theme.colors.text }]}>
                  Revenue
                </Text>
                <Text style={[styles.stageValue, { color: theme.colors.text }]}>
                  168K
                </Text>
              </View>
              <View style={styles.funnelBar}>
                <View style={[styles.funnelFill, { width: '7%', backgroundColor: '#10B981' }]} />
              </View>
              <Text style={[styles.stageRate, { color: theme.colors.textSecondary }]}>
                33% conversion
              </Text>
            </View>

            <View style={styles.funnelStage}>
              <View style={styles.stageHeader}>
                <Text style={[styles.stageName, { color: theme.colors.text }]}>
                  Referral
                </Text>
                <Text style={[styles.stageValue, { color: theme.colors.text }]}>
                  42K
                </Text>
              </View>
              <View style={styles.funnelBar}>
                <View style={[styles.funnelFill, { width: '1.8%', backgroundColor: '#F59E0B' }]} />
              </View>
              <Text style={[styles.stageRate, { color: theme.colors.textSecondary }]}>
                25% conversion
              </Text>
            </View>
          </View>
        </View>

        {/* Cohort Retention Analysis */}
        <View style={[styles.cohortCard, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            Cohort Retention Analysis
          </Text>
          <View style={styles.cohortTable}>
            <View style={styles.cohortHeader}>
              <Text style={[styles.cohortHeaderCell, { color: theme.colors.textSecondary }]}>
                Cohort
              </Text>
              <Text style={[styles.cohortHeaderCell, { color: theme.colors.textSecondary }]}>
                Size
              </Text>
              <Text style={[styles.cohortHeaderCell, { color: theme.colors.textSecondary }]}>
                D1
              </Text>
              <Text style={[styles.cohortHeaderCell, { color: theme.colors.textSecondary }]}>
                D7
              </Text>
              <Text style={[styles.cohortHeaderCell, { color: theme.colors.textSecondary }]}>
                D30
              </Text>
              <Text style={[styles.cohortHeaderCell, { color: theme.colors.textSecondary }]}>
                D90
              </Text>
            </View>
            {cohortData.map((cohort) => (
              <View key={cohort.cohort} style={styles.cohortRow}>
                <Text style={[styles.cohortCell, { color: theme.colors.text }]}>
                  {cohort.cohort}
                </Text>
                <Text style={[styles.cohortCell, { color: theme.colors.textSecondary }]}>
                  {cohort.size.toLocaleString()}
                </Text>
                {cohort.retention.map((rate, index) => (
                  <View key={index} style={styles.retentionCell}>
                    <View 
                      style={[
                        styles.retentionBar, 
                        { 
                          width: `${rate}%`,
                          backgroundColor: rate > 80 ? '#22C55E' : rate > 50 ? '#F59E0B' : '#EF4444'
                        }
                      ]} 
                    />
                    <Text style={[styles.retentionText, { color: theme.colors.text }]}>
                      {rate}%
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>

        {/* Growth Drivers */}
        <View style={[styles.driversCard, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            Growth Drivers
          </Text>
          <View style={styles.driverItem}>
            <View style={styles.driverHeader}>
              <Text style={[styles.driverName, { color: theme.colors.text }]}>
                Product-Led Growth
              </Text>
              <Text style={[styles.driverImpact, { color: '#22C55E' }]}>
                +42%
              </Text>
            </View>
            <View style={styles.driverBar}>
              <View style={[styles.driverFill, { width: '42%', backgroundColor: '#22C55E' }]} />
            </View>
          </View>
          <View style={styles.driverItem}>
            <View style={styles.driverHeader}>
              <Text style={[styles.driverName, { color: theme.colors.text }]}>
                Viral Loops
              </Text>
              <Text style={[styles.driverImpact, { color: '#3B82F6' }]}>
                +28%
              </Text>
            </View>
            <View style={styles.driverBar}>
              <View style={[styles.driverFill, { width: '28%', backgroundColor: '#3B82F6' }]} />
            </View>
          </View>
          <View style={styles.driverItem}>
            <View style={styles.driverHeader}>
              <Text style={[styles.driverName, { color: theme.colors.text }]}>
                Paid Acquisition
              </Text>
              <Text style={[styles.driverImpact, { color: '#8B5CF6' }]}>
                +18%
              </Text>
            </View>
            <View style={styles.driverBar}>
              <View style={[styles.driverFill, { width: '18%', backgroundColor: '#8B5CF6' }]} />
            </View>
          </View>
          <View style={styles.driverItem}>
            <View style={styles.driverHeader}>
              <Text style={[styles.driverName, { color: theme.colors.text }]}>
                Content Marketing
              </Text>
              <Text style={[styles.driverImpact, { color: '#F59E0B' }]}>
                +12%
              </Text>
            </View>
            <View style={styles.driverBar}>
              <View style={[styles.driverFill, { width: '12%', backgroundColor: '#F59E0B' }]} />
            </View>
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
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginBottom: 16,
  },
  metricCard: {
    width: '31%',
    borderRadius: 12,
    padding: 16,
    margin: 6,
  },
  metricName: {
    fontSize: 11,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  trendIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricPeriod: {
    fontSize: 10,
  },
  funnelCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  funnelStages: {
    marginBottom: 8,
  },
  funnelStage: {
    marginBottom: 16,
  },
  stageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  stageName: {
    fontSize: 14,
    fontWeight: '600',
  },
  stageValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  funnelBar: {
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    marginBottom: 4,
    overflow: 'hidden',
  },
  funnelFill: {
    height: '100%',
    borderRadius: 4,
  },
  stageRate: {
    fontSize: 11,
  },
  cohortCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cohortTable: {
    marginTop: 8,
  },
  cohortHeader: {
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  cohortHeaderCell: {
    flex: 1,
    fontSize: 11,
    fontWeight: '600',
  },
  cohortRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  cohortCell: {
    flex: 1,
    fontSize: 12,
  },
  retentionCell: {
    flex: 1,
    alignItems: 'center',
  },
  retentionBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 4,
  },
  retentionText: {
    fontSize: 11,
    fontWeight: '600',
  },
  driversCard: {
    borderRadius: 12,
    padding: 16,
  },
  driverItem: {
    marginBottom: 16,
  },
  driverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  driverName: {
    fontSize: 14,
    fontWeight: '600',
  },
  driverImpact: {
    fontSize: 14,
    fontWeight: '700',
  },
  driverBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
  },
  driverFill: {
    height: '100%',
    borderRadius: 4,
  },
});
