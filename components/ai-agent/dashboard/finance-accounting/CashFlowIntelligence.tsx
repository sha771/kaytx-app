import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, TrendingDown, Wallet, Activity, Zap, Clock, DollarSign } from 'lucide-react-native';

interface CashFlowMetrics {
  cashInflows: string;
  cashOutflows: string;
  freeCashFlow: string;
  runway: string;
  liquidityRatio: number;
  burnRate: string;
}

interface CashFlowIntelligenceProps {
  metrics: CashFlowMetrics;
}

export default function CashFlowIntelligence({ metrics }: CashFlowIntelligenceProps) {
  const { theme } = useTheme();

  const formatCurrency = (value: string) => {
    return value;
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
        <Activity size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Cash Flow Intelligence
        </Text>
      </View>

      <View style={styles.cashFlowOverview}>
        <View style={[styles.flowCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' }]}>
          <View style={styles.flowIcon}>
            <TrendingUp size={20} color="#10B981" />
          </View>
          <Text style={[styles.flowLabel, { color: theme.colors.textSecondary }]}>
            Cash Inflows
          </Text>
          <Text style={[styles.flowValue, { color: '#10B981' }]}>
            {formatCurrency(metrics.cashInflows)}
          </Text>
          <Text style={[styles.flowSubtext, { color: theme.colors.textSecondary }]}>
            +18% vs last month
          </Text>
        </View>

        <View style={[styles.flowCard, { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#EF4444' }]}>
          <View style={styles.flowIcon}>
            <TrendingDown size={20} color="#EF4444" />
          </View>
          <Text style={[styles.flowLabel, { color: theme.colors.textSecondary }]}>
            Cash Outflows
          </Text>
          <Text style={[styles.flowValue, { color: '#EF4444' }]}>
            {formatCurrency(metrics.cashOutflows)}
          </Text>
          <Text style={[styles.flowSubtext, { color: theme.colors.textSecondary }]}>
            +5% vs last month
          </Text>
        </View>

        <View style={[styles.flowCard, { backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: '#3B82F6' }]}>
          <View style={styles.flowIcon}>
            <Wallet size={20} color="#3B82F6" />
          </View>
          <Text style={[styles.flowLabel, { color: theme.colors.textSecondary }]}>
            Free Cash Flow
          </Text>
          <Text style={[styles.flowValue, { color: '#3B82F6' }]}>
            {formatCurrency(metrics.freeCashFlow)}
          </Text>
          <Text style={[styles.flowSubtext, { color: theme.colors.textSecondary }]}>
            Strong positive flow
          </Text>
        </View>
      </View>

      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <View style={styles.metricHeader}>
            <Clock size={16} color="#8B5CF6" />
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
              Runway
            </Text>
          </View>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.runway}
          </Text>
          <View style={[styles.metricBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
            <View 
              style={[
                styles.metricFill, 
                { 
                  backgroundColor: '#8B5CF6',
                  width: '75%'
                }
              ]} 
            />
          </View>
          <Text style={[styles.metricSubtext, { color: theme.colors.textSecondary }]}>
            18 months of operations
          </Text>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.metricHeader}>
            <Activity size={16} color={getLiquidityColor(metrics.liquidityRatio)} />
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
              Liquidity Ratio
            </Text>
          </View>
          <Text style={[styles.metricValue, { color: getLiquidityColor(metrics.liquidityRatio) }]}>
            {metrics.liquidityRatio.toFixed(1)}x
          </Text>
          <View style={[styles.metricBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
            <View 
              style={[
                styles.metricFill, 
                { 
                  backgroundColor: getLiquidityColor(metrics.liquidityRatio),
                  width: `${Math.min(metrics.liquidityRatio * 25, 100)}%`
                }
              ]} 
            />
          </View>
          <Text style={[styles.metricSubtext, { color: theme.colors.textSecondary }]}>
            Healthy liquidity position
          </Text>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.metricHeader}>
            <Zap size={16} color="#F59E0B" />
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
              Burn Rate
            </Text>
          </View>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {formatCurrency(metrics.burnRate)}
          </Text>
          <View style={[styles.metricBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
            <View 
              style={[
                styles.metricFill, 
                { 
                  backgroundColor: '#F59E0B',
                  width: '45%'
                }
              ]} 
            />
          </View>
          <Text style={[styles.metricSubtext, { color: theme.colors.textSecondary }]}>
            Sustainable burn rate
          </Text>
        </View>
      </View>

      <View style={styles.treasuryOverview}>
        <Text style={[styles.treasuryTitle, { color: theme.colors.text }]}>
          Treasury Overview
        </Text>
        <View style={styles.treasuryGrid}>
          <View style={styles.treasuryItem}>
            <DollarSign size={14} color="#10B981" />
            <Text style={[styles.treasuryLabel, { color: theme.colors.textSecondary }]}>
              Cash Reserves
            </Text>
            <Text style={[styles.treasuryValue, { color: theme.colors.text }]}>
              $18.6M
            </Text>
          </View>
          <View style={styles.treasuryItem}>
            <Wallet size={14} color="#3B82F6" />
            <Text style={[styles.treasuryLabel, { color: theme.colors.textSecondary }]}>
              Investments
            </Text>
            <Text style={[styles.treasuryValue, { color: theme.colors.text }]}>
              $4.2M
            </Text>
          </View>
          <View style={styles.treasuryItem}>
            <Activity size={14} color="#8B5CF6" />
            <Text style={[styles.treasuryLabel, { color: theme.colors.textSecondary }]}>
              Credit Lines
            </Text>
            <Text style={[styles.treasuryValue, { color: theme.colors.text }]}>
              $10M
            </Text>
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
  cashFlowOverview: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  flowCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  flowIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  flowLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  flowValue: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  flowSubtext: {
    fontSize: 10,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  metricBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  metricFill: {
    height: '100%',
    borderRadius: 2,
  },
  metricSubtext: {
    fontSize: 10,
  },
  treasuryOverview: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  treasuryTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  treasuryGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  treasuryItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
  },
  treasuryLabel: {
    fontSize: 10,
    marginTop: 4,
    marginBottom: 2,
  },
  treasuryValue: {
    fontSize: 14,
    fontWeight: '700',
  }
});