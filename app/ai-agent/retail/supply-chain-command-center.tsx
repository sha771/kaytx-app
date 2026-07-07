/**
 * =============================================================================
 * SUPPLY CHAIN COMMAND CENTER
 * =============================================================================
 *
 * A comprehensive supply chain dashboard that monitors supplier performance,
 * logistics operations, distribution centers, delivery status, and fulfillment
 * efficiency across the retail supply chain network.
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
  Truck,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Target,
  Activity,
  Zap,
  Warehouse,
  Package,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
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

// Distribution Centers
const DISTRIBUTION_CENTERS = [
  { id: 1, name: 'NYC Distribution', capacity: 87, utilization: 82, throughput: '124K/day', status: 'optimal' },
  { id: 2, name: 'LA Regional Hub', capacity: 92, utilization: 78, throughput: '98K/day', status: 'optimal' },
  { id: 3, name: 'Chicago Central', capacity: 76, utilization: 94, throughput: '89K/day', status: 'warning' },
  { id: 4, name: 'Miami Gateway', capacity: 84, utilization: 71, throughput: '67K/day', status: 'optimal' },
  { id: 5, name: 'Seattle Pacific', capacity: 68, utilization: 89, throughput: '54K/day', status: 'warning' },
];

// Supplier Performance
const SUPPLIER_PERFORMANCE = [
  { supplier: 'Apple Inc.', onTimeDelivery: 96, qualityScore: 98, costEfficiency: 87, status: 'excellent' },
  { supplier: 'Nike Corporation', onTimeDelivery: 94, qualityScore: 96, costEfficiency: 82, status: 'excellent' },
  { supplier: 'Sony Electronics', onTimeDelivery: 89, qualityScore: 94, costEfficiency: 78, status: 'good' },
  { supplier: 'Samsung Electronics', onTimeDelivery: 92, qualityScore: 92, costEfficiency: 85, status: 'good' },
  { supplier: 'Dyson Limited', onTimeDelivery: 87, qualityScore: 97, costEfficiency: 72, status: 'good' },
];

// Logistics Metrics
const LOGISTICS_METRICS = {
  totalDeliveries: '847K',
  onTimeRate: 94,
  avgDeliveryTime: '2.4 days',
  supplyChainEfficiency: 91,
  costSavings: '$89M',
  carbonReduction: '12%',
};

// Active Shipments
const ACTIVE_SHIPMENTS = [
  { id: 'SHP-001', origin: 'Shenzhen', destination: 'NYC Distribution', status: 'In Transit', eta: '2 days' },
  { id: 'SHP-002', origin: 'Los Angeles', destination: 'Chicago Central', status: 'Processing', eta: '1 day' },
  { id: 'SHP-003', origin: 'Seattle', destination: 'Miami Gateway', status: 'In Transit', eta: '3 days' },
  { id: 'SHP-004', origin: 'Chicago', destination: 'LA Regional Hub', status: 'Delivered', eta: '0 days' },
  { id: 'SHP-005', origin: 'Miami', destination: 'Seattle Pacific', status: 'Delayed', eta: '5 days' },
];

export default function SupplyChainCommandCenter() {
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

  const renderDistributionCard = (dc: typeof DISTRIBUTION_CENTERS[0]) => {
    const statusColors = {
      optimal: THEME.emeraldGreen,
      warning: THEME.amber,
      critical: THEME.red,
    };
    const color = statusColors[dc.status as keyof typeof statusColors];

    return (
      <BlurView key={dc.id} intensity={20} tint="dark" style={styles.dcCard}>
        <Text style={styles.dcName}>{dc.name}</Text>
        <View style={styles.dcMetrics}>
          <View style={styles.dcMetric}>
            <Text style={styles.dcMetricLabel}>Capacity</Text>
            <Text style={[styles.dcMetricValue, { color: THEME.neonCyan }]}>{dc.capacity}%</Text>
          </View>
          <View style={styles.dcMetric}>
            <Text style={styles.dcMetricLabel}>Utilization</Text>
            <Text style={[styles.dcMetricValue, { color }]}>{dc.utilization}%</Text>
          </View>
          <View style={styles.dcMetric}>
            <Text style={styles.dcMetricLabel}>Throughput</Text>
            <Text style={[styles.dcMetricValue, { color: THEME.electricBlue }]}>{dc.throughput}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: color + '20' }]}>
          <Text style={[styles.statusText, { color }]}>{dc.status.toUpperCase()}</Text>
        </View>
      </BlurView>
    );
  };

  const renderSupplierCard = (supplier: typeof SUPPLIER_PERFORMANCE[0]) => {
    const statusColors = {
      excellent: THEME.emeraldGreen,
      good: THEME.electricBlue,
      review: THEME.amber,
      critical: THEME.red,
    };
    const color = statusColors[supplier.status as keyof typeof statusColors];

    return (
      <BlurView key={supplier.supplier} intensity={20} tint="dark" style={styles.supplierCard}>
        <Text style={styles.supplierName}>{supplier.supplier}</Text>
        <View style={styles.supplierMetrics}>
          <View style={styles.supplierMetric}>
            <Text style={styles.supplierMetricLabel}>On-Time</Text>
            <Text style={[styles.supplierMetricValue, { color: THEME.neonCyan }]}>{supplier.onTimeDelivery}%</Text>
          </View>
          <View style={styles.supplierMetric}>
            <Text style={styles.supplierMetricLabel}>Quality</Text>
            <Text style={[styles.supplierMetricValue, { color: THEME.emeraldGreen }]}>{supplier.qualityScore}%</Text>
          </View>
          <View style={styles.supplierMetric}>
            <Text style={styles.supplierMetricLabel}>Cost Efficiency</Text>
            <Text style={[styles.supplierMetricValue, { color: THEME.purple }]}>{supplier.costEfficiency}%</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: color + '20' }]}>
          <Text style={[styles.statusText, { color }]}>{supplier.status.toUpperCase()}</Text>
        </View>
      </BlurView>
    );
  };

  const renderShipmentCard = (shipment: typeof ACTIVE_SHIPMENTS[0]) => {
    const statusColors = {
      'In Transit': THEME.electricBlue,
      Processing: THEME.amber,
      Delivered: THEME.emeraldGreen,
      Delayed: THEME.red,
    };
    const color = statusColors[shipment.status as keyof typeof statusColors];

    return (
      <BlurView key={shipment.id} intensity={20} tint="dark" style={styles.shipmentCard}>
        <View style={styles.shipmentHeader}>
          <Text style={styles.shipmentId}>{shipment.id}</Text>
          <View style={[styles.shipmentStatusBadge, { backgroundColor: color + '20' }]}>
            <Text style={[styles.shipmentStatusText, { color }]}>{shipment.status}</Text>
          </View>
        </View>
        <View style={styles.shipmentRoute}>
          <View style={styles.shipmentPoint}>
            <MapPin size={12} color={THEME.textMuted} />
            <Text style={styles.shipmentLocation}>{shipment.origin}</Text>
          </View>
          <Activity size={16} color={THEME.neonCyan} />
          <View style={styles.shipmentPoint}>
            <MapPin size={12} color={THEME.textMuted} />
            <Text style={styles.shipmentLocation}>{shipment.destination}</Text>
          </View>
        </View>
        <View style={styles.shipmentEta}>
          <Clock size={14} color={THEME.textMuted} />
          <Text style={styles.shipmentEtaText}>ETA: {shipment.eta}</Text>
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
            <Truck size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Supply Chain Command Center</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Logistics Metrics */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <BarChart3 size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Logistics Metrics</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.metricsCard}>
            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <Package size={20} color={THEME.neonCyan} />
                <Text style={styles.metricLabel}>Total Deliveries</Text>
                <Text style={[styles.metricValue, { color: THEME.neonCyan }]}>{LOGISTICS_METRICS.totalDeliveries}</Text>
              </View>
              <View style={styles.metricItem}>
                <CheckCircle size={20} color={THEME.electricBlue} />
                <Text style={styles.metricLabel}>On-Time Rate</Text>
                <Text style={[styles.metricValue, { color: THEME.electricBlue }]}>{LOGISTICS_METRICS.onTimeRate}%</Text>
              </View>
              <View style={styles.metricItem}>
                <Clock size={20} color={THEME.emeraldGreen} />
                <Text style={styles.metricLabel}>Avg Delivery Time</Text>
                <Text style={[styles.metricValue, { color: THEME.emeraldGreen }]}>{LOGISTICS_METRICS.avgDeliveryTime}</Text>
              </View>
              <View style={styles.metricItem}>
                <Zap size={20} color={THEME.purple} />
                <Text style={styles.metricLabel}>Supply Chain Efficiency</Text>
                <Text style={[styles.metricValue, { color: THEME.purple }]}>{LOGISTICS_METRICS.supplyChainEfficiency}%</Text>
              </View>
              <View style={styles.metricItem}>
                <Target size={20} color={THEME.amber} />
                <Text style={styles.metricLabel}>Cost Savings</Text>
                <Text style={[styles.metricValue, { color: THEME.amber }]}>{LOGISTICS_METRICS.costSavings}</Text>
              </View>
              <View style={styles.metricItem}>
                <Activity size={20} color={THEME.magenta} />
                <Text style={styles.metricLabel}>Carbon Reduction</Text>
                <Text style={[styles.metricValue, { color: THEME.magenta }]}>{LOGISTICS_METRICS.carbonReduction}</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Distribution Centers */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Warehouse size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Distribution Centers</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dcScroll}>
            <View style={styles.dcContainer}>
              {DISTRIBUTION_CENTERS.map((dc) => renderDistributionCard(dc))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Supplier Performance */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Package size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Supplier Performance</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suppliersScroll}>
            <View style={styles.suppliersContainer}>
              {SUPPLIER_PERFORMANCE.map((supplier) => renderSupplierCard(supplier))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Active Shipments */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Truck size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Active Shipments</Text>
          </View>
          <View style={styles.shipmentsContainer}>
            {ACTIVE_SHIPMENTS.map((shipment) => renderShipmentCard(shipment))}
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
  dcScroll: {
    marginBottom: 0,
  },
  dcContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  dcCard: {
    width: 180,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  dcName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 12,
  },
  dcMetrics: {
    gap: 8,
    marginBottom: 12,
  },
  dcMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dcMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  dcMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  suppliersScroll: {
    marginBottom: 0,
  },
  suppliersContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  supplierCard: {
    width: 180,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  supplierName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 12,
  },
  supplierMetrics: {
    gap: 8,
    marginBottom: 12,
  },
  supplierMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  supplierMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  supplierMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  shipmentsContainer: {
    gap: 12,
  },
  shipmentCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  shipmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  shipmentId: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  shipmentStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  shipmentStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  shipmentRoute: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  shipmentPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  shipmentLocation: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  shipmentEta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  shipmentEtaText: {
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
