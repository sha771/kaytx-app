 
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
  Server,
  Database,
  HardDrive,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Cpu,
  MemoryStick,
  Wifi,
  Cloud,
  Globe,
  Zap,
  BarChart3,
  Settings,
  RefreshCw,
  Shield,
  Workflow,
  Split,
  DollarSign,
  CloudLightning,
  GitBranch,
  Layers,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface Infrastructure {
  id: string;
  name: string;
  type: 'compute' | 'storage' | 'database' | 'network' | 'cdn';
  status: 'healthy' | 'warning' | 'critical' | 'maintenance';
  region: string;
  usage: number;
  capacity: string;
  uptime: string;
  icon: React.ComponentType<any>;
  color: string;
  costs: number;
}

interface CloudMetric {
  label: string;
  value: string;
  change: string;
  unit: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface Region {
  id: string;
  name: string;
  code: string;
  status: 'active' | 'inactive';
  services: number;
  latency: string;
  carbon: string;
}

interface ResourcePool {
  id: string;
  name: string;
  owner: string;
  environment: 'production' | 'staging' | 'development';
  compliance: 'aligned' | 'drifted';
  drift: number;
  budget: number;
  usage: number;
  type: string;
}

interface AutomationPolicy {
  id: string;
  name: string;
  description: string;
  status: 'enforced' | 'monitoring';
  triggers: string[];
  lastRun: string;
  enforcement: number;
}

interface CostProjection {
  id: string;
  label: string;
  monthlyCost: number;
  forecast: number;
  variance: number;
  icon: React.ComponentType<any>;
  color: string;
}

interface IaCTemplate {
  id: string;
  name: string;
  provider: 'aws' | 'azure' | 'gcp' | 'hybrid';
  resources: number;
  lastDeployed: string;
  status: 'in_sync' | 'drift_detected';
}

const infrastructure: Infrastructure[] = [
  {
    id: '1',
    name: 'API Server Cluster',
    type: 'compute',
    status: 'healthy',
    region: 'us-east-1',
    usage: 68,
    capacity: '8 instances',
    uptime: '99.99%',
    icon: Server,
    color: '#007AFF',
    costs: 4820,
  },
  {
    id: '2',
    name: 'PostgreSQL Primary',
    type: 'database',
    status: 'healthy',
    region: 'us-east-1',
    usage: 45,
    capacity: '1TB',
    uptime: '99.95%',
    icon: Database,
    color: '#34C759',
    costs: 2190,
  },
  {
    id: '3',
    name: 'Object Storage',
    type: 'storage',
    status: 'healthy',
    region: 'us-west-2',
    usage: 72,
    capacity: '15TB',
    uptime: '99.99%',
    icon: HardDrive,
    color: '#FF9500',
    costs: 1420,
  },
  {
    id: '4',
    name: 'Load Balancer',
    type: 'network',
    status: 'warning',
    region: 'us-east-1',
    usage: 85,
    capacity: '10Gbps',
    uptime: '99.90%',
    icon: Wifi,
    color: '#AF52DE',
    costs: 960,
  },
  {
    id: '5',
    name: 'CDN Network',
    type: 'cdn',
    status: 'healthy',
    region: 'global',
    usage: 55,
    capacity: '500TB/mo',
    uptime: '99.99%',
    icon: Globe,
    color: '#5AC8FA',
    costs: 1780,
  },
  {
    id: '6',
    name: 'Cache Cluster',
    type: 'database',
    status: 'maintenance',
    region: 'eu-west-1',
    usage: 0,
    capacity: '64GB',
    uptime: '99.95%',
    icon: Zap,
    color: '#FF3B30',
    costs: 620,
  },
];

const cloudMetrics: CloudMetric[] = [
  {
    label: 'Total Requests',
    value: '124M',
    change: '+15%',
    unit: '/month',
    icon: Activity,
    color: '#007AFF',
  },
  {
    label: 'Data Transfer',
    value: '8.5TB',
    change: '+8%',
    unit: '/month',
    icon: TrendingUp,
    color: '#34C759',
  },
  {
    label: 'CPU Usage',
    value: '68%',
    change: '+12%',
    unit: 'avg',
    icon: Cpu,
    color: '#FF9500',
  },
  {
    label: 'Memory Usage',
    value: '5.2GB',
    change: '+5%',
    unit: 'avg',
    icon: MemoryStick,
    color: '#AF52DE',
  },
];

const regions: Region[] = [
  {
    id: '1',
    name: 'US East (N. Virginia)',
    code: 'us-east-1',
    status: 'active',
    services: 8,
    latency: '12ms',
    carbon: '112 gCO₂e',
  },
  {
    id: '2',
    name: 'US West (Oregon)',
    code: 'us-west-2',
    status: 'active',
    services: 4,
    latency: '45ms',
    carbon: '98 gCO₂e',
  },
  {
    id: '3',
    name: 'EU (Ireland)',
    code: 'eu-west-1',
    status: 'active',
    services: 6,
    latency: '89ms',
    carbon: '187 gCO₂e',
  },
  {
    id: '4',
    name: 'Asia Pacific (Tokyo)',
    code: 'ap-northeast-1',
    status: 'inactive',
    services: 0,
    latency: '-',
    carbon: '-',
  },
];

const resourcePools: ResourcePool[] = [
  {
    id: 'pool-1',
    name: 'Customer APIs',
    owner: 'Growth Platform',
    environment: 'production',
    compliance: 'aligned',
    drift: 1,
    budget: 6000,
    usage: 72,
    type: 'Kubernetes',
  },
  {
    id: 'pool-2',
    name: 'Realtime Analytics',
    owner: 'Data Platform',
    environment: 'production',
    compliance: 'drifted',
    drift: 14,
    budget: 8200,
    usage: 88,
    type: 'GPU Cluster',
  },
  {
    id: 'pool-3',
    name: 'Experimentation',
    owner: 'Labs',
    environment: 'staging',
    compliance: 'aligned',
    drift: 0,
    budget: 3200,
    usage: 41,
    type: 'Serverless',
  },
];

const automationPolicies: AutomationPolicy[] = [
  {
    id: 'auto-1',
    name: 'Predictive Autoscale',
    description: 'AI scaling for traffic spikes',
    status: 'enforced',
    triggers: ['CPU > 65%', 'p95 > 180ms'],
    lastRun: '3m ago',
    enforcement: 98,
  },
  {
    id: 'auto-2',
    name: 'Cost Guardrails',
    description: 'Freeze non-critical infra at 110% spend',
    status: 'monitoring',
    triggers: ['Budget > 110%'],
    lastRun: '12m ago',
    enforcement: 76,
  },
  {
    id: 'auto-3',
    name: 'Security Baseline',
    description: 'Auto remediate public S3 buckets',
    status: 'enforced',
    triggers: ['Non-compliant bucket'],
    lastRun: '28m ago',
    enforcement: 100,
  },
];

const costProjections: CostProjection[] = [
  {
    id: 'cost-1',
    label: 'Compute',
    monthlyCost: 18240,
    forecast: 19400,
    variance: 6,
    icon: Server,
    color: '#007AFF',
  },
  {
    id: 'cost-2',
    label: 'Storage',
    monthlyCost: 6400,
    forecast: 6200,
    variance: -3,
    icon: HardDrive,
    color: '#34C759',
  },
  {
    id: 'cost-3',
    label: 'Network',
    monthlyCost: 4200,
    forecast: 5400,
    variance: 9,
    icon: Wifi,
    color: '#FF9500',
  },
];

const iacTemplates: IaCTemplate[] = [
  {
    id: 'template-1',
    name: 'HIPAA Prod Baseline',
    provider: 'aws',
    resources: 124,
    lastDeployed: 'Today • 09:14',
    status: 'in_sync',
  },
  {
    id: 'template-2',
    name: 'EU Data Residency',
    provider: 'azure',
    resources: 87,
    lastDeployed: 'Yesterday • 20:45',
    status: 'drift_detected',
  },
  {
    id: 'template-3',
    name: 'Zero-Trust Mesh',
    provider: 'hybrid',
    resources: 56,
    lastDeployed: '3 days ago',
    status: 'in_sync',
  },
];

export default function CloudInfrastructureScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'resources' | 'regions'>('overview');
  const [selectedEnvironment, setSelectedEnvironment] = useState<'all' | 'production' | 'staging' | 'development'>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'active':
      case 'aligned':
      case 'in_sync':
        return '#34C759';
      case 'warning':
      case 'monitoring':
      case 'drift_detected':
        return '#FF9500';
      case 'critical':
      case 'drifted':
        return '#FF3B30';
      case 'maintenance':
      case 'inactive':
        return '#8E8E93';
      default:
        return theme.colors.secondaryText;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'aligned':
      case 'in_sync':
        return CheckCircle;
      case 'warning':
      case 'monitoring':
      case 'drift_detected':
        return AlertTriangle;
      case 'critical':
      case 'drifted':
        return AlertTriangle;
      case 'maintenance':
      default:
        return Settings;
    }
  };

  const filteredPools = useMemo(() => {
    if (selectedEnvironment === 'all') {
      return resourcePools;
    }
    return resourcePools.filter((pool) => pool.environment === selectedEnvironment);
  }, [selectedEnvironment]);

  const totalSpend = useMemo(() =>
    infrastructure.reduce((sum, item) => sum + item.costs, 0),
  []);

  const renderInfrastructure = ({ item }: { item: Infrastructure }) => {
    const IconComponent = item.icon;
    const StatusIcon = getStatusIcon(item.status);
    const statusColor = getStatusColor(item.status);

    return (
      <TouchableOpacity
        testID={`infra-card-${item.id}`}
        style={[styles.infraCard, { backgroundColor: theme.colors.cardBackground }]}
        activeOpacity={0.7}
      >
        <View style={styles.infraHeader}>
          <View style={[styles.infraIcon, { backgroundColor: `${item.color}20` }]}
            testID={`infra-icon-${item.id}`}>
            <IconComponent size={24} color={item.color} />
          </View>
          <View style={styles.infraInfo}>
            <Text style={[styles.infraName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.infraRegion, { color: theme.colors.secondaryText }]}
              testID={`infra-region-${item.id}`}>
              {item.region}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}
            testID={`infra-status-${item.id}`}>
            <StatusIcon size={12} color={statusColor} />
            <Text style={[styles.statusText, { color: statusColor }]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.infraDetails}>
          <View style={styles.usageContainer}>
            <View style={styles.usageHeader}>
              <Text style={[styles.usageLabel, { color: theme.colors.secondaryText }]}>Usage</Text>
              <Text style={[styles.usageValue, { color: theme.colors.text }]}>{item.usage}%</Text>
            </View>
            <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
              <View
                style={[styles.progressFill, {
                  backgroundColor: item.usage > 80 ? '#FF3B30' : item.usage > 60 ? '#FF9500' : '#34C759',
                  width: `${item.usage}%`,
                }]}
              />
            </View>
          </View>

          <View style={styles.infraMeta}>
            <View style={styles.metaItem}>
              <Text style={[styles.metaLabel, { color: theme.colors.secondaryText }]}>Capacity</Text>
              <Text style={[styles.metaValue, { color: theme.colors.text }]}>{item.capacity}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={[styles.metaLabel, { color: theme.colors.secondaryText }]}>Uptime</Text>
              <Text style={[styles.metaValue, { color: theme.colors.text }]}>{item.uptime}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={[styles.metaLabel, { color: theme.colors.secondaryText }]}>Monthly</Text>
              <Text style={[styles.metaValue, { color: theme.colors.text }]}>${item.costs.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        <View style={styles.infraActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Settings size={16} color={theme.colors.text} />
            <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>Configure</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <BarChart3 size={16} color={theme.colors.text} />
            <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>Metrics</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderMetric = ({ item }: { item: CloudMetric }) => {
    const IconComponent = item.icon;

    return (
      <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`cloud-metric-${item.label}`}>
        <View style={[styles.metricIcon, { backgroundColor: `${item.color}20` }]}
          testID={`cloud-metric-icon-${item.label}`}>
          <IconComponent size={20} color={item.color} />
        </View>
        <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.value}</Text>
        <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>
          {item.label}
        </Text>
        <Text style={[styles.metricUnit, { color: theme.colors.secondaryText }]}>
          {item.unit}
        </Text>
        <Text style={[styles.metricChange, {
          color: item.change.startsWith('+') ? '#34C759' : '#FF3B30',
        }]}
        >
          {item.change}
        </Text>
      </View>
    );
  };

  const renderRegion = ({ item }: { item: Region }) => {
    const statusColor = getStatusColor(item.status);

    return (
      <View style={[styles.regionCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`region-card-${item.code}`}>
        <View style={styles.regionHeader}>
          <View style={[styles.regionIcon, { backgroundColor: `${statusColor}20` }]}
            testID={`region-icon-${item.code}`}>
            <Globe size={24} color={statusColor} />
          </View>
          <View style={styles.regionInfo}>
            <Text style={[styles.regionName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.regionCode, { color: theme.colors.secondaryText }]}
              testID={`region-code-${item.code}`}>
              {item.code}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.regionStats}>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Services</Text>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{item.services}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Latency</Text>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{item.latency}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Carbon</Text>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{item.carbon}</Text>
          </View>
          <TouchableOpacity
            style={[styles.manageButton, {
              backgroundColor: item.status === 'active' ? theme.colors.primary : theme.colors.border,
            }]}
            disabled={item.status === 'inactive'}
          >
            <Text style={[styles.manageButtonText, {
              color: item.status === 'active' ? '#FFFFFF' : theme.colors.secondaryText,
            }]}
            >
              Manage
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderPool = ({ item }: { item: ResourcePool }) => {
    const statusColor = getStatusColor(item.compliance);
    return (
      <View style={[styles.poolCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.poolHeader}>
          <View style={[styles.poolBadge, { backgroundColor: `${statusColor}20` }]}
            testID={`pool-status-${item.id}`}>
            <Shield size={16} color={statusColor} />
          </View>
          <View style={styles.poolInfo}>
            <Text style={[styles.poolName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.poolMeta, { color: theme.colors.secondaryText }]}>
              {item.owner} • {item.type}
            </Text>
          </View>
          <View style={styles.poolCompliance}>
            <Text style={[styles.poolComplianceText, { color: statusColor }]}>
              {item.compliance === 'aligned' ? 'Compliant' : `Drift ${item.drift}%`}
            </Text>
          </View>
        </View>
        <View style={styles.poolBody}>
          <View style={styles.poolStat}>
            <Text style={[styles.poolStatLabel, { color: theme.colors.secondaryText }]}>Budget</Text>
            <Text style={[styles.poolStatValue, { color: theme.colors.text }]}>${item.budget.toLocaleString()}</Text>
          </View>
          <View style={styles.poolStat}>
            <Text style={[styles.poolStatLabel, { color: theme.colors.secondaryText }]}>Usage</Text>
            <Text style={[styles.poolStatValue, { color: theme.colors.text }]}>{item.usage}%</Text>
            <View style={[styles.poolUsageBar, { backgroundColor: theme.colors.border }]}>
              <View style={[styles.poolUsageFill, {
                width: `${item.usage}%`,
                backgroundColor: item.usage > 80 ? '#FF3B30' : '#34C759',
              }]} />
            </View>
          </View>
        </View>
        <View style={styles.poolFooter}>
          <Text style={[styles.poolEnv, { color: theme.colors.secondaryText }]}
            testID={`pool-env-${item.id}`}>
            {item.environment.toUpperCase()}
          </Text>
          <TouchableOpacity style={[styles.poolButton, { backgroundColor: theme.colors.background }]}>
            <Workflow size={14} color={theme.colors.text} />
            <Text style={[styles.poolButtonText, { color: theme.colors.text }]}>Open Runbook</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderAutomationPolicy = ({ item }: { item: AutomationPolicy }) => {
    const badgeColor = getStatusColor(item.status);
    return (
      <View style={[styles.policyCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`policy-card-${item.id}`}>
        <View style={styles.policyHeader}>
          <View style={[styles.policyIcon, { backgroundColor: `${badgeColor}20` }]}
            testID={`policy-icon-${item.id}`}>
            <Split size={18} color={badgeColor} />
          </View>
          <View style={styles.policyInfo}>
            <Text style={[styles.policyName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.policyDescription, { color: theme.colors.secondaryText }]}>{item.description}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: `${badgeColor}20` }]}
            testID={`policy-status-${item.id}`}>
            <Text style={[styles.statusText, { color: badgeColor }]}>{item.status.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.policyFooter}>
          <View style={styles.policyTriggers}>
            {item.triggers.map((trigger) => (
              <View key={trigger} style={[styles.triggerBadge, { backgroundColor: theme.colors.background }]}>
                <Text style={[styles.triggerText, { color: theme.colors.text }]}>{trigger}</Text>
              </View>
            ))}
          </View>
          <Text style={[styles.policyMeta, { color: theme.colors.secondaryText }]}>Last run {item.lastRun}</Text>
          <View style={styles.policyEnforcement}>
            <Text style={[styles.policyEnforcementLabel, { color: theme.colors.secondaryText }]}>Enforcement</Text>
            <View style={[styles.policyEnforcementBar, { backgroundColor: theme.colors.border }]}>
              <View style={[styles.policyEnforcementFill, {
                width: `${item.enforcement}%`,
                backgroundColor: item.enforcement > 90 ? '#34C759' : '#FF9500',
              }]} />
            </View>
            <Text style={[styles.policyEnforcementValue, { color: theme.colors.text }]}>{item.enforcement}%</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderCostCard = ({ item }: { item: CostProjection }) => {
    const IconComponent = item.icon;
    const varianceColor = item.variance >= 0 ? '#FF9500' : '#34C759';
    return (
      <View style={[styles.costCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={[styles.costIcon, { backgroundColor: `${item.color}20` }]}
          testID={`cost-icon-${item.id}`}>
          <IconComponent size={20} color={item.color} />
        </View>
        <Text style={[styles.costLabel, { color: theme.colors.secondaryText }]}>{item.label}</Text>
        <Text style={[styles.costValue, { color: theme.colors.text }]}>${item.monthlyCost.toLocaleString()}</Text>
        <View style={styles.costMeta}>
          <Text style={[styles.costMetaText, { color: theme.colors.secondaryText }]}>Forecast ${item.forecast.toLocaleString()}</Text>
          <Text style={[styles.costVariance, { color: varianceColor }]}
            testID={`cost-variance-${item.id}`}>
            {item.variance >= 0 ? '+' : ''}{item.variance}%
          </Text>
        </View>
      </View>
    );
  };

  const renderTemplate = ({ item }: { item: IaCTemplate }) => {
    const statusColor = getStatusColor(item.status);
    return (
      <View style={[styles.templateCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`iac-template-${item.id}`}>
        <View style={styles.templateHeader}>
          <View style={[styles.templateIcon, { backgroundColor: `${statusColor}20` }]}>
            <GitBranch size={18} color={statusColor} />
          </View>
          <View style={styles.templateInfo}>
            <Text style={[styles.templateName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.templateMeta, { color: theme.colors.secondaryText }]}>
              {item.resources} resources • {item.provider.toUpperCase()}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}
            testID={`template-status-${item.id}`}>
            <Text style={[styles.statusText, { color: statusColor }]}>
              {item.status === 'in_sync' ? 'In Sync' : 'Drift Detected'}
            </Text>
          </View>
        </View>
        <View style={styles.templateFooter}>
          <Text style={[styles.templateTime, { color: theme.colors.secondaryText }]}>Last deployed {item.lastDeployed}</Text>
          <TouchableOpacity style={[styles.templateButton, { backgroundColor: theme.colors.background }]}>
            <Layers size={14} color={theme.colors.text} />
            <Text style={[styles.templateButtonText, { color: theme.colors.text }]}>Deploy</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}
        testID="cloud-infra-header">
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Cloud Infrastructure</Text>
        <TouchableOpacity style={styles.headerButton}>
          <RefreshCw size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}
        testID="cloud-infra-tabs">
        {(['overview', 'resources', 'regions'] as const).map((tab) => (
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
          <View style={styles.section} testID="cloud-overview-section">
            <View style={[styles.overviewCard, { backgroundColor: 'rgba(0,122,255,0.08)' }]}>
              <Cloud size={32} color={theme.colors.primary} />
              <Text style={[styles.overviewTitle, { color: theme.colors.text }]}>Unified Control Plane</Text>
              <Text style={[styles.overviewDescription, { color: theme.colors.secondaryText }]}>
                {resourcePools.length} resource pools • ${totalSpend.toLocaleString()} monthly spend • 99.97% uptime
              </Text>
            </View>

            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Metrics</Text>
            <FlatList
              data={cloudMetrics}
              renderItem={renderMetric}
              keyExtractor={(item) => item.label}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.metricsContainer}
            />

            <View style={styles.environmentSwitcher}>
              {(['all', 'production', 'staging', 'development'] as const).map((env) => (
                <TouchableOpacity
                  key={env}
                  style={[styles.environmentChip, selectedEnvironment === env && { backgroundColor: theme.colors.primary }]}
                  onPress={() => setSelectedEnvironment(env)}
                >
                  <Text style={[styles.environmentText, { color: selectedEnvironment === env ? '#FFFFFF' : theme.colors.secondaryText }]}>
                    {env === 'all' ? 'All Environments' : env.charAt(0).toUpperCase() + env.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: 24 }]}>Resource Pools</Text>
            <FlatList
              data={filteredPools}
              renderItem={renderPool}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.poolList}
            />

            <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: 24 }]}>Automation Policies</Text>
            <FlatList
              data={automationPolicies}
              renderItem={renderAutomationPolicy}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.policyList}
            />

            <View style={styles.dualRow}>
              <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]} testID="cost-forecast-card">
                <View style={styles.cardHeader}>
                  <DollarSign size={18} color={theme.colors.primary} />
                  <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Cost & Capacity</Text>
                  <TouchableOpacity>
                    <Settings size={16} color={theme.colors.secondaryText} />
                  </TouchableOpacity>
                </View>
                <Text style={[styles.cardSubtitle, { color: theme.colors.secondaryText }]}>Next 90 days forecast</Text>
                <FlatList
                  data={costProjections}
                  renderItem={renderCostCard}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                  contentContainerStyle={styles.costList}
                />
              </View>

              <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]} testID="autoscale-card">
                <View style={styles.cardHeader}>
                  <CloudLightning size={18} color={theme.colors.primary} />
                  <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Autoscaling Mesh</Text>
                  <TouchableOpacity>
                    <RefreshCw size={16} color={theme.colors.secondaryText} />
                  </TouchableOpacity>
                </View>
                <View style={styles.autoscaleRow}>
                  <View style={styles.autoscaleColumn}>
                    <Text style={[styles.autoscaleLabel, { color: theme.colors.secondaryText }]}>Policy</Text>
                    <Text style={[styles.autoscaleValue, { color: theme.colors.text }]}>AI Predictive</Text>
                  </View>
                  <View style={styles.autoscaleColumn}>
                    <Text style={[styles.autoscaleLabel, { color: theme.colors.secondaryText }]}>Window</Text>
                    <Text style={[styles.autoscaleValue, { color: theme.colors.text }]}>15 min</Text>
                  </View>
                  <View style={styles.autoscaleColumn}>
                    <Text style={[styles.autoscaleLabel, { color: theme.colors.secondaryText }]}>Actions</Text>
                    <Text style={[styles.autoscaleValue, { color: theme.colors.text }]}>3 queued</Text>
                  </View>
                </View>
                <View style={[styles.autoscaleMetricRow, { backgroundColor: theme.colors.background }]}>
                  <View>
                    <Text style={[styles.autoscaleMetricLabel, { color: theme.colors.secondaryText }]}>Burst Capacity</Text>
                    <Text style={[styles.autoscaleMetricValue, { color: theme.colors.text }]}>+24 nodes</Text>
                  </View>
                  <View>
                    <Text style={[styles.autoscaleMetricLabel, { color: theme.colors.secondaryText }]}>SLO Coverage</Text>
                    <Text style={[styles.autoscaleMetricValue, { color: '#34C759' }]}>99.4%</Text>
                  </View>
                </View>
                <TouchableOpacity style={[styles.autoscaleButton, { backgroundColor: theme.colors.primary }]}>
                  <Text style={styles.autoscaleButtonText}>Simulate Spike</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: 24 }]}>Infrastructure as Code</Text>
            <FlatList
              data={iacTemplates}
              renderItem={renderTemplate}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.templateList}
            />

            <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: 24 }]}>Global Fabric</Text>
            <View style={[styles.topologyCard, { backgroundColor: theme.colors.cardBackground }]}>
              <View style={styles.topologyHeader}>
                <Wifi size={18} color={theme.colors.primary} />
                <Text style={[styles.topologyTitle, { color: theme.colors.text }]}>Network Topology</Text>
              </View>
              <View style={styles.topologyGrid}>
                <View style={[styles.topologyNode, { borderColor: theme.colors.primary }]}>
                  <Text style={[styles.topologyNodeText, { color: theme.colors.text }]}>US-EAST</Text>
                  <Text style={[styles.topologyNodeSub, { color: theme.colors.secondaryText }]}>6 services</Text>
                </View>
                <View style={styles.topologyLink}>
                  <Text style={[styles.topologyLatency, { color: theme.colors.secondaryText }]}>+18ms</Text>
                </View>
                <View style={[styles.topologyNode, { borderColor: '#34C759' }]}>
                  <Text style={[styles.topologyNodeText, { color: theme.colors.text }]}>EU-WEST</Text>
                  <Text style={[styles.topologyNodeSub, { color: theme.colors.secondaryText }]}>5 services</Text>
                </View>
              </View>
              <View style={styles.topologyGrid}>
                <View style={[styles.topologyNode, { borderColor: '#FF9500' }]}>
                  <Text style={[styles.topologyNodeText, { color: theme.colors.text }]}>US-WEST</Text>
                  <Text style={[styles.topologyNodeSub, { color: theme.colors.secondaryText }]}>4 services</Text>
                </View>
                <View style={styles.topologyLink}>
                  <Text style={[styles.topologyLatency, { color: '#FF9500' }]}>Route Optimized</Text>
                </View>
                <View style={[styles.topologyNode, { borderColor: '#8E8E93' }]}>
                  <Text style={[styles.topologyNodeText, { color: theme.colors.text }]}>APAC</Text>
                  <Text style={[styles.topologyNodeSub, { color: theme.colors.secondaryText }]}>Standby</Text>
                </View>
              </View>
            </View>

            <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: 24 }]}>All Resources</Text>
            <FlatList
              data={infrastructure}
              renderItem={renderInfrastructure}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.infraList}
            />
          </View>
        )}

        {selectedTab === 'resources' && (
          <View style={styles.section} testID="cloud-resources-section">
            <FlatList
              data={infrastructure}
              renderItem={renderInfrastructure}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.infraList}
            />
          </View>
        )}

        {selectedTab === 'regions' && (
          <View style={styles.section} testID="cloud-regions-section">
            <View style={styles.regionsInfo}>
              <Globe size={24} color={theme.colors.primary} />
              <Text style={[styles.regionsInfoText, { color: theme.colors.secondaryText }]}>Manage active-active regions, carbon footprint, and failover orchestration</Text>
            </View>
            <FlatList
              data={regions}
              renderItem={renderRegion}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.regionsList}
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
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  tabText: {
    fontSize: 14,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  metricsContainer: {
    gap: 12,
    paddingBottom: 8,
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
  environmentSwitcher: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  environmentChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  environmentText: {
    fontSize: 12,
    fontWeight: '600',
  },
  poolList: {
    gap: 12,
  },
  poolCard: {
    padding: 16,
    borderRadius: 16,
  },
  poolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  poolBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  poolInfo: {
    flex: 1,
  },
  poolName: {
    fontSize: 16,
    fontWeight: '600',
  },
  poolMeta: {
    fontSize: 12,
  },
  poolCompliance: {},
  poolComplianceText: {
    fontSize: 12,
    fontWeight: '600',
  },
  poolBody: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  poolStat: {
    flex: 1,
  },
  poolStatLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  poolStatValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  poolUsageBar: {
    height: 5,
    borderRadius: 3,
    marginTop: 6,
  },
  poolUsageFill: {
    height: '100%',
    borderRadius: 3,
  },
  poolFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  poolEnv: {
    fontSize: 12,
    fontWeight: '600',
  },
  poolButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  poolButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  policyList: {
    gap: 12,
  },
  policyCard: {
    padding: 16,
    borderRadius: 16,
  },
  policyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  policyIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  policyInfo: {
    flex: 1,
  },
  policyName: {
    fontSize: 16,
    fontWeight: '600',
  },
  policyDescription: {
    fontSize: 13,
  },
  policyFooter: {
    marginTop: 12,
  },
  policyTriggers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  triggerBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  triggerText: {
    fontSize: 12,
    fontWeight: '600',
  },
  policyMeta: {
    fontSize: 12,
    marginBottom: 12,
  },
  policyEnforcement: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  policyEnforcementLabel: {
    fontSize: 12,
  },
  policyEnforcementBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  policyEnforcementFill: {
    height: '100%',
    borderRadius: 3,
  },
  policyEnforcementValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  dualRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 24,
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
    marginBottom: 8,
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  cardSubtitle: {
    fontSize: 13,
    marginBottom: 12,
  },
  costList: {
    gap: 10,
  },
  costCard: {
    padding: 12,
    borderRadius: 12,
  },
  costIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  costLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
  },
  costValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  costMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  costMetaText: {
    fontSize: 12,
  },
  costVariance: {
    fontSize: 12,
    fontWeight: '700',
  },
  autoscaleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  autoscaleColumn: {
    flex: 1,
  },
  autoscaleLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  autoscaleValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  autoscaleMetricRow: {
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  autoscaleMetricLabel: {
    fontSize: 12,
  },
  autoscaleMetricValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  autoscaleButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  autoscaleButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  templateList: {
    gap: 12,
  },
  templateCard: {
    padding: 16,
    borderRadius: 16,
  },
  templateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  templateIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  templateInfo: {
    flex: 1,
  },
  templateName: {
    fontSize: 16,
    fontWeight: '600',
  },
  templateMeta: {
    fontSize: 13,
  },
  templateFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  templateTime: {
    fontSize: 12,
  },
  templateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  templateButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  topologyCard: {
    padding: 16,
    borderRadius: 16,
  },
  topologyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  topologyTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  topologyGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  topologyNode: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 4,
  },
  topologyNodeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  topologyNodeSub: {
    fontSize: 12,
  },
  topologyLink: {
    paddingHorizontal: 8,
  },
  topologyLatency: {
    fontSize: 10,
    fontWeight: '600',
  },
  infraList: {
    gap: 16,
  },
  infraCard: {
    padding: 16,
    borderRadius: 16,
  },
  infraHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infraIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infraInfo: {
    flex: 1,
  },
  infraName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  infraRegion: {
    fontSize: 13,
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
  infraDetails: {
    marginBottom: 16,
  },
  usageContainer: {
    marginBottom: 12,
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
  usageValue: {
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
  infraMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  infraActions: {
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
  regionsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0,122,255,0.1)',
    borderRadius: 12,
    marginBottom: 20,
    gap: 12,
  },
  regionsInfoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  regionsList: {
    gap: 12,
  },
  regionCard: {
    padding: 16,
    borderRadius: 12,
  },
  regionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  regionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  regionInfo: {
    flex: 1,
  },
  regionName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  regionCode: {
    fontSize: 13,
    fontFamily: 'monospace',
  },
  regionStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  manageButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  manageButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
