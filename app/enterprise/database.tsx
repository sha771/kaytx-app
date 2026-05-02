 
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
  Database,
  Activity,
  TriangleAlert,
  CircleCheck,
  Server,
  Zap,
  RefreshCw,
  ChartBar,
  Settings,
  Copy,
  CirclePause,
  Download,
  Upload,
  Layers,
  Brain,
  Share2,
  ShieldCheck,
  KeySquare,
  ChartLine,
  CircuitBoard,
  Baseline,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface DatabaseInstance {
  id: string;
  name: string;
  type: 'postgresql' | 'mysql' | 'mongodb' | 'redis' | 'elasticsearch';
  status: 'running' | 'stopped' | 'backup' | 'maintenance' | 'error';
  version: string;
  region: string;
  size: string;
  connections: number;
  maxConnections: number;
  storage: number;
  maxStorage: number;
  cpu: number;
  memory: number;
  uptime: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface BackupInfo {
  id: string;
  database: string;
  type: 'full' | 'incremental' | 'differential';
  size: string;
  timestamp: string;
  status: 'completed' | 'in-progress' | 'failed';
  duration: string;
}

interface QueryStat {
  id: string;
  query: string;
  executionTime: number;
  callCount: number;
  avgTime: number;
  database: string;
}

interface ReplicationInfo {
  id: string;
  source: string;
  target: string;
  status: 'synced' | 'syncing' | 'error';
  lag: string;
  lastSync: string;
}

interface SchemaNode {
  id: string;
  name: string;
  type: 'table' | 'collection' | 'graph';
  fields: number;
  relations: number;
  throughput: string;
}

interface OptimizationInsight {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  type: 'index' | 'query' | 'storage';
  status: 'ready' | 'scheduled';
}

interface ShardingConfig {
  id: string;
  name: string;
  strategy: 'hash' | 'range' | 'geo';
  distribution: string;
  status: 'healthy' | 'balancing';
}

interface AccessPolicy {
  id: string;
  role: string;
  databases: number;
  permissions: string[];
  lastAudit: string;
}

interface ApiKeyInfo {
  id: string;
  label: string;
  scopes: string[];
  lastUsed: string;
  status: 'active' | 'revoked';
}

interface AuditEvent {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
  criticality: 'info' | 'warning' | 'critical';
}

type TabKey = 'instances' | 'backups' | 'performance' | 'replication' | 'designer' | 'governance';

const tabOptions: { key: TabKey; label: string }[] = [
  { key: 'instances', label: 'Instances' },
  { key: 'backups', label: 'Backups' },
  { key: 'performance', label: 'Performance' },
  { key: 'replication', label: 'Replication' },
  { key: 'designer', label: 'Schema & AI' },
  { key: 'governance', label: 'Governance' },
];

const databases: DatabaseInstance[] = [
  {
    id: '1',
    name: 'Production PostgreSQL',
    type: 'postgresql',
    status: 'running',
    version: '15.3',
    region: 'us-east-1',
    size: 'db.r5.xlarge',
    connections: 145,
    maxConnections: 500,
    storage: 450,
    maxStorage: 1000,
    cpu: 45,
    memory: 62,
    uptime: '99.99%',
    icon: Database,
    color: '#007AFF',
  },
  {
    id: '2',
    name: 'Analytics MySQL',
    type: 'mysql',
    status: 'running',
    version: '8.0.33',
    region: 'us-west-2',
    size: 'db.m5.large',
    connections: 87,
    maxConnections: 300,
    storage: 280,
    maxStorage: 500,
    cpu: 38,
    memory: 55,
    uptime: '99.95%',
    icon: Database,
    color: '#34C759',
  },
  {
    id: '3',
    name: 'Cache Redis',
    type: 'redis',
    status: 'running',
    version: '7.0',
    region: 'us-east-1',
    size: 'cache.r6g.large',
    connections: 234,
    maxConnections: 1000,
    storage: 45,
    maxStorage: 64,
    cpu: 28,
    memory: 71,
    uptime: '99.98%',
    icon: Zap,
    color: '#FF3B30',
  },
  {
    id: '4',
    name: 'Documents MongoDB',
    type: 'mongodb',
    status: 'backup',
    version: '6.0',
    region: 'eu-west-1',
    size: 'M30',
    connections: 92,
    maxConnections: 400,
    storage: 320,
    maxStorage: 750,
    cpu: 42,
    memory: 58,
    uptime: '99.97%',
    icon: Layers,
    color: '#34C759',
  },
  {
    id: '5',
    name: 'Search ElasticSearch',
    type: 'elasticsearch',
    status: 'running',
    version: '8.8',
    region: 'us-east-1',
    size: 'i3.xlarge.search',
    connections: 64,
    maxConnections: 200,
    storage: 180,
    maxStorage: 300,
    cpu: 52,
    memory: 48,
    uptime: '99.96%',
    icon: Server,
    color: '#FF9500',
  },
];

const backups: BackupInfo[] = [
  {
    id: '1',
    database: 'Production PostgreSQL',
    type: 'full',
    size: '124 GB',
    timestamp: '2024-01-20 02:00:00',
    status: 'completed',
    duration: '18 min',
  },
  {
    id: '2',
    database: 'Analytics MySQL',
    type: 'incremental',
    size: '8.5 GB',
    timestamp: '2024-01-20 06:00:00',
    status: 'completed',
    duration: '3 min',
  },
  {
    id: '3',
    database: 'Documents MongoDB',
    type: 'full',
    size: '95 GB',
    timestamp: '2024-01-20 03:00:00',
    status: 'in-progress',
    duration: '12 min',
  },
  {
    id: '4',
    database: 'Production PostgreSQL',
    type: 'differential',
    size: '12 GB',
    timestamp: '2024-01-19 12:00:00',
    status: 'completed',
    duration: '5 min',
  },
];

const queryStats: QueryStat[] = [
  {
    id: '1',
    query: 'SELECT * FROM users WHERE...',
    executionTime: 1250,
    callCount: 15420,
    avgTime: 245,
    database: 'Production PostgreSQL',
  },
  {
    id: '2',
    query: 'UPDATE orders SET status...',
    executionTime: 890,
    callCount: 8930,
    avgTime: 189,
    database: 'Production PostgreSQL',
  },
  {
    id: '3',
    query: 'INSERT INTO analytics...',
    executionTime: 450,
    callCount: 25600,
    avgTime: 87,
    database: 'Analytics MySQL',
  },
];

const replications: ReplicationInfo[] = [
  {
    id: '1',
    source: 'Production PostgreSQL',
    target: 'Read Replica 1 (us-west-2)',
    status: 'synced',
    lag: '0.2s',
    lastSync: '2 sec ago',
  },
  {
    id: '2',
    source: 'Production PostgreSQL',
    target: 'Read Replica 2 (eu-west-1)',
    status: 'syncing',
    lag: '1.5s',
    lastSync: '5 sec ago',
  },
  {
    id: '3',
    source: 'Documents MongoDB',
    target: 'Backup Replica (us-east-2)',
    status: 'synced',
    lag: '0.8s',
    lastSync: '3 sec ago',
  },
];

const schemaNodes: SchemaNode[] = [
  { id: 'entity-1', name: 'users', type: 'table', fields: 32, relations: 5, throughput: '4.5k ops/s' },
  { id: 'entity-2', name: 'orders', type: 'table', fields: 48, relations: 7, throughput: '2.1k ops/s' },
  { id: 'entity-3', name: 'events', type: 'collection', fields: 18, relations: 3, throughput: '11.4k ops/s' },
  { id: 'entity-4', name: 'graph_edges', type: 'graph', fields: 9, relations: 2, throughput: '700 ops/s' },
];

const optimizationInsights: OptimizationInsight[] = [
  {
    id: 'opt-1',
    title: 'Composite index suggestion',
    description: 'Add composite index on orders (account_id, status) to reduce query latency by 38%.',
    impact: 'high',
    type: 'index',
    status: 'ready',
  },
  {
    id: 'opt-2',
    title: 'Materialized view candidate',
    description: 'Promote analytics.daily_metrics to materialized view for BI workloads.',
    impact: 'medium',
    type: 'storage',
    status: 'scheduled',
  },
  {
    id: 'opt-3',
    title: 'Slow query rewrite',
    description: 'Rewrite customer search query with JSON path Filter to avoid full scan.',
    impact: 'high',
    type: 'query',
    status: 'ready',
  },
];

const shardingConfigs: ShardingConfig[] = [
  {
    id: 'shard-1',
    name: 'User tenant shards',
    strategy: 'hash',
    distribution: '25 nodes · 68% balanced',
    status: 'balancing',
  },
  {
    id: 'shard-2',
    name: 'Time-series cold storage',
    strategy: 'range',
    distribution: '12 nodes · 94% balanced',
    status: 'healthy',
  },
  {
    id: 'shard-3',
    name: 'Geo payments mesh',
    strategy: 'geo',
    distribution: '9 nodes · 89% balanced',
    status: 'healthy',
  },
];

const accessPolicies: AccessPolicy[] = [
  {
    id: 'policy-1',
    role: 'Platform Admin',
    databases: 12,
    permissions: ['DDL', 'DML', 'Backups', 'Keys'],
    lastAudit: '2 hours ago',
  },
  {
    id: 'policy-2',
    role: 'Analytics Engineer',
    databases: 6,
    permissions: ['Read', 'Materialized Views', 'Lineage'],
    lastAudit: '4 hours ago',
  },
  {
    id: 'policy-3',
    role: 'Service Account',
    databases: 3,
    permissions: ['Read', 'Write', 'API Keys'],
    lastAudit: '12 hours ago',
  },
];

const apiKeys: ApiKeyInfo[] = [
  {
    id: 'key-1',
    label: 'infra-observability',
    scopes: ['metrics:read', 'backups:trigger'],
    lastUsed: 'Just now',
    status: 'active',
  },
  {
    id: 'key-2',
    label: 'partner-crm-sync',
    scopes: ['replication:manage'],
    lastUsed: '3 hours ago',
    status: 'active',
  },
  {
    id: 'key-3',
    label: 'legacy-migration',
    scopes: ['export'],
    lastUsed: '45 days ago',
    status: 'revoked',
  },
];

const auditTrail: AuditEvent[] = [
  {
    id: 'audit-1',
    actor: 'svc-deploy-pipeline',
    action: 'Created replica set',
    target: 'postgres-prod',
    timestamp: '08:42 AM',
    criticality: 'info',
  },
  {
    id: 'audit-2',
    actor: 'sre@company.com',
    action: 'Updated firewall rule',
    target: 'mongo-vpc',
    timestamp: '07:18 AM',
    criticality: 'warning',
  },
  {
    id: 'audit-3',
    actor: 'ai-scale-engine',
    action: 'Predicted storage spike ( +32% )',
    target: 'analytics-mysql',
    timestamp: '06:55 AM',
    criticality: 'critical',
  },
];

const scalingForecast = {
  horizon: 'Next 48h',
  storageChange: '+28%',
  cpuChange: '+12%',
  recommendation: 'Add 2 read replicas in eu-west-1 and enable cold-tier archiving for events collection.',
};

export default function DatabaseManagementScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<TabKey>('instances');

  useEffect(() => {
    console.log('[DatabaseManagementScreen] Selected tab changed:', selectedTab);
  }, [selectedTab]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
      case 'completed':
      case 'synced':
      case 'healthy': return '#34C759';
      case 'backup':
      case 'syncing':
      case 'in-progress':
      case 'balancing': return '#FF9500';
      case 'stopped':
      case 'maintenance': return '#8E8E93';
      case 'error':
      case 'failed': return '#FF3B30';
      default: return theme.colors.secondaryText;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
      case 'completed':
      case 'synced':
      case 'healthy': return CircleCheck;
      case 'backup':
      case 'syncing':
      case 'in-progress':
      case 'balancing': return RefreshCw;
      case 'error':
      case 'failed': return TriangleAlert;
      case 'stopped': return CirclePause;
      case 'maintenance': return Settings;
      default: return Activity;
    }
  };

  const getBackupTypeColor = (type: string) => {
    switch (type) {
      case 'full': return '#007AFF';
      case 'incremental': return '#34C759';
      case 'differential': return '#FF9500';
      default: return theme.colors.secondaryText;
    }
  };

  const getImpactColor = (impact: OptimizationInsight['impact']) => {
    switch (impact) {
      case 'high': return '#FF3B30';
      case 'medium': return '#FF9500';
      default: return '#34C759';
    }
  };

  const renderDatabase = ({ item }: { item: DatabaseInstance }) => {
    const IconComponent = item.icon;
    const StatusIcon = getStatusIcon(item.status);
    const statusColor = getStatusColor(item.status);

    return (
      <TouchableOpacity 
        style={[styles.dbCard, { backgroundColor: theme.colors.cardBackground }]}
        activeOpacity={0.7}
        testID={`db-instance-${item.id}`}
      >
        <View style={styles.dbHeader}>
          <View style={[styles.dbIcon, { backgroundColor: `${item.color}20` }]}>
            <IconComponent size={28} color={item.color} />
          </View>
          <View style={styles.dbInfo}>
            <Text style={[styles.dbName, { color: theme.colors.text }]}>{item.name}</Text>
            <View style={styles.dbMeta}>
              <Text style={[styles.dbType, { color: theme.colors.secondaryText }]}>
                {item.type.toUpperCase()} {item.version}
              </Text>
              <Text style={[styles.dbRegion, { color: theme.colors.secondaryText }]}>
                • {item.region}
              </Text>
            </View>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
            <StatusIcon size={12} color={statusColor} />
            <Text style={[styles.statusText, { color: statusColor }]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.dbMetrics}>
          <View style={styles.metricRow}>
            <View style={styles.metricItem}>
              <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Connections</Text>
              <View style={styles.metricValueRow}>
                <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                  {item.connections}/{item.maxConnections}
                </Text>
              </View>
              <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      backgroundColor: item.connections / item.maxConnections > 0.8 ? '#FF3B30' : item.color,
                      width: `${(item.connections / item.maxConnections) * 100}%` 
                    }
                  ]} 
                />
              </View>
            </View>

            <View style={styles.metricItem}>
              <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Storage</Text>
              <View style={styles.metricValueRow}>
                <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                  {item.storage}/{item.maxStorage} GB
                </Text>
              </View>
              <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      backgroundColor: item.storage / item.maxStorage > 0.8 ? '#FF3B30' : '#34C759',
                      width: `${(item.storage / item.maxStorage) * 100}%` 
                    }
                  ]} 
                />
              </View>
            </View>
          </View>

          <View style={styles.metricRow}>
            <View style={styles.metricItem}>
              <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>CPU</Text>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.cpu}%</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Memory</Text>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.memory}%</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Uptime</Text>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.uptime}</Text>
            </View>
          </View>
        </View>

        <View style={styles.dbActions}>
          <TouchableOpacity style={styles.actionButton} testID={`db-config-${item.id}`}>
            <Settings size={16} color={theme.colors.text} />
            <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>Config</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} testID={`db-metrics-${item.id}`}>
            <ChartBarBig size={16} color={theme.colors.text} />
            <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>Metrics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} testID={`db-clone-${item.id}`}>
            <Copy size={16} color={theme.colors.text} />
            <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>Clone</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderBackup = ({ item }: { item: BackupInfo }) => {
    const statusColor = getStatusColor(item.status);
    const typeColor = getBackupTypeColor(item.type);
    const StatusIcon = getStatusIcon(item.status);

    return (
      <View style={[styles.backupCard, { backgroundColor: theme.colors.cardBackground }]}> 
        <View style={styles.backupHeader}>
          <View style={[styles.backupIcon, { backgroundColor: `${statusColor}20` }]}>
            <Download size={24} color={statusColor} />
          </View>
          <View style={styles.backupInfo}>
            <Text style={[styles.backupDatabase, { color: theme.colors.text }]}>
              {item.database}
            </Text>
            <View style={styles.backupMeta}>
              <View style={[styles.typeBadge, { backgroundColor: `${typeColor}20` }]}>
                <Text style={[styles.typeText, { color: typeColor }]}>
                  {item.type.toUpperCase()}
                </Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
                <StatusIcon size={10} color={statusColor} />
                <Text style={[styles.statusText, { color: statusColor }]}>
                  {item.status}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.backupDetails}>
          <View style={styles.backupDetailItem}>
            <Text style={[styles.backupDetailLabel, { color: theme.colors.secondaryText }]}>Size</Text>
            <Text style={[styles.backupDetailValue, { color: theme.colors.text }]}>{item.size}</Text>
          </View>
          <View style={styles.backupDetailItem}>
            <Text style={[styles.backupDetailLabel, { color: theme.colors.secondaryText }]}>Duration</Text>
            <Text style={[styles.backupDetailValue, { color: theme.colors.text }]}>{item.duration}</Text>
          </View>
          <View style={styles.backupDetailItem}>
            <Text style={[styles.backupDetailLabel, { color: theme.colors.secondaryText }]}>Timestamp</Text>
            <Text style={[styles.backupDetailValue, { color: theme.colors.text }]}>{item.timestamp}</Text>
          </View>
        </View>

        {item.status === 'completed' && (
          <View style={styles.backupActions}>
            <TouchableOpacity 
              style={[styles.backupActionButton, { backgroundColor: theme.colors.primary }]}
              testID={`backup-restore-${item.id}`}
            >
              <Upload size={16} color="#FFFFFF" />
              <Text style={styles.backupActionText}>Restore</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.backupActionButton, { backgroundColor: theme.colors.border }]}
              testID={`backup-download-${item.id}`}
            >
              <Download size={16} color={theme.colors.text} />
              <Text style={[styles.backupActionText, { color: theme.colors.text }]}>Download</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderQueryStat = ({ item }: { item: QueryStat }) => (
    <View style={[styles.queryCard, { backgroundColor: theme.colors.cardBackground }]}
      testID={`query-stat-${item.id}`}
    >
      <View style={styles.queryHeader}>
        <View style={[styles.queryIcon, { backgroundColor: `${theme.colors.primary}20` }]}>
          <Activity size={20} color={theme.colors.primary} />
        </View>
        <View style={styles.queryInfo}>
          <Text style={[styles.queryText, { color: theme.colors.text }]} numberOfLines={1}>
            {item.query}
          </Text>
          <Text style={[styles.queryDatabase, { color: theme.colors.secondaryText }]}>
            {item.database}
          </Text>
        </View>
      </View>

      <View style={styles.queryStats}>
        <View style={styles.queryStat}>
          <Text style={[styles.queryStatLabel, { color: theme.colors.secondaryText }]}>Calls</Text>
          <Text style={[styles.queryStatValue, { color: theme.colors.text }]}>
            {item.callCount.toLocaleString()}
          </Text>
        </View>
        <View style={styles.queryStat}>
          <Text style={[styles.queryStatLabel, { color: theme.colors.secondaryText }]}>Avg Time</Text>
          <Text style={[styles.queryStatValue, { color: theme.colors.text }]}>{item.avgTime}ms</Text>
        </View>
        <View style={styles.queryStat}>
          <Text style={[styles.queryStatLabel, { color: theme.colors.secondaryText }]}>Total Time</Text>
          <Text style={[styles.queryStatValue, { color: theme.colors.text }]}>{item.executionTime}ms</Text>
        </View>
      </View>
    </View>
  );

  const renderReplication = ({ item }: { item: ReplicationInfo }) => {
    const statusColor = getStatusColor(item.status);
    const StatusIcon = getStatusIcon(item.status);

    return (
      <View style={[styles.replicationCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`replication-${item.id}`}
      >
        <View style={styles.replicationContentHeader}>
          <View style={[styles.replicationIcon, { backgroundColor: `${statusColor}20` }]}>
            <Copy size={24} color={statusColor} />
          </View>
          <View style={styles.replicationInfo}>
            <Text style={[styles.replicationSource, { color: theme.colors.text }]}>{item.source}</Text>
            <View style={styles.replicationArrow}>
              <Text style={[styles.arrowText, { color: theme.colors.secondaryText }]}>→</Text>
            </View>
            <Text style={[styles.replicationTarget, { color: theme.colors.secondaryText }]}>{item.target}</Text>
          </View>
        </View>

        <View style={styles.replicationStatus}>
          <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
            <StatusIcon size={12} color={statusColor} />
            <Text style={[styles.statusText, { color: statusColor }]}>{item.status.toUpperCase()}</Text>
          </View>
          <View style={styles.replicationMetrics}>
            <Text style={[styles.replicationMetric, { color: theme.colors.secondaryText }]}
            >
              Lag: <Text style={[styles.replicationMetricValue, { color: theme.colors.text }]}>{item.lag}</Text>
            </Text>
            <Text style={[styles.replicationMetric, { color: theme.colors.secondaryText }]}
            >
              Last Sync: <Text style={[styles.replicationMetricValue, { color: theme.colors.text }]}>{item.lastSync}</Text>
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderSchemaNode = ({ item }: { item: SchemaNode }) => (
    <View style={[styles.schemaCard, { backgroundColor: theme.colors.cardBackground }]}
      testID={`schema-node-${item.id}`}
    >
      <View style={styles.schemaHeader}>
        <CircuitBoard size={20} color={theme.colors.primary} />
        <Text style={[styles.schemaName, { color: theme.colors.text }]}>{item.name}</Text>
        <View style={styles.schemaTypeBadge}>
          <Text style={[styles.schemaTypeText, { color: theme.colors.secondaryText }]}>
            {item.type.toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={styles.schemaStatsRow}>
        <View style={styles.schemaStat}>
          <Text style={[styles.schemaStatLabel, { color: theme.colors.secondaryText }]}>Fields</Text>
          <Text style={[styles.schemaStatValue, { color: theme.colors.text }]}>{item.fields}</Text>
        </View>
        <View style={styles.schemaStat}>
          <Text style={[styles.schemaStatLabel, { color: theme.colors.secondaryText }]}>Relations</Text>
          <Text style={[styles.schemaStatValue, { color: theme.colors.text }]}>{item.relations}</Text>
        </View>
        <View style={styles.schemaStat}>
          <Text style={[styles.schemaStatLabel, { color: theme.colors.secondaryText }]}>Throughput</Text>
          <Text style={[styles.schemaStatValue, { color: theme.colors.text }]}>{item.throughput}</Text>
        </View>
      </View>
    </View>
  );

  const renderOptimization = ({ item }: { item: OptimizationInsight }) => {
    const impactColor = getImpactColor(item.impact);
    return (
      <View style={[styles.optimizationCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`optimization-${item.id}`}
      >
        <View style={styles.optimizationHeader}>
          <Brain size={22} color={impactColor} />
          <Text style={[styles.optimizationTitle, { color: theme.colors.text }]}>{item.title}</Text>
          <View style={[styles.impactBadge, { backgroundColor: `${impactColor}20` }]}>
            <Text style={[styles.impactText, { color: impactColor }]}>{item.impact.toUpperCase()}</Text>
          </View>
        </View>
        <Text style={[styles.optimizationDescription, { color: theme.colors.secondaryText }]}>
          {item.description}
        </Text>
        <View style={styles.optimizationFooter}>
          <View style={[styles.typePill, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.typePillText, { color: theme.colors.secondaryText }]}>#{item.type}</Text>
          </View>
          <Text style={[styles.optimizationStatus, { color: theme.colors.secondaryText }]}>
            {item.status === 'ready' ? 'Ready to apply' : 'Scheduled'}
          </Text>
        </View>
      </View>
    );
  };

  const renderSharding = ({ item }: { item: ShardingConfig }) => {
    const statusColor = getStatusColor(item.status);
    return (
      <View style={[styles.shardingCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`shard-${item.id}`}
      >
        <View style={styles.shardingHeader}>
          <Share2 size={20} color={theme.colors.primary} />
          <Text style={[styles.shardingName, { color: theme.colors.text }]}>{item.name}</Text>
        </View>
        <View style={styles.shardingRow}>
          <Text style={[styles.shardingLabel, { color: theme.colors.secondaryText }]}>Strategy</Text>
          <Text style={[styles.shardingValue, { color: theme.colors.text }]}>{item.strategy.toUpperCase()}</Text>
        </View>
        <View style={styles.shardingRow}>
          <Text style={[styles.shardingLabel, { color: theme.colors.secondaryText }]}>Distribution</Text>
          <Text style={[styles.shardingValue, { color: theme.colors.text }]}>{item.distribution}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20`, alignSelf: 'flex-start' }]}
        >
          <Text style={[styles.statusText, { color: statusColor }]}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
    );
  };

  const renderPolicy = ({ item }: { item: AccessPolicy }) => (
    <View style={[styles.policyCard, { backgroundColor: theme.colors.cardBackground }]}
      testID={`policy-${item.id}`}
    >
      <View style={styles.policyHeader}>
        <ShieldCheck size={20} color={theme.colors.primary} />
        <Text style={[styles.policyRole, { color: theme.colors.text }]}>{item.role}</Text>
        <View style={styles.policyDbBadge}>
          <Text style={[styles.policyDbText, { color: theme.colors.secondaryText }]}>
            {item.databases} DBs
          </Text>
        </View>
      </View>
      <View style={styles.policyPermissions}>
        {item.permissions.map((perm) => (
          <View key={perm} style={[styles.permissionChip, { backgroundColor: theme.colors.background }]}
          >
            <Text style={[styles.permissionText, { color: theme.colors.secondaryText }]}>{perm}</Text>
          </View>
        ))}
      </View>
      <Text style={[styles.policyAudit, { color: theme.colors.secondaryText }]}
      >
        Last audit: {item.lastAudit}
      </Text>
    </View>
  );

  const renderApiKey = ({ item }: { item: ApiKeyInfo }) => {
    const statusColor = item.status === 'active' ? '#34C759' : '#FF3B30';
    return (
      <View style={[styles.keyCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`api-key-${item.id}`}
      >
        <View style={styles.keyHeader}>
          <KeySquare size={20} color={theme.colors.primary} />
          <Text style={[styles.keyLabel, { color: theme.colors.text }]}>{item.label}</Text>
          <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>{item.status.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.keyScopes}>
          {item.scopes.map((scope) => (
            <View key={scope} style={[styles.scopeChip, { backgroundColor: theme.colors.background }]}
            >
              <Text style={[styles.scopeText, { color: theme.colors.secondaryText }]}>{scope}</Text>
            </View>
          ))}
        </View>
        <Text style={[styles.keyFooter, { color: theme.colors.secondaryText }]}
        >
          Last used {item.lastUsed}
        </Text>
      </View>
    );
  };

  const renderAudit = ({ item }: { item: AuditEvent }) => {
    const statusColor = item.criticality === 'critical' ? '#FF3B30' : item.criticality === 'warning' ? '#FF9500' : theme.colors.primary;
    return (
      <View style={[styles.auditCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`audit-${item.id}`}
      >
        <View style={styles.auditHeader}>
          <Baseline size={18} color={statusColor} />
          <Text style={[styles.auditActor, { color: theme.colors.text }]}>@{item.actor}</Text>
          <Text style={[styles.auditTimestamp, { color: theme.colors.secondaryText }]}>{item.timestamp}</Text>
        </View>
        <Text style={[styles.auditAction, { color: theme.colors.text }]}
        >
          {item.action}
        </Text>
        <Text style={[styles.auditTarget, { color: theme.colors.secondaryText }]}
        >
          Target: {item.target}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}
      testID="database-management-screen"
    >
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}
        testID="database-management-header"
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton} testID="database-back-button">
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Database Management</Text>
        <TouchableOpacity style={styles.headerButton} testID="database-refresh">
          <RefreshCw size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        {tabOptions.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, selectedTab === tab.key && { backgroundColor: theme.colors.primary }]}
            onPress={() => setSelectedTab(tab.key)}
            testID={`database-tab-${tab.key}`}
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
        {selectedTab === 'instances' && (
          <View style={styles.section}>
            <View style={styles.overviewCard}>
              <Database size={32} color={theme.colors.primary} />
              <Text style={[styles.overviewTitle, { color: theme.colors.text }]}>Database Fleet</Text>
              <Text style={[styles.overviewDescription, { color: theme.colors.secondaryText }]}>
                5 databases across 3 regions with automated health checks and AI capacity planning
              </Text>
            </View>

            <FlatList
              data={databases}
              renderItem={renderDatabase}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.dbList}
            />
          </View>
        )}

        {selectedTab === 'backups' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Backups</Text>
              <TouchableOpacity 
                style={[styles.createButton, { backgroundColor: theme.colors.primary }]}
                testID="trigger-new-backup"
              >
                <Download size={16} color="#FFFFFF" />
                <Text style={styles.createButtonText}>New Backup</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={backups}
              renderItem={renderBackup}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.backupList}
            />
          </View>
        )}

        {selectedTab === 'performance' && (
          <View style={styles.section}>
            <View style={styles.performanceHeader}>
              <ChartBarBig size={24} color={theme.colors.primary} />
              <Text style={[styles.performanceHeaderText, { color: theme.colors.text }]}>Query Performance</Text>
            </View>
            <Text style={[styles.performanceDescription, { color: theme.colors.secondaryText }]}>
              AI-assisted query analyzer, index intelligence, and execution monitoring
            </Text>

            <FlatList
              data={queryStats}
              renderItem={renderQueryStat}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.queryList}
            />
          </View>
        )}

        {selectedTab === 'replication' && (
          <View style={styles.section}>
            <View style={styles.replicationHeader}>
              <Copy size={24} color={theme.colors.primary} />
              <Text style={[styles.replicationHeaderText, { color: theme.colors.text }]}>Global Replication</Text>
            </View>
            <Text style={[styles.replicationDescription, { color: theme.colors.secondaryText }]}>
              Monitor real-time replication health, lag, and SLA compliance across regions
            </Text>

            <FlatList
              data={replications}
              renderItem={renderReplication}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.replicationList}
            />
          </View>
        )}

        {selectedTab === 'designer' && (
          <View style={styles.section}>
            <View style={styles.designerHeader}>
              <Layers size={24} color={theme.colors.primary} />
              <Text style={[styles.designerTitle, { color: theme.colors.text }]}>Schema Designer</Text>
            </View>
            <Text style={[styles.designerDescription, { color: theme.colors.secondaryText }]}>
              Visualize entities, dependencies, and AI-driven optimization paths
            </Text>

            <FlatList
              data={schemaNodes}
              renderItem={renderSchemaNode}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.schemaList}
            />

            <View style={styles.subSectionHeader}>
              <Brain size={20} color={theme.colors.primary} />
              <Text style={[styles.subSectionTitle, { color: theme.colors.text }]}>Optimization Insights</Text>
            </View>
            <FlatList
              data={optimizationInsights}
              renderItem={renderOptimization}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.optimizationList}
            />

            <View style={styles.subSectionHeader}>
              <Share2 size={20} color={theme.colors.primary} />
              <Text style={[styles.subSectionTitle, { color: theme.colors.text }]}>Sharding & Partitioning</Text>
            </View>
            <FlatList
              data={shardingConfigs}
              renderItem={renderSharding}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.shardingList}
            />

            <View style={[styles.aiForecastCard, { backgroundColor: theme.colors.cardBackground }]}
              testID="ai-scaling-forecast"
            >
              <View style={styles.aiForecastHeader}>
                <ChartLine size={24} color={theme.colors.primary} />
                <Text style={[styles.aiForecastTitle, { color: theme.colors.text }]}>Predictive Scaling</Text>
              </View>
              <Text style={[styles.aiForecastMeta, { color: theme.colors.secondaryText }]}>
                Forecast horizon: {scalingForecast.horizon}
              </Text>
              <View style={styles.aiForecastStats}>
                <View style={styles.aiForecastStat}>
                  <Text style={[styles.aiForecastLabel, { color: theme.colors.secondaryText }]}>Storage</Text>
                  <Text style={[styles.aiForecastValue, { color: theme.colors.text }]}>{scalingForecast.storageChange}</Text>
                </View>
                <View style={styles.aiForecastStat}>
                  <Text style={[styles.aiForecastLabel, { color: theme.colors.secondaryText }]}>CPU</Text>
                  <Text style={[styles.aiForecastValue, { color: theme.colors.text }]}>{scalingForecast.cpuChange}</Text>
                </View>
              </View>
              <Text style={[styles.aiForecastRecommendation, { color: theme.colors.secondaryText }]}>
                {scalingForecast.recommendation}
              </Text>
              <TouchableOpacity style={[styles.createButton, { backgroundColor: theme.colors.primary }]} testID="apply-ai-scaling">
                <Brain size={16} color="#FFFFFF" />
                <Text style={styles.createButtonText}>Apply Scaling Plan</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {selectedTab === 'governance' && (
          <View style={styles.section}>
            <View style={styles.subSectionHeader}>
              <ShieldCheck size={20} color={theme.colors.primary} />
              <Text style={[styles.subSectionTitle, { color: theme.colors.text }]}>Access Policies</Text>
            </View>
            <FlatList
              data={accessPolicies}
              renderItem={renderPolicy}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.policyList}
            />

            <View style={styles.subSectionHeader}>
              <KeySquare size={20} color={theme.colors.primary} />
              <Text style={[styles.subSectionTitle, { color: theme.colors.text }]}>API Keys</Text>
            </View>
            <FlatList
              data={apiKeys}
              renderItem={renderApiKey}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.keyList}
            />

            <View style={styles.subSectionHeader}>
              <Baseline size={20} color={theme.colors.primary} />
              <Text style={[styles.subSectionTitle, { color: theme.colors.text }]}>Audit & Lineage</Text>
            </View>
            <FlatList
              data={auditTrail}
              renderItem={renderAudit}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.auditList}
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
    paddingBottom: 20,
  },
  overviewCard: {
    backgroundColor: 'rgba(0,122,255,0.1)',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 8,
  },
  overviewDescription: {
    fontSize: 14,
    textAlign: 'center',
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
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  dbList: {
    gap: 16,
  },
  dbCard: {
    padding: 16,
    borderRadius: 16,
  },
  dbHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dbIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dbInfo: {
    flex: 1,
  },
  dbName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 6,
  },
  dbMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dbType: {
    fontSize: 13,
    fontWeight: '600',
  },
  dbRegion: {
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
  dbMetrics: {
    marginBottom: 16,
  },
  metricRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  metricItem: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 12,
    marginBottom: 6,
  },
  metricValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  metricValue: {
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
  dbActions: {
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
  backupList: {
    gap: 12,
  },
  backupCard: {
    padding: 16,
    borderRadius: 12,
  },
  backupHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  backupIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backupInfo: {
    flex: 1,
  },
  backupDatabase: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  backupMeta: {
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
  backupDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  backupDetailItem: {
    flex: 1,
  },
  backupDetailLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  backupDetailValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  backupActions: {
    flexDirection: 'row',
    gap: 12,
  },
  backupActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  backupActionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  performanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  performanceHeaderText: {
    fontSize: 18,
    fontWeight: '600',
  },
  performanceDescription: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  queryList: {
    gap: 12,
  },
  queryCard: {
    padding: 16,
    borderRadius: 12,
  },
  queryHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  queryIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  queryInfo: {
    flex: 1,
  },
  queryText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  queryDatabase: {
    fontSize: 12,
  },
  queryStats: {
    flexDirection: 'row',
    gap: 16,
  },
  queryStat: {
    flex: 1,
  },
  queryStatLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  queryStatValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  replicationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  replicationHeaderText: {
    fontSize: 18,
    fontWeight: '600',
  },
  replicationDescription: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  replicationList: {
    gap: 12,
  },
  replicationCard: {
    padding: 16,
    borderRadius: 12,
  },
  replicationContentHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  replicationIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  replicationInfo: {
    flex: 1,
  },
  replicationSource: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  replicationArrow: {
    marginVertical: 4,
  },
  arrowText: {
    fontSize: 16,
  },
  replicationTarget: {
    fontSize: 14,
  },
  replicationStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  replicationMetrics: {
    alignItems: 'flex-end',
  },
  replicationMetric: {
    fontSize: 12,
    marginBottom: 4,
  },
  replicationMetricValue: {
    fontWeight: '600',
  },
  designerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 6,
  },
  designerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  designerDescription: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  schemaList: {
    gap: 12,
    paddingBottom: 8,
  },
  schemaCard: {
    width: 220,
    padding: 16,
    borderRadius: 14,
    marginRight: 12,
  },
  schemaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  schemaName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  schemaTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  schemaTypeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  schemaStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  schemaStat: {
    alignItems: 'flex-start',
  },
  schemaStatLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  schemaStatValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  subSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 24,
    marginBottom: 12,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  optimizationList: {
    gap: 12,
  },
  optimizationCard: {
    padding: 16,
    borderRadius: 12,
  },
  optimizationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  optimizationTitle: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  impactText: {
    fontSize: 10,
    fontWeight: '700',
  },
  optimizationDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
  optimizationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  typePillText: {
    fontSize: 11,
    fontWeight: '600',
  },
  optimizationStatus: {
    fontSize: 12,
  },
  shardingList: {
    gap: 12,
    paddingBottom: 8,
  },
  shardingCard: {
    width: 220,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  shardingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  shardingName: {
    fontSize: 15,
    fontWeight: '600',
  },
  shardingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  shardingLabel: {
    fontSize: 12,
  },
  shardingValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  aiForecastCard: {
    padding: 20,
    borderRadius: 16,
    marginTop: 24,
    gap: 12,
  },
  aiForecastHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  aiForecastTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  aiForecastMeta: {
    fontSize: 13,
  },
  aiForecastStats: {
    flexDirection: 'row',
    gap: 32,
  },
  aiForecastStat: {
    flex: 1,
  },
  aiForecastLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  aiForecastValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  aiForecastRecommendation: {
    fontSize: 13,
    lineHeight: 18,
  },
  policyList: {
    gap: 12,
    paddingBottom: 8,
  },
  policyCard: {
    width: 240,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  policyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  policyRole: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  policyDbBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  policyDbText: {
    fontSize: 11,
    fontWeight: '600',
  },
  policyPermissions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  permissionChip: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  permissionText: {
    fontSize: 11,
    fontWeight: '600',
  },
  policyAudit: {
    fontSize: 12,
  },
  keyList: {
    gap: 12,
    paddingBottom: 8,
  },
  keyCard: {
    width: 220,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  keyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  keyLabel: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  keyScopes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  scopeChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  scopeText: {
    fontSize: 11,
  },
  keyFooter: {
    fontSize: 12,
  },
  auditList: {
    gap: 12,
  },
  auditCard: {
    padding: 16,
    borderRadius: 12,
  },
  auditHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  auditActor: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  auditTimestamp: {
    fontSize: 12,
  },
  auditAction: {
    fontSize: 14,
    fontWeight: '600',
  },
  auditTarget: {
    fontSize: 12,
    marginTop: 4,
  },
});
