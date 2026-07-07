import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  ShoppingBag, TrendingUp, ArrowUpRight, ArrowDownRight,
  BarChart3, Package, Target, DollarSign, Activity,
  Star, Award, AlertTriangle, CheckCircle, MoreHorizontal,
  Layers, Grid, Tag
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function MerchandisingPage() {
  const MERCHANDISING_METRICS = [
    { label: 'Product Performance', value: '94.2%', icon: Star, color: '#10B981', trend: '+3.8%', trendUp: true },
    { label: 'Category Growth', value: '+18.4%', icon: TrendingUp, color: '#3B82F6', trend: '+2.4%', trendUp: true },
    { label: 'Shelf Optimization', value: '87.6%', icon: Layers, color: '#8B5CF6', trend: '+5.2%', trendUp: true },
    { label: 'Assortment Score', value: '92.4%', icon: Grid, color: '#F59E0B', trend: '+1.8%', trendUp: true },
    { label: 'Product Trends', value: '+24.6%', icon: Activity, color: '#EC4899', trend: '+4.2%', trendUp: true },
    { label: 'Margin Impact', value: '+$180M', icon: DollarSign, color: '#06B6D4', trend: '+8.4%', trendUp: true },
  ];

  const TOP_PERFORMING_PRODUCTS = [
    { product: 'Wireless Earbuds Pro', category: 'Electronics', revenue: '$42.8M', growth: '+34.2%', units: '284K', margin: '42%', color: '#10B981' },
    { product: 'Smart Watch Series 5', category: 'Electronics', revenue: '$38.4M', growth: '+28.6%', units: '156K', margin: '38%', color: '#3B82F6' },
    { product: 'Running Shoes Elite', category: 'Sports', revenue: '$32.6M', growth: '+24.8%', units: '142K', margin: '45%', color: '#8B5CF6' },
    { product: 'Yoga Mat Premium', category: 'Fitness', revenue: '$28.2M', growth: '+22.4%', units: '186K', margin: '52%', color: '#F59E0B' },
    { product: 'Skincare Set Premium', category: 'Beauty', revenue: '$24.8M', growth: '+18.6%', units: '98K', margin: '58%', color: '#EC4899' },
    { product: 'Home Office Desk', category: 'Furniture', revenue: '$22.4M', growth: '+16.2%', units: '24K', margin: '35%', color: '#06B6D4' },
  ];

  const CATEGORY_PERFORMANCE = [
    { category: 'Electronics', revenue: '$420M', growth: '+22.4%', share: '22.1%', products: '8.4K', color: '#3B82F6' },
    { category: 'Apparel', revenue: '$380M', growth: '+18.6%', share: '20.0%', products: '12.4K', color: '#10B981' },
    { category: 'Home & Garden', revenue: '$290M', growth: '+15.2%', share: '15.3%', products: '6.8K', color: '#8B5CF6' },
    { category: 'Sports & Outdoors', revenue: '$240M', growth: '+19.8%', share: '12.6%', products: '4.2K', color: '#F59E0B' },
    { category: 'Beauty & Personal', revenue: '$180M', growth: '+14.4%', share: '9.5%', products: '5.6K', color: '#EC4899' },
    { category: 'Food & Beverage', revenue: '$150M', growth: '+12.8%', share: '7.9%', products: '3.2K', color: '#06B6D4' },
  ];

  const ASSORTMENT_ANALYTICS = [
    { metric: 'Product Mix Efficiency', value: '94.2%', trend: '+2.8%', status: 'Excellent' },
    { metric: 'SKU Rationalization', value: '12.4%', trend: '+1.2%', status: 'Good' },
    { metric: 'Category Balance', value: '88.6%', trend: '+3.4%', status: 'Good' },
    { metric: 'Seasonal Alignment', value: '92.4%', trend: '+4.2%', status: 'Excellent' },
    { metric: 'Local Relevance', value: '86.8%', trend: '+2.6%', status: 'Good' },
  ];

  const PRODUCT_LIFECYCLE = [
    { stage: 'Launch', products: '248', avgRevenue: '$8.4M', growth: '+45.2%', color: '#10B981' },
    { stage: 'Growth', products: '1,248', avgRevenue: '$18.6M', growth: '+28.4%', color: '#3B82F6' },
    { stage: 'Maturity', products: '3,842', avgRevenue: '$12.4M', growth: '+8.2%', color: '#F59E0B' },
    { stage: 'Decline', products: '842', avgRevenue: '$4.2M', growth: '-12.4%', color: '#EF4444' },
  ];

  const PLANOGRAM_PERFORMANCE = [
    { location: 'Flagship Manhattan', compliance: '96.4%', salesLift: '+18.2%', color: '#10B981' },
    { location: 'Downtown Chicago', compliance: '94.8%', salesLift: '+15.6%', color: '#3B82F6' },
    { location: 'Silicon Valley', compliance: '92.6%', salesLift: '+14.2%', color: '#8B5CF6' },
    { location: 'Union Square', compliance: '89.4%', salesLift: '+12.8%', color: '#F59E0B' },
  ];

  const renderMerchandisingMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Merchandising Metrics</Text>
      <View style={styles.metricsGrid}>
        {MERCHANDISING_METRICS.map((metric, index) => (
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

  const renderTopProducts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Top Performing Products</Text>
      <View style={styles.productsGrid}>
        {TOP_PERFORMING_PRODUCTS.map((product) => (
          <View key={product.product} style={[styles.productCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: product.color }]}>
            <View style={styles.productHeader}>
              <ShoppingBag size={20} color={product.color} />
              <Text style={styles.productName}>{product.product}</Text>
              <Award size={16} color="#F59E0B" />
            </View>
            <Text style={styles.productCategory}>{product.category}</Text>
            <View style={styles.productMetrics}>
              <View style={styles.productMetric}>
                <Text style={styles.productMetricValue}>{product.revenue}</Text>
                <Text style={styles.productMetricLabel}>Revenue</Text>
              </View>
              <View style={styles.productMetric}>
                <Text style={styles.productMetricValue}>{product.units}</Text>
                <Text style={styles.productMetricLabel}>Units</Text>
              </View>
              <View style={styles.productMetric}>
                <Text style={styles.productMetricValue}>{product.margin}</Text>
                <Text style={styles.productMetricLabel}>Margin</Text>
              </View>
            </View>
            <View style={styles.productGrowth}>
              <ArrowUpRight size={14} color="#10B981" />
              <Text style={styles.productGrowthText}>{product.growth} growth</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderCategoryPerformance = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Category Performance</Text>
      <View style={styles.categoryList}>
        {CATEGORY_PERFORMANCE.map((category) => (
          <View key={category.category} style={[styles.categoryCard, { backgroundColor: category.color + '10', borderColor: category.color }]}>
            <View style={styles.categoryHeader}>
              <Tag size={20} color={category.color} />
              <Text style={styles.categoryName}>{category.category}</Text>
              <Text style={styles.categoryShare}>{category.share} share</Text>
            </View>
            <View style={styles.categoryMetrics}>
              <View style={styles.categoryMetric}>
                <Text style={styles.categoryMetricValue}>{category.revenue}</Text>
                <Text style={styles.categoryMetricLabel}>Revenue</Text>
              </View>
              <View style={styles.categoryMetric}>
                <Text style={styles.categoryMetricValue}>{category.products}</Text>
                <Text style={styles.categoryMetricLabel}>Products</Text>
              </View>
              <View style={styles.categoryMetric}>
                <Text style={[styles.categoryMetricValue, { color: '#10B981' }]}>{category.growth}</Text>
                <Text style={styles.categoryMetricLabel}>Growth</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAssortmentAnalytics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Assortment Analytics</Text>
      {ASSORTMENT_ANALYTICS.map((item, index) => (
        <View key={index} style={[styles.assortmentCard, { backgroundColor: '#0A0F1A' }]}>
          <View style={styles.assortmentHeader}>
            <Text style={styles.assortmentMetric}>{item.metric}</Text>
            <View style={[styles.statusBadge, { 
              backgroundColor: item.status === 'Excellent' ? '#10B98120' : '#F59E0B20'
            }]}>
              <Text style={[styles.statusText, { 
                color: item.status === 'Excellent' ? '#10B981' : '#F59E0B'
              }]}>{item.status}</Text>
            </View>
          </View>
          <View style={styles.assortmentValue}>
            <Text style={styles.assortmentValueText}>{item.value}</Text>
            <Text style={[styles.assortmentTrend, { color: '#10B981' }]}>{item.trend}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderProductLifecycle = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Product Lifecycle</Text>
      <View style={styles.lifecycleGrid}>
        {PRODUCT_LIFECYCLE.map((stage) => (
          <View key={stage.stage} style={[styles.lifecycleCard, { backgroundColor: stage.color + '10', borderColor: stage.color }]}>
            <Activity size={24} color={stage.color} />
            <Text style={styles.lifecycleStage}>{stage.stage}</Text>
            <Text style={styles.lifecycleProducts}>{stage.products} products</Text>
            <Text style={styles.lifecycleRevenue}>{stage.avgRevenue} avg</Text>
            <View style={styles.lifecycleGrowth}>
              <Text style={[styles.lifecycleGrowthText, { color: stage.growth.includes('+') ? '#10B981' : '#EF4444' }]}>{stage.growth}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderPlanogramPerformance = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Planogram Performance</Text>
      <View style={styles.planogramGrid}>
        {PLANOGRAM_PERFORMANCE.map((item) => (
          <View key={item.location} style={[styles.planogramCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: item.color }]}>
            <Grid size={20} color={item.color} />
            <Text style={styles.planogramLocation}>{item.location}</Text>
            <View style={styles.planogramMetrics}>
              <View style={styles.planogramMetric}>
                <Text style={styles.planogramMetricLabel}>Compliance</Text>
                <Text style={styles.planogramMetricValue}>{item.compliance}</Text>
              </View>
              <View style={styles.planogramMetric}>
                <Text style={styles.planogramMetricLabel}>Sales Lift</Text>
                <Text style={[styles.planogramMetricValue, { color: '#10B981' }]}>{item.salesLift}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ShoppingBag size={32} color="#8B5CF6" />
        <View>
          <Text style={styles.headerTitle}>Merchandising Command Center</Text>
          <Text style={styles.headerSubtitle}>Product performance analysis and assortment optimization</Text>
        </View>
      </View>

      {renderMerchandisingMetrics()}
      {renderTopProducts()}
      {renderCategoryPerformance()}
      {renderAssortmentAnalytics()}
      {renderProductLifecycle()}
      {renderPlanogramPerformance()}
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
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  productCard: {
    width: (width - 64) / 2 - 8,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  productName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  productCategory: {
    fontSize: 12,
    color: '#6B7280',
  },
  productMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  productMetric: {
    alignItems: 'center',
  },
  productMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  productMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  productGrowth: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  productGrowthText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  categoryList: {
    gap: 12,
  },
  categoryCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  categoryShare: {
    fontSize: 12,
    color: '#6B7280',
  },
  categoryMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  categoryMetric: {
    alignItems: 'center',
  },
  categoryMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  categoryMetricLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  assortmentCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 8,
  },
  assortmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assortmentMetric: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  assortmentValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assortmentValueText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  assortmentTrend: {
    fontSize: 12,
    fontWeight: '600',
  },
  lifecycleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  lifecycleCard: {
    width: (width - 64) / 2 - 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    alignItems: 'center',
  },
  lifecycleStage: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  lifecycleProducts: {
    fontSize: 12,
    color: '#6B7280',
  },
  lifecycleRevenue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  lifecycleGrowth: {
    marginTop: 4,
  },
  lifecycleGrowthText: {
    fontSize: 12,
    fontWeight: '600',
  },
  planogramGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  planogramCard: {
    width: (width - 64) / 2 - 8,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  planogramLocation: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  planogramMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  planogramMetric: {
    alignItems: 'center',
  },
  planogramMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  planogramMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
