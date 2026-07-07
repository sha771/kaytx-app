import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface UtilizationBreakdown {
  billable: number;
  nonBillable: number;
  unaccounted: number;
}

interface TimeBillingIntelligenceProps {
  data: {
    billableHours: string;
    nonBillableTime: string;
    timeLeakage: string;
    billingAccuracy: string;
    revenueLeakageRisk: string;
    utilizationBreakdown: UtilizationBreakdown;
  };
}

export default function TimeBillingIntelligence({ data }: TimeBillingIntelligenceProps) {
  const { theme } = useTheme();

  const getBreakdownColor = (type: string) => {
    switch (type) {
      case 'billable': return '#10B981';
      case 'nonBillable': return '#F59E0B';
      case 'unaccounted': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
      <Text style={[styles.title, { color: '#10B981' }]}>
        Time & Billing Intelligence
      </Text>

      {/* Key Metrics */}
      <View style={styles.metricsGrid}>
        <View style={[styles.metricCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
          <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Billable Hours</Text>
          <Text style={[styles.metricValue, { color: '#10B981' }]}>{data.billableHours}</Text>
          <Text style={[styles.metricSubtitle, { color: 'rgba(255, 255, 255, 0.4)' }]}>Year to date</Text>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(245, 158, 11, 0.2)', borderWidth: 1 }]}>
          <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Non-Billable Time</Text>
          <Text style={[styles.metricValue, { color: '#F59E0B' }]}>{data.nonBillableTime}</Text>
          <Text style={[styles.metricSubtitle, { color: 'rgba(255, 255, 255, 0.4)' }]}>Target: <15%</Text>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(239, 68, 68, 0.2)', borderWidth: 1 }]}>
          <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Time Leakage</Text>
          <Text style={[styles.metricValue, { color: '#EF4444' }]}>{data.timeLeakage}</Text>
          <Text style={[styles.metricSubtitle, { color: 'rgba(255, 255, 255, 0.4)' }]}>Untracked time</Text>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
          <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Billing Accuracy</Text>
          <Text style={[styles.metricValue, { color: '#10B981' }]}>{data.billingAccuracy}</Text>
          <Text style={[styles.metricSubtitle, { color: 'rgba(255, 255, 255, 0.4)' }]}>Invoice precision</Text>
        </View>
      </View>

      {/* Revenue Leakage Risk */}
      <View style={[styles.leakageSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(239, 68, 68, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Revenue Leakage Risk
        </Text>
        <View style={styles.leakageContent}>
          <Text style={[styles.leakageValue, { color: '#EF4444' }]}>{data.revenueLeakageRisk}</Text>
          <Text style={[styles.leakageDescription, { color: 'rgba(255, 255, 255, 0.6)' }]}>
            Potential revenue not captured due to time tracking gaps
          </Text>
        </View>
        <View style={styles.leakageBreakdown}>
          <View style={styles.leakageItem}>
            <View style={[styles.leakageDot, { backgroundColor: '#F59E0B' }]} />
            <Text style={[styles.leakageItemText, { color: 'rgba(255, 255, 255, 0.8)' }]}>Under-billing: $520K</Text>
          </View>
          <View style={styles.leakageItem}>
            <View style={[styles.leakageDot, { backgroundColor: '#EF4444' }]} />
            <Text style={[styles.leakageItemText, { color: 'rgba(255, 255, 255, 0.8)' }]}>Unbilled hours: $320K</Text>
          </View>
        </View>
      </View>

      {/* Utilization Breakdown */}
      <View style={[styles.utilizationSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Utilization Breakdown
        </Text>
        <View style={styles.utilizationChart}>
          <View style={styles.utilizationBar}>
            <View style={[styles.utilizationSegment, { backgroundColor: '#10B981', width: `${data.utilizationBreakdown.billable}%` }]} />
            <View style={[styles.utilizationSegment, { backgroundColor: '#F59E0B', width: `${data.utilizationBreakdown.nonBillable}%` }]} />
            <View style={[styles.utilizationSegment, { backgroundColor: '#EF4444', width: `${data.utilizationBreakdown.unaccounted}%` }]} />
          </View>
          <View style={styles.utilizationLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
              <Text style={[styles.legendText, { color: 'rgba(255, 255, 255, 0.8)' }]}>Billable {data.utilizationBreakdown.billable}%</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
              <Text style={[styles.legendText, { color: 'rgba(255, 255, 255, 0.8)' }]}>Non-Billable {data.utilizationBreakdown.nonBillable}%</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
              <Text style={[styles.legendText, { color: 'rgba(255, 255, 255, 0.8)' }]}>Unaccounted {data.utilizationBreakdown.unaccounted}%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Time Tracking Funnel */}
      <View style={[styles.funnelSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Time Tracking Funnel
        </Text>
        <View style={styles.funnelContainer}>
          <View style={styles.funnelStep}>
            <View style={styles.funnelLeft}>
              <Text style={[styles.funnelLabel, { color: 'rgba(255, 255, 255, 0.8)' }]}>Hours Worked</Text>
              <Text style={[styles.funnelValue, { color: '#FFFFFF' }]}>2.4M</Text>
            </View>
            <View style={[styles.funnelBar, { width: '100%', backgroundColor: 'rgba(16, 185, 129, 0.3)' }]}>
              <View style={[styles.funnelBarFill, { width: '100%', backgroundColor: '#10B981' }]} />
            </View>
          </View>

          <View style={styles.funnelStep}>
            <View style={styles.funnelLeft}>
              <Text style={[styles.funnelLabel, { color: 'rgba(255, 255, 255, 0.8)' }]}>Time Logged</Text>
              <Text style={[styles.funnelValue, { color: '#06B6D4' }]}>2.2M</Text>
            </View>
            <View style={[styles.funnelBar, { width: '92%', backgroundColor: 'rgba(6, 182, 212, 0.3)' }]}>
              <View style={[styles.funnelBarFill, { width: '92%', backgroundColor: '#06B6D4' }]} />
            </View>
          </View>

          <View style={styles.funnelStep}>
            <View style={styles.funnelLeft}>
              <Text style={[styles.funnelLabel, { color: 'rgba(255, 255, 255, 0.8)' }]}>Approved</Text>
              <Text style={[styles.funnelValue, { color: '#8B5CF6' }]}>2.1M</Text>
            </View>
            <View style={[styles.funnelBar, { width: '88%', backgroundColor: 'rgba(139, 92, 246, 0.3)' }]}>
              <View style={[styles.funnelBarFill, { width: '88%', backgroundColor: '#8B5CF6' }]} />
            </View>
          </View>

          <View style={styles.funnelStep}>
            <View style={styles.funnelLeft}>
              <Text style={[styles.funnelLabel, { color: 'rgba(255, 255, 255, 0.8)' }]}>Billed</Text>
              <Text style={[styles.funnelValue, { color: '#10B981' }]}>1.2M</Text>
            </View>
            <View style={[styles.funnelBar, { width: '50%', backgroundColor: 'rgba(16, 185, 129, 0.3)' }]}>
              <View style={[styles.funnelBarFill, { width: '50%', backgroundColor: '#10B981' }]} />
            </View>
          </View>
        </View>
        <View style={styles.funnelSummary}>
          <Text style={[styles.funnelConversion, { color: '#F59E0B' }]}>
            50% of logged hours successfully billed
          </Text>
        </View>
      </View>

      {/* Billing Accuracy Trends */}
      <View style={[styles.accuracySection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Billing Accuracy Trends
        </Text>
        <View style={styles.accuracyGrid}>
          <View style={styles.accuracyItem}>
            <Text style={[styles.accuracyPeriod, { color: 'rgba(255, 255, 255, 0.6)' }]}>This Month</Text>
            <Text style={[styles.accuracyScore, { color: '#10B981' }]}>96%</Text>
            <View style={styles.accuracyTrend}>
              <Text style={[styles.trendValue, { color: '#10B981' }]}>+2%</Text>
              <Text style={[styles.trendLabel, { color: 'rgba(255, 255, 255, 0.4)' }]}>vs last month</Text>
            </View>
          </View>
          <View style={styles.accuracyItem}>
            <Text style={[styles.accuracyPeriod, { color: 'rgba(255, 255, 255, 0.6)' }]}>Quarter</Text>
            <Text style={[styles.accuracyScore, { color: '#06B6D4' }]}>94%</Text>
            <View style={styles.accuracyTrend}>
              <Text style={[styles.trendValue, { color: '#10B981' }]}>+4%</Text>
              <Text style={[styles.trendLabel, { color: 'rgba(255, 255, 255, 0.4)' }]}>vs last quarter</Text>
            </View>
          </View>
          <View style={styles.accuracyItem}>
            <Text style={[styles.accuracyPeriod, { color: 'rgba(255, 255, 255, 0.6)' }]}>Year</Text>
            <Text style={[styles.accuracyScore, { color: '#8B5CF6' }]}>92%</Text>
            <View style={styles.accuracyTrend}>
              <Text style={[styles.trendValue, { color: '#10B981' }]}>+6%</Text>
              <Text style={[styles.trendLabel, { color: 'rgba(255, 255, 255, 0.4)' }]}>vs last year</Text>
            </View>
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
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    width: '48%',
    padding: 14,
    borderRadius: 12,
  },
  metricLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 2,
  },
  metricSubtitle: {
    fontSize: 10,
  },
  leakageSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  leakageContent: {
    alignItems: 'center',
    marginBottom: 12,
  },
  leakageValue: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  leakageDescription: {
    fontSize: 12,
    textAlign: 'center',
  },
  leakageBreakdown: {
    gap: 8,
  },
  leakageItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leakageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  leakageItemText: {
    fontSize: 12,
  },
  utilizationSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  utilizationChart: {
    gap: 12,
  },
  utilizationBar: {
    height: 24,
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
  },
  utilizationSegment: {
    height: '100%',
  },
  utilizationLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
  funnelSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  funnelContainer: {
    gap: 10,
  },
  funnelStep: {
    gap: 6,
  },
  funnelLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  funnelLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  funnelValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  funnelBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  funnelBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  funnelSummary: {
    marginTop: 8,
    alignItems: 'center',
  },
  funnelConversion: {
    fontSize: 12,
    fontWeight: '500',
  },
  accuracySection: {
    padding: 16,
    borderRadius: 12,
  },
  accuracyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accuracyItem: {
    flex: 1,
    alignItems: 'center',
  },
  accuracyPeriod: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  accuracyScore: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  accuracyTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  trendLabel: {
    fontSize: 10,
  },
});
