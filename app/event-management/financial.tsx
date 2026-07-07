import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  DollarSign, TrendingUp, ArrowRight, BarChart3, PieChart, Target,
  Wallet, CreditCard, AlertTriangle, CheckCircle, Activity, Calendar, Download
} from 'lucide-react-native';

export default function FinancialCommandCenter() {
  const router = useRouter();

  const FINANCIAL_STATS = [
    { label: 'Total Revenue', value: '$7.2B', icon: DollarSign, color: '#10B981', trend: '+22%' },
    { label: 'Total Expenses', value: '$4.8B', icon: Wallet, color: '#F59E0B', trend: '+8%' },
    { label: 'Net Profit', value: '$2.4B', icon: Target, color: '#06B6D4', trend: '+35%' },
    { label: 'Profit Margin', value: '33%', icon: TrendingUp, color: '#8B5CF6', trend: '+12%' },
  ];

  const REVENUE_STREAMS = [
    { stream: 'Ticket Sales', amount: '$5.8B', percentage: 81, color: '#06B6D4' },
    { stream: 'Sponsorship', amount: '$920M', percentage: 13, color: '#FFD700' },
    { stream: 'Merchandise', amount: '$340M', percentage: 5, color: '#8B5CF6' },
    { stream: 'Vendor Fees', amount: '$140M', percentage: 1, color: '#10B981' },
  ];

  const EXPENSE_CATEGORIES = [
    { category: 'Venue Costs', amount: '$1.8B', budget: '$2.0B', variance: '-10%', color: '#10B981' },
    { category: 'Staffing', amount: '$1.2B', budget: '$1.1B', variance: '+9%', color: '#F59E0B' },
    { category: 'Equipment', amount: '$890M', budget: '$850M', variance: '+5%', color: '#F59E0B' },
    { category: 'Marketing', amount: '$620M', budget: '$600M', variance: '+3%', color: '#F59E0B' },
    { category: 'Operations', amount: '$290M', budget: '$300M', variance: '-3%', color: '#10B981' },
  ];

  const BUDGET_PERFORMANCE = [
    { event: 'Tech Summit 2026', budget: '$2.4M', spent: '$1.8M', remaining: '$600K', status: 'on-track' },
    { event: 'Global Music Festival', budget: '$8.7M', spent: '$5.4M', remaining: '$3.3M', status: 'on-track' },
    { event: 'AI Innovation Conference', budget: '$1.8M', spent: '$890K', remaining: '$910K', status: 'on-track' },
    { event: 'Corporate Summit', budget: '$3.2M', spent: '$3.5M', remaining: '-$300K', status: 'over-budget' },
  ];

  const FORECASTS = [
    { period: 'Q3 2026', projected: '$2.1B', actual: '$1.8B', variance: '-14%', confidence: 87 },
    { period: 'Q4 2026', projected: '$2.8B', actual: '$0', variance: 'N/A', confidence: 92 },
    { period: 'Q1 2027', projected: '$3.2B', actual: '$0', variance: 'N/A', confidence: 85 },
    { period: 'Q2 2027', projected: '$3.8B', actual: '$0', variance: 'N/A', confidence: 78 },
  ];

  const RECENT_TRANSACTIONS = [
    { type: 'revenue', description: 'Ticket Sales - Tech Summit', amount: '$890K', time: '2s ago', icon: DollarSign, color: '#10B981' },
    { type: 'expense', description: 'Venue Payment - Moscone Center', amount: '-$240K', time: '5s ago', icon: CreditCard, color: '#EF4444' },
    { type: 'revenue', description: 'Sponsorship - TechCorp', amount: '$1.2M', time: '12s ago', icon: DollarSign, color: '#10B981' },
    { type: 'expense', description: 'Staffing - Security Services', amount: '-$85K', time: '24s ago', icon: Wallet, color: '#EF4444' },
    { type: 'revenue', description: 'Merchandise Sales', amount: '$124K', time: '31s ago', icon: DollarSign, color: '#10B981' },
  ];

  const REVENUE_ANALYTICS = [
    { metric: 'Monthly Recurring Revenue', value: '$890M', target: '$950M', color: '#10B981' },
    { metric: 'Annual Recurring Revenue', value: '$10.7B', target: '$11.4B', color: '#06B6D4' },
    { metric: 'Avg Revenue Per Event', value: '$2.4M', target: '$2.8M', color: '#8B5CF6' },
    { metric: 'Revenue Growth Rate', value: '22%', target: '25%', color: '#F59E0B' },
  ];

  const CASH_FLOW = [
    { period: 'This Month', inflow: '$2.4B', outflow: '$1.8B', net: '$600M', color: '#10B981' },
    { period: 'Last Month', inflow: '$2.1B', outflow: '$1.6B', net: '$500M', color: '#06B6D4' },
    { period: 'This Quarter', inflow: '$6.8B', outflow: '$5.2B', net: '$1.6B', color: '#8B5CF6' },
    { period: 'This Year', inflow: '$24.5B', outflow: '$18.2B', net: '$6.3B', color: '#F59E0B' },
  ];

  const PROFIT_TRENDS = [
    { period: 'Q1 2026', revenue: '$1.8B', expenses: '$1.2B', profit: '$600M', margin: '33%', color: '#06B6D4' },
    { period: 'Q2 2026', revenue: '$2.1B', expenses: '$1.4B', profit: '$700M', margin: '33%', color: '#8B5CF6' },
    { period: 'Q3 2026', revenue: '$1.8B', expenses: '$1.1B', profit: '$700M', margin: '39%', color: '#10B981' },
    { period: 'Q4 2026 (Proj)', revenue: '$2.8B', expenses: '$1.8B', profit: '$1.0B', margin: '36%', color: '#F59E0B' },
  ];

  const FINANCIAL_HEALTH = [
    { indicator: 'Liquidity Ratio', value: '2.4', status: 'healthy', color: '#10B981' },
    { indicator: 'Debt-to-Equity', value: '0.35', status: 'healthy', color: '#10B981' },
    { indicator: 'Operating Margin', value: '33%', status: 'healthy', color: '#10B981' },
    { indicator: 'Cash Burn Rate', value: '$120M/mo', status: 'optimal', color: '#06B6D4' },
  ];

  const ADVANCED_FORECASTS = [
    { period: 'Q4 2026', conservative: '$2.4B', expected: '$2.8B', optimistic: '$3.2B', confidence: 92, trend: 'up' },
    { period: 'Q1 2027', conservative: '$2.8B', expected: '$3.2B', optimistic: '$3.6B', confidence: 85, trend: 'up' },
    { period: 'Q2 2027', conservative: '$3.2B', expected: '$3.8B', optimistic: '$4.4B', confidence: 78, trend: 'up' },
    { period: 'Q3 2027', conservative: '$3.6B', expected: '$4.2B', optimistic: '$4.8B', confidence: 72, trend: 'up' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return '#10B981';
      case 'over-budget': return '#EF4444';
      case 'at-risk': return '#F59E0B';
      default: return '#06B6D4';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <DollarSign size={48} color="#10B981" />
        </View>
        <View>
          <Text style={styles.headerTitle}>Financial Command Center</Text>
          <Text style={styles.headerSubtitle}>Revenue & Budget Management</Text>
        </View>
      </View>

      {/* Financial Stats */}
      <View style={styles.statsContainer}>
        {FINANCIAL_STATS.map((stat, index) => (
          <View key={index} style={[styles.statCard, { borderColor: stat.color + '40' }]}>
            <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
              <stat.icon size={24} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <View style={[styles.trendBadge, { backgroundColor: stat.color + '20' }]}>
              <TrendingUp size={10} color={stat.color} />
              <Text style={[styles.trendText, { color: stat.color }]}>{stat.trend}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Revenue Analytics Dashboard */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Revenue Analytics Dashboard</Text>
        <View style={styles.analyticsGrid}>
          {REVENUE_ANALYTICS.map((metric, index) => (
            <View key={index} style={[styles.analyticsCard, { borderColor: metric.color + '40' }]}>
              <Text style={styles.analyticsValue}>{metric.value}</Text>
              <Text style={styles.analyticsMetric}>{metric.metric}</Text>
              <Text style={styles.analyticsTarget}>Target: {metric.target}</Text>
              <View style={[styles.analyticsIndicator, { backgroundColor: metric.color + '20' }]}>
                <TrendingUp size={10} color={metric.color} />
                <Text style={[styles.analyticsIndicatorText, { color: metric.color }]}>On Track</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Cash Flow */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cash Flow Analysis</Text>
        <Text style={styles.sectionDescription}>Inflow, outflow, and net cash position</Text>
        {CASH_FLOW.map((flow, index) => (
          <View key={index} style={styles.cashFlowCard}>
            <View style={styles.cashFlowHeader}>
              <Text style={styles.cashFlowPeriod}>{flow.period}</Text>
              <View style={[styles.cashFlowNet, { backgroundColor: flow.color + '20' }]}>
                <Text style={[styles.cashFlowNetValue, { color: flow.color }]}>{flow.net}</Text>
                <Text style={styles.cashFlowNetLabel}>Net</Text>
              </View>
            </View>
            <View style={styles.cashFlowMetrics}>
              <View style={styles.cashFlowMetric}>
                <Text style={styles.cashFlowMetricLabel}>Inflow</Text>
                <Text style={[styles.cashFlowMetricValue, { color: '#10B981' }]}>{flow.inflow}</Text>
              </View>
              <View style={styles.cashFlowMetric}>
                <Text style={styles.cashFlowMetricLabel}>Outflow</Text>
                <Text style={[styles.cashFlowMetricValue, { color: '#EF4444' }]}>{flow.outflow}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Profit Trends */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profit Margin Trends</Text>
        <Text style={styles.sectionDescription}>Quarterly revenue, expenses, and profit analysis</Text>
        {PROFIT_TRENDS.map((trend, index) => (
          <View key={index} style={styles.profitTrendCard}>
            <View style={styles.profitTrendHeader}>
              <Text style={styles.profitTrendPeriod}>{trend.period}</Text>
              <View style={[styles.profitTrendMargin, { backgroundColor: trend.color + '20' }]}>
                <Text style={[styles.profitTrendMarginValue, { color: trend.color }]}>{trend.margin}</Text>
                <Text style={styles.profitTrendMarginLabel}>Margin</Text>
              </View>
            </View>
            <View style={styles.profitTrendMetrics}>
              <View style={styles.profitTrendMetric}>
                <Text style={styles.profitTrendMetricLabel}>Revenue</Text>
                <Text style={styles.profitTrendMetricValue}>{trend.revenue}</Text>
              </View>
              <View style={styles.profitTrendMetric}>
                <Text style={styles.profitTrendMetricLabel}>Expenses</Text>
                <Text style={styles.profitTrendMetricValue}>{trend.expenses}</Text>
              </View>
              <View style={styles.profitTrendMetric}>
                <Text style={styles.profitTrendMetricLabel}>Profit</Text>
                <Text style={[styles.profitTrendMetricValue, { color: '#10B981' }]}>{trend.profit}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Financial Health */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Financial Health Indicators</Text>
        <View style={styles.healthGrid}>
          {FINANCIAL_HEALTH.map((health, index) => (
            <View key={index} style={[styles.healthCard, { borderColor: health.color + '40' }]}>
              <Text style={styles.healthValue}>{health.value}</Text>
              <Text style={styles.healthIndicator}>{health.indicator}</Text>
              <View style={[styles.healthStatus, { backgroundColor: health.color + '20' }]}>
                <CheckCircle size={10} color={health.color} />
                <Text style={[styles.healthStatusText, { color: health.color }]}>{health.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Advanced Forecasts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Advanced Revenue Forecasts</Text>
        <Text style={styles.sectionDescription}>Multi-scenario forecasting with confidence intervals</Text>
        {ADVANCED_FORECASTS.map((forecast, index) => (
          <View key={index} style={styles.advancedForecastCard}>
            <View style={styles.advancedForecastHeader}>
              <Text style={styles.advancedForecastPeriod}>{forecast.period}</Text>
              <View style={styles.advancedForecastConfidence}>
                <Text style={styles.advancedForecastConfidenceLabel}>Confidence</Text>
                <Text style={styles.advancedForecastConfidenceValue}>{forecast.confidence}%</Text>
              </View>
            </View>
            <View style={styles.advancedForecastScenarios}>
              <View style={styles.advancedForecastScenario}>
                <Text style={styles.advancedForecastScenarioLabel}>Conservative</Text>
                <Text style={styles.advancedForecastScenarioValue}>{forecast.conservative}</Text>
              </View>
              <View style={styles.advancedForecastScenario}>
                <Text style={[styles.advancedForecastScenarioLabel, { color: '#06B6D4' }]}>Expected</Text>
                <Text style={[styles.advancedForecastScenarioValue, { color: '#06B6D4', fontWeight: 'bold' }]}>{forecast.expected}</Text>
              </View>
              <View style={styles.advancedForecastScenario}>
                <Text style={styles.advancedForecastScenarioLabel}>Optimistic</Text>
                <Text style={styles.advancedForecastScenarioValue}>{forecast.optimistic}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Revenue Streams */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Revenue Streams</Text>
        {REVENUE_STREAMS.map((revenue, index) => (
          <View key={index} style={styles.revenueCard}>
            <View style={styles.revenueHeader}>
              <Text style={styles.revenueStream}>{revenue.stream}</Text>
              <Text style={styles.revenueAmount}>{revenue.amount}</Text>
            </View>
            <View style={styles.revenueBar}>
              <View 
                style={[
                  styles.revenueFill, 
                  { 
                    width: `${revenue.percentage}%`,
                    backgroundColor: revenue.color
                  } 
                ]} 
              />
            </View>
            <Text style={styles.revenuePercentage}>{revenue.percentage}% of total</Text>
          </View>
        ))}
      </View>

      {/* Expense Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Expense Categories</Text>
        {EXPENSE_CATEGORIES.map((expense, index) => (
          <View key={index} style={styles.expenseCard}>
            <View style={styles.expenseHeader}>
              <Text style={styles.expenseCategory}>{expense.category}</Text>
              <View style={[styles.expenseVariance, { backgroundColor: expense.variance.startsWith('-') ? '#10B98120' : '#F59E0B20' }]}>
                <Text style={[styles.expenseVarianceText, { color: expense.variance.startsWith('-') ? '#10B981' : '#F59E0B' }]}>{expense.variance}</Text>
              </View>
            </View>
            <View style={styles.expenseAmounts}>
              <View style={styles.expenseAmount}>
                <Text style={styles.expenseAmountLabel}>Spent</Text>
                <Text style={styles.expenseAmountValue}>{expense.amount}</Text>
              </View>
              <View style={styles.expenseAmount}>
                <Text style={styles.expenseAmountLabel}>Budget</Text>
                <Text style={styles.expenseAmountValue}>{expense.budget}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Budget Performance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Budget Performance</Text>
        {BUDGET_PERFORMANCE.map((budget, index) => (
          <View key={index} style={[styles.budgetCard, { borderColor: getStatusColor(budget.status) + '40' }]}>
            <View style={styles.budgetHeader}>
              <Text style={styles.budgetEvent}>{budget.event}</Text>
              <View style={[styles.budgetStatus, { backgroundColor: getStatusColor(budget.status) + '20' }]}>
                <Activity size={12} color={getStatusColor(budget.status)} />
                <Text style={[styles.budgetStatusText, { color: getStatusColor(budget.status) }]}>{budget.status}</Text>
              </View>
            </View>
            <View style={styles.budgetProgress}>
              <View style={styles.budgetProgressHeader}>
                <Text style={styles.budgetProgressLabel}>Budget Used</Text>
                <Text style={styles.budgetProgressValue}>{Math.round((parseFloat(budget.spent.replace(/[$,]/g, '')) / parseFloat(budget.budget.replace(/[$,]/g, ''))) * 100)}%</Text>
              </View>
              <View style={styles.budgetProgressBar}>
                <View 
                  style={[
                    styles.budgetProgressFill, 
                    { 
                      width: `${(parseFloat(budget.spent.replace(/[$,]/g, '')) / parseFloat(budget.budget.replace(/[$,]/g, ''))) * 100}%`,
                      backgroundColor: getStatusColor(budget.status)
                    } 
                  ]} 
                />
              </View>
            </View>
            <View style={styles.budgetDetails}>
              <View style={styles.budgetDetail}>
                <Text style={styles.budgetDetailLabel}>Budget</Text>
                <Text style={styles.budgetDetailValue}>{budget.budget}</Text>
              </View>
              <View style={styles.budgetDetail}>
                <Text style={styles.budgetDetailLabel}>Spent</Text>
                <Text style={styles.budgetDetailValue}>{budget.spent}</Text>
              </View>
              <View style={styles.budgetDetail}>
                <Text style={styles.budgetDetailLabel}>Remaining</Text>
                <Text style={[styles.budgetDetailValue, { color: budget.remaining.startsWith('-') ? '#EF4444' : '#10B981' }]}>{budget.remaining}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Forecasts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Revenue Forecasts</Text>
        {FORECASTS.map((forecast, index) => (
          <View key={index} style={styles.forecastCard}>
            <View style={styles.forecastHeader}>
              <Calendar size={16} color="#9CA3AF" />
              <Text style={styles.forecastPeriod}>{forecast.period}</Text>
            </View>
            <View style={styles.forecastStats}>
              <View style={styles.forecastStat}>
                <Text style={styles.forecastStatLabel}>Projected</Text>
                <Text style={styles.forecastStatValue}>{forecast.projected}</Text>
              </View>
              <View style={styles.forecastStat}>
                <Text style={styles.forecastStatLabel}>Actual</Text>
                <Text style={styles.forecastStatValue}>{forecast.actual}</Text>
              </View>
              <View style={styles.forecastStat}>
                <Text style={styles.forecastStatLabel}>Variance</Text>
                <Text style={[styles.forecastStatValue, { color: forecast.variance.startsWith('-') ? '#EF4444' : forecast.variance === 'N/A' ? '#9CA3AF' : '#10B981' }]}>{forecast.variance}</Text>
              </View>
              <View style={styles.forecastStat}>
                <Text style={styles.forecastStatLabel}>Confidence</Text>
                <Text style={styles.forecastStatValue}>{forecast.confidence}%</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <View style={styles.transactionsList}>
          {RECENT_TRANSACTIONS.map((txn, index) => (
            <View key={index} style={styles.transactionItem}>
              <View style={[styles.transactionIcon, { backgroundColor: txn.color + '20' }]}>
                <txn.icon size={16} color={txn.color} />
              </View>
              <View style={styles.transactionContent}>
                <Text style={styles.transactionDescription}>{txn.description}</Text>
                <Text style={styles.transactionTime}>{txn.time}</Text>
              </View>
              <Text style={[styles.transactionAmount, { color: txn.color }]}>{txn.amount}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#10B98115', borderColor: '#10B98140' }]}
          >
            <Download size={24} color="#10B981" />
            <Text style={[styles.actionText, { color: '#10B981' }]}>Export Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#06B6D415', borderColor: '#06B6D440' }]}
          >
            <BarChart3 size={24} color="#06B6D4" />
            <Text style={[styles.actionText, { color: '#06B6D4' }]}>Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#8B5CF615', borderColor: '#8B5CF640' }]}
          >
            <Target size={24} color="#8B5CF6" />
            <Text style={[styles.actionText, { color: '#8B5CF6' }]}>Forecast</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#F59E0B15', borderColor: '#F59E0B40' }]}
          >
            <Wallet size={24} color="#F59E0B" />
            <Text style={[styles.actionText, { color: '#F59E0B' }]}>Budget</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03050A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#10B98140',
    gap: 16,
  },
  headerIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#10B98120',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '600',
  },
  section: {
    padding: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  revenueCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  revenueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  revenueStream: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  revenueAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  revenueBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  revenueFill: {
    height: '100%',
    borderRadius: 4,
  },
  revenuePercentage: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  expenseCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  expenseCategory: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  expenseVariance: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  expenseVarianceText: {
    fontSize: 12,
    fontWeight: '600',
  },
  expenseAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  expenseAmount: {
    alignItems: 'center',
  },
  expenseAmountLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  expenseAmountValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  budgetCard: {
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  budgetEvent: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  budgetStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 6,
  },
  budgetStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  budgetProgress: {
    marginBottom: 12,
  },
  budgetProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  budgetProgressLabel: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  budgetProgressValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  budgetProgressBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
  },
  budgetProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  budgetDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  budgetDetail: {
    alignItems: 'center',
  },
  budgetDetailLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  budgetDetailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  forecastCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  forecastHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  forecastPeriod: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  forecastStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  forecastStat: {
    alignItems: 'center',
  },
  forecastStatLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  forecastStatValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  transactionsList: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    overflow: 'hidden',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
    gap: 12,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionContent: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  transactionTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  actionsSection: {
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    minWidth: 140,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  analyticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  analyticsCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  analyticsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  analyticsMetric: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  analyticsTarget: {
    fontSize: 10,
    color: '#6B7280',
  },
  analyticsIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  analyticsIndicatorText: {
    fontSize: 11,
    fontWeight: '600',
  },
  cashFlowCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cashFlowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cashFlowPeriod: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cashFlowNet: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  cashFlowNetValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cashFlowNetLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  cashFlowMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cashFlowMetric: {
    alignItems: 'center',
  },
  cashFlowMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  cashFlowMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profitTrendCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  profitTrendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  profitTrendPeriod: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  profitTrendMargin: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  profitTrendMarginValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  profitTrendMarginLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  profitTrendMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  profitTrendMetric: {
    alignItems: 'center',
  },
  profitTrendMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  profitTrendMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  healthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  healthCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  healthValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  healthIndicator: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  healthStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  healthStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  advancedForecastCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  advancedForecastHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  advancedForecastPeriod: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  advancedForecastConfidence: {
    alignItems: 'flex-end',
  },
  advancedForecastConfidenceLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  advancedForecastConfidenceValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  advancedForecastScenarios: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  advancedForecastScenario: {
    alignItems: 'center',
  },
  advancedForecastScenarioLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  advancedForecastScenarioValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
