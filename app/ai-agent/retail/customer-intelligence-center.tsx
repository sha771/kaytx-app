/**
 * =============================================================================
 * CUSTOMER INTELLIGENCE CENTER
 * =============================================================================
 *
 * A comprehensive customer analytics dashboard that monitors customer segments,
 * purchase behavior, loyalty activity, churn risk, and customer lifetime value
 * across the retail customer base.
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
  Heart,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Target,
  Activity,
  Zap,
  Star,
  Award,
  ShoppingCart,
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

// Customer Segments
const CUSTOMER_SEGMENTS = [
  { segment: 'Premium Members', count: '8.4M', avgSpend: '$340', retention: 94, growth: 12 },
  { segment: 'Regular Shoppers', count: '24.6M', avgSpend: '$180', retention: 78, growth: 8 },
  { segment: 'Occasional Buyers', count: '12.8M', avgSpend: '$65', retention: 42, growth: -5 },
  { segment: 'New Customers', count: '2.2M', avgSpend: '$45', retention: 28, growth: 22 },
];

// Loyalty Tiers
const LOYALTY_TIERS = [
  { tier: 'Platinum', members: '1.2M', benefits: 'Free shipping, 5% cashback, exclusive access', color: THEME.neonCyan },
  { tier: 'Gold', members: '8.4M', benefits: 'Free shipping, 3% cashback, priority support', color: THEME.amber },
  { tier: 'Silver', members: '14.8M', benefits: 'Free shipping on $50+, 1% cashback', color: THEME.electricBlue },
  { tier: 'Bronze', members: '9.6M', benefits: 'Birthday rewards, member-only sales', color: THEME.purple },
];

// Customer Metrics
const CUSTOMER_METRICS = {
  activeCustomers: '48M',
  repeatPurchaseRate: 68,
  customerSatisfaction: 92,
  netPromoterScore: 72,
  avgOrderValue: '$89.40',
  customerLifetimeValue: '$2,840',
};

// Churn Risk Analysis
const CHURN_RISK = [
  { segment: 'Occasional Buyers', risk: 'High', probability: 34, action: 'Targeted re-engagement campaign' },
  { segment: 'New Customers', risk: 'Medium', probability: 28, action: 'Onboarding optimization' },
  { segment: 'Regular Shoppers', risk: 'Low', probability: 12, action: 'Loyalty program promotion' },
  { segment: 'Premium Members', risk: 'Very Low', probability: 6, action: 'Exclusive benefits enhancement' },
];

export default function CustomerIntelligenceCenter() {
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

  const renderSegmentCard = (segment: typeof CUSTOMER_SEGMENTS[0]) => (
    <BlurView key={segment.segment} intensity={20} tint="dark" style={styles.segmentCard}>
      <Text style={styles.segmentName}>{segment.segment}</Text>
      <View style={styles.segmentMetrics}>
        <View style={styles.segmentMetric}>
          <Text style={styles.segmentMetricLabel}>Customers</Text>
          <Text style={[styles.segmentMetricValue, { color: THEME.neonCyan }]}>{segment.count}</Text>
        </View>
        <View style={styles.segmentMetric}>
          <Text style={styles.segmentMetricLabel}>Avg Spend</Text>
          <Text style={[styles.segmentMetricValue, { color: THEME.electricBlue }]}>{segment.avgSpend}</Text>
        </View>
        <View style={styles.segmentMetric}>
          <Text style={styles.segmentMetricLabel}>Retention</Text>
          <Text style={[styles.segmentMetricValue, { color: THEME.emeraldGreen }]}>{segment.retention}%</Text>
        </View>
      </View>
      {renderTrendIndicator(segment.growth, segment.growth >= 0 ? 'up' : 'down')}
    </BlurView>
  );

  const renderLoyaltyTier = (tier: typeof LOYALTY_TIERS[0]) => (
    <BlurView key={tier.tier} intensity={20} tint="dark" style={styles.loyaltyCard}>
      <View style={[styles.loyaltyHeader, { backgroundColor: tier.color + '20' }]}>
        <Star size={20} color={tier.color} />
        <Text style={[styles.loyaltyTier, { color: tier.color }]}>{tier.tier}</Text>
      </View>
      <Text style={styles.loyaltyMembers}>{tier.members} members</Text>
      <Text style={styles.loyaltyBenefits}>{tier.benefits}</Text>
    </BlurView>
  );

  const renderChurnRisk = (risk: typeof CHURN_RISK[0]) => {
    const riskColors = {
      High: THEME.red,
      Medium: THEME.amber,
      Low: THEME.emeraldGreen,
      'Very Low': THEME.neonCyan,
    };
    const color = riskColors[risk.risk as keyof typeof riskColors];

    return (
      <BlurView key={risk.segment} intensity={20} tint="dark" style={styles.churnCard}>
        <View style={styles.churnHeader}>
          <Text style={styles.churnSegment}>{risk.segment}</Text>
          <View style={[styles.riskBadge, { backgroundColor: color + '20' }]}>
            <Text style={[styles.riskText, { color }]}>{risk.risk} RISK</Text>
          </View>
        </View>
        <View style={styles.churnMetrics}>
          <View style={styles.churnMetric}>
            <Text style={styles.churnMetricLabel}>Probability</Text>
            <Text style={[styles.churnMetricValue, { color }]}>{risk.probability}%</Text>
          </View>
        </View>
        <View style={styles.churnAction}>
          <Text style={styles.churnActionLabel}>Recommended Action:</Text>
          <Text style={styles.churnActionText}>{risk.action}</Text>
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
            <Users size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Customer Intelligence Center</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Customer Metrics */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <BarChart3 size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Customer Metrics</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.metricsCard}>
            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <Users size={20} color={THEME.neonCyan} />
                <Text style={styles.metricLabel}>Active Customers</Text>
                <Text style={[styles.metricValue, { color: THEME.neonCyan }]}>{CUSTOMER_METRICS.activeCustomers}</Text>
              </View>
              <View style={styles.metricItem}>
                <ShoppingCart size={20} color={THEME.electricBlue} />
                <Text style={styles.metricLabel}>Repeat Rate</Text>
                <Text style={[styles.metricValue, { color: THEME.electricBlue }]}>{CUSTOMER_METRICS.repeatPurchaseRate}%</Text>
              </View>
              <View style={styles.metricItem}>
                <Star size={20} color={THEME.emeraldGreen} />
                <Text style={styles.metricLabel}>Satisfaction</Text>
                <Text style={[styles.metricValue, { color: THEME.emeraldGreen }]}>{CUSTOMER_METRICS.customerSatisfaction}%</Text>
              </View>
              <View style={styles.metricItem}>
                <Award size={20} color={THEME.purple} />
                <Text style={styles.metricLabel}>NPS Score</Text>
                <Text style={[styles.metricValue, { color: THEME.purple }]}>{CUSTOMER_METRICS.netPromoterScore}</Text>
              </View>
              <View style={styles.metricItem}>
                <Target size={20} color={THEME.amber} />
                <Text style={styles.metricLabel}>Avg Order Value</Text>
                <Text style={[styles.metricValue, { color: THEME.amber }]}>{CUSTOMER_METRICS.avgOrderValue}</Text>
              </View>
              <View style={styles.metricItem}>
                <TrendingUp size={20} color={THEME.magenta} />
                <Text style={styles.metricLabel}>Lifetime Value</Text>
                <Text style={[styles.metricValue, { color: THEME.magenta }]}>{CUSTOMER_METRICS.customerLifetimeValue}</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Customer Segments */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Users size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Customer Segments</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.segmentsScroll}>
            <View style={styles.segmentsContainer}>
              {CUSTOMER_SEGMENTS.map((segment) => renderSegmentCard(segment))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Loyalty Tiers */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Heart size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Loyalty Program Tiers</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.loyaltyScroll}>
            <View style={styles.loyaltyContainer}>
              {LOYALTY_TIERS.map((tier) => renderLoyaltyTier(tier))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Churn Risk Analysis */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <AlertTriangle size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Churn Risk Analysis</Text>
          </View>
          <View style={styles.churnContainer}>
            {CHURN_RISK.map((risk) => renderChurnRisk(risk))}
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
  segmentsScroll: {
    marginBottom: 0,
  },
  segmentsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  segmentCard: {
    width: 180,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  segmentName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 12,
  },
  segmentMetrics: {
    gap: 8,
    marginBottom: 12,
  },
  segmentMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  segmentMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  segmentMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  loyaltyScroll: {
    marginBottom: 0,
  },
  loyaltyContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  loyaltyCard: {
    width: 200,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  loyaltyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    padding: 8,
    borderRadius: 8,
  },
  loyaltyTier: {
    fontSize: 16,
    fontWeight: '700',
  },
  loyaltyMembers: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 8,
  },
  loyaltyBenefits: {
    fontSize: 12,
    color: THEME.textMuted,
    lineHeight: 16,
  },
  churnContainer: {
    gap: 12,
  },
  churnCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  churnHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  churnSegment: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  riskText: {
    fontSize: 10,
    fontWeight: '600',
  },
  churnMetrics: {
    marginBottom: 12,
  },
  churnMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  churnMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  churnMetricValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  churnAction: {
    backgroundColor: THEME.card,
    padding: 12,
    borderRadius: 8,
  },
  churnActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.textMuted,
    marginBottom: 4,
  },
  churnActionText: {
    fontSize: 13,
    color: THEME.text,
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
