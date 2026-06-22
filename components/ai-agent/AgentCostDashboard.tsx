import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Zap, 
  Clock, 
  BarChart3,
  PieChart,
  Activity,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  CheckCircle,
  XCircle
} from 'lucide-react-native';

interface CostDashboardProps {
  companyId: string;
  agentId?: string;
  departmentId?: string;
}

interface CostMetrics {
  totalCost: number;
  tokenCost: number;
  computeCost: number;
  storageCost: number;
  networkCost: number;
  period: 'hourly' | 'daily' | 'weekly' | 'monthly';
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
}

interface TokenMetrics {
  totalTokens: number;
  inputTokens: number;
  outputTokens: number;
  cachedTokens: number;
  averageTokensPerRequest: number;
  cacheHitRate: number;
  estimatedCost: number;
}

interface BudgetStatus {
  monthlyLimit: number;
  currentUsage: number;
  remaining: number;
  percentageUsed: number;
  status: 'healthy' | 'warning' | 'critical';
}

export const AgentCostDashboard: React.FC<CostDashboardProps> = ({ 
  companyId, 
  agentId, 
  departmentId 
}) => {
  const { theme } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState<'hourly' | 'daily' | 'weekly' | 'monthly'>('daily');
  const [costMetrics, setCostMetrics] = useState<CostMetrics | null>(null);
  const [tokenMetrics, setTokenMetrics] = useState<TokenMetrics | null>(null);
  const [budgetStatus, setBudgetStatus] = useState<BudgetStatus | null>(null);

  // Mock data - replace with actual API calls
  useEffect(() => {
    setCostMetrics({
      totalCost: 1247.50,
      tokenCost: 890.30,
      computeCost: 245.20,
      storageCost: 78.50,
      networkCost: 33.50,
      period: selectedPeriod,
      trend: 'up',
      trendPercentage: 12.5,
    });

    setTokenMetrics({
      totalTokens: 2450000,
      inputTokens: 1450000,
      outputTokens: 1000000,
      cachedTokens: 245000,
      averageTokensPerRequest: 1250,
      cacheHitRate: 10,
      estimatedCost: 890.30,
    });

    setBudgetStatus({
      monthlyLimit: 5000,
      currentUsage: 1247.50,
      remaining: 3752.50,
      percentageUsed: 24.95,
      status: 'healthy',
    });
  }, [selectedPeriod, companyId, agentId, departmentId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return '#34C759';
      case 'warning': return '#FF9500';
      case 'critical': return '#FF3B30';
      default: return '#8E8E93';
    }
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const formatTokens = (tokens: number) => {
    if (tokens >= 1000000) {
      return `${(tokens / 1000000).toFixed(1)}M`;
    } else if (tokens >= 1000) {
      return `${(tokens / 1000).toFixed(1)}K`;
    }
    return tokens.toString();
  };

  const periods = [
    { value: 'hourly', label: 'Hour' },
    { value: 'daily', label: 'Day' },
    { value: 'weekly', label: 'Week' },
    { value: 'monthly', label: 'Month' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Period Selector */}
      <View style={styles.periodSelector}>
        {periods.map((period) => (
          <TouchableOpacity
            key={period.value}
            style={[
              styles.periodButton,
              selectedPeriod === period.value && { backgroundColor: theme.colors.primary }
            ]}
            onPress={() => setSelectedPeriod(period.value as any)}
          >
            <Text style={[
              styles.periodButtonText,
              { color: selectedPeriod === period.value ? '#fff' : theme.colors.secondaryText }
            ]}>
              {period.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Budget Status Card */}
      {budgetStatus && (
        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleRow}>
              <DollarSign size={20} color={getStatusColor(budgetStatus.status)} />
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Budget Status</Text>
            </View>
            <View style={[
              styles.statusBadge, 
              { backgroundColor: `${getStatusColor(budgetStatus.status)}20` }
            ]}>
              <Text style={[styles.statusText, { color: getStatusColor(budgetStatus.status) }]}>
                {budgetStatus.status.toUpperCase()}
              </Text>
            </View>
          </View>
          
          <View style={styles.budgetProgress}>
            <View style={styles.budgetLabels}>
              <Text style={[styles.budgetLabel, { color: theme.colors.secondaryText }]}>
                {formatCurrency(budgetStatus.currentUsage)} of {formatCurrency(budgetStatus.monthlyLimit)}
              </Text>
              <Text style={[styles.budgetPercentage, { color: theme.colors.text }]}>
                {budgetStatus.percentageUsed.toFixed(1)}%
              </Text>
            </View>
            <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    backgroundColor: getStatusColor(budgetStatus.status),
                    width: `${budgetStatus.percentageUsed}%` 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.budgetRemaining, { color: theme.colors.secondaryText }]}>
              {formatCurrency(budgetStatus.remaining)} remaining this month
            </Text>
          </View>
        </View>
      )}

      {/* Cost Breakdown */}
      {costMetrics && (
        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleRow}>
              <BarChart3 size={20} color="#007AFF" />
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Cost Breakdown</Text>
            </View>
            <View style={styles.trendBadge}>
              {costMetrics.trend === 'up' ? (
                <ArrowUpRight size={14} color="#FF3B30" />
              ) : costMetrics.trend === 'down' ? (
                <ArrowDownRight size={14} color="#34C759" />
              ) : (
                <Activity size={14} color="#FF9500" />
              )}
              <Text style={[
                styles.trendText, 
                { color: costMetrics.trend === 'up' ? '#FF3B30' : costMetrics.trend === 'down' ? '#34C759' : '#FF9500' }
              ]}>
                {costMetrics.trendPercentage}%
              </Text>
            </View>
          </View>

          <View style={styles.costGrid}>
            <View style={styles.costItem}>
              <Text style={[styles.costValue, { color: theme.colors.text }]}>
                {formatCurrency(costMetrics.totalCost)}
              </Text>
              <Text style={[styles.costLabel, { color: theme.colors.secondaryText }]}>Total Cost</Text>
            </View>
            
            <View style={styles.costDivider} />
            
            <View style={styles.costItem}>
              <Text style={[styles.costValue, { color: '#5856D6' }]}>
                {formatCurrency(costMetrics.tokenCost)}
              </Text>
              <Text style={[styles.costLabel, { color: theme.colors.secondaryText }]}>Token Cost</Text>
            </View>
            
            <View style={styles.costDivider} />
            
            <View style={styles.costItem}>
              <Text style={[styles.costValue, { color: '#007AFF' }]}>
                {formatCurrency(costMetrics.computeCost)}
              </Text>
              <Text style={[styles.costLabel, { color: theme.colors.secondaryText }]}>Compute</Text>
            </View>
          </View>

          <View style={styles.detailedCosts}>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Activity size={16} color="#34C759" />
                <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Storage</Text>
              </View>
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                {formatCurrency(costMetrics.storageCost)}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Zap size={16} color="#FF9500" />
                <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Network</Text>
              </View>
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                {formatCurrency(costMetrics.networkCost)}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Token Usage */}
      {tokenMetrics && (
        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleRow}>
              <Target size={20} color="#5856D6" />
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Token Usage</Text>
            </View>
            <Text style={[styles.estimatedCost, { color: theme.colors.secondaryText }]}>
              Est. Cost: {formatCurrency(tokenMetrics.estimatedCost)}
            </Text>
          </View>

          <View style={styles.tokenGrid}>
            <View style={styles.tokenItem}>
              <Text style={[styles.tokenValue, { color: theme.colors.text }]}>
                {formatTokens(tokenMetrics.totalTokens)}
              </Text>
              <Text style={[styles.tokenLabel, { color: theme.colors.secondaryText }]}>Total Tokens</Text>
            </View>
            
            <View style={styles.tokenItem}>
              <Text style={[styles.tokenValue, { color: '#007AFF' }]}>
                {formatTokens(tokenMetrics.inputTokens)}
              </Text>
              <Text style={[styles.tokenLabel, { color: theme.colors.secondaryText }]}>Input</Text>
            </View>
            
            <View style={styles.tokenItem}>
              <Text style={[styles.tokenValue, { color: '#5856D6' }]}>
                {formatTokens(tokenMetrics.outputTokens)}
              </Text>
              <Text style={[styles.tokenLabel, { color: theme.colors.secondaryText }]}>Output</Text>
            </View>
            
            <View style={styles.tokenItem}>
              <Text style={[styles.tokenValue, { color: '#34C759' }]}>
                {formatTokens(tokenMetrics.cachedTokens)}
              </Text>
              <Text style={[styles.tokenLabel, { color: theme.colors.secondaryText }]}>Cached</Text>
            </View>
          </View>

          <View style={styles.tokenMetrics}>
            <View style={styles.metricRow}>
              <View style={styles.metricItem}>
                <Clock size={16} color="#FF9500" />
                <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>
                  Avg per Request
                </Text>
              </View>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                {formatTokens(tokenMetrics.averageTokensPerRequest)}
              </Text>
            </View>
            <View style={styles.metricRow}>
              <View style={styles.metricItem}>
                <PieChart size={16} color="#34C759" />
                <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>
                  Cache Hit Rate
                </Text>
              </View>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                {tokenMetrics.cacheHitRate.toFixed(1)}%
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Cost Optimization Tips */}
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleRow}>
            <Info size={20} color="#007AFF" />
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Optimization Tips</Text>
          </View>
        </View>

        <View style={styles.tipsList}>
          <View style={styles.tipItem}>
            <CheckCircle size={16} color="#34C759" />
            <Text style={[styles.tipText, { color: theme.colors.text }]}>
              Enable response caching to reduce token costs by up to 20%
            </Text>
          </View>
          <View style={styles.tipItem}>
            <CheckCircle size={16} color="#34C759" />
            <Text style={[styles.tipText, { color: theme.colors.text }]}>
              Optimize prompts to reduce average token usage per request
            </Text>
          </View>
          <View style={styles.tipItem}>
            <AlertTriangle size={16} color="#FF9500" />
            <Text style={[styles.tipText, { color: theme.colors.text }]}>
              Consider deactivating low-usage agents during off-peak hours
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  periodSelector: {
    flexDirection: 'row',
    margin: 16,
    marginBottom: 8,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  periodButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  card: {
    margin: 16,
    marginTop: 8,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  estimatedCost: {
    fontSize: 13,
  },
  budgetProgress: {
    gap: 8,
  },
  budgetLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  budgetLabel: {
    fontSize: 14,
  },
  budgetPercentage: {
    fontSize: 18,
    fontWeight: '700',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  budgetRemaining: {
    fontSize: 12,
    textAlign: 'center',
  },
  costGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  costItem: {
    flex: 1,
    alignItems: 'center',
  },
  costValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  costLabel: {
    fontSize: 12,
  },
  costDivider: {
    width: 1,
    backgroundColor: '#E5E5EA',
  },
  detailedCosts: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  tokenGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  tokenItem: {
    flex: 1,
    alignItems: 'center',
  },
  tokenValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  tokenLabel: {
    fontSize: 11,
  },
  tokenMetrics: {
    gap: 12,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricLabel: {
    fontSize: 14,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});
