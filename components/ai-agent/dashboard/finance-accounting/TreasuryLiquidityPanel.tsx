import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Wallet, TrendingUp, TrendingDown, DollarSign, Activity, Zap, Clock, Building2, CreditCard } from 'lucide-react-native';

interface LiquidityMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface TreasuryLiquidityPanelProps {
  cashPosition: string;
  freeCashFlow: string;
  runway: string;
  liquidityRatio: number;
  burnRate: string;
  workingCapital: string;
  cashReserves: string;
  metrics: LiquidityMetric[];
}

export default function TreasuryLiquidityPanel({ 
  cashPosition, 
  freeCashFlow, 
  runway, 
  liquidityRatio, 
  burnRate, 
  workingCapital, 
  cashReserves,
  metrics 
}: TreasuryLiquidityPanelProps) {
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

  const getLiquidityColor = (ratio: number) => {
    if (ratio >= 2) return '#10B981';
    if (ratio >= 1.5) return '#3B82F6';
    if (ratio >= 1) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Wallet size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Treasury & Liquidity Command Panel
        </Text>
      </View>

      {/* Main Liquidity Metrics */}
      <View style={styles.mainMetrics}>
        <View style={[styles.mainMetricCard, { backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: '#3B82F6' }]}>
          <View style={styles.metricIcon}>
            <DollarSign size={24} color="#3B82F6" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Cash Position</Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>{cashPosition}</Text>
          <View style={styles.metricTrend}>
            <TrendingUp size={14} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>+5.8%</Text>
          </View>
        </View>

        <View style={[styles.mainMetricCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' }]}>
          <View style={styles.metricIcon}>
            <Activity size={24} color="#10B981" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Free Cash Flow</Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>{freeCashFlow}</Text>
          <View style={styles.metricTrend}>
            <TrendingUp size={14} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>+12.3%</Text>
          </View>
        </View>

        <View style={[styles.mainMetricCard, { backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: '#F59E0B' }]}>
          <View style={styles.metricIcon}>
            <Clock size={24} color="#F59E0B" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Runway</Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>{runway}</Text>
          <View style={styles.metricTrend}>
            <Activity size={14} color="#6B7280" />
            <Text style={[styles.trendText, { color: '#6B7280' }]}>Stable</Text>
          </View>
        </View>
      </View>

      {/* Liquidity Ratio Gauge */}
      <View style={[styles.ratioCard, { backgroundColor: theme.colors.background }]}>
        <View style={styles.ratioHeader}>
          <Text style={[styles.ratioTitle, { color: theme.colors.text }]}>Liquidity Ratio</Text>
          <Text style={[styles.ratioValue, { color: getLiquidityColor(liquidityRatio) }]}>
            {liquidityRatio.toFixed(1)}x
          </Text>
        </View>
        <View style={styles.ratioBar}>
          <View style={styles.ratioBarBackground}>
            <View 
              style={[
                styles.ratioBarFill, 
                { 
                  width: `${Math.min(liquidityRatio / 3 * 100, 100)}%`,
                  backgroundColor: getLiquidityColor(liquidityRatio)
                }
              ]} 
            />
          </View>
          <View style={styles.ratioMarkers}>
            <View style={styles.ratioMarker} />
            <View style={styles.ratioMarker} />
            <View style={styles.ratioMarker} />
          </View>
        </View>
        <Text style={[styles.ratioStatus, { color: theme.colors.textSecondary }]}>
          {liquidityRatio >= 2 ? 'Strong liquidity position' : liquidityRatio >= 1.5 ? 'Adequate liquidity' : 'Monitor closely'}
        </Text>
      </View>

      {/* Secondary Metrics */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.secondaryMetrics}>
          <View style={[styles.secondaryCard, { backgroundColor: theme.colors.background }]}>
            <Zap size={18} color="#EF4444" />
            <Text style={[styles.secondaryLabel, { color: theme.colors.textSecondary }]}>Burn Rate</Text>
            <Text style={[styles.secondaryValue, { color: theme.colors.text }]}>{burnRate}</Text>
          </View>

          <View style={[styles.secondaryCard, { backgroundColor: theme.colors.background }]}>
            <Building2 size={18} color="#3B82F6" />
            <Text style={[styles.secondaryLabel, { color: theme.colors.textSecondary }]}>Working Capital</Text>
            <Text style={[styles.secondaryValue, { color: theme.colors.text }]}>{workingCapital}</Text>
          </View>

          <View style={[styles.secondaryCard, { backgroundColor: theme.colors.background }]}>
            <CreditCard size={18} color="#10B981" />
            <Text style={[styles.secondaryLabel, { color: theme.colors.textSecondary }]}>Cash Reserves</Text>
            <Text style={[styles.secondaryValue, { color: theme.colors.text }]}>{cashReserves}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Cash Position Breakdown */}
      <View style={[styles.breakdownContainer, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.breakdownTitle, { color: theme.colors.text }]}>Cash Position Breakdown</Text>
        <View style={styles.breakdownRow}>
          <View style={styles.breakdownItem}>
            <View style={[styles.breakdownDot, { backgroundColor: '#3B82F6' }]} />
            <Text style={[styles.breakdownLabel, { color: theme.colors.textSecondary }]}>Operating Cash</Text>
            <Text style={[styles.breakdownValue, { color: theme.colors.text }]}>$12.4M</Text>
          </View>
          <View style={styles.breakdownItem}>
            <View style={[styles.breakdownDot, { backgroundColor: '#10B981' }]} />
            <Text style={[styles.breakdownLabel, { color: theme.colors.textSecondary }]}>Investment Cash</Text>
            <Text style={[styles.breakdownValue, { color: theme.colors.text }]}>$4.2M</Text>
          </View>
          <View style={styles.breakdownItem}>
            <View style={[styles.breakdownDot, { backgroundColor: '#F59E0B' }]} />
            <Text style={[styles.breakdownLabel, { color: theme.colors.textSecondary }]}>Reserve Cash</Text>
            <Text style={[styles.breakdownValue, { color: theme.colors.text }]}>$2.0M</Text>
          </View>
        </View>
      </View>
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
  mainMetrics: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  mainMetricCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  metricIcon: {
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
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
  ratioCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  ratioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratioTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  ratioValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  ratioBar: {
    marginBottom: 8,
  },
  ratioBarBackground: {
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  ratioBarFill: {
    height: 12,
    borderRadius: 6,
  },
  ratioMarkers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  ratioMarker: {
    width: 2,
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  ratioStatus: {
    fontSize: 12,
    textAlign: 'center',
  },
  secondaryMetrics: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  secondaryCard: {
    width: 120,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 8,
    marginBottom: 4,
  },
  secondaryValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  breakdownContainer: {
    padding: 16,
    borderRadius: 12,
  },
  breakdownTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  breakdownItem: {
    alignItems: 'center',
  },
  breakdownDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 6,
  },
  breakdownLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});
