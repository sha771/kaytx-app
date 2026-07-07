/**
 * =============================================================================
 * INVENTORY INTELLIGENCE HUB
 * =============================================================================
 *
 * A comprehensive inventory management dashboard that monitors inventory levels,
 * product availability, stock forecasts, reorder status, and warehouse capacity
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
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Warehouse,
  Truck,
  Box,
  Activity,
  Zap,
  Target,
  Clock,
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

// Inventory Categories
const INVENTORY_CATEGORIES = [
  { category: 'Electronics', totalValue: '$420M', stockLevel: 94, turnover: 8.2, status: 'healthy' },
  { category: 'Apparel', totalValue: '$380M', stockLevel: 87, turnover: 6.8, status: 'healthy' },
  { category: 'Home & Garden', totalValue: '$290M', stockLevel: 76, turnover: 5.4, status: 'warning' },
  { category: 'Sports & Outdoors', totalValue: '$240M', stockLevel: 92, turnover: 7.9, status: 'healthy' },
  { category: 'Beauty & Personal', totalValue: '$180M', stockLevel: 68, turnover: 4.2, status: 'critical' },
  { category: 'Food & Beverage', totalValue: '$120M', stockLevel: 89, turnover: 12.4, status: 'healthy' },
];

// Warehouse Status
const WAREHOUSE_STATUS = [
  { id: 1, name: 'NYC Distribution', capacity: 87, utilization: 82, status: 'optimal' },
  { id: 2, name: 'LA Regional Hub', capacity: 92, utilization: 78, status: 'optimal' },
  { id: 3, name: 'Chicago Central', capacity: 76, utilization: 94, status: 'warning' },
  { id: 4, name: 'Miami Gateway', capacity: 84, utilization: 71, status: 'optimal' },
  { id: 5, name: 'Seattle Pacific', capacity: 68, utilization: 89, status: 'warning' },
];

// Reorder Alerts
const REORDER_ALERTS = [
  { product: 'iPhone 15 Pro Max', sku: 'APL-IP15PM-256', currentStock: 24, reorderPoint: 50, urgency: 'critical' },
  { product: 'Nike Air Max 270', sku: 'NKE-AM270-42', currentStock: 38, reorderPoint: 75, urgency: 'high' },
  { product: 'Sony WH-1000XM5', sku: 'SNY-WH1000XM5', currentStock: 42, reorderPoint: 60, urgency: 'high' },
  { product: 'Dyson V15 Detect', sku: 'DYS-V15DETECT', currentStock: 18, reorderPoint: 40, urgency: 'critical' },
  { product: 'Samsung Galaxy S24', sku: 'SMS-GS24-512', currentStock: 56, reorderPoint: 80, urgency: 'medium' },
];

// Inventory Metrics
const INVENTORY_METRICS = {
  totalInventoryValue: '$1.9B',
  avgStockLevel: 87,
  stockoutRate: 2.1,
  replenishmentAccuracy: 96,
  automatedReorders: '847K',
  forecastAccuracy: 94,
};

export default function InventoryIntelligenceHub() {
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

  const renderCategoryCard = (category: typeof INVENTORY_CATEGORIES[0]) => {
    const statusColors = {
      healthy: THEME.emeraldGreen,
      warning: THEME.amber,
      critical: THEME.red,
    };
    const color = statusColors[category.status as keyof typeof statusColors];

    return (
      <BlurView key={category.category} intensity={20} tint="dark" style={styles.categoryCard}>
        <Text style={styles.categoryName}>{category.category}</Text>
        <View style={styles.categoryMetrics}>
          <View style={styles.categoryMetric}>
            <Text style={styles.categoryMetricLabel}>Value</Text>
            <Text style={[styles.categoryMetricValue, { color: THEME.neonCyan }]}>{category.totalValue}</Text>
          </View>
          <View style={styles.categoryMetric}>
            <Text style={styles.categoryMetricLabel}>Stock Level</Text>
            <Text style={[styles.categoryMetricValue, { color }]}>{category.stockLevel}%</Text>
          </View>
          <View style={styles.categoryMetric}>
            <Text style={styles.categoryMetricLabel}>Turnover</Text>
            <Text style={[styles.categoryMetricValue, { color: THEME.electricBlue }]}>{category.turnover}x</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: color + '20' }]}>
          <Text style={[styles.statusText, { color }]}>{category.status.toUpperCase()}</Text>
        </View>
      </BlurView>
    );
  };

  const renderWarehouseCard = (warehouse: typeof WAREHOUSE_STATUS[0]) => {
    const statusColors = {
      optimal: THEME.emeraldGreen,
      warning: THEME.amber,
      critical: THEME.red,
    };
    const color = statusColors[warehouse.status as keyof typeof statusColors];

    return (
      <BlurView key={warehouse.id} intensity={20} tint="dark" style={styles.warehouseCard}>
        <Text style={styles.warehouseName}>{warehouse.name}</Text>
        <View style={styles.warehouseMetrics}>
          <View style={styles.warehouseMetric}>
            <Text style={styles.warehouseMetricLabel}>Capacity</Text>
            <Text style={[styles.warehouseMetricValue, { color: THEME.neonCyan }]}>{warehouse.capacity}%</Text>
          </View>
          <View style={styles.warehouseMetric}>
            <Text style={styles.warehouseMetricLabel}>Utilization</Text>
            <Text style={[styles.warehouseMetricValue, { color: color }]}>{warehouse.utilization}%</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: color + '20' }]}>
          <Text style={[styles.statusText, { color }]}>{warehouse.status.toUpperCase()}</Text>
        </View>
      </BlurView>
    );
  };

  const renderReorderAlert = (alert: typeof REORDER_ALERTS[0]) => {
    const urgencyColors = {
      critical: THEME.red,
      high: THEME.amber,
      medium: THEME.electricBlue,
    };
    const color = urgencyColors[alert.urgency as keyof typeof urgencyColors];

    return (
      <BlurView key={alert.sku} intensity={20} tint="dark" style={styles.reorderCard}>
        <View style={styles.reorderHeader}>
          <Text style={styles.reorderProduct}>{alert.product}</Text>
          <View style={[styles.urgencyBadge, { backgroundColor: color + '20' }]}>
            <Text style={[styles.urgencyText, { color }]}>{alert.urgency.toUpperCase()}</Text>
          </View>
        </View>
        <Text style={styles.reorderSku}>{alert.sku}</Text>
        <View style={styles.reorderMetrics}>
          <View style={styles.reorderMetric}>
            <Text style={styles.reorderMetricLabel}>Current Stock</Text>
            <Text style={[styles.reorderMetricValue, { color }]}>{alert.currentStock}</Text>
          </View>
          <View style={styles.reorderMetric}>
            <Text style={styles.reorderMetricLabel}>Reorder Point</Text>
            <Text style={[styles.reorderMetricValue, { color: THEME.textMuted }]}>{alert.reorderPoint}</Text>
          </View>
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
            <Package size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Inventory Intelligence Hub</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Inventory Metrics */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <BarChart3 size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Inventory Metrics</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.metricsCard}>
            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <Box size={20} color={THEME.neonCyan} />
                <Text style={styles.metricLabel}>Total Value</Text>
                <Text style={[styles.metricValue, { color: THEME.neonCyan }]}>{INVENTORY_METRICS.totalInventoryValue}</Text>
              </View>
              <View style={styles.metricItem}>
                <Target size={20} color={THEME.electricBlue} />
                <Text style={styles.metricLabel}>Avg Stock Level</Text>
                <Text style={[styles.metricValue, { color: THEME.electricBlue }]}>{INVENTORY_METRICS.avgStockLevel}%</Text>
              </View>
              <View style={styles.metricItem}>
                <AlertTriangle size={20} color={THEME.red} />
                <Text style={styles.metricLabel}>Stockout Rate</Text>
                <Text style={[styles.metricValue, { color: THEME.red }]}>{INVENTORY_METRICS.stockoutRate}%</Text>
              </View>
              <View style={styles.metricItem}>
                <CheckCircle size={20} color={THEME.emeraldGreen} />
                <Text style={styles.metricLabel}>Replenishment Accuracy</Text>
                <Text style={[styles.metricValue, { color: THEME.emeraldGreen }]}>{INVENTORY_METRICS.replenishmentAccuracy}%</Text>
              </View>
              <View style={styles.metricItem}>
                <Zap size={20} color={THEME.purple} />
                <Text style={styles.metricLabel}>Automated Reorders</Text>
                <Text style={[styles.metricValue, { color: THEME.purple }]}>{INVENTORY_METRICS.automatedReorders}</Text>
              </View>
              <View style={styles.metricItem}>
                <Activity size={20} color={THEME.amber} />
                <Text style={styles.metricLabel}>Forecast Accuracy</Text>
                <Text style={[styles.metricValue, { color: THEME.amber }]}>{INVENTORY_METRICS.forecastAccuracy}%</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Inventory Categories */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Package size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Inventory Categories</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            <View style={styles.categoriesContainer}>
              {INVENTORY_CATEGORIES.map((category) => renderCategoryCard(category))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Warehouse Status */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Warehouse size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Warehouse Status</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.warehousesScroll}>
            <View style={styles.warehousesContainer}>
              {WAREHOUSE_STATUS.map((warehouse) => renderWarehouseCard(warehouse))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Reorder Alerts */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <AlertTriangle size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Reorder Alerts</Text>
          </View>
          <View style={styles.reordersContainer}>
            {REORDER_ALERTS.map((alert) => renderReorderAlert(alert))}
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
  categoriesScroll: {
    marginBottom: 0,
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  categoryCard: {
    width: 180,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 12,
  },
  categoryMetrics: {
    gap: 8,
    marginBottom: 12,
  },
  categoryMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  categoryMetricValue: {
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
    marginBottom: 12,
  },
  warehouseMetrics: {
    gap: 8,
    marginBottom: 12,
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
  reordersContainer: {
    gap: 12,
  },
  reorderCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  reorderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reorderProduct: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    flex: 1,
  },
  urgencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  urgencyText: {
    fontSize: 10,
    fontWeight: '600',
  },
  reorderSku: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 12,
  },
  reorderMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  reorderMetric: {
    flex: 1,
  },
  reorderMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  reorderMetricValue: {
    fontSize: 16,
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
