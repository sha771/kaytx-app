 
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Box,
  Play,
  Square,
  RefreshCw,
  Trash2,
  Terminal,
  Activity,
  Cpu,
  MemoryStick,
  HardDrive,
  Wifi,
  Clock,
  CircleCheck,
  CircleAlert,
  Settings,
  Plus,
  Search,
  BarChart3,
  Globe,
  Layers,
  Shield,
  Cloud,
  GitBranch,
  Workflow,
  Gauge,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface Container {
  id: string;
  name: string;
  image: string;
  status: 'running' | 'stopped' | 'restarting' | 'exited';
  uptime: string;
  cpu: number;
  memory: string;
  memoryLimit: string;
  network: string;
  ports: string[];
  created: string;
  restartCount: number;
}

interface ImageInfo {
  id: string;
  repository: string;
  tag: string;
  size: string;
  created: string;
  containers: number;
}

interface Volume {
  id: string;
  name: string;
  driver: string;
  mountPoint: string;
  size: string;
  containers: number;
  created: string;
}

interface Registry {
  id: string;
  name: string;
  url: string;
  type: 'docker-hub' | 'private' | 'gcr' | 'ecr';
  status: 'connected' | 'disconnected';
  images: number;
}

interface Cluster {
  id: string;
  name: string;
  version: string;
  controlPlane: 'healthy' | 'warning';
  nodes: number;
  pods: number;
  cpu: number;
  memory: number;
  status: 'green' | 'amber' | 'red';
}

interface Workload {
  id: string;
  name: string;
  namespace: string;
  type: 'deployment' | 'statefulset' | 'daemonset';
  podsReady: number;
  podsTotal: number;
  version: string;
  strategy: 'rolling' | 'blue/green' | 'canary';
}

interface Pipeline {
  id: string;
  name: string;
  environment: 'prod' | 'staging' | 'dev';
  status: 'running' | 'paused' | 'failed' | 'completed';
  duration: string;
  owner: string;
}

const containers: Container[] = [
  {
    id: '1',
    name: 'api-server-prod',
    image: 'node:18-alpine',
    status: 'running',
    uptime: '15d 6h 23m',
    cpu: 32,
    memory: '512',
    memoryLimit: '2048',
    network: '1.2 MB/s',
    ports: ['8080:3000', '8443:3443'],
    created: '2024-01-01',
    restartCount: 2,
  },
  {
    id: '2',
    name: 'postgres-db',
    image: 'postgres:15',
    status: 'running',
    uptime: '30d 12h 45m',
    cpu: 18,
    memory: '1024',
    memoryLimit: '4096',
    network: '450 KB/s',
    ports: ['5432:5432'],
    created: '2023-12-15',
    restartCount: 0,
  },
  {
    id: '3',
    name: 'redis-cache',
    image: 'redis:7-alpine',
    status: 'running',
    uptime: '15d 6h 23m',
    cpu: 8,
    memory: '128',
    memoryLimit: '512',
    network: '800 KB/s',
    ports: ['6379:6379'],
    created: '2024-01-01',
    restartCount: 1,
  },
  {
    id: '4',
    name: 'worker-queue',
    image: 'node:18-alpine',
    status: 'stopped',
    uptime: '-',
    cpu: 0,
    memory: '0',
    memoryLimit: '1024',
    network: '-',
    ports: [],
    created: '2024-01-10',
    restartCount: 5,
  },
];

const images: ImageInfo[] = [
  {
    id: '1',
    repository: 'node',
    tag: '18-alpine',
    size: '171 MB',
    created: '2 weeks ago',
    containers: 2,
  },
  {
    id: '2',
    repository: 'postgres',
    tag: '15',
    size: '379 MB',
    created: '1 month ago',
    containers: 1,
  },
  {
    id: '3',
    repository: 'redis',
    tag: '7-alpine',
    size: '32 MB',
    created: '2 weeks ago',
    containers: 1,
  },
  {
    id: '4',
    repository: 'nginx',
    tag: 'alpine',
    size: '23 MB',
    created: '3 days ago',
    containers: 0,
  },
];

const volumes: Volume[] = [
  {
    id: '1',
    name: 'postgres-data',
    driver: 'local',
    mountPoint: '/var/lib/postgresql/data',
    size: '12.5 GB',
    containers: 1,
    created: '2023-12-15',
  },
  {
    id: '2',
    name: 'app-logs',
    driver: 'local',
    mountPoint: '/var/log/app',
    size: '2.8 GB',
    containers: 2,
    created: '2024-01-01',
  },
  {
    id: '3',
    name: 'redis-data',
    driver: 'local',
    mountPoint: '/data',
    size: '450 MB',
    containers: 1,
    created: '2024-01-01',
  },
];

const registries: Registry[] = [
  {
    id: '1',
    name: 'Docker Hub',
    url: 'hub.docker.com',
    type: 'docker-hub',
    status: 'connected',
    images: 42,
  },
  {
    id: '2',
    name: 'Private Registry',
    url: 'registry.company.com',
    type: 'private',
    status: 'connected',
    images: 28,
  },
  {
    id: '3',
    name: 'Google Container Registry',
    url: 'gcr.io',
    type: 'gcr',
    status: 'disconnected',
    images: 0,
  },
];

const clusters: Cluster[] = [
  {
    id: 'cluster-1',
    name: 'North America Mesh',
    version: '1.29.3',
    controlPlane: 'healthy',
    nodes: 24,
    pods: 486,
    cpu: 72,
    memory: 68,
    status: 'green',
  },
  {
    id: 'cluster-2',
    name: 'EU Data Residency',
    version: '1.28.7',
    controlPlane: 'warning',
    nodes: 16,
    pods: 322,
    cpu: 81,
    memory: 74,
    status: 'amber',
  },
  {
    id: 'cluster-3',
    name: 'APAC Edge Tier',
    version: '1.27.9',
    controlPlane: 'healthy',
    nodes: 12,
    pods: 205,
    cpu: 54,
    memory: 58,
    status: 'green',
  },
];

const workloads: Workload[] = [
  {
    id: 'workload-1',
    name: 'checkout-api',
    namespace: 'prod',
    type: 'deployment',
    podsReady: 18,
    podsTotal: 18,
    version: 'v2.5.4',
    strategy: 'rolling',
  },
  {
    id: 'workload-2',
    name: 'revenue-stats',
    namespace: 'analytics',
    type: 'statefulset',
    podsReady: 9,
    podsTotal: 10,
    version: 'v1.9.0',
    strategy: 'blue/green',
  },
  {
    id: 'workload-3',
    name: 'edge-ingress',
    namespace: 'platform',
    type: 'daemonset',
    podsReady: 24,
    podsTotal: 24,
    version: 'v3.1.1',
    strategy: 'rolling',
  },
];

const pipelines: Pipeline[] = [
  {
    id: 'pipeline-1',
    name: 'Prod rollout',
    environment: 'prod',
    status: 'running',
    duration: '08:23',
    owner: 'Platform SRE',
  },
  {
    id: 'pipeline-2',
    name: 'Staging smoke',
    environment: 'staging',
    status: 'completed',
    duration: '05:11',
    owner: 'QA Automation',
  },
  {
    id: 'pipeline-3',
    name: 'Chaos drill',
    environment: 'dev',
    status: 'paused',
    duration: '12:40',
    owner: 'Chaos Guild',
  },
];

export default function ContainersScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'containers' | 'images' | 'volumes' | 'registries'>('containers');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCluster, setSelectedCluster] = useState('cluster-1');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const filteredContainers = useMemo(() =>
    containers.filter((container) =>
      container.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      container.image.toLowerCase().includes(searchQuery.toLowerCase())),
  [searchQuery]);

  const activeWorkloads = useMemo(() => workloads.filter((workload) => workload.podsReady === workload.podsTotal), []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
      case 'connected':
      case 'green':
        return '#34C759';
      case 'stopped':
      case 'disconnected':
        return '#8E8E93';
      case 'restarting':
      case 'amber':
        return '#FF9500';
      case 'exited':
      case 'red':
        return '#FF3B30';
      default:
        return theme.colors.secondaryText;
    }
  };

  const renderContainer = ({ item }: { item: Container }) => {
    const statusColor = getStatusColor(item.status);
    const StatusIcon = item.status === 'running' ? CircleCheck : item.status === 'stopped' ? Square : CircleAlert;

    return (
      <View style={[styles.containerCard, { backgroundColor: theme.colors.cardBackground }]} testID={`docker-card-${item.id}`}>
        <View style={styles.containerHeader}>
          <View style={[styles.containerIcon, { backgroundColor: `${statusColor}20` }]}>
            <Box size={24} color={statusColor} />
          </View>
          <View style={styles.containerInfo}>
            <Text style={[styles.containerName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.containerImage, { color: theme.colors.secondaryText }]}>{item.image}</Text>
            <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
              <StatusIcon size={10} color={statusColor} />
              <Text style={[styles.statusText, { color: statusColor }]}>{item.status.toUpperCase()}</Text>
            </View>
          </View>
        </View>

        <View style={styles.containerMetrics}>
          <View style={styles.metricRow}>
            <View style={styles.metricItem}>
              <Cpu size={14} color={theme.colors.secondaryText} />
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.cpu}%</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>CPU</Text>
            </View>
            <View style={styles.metricItem}>
              <MemoryStick size={14} color={theme.colors.secondaryText} />
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.memory} MB</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Memory</Text>
            </View>
            <View style={styles.metricItem}>
              <Wifi size={14} color={theme.colors.secondaryText} />
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.network}</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Network</Text>
            </View>
          </View>

          {item.uptime !== '-' && (
            <View style={styles.uptimeRow}>
              <Clock size={12} color={theme.colors.secondaryText} />
              <Text style={[styles.uptimeText, { color: theme.colors.secondaryText }]}>Uptime: {item.uptime}</Text>
              {item.restartCount > 0 && (
                <Text style={[styles.restartText, { color: '#FF9500' }]}>• {item.restartCount} restarts</Text>
              )}
            </View>
          )}

          {item.ports.length > 0 && (
            <View style={styles.portsContainer}>
              {item.ports.map((port, index) => (
                <View key={port} style={[styles.portBadge, { backgroundColor: theme.colors.background }]}>
                  <Text style={[styles.portText, { color: theme.colors.text }]}>{port}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.containerActions}>
          {item.status === 'running' ? (
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#FF3B3020' }]}>
              <Square size={16} color="#FF3B30" />
              <Text style={[styles.actionButtonText, { color: '#FF3B30' }]}>Stop</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#34C75920' }]}>
              <Play size={16} color="#34C759" />
              <Text style={[styles.actionButtonText, { color: '#34C759' }]}>Start</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.background }]}>
            <Terminal size={16} color={theme.colors.text} />
            <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>Logs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.background }]}>
            <Settings size={16} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCluster = ({ item }: { item: Cluster }) => {
    const statusColor = getStatusColor(item.status);
    return (
      <TouchableOpacity
        testID={`cluster-card-${item.id}`}
        onPress={() => setSelectedCluster(item.id)}
        style={[
          styles.clusterCard,
          {
            backgroundColor: theme.colors.cardBackground,
            borderColor: selectedCluster === item.id ? theme.colors.primary : theme.colors.border,
          },
        ]}
      >
        <View style={styles.clusterHeader}>
          <View style={[styles.clusterIcon, { backgroundColor: `${statusColor}20` }]}>
            <Cloud size={18} color={statusColor} />
          </View>
          <View style={styles.clusterInfo}>
            <Text style={[styles.clusterName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.clusterMeta, { color: theme.colors.secondaryText }]}>v{item.version} • {item.nodes} nodes</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>{item.controlPlane === 'healthy' ? 'Healthy' : 'Attention'}</Text>
          </View>
        </View>
        <View style={styles.clusterMetrics}>
          <View style={styles.clusterMetric}>
            <Text style={[styles.clusterMetricLabel, { color: theme.colors.secondaryText }]}>CPU</Text>
            <View style={[styles.clusterProgress, { backgroundColor: theme.colors.border }]}>
              <View style={[styles.clusterProgressFill, { width: `${item.cpu}%`, backgroundColor: item.cpu > 80 ? '#FF3B30' : '#34C759' }]} />
            </View>
            <Text style={[styles.clusterMetricValue, { color: theme.colors.text }]}>{item.cpu}%</Text>
          </View>
          <View style={styles.clusterMetric}>
            <Text style={[styles.clusterMetricLabel, { color: theme.colors.secondaryText }]}>Memory</Text>
            <View style={[styles.clusterProgress, { backgroundColor: theme.colors.border }]}>
              <View style={[styles.clusterProgressFill, { width: `${item.memory}%`, backgroundColor: item.memory > 80 ? '#FF3B30' : '#34C759' }]} />
            </View>
            <Text style={[styles.clusterMetricValue, { color: theme.colors.text }]}>{item.memory}%</Text>
          </View>
          <View style={styles.clusterMetric}>
            <Text style={[styles.clusterMetricLabel, { color: theme.colors.secondaryText }]}>Pods</Text>
            <Text style={[styles.clusterMetricValue, { color: theme.colors.text }]}>{item.pods}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderWorkload = ({ item }: { item: Workload }) => {
    const readyPercent = Math.round((item.podsReady / item.podsTotal) * 100);
    return (
      <View style={[styles.workloadCard, { backgroundColor: theme.colors.cardBackground }]} testID={`workload-card-${item.id}`}>
        <View style={styles.workloadHeader}>
          <Layers size={20} color={theme.colors.primary} />
          <View style={styles.workloadInfo}>
            <Text style={[styles.workloadName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.workloadMeta, { color: theme.colors.secondaryText }]}>{item.namespace} • {item.type}</Text>
          </View>
          <View style={[styles.workloadBadge, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.workloadBadgeText, { color: theme.colors.text }]}>{item.strategy.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.workloadProgressRow}>
          <View style={[styles.workloadProgress, { backgroundColor: theme.colors.border }]}>
            <View style={[styles.workloadProgressFill, { width: `${readyPercent}%`, backgroundColor: readyPercent === 100 ? '#34C759' : '#FF9500' }]} />
          </View>
          <Text style={[styles.workloadProgressText, { color: theme.colors.text }]}>{item.podsReady}/{item.podsTotal} pods</Text>
        </View>
        <View style={styles.workloadFooter}>
          <View style={styles.workloadVersion}>
            <GitBranch size={14} color={theme.colors.secondaryText} />
            <Text style={[styles.workloadVersionText, { color: theme.colors.secondaryText }]}>Version {item.version}</Text>
          </View>
          <TouchableOpacity style={[styles.promoteButton, { backgroundColor: theme.colors.primary }]}> 
            <Text style={styles.promoteButtonText}>Promote</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderPipeline = ({ item }: { item: Pipeline }) => (
    <View style={[styles.pipelineCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.pipelineHeader}>
        <Workflow size={18} color={theme.colors.primary} />
        <View style={styles.pipelineInfo}>
          <Text style={[styles.pipelineName, { color: theme.colors.text }]}>{item.name}</Text>
          <Text style={[styles.pipelineMeta, { color: theme.colors.secondaryText }]}>{item.environment.toUpperCase()} • {item.owner}</Text>
        </View>
        <View style={[styles.pipelineStatus, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.pipelineStatusText, { color: item.status === 'failed' ? '#FF3B30' : item.status === 'running' ? '#34C759' : theme.colors.text }]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>
      <Text style={[styles.pipelineDuration, { color: theme.colors.secondaryText }]}>Duration {item.duration}</Text>
    </View>
  );

  const renderImage = ({ item }: { item: ImageInfo }) => (
    <View style={[styles.imageCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.imageHeader}>
        <View style={[styles.imageIcon, { backgroundColor: '#007AFF20' }]}>
          <Layers size={24} color="#007AFF" />
        </View>
        <View style={styles.imageInfo}>
          <Text style={[styles.imageName, { color: theme.colors.text }]}>{item.repository}:{item.tag}</Text>
          <View style={styles.imageMeta}>
            <Text style={[styles.imageSize, { color: theme.colors.secondaryText }]}>{item.size}</Text>
            <Text style={[styles.imageSeparator, { color: theme.colors.secondaryText }]}>•</Text>
            <Text style={[styles.imageCreated, { color: theme.colors.secondaryText }]}>{item.created}</Text>
          </View>
        </View>
      </View>
      <View style={styles.imageFooter}>
        <View style={[styles.containersBadge, { backgroundColor: theme.colors.background }]}>
          <Box size={12} color={theme.colors.text} />
          <Text style={[styles.containersText, { color: theme.colors.text }]}>{item.containers} containers</Text>
        </View>
        <View style={styles.imageActions}>
          <TouchableOpacity style={styles.imageActionButton}>
            <Play size={14} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageActionButton}>
            <Trash2 size={14} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderVolume = ({ item }: { item: Volume }) => (
    <View style={[styles.volumeCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.volumeHeader}>
        <View style={[styles.volumeIcon, { backgroundColor: '#FF950020' }]}>
          <HardDrive size={24} color="#FF9500" />
        </View>
        <View style={styles.volumeInfo}>
          <Text style={[styles.volumeName, { color: theme.colors.text }]}>{item.name}</Text>
          <Text style={[styles.volumeMount, { color: theme.colors.secondaryText }]}>{item.mountPoint}</Text>
          <View style={styles.volumeMeta}>
            <Text style={[styles.volumeSize, { color: theme.colors.text }]}>{item.size}</Text>
            <Text style={[styles.separator, { color: theme.colors.secondaryText }]}>•</Text>
            <Text style={[styles.volumeDriver, { color: theme.colors.secondaryText }]}>{item.driver}</Text>
          </View>
        </View>
      </View>
      <View style={styles.volumeFooter}>
        <View style={[styles.containersBadge, { backgroundColor: theme.colors.background }]}>
          <Box size={12} color={theme.colors.text} />
          <Text style={[styles.containersText, { color: theme.colors.text }]}>{item.containers} containers</Text>
        </View>
        <TouchableOpacity>
          <Trash2 size={16} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRegistry = ({ item }: { item: Registry }) => {
    const statusColor = getStatusColor(item.status);

    return (
      <View style={[styles.registryCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.registryHeader}>
          <View style={[styles.registryIcon, { backgroundColor: `${statusColor}20` }]}>
            <Globe size={24} color={statusColor} />
          </View>
          <View style={styles.registryInfo}>
            <Text style={[styles.registryName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.registryUrl, { color: theme.colors.secondaryText }]}>{item.url}</Text>
            <View style={styles.registryMeta}>
              <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
                <Text style={[styles.statusText, { color: statusColor }]}>{item.status.toUpperCase()}</Text>
              </View>
              <View style={[styles.typeBadge, { backgroundColor: theme.colors.background }]}>
                <Text style={[styles.typeText, { color: theme.colors.text }]}>{item.type.toUpperCase()}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.registryFooter}>
          <Text style={[styles.imagesCount, { color: theme.colors.text }]}>{item.images} images</Text>
          <TouchableOpacity style={[styles.manageButton, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.manageButtonText}>Manage</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Containers</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Plus size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        {(['containers', 'images', 'volumes', 'registries'] as const).map((tab) => (
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

      {selectedTab === 'containers' && (
        <View style={styles.searchRow}>
          <View style={[styles.searchContainer, { backgroundColor: theme.colors.cardBackground }]}>
            <Search size={20} color={theme.colors.secondaryText} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder="Search containers, images, workloads"
              placeholderTextColor={theme.colors.secondaryText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <View style={styles.viewToggle}>
            {(['list', 'grid'] as const).map((mode) => (
              <TouchableOpacity
                key={mode}
                style={[styles.viewButton, viewMode === mode && { backgroundColor: theme.colors.primary }]}
                onPress={() => setViewMode(mode)}
              >
                <Text style={[styles.viewButtonText, { color: viewMode === mode ? '#FFFFFF' : theme.colors.secondaryText }]}>
                  {mode === 'list' ? 'List' : 'Grid'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {selectedTab === 'containers' && (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <View style={styles.statsRow}>
              <View style={[styles.statCard, { backgroundColor: '#34C75920' }]}
                testID="stat-card-running">
                <View style={[styles.statIcon, { backgroundColor: '#34C75930' }]}>
                  <Activity size={18} color="#34C759" />
                </View>
                <Text style={[styles.statValue, { color: '#34C759' }]}>{filteredContainers.filter((item) => item.status === 'running').length}</Text>
                <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Running</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: '#FF950020' }]}
                testID="stat-card-alerts">
                <View style={[styles.statIcon, { backgroundColor: '#FF950030' }]}>
                  <Shield size={18} color="#FF9500" />
                </View>
                <Text style={[styles.statValue, { color: '#FF9500' }]}>{workloads.length - activeWorkloads.length}</Text>
                <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Needs Attention</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}
                testID="stat-card-total">
                <View style={[styles.statIcon, { backgroundColor: 'rgba(0,0,0,0.05)' }]}>
                  <BarChart3 size={18} color={theme.colors.text} />
                </View>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>{filteredContainers.length}</Text>
                <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Total Services</Text>
              </View>
            </View>

            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Kubernetes Clusters</Text>
            <FlatList
              data={clusters}
              renderItem={renderCluster}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.clusterList}
            />

            <View style={[styles.autoscalerCard, { backgroundColor: theme.colors.cardBackground }]} testID="autoscaler-card">
              <View style={styles.cardHeader}>
                <Gauge size={18} color={theme.colors.primary} />
                <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Predictive Autoscaler</Text>
                <TouchableOpacity>
                  <RefreshCw size={16} color={theme.colors.secondaryText} />
                </TouchableOpacity>
              </View>
              <Text style={[styles.autoscalerSubtitle, { color: theme.colors.secondaryText }]}>Cluster burst capacity ready for +32 nodes in 4 regions</Text>
              <View style={styles.autoscalerRow}>
                <View style={styles.autoscalerMetric}>
                  <Text style={[styles.autoscalerLabel, { color: theme.colors.secondaryText }]}>SLO coverage</Text>
                  <Text style={[styles.autoscalerValue, { color: '#34C759' }]}>99.6%</Text>
                </View>
                <View style={styles.autoscalerMetric}>
                  <Text style={[styles.autoscalerLabel, { color: theme.colors.secondaryText }]}>Next window</Text>
                  <Text style={[styles.autoscalerValue, { color: theme.colors.text }]}>12 min</Text>
                </View>
                <View style={styles.autoscalerMetric}>
                  <Text style={[styles.autoscalerLabel, { color: theme.colors.secondaryText }]}>Savings</Text>
                  <Text style={[styles.autoscalerValue, { color: theme.colors.text }]}>$3.2k/mo</Text>
                </View>
              </View>
              <TouchableOpacity style={[styles.simulateButton, { backgroundColor: theme.colors.primary }]}>
                <Text style={styles.simulateButtonText}>Simulate Spike</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sectionHeaderRow}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Mission Critical Workloads</Text>
              <TouchableOpacity>
                <Text style={[styles.linkText, { color: theme.colors.primary }]}>Deploy new</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={workloads}
              renderItem={renderWorkload}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.workloadList}
            />

            <View style={styles.sectionHeaderRow}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Docker Containers</Text>
            </View>
            <FlatList
              data={filteredContainers}
              renderItem={renderContainer}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.list}
            />

            <View style={styles.sectionHeaderRow}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Delivery Pipelines</Text>
              <TouchableOpacity>
                <Text style={[styles.linkText, { color: theme.colors.primary }]}>View history</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={pipelines}
              renderItem={renderPipeline}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.pipelineList}
            />
          </View>
        </ScrollView>
      )}

      {selectedTab === 'images' && (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <FlatList
              data={images}
              renderItem={renderImage}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.list}
            />
          </View>
        </ScrollView>
      )}

      {selectedTab === 'volumes' && (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <FlatList
              data={volumes}
              renderItem={renderVolume}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.list}
            />
          </View>
        </ScrollView>
      )}

      {selectedTab === 'registries' && (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <FlatList
              data={registries}
              renderItem={renderRegistry}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.list}
            />
          </View>
        </ScrollView>
      )}
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
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  viewToggle: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  viewButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  viewButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    paddingBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 20,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
  },
  clusterList: {
    gap: 12,
    paddingVertical: 4,
  },
  clusterCard: {
    width: 260,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 12,
  },
  clusterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clusterIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  clusterInfo: {
    flex: 1,
  },
  clusterName: {
    fontSize: 16,
    fontWeight: '600',
  },
  clusterMeta: {
    fontSize: 12,
  },
  clusterMetrics: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
  },
  clusterMetric: {
    flex: 1,
  },
  clusterMetricLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  clusterProgress: {
    height: 6,
    borderRadius: 3,
    marginBottom: 6,
  },
  clusterProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  clusterMetricValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  autoscalerCard: {
    padding: 16,
    borderRadius: 16,
    marginVertical: 16,
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
  autoscalerSubtitle: {
    fontSize: 13,
    marginBottom: 12,
  },
  autoscalerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  autoscalerMetric: {
    flex: 1,
  },
  autoscalerLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  autoscalerValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  simulateButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  simulateButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  linkText: {
    fontSize: 13,
    fontWeight: '600',
  },
  list: {
    gap: 12,
  },
  containerCard: {
    padding: 16,
    borderRadius: 12,
  },
  containerHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  containerIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  containerInfo: {
    flex: 1,
  },
  containerName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  containerImage: {
    fontSize: 13,
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
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  containerMetrics: {
    marginBottom: 16,
  },
  metricRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  metricItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metricValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  metricLabel: {
    fontSize: 11,
  },
  uptimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  uptimeText: {
    fontSize: 12,
  },
  restartText: {
    fontSize: 12,
  },
  portsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  portBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  portText: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  containerActions: {
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
  workloadList: {
    gap: 12,
    marginBottom: 16,
  },
  workloadCard: {
    padding: 16,
    borderRadius: 16,
  },
  workloadHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  workloadInfo: {
    flex: 1,
  },
  workloadName: {
    fontSize: 16,
    fontWeight: '600',
  },
  workloadMeta: {
    fontSize: 12,
  },
  workloadBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  workloadBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  workloadProgressRow: {
    marginTop: 12,
    marginBottom: 8,
  },
  workloadProgress: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  workloadProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  workloadProgressText: {
    marginTop: 6,
    fontSize: 12,
  },
  workloadFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  workloadVersion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  workloadVersionText: {
    fontSize: 12,
  },
  promoteButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  promoteButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  pipelineList: {
    gap: 12,
    marginBottom: 24,
  },
  pipelineCard: {
    padding: 16,
    borderRadius: 14,
  },
  pipelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  pipelineInfo: {
    flex: 1,
  },
  pipelineName: {
    fontSize: 15,
    fontWeight: '600',
  },
  pipelineMeta: {
    fontSize: 12,
  },
  pipelineStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  pipelineStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  pipelineDuration: {
    fontSize: 12,
  },
  imageCard: {
    padding: 16,
    borderRadius: 12,
  },
  imageHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  imageIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  imageInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  imageName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    fontFamily: 'monospace',
  },
  imageMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  imageSize: {
    fontSize: 13,
  },
  imageSeparator: {
    fontSize: 13,
  },
  imageCreated: {
    fontSize: 13,
  },
  imageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containersBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 6,
  },
  containersText: {
    fontSize: 12,
    fontWeight: '600',
  },
  imageActions: {
    flexDirection: 'row',
    gap: 12,
  },
  imageActionButton: {
    padding: 8,
  },
  volumeCard: {
    padding: 16,
    borderRadius: 12,
  },
  volumeHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  volumeIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  volumeInfo: {
    flex: 1,
  },
  volumeName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  volumeMount: {
    fontSize: 12,
    marginBottom: 6,
    fontFamily: 'monospace',
  },
  volumeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  volumeSize: {
    fontSize: 13,
    fontWeight: '600',
  },
  separator: {
    fontSize: 13,
  },
  volumeDriver: {
    fontSize: 13,
  },
  volumeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  registryCard: {
    padding: 16,
    borderRadius: 12,
  },
  registryHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  registryIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  registryInfo: {
    flex: 1,
  },
  registryName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  registryUrl: {
    fontSize: 13,
    marginBottom: 8,
  },
  registryMeta: {
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
  registryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imagesCount: {
    fontSize: 14,
    fontWeight: '600',
  },
  manageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  manageButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});
