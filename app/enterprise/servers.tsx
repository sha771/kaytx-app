 
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Server,
  Cpu,
  MemoryStick,
  Activity,
  TrendingUp,
  TriangleAlert,
  CircleCheck,
  Zap,
  RefreshCw,
  Settings,
  Plus,
  Play,
  Pause,
  RotateCcw,
  ChartBar,
  Globe,
  Gauge,
  Layers,
  ShieldCheck,
  GitBranch,
  CloudLightning,
  Thermometer,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface ServerInstance {
  id: string;
  name: string;
  type: 'web' | 'api' | 'worker' | 'database' | 'cache';
  status: 'running' | 'stopped' | 'starting' | 'error' | 'maintenance';
  region: string;
  instanceType: string;
  ipAddress: string;
  cpu: number;
  memory: number;
  disk: number;
  network: string;
  uptime: string;
  os: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface ServerMetric {
  label: string;
  value: string;
  change: string;
  unit: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface AutoScalingRule {
  id: string;
  name: string;
  metric: 'cpu' | 'memory' | 'network';
  threshold: number;
  action: 'scale-up' | 'scale-down';
  enabled: boolean;
}

interface DeploymentStrategy {
  id: string;
  title: string;
  mode: 'blue-green' | 'canary' | 'rolling';
  status: 'ready' | 'deploying' | 'paused';
  release: string;
  trafficSplit: string;
}

interface ProcessInfo {
  id: string;
  name: string;
  service: string;
  cpu: number;
  memory: number;
  restarts: number;
  status: 'running' | 'degraded';
}

interface MonitoringStream {
  id: string;
  title: string;
  description: string;
  retention: string;
}

type TabKey = 'servers' | 'auto-scaling' | 'monitoring' | 'operations';

const tabOptions: { key: TabKey; label: string }[] = [
  { key: 'servers', label: 'Servers' },
  { key: 'auto-scaling', label: 'Auto Scaling' },
  { key: 'monitoring', label: 'Monitoring' },
  { key: 'operations', label: 'Ops & Deploy' },
];

const servers: ServerInstance[] = [
  {
    id: '1',
    name: 'web-server-1',
    type: 'web',
    status: 'running',
    region: 'us-east-1',
    instanceType: 't3.xlarge',
    ipAddress: '52.45.123.45',
    cpu: 42,
    memory: 68,
    disk: 55,
    network: '120 Mbps',
    uptime: '45 days',
    os: 'Ubuntu 22.04',
    icon: Server,
    color: '#007AFF',
  },
  {
    id: '2',
    name: 'api-server-1',
    type: 'api',
    status: 'running',
    region: 'us-east-1',
    instanceType: 'c5.2xlarge',
    ipAddress: '52.45.234.56',
    cpu: 78,
    memory: 82,
    disk: 45,
    network: '250 Mbps',
    uptime: '32 days',
    os: 'Ubuntu 22.04',
    icon: Globe,
    color: '#34C759',
  },
  {
    id: '3',
    name: 'worker-node-1',
    type: 'worker',
    status: 'running',
    region: 'us-west-2',
    instanceType: 'm5.large',
    ipAddress: '54.67.123.78',
    cpu: 35,
    memory: 52,
    disk: 62,
    network: '80 Mbps',
    uptime: '28 days',
    os: 'Ubuntu 22.04',
    icon: Cpu,
    color: '#FF9500',
  },
  {
    id: '4',
    name: 'cache-server-1',
    type: 'cache',
    status: 'running',
    region: 'us-east-1',
    instanceType: 'r5.xlarge',
    ipAddress: '52.45.156.90',
    cpu: 25,
    memory: 45,
    disk: 30,
    network: '150 Mbps',
    uptime: '62 days',
    os: 'Ubuntu 22.04',
    icon: Zap,
    color: '#AF52DE',
  },
  {
    id: '5',
    name: 'db-replica-1',
    type: 'database',
    status: 'maintenance',
    region: 'eu-west-1',
    instanceType: 'r5.2xlarge',
    ipAddress: '35.178.45.123',
    cpu: 0,
    memory: 0,
    disk: 75,
    network: '0 Mbps',
    uptime: '18 days',
    os: 'Ubuntu 22.04',
    icon: Server,
    color: '#8E8E93',
  },
];

const metrics: ServerMetric[] = [
  { label: 'Total Servers', value: '5', change: '+1', unit: 'active', icon: Server, color: '#007AFF' },
  { label: 'Avg CPU', value: '45%', change: '+8%', unit: 'usage', icon: Cpu, color: '#34C759' },
  { label: 'Avg Memory', value: '59%', change: '+5%', unit: 'usage', icon: MemoryStick, color: '#FF9500' },
  { label: 'Network Traffic', value: '600', change: '+12%', unit: 'Mbps', icon: Activity, color: '#AF52DE' },
];

const autoScalingRules: AutoScalingRule[] = [
  { id: '1', name: 'Scale up on high CPU', metric: 'cpu', threshold: 80, action: 'scale-up', enabled: true },
  { id: '2', name: 'Scale down on low CPU', metric: 'cpu', threshold: 20, action: 'scale-down', enabled: true },
  { id: '3', name: 'Scale up on high memory', metric: 'memory', threshold: 85, action: 'scale-up', enabled: false },
];

const deploymentStrategies: DeploymentStrategy[] = [
  {
    id: 'deploy-1',
    title: 'Checkout Service Release',
    mode: 'blue-green',
    status: 'deploying',
    release: 'v3.8.1',
    trafficSplit: '60% new / 40% stable',
  },
  {
    id: 'deploy-2',
    title: 'API Canary Validation',
    mode: 'canary',
    status: 'ready',
    release: 'v4.0.0-rc1',
    trafficSplit: '10% new / 90% stable',
  },
  {
    id: 'deploy-3',
    title: 'Worker Rolling Patch',
    mode: 'rolling',
    status: 'paused',
    release: 'v2.14.5',
    trafficSplit: '3 of 12 nodes updated',
  },
];

const processList: ProcessInfo[] = [
  { id: 'proc-1', name: 'nginx', service: 'web-server-1', cpu: 12, memory: 18, restarts: 0, status: 'running' },
  { id: 'proc-2', name: 'node-app', service: 'api-server-1', cpu: 28, memory: 34, restarts: 1, status: 'running' },
  { id: 'proc-3', name: 'redis-sync', service: 'cache-server-1', cpu: 8, memory: 22, restarts: 0, status: 'running' },
  { id: 'proc-4', name: 'etl-worker', service: 'worker-node-1', cpu: 41, memory: 48, restarts: 3, status: 'degraded' },
];

const monitoringStreams: MonitoringStream[] = [
  { id: 'stream-1', title: 'Log Streams', description: 'Structured logs shipped to OpenTelemetry + SIEM', retention: '30 days' },
  { id: 'stream-2', title: 'Metrics & Traces', description: 'Prometheus + Tempo metrics with AI anomaly detection', retention: '14 days' },
  { id: 'stream-3', title: 'User Session Replay', description: 'Full replay for web tier with privacy guardrails', retention: '7 days' },
];

const loadHeatmap = [
  [68, 42, 37, 55],
  [82, 73, 61, 48],
  [53, 64, 57, 39],
];

const forecastCard = {
  title: 'Hardware Usage Forecast',
  cpu: '+14% next 24h',
  memory: '+21% next 24h',
  action: 'Add 1 c7g.2xlarge in us-east-1 and enable burst credits.',
};

export default function ServersScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<TabKey>('servers');
  const [scalingRules, setScalingRules] = useState(autoScalingRules);

  useEffect(() => {
    console.log('[ServersScreen] Selected tab:', selectedTab);
  }, [selectedTab]);

  useEffect(() => {
    console.log('[ServersScreen] Scaling rules changed:', scalingRules);
  }, [scalingRules]);

  const toggleRule = (id: string) => {
    setScalingRules((prev) => prev.map((rule) =>
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return '#34C759';
      case 'stopped': return '#8E8E93';
      case 'starting': return '#FF9500';
      case 'error': return '#FF3B30';
      case 'maintenance': return '#8E8E93';
      case 'degraded': return '#FF9500';
      default: return theme.colors.secondaryText;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return CircleCheck;
      case 'stopped': return Pause;
      case 'starting': return RefreshCw;
      case 'error': return TriangleAlert;
      case 'maintenance': return Settings;
      case 'degraded': return TriangleAlert;
      default: return Activity;
    }
  };

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case 'cpu': return '#007AFF';
      case 'memory': return '#34C759';
      case 'network': return '#FF9500';
      default: return theme.colors.primary;
    }
  };

  const getDeploymentColor = (mode: DeploymentStrategy['mode']) => {
    switch (mode) {
      case 'blue-green': return '#007AFF';
      case 'canary': return '#FF9500';
      case 'rolling': return '#34C759';
      default: return theme.colors.primary;
    }
  };

  const renderMetric = ({ item }: { item: ServerMetric }) => {
    const IconComponent = item.icon;
    return (
      <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`server-metric-${item.label}`}
      >
        <View style={[styles.metricIcon, { backgroundColor: `${item.color}20` }]}>
          <IconComponent size={20} color={item.color} />
        </View>
        <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.value}</Text>
        <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>{item.label}</Text>
        <Text style={[styles.metricUnit, { color: theme.colors.secondaryText }]}>{item.unit}</Text>
        <Text style={[styles.metricChange, { color: item.change.startsWith('+') ? '#34C759' : '#FF3B30' }]}>
          {item.change}
        </Text>
      </View>
    );
  };

  const renderServer = ({ item }: { item: ServerInstance }) => {
    const IconComponent = item.icon;
    const StatusIcon = getStatusIcon(item.status);
    const statusColor = getStatusColor(item.status);

    return (
      <TouchableOpacity 
        style={[styles.serverCard, { backgroundColor: theme.colors.cardBackground }]}
        activeOpacity={0.7}
        testID={`server-card-${item.id}`}
      >
        <View style={styles.serverHeader}>
          <View style={[styles.serverIcon, { backgroundColor: `${item.color}20` }]}>
            <IconComponent size={24} color={item.color} />
          </View>
          <View style={styles.serverInfo}>
            <Text style={[styles.serverName, { color: theme.colors.text }]}>{item.name}</Text>
            <View style={styles.serverMeta}>
              <Text style={[styles.serverType, { color: theme.colors.secondaryText }]}>{item.type.toUpperCase()}</Text>
              <Text style={[styles.serverRegion, { color: theme.colors.secondaryText }]}>• {item.region}</Text>
            </View>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
            <StatusIcon size={12} color={statusColor} />
            <Text style={[styles.statusText, { color: statusColor }]}>{item.status}</Text>
          </View>
        </View>

        <View style={styles.serverDetails}>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Instance Type:</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{item.instanceType}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>IP Address:</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{item.ipAddress}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>OS:</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{item.os}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Uptime:</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{item.uptime}</Text>
          </View>
        </View>

        {item.status === 'running' && (
          <View style={styles.serverMetrics}>
            <View style={styles.metricRow}>
              <View style={styles.metricItem}>
                <Text style={[styles.metricItemLabel, { color: theme.colors.secondaryText }]}>CPU</Text>
                <Text style={[styles.metricItemValue, { color: theme.colors.text }]}>{item.cpu}%</Text>
                <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
                  <View style={[styles.progressFill, { backgroundColor: item.cpu > 80 ? '#FF3B30' : '#007AFF', width: `${item.cpu}%` }]} />
                </View>
              </View>

              <View style={styles.metricItem}>
                <Text style={[styles.metricItemLabel, { color: theme.colors.secondaryText }]}>Memory</Text>
                <Text style={[styles.metricItemValue, { color: theme.colors.text }]}>{item.memory}%</Text>
                <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
                  <View style={[styles.progressFill, { backgroundColor: item.memory > 80 ? '#FF3B30' : '#34C759', width: `${item.memory}%` }]} />
                </View>
              </View>

              <View style={styles.metricItem}>
                <Text style={[styles.metricItemLabel, { color: theme.colors.secondaryText }]}>Disk</Text>
                <Text style={[styles.metricItemValue, { color: theme.colors.text }]}>{item.disk}%</Text>
                <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
                  <View style={[styles.progressFill, { backgroundColor: item.disk > 80 ? '#FF3B30' : '#FF9500', width: `${item.disk}%` }]} />
                </View>
              </View>
            </View>
          </View>
        )}

        <View style={styles.serverActions}>
          {item.status === 'running' ? (
            <>
              <TouchableOpacity style={styles.actionButton} testID={`server-stop-${item.id}`}>
                <Pause size={16} color={theme.colors.text} />
                <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>Stop</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} testID={`server-restart-${item.id}`}>
                <RotateCcw size={16} color={theme.colors.text} />
                <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>Restart</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.actionButton} testID={`server-start-${item.id}`}>
              <Play size={16} color={theme.colors.text} />
              <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>Start</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.actionButton} testID={`server-config-${item.id}`}>
            <Settings size={16} color={theme.colors.text} />
            <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>Config</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAutoScalingRule = ({ item }: { item: AutoScalingRule }) => {
    const metricColor = getMetricColor(item.metric);

    return (
      <View style={[styles.ruleCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`scaling-rule-${item.id}`}
      >
        <View style={styles.ruleHeader}>
          <View style={[styles.ruleIcon, { backgroundColor: `${metricColor}20` }]}>
            {item.metric === 'cpu' && <Cpu size={20} color={metricColor} />}
            {item.metric === 'memory' && <MemoryStick size={20} color={metricColor} />}
            {item.metric === 'network' && <Activity size={20} color={metricColor} />}
          </View>
          <View style={styles.ruleInfo}>
            <Text style={[styles.ruleName, { color: theme.colors.text }]}>{item.name}</Text>
            <View style={styles.ruleDetails}>
              <Text style={[styles.ruleDetail, { color: theme.colors.secondaryText }]}> {item.metric.toUpperCase()} {item.action === 'scale-up' ? '>' : '<'} {item.threshold}% </Text>
              <View style={[styles.actionBadge, { backgroundColor: item.action === 'scale-up' ? '#34C75920' : '#FF950020' }]}>
                <Text style={[styles.actionText, { color: item.action === 'scale-up' ? '#34C759' : '#FF9500' }]}>
                  {item.action.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
          <Switch
            value={item.enabled}
            onValueChange={() => toggleRule(item.id)}
            trackColor={{ false: '#767577', true: metricColor }}
            thumbColor="#f4f3f4"
          />
        </View>
      </View>
    );
  };

  const renderDeployment = ({ item }: { item: DeploymentStrategy }) => {
    const color = getDeploymentColor(item.mode);
    return (
      <View style={[styles.deploymentCard, { backgroundColor: theme.colors.cardBackground }]} testID={`deployment-${item.id}`}>
        <View style={styles.deploymentHeader}>
          <GitBranch size={20} color={color} />
          <Text style={[styles.deploymentTitle, { color: theme.colors.text }]}>{item.title}</Text>
          <View style={[styles.modeBadge, { backgroundColor: `${color}20` }]}>
            <Text style={[styles.modeText, { color }]}>{item.mode.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.deploymentMetaRow}>
          <Text style={[styles.deploymentMetaLabel, { color: theme.colors.secondaryText }]}>Status</Text>
          <Text style={[styles.deploymentMetaValue, { color: theme.colors.text }]}>{item.status}</Text>
        </View>
        <View style={styles.deploymentMetaRow}>
          <Text style={[styles.deploymentMetaLabel, { color: theme.colors.secondaryText }]}>Release</Text>
          <Text style={[styles.deploymentMetaValue, { color: theme.colors.text }]}>{item.release}</Text>
        </View>
        <View style={styles.deploymentMetaRow}>
          <Text style={[styles.deploymentMetaLabel, { color: theme.colors.secondaryText }]}>Traffic</Text>
          <Text style={[styles.deploymentMetaValue, { color: theme.colors.text }]}>{item.trafficSplit}</Text>
        </View>
        <View style={styles.deploymentActions}>
          <TouchableOpacity style={[styles.deploymentActionButton, { backgroundColor: theme.colors.background }]}>
            <Settings size={16} color={theme.colors.text} />
            <Text style={[styles.deploymentActionText, { color: theme.colors.text }]}>Adjust</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.deploymentActionButton, { backgroundColor: theme.colors.primary }]}>
            <RefreshCw size={16} color="#FFFFFF" />
            <Text style={[styles.deploymentActionText, { color: '#FFFFFF' }]}>Promote</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderProcess = ({ item }: { item: ProcessInfo }) => {
    const statusColor = getStatusColor(item.status);
    return (
      <View style={[styles.processCard, { backgroundColor: theme.colors.cardBackground }]} testID={`process-${item.id}`}>
        <View style={styles.processHeader}>
          <Layers size={20} color={theme.colors.primary} />
          <View style={styles.processInfo}>
            <Text style={[styles.processName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.processService, { color: theme.colors.secondaryText }]}>{item.service}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>{item.status.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.processStats}>
          <Text style={[styles.processStat, { color: theme.colors.secondaryText }]}>CPU <Text style={[styles.processStatValue, { color: theme.colors.text }]}>{item.cpu}%</Text></Text>
          <Text style={[styles.processStat, { color: theme.colors.secondaryText }]}>Memory <Text style={[styles.processStatValue, { color: theme.colors.text }]}>{item.memory}%</Text></Text>
          <Text style={[styles.processStat, { color: theme.colors.secondaryText }]}>Restarts <Text style={[styles.processStatValue, { color: theme.colors.text }]}>{item.restarts}</Text></Text>
        </View>
        <TouchableOpacity style={[styles.actionButton, { marginTop: 12 }]} testID={`process-restart-${item.id}`}>
          <RotateCcw size={14} color={theme.colors.text} />
          <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>Restart Process</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderMonitoringStream = ({ item }: { item: MonitoringStream }) => (
    <View style={[styles.monitoringStreamCard, { backgroundColor: theme.colors.cardBackground }]} testID={`monitoring-stream-${item.id}`}>
      <View style={styles.monitoringStreamHeader}>
        <ShieldCheck size={18} color={theme.colors.primary} />
        <Text style={[styles.monitoringStreamTitle, { color: theme.colors.text }]}>{item.title}</Text>
      </View>
      <Text style={[styles.monitoringStreamDescription, { color: theme.colors.secondaryText }]}>{item.description}</Text>
      <Text style={[styles.monitoringStreamRetention, { color: theme.colors.secondaryText }]}>Retention: {item.retention}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]} testID="server-management-screen">
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton} testID="servers-back-button">
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Server Management</Text>
        <TouchableOpacity style={styles.headerButton} testID="add-server-button">
          <Plus size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.metricsSection}>
        <FlatList
          data={metrics}
          renderItem={renderMetric}
          keyExtractor={(item) => item.label}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.metricsContainer}
        />
      </View>

      <View style={styles.tabsContainer}>
        {tabOptions.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, selectedTab === tab.key && { backgroundColor: theme.colors.primary }]}
            onPress={() => setSelectedTab(tab.key)}
            testID={`servers-tab-${tab.key}`}
          >
            <Text
              style={[
                styles.tabText,
                { color: selectedTab === tab.key ? 'white' : theme.colors.secondaryText },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'servers' && (
          <View style={styles.section}>
            <FlatList
              data={servers}
              renderItem={renderServer}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.serversList}
            />
          </View>
        )}

        {selectedTab === 'auto-scaling' && (
          <View style={styles.section}>
            <View style={styles.autoScalingHeader}>
              <TrendingUp size={24} color={theme.colors.primary} />
              <Text style={[styles.autoScalingHeaderText, { color: theme.colors.text }]}>Auto Scaling Rules</Text>
            </View>
            <Text style={[styles.autoScalingDescription, { color: theme.colors.secondaryText }]}>
              Automatically scale infrastructure using metrics, anomaly detection, and policy-based guardrails.
            </Text>

            <FlatList
              data={scalingRules}
              renderItem={renderAutoScalingRule}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.rulesList}
            />

            <TouchableOpacity 
              style={[styles.addRuleButton, { backgroundColor: theme.colors.primary }]}
              testID="add-scaling-rule"
            >
              <Plus size={16} color="#FFFFFF" />
              <Text style={styles.addRuleButtonText}>Add Scaling Rule</Text>
            </TouchableOpacity>
          </View>
        )}

        {selectedTab === 'monitoring' && (
          <View style={styles.section}>
            <View style={styles.monitoringGrid}>
              <View style={[styles.monitoringCard, { backgroundColor: theme.colors.cardBackground }]}
                testID="monitoring-health-card"
              >
                <ChartBarBig size={32} color={theme.colors.primary} />
                <Text style={[styles.monitoringTitle, { color: theme.colors.text }]}>System Health Map</Text>
                <Text style={[styles.monitoringDescription, { color: theme.colors.secondaryText }]}>
                  AI anomaly detection, error tracking, and uptime SLA insights.
                </Text>
                <TouchableOpacity style={[styles.monitoringButton, { backgroundColor: theme.colors.primary }]}>
                  <ChartBarBig size={16} color="#FFFFFF" />
                  <Text style={styles.monitoringButtonText}>View Detailed Metrics</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.forecastCard, { backgroundColor: theme.colors.cardBackground }]} testID="hardware-forecast">
                <Gauge size={28} color={theme.colors.primary} />
                <Text style={[styles.forecastTitle, { color: theme.colors.text }]}>{forecastCard.title}</Text>
                <Text style={[styles.forecastStat, { color: theme.colors.secondaryText }]}>CPU {forecastCard.cpu}</Text>
                <Text style={[styles.forecastStat, { color: theme.colors.secondaryText }]}>Memory {forecastCard.memory}</Text>
                <Text style={[styles.forecastAction, { color: theme.colors.secondaryText }]}>{forecastCard.action}</Text>
              </View>
            </View>

            <View style={styles.monitoringHeatmap}>
              <View style={styles.heatmapHeader}>
                <CloudLightning size={20} color={theme.colors.primary} />
                <Text style={[styles.heatmapTitle, { color: theme.colors.text }]}>Load Distribution Heatmap</Text>
              </View>
              {loadHeatmap.map((row, rowIndex) => (
                <View key={`heat-row-${rowIndex}`} style={styles.heatmapRow}>
                  {row.map((value, colIndex) => (
                    <View
                      key={`heat-cell-${rowIndex}-${colIndex}`}
                      style={[styles.heatmapCell, { backgroundColor: `rgba(0,122,255,${0.2 + value / 150})` }]}
                    >
                      <Text style={styles.heatmapCellText}>{value}%</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>

            <FlatList
              data={monitoringStreams}
              renderItem={renderMonitoringStream}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.monitoringStreamList}
            />
          </View>
        )}

        {selectedTab === 'operations' && (
          <View style={styles.section}>
            <View style={styles.opsRow}>
              <View style={[styles.opsCard, { backgroundColor: theme.colors.cardBackground }]}
                testID="uptime-sla-card"
              >
                <ShieldCheck size={24} color={theme.colors.primary} />
                <Text style={[styles.opsTitle, { color: theme.colors.text }]}>Uptime SLA</Text>
                <Text style={[styles.opsValue, { color: theme.colors.text }]}>99.985%</Text>
                <Text style={[styles.opsDescription, { color: theme.colors.secondaryText }]}>Trailing 30 days | SLA breach alerts enabled</Text>
              </View>
              <View style={[styles.opsCard, { backgroundColor: theme.colors.cardBackground }]}
                testID="patching-card"
              >
                <Thermometer size={24} color={theme.colors.primary} />
                <Text style={[styles.opsTitle, { color: theme.colors.text }]}>OS Patching</Text>
                <Text style={[styles.opsValue, { color: theme.colors.text }]}>87%</Text>
                <Text style={[styles.opsDescription, { color: theme.colors.secondaryText }]}>Nodes patched within last 72h</Text>
              </View>
            </View>

            <View style={styles.subHeader}>
              <GitBranch size={20} color={theme.colors.primary} />
              <Text style={[styles.subHeaderText, { color: theme.colors.text }]}>Deployment Strategies</Text>
            </View>
            <FlatList
              data={deploymentStrategies}
              renderItem={renderDeployment}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.deploymentList}
            />

            <View style={styles.subHeader}>
              <Layers size={20} color={theme.colors.primary} />
              <Text style={[styles.subHeaderText, { color: theme.colors.text }]}>Process Manager</Text>
            </View>
            <FlatList
              data={processList}
              renderItem={renderProcess}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.processList}
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
  metricsSection: {
    marginBottom: 16,
  },
  metricsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  metricCard: {
    width: 140,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    marginBottom: 2,
    textAlign: 'center',
  },
  metricUnit: {
    fontSize: 11,
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  tabsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    paddingBottom: 24,
  },
  serversList: {
    gap: 16,
  },
  serverCard: {
    padding: 16,
    borderRadius: 16,
  },
  serverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  serverIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serverInfo: {
    flex: 1,
  },
  serverName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 6,
  },
  serverMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serverType: {
    fontSize: 13,
    fontWeight: '600',
  },
  serverRegion: {
    fontSize: 13,
    marginLeft: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  serverDetails: {
    marginBottom: 16,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 13,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  serverMetrics: {
    marginBottom: 16,
  },
  metricRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metricItem: {
    flex: 1,
  },
  metricItemLabel: {
    fontSize: 12,
    marginBottom: 6,
  },
  metricItemValue: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  serverActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    gap: 6,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  autoScalingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  autoScalingHeaderText: {
    fontSize: 18,
    fontWeight: '600',
  },
  autoScalingDescription: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  rulesList: {
    gap: 12,
    marginBottom: 16,
  },
  ruleCard: {
    padding: 16,
    borderRadius: 12,
  },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ruleIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  ruleInfo: {
    flex: 1,
  },
  ruleName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  ruleDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ruleDetail: {
    fontSize: 13,
    fontFamily: 'monospace',
  },
  actionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  actionText: {
    fontSize: 10,
    fontWeight: '700',
  },
  addRuleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  addRuleButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  monitoringGrid: {
    gap: 16,
  },
  monitoringCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  monitoringTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 12,
  },
  monitoringDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  monitoringButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  monitoringButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  forecastCard: {
    padding: 20,
    borderRadius: 16,
    gap: 10,
  },
  forecastTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  forecastStat: {
    fontSize: 14,
  },
  forecastAction: {
    fontSize: 13,
    lineHeight: 18,
  },
  monitoringHeatmap: {
    marginTop: 20,
    marginBottom: 16,
  },
  heatmapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  heatmapTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  heatmapRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  heatmapCell: {
    flex: 1,
    aspectRatio: 1.6,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heatmapCellText: {
    color: '#0A1F44',
    fontWeight: '600',
  },
  monitoringStreamList: {
    gap: 12,
  },
  monitoringStreamCard: {
    padding: 16,
    borderRadius: 12,
  },
  monitoringStreamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  monitoringStreamTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  monitoringStreamDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  monitoringStreamRetention: {
    marginTop: 6,
    fontSize: 12,
  },
  opsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  opsCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    gap: 8,
  },
  opsTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  opsValue: {
    fontSize: 26,
    fontWeight: '700',
  },
  opsDescription: {
    fontSize: 13,
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  subHeaderText: {
    fontSize: 16,
    fontWeight: '600',
  },
  deploymentList: {
    gap: 12,
    paddingBottom: 12,
  },
  deploymentCard: {
    width: 260,
    padding: 16,
    borderRadius: 14,
    marginRight: 12,
  },
  deploymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  deploymentTitle: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  modeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  modeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  deploymentMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  deploymentMetaLabel: {
    fontSize: 12,
  },
  deploymentMetaValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  deploymentActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  deploymentActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  deploymentActionText: {
    fontSize: 13,
    fontWeight: '600',
  },
  processList: {
    gap: 12,
    marginTop: 8,
  },
  processCard: {
    padding: 16,
    borderRadius: 12,
  },
  processHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  processInfo: {
    flex: 1,
  },
  processName: {
    fontSize: 15,
    fontWeight: '600',
  },
  processService: {
    fontSize: 13,
  },
  processStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  processStat: {
    fontSize: 12,
  },
  processStatValue: {
    fontWeight: '700',
  },
});
