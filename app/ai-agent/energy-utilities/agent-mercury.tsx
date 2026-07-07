import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  TrendingUp, DollarSign, Activity, AlertTriangle, CheckCircle,
  Clock, ArrowUpRight, BarChart3, PieChart, Target, Shield
} from 'lucide-react-native';
import { ENERGY_COLORS } from '@/constants/energyUtilities';

const { width } = Dimensions.get('window');

export default function AgentMercury() {
  const MERCURY_METRICS = [
    { label: 'Trading Volume', value: '$12.4B', icon: BarChart3, color: ENERGY_COLORS.amber, trend: '+24.6%', trendUp: true },
    { label: 'Revenue Generated', value: '$2.8B', icon: DollarSign, color: ENERGY_COLORS.emeraldGreen, trend: '+28.4%', trendUp: true },
    { label: 'Forecast Accuracy', value: '94.6%', icon: Target, color: ENERGY_COLORS.neonCyan, trend: '+4.8%', trendUp: true },
    { label: 'Risk Score', value: '12.4%', icon: Shield, color: ENERGY_COLORS.electricBlue, trend: '-8.2%', trendUp: true },
    { label: 'Market Coverage', value: '98.2%', icon: PieChart, color: ENERGY_COLORS.purple, trend: '+6.4%', trendUp: true },
    { label: 'Automation Rate', value: '84%', icon: Activity, color: ENERGY_COLORS.magenta, trend: '+12.4%', trendUp: true },
  ];

  const TRADING_MARKETS = [
    { market: 'Day-Ahead Market', volume: '$4.2B', trades: '12,400', avgPrice: '$84/MWh', color: ENERGY_COLORS.amber },
    { market: 'Real-Time Market', volume: '$1.8B', trades: '8,400', avgPrice: '$92/MWh', color: ENERGY_COLORS.electricBlue },
    { market: 'Futures Market', volume: '$3.4B', trades: '6,200', avgPrice: '$88/MWh', color: ENERGY_COLORS.emeraldGreen },
    { market: 'Capacity Market', volume: '$1.2B', trades: '2,400', avgPrice: '$42/kW-month', color: ENERGY_COLORS.purple },
  ];

  const MERCURY_ALERTS = [
    { type: 'opportunity', message: 'Price arbitrage opportunity detected in day-ahead market worth $4.2M', impact: 'High', time: '2h ago' },
    { type: 'alert', message: 'Market volatility increased to 18.6% in real-time trading - risk protocols activated', impact: 'High', time: '4h ago' },
    { type: 'success', message: 'Trading revenue exceeded forecast by 28.4% with AI optimization', impact: 'Positive', time: '6h ago' },
    { type: 'trend', message: 'Renewable energy trading volume increased by 34% this quarter', impact: 'Medium', time: '8h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Agent Mercury Metrics</Text>
      <View style={styles.metricsGrid}>
        {MERCURY_METRICS.map((metric, index) => (
          <View key={index} style={[styles.metricCard, { backgroundColor: metric.color + '10', borderColor: metric.color }]}>
            <metric.icon size={24} color={metric.color} />
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={styles.metricLabel}>{metric.label}</Text>
            <View style={styles.metricTrend}>
              {metric.trendUp ? <ArrowUpRight size={12} color="#10B981" /> : <Activity size={12} color="#EF4444" />}
              <Text style={[styles.metricTrendText, { color: metric.trendUp ? '#10B981' : '#EF4444' }]}>{metric.trend}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderTradingMarkets = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Trading Markets</Text>
      <View style={styles.marketsList}>
        {TRADING_MARKETS.map((market) => (
          <View key={market.market} style={[styles.marketCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: market.color }]}>
            <View style={styles.marketHeader}>
              <BarChart3 size={20} color={market.color} />
              <Text style={styles.marketName}>{market.market}</Text>
              <Text style={styles.marketVolume}>{market.volume}</Text>
            </View>
            <View style={styles.marketMetrics}>
              <View style={styles.marketMetric}>
                <Activity size={12} color="#6B7280" />
                <Text style={styles.marketMetricLabel}>Trades</Text>
                <Text style={styles.marketMetricValue}>{market.trades}</Text>
              </View>
              <View style={styles.marketMetric}>
                <DollarSign size={12} color="#6B7280" />
                <Text style={styles.marketMetricLabel}>Avg Price</Text>
                <Text style={styles.marketMetricValue}>{market.avgPrice}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Mercury Alerts</Text>
      {MERCURY_ALERTS.map((alert, index) => (
        <View key={index} style={[styles.alertCard, { 
          backgroundColor: alert.type === 'alert' ? '#EF444415' : 
                       alert.type === 'opportunity' ? '#10B98115' : 
                       alert.type === 'success' ? '#10B98115' : '#8B5CF615',
          borderLeftColor: alert.type === 'alert' ? '#EF4444' : 
                          alert.type === 'opportunity' ? '#10B981' : 
                          alert.type === 'success' ? '#10B981' : '#8B5CF6',
          borderLeftWidth: 3
        }]}>
          <View style={styles.alertHeader}>
            {alert.type === 'alert' && <AlertTriangle size={20} color="#EF4444" />}
            {alert.type === 'opportunity' && <TrendingUp size={20} color="#10B981" />}
            {alert.type === 'success' && <CheckCircle size={20} color="#10B981" />}
            {alert.type === 'trend' && <Activity size={20} color="#8B5CF6" />}
            <Text style={styles.alertMessage}>{alert.message}</Text>
          </View>
          <View style={styles.alertFooter}>
            <View style={[styles.impactBadge, { backgroundColor: alert.impact === 'Critical' ? '#EF444420' : alert.impact === 'High' ? '#F59E0B20' : '#3B82F620' }]}>
              <Text style={[styles.impactText, { color: alert.impact === 'Critical' ? '#EF4444' : alert.impact === 'High' ? '#F59E0B' : '#3B82F6' }]}>{alert.impact}</Text>
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
        <TrendingUp size={32} color={ENERGY_COLORS.amber} />
        <View>
          <Text style={styles.headerTitle}>Agent Mercury</Text>
          <Text style={styles.headerSubtitle}>Energy Trading Agent - Market forecasting, price optimization, and trading automation</Text>
        </View>
      </View>

      {renderMetrics()}
      {renderTradingMarkets()}
      {renderAlerts()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ENERGY_COLORS.deepSpaceBlack,
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
  marketsList: {
    gap: 12,
  },
  marketCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  marketHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  marketName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  marketVolume: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  marketMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  marketMetric: {
    alignItems: 'center',
  },
  marketMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  marketMetricValue: {
    fontSize: 14,
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
