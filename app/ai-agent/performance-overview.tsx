import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Activity,
  TriangleAlert,
  CircleCheck,
  TrendingUp,
  Clock,
  Zap,
  Cpu,
  HardDrive,
  Network,
  DollarSign,
  ChartBar,
  ChartPie,
  RefreshCw,
  ListFilter,
  Download,
  Bell,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
  User,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width: _SCREEN_WIDTH } = Dimensions.get('window');

// Metric Types
interface Metric {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: any;
  color: string;
}

interface AlertItem {
  id: string;
  type: 'warning' | 'error' | 'info';
  title: string;
  description: string;
  timestamp: string;
  agent?: string;
}

interface AgentPerformance {
  id: string;
  name: string;
  tasksCompleted: number;
  avgResponseTime: string;
  successRate: number;
  status: 'active' | 'degraded' | 'offline';
  trend: 'up' | 'down' | 'stable';
}

// Mock Data
const SYSTEM_METRICS: Metric[] = [
  { label: 'Active Agents', value: '47', change: '+3 today', positive: true, icon: User, color: '#3B82F6' },
  { label: 'Total Requests', value: '128.5K', change: '+12.3% vs yesterday', positive: true, icon: Zap, color: '#10B981' },
  { label: 'Avg Response Time', value: '245ms', change: '-18ms vs yesterday', positive: true, icon: Clock, color: '#F59E0B' },
  { label: 'Success Rate', value: '99.2%', change: '+0.3% vs yesterday', positive: true, icon: CircleCheck, color: '#8B5CF6' },
];

const INFRASTRUCTURE_METRICS: Metric[] = [
  { label: 'CPU Usage', value: '42%', change: '-5% vs last hour', positive: true, icon: Cpu, color: '#06B6D4' },
  { label: 'Memory Usage', value: '68%', change: '+2% vs last hour', positive: false, icon: HardDrive, color: '#EC4899' },
  { label: 'Storage', value: '2.4TB', change: '+120GB this week', positive: false, icon: HardDrive, color: '#F97316' },
  { label: 'Network I/O', value: '1.2 Gbps', change: 'Stable', positive: true, icon: Network, color: '#14B8A6' },
];

const COST_METRICS: Metric[] = [
  { label: 'Today', value: '$1,247', change: '-8% vs yesterday', positive: true, icon: DollarSign, color: '#10B981' },
  { label: 'This Month', value: '$38.5K', change: '+12% vs last month', positive: false, icon: ChartBar, color: '#3B82F6' },
  { label: 'Projected', value: '$46.2K', change: 'On budget', positive: true, icon: ChartPie, color: '#F59E0B' },
  { label: 'Cost per Request', value: '$0.0097', change: '-3% vs last week', positive: true, icon: TrendingUp, color: '#8B5CF6' },
];

const ALERTS: AlertItem[] = [
  { id: '1', type: 'error', title: 'High Error Rate', description: 'Sales Agent AI showing 8% error rate', timestamp: '5 min ago', agent: 'Sales Agent AI' },
  { id: '2', type: 'warning', title: 'Response Time', description: 'Support Agent response time > 500ms', timestamp: '12 min ago', agent: 'Support Agent AI' },
  { id: '3', type: 'info', title: 'Agent Auto-Scaled', description: 'Marketing AI scaled to 3 instances', timestamp: '1 hour ago', agent: 'Marketing AI' },
  { id: '4', type: 'warning', title: 'Cost Threshold', description: 'Daily cost 85% of budget', timestamp: '2 hours ago' },
];

const AGENT_PERFORMANCE: AgentPerformance[] = [
  { id: '1', name: 'Accounting & Finance AI', tasksCompleted: 3420, avgResponseTime: '180ms', successRate: 99.5, status: 'active', trend: 'up' },
  { id: '2', name: 'Sales & Revenue AI', tasksCompleted: 4521, avgResponseTime: '220ms', successRate: 98.2, status: 'degraded', trend: 'down' },
  { id: '3', name: 'Customer Experience AI', tasksCompleted: 8934, avgResponseTime: '150ms', successRate: 99.8, status: 'active', trend: 'up' },
  { id: '4', name: 'HR & People AI', tasksCompleted: 2156, avgResponseTime: '195ms', successRate: 99.1, status: 'active', trend: 'stable' },
  { id: '5', name: 'Marketing & Growth AI', tasksCompleted: 6789, avgResponseTime: '210ms', successRate: 98.9, status: 'active', trend: 'up' },
];

export default function PerformanceDashboardScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[(colorScheme ?? 'light') as 'light' | 'dark'];

  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedTab, setSelectedTab] = useState<'overview' | 'agents' | 'infrastructure'>('overview');

  const timeRanges = ['1h', '6h', '24h', '7d', '30d'];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <TriangleAlert size={20} stroke="#EF4444" />;
      case 'warning':
        return <TriangleAlert size={20} stroke="#F59E0B" />;
      case 'info':
        return <CircleCheck size={20} stroke="#3B82F6" />;
      default:
        return <Activity size={20} stroke="#6B7280" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10B981';
      case 'degraded':
        return '#F59E0B';
      case 'offline':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight size={16} stroke="#10B981" />;
      case 'down':
        return <ArrowDownRight size={16} stroke="#EF4444" />;
      default:
        return <TrendingUp size={16} stroke="#6B7280" />;
    }
  };

  const renderMetricCard = (metric: Metric, index: number, small = false) => {
    const Icon = metric.icon;
    return (
      <Animated.View
        key={metric.label}
        entering={FadeInUp.delay(index * 50)}
        style={[styles.metricCard, { backgroundColor: colors.card }, small && styles.metricCardSmall]}
      >
        <View style={[styles.metricIcon, { backgroundColor: metric.color + '15' }]}>
          <Icon size={20} stroke={metric.color} />
        </View>
        <Text style={[styles.metricValue, { color: colors.text }]}>{metric.value}</Text>
        <Text style={[styles.metricLabel, { color: colors.icon }]}>{metric.label}</Text>
        <Text style={[styles.metricChange, { color: metric.positive ? '#10B981' : '#EF4444' }]}>
          {metric.change}
        </Text>
      </Animated.View>
    );
  };

  const renderAlertCard = (alert: AlertItem, index: number) => (
    <Animated.View
      key={alert.id}
      entering={FadeInUp.delay(index * 50)}
      style={[styles.alertCard, { backgroundColor: colors.card }]}
    >
      <View style={styles.alertIcon}>
        {getAlertIcon(alert.type)}
      </View>
      <View style={styles.alertContent}>
        <View style={styles.alertHeader}>
          <Text style={[styles.alertTitle, { color: colors.text }]}>{alert.title}</Text>
          <Text style={[styles.alertTime, { color: colors.icon }]}>{alert.timestamp}</Text>
        </View>
        <Text style={[styles.alertDescription, { color: colors.icon }]}>
          {alert.description}
        </Text>
        {alert.agent && (
          <View style={[styles.agentBadge, { backgroundColor: colors.background }]}>
            <User size={12} color={colors.tint} />
            <Text style={[styles.agentText, { color: colors.tint }]}>{alert.agent}</Text>
          </View>
        )}
      </View>
    </Animated.View>
  );

  const renderAgentRow = (agent: AgentPerformance, index: number) => (
    <Animated.View
      key={agent.id}
      entering={FadeInUp.delay(index * 50)}
      style={[styles.agentRow, { backgroundColor: colors.card }]}
    >
      <View style={styles.agentRowInfo}>
        <View style={[styles.statusDot, { backgroundColor: getStatusColor(agent.status) }]} />
        <View>
          <Text style={[styles.agentRowName, { color: colors.text }]}>{agent.name}</Text>
          <Text style={[styles.agentRowStatus, { color: colors.icon }]}>
            {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.agentRowMetrics}>
        <View style={styles.agentRowMetric}>
          <Text style={[styles.agentRowValue, { color: colors.text }]}>
            {agent.tasksCompleted.toLocaleString()}
          </Text>
          <Text style={[styles.agentRowLabel, { color: colors.icon }]}>Tasks</Text>
        </View>
        <View style={styles.agentRowMetric}>
          <Text style={[styles.agentRowValue, { color: colors.text }]}>{agent.avgResponseTime}</Text>
          <Text style={[styles.agentRowLabel, { color: colors.icon }]}>Response</Text>
        </View>
        <View style={styles.agentRowMetric}>
          <Text style={[styles.agentRowValue, { color: colors.text }]}>{agent.successRate}%</Text>
          <Text style={[styles.agentRowLabel, { color: colors.icon }]}>Success</Text>
        </View>
        <View style={styles.agentRowTrend}>
          {getTrendIcon(agent.trend)}
        </View>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={28} color={colors.text} />
          </TouchableOpacity>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              Performance Monitor
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
              System health & analytics
            </Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity>
            <Bell size={22} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Settings size={22} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Time Range Selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.timeRangeContainer}
      >
        {timeRanges.map(range => (
          <TouchableOpacity
            key={range}
            style={[
              styles.timeRangeChip,
              {
                backgroundColor: selectedTimeRange === range ? colors.tint : colors.card,
              },
            ]}
            onPress={() => setSelectedTimeRange(range)}
          >
            <Text
              style={[
                styles.timeRangeText,
                { color: selectedTimeRange === range ? 'white' : colors.text },
              ]}
            >
              {range}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        {(['overview', 'agents', 'infrastructure'] as const).map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && { backgroundColor: colors.tint + '20' },
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                { color: selectedTab === tab ? colors.tint : colors.icon },
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {selectedTab === 'overview' && (
          <>
            {/* System Metrics */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  System Overview
                </Text>
                <TouchableOpacity>
                  <RefreshCw size={18} color={colors.tint} />
                </TouchableOpacity>
              </View>
              <View style={styles.metricsGrid}>
                {SYSTEM_METRICS.map((metric, index) => renderMetricCard(metric, index))}
              </View>
            </View>

            {/* Cost Metrics */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Cost Analysis
                </Text>
                <TouchableOpacity>
                  <Download size={18} color={colors.tint} />
                </TouchableOpacity>
              </View>
              <View style={styles.metricsGrid}>
                {COST_METRICS.map((metric, index) => renderMetricCard(metric, index))}
              </View>
            </View>

            {/* Alerts */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Active Alerts ({ALERTS.length})
                </Text>
                <TouchableOpacity>
                  <Text style={[styles.viewAllText, { color: colors.tint }]}>View All</Text>
                </TouchableOpacity>
              </View>
              {ALERTS.map((alert, index) => renderAlertCard(alert, index))}
            </View>
          </>
        )}

        {selectedTab === 'agents' && (
          <>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Agent Performance
                </Text>
                <TouchableOpacity>
                  <ListFilter size={18} color={colors.tint} />
                </TouchableOpacity>
              </View>
              {AGENT_PERFORMANCE.map((agent, index) => renderAgentRow(agent, index))}
            </View>
          </>
        )}

        {selectedTab === 'infrastructure' && (
          <>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Infrastructure Health
                </Text>
                <TouchableOpacity>
                  <RefreshCw size={18} color={colors.tint} />
                </TouchableOpacity>
              </View>
              <View style={styles.metricsGrid}>
                {INFRASTRUCTURE_METRICS.map((metric, index) => renderMetricCard(metric, index))}
              </View>
            </View>
          </>
        )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  timeRangeContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  timeRangeChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  timeRangeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: '47%',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  metricCardSmall: {
    width: '22%',
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 13,
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '500',
  },
  alertCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  alertIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  alertContent: {
    flex: 1,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  alertTime: {
    fontSize: 12,
  },
  alertDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  agentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  agentText: {
    fontSize: 11,
    fontWeight: '500',
  },
  agentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  agentRowInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  agentRowName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  agentRowStatus: {
    fontSize: 12,
  },
  agentRowMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  agentRowMetric: {
    alignItems: 'flex-end',
  },
  agentRowValue: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  agentRowLabel: {
    fontSize: 11,
  },
  agentRowTrend: {
    marginLeft: 8,
  },
});
