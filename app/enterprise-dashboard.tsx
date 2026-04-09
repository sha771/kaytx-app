 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { Building2, Users, BarChart3, Settings, Shield, Zap, FileText, Lock, Server, GitBranch, Network, Globe, ArrowLeft } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { trpc } from '@/lib/trpc';

interface DashboardMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: string;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const mockMetrics: DashboardMetric[] = [
  {
    id: '1',
    title: 'Total Revenue',
    value: '$2.4M',
    change: '+12.5%',
    trend: 'up',
    icon: 'dollar'
  },
  {
    id: '2',
    title: 'Active Users',
    value: '12,450',
    change: '+8.2%',
    trend: 'up',
    icon: 'users'
  },
  {
    id: '3',
    title: 'System Uptime',
    value: '99.9%',
    change: '+0.1%',
    trend: 'up',
    icon: 'activity'
  },
  {
    id: '4',
    title: 'Support Tickets',
    value: '24',
    change: '-15%',
    trend: 'down',
    icon: 'support'
  }
];

const mockActions: QuickAction[] = [
  {
    id: '1',
    title: 'Organization',
    description: 'Manage organization and teams',
    icon: 'users',
    color: '#007AFF'
  },
  {
    id: '2',
    title: 'Advanced Reporting',
    description: 'Generate detailed reports',
    icon: 'analytics',
    color: '#34C759'
  },
  {
    id: '3',
    title: 'Compliance & Audit',
    description: 'GDPR, HIPAA, SOC2 compliance',
    icon: 'security',
    color: '#FF9500'
  },
  {
    id: '4',
    title: 'API Management',
    description: 'Manage API keys and webhooks',
    icon: 'api',
    color: '#FF3B30'
  },
  {
    id: '5',
    title: 'Security Settings',
    description: 'SSO, MFA, IP Whitelisting',
    icon: 'lock',
    color: '#AF52DE'
  },
  {
    id: '6',
    title: 'Cloud Infrastructure',
    description: 'Manage cloud resources',
    icon: 'server',
    color: '#5AC8FA'
  },
  {
    id: '7',
    title: 'CI/CD Pipeline',
    description: 'Deployment automation',
    icon: 'cicd',
    color: '#FF2D55'
  },
  {
    id: '8',
    title: 'Networking',
    description: 'Network configuration',
    icon: 'network',
    color: '#32ADE6'
  }
];

export default function EnterpriseDashboardScreen() {
  const { theme } = useTheme();

  // Fetch analytics dashboard data from backend using tRPC
  const { data: analyticsData, isLoading, error, refetch } = trpc.enterprise.analytics.getDashboard.useQuery();

  // Transform backend data to dashboard format
  const getDashboardMetrics = (): DashboardMetric[] => {
    if (!analyticsData?.metrics) return mockMetrics; // Fallback to mock data
    
    return analyticsData.metrics.map((metric: any, index: number) => ({
      id: metric.id || index.toString(),
      title: metric.title || 'Metric',
      value: metric.value || '0',
      change: metric.change || '0%',
      trend: metric.trend || 'stable',
      icon: getIconForMetric(metric.type || 'default')
    }));
  };

  const getIconForMetric = (type: string) => {
    switch (type) {
      case 'revenue': return 'dollar';
      case 'users': return 'users';
      case 'uptime': return 'activity';
      case 'support_tickets': return 'support';
      default: return 'analytics';
    }
  };

  const metrics = getDashboardMetrics();
  const [actions, setActions] = useState<QuickAction[]>(mockActions);

  const getMetricIcon = (iconType: string) => {
    switch (iconType) {
      case 'users': return <Users size={24} color="#007AFF" />;
      case 'analytics': return <BarChart3 size={24} color="#34C759" />;
      case 'security': return <Shield size={24} color="#FF9500" />;
      case 'api': return <Zap size={24} color="#FF3B30" />;
      case 'lock': return <Lock size={24} color="#AF52DE" />;
      case 'server': return <Server size={24} color="#5AC8FA" />;
      case 'cicd': return <GitBranch size={24} color="#FF2D55" />;
      case 'network': return <Network size={24} color="#32ADE6" />;
      default: return <BarChart3 size={24} color="#8E8E93" />;
    }
  };

  const handleActionPress = (actionId: string) => {
    switch (actionId) {
      case '1':
        router.push('/enterprise/organization');
        break;
      case '2':
        router.push('/enterprise/reporting');
        break;
      case '3':
        router.push('/enterprise/compliance');
        break;
      case '4':
        router.push('/enterprise/api-management');
        break;
      case '5':
        router.push('/enterprise/security');
        break;
      case '6':
        router.push('/enterprise/infrastructure');
        break;
      case '7':
        router.push('/enterprise/cicd');
        break;
      case '8':
        router.push('/enterprise/networking');
        break;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return '#34C759';
      case 'down': return '#FF3B30';
      default: return '#8E8E93';
    }
  };

  const MetricCard = ({ metric }: { metric: DashboardMetric }) => (
    <TouchableOpacity style={styles.metricCard}>
      <View style={styles.metricHeader}>
        {getMetricIcon(metric.icon)}
        <Text style={styles.metricTitle}>{metric.title}</Text>
      </View>

      <View style={styles.metricContent}>
        <Text style={styles.metricValue}>{metric.value}</Text>
        <Text style={[styles.metricChange, { color: getTrendColor(metric.trend) }]}>
          {metric.change}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const ActionCard = ({ action }: { action: QuickAction }) => (
    <TouchableOpacity
      style={styles.actionCard}
      onPress={() => handleActionPress(action.id)}
    >
      <View style={[styles.actionIcon, { backgroundColor: `${action.color}20` }]}>
        {getMetricIcon(action.icon)}
      </View>
      <View style={styles.actionContent}>
        <Text style={styles.actionTitle}>{action.title}</Text>
        <Text style={styles.actionDescription}>{action.description}</Text>
      </View>
    </TouchableOpacity>
  );

  // Handle loading state
  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.text }]}>Loading dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Handle error state
  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.colors.text }]}>
            Failed to load dashboard data
          </Text>
          <TouchableOpacity 
            style={[styles.retryButton, { backgroundColor: theme.colors.primary }]} 
            onPress={refetch}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Premium Enterprise Header */}
        <View style={[styles.premiumHeader, { paddingTop: 20, backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={theme.colors.text} />
            </TouchableOpacity>
            <Text style={[styles.premiumTitle, { color: theme.colors.text }]}>Enterprise Core</Text>
            <TouchableOpacity style={styles.settingsButton}>
              <Settings size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerMetrics}>
            <View style={styles.hMetric}>
              <Text style={[styles.hMetricVal, { color: theme.colors.text }]}>$2.4M</Text>
              <Text style={[styles.hMetricLab, { color: theme.colors.secondaryText }]}>Total MRR</Text>
            </View>
            <View style={styles.hMetricDivider} />
            <View style={styles.hMetric}>
              <Text style={[styles.hMetricVal, { color: '#34C759' }]}>99.9%</Text>
              <Text style={[styles.hMetricLab, { color: theme.colors.secondaryText }]}>Core Uptime</Text>
            </View>
            <View style={styles.hMetricDivider} />
            <View style={styles.hMetric}>
              <Text style={[styles.hMetricVal, { color: theme.colors.primary }]}>Active</Text>
              <Text style={[styles.hMetricLab, { color: theme.colors.secondaryText }]}>Security</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Metrics</Text>
          <View style={styles.metricsGrid}>
            {metrics.map(metric => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>System Status</Text>
          <View style={[styles.statusContainer, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
            <View style={styles.statusItem}>
              <View style={[styles.statusIndicator, { backgroundColor: '#34C759' }]} />
              <Text style={[styles.statusText, { color: theme.colors.text }]}>All Systems Operational</Text>
            </View>
            <View style={styles.statusItem}>
              <View style={[styles.statusIndicator, { backgroundColor: '#FF9500' }]} />
              <Text style={[styles.statusText, { color: theme.colors.text }]}>2 Scheduled Maintenance</Text>
            </View>
            <View style={styles.statusItem}>
              <View style={[styles.statusIndicator, { backgroundColor: theme.colors.primary }]} />
              <Text style={[styles.statusText, { color: theme.colors.text }]}>API Rate Limit: 85%</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {actions.map(action => (
              <ActionCard key={action.id} action={action} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
          <View style={[styles.activityContainer, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: theme.colors.background }]}>
                <Users size={16} color={theme.colors.primary} />
              </View>
              <View style={styles.activityContent}>
                <Text style={[styles.activityTitle, { color: theme.colors.text }]}>New user registration spike</Text>
                <Text style={[styles.activityTime, { color: theme.colors.secondaryText }]}>2 hours ago</Text>
              </View>
            </View>

            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: theme.colors.background }]}>
                <Shield size={16} color="#34C759" />
              </View>
              <View style={styles.activityContent}>
                <Text style={[styles.activityTitle, { color: theme.colors.text }]}>Security scan completed</Text>
                <Text style={[styles.activityTime, { color: theme.colors.secondaryText }]}>4 hours ago</Text>
              </View>
            </View>

            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: theme.colors.background }]}>
                <BarChart3 size={16} color="#FF9500" />
              </View>
              <View style={styles.activityContent}>
                <Text style={[styles.activityTitle, { color: theme.colors.text }]}>Monthly report generated</Text>
                <Text style={[styles.activityTime, { color: theme.colors.secondaryText }]}>6 hours ago</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  content: {
    flex: 1,
    padding: 16
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a'
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2
  },
  settingsButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  metricCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12
  },
  metricTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    flex: 1
  },
  metricContent: {
    gap: 4
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a'
  },
  metricChange: {
    fontSize: 14,
    fontWeight: '600'
  },
  statusContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e1e5e9',
    gap: 12
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4
  },
  statusText: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '500'
  },
  actionsGrid: {
    gap: 12
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionContent: {
    flex: 1
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4
  },
  actionDescription: {
    fontSize: 14,
    color: '#666'
  },
  activityContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e1e5e9',
    gap: 16
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center'
  },
  activityContent: {
    flex: 1
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 2
  },
  activityTime: {
    fontSize: 12,
    color: '#666'
  },
  premiumHeader: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 10,
    zIndex: 10,
    marginBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  premiumTitle: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  hMetric: {
    alignItems: 'center',
    flex: 1,
  },
  hMetricVal: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  hMetricLab: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  hMetricDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(150,150,150,0.1)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});