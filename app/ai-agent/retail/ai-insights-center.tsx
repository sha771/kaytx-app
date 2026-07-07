/**
 * =============================================================================
 * AI INSIGHTS CENTER
 * =============================================================================
 *
 * A comprehensive AI insights dashboard that displays AI-generated recommendations,
 * predictive analytics, demand forecasts, inventory alerts, pricing opportunities,
 * and customer retention insights across the retail ecosystem.
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
  Brain,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Target,
  Activity,
  Zap,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Shield,
  Flame,
  DollarSign,
  Users,
  Package,
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';

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

// AI Insights Categories
const AI_INSIGHTS = [
  {
    id: 1,
    type: 'demand',
    title: 'Demand Forecast',
    message: 'Demand forecast predicts a 22% increase for electronics category next month based on seasonal trends and historical data.',
    impact: 'High',
    confidence: 94,
    action: 'Increase inventory buffer for electronics by 25%',
    icon: TrendingUp,
  },
  {
    id: 2,
    type: 'inventory',
    title: 'Inventory Shortage',
    message: 'Inventory shortage risk detected for 14 high-demand products across 28 stores. Immediate action recommended.',
    impact: 'Critical',
    confidence: 89,
    action: 'Initiate emergency replenishment orders for affected SKUs',
    icon: AlertTriangle,
  },
  {
    id: 3,
    type: 'pricing',
    title: 'Dynamic Pricing',
    message: 'Dynamic pricing opportunity identified worth $18M in additional revenue this quarter through real-time price optimization.',
    impact: 'High',
    confidence: 87,
    action: 'Deploy dynamic pricing algorithm for 124 high-velocity products',
    icon: DollarSign,
  },
  {
    id: 4,
    type: 'retention',
    title: 'Customer Retention',
    message: 'Customer retention campaign could increase repeat purchases by 11% in Q3 through targeted loyalty incentives.',
    impact: 'Positive',
    confidence: 82,
    action: 'Launch targeted retention program for at-risk customer segments',
    icon: Users,
  },
  {
    id: 5,
    type: 'operations',
    title: 'Store Productivity',
    message: 'Store productivity variance detected across 28 locations requiring operational optimization intervention.',
    impact: 'Medium',
    confidence: 78,
    action: 'Deploy operational efficiency audit and workforce rebalancing',
    icon: Activity,
  },
  {
    id: 6,
    type: 'supply',
    title: 'Supply Chain',
    message: 'Supply chain disruption risk identified for 3 key suppliers due to geopolitical factors.',
    impact: 'Medium',
    confidence: 75,
    action: 'Activate alternative supplier contingency plans',
    icon: Shield,
  },
  {
    id: 7,
    type: 'merchandising',
    title: 'Product Trend',
    message: 'Sustainable products showing 34% growth acceleration. Recommend expanding eco-friendly assortment.',
    impact: 'High',
    confidence: 91,
    action: 'Increase sustainable product assortment by 40% in Q3',
    icon: Flame,
  },
  {
    id: 8,
    type: 'marketing',
    title: 'Campaign Optimization',
    message: 'Marketing campaign performance analysis indicates 18% improvement opportunity through channel reallocation.',
    impact: 'Medium',
    confidence: 84,
    action: 'Reallocate 15% of ad spend from underperforming channels',
    icon: Zap,
  },
];

// AI Performance Metrics
const AI_PERFORMANCE = {
  totalInsights: '2.4M',
  accuracyRate: 94,
  implementationRate: 78,
  revenueImpact: '$520M',
  costSavings: '$89M',
  timeToAction: '2.4 hours',
};

export default function AIInsightsCenter() {
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

  const renderInsightCard = (insight: typeof AI_INSIGHTS[0]) => {
    const typeColors = {
      demand: THEME.neonCyan,
      inventory: THEME.red,
      pricing: THEME.emeraldGreen,
      retention: THEME.electricBlue,
      operations: THEME.purple,
      supply: THEME.amber,
      merchandising: THEME.magenta,
      marketing: THEME.neonCyan,
    };
    const impactColors = {
      Critical: THEME.red,
      High: THEME.amber,
      Medium: THEME.electricBlue,
      Positive: THEME.emeraldGreen,
    };
    const color = typeColors[insight.type as keyof typeof typeColors];
    const impactColor = impactColors[insight.impact as keyof typeof impactColors];
    const Icon = insight.icon;

    return (
      <Animated.View entering={FadeInUp.springify()} style={styles.insightCard}>
        <BlurView intensity={20} tint="dark" style={styles.insightCardBlur}>
          <View style={styles.insightHeader}>
            <View style={[styles.insightIcon, { backgroundColor: color + '20' }]}>
              <Icon size={20} color={color} />
            </View>
            <View style={styles.insightMeta}>
              <Text style={styles.insightTitle}>{insight.title}</Text>
              <View style={styles.insightBadges}>
                <View style={[styles.insightImpact, { backgroundColor: impactColor + '30' }]}>
                  <Text style={[styles.insightImpactText, { color: impactColor }]}>{insight.impact}</Text>
                </View>
                <View style={[styles.insightConfidence, { backgroundColor: THEME.neonCyan + '20' }]}>
                  <Text style={[styles.insightConfidenceText, { color: THEME.neonCyan }]}>{insight.confidence}%</Text>
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.insightMessage}>{insight.message}</Text>
          <View style={styles.insightAction}>
            <Lightbulb size={14} color={THEME.amber} />
            <Text style={styles.insightActionLabel}>Recommended Action:</Text>
            <Text style={styles.insightActionText}>{insight.action}</Text>
          </View>
        </BlurView>
      </Animated.View>
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
            <Brain size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>AI Insights Center</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* AI Performance Metrics */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <BarChart3 size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>AI Performance</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.metricsCard}>
            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <Brain size={20} color={THEME.neonCyan} />
                <Text style={styles.metricLabel}>Total Insights</Text>
                <Text style={[styles.metricValue, { color: THEME.neonCyan }]}>{AI_PERFORMANCE.totalInsights}</Text>
              </View>
              <View style={styles.metricItem}>
                <CheckCircle size={20} color={THEME.electricBlue} />
                <Text style={styles.metricLabel}>Accuracy Rate</Text>
                <Text style={[styles.metricValue, { color: THEME.electricBlue }]}>{AI_PERFORMANCE.accuracyRate}%</Text>
              </View>
              <View style={styles.metricItem}>
                <Target size={20} color={THEME.emeraldGreen} />
                <Text style={styles.metricLabel}>Implementation Rate</Text>
                <Text style={[styles.metricValue, { color: THEME.emeraldGreen }]}>{AI_PERFORMANCE.implementationRate}%</Text>
              </View>
              <View style={styles.metricItem}>
                <DollarSign size={20} color={THEME.purple} />
                <Text style={styles.metricLabel}>Revenue Impact</Text>
                <Text style={[styles.metricValue, { color: THEME.purple }]}>{AI_PERFORMANCE.revenueImpact}</Text>
              </View>
              <View style={styles.metricItem}>
                <Zap size={20} color={THEME.amber} />
                <Text style={styles.metricLabel}>Cost Savings</Text>
                <Text style={[styles.metricValue, { color: THEME.amber }]}>{AI_PERFORMANCE.costSavings}</Text>
              </View>
              <View style={styles.metricItem}>
                <Activity size={20} color={THEME.magenta} />
                <Text style={styles.metricLabel}>Time to Action</Text>
                <Text style={[styles.metricValue, { color: THEME.magenta }]}>{AI_PERFORMANCE.timeToAction}</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* AI Insights */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Lightbulb size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>AI-Generated Insights</Text>
          </View>
          <View style={styles.insightsContainer}>
            {AI_INSIGHTS.map((insight) => renderInsightCard(insight))}
          </View>
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
  metricsCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metricItem: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginTop: 8,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
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
  insightBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  insightImpact: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  insightImpactText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  insightConfidence: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  insightConfidenceText: {
    fontSize: 10,
    fontWeight: '600',
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  insightActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.textMuted,
  },
  insightActionText: {
    fontSize: 13,
    color: THEME.text,
    flex: 1,
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
