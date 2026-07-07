import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface ProductKPI {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  subtitle: string;
}

interface ProductCommandCenterDashboardProps {
  kpis: ProductKPI[];
}

export default function ProductCommandCenterDashboard({ kpis }: ProductCommandCenterDashboardProps) {
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
      case 'up': return '#22C55E';
      case 'down': return '#EF4444';
      case 'stable': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Product Command Center
      </Text>

      {/* KPI Grid */}
      <ScrollView 
        style={styles.kpiScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.kpiGrid}>
          {kpis.map((kpi) => (
            <View 
              key={kpi.id}
              style={[styles.kpiCard, { 
                backgroundColor: theme.colors.background,
                borderColor: `${kpi.color}30`,
                borderLeftColor: kpi.color
              }]}
            >
              <Text style={[styles.kpiSubtitle, { color: theme.colors.textSecondary }]}>
                {kpi.subtitle}
              </Text>
              <Text style={[styles.kpiTitle, { color: theme.colors.text }]}>
                {kpi.title}
              </Text>
              <Text style={[styles.kpiValue, { color: kpi.color }]}>
                {kpi.value}
              </Text>
              <View style={styles.kpiChange}>
                <Text style={[styles.trendIcon, { color: getTrendColor(kpi.trend) }]}>
                  {getTrendIcon(kpi.trend)}
                </Text>
                <Text style={[styles.changeText, { color: getTrendColor(kpi.trend) }]}>
                  {kpi.change}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Product Health Overview */}
        <View style={[styles.healthCard, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.healthTitle, { color: theme.colors.text }]}>
            Product Health Overview
          </Text>
          <View style={styles.healthMetrics}>
            <View style={styles.healthMetric}>
              <View style={[styles.healthDot, { backgroundColor: '#22C55E' }]} />
              <Text style={[styles.healthLabel, { color: theme.colors.textSecondary }]}>
                Overall Health
              </Text>
              <Text style={[styles.healthValue, { color: '#22C55E' }]}>
                Excellent
              </Text>
            </View>
            <View style={styles.healthMetric}>
              <View style={[styles.healthDot, { backgroundColor: '#3B82F6' }]} />
              <Text style={[styles.healthLabel, { color: theme.colors.textSecondary }]}>
                Growth Trend
              </Text>
              <Text style={[styles.healthValue, { color: '#3B82F6' }]}>
                Accelerating
              </Text>
            </View>
            <View style={styles.healthMetric}>
              <View style={[styles.healthDot, { backgroundColor: '#8B5CF6' }]} />
              <Text style={[styles.healthLabel, { color: theme.colors.textSecondary }]}>
                Engagement
              </Text>
              <Text style={[styles.healthValue, { color: '#8B5CF6' }]}>
                High
              </Text>
            </View>
            <View style={styles.healthMetric}>
              <View style={[styles.healthDot, { backgroundColor: '#F59E0B' }]} />
              <Text style={[styles.healthLabel, { color: theme.colors.textSecondary }]}>
                Retention
              </Text>
              <Text style={[styles.healthValue, { color: '#F59E0B' }]}>
                Improving
              </Text>
            </View>
          </View>
        </View>

        {/* Revenue Impact */}
        <View style={[styles.revenueCard, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.revenueTitle, { color: theme.colors.text }]}>
            Monthly Product Revenue Impact
          </Text>
          <Text style={[styles.revenueValue, { color: '#10B981' }]}>
            $14.2M
          </Text>
          <Text style={[styles.revenueSubtitle, { color: theme.colors.textSecondary }]}>
            +18.4% from last month • Driven by feature adoption and experimentation
          </Text>
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
  kpiScroll: {
    maxHeight: 600,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginBottom: 16,
  },
  kpiCard: {
    width: '48%',
    borderWidth: 1,
    borderLeftWidth: 4,
    borderRadius: 12,
    padding: 16,
    margin: 6,
  },
  kpiSubtitle: {
    fontSize: 10,
    marginBottom: 4,
  },
  kpiTitle: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  kpiChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  healthCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  healthTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  healthMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  healthMetric: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  healthDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  healthLabel: {
    flex: 1,
    fontSize: 12,
  },
  healthValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  revenueCard: {
    borderRadius: 12,
    padding: 16,
  },
  revenueTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  revenueValue: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  revenueSubtitle: {
    fontSize: 12,
  },
});
