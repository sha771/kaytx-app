import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface PriceElasticity {
  product: string;
  elasticity: number;
  optimalPrice: number;
  currentPrice: number;
}

interface CompetitorPricing {
  product: string;
  ourPrice: number;
  competitor: number;
  position: string;
}

interface DiscountPerformance {
  discount: string;
  lift: number;
  margin: number;
  roi: number;
}

interface MarginOptimization {
  currentMargin: number;
  targetMargin: number;
  potentialUplift: number;
  recommendedActions: string[];
}

interface DynamicPricingEngineProps {
  priceElasticity: PriceElasticity[];
  competitorPricing: CompetitorPricing[];
  discountPerformance: DiscountPerformance[];
  marginOptimization: MarginOptimization;
}

export default function DynamicPricingEngine({
  priceElasticity,
  competitorPricing,
  discountPerformance,
  marginOptimization
}: DynamicPricingEngineProps) {
  const { theme } = useTheme();

  const getPositionColor = (position: string) => {
    return position === 'lower' ? '#22C55E' : position === 'equal' ? '#3B82F6' : '#F59E0B';
  };

  const getROIColor = (roi: number) => {
    return roi >= 3.5 ? '#22C55E' : roi >= 3.0 ? '#3B82F6' : '#F59E0B';
  };

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
      <Text style={[styles.title, { color: '#38BDF8' }]}>
        Dynamic Pricing Engine
      </Text>

      {/* Price Elasticity */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Price Elasticity Analysis
        </Text>
        <ScrollView style={styles.elasticityScroll} showsVerticalScrollIndicator={false}>
          {priceElasticity.map((item, index) => {
            const priceGap = ((item.optimalPrice - item.currentPrice) / item.currentPrice) * 100;
            const isUndervalued = priceGap > 0;
            
            return (
              <View key={index} style={styles.elasticityItem}>
                <View style={styles.elasticityInfo}>
                  <Text style={[styles.elasticityProduct, { color: '#FFFFFF' }]} numberOfLines={1}>
                    {item.product}
                  </Text>
                  <View style={styles.elasticityMetrics}>
                    <View style={styles.elasticityMetric}>
                      <Text style={[styles.elasticityLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Elasticity</Text>
                      <Text style={[styles.elasticityValue, { color: '#8B5CF6' }]}>
                        {item.elasticity.toFixed(1)}
                      </Text>
                    </View>
                    <View style={styles.elasticityMetric}>
                      <Text style={[styles.elasticityLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Current</Text>
                      <Text style={[styles.elasticityValue, { color: 'rgba(255, 255, 255, 0.8)' }]}>
                        ${item.currentPrice}
                      </Text>
                    </View>
                    <View style={styles.elasticityMetric}>
                      <Text style={[styles.elasticityLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Optimal</Text>
                      <Text style={[styles.elasticityValue, { color: '#22C55E' }]}>
                        ${item.optimalPrice}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.priceGapBadge, { backgroundColor: isUndervalued ? 'rgba(34, 197, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)' }]}>
                  <Text style={[styles.priceGapText, { color: isUndervalued ? '#22C55E' : '#F59E0B' }]}>
                    {isUndervalued ? '+' : ''}{priceGap.toFixed(0)}%
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* Competitor Pricing */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Competitor Pricing Comparison
        </Text>
        <ScrollView style={styles.competitorScroll} showsVerticalScrollIndicator={false}>
          {competitorPricing.map((item, index) => {
            const priceDiff = ((item.competitor - item.ourPrice) / item.competitor) * 100;
            
            return (
              <View key={index} style={styles.competitorItem}>
                <View style={styles.competitorInfo}>
                  <Text style={[styles.competitorProduct, { color: '#FFFFFF' }]} numberOfLines={1}>
                    {item.product}
                  </Text>
                  <View style={styles.competitorPrices}>
                    <View style={styles.pricePair}>
                      <Text style={[styles.priceLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Our Price</Text>
                      <Text style={[styles.priceValue, { color: '#22C55E' }]}>${item.ourPrice}</Text>
                    </View>
                    <View style={styles.pricePair}>
                      <Text style={[styles.priceLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Competitor</Text>
                      <Text style={[styles.priceValue, { color: 'rgba(255, 255, 255, 0.8)' }]}>${item.competitor}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.competitorStatus}>
                  <View style={[styles.positionBadge, { backgroundColor: `${getPositionColor(item.position)}20` }]}>
                    <Text style={[styles.positionText, { color: getPositionColor(item.position) }]}>
                      {item.position}
                    </Text>
                  </View>
                  <Text style={[styles.priceDiff, { color: priceDiff > 0 ? '#22C55E' : '#F59E0B' }]}>
                    {priceDiff > 0 ? '-' : '+'}{Math.abs(priceDiff).toFixed(0)}%
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* Discount Performance */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Discount Performance Analysis
        </Text>
        <View style={styles.discountContainer}>
          {discountPerformance.map((item, index) => {
            const maxLift = Math.max(...discountPerformance.map(d => d.lift));
            const liftWidth = (item.lift / maxLift) * 100;
            
            return (
              <View key={index} style={styles.discountItem}>
                <View style={styles.discountHeader}>
                  <View style={[styles.discountBadge, { backgroundColor: 'rgba(56, 189, 248, 0.2)' }]}>
                    <Text style={[styles.discountText, { color: '#38BDF8' }]}>{item.discount}</Text>
                  </View>
                  <View style={[styles.roiBadge, { backgroundColor: `${getROIColor(item.roi)}20` }]}>
                    <Text style={[styles.roiText, { color: getROIColor(item.roi) }]}>
                      {item.roi.toFixed(1)}x ROI
                    </Text>
                  </View>
                </View>
                <View style={styles.discountMetrics}>
                  <View style={styles.discountMetric}>
                    <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Lift</Text>
                    <Text style={[styles.metricValue, { color: '#22C55E' }]}>{item.lift}%</Text>
                  </View>
                  <View style={styles.discountMetric}>
                    <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Margin</Text>
                    <Text style={[styles.metricValue, { color: '#3B82F6' }]}>{item.margin}%</Text>
                  </View>
                </View>
                <View style={styles.liftBar}>
                  <View style={[styles.liftFill, { backgroundColor: '#22C55E', width: `${liftWidth}%` }]} />
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* Margin Optimization */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Margin Optimization
        </Text>
        <View style={styles.marginOverview}>
          <View style={styles.marginCurrent}>
            <Text style={[styles.marginLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Current Margin</Text>
            <Text style={[styles.marginValue, { color: '#3B82F6' }]}>{marginOptimization.currentMargin}%</Text>
          </View>
          <View style={styles.marginTarget}>
            <Text style={[styles.marginLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Target Margin</Text>
            <Text style={[styles.marginValue, { color: '#22C55E' }]}>{marginOptimization.targetMargin}%</Text>
          </View>
          <View style={styles.marginUplift}>
            <Text style={[styles.marginLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Potential Uplift</Text>
            <Text style={[styles.marginValue, { color: '#8B5CF6' }]}>
              ${(marginOptimization.potentialUplift / 1000000).toFixed(1)}M
            </Text>
          </View>
        </View>
        <View style={styles.marginProgress}>
          <View style={styles.marginBar}>
            <View style={[styles.marginFill, { width: `${(marginOptimization.currentMargin / marginOptimization.targetMargin) * 100}%` }]} />
          </View>
          <Text style={[styles.marginGap, { color: 'rgba(255, 255, 255, 0.6)' }]}>
            Gap: {(marginOptimization.targetMargin - marginOptimization.currentMargin).toFixed(1)}%
          </Text>
        </View>
        <View style={styles.recommendedActions}>
          <Text style={[styles.actionsTitle, { color: '#FFFFFF' }]}>Recommended Actions</Text>
          <View style={styles.actionsList}>
            {marginOptimization.recommendedActions.map((action, index) => (
              <View key={index} style={styles.actionItem}>
                <View style={styles.actionBullet} />
                <Text style={[styles.actionText, { color: 'rgba(255, 255, 255, 0.8)' }]}>{action}</Text>
              </View>
            ))}
          </View>
        </View>
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
  elasticityScroll: {
    maxHeight: 250,
  },
  elasticityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  elasticityInfo: {
    flex: 1,
  },
  elasticityProduct: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6,
  },
  elasticityMetrics: {
    flexDirection: 'row',
  },
  elasticityMetric: {
    marginRight: 16,
  },
  elasticityLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  elasticityValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  priceGapBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priceGapText: {
    fontSize: 12,
    fontWeight: '700',
  },
  competitorScroll: {
    maxHeight: 250,
  },
  competitorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  competitorInfo: {
    flex: 1,
  },
  competitorProduct: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6,
  },
  competitorPrices: {
    flexDirection: 'row',
  },
  pricePair: {
    marginRight: 16,
  },
  priceLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  priceValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  competitorStatus: {
    alignItems: 'flex-end',
  },
  positionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 4,
  },
  positionText: {
    fontSize: 10,
    fontWeight: '600',
  },
  priceDiff: {
    fontSize: 11,
    fontWeight: '600',
  },
  discountContainer: {
    maxHeight: 300,
  },
  discountItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  discountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  discountBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
    fontSize: 12,
    fontWeight: '700',
  },
  roiBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  roiText: {
    fontSize: 12,
    fontWeight: '700',
  },
  discountMetrics: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  discountMetric: {
    marginRight: 16,
  },
  metricLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  liftBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  liftFill: {
    height: '100%',
    borderRadius: 3,
  },
  marginOverview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  marginCurrent: {
    alignItems: 'center',
  },
  marginTarget: {
    alignItems: 'center',
  },
  marginUplift: {
    alignItems: 'center',
  },
  marginLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  marginValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  marginProgress: {
    marginBottom: 16,
  },
  marginBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    marginBottom: 4,
    overflow: 'hidden',
  },
  marginFill: {
    height: '100%',
    backgroundColor: '#22C55E',
    borderRadius: 4,
  },
  marginGap: {
    fontSize: 11,
    textAlign: 'right',
  },
  recommendedActions: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 12,
    borderRadius: 8,
  },
  actionsTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  actionsList: {
    flexDirection: 'column',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  actionBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#38BDF8',
    marginRight: 8,
  },
  actionText: {
    fontSize: 12,
    flex: 1,
  },
});