/**
 * =============================================================================
 * CHIEF RETAIL OFFICER COMMAND CENTER
 * =============================================================================
 *
 * A comprehensive executive retail dashboard that monitors revenue, customers,
 * inventory, store performance, AI-powered retail intelligence, and global
 * retail operations across the enterprise retail ecosystem.
 *
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import {
  ChevronLeft,
  Users,
  Store,
  Package,
  TrendingUp,
  DollarSign,
  Brain,
  ShoppingCart,
  Activity,
  Globe,
  Zap,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Flame,
  Shield,
  Clock,
  BarChart3,
  LineChart,
  PieChart,
  Map,
  Building2,
  Truck,
  Tag,
  Heart,
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import Svg, { Path, Circle, Defs, LinearGradient, Stop, Line, Rect } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Theme Colors
const THEME = {
  background: '#03050A',
  card: '#0A0F1E',
  cardLight: '#121829',
  neonCyan: '#00F0FF',
  electricBlue: '#3B82F6',
  emeraldGreen: '#10B981',
  purple: '#8B5CF6',
  amber: '#F59E0B',
  red: '#EF4444',
  magenta: '#EC4899',
  text: '#E2E8F0',
  textMuted: '#94A3B8',
  border: '#1E293B',
};

// Executive KPI Data
const EXECUTIVE_KPIS = {
  sales: {
    totalRevenue: '$8.4B',
    dailySales: '$23.4M',
    monthlySales: '$712M',
    avgOrderValue: '$89.40',
    salesGrowth: 14,
  },
  customers: {
    activeCustomers: '48M',
    repeatPurchaseRate: 68,
    customerSatisfaction: 92,
    loyaltyMembers: '34M',
    customerLifetimeValue: '$2,840',
  },
  inventory: {
    inventoryValue: '$1.9B',
    stockAvailability: 94,
    inventoryTurnover: 8.2,
    stockoutRate: 2.1,
    replenishmentAccuracy: 96,
  },
  stores: {
    activeStores: '3,850',
    storePerformance: 87,
    employeeProductivity: 92,
    footTraffic: '2.4M',
    conversionRate: 7.8,
  },
  ai: {
    forecastAccuracy: 94,
    pricingOptimizations: '1.2M',
    automatedReorders: '847K',
    revenueImpact: '$520M',
    demandPredictions: '2.4M',
  },
};

// AI Retail Agents
const RETAIL_AGENTS = [
  {
    id: 'mercury',
    name: 'Agent Mercury',
    role: 'Sales Optimization Agent',
    icon: TrendingUp,
    color: THEME.neonCyan,
    metrics: { revenueInfluenced: '$520M', conversionLift: 18, forecastAccuracy: 94 },
  },
  {
    id: 'atlas',
    name: 'Agent Atlas',
    role: 'Inventory Intelligence Agent',
    icon: Package,
    color: THEME.electricBlue,
    metrics: { stockoutsPrevented: '12.4K', forecastAccuracy: 94, inventoryEfficiency: 87 },
  },
  {
    id: 'nova',
    name: 'Agent Nova',
    role: 'Customer Intelligence Agent',
    icon: Users,
    color: THEME.emeraldGreen,
    metrics: { customersAnalyzed: '48M', retentionImprovement: 15, loyaltyGrowth: 22 },
  },
  {
    id: 'pulse',
    name: 'Agent Pulse',
    role: 'Store Operations Agent',
    icon: Store,
    color: THEME.purple,
    metrics: { storesManaged: '3,850', operationalEfficiency: 89, productivityImprovement: 12 },
  },
  {
    id: 'orbit',
    name: 'Agent Orbit',
    role: 'Supply Chain Agent',
    icon: Truck,
    color: THEME.amber,
    metrics: { deliveriesOptimized: '847K', supplyChainEfficiency: 91, costSavings: '$89M' },
  },
  {
    id: 'prism',
    name: 'Agent Prism',
    role: 'Pricing Intelligence Agent',
    icon: Tag,
    color: THEME.magenta,
    metrics: { marginGrowth: 8, pricingAdjustments: '1.2M', revenueImpact: '$180M' },
  },
];

// AI Insights
const AI_INSIGHTS = [
  {
    type: 'demand',
    title: 'Demand Forecast',
    message: 'Demand forecast predicts a 22% increase for electronics category next month.',
    impact: 'High',
    action: 'Increase inventory buffer for electronics',
  },
  {
    type: 'inventory',
    title: 'Inventory Shortage',
    message: 'Inventory shortage risk detected for 14 high-demand products across 28 stores.',
    impact: 'Critical',
    action: 'Initiate emergency replenishment orders',
  },
  {
    type: 'pricing',
    title: 'Dynamic Pricing',
    message: 'Dynamic pricing opportunity identified worth $18M in additional revenue this quarter.',
    impact: 'High',
    action: 'Deploy dynamic pricing algorithm',
  },
  {
    type: 'retention',
    title: 'Customer Retention',
    message: 'Customer retention campaign could increase repeat purchases by 11% in Q3.',
    impact: 'Positive',
    action: 'Launch targeted retention program',
  },
  {
    type: 'operations',
    title: 'Store Productivity',
    message: 'Store productivity variance detected across 28 locations requiring optimization.',
    impact: 'Medium',
    action: 'Deploy operational efficiency audit',
  },
];

// Real-Time Activity Feed
const ACTIVITY_FEED = [
  { event: 'Purchase completed', time: '2 min ago', type: 'sales' },
  { event: 'Inventory replenished', time: '5 min ago', type: 'inventory' },
  { event: 'New customer registered', time: '8 min ago', type: 'customer' },
  { event: 'Promotion launched', time: '12 min ago', type: 'marketing' },
  { event: 'Product trending', time: '15 min ago', type: 'merchandising' },
  { event: 'Delivery completed', time: '18 min ago', type: 'supply' },
  { event: 'Loyalty milestone achieved', time: '22 min ago', type: 'loyalty' },
  { event: 'AI recommendation executed', time: '25 min ago', type: 'ai' },
];

export default function ChiefRetailOfficerCommandCenter() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderTrendIndicator = (change: number, trend: string) => {
    if (trend === 'up') {
      return (
        <View style={styles.trendUp}>
          <ArrowUpRight size={12} color={THEME.emeraldGreen} />
          <Text style={[styles.trendText, { color: THEME.emeraldGreen }]}>{change}%</Text>
        </View>
      );
    } else if (trend === 'down') {
      return (
        <View style={styles.trendDown}>
          <ArrowDownRight size={12} color={THEME.red} />
          <Text style={[styles.trendText, { color: THEME.red }]}>{change}%</Text>
        </View>
      );
    }
    return null;
  };

  const renderKPICard = (title: string, value: string, subtitle: string, color: string, trend?: { value: number, direction: string }) => (
    <BlurView intensity={20} tint="dark" style={styles.kpiCard}>
      <Text style={styles.kpiLabel}>{title}</Text>
      <Text style={[styles.kpiValue, { color }]}>{value}</Text>
      <Text style={styles.kpiSubtitle}>{subtitle}</Text>
      {trend && renderTrendIndicator(trend.value, trend.direction)}
    </BlurView>
  );

  const renderAgentCard = (agent: typeof RETAIL_AGENTS[0]) => {
    const Icon = agent.icon;
    return (
      <BlurView key={agent.id} intensity={20} tint="dark" style={styles.agentCard}>
        <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}>
          <Icon size={24} color={agent.color} />
        </View>
        <Text style={styles.agentName}>{agent.name}</Text>
        <Text style={styles.agentRole}>{agent.role}</Text>
        <View style={styles.agentMetrics}>
          <View style={styles.agentMetric}>
            <Text style={styles.agentMetricLabel}>Revenue</Text>
            <Text style={[styles.agentMetricValue, { color: agent.color }]}>{agent.metrics.revenueInfluenced || agent.metrics.stockoutsPrevented || agent.metrics.customersAnalyzed || agent.metrics.storesManaged || agent.metrics.deliveriesOptimized || agent.metrics.marginGrowth}</Text>
          </View>
          <View style={styles.agentMetric}>
            <Text style={styles.agentMetricLabel}>Impact</Text>
            <Text style={[styles.agentMetricValue, { color: agent.color }]}>{agent.metrics.conversionLift || agent.metrics.forecastAccuracy || agent.metrics.retentionImprovement || agent.metrics.operationalEfficiency || agent.metrics.supplyChainEfficiency || agent.metrics.pricingAdjustments}%</Text>
          </View>
        </View>
      </BlurView>
    );
  };

  const renderInsightCard = (insight: typeof AI_INSIGHTS[0]) => {
    const typeColors = {
      demand: THEME.neonCyan,
      inventory: THEME.red,
      pricing: THEME.emeraldGreen,
      retention: THEME.electricBlue,
      operations: THEME.purple,
    };
    const typeIcons = {
      demand: TrendingUp,
      inventory: Shield,
      pricing: Tag,
      retention: Heart,
      operations: Store,
    };
    const Icon = typeIcons[insight.type as keyof typeof typeIcons];
    const color = typeColors[insight.type as keyof typeof typeColors];

    return (
      <Animated.View entering={FadeInUp.springify()} style={styles.insightCard}>
        <BlurView intensity={20} tint="dark" style={styles.insightCardBlur}>
          <View style={styles.insightHeader}>
            <View style={[styles.insightIcon, { backgroundColor: color + '20' }]}>
              <Icon size={20} color={color} />
            </View>
            <View style={styles.insightMeta}>
              <Text style={styles.insightTitle}>{insight.title}</Text>
              <View style={[styles.insightImpact, { backgroundColor: color + '30' }]}>
                <Text style={[styles.insightImpactText, { color }]}>{insight.impact}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.insightMessage}>{insight.message}</Text>
          <View style={styles.insightAction}>
            <Text style={styles.insightActionLabel}>Suggested Action:</Text>
            <Text style={styles.insightActionText}>{insight.action}</Text>
          </View>
        </BlurView>
      </Animated.View>
    );
  };

  const renderActivityItem = (activity: typeof ACTIVITY_FEED[0]) => {
    const typeColors = {
      sales: THEME.emeraldGreen,
      inventory: THEME.amber,
      customer: THEME.neonCyan,
      marketing: THEME.purple,
      merchandising: THEME.magenta,
      supply: THEME.electricBlue,
      loyalty: THEME.red,
      ai: THEME.neonCyan,
    };
    const color = typeColors[activity.type as keyof typeof typeColors];

    return (
      <View key={activity.time} style={styles.activityItem}>
        <View style={[styles.activityDot, { backgroundColor: color }]} />
        <View style={styles.activityContent}>
          <Text style={styles.activityEvent}>{activity.event}</Text>
          <Text style={styles.activityTime}>{activity.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: THEME.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={THEME.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerTitle}>
            <Store size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Chief Retail Officer Command Center</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Executive KPIs */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <BarChart3 size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Executive KPIs</Text>
          </View>
          
          {/* Sales KPIs */}
          <Text style={styles.kpiSectionTitle}>Sales KPIs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll}>
            <View style={styles.kpiContainer}>
              {renderKPICard('Total Revenue', EXECUTIVE_KPIS.sales.totalRevenue, 'Annual revenue', THEME.neonCyan, { value: 14, direction: 'up' })}
              {renderKPICard('Daily Sales', EXECUTIVE_KPIS.sales.dailySales, 'Today\'s revenue', THEME.electricBlue, { value: 8, direction: 'up' })}
              {renderKPICard('Monthly Sales', EXECUTIVE_KPIS.sales.monthlySales, 'This month', THEME.emeraldGreen, { value: 12, direction: 'up' })}
              {renderKPICard('Avg Order Value', EXECUTIVE_KPIS.sales.avgOrderValue, 'Per transaction', THEME.purple, { value: 5, direction: 'up' })}
              {renderKPICard('Sales Growth', `${EXECUTIVE_KPIS.sales.salesGrowth}%`, 'YoY growth', THEME.amber, { value: 14, direction: 'up' })}
            </View>
          </ScrollView>

          {/* Customer KPIs */}
          <Text style={styles.kpiSectionTitle}>Customer KPIs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll}>
            <View style={styles.kpiContainer}>
              {renderKPICard('Active Customers', EXECUTIVE_KPIS.customers.activeCustomers, 'Total customers', THEME.neonCyan, { value: 18, direction: 'up' })}
              {renderKPICard('Repeat Rate', `${EXECUTIVE_KPIS.customers.repeatPurchaseRate}%`, 'Loyalty metric', THEME.electricBlue, { value: 6, direction: 'up' })}
              {renderKPICard('Satisfaction', `${EXECUTIVE_KPIS.customers.customerSatisfaction}%`, 'CSAT score', THEME.emeraldGreen, { value: 4, direction: 'up' })}
              {renderKPICard('Loyalty Members', EXECUTIVE_KPIS.customers.loyaltyMembers, 'Program members', THEME.purple, { value: 22, direction: 'up' })}
              {renderKPICard('Lifetime Value', EXECUTIVE_KPIS.customers.customerLifetimeValue, 'Per customer', THEME.amber, { value: 8, direction: 'up' })}
            </View>
          </ScrollView>

          {/* Inventory KPIs */}
          <Text style={styles.kpiSectionTitle}>Inventory KPIs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll}>
            <View style={styles.kpiContainer}>
              {renderKPICard('Inventory Value', EXECUTIVE_KPIS.inventory.inventoryValue, 'Total inventory', THEME.neonCyan, { value: 12, direction: 'up' })}
              {renderKPICard('Stock Availability', `${EXECUTIVE_KPIS.inventory.stockAvailability}%`, 'In-stock rate', THEME.electricBlue, { value: 3, direction: 'up' })}
              {renderKPICard('Turnover', EXECUTIVE_KPIS.inventory.inventoryTurnover.toFixed(1), 'Annual turns', THEME.emeraldGreen, { value: 8, direction: 'up' })}
              {renderKPICard('Stockout Rate', `${EXECUTIVE_KPIS.inventory.stockoutRate}%`, 'Out of stock', THEME.red, { value: 15, direction: 'down' })}
              {renderKPICard('Replenishment Accuracy', `${EXECUTIVE_KPIS.inventory.replenishmentAccuracy}%`, 'Order accuracy', THEME.purple, { value: 5, direction: 'up' })}
            </View>
          </ScrollView>

          {/* Store KPIs */}
          <Text style={styles.kpiSectionTitle}>Store KPIs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll}>
            <View style={styles.kpiContainer}>
              {renderKPICard('Active Stores', EXECUTIVE_KPIS.stores.activeStores, 'Total locations', THEME.neonCyan, { value: 8, direction: 'up' })}
              {renderKPICard('Store Performance', `${EXECUTIVE_KPIS.stores.storePerformance}%`, 'Overall score', THEME.electricBlue, { value: 6, direction: 'up' })}
              {renderKPICard('Productivity', `${EXECUTIVE_KPIS.stores.employeeProductivity}%`, 'Staff efficiency', THEME.emeraldGreen, { value: 12, direction: 'up' })}
              {renderKPICard('Foot Traffic', EXECUTIVE_KPIS.stores.footTraffic, 'Daily visitors', THEME.purple, { value: 10, direction: 'up' })}
              {renderKPICard('Conversion Rate', `${EXECUTIVE_KPIS.stores.conversionRate}%`, 'Purchase rate', THEME.amber, { value: 4, direction: 'up' })}
            </View>
          </ScrollView>

          {/* AI KPIs */}
          <Text style={styles.kpiSectionTitle}>AI KPIs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll}>
            <View style={styles.kpiContainer}>
              {renderKPICard('Forecast Accuracy', `${EXECUTIVE_KPIS.ai.forecastAccuracy}%`, 'Prediction quality', THEME.neonCyan, { value: 4, direction: 'up' })}
              {renderKPICard('Pricing Optimizations', EXECUTIVE_KPIS.ai.pricingOptimizations, 'Total adjustments', THEME.electricBlue, { value: 25, direction: 'up' })}
              {renderKPICard('Automated Reorders', EXECUTIVE_KPIS.ai.automatedReorders, 'AI-triggered orders', THEME.emeraldGreen, { value: 18, direction: 'up' })}
              {renderKPICard('Revenue Impact', EXECUTIVE_KPIS.ai.revenueImpact, 'AI-generated revenue', THEME.purple, { value: 22, direction: 'up' })}
              {renderKPICard('Demand Predictions', EXECUTIVE_KPIS.ai.demandPredictions, 'Forecasts generated', THEME.amber, { value: 15, direction: 'up' })}
            </View>
          </ScrollView>
        </Animated.View>

        {/* AI Retail Agents */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Brain size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>AI Retail Agents</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.agentsScroll}>
            <View style={styles.agentsContainer}>
              {RETAIL_AGENTS.map((agent) => renderAgentCard(agent))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* AI Insights */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Zap size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>AI Insights</Text>
          </View>
          <View style={styles.insightsContainer}>
            {AI_INSIGHTS.map((insight) => renderInsightCard(insight))}
          </View>
        </Animated.View>

        {/* Real-Time Activity Feed */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Activity size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Real-Time Retail Activity Feed</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.activityFeedCard}>
            {ACTIVITY_FEED.map((activity) => renderActivityItem(activity))}
          </BlurView>
        </Animated.View>

        {/* Global Retail Overview */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Globe size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Global Retail Operations</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.globalCard}>
            <View style={styles.globalMetrics}>
              <View style={styles.globalMetric}>
                <Text style={styles.globalLabel}>Stores</Text>
                <Text style={[styles.globalValue, { color: THEME.neonCyan }]}>3,850</Text>
              </View>
              <View style={styles.globalMetric}>
                <Text style={styles.globalLabel}>Countries</Text>
                <Text style={[styles.globalValue, { color: THEME.electricBlue }]}>47</Text>
              </View>
              <View style={styles.globalMetric}>
                <Text style={styles.globalLabel}>Warehouses</Text>
                <Text style={[styles.globalValue, { color: THEME.emeraldGreen }]}>124</Text>
              </View>
              <View style={styles.globalMetric}>
                <Text style={styles.globalLabel}>Employees</Text>
                <Text style={[styles.globalValue, { color: THEME.purple }]}>285K</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: THEME.border,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: THEME.text,
  },
  timeText: {
    fontSize: 12,
    color: THEME.textMuted,
    marginTop: 4,
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.text,
  },
  kpiSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.textMuted,
    marginTop: 16,
    marginBottom: 12,
  },
  kpiScroll: {
    marginBottom: 0,
  },
  kpiContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  kpiCard: {
    width: 140,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  kpiLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  kpiSubtitle: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  agentsScroll: {
    marginBottom: 0,
  },
  agentsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  agentCard: {
    width: 160,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
    alignItems: 'center',
  },
  agentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  agentName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 4,
  },
  agentRole: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 12,
    textAlign: 'center',
  },
  agentMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  agentMetric: {
    alignItems: 'center',
  },
  agentMetricLabel: {
    fontSize: 10,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  agentMetricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  insightsContainer: {
    gap: 12,
  },
  insightCard: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: THEME.border,
  },
  insightCardBlur: {
    padding: 16,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  insightMeta: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 4,
  },
  insightImpact: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  insightImpactText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  insightMessage: {
    fontSize: 14,
    color: THEME.text,
    marginBottom: 12,
    lineHeight: 20,
  },
  insightAction: {
    backgroundColor: THEME.card,
    padding: 12,
    borderRadius: 8,
  },
  insightActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.textMuted,
    marginBottom: 4,
  },
  insightActionText: {
    fontSize: 13,
    color: THEME.text,
  },
  activityFeedCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityEvent: {
    fontSize: 14,
    fontWeight: '500',
    color: THEME.text,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  globalCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  globalMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  globalMetric: {
    alignItems: 'center',
  },
  globalLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  globalValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  trendUp: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendDown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
