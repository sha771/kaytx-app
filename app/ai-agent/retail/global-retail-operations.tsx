/**
 * =============================================================================
 * GLOBAL RETAIL OPERATIONS
 * =============================================================================
 *
 * A comprehensive global operations dashboard that visualizes store locations,
 * regional revenue, customer distribution, warehouse networks, and supply chain
 * activity across the worldwide retail footprint.
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
  Globe,
  Store,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Target,
  Activity,
  Zap,
  MapPin,
  Warehouse,
  Truck,
  Users,
  DollarSign,
  Building2,
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

// Regional Performance
const REGIONAL_DATA = [
  { region: 'North America', stores: 1247, revenue: '$4.2B', customers: '18M', growth: 12, status: 'excellent' },
  { region: 'Europe', stores: 892, revenue: '$2.8B', customers: '14M', growth: 8, status: 'good' },
  { region: 'Asia Pacific', stores: 1245, revenue: '$1.8B', customers: '12M', growth: 22, status: 'excellent' },
  { region: 'Latin America', stores: 287, revenue: '$420M', customers: '3M', growth: 15, status: 'good' },
  { region: 'Middle East', stores: 179, revenue: '$180M', customers: '1M', growth: 18, status: 'good' },
];

// Warehouse Network
const WAREHOUSE_NETWORK = [
  { id: 1, name: 'NYC Distribution', region: 'North America', capacity: '124K/day', utilization: 82 },
  { id: 2, name: 'LA Regional Hub', region: 'North America', capacity: '98K/day', utilization: 78 },
  { id: 3, name: 'London Gateway', region: 'Europe', capacity: '89K/day', utilization: 84 },
  { id: 4, name: 'Frankfurt Central', region: 'Europe', capacity: '76K/day', utilization: 72 },
  { id: 5, name: 'Tokyo Pacific', region: 'Asia Pacific', capacity: '67K/day', utilization: 89 },
  { id: 6, name: 'Singapore Hub', region: 'Asia Pacific', capacity: '54K/day', utilization: 76 },
];

// Top Performing Markets
const TOP_MARKETS = [
  { city: 'New York', country: 'USA', revenue: '$890M', stores: 124, growth: 18 },
  { city: 'Los Angeles', country: 'USA', revenue: '$720M', stores: 98, growth: 14 },
  { city: 'London', country: 'UK', revenue: '$540M', stores: 76, growth: 12 },
  { city: 'Tokyo', country: 'Japan', revenue: '$480M', stores: 89, growth: 22 },
  { city: 'Shanghai', country: 'China', revenue: '$420M', stores: 67, growth: 28 },
];

// Global Metrics
const GLOBAL_METRICS = {
  totalStores: '3,850',
  totalCountries: 47,
  totalWarehouses: 124,
  totalEmployees: '285K',
  globalRevenue: '$8.4B',
  globalCustomers: '48M',
};

export default function GlobalRetailOperations() {
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

  const renderRegionCard = (region: typeof REGIONAL_DATA[0]) => {
    const statusColors = {
      excellent: THEME.emeraldGreen,
      good: THEME.electricBlue,
      review: THEME.amber,
      critical: THEME.red,
    };
    const color = statusColors[region.status as keyof typeof statusColors];

    return (
      <BlurView key={region.region} intensity={20} tint="dark" style={styles.regionCard}>
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
            <Text style={styles.regionMetricLabel}>Customers</Text>
            <Text style={[styles.regionMetricValue, { color: THEME.electricBlue }]}>{region.customers}</Text>
          </View>
        </View>
        <View style={styles.regionFooter}>
          {renderTrendIndicator(region.growth, 'up')}
          <View style={[styles.statusBadge, { backgroundColor: color + '20' }]}>
            <Text style={[styles.statusText, { color }]}>{region.status.toUpperCase()}</Text>
          </View>
        </View>
      </BlurView>
    );
  };

  const renderWarehouseCard = (warehouse: typeof WAREHOUSE_NETWORK[0]) => (
    <BlurView key={warehouse.id} intensity={20} tint="dark" style={styles.warehouseCard}>
      <Text style={styles.warehouseName}>{warehouse.name}</Text>
      <Text style={styles.warehouseRegion}>{warehouse.region}</Text>
      <View style={styles.warehouseMetrics}>
        <View style={styles.warehouseMetric}>
          <Text style={styles.warehouseMetricLabel}>Capacity</Text>
          <Text style={[styles.warehouseMetricValue, { color: THEME.neonCyan }]}>{warehouse.capacity}</Text>
        </View>
        <View style={styles.warehouseMetric}>
          <Text style={styles.warehouseMetricLabel}>Utilization</Text>
          <Text style={[styles.warehouseMetricValue, { color: warehouse.utilization > 85 ? THEME.amber : THEME.emeraldGreen }]}>{warehouse.utilization}%</Text>
        </View>
      </View>
    </BlurView>
  );

  const renderMarketCard = (market: typeof TOP_MARKETS[0]) => (
    <BlurView key={market.city} intensity={20} tint="dark" style={styles.marketCard}>
      <View style={styles.marketHeader}>
        <MapPin size={16} color={THEME.neonCyan} />
        <Text style={styles.marketCity}>{market.city}</Text>
        <Text style={styles.marketCountry}>{market.country}</Text>
      </View>
      <View style={styles.marketMetrics}>
        <View style={styles.marketMetric}>
          <Text style={styles.marketMetricLabel}>Revenue</Text>
          <Text style={[styles.marketMetricValue, { color: THEME.emeraldGreen }]}>{market.revenue}</Text>
        </View>
        <View style={styles.marketMetric}>
          <Text style={styles.marketMetricLabel}>Stores</Text>
          <Text style={[styles.marketMetricValue, { color: THEME.neonCyan }]}>{market.stores}</Text>
        </View>
      </View>
      {renderTrendIndicator(market.growth, 'up')}
    </BlurView>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: THEME.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={THEME.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerTitle}>
            <Globe size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Global Retail Operations</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Global Metrics */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <BarChart3 size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Global Metrics</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.metricsCard}>
            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <Store size={20} color={THEME.neonCyan} />
                <Text style={styles.metricLabel}>Total Stores</Text>
                <Text style={[styles.metricValue, { color: THEME.neonCyan }]}>{GLOBAL_METRICS.totalStores}</Text>
              </View>
              <View style={styles.metricItem}>
                <Building2 size={20} color={THEME.electricBlue} />
                <Text style={styles.metricLabel}>Countries</Text>
                <Text style={[styles.metricValue, { color: THEME.electricBlue }]}>{GLOBAL_METRICS.totalCountries}</Text>
              </View>
              <View style={styles.metricItem}>
                <Warehouse size={20} color={THEME.emeraldGreen} />
                <Text style={styles.metricLabel}>Warehouses</Text>
                <Text style={[styles.metricValue, { color: THEME.emeraldGreen }]}>{GLOBAL_METRICS.totalWarehouses}</Text>
              </View>
              <View style={styles.metricItem}>
                <Users size={20} color={THEME.purple} />
                <Text style={styles.metricLabel}>Employees</Text>
                <Text style={[styles.metricValue, { color: THEME.purple }]}>{GLOBAL_METRICS.totalEmployees}</Text>
              </View>
              <View style={styles.metricItem}>
                <DollarSign size={20} color={THEME.amber} />
                <Text style={styles.metricLabel}>Global Revenue</Text>
                <Text style={[styles.metricValue, { color: THEME.amber }]}>{GLOBAL_METRICS.globalRevenue}</Text>
              </View>
              <View style={styles.metricItem}>
                <Activity size={20} color={THEME.magenta} />
                <Text style={styles.metricLabel}>Global Customers</Text>
                <Text style={[styles.metricValue, { color: THEME.magenta }]}>{GLOBAL_METRICS.globalCustomers}</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Regional Performance */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Regional Performance</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.regionsScroll}>
            <View style={styles.regionsContainer}>
              {REGIONAL_DATA.map((region) => renderRegionCard(region))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Warehouse Network */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Warehouse size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Warehouse Network</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.warehousesScroll}>
            <View style={styles.warehousesContainer}>
              {WAREHOUSE_NETWORK.map((warehouse) => renderWarehouseCard(warehouse))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Top Markets */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Top Performing Markets</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.marketsScroll}>
            <View style={styles.marketsContainer}>
              {TOP_MARKETS.map((market) => renderMarketCard(market))}
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
  regionsScroll: {
    marginBottom: 0,
  },
  regionsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  regionCard: {
    width: 180,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  regionName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 12,
  },
  regionMetrics: {
    gap: 8,
    marginBottom: 12,
  },
  regionMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  regionMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  regionMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  regionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  warehousesScroll: {
    marginBottom: 0,
  },
  warehousesContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  warehouseCard: {
    width: 160,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  warehouseName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 4,
  },
  warehouseRegion: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 12,
  },
  warehouseMetrics: {
    gap: 8,
  },
  warehouseMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  warehouseMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  warehouseMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  marketsScroll: {
    marginBottom: 0,
  },
  marketsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  marketCard: {
    width: 180,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  marketHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  marketCity: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  marketCountry: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  marketMetrics: {
    gap: 8,
    marginBottom: 12,
  },
  marketMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  marketMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  marketMetricValue: {
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
