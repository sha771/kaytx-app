import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight,
  BarChart3, Target, Activity, Percent, Zap,
  AlertTriangle, CheckCircle, Scale, Tag, Badge,
  MoreHorizontal, RefreshCw
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function PricingIntelligencePage() {
  const PRICING_METRICS = [
    { label: 'Margin Growth', value: '+8.4%', icon: TrendingUp, color: '#10B981', trend: '+2.4%', trendUp: true },
    { label: 'Pricing Adjustments', value: '12.4K', icon: RefreshCw, color: '#3B82F6', trend: '+18.7%', trendUp: true },
    { label: 'Revenue Impact', value: '$180M', icon: DollarSign, color: '#8B5CF6', trend: '+15.8%', trendUp: true },
    { label: 'Price Elasticity', value: '-1.8', icon: Activity, color: '#F59E0B', trend: '+0.2', trendUp: true },
    { label: 'Competitive Gap', value: '+2.4%', icon: Target, color: '#EC4899', trend: '-0.8%', trendUp: false },
    { label: 'Optimization Rate', value: '94.6%', icon: Zap, color: '#06B6D4', trend: '+3.2%', trendUp: true },
  ];

  const DYNAMIC_PRICING = [
    { product: 'Wireless Earbuds Pro', basePrice: '$149', currentPrice: '$139', discount: '6.7%', demand: 'High', elasticity: '-1.4', color: '#10B981' },
    { product: 'Smart Watch Series 5', basePrice: '$299', currentPrice: '$279', discount: '6.7%', demand: 'Medium', elasticity: '-1.2', color: '#3B82F6' },
    { product: 'Running Shoes Elite', basePrice: '$189', currentPrice: '$169', discount: '10.6%', demand: 'High', elasticity: '-1.8', color: '#8B5CF6' },
    { product: 'Yoga Mat Premium', basePrice: '$89', currentPrice: '$79', discount: '11.2%', demand: 'Medium', elasticity: '-1.6', color: '#F59E0B' },
    { product: 'Skincare Set Premium', basePrice: '$129', currentPrice: '$119', discount: '7.8%', demand: 'Low', elasticity: '-1.0', color: '#EC4899' },
  ];

  const COMPETITIVE_INTELLIGENCE = [
    { competitor: 'TechGiant Inc', product: 'Wireless Earbuds', theirPrice: '$145', ourPrice: '$139', position: 'Lower', advantage: '4.1%', color: '#10B981' },
    { competitor: 'ElectroWorld', product: 'Smart Watch', theirPrice: '$289', ourPrice: '$279', position: 'Lower', advantage: '3.5%', color: '#10B981' },
    { competitor: 'SportMaster', product: 'Running Shoes', theirPrice: '$179', ourPrice: '$169', position: 'Lower', advantage: '5.6%', color: '#10B981' },
    { competitor: 'FitLife Co', product: 'Yoga Mat', theirPrice: '$85', ourPrice: '$79', position: 'Lower', advantage: '7.1%', color: '#10B981' },
    { competitor: 'BeautyBrand', product: 'Skincare Set', theirPrice: '$125', ourPrice: '$119', position: 'Lower', advantage: '4.8%', color: '#10B981' },
  ];

  const PROMOTION_PERFORMANCE = [
    { promotion: 'Summer Sale 2024', discount: '25%', lift: '+34.2%', revenue: '$42.8M', margin: '38%', status: 'Active', color: '#10B981' },
    { promotion: 'Flash Friday', discount: '15%', lift: '+28.6%', revenue: '$18.4M', margin: '42%', status: 'Completed', color: '#3B82F6' },
    { promotion: 'Loyalty Exclusive', discount: '20%', lift: '+22.4%', revenue: '$12.6M', margin: '40%', status: 'Active', color: '#8B5CF6' },
    { promotion: 'Bundle Deal', discount: '30%', lift: '+45.2%', revenue: '$28.2M', margin: '35%', status: 'Active', color: '#F59E0B' },
  ];

  const MARGIN_ANALYTICS = [
    { category: 'Electronics', grossMargin: '42%', netMargin: '28%', trend: '+2.4%', color: '#3B82F6' },
    { category: 'Apparel', grossMargin: '58%', netMargin: '34%', trend: '+1.8%', color: '#10B981' },
    { category: 'Home & Garden', grossMargin: '45%', netMargin: '29%', trend: '+3.2%', color: '#8B5CF6' },
    { category: 'Sports & Outdoors', grossMargin: '52%', netMargin: '36%', trend: '+2.8%', color: '#F59E0B' },
    { category: 'Beauty & Personal', grossMargin: '65%', netMargin: '42%', trend: '+4.2%', color: '#EC4899' },
  ];

  const PRICING_RECOMMENDATIONS = [
    { type: 'Increase', product: 'Wireless Earbuds Pro', current: '$139', recommended: '$145', reason: 'High demand, low competition', impact: '+$2.4M', confidence: '94%' },
    { type: 'Decrease', product: 'Skincare Set Premium', current: '$119', recommended: '$109', reason: 'Low demand, high inventory', impact: '+$1.8M', confidence: '88%' },
    { type: 'Maintain', product: 'Smart Watch Series 5', current: '$279', recommended: '$279', reason: 'Optimal price point', impact: '$0', confidence: '96%' },
    { type: 'Increase', product: 'Running Shoes Elite', current: '$169', recommended: '$179', reason: 'Competitor price increase', impact: '+$3.2M', confidence: '91%' },
  ];

  const renderPricingMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Pricing Metrics</Text>
      <View style={styles.metricsGrid}>
        {PRICING_METRICS.map((metric, index) => (
          <View key={index} style={[styles.metricCard, { backgroundColor: metric.color + '10', borderColor: metric.color }]}>
            <metric.icon size={24} color={metric.color} />
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={styles.metricLabel}>{metric.label}</Text>
            <View style={styles.metricTrend}>
              {metric.trendUp ? <ArrowUpRight size={12} color="#10B981" /> : <ArrowDownRight size={12} color="#EF4444" />}
              <Text style={[styles.metricTrendText, { color: metric.trendUp ? '#10B981' : '#EF4444' }]}>{metric.trend}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderDynamicPricing = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Dynamic Pricing</Text>
      <View style={styles.pricingGrid}>
        {DYNAMIC_PRICING.map((item) => (
          <View key={item.product} style={[styles.pricingCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: item.color }]}>
            <View style={styles.pricingHeader}>
              <Tag size={20} color={item.color} />
              <Text style={styles.pricingProduct}>{item.product}</Text>
              <Badge size={16} color="#F59E0B" />
            </View>
            <View style={styles.pricingPrices}>
              <View style={styles.pricingPrice}>
                <Text style={styles.pricingPriceLabel}>Base</Text>
                <Text style={styles.pricingPriceValue}>{item.basePrice}</Text>
              </View>
              <ArrowDownRight size={16} color="#10B981" />
              <View style={styles.pricingPrice}>
                <Text style={styles.pricingPriceLabel}>Current</Text>
                <Text style={[styles.pricingPriceValue, { color: '#10B981' }]}>{item.currentPrice}</Text>
              </View>
            </View>
            <View style={styles.pricingMetrics}>
              <View style={styles.pricingMetric}>
                <Percent size={12} color="#6B7280" />
                <Text style={styles.pricingMetricText}>{item.discount} off</Text>
              </View>
              <View style={styles.pricingMetric}>
                <Activity size={12} color="#6B7280" />
                <Text style={styles.pricingMetricText}>{item.demand} demand</Text>
              </View>
              <View style={styles.pricingMetric}>
                <Scale size={12} color="#6B7280" />
                <Text style={styles.pricingMetricText}>Elasticity {item.elasticity}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderCompetitiveIntelligence = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Competitive Intelligence</Text>
      {COMPETITIVE_INTELLIGENCE.map((item) => (
        <View key={item.competitor} style={[styles.competitorCard, { backgroundColor: '#0A0F1A' }]}>
          <View style={styles.competitorHeader}>
            <Target size={20} color="#8B5CF6" />
            <Text style={styles.competitorName}>{item.competitor}</Text>
            <Text style={styles.competitorProduct}>{item.product}</Text>
          </View>
          <View style={styles.competitorPrices}>
            <View style={styles.competitorPrice}>
              <Text style={styles.competitorPriceLabel}>Their Price</Text>
              <Text style={styles.competitorPriceValue}>{item.theirPrice}</Text>
            </View>
            <View style={styles.competitorPrice}>
              <Text style={styles.competitorPriceLabel}>Our Price</Text>
              <Text style={[styles.competitorPriceValue, { color: '#10B981' }]}>{item.ourPrice}</Text>
            </View>
            <View style={styles.competitorAdvantage}>
              <Text style={styles.competitorAdvantageLabel}>Advantage</Text>
              <Text style={[styles.competitorAdvantageValue, { color: '#10B981' }]}>{item.advantage}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderPromotionPerformance = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Promotion Performance</Text>
      <View style={styles.promotionsGrid}>
        {PROMOTION_PERFORMANCE.map((promo) => (
          <View key={promo.promotion} style={[styles.promoCard, { backgroundColor: promo.color + '10', borderColor: promo.color }]}>
            <Zap size={24} color={promo.color} />
            <Text style={styles.promoName}>{promo.promotion}</Text>
            <View style={[styles.promoDiscount, { backgroundColor: promo.color + '20' }]}>
              <Percent size={14} color={promo.color} />
              <Text style={[styles.promoDiscountText, { color: promo.color }]}>{promo.discount}</Text>
            </View>
            <View style={styles.promoMetrics}>
              <View style={styles.promoMetric}>
                <Text style={styles.promoMetricValue}>{promo.lift}</Text>
                <Text style={styles.promoMetricLabel}>Lift</Text>
              </View>
              <View style={styles.promoMetric}>
                <Text style={styles.promoMetricValue}>{promo.revenue}</Text>
                <Text style={styles.promoMetricLabel}>Revenue</Text>
              </View>
              <View style={styles.promoMetric}>
                <Text style={styles.promoMetricValue}>{promo.margin}</Text>
                <Text style={styles.promoMetricLabel}>Margin</Text>
              </View>
            </View>
            <View style={[styles.promoStatus, { backgroundColor: promo.status === 'Active' ? '#10B98120' : '#6B728020' }]}>
              <Text style={[styles.promoStatusText, { color: promo.status === 'Active' ? '#10B981' : '#6B7280' }]}>{promo.status}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderMarginAnalytics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Margin Analytics</Text>
      <View style={styles.marginList}>
        {MARGIN_ANALYTICS.map((item) => (
          <View key={item.category} style={[styles.marginCard, { backgroundColor: item.color + '10', borderColor: item.color }]}>
            <View style={styles.marginHeader}>
              <Scale size={20} color={item.color} />
              <Text style={styles.marginCategory}>{item.category}</Text>
            </View>
            <View style={styles.marginMetrics}>
              <View style={styles.marginMetric}>
                <Text style={styles.marginMetricLabel}>Gross Margin</Text>
                <Text style={styles.marginMetricValue}>{item.grossMargin}</Text>
              </View>
              <View style={styles.marginMetric}>
                <Text style={styles.marginMetricLabel}>Net Margin</Text>
                <Text style={styles.marginMetricValue}>{item.netMargin}</Text>
              </View>
              <View style={styles.marginMetric}>
                <Text style={styles.marginMetricLabel}>Trend</Text>
                <Text style={[styles.marginMetricValue, { color: '#10B981' }]}>{item.trend}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderPricingRecommendations = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>AI Pricing Recommendations</Text>
      {PRICING_RECOMMENDATIONS.map((rec) => (
        <View key={rec.product} style={[styles.recCard, { 
          backgroundColor: '#0A0F1A',
          borderLeftColor: rec.type === 'Increase' ? '#10B981' : rec.type === 'Decrease' ? '#EF4444' : '#6B7280',
          borderLeftWidth: 3
        }]}>
          <View style={styles.recHeader}>
            {rec.type === 'Increase' && <ArrowUpRight size={20} color="#10B981" />}
            {rec.type === 'Decrease' && <ArrowDownRight size={20} color="#EF4444" />}
            {rec.type === 'Maintain' && <Activity size={20} color="#6B7280" />}
            <View style={styles.recInfo}>
              <Text style={styles.recProduct}>{rec.product}</Text>
              <Text style={styles.recType}>{rec.type} Price</Text>
            </View>
            <View style={[styles.recConfidence, { backgroundColor: '#8B5CF620' }]}>
              <Text style={[styles.recConfidenceText, { color: '#8B5CF6' }]}>{rec.confidence} confidence</Text>
            </View>
          </View>
          <View style={styles.recPrices}>
            <View style={styles.recPrice}>
              <Text style={styles.recPriceLabel}>Current</Text>
              <Text style={styles.recPriceValue}>{rec.current}</Text>
            </View>
            <ArrowUpRight size={16} color="#6B7280" />
            <View style={styles.recPrice}>
              <Text style={styles.recPriceLabel}>Recommended</Text>
              <Text style={[styles.recPriceValue, { color: rec.type === 'Increase' ? '#10B981' : rec.type === 'Decrease' ? '#EF4444' : '#6B7280' }]}>{rec.recommended}</Text>
            </View>
          </View>
          <Text style={styles.recReason}>{rec.reason}</Text>
          <View style={styles.recImpact}>
            <DollarSign size={14} color="#10B981" />
            <Text style={styles.recImpactText}>Impact: {rec.impact}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <DollarSign size={32} color="#8B5CF6" />
        <View>
          <Text style={styles.headerTitle}>Pricing Intelligence Engine</Text>
          <Text style={styles.headerSubtitle}>Dynamic pricing optimization and competitive analysis</Text>
        </View>
      </View>

      {renderPricingMetrics()}
      {renderDynamicPricing()}
      {renderCompetitiveIntelligence()}
      {renderPromotionPerformance()}
      {renderMarginAnalytics()}
      {renderPricingRecommendations()}
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
    padding: 24,
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: (width - 64) / 3 - 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricTrendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  pricingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  pricingCard: {
    width: (width - 64) / 2 - 8,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  pricingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pricingProduct: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  pricingPrices: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pricingPrice: {
    alignItems: 'center',
  },
  pricingPriceLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  pricingPriceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  pricingMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  pricingMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pricingMetricText: {
    fontSize: 11,
    color: '#6B7280',
  },
  competitorCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  competitorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  competitorName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  competitorProduct: {
    fontSize: 12,
    color: '#6B7280',
  },
  competitorPrices: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  competitorPrice: {
    alignItems: 'center',
  },
  competitorPriceLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  competitorPriceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  competitorAdvantage: {
    alignItems: 'center',
  },
  competitorAdvantageLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  competitorAdvantageValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  promotionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  promoCard: {
    width: (width - 64) / 2 - 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    alignItems: 'center',
  },
  promoName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  promoDiscount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  promoDiscountText: {
    fontSize: 12,
    fontWeight: '600',
  },
  promoMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  promoMetric: {
    alignItems: 'center',
  },
  promoMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  promoMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  promoStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  promoStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  marginList: {
    gap: 12,
  },
  marginCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  marginHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  marginCategory: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  marginMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  marginMetric: {
    alignItems: 'center',
  },
  marginMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  marginMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  recCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  recHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  recInfo: {
    flex: 1,
  },
  recProduct: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  recType: {
    fontSize: 12,
    color: '#6B7280',
  },
  recConfidence: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  recConfidenceText: {
    fontSize: 11,
    fontWeight: '600',
  },
  recPrices: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recPrice: {
    alignItems: 'center',
  },
  recPriceLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  recPriceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  recReason: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  recImpact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  recImpactText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
});
