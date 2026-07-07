import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface TrafficSource {
  source: string;
  visitors: number;
  conversion: number;
}

interface FunnelDropoff {
  stage: string;
  dropoff: number;
  volume: number;
}

interface CheckoutPerformance {
  completionRate: string;
  averageTime: string;
  paymentSuccess: string;
  guestCheckout: string;
}

interface ProductPageViews {
  topProducts: Array<{
    product: string;
    views: number;
    conversion: number;
  }>;
}

interface ConversionEvent {
  event: string;
  count: number;
  rate: number;
}

interface SalesConversionEngineProps {
  trafficSources: TrafficSource[];
  funnelDropoffs: FunnelDropoff[];
  checkoutPerformance: CheckoutPerformance;
  productPageViews: ProductPageViews;
  conversionEvents: ConversionEvent[];
}

export default function SalesConversionEngine({
  trafficSources,
  funnelDropoffs,
  checkoutPerformance,
  productPageViews,
  conversionEvents
}: SalesConversionEngineProps) {
  const { theme } = useTheme();

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
      <Text style={[styles.title, { color: '#38BDF8' }]}>
        Real-Time Sales & Conversion Engine
      </Text>

      {/* Traffic Sources */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Traffic Sources
        </Text>
        <ScrollView style={styles.sourceScroll} showsVerticalScrollIndicator={false}>
          {trafficSources.map((source, index) => (
            <View key={index} style={styles.sourceItem}>
              <View style={styles.sourceInfo}>
                <Text style={[styles.sourceName, { color: '#FFFFFF' }]}>{source.source}</Text>
                <Text style={[styles.sourceVisitors, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                  {formatNumber(source.visitors)} visitors
                </Text>
              </View>
              <View style={[styles.conversionBadge, { backgroundColor: source.conversion >= 4 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)' }]}>
                <Text style={[styles.conversionText, { color: source.conversion >= 4 ? '#22C55E' : '#F59E0B' }]}>
                  {source.conversion}%
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Funnel Drop-offs */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Funnel Drop-offs
        </Text>
        <View style={styles.funnelContainer}>
          {funnelDropoffs.map((dropoff, index) => {
            const severity = dropoff.dropoff > 50 ? 'high' : dropoff.dropoff > 30 ? 'medium' : 'low';
            const color = severity === 'high' ? '#EF4444' : severity === 'medium' ? '#F59E0B' : '#22C55E';
            
            return (
              <View key={index} style={styles.dropoffItem}>
                <View style={styles.dropoffInfo}>
                  <Text style={[styles.dropoffStage, { color: '#FFFFFF' }]}>{dropoff.stage}</Text>
                  <Text style={[styles.dropoffVolume, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                    {formatNumber(dropoff.volume)} volume
                  </Text>
                </View>
                <View style={styles.dropoffMetric}>
                  <View style={[styles.dropoffBar, { backgroundColor: `${color}30` }]}>
                    <View style={[styles.dropoffFill, { backgroundColor: color, width: `${dropoff.dropoff}%` }]} />
                  </View>
                  <Text style={[styles.dropoffPercent, { color }]}>
                    {dropoff.dropoff}%
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* Checkout Performance */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Checkout Performance
        </Text>
        <View style={styles.checkoutGrid}>
          <View style={styles.checkoutItem}>
            <Text style={[styles.checkoutLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Completion Rate</Text>
            <Text style={[styles.checkoutValue, { color: '#22C55E' }]}>{checkoutPerformance.completionRate}</Text>
          </View>
          <View style={styles.checkoutItem}>
            <Text style={[styles.checkoutLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Average Time</Text>
            <Text style={[styles.checkoutValue, { color: '#3B82F6' }]}>{checkoutPerformance.averageTime}</Text>
          </View>
          <View style={styles.checkoutItem}>
            <Text style={[styles.checkoutLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Payment Success</Text>
            <Text style={[styles.checkoutValue, { color: '#22C55E' }]}>{checkoutPerformance.paymentSuccess}</Text>
          </View>
          <View style={styles.checkoutItem}>
            <Text style={[styles.checkoutLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Guest Checkout</Text>
            <Text style={[styles.checkoutValue, { color: '#8B5CF6' }]}>{checkoutPerformance.guestCheckout}</Text>
          </View>
        </View>
      </View>

      {/* Top Product Page Views */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Top Product Page Views
        </Text>
        <ScrollView style={styles.productsScroll} showsVerticalScrollIndicator={false}>
          {productPageViews.topProducts.map((product, index) => (
            <View key={index} style={styles.productItem}>
              <View style={styles.productRank}>
                <Text style={[styles.rankNumber, { color: '#38BDF8' }]}>{index + 1}</Text>
              </View>
              <View style={styles.productInfo}>
                <Text style={[styles.productName, { color: '#FFFFFF' }]} numberOfLines={1}>
                  {product.product}
                </Text>
                <Text style={[styles.productViews, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                  {formatNumber(product.views)} views
                </Text>
              </View>
              <View style={[styles.productConversion, { backgroundColor: `${product.conversion >= 4.5 ? '#22C55E' : product.conversion >= 4 ? '#3B82F6' : '#F59E0B'}20` }]}>
                <Text style={[styles.productConversionText, { color: product.conversion >= 4.5 ? '#22C55E' : product.conversion >= 4 ? '#3B82F6' : '#F59E0B' }]}>
                  {product.conversion}%
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Conversion Events */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(56, 189, 248, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Conversion Events
        </Text>
        <View style={styles.eventsContainer}>
          {conversionEvents.map((event, index) => {
            const maxCount = Math.max(...conversionEvents.map(e => e.count));
            const barWidth = (event.count / maxCount) * 100;
            
            return (
              <View key={index} style={styles.eventItem}>
                <View style={styles.eventInfo}>
                  <Text style={[styles.eventName, { color: '#FFFFFF' }]}>{event.event}</Text>
                  <Text style={[styles.eventCount, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                    {formatNumber(event.count)}
                  </Text>
                </View>
                <View style={styles.eventMetric}>
                  <View style={[styles.eventBar, { backgroundColor: 'rgba(56, 189, 248, 0.2)', width: `${barWidth}%` }]}>
                    <View style={[styles.eventFill, { backgroundColor: '#38BDF8', width: `${barWidth}%` }]} />
                  </View>
                  <Text style={[styles.eventRate, { color: '#38BDF8' }]}>
                    {event.rate}%
                  </Text>
                </View>
              </View>
            );
          })}
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
  sourceScroll: {
    maxHeight: 200,
  },
  sourceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  sourceInfo: {
    flex: 1,
  },
  sourceName: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  sourceVisitors: {
    fontSize: 11,
  },
  conversionBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  conversionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  funnelContainer: {
    maxHeight: 250,
  },
  dropoffItem: {
    marginBottom: 12,
  },
  dropoffInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dropoffStage: {
    fontSize: 13,
    fontWeight: '500',
  },
  dropoffVolume: {
    fontSize: 11,
  },
  dropoffMetric: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropoffBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
    overflow: 'hidden',
  },
  dropoffFill: {
    height: '100%',
    borderRadius: 4,
  },
  dropoffPercent: {
    fontSize: 12,
    fontWeight: '600',
    width: 40,
    textAlign: 'right',
  },
  checkoutGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkoutItem: {
    width: '48%',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    marginRight: '2%',
    marginBottom: 8,
  },
  checkoutLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  checkoutValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  productsScroll: {
    maxHeight: 200,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  productRank: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(56, 189, 248, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankNumber: {
    fontSize: 12,
    fontWeight: '700',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  productViews: {
    fontSize: 11,
  },
  productConversion: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  productConversionText: {
    fontSize: 11,
    fontWeight: '600',
  },
  eventsContainer: {
    maxHeight: 200,
  },
  eventItem: {
    marginBottom: 12,
  },
  eventInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  eventName: {
    fontSize: 13,
    fontWeight: '500',
  },
  eventCount: {
    fontSize: 11,
  },
  eventMetric: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
    overflow: 'hidden',
  },
  eventFill: {
    height: '100%',
    borderRadius: 4,
  },
  eventRate: {
    fontSize: 12,
    fontWeight: '600',
    width: 40,
    textAlign: 'right',
  },
});