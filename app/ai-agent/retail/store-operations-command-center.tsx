/**
 * =============================================================================
 * STORE OPERATIONS COMMAND CENTER
 * =============================================================================
 *
 * A comprehensive store operations dashboard that monitors store performance,
 * foot traffic, sales per store, employee productivity, and operational compliance
 * across the retail network.
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
  Store,
  Users,
  TrendingUp,
  Activity,
  MapPin,
  Clock,
  DollarSign,
  Shield,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  LineChart,
  Target,
  Zap,
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

// Store Performance Data
const STORE_PERFORMANCE = [
  { id: 1, name: 'Flagship NYC', revenue: '$4.2M', traffic: '45.2K', conversion: 8.2, status: 'excellent' },
  { id: 2, name: 'Downtown LA', revenue: '$3.8M', traffic: '38.7K', conversion: 7.8, status: 'excellent' },
  { id: 3, name: 'Chicago Loop', revenue: '$2.9M', traffic: '28.4K', conversion: 7.1, status: 'good' },
  { id: 4, name: 'Miami Beach', revenue: '$2.4M', traffic: '24.1K', conversion: 6.9, status: 'good' },
  { id: 5, name: 'Seattle Downtown', revenue: '$2.1M', traffic: '21.8K', conversion: 6.5, status: 'average' },
  { id: 6, name: 'Boston Back Bay', revenue: '$1.9M', traffic: '19.5K', conversion: 6.2, status: 'average' },
];

// Regional Performance
const REGIONAL_PERFORMANCE = [
  { region: 'North America', stores: 1247, revenue: '$4.2B', growth: 12 },
  { region: 'Europe', stores: 892, revenue: '$2.8B', growth: 8 },
  { region: 'Asia Pacific', stores: 1245, revenue: '$1.8B', growth: 22 },
  { region: 'Latin America', stores: 287, revenue: '$420M', growth: 15 },
  { region: 'Middle East', stores: 179, revenue: '$180M', growth: 18 },
];

// Operational Metrics
const OPERATIONAL_METRICS = {
  avgDailyTraffic: '2.4M',
  peakHours: '11AM-3PM',
  avgTransactionTime: '4.2 min',
  staffUtilization: 87,
  complianceRate: 96,
  customerWaitTime: '2.8 min',
};

// Store Alerts
const STORE_ALERTS = [
  { type: 'critical', message: 'Flagship NYC - Staff shortage detected', time: '5 min ago' },
  { type: 'warning', message: 'Miami Beach - Inventory below threshold', time: '12 min ago' },
  { type: 'info', message: 'Chicago Loop - Peak traffic expected', time: '25 min ago' },
  { type: 'success', message: 'Seattle Downtown - Compliance audit passed', time: '45 min ago' },
];

export default function StoreOperationsCommandCenter() {
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

  const renderStoreCard = (store: typeof STORE_PERFORMANCE[0]) => {
    const statusColors = {
      excellent: THEME.emeraldGreen,
      good: THEME.electricBlue,
      average: THEME.amber,
      poor: THEME.red,
    };
    const color = statusColors[store.status as keyof typeof statusColors];

    return (
      <BlurView key={store.id} intensity={20} tint="dark" style={styles.storeCard}>
        <View style={styles.storeHeader}>
          <Text style={styles.storeName}>{store.name}</Text>
          <View style={[styles.statusBadge, { backgroundColor: color + '20' }]}>
            <Text style={[styles.statusText, { color }]}>{store.status.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.storeMetrics}>
          <View style={styles.storeMetric}>
            <Text style={styles.storeMetricLabel}>Revenue</Text>
            <Text style={[styles.storeMetricValue, { color: THEME.neonCyan }]}>{store.revenue}</Text>
          </View>
          <View style={styles.storeMetric}>
            <Text style={styles.storeMetricLabel}>Traffic</Text>
            <Text style={[styles.storeMetricValue, { color: THEME.electricBlue }]}>{store.traffic}</Text>
          </View>
          <View style={styles.storeMetric}>
            <Text style={styles.storeMetricLabel}>Conversion</Text>
            <Text style={[styles.storeMetricValue, { color: THEME.emeraldGreen }]}>{store.conversion}%</Text>
          </View>
        </View>
      </BlurView>
    );
  };

  const renderRegionalCard = (region: typeof REGIONAL_PERFORMANCE[0]) => (
    <BlurView key={region.region} intensity={20} tint="dark" style={styles.regionalCard}>
      <Text style={styles.regionName}>{region.region}</Text>
      <View style={styles.regionMetrics}>
        <View style={styles.regionMetric}>
          <Text style={styles.regionMetricLabel}>Stores</Text>
          <Text style={[styles.regionMetricValue, { color: THEME.neonCyan }]}>{region.stores}</Text>
        </View>
        <View style={styles.regionMetric}>
          <Text style={styles.regionMetricLabel}>Revenue</Text>
          <Text style={[styles.regionMetricValue, { color: THEME.emeraldGreen }]}>{region.revenue}</Text>
        </View>
        <View style={styles.regionMetric}>
          <Text style={styles.regionMetricLabel}>Growth</Text>
          <Text style={[styles.regionMetricValue, { color: THEME.purple }]}>{region.growth}%</Text>
        </View>
      </View>
      {renderTrendIndicator(region.growth, 'up')}
    </BlurView>
  );

  const renderAlertItem = (alert: typeof STORE_ALERTS[0]) => {
    const alertConfig = {
      critical: { icon: AlertTriangle, color: THEME.red },
      warning: { icon: AlertTriangle, color: THEME.amber },
      info: { icon: Activity, color: THEME.electricBlue },
      success: { icon: CheckCircle, color: THEME.emeraldGreen },
    };
    const config = alertConfig[alert.type as keyof typeof alertConfig];
    const Icon = config.icon;

    return (
      <View key={alert.time} style={styles.alertItem}>
        <View style={[styles.alertIcon, { backgroundColor: config.color + '20' }]}>
          <Icon size={16} color={config.color} />
        </View>
        <View style={styles.alertContent}>
          <Text style={styles.alertMessage}>{alert.message}</Text>
          <Text style={styles.alertTime}>{alert.time}</Text>
        </View>
      </View>
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
            <Store size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Store Operations Command Center</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Operational Metrics */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Activity size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Operational Metrics</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.metricsCard}>
            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <Users size={20} color={THEME.neonCyan} />
                <Text style={styles.metricLabel}>Avg Daily Traffic</Text>
                <Text style={[styles.metricValue, { color: THEME.neonCyan }]}>{OPERATIONAL_METRICS.avgDailyTraffic}</Text>
              </View>
              <View style={styles.metricItem}>
                <Clock size={20} color={THEME.electricBlue} />
                <Text style={styles.metricLabel}>Peak Hours</Text>
                <Text style={[styles.metricValue, { color: THEME.electricBlue }]}>{OPERATIONAL_METRICS.peakHours}</Text>
              </View>
              <View style={styles.metricItem}>
                <Target size={20} color={THEME.emeraldGreen} />
                <Text style={styles.metricLabel}>Transaction Time</Text>
                <Text style={[styles.metricValue, { color: THEME.emeraldGreen }]}>{OPERATIONAL_METRICS.avgTransactionTime}</Text>
              </View>
              <View style={styles.metricItem}>
                <Shield size={20} color={THEME.purple} />
                <Text style={styles.metricLabel}>Compliance Rate</Text>
                <Text style={[styles.metricValue, { color: THEME.purple }]}>{OPERATIONAL_METRICS.complianceRate}%</Text>
              </View>
              <View style={styles.metricItem}>
                <Zap size={20} color={THEME.amber} />
                <Text style={styles.metricLabel}>Staff Utilization</Text>
                <Text style={[styles.metricValue, { color: THEME.amber }]}>{OPERATIONAL_METRICS.staffUtilization}%</Text>
              </View>
              <View style={styles.metricItem}>
                <Clock size={20} color={THEME.magenta} />
                <Text style={styles.metricLabel}>Wait Time</Text>
                <Text style={[styles.metricValue, { color: THEME.magenta }]}>{OPERATIONAL_METRICS.customerWaitTime}</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Store Performance */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <BarChart3 size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Store Performance</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storesScroll}>
            <View style={styles.storesContainer}>
              {STORE_PERFORMANCE.map((store) => renderStoreCard(store))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Regional Performance */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Regional Performance</Text>
          </View>
          <View style={styles.regionalContainer}>
            {REGIONAL_PERFORMANCE.map((region) => renderRegionalCard(region))}
          </View>
        </Animated.View>

        {/* Store Alerts */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <AlertTriangle size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Store Alerts</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.alertsCard}>
            {STORE_ALERTS.map((alert) => renderAlertItem(alert))}
          </BlurView>
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
  storesScroll: {
    marginBottom: 0,
  },
  storesContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  storeCard: {
    width: 180,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  storeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  storeName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  storeMetrics: {
    gap: 8,
  },
  storeMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storeMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  storeMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  regionalContainer: {
    gap: 12,
  },
  regionalCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  regionName: {
    fontSize: 16,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 12,
  },
  regionMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  regionMetric: {
    alignItems: 'center',
  },
  regionMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  regionMetricValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  alertsCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertMessage: {
    fontSize: 14,
    fontWeight: '500',
    color: THEME.text,
    marginBottom: 2,
  },
  alertTime: {
    fontSize: 12,
    color: THEME.textMuted,
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
