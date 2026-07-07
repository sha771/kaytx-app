import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { DollarSign, Clock, AlertTriangle, TrendingUp, Activity, Users, Calendar } from 'lucide-react-native';

interface AgingBucket {
  period: string;
  amount: string;
  count: number;
  percentage: number;
}

interface ARMetrics {
  outstandingInvoices: string;
  collectionRate: number;
  dso: number;
  overdueAccounts: number;
  agingBuckets: AgingBucket[];
}

interface AccountsReceivableCenterProps {
  metrics: ARMetrics;
}

export default function AccountsReceivableCenter({ metrics }: AccountsReceivableCenterProps) {
  const { theme } = useTheme();

  const formatCurrency = (value: string) => {
    return value;
  };

  const getDSOColor = (dso: number) => {
    if (dso <= 30) return '#10B981';
    if (dso <= 45) return '#3B82F6';
    if (dso <= 60) return '#F59E0B';
    return '#EF4444';
  };

  const getAgingColor = (period: string) => {
    if (period === '0-30') return '#10B981';
    if (period === '31-60') return '#3B82F6';
    if (period === '61-90') return '#F59E0B';
    return '#EF4444';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <DollarSign size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Accounts Receivable Center
        </Text>
      </View>

      <View style={styles.topMetrics}>
        <View style={styles.metricCard}>
          <View style={styles.metricIcon}>
            <DollarSign size={16} color="#F59E0B" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Outstanding Invoices
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {formatCurrency(metrics.outstandingInvoices)}
          </Text>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.metricIcon}>
            <TrendingUp size={16} color="#10B981" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Collection Rate
          </Text>
          <Text style={[styles.metricValue, { color: '#10B981' }]}>
            {metrics.collectionRate}%
          </Text>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.metricIcon}>
            <Clock size={16} color={getDSOColor(metrics.dso)} />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Days Sales Outstanding
          </Text>
          <Text style={[styles.metricValue, { color: getDSOColor(metrics.dso) }]}>
            {metrics.dso} days
          </Text>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.metricIcon}>
            <AlertTriangle size={16} color="#EF4444" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Overdue Accounts
          </Text>
          <Text style={[styles.metricValue, { color: '#EF4444' }]}>
            {metrics.overdueAccounts}
          </Text>
        </View>
      </View>

      <View style={styles.agingSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Receivables Aging
        </Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.agingRow}>
            {metrics.agingBuckets.map((bucket) => (
              <View 
                key={bucket.period} 
                style={[
                  styles.agingCard, 
                  { borderLeftColor: getAgingColor(bucket.period) }
                ]}
              >
                <Text style={[styles.agingPeriod, { color: theme.colors.textSecondary }]}>
                  {bucket.period} days
                </Text>
                <Text style={[styles.agingAmount, { color: theme.colors.text }]}>
                  {formatCurrency(bucket.amount)}
                </Text>
                <Text style={[styles.agingCount, { color: theme.colors.textSecondary }]}>
                  {bucket.count} invoices
                </Text>
                <View style={[styles.agingBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                  <View 
                    style={[
                      styles.agingFill, 
                      { 
                        backgroundColor: getAgingColor(bucket.period),
                        width: `${bucket.percentage}%`
                      }
                    ]} 
                  />
                </View>
                <Text style={[styles.agingPercentage, { color: getAgingColor(bucket.period) }]}>
                  {bucket.percentage}%
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.collectionTrends}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Collection Trends
        </Text>
        <View style={styles.trendGrid}>
          <View style={styles.trendItem}>
            <Users size={14} color="#3B82F6" />
            <Text style={[styles.trendLabel, { color: theme.colors.textSecondary }]}>
              Active Collections
            </Text>
            <Text style={[styles.trendValue, { color: theme.colors.text }]}>
              234
            </Text>
          </View>
          <View style={styles.trendItem}>
            <Calendar size={14} color="#8B5CF6" />
            <Text style={[styles.trendLabel, { color: theme.colors.textSecondary }]}>
              Scheduled Follow-ups
            </Text>
            <Text style={[styles.trendValue, { color: theme.colors.text }]}>
              89
            </Text>
          </View>
          <View style={styles.trendItem}>
            <Activity size={14} color="#10B981" />
            <Text style={[styles.trendLabel, { color: theme.colors.textSecondary }]}>
              Auto-Processed
            </Text>
            <Text style={[styles.trendValue, { color: theme.colors.text }]}>
              156
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.riskSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Payment Risk Analysis
        </Text>
        <View style={styles.riskGrid}>
          <View style={[styles.riskCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
            <Text style={[styles.riskLabel, { color: theme.colors.textSecondary }]}>
              Low Risk
            </Text>
            <Text style={[styles.riskValue, { color: '#10B981' }]}>
              68%
            </Text>
          </View>
          <View style={[styles.riskCard, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
            <Text style={[styles.riskLabel, { color: theme.colors.textSecondary }]}>
              Medium Risk
            </Text>
            <Text style={[styles.riskValue, { color: '#3B82F6' }]}>
              22%
            </Text>
          </View>
          <View style={[styles.riskCard, { backgroundColor: 'rgba(245, 158, 11, 0.1)' }]}>
            <Text style={[styles.riskLabel, { color: theme.colors.textSecondary }]}>
              High Risk
            </Text>
            <Text style={[styles.riskValue, { color: '#F59E0B' }]}>
              8%
            </Text>
          </View>
          <View style={[styles.riskCard, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
            <Text style={[styles.riskLabel, { color: theme.colors.textSecondary }]}>
              Critical
            </Text>
            <Text style={[styles.riskValue, { color: '#EF4444' }]}>
              2%
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  topMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    minWidth: 120,
    borderRadius: 12,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  metricIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  agingSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  agingRow: {
    flexDirection: 'row',
    gap: 12,
  },
  agingCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderLeftWidth: 3,
    minWidth: 120,
  },
  agingPeriod: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  agingAmount: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  agingCount: {
    fontSize: 10,
    marginBottom: 8,
  },
  agingBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  agingFill: {
    height: '100%',
    borderRadius: 2,
  },
  agingPercentage: {
    fontSize: 12,
    fontWeight: '600',
  },
  collectionTrends: {
    marginBottom: 16,
  },
  trendGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  trendItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 8,
  },
  trendLabel: {
    fontSize: 10,
    marginTop: 4,
    marginBottom: 2,
  },
  trendValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  riskSection: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  riskGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  riskCard: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  riskLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  riskValue: {
    fontSize: 18,
    fontWeight: '700',
  }
});