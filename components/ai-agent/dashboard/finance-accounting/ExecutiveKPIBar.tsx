import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react-native';

interface ExecutiveKPI {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface ExecutiveKPIBarProps {
  kpis: ExecutiveKPI[];
}

export default function ExecutiveKPIBar({ kpis }: ExecutiveKPIBarProps) {
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
        <View style={styles.kpiRow}>
          {kpis.map((kpi) => (
            <View key={kpi.label} style={[styles.kpiCard, { borderLeftColor: kpi.color }]}>
              <Text style={[styles.kpiLabel, { color: theme.colors.textSecondary }]}>
                {kpi.label}
              </Text>
              <View style={styles.kpiValueRow}>
                <Text style={[styles.kpiValue, { color: theme.colors.text }]}>
                  {kpi.value}
                </Text>
                <View style={styles.kpiChange}>
                  {getTrendIcon(kpi.trend)}
                  <Text style={[styles.kpiChangeText, { color: kpi.trend === 'up' ? '#10B981' : kpi.trend === 'down' ? '#EF4444' : '#6B7280' }]}>
                    {kpi.change}
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
  kpiRow: {
    flexDirection: 'row',
    gap: 12,
  },
  kpiCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderLeftWidth: 3,
    minWidth: 140,
  },
  kpiLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  kpiValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  kpiValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  kpiChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  kpiChangeText: {
    fontSize: 12,
    fontWeight: '600',
  }
});