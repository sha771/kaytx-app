import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface TopProduct {
  product: string;
  revenue: number;
  units: number;
  margin: number;
  trend: string;
}

interface TrendingItem {
  product: string;
  trend: string;
  velocity: string;
}

interface UnderperformingSKU {
  product: string;
  revenue: number;
  target: number;
  gap: number;
  action: string;
}

interface ProductRecommendations {
  accuracy: number;
  clickThrough: number;
  conversionLift: number;
  revenueImpact: number;
}

interface DemandForecast {
  product: string;
  current: number;
  forecast: number;
  confidence: number;
}

interface ProductCatalogIntelligenceProps {
  topProducts: TopProduct[];
  trendingItems: TrendingItem[];
  underperformingSkus: UnderperformingSKU[];
  productRecommendations: ProductRecommendations;
  demandForecasts: DemandForecast[];
}

export default function ProductCatalogIntelligence({
  topProducts,
  trendingItems,
  underperformingSkus,
  productRecommendations,
  demandForecasts
}: ProductCatalogIntelligenceProps) {
  const { theme } = useTheme();

  const formatCurrency = (num: number) => {
    if (num >= 1000000) return '$' + (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return '$' + (num / 1000).toFixed(0) + 'K';
    return '$' + num.toString();
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toString();
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? '#22C55E' : trend === 'stable' ? '#3B82F6' : '#EF4444';
  };

  const getVelocityColor = (velocity: string) => {
    return velocity === 'very high' ? '#22C55E' : velocity === 'high' ? '#3B82F6' : '#F59E0B';
  };

  const getActionColor = (action: string) => {
    return action === 'discount' ? '#EF4444' : action === 'bundle' ? '#F59E0B' : '#3B82F6';
  };

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
      <Text style={[styles.title, { color: '#38BDF8' }]}>
        Product & Catalog Intelligence
      </Text>

      {/* Top Products */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Top Products
        </Text>
        <ScrollView style={styles.productsScroll} showsVerticalScrollIndicator={false}>
          {topProducts.map((product, index) => (
            <View key={index} style={styles.productItem}>
              <View style={styles.productRank}>
                <Text style={[styles.rankNumber, { color: '#38BDF8' }]}>{index + 1}</Text>
              </View>
              <View style={styles.productInfo}>
                <Text style={[styles.productName, { color: '#FFFFFF' }]} numberOfLines={1}>
                  {product.product}
                </Text>
                <View style={styles.productMetrics}>
                  <Text style={[styles.productMetric, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                    {formatNumber(product.units)} units
                  </Text>
                  <Text style={[styles.productMetric, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                    {product.margin}% margin
                  </Text>
                </View>
              </View>
              <View style={styles.productRevenue}>
                <Text style={[styles.revenueValue, { color: '#22C55E' }]}>
                  {formatCurrency(product.revenue)}
                </Text>
                <View style={[styles.trendIndicator, { backgroundColor: `${getTrendColor(product.trend)}20` }]}>
                  <Text style={[styles.trendText, { color: getTrendColor(product.trend) }]}>
                    {product.trend === 'up' ? '↑' : product.trend === 'stable' : '→'}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Trending Items */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Trending Items
        </Text>
        <ScrollView style={styles.trendingScroll} showsVerticalScrollIndicator={false}>
          {trendingItems.map((item, index) => (
            <View key={index} style={styles.trendingItem}>
              <View style={styles.trendingInfo}>
                <Text style={[styles.trendingName, { color: '#FFFFFF' }]} numberOfLines={1}>
                  {item.product}
                </Text>
                <View style={[styles.velocityBadge, { backgroundColor: `${getVelocityColor(item.velocity)}20` }]}>
                  <Text style={[styles.velocityText, { color: getVelocityColor(item.velocity) }]}>
                    {item.velocity}
                  </Text>
                </View>
              </View>
              <View style={[styles.trendPercent, { backgroundColor: 'rgba(34, 197, 94, 0.2)' }]}>
                <Text style={[styles.trendPercentText, { color: '#22C55E' }]}>
                  {item.trend}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Underperforming SKUs */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Underperforming SKUs
        </Text>
        <ScrollView style={styles.underperformScroll} showsVerticalScrollIndicator={false}>
          {underperformingSkus.map((sku, index) => (
            <View key={index} style={styles.underperformItem}>
              <View style={styles.underperformInfo}>
                <Text style={[styles.underperformName, { color: '#FFFFFF' }]} numberOfLines={1}>
                  {sku.product}
                </Text>
                <View style={styles.underperformMetrics}>
                  <Text style={[styles.underperformMetric, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                    Target: {formatCurrency(sku.target)}
                  </Text>
                  <Text style={[styles.underperformMetric, { color: '#EF4444' }]}>
                    Gap: {sku.gap}%
                  </Text>
                </View>
              </View>
              <View style={[styles.actionBadge, { backgroundColor: `${getActionColor(sku.action)}20` }]}>
                <Text style={[styles.actionText, { color: getActionColor(sku.action) }]}>
                  {sku.action}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Product Recommendations */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Product Recommendations Engine
        </Text>
        <View style={styles.recommendationsGrid}>
          <View style={styles.recommendationCard}>
            <Text style={[styles.recLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Accuracy</Text>
            <Text style={[styles.recValue, { color: '#22C55E' }]}>{productRecommendations.accuracy}%</Text>
          </View>
          <View style={styles.recommendationCard}>
            <Text style={[styles.recLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Click-Through</Text>
            <Text style={[styles.recValue, { color: '#3B82F6' }]}>{productRecommendations.clickThrough}%</Text>
          </View>
          <View style={styles.recommendationCard}>
            <Text style={[styles.recLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Conversion Lift</Text>
            <Text style={[styles.recValue, { color: '#22C55E' }]}>{productRecommendations.conversionLift}%</Text>
          </View>
          <View style={styles.recommendationCard}>
            <Text style={[styles.recLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Revenue Impact</Text>
            <Text style={[styles.recValue, { color: '#8B5CF6' }]}>{formatCurrency(productRecommendations.revenueImpact)}</Text>
          </View>
        </View>
      </View>

      {/* Demand Forecasts */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Demand Forecasts
        </Text>
        <ScrollView style={styles.forecastScroll} showsVerticalScrollIndicator={false}>
          {demandForecasts.map((forecast, index) => {
            const growth = ((forecast.forecast - forecast.current) / forecast.current) * 100;
            const confidenceColor = forecast.confidence >= 90 ? '#22C55E' : forecast.confidence >= 80 ? '#3B82F6' : '#F59E0B';
            
            return (
              <View key={index} style={styles.forecastItem}>
                <View style={styles.forecastInfo}>
                  <Text style={[styles.forecastProduct, { color: '#FFFFFF' }]} numberOfLines={1}>
                    {forecast.product}
                  </Text>
                  <View style={styles.forecastMetrics}>
                    <View style={styles.forecastMetric}>
                      <Text style={[styles.forecastMetricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Current</Text>
                      <Text style={[styles.forecastMetricValue, { color: 'rgba(255, 255, 255, 0.8)' }]}>
                        {formatNumber(forecast.current)}
                      </Text>
                    </View>
                    <View style={styles.forecastMetric}>
                      <Text style={[styles.forecastMetricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Forecast</Text>
                      <Text style={[styles.forecastMetricValue, { color: '#22C55E' }]}>
                        {formatNumber(forecast.forecast)}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.forecastStats}>
                  <View style={[styles.confidenceBadge, { backgroundColor: `${confidenceColor}20` }]}>
                    <Text style={[styles.confidenceText, { color: confidenceColor }]}>
                      {forecast.confidence}%
                    </Text>
                  </View>
                  <Text style={[styles.growthText, { color: growth > 0 ? '#22C55E' : '#EF4444' }]}>
                    {growth > 0 ? '+' : ''}{growth.toFixed(0)}%
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  section: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  productsScroll: {
    maxHeight: 250,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  productRank: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(56, 189, 248, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankNumber: {
    fontSize: 13,
    fontWeight: '700',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
  productMetrics: {
    flexDirection: 'row',
  },
  productMetric: {
    fontSize: 11,
    marginRight: 12,
  },
  productRevenue: {
    alignItems: 'flex-end',
  },
  revenueValue: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  trendIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  trendingScroll: {
    maxHeight: 180,
  },
  trendingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  trendingInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendingName: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
    marginRight: 8,
  },
  velocityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  velocityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  trendPercent: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  trendPercentText: {
    fontSize: 12,
    fontWeight: '700',
  },
  underperformScroll: {
    maxHeight: 180,
  },
  underperformItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  underperformInfo: {
    flex: 1,
  },
  underperformName: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
  underperformMetrics: {
    flexDirection: 'row',
  },
  underperformMetric: {
    fontSize: 11,
    marginRight: 12,
  },
  actionBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  actionText: {
    fontSize: 11,
    fontWeight: '600',
  },
  recommendationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  recommendationCard: {
    width: '48%',
    padding: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    marginRight: '2%',
    marginBottom: 8,
  },
  recLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  recValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  forecastScroll: {
    maxHeight: 220,
  },
  forecastItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  forecastInfo: {
    flex: 1,
  },
  forecastProduct: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6,
  },
  forecastMetrics: {
    flexDirection: 'row',
  },
  forecastMetric: {
    marginRight: 16,
  },
  forecastMetricLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  forecastMetricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  forecastStats: {
    alignItems: 'flex-end',
  },
  confidenceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 4,
  },
  confidenceText: {
    fontSize: 11,
    fontWeight: '600',
  },
  growthText: {
    fontSize: 12,
    fontWeight: '600',
  },
});