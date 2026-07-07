import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { BlurView } from 'expo-blur';
import { TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react-native';

interface ExecutiveKPI {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  subtitle?: string;
}

interface ExecutiveKPIBarProps {
  metrics: ExecutiveKPI[];
}

export default function ExecutiveKPIBar({ metrics }: ExecutiveKPIBarProps) {
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
    <BlurView
      intensity={80}
      tint="dark"
      style={[styles.container, { backgroundColor: theme.colors.card + '90' }]}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Activity size={20} color="#06B6D4" />
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Executive Engineering KPIs
          </Text>
        </View>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Real-time performance metrics
        </Text>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.metricsRow}>
          {metrics.map((metric) => (
            <View key={metric.label} style={[styles.metricCard, { borderLeftColor: metric.color, backgroundColor: 'rgba(255,255,255,0.05)' }]}>
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
              {metric.subtitle && (
                <Text style={[styles.metricSubtitle, { color: theme.colors.textSecondary }]}>
                  {metric.subtitle}
                </Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  header: {
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 12,
    opacity: 0.7,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderLeftWidth: 3,
    minWidth: 140,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
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
  },
  metricSubtitle: {
    fontSize: 10,
    marginTop: 4,
    opacity: 0.7,
  }
});