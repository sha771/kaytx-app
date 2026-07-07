import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { 
  DollarSign, 
  TrendingUp, 
  ArrowLeft,
  Activity,
  PieChart,
  LineChart,
  BarChart3,
  Wallet,
  CreditCard,
  PiggyBank,
  ArrowUp,
  ArrowDown,
  Minus,
  Target,
  AlertTriangle
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface RevenueStream {
  id: string;
  name: string;
  amount: string;
  growth: string;
  margin: string;
  trend: 'up' | 'down' | 'stable';
}

interface FinancialMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
}

const revenueStreams: RevenueStream[] = [
  { id: '1', name: 'Product Sales', amount: '$18.4B', growth: '+15.2%', margin: '34.2%', trend: 'up' },
  { id: '2', name: 'Services', amount: '$6.8B', growth: '+12.8%', margin: '42.1%', trend: 'up' },
  { id: '3', name: 'Subscriptions', amount: '$2.4B', growth: '+28.5%', margin: '68.4%', trend: 'up' },
  { id: '4', name: 'Licensing', amount: '$0.8B', growth: '+8.3%', margin: '92.1%', trend: 'up' }
];

const financialMetrics: FinancialMetric[] = [
  { id: '1', label: 'Total Revenue', value: '$28.4B', change: '+12.5%', trend: 'up', icon: DollarSign, color: '#10B981' },
  { id: '2', label: 'Gross Margin', value: '42.8%', change: '+2.3%', trend: 'up', icon: Activity, color: '#3B82F6' },
  { id: '3', label: 'Operating Margin', value: '28.9%', change: '+1.8%', trend: 'up', icon: Target, color: '#8B5CF6' },
  { id: '4', label: 'Net Margin', value: '14.4%', change: '+1.2%', trend: 'up', icon: TrendingUp, color: '#06B6D4' },
  { id: '5', label: 'Cash Flow', value: '$3.8B', change: '+5.7%', trend: 'up', icon: Wallet, color: '#F59E0B' },
  { id: '6', label: 'Free Cash Flow', value: '$2.4B', change: '+8.2%', trend: 'up', icon: PiggyBank, color: '#EC4899' }
];

const costStructure = [
  { category: 'COGS', amount: '$16.2B', percentage: 57, trend: 'down' },
  { category: 'R&D', amount: '$4.8B', percentage: 17, trend: 'up' },
  { category: 'Sales & Marketing', amount: '$3.2B', percentage: 11, trend: 'stable' },
  { category: 'G&A', amount: '$2.8B', percentage: 10, trend: 'down' },
  { category: 'Other', amount: '$1.4B', percentage: 5, trend: 'stable' }
];

const forecasts = [
  { period: 'Q1 2026', revenue: '$7.2B', confidence: 94 },
  { period: 'Q2 2026', revenue: '$7.5B', confidence: 91 },
  { period: 'Q3 2026', revenue: '$7.8B', confidence: 88 },
  { period: 'Q4 2026', revenue: '$8.2B', confidence: 85 },
  { period: 'FY 2026', revenue: '$30.7B', confidence: 89 }
];

export default function FinancialIntelligence() {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'revenue' | 'costs' | 'forecasts'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'revenue', label: 'Revenue', icon: DollarSign },
    { id: 'costs', label: 'Cost Structure', icon: PieChart },
    { id: 'forecasts', label: 'Forecasts', icon: LineChart }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp size={14} color="#10B981" />;
      case 'down': return <ArrowDown size={14} color="#EF4444" />;
      default: return <Minus size={14} color="#6B7280" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return '#10B981';
      case 'down': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const MetricCard = ({ metric }: { metric: FinancialMetric }) => (
    <View style={[styles.metricCard, { backgroundColor: '#0A0F1A' }]}>
      <View style={[styles.metricIcon, { backgroundColor: `${metric.color}20` }]}>
        <metric.icon size={24} color={metric.color} />
      </View>
      <Text style={styles.metricLabel}>{metric.label}</Text>
      <Text style={[styles.metricValue, { color: metric.color }]}>{metric.value}</Text>
      <View style={styles.metricTrend}>
        {getTrendIcon(metric.trend)}
        <Text style={[styles.metricChange, { color: getTrendColor(metric.trend) }]}>
          {metric.change}
        </Text>
      </View>
    </View>
  );

  const RevenueCard =({ stream }: { stream: RevenueStream }) => (
    <View style={[styles.revenueCard, { backgroundColor: '#0A0F1A' }]}>
      <View style={styles.revenueHeader}>
        <Text style={styles.revenueName}>{stream.name}</Text>
        <View style={styles.revenueTrend}>
          {getTrendIcon(stream.trend)}
          <Text style={[styles.revenueGrowth, { color: getTrendColor(stream.trend) }]}>
            {stream.growth}
          </Text>
        </View>
      </View>
      <View style={styles.revenueMetrics}>
        <View>
          <Text style={styles.revenueMetricLabel}>Revenue</Text>
          <Text style={[styles.revenueMetricValue, { color: '#10B981' }]}>{stream.amount}</Text>
        </View>
        <View>
          <Text style={styles.revenueMetricLabel}>Margin</Text>
          <Text style={[styles.revenueMetricValue, { color: '#3B82F6' }]}>{stream.margin}</Text>
        </View>
      </View>
    </View>
  );

  const CostCard = ({ cost }: { cost: any }) => (
    <View style={[styles.costCard, { backgroundColor: '#0A0F1A' }]}>
      <View style={styles.costHeader}>
        <Text style={styles.costName}>{cost.category}</Text>
        <Text style={styles.costAmount}>{cost.amount}</Text>
      </View>
      <View style={styles.costProgress}>
        <View style={styles.costProgressBar}>
          <View style={[styles.costProgressFill, { width: `${cost.percentage}%`, backgroundColor: cost.trend === 'up' ? '#EF4444' : cost.trend === 'down' ? '#10B981' : '#3B82F6' }]} />
        </View>
        <Text style={styles.costPercentage}>{cost.percentage}%</Text>
      </View>
    </View>
  );

  const ForecastCard = ({ forecast }: { forecast: any }) => (
    <View style={[styles.forecastCard, { backgroundColor: '#0A0F1A' }]}>
      <Text style={styles.forecastPeriod}>{forecast.period}</Text>
      <Text style={[styles.forecastRevenue, { color: '#10B981' }]}>{forecast.revenue}</Text>
      <View style={styles.forecastConfidence}>
        <Target size={14} color="#9CA3AF" />
        <Text style={styles.forecastConfidenceText}>{forecast.confidence}% confidence</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#03050A' }]}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={[styles.header, { backgroundColor: '#0A0F1A' }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Financial Intelligence</Text>
          <Text style={styles.headerSubtitle}>Real-time Financial Analytics</Text>
        </View>
        <DollarSign size={20} color="#10B981" />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, selectedTab === tab.id && styles.tabActive]}
            onPress={() => setSelectedTab(tab.id as any)}
          >
            <tab.icon size={18} color={selectedTab === tab.id ? '#FFFFFF' : '#9CA3AF'} />
            <Text style={[styles.tabText, selectedTab === tab.id && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content}>
        {selectedTab === 'overview' && (
          <>
            <View style={styles.metricsSection}>
              <Text style={styles.sectionTitle}>Financial Metrics</Text>
              <View style={styles.metricsGrid}>
                {financialMetrics.map(metric => (
                  <MetricCard key={metric.id} metric={metric} />
                ))}
              </View>
            </View>

            <View style={[styles.summaryCard, { backgroundColor: '#0A0F1A' }]}>
              <Text style={styles.sectionTitle}>Financial Health</Text>
              <View style={styles.healthMetrics}>
                <View style={styles.healthItem}>
                  <Activity size={24} color="#10B981" />
                  <View style={styles.healthInfo}>
                    <Text style={styles.healthLabel}>Liquidity</Text>
                    <Text style={[styles.healthValue, { color: '#10B981' }]}>Strong</Text>
                  </View>
                </View>
                <View style={styles.healthItem}>
                  <TrendingUp size={24} color="#3B82F6" />
                  <View style={styles.healthInfo}>
                    <Text style={styles.healthLabel}>Profitability</Text>
                    <Text style={[styles.healthValue, { color: '#3B82F6' }]}>Excellent</Text>
                  </View>
                </View>
                <View style={styles.healthItem}>
                  <Shield size={24} color="#F59E0B" />
                  <View style={styles.healthInfo}>
                    <Text style={styles.healthLabel}>Solvency</Text>
                    <Text style={[styles.healthValue, { color: '#F59E0B' }]}>Healthy</Text>
                  </View>
                </View>
              </View>
            </View>
          </>
        )}

        {selectedTab === 'revenue' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Revenue Streams</Text>
            {revenueStreams.map(stream => (
              <RevenueCard key={stream.id} stream={stream} />
            ))}
            
            <View style={[styles.chartCard, { backgroundColor: '#0A0F1A' }]}>
              <Text style={styles.chartTitle}>Revenue Trend</Text>
              <View style={styles.chartPlaceholder}>
                <LineChart size={48} color="#10B981" />
                <Text style={styles.chartPlaceholderText}>Interactive Chart</Text>
              </View>
            </View>
          </View>
        )}

        {selectedTab === 'costs' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cost Structure</Text>
            {costStructure.map(cost => (
              <CostCard key={cost.category} cost={cost} />
            ))}
            
            <View style={[styles.chartCard, { backgroundColor: '#0A0F1A' }]}>
              <Text style={styles.chartTitle}>Cost Breakdown</Text>
              <View style={styles.chartPlaceholder}>
                <PieChart size={48} color="#3B82F6" />
                <Text style={styles.chartPlaceholderText}>Interactive Chart</Text>
              </View>
            </View>
          </View>
        )}

        {selectedTab === 'forecasts' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Revenue Forecasts</Text>
            {forecasts.map(forecast => (
              <ForecastCard key={forecast.period} forecast={forecast} />
            ))}
            
            <View style={[styles.chartCard, { backgroundColor: '#0A0F1A' }]}>
              <Text style={styles.chartTitle}>Forecast Model</Text>
              <View style={styles.chartPlaceholder}>
                <BarChart3 size={48} color="#8B5CF6" />
                <Text style={styles.chartPlaceholderText}>Interactive Chart</Text>
              </View>
            </View>

            <View style={[styles.scenarioCard, { backgroundColor: '#0A0F1A' }]}>
              <Text style={styles.sectionTitle}>Scenario Modeling</Text>
              <View style={styles.scenarioOptions}>
                <View style={[styles.scenarioOption, styles.scenarioOptionActive]}>
                  <Text style={styles.scenarioOptionText}>Base Case</Text>
                  <Text style={styles.scenarioOptionValue}>$30.7B</Text>
                </View>
                <View style={[styles.scenarioOption, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
                  <Text style={styles.scenarioOptionText}>Best Case</Text>
                  <Text style={[styles.scenarioOptionValue, { color: '#10B981' }]}>$34.2B</Text>
                </View>
                <View style={[styles.scenarioOption, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
                  <Text style={styles.scenarioOptionText}>Worst Case</Text>
                  <Text style={[styles.scenarioOptionValue, { color: '#EF4444' }]}>$27.4B</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#FFFFFF', letterSpacing: -0.5 },
  headerSubtitle: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  tabsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  tabActive: { backgroundColor: '#3B82F6' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#9CA3AF' },
  tabTextActive: { color: '#FFFFFF' },
  content: { flex: 1 },
  section: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginBottom: 16, letterSpacing: -0.5 },
  metricsSection: { padding: 20 },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: '48%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  summaryCard: {
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  healthMetrics: {
    gap: 16,
  },
  healthItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  healthInfo: {
    flex: 1,
  },
  healthLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  healthValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  revenueCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  revenueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  revenueName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  revenueTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  revenueGrowth: {
    fontSize: 13,
    fontWeight: '600',
  },
  revenueMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  revenueMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  revenueMetricValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  costCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  costHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  costName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  costAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  costProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  costProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  costProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  costPercentage: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  forecastCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  forecastPeriod: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  forecastRevenue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  forecastConfidence: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  forecastConfidenceText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  chartCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  chartTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  chartPlaceholder: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 12,
  },
  chartPlaceholderText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 12,
  },
  scenarioCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  scenarioOptions: {
    gap: 12,
  },
  scenarioOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  scenarioOptionActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  scenarioOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  scenarioOptionValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
