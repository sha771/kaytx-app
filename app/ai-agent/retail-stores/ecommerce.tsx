import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  ShoppingCart, TrendingUp, ArrowUpRight, ArrowDownRight,
  BarChart3, Users, DollarSign, Activity, MousePointer,
  ShoppingBag, Clock, AlertTriangle, CheckCircle, Globe,
  MoreHorizontal, Zap, Target
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ECommercePage() {
  const ECOMMERCE_METRICS = [
    { label: 'Online Revenue', value: '$2.4B', icon: DollarSign, color: '#10B981', trend: '+28.4%', trendUp: true },
    { label: 'Website Traffic', value: '48.2M', icon: Globe, color: '#3B82F6', trend: '+22.6%', trendUp: true },
    { label: 'Cart Abandonment', value: '68.4%', icon: ShoppingCart, color: '#F59E0B', trend: '-4.2%', trendUp: true },
    { label: 'Conversion Rate', value: '4.2%', icon: Target, color: '#8B5CF6', trend: '+1.8%', trendUp: true },
    { label: 'Avg Order Value', value: '$186', icon: ShoppingBag, color: '#EC4899', trend: '+8.4%', trendUp: true },
    { label: 'Mobile Conversion', value: '3.8%', icon: MousePointer, color: '#06B6D4', trend: '+2.4%', trendUp: true },
  ];

  const CONVERSION_FUNNEL = [
    { stage: 'Visitors', value: '48.2M', conversion: '100%', dropoff: '0%', color: '#3B82F6' },
    { stage: 'Product Views', value: '28.4M', conversion: '58.9%', dropoff: '41.1%', color: '#10B981' },
    { stage: 'Add to Cart', value: '12.6M', conversion: '26.1%', dropoff: '55.6%', color: '#8B5CF6' },
    { stage: 'Checkout', value: '4.8M', conversion: '10.0%', dropoff: '61.9%', color: '#F59E0B' },
    { stage: 'Purchase', value: '2.0M', conversion: '4.2%', dropoff: '58.3%', color: '#EC4899' },
  ];

  const PRODUCT_RECOMMENDATIONS = [
    { product: 'Wireless Earbuds Pro', category: 'Electronics', views: '2.4M', clicks: '842K', conversion: '12.4%', revenue: '$18.4M', color: '#10B981' },
    { product: 'Smart Watch Series 5', category: 'Electronics', views: '1.8M', clicks: '628K', conversion: '10.8%', revenue: '$14.2M', color: '#3B82F6' },
    { product: 'Running Shoes Elite', category: 'Sports', views: '1.4M', clicks: '486K', conversion: '14.2%', revenue: '$12.8M', color: '#8B5CF6' },
    { product: 'Yoga Mat Premium', category: 'Fitness', views: '980K', clicks: '342K', conversion: '11.6%', revenue: '$8.4M', color: '#F59E0B' },
  ];

  const CUSTOMER_JOURNEY = [
    { touchpoint: 'Organic Search', visitors: '18.4M', conversion: '4.8%', revenue: '$840M', color: '#10B981' },
    { touchpoint: 'Direct', visitors: '12.6M', conversion: '5.2%', revenue: '$620M', color: '#3B82F6' },
    { touchpoint: 'Social Media', visitors: '8.4M', conversion: '3.6%', revenue: '$380M', color: '#8B5CF6' },
    { touchpoint: 'Email', visitors: '6.2M', conversion: '6.4%', revenue: '$420M', color: '#F59E0B' },
    { touchpoint: 'Paid Search', visitors: '2.6M', conversion: '4.2%', revenue: '$140M', color: '#EC4899' },
  ];

  const ECOMMERCE_ALERTS = [
    { type: 'warning', message: 'Cart abandonment rate increased by 8% this week', impact: 'Medium', time: '2h ago' },
    { type: 'critical', message: 'Payment gateway experiencing intermittent failures', impact: 'High', time: '1h ago' },
    { type: 'info', message: 'Mobile traffic up 15% - optimize mobile experience', impact: 'Low', time: '4h ago' },
    { type: 'success', message: 'Product recommendations driving 22% increase in AOV', impact: 'Positive', time: '6h ago' },
  ];

  const DEVICE_BREAKDOWN = [
    { device: 'Desktop', traffic: '24.2M', conversion: '4.8%', revenue: '$1.4B', color: '#3B82F6' },
    { device: 'Mobile', traffic: '18.6M', conversion: '3.8%', revenue: '$840M', color: '#10B981' },
    { device: 'Tablet', traffic: '5.4M', conversion: '4.2%', revenue: '$160M', color: '#8B5CF6' },
  ];

  const renderECommerceMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>E-Commerce Metrics</Text>
      <View style={styles.metricsGrid}>
        {ECOMMERCE_METRICS.map((metric, index) => (
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

  const renderConversionFunnel = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Conversion Funnel</Text>
      {CONVERSION_FUNNEL.map((stage) => (
        <View key={stage.stage} style={[styles.funnelCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: stage.color }]}>
          <View style={styles.funnelHeader}>
            <Target size={20} color={stage.color} />
            <Text style={styles.funnelStage}>{stage.stage}</Text>
            <Text style={styles.funnelValue}>{stage.value}</Text>
          </View>
          <View style={styles.funnelMetrics}>
            <View style={styles.funnelMetric}>
              <Text style={styles.funnelMetricLabel}>Conversion</Text>
              <Text style={styles.funnelMetricValue}>{stage.conversion}</Text>
            </View>
            <View style={styles.funnelMetric}>
              <Text style={styles.funnelMetricLabel}>Dropoff</Text>
              <Text style={[styles.funnelMetricValue, { color: '#EF4444' }]}>{stage.dropoff}</Text>
            </View>
          </View>
          <View style={styles.funnelBar}>
            <View style={[styles.funnelBarFill, { width: stage.conversion, backgroundColor: stage.color }]} />
          </View>
        </View>
      ))}
    </View>
  );

  const renderProductRecommendations = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Product Recommendations Performance</Text>
      <View style={styles.recommendationsGrid}>
        {PRODUCT_RECOMMENDATIONS.map((product) => (
          <View key={product.product} style={[styles.recCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: product.color }]}>
            <View style={styles.recHeader}>
              <Zap size={20} color={product.color} />
              <Text style={styles.recProduct}>{product.product}</Text>
            </View>
            <Text style={styles.recCategory}>{product.category}</Text>
            <View style={styles.recMetrics}>
              <View style={styles.recMetric}>
                <MousePointer size={12} color="#6B7280" />
                <Text style={styles.recMetricText}>{product.views} views</Text>
              </View>
              <View style={styles.recMetric}>
                <ShoppingBag size={12} color="#6B7280" />
                <Text style={styles.recMetricText}>{product.clicks} clicks</Text>
              </View>
              <View style={styles.recMetric}>
                <Target size={12} color="#6B7280" />
                <Text style={styles.recMetricText}>{product.conversion} conv</Text>
              </View>
            </View>
            <View style={styles.recRevenue}>
              <DollarSign size={14} color="#10B981" />
              <Text style={styles.recRevenueText}>{product.revenue}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderCustomerJourney = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Customer Journey</Text>
      <View style={styles.journeyList}>
        {CUSTOMER_JOURNEY.map((touchpoint) => (
          <View key={touchpoint.touchpoint} style={[styles.journeyCard, { backgroundColor: touchpoint.color + '10', borderColor: touchpoint.color }]}>
            <View style={styles.journeyHeader}>
              <Globe size={20} color={touchpoint.color} />
              <Text style={styles.journeyTouchpoint}>{touchpoint.touchpoint}</Text>
              <Text style={styles.journeyVisitors}>{touchpoint.visitors}</Text>
            </View>
            <View style={styles.journeyMetrics}>
              <View style={styles.journeyMetric}>
                <Text style={styles.journeyMetricLabel}>Conversion</Text>
                <Text style={styles.journeyMetricValue}>{touchpoint.conversion}</Text>
              </View>
              <View style={styles.journeyMetric}>
                <Text style={styles.journeyMetricLabel}>Revenue</Text>
                <Text style={styles.journeyMetricValue}>{touchpoint.revenue}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderDeviceBreakdown = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Device Breakdown</Text>
      <View style={styles.deviceGrid}>
        {DEVICE_BREAKDOWN.map((device) => (
          <View key={device.device} style={[styles.deviceCard, { backgroundColor: device.color + '10', borderColor: device.color }]}>
            <MousePointer size={24} color={device.color} />
            <Text style={styles.deviceName}>{device.device}</Text>
            <Text style={styles.deviceTraffic}>{device.traffic}</Text>
            <View style={styles.deviceMetrics}>
              <View style={styles.deviceMetric}>
                <Text style={styles.deviceMetricLabel}>Conversion</Text>
                <Text style={styles.deviceMetricValue}>{device.conversion}</Text>
              </View>
              <View style={styles.deviceMetric}>
                <Text style={styles.deviceMetricLabel}>Revenue</Text>
                <Text style={styles.deviceMetricValue}>{device.revenue}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderECommerceAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>E-Commerce Alerts</Text>
      {ECOMMERCE_ALERTS.map((alert, index) => (
        <View key={index} style={[styles.alertCard, { 
          backgroundColor: alert.type === 'critical' ? '#EF444410' : 
                       alert.type === 'warning' ? '#F59E0B10' : 
                       alert.type === 'success' ? '#10B98110' : '#3B82F610',
          borderLeftColor: alert.type === 'critical' ? '#EF4444' : 
                          alert.type === 'warning' ? '#F59E0B' : 
                          alert.type === 'success' ? '#10B981' : '#3B82F6',
          borderLeftWidth: 3
        }]}>
          <View style={styles.alertHeader}>
            {alert.type === 'critical' && <AlertTriangle size={20} color="#EF4444" />}
            {alert.type === 'warning' && <AlertTriangle size={20} color="#F59E0B" />}
            {alert.type === 'success' && <CheckCircle size={20} color="#10B981" />}
            {alert.type === 'info' && <Activity size={20} color="#3B82F6" />}
            <Text style={styles.alertMessage}>{alert.message}</Text>
          </View>
          <View style={styles.alertFooter}>
            <View style={[styles.impactBadge, { backgroundColor: alert.impact === 'High' ? '#EF444420' : alert.impact === 'Medium' ? '#F59E0B20' : '#3B82F620' }]}>
              <Text style={[styles.impactText, { color: alert.impact === 'High' ? '#EF4444' : alert.impact === 'Medium' ? '#F59E0B' : '#3B82F6' }]}>{alert.impact}</Text>
            </View>
            <Clock size={12} color="#6B7280" />
            <Text style={styles.alertTime}>{alert.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ShoppingCart size={32} color="#8B5CF6" />
        <View>
          <Text style={styles.headerTitle}>E-Commerce Command Center</Text>
          <Text style={styles.headerSubtitle}>Online sales intelligence and conversion optimization</Text>
        </View>
      </View>

      {renderECommerceMetrics()}
      {renderConversionFunnel()}
      {renderProductRecommendations()}
      {renderCustomerJourney()}
      {renderDeviceBreakdown()}
      {renderECommerceAlerts()}
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
  funnelCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  funnelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  funnelStage: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  funnelValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  funnelMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  funnelMetric: {
    alignItems: 'center',
  },
  funnelMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  funnelMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  funnelBar: {
    height: 8,
    backgroundColor: '#1E293B',
    borderRadius: 4,
    overflow: 'hidden',
  },
  funnelBarFill: {
    height: '100%',
  },
  recommendationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  recCard: {
    width: (width - 64) / 2 - 8,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  recHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  recProduct: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  recCategory: {
    fontSize: 12,
    color: '#6B7280',
  },
  recMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  recMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recMetricText: {
    fontSize: 11,
    color: '#6B7280',
  },
  recRevenue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  recRevenueText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10B981',
  },
  journeyList: {
    gap: 12,
  },
  journeyCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  journeyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  journeyTouchpoint: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  journeyVisitors: {
    fontSize: 12,
    color: '#6B7280',
  },
  journeyMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  journeyMetric: {
    alignItems: 'center',
  },
  journeyMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  journeyMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  deviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  deviceCard: {
    width: (width - 64) / 3 - 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    alignItems: 'center',
  },
  deviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  deviceTraffic: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  deviceMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  deviceMetric: {
    alignItems: 'center',
  },
  deviceMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  deviceMetricValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  alertCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  alertMessage: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
  },
  alertFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  impactText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  alertTime: {
    fontSize: 12,
    color: '#6B7280',
  },
});
