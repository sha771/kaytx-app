/**
 * =============================================================================
 * MERCHANDISING COMMAND CENTER
 * =============================================================================
 *
 * A comprehensive merchandising dashboard that monitors product performance,
 * category growth, shelf optimization, assortment analytics, and product trends
 * across the retail product portfolio.
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
  Package,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Target,
  Activity,
  Zap,
  Star,
  Award,
  ShoppingCart,
  Tag,
  Flame,
  Box,
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

// Product Categories
const PRODUCT_CATEGORIES = [
  { category: 'Electronics', revenue: '$420M', growth: 18, margin: 22, trend: 'rising' },
  { category: 'Apparel', revenue: '$380M', growth: 12, margin: 45, trend: 'rising' },
  { category: 'Home & Garden', revenue: '$290M', growth: 8, margin: 38, trend: 'stable' },
  { category: 'Sports & Outdoors', revenue: '$240M', growth: 22, margin: 42, trend: 'rising' },
  { category: 'Beauty & Personal', revenue: '$180M', growth: 15, margin: 55, trend: 'rising' },
  { category: 'Food & Beverage', revenue: '$120M', growth: 5, margin: 28, trend: 'stable' },
];

// Top Performing Products
const TOP_PRODUCTS = [
  { name: 'iPhone 15 Pro Max', sales: '124K', revenue: '$89.4M', margin: 18, rating: 4.8 },
  { name: 'Nike Air Max 270', sales: '89K', revenue: '$12.4M', margin: 52, rating: 4.6 },
  { name: 'Sony WH-1000XM5', sales: '67K', revenue: '$18.9M', margin: 28, rating: 4.7 },
  { name: 'Dyson V15 Detect', sales: '45K', revenue: '$22.5M', margin: 35, rating: 4.5 },
  { name: 'Samsung Galaxy S24', sales: '52K', revenue: '$28.6M', margin: 22, rating: 4.6 },
];

// Merchandising Metrics
const MERCHANDISING_METRICS = {
  totalProducts: '847K',
  avgMargin: 38,
  productVelocity: 8.2,
  assortmentEfficiency: 87,
  shelfOptimization: 92,
  trendAccuracy: 94,
};

// Product Trends
const PRODUCT_TRENDS = [
  { trend: 'Sustainable Products', growth: 34, category: 'All Categories', impact: 'High' },
  { trend: 'Smart Home Devices', growth: 28, category: 'Electronics', impact: 'High' },
  { trend: 'Athleisure Wear', growth: 22, category: 'Apparel', impact: 'Medium' },
  { trend: 'Plant-Based Products', growth: 18, category: 'Food & Beverage', impact: 'Medium' },
  { trend: 'Premium Beauty', growth: 15, category: 'Beauty & Personal', impact: 'Medium' },
];

export default function MerchandisingCommandCenter() {
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

  const renderCategoryCard = (category: typeof PRODUCT_CATEGORIES[0]) => {
    const trendColors = {
      rising: THEME.emeraldGreen,
      stable: THEME.electricBlue,
      declining: THEME.red,
    };
    const color = trendColors[category.trend as keyof typeof trendColors];

    return (
      <BlurView key={category.category} intensity={20} tint="dark" style={styles.categoryCard}>
        <Text style={styles.categoryName}>{category.category}</Text>
        <View style={styles.categoryMetrics}>
          <View style={styles.categoryMetric}>
            <Text style={styles.categoryMetricLabel}>Revenue</Text>
            <Text style={[styles.categoryMetricValue, { color: THEME.neonCyan }]}>{category.revenue}</Text>
          </View>
          <View style={styles.categoryMetric}>
            <Text style={styles.categoryMetricLabel}>Growth</Text>
            <Text style={[styles.categoryMetricValue, { color }]}>{category.growth}%</Text>
          </View>
          <View style={styles.categoryMetric}>
            <Text style={styles.categoryMetricLabel}>Margin</Text>
            <Text style={[styles.categoryMetricValue, { color: THEME.purple }]}>{category.margin}%</Text>
          </View>
        </View>
        <View style={[styles.trendBadge, { backgroundColor: color + '20' }]}>
          <Text style={[styles.trendBadgeText, { color }]}>{category.trend.toUpperCase()}</Text>
        </View>
      </BlurView>
    );
  };

  const renderProductCard = (product: typeof TOP_PRODUCTS[0]) => (
    <BlurView key={product.name} intensity={20} tint="dark" style={styles.productCard}>
      <Text style={styles.productName}>{product.name}</Text>
      <View style={styles.productMetrics}>
        <View style={styles.productMetric}>
          <Text style={styles.productMetricLabel}>Sales</Text>
          <Text style={[styles.productMetricValue, { color: THEME.neonCyan }]}>{product.sales}</Text>
        </View>
        <View style={styles.productMetric}>
          <Text style={styles.productMetricLabel}>Revenue</Text>
          <Text style={[styles.productMetricValue, { color: THEME.emeraldGreen }]}>{product.revenue}</Text>
        </View>
        <View style={styles.productMetric}>
          <Text style={styles.productMetricLabel}>Margin</Text>
          <Text style={[styles.productMetricValue, { color: THEME.purple }]}>{product.margin}%</Text>
        </View>
      </View>
      <View style={styles.productRating}>
        <Star size={14} color={THEME.amber} />
        <Text style={styles.ratingText}>{product.rating}</Text>
      </View>
    </BlurView>
  );

  const renderTrendCard = (trend: typeof PRODUCT_TRENDS[0]) => {
    const impactColors = {
      High: THEME.red,
      Medium: THEME.amber,
      Low: THEME.electricBlue,
    };
    const color =impactColors[trend.impact as keyof typeof impactColors];

    return (
      <BlurView key={trend.trend} intensity={20} tint="dark" style={styles.trendCard}>
        <View style={styles.trendHeader}>
          <Flame size={16} color={THEME.magenta} />
          <Text style={styles.trendName}>{trend.trend}</Text>
        </View>
        <Text style={styles.trendCategory}>{trend.category}</Text>
        <View style={styles.trendMetrics}>
          <View style={styles.trendMetric}>
            <Text style={styles.trendMetricLabel}>Growth</Text>
            <Text style={[styles.trendMetricValue, { color: THEME.emeraldGreen }]}>{trend.growth}%</Text>
          </View>
          <View style={[styles.impactBadge, { backgroundColor: color + '20' }]}>
            <Text style={[styles.impactText, { color }]}>{trend.impact}</Text>
          </View>
        </View>
      </BlurView>
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
            <Package size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Merchandising Command Center</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Merchandising Metrics */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <BarChart3 size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Merchandising Metrics</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.metricsCard}>
            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <Box size={20} color={THEME.neonCyan} />
                <Text style={styles.metricLabel}>Total Products</Text>
                <Text style={[styles.metricValue, { color: THEME.neonCyan }]}>{MERCHANDISING_METRICS.totalProducts}</Text>
              </View>
              <View style={styles.metricItem}>
                <Target size={20} color={THEME.electricBlue} />
                <Text style={styles.metricLabel}>Avg Margin</Text>
                <Text style={[styles.metricValue, { color: THEME.electricBlue }]}>{MERCHANDISING_METRICS.avgMargin}%</Text>
              </View>
              <View style={styles.metricItem}>
                <Activity size={20} color={THEME.emeraldGreen} />
                <Text style={styles.metricLabel}>Product Velocity</Text>
                <Text style={[styles.metricValue, { color: THEME.emeraldGreen }]}>{MERCHANDISING_METRICS.productVelocity}x</Text>
              </View>
              <View style={styles.metricItem}>
                <Zap size={20} color={THEME.purple} />
                <Text style={styles.metricLabel}>Assortment Efficiency</Text>
                <Text style={[styles.metricValue, { color: THEME.purple }]}>{MERCHANDISING_METRICS.assortmentEfficiency}%</Text>
              </View>
              <View style={styles.metricItem}>
                <ShoppingCart size={20} color={THEME.amber} />
                <Text style={styles.metricLabel}>Shelf Optimization</Text>
                <Text style={[styles.metricValue, { color: THEME.amber }]}>{MERCHANDISING_METRICS.shelfOptimization}%</Text>
              </View>
              <View style={styles.metricItem}>
                <TrendingUp size={20} color={THEME.magenta} />
                <Text style={styles.metricLabel}>Trend Accuracy</Text>
                <Text style={[styles.metricValue, { color: THEME.magenta }]}>{MERCHANDISING_METRICS.trendAccuracy}%</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Product Categories */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Tag size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Product Categories</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            <View style={styles.categoriesContainer}>
              {PRODUCT_CATEGORIES.map((category) => renderCategoryCard(category))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Top Performing Products */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Award size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Top Performing Products</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsScroll}>
            <View style={styles.productsContainer}>
              {TOP_PRODUCTS.map((product) => renderProductCard(product))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Product Trends */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Flame size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Product Trends</Text>
          </View>
          <View style={styles.trendsContainer}>
            {PRODUCT_TRENDS.map((trend) => renderTrendCard(trend))}
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
  trendBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  trendBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  productsScroll: {
    marginBottom: 0,
  },
  productsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  productCard: {
    width: 180,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 12,
  },
  productMetrics: {
    gap: 8,
    marginBottom: 12,
  },
  productMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  productMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.amber,
  },
  trendsContainer: {
    gap: 12,
  },
  trendCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  trendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  trendName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  trendCategory: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 12,
  },
  trendMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trendMetric: {
    flexDirection: 'row',
    gap: 8,
  },
  trendMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  trendMetricValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  impactText: {
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
