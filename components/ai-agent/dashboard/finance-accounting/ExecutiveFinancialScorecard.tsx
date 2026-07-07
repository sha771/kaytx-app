import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, TrendingDown, DollarSign, Target, Activity, Zap, BarChart3, PieChart } from 'lucide-react-native';

interface ScorecardMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  icon: any;
}

interface ExecutiveFinancialScorecardProps {
  metrics: {
    revenue: ScorecardMetric;
    profit: ScorecardMetric;
    cash: ScorecardMetric;
    growth: ScorecardMetric;
    efficiency: ScorecardMetric;
    forecast: ScorecardMetric;
  };
}

export default function ExecutiveFinancialScorecard({ metrics }: ExecutiveFinancialScorecardProps) {
  const { theme } = useTheme();

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={14} color="#10B981" />;
      case 'down':
        return <TrendingDown size={14} color="#EF4444" />;
      case 'stable':
        return <Activity size={14} color="#6B7280" />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <BarChart3 size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Executive Financial Scorecard
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.scorecardRow}>
          {/* Revenue */}
          <View style={[styles.scorecard, { borderLeftColor: metrics.revenue.color, backgroundColor: 'rgba(245, 158, 11, 0.08)' }]}>
            <View style={styles.scorecardIcon}>
              {metrics.revenue.icon}
            </View>
            <Text style={[styles.scorecardLabel, { color: theme.colors.textSecondary }]}>
              {metrics.revenue.label}
            </Text>
            <Text style={[styles.scorecardValue, { color: theme.colors.text }]}>
              {metrics.revenue.value}
            </Text>
            <View style={styles.scorecardChange}>
              {getTrendIcon(metrics.revenue.trend)}
              <Text style={[styles.scorecardChangeText, { color: metrics.revenue.trend === 'up' ? '#10B981' : metrics.revenue.trend === 'down' ? '#EF4444' : '#6B7280' }]}>
                {metrics.revenue.change}
              </Text>
            </View>
          </View>

          {/* Profit */}
          <View style={[styles.scorecard, { borderLeftColor: metrics.profit.color, backgroundColor: 'rgba(16, 185, 129, 0.08)' }]}>
            <View style={styles.scorecardIcon}>
              {metrics.profit.icon}
            </View>
            <Text style={[styles.scorecardLabel, { color: theme.colors.textSecondary }]}>
              {metrics.profit.label}
            </Text>
            <Text style={[styles.scorecardValue, { color: theme.colors.text }]}>
              {metrics.profit.value}
            </Text>
            <View style={styles.scorecardChange}>
              {getTrendIcon(metrics.profit.trend)}
              <Text style={[styles.scorecardChangeText, { color: metrics.profit.trend === 'up' ? '#10B981' : metrics.profit.trend === 'down' ? '#EF4444' : '#6B7280' }]}>
                {metrics.profit.change}
              </Text>
            </View>
          </View>

          {/* Cash */}
          <View style={[styles.scorecard, { borderLeftColor: metrics.cash.color, backgroundColor: 'rgba(59, 130, 246, 0.08)' }]}>
            <View style={styles.scorecardIcon}>
              {metrics.cash.icon}
            </View>
            <Text style={[styles.scorecardLabel, { color: theme.colors.textSecondary }]}>
              {metrics.cash.label}
            </Text>
            <Text style={[styles.scorecardValue, { color: theme.colors.text }]}>
              {metrics.cash.value}
            </Text>
            <View style={styles.scorecardChange}>
              {getTrendIcon(metrics.cash.trend)}
              <Text style={[styles.scorecardChangeText, { color: metrics.cash.trend === 'up' ? '#10B981' : metrics.cash.trend === 'down' ? '#EF4444' : '#6B7280' }]}>
                {metrics.cash.change}
              </Text>
            </View>
          </View>

          {/* Growth */}
          <View style={[styles.scorecard, { borderLeftColor: metrics.growth.color, backgroundColor: 'rgba(6, 182, 212, 0.08)' }]}>
            <View style={styles.scorecardIcon}>
              {metrics.growth.icon}
            </View>
            <Text style={[styles.scorecardLabel, { color: theme.colors.textSecondary }]}>
              {metrics.growth.label}
            </Text>
            <Text style={[styles.scorecardValue, { color: theme.colors.text }]}>
              {metrics.growth.value}
            </Text>
            <View style={styles.scorecardChange}>
              {getTrendIcon(metrics.growth.trend)}
              <Text style={[styles.scorecardChangeText, { color: metrics.growth.trend === 'up' ? '#10B981' : metrics.growth.trend === 'down' ? '#EF4444' : '#6B7280' }]}>
                {metrics.growth.change}
              </Text>
            </View>
          </View>

          {/* Efficiency */}
          <View style={[styles.scorecard, { borderLeftColor: metrics.efficiency.color, backgroundColor: 'rgba(139, 92, 246, 0.08)' }]}>
            <View style={styles.scorecardIcon}>
              {metrics.efficiency.icon}
            </View>
            <Text style={[styles.scorecardLabel, { color: theme.colors.textSecondary }]}>
              {metrics.efficiency.label}
            </Text>
            <Text style={[styles.scorecardValue, { color: theme.colors.text }]}>
              {metrics.efficiency.value}
            </Text>
            <View style={styles.scorecardChange}>
              {getTrendIcon(metrics.efficiency.trend)}
              <Text style={[styles.scorecardChangeText, { color: metrics.efficiency.trend === 'up' ? '#10B981' : metrics.efficiency.trend === 'down' ? '#EF4444' : '#6B7280' }]}>
                {metrics.efficiency.change}
              </Text>
            </View>
          </View>

          {/* Forecast */}
          <View style={[styles.scorecard, { borderLeftColor: metrics.forecast.color, backgroundColor: 'rgba(236, 72, 153, 0.08)' }]}>
            <View style={styles.scorecardIcon}>
              {metrics.forecast.icon}
            </View>
            <Text style={[styles.scorecardLabel, { color: theme.colors.textSecondary }]}>
              {metrics.forecast.label}
            </Text>
            <Text style={[styles.scorecardValue, { color: theme.colors.text }]}>
              {metrics.forecast.value}
            </Text>
            <View style={styles.scorecardChange}>
              {getTrendIcon(metrics.forecast.trend)}
              <Text style={[styles.scorecardChangeText, { color: metrics.forecast.trend === 'up' ? '#10B981' : metrics.forecast.trend === 'down' ? '#EF4444' : '#6B7280' }]}>
                {metrics.forecast.change}
              </Text>
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
  scorecardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  scorecard: {
    width: 180,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    marginRight: 12,
  },
  scorecardIcon: {
    marginBottom: 8,
  },
  scorecardLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  scorecardValue: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
  },
  scorecardChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scorecardChangeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
