 
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
  HardDrive,
  CheckCircle,
  AlertCircle,
  Clock,
  Database,
  Server,
  Cloud,
  Package,
  Settings,
  Play,
  RotateCcw,
  Download,
  Upload,
  Shield,
  Calendar,
  FileText,
  Zap,
  TrendingUp,
  RefreshCw,
  Archive,
  Globe,
  ShieldCheck,
  Layers,
  BellRing,
  ThermometerSun,
  BatteryCharging,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface BackupJob {
  id: string;
  name: string;
  type: 'full' | 'incremental' | 'differential';
  source: string;
  destination: string;
  status: 'running' | 'completed' | 'failed' | 'scheduled';
  progress: number;
  lastRun: string;
  nextRun: string;
  size: string;
  duration: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface BackupStorage {
  id: string;
  name: string;
  type: 's3' | 'gcs' | 'azure' | 'local';
  status: 'active' | 'inactive';
  used: string;
  total: string;
  usagePercent: number;
  backups: number;
  lastBackup: string;
  immutable: boolean;
}

interface BackupSchedule {
  id: string;
  name: string;
  frequency: 'hourly' | 'daily' | 'weekly' | 'monthly';
  enabled: boolean;
  sources: string[];
  retention: string;
  nextRun: string;
}

interface BackupMetric {
  label: string;
  value: string;
  change: number;
  icon: React.ComponentType<any>;
  color: string;
}

interface RecoveryTier {
  id: 'hot' | 'warm' | 'cold';
  title: string;
  rpo: string;
  rto: string;
  runbook: string;
  coverage: string;
  cost: string;
}

interface AutomationEvent {
  id: string;
  title: string;
  timestamp: string;
  action: string;
  owner: string;
  state: 'success' | 'pending' | 'warning';
}

interface SimulationResult {
  id: string;
  scenario: string;
  outcome: 'pass' | 'partial' | 'fail';
  duration: string;
  lastRun: string;
  notes: string;
}

const backupJobs: BackupJob[] = [
  {
    id: '1',
    name: 'Production Database',
    type: 'full',
    source: 'PostgreSQL',
    destination: 'AWS S3',
    status: 'completed',
    progress: 100,
    lastRun: '2 hours ago',
    nextRun: 'In 10 hours',
    size: '15.2 GB',
    duration: '8m 32s',
    icon: Database,
    color: '#34C759',
  },
  {
    id: '2',
    name: 'Application Servers',
    type: 'incremental',
    source: 'API Servers',
    destination: 'AWS S3',
    status: 'running',
    progress: 68,
    lastRun: 'Running',
    nextRun: '-',
    size: '2.8 GB',
    duration: '3m 45s',
    icon: Server,
    color: '#007AFF',
  },
  {
    id: '3',
    name: 'User Uploads',
    type: 'differential',
    source: 'Object Storage',
    destination: 'Google Cloud Storage',
    status: 'completed',
    progress: 100,
    lastRun: '1 hour ago',
    nextRun: 'In 23 hours',
    size: '42.5 GB',
    duration: '15m 18s',
    icon: Package,
    color: '#5AC8FA',
  },
  {
    id: '4',
    name: 'Configuration Files',
    type: 'full',
    source: 'Config Repo',
    destination: 'Azure Blob',
    status: 'failed',
    progress: 45,
    lastRun: '30 min ago',
    nextRun: 'In 23h 30m',
    size: '125 MB',
    duration: '1m 12s',
    icon: FileText,
    color: '#FF3B30',
  },
];

const storageLocations: BackupStorage[] = [
  {
    id: '1',
    name: 'AWS S3 - Primary',
    type: 's3',
    status: 'active',
    used: '158 GB',
    total: '500 GB',
    usagePercent: 32,
    backups: 247,
    lastBackup: '2 hours ago',
    immutable: true,
  },
  {
    id: '2',
    name: 'Google Cloud Storage',
    type: 'gcs',
    status: 'active',
    used: '92 GB',
    total: '250 GB',
    usagePercent: 37,
    backups: 156,
    lastBackup: '1 hour ago',
    immutable: false,
  },
  {
    id: '3',
    name: 'Azure Blob Storage',
    type: 'azure',
    status: 'active',
    used: '45 GB',
    total: '200 GB',
    usagePercent: 23,
    backups: 89,
    lastBackup: '30 min ago',
    immutable: true,
  },
  {
    id: '4',
    name: 'Local NAS',
    type: 'local',
    status: 'inactive',
    used: '0 GB',
    total: '1 TB',
    usagePercent: 0,
    backups: 0,
    lastBackup: 'Never',
    immutable: false,
  },
];

const schedules: BackupSchedule[] = [
  {
    id: '1',
    name: 'Database Full Backup',
    frequency: 'daily',
    enabled: true,
    sources: ['PostgreSQL', 'Redis'],
    retention: '30 days',
    nextRun: 'Today at 02:00 AM',
  },
  {
    id: '2',
    name: 'Incremental Backup',
    frequency: 'hourly',
    enabled: true,
    sources: ['API Servers', 'Worker Nodes'],
    retention: '7 days',
    nextRun: 'In 45 minutes',
  },
  {
    id: '3',
    name: 'Weekly Archive',
    frequency: 'weekly',
    enabled: true,
    sources: ['All Systems'],
    retention: '1 year',
    nextRun: 'Sunday at 00:00 AM',
  },
  {
    id: '4',
    name: 'Monthly Snapshot',
    frequency: 'monthly',
    enabled: false,
    sources: ['Production Environment'],
    retention: '5 years',
    nextRun: '-',
  },
];

const metrics: BackupMetric[] = [
  {
    label: 'Total Backups',
    value: '492',
    change: 12,
    icon: Archive,
    color: '#007AFF',
  },
  {
    label: 'Storage Used',
    value: '295 GB',
    change: 8,
    icon: HardDrive,
    color: '#34C759',
  },
  {
    label: 'Success Rate',
    value: '98.5%',
    change: 2,
    icon: CheckCircle,
    color: '#5AC8FA',
  },
  {
    label: 'Avg Duration',
    value: '7m 32s',
    change: -15,
    icon: Clock,
    color: '#FF9500',
  },
];

const recoveryTiers: RecoveryTier[] = [
  {
    id: 'hot',
    title: 'Hot Tier',
    rpo: '< 15 seconds',
    rto: '< 60 seconds',
    runbook: 'Synchronous replicas, automatic failover via Orchestrator',
    coverage: 'Payments, Auth, API',
    cost: 'High',
  },
  {
    id: 'warm',
    title: 'Warm Tier',
    rpo: '< 5 minutes',
    rto: '< 10 minutes',
    runbook: 'Incremental streaming backups with container auto-scale',
    coverage: 'Reporting, CRM, Billing',
    cost: 'Moderate',
  },
  {
    id: 'cold',
    title: 'Cold Tier',
    rpo: '< 4 hours',
    rto: '< 12 hours',
    runbook: 'Archive snapshots with manual approval gates',
    coverage: 'Historical logs, archives',
    cost: 'Low',
  },
];

const automationTimeline: AutomationEvent[] = [
  {
    id: 'evt-1',
    title: 'Immutable backup sealed',
    timestamp: '02:12 UTC',
    action: 'Object Lock applied to S3 bucket',
    owner: 'GuardDuty Bot',
    state: 'success',
  },
  {
    id: 'evt-2',
    title: 'Drill reminder',
    timestamp: '02:30 UTC',
    action: 'Notify SRE for quarterly restore rehearsal',
    owner: 'Runbook AI',
    state: 'pending',
  },
  {
    id: 'evt-3',
    title: 'Anomaly detected',
    timestamp: '02:44 UTC',
    action: 'Upload delta exceeded baseline by 41%',
    owner: 'Aegis Monitor',
    state: 'warning',
  },
];

const simulations: SimulationResult[] = [
  {
    id: 'sim-1',
    scenario: 'Region wide outage',
    outcome: 'pass',
    duration: '6m 11s',
    lastRun: '1 week ago',
    notes: 'Auto DNS failover + hot tier promoted',
  },
  {
    id: 'sim-2',
    scenario: 'Ransomware injection',
    outcome: 'partial',
    duration: '14m 02s',
    lastRun: '2 weeks ago',
    notes: 'Warm tier restored, manual data scrub needed',
  },
  {
    id: 'sim-3',
    scenario: 'Operator error rollback',
    outcome: 'pass',
    duration: '3m 48s',
    lastRun: '4 days ago',
    notes: 'PII masking verified pre-restore',
  },
];

export default function BackupScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'jobs' | 'storage' | 'schedules' | 'restore' | 'resilience'>('jobs');
  const [selectedTier, setSelectedTier] = useState<RecoveryTier['id']>('hot');

  const tierDetails = useMemo(() => recoveryTiers.find((tier) => tier.id === selectedTier), [selectedTier]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'active':
        return '#34C759';
      case 'running':
        return '#007AFF';
      case 'scheduled':
        return '#FF9500';
      case 'failed':
        return '#FF3B30';
      case 'inactive':
        return '#8E8E93';
      default:
        return theme.colors.secondaryText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full':
        return '#007AFF';
      case 'incremental':
        return '#34C759';
      case 'differential':
        return '#FF9500';
      default:
        return theme.colors.secondaryText;
    }
  };

  const renderBackupJob = ({ item }: { item: BackupJob }) => {
    const IconComponent = item.icon;
    const statusColor = getStatusColor(item.status);
    const typeColor = getTypeColor(item.type);

    return (
      <View style={[styles.jobCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`backup-job-${item.id}`}>
        <View style={styles.jobHeader}>
          <View style={[styles.jobIcon, { backgroundColor: `${item.color}20` }]}
            testID={`backup-job-icon-${item.id}`}>
            <IconComponent size={24} color={item.color} />
          </View>
          <View style={styles.jobInfo}>
            <Text style={[styles.jobName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.jobSource, { color: theme.colors.secondaryText }]}>
              {item.source} → {item.destination}
            </Text>
            <View style={styles.jobMeta}>
              <View style={[styles.typeBadge, { backgroundColor: `${typeColor}20` }]}
                testID={`backup-job-type-${item.id}`}>
                <Text style={[styles.typeText, { color: typeColor }]}>{item.type.toUpperCase()}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}
                testID={`backup-job-status-${item.id}`}>
                <Text style={[styles.statusText, { color: statusColor }]}>{item.status.toUpperCase()}</Text>
              </View>
            </View>
          </View>
        </View>

        {item.status === 'running' && (
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={[styles.progressLabel, { color: theme.colors.secondaryText }]}>Progress</Text>
              <Text style={[styles.progressValue, { color: theme.colors.text }]}>{item.progress}%</Text>
            </View>
            <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}
              testID={`backup-job-progress-${item.id}`}>
              <View style={[styles.progressFill, { backgroundColor: item.color, width: `${item.progress}%` }]} />
            </View>
          </View>
        )}

        <View style={styles.jobDetails}>
          <View style={styles.jobDetail}>
            <HardDrive size={14} color={theme.colors.secondaryText} />
            <Text style={[styles.jobDetailText, { color: theme.colors.text }]}>{item.size}</Text>
          </View>
          <View style={styles.jobDetail}>
            <Clock size={14} color={theme.colors.secondaryText} />
            <Text style={[styles.jobDetailText, { color: theme.colors.text }]}>{item.duration}</Text>
          </View>
          <View style={styles.jobDetail}>
            <Calendar size={14} color={theme.colors.secondaryText} />
            <Text style={[styles.jobDetailText, { color: theme.colors.text }]}>{item.lastRun}</Text>
          </View>
        </View>

        <View style={styles.jobActions}>
          {item.status !== 'running' && (
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#34C75920' }]}
              testID={`backup-job-run-${item.id}`}>
              <Play size={16} color="#34C759" />
              <Text style={[styles.actionButtonText, { color: '#34C759' }]}>Run Now</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.background }]}
            testID={`backup-job-restore-${item.id}`}>
            <RotateCcw size={16} color={theme.colors.text} />
            <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>Restore</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.background }]}
            testID={`backup-job-config-${item.id}`}>
            <Settings size={16} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderStorage = ({ item }: { item: BackupStorage }) => {
    const statusColor = getStatusColor(item.status);
    const StorageIcon = item.type === 'local' ? HardDrive : Cloud;

    return (
      <View style={[styles.storageCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`backup-storage-${item.id}`}>
        <View style={styles.storageHeader}>
          <View style={[styles.storageIcon, { backgroundColor: `${statusColor}20` }]}
            testID={`backup-storage-icon-${item.id}`}>
            <StorageIcon size={24} color={statusColor} />
          </View>
          <View style={styles.storageInfo}>
            <Text style={[styles.storageName, { color: theme.colors.text }]}>{item.name}</Text>
            <View style={styles.storageMeta}>
              <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
                <Text style={[styles.statusText, { color: statusColor }]}>{item.status.toUpperCase()}</Text>
              </View>
              <View style={[styles.typeBadge, { backgroundColor: theme.colors.background }]}>
                <Text style={[styles.typeText, { color: theme.colors.text }]}>{item.type.toUpperCase()}</Text>
              </View>
              {item.immutable && (
                <View style={[styles.immutableBadge, { backgroundColor: '#FFD60A33' }]}
                  testID={`backup-storage-immutable-${item.id}`}>
                  <ShieldCheck size={12} color="#FF9500" />
                  <Text style={styles.immutableText}>IMMUTABLE</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={styles.usageContainer}>
          <View style={styles.usageHeader}>
            <Text style={[styles.usageLabel, { color: theme.colors.secondaryText }]}>Storage Usage</Text>
            <Text style={[styles.usageText, { color: theme.colors.text }]}>{item.used} / {item.total}</Text>
          </View>
          <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}
            testID={`backup-storage-usage-${item.id}`}>
            <View
              style={[styles.progressFill, { backgroundColor: item.usagePercent > 80 ? '#FF3B30' : item.usagePercent > 60 ? '#FF9500' : '#34C759', width: `${item.usagePercent}%` }]}
            />
          </View>
          <Text style={[styles.usagePercent, { color: theme.colors.secondaryText }]}>{item.usagePercent}% used</Text>
        </View>

        <View style={styles.storageStats}>
          <View style={styles.storageStat}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{item.backups}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Backups</Text>
          </View>
          <View style={styles.storageStat}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{item.lastBackup}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Last Backup</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderSchedule = ({ item }: { item: BackupSchedule }) => {
    const enabledColor = item.enabled ? '#34C759' : '#8E8E93';
    const FrequencyIcon = item.frequency === 'hourly' ? Zap : Calendar;

    return (
      <View style={[styles.scheduleCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`backup-schedule-${item.id}`}>
        <View style={styles.scheduleHeader}>
          <View style={[styles.scheduleIcon, { backgroundColor: `${enabledColor}20` }]}
            testID={`backup-schedule-icon-${item.id}`}>
            <FrequencyIcon size={24} color={enabledColor} />
          </View>
          <View style={styles.scheduleInfo}>
            <Text style={[styles.scheduleName, { color: theme.colors.text }]}>{item.name}</Text>
            <View style={styles.scheduleMeta}>
              <View style={[styles.frequencyBadge, { backgroundColor: theme.colors.background }]}>
                <Text style={[styles.frequencyText, { color: theme.colors.text }]}>{item.frequency.toUpperCase()}</Text>
              </View>
              <View style={[styles.enabledBadge, { backgroundColor: item.enabled ? '#34C75920' : '#8E8E9320' }]}>
                <Text style={[styles.enabledText, { color: item.enabled ? '#34C759' : '#8E8E93' }]}>
                  {item.enabled ? 'ENABLED' : 'DISABLED'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.scheduleDetails}>
          <View>
            <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Sources</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{item.sources.join(', ')}</Text>
          </View>
          <View>
            <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Retention</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{item.retention}</Text>
          </View>
          {item.enabled && (
            <View>
              <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Next Run</Text>
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>{item.nextRun}</Text>
            </View>
          )}
        </View>

        <View style={styles.scheduleActions}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.background }]}
            testID={`backup-schedule-config-${item.id}`}>
            <Settings size={16} color={theme.colors.text} />
            <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>Configure</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderMetric = ({ item }: { item: BackupMetric }) => {
    const IconComponent = item.icon;
    const changeColor = item.change > 0 ? '#34C759' : '#FF3B30';

    return (
      <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={[styles.metricIcon, { backgroundColor: `${item.color}20` }]}
          testID={`backup-metric-icon-${item.label}`}>
          <IconComponent size={20} color={item.color} />
        </View>
        <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.value}</Text>
        <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>{item.label}</Text>
        <View style={[styles.metricChange, { backgroundColor: `${changeColor}15` }]}
          testID={`backup-metric-change-${item.label}`}>
          <TrendingUp size={10} color={changeColor} />
          <Text style={[styles.metricChangeText, { color: changeColor }]}>{Math.abs(item.change)}%</Text>
        </View>
      </View>
    );
  };

  const renderTimelineEvent = ({ item }: { item: AutomationEvent }) => {
    const color = item.state === 'success' ? '#34C759' : item.state === 'warning' ? '#FF9500' : theme.colors.secondaryText;
    return (
      <View style={[styles.timelineRow, { backgroundColor: theme.colors.cardBackground }]}
        testID={`backup-automation-${item.id}`}>
        <View>
          <Text style={[styles.timelineTitle, { color: theme.colors.text }]}>{item.title}</Text>
          <Text style={[styles.timelineAction, { color: theme.colors.secondaryText }]}>{item.action}</Text>
        </View>
        <View style={styles.timelineMeta}>
          <Text style={[styles.timelineOwner, { color: theme.colors.secondaryText }]}>{item.owner}</Text>
          <Text style={[styles.timelineTimestamp, { color }]}>{item.timestamp}</Text>
        </View>
      </View>
    );
  };

  const renderSimulation = ({ item }: { item: SimulationResult }) => {
    const color = item.outcome === 'pass' ? '#34C759' : item.outcome === 'partial' ? '#FF9500' : '#FF3B30';
    const OutcomeIcon = item.outcome === 'pass' ? ShieldCheck : item.outcome === 'partial' ? AlertCircle : AlertCircle;

    return (
      <View style={[styles.simulationCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`backup-simulation-${item.id}`}>
        <View style={styles.simulationHeader}>
          <View style={[styles.simulationBadge, { backgroundColor: `${color}20` }]}
            testID={`backup-simulation-badge-${item.id}`}>
            <OutcomeIcon size={18} color={color} />
            <Text style={[styles.simulationBadgeText, { color }]}>{item.outcome.toUpperCase()}</Text>
          </View>
          <Text style={[styles.simulationDuration, { color: theme.colors.text }]}>{item.duration}</Text>
        </View>
        <Text style={[styles.simulationScenario, { color: theme.colors.text }]}>{item.scenario}</Text>
        <Text style={[styles.simulationNotes, { color: theme.colors.secondaryText }]}>{item.notes}</Text>
        <Text style={[styles.simulationRun, { color: theme.colors.secondaryText }]}>Last run {item.lastRun}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}
      testID="backup-screen">
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton} testID="backup-back-button">
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Backup & Recovery</Text>
        <TouchableOpacity style={styles.headerButton} testID="backup-refresh">
          <RefreshCw size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        {(['jobs', 'storage', 'schedules', 'restore', 'resilience'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && { backgroundColor: theme.colors.primary }]}
            onPress={() => setSelectedTab(tab)}
            testID={`backup-tab-${tab}`}>
            <Text style={[styles.tabText, { color: selectedTab === tab ? 'white' : theme.colors.secondaryText }]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'jobs' && (
          <View style={styles.section}>
            <View style={[styles.statusCard, { backgroundColor: '#34C75915' }]}
              testID="backup-status-card">
              <Shield size={32} color="#34C759" />
              <Text style={[styles.statusTitle, { color: theme.colors.text }]}>Backups Operational</Text>
              <Text style={[styles.statusDescription, { color: theme.colors.secondaryText }]}>All backup jobs running smoothly • 98.5% success rate</Text>
            </View>

            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Metrics</Text>
            <FlatList
              data={metrics}
              renderItem={renderMetric}
              keyExtractor={(item) => item.label}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.metricsList}
            />

            <View style={styles.alertCard}>
              <AlertCircle size={20} color="#FF3B30" />
              <View>
                <Text style={[styles.alertTitle, { color: theme.colors.text }]}>1 job needs attention</Text>
                <Text style={[styles.alertDescription, { color: theme.colors.secondaryText }]}>Configuration Files backup failed 30 minutes ago</Text>
              </View>
              <TouchableOpacity style={styles.alertAction} testID="backup-alert-action">
                <Text style={styles.alertActionText}>View log</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: 24 }]}>Active Jobs</Text>
            <FlatList
              data={backupJobs}
              renderItem={renderBackupJob}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.jobsList}
            />
          </View>
        )}

        {selectedTab === 'storage' && (
          <View style={styles.section}>
            <View style={styles.infoCard}>
              <HardDrive size={24} color={theme.colors.primary} />
              <Text style={[styles.infoText, { color: theme.colors.secondaryText }]}>Manage backup storage locations and capacity</Text>
            </View>
            <FlatList
              data={storageLocations}
              renderItem={renderStorage}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.storageList}
            />
          </View>
        )}

        {selectedTab === 'schedules' && (
          <View style={styles.section}>
            <View style={styles.infoCard}>
              <Calendar size={24} color={theme.colors.primary} />
              <Text style={[styles.infoText, { color: theme.colors.secondaryText }]}>Configure automated backup schedules</Text>
            </View>
            <FlatList
              data={schedules}
              renderItem={renderSchedule}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.schedulesList}
            />
          </View>
        )}

        {selectedTab === 'restore' && (
          <View style={styles.section}>
            <View style={[styles.restoreCard, { backgroundColor: theme.colors.cardBackground }]}
              testID="backup-restore-card">
              <RotateCcw size={48} color={theme.colors.primary} />
              <Text style={[styles.restoreTitle, { color: theme.colors.text }]}>Restore Data</Text>
              <Text style={[styles.restoreDescription, { color: theme.colors.secondaryText }]}>Select a backup to restore from available snapshots</Text>
              <View style={styles.restoreActions}>
                <TouchableOpacity style={[styles.restoreButton, { backgroundColor: theme.colors.primary }]}
                  testID="backup-restore-browse">
                  <Download size={20} color="#FFFFFF" />
                  <Text style={styles.restoreButtonText}>Browse Backups</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.restoreButton, { backgroundColor: theme.colors.cardBackground, borderWidth: 1, borderColor: theme.colors.border }]}
                  testID="backup-restore-pitr">
                  <Upload size={20} color={theme.colors.text} />
                  <Text style={[styles.restoreButtonText, { color: theme.colors.text }]}>Point-in-Time Recovery</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: 24 }]}>Recovery Simulations</Text>
            <FlatList
              data={simulations}
              renderItem={renderSimulation}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.simulationList}
            />

            <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: 24 }]}>Recent Restorations</Text>
            <View style={[styles.emptyState, { backgroundColor: theme.colors.cardBackground }]}>
              <AlertCircle size={32} color={theme.colors.secondaryText} />
              <Text style={[styles.emptyText, { color: theme.colors.secondaryText }]}>No recent restore operations</Text>
            </View>
          </View>
        )}

        {selectedTab === 'resilience' && (
          <View style={styles.section}>
            <View style={[styles.statusCard, { backgroundColor: '#007AFF15' }]}
              testID="backup-resilience-status">
              <Globe size={32} color="#007AFF" />
              <Text style={[styles.statusTitle, { color: theme.colors.text }]}>Enterprise Resilience</Text>
              <Text style={[styles.statusDescription, { color: theme.colors.secondaryText }]}>Multi-tier recovery, automated drills, compliance ready</Text>
            </View>

            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recovery Tiers</Text>
            <View style={styles.tierChips}>
              {recoveryTiers.map((tier) => (
                <TouchableOpacity
                  key={tier.id}
                  style={[styles.tierChip, selectedTier === tier.id && { backgroundColor: theme.colors.primary }]}
                  onPress={() => setSelectedTier(tier.id)}
                  testID={`backup-tier-${tier.id}`}>
                  <Text style={[styles.tierChipText, { color: selectedTier === tier.id ? '#FFFFFF' : theme.colors.secondaryText }]}>
                    {tier.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {tierDetails && (
              <View style={[styles.tierDetailCard, { backgroundColor: theme.colors.cardBackground }]}>
                <View style={styles.tierRow}>
                  <View style={styles.tierColumn}>
                    <Text style={[styles.tierLabel, { color: theme.colors.secondaryText }]}>RPO</Text>
                    <Text style={[styles.tierValue, { color: theme.colors.text }]}>{tierDetails.rpo}</Text>
                  </View>
                  <View style={styles.tierColumn}>
                    <Text style={[styles.tierLabel, { color: theme.colors.secondaryText }]}>RTO</Text>
                    <Text style={[styles.tierValue, { color: theme.colors.text }]}>{tierDetails.rto}</Text>
                  </View>
                  <View style={styles.tierColumn}>
                    <Text style={[styles.tierLabel, { color: theme.colors.secondaryText }]}>Cost</Text>
                    <Text style={[styles.tierValue, { color: theme.colors.text }]}>{tierDetails.cost}</Text>
                  </View>
                </View>
                <Text style={[styles.tierRunbook, { color: theme.colors.secondaryText }]}>{tierDetails.runbook}</Text>
                <View style={styles.tierCoverage}>
                  <Layers size={14} color={theme.colors.text} />
                  <Text style={[styles.tierCoverageText, { color: theme.colors.text }]}>{tierDetails.coverage}</Text>
                </View>
              </View>
            )}

            <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: 24 }]}>Automation Timeline</Text>
            <FlatList
              data={automationTimeline}
              renderItem={renderTimelineEvent}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.timelineList}
            />

            <View style={styles.signalGrid}>
              <View style={[styles.signalCard, { backgroundColor: theme.colors.cardBackground }]}>
                <BellRing size={18} color="#FF9500" />
                <Text style={[styles.signalTitle, { color: theme.colors.text }]}>Alerting Surface</Text>
                <Text style={[styles.signalSubtitle, { color: theme.colors.secondaryText }]}>Slack • PagerDuty • SMS</Text>
              </View>
              <View style={[styles.signalCard, { backgroundColor: theme.colors.cardBackground }]}>
                <ThermometerSun size={18} color="#FF3B30" />
                <Text style={[styles.signalTitle, { color: theme.colors.text }]}>Drill Heat</Text>
                <Text style={[styles.signalSubtitle, { color: theme.colors.secondaryText }]}>Quarterly full failover</Text>
              </View>
              <View style={[styles.signalCard, { backgroundColor: theme.colors.cardBackground }]}>
                <BatteryCharging size={18} color="#34C759" />
                <Text style={[styles.signalTitle, { color: theme.colors.text }]}>Runbook Energy</Text>
                <Text style={[styles.signalSubtitle, { color: theme.colors.secondaryText }]}>AI-validated steps</Text>
              </View>
            </View>
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
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 8,
  },
  statusDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  metricsList: {
    gap: 12,
    paddingBottom: 8,
  },
  metricCard: {
    width: 130,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 11,
    marginBottom: 8,
    textAlign: 'center',
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  metricChangeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 18,
    borderRadius: 12,
    backgroundColor: 'rgba(255,59,48,0.08)',
    marginTop: 24,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  alertDescription: {
    fontSize: 12,
  },
  alertAction: {
    marginLeft: 'auto',
  },
  alertActionText: {
    color: '#FF3B30',
    fontWeight: '600',
  },
  jobsList: {
    gap: 16,
  },
  jobCard: {
    padding: 16,
    borderRadius: 12,
  },
  jobHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  jobIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  jobInfo: {
    flex: 1,
  },
  jobName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  jobSource: {
    fontSize: 13,
    marginBottom: 8,
  },
  jobMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '600',
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
  jobDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  jobDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  jobDetailText: {
    fontSize: 12,
    fontWeight: '600',
  },
  jobActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  storageList: {
    gap: 16,
  },
  storageCard: {
    padding: 16,
    borderRadius: 12,
  },
  storageHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  storageIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  storageInfo: {
    flex: 1,
  },
  storageName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  storageMeta: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  immutableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  immutableText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FF9500',
  },
  usageContainer: {
    marginBottom: 16,
  },
  usageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  usageLabel: {
    fontSize: 13,
  },
  usageText: {
    fontSize: 14,
    fontWeight: '600',
  },
  usagePercent: {
    fontSize: 12,
    marginTop: 6,
  },
  storageStats: {
    flexDirection: 'row',
    gap: 32,
  },
  storageStat: {
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  schedulesList: {
    gap: 16,
  },
  scheduleCard: {
    padding: 16,
    borderRadius: 12,
  },
  scheduleHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  scheduleIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  scheduleMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  frequencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  frequencyText: {
    fontSize: 10,
    fontWeight: '700',
  },
  enabledBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  enabledText: {
    fontSize: 10,
    fontWeight: '700',
  },
  scheduleDetails: {
    marginBottom: 16,
    gap: 12,
  },
  detailLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  scheduleActions: {
    flexDirection: 'row',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0,122,255,0.1)',
    borderRadius: 12,
    marginBottom: 20,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
  },
  restoreCard: {
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  restoreTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
  },
  restoreDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  restoreActions: {
    width: '100%',
    gap: 12,
  },
  restoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  restoreButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  simulationList: {
    gap: 12,
    paddingBottom: 8,
  },
  simulationCard: {
    width: 220,
    padding: 18,
    borderRadius: 14,
  },
  simulationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  simulationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  simulationBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  simulationDuration: {
    fontSize: 14,
    fontWeight: '600',
  },
  simulationScenario: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  simulationNotes: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 6,
  },
  simulationRun: {
    fontSize: 12,
  },
  emptyState: {
    padding: 48,
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    marginTop: 12,
  },
  tierChips: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  tierChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  tierChipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  tierDetailCard: {
    borderRadius: 16,
    padding: 18,
  },
  tierRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  tierColumn: {
    flex: 1,
  },
  tierLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  tierValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  tierRunbook: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
  },
  tierCoverage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tierCoverageText: {
    fontSize: 13,
    fontWeight: '600',
  },
  timelineList: {
    gap: 12,
    marginBottom: 24,
  },
  timelineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  timelineAction: {
    fontSize: 12,
    marginTop: 4,
  },
  timelineMeta: {
    alignItems: 'flex-end',
    gap: 6,
  },
  timelineOwner: {
    fontSize: 12,
  },
  timelineTimestamp: {
    fontSize: 12,
    fontWeight: '600',
  },
  signalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  signalCard: {
    flex: 1,
    minWidth: 100,
    padding: 14,
    borderRadius: 14,
    gap: 6,
  },
  signalTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  signalSubtitle: {
    fontSize: 12,
  },
});
