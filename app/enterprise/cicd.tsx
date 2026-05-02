 
import React, { useEffect, useState } from 'react';
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
  GitBranch,
  CircleCheck,
  CircleX,
  Clock,
  Play,
  RefreshCw,
  Settings,
  Terminal,
  Package,
  Rocket,
  CircleAlert,
  Activity,
  Code,
  FileText,
  Workflow,
  Bot,
  ShieldCheck,
  HardDrive,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface Pipeline {
  id: string;
  name: string;
  branch: string;
  status: 'success' | 'failed' | 'running' | 'pending';
  commit: string;
  author: string;
  duration: string;
  timestamp: string;
}

interface Deployment {
  id: string;
  environment: 'production' | 'staging' | 'development';
  version: string;
  status: 'deployed' | 'deploying' | 'failed' | 'rolled-back';
  deployedAt: string;
  deployedBy: string;
  changes: number;
}

interface CICDMetric {
  label: string;
  value: string;
  change: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface PipelineStage {
  id: string;
  title: string;
  description: string;
  runtime: string;
  status: 'ready' | 'running' | 'passed' | 'blocked';
}

interface AutomationTrigger {
  id: string;
  title: string;
  type: 'schedule' | 'event' | 'security';
  detail: string;
  impact: string;
}

interface ArtifactStore {
  id: string;
  name: string;
  type: 'docker' | 'binary' | 'lambda';
  retention: string;
  size: string;
}

interface CodeReviewInsight {
  id: string;
  summary: string;
  severity: 'high' | 'medium' | 'low';
  file: string;
}

const pipelines: Pipeline[] = [
  { id: '1', name: 'Production Deploy', branch: 'main', status: 'success', commit: '3f2d1a4', author: 'John Doe', duration: '4m 32s', timestamp: '5 min ago' },
  { id: '2', name: 'Staging Build', branch: 'develop', status: 'running', commit: 'a7b3c8d', author: 'Jane Smith', duration: '2m 15s', timestamp: '2 min ago' },
  { id: '3', name: 'Feature Branch Test', branch: 'feature/new-api', status: 'failed', commit: '9e4f2b1', author: 'Mike Johnson', duration: '1m 45s', timestamp: '15 min ago' },
  { id: '4', name: 'Hotfix Deploy', branch: 'hotfix/bug-123', status: 'pending', commit: '6c8d1f2', author: 'Sarah Williams', duration: '-', timestamp: '30 min ago' },
];

const deployments: Deployment[] = [
  { id: '1', environment: 'production', version: 'v2.5.3', status: 'deployed', deployedAt: '2 hours ago', deployedBy: 'CI/CD Pipeline', changes: 12 },
  { id: '2', environment: 'staging', version: 'v2.6.0-rc.1', status: 'deploying', deployedAt: '5 min ago', deployedBy: 'Jane Smith', changes: 24 },
  { id: '3', environment: 'development', version: 'v2.6.0-dev.45', status: 'deployed', deployedAt: '1 hour ago', deployedBy: 'Auto Deploy', changes: 8 },
];

const cicdMetrics: CICDMetric[] = [
  { label: 'Success Rate', value: '94%', change: '+2%', icon: CircleCheck, color: '#34C759' },
  { label: 'Avg Duration', value: '3m 42s', change: '-15s', icon: Clock, color: '#007AFF' },
  { label: 'Deployments', value: '156', change: '+12', icon: Rocket, color: '#FF9500' },
  { label: 'Active Pipelines', value: '8', change: '+2', icon: Activity, color: '#AF52DE' },
];

const pipelineStages: PipelineStage[] = [
  { id: 'stage-1', title: 'Install & Lint', description: 'Yarn install + ESLint', runtime: '58s', status: 'passed' },
  { id: 'stage-2', title: 'Unit Tests', description: 'Jest + Vitest', runtime: '1m 43s', status: 'passed' },
  { id: 'stage-3', title: 'Security Scan', description: 'Snyk + CodeQL', runtime: '55s', status: 'running' },
  { id: 'stage-4', title: 'Build & Bundle', description: 'EAS bundle + docker', runtime: '—', status: 'ready' },
  { id: 'stage-5', title: 'Deploy', description: 'Blue/green release', runtime: '—', status: 'blocked' },
];

const automationTriggers: AutomationTrigger[] = [
  { id: 'auto-1', title: 'Nightly regression', type: 'schedule', detail: 'Runs at 2:00 AM UTC', impact: 'Full suite' },
  { id: 'auto-2', title: 'PR security gate', type: 'event', detail: 'Blocks merge on critical issues', impact: 'High' },
  { id: 'auto-3', title: 'Secrets rotation', type: 'security', detail: 'Rotate every 7 days', impact: 'Org-wide' },
];

const artifactStores: ArtifactStore[] = [
  { id: 'artifact-1', name: 'Docker Registry', type: 'docker', retention: '14 days', size: '128 GB' },
  { id: 'artifact-2', name: 'Mobile Bundles', type: 'binary', retention: '30 days', size: '64 GB' },
  { id: 'artifact-3', name: 'Lambda Packages', type: 'lambda', retention: '60 days', size: '42 GB' },
];

const codeReviewInsights: CodeReviewInsight[] = [
  { id: 'insight-1', summary: 'Hard-coded secret in config.ts', severity: 'high', file: 'apps/api/config.ts' },
  { id: 'insight-2', summary: 'Inefficient query in orders service', severity: 'medium', file: 'services/orders/query.ts' },
  { id: 'insight-3', summary: 'Missing null check in auth guard', severity: 'low', file: 'packages/auth/guard.ts' },
];

type TabKey = 'pipelines' | 'deployments' | 'config';

export default function CICDScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<TabKey>('pipelines');

  useEffect(() => {
    console.log('[CICDScreen] Tab changed:', selectedTab);
  }, [selectedTab]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
      case 'deployed': return '#34C759';
      case 'running':
      case 'deploying': return '#007AFF';
      case 'failed': return '#FF3B30';
      case 'pending': return '#FF9500';
      case 'rolled-back': return '#8E8E93';
      default: return theme.colors.secondaryText;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
      case 'deployed': return CircleCheck;
      case 'running':
      case 'deploying': return RefreshCw;
      case 'failed': return CircleX;
      case 'pending': return Clock;
      case 'rolled-back': return CircleAlert;
      default: return Activity;
    }
  };

  const getEnvironmentColor = (env: string) => {
    switch (env) {
      case 'production': return '#FF3B30';
      case 'staging': return '#FF9500';
      case 'development': return '#007AFF';
      default: return theme.colors.secondaryText;
    }
  };

  const getSeverityColor = (severity: CodeReviewInsight['severity']) => {
    switch (severity) {
      case 'high': return '#FF3B30';
      case 'medium': return '#FF9500';
      default: return '#34C759';
    }
  };

  const renderMetric = ({ item }: { item: CICDMetric }) => {
    const IconComponent = item.icon;
    return (
      <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`cicd-metric-${item.label}`}
      >
        <View style={[styles.metricIcon, { backgroundColor: `${item.color}20` }]}>
          <IconComponent size={20} color={item.color} />
        </View>
        <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.value}</Text>
        <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>{item.label}</Text>
        <Text style={[styles.metricChange, { color: item.change.startsWith('+') || item.change.startsWith('-') ? '#34C759' : '#FF3B30' }]}>
          {item.change}
        </Text>
      </View>
    );
  };

  const renderPipeline = ({ item }: { item: Pipeline }) => {
    const statusColor = getStatusColor(item.status);
    const StatusIcon = getStatusIcon(item.status);

    return (
      <TouchableOpacity 
        style={[styles.pipelineCard, { backgroundColor: theme.colors.cardBackground }]}
        activeOpacity={0.7}
        testID={`pipeline-${item.id}`}
      >
        <View style={styles.pipelineHeader}>
          <View style={[styles.pipelineIcon, { backgroundColor: `${statusColor}20` }]}>
            <StatusIcon size={24} color={statusColor} />
          </View>
          <View style={styles.pipelineInfo}>
            <Text style={[styles.pipelineName, { color: theme.colors.text }]}>{item.name}</Text>
            <View style={styles.branchContainer}>
              <GitBranch size={14} color={theme.colors.secondaryText} />
              <Text style={[styles.branchText, { color: theme.colors.secondaryText }]}>{item.branch}</Text>
            </View>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text>
          </View>
        </View>

        <View style={styles.pipelineDetails}>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Commit:</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{item.commit}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Author:</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{item.author}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Duration:</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{item.duration}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Time:</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{item.timestamp}</Text>
          </View>
        </View>

        <View style={styles.pipelineActions}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.background }]} testID={`pipeline-logs-${item.id}`}>
            <Terminal size={16} color={theme.colors.text} />
            <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>View Logs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.background }]} testID={`pipeline-retry-${item.id}`}>
            <Play size={16} color={theme.colors.text} />
            <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>Retry</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderDeployment = ({ item }: { item: Deployment }) => {
    const statusColor = getStatusColor(item.status);
    const StatusIcon = getStatusIcon(item.status);
    const envColor = getEnvironmentColor(item.environment);

    return (
      <View style={[styles.deploymentCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`deployment-card-${item.id}`}
      >
        <View style={styles.deploymentHeader}>
          <View style={[styles.deploymentIcon, { backgroundColor: `${statusColor}20` }]}>
            <StatusIcon size={24} color={statusColor} />
          </View>
          <View style={styles.deploymentInfo}>
            <View style={styles.envContainer}>
              <View style={[styles.envBadge, { backgroundColor: `${envColor}20` }]}>
                <Text style={[styles.envText, { color: envColor }]}>{item.environment.toUpperCase()}</Text>
              </View>
              <Text style={[styles.versionText, { color: theme.colors.text }]}>{item.version}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
              <Text style={[styles.statusText, { color: statusColor }]}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('-', ' ')}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.deploymentMeta}>
          <View style={styles.metaItem}>
            <Text style={[styles.metaLabel, { color: theme.colors.secondaryText }]}>Deployed</Text>
            <Text style={[styles.metaValue, { color: theme.colors.text }]}>{item.deployedAt}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={[styles.metaLabel, { color: theme.colors.secondaryText }]}>By</Text>
            <Text style={[styles.metaValue, { color: theme.colors.text }]}>{item.deployedBy}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={[styles.metaLabel, { color: theme.colors.secondaryText }]}>Changes</Text>
            <Text style={[styles.metaValue, { color: theme.colors.text }]}>{item.changes}</Text>
          </View>
        </View>

        <View style={styles.deploymentActions}>
          <TouchableOpacity style={[styles.deployActionButton, { backgroundColor: theme.colors.background }]}>
            <FileText size={16} color={theme.colors.text} />
            <Text style={[styles.deployActionText, { color: theme.colors.text }]}>View Changes</Text>
          </TouchableOpacity>
          {item.environment !== 'production' && (
            <TouchableOpacity style={[styles.deployActionButton, { backgroundColor: theme.colors.primary }]}
              testID={`deployment-promote-${item.id}`}
            >
              <Rocket size={16} color="#FFFFFF" />
              <Text style={[styles.deployActionText, { color: '#FFFFFF' }]}>Promote</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderStage = ({ item }: { item: PipelineStage }) => {
    const statusColor = getStatusColor(item.status);
    return (
      <View style={[styles.stageCard, { backgroundColor: theme.colors.cardBackground }]} testID={`stage-${item.id}`}>
        <View style={styles.stageHeader}>
          <Workflow size={18} color={statusColor} />
          <Text style={[styles.stageTitle, { color: theme.colors.text }]}>{item.title}</Text>
          <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>{item.status.toUpperCase()}</Text>
          </View>
        </View>
        <Text style={[styles.stageDescription, { color: theme.colors.secondaryText }]}>{item.description}</Text>
        <Text style={[styles.stageRuntime, { color: theme.colors.secondaryText }]}>Runtime {item.runtime}</Text>
      </View>
    );
  };

  const renderAutomation = ({ item }: { item: AutomationTrigger }) => (
    <View style={[styles.automationCard, { backgroundColor: theme.colors.cardBackground }]}
      testID={`automation-${item.id}`}
    >
      <View style={styles.automationHeader}>
        <Bot size={18} color={theme.colors.primary} />
        <Text style={[styles.automationTitle, { color: theme.colors.text }]}>{item.title}</Text>
      </View>
      <Text style={[styles.automationDetail, { color: theme.colors.secondaryText }]}>{item.detail}</Text>
      <View style={styles.automationFooter}>
        <Text style={[styles.automationType, { color: theme.colors.secondaryText }]}>{item.type.toUpperCase()}</Text>
        <Text style={[styles.automationImpact, { color: theme.colors.text }]}>{item.impact}</Text>
      </View>
    </View>
  );

  const renderArtifact = ({ item }: { item: ArtifactStore }) => (
    <View style={[styles.artifactCard, { backgroundColor: theme.colors.cardBackground }]}
      testID={`artifact-${item.id}`}
    >
      <View style={styles.artifactHeader}>
        <HardDrive size={18} color={theme.colors.primary} />
        <Text style={[styles.artifactName, { color: theme.colors.text }]}>{item.name}</Text>
      </View>
      <Text style={[styles.artifactType, { color: theme.colors.secondaryText }]}>{item.type.toUpperCase()}</Text>
      <View style={styles.artifactMetaRow}>
        <Text style={[styles.artifactMetaLabel, { color: theme.colors.secondaryText }]}>Retention</Text>
        <Text style={[styles.artifactMetaValue, { color: theme.colors.text }]}>{item.retention}</Text>
      </View>
      <View style={styles.artifactMetaRow}>
        <Text style={[styles.artifactMetaLabel, { color: theme.colors.secondaryText }]}>Usage</Text>
        <Text style={[styles.artifactMetaValue, { color: theme.colors.text }]}>{item.size}</Text>
      </View>
    </View>
  );

  const renderInsight = ({ item }: { item: CodeReviewInsight }) => {
    const color = getSeverityColor(item.severity);
    return (
      <View style={[styles.insightCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`code-insight-${item.id}`}
      >
        <View style={styles.insightHeader}>
          <ShieldCheck size={18} color={color} />
          <Text style={[styles.insightSeverity, { color }]}>{item.severity.toUpperCase()}</Text>
        </View>
        <Text style={[styles.insightSummary, { color: theme.colors.text }]}>{item.summary}</Text>
        <Text style={[styles.insightFile, { color: theme.colors.secondaryText }]}>{item.file}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]} testID="cicd-screen">
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton} testID="cicd-back">
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>CI/CD Pipeline</Text>
        <TouchableOpacity style={styles.headerButton} testID="cicd-settings">
          <Settings size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.metricsSection}>
        <FlatList
          data={cicdMetrics}
          renderItem={renderMetric}
          keyExtractor={(item) => item.label}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.metricsContainer}
        />
      </View>

      <View style={styles.tabsContainer}>
        {(['pipelines', 'deployments', 'config'] as TabKey[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && { backgroundColor: theme.colors.primary }]}
            onPress={() => setSelectedTab(tab)}
            testID={`cicd-tab-${tab}`}
          >
            <Text
              style={[
                styles.tabText,
                { color: selectedTab === tab ? 'white' : theme.colors.secondaryText },
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'pipelines' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Pipelines</Text>
              <TouchableOpacity 
                style={[styles.refreshButton, { backgroundColor: theme.colors.primary }]}
                testID="refresh-pipelines"
              >
                <RefreshCw size={16} color="#FFFFFF" />
                <Text style={styles.refreshButtonText}>Refresh</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={pipelines}
              renderItem={renderPipeline}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.pipelinesList}
            />

            <View style={styles.subHeader}>
              <Workflow size={20} color={theme.colors.primary} />
              <Text style={[styles.subHeaderText, { color: theme.colors.text }]}>Pipeline Builder</Text>
            </View>
            <FlatList
              data={pipelineStages}
              renderItem={renderStage}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.stagesList}
            />
          </View>
        )}

        {selectedTab === 'deployments' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Deployments</Text>
            </View>

            <FlatList
              data={deployments}
              renderItem={renderDeployment}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.deploymentsList}
            />

            <View style={styles.subHeader}>
              <Bot size={20} color={theme.colors.primary} />
              <Text style={[styles.subHeaderText, { color: theme.colors.text }]}>Automation & Guardrails</Text>
            </View>
            <FlatList
              data={automationTriggers}
              renderItem={renderAutomation}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.automationList}
            />
          </View>
        )}

        {selectedTab === 'config' && (
          <View style={styles.section}>
            <View style={styles.configGrid}>
              <View style={[styles.configCard, { backgroundColor: theme.colors.cardBackground }]} testID="config-pipelines">
                <Code size={32} color={theme.colors.primary} />
                <Text style={[styles.configTitle, { color: theme.colors.text }]}>Pipeline Configuration</Text>
                <Text style={[styles.configDescription, { color: theme.colors.secondaryText }]}>Manage CI/CD templates, secrets, and deployment policies.</Text>
                <TouchableOpacity style={[styles.configButton, { backgroundColor: theme.colors.primary }]}>
                  <Settings size={16} color="#FFFFFF" />
                  <Text style={styles.configButtonText}>Configure</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.configCard, { backgroundColor: theme.colors.cardBackground }]} testID="config-compliance">
                <ShieldCheck size={32} color={theme.colors.primary} />
                <Text style={[styles.configTitle, { color: theme.colors.text }]}>Compliance</Text>
                <Text style={[styles.configDescription, { color: theme.colors.secondaryText }]}>SOC2 + HIPAA attestations with audit-ready evidence bundles.</Text>
              </View>
            </View>

            <View style={styles.subHeader}>
              <Package size={20} color={theme.colors.primary} />
              <Text style={[styles.subHeaderText, { color: theme.colors.text }]}>Artifact Storage</Text>
            </View>
            <FlatList
              data={artifactStores}
              renderItem={renderArtifact}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.artifactList}
            />

            <View style={styles.subHeader}>
              <ShieldCheck size={20} color={theme.colors.primary} />
              <Text style={[styles.subHeaderText, { color: theme.colors.text }]}>AI Code Review</Text>
            </View>
            <FlatList
              data={codeReviewInsights}
              renderItem={renderInsight}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.insightsList}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: { padding: 8, marginRight: 16 },
  title: { fontSize: 24, fontWeight: '700', flex: 1 },
  headerButton: { padding: 8 },
  metricsSection: { marginBottom: 16 },
  metricsContainer: { paddingHorizontal: 20, gap: 12 },
  metricCard: { width: 140, padding: 16, borderRadius: 12, alignItems: 'center' },
  metricIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  metricValue: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  metricLabel: { fontSize: 12, marginBottom: 4, textAlign: 'center' },
  metricChange: { fontSize: 12, fontWeight: '600' },
  tabsContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 16, gap: 8 },
  tab: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.05)' },
  tabText: { fontSize: 14, fontWeight: '600' },
  content: { flex: 1, paddingHorizontal: 20 },
  section: { paddingBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600' },
  refreshButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, gap: 6 },
  refreshButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  pipelinesList: { gap: 16 },
  pipelineCard: { padding: 16, borderRadius: 16 },
  pipelineHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  pipelineIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  pipelineInfo: { flex: 1 },
  pipelineName: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  branchContainer: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  branchText: { fontSize: 13 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: '600' },
  pipelineDetails: { marginBottom: 16, gap: 8 },
  detailRow: { flexDirection: 'row' },
  detailLabel: { fontSize: 13, width: 80 },
  detailValue: { fontSize: 13, fontWeight: '500', flex: 1 },
  pipelineActions: { flexDirection: 'row', gap: 12 },
  actionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 8, gap: 6 },
  actionButtonText: { fontSize: 13, fontWeight: '600' },
  deploymentsList: { gap: 16 },
  deploymentCard: { padding: 16, borderRadius: 16 },
  deploymentHeader: { flexDirection: 'row', marginBottom: 16 },
  deploymentIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  deploymentInfo: { flex: 1 },
  envContainer: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  envBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  envText: { fontSize: 11, fontWeight: '700' },
  versionText: { fontSize: 14, fontWeight: '600' },
  deploymentMeta: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  metaItem: {},
  metaLabel: { fontSize: 12, marginBottom: 4 },
  metaValue: { fontSize: 13, fontWeight: '600' },
  deploymentActions: { flexDirection: 'row', gap: 12 },
  deployActionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 8, gap: 6 },
  deployActionText: { fontSize: 13, fontWeight: '600' },
  subHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 24, marginBottom: 12 },
  subHeaderText: { fontSize: 16, fontWeight: '600' },
  stagesList: { gap: 12, paddingBottom: 12 },
  stageCard: { width: 220, padding: 16, borderRadius: 12, marginRight: 12 },
  stageHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  stageTitle: { fontSize: 15, fontWeight: '600', flex: 1 },
  stageDescription: { fontSize: 13, marginBottom: 6 },
  stageRuntime: { fontSize: 12 },
  automationList: { gap: 12, paddingBottom: 12 },
  automationCard: { width: 220, padding: 16, borderRadius: 12, marginRight: 12 },
  automationHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  automationTitle: { fontSize: 15, fontWeight: '600' },
  automationDetail: { fontSize: 13, marginBottom: 8 },
  automationFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  automationType: { fontSize: 12 },
  automationImpact: { fontSize: 13, fontWeight: '600' },
  configGrid: { flexDirection: 'row', gap: 16, marginBottom: 24 },
  configCard: { flex: 1, padding: 24, borderRadius: 16, alignItems: 'center', gap: 12 },
  configTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center' },
  configDescription: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  configButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12, gap: 8 },
  configButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  artifactList: { gap: 12, paddingBottom: 12 },
  artifactCard: { width: 200, padding: 16, borderRadius: 12, marginRight: 12 },
  artifactHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  artifactName: { fontSize: 15, fontWeight: '600' },
  artifactType: { fontSize: 12, marginBottom: 10 },
  artifactMetaRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  artifactMetaLabel: { fontSize: 12 },
  artifactMetaValue: { fontSize: 13, fontWeight: '600' },
  insightsList: { gap: 12 },
  insightCard: { padding: 16, borderRadius: 12 },
  insightHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  insightSeverity: { fontSize: 12, fontWeight: '600' },
  insightSummary: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  insightFile: { fontSize: 12 },
});
