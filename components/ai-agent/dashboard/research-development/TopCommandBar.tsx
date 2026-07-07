import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react-native';

interface Metric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface TopCommandBarProps {
  metrics: Metric[];
}

export default function TopCommandBar({ metrics }: TopCommandBarProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {metrics.map((metric, index) => (
          <View 
            key={index}
            style={[
              styles.metricCard, 
              { 
                backgroundColor: metric.color + '10',
                borderLeftColor: metric.color,
                marginRight: index < metrics.length - 1 ? 12 : 0
              }
            ]}
          >
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
              {metric.label}
            </Text>
            <View style={styles.metricValueRow}>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                {metric.value}
              </Text>
              <View style={[
                styles.changeBadge,
                { 
                  backgroundColor: metric.trend === 'up' ? '#22C55E' + '20' : 
                                 metric.trend === 'down' ? '#EF4444' + '20' : '#6B7280' + '20'
                }
              ]}>
                {metric.trend === 'up' && <TrendingUp size={12} color="#22C55E" />}
                {metric.trend === 'down' && <TrendingDown size={12} color="#EF4444" />}
                {metric.trend === 'stable' && <Minus size={12} color="#6B7280" />}
                <Text style={[
                  styles.changeText,
                  { 
                    color: metric.trend === 'up' ? '#22C55E' : 
                           metric.trend === 'down' ? '#EF4444' : '#6B7280'
                  }
                ]}>
                  {metric.change}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  scrollContent: {
    paddingRight: 8,
  },
  metricCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    minWidth: 160,
    maxWidth: 180,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  changeText: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
});