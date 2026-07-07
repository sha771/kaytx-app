/**
 * =============================================================================
 * RETAIL & STORES AI OPERATING SYSTEM - MAIN DASHBOARD
 * =============================================================================
 *
 * The main entry point for the Retail & Stores AI Operating System.
 * Provides navigation to all retail command centers and AI agent interfaces.
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
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import {
  Store,
  Package,
  Users,
  Tag,
  Truck,
  Heart,
  ShoppingCart,
  Brain,
  TrendingUp,
  BarChart3,
  Activity,
  Zap,
  Globe,
  Settings,
  ChevronRight,
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

// Navigation Items
const NAVIGATION_ITEMS = [
  {
    id: 'executive',
    title: 'Executive Dashboard',
    description: 'Chief Retail Officer Command Center',
    icon: BarChart3,
    color: THEME.neonCyan,
    route: '/ai-agent/retail/chief-retail-officer-command-center',
  },
  {
    id: 'ai-agents',
    title: 'AI Retail Agents',
    description: 'Autonomous AI Agent Management',
    icon: Brain,
    color: THEME.electricBlue,
    route: '/ai-agent/retail/chief-retail-officer-command-center',
  },
  {
    id: 'store-ops',
    title: 'Store Operations',
    description: 'Store Performance & Operations',
    icon: Store,
    color: THEME.emeraldGreen,
    route: '/ai-agent/retail/store-operations-command-center',
  },
  {
    id: 'inventory',
    title: 'Inventory Intelligence',
    description: 'Inventory Management & Optimization',
    icon: Package,
    color: THEME.purple,
    route: '/ai-agent/retail/inventory-intelligence-hub',
  },
  {
    id: 'customer',
    title: 'Customer Intelligence',
    description: 'Customer Analytics & Segmentation',
    icon: Users,
    color: THEME.magenta,
    route: '/ai-agent/retail/customer-intelligence-center',
  },
  {
    id: 'merchandising',
    title: 'Merchandising',
    description: 'Product Performance & Assortment',
    icon: Tag,
    color: THEME.amber,
    route: '/ai-agent/retail/merchandising-command-center',
  },
  {
    id: 'pricing',
    title: 'Pricing Engine',
    description: 'Dynamic Pricing & Optimization',
    icon: TrendingUp,
    color: THEME.red,
    route: '/ai-agent/retail/pricing-intelligence-engine',
  },
  {
    id: 'supply-chain',
    title: 'Supply Chain',
    description: 'Logistics & Distribution Management',
    icon: Truck,
    color: THEME.electricBlue,
    route: '/ai-agent/retail/supply-chain-command-center',
  },
  {
    id: 'workforce',
    title: 'Workforce Management',
    description: 'Employee Performance & Scheduling',
    icon: Activity,
    color: THEME.emeraldGreen,
    route: '/ai-agent/retail/workforce-management-hub',
  },
  {
    id: 'marketing',
    title: 'Marketing & Loyalty',
    description: 'Campaigns & Customer Retention',
    icon: Heart,
    color: THEME.purple,
    route: '/ai-agent/retail/marketing-loyalty-center',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce',
    description: 'Online Sales & Digital Commerce',
    icon: ShoppingCart,
    color: THEME.magenta,
    route: '/ai-agent/retail/e-commerce-command-center',
  },
  {
    id: 'ai-insights',
    title: 'AI Insights',
    description: 'AI-Generated Recommendations',
    icon: Zap,
    color: THEME.neonCyan,
    route: '/ai-agent/retail/ai-insights-center',
  },
];

// Quick Stats
const QUICK_STATS = [
  { label: 'Total Revenue', value: '$8.4B', color: THEME.neonCyan },
  { label: 'Active Stores', value: '3,850', color: THEME.electricBlue },
  { label: 'Active Customers', value: '48M', color: THEME.emeraldGreen },
  { label: 'AI Revenue Impact', value: '+$520M', color: THEME.purple },
];

export default function RetailIndex() {
  const router = useRouter();
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

  const renderNavCard = (item: typeof NAVIGATION_ITEMS[0]) => {
    const Icon = item.icon;
    return (
      <Animated.View entering={FadeInUp.springify()} style={styles.navCard}>
        <TouchableOpacity
          style={styles.navCardInner}
          onPress={() => router.push(item.route as any)}
        >
          <View style={[styles.navIcon, { backgroundColor: item.color + '20' }]}>
            <Icon size={24} color={item.color} />
          </View>
          <View style={styles.navContent}>
            <Text style={styles.navTitle}>{item.title}</Text>
            <Text style={styles.navDescription}>{item.description}</Text>
          </View>
          <ChevronRight size={20} color={THEME.textMuted} />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderQuickStat = (stat: typeof QUICK_STATS[0]) => (
    <BlurView key={stat.label} intensity={20} tint="dark" style={styles.statCard}>
      <Text style={styles.statLabel}>{stat.label}</Text>
      <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
    </BlurView>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: THEME.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTitle}>
            <Store size={32} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Retail & Stores AI OS</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <BarChart3 size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Executive Overview</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScroll}>
            <View style={styles.statsContainer}>
              {QUICK_STATS.map((stat) => renderQuickStat(stat))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Navigation */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Globe size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Command Centers</Text>
          </View>
          <View style={styles.navContainer}>
            {NAVIGATION_ITEMS.map((item) => renderNavCard(item))}
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
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerText: {
    fontSize: 24,
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
  statsScroll: {
    marginBottom: 0,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  statCard: {
    width: 140,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  statLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  navContainer: {
    gap: 12,
  },
  navCard: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: THEME.border,
  },
  navCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: THEME.card,
  },
  navIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  navContent: {
    flex: 1,
  },
  navTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 4,
  },
  navDescription: {
    fontSize: 13,
    color: THEME.textMuted,
  },
});
