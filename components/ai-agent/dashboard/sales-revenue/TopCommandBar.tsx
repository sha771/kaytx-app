import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react-native';

interface CommandBarMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface TopCommandBarProps {
  metrics: CommandBarMetric[];
}

export default function TopCommandBar({ metrics }: TopCommandBarProps) {
  const { theme } = useTheme();

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={14} color="#10B981" />;
      case 'down':
        return <TrendingDown size={14} color="#EF4444" />;
      case 'stable':
        return <Minus size={14} color="#6B7280" />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.metricsRow}>
          {metrics.map((metric) => (
            <View key={metric.label} style={[styles.metricCard, { borderLeftColor: metric.color }]}>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                {metric.label}
              </Text>
              <View style={styles.metricValueRow}>
                <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                  {metric.value}
                </Text>
                <View style={styles.metricChange}>
                  {getTrendIcon(metric.trend)}
                  <Text style={[styles.metricChangeText, { color: metric.trend === 'up' ? '#10B981' : metric.trend === 'down' ? '#EF4444' : '#6B7280' }]}>
                    {metric.change}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderLeftWidth: 3,
    minWidth: 140,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  metricValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricChangeText: {
    fontSize: 12,
    fontWeight: '600',
  }
});