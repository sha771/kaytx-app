import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface SatisfactionMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface TrendData {
  period: string;
  csat: number;
  nps: number;
  ces: number;
}

interface CustomerSatisfactionAnalyticsProps {
  metrics: SatisfactionMetric[];
  trendData: TrendData[];
}

export default function CustomerSatisfactionAnalytics({ metrics, trendData }: CustomerSatisfactionAnalyticsProps) {
  const { theme } = useTheme();

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      case 'stable': return '→';
      default: return '';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return '#10B981';
      case 'down': return '#EF4444';
      case 'stable': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
      <Text style={[styles.title, { color: '#10B981' }]}>
        Customer Satisfaction Analytics
      </Text>

      {/* KPI Cards */}
      <View style={styles.metricsGrid}>
        {metrics.map((metric, index) => (
          <View key={index} style={[styles.metricCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: `${metric.color}30`, borderWidth: 1 }]}>
            <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
              {metric.label}
            </Text>
            <Text style={[styles.metricValue, { color: metric.color }]}>
              {metric.value}
            </Text>
            <View style={styles.metricChange}>
              <Text style={[styles.changeIcon, { color: getTrendColor(metric.trend) }]}>
                {getTrendIcon(metric.trend)}
              </Text>
              <Text style={[styles.changeText, { color: getTrendColor(metric.trend) }]}>
                {metric.change}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Trend Chart */}
      <View style={[styles.trendSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Satisfaction Trends (Last 6 Months)
        </Text>
        <View style={styles.chartLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
            <Text style={[styles.legendText, { color: 'rgba(255, 255, 255, 0.5)' }]}>CSAT</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} />
            <Text style={[styles.legendText, { color: 'rgba(255, 255, 255, 0.5)' }]}>NPS</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#8B5CF6' }]} />
            <Text style={[styles.legendText, { color: 'rgba(255, 255, 255, 0.5)' }]}>CES</Text>
          </View>
        </View>
        <View style={styles.trendChart}>
          {trendData.map((item, index) => (
            <View key={index} style={styles.trendColumn}>
              <View style={styles.barsContainer}>
                <View 
                  style={[
                    styles.trendBar, 
                    { 
                      backgroundColor: '#10B981',
                      height: `${(item.csat / 5) * 100}%`
                    }
                  ]} 
                />
                <View 
                  style={[
                    styles.trendBar, 
                    { 
                      backgroundColor: '#3B82F6',
                      height: `${(item.nps / 10) * 100}%`
                    }
                  ]} 
                />
                <View 
                  style={[
                    styles.trendBar, 
                    { 
                      backgroundColor: '#8B5CF6',
                      height: `${(item.ces / 5) * 100}%`
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.trendLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                {item.period}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Resolution Quality */}
      <View style={[styles.qualitySection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Resolution Quality Breakdown
        </Text>
        <View style={styles.qualityBars}>
          <View style={styles.qualityBar}>
            <Text style={[styles.qualityLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
              First Contact Resolution
            </Text>
            <View style={[styles.qualityProgress, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
              <View style={[styles.qualityFill, { backgroundColor: '#10B981', width: '78%' }]} />
            </View>
            <Text style={[styles.qualityPercent, { color: '#FFFFFF' }]}>78%</Text>
          </View>
          <View style={styles.qualityBar}>
            <Text style={[styles.qualityLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
              Customer Effort Score
            </Text>
            <View style={[styles.qualityProgress, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
              <View style={[styles.qualityFill, { backgroundColor: '#3B82F6', width: '85%' }]} />
            </View>
            <Text style={[styles.qualityPercent, { color: '#FFFFFF' }]}>85%</Text>
          </View>
          <View style={styles.qualityBar}>
            <Text style={[styles.qualityLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
              Resolution Accuracy
            </Text>
            <View style={[styles.qualityProgress, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
              <View style={[styles.qualityFill, { backgroundColor: '#8B5CF6', width: '92%' }]} />
            </View>
            <Text style={[styles.qualityPercent, { color: '#FFFFFF' }]}>92%</Text>
          </View>
        </View>
      </View>

      {/* Customer Retention */}
      <View style={[styles.retentionSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Customer Retention
        </Text>
        <View style={styles.retentionCard}>
          <Text style={[styles.retentionValue, { color: '#10B981' }]}>
            94.2%
          </Text>
          <Text style={[styles.retentionLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
            Retention Rate
          </Text>
          <Text style={[styles.retentionChange, { color: '#10B981' }]}>
            +2.3% vs last quarter
          </Text>
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
  metricLabel: {
    fontSize: 11,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  changeText: {
    fontSize: 11,
    fontWeight: '500',
  },
  trendSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  chartLegend: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 11,
  },
  trendChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 140,
  },
  trendColumn: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 100,
    gap: 2,
  },
  trendBar: {
    width: 10,
    borderRadius: 3,
  },
  trendLabel: {
    fontSize: 10,
    marginTop: 8,
  },
  qualitySection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  qualityBars: {
    gap: 12,
  },
  qualityBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qualityLabel: {
    width: 140,
    fontSize: 11,
  },
  qualityProgress: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 12,
  },
  qualityFill: {
    height: '100%',
    borderRadius: 5,
  },
  qualityPercent: {
    fontSize: 12,
    fontWeight: '600',
    width: 40,
    textAlign: 'right',
  },
  retentionSection: {
    padding: 16,
    borderRadius: 12,
  },
  retentionCard: {
    alignItems: 'center',
    padding: 16,
  },
  retentionValue: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 4,
  },
  retentionLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  retentionChange: {
    fontSize: 11,
    fontWeight: '500',
  },
});