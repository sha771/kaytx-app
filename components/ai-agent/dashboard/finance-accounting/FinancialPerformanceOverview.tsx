import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, PieChart, BarChart3, Activity, Target, DollarSign } from 'lucide-react-native';

interface FinancialMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface FinancialPerformanceOverviewProps {
  metrics: {
    revenueGrowth: FinancialMetric;
    grossMargin: FinancialMetric;
    netMargin: FinancialMetric;
    ebitda: FinancialMetric;
    costOfGoodsSold: FinancialMetric;
    operatingExpenses: FinancialMetric;
  };
}

export default function FinancialPerformanceOverview({ metrics }: FinancialPerformanceOverviewProps) {
  const { theme } = useTheme();

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={12} color="#10B981" />;
      case 'down':
        return <Activity size={12} color="#EF4444" />;
      case 'stable':
        return <Activity size={12} color="#6B7280" />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <BarChart3 size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Financial Performance Overview
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.metricsRow}>
          <View style={[styles.metricCard, { borderLeftColor: metrics.revenueGrowth.color }]}>
            <View style={styles.metricHeader}>
              <View style={[styles.iconContainer, { backgroundColor: metrics.revenueGrowth.color + '20' }]}>
                <TrendingUp size={16} color={metrics.revenueGrowth.color} />
              </View>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                Revenue Growth
              </Text>
            </View>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>
              {metrics.revenueGrowth.value}
            </Text>
            <View style={styles.metricChange}>
              {getTrendIcon(metrics.revenueGrowth.trend)}
              <Text style={[styles.changeText, { color: metrics.revenueGrowth.trend === 'up' ? '#10B981' : metrics.revenueGrowth.trend === 'down' ? '#EF4444' : '#6B7280' }]}>
                {metrics.revenueGrowth.change}
              </Text>
            </View>
          </View>

          <View style={[styles.metricCard, { borderLeftColor: metrics.grossMargin.color }]}>
            <View style={styles.metricHeader}>
              <View style={[styles.iconContainer, { backgroundColor: metrics.grossMargin.color + '20' }]}>
                <PieChart size={16} color={metrics.grossMargin.color} />
              </View>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                Gross Margin
              </Text>
            </View>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>
              {metrics.grossMargin.value}
            </Text>
            <View style={styles.metricChange}>
              {getTrendIcon(metrics.grossMargin.trend)}
              <Text style={[styles.changeText, { color: metrics.grossMargin.trend === 'up' ? '#10B981' : metrics.grossMargin.trend === 'down' ? '#EF4444' : '#6B7280' }]}>
                {metrics.grossMargin.change}
              </Text>
            </View>
          </View>

          <View style={[styles.metricCard, { borderLeftColor: metrics.netMargin.color }]}>
            <View style={styles.metricHeader}>
              <View style={[styles.iconContainer, { backgroundColor: metrics.netMargin.color + '20' }]}>
                <DollarSign size={16} color={metrics.netMargin.color} />
              </View>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                Net Margin
              </Text>
            </View>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>
              {metrics.netMargin.value}
            </Text>
            <View style={styles.metricChange}>
              {getTrendIcon(metrics.netMargin.trend)}
              <Text style={[styles.changeText, { color: metrics.netMargin.trend === 'up' ? '#10B981' : metrics.netMargin.trend === 'down' ? '#EF4444' : '#6B7280' }]}>
                {metrics.netMargin.change}
              </Text>
            </View>
          </View>

          <View style={[styles.metricCard, { borderLeftColor: metrics.ebitda.color }]}>
            <View style={styles.metricHeader}>
              <View style={[styles.iconContainer, { backgroundColor: metrics.ebitda.color + '20' }]}>
                <Target size={16} color={metrics.ebitda.color} />
              </View>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                EBITDA
              </Text>
            </View>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>
              {metrics.ebitda.value}
            </Text>
            <View style={styles.metricChange}>
              {getTrendIcon(metrics.ebitda.trend)}
              <Text style={[styles.changeText, { color: metrics.ebitda.trend === 'up' ? '#10B981' : metrics.ebitda.trend === 'down' ? '#EF4444' : '#6B7280' }]}>
                {metrics.ebitda.change}
              </Text>
            </View>
          </View>

          <View style={[styles.metricCard, { borderLeftColor: metrics.costOfGoodsSold.color }]}>
            <View style={styles.metricHeader}>
              <View style={[styles.iconContainer, { backgroundColor: metrics.costOfGoodsSold.color + '20' }]}>
                <Activity size={16} color={metrics.costOfGoodsSold.color} />
              </View>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                COGS
              </Text>
            </View>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>
              {metrics.costOfGoodsSold.value}
            </Text>
            <View style={styles.metricChange}>
              {getTrendIcon(metrics.costOfGoodsSold.trend)}
              <Text style={[styles.changeText, { color: metrics.costOfGoodsSold.trend === 'up' ? '#10B981' : metrics.costOfGoodsSold.trend === 'down' ? '#EF4444' : '#6B7280' }]}>
                {metrics.costOfGoodsSold.change}
              </Text>
            </View>
          </View>

          <View style={[styles.metricCard, { borderLeftColor: metrics.operatingExpenses.color }]}>
            <View style={styles.metricHeader}>
              <View style={[styles.iconContainer, { backgroundColor: metrics.operatingExpenses.color + '20' }]}>
                <BarChart3 size={16} color={metrics.operatingExpenses.color} />
              </View>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                Operating Expenses
              </Text>
            </View>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>
              {metrics.operatingExpenses.value}
            </Text>
            <View style={styles.metricChange}>
              {getTrendIcon(metrics.operatingExpenses.trend)}
              <Text style={[styles.changeText, { color: metrics.operatingExpenses.trend === 'up' ? '#10B981' : metrics.operatingExpenses.trend === 'down' ? '#EF4444' : '#6B7280' }]}>
                {metrics.operatingExpenses.change}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.performanceHeatmap}>
        <Text style={[styles.heatmapTitle, { color: theme.colors.text }]}>
          Performance Heatmap
        </Text>
        <View style={styles.heatmapGrid}>
          <View style={[styles.heatmapCell, { backgroundColor: 'rgba(16, 185, 129, 0.3)' }]}>
            <Text style={[styles.heatmapLabel, { color: theme.colors.text }]}>Q1</Text>
            <Text style={[styles.heatmapValue, { color: '#10B981' }]}>Strong</Text>
          </View>
          <View style={[styles.heatmapCell, { backgroundColor: 'rgba(16, 185, 129, 0.4)' }]}>
            <Text style={[styles.heatmapLabel, { color: theme.colors.text }]}>Q2</Text>
            <Text style={[styles.heatmapValue, { color: '#10B981' }]}>Strong</Text>
          </View>
          <View style={[styles.heatmapCell, { backgroundColor: 'rgba(59, 130, 246, 0.3)' }]}>
            <Text style={[styles.heatmapLabel, { color: theme.colors.text }]}>Q3</Text>
            <Text style={[styles.heatmapValue, { color: '#3B82F6' }]}>Good</Text>
          </View>
          <View style={[styles.heatmapCell, { backgroundColor: 'rgba(245, 158, 11, 0.3)' }]}>
            <Text style={[styles.heatmapLabel, { color: theme.colors.text }]}>Q4</Text>
            <Text style={[styles.heatmapValue, { color: '#F59E0B' }]}>Moderate</Text>
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
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderLeftWidth: 3,
    minWidth: 140,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  performanceHeatmap: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  heatmapTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  heatmapGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  heatmapCell: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  heatmapLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  heatmapValue: {
    fontSize: 11,
    fontWeight: '500',
  }
});