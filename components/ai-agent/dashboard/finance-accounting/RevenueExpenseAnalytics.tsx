import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, TrendingDown, BarChart3, LineChart, Activity, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react-native';

interface MonthlyData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

interface RevenueExpenseAnalyticsProps {
  data: MonthlyData[];
  currentRevenue: number;
  currentExpenses: number;
  revenueGrowth: number;
  expenseGrowth: number;
}

export default function RevenueExpenseAnalytics({ data, currentRevenue, currentExpenses, revenueGrowth, expenseGrowth }: RevenueExpenseAnalyticsProps) {
  const { theme } = useTheme();

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  const maxValue = Math.max(...data.map(d => Math.max(d.revenue, d.expenses)));

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <BarChart3 size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Revenue vs Expense Neural Analytics
        </Text>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' }]}>
          <View style={styles.summaryIcon}>
            <TrendingUp size={18} color="#10B981" />
          </View>
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Total Revenue</Text>
          <Text style={[styles.summaryValue, { color: '#10B981' }]}>{formatCurrency(currentRevenue)}</Text>
          <View style={styles.summaryChange}>
            <ArrowUpRight size={12} color="#10B981" />
            <Text style={[styles.summaryChangeText, { color: '#10B981' }]}>+{revenueGrowth}%</Text>
          </View>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#EF4444' }]}>
          <View style={styles.summaryIcon}>
            <TrendingDown size={18} color="#EF4444" />
          </View>
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Total Expenses</Text>
          <Text style={[styles.summaryValue, { color: '#EF4444' }]}>{formatCurrency(currentExpenses)}</Text>
          <View style={styles.summaryChange}>
            <ArrowDownRight size={12} color="#10B981" />
            <Text style={[styles.summaryChangeText, { color: '#10B981' }]}>+{expenseGrowth}%</Text>
          </View>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: '#3B82F6' }]}>
          <View style={styles.summaryIcon}>
            <Activity size={18} color="#3B82F6" />
          </View>
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Net Margin</Text>
          <Text style={[styles.summaryValue, { color: '#3B82F6' }]}>{((currentRevenue - currentExpenses) / currentRevenue * 100).toFixed(1)}%</Text>
          <View style={styles.summaryChange}>
            <ArrowUpRight size={12} color="#10B981" />
            <Text style={[styles.summaryChangeText, { color: '#10B981' }]}>+2.1%</Text>
          </View>
        </View>
      </View>

      {/* Neural Analytics Chart */}
      <View style={[styles.chartContainer, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.chartTitle, { color: theme.colors.text }]}>6-Month Trend Analysis</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.chartRow}>
            {data.map((item, index) => (
              <View key={item.month} style={styles.chartColumn}>
                <View style={styles.barsContainer}>
                  {/* Revenue Bar */}
                  <View style={styles.barWrapper}>
                    <View style={[
                      styles.bar, 
                      { 
                        height: (item.revenue / maxValue) * 120,
                        backgroundColor: '#10B981',
                        borderRadius: 4,
                      }
                    ]} />
                    <Text style={[styles.barLabel, { color: '#10B981' }]}>
                      {formatCurrency(item.revenue)}
                    </Text>
                  </View>

                  {/* Expense Bar */}
                  <View style={styles.barWrapper}>
                    <View style={[
                      styles.bar, 
                      { 
                        height: (item.expenses / maxValue) * 120,
                        backgroundColor: '#EF4444',
                        borderRadius: 4,
                      }
                    ]} />
                    <Text style={[styles.barLabel, { color: '#EF4444' }]}>
                      {formatCurrency(item.expenses)}
                    </Text>
                  </View>
                </View>

                <Text style={[styles.monthLabel, { color: theme.colors.textSecondary }]}>
                  {item.month}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
            <Text style={[styles.legendText, { color: theme.colors.textSecondary }]}>Revenue</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
            <Text style={[styles.legendText, { color: theme.colors.textSecondary }]}>Expenses</Text>
          </View>
        </View>
      </View>

      {/* AI Insights */}
      <View style={[styles.insightsContainer, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.insightsTitle, { color: theme.colors.text }]}>AI Neural Network Insights</Text>
        <View style={styles.insightRow}>
          <View style={styles.insightItem}>
            <LineChart size={16} color="#10B981" />
            <Text style={[styles.insightText, { color: theme.colors.text }]}>
              Revenue trajectory: <Text style={{ color: '#10B981', fontWeight: '600' }}>Strong upward trend</Text>
            </Text>
          </View>
          <View style={styles.insightItem}>
            <Activity size={16} color="#F59E0B" />
            <Text style={[styles.insightText, { color: theme.colors.text }]}>
              Expense optimization: <Text style={{ color: '#F59E0B', fontWeight: '600' }}>12% efficiency gain</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  summaryIcon: {
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  summaryChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  summaryChangeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  chartContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  chartRow: {
    flexDirection: 'row',
    gap: 16,
    paddingBottom: 8,
  },
  chartColumn: {
    alignItems: 'center',
    width: 60,
  },
  barsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  barWrapper: {
    alignItems: 'center',
    width: 24,
  },
  bar: {
    width: 24,
    marginBottom: 4,
  },
  barLabel: {
    fontSize: 9,
    fontWeight: '600',
  },
  monthLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  legend: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
  },
  insightsContainer: {
    padding: 16,
    borderRadius: 12,
  },
  insightsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  insightRow: {
    gap: 8,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  insightText: {
    fontSize: 12,
  },
});
