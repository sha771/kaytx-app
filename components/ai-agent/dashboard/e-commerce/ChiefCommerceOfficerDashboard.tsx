import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  DollarSign, 
  Target, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  Zap,
  Globe,
  BarChart3
} from 'lucide-react-native';

export default function ChiefCommerceOfficerDashboard() {
  const { theme } = useTheme();

  const executiveMetrics = [
    {
      label: 'Total Revenue',
      value: '$4.2B',
      change: '+12.4%',
      icon: DollarSign,
      color: '#22C55E',
      description: 'Year to date revenue'
    },
    {
      label: 'Conversion Rate',
      value: '3.8%',
      change: '+0.8%',
      icon: Target,
      color: '#22C55E',
      description: 'Visitor to purchase'
    },
    {
      label: 'Active Customers',
      value: '28.4M',
      change: '+18.2%',
      icon: Users,
      color: '#38BDF8',
      description: 'Active 30-day customers'
    },
    {
      label: 'Orders Today',
      value: '1.8M',
      change: '+8.4%',
      icon: ShoppingCart,
      color: '#3B82F6',
      description: 'Daily order volume'
    },
    {
      label: 'AI Revenue Impact',
      value: '+$184M',
      change: '+18.2%',
      icon: Zap,
      color: '#8B5CF6',
      description: 'AI-driven revenue uplift'
    },
  ];

  const growthMetrics = [
    { label: 'QoQ Growth', value: '+14.2%', color: '#22C55E' },
    { label: 'YoY Growth', value: '+28.6%', color: '#22C55E' },
    { label: 'Market Share', value: '12.4%', color: '#38BDF8' },
    { label: 'Brand Awareness', value: '78%', color: '#8B5CF6' },
  ];

  const funnelOverview = [
    { stage: 'Visitors', value: '45.2M', conversion: '100%', color: '#3B82F6' },
    { stage: 'Product Views', value: '28.4M', conversion: '62.8%', color: '#38BDF8' },
    { stage: 'Add to Cart', value: '12.8M', conversion: '28.3%', color: '#8B5CF6' },
    { stage: 'Checkout', value: '4.2M', conversion: '9.3%', color: '#F59E0B' },
    { stage: 'Purchase', value: '1.8M', conversion: '3.8%', color: '#22C55E' },
  ];

  const platformHealth = [
    { metric: 'System Uptime', value: '99.97%', status: 'excellent' },
    { metric: 'API Latency', value: '45ms', status: 'excellent' },
    { metric: 'Error Rate', value: '0.02%', status: 'excellent' },
    { metric: 'Load Time', value: '1.2s', status: 'good' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Chief Commerce Officer Dashboard</Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>Executive commerce intelligence & revenue command center</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: '#22C55E' + '20' }]}>
          <Text style={[styles.statusText, { color: '#22C55E' }]}>LIVE</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Executive Metrics Grid */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Executive Commerce Summary</Text>
          <View style={styles.metricsGrid}>
            {executiveMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <View 
                  key={index}
                  style={[styles.metricCard, { backgroundColor: theme.colors.background, borderColor: metric.color + '30' }]}
                >
                  <View style={[styles.iconContainer, { backgroundColor: metric.color + '20' }]}>
                    <Icon size={24} color={metric.color} />
                  </View>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>{metric.value}</Text>
                  <Text style={[styles.metricChange, { color: metric.color }]}>{metric.change}</Text>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{metric.label}</Text>
                  <Text style={[styles.metricDescription, { color: theme.colors.textSecondary }]}>{metric.description}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Growth Trajectory */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Growth Trajectory</Text>
          <View style={[styles.growthContainer, { backgroundColor: theme.colors.background }]}>
            {growthMetrics.map((metric, index) => (
              <View key={index} style={styles.growthItem}>
                <Text style={[styles.growthLabel, { color: theme.colors.textSecondary }]}>{metric.label}</Text>
                <Text style={[styles.growthValue, { color: metric.color }]}>{metric.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Revenue Funnel */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Revenue Funnel Overview</Text>
          <View style={[styles.funnelContainer, { backgroundColor: theme.colors.background }]}>
            {funnelOverview.map((stage, index) => (
              <View key={index} style={styles.funnelItem}>
                <View style={[styles.funnelBar, { backgroundColor: stage.color, width: `${parseFloat(stage.conversion) * 8}%` }]} />
                <View style={styles.funnelInfo}>
                  <Text style={[styles.funnelStage, { color: theme.colors.text }]}>{stage.stage}</Text>
                  <Text style={[styles.funnelValue, { color: theme.colors.text }]}>{stage.value}</Text>
                  <Text style={[styles.funnelConversion, { color: stage.color }]}>{stage.conversion}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Platform Health */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Platform Health Snapshot</Text>
          <View style={[styles.healthContainer, { backgroundColor: theme.colors.background }]}>
            {platformHealth.map((metric, index) => (
              <View key={index} style={styles.healthItem}>
                <Text style={[styles.healthLabel, { color: theme.colors.textSecondary }]}>{metric.metric}</Text>
                <Text style={[styles.healthValue, { color: theme.colors.text }]}>{metric.value}</Text>
                <View style={[
                  styles.healthStatus, 
                  { backgroundColor: metric.status === 'excellent' ? '#22C55E' + '30' : '#F59E0B' + '30' }
                ]}>
                  <Text style={[
                    styles.healthStatusText,
                    { color: metric.status === 'excellent' ? '#22C55E' : '#F59E0B' }
                  ]}>
                    {metric.status}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  metricCard: {
    width: '48%',
    marginHorizontal: '1%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  metricDescription: {
    fontSize: 10,
  },
  growthContainer: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  growthItem: {
    alignItems: 'center',
  },
  growthLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  growthValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  funnelContainer: {
    padding: 16,
    borderRadius: 12,
  },
  funnelItem: {
    marginBottom: 12,
  },
  funnelBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  funnelInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  funnelStage: {
    fontSize: 14,
    fontWeight: '500',
  },
  funnelValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  funnelConversion: {
    fontSize: 12,
    fontWeight: '600',
  },
  healthContainer: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  healthItem: {
    alignItems: 'center',
  },
  healthLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  healthValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  healthStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  healthStatusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});