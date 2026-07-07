import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { DollarSign, TrendingUp, Wallet, Activity, Target, PieChart } from 'lucide-react-native';

interface CFOMetrics {
  totalRevenue: string;
  netProfit: string;
  cashPosition: string;
  operatingExpenses: string;
  forecastedRevenue: string;
  revenueGrowth: number;
  profitMargin: number;
  operatingMargin: number;
}

interface CFOCommandCenterProps {
  metrics: CFOMetrics;
}

export default function CFOCommandCenter({ metrics }: CFOCommandCenterProps) {
  const { theme } = useTheme();

  const formatCurrency = (value: string) => {
    return value;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <PieChart size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          CFO Command Center
        </Text>
      </View>

      <View style={styles.mainMetrics}>
        <View style={[styles.mainMetricCard, { backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: '#F59E0B' }]}>
          <View style={styles.metricIcon}>
            <DollarSign size={20} color="#F59E0B" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Total Revenue
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {formatCurrency(metrics.totalRevenue)}
          </Text>
          <View style={styles.metricTrend}>
            <TrendingUp size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +{metrics.revenueGrowth}%
            </Text>
          </View>
        </View>

        <View style={[styles.mainMetricCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' }]}>
          <View style={styles.metricIcon}>
            <DollarSign size={20} color="#10B981" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Net Profit
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {formatCurrency(metrics.netProfit)}
          </Text>
          <View style={styles.metricTrend}>
            <TrendingUp size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              {metrics.profitMargin}% margin
            </Text>
          </View>
        </View>

        <View style={[styles.mainMetricCard, { backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: '#3B82F6' }]}>
          <View style={styles.metricIcon}>
            <Wallet size={20} color="#3B82F6" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Cash Position
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {formatCurrency(metrics.cashPosition)}
          </Text>
          <View style={styles.metricTrend}>
            <Activity size={12} color="#3B82F6" />
            <Text style={[styles.trendText, { color: '#3B82F6' }]}>
              Strong liquidity
            </Text>
          </View>
        </View>

        <View style={[styles.mainMetricCard, { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#EF4444' }]}>
          <View style={styles.metricIcon}>
            <Activity size={20} color="#EF4444" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Operating Expenses
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {formatCurrency(metrics.operatingExpenses)}
          </Text>
          <View style={styles.metricTrend}>
            <Target size={12} color="#8B5CF6" />
            <Text style={[styles.trendText, { color: '#8B5CF6' }]}>
              {metrics.operatingMargin}% margin
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.forecastSection}>
        <View style={styles.forecastCard}>
          <Target size={16} color="#8B5CF6" />
          <Text style={[styles.forecastLabel, { color: theme.colors.textSecondary }]}>
            Forecasted Revenue
          </Text>
          <Text style={[styles.forecastValue, { color: theme.colors.text }]}>
            {formatCurrency(metrics.forecastedRevenue)}
          </Text>
          <View style={[styles.forecastBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
            <View 
              style={[
                styles.forecastFill, 
                { 
                  backgroundColor: '#8B5CF6',
                  width: '85%'
                }
              ]} 
            />
          </View>
          <Text style={[styles.forecastSubtext, { color: theme.colors.textSecondary }]}>
            85% of annual target
          </Text>
        </View>
      </View>

      <View style={styles.executiveSummary}>
        <Text style={[styles.summaryTitle, { color: theme.colors.text }]}>
          Executive Summary
        </Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
              Revenue Growth
            </Text>
            <Text style={[styles.summaryValue, { color: '#10B981' }]}>
              +{metrics.revenueGrowth}%
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
              Profit Margin
            </Text>
            <Text style={[styles.summaryValue, { color: '#10B981' }]}>
              {metrics.profitMargin}%
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
              Operating Margin
            </Text>
            <Text style={[styles.summaryValue, { color: '#3B82F6' }]}>
              {metrics.operatingMargin}%
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
              Cash Ratio
            </Text>
            <Text style={[styles.summaryValue, { color: '#10B981' }]}>
              2.4x
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
  mainMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  mainMetricCard: {
    flex: 1,
    minWidth: 150,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  forecastSection: {
    marginBottom: 16,
  },
  forecastCard: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  forecastLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  forecastValue: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  forecastBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  forecastFill: {
    height: '100%',
    borderRadius: 3,
  },
  forecastSubtext: {
    fontSize: 11,
  },
  executiveSummary: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  summaryItem: {
    flex: 1,
    minWidth: 100,
  },
  summaryLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
  }
});