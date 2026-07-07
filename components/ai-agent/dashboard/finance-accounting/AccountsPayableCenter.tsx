import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { DollarSign, Clock, TrendingDown, AlertCircle, Calendar, CheckCircle, Zap, Building2 } from 'lucide-react-native';

interface APAgingBucket {
  period: string;
  amount: string;
  count: number;
  percentage: number;
}

interface APMetrics {
  pendingPayments: string;
  invoicesProcessed: number;
  vendorBalances: string;
  earlyPaymentDiscounts: string;
  agingBuckets: APAgingBucket[];
}

interface AccountsPayableCenterProps {
  metrics: APMetrics;
}

export default function AccountsPayableCenter({ metrics }: AccountsPayableCenterProps) {
  const { theme } = useTheme();

  const formatCurrency = (value: string) => {
    return value;
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
        <TrendingDown size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Accounts Payable Center
        </Text>
      </View>

      <View style={styles.topMetrics}>
        <View style={styles.metricCard}>
          <View style={styles.metricIcon}>
            <DollarSign size={16} color="#F59E0B" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Pending Payments
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {formatCurrency(metrics.pendingPayments)}
          </Text>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.metricIcon}>
            <CheckCircle size={16} color="#10B981" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Invoices Processed
          </Text>
          <Text style={[styles.metricValue, { color: '#10B981' }]}>
            {metrics.invoicesProcessed.toLocaleString()}
          </Text>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.metricIcon}>
            <Building2 size={16} color="#3B82F6" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Vendor Balances
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {formatCurrency(metrics.vendorBalances)}
          </Text>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.metricIcon}>
            <Zap size={16} color="#8B5CF6" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Early Payment Discounts
          </Text>
          <Text style={[styles.metricValue, { color: '#8B5CF6' }]}>
            {formatCurrency(metrics.earlyPaymentDiscounts)}
          </Text>
        </View>
      </View>

      <View style={styles.agingSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Payables Aging
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

      <View style={styles.paymentSchedule}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Payment Schedule
        </Text>
        <View style={styles.scheduleGrid}>
          <View style={styles.scheduleItem}>
            <Calendar size={14} color="#10B981" />
            <Text style={[styles.scheduleLabel, { color: theme.colors.textSecondary }]}>
              Due This Week
            </Text>
            <Text style={[styles.scheduleValue, { color: theme.colors.text }]}>
              $1.2M
            </Text>
          </View>
          <View style={styles.scheduleItem}>
            <Calendar size={14} color="#3B82F6" />
            <Text style={[styles.scheduleLabel, { color: theme.colors.textSecondary }]}>
              Due This Month
            </Text>
            <Text style={[styles.scheduleValue, { color: theme.colors.text }]}>
              $3.8M
            </Text>
          </View>
          <View style={styles.scheduleItem}>
            <Clock size={14} color="#F59E0B" />
            <Text style={[styles.scheduleLabel, { color: theme.colors.textSecondary }]}>
              Overdue
            </Text>
            <Text style={[styles.scheduleValue, { color: '#EF4444' }]}>
              $340K
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.vendorSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Vendor Spend Analysis
        </Text>
        <View style={styles.vendorGrid}>
          <View style={styles.vendorCard}>
            <Building2 size={14} color="#3B82F6" />
            <Text style={[styles.vendorLabel, { color: theme.colors.textSecondary }]}>
              Top Vendor
            </Text>
            <Text style={[styles.vendorValue, { color: theme.colors.text }]}>
              TechCorp
            </Text>
            <Text style={[styles.vendorSpend, { color: '#10B981' }]}>
              $1.8M annual
            </Text>
          </View>
          <View style={styles.vendorCard}>
            <Building2 size={14} color="#8B5CF6" />
            <Text style={[styles.vendorLabel, { color: theme.colors.textSecondary }]}>
              Active Vendors
            </Text>
            <Text style={[styles.vendorValue, { color: theme.colors.text }]}>
              234
            </Text>
            <Text style={[styles.vendorSpend, { color: '#3B82F6' }]}>
              +12 this quarter
            </Text>
          </View>
          <View style={styles.vendorCard}>
            <Zap size={14} color="#F59E0B" />
            <Text style={[styles.vendorLabel, { color: theme.colors.textSecondary }]}>
              Automation Rate
            </Text>
            <Text style={[styles.vendorValue, { color: theme.colors.text }]}>
              87%
            </Text>
            <Text style={[styles.vendorSpend, { color: '#10B981' }]}>
              +5% improvement
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.alertsSection}>
        <View style={styles.alertCard}>
          <AlertCircle size={14} color="#F59E0B" />
          <Text style={[styles.alertText, { color: theme.colors.textSecondary }]}>
            8 invoices due for early payment discount (2% savings)
          </Text>
        </View>
        <View style={styles.alertCard}>
          <AlertCircle size={14} color="#EF4444" />
          <Text style={[styles.alertText, { color: theme.colors.textSecondary }]}>
            3 vendor accounts require attention for overdue payments
          </Text>
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
  paymentSchedule: {
    marginBottom: 16,
  },
  scheduleGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  scheduleItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 8,
  },
  scheduleLabel: {
    fontSize: 10,
    marginTop: 4,
    marginBottom: 2,
  },
  scheduleValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  vendorSection: {
    marginBottom: 16,
  },
  vendorGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  vendorCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 8,
  },
  vendorLabel: {
    fontSize: 10,
    marginTop: 4,
    marginBottom: 2,
  },
  vendorValue: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  vendorSpend: {
    fontSize: 10,
  },
  alertsSection: {
    gap: 8,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 8,
  },
  alertText: {
    flex: 1,
    fontSize: 11,
  }
});