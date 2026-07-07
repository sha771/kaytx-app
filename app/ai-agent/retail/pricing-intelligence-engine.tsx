/**
 * =============================================================================
 * PRICING INTELLIGENCE ENGINE
 * =============================================================================
 *
 * A comprehensive pricing dashboard that monitors dynamic pricing, competitive
 * pricing, margin analysis, promotional impact, and price elasticity across
 * the retail pricing strategy.
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
  Tag,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Target,
  Activity,
  Zap,
  DollarSign,
  Percent,
  AlertTriangle,
  CheckCircle,
  Scale,
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

// Pricing Categories
const PRICING_CATEGORIES = [
  { category: 'Electronics', avgMargin: 22, elasticity: -1.8, competitiveIndex: 87, status: 'optimal' },
  { category: 'Apparel', avgMargin: 45, elasticity: -2.4, competitiveIndex: 92, status: 'optimal' },
  { category: 'Home & Garden', avgMargin: 38, elasticity: -1.6, competitiveIndex: 78, status: 'review' },
  { category: 'Sports & Outdoors', avgMargin: 42, elasticity: -2.1, competitiveIndex: 84, status: 'optimal' },
  { category: 'Beauty & Personal', avgMargin: 55, elasticity: -1.9, competitiveIndex: 89, status: 'optimal' },
];

// Dynamic Pricing Opportunities
const PRICING_OPPORTUNITIES = [
  { product: 'iPhone 15 Pro Max', currentPrice: '$1,199', suggestedPrice: '$1,149', potentialRevenue: '$4.2M', confidence: 94 },
  { product: 'Nike Air Max 270', currentPrice: '$150', suggestedPrice: '$165', potentialRevenue: '$1.8M', confidence: 87 },
  { product: 'Sony WH-1000XM5', currentPrice: '$349', suggestedPrice: '$329', potentialRevenue: '$2.1M', confidence: 92 },
  { product: 'Dyson V15 Detect', currentPrice: '$749', suggestedPrice: '$699', potentialRevenue: '$1.5M', confidence: 89 },
];

// Pricing Metrics
const PRICING_METRICS = {
  avgMargin: 38,
  pricingAdjustments: '1.2M',
  revenueImpact: '$180M',
  competitiveAdvantage: 12,
  priceAccuracy: 94,
  elasticityAccuracy: 89,
};

// Competitive Analysis
const COMPETITIVE_ANALYSIS = [
  { competitor: 'Amazon', priceGap: -2, marketShare: 34, strategy: 'Aggressive' },
  { competitor: 'Walmart', priceGap: -5, marketShare: 28, strategy: 'Everyday Low' },
  { competitor: 'Target', priceGap: 3, marketShare: 18, strategy: 'Premium' },
  { competitor: 'Best Buy', priceGap: 8, marketShare: 12, strategy: 'Specialty' },
];

export default function PricingIntelligenceEngine() {
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

  const renderCategoryCard = (category: typeof PRICING_CATEGORIES[0]) => {
    const statusColors = {
      optimal: THEME.emeraldGreen,
      review: THEME.amber,
      critical: THEME.red,
    };
    const color = statusColors[category.status as keyof typeof statusColors];

    return (
      <BlurView key={category.category} intensity={20} tint="dark" style={styles.categoryCard}>
        <Text style={styles.categoryName}>{category.category}</Text>
        <View style={styles.categoryMetrics}>
          <View style={styles.categoryMetric}>
            <Text style={styles.categoryMetricLabel}>Avg Margin</Text>
            <Text style={[styles.categoryMetricValue, { color: THEME.neonCyan }]}>{category.avgMargin}%</Text>
          </View>
          <View style={styles.categoryMetric}>
            <Text style={styles.categoryMetricLabel}>Elasticity</Text>
            <Text style={[styles.categoryMetricValue, { color: THEME.electricBlue }]}>{category.elasticity}</Text>
          </View>
          <View style={styles.categoryMetric}>
            <Text style={styles.categoryMetricLabel}>Competitive Index</Text>
            <Text style={[styles.categoryMetricValue, { color: THEME.purple }]}>{category.competitiveIndex}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: color + '20' }]}>
          <Text style={[styles.statusText, { color }]}>{category.status.toUpperCase()}</Text>
        </View>
      </BlurView>
    );
  };

  const renderOpportunityCard = (opportunity: typeof PRICING_OPPORTUNITIES[0]) => (
    <BlurView key={opportunity.product} intensity={20} tint="dark" style={styles.opportunityCard}>
      <Text style={styles.opportunityProduct}>{opportunity.product}</Text>
      <View style={styles.opportunityPrices}>
        <View style={styles.opportunityPrice}>
          <Text style={styles.opportunityPriceLabel}>Current</Text>
          <Text style={[styles.opportunityPriceValue, { color: THEME.textMuted }]}>{opportunity.currentPrice}</Text>
        </View>
        <Activity size={16} color={THEME.neonCyan} />
        <View style={styles.opportunityPrice}>
          <Text style={styles.opportunityPriceLabel}>Suggested</Text>
          <Text style={[styles.opportunityPriceValue, { color: THEME.emeraldGreen }]}>{opportunity.suggestedPrice}</Text>
        </View>
      </View>
      <View style={styles.opportunityMetrics}>
        <View style={styles.opportunityMetric}>
          <Text style={styles.opportunityMetricLabel}>Potential Revenue</Text>
          <Text style={[styles.opportunityMetricValue, { color: THEME.neonCyan }]}>{opportunity.potentialRevenue}</Text>
        </View>
        <View style={styles.opportunityMetric}>
          <Text style={styles.opportunityMetricLabel}>Confidence</Text>
          <Text style={[styles.opportunityMetricValue, { color: THEME.purple }]}>{opportunity.confidence}%</Text>
        </View>
      </View>
    </BlurView>
  );

  const renderCompetitorCard = (competitor: typeof COMPETITIVE_ANALYSIS[0]) => (
    <BlurView key={competitor.competitor} intensity={20} tint="dark" style={styles.competitorCard}>
      <Text style={styles.competitorName}>{competitor.competitor}</Text>
      <View style={styles.competitorMetrics}>
        <View style={styles.competitorMetric}>
          <Text style={styles.competitorMetricLabel}>Price Gap</Text>
          <Text style={[styles.competitorMetricValue, { color: competitor.priceGap >= 0 ? THEME.emeraldGreen : THEME.red }]}>{competitor.priceGap >= 0 ? '+' : ''}{competitor.priceGap}%</Text>
        </View>
        <View style={styles.competitorMetric}>
          <Text style={styles.competitorMetricLabel}>Market Share</Text>
          <Text style={[styles.competitorMetricValue, { color: THEME.electricBlue }]}>{competitor.marketShare}%</Text>
        </View>
      </View>
      <View style={[styles.strategyBadge, { backgroundColor: THEME.purple + '20' }]}>
        <Text style={[styles.strategyText, { color: THEME.purple }]}>{competitor.strategy}</Text>
      </View>
    </BlurView>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: THEME.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={THEME.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerTitle}>
            <Tag size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Pricing Intelligence Engine</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Pricing Metrics */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <BarChart3 size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Pricing Metrics</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.metricsCard}>
            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <Percent size={20} color={THEME.neonCyan} />
                <Text style={styles.metricLabel}>Avg Margin</Text>
                <Text style={[styles.metricValue, { color: THEME.neonCyan }]}>{PRICING_METRICS.avgMargin}%</Text>
              </View>
              <View style={styles.metricItem}>
                <Scale size={20} color={THEME.electricBlue} />
                <Text style={styles.metricLabel}>Pricing Adjustments</Text>
                <Text style={[styles.metricValue, { color: THEME.electricBlue }]}>{PRICING_METRICS.pricingAdjustments}</Text>
              </View>
              <View style={styles.metricItem}>
                <DollarSign size={20} color={THEME.emeraldGreen} />
                <Text style={styles.metricLabel}>Revenue Impact</Text>
                <Text style={[styles.metricValue, { color: THEME.emeraldGreen }]}>{PRICING_METRICS.revenueImpact}</Text>
              </View>
              <View style={styles.metricItem}>
                <Target size={20} color={THEME.purple} />
                <Text style={styles.metricLabel}>Competitive Advantage</Text>
                <Text style={[styles.metricValue, { color: THEME.purple }]}>{PRICING_METRICS.competitiveAdvantage}%</Text>
              </View>
              <View style={styles.metricItem}>
                <CheckCircle size={20} color={THEME.amber} />
                <Text style={styles.metricLabel}>Price Accuracy</Text>
                <Text style={[styles.metricValue, { color: THEME.amber }]}>{PRICING_METRICS.priceAccuracy}%</Text>
              </View>
              <View style={styles.metricItem}>
                <Activity size={20} color={THEME.magenta} />
                <Text style={styles.metricLabel}>Elasticity Accuracy</Text>
                <Text style={[styles.metricValue, { color: THEME.magenta }]}>{PRICING_METRICS.elasticityAccuracy}%</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Pricing Categories */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Tag size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Pricing Categories</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            <View style={styles.categoriesContainer}>
              {PRICING_CATEGORIES.map((category) => renderCategoryCard(category))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Dynamic Pricing Opportunities */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Zap size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Dynamic Pricing Opportunities</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.opportunitiesScroll}>
            <View style={styles.opportunitiesContainer}>
              {PRICING_OPPORTUNITIES.map((opportunity) => renderOpportunityCard(opportunity))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Competitive Analysis */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Competitive Analysis</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.competitorsScroll}>
            <View style={styles.competitorsContainer}>
              {COMPETITIVE_ANALYSIS.map((competitor) => renderCompetitorCard(competitor))}
            </View>
          </ScrollView>
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
  categoriesScroll: {
    marginBottom: 0,
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  categoryCard: {
    width: 180,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 12,
  },
  categoryMetrics: {
    gap: 8,
    marginBottom: 12,
  },
  categoryMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  categoryMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  opportunitiesScroll: {
    marginBottom: 0,
  },
  opportunitiesContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  opportunityCard: {
    width: 200,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  opportunityProduct: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 12,
  },
  opportunityPrices: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  opportunityPrice: {
    alignItems: 'center',
  },
  opportunityPriceLabel: {
    fontSize: 10,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  opportunityPriceValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  opportunityMetrics: {
    gap: 8,
  },
  opportunityMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  opportunityMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  opportunityMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  competitorsScroll: {
    marginBottom: 0,
  },
  competitorsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  competitorCard: {
    width: 160,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  competitorName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 12,
  },
  competitorMetrics: {
    gap: 8,
    marginBottom: 12,
  },
  competitorMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  competitorMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  competitorMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  strategyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  strategyText: {
    fontSize: 10,
    fontWeight: '600',
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
