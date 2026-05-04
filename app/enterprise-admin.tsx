 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Users,
  DollarSign,
  Shield,
  Settings,
  Bell,
  Database,
  ArrowLeft,
  Activity,
  Zap,
  CircleCheck,
  TriangleAlert,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import { trpc } from '@/lib/trpc';

interface EnterpriseMetric {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<any>;
  color: string;
  trend: 'up' | 'down' | 'stable';
}

interface SystemStatus {
  id: string;
  service: string;
  status: 'operational' | 'degraded' | 'outage' | 'maintenance';
  uptime: string;
  responseTime: string;
  lastIncident: string;
}

interface UserActivity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  department: string;
  avatar: string;
  type: 'login' | 'data_access' | 'config_change' | 'export' | 'integration';
}

const enterpriseMetrics: EnterpriseMetric[] = [
  {
    title: 'Total Users',
    value: '2,847',
    change: '+12%',
    icon: Users,
    color: '#007AFF',
    trend: 'up',
  },
  {
    title: 'System Uptime',
    value: '99.9%',
    change: '+0.1%',
    icon: Activity,
    color: '#34C759',
    trend: 'up',
  },
  {
    title: 'Data Processed',
    value: '1.2TB',
    change: '+25%',
    icon: Database,
    color: '#FF9500',
    trend: 'up',
  },
  {
    title: 'API Calls',
    value: '847K',
    change: '+18%',
    icon: Zap,
    color: '#AF52DE',
    trend: 'up',
  },
  {
    title: 'Revenue',
    value: '$125K',
    change: '+8%',
    icon: DollarSign,
    color: '#34C759',
    trend: 'up',
  },
  {
    title: 'Security Score',
    value: '98/100',
    change: '+2',
    icon: Shield,
    color: '#007AFF',
    trend: 'up',
  },
];

const systemStatuses: SystemStatus[] = [
  {
    id: '1',
    service: 'API Gateway',
    status: 'operational',
    uptime: '99.99%',
    responseTime: '45ms',
    lastIncident: 'None',
  },
  {
    id: '2',
    service: 'Database Cluster',
    status: 'operational',
    uptime: '99.95%',
    responseTime: '12ms',
    lastIncident: '2 days ago',
  },
  {
    id: '3',
    service: 'Authentication Service',
    status: 'degraded',
    uptime: '98.2%',
    responseTime: '120ms',
    lastIncident: '4 hours ago',
  },
  {
    id: '4',
    service: 'File Storage',
    status: 'operational',
    uptime: '99.8%',
    responseTime: '89ms',
    lastIncident: '1 week ago',
  },
];

const userActivities: UserActivity[] = [
  {
    id: '1',
    user: 'John Admin',
    action: 'Updated system configuration',
    timestamp: '2 min ago',
    department: 'IT',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    type: 'config_change',
  },
  {
    id: '2',
    user: 'Sarah Manager',
    action: 'Exported user analytics report',
    timestamp: '15 min ago',
    department: 'Analytics',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    type: 'export',
  },
  {
    id: '3',
    user: 'Mike Developer',
    action: 'Accessed customer database',
    timestamp: '1 hour ago',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    type: 'data_access',
  },
];

export default function EnterpriseAdminScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'users' | 'system' | 'security'>('overview');
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);
  const [realTimeMonitoring, setRealTimeMonitoring] = useState<boolean>(true);

  // tRPC queries
  trpc.enterprise.auditLogs.useQuery({ limit: 10 });
  trpc.enterprise.organization.get.useQuery();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return '#34C759';
      case 'degraded': return '#FF9500';
      case 'outage': return '#FF3B30';
      case 'maintenance': return '#007AFF';
      default: return theme.colors.secondaryText;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return CircleCheck;
      case 'degraded': return TriangleAlert;
      case 'outage': return TriangleAlert;
      case 'maintenance': return Settings;
      default: return Activity;
    }
  };

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case 'login': return '#007AFF';
      case 'data_access': return '#FF9500';
      case 'config_change': return '#FF3B30';
      case 'export': return '#34C759';
      case 'integration': return '#AF52DE';
      default: return theme.colors.secondaryText;
    }
  };

  const renderMetric = ({ item }: { item: EnterpriseMetric }) => {
    const IconComponent = item.icon;
    const isPositive = item.change.startsWith('+');

    return (
      <View style= [styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.metricHeader}>
          <View style= [styles.metricIcon, { backgroundColor: `${item.color}20` }]}>
            <IconComponent size={20} color={item.color} />
          </View>
          <Text style= [styles.metricChange, { color: isPositive ? '#34C759' : '#FF3B30' }]}>
            {item.change}
          </Text>
        </View>
        <Text style= [styles.metricValue, { color: theme.colors.text }]}>{item.value}</Text>
        <Text style= [styles.metricTitle, { color: theme.colors.secondaryText }]}>{item.title}</Text>
      </View>
    );
  };

  const renderSystemStatus = ({ item }: { item: SystemStatus }) => {
    const statusColor = getStatusColor(item.status);
    const StatusIcon = getStatusIcon(item.status);

    return (
      <View style= [styles.statusCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.statusHeader}>
          <View style={styles.statusInfo}>
            <Text style= [styles.serviceName, { color: theme.colors.text }]}>{item.service}</Text>
            <View style= [styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
              <StatusIcon size={12} color={statusColor} />
              <Text style= [styles.statusText, { color: statusColor }]}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.statusMetrics}>
          <View style={styles.statusMetric}>
            <Text style= [styles.statusMetricLabel, { color: theme.colors.secondaryText }]}>Uptime</Text>
            <Text style= [styles.statusMetricValue, { color: theme.colors.text }]}>{item.uptime}</Text>
          </View>
          <View style={styles.statusMetric}>
            <Text style= [styles.statusMetricLabel, { color: theme.colors.secondaryText }]}>Response</Text>
            <Text style= [styles.statusMetricValue, { color: theme.colors.text }]}>{item.responseTime}</Text>
          </View>
          <View style={styles.statusMetric}>
            <Text style= [styles.statusMetricLabel, { color: theme.colors.secondaryText }]}>Last Incident</Text>
            <Text style= [styles.statusMetricValue, { color: theme.colors.text }]}>{item.lastIncident}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderUserActivity = ({ item }: { item: UserActivity }) => {
    const typeColor = getActivityTypeColor(item.type);

    return (
      <View style= [styles.activityCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.activityHeader}>
          <Image source={{ uri: item.avatar }} style={styles.activityAvatar} />
          <View style={styles.activityInfo}>
            <Text style= [styles.activityUser, { color: theme.colors.text }]}>{item.user}</Text>
            <Text style= [styles.activityAction, { color: theme.colors.secondaryText }]}>{item.action}</Text>
            <View style={styles.activityMeta}>
              <View style= [styles.typeBadge, { backgroundColor: typeColor + '20' }]}>
                <Text style= [styles.typeText, { color: typeColor }]}>
                  {item.type.replace('_', ' ').toUpperCase()}
                </Text>
              </View>
              <Text style= [styles.departmentText, { color: theme.colors.secondaryText }]}>
                {item.department}
              </Text>
            </View>
          </View>
          <Text style= [styles.activityTimestamp, { color: theme.colors.secondaryText }]}>
            {item.timestamp}
          </Text>
        </View>
      </View>
    );
  };

  const renderOverview = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* System Controls */}
      <View style= [styles.controlsSection, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.controlItem}>
          <View style={styles.controlInfo}>
            <Text style= [styles.controlTitle, { color: theme.colors.text }]}>Maintenance Mode</Text>
            <Text style= [styles.controlDescription, { color: theme.colors.secondaryText }]}>
              Enable to perform system updates
            </Text>
          </View>
          <Switch
            value={maintenanceMode}
            onValueChange={setMaintenanceMode}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor={maintenanceMode ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>

        <View style={styles.controlItem}>
          <View style={styles.controlInfo}>
            <Text style= [styles.controlTitle, { color: theme.colors.text }]}>Real-time Monitoring</Text>
            <Text style= [styles.controlDescription, { color: theme.colors.secondaryText }]}>
              Live system performance tracking
            </Text>
          </View>
          <Switch
            value={realTimeMonitoring}
            onValueChange={setRealTimeMonitoring}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor={realTimeMonitoring ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Metrics */}
      <View style={styles.section}>
        <Text style= [styles.sectionTitle, { color: theme.colors.text }]}>Enterprise Overview</Text>
        <FlatList
          data={enterpriseMetrics}
          renderItem={renderMetric}
          keyExtractor={(item) => item.title}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.metricsContainer}
        />
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style= [styles.sectionTitle, { color: theme.colors.text }]}>Recent Admin Activity</Text>
        <FlatList
          data={userActivities}
          renderItem={renderUserActivity}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.activitiesList}
        />
      </View>
    </ScrollView>
  );

  const renderUsers = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style= [styles.sectionTitle, { color: theme.colors.text }]}>User Management</Text>
        <View style= [styles.userStatsCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style= [styles.userStatsTitle, { color: theme.colors.text }]}>User Statistics</Text>
          <Text style= [styles.userStatsDescription, { color: theme.colors.secondaryText }]}>
            2,847 total users across 15 departments with 94% active in the last 30 days.
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderSystem = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style= [styles.sectionTitle, { color: theme.colors.text }]}>System Status</Text>
        <FlatList
          data={systemStatuses}
          renderItem={renderSystemStatus}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.statusList}
        />
      </View>
    </ScrollView>
  );

  const renderSecurity = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style= [styles.sectionTitle, { color: theme.colors.text }]}>Security Overview</Text>
        <View style= [styles.securityCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style= [styles.securityTitle, { color: theme.colors.text }]}>Security Score: 98/100</Text>
          <Text style= [styles.securityDescription, { color: theme.colors.secondaryText }]}>
            All security protocols are active. No threats detected in the last 30 days.
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style= [styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Premium Enterprise Admin Header */}
      <View style= [styles.premiumHeader, { paddingTop: insets.top + 20, backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style= [styles.premiumTitle, { color: theme.colors.text }]}>Admin Command</Text>
          <TouchableOpacity style= [styles.plusBtn, { backgroundColor: theme.colors.primary }]}>
            <Bell size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerMetrics}>
          <View style={styles.hMetric}>
            <Text style= [styles.hMetricVal, { color: theme.colors.text }]}>2,847</Text>
            <Text style= [styles.hMetricLab, { color: theme.colors.secondaryText }]}>Total Nodes</Text>
          </View>
          <View style={styles.hMetricDivider} />
          <View style={styles.hMetric}>
            <Text style= [styles.hMetricVal, { color: '#34C759' }]}>99.9%</Text>
            <Text style= [styles.hMetricLab, { color: theme.colors.secondaryText }]}>Uptime Sync</Text>
          </View>
          <View style={styles.hMetricDivider} />
          <View style={styles.hMetric}>
            <Text style= [styles.hMetricVal, { color: theme.colors.primary }]}>98/100</Text>
            <Text style= [styles.hMetricLab, { color: theme.colors.secondaryText }]}>Security</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['overview', 'users', 'system', 'security'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style= [
              styles.tab,
              selectedTab === tab && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style= [
                styles.tabText,
                {
                  color: selectedTab === tab ? 'white' : theme.colors.secondaryText,
                },
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {selectedTab === 'overview' && renderOverview()}
      {selectedTab === 'users' && renderUsers()}
      {selectedTab === 'system' && renderSystem()}
      {selectedTab === 'security' && renderSecurity()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  controlsSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  controlItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  controlInfo: {
    flex: 1,
  },
  controlTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  controlDescription: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  metricsContainer: {
    gap: 12,
  },
  metricCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 6,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  activitiesList: {
    gap: 12,
  },
  activityCard: {
    padding: 16,
    borderRadius: 12,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityUser: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  activityAction: {
    fontSize: 14,
    marginBottom: 6,
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  typeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  departmentText: {
    fontSize: 12,
  },
  activityTimestamp: {
    fontSize: 12,
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
  plusBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusList: {
    gap: 12,
  },
  statusCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  statusHeader: {
    marginBottom: 12,
  },
  statusInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusMetric: {
    alignItems: 'center',
  },
  statusMetricLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  statusMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  userStatsCard: {
    padding: 16,
    borderRadius: 12,
  },
  userStatsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  userStatsDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  securityCard: {
    padding: 16,
    borderRadius: 12,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  securityDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});

