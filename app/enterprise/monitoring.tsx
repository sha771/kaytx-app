 
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Activity,
  TriangleAlert,
  CircleAlert,
  CircleCheck,
  TrendingUp,
  TrendingDown,
  Clock,
  Server,
  Database,
  Cpu,
  MemoryStick,
  HardDrive,
  Wifi,
  Eye,
  Bell,
  Settings,
  Zap,
  ChartBarBig,
  RefreshCw,
  Shield,
  History,
  Binary,
  AudioWaveform,
  Globe,
  GitBranch,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface MetricData {
  id: string;
  name: string;
  value: string;
  change: number;
  status: 'healthy' | 'warning' | 'critical';
  icon: React.ComponentType<any>;
  color: string;
  unit: string;
}

interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  service: string;
  timestamp: string;
  resolved: boolean;
}

interface Service {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'down' | 'maintenance';
  uptime: string;
  responseTime: string;
  requests: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  service: string;
  message: string;
  traceId?: string;
  environment: 'prod' | 'staging' | 'dev';
}

interface DashboardTile {
  id: string;
  title: string;
  metric: string;
  trend: number;
  unit: string;
}

interface AlertRule {
  id: string;
  name: string;
  channel: string;
  condition: string;
  enabled: boolean;
}

interface SyntheticCheck {
  id: string;
  name: string;
  location: string;
  latency: string;
  status: 'healthy' | 'warning' | 'critical';
}

const metrics: MetricData[] = [
  {
    id: '1',
    name: 'CPU Usage',
    value: '68',
    change: 12,
    status: 'healthy',
    icon: Cpu,
    color: '#007AFF',
    unit: '%',
  },
  {
    id: '2',
    name: 'Memory',
    value: '5.2',
    change: -5,
    status: 'healthy',
    icon: MemoryStick,
    color: '#34C759',
    unit: 'GB',
  },
  {
    id: '3',
    name: 'Response Time',
    value: '145',
    change: 8,
    status: 'warning',
    icon: Zap,
    color: '#FF9500',
    unit: 'ms',
  },
  {
    id: '4',
    name: 'Error Rate',
    value: '0.12',
    change: -15,
    status: 'healthy',
    icon: TriangleAlert,
    color: '#AF52DE',
    unit: '%',
  },
  {
    id: '5',
    name: 'Disk Usage',
    value: '72',
    change: 18,
    status: 'warning',
    icon: HardDrive,
    color: '#FF3B30',
    unit: '%',
  },
  {
    id: '6',
    name: 'Network I/O',
    value: '2.8',
    change: 5,
    status: 'healthy',
    icon: Wifi,
    color: '#5AC8FA',
    unit: 'Gbps',
  },
];

const alerts: Alert[] = [
  {
    id: '1',
    severity: 'critical',
    title: 'High CPU Usage',
    message: 'API server cluster CPU usage exceeded 90% for 5 minutes',
    service: 'API Server',
    timestamp: '2 min ago',
    resolved: false,
  },
  {
    id: '2',
    severity: 'warning',
    title: 'Slow Database Query',
    message: 'Query execution time increased by 40% in the last hour',
    service: 'PostgreSQL',
    timestamp: '15 min ago',
    resolved: false,
  },
  {
    id: '3',
    severity: 'info',
    title: 'Deployment Complete',
    message: 'Production deployment v2.5.0 completed successfully',
    service: 'CI/CD',
    timestamp: '1 hour ago',
    resolved: true,
  },
  {
    id: '4',
    severity: 'warning',
    title: 'Certificate Expiring',
    message: 'SSL certificate for api.example.com expires in 7 days',
    service: 'Security',
    timestamp: '2 hours ago',
    resolved: false,
  },
];

const services: Service[] = [
  {
    id: '1',
    name: 'API Gateway',
    status: 'operational',
    uptime: '99.99%',
    responseTime: '120ms',
    requests: '1.2M/h',
    icon: Server,
    color: '#007AFF',
  },
  {
    id: '2',
    name: 'Database',
    status: 'operational',
    uptime: '99.95%',
    responseTime: '45ms',
    requests: '850K/h',
    icon: Database,
    color: '#34C759',
  },
  {
    id: '3',
    name: 'Cache Layer',
    status: 'degraded',
    uptime: '98.50%',
    responseTime: '180ms',
    requests: '2.5M/h',
    icon: Zap,
    color: '#FF9500',
  },
  {
    id: '4',
    name: 'CDN',
    status: 'operational',
    uptime: '99.99%',
    responseTime: '35ms',
    requests: '5.8M/h',
    icon: Wifi,
    color: '#5AC8FA',
  },
];

const logs: LogEntry[] = [
  {
    id: '1',
    timestamp: '14:35:22',
    level: 'error',
    service: 'API',
    message: 'Failed to connect to database: connection timeout',
    traceId: 'trace-f91c',
    environment: 'prod',
  },
  {
    id: '2',
    timestamp: '14:34:18',
    level: 'warning',
    service: 'Auth',
    message: 'Rate limit exceeded for IP 192.168.1.100',
    traceId: 'trace-c201',
    environment: 'prod',
  },
  {
    id: '3',
    timestamp: '14:33:45',
    level: 'info',
    service: 'API',
    message: 'Health check completed successfully',
    environment: 'staging',
  },
  {
    id: '4',
    timestamp: '14:32:10',
    level: 'error',
    service: 'Worker',
    message: 'Job processing failed: invalid data format',
    traceId: 'trace-51aa',
    environment: 'prod',
  },
  {
    id: '5',
    timestamp: '14:31:05',
    level: 'info',
    service: 'CDN',
    message: 'Cache invalidation completed for /api/v1/*',
    environment: 'dev',
  },
];

const dashboardTiles: DashboardTile[] = [
  { id: 'tile-1', title: 'SLO Compliance', metric: '99.4', trend: 2, unit: '%' },
  { id: 'tile-2', title: 'Incidents (24h)', metric: '02', trend: -3, unit: 'count' },
  { id: 'tile-3', title: 'P95 Latency', metric: '182', trend: 5, unit: 'ms' },
  { id: 'tile-4', title: 'Synthetic Coverage', metric: '14', trend: 12, unit: 'regions' },
];

const alertRules: AlertRule[] = [
  { id: 'rule-1', name: 'Global CPU > 70%', channel: 'PagerDuty', condition: '5m average > 70%', enabled: true },
  { id: 'rule-2', name: 'Checkout Errors', channel: 'Slack #oncall', condition: 'error_rate > 0.5%', enabled: true },
  { id: 'rule-3', name: 'Deploy Regression', channel: 'Email', condition: 'latency delta > 20%', enabled: false },
];

const syntheticChecks: SyntheticCheck[] = [
  { id: 'check-1', name: 'Checkout Flow', location: 'Frankfurt', latency: '245ms', status: 'healthy' },
  { id: 'check-2', name: 'API Warmup', location: 'Tokyo', latency: '480ms', status: 'warning' },
  { id: 'check-3', name: 'Edge Auth', location: 'Virginia', latency: '120ms', status: 'healthy' },
];

export default function MonitoringScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'alerts' | 'services' | 'logs'>('overview');
  const [timeRange, setTimeRange] = useState<'15m' | '1h' | '6h' | '24h'>('15m');
  const [logFilter, setLogFilter] = useState<'all' | 'prod' | 'staging' | 'dev'>('all');

  const filteredLogs = useMemo(() => {
    if (logFilter === 'all') {
      return logs;
    }
    return logs.filter((log) => log.environment === logFilter);
  }, [logFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'operational':
        return '#34C759';
      case 'warning':
      case 'degraded':
        return '#FF9500';
      case 'critical':
      case 'down':
        return '#FF3B30';
      case 'maintenance':
        return '#8E8E93';
      default:
        return theme.colors.secondaryText;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '#FF3B30';
      case 'warning':
        return '#FF9500';
      case 'info':
        return '#007AFF';
      default:
        return theme.colors.secondaryText;
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'error':
        return '#FF3B30';
      case 'warning':
        return '#FF9500';
      case 'info':
        return '#34C759';
      default:
        return theme.colors.secondaryText;
    }
  };

  const renderMetric = ({ item }: { item: MetricData }) => {
    const IconComponent = item.icon;
    const statusColor = getStatusColor(item.status);
    const TrendIcon = item.change > 0 ? TrendingUp : TrendingDown;

    return (
      <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`metric-card-${item.id}`}>
        <View style={[styles.metricIcon, { backgroundColor: `${item.color}20` }]}>
          <IconComponent size={24} color={item.color} />
        </View>
        <View style={styles.metricContent}>
          <Text style={[styles.metricName, { color: theme.colors.secondaryText }]}>{item.name}</Text>
          <View style={styles.metricValueRow}>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>
              {item.value}
              <Text style={[styles.metricUnit, { color: theme.colors.secondaryText }]}> {item.unit}</Text>
            </Text>
            <View style={[styles.metricChange, { backgroundColor: `${statusColor}15` }]}
              testID={`metric-trend-${item.id}`}>
              <TrendIcon size={12} color={statusColor} />
              <Text style={[styles.metricChangeText, { color: statusColor }]}>{Math.abs(item.change)}%</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderAlert = ({ item }: { item: Alert }) => {
    const severityColor = getSeverityColor(item.severity);
    const SeverityIcon = item.severity === 'critical'
      ? CircleAlert
      : item.severity === 'warning'
        ? TriangleAlert
        : CheckCircle;

    return (
      <TouchableOpacity
        testID={`alert-card-${item.id}`}
        style={[styles.alertCard, {
          backgroundColor: theme.colors.cardBackground,
          opacity: item.resolved ? 0.6 : 1,
        }]}
        activeOpacity={0.7}
      >
        <View style={[styles.alertIcon, { backgroundColor: `${severityColor}20` }]}>
          <SeverityIcon size={24} color={severityColor} />
        </View>
        <View style={styles.alertContent}>
          <View style={styles.alertHeader}>
            <View style={[styles.severityBadge, { backgroundColor: `${severityColor}20` }]}>
              <Text style={[styles.severityText, { color: severityColor }]}>{item.severity.toUpperCase()}</Text>
            </View>
            <Text style={[styles.alertTimestamp, { color: theme.colors.secondaryText }]}>{item.timestamp}</Text>
          </View>
          <Text style={[styles.alertTitle, { color: theme.colors.text }]}>{item.title}</Text>
          <Text style={[styles.alertMessage, { color: theme.colors.secondaryText }]}>{item.message}</Text>
          <View style={styles.alertFooter}>
            <View style={[styles.serviceBadge, { backgroundColor: theme.colors.background }]}>
              <Server size={12} color={theme.colors.text} />
              <Text style={[styles.serviceText, { color: theme.colors.text }]}>{item.service}</Text>
            </View>
            {!item.resolved && (
              <TouchableOpacity style={[styles.resolveButton, { backgroundColor: theme.colors.primary }]}
                activeOpacity={0.8}>
                <Text style={styles.resolveButtonText}>Acknowledge</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderService = ({ item }: { item: Service }) => {
    const IconComponent = item.icon;
    const statusColor = getStatusColor(item.status);

    return (
      <TouchableOpacity
        testID={`service-card-${item.id}`}
        style={[styles.serviceCard, { backgroundColor: theme.colors.cardBackground }]}
        activeOpacity={0.7}
      >
        <View style={styles.serviceHeader}>
          <View style={[styles.serviceIcon, { backgroundColor: `${item.color}20` }]}>
            <IconComponent size={24} color={item.color} />
          </View>
          <View style={styles.serviceInfo}>
            <Text style={[styles.serviceName, { color: theme.colors.text }]}>{item.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
              <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
              <Text style={[styles.statusText, { color: statusColor }]}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.serviceMetrics}>
          <View style={styles.serviceMetric}>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Uptime</Text>
            <Text style={[styles.metricValueText, { color: theme.colors.text }]}>{item.uptime}</Text>
          </View>
          <View style={styles.serviceMetric}>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Response</Text>
            <Text style={[styles.metricValueText, { color: theme.colors.text }]}>{item.responseTime}</Text>
          </View>
          <View style={styles.serviceMetric}>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Requests</Text>
            <Text style={[styles.metricValueText, { color: theme.colors.text }]}>{item.requests}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderLog = ({ item }: { item: LogEntry }) => {
    const levelColor = getLogLevelColor(item.level);

    return (
      <View style={[styles.logEntry, { backgroundColor: theme.colors.cardBackground }]}
        testID={`log-entry-${item.id}`}>
        <View style={styles.logHeader}>
          <View style={[styles.logLevel, { backgroundColor: `${levelColor}20` }]}>
            <Text style={[styles.logLevelText, { color: levelColor }]}>{item.level.toUpperCase()}</Text>
          </View>
          <Text style={[styles.logTimestamp, { color: theme.colors.secondaryText }]}>{item.timestamp}</Text>
          <View style={[styles.logService, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.logServiceText, { color: theme.colors.text }]}>{item.service}</Text>
          </View>
          {item.traceId && (
            <View style={[styles.logTrace, { backgroundColor: theme.colors.background }]}>
              <Binary size={12} color={theme.colors.secondaryText} />
              <Text style={[styles.logTraceText, { color: theme.colors.secondaryText }]}>{item.traceId}</Text>
            </View>
          )}
        </View>
        <Text style={[styles.logMessage, { color: theme.colors.text }]}>{item.message}</Text>
        <Text style={[styles.logEnvironment, { color: theme.colors.secondaryText }]}>Env: {item.environment.toUpperCase()}</Text>
      </View>
    );
  };

  const renderDashboardTile = ({ item }: { item: DashboardTile }) => (
    <View style={[styles.tileCard, { backgroundColor: theme.colors.cardBackground }]}>
      <Text style={[styles.tileTitle, { color: theme.colors.secondaryText }]}>{item.title}</Text>
      <Text style={[styles.tileMetric, { color: theme.colors.text }]}>{item.metric}
        <Text style={[styles.tileUnit, { color: theme.colors.secondaryText }]}> {item.unit}</Text>
      </Text>
      <Text style={[styles.tileTrend, { color: item.trend >= 0 ? '#34C759' : '#FF3B30' }]}>
        {item.trend >= 0 ? '+' : ''}{item.trend}% vs last {timeRange}
      </Text>
    </View>
  );

  const renderAlertRule = ({ item }: { item: AlertRule }) => (
    <View style={[styles.ruleCard, { backgroundColor: theme.colors.cardBackground }]}
      testID={`alert-rule-${item.id}`}>
      <View style={styles.ruleHeader}>
        <Bell size={16} color={theme.colors.primary} />
        <Text style={[styles.ruleName, { color: theme.colors.text }]}>{item.name}</Text>
        <View style={[styles.switchLike, { backgroundColor: item.enabled ? theme.colors.primary : theme.colors.border }]}>
          <View style={[styles.switchKnob, { backgroundColor: '#FFFFFF', marginLeft: item.enabled ? 12 : 0 }]} />
        </View>
      </View>
      <Text style={[styles.ruleCondition, { color: theme.colors.secondaryText }]}>{item.condition}</Text>
      <View style={styles.ruleFooter}>
        <Text style={[styles.ruleChannel, { color: theme.colors.secondaryText }]}>{item.channel}</Text>
        <TouchableOpacity style={[styles.ruleButton, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.ruleButtonText, { color: theme.colors.text }]}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSyntheticCard = ({ item }: { item: SyntheticCheck }) => {
    const statusColor = getStatusColor(item.status);
    return (
      <View style={[styles.syntheticCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.syntheticHeader}>
          <Globe size={16} color={theme.colors.primary} />
          <Text style={[styles.syntheticName, { color: theme.colors.text }]}>{item.name}</Text>
          <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}
            testID={`synthetic-status-${item.id}`}>
            <Text style={[styles.statusText, { color: statusColor }]}>{item.status}</Text>
          </View>
        </View>
        <View style={styles.syntheticFooter}>
          <Text style={[styles.syntheticLocation, { color: theme.colors.secondaryText }]}>{item.location}</Text>
          <Text style={[styles.syntheticLatency, { color: theme.colors.text }]}>{item.latency}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]} testID="monitoring-header">
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Monitoring</Text>
        <TouchableOpacity style={styles.headerButton}>
          <RefreshCw size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        {(['overview', 'alerts', 'services', 'logs'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && { backgroundColor: theme.colors.primary }]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[styles.tabText, { color: selectedTab === tab ? 'white' : theme.colors.secondaryText }]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'overview' && (
          <View style={styles.section} testID="monitoring-overview">
            <View style={[styles.statusCard, { backgroundColor: '#34C75915' }]}
              testID="monitoring-status-card">
              <View style={styles.statusHeader}>
                <CircleCheck size={32} color="#34C759" />
                <View style={styles.statusInfo}>
                  <Text style={[styles.statusTitle, { color: theme.colors.text }]}>All Systems Operational</Text>
                  <Text style={[styles.statusDescription, { color: theme.colors.secondaryText }]}>4 services running smoothly • 99.97% uptime</Text>
                </View>
                <TouchableOpacity style={styles.timelineButton}>
                  <Clock size={16} color={theme.colors.text} />
                  <Text style={[styles.timelineText, { color: theme.colors.text }]}>{timeRange}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.rangeChips}>
              {(['15m', '1h', '6h', '24h'] as const).map((range) => (
                <TouchableOpacity
                  key={range}
                  style={[styles.rangeChip, timeRange === range && { backgroundColor: theme.colors.primary }]}
                  onPress={() => setTimeRange(range)}
                >
                  <Text style={[styles.rangeText, { color: timeRange === range ? '#FFFFFF' : theme.colors.secondaryText }]}>
                    Last {range}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <FlatList
              data={dashboardTiles}
              renderItem={renderDashboardTile}
              keyExtractor={(item) => item.id}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.tileRow}
              contentContainerStyle={styles.tileList}
            />

            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Metrics</Text>
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={[styles.viewAllText, { color: theme.colors.primary }]}>View All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={metrics}
              renderItem={renderMetric}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              numColumns={2}
              columnWrapperStyle={styles.metricsRow}
              contentContainerStyle={styles.metricsList}
            />

            <View style={styles.dualColumn}>
              <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]} testID="log-stream-card">
                <View style={styles.cardHeader}>
                  <AudioWaveform size={18} color={theme.colors.primary} />
                  <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Real-time Logs</Text>
                  <TouchableOpacity>
                    <Settings size={16} color={theme.colors.secondaryText} />
                  </TouchableOpacity>
                </View>
                <View style={styles.logStream}>
                  {['API', 'DB', 'Queue', 'Edge'].map((stream) => (
                    <View key={stream} style={[styles.streamBadge, { backgroundColor: theme.colors.background }]}>
                      <History size={12} color={theme.colors.primary} />
                      <Text style={[styles.streamText, { color: theme.colors.text }]}>{stream}</Text>
                    </View>
                  ))}
                </View>
                <Text style={[styles.logStreamStat, { color: theme.colors.secondaryText }]}>96% logs indexed • 14 traces correlated</Text>
                <View style={styles.streamFooter}>
                  <View style={[styles.streamInsight, { backgroundColor: theme.colors.background }]}>
                    <ChartBarBig size={14} color={theme.colors.text} />
                    <Text style={[styles.streamInsightText, { color: theme.colors.text }]}>p99 412ms</Text>
                  </View>
                  <View style={[styles.streamInsight, { backgroundColor: theme.colors.background }]}>
                    <GitBranch size={14} color={theme.colors.text} />
                    <Text style={[styles.streamInsightText, { color: theme.colors.text }]}>Release v2.5.0</Text>
                  </View>
                  <View style={[styles.streamInsight, { backgroundColor: theme.colors.background }]}>
                    <Shield size={14} color={theme.colors.text} />
                    <Text style={[styles.streamInsightText, { color: theme.colors.text }]}>0 policy breaches</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]} testID="synthetic-card">
                <View style={styles.cardHeader}>
                  <Eye size={18} color={theme.colors.primary} />
                  <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Synthetic Coverage</Text>
                  <TouchableOpacity>
                    <RefreshCw size={16} color={theme.colors.secondaryText} />
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={syntheticChecks}
                  renderItem={renderSyntheticCard}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                  contentContainerStyle={styles.syntheticList}
                />
              </View>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Alerts</Text>
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() => setSelectedTab('alerts')}
              >
                <Text style={[styles.viewAllText, { color: theme.colors.primary }]}>View All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={alerts.slice(0, 3)}
              renderItem={renderAlert}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.alertsList}
            />

            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Alert Rules</Text>
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={[styles.viewAllText, { color: theme.colors.primary }]}>New Rule</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={alertRules}
              renderItem={renderAlertRule}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.alertRuleList}
            />

            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Service Status</Text>
            </View>
            <FlatList
              data={services}
              renderItem={renderService}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.servicesList}
            />
          </View>
        )}

        {selectedTab === 'alerts' && (
          <View style={styles.section} testID="monitoring-alerts">
            <View style={styles.alertsHeader}>
              <View style={styles.alertsStats}>
                <View style={styles.alertStat}>
                  <Text style={[styles.alertStatValue, { color: '#FF3B30' }]}>1</Text>
                  <Text style={[styles.alertStatLabel, { color: theme.colors.secondaryText }]}>Critical</Text>
                </View>
                <View style={styles.alertStat}>
                  <Text style={[styles.alertStatValue, { color: '#FF9500' }]}>2</Text>
                  <Text style={[styles.alertStatLabel, { color: theme.colors.secondaryText }]}>Warning</Text>
                </View>
                <View style={styles.alertStat}>
                  <Text style={[styles.alertStatValue, { color: '#007AFF' }]}>1</Text>
                  <Text style={[styles.alertStatLabel, { color: theme.colors.secondaryText }]}>Info</Text>
                </View>
              </View>
              <TouchableOpacity style={[styles.configButton, { backgroundColor: theme.colors.primary }]}>
                <Bell size={16} color="#FFFFFF" />
                <Text style={styles.configButtonText}>Configure Alerts</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={alerts}
              renderItem={renderAlert}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.alertsList}
            />
          </View>
        )}

        {selectedTab === 'services' && (
          <View style={styles.section} testID="monitoring-services">
            <View style={styles.servicesInfo}>
              <Activity size={24} color={theme.colors.primary} />
              <Text style={[styles.servicesInfoText, { color: theme.colors.secondaryText }]}>Monitor all your services and infrastructure in real-time</Text>
            </View>
            <FlatList
              data={services}
              renderItem={renderService}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.servicesList}
            />
          </View>
        )}

        {selectedTab === 'logs' && (
          <View style={styles.section} testID="monitoring-logs">
            <View style={styles.logsHeader}>
              <Eye size={24} color={theme.colors.primary} />
              <Text style={[styles.logsHeaderText, { color: theme.colors.secondaryText }]}>Real-time application logs</Text>
              <TouchableOpacity style={[styles.filterButton, { backgroundColor: theme.colors.cardBackground }]}>
                <Settings size={16} color={theme.colors.text} />
                <Text style={[styles.filterButtonText, { color: theme.colors.text }]}>Filter</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.logFilters}>
              {(['all', 'prod', 'staging', 'dev'] as const).map((Filter) => (
                <TouchableOpacity
                  key={Funnel}
                  style={[styles.logFilterChip, logFilter === Filter && { backgroundColor: theme.colors.primary }]}
                  onPress={() => setLogFilter(Filter)}
                >
                  <Text style={[styles.logFilterText, { color: logFilter === Filter ? '#FFFFFF' : theme.colors.secondaryText }]}>
                    {Filter.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <FlatList
              data={filteredLogs}
              renderItem={renderLog}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.logsList}
            />
          </View>
        )}
      </ScrollView>
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
    fontSize: 13,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    paddingBottom: 20,
  },
  statusCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  statusDescription: {
    fontSize: 14,
  },
  timelineButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  timelineText: {
    fontSize: 12,
    fontWeight: '600',
  },
  rangeChips: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  rangeChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  rangeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tileList: {
    marginBottom: 16,
  },
  tileRow: {
    gap: 12,
    marginBottom: 12,
  },
  tileCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
  },
  tileTitle: {
    fontSize: 12,
    marginBottom: 8,
  },
  tileMetric: {
    fontSize: 26,
    fontWeight: '700',
  },
  tileUnit: {
    fontSize: 12,
    marginLeft: 4,
  },
  tileTrend: {
    fontSize: 12,
    marginTop: 6,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewAllButton: {
    padding: 4,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  metricsList: {
    marginBottom: 24,
  },
  metricsRow: {
    gap: 12,
    marginBottom: 12,
  },
  metricCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricContent: {},
  metricName: {
    fontSize: 13,
    marginBottom: 8,
  },
  metricValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  metricUnit: {
    fontSize: 14,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  metricChangeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  dualColumn: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardTitle: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  logStream: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  streamBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    gap: 6,
  },
  streamText: {
    fontSize: 12,
    fontWeight: '600',
  },
  logStreamStat: {
    fontSize: 12,
  },
  streamFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 12,
  },
  streamInsight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    gap: 8,
  },
  streamInsightText: {
    fontSize: 12,
    fontWeight: '600',
  },
  syntheticList: {
    gap: 10,
  },
  syntheticCard: {
    padding: 12,
    borderRadius: 12,
  },
  syntheticHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  syntheticName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  syntheticFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  syntheticLocation: {
    fontSize: 12,
  },
  syntheticLatency: {
    fontSize: 16,
    fontWeight: '700',
  },
  alertsList: {
    gap: 12,
    marginBottom: 24,
  },
  alertCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
  },
  alertIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  severityText: {
    fontSize: 10,
    fontWeight: '700',
  },
  alertTimestamp: {
    fontSize: 12,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  alertMessage: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  alertFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  serviceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  serviceText: {
    fontSize: 12,
    fontWeight: '600',
  },
  resolveButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  resolveButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  servicesList: {
    gap: 12,
    marginBottom: 24,
  },
  serviceCard: {
    padding: 16,
    borderRadius: 12,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 6,
    alignSelf: 'flex-start',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  serviceMetrics: {
    flexDirection: 'row',
    gap: 24,
  },
  serviceMetric: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  metricValueText: {
    fontSize: 14,
    fontWeight: '600',
  },
  alertsHeader: {
    marginBottom: 20,
  },
  alertsStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  alertStat: {
    alignItems: 'center',
  },
  alertStatValue: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  alertStatLabel: {
    fontSize: 13,
  },
  configButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  configButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  servicesInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0,122,255,0.1)',
    borderRadius: 12,
    marginBottom: 20,
    gap: 12,
  },
  servicesInfoText: {
    flex: 1,
    fontSize: 14,
  },
  logsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0,122,255,0.1)',
    borderRadius: 12,
    marginBottom: 16,
    gap: 12,
  },
  logsHeaderText: {
    flex: 1,
    fontSize: 14,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  logFilters: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  logFilterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  logFilterText: {
    fontSize: 12,
    fontWeight: '600',
  },
  logsList: {
    gap: 8,
  },
  logEntry: {
    padding: 12,
    borderRadius: 10,
  },
  logHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  logLevel: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  logLevelText: {
    fontSize: 10,
    fontWeight: '700',
  },
  logTimestamp: {
    fontSize: 11,
    fontFamily: 'monospace',
  },
  logService: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  logServiceText: {
    fontSize: 11,
    fontWeight: '600',
  },
  logTrace: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 4,
  },
  logTraceText: {
    fontSize: 10,
    fontWeight: '600',
  },
  logMessage: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'monospace',
  },
  logEnvironment: {
    fontSize: 11,
    marginTop: 6,
  },
  alertsRuleHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  alertRuleList: {
    gap: 12,
    marginBottom: 16,
  },
  ruleCard: {
    padding: 16,
    borderRadius: 16,
  },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  ruleName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },
  switchLike: {
    width: 36,
    height: 18,
    borderRadius: 999,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  switchKnob: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  ruleCondition: {
    fontSize: 13,
    marginBottom: 12,
  },
  ruleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ruleChannel: {
    fontSize: 12,
  },
  ruleButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  ruleButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
