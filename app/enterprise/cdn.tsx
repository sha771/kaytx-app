 
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
  Globe,
  Zap,
  TrendingUp,
  Activity,
  MapPin,
  Server,
  Shield,
  CheckCircle,
  AlertTriangle,
  Clock,
  Wifi,
  BarChart3,
  Settings,
  RefreshCw,
  Eye,
  Lock,
  Gauge,
  Target,
  Layers,
  Router,
  CloudLightning,
  Timer,
  Filter,
  Trash2,
  SignalHigh,
  ShieldCheck,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface CDNMetric {
  id: string;
  label: string;
  value: string;
  change: number;
  unit: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface EdgeLocation {
  id: string;
  name: string;
  region: string;
  status: 'active' | 'degraded' | 'maintenance';
  latency: string;
  traffic: string;
  requests: string;
  cacheHitRate: number;
  uptime: string;
  zeroTrust: string;
  bandwidthReserve: string;
}

interface CacheRule {
  id: string;
  pattern: string;
  ttl: string;
  enabled: boolean;
  hitRate: number;
  requests: string;
  tier: 'edge' | 'regional' | 'origin';
}

interface SecurityRule {
  id: string;
  name: string;
  type: 'waf' | 'ddos' | 'bot-protection' | 'rate-limiting';
  enabled: boolean;
  threatsBlocked: string;
  description: string;
}

interface TrafficInsight {
  id: string;
  metric: string;
  value: string;
  change: number;
  region: string;
}

interface CacheAutomation {
  id: string;
  title: string;
  description: string;
  status: 'running' | 'paused';
  impact: string;
}

interface PurgeEvent {
  id: string;
  label: string;
  scope: string;
  duration: string;
  status: 'completed' | 'scheduled';
}

const metrics: CDNMetric[] = [
  {
    id: '1',
    label: 'Bandwidth',
    value: '45.2',
    change: 18,
    unit: 'TB/mo',
    icon: Wifi,
    color: '#007AFF',
  },
  {
    id: '2',
    label: 'Requests',
    value: '12.5M',
    change: 23,
    unit: '/day',
    icon: Activity,
    color: '#34C759',
  },
  {
    id: '3',
    label: 'Cache Hit Rate',
    value: '94.2',
    change: 5,
    unit: '%',
    icon: Zap,
    color: '#FF9500',
  },
  {
    id: '4',
    label: 'Avg Latency',
    value: '42',
    change: -12,
    unit: 'ms',
    icon: Gauge,
    color: '#AF52DE',
  },
];

const edgeLocations: EdgeLocation[] = [
  {
    id: '1',
    name: 'US East',
    region: 'us-east-1',
    status: 'active',
    latency: '12ms',
    traffic: '15.2 TB',
    requests: '4.2M/day',
    cacheHitRate: 96,
    uptime: '99.99%',
    zeroTrust: 'Verified users only',
    bandwidthReserve: '12%',
  },
  {
    id: '2',
    name: 'US West',
    region: 'us-west-1',
    status: 'active',
    latency: '18ms',
    traffic: '12.8 TB',
    requests: '3.5M/day',
    cacheHitRate: 94,
    uptime: '99.98%',
    zeroTrust: 'Device posture enforced',
    bandwidthReserve: '18%',
  },
  {
    id: '3',
    name: 'Europe',
    region: 'eu-west-1',
    status: 'active',
    latency: '28ms',
    traffic: '10.5 TB',
    requests: '2.8M/day',
    cacheHitRate: 92,
    uptime: '99.97%',
    zeroTrust: 'Geo fencing enabled',
    bandwidthReserve: '21%',
  },
  {
    id: '4',
    name: 'Asia Pacific',
    region: 'ap-southeast-1',
    status: 'degraded',
    latency: '45ms',
    traffic: '6.7 TB',
    requests: '2.0M/day',
    cacheHitRate: 89,
    uptime: '99.85%',
    zeroTrust: 'Adaptive auth',
    bandwidthReserve: '8%',
  },
];

const cacheRules: CacheRule[] = [
  {
    id: '1',
    pattern: '*.js, *.css',
    ttl: '1 year',
    enabled: true,
    hitRate: 98,
    requests: '5.2M',
    tier: 'edge',
  },
  {
    id: '2',
    pattern: '/api/static/*',
    ttl: '7 days',
    enabled: true,
    hitRate: 95,
    requests: '3.8M',
    tier: 'regional',
  },
  {
    id: '3',
    pattern: '/images/*',
    ttl: '30 days',
    enabled: true,
    hitRate: 92,
    requests: '2.5M',
    tier: 'edge',
  },
  {
    id: '4',
    pattern: '/api/dynamic/*',
    ttl: '5 minutes',
    enabled: false,
    hitRate: 0,
    requests: '0',
    tier: 'origin',
  },
];

const securityRules: SecurityRule[] = [
  {
    id: '1',
    name: 'Web Application Firewall',
    type: 'waf',
    enabled: true,
    threatsBlocked: '1,247',
    description: 'Protection against OWASP Top 10 vulnerabilities',
  },
  {
    id: '2',
    name: 'DDoS Protection',
    type: 'ddos',
    enabled: true,
    threatsBlocked: '845',
    description: 'Layer 3/4/7 DDoS mitigation',
  },
  {
    id: '3',
    name: 'Bot Protection',
    type: 'bot-protection',
    enabled: true,
    threatsBlocked: '3,521',
    description: 'Block malicious bots and scrapers',
  },
  {
    id: '4',
    name: 'Rate Limiting',
    type: 'rate-limiting',
    enabled: true,
    threatsBlocked: '12,458',
    description: 'Limit requests per IP address',
  },
];

const trafficInsights: TrafficInsight[] = [
  {
    id: 'na',
    metric: 'North America',
    value: '48% of traffic',
    change: 6,
    region: 'Low latency',
  },
  {
    id: 'eu',
    metric: 'Europe',
    value: '27% of traffic',
    change: -2,
    region: 'Adaptive routing',
  },
  {
    id: 'apac',
    metric: 'APAC',
    value: '19% of traffic',
    change: 8,
    region: 'Edge warm cache',
  },
  {
    id: 'latam',
    metric: 'LATAM',
    value: '6% of traffic',
    change: 3,
    region: 'Prefetched assets',
  },
];

const cacheAutomations: CacheAutomation[] = [
  {
    id: '1',
    title: 'Global Edge Prefetch',
    description: 'AI predicts next 200 assets per region and warms cache automatically',
    status: 'running',
    impact: '12% faster TTFB',
  },
  {
    id: '2',
    title: 'Tiered Cache Failover',
    description: 'Regional tiers replay cache instructions during origin brownouts',
    status: 'running',
    impact: '0 origin overloads',
  },
  {
    id: '3',
    title: 'Zero-downtime Purge Window',
    description: 'Rules batch invalidations and replay only invalidated objects',
    status: 'paused',
    impact: 'Queued for 21:00 UTC',
  },
];

const purgeEvents: PurgeEvent[] = [
  {
    id: '001',
    label: 'Emergency API purge',
    scope: '/v2/payments/*',
    duration: '42s',
    status: 'completed',
  },
  {
    id: '002',
    label: 'Media refresh wave',
    scope: '/media/2025/*',
    duration: '3m 11s',
    status: 'completed',
  },
  {
    id: '003',
    label: 'Next deploy safeguard',
    scope: '/app/*',
    duration: 'Scheduled 19:00 UTC',
    status: 'scheduled',
  },
];

export default function CDNScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'edge' | 'cache' | 'security' | 'ops'>('overview');
  const [focusedEdgeId, setFocusedEdgeId] = useState<string>(edgeLocations[0]?.id ?? '');
  const [selectedCacheRuleId, setSelectedCacheRuleId] = useState<string>(cacheRules[0]?.id ?? '');

  const focusedEdge = useMemo(() => edgeLocations.find((edge) => edge.id === focusedEdgeId), [focusedEdgeId]);
  const selectedCacheRule = useMemo(() => cacheRules.find((rule) => rule.id === selectedCacheRuleId), [selectedCacheRuleId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#34C759';
      case 'degraded':
        return '#FF9500';
      case 'maintenance':
        return '#8E8E93';
      default:
        return theme.colors.secondaryText;
    }
  };

  const renderMetric = ({ item }: { item: CDNMetric }) => {
    const IconComponent = item.icon;
    const changeColor = item.change > 0 ? '#34C759' : '#FF3B30';
    const TrendIcon = TrendingUp;

    return (
      <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`cdn-metric-${item.id}`}>
        <View style={[styles.metricIcon, { backgroundColor: `${item.color}20` }]}
          testID={`cdn-metric-icon-${item.id}`}>
          <IconComponent size={24} color={item.color} />
        </View>
        <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.value}</Text>
        <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>{item.label}</Text>
        <Text style={[styles.metricUnit, { color: theme.colors.secondaryText }]}>{item.unit}</Text>
        <View style={[styles.metricChange, { backgroundColor: `${changeColor}15` }]}
          testID={`cdn-metric-change-${item.id}`}>
          <TrendIcon size={10} color={changeColor} />
          <Text style={[styles.metricChangeText, { color: changeColor }]}>{Math.abs(item.change)}%</Text>
        </View>
      </View>
    );
  };

  const renderEdgeLocation = ({ item }: { item: EdgeLocation }) => {
    const statusColor = getStatusColor(item.status);
    const StatusIcon = item.status === 'active' ? CheckCircle : AlertTriangle;

    return (
      <TouchableOpacity
        style={[styles.edgeCard, { backgroundColor: theme.colors.cardBackground }]}
        onPress={() => setFocusedEdgeId(item.id)}
        activeOpacity={0.85}
        testID={`cdn-edge-card-${item.id}`}>
        <View style={styles.edgeHeader}>
          <View style={[styles.edgeIcon, { backgroundColor: `${statusColor}20` }]}
            testID={`cdn-edge-icon-${item.id}`}>
            <MapPin size={24} color={statusColor} />
          </View>
          <View style={styles.edgeInfo}>
            <Text style={[styles.edgeName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.edgeRegion, { color: theme.colors.secondaryText }]}>{item.region}</Text>
            <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}
              testID={`cdn-edge-status-${item.id}`}>
              <StatusIcon size={10} color={statusColor} />
              <Text style={[styles.statusText, { color: statusColor }]}>{item.status.toUpperCase()}</Text>
            </View>
          </View>
        </View>

        <View style={styles.edgeMetrics}>
          <View style={styles.edgeMetricRow}>
            <View style={styles.edgeMetric}>
              <Text style={[styles.edgeMetricLabel, { color: theme.colors.secondaryText }]}>Latency</Text>
              <Text style={[styles.edgeMetricValue, { color: theme.colors.text }]}>{item.latency}</Text>
            </View>
            <View style={styles.edgeMetric}>
              <Text style={[styles.edgeMetricLabel, { color: theme.colors.secondaryText }]}>Traffic</Text>
              <Text style={[styles.edgeMetricValue, { color: theme.colors.text }]}>{item.traffic}</Text>
            </View>
            <View style={styles.edgeMetric}>
              <Text style={[styles.edgeMetricLabel, { color: theme.colors.secondaryText }]}>Requests</Text>
              <Text style={[styles.edgeMetricValue, { color: theme.colors.text }]}>{item.requests}</Text>
            </View>
          </View>

          <View style={styles.cacheHitContainer}>
            <View style={styles.cacheHitHeader}>
              <Text style={[styles.cacheHitLabel, { color: theme.colors.secondaryText }]}>Cache Hit Rate</Text>
              <Text style={[styles.cacheHitValue, { color: theme.colors.text }]}>{item.cacheHitRate}%</Text>
            </View>
            <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}
              testID={`cdn-edge-hit-${item.id}`}>
              <View
                style={[styles.progressFill, { backgroundColor: item.cacheHitRate > 90 ? '#34C759' : '#FF9500', width: `${item.cacheHitRate}%` }]}
              />
            </View>
          </View>

          <View style={styles.uptimeRow}>
            <Clock size={12} color={theme.colors.secondaryText} />
            <Text style={[styles.uptimeText, { color: theme.colors.secondaryText }]}>Uptime: {item.uptime}</Text>
          </View>
        </View>

        <View style={styles.edgeActions}>
          <TouchableOpacity style={[styles.edgeActionButton, { backgroundColor: theme.colors.background }]}
            testID={`cdn-edge-analytics-${item.id}`}>
            <BarChart3 size={16} color={theme.colors.text} />
            <Text style={[styles.edgeActionText, { color: theme.colors.text }]}>Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.edgeActionButton, { backgroundColor: theme.colors.background }]}
            testID={`cdn-edge-config-${item.id}`}>
            <Settings size={16} color={theme.colors.text} />
            <Text style={[styles.edgeActionText, { color: theme.colors.text }]}>Configure</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCacheRule = ({ item }: { item: CacheRule }) => (
    <TouchableOpacity
      style={[styles.cacheCard, { backgroundColor: theme.colors.cardBackground, borderWidth: selectedCacheRuleId === item.id ? 1 : 0, borderColor: theme.colors.primary }]}
      onPress={() => setSelectedCacheRuleId(item.id)}
      activeOpacity={0.9}
      testID={`cdn-cache-rule-${item.id}`}>
      <View style={styles.cacheHeader}>
        <View style={[styles.cacheIcon, { backgroundColor: '#007AFF20' }]}
          testID={`cdn-cache-icon-${item.id}`}>
          <Zap size={24} color="#007AFF" />
        </View>
        <View style={styles.cacheInfo}>
          <Text style={[styles.cachePattern, { color: theme.colors.text }]}>{item.pattern}</Text>
          <View style={styles.cacheMeta}>
            <View style={[styles.ttlBadge, { backgroundColor: theme.colors.background }]}
              testID={`cdn-cache-ttl-${item.id}`}>
              <Clock size={12} color={theme.colors.text} />
              <Text style={[styles.ttlText, { color: theme.colors.text }]}>TTL: {item.ttl}</Text>
            </View>
            <View style={[styles.tierBadge, { backgroundColor: theme.colors.background }]}
              testID={`cdn-cache-tier-${item.id}`}>
              <Layers size={12} color={theme.colors.text} />
              <Text style={[styles.ttlText, { color: theme.colors.text }]}>{item.tier.toUpperCase()}</Text>
            </View>
            <View style={[styles.enabledBadge, { backgroundColor: item.enabled ? '#34C75920' : '#8E8E9320' }]}>
              <Text style={[styles.enabledText, { color: item.enabled ? '#34C759' : '#8E8E93' }]}>
                {item.enabled ? 'ENABLED' : 'DISABLED'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {item.enabled && (
        <View style={styles.cacheStats}>
          <View style={styles.cacheStat}>
            <Text style={[styles.cacheStatValue, { color: theme.colors.text }]}>{item.hitRate}%</Text>
            <Text style={[styles.cacheStatLabel, { color: theme.colors.secondaryText }]}>Hit Rate</Text>
          </View>
          <View style={styles.cacheStat}>
            <Text style={[styles.cacheStatValue, { color: theme.colors.text }]}>{item.requests}</Text>
            <Text style={[styles.cacheStatLabel, { color: theme.colors.secondaryText }]}>Requests</Text>
          </View>
        </View>
      )}

      <View style={styles.cacheActions}>
        <TouchableOpacity style={[styles.cacheActionButton, { backgroundColor: theme.colors.background }]}
          testID={`cdn-cache-action-${item.id}`}>
          <Settings size={14} color={theme.colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.cacheActionButton, { backgroundColor: theme.colors.background }]}
          testID={`cdn-cache-preview-${item.id}`}>
          <Eye size={14} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderSecurityRule = ({ item }: { item: SecurityRule }) => {
    const getTypeIcon = () => {
      switch (item.type) {
        case 'waf':
          return Shield;
        case 'ddos':
          return Server;
        case 'bot-protection':
          return Lock;
        case 'rate-limiting':
          return Activity;
        default:
          return Shield;
      }
    };

    const TypeIcon = getTypeIcon();
    const enabledColor = item.enabled ? '#34C759' : '#8E8E93';

    return (
      <View style={[styles.securityCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.securityHeader}>
          <View style={[styles.securityIcon, { backgroundColor: `${enabledColor}20` }]}
            testID={`cdn-security-icon-${item.id}`}>
            <TypeIcon size={24} color={enabledColor} />
          </View>
          <View style={styles.securityInfo}>
            <Text style={[styles.securityName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.securityDescription, { color: theme.colors.secondaryText }]}>{item.description}</Text>
            <View style={styles.securityMeta}>
              <View style={[styles.enabledBadge, { backgroundColor: item.enabled ? '#34C75920' : '#8E8E9320' }]}
                testID={`cdn-security-status-${item.id}`}>
                <Text style={[styles.enabledText, { color: item.enabled ? '#34C759' : '#8E8E93' }]}>
                  {item.enabled ? 'ENABLED' : 'DISABLED'}
                </Text>
              </View>
              <View style={[styles.typeBadge, { backgroundColor: theme.colors.background }]}>
                <Text style={[styles.typeText, { color: theme.colors.text }]}>{item.type.toUpperCase()}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.securityFooter}>
          <View style={styles.threatsBadge}>
            <Shield size={14} color="#FF3B30" />
            <Text style={[styles.threatsText, { color: theme.colors.text }]}>
              {item.threatsBlocked} threats blocked
            </Text>
          </View>
          <TouchableOpacity style={[styles.configureButton, { backgroundColor: theme.colors.primary }]}
            testID={`cdn-security-config-${item.id}`}>
            <Text style={styles.configureButtonText}>Configure</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderTrafficInsight = ({ item }: { item: TrafficInsight }) => {
    const changeColor = item.change >= 0 ? '#34C759' : '#FF3B30';
    return (
      <View style={[styles.trafficCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={[styles.trafficIcon, { backgroundColor: `${changeColor}15` }]}>
          <Target size={18} color={changeColor} />
        </View>
        <Text style={[styles.trafficMetric, { color: theme.colors.text }]}>{item.metric}</Text>
        <Text style={[styles.trafficValue, { color: theme.colors.text }]}>{item.value}</Text>
        <Text style={[styles.trafficRegion, { color: theme.colors.secondaryText }]}>{item.region}</Text>
        <Text style={[styles.trafficChange, { color: changeColor }]}>{item.change >= 0 ? '+' : ''}{item.change}%</Text>
      </View>
    );
  };

  const renderAutomation = ({ item }: { item: CacheAutomation }) => (
    <View style={[styles.automationCard, { backgroundColor: theme.colors.cardBackground }]}
      testID={`cdn-automation-${item.id}`}>
      <View style={styles.automationHeader}>
        <View style={[styles.automationBadge, { backgroundColor: item.status === 'running' ? '#34C75920' : '#FF950020' }]}>
          <SignalHigh size={14} color={item.status === 'running' ? '#34C759' : '#FF9500'} />
          <Text style={[styles.automationBadgeText, { color: item.status === 'running' ? '#34C759' : '#FF9500' }]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
        <Text style={[styles.automationImpact, { color: theme.colors.secondaryText }]}>{item.impact}</Text>
      </View>
      <Text style={[styles.automationTitle, { color: theme.colors.text }]}>{item.title}</Text>
      <Text style={[styles.automationDescription, { color: theme.colors.secondaryText }]}>{item.description}</Text>
      <View style={styles.automationActions}>
        <TouchableOpacity style={[styles.automationButton, { backgroundColor: theme.colors.background }]}
          testID={`cdn-automation-run-${item.id}`}>
          <Timer size={14} color={theme.colors.text} />
          <Text style={[styles.automationButtonText, { color: theme.colors.text }]}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.automationButton, { backgroundColor: theme.colors.background }]}
          testID={`cdn-automation-policy-${item.id}`}>
          <Filter size={14} color={theme.colors.text} />
          <Text style={[styles.automationButtonText, { color: theme.colors.text }]}>Policy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPurge = ({ item }: { item: PurgeEvent }) => (
    <View style={[styles.purgeRow, { backgroundColor: theme.colors.cardBackground }]}>
      <View>
        <Text style={[styles.purgeLabel, { color: theme.colors.text }]}>{item.label}</Text>
        <Text style={[styles.purgeScope, { color: theme.colors.secondaryText }]}>{item.scope}</Text>
      </View>
      <View style={styles.purgeMeta}>
        <Text style={[styles.purgeDuration, { color: theme.colors.text }]}>{item.duration}</Text>
        <View style={[styles.purgeStatus, { backgroundColor: item.status === 'completed' ? '#34C75920' : '#FF950020' }]}
          testID={`cdn-purge-${item.id}`}>
          <Text style={[styles.purgeStatusText, { color: item.status === 'completed' ? '#34C759' : '#FF9500' }]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}
      testID="cdn-screen">
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}
        testID="cdn-header">
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton} testID="cdn-back-button">
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>CDN</Text>
        <TouchableOpacity style={styles.headerButton} testID="cdn-refresh">
          <RefreshCw size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        {(['overview', 'edge', 'cache', 'security', 'ops'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && { backgroundColor: theme.colors.primary }]}
            onPress={() => setSelectedTab(tab)}
            testID={`cdn-tab-${tab}`}>
            <Text style={[styles.tabText, { color: selectedTab === tab ? 'white' : theme.colors.secondaryText }]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'overview' && (
          <View style={styles.section}>
            <View style={[styles.statusCard, { backgroundColor: '#34C75915' }]}
              testID="cdn-overview-status">
              <Globe size={32} color="#34C759" />
              <Text style={[styles.statusTitle, { color: theme.colors.text }]}>CDN Performance</Text>
              <Text style={[styles.statusDescription, { color: theme.colors.secondaryText }]}>
                4 edge regions • 94.2% cache hit rate • 42ms avg latency
              </Text>
            </View>

            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Metrics</Text>
            <FlatList
              data={metrics}
              renderItem={renderMetric}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.metricsList}
            />

            <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: 24 }]}>Traffic Heatmap</Text>
            <FlatList
              data={trafficInsights}
              renderItem={renderTrafficInsight}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.trafficList}
            />

            <View style={styles.edgeDetailCard}>
              <View style={styles.edgeDetailHeader}>
                <Router size={20} color={theme.colors.primary} />
                <Text style={[styles.edgeDetailTitle, { color: theme.colors.text }]}>Focused Edge</Text>
                <Text style={[styles.edgeDetailSubtitle, { color: theme.colors.secondaryText }]}>
                  {focusedEdge?.name} • {focusedEdge?.region}
                </Text>
              </View>
              <View style={styles.edgeDetailStats}>
                <View style={styles.edgeDetailColumn}>
                  <Text style={[styles.edgeDetailLabel, { color: theme.colors.secondaryText }]}>Zero Trust</Text>
                  <Text style={[styles.edgeDetailValue, { color: theme.colors.text }]}>{focusedEdge?.zeroTrust}</Text>
                </View>
                <View style={styles.edgeDetailColumn}>
                  <Text style={[styles.edgeDetailLabel, { color: theme.colors.secondaryText }]}>Reserved BW</Text>
                  <Text style={[styles.edgeDetailValue, { color: theme.colors.text }]}>{focusedEdge?.bandwidthReserve}</Text>
                </View>
                <View style={styles.edgeDetailColumn}>
                  <Text style={[styles.edgeDetailLabel, { color: theme.colors.secondaryText }]}>Latency</Text>
                  <Text style={[styles.edgeDetailValue, { color: theme.colors.text }]}>{focusedEdge?.latency}</Text>
                </View>
              </View>
              <TouchableOpacity style={[styles.viewAllButton, { backgroundColor: theme.colors.cardBackground }]}
                onPress={() => setSelectedTab('edge')}
                testID="cdn-edge-view-all">
                <Text style={[styles.viewAllText, { color: theme.colors.primary }]}>Manage Edge Fleet</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {selectedTab === 'edge' && (
          <View style={styles.section}>
            <View style={styles.infoCard}>
              <Globe size={24} color={theme.colors.primary} />
              <Text style={[styles.infoText, { color: theme.colors.secondaryText }]}>Manage your edge locations worldwide</Text>
            </View>
            <FlatList
              data={edgeLocations}
              renderItem={renderEdgeLocation}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.edgeList}
            />
          </View>
        )}

        {selectedTab === 'cache' && (
          <View style={styles.section}>
            <View style={styles.infoCard}>
              <Zap size={24} color={theme.colors.primary} />
              <Text style={[styles.infoText, { color: theme.colors.secondaryText }]}>Configure cache rules to optimize performance</Text>
            </View>
            <FlatList
              data={cacheRules}
              renderItem={renderCacheRule}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.cacheList}
            />
            {selectedCacheRule && (
              <View style={[styles.cacheInsightCard, { backgroundColor: theme.colors.cardBackground }]}
                testID="cdn-cache-insight">
                <View style={styles.cacheInsightHeader}>
                  <ShieldCheck size={16} color={theme.colors.primary} />
                  <Text style={[styles.cacheInsightTitle, { color: theme.colors.text }]}>Rule Guardrails</Text>
                </View>
                <Text style={[styles.cacheInsightDescription, { color: theme.colors.secondaryText }]}>
                  Edge tier {selectedCacheRule.tier.toUpperCase()} inherits automated invalidation, origin shield fallback, and replica warming. Prefetch queue keeps {selectedCacheRule.pattern} hydrated even during deploy freezes.
                </Text>
              </View>
            )}
            <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: 24 }]}>Automations</Text>
            <FlatList
              data={cacheAutomations}
              renderItem={renderAutomation}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.automationList}
            />
          </View>
        )}

        {selectedTab === 'security' && (
          <View style={styles.section}>
            <View style={styles.infoCard}>
              <Shield size={24} color={theme.colors.primary} />
              <Text style={[styles.infoText, { color: theme.colors.secondaryText }]}>Protect your content with advanced security rules</Text>
            </View>
            <FlatList
              data={securityRules}
              renderItem={renderSecurityRule}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.securityList}
            />
          </View>
        )}

        {selectedTab === 'ops' && (
          <View style={styles.section}>
            <View style={[styles.statusCard, { backgroundColor: '#007AFF15' }]}
              testID="cdn-ops-status">
              <CloudLightning size={32} color="#007AFF" />
              <Text style={[styles.statusTitle, { color: theme.colors.text }]}>Operational Control</Text>
              <Text style={[styles.statusDescription, { color: theme.colors.secondaryText }]}>
                Automate purges, monitor deployment waves, and orchestrate zero-downtime rollouts
              </Text>
            </View>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Purges</Text>
            <FlatList
              data={purgeEvents}
              renderItem={renderPurge}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.purgeList}
            />
            <View style={[styles.opsGrid, { backgroundColor: theme.colors.cardBackground }]}>
              <View style={styles.opsColumn}>
                <Text style={[styles.opsLabel, { color: theme.colors.secondaryText }]}>Blue/Green Wave</Text>
                <Text style={[styles.opsValue, { color: theme.colors.text }]}>Wave 3 of 6</Text>
                <TouchableOpacity style={[styles.opsAction, { backgroundColor: theme.colors.background }]}
                  testID="cdn-ops-freeze">
                  <Activity size={14} color={theme.colors.text} />
                  <Text style={[styles.opsActionText, { color: theme.colors.text }]}>Freeze deploy</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.opsColumn}>
                <Text style={[styles.opsLabel, { color: theme.colors.secondaryText }]}>Automatic Failover</Text>
                <Text style={[styles.opsValue, { color: theme.colors.text }]}>Armed</Text>
                <TouchableOpacity style={[styles.opsAction, { backgroundColor: theme.colors.background }]}
                  testID="cdn-ops-purge">
                  <Trash2 size={14} color={theme.colors.text} />
                  <Text style={[styles.opsActionText, { color: theme.colors.text }]}>Smart purge</Text>
                </TouchableOpacity>
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
    width: 140,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
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
    marginBottom: 8,
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
    fontSize: 11,
    fontWeight: '600',
  },
  edgeList: {
    gap: 16,
  },
  edgeCard: {
    padding: 16,
    borderRadius: 12,
  },
  edgeHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  edgeIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  edgeInfo: {
    flex: 1,
  },
  edgeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  edgeRegion: {
    fontSize: 13,
    marginBottom: 8,
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
  edgeMetrics: {
    marginBottom: 16,
  },
  edgeMetricRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  edgeMetric: {
    flex: 1,
  },
  edgeMetricLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  edgeMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  cacheHitContainer: {
    marginBottom: 12,
  },
  cacheHitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cacheHitLabel: {
    fontSize: 13,
  },
  cacheHitValue: {
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
  uptimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  uptimeText: {
    fontSize: 12,
  },
  edgeActions: {
    flexDirection: 'row',
    gap: 8,
  },
  edgeActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  edgeActionText: {
    fontSize: 13,
    fontWeight: '600',
  },
  viewAllButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
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
  cacheList: {
    gap: 12,
  },
  cacheCard: {
    padding: 16,
    borderRadius: 12,
  },
  cacheHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  cacheIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cacheInfo: {
    flex: 1,
  },
  cachePattern: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  cacheMeta: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  ttlBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 6,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 6,
  },
  ttlText: {
    fontSize: 11,
    fontWeight: '600',
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
  cacheStats: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 12,
  },
  cacheStat: {
    alignItems: 'center',
  },
  cacheStatValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  cacheStatLabel: {
    fontSize: 12,
  },
  cacheActions: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-end',
  },
  cacheActionButton: {
    padding: 8,
    borderRadius: 8,
  },
  securityList: {
    gap: 16,
  },
  securityCard: {
    padding: 16,
    borderRadius: 12,
  },
  securityHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  securityIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  securityInfo: {
    flex: 1,
  },
  securityName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  securityDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  securityMeta: {
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
  securityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  threatsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  threatsText: {
    fontSize: 13,
    fontWeight: '600',
  },
  configureButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  configureButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  trafficList: {
    gap: 12,
    paddingBottom: 8,
  },
  trafficCard: {
    width: 160,
    padding: 16,
    borderRadius: 14,
  },
  trafficIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  trafficMetric: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  trafficValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  trafficRegion: {
    fontSize: 12,
    marginBottom: 6,
  },
  trafficChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  edgeDetailCard: {
    marginTop: 24,
    borderRadius: 14,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  edgeDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  edgeDetailTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  edgeDetailSubtitle: {
    fontSize: 13,
  },
  edgeDetailStats: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 16,
  },
  edgeDetailColumn: {
    flex: 1,
  },
  edgeDetailLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  edgeDetailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  cacheInsightCard: {
    padding: 18,
    borderRadius: 12,
    marginTop: 12,
  },
  cacheInsightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  cacheInsightTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  cacheInsightDescription: {
    fontSize: 13,
    lineHeight: 20,
  },
  automationList: {
    gap: 12,
  },
  automationCard: {
    padding: 16,
    borderRadius: 12,
  },
  automationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  automationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  automationBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  automationImpact: {
    fontSize: 12,
  },
  automationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  automationDescription: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
  },
  automationActions: {
    flexDirection: 'row',
    gap: 10,
  },
  automationButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  automationButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  purgeList: {
    gap: 12,
    marginBottom: 20,
  },
  purgeRow: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  purgeLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  purgeScope: {
    fontSize: 12,
  },
  purgeMeta: {
    alignItems: 'flex-end',
    gap: 8,
  },
  purgeDuration: {
    fontSize: 13,
    fontWeight: '600',
  },
  purgeStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  purgeStatusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  opsGrid: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 18,
    gap: 16,
  },
  opsColumn: {
    flex: 1,
    gap: 8,
  },
  opsLabel: {
    fontSize: 12,
  },
  opsValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  opsAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    gap: 6,
  },
  opsActionText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
