import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { TrendingUp, TrendingDown, DollarSign, Shield, Activity, AlertTriangle, Zap, BarChart3 } from 'lucide-react-native';

interface KPIItem {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: any;
}

interface ExecutiveKPIBarProps {
  kpis?: KPIItem[];
}

const defaultKPIs: KPIItem[] = [
  {
    label: 'Total AUM',
    value: '$48.2B',
    change: '+2.4%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    label: 'Daily PnL',
    value: '+$182M',
    change: '+1.8%',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    label: 'Portfolio Value',
    value: '$52.8B',
    change: '+0.9%',
    trend: 'up',
    icon: BarChart3,
  },
  {
    label: 'Liquidity Ratio',
    value: '1.24x',
    change: '+0.05',
    trend: 'up',
    icon: Activity,
  },
  {
    label: 'Credit Exposure',
    value: '$12.4B',
    change: '-0.3%',
    trend: 'down',
    icon: Shield,
  },
  {
    label: 'Sharpe Ratio',
    value: '2.84',
    change: '+0.12',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    label: 'Default Prob',
    value: '0.42%',
    change: '-0.08%',
    trend: 'down',
    icon: AlertTriangle,
  },
  {
    label: 'Fraud Prevented',
    value: '$620M',
    change: '+15.2%',
    trend: 'up',
    icon: Shield,
  },
  {
    label: 'VIX Index',
    value: '18.4',
    change: '+2.1%',
    trend: 'up',
    icon: AlertTriangle,
  },
  {
    label: 'AI Accuracy',
    value: '94.2%',
    change: '+1.4%',
    trend: 'up',
    icon: Zap,
  },
];

export default function ExecutiveKPIBar({ kpis = defaultKPIs }: ExecutiveKPIBarProps) {
  const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return '#10B981';
      case 'down': return '#EF4444';
      case 'neutral': return '#6B7280';
    }
  };

  const getChangePrefix = (trend: 'up' | 'down' | 'neutral', change: string) => {
    if (trend === 'neutral') return change;
    if (change.startsWith('+') || change.startsWith('-')) return change;
    return trend === 'up' ? `+${change}` : `-${change}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Executive Financial KPIs</Text>
        <View style={styles.liveIndicator}>
          <Activity size={10} color="#10B981" />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <View key={index} style={styles.kpiCard}>
              <View style={[styles.iconContainer, { backgroundColor: getTrendColor(kpi.trend) + '20' }]}>
                <Icon size={16} color={getTrendColor(kpi.trend)} />
              </View>
              <Text style={styles.kpiLabel}>{kpi.label}</Text>
              <Text style={styles.kpiValue}>{kpi.value}</Text>
              <View style={styles.changeRow}>
                {kpi.trend === 'up' ? (
                  <TrendingUp size={10} color={getTrendColor(kpi.trend)} />
                ) : kpi.trend === 'down' ? (
                  <TrendingDown size={10} color={getTrendColor(kpi.trend)} />
                ) : null}
                <Text style={[styles.changeText, { color: getTrendColor(kpi.trend) }]}>
                  {getChangePrefix(kpi.trend, kpi.change)}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#05070A',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: '#10B98120',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#10B981',
    gap: 4,
  },
  liveText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#10B981',
    letterSpacing: 0.5,
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  kpiCard: {
    backgroundColor: '#0A0F14',
    borderWidth: 1,
    borderColor: '#1F2937',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  kpiLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    marginBottom: 4,
    textAlign: 'center',
  },
  kpiValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
