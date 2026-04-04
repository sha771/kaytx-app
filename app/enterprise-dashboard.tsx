import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { Building2, Users, BarChart3, Settings, Shield, Zap, FileText, Lock, Server, GitBranch, Network, Globe } from 'lucide-react-native';

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
  const [metrics, setMetrics] = useState<DashboardMetric[]>(mockMetrics);
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

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Enterprise Dashboard',
          headerStyle: { backgroundColor: '#f8f9fa' },
          headerTitleStyle: { color: '#1a1a1a', fontWeight: '600' }
        }} 
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <Building2 size={28} color="#007AFF" />
            <View>
              <Text style={styles.title}>Enterprise Dashboard</Text>
              <Text style={styles.subtitle}>Comprehensive business overview</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <View style={styles.metricsGrid}>
            {metrics.map(metric => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Status</Text>
          <View style={styles.statusContainer}>
            <View style={styles.statusItem}>
              <View style={[styles.statusIndicator, { backgroundColor: '#34C759' }]} />
              <Text style={styles.statusText}>All Systems Operational</Text>
            </View>
            <View style={styles.statusItem}>
              <View style={[styles.statusIndicator, { backgroundColor: '#FF9500' }]} />
              <Text style={styles.statusText}>2 Scheduled Maintenance</Text>
            </View>
            <View style={styles.statusItem}>
              <View style={[styles.statusIndicator, { backgroundColor: '#007AFF' }]} />
              <Text style={styles.statusText}>API Rate Limit: 85%</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {actions.map(action => (
              <ActionCard key={action.id} action={action} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityContainer}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Users size={16} color="#007AFF" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>New user registration spike</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Shield size={16} color="#34C759" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Security scan completed</Text>
                <Text style={styles.activityTime}>4 hours ago</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <BarChart3 size={16} color="#FF9500" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Monthly report generated</Text>
                <Text style={styles.activityTime}>6 hours ago</Text>
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
  }
});