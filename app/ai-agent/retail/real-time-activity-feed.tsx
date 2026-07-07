/**
 * =============================================================================
 * REAL-TIME RETAIL ACTIVITY FEED
 * =============================================================================
 *
 * A live activity feed that displays real-time retail events including purchases,
 * inventory changes, customer activity, promotions, and AI recommendations across
 * the entire retail ecosystem.
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
  Activity,
  ShoppingCart,
  Package,
  Users,
  Tag,
  Truck,
  Heart,
  Brain,
  Zap,
  CheckCircle,
  Clock,
  TrendingUp,
  DollarSign,
  Store,
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

// Activity Feed Data
const ACTIVITY_FEED = [
  { id: 1, event: 'Purchase completed', details: 'iPhone 15 Pro Max - $1,199', time: '2 min ago', type: 'sales', location: 'Flagship NYC' },
  { id: 2, event: 'Inventory replenished', details: 'Nike Air Max 270 - 500 units', time: '5 min ago', type: 'inventory', location: 'LA Regional Hub' },
  { id: 3, event: 'New customer registered', details: 'Premium tier enrollment', time: '8 min ago', type: 'customer', location: 'Online' },
  { id: 4, event: 'Promotion launched', details: 'Summer Sale 2024 - 20% off', time: '12 min ago', type: 'marketing', location: 'Global' },
  { id: 5, event: 'Product trending', details: 'Sony WH-1000XM5 - +34% demand', time: '15 min ago', type: 'merchandising', location: 'All Stores' },
  { id: 6, event: 'Delivery completed', details: 'SHP-001 - Shenzhen to NYC', time: '18 min ago', type: 'supply', location: 'NYC Distribution' },
  { id: 7, event: 'Loyalty milestone achieved', details: 'Gold tier reached - Customer #4,521,847', time: '22 min ago', type: 'loyalty', location: 'Chicago Loop' },
  { id: 8, event: 'AI recommendation executed', details: 'Dynamic pricing - +8% revenue', time: '25 min ago', type: 'ai', location: 'System' },
  { id: 9, event: 'Store performance alert', details: 'Foot traffic +18% above forecast', time: '28 min ago', type: 'operations', location: 'Miami Beach' },
  { id: 10, event: 'Cart abandonment recovered', details: 'Email campaign - $2,450 recovered', time: '32 min ago', type: 'ecommerce', location: 'Online' },
  { id: 11, event: 'Workforce schedule optimized', details: '12 shifts adjusted for demand', time: '35 min ago', type: 'workforce', location: 'Seattle Downtown' },
  { id: 12, event: 'Supplier performance updated', details: 'Apple Inc. - 96% on-time delivery', time: '38 min ago', type: 'supply', location: 'Global' },
  { id: 13, event: 'Price adjustment applied', details: 'Dyson V15 - $749 → $699', time: '42 min ago', type: 'pricing', location: 'All Channels' },
  { id: 14, event: 'Customer retention campaign', details: 'Targeted offers sent to 45K customers', time: '45 min ago', type: 'marketing', location: 'Email' },
  { id: 15, event: 'AI forecast updated', details: 'Electronics demand +22% next month', time: '48 min ago', type: 'ai', location: 'System' },
];

// Activity Statistics
const ACTIVITY_STATS = {
  totalEvents: '2.4M',
  eventsPerHour: '12.4K',
  activeUsers: '847K',
  systemUptime: '99.97%',
};

export default function RealTimeActivityFeed() {
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

  const renderActivityItem = (activity: typeof ACTIVITY_FEED[0]) => {
    const typeConfig = {
      sales: { icon: ShoppingCart, color: THEME.emeraldGreen },
      inventory: { icon: Package, color: THEME.amber },
      customer: { icon: Users, color: THEME.neonCyan },
      marketing: { icon: Tag, color: THEME.purple },
      merchandising: { icon: TrendingUp, color: THEME.magenta },
      supply: { icon: Truck, color: THEME.electricBlue },
      loyalty: { icon: Heart, color: THEME.red },
      ai: { icon: Brain, color: THEME.neonCyan },
      operations: { icon: Store, color: THEME.emeraldGreen },
      ecommerce: { icon: Activity, color: THEME.purple },
      workforce: { icon: CheckCircle, color: THEME.electricBlue },
      pricing: { icon: DollarSign, color: THEME.amber },
    };
    const config = typeConfig[activity.type as keyof typeof typeConfig];
    const Icon = config.icon;

    return (
      <Animated.View entering={FadeInUp.springify()} style={styles.activityItem}>
        <BlurView intensity={20} tint="dark" style={styles.activityCard}>
          <View style={[styles.activityIcon, { backgroundColor: config.color + '20' }]}>
            <Icon size={16} color={config.color} />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityEvent}>{activity.event}</Text>
            <Text style={styles.activityDetails}>{activity.details}</Text>
            <View style={styles.activityMeta}>
              <View style={styles.activityLocation}>
                <Store size={12} color={THEME.textMuted} />
                <Text style={styles.activityLocationText}>{activity.location}</Text>
              </View>
              <View style={styles.activityTime}>
                <Clock size={12} color={THEME.textMuted} />
                <Text style={styles.activityTimeText}>{activity.time}</Text>
              </View>
            </View>
          </View>
        </BlurView>
      </Animated.View>
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
            <Activity size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Real-Time Activity Feed</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Activity Statistics */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Zap size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Live Statistics</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.statsCard}>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Activity size={20} color={THEME.neonCyan} />
                <Text style={styles.statLabel}>Total Events</Text>
                <Text style={[styles.statValue, { color: THEME.neonCyan }]}>{ACTIVITY_STATS.totalEvents}</Text>
              </View>
              <View style={styles.statItem}>
                <TrendingUp size={20} color={THEME.electricBlue} />
                <Text style={styles.statLabel}>Events/Hour</Text>
                <Text style={[styles.statValue, { color: THEME.electricBlue }]}>{ACTIVITY_STATS.eventsPerHour}</Text>
              </View>
              <View style={styles.statItem}>
                <Users size={20} color={THEME.emeraldGreen} />
                <Text style={styles.statLabel}>Active Users</Text>
                <Text style={[styles.statValue, { color: THEME.emeraldGreen }]}>{ACTIVITY_STATS.activeUsers}</Text>
              </View>
              <View style={styles.statItem}>
                <CheckCircle size={20} color={THEME.purple} />
                <Text style={styles.statLabel}>System Uptime</Text>
                <Text style={[styles.statValue, { color: THEME.purple }]}>{ACTIVITY_STATS.systemUptime}</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Activity Feed */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Activity size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Live Activity Stream</Text>
          </View>
          <View style={styles.feedContainer}>
            {ACTIVITY_FEED.map((activity) => renderActivityItem(activity))}
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
  statsCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginTop: 8,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  feedContainer: {
    gap: 12,
  },
  activityItem: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: THEME.border,
  },
  activityCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: THEME.card,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityEvent: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 4,
  },
  activityDetails: {
    fontSize: 13,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  activityMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  activityLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  activityLocationText: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  activityTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  activityTimeText: {
    fontSize: 12,
    color: THEME.textMuted,
  },
});
