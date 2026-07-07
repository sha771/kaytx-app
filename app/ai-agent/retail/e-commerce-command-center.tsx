/**
 * =============================================================================
 * E-COMMERCE COMMAND CENTER
 * =============================================================================
 *
 * A comprehensive e-commerce dashboard that monitors online revenue, website
 * traffic, cart abandonment, product recommendations, and checkout conversion
 * across the digital retail platform.
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
  ShoppingCart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Target,
  Activity,
  Zap,
  Globe,
  MousePointer,
  ShoppingBag,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Clock,
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

// E-Commerce Metrics
const ECOMMERCE_METRICS = {
  onlineRevenue: '$2.8B',
  websiteTraffic: '124M',
  conversionRate: 3.2,
  avgOrderValue: '$94.50',
  cartAbandonment: 68,
  mobileShare: 72,
};

// Traffic Sources
const TRAFFIC_SOURCES = [
  { source: 'Organic Search', visitors: '45M', conversion: 3.8, revenue: '$420M', trend: 'up' },
  { source: 'Direct', visitors: '28M', conversion: 4.2, revenue: '$340M', trend: 'up' },
  { source: 'Social Media', visitors: '24M', conversion: 2.4, revenue: '$180M', trend: 'stable' },
  { source: 'Email', visitors: '15M', conversion: 4.8, revenue: '$220M', trend: 'up' },
  { source: 'Paid Ads', visitors: '12M', conversion: 2.8, revenue: '$140M', trend: 'down' },
];

// Product Recommendations
const RECOMMENDATION_PERFORMANCE = [
  { algorithm: 'Collaborative Filtering', impressions: '89M', clicks: '12.4M', conversions: '2.8M', lift: 34 },
  { algorithm: 'Content-Based', impressions: '67M', clicks: '8.9M', conversions: '1.9M', lift: 28 },
  { algorithm: 'Hybrid Model', impressions: '45M', clicks: '6.7M', conversions: '1.5M', lift: 42 },
  { algorithm: 'Deep Learning', impressions: '34M', clicks: '5.2M', conversions: '1.2M', lift: 38 },
];

// Checkout Funnel
const CHECKOUT_FUNNEL = [
  { stage: 'Product View', users: '124M', dropoff: 0, completion: 100 },
  { stage: 'Add to Cart', users: '45M', dropoff: 64, completion: 36 },
  { stage: 'Begin Checkout', users: '28M', dropoff: 38, completion: 22 },
  { stage: 'Shipping Info', users: '18M', dropoff: 36, completion: 14 },
  { stage: 'Payment', users: '12M', dropoff: 33, completion: 9 },
  { stage: 'Order Complete', users: '4M', dropoff: 67, completion: 3 },
];

export default function ECommerceCommandCenter() {
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

  const renderTrafficCard = (traffic: typeof TRAFFIC_SOURCES[0]) => {
    const trendColors = {
      up: THEME.emeraldGreen,
      stable: THEME.electricBlue,
      down: THEME.red,
    };
    const color = trendColors[traffic.trend as keyof typeof trendColors];

    return (
      <BlurView key={traffic.source} intensity={20} tint="dark" style={styles.trafficCard}>
        <Text style={styles.trafficSource}>{traffic.source}</Text>
        <View style={styles.trafficMetrics}>
          <View style={styles.trafficMetric}>
            <Text style={styles.trafficMetricLabel}>Visitors</Text>
            <Text style={[styles.trafficMetricValue, { color: THEME.neonCyan }]}>{traffic.visitors}</Text>
          </View>
          <View style={styles.trafficMetric}>
            <Text style={styles.trafficMetricLabel}>Conversion</Text>
            <Text style={[styles.trafficMetricValue, { color: THEME.electricBlue }]}>{traffic.conversion}%</Text>
          </View>
          <View style={styles.trafficMetric}>
            <Text style={styles.trafficMetricLabel}>Revenue</Text>
            <Text style={[styles.trafficMetricValue, { color: THEME.emeraldGreen }]}>{traffic.revenue}</Text>
          </View>
        </View>
        {renderTrendIndicator(traffic.trend === 'up' ? 12 : traffic.trend === 'down' ? -8 : 0, traffic.trend)}
      </BlurView>
    );
  };

  const renderRecommendationCard = (rec: typeof RECOMMENDATION_PERFORMANCE[0]) => (
    <BlurView key={rec.algorithm} intensity={20} tint="dark" style={styles.recCard}>
      <Text style={styles.recAlgorithm}>{rec.algorithm}</Text>
      <View style={styles.recMetrics}>
        <View style={styles.recMetric}>
          <Text style={styles.recMetricLabel}>Impressions</Text>
          <Text style={[styles.recMetricValue, { color: THEME.neonCyan }]}>{rec.impressions}</Text>
        </View>
        <View style={styles.recMetric}>
          <Text style={styles.recMetricLabel}>Clicks</Text>
          <Text style={[styles.recMetricValue, { color: THEME.electricBlue }]}>{rec.clicks}</Text>
        </View>
        <View style={styles.recMetric}>
          <Text style={styles.recMetricLabel}>Conversions</Text>
          <Text style={[styles.recMetricValue, { color: THEME.emeraldGreen }]}>{rec.conversions}</Text>
        </View>
        <View style={styles.recMetric}>
          <Text style={styles.recMetricLabel}>Lift</Text>
          <Text style={[styles.recMetricValue, { color: THEME.purple }]}>{rec.lift}%</Text>
        </View>
      </View>
    </BlurView>
  );

  const renderFunnelStage = (stage: typeof CHECKOUT_FUNNEL[0], index: number) => {
    const dropoffColor = stage.dropoff > 50 ? THEME.red : stage.dropoff > 30 ? THEME.amber : THEME.emeraldGreen;

    return (
      <BlurView key={stage.stage} intensity={20} tint="dark" style={styles.funnelCard}>
        <View style={styles.funnelHeader}>
          <Text style={styles.funnelStage}>{stage.stage}</Text>
          <View style={[styles.funnelIndex, { backgroundColor: THEME.neonCyan + '20' }]}>
            <Text style={[styles.funnelIndexText, { color: THEME.neonCyan }]}>{index + 1}</Text>
          </View>
        </View>
        <View style={styles.funnelMetrics}>
          <View style={styles.funnelMetric}>
            <Text style={styles.funnelMetricLabel}>Users</Text>
            <Text style={[styles.funnelMetricValue, { color: THEME.neonCyan }]}>{stage.users}</Text>
          </View>
          <View style={styles.funnelMetric}>
            <Text style={styles.funnelMetricLabel}>Dropoff</Text>
            <Text style={[styles.funnelMetricValue, { color: dropoffColor }]}>{stage.dropoff}%</Text>
          </View>
          <View style={styles.funnelMetric}>
            <Text style={styles.funnelMetricLabel}>Completion</Text>
            <Text style={[styles.funnelMetricValue, { color: THEME.emeraldGreen }]}>{stage.completion}%</Text>
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
            <ShoppingCart size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>E-Commerce Command Center</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* E-Commerce Metrics */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <BarChart3 size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>E-Commerce Metrics</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.metricsCard}>
            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <Globe size={20} color={THEME.neonCyan} />
                <Text style={styles.metricLabel}>Online Revenue</Text>
                <Text style={[styles.metricValue, { color: THEME.neonCyan }]}>{ECOMMERCE_METRICS.onlineRevenue}</Text>
              </View>
              <View style={styles.metricItem}>
                <MousePointer size={20} color={THEME.electricBlue} />
                <Text style={styles.metricLabel}>Website Traffic</Text>
                <Text style={[styles.metricValue, { color: THEME.electricBlue }]}>{ECOMMERCE_METRICS.websiteTraffic}</Text>
              </View>
              <View style={styles.metricItem}>
                <Target size={20} color={THEME.emeraldGreen} />
                <Text style={styles.metricLabel}>Conversion Rate</Text>
                <Text style={[styles.metricValue, { color: THEME.emeraldGreen }]}>{ECOMMERCE_METRICS.conversionRate}%</Text>
              </View>
              <View style={styles.metricItem}>
                <ShoppingBag size={20} color={THEME.purple} />
                <Text style={styles.metricLabel}>Avg Order Value</Text>
                <Text style={[styles.metricValue, { color: THEME.purple }]}>{ECOMMERCE_METRICS.avgOrderValue}</Text>
              </View>
              <View style={styles.metricItem}>
                <AlertTriangle size={20} color={THEME.amber} />
                <Text style={styles.metricLabel}>Cart Abandonment</Text>
                <Text style={[styles.metricValue, { color: THEME.amber }]}>{ECOMMERCE_METRICS.cartAbandonment}%</Text>
              </View>
              <View style={styles.metricItem}>
                <Activity size={20} color={THEME.magenta} />
                <Text style={styles.metricLabel}>Mobile Share</Text>
                <Text style={[styles.metricValue, { color: THEME.magenta }]}>{ECOMMERCE_METRICS.mobileShare}%</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Traffic Sources */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Globe size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Traffic Sources</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.trafficScroll}>
            <View style={styles.trafficContainer}>
              {TRAFFIC_SOURCES.map((traffic) => renderTrafficCard(traffic))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Product Recommendations */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Zap size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Recommendation Performance</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recScroll}>
            <View style={styles.recContainer}>
              {RECOMMENDATION_PERFORMANCE.map((rec) => renderRecommendationCard(rec))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Checkout Funnel */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <CreditCard size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Checkout Funnel</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.funnelScroll}>
            <View style={styles.funnelContainer}>
              {CHECKOUT_FUNNEL.map((stage, index) => renderFunnelStage(stage, index))}
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
  trafficScroll: {
    marginBottom: 0,
  },
  trafficContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  trafficCard: {
    width: 160,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  trafficSource: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 12,
  },
  trafficMetrics: {
    gap: 8,
    marginBottom: 12,
  },
  trafficMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trafficMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  trafficMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  recScroll: {
    marginBottom: 0,
  },
  recContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  recCard: {
    width: 180,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  recAlgorithm: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 12,
  },
  recMetrics: {
    gap: 8,
  },
  recMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  recMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  funnelScroll: {
    marginBottom: 0,
  },
  funnelContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  funnelCard: {
    width: 160,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  funnelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  funnelStage: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    flex: 1,
  },
  funnelIndex: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  funnelIndexText: {
    fontSize: 12,
    fontWeight: '600',
  },
  funnelMetrics: {
    gap: 8,
  },
  funnelMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  funnelMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  funnelMetricValue: {
    fontSize: 14,
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
