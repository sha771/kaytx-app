import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Rocket,
  Globe,
  Server,
  CircleCheck,
  CircleAlert,
  Clock,
  RefreshCw,
  EllipsisVertical,
  Cloud,
  Shield,
  Zap,
  TrendingUp,
  ArrowRight,
  Download,
  Settings,
  Activity,
  Layers,
  GitBranch,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Types
interface Deployment {
  id: string;
  environment: 'production' | 'staging' | 'development';
  agentName: string;
  version: string;
  status: 'deployed' | 'deploying' | 'failed' | 'rolling_back';
  region: string;
  traffic: number;
  latency: number;
  errorRate: number;
  lastDeployed: string;
  instances: number;
}

interface DeploymentLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  deploymentId: string;
}

// Mock Data
const DEPLOYMENTS: Deployment[] = [
  {
    id: '1',
    environment: 'production',
    agentName: 'Support AI',
    version: 'v3.2.1',
    status: 'deployed',
    region: 'us-east-1',
    traffic: 12450,
    latency: 1.2,
    errorRate: 0.02,
    lastDeployed: '2026-03-01 14:30:00',
    instances: 12,
  },
  {
    id: '2',
    environment: 'production',
    agentName: 'Sales AI',
    version: 'v2.1.0',
    status: 'deployed',
    region: 'us-west-2',
    traffic: 8930,
    latency: 1.5,
    errorRate: 0.05,
    lastDeployed: '2026-02-28 09:15:00',
    instances: 8,
  },
  {
    id: '3',
    environment: 'staging',
    agentName: 'HR AI',
    version: 'v4.0.0-beta',
    status: 'deploying',
    region: 'eu-west-1',
    traffic: 0,
    latency: 0,
    errorRate: 0,
    lastDeployed: '2026-03-02 10:45:00',
    instances: 2,
  },
  {
    id: '4',
    environment: 'development',
    agentName: 'Marketing AI',
    version: 'v2.5.3',
    status: 'failed',
    region: 'ap-southeast-1',
    traffic: 0,
    latency: 0,
    errorRate: 0,
    lastDeployed: '2026-03-01 16:20:00',
    instances: 1,
  },
];

const DEPLOYMENT_LOGS: DeploymentLog[] = [
  { id: '1', timestamp: '10:45:23', level: 'info', message: 'Starting deployment of HR AI v4.0.0-beta', deploymentId: '3' },
  { id: '2', timestamp: '10:45:45', level: 'info', message: 'Building Docker image...', deploymentId: '3' },
  { id: '3', timestamp: '10:46:12', level: 'warning', message: 'High memory usage detected during build', deploymentId: '3' },
  { id: '4', timestamp: '10:47:30', level: 'info', message: 'Deployment successful - 2 instances running', deploymentId: '3' },
  { id: '5', timestamp: '10:48:00', level: 'error', message: 'Marketing AI deployment failed: timeout', deploymentId: '4' },
];

const ENV_COLORS = {
  production: '#EF4444',
  staging: '#F59E0B',
  development: '#10B981',
};

const STATUS_COLORS = {
  deployed: '#10B981',
  deploying: '#3B82F6',
  failed: '#EF4444',
  rolling_back: '#F59E0B',
};

export default function AgentDeploymentScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [activeTab, setActiveTab] = useState<'deployments' | 'logs' | 'config'>('deployments');
  const [selectedEnv, setSelectedEnv] = useState<'all' | 'production' | 'staging' | 'development'>('all');
  const [expandedDeployment, setExpandedDeployment] = useState<string | null>(null);

  const filteredDeployments = DEPLOYMENTS.filter(
    d => selectedEnv === 'all' || d.environment === selectedEnv
  );

  const renderDeploymentCard = (deployment: Deployment, index: number) => {
    const isExpanded = expandedDeployment === deployment.id;
    const envColor = ENV_COLORS[deployment.environment];
    const statusColor = STATUS_COLORS[deployment.status];

    return (
      <Animated.View
        key={deployment.id}
        entering={FadeInUp.delay(index * 50)}
        style={[styles.deploymentCard, { backgroundColor: colors.card }]}
      >
        <TouchableOpacity
          style={styles.deploymentHeader}
          onPress={() => setExpandedDeployment(isExpanded ? null : deployment.id)}
        >
          <View style={[styles.envBadge, { backgroundColor: envColor + '15' }]}>
            <Text style={[styles.envText, { color: envColor }]}>
              {deployment.environment.toUpperCase()}
            </Text>
          </View>

          <View style={styles.deploymentInfo}>
            <Text style={[styles.agentName, { color: colors.text }]}>
              {deployment.agentName}
            </Text>
            <View style={styles.versionRow}>
              <GitBranch size={14} color={colors.icon} />
              <Text style={[styles.versionText, { color: colors.icon }]}>
                {deployment.version}
              </Text>
              <View style={[styles.statusBadge, { backgroundColor: statusColor + '15' }]}>
                <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                <Text style={[styles.statusText, { color: statusColor }]}>
                  {deployment.status}
                </Text>
              </View>
            </View>
          </View>

          <ChevronLeft
            size={20}
            color={colors.icon}
            style={[styles.expandIcon, isExpanded && styles.expandIconRotated]}
          />
        </TouchableOpacity>

        <View style={styles.deploymentMetrics}>
          <View style={styles.metric}>
            <Globe size={14} color={colors.icon} />
            <Text style={[styles.metricText, { color: colors.icon }]}>
              {deployment.region}
            </Text>
          </View>
          <View style={styles.metric}>
            <Layers size={14} color={colors.icon} />
            <Text style={[styles.metricText, { color: colors.icon }]}>
              {deployment.instances} instances
            </Text>
          </View>
          <View style={styles.metric}>
            <Clock size={14} color={colors.icon} />
            <Text style={[styles.metricText, { color: colors.icon }]}>
              {deployment.lastDeployed.split(' ')[1]}
            </Text>
          </View>
        </View>

        {deployment.status === 'deployed' && (
          <View style={styles.liveMetrics}>
            <View style={styles.liveMetric}>
              <Zap size={14} color="#F59E0B" />
              <Text style={[styles.liveMetricValue, { color: colors.text }]}>
                {deployment.traffic.toLocaleString()}
              </Text>
              <Text style={[styles.liveMetricLabel, { color: colors.icon }]}>req/min</Text>
            </View>
            <View style={styles.liveMetric}>
              <Activity size={14} color="#3B82F6" />
              <Text style={[styles.liveMetricValue, { color: colors.text }]}>
                {deployment.latency}s
              </Text>
              <Text style={[styles.liveMetricLabel, { color: colors.icon }]}>latency</Text>
            </View>
            <View style={styles.liveMetric}>
              <CircleAlert size={14} color={deployment.errorRate > 0.05 ? '#EF4444' : '#10B981'} />
              <Text style={[styles.liveMetricValue, { color: colors.text }]}>
                {deployment.errorRate}%
              </Text>
              <Text style={[styles.liveMetricLabel, { color: colors.icon }]}>errors</Text>
            </View>
          </View>
        )}

        {deployment.status === 'deploying' && (
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: colors.background }]}>
              <View style={[styles.progressFill, { width: '65%', backgroundColor: '#3B82F6' }]} />
            </View>
            <Text style={[styles.progressText, { color: '#3B82F6' }]}>65% complete</Text>
          </View>
        )}

        {isExpanded && (
          <Animated.View entering={FadeInUp} style={styles.expandedContent}>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.tint + '15' }]}>
                <RefreshCw size={16} color={colors.tint} />
                <Text style={[styles.actionBtnText, { color: colors.tint }]}>Redeploy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.background }]}>
                <Download size={16} color={colors.icon} />
                <Text style={[styles.actionBtnText, { color: colors.icon }]}>Logs</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#EF4444' + '15' }]}>
                <RefreshCw size={16} color="#EF4444" style={{ transform: [{ rotate: '180deg' }] }} />
                <Text style={[styles.actionBtnText, { color: '#EF4444' }]}>Rollback</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

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
              Deployment Manager
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
              Manage agent deployments
            </Text>
          </View>
        </View>
        <TouchableOpacity style={[styles.deployButton, { backgroundColor: colors.tint }]}>
          <Rocket size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Cloud size={20} color="#3B82F6" />
          <Text style={[styles.statValue, { color: colors.text }]}>4</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Active</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <CircleCheck size={20} color="#10B981" />
          <Text style={[styles.statValue, { color: colors.text }]}>2</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Healthy</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <RefreshCw size={20} color="#F59E0B" />
          <Text style={[styles.statValue, { color: colors.text }]}>1</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Deploying</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#EF4444' + '10' }]}>
          <CircleAlert size={20} color="#EF4444" />
          <Text style={[styles.statValue, { color: '#EF4444' }]}>1</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Failed</Text>
        </View>
      </View>

      {/* Environment Filter */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterChip, selectedEnv === 'all' && { backgroundColor: colors.tint }]}
          onPress={() => setSelectedEnv('all')}
        >
          <Text style={[styles.filterText, { color: selectedEnv === 'all' ? 'white' : colors.text }]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, selectedEnv === 'production' && { backgroundColor: ENV_COLORS.production }]}
          onPress={() => setSelectedEnv('production')}
        >
          <Text style={[styles.filterText, { color: selectedEnv === 'production' ? 'white' : colors.text }]}>
            Production
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, selectedEnv === 'staging' && { backgroundColor: ENV_COLORS.staging }]}
          onPress={() => setSelectedEnv('staging')}
        >
          <Text style={[styles.filterText, { color: selectedEnv === 'staging' ? 'white' : colors.text }]}>
            Staging
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, selectedEnv === 'development' && { backgroundColor: ENV_COLORS.development }]}
          onPress={() => setSelectedEnv('development')}
        >
          <Text style={[styles.filterText, { color: selectedEnv === 'development' ? 'white' : colors.text }]}>
            Dev
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'deployments' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('deployments')}
        >
          <Rocket size={16} color={activeTab === 'deployments' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'deployments' ? 'white' : colors.text }]}>
            Deployments
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'logs' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('logs')}
        >
          <Activity size={16} color={activeTab === 'logs' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'logs' ? 'white' : colors.text }]}>
            Logs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'config' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('config')}
        >
          <Settings size={16} color={activeTab === 'config' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'config' ? 'white' : colors.text }]}>
            Config
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {activeTab === 'deployments' && (
          <>
            {filteredDeployments.map((deployment, index) => renderDeploymentCard(deployment, index))}

            <TouchableOpacity style={[styles.newDeploy, { backgroundColor: colors.tint + '15' }]}>
              <Rocket size={20} color={colors.tint} />
              <Text style={[styles.newDeployText, { color: colors.tint }]}>
                Deploy New Agent
              </Text>
              <ArrowRight size={18} color={colors.tint} />
            </TouchableOpacity>
          </>
        )}

        {activeTab === 'logs' && (
          <View style={[styles.logsCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.logsTitle, { color: colors.text }]}>
              Deployment Logs
            </Text>
            {DEPLOYMENT_LOGS.map((log, index) => (
              <Animated.View
                key={log.id}
                entering={FadeInUp.delay(index * 50)}
                style={styles.logRow}
              >
                <Text style={[styles.logTime, { color: colors.icon }]}>
                  {log.timestamp}
                </Text>
                <View
                  style={[
                    styles.logLevel,
                    {
                      backgroundColor:
                        log.level === 'error'
                          ? '#EF4444'
                          : log.level === 'warning'
                          ? '#F59E0B'
                          : '#10B981',
                    },
                  ]}
                >
                  <Text style={styles.logLevelText}>{log.level}</Text>
                </View>
                <Text style={[styles.logMessage, { color: colors.text }]}>
                  {log.message}
                </Text>
              </Animated.View>
            ))}
          </View>
        )}

        {activeTab === 'config' && (
          <Animated.View entering={FadeInUp} style={styles.configContent}>
            <View style={[styles.configCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.configTitle, { color: colors.text }]}>
                Deployment Settings
              </Text>

              <View style={styles.configItem}>
                <View style={styles.configLeft}>
                  <Shield size={18} color={colors.icon} />
                  <View>
                    <Text style={[styles.configName, { color: colors.text }]}>
                      Auto-Rollback
                    </Text>
                    <Text style={[styles.configDesc, { color: colors.icon }]}>
                      Rollback on high error rate
                    </Text>
                  </View>
                </View>
                <View style={[styles.toggle, { backgroundColor: '#10B981' }]}>
                  <View style={styles.toggleKnob} />
                </View>
              </View>

              <View style={styles.configItem}>
                <View style={styles.configLeft}>
                  <TrendingUp size={18} color={colors.icon} />
                  <View>
                    <Text style={[styles.configName, { color: colors.text }]}>
                      Auto-Scaling
                    </Text>
                    <Text style={[styles.configDesc, { color: colors.icon }]}>
                      Scale based on traffic
                    </Text>
                  </View>
                </View>
                <View style={[styles.toggle, { backgroundColor: '#10B981' }]}>
                  <View style={styles.toggleKnob} />
                </View>
              </View>

              <View style={styles.configItem}>
                <View style={styles.configLeft}>
                  <Server size={18} color={colors.icon} />
                  <View>
                    <Text style={[styles.configName, { color: colors.text }]}>
                      Health Checks
                    </Text>
                    <Text style={[styles.configDesc, { color: colors.icon }]}>
                      Every 30 seconds
                    </Text>
                  </View>
                </View>
                <View style={[styles.toggle, { backgroundColor: '#10B981' }]}>
                  <View style={styles.toggleKnob} />
                </View>
              </View>
            </View>
          </Animated.View>
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
  deployButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#00000010',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
  },
  deploymentCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  deploymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  envBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginRight: 12,
  },
  envText: {
    fontSize: 11,
    fontWeight: '700',
  },
  deploymentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  versionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  versionText: {
    fontSize: 12,
    marginRight: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  expandIcon: {
    marginLeft: 8,
  },
  expandIconRotated: {
    transform: [{ rotate: '-90deg' }],
  },
  deploymentMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricText: {
    fontSize: 12,
  },
  liveMetrics: {
    flexDirection: 'row',
    backgroundColor: '#00000005',
    borderRadius: 10,
    padding: 12,
    gap: 16,
  },
  liveMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  liveMetricLabel: {
    fontSize: 11,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 6,
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
  },
  expandedContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
  newDeploy: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    marginTop: 8,
  },
  newDeployText: {
    fontSize: 15,
    fontWeight: '600',
  },
  logsCard: {
    borderRadius: 16,
    padding: 16,
  },
  logsTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 16,
  },
  logRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  logTime: {
    fontSize: 11,
    width: 60,
  },
  logLevel: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  logLevelText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  logMessage: {
    flex: 1,
    fontSize: 13,
  },
  configContent: {
    gap: 16,
  },
  configCard: {
    borderRadius: 16,
    padding: 16,
  },
  configTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 16,
  },
  configItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  configLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  configName: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  configDesc: {
    fontSize: 12,
  },
  toggle: {
    width: 48,
    height: 26,
    borderRadius: 13,
    padding: 2,
  },
  toggleKnob: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },
});
