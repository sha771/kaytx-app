import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, TrendingDown, Minus, Users, Heart, Shield, Target, Clock, Activity, Star, GraduationCap, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react-native';

interface ExecutiveKPI {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  icon?: any;
}

interface ExecutiveKPIBarProps {
  kpis: ExecutiveKPI[];
}

export default function ExecutiveKPIBar({ kpis }: ExecutiveKPIBarProps) {
  const { theme } = useTheme();

  const getIconForKPI = (label: string) => {
    switch (label) {
      case 'Total Employees':
        return Users;
      case 'Engagement Score':
        return Heart;
      case 'Retention Rate':
        return Shield;
      case 'Open Positions':
        return Target;
      case 'Hiring Velocity':
        return Clock;
      case 'Productivity':
        return Activity;
      case 'Diversity Score':
        return Star;
      case 'Training Rate':
        return GraduationCap;
      case 'Attrition Risk':
        return AlertCircle;
      default:
        return Activity;
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable', color: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight size={16} color={color} />;
      case 'down':
        return <ArrowDownRight size={16} color={color} />;
      case 'stable':
        return <Minus size={16} color="#6B7280" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable', kpiColor: string) => {
    switch (trend) {
      case 'up':
        return '#10B981';
      case 'down':
        return '#EF4444';
      case 'stable':
        return '#6B7280';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          People KPIs
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Executive Workforce Metrics
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.kpiRow}>
          {kpis.map((kpi) => {
            const Icon = getIconForKPI(kpi.label);
            const trendColor = getTrendColor(kpi.trend, kpi.color);
            return (
              <View key={kpi.label} style={[styles.kpiCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: kpi.color + '30' }]}>
                <View style={[styles.iconContainer, { backgroundColor: kpi.color + '20' }]}>
                  <Icon size={20} color={kpi.color} />
                </View>
                <Text style={[styles.kpiLabel, { color: theme.colors.textSecondary }]}>
                  {kpi.label}
                </Text>
                <Text style={[styles.kpiValue, { color: kpi.color }]}>
                  {kpi.value}
                </Text>
                <View style={styles.kpiChange}>
                  {getTrendIcon(kpi.trend, trendColor)}
                  <Text style={[styles.kpiChangeText, { color: trendColor }]}>
                    {kpi.change}
                  </Text>
                </View>
                <View style={[styles.trendIndicator, { backgroundColor: trendColor + '20' }]}>
                  <View style={[styles.trendFill, { backgroundColor: trendColor, width: kpi.trend === 'up' ? '75%' : kpi.trend === 'down' ? '25%' : '50%' }]} />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    opacity: 0.6,
  },
  scrollContent: {
    paddingHorizontal: 4,
  },
  kpiRow: {
    flexDirection: 'row',
    gap: 12,
  },
  kpiCard: {
    width: 160,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  kpiLabel: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    textAlign: 'center',
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  kpiChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  kpiChangeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  trendIndicator: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  trendFill: {
    height: '100%',
    borderRadius: 2,
  },
});