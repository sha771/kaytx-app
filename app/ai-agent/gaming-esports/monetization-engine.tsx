/**
 * =============================================================================
 * MONETIZATION ENGINE
 * =============================================================================
 *
 * A comprehensive monetization dashboard that tracks store revenue,
 * battle pass sales, cosmetics performance, marketplace transactions, and offer conversions.
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
  DollarSign,
  ShoppingBag,
  Trophy,
  Gem,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  CreditCard,
  Package,
  Tag,
  BarChart3,
  Zap,
  Flame,
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Theme Colors
const THEME = {
  background: '#03050A',
  card: '#0A0F1E',
  cardLight: '#121829',
  neonCyan: '#00F0FF',
  electricPurple: '#8B5CF6',
  neonGreen: '#10B981',
  amber: '#F59E0B',
  red: '#EF4444',
  magenta: '#EC4899',
  text: '#E2E8F0',
  textMuted: '#94A3B8',
  border: '#1E293B',
};

// Monetization Data
const MONETIZATION_DATA = {
  storeRevenue: {
    daily: 2400000,
    weekly: 16800000,
    monthly: 72000000,
    yearly: 864000000,
  },
  battlePassSales: {
    total: 12400000,
    premium: 8400000,
    free: 4000000,
    completionRate: 67,
    revenue: 248000000,
  },
  cosmeticsPerformance: {
    totalRevenue: 156000000,
    topSelling: 'Phoenix Skin',
    avgPrice: 12.50,
    itemsSold: 12480000,
  },
  marketplaceTransactions: {
    volume: 8470000,
    value: 68000000,
    activeListings: 245000,
    avgTransaction: 8.02,
  },
  offerConversions: {
    totalOffers: 4560000,
    converted: 2840000,
    conversionRate: 62,
    revenue: 56800000,
  },
};

// Top Selling Items
const TOP_SELLING_ITEMS = [
  { id: 1, name: 'Phoenix Skin Bundle', revenue: '$12.4M', sales: 847000, category: 'Cosmetics', trend: 'up' },
  { id: 2, name: 'Battle Pass Season 7', revenue: '$24.8M', sales: 8400000, category: 'Battle Pass', trend: 'up' },
  { id: 3, name: 'Dragon Weapon Pack', revenue: '$8.2M', sales: 456000, category: 'Weapons', trend: 'up' },
  { id: 4, name: 'Premium Currency Pack', revenue: '$15.6M', sales: 1240000, category: 'Currency', trend: 'same' },
  { id: 5, name: 'Limited Edition Emote', revenue: '$4.5M', sales: 289000, category: 'Emotes', trend: 'down' },
];

// Revenue by Category
const REVENUE_CATEGORIES = [
  { id: 1, name: 'Battle Pass', revenue: '$248M', percentage: 28.7, color: THEME.neonCyan },
  { id: 2, name: 'Cosmetics', revenue: '$156M', percentage: 18.1, color: THEME.electricPurple },
  { id: 3, name: 'Currency', revenue: '$156M', percentage: 18.1, color: THEME.neonGreen },
  { id: 4, name: 'Marketplace', revenue: '$68M', percentage: 7.9, color: THEME.amber },
  { id: 5, name: 'Offers', revenue: '$56.8M', percentage: 6.6, color: THEME.magenta },
];

// AI Insights
const AI_INSIGHTS = [
  {
    type: 'revenue',
    title: 'Revenue Forecast',
    message: 'Monthly revenue projected to exceed $85M based on current trends. 18% above target.',
    impact: 'Positive',
    action: 'Prepare for increased infrastructure scaling',
  },
  {
    type: 'conversion',
    title: 'Conversion Optimization',
    message: 'Offer conversion rate dropped 5% after pricing adjustment. Consider A/B testing.',
    impact: 'Medium',
    action: 'Run pricing sensitivity analysis',
  },
  {
    type: 'battlepass',
    title: 'Battle Pass Engagement',
    message: 'Battle Pass completion rate 67% - highest in 12 months. Consider accelerating content.',
    impact: 'High',
    action: 'Accelerate Season 8 development',
  },
];

export default function MonetizationEngine() {
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

  const renderTrendIndicator = (trend: string) => {
    if (trend === 'up') {
      return <ArrowUpRight size={16} color={THEME.neonGreen} />;
    } else if (trend === 'down') {
      return <ArrowDownRight size={16} color={THEME.red} />;
    }
    return <View style={styles.trendNeutral} />;
  };

  const renderItemCard = (item: typeof TOP_SELLING_ITEMS[0]) => (
    <BlurView key={item.id} intensity={20} tint="dark" style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemName}>{item.name}</Text>
        {renderTrendIndicator(item.trend)}
      </View>
      <View style={styles.itemDetails}>
        <View style={styles.itemDetail}>
          <Text style={styles.itemDetailLabel}>Revenue</Text>
          <Text style={[styles.itemDetailValue, { color: THEME.neonGreen }]}>{item.revenue}</Text>
        </View>
        <View style={styles.itemDetail}>
          <Text style={styles.itemDetailLabel}>Sales</Text>
          <Text style={[styles.itemDetailValue, { color: THEME.neonCyan }]}>{(item.sales / 1000).toFixed(0)}K</Text>
        </View>
        <View style={styles.itemDetail}>
          <Text style={styles.itemDetailLabel}>Category</Text>
          <Text style={[styles.itemDetailValue, { color: THEME.electricPurple }]}>{item.category}</Text>
        </View>
      </View>
    </BlurView>
  );

  const renderCategoryCard = (category: typeof REVENUE_CATEGORIES[0]) => (
    <BlurView key={category.id} intensity={20} tint="dark" style={styles.categoryCard}>
      <View style={styles.categoryHeader}>
        <View style={[styles.categoryIndicator, { backgroundColor: category.color }]} />
        <Text style={styles.categoryName}>{category.name}</Text>
      </View>
      <View style={styles.categoryMetrics}>
        <Text style={[styles.categoryRevenue, { color: category.color }]}>{category.revenue}</Text>
        <Text style={styles.categoryPercentage}>{category.percentage}%</Text>
      </View>
      <View style={styles.categoryBar}>
        <View style={[styles.categoryBarFill, { width: `${category.percentage}%`, backgroundColor: category.color }]} />
      </View>
    </BlurView>
  );

  const renderInsightCard = (insight: typeof AI_INSIGHTS[0]) => {
    const typeColors = {
      revenue: THEME.neonGreen,
      conversion: THEME.amber,
      battlepass: THEME.neonCyan,
    };
    const typeIcons = {
      revenue: DollarSign,
      conversion: Tag,
      battlepass: Trophy,
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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: THEME.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={THEME.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerTitle}>
            <DollarSign size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Monetization Engine</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Store Revenue */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <ShoppingBag size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Store Revenue</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.revenueCard}>
            <View style={styles.revenueGrid}>
              <View style={styles.revenueMetric}>
                <Text style={styles.revenueLabel}>Daily</Text>
                <Text style={[styles.revenueValue, { color: THEME.neonCyan }]}>${(MONETIZATION_DATA.storeRevenue.daily / 1000000).toFixed(2)}M</Text>
              </View>
              <View style={styles.revenueMetric}>
                <Text style={styles.revenueLabel}>Weekly</Text>
                <Text style={[styles.revenueValue, { color: THEME.electricPurple }]}>${(MONETIZATION_DATA.storeRevenue.weekly / 1000000).toFixed(1)}M</Text>
              </View>
              <View style={styles.revenueMetric}>
                <Text style={styles.revenueLabel}>Monthly</Text>
                <Text style={[styles.revenueValue, { color: THEME.neonGreen }]}>${(MONETIZATION_DATA.storeRevenue.monthly / 1000000).toFixed(0)}M</Text>
              </View>
              <View style={styles.revenueMetric}>
                <Text style={styles.revenueLabel}>Yearly</Text>
                <Text style={[styles.revenueValue, { color: THEME.amber }]}>${(MONETIZATION_DATA.storeRevenue.yearly / 1000000).toFixed(0)}M</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Battle Pass Sales */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Trophy size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Battle Pass Sales</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.battlePassCard}>
            <View style={styles.battlePassGrid}>
              <View style={styles.battlePassMetric}>
                <Text style={styles.battlePassLabel}>Total Sales</Text>
                <Text style={[styles.battlePassValue, { color: THEME.neonCyan }]}>{(MONETIZATION_DATA.battlePassSales.total / 1000000).toFixed(1)}M</Text>
              </View>
              <View style={styles.battlePassMetric}>
                <Text style={styles.battlePassLabel}>Premium</Text>
                <Text style={[styles.battlePassValue, { color: THEME.neonGreen }]}>{(MONETIZATION_DATA.battlePassSales.premium / 1000000).toFixed(1)}M</Text>
              </View>
              <View style={styles.battlePassMetric}>
                <Text style={styles.battlePassLabel}>Free</Text>
                <Text style={[styles.battlePassValue, { color: THEME.amber }]}>{(MONETIZATION_DATA.battlePassSales.free / 1000000).toFixed(1)}M</Text>
              </View>
              <View style={styles.battlePassMetric}>
                <Text style={styles.battlePassLabel}>Revenue</Text>
                <Text style={[styles.battlePassValue, { color: THEME.electricPurple }]}>${(MONETIZATION_DATA.battlePassSales.revenue / 1000000).toFixed(0)}M</Text>
              </View>
            </View>
            <View style={styles.battlePassProgress}>
              <Text style={styles.battlePassProgressLabel}>Completion Rate</Text>
              <View style={styles.battlePassProgressBar}>
                <View style={[styles.battlePassProgressFill, { width: `${MONETIZATION_DATA.battlePassSales.completionRate}%`, backgroundColor: THEME.neonGreen }]} />
              </View>
              <Text style={styles.battlePassProgressText}>{MONETIZATION_DATA.battlePassSales.completionRate}%</Text>
            </View>
          </BlurView>
        </Animated.View>

        {/* Cosmetics Performance */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Gem size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Cosmetics Performance</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.cosmeticsCard}>
            <View style={styles.cosmeticsGrid}>
              <View style={styles.cosmeticsMetric}>
                <Text style={styles.cosmeticsLabel}>Total Revenue</Text>
                <Text style={[styles.cosmeticsValue, { color: THEME.neonCyan }]}>${(MONETIZATION_DATA.cosmeticsPerformance.totalRevenue / 1000000).toFixed(0)}M</Text>
              </View>
              <View style={styles.cosmeticsMetric}>
                <Text style={styles.cosmeticsLabel}>Items Sold</Text>
                <Text style={[styles.cosmeticsValue, { color: THEME.neonGreen }]}>{(MONETIZATION_DATA.cosmeticsPerformance.itemsSold / 1000000).toFixed(1)}M</Text>
              </View>
              <View style={styles.cosmeticsMetric}>
                <Text style={styles.cosmeticsLabel}>Avg Price</Text>
                <Text style={[styles.cosmeticsValue, { color: THEME.amber }]}>${MONETIZATION_DATA.cosmeticsPerformance.avgPrice.toFixed(2)}</Text>
              </View>
            </View>
          </BlurView>
          <View style={styles.itemsContainer}>
            {TOP_SELLING_ITEMS.map((item) => renderItemCard(item))}
          </View>
        </Animated.View>

        {/* Marketplace Transactions */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Package size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Marketplace Transactions</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.marketplaceCard}>
            <View style={styles.marketplaceGrid}>
              <View style={styles.marketplaceMetric}>
                <Text style={styles.marketplaceLabel}>Volume</Text>
                <Text style={[styles.marketplaceValue, { color: THEME.neonCyan }]}>{(MONETIZATION_DATA.marketplaceTransactions.volume / 1000000).toFixed(1)}M</Text>
              </View>
              <View style={styles.marketplaceMetric}>
                <Text style={styles.marketplaceLabel}>Value</Text>
                <Text style={[styles.marketplaceValue, { color: THEME.neonGreen }]}>${(MONETIZATION_DATA.marketplaceTransactions.value / 1000000).toFixed(0)}M</Text>
              </View>
              <View style={styles.marketplaceMetric}>
                <Text style={styles.marketplaceLabel}>Active Listings</Text>
                <Text style={[styles.marketplaceValue, { color: THEME.electricPurple }]}>{(MONETIZATION_DATA.marketplaceTransactions.activeListings / 1000).toFixed(0)}K</Text>
              </View>
              <View style={styles.marketplaceMetric}>
                <Text style={styles.marketplaceLabel}>Avg Transaction</Text>
                <Text style={[styles.marketplaceValue, { color: THEME.amber }]}>${MONETIZATION_DATA.marketplaceTransactions.avgTransaction.toFixed(2)}</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Offer Conversions */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Tag size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Offer Conversions</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.offersCard}>
            <View style={styles.offersGrid}>
              <View style={styles.offersMetric}>
                <Text style={styles.offersLabel}>Total Offers</Text>
                <Text style={[styles.offersValue, { color: THEME.neonCyan }]}>{(MONETIZATION_DATA.offerConversions.totalOffers / 1000000).toFixed(1)}M</Text>
              </View>
              <View style={styles.offersMetric}>
                <Text style={styles.offersLabel}>Converted</Text>
                <Text style={[styles.offersValue, { color: THEME.neonGreen }]}>{(MONETIZATION_DATA.offerConversions.converted / 1000000).toFixed(1)}M</Text>
              </View>
              <View style={styles.offersMetric}>
                <Text style={styles.offersLabel}>Conversion Rate</Text>
                <Text style={[styles.offersValue, { color: THEME.amber }]}>{MONETIZATION_DATA.offerConversions.conversionRate}%</Text>
              </View>
              <View style={styles.offersMetric}>
                <Text style={styles.offersLabel}>Revenue</Text>
                <Text style={[styles.offersValue, { color: THEME.electricPurple }]}>${(MONETIZATION_DATA.offerConversions.revenue / 1000000).toFixed(0)}M</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Revenue by Category */}
        <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <BarChart3 size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Revenue by Category</Text>
          </View>
          <View style={styles.categoriesContainer}>
            {REVENUE_CATEGORIES.map((category) => renderCategoryCard(category))}
          </View>
        </Animated.View>

        {/* AI Insights */}
        <Animated.View entering={FadeInUp.delay(600).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Brain size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>AI Insights</Text>
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
  revenueCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  revenueGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  revenueMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  revenueLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  revenueValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  battlePassCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  battlePassGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 20,
  },
  battlePassMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  battlePassLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  battlePassValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  battlePassProgress: {
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  battlePassProgressLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  battlePassProgressBar: {
    height: 8,
    backgroundColor: THEME.cardLight,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  battlePassProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  battlePassProgressText: {
    fontSize: 12,
    color: THEME.textMuted,
    textAlign: 'center',
  },
  cosmeticsCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 16,
  },
  cosmeticsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cosmeticsMetric: {
    alignItems: 'center',
  },
  cosmeticsLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  cosmeticsValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  itemsContainer: {
    gap: 12,
  },
  itemCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemDetail: {
    flex: 1,
  },
  itemDetailLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  itemDetailValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  marketplaceCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  marketplaceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  marketplaceMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  marketplaceLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  marketplaceValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  offersCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  offersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  offersMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  offersLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  offersValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  categoriesContainer: {
    gap: 12,
  },
  categoryCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  categoryIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  categoryMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  categoryRevenue: {
    fontSize: 18,
    fontWeight: '700',
  },
  categoryPercentage: {
    fontSize: 14,
    color: THEME.textMuted,
  },
  categoryBar: {
    height: 4,
    backgroundColor: THEME.cardLight,
    borderRadius: 2,
    overflow: 'hidden',
  },
  categoryBarFill: {
    height: '100%',
    borderRadius: 2,
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
  trendNeutral: {
    width: 16,
    height: 16,
  },
});
