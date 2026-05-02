 
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
  Wifi,
  Globe,
  Shield,
  Activity,
  TrendingUp,
  TriangleAlert,
  CircleCheck,
  Network,
  Server,
  Lock,
  Zap,
  Eye,
  Settings,
  ChartBar,
  Radar,
  GlobeLock,
  ShieldCheck,
  KeyRound,
  CloudLightning,
  MapPin,
  Router,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface NetworkService {
  id: string;
  name: string;
  type: 'cdn' | 'dns' | 'firewall' | 'load-balancer' | 'vpn' | 'ddos';
  status: 'active' | 'warning' | 'inactive';
  traffic: string;
  bandwidth: string;
  enabled: boolean;
  icon: React.ComponentType<any>;
  color: string;
}

interface NetworkMetric {
  label: string;
  value: string;
  change: string;
  unit: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface SecurityRule {
  id: string;
  name: string;
  type: 'allow' | 'deny';
  source: string;
  destination: string;
  port: string;
  enabled: boolean;
}

interface VPNUser {
  id: string;
  name: string;
  device: string;
  location: string;
  status: 'connected' | 'pending' | 'revoked';
}

interface LoadBalancer {
  id: string;
  name: string;
  region: string;
  algorithm: 'round-robin' | 'least-connections' | 'ip-hash';
  healthyTargets: number;
  totalTargets: number;
  latency: string;
}

interface ThreatEvent {
  id: string;
  region: string;
  type: 'ddos' | 'botnet' | 'intrusion';
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
}

type TabKey = 'services' | 'security' | 'monitoring';

const networkServices: NetworkService[] = [
  { id: '1', name: 'Content Delivery Network', type: 'cdn', status: 'active', traffic: '1.2TB/day', bandwidth: '10Gbps', enabled: true, icon: Globe, color: '#007AFF' },
  { id: '2', name: 'DNS Management', type: 'dns', status: 'active', traffic: '45M queries/day', bandwidth: '500Mbps', enabled: true, icon: Network, color: '#34C759' },
  { id: '3', name: 'Web Application Firewall', type: 'firewall', status: 'active', traffic: '250K requests/sec', bandwidth: '5Gbps', enabled: true, icon: Shield, color: '#FF3B30' },
  { id: '4', name: 'Load Balancer', type: 'load-balancer', status: 'warning', traffic: '180K requests/sec', bandwidth: '8Gbps', enabled: true, icon: Server, color: '#FF9500' },
  { id: '5', name: 'VPN Gateway', type: 'vpn', status: 'active', traffic: '45GB/day', bandwidth: '1Gbps', enabled: true, icon: Lock, color: '#AF52DE' },
  { id: '6', name: 'DDoS Protection', type: 'ddos', status: 'active', traffic: '0 attacks', bandwidth: '100Gbps', enabled: true, icon: Zap, color: '#5AC8FA' },
];

const networkMetrics: NetworkMetric[] = [
  { label: 'Total Traffic', value: '1.5TB', change: '+12%', unit: '/day', icon: Activity, color: '#007AFF' },
  { label: 'Bandwidth Usage', value: '68%', change: '+5%', unit: 'capacity', icon: TrendingUp, color: '#34C759' },
  { label: 'Active Connections', value: '12.5K', change: '+8%', unit: 'concurrent', icon: Wifi, color: '#FF9500' },
  { label: 'Blocked Threats', value: '1,247', change: '+15%', unit: '/day', icon: Shield, color: '#FF3B30' },
];

const securityRules: SecurityRule[] = [
  { id: '1', name: 'Allow HTTPS Traffic', type: 'allow', source: '0.0.0.0/0', destination: 'app-servers', port: '443', enabled: true },
  { id: '2', name: 'Allow HTTP Traffic', type: 'allow', source: '0.0.0.0/0', destination: 'app-servers', port: '80', enabled: true },
  { id: '3', name: 'Deny SSH from External', type: 'deny', source: '0.0.0.0/0', destination: '*', port: '22', enabled: true },
  { id: '4', name: 'Allow VPN Access', type: 'allow', source: 'vpn-subnet', destination: '*', port: '*', enabled: true },
];

const vpnUsers: VPNUser[] = [
  { id: 'vpn-user-1', name: 'Ethan Harper', device: 'MacBook Pro', location: 'New York, USA', status: 'connected' },
  { id: 'vpn-user-2', name: 'Chloe Rivera', device: 'ThinkPad X1', location: 'Berlin, DE', status: 'connected' },
  { id: 'vpn-user-3', name: 'Ops Bot', device: 'Service Edge', location: 'Singapore, SG', status: 'pending' },
];

const loadBalancers: LoadBalancer[] = [
  { id: 'lb-1', name: 'Global API Edge', region: 'Global', algorithm: 'least-connections', healthyTargets: 46, totalTargets: 48, latency: '64ms p95' },
  { id: 'lb-2', name: 'EU Commerce Mesh', region: 'eu-west-1', algorithm: 'round-robin', healthyTargets: 18, totalTargets: 18, latency: '41ms p95' },
  { id: 'lb-3', name: 'US Video CDN', region: 'us-east-1', algorithm: 'ip-hash', healthyTargets: 22, totalTargets: 24, latency: '55ms p95' },
];

const threatEvents: ThreatEvent[] = [
  { id: 'threat-1', region: 'Frankfurt', type: 'ddos', severity: 'high', timestamp: '2m ago' },
  { id: 'threat-2', region: 'Tokyo', type: 'intrusion', severity: 'medium', timestamp: '8m ago' },
  { id: 'threat-3', region: 'Sao Paulo', type: 'botnet', severity: 'low', timestamp: '15m ago' },
];

export default function NetworkingScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<TabKey>('services');
  const [services, setServices] = useState(networkServices);
  const [rules, setRules] = useState(securityRules);

  useEffect(() => {
    console.log('[NetworkingScreen] Active tab:', selectedTab);
  }, [selectedTab]);

  const toggleService = (id: string) => {
    setServices((prev) => prev.map((service) =>
      service.id === id ? { ...service, enabled: !service.enabled } : service
    ));
    console.log('[NetworkingScreen] Toggled service', id);
  };

  const toggleRule = (id: string) => {
    setRules((prev) => prev.map((rule) =>
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
    console.log('[NetworkingScreen] Toggled security rule', id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#34C759';
      case 'warning': return '#FF9500';
      case 'inactive': return '#8E8E93';
      default: return theme.colors.secondaryText;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CircleCheck;
      case 'warning': return TriangleAlert;
      case 'inactive': return TriangleAlert;
      default: return Activity;
    }
  };

  const getSeverityColor = (severity: ThreatEvent['severity']) => {
    switch (severity) {
      case 'high': return '#FF3B30';
      case 'medium': return '#FF9500';
      default: return '#34C759';
    }
  };

  const renderMetric = ({ item }: { item: NetworkMetric }) => {
    const IconComponent = item.icon;
    return (
      <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`network-metric-${item.label}`}
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

  const renderService = ({ item }: { item: NetworkService }) => {
    const IconComponent = item.icon;
    const StatusIcon = getStatusIcon(item.status);
    const statusColor = getStatusColor(item.status);

    return (
      <View style={[styles.serviceCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`network-service-${item.id}`}
      >
        <View style={styles.serviceHeader}>
          <View style={[styles.serviceIcon, { backgroundColor: `${item.color}20` }]}>
            <IconComponent size={24} color={item.color} />
          </View>
          <View style={styles.serviceInfo}>
            <Text style={[styles.serviceName, { color: theme.colors.text }]}>{item.name}</Text>
            <View style={styles.serviceStatus}>
              <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
                <StatusIcon size={12} color={statusColor} />
                <Text style={[styles.statusText, { color: statusColor }]}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Text>
              </View>
            </View>
          </View>
          <Switch
            value={item.enabled}
            onValueChange={() => toggleService(item.id)}
            trackColor={{ false: '#767577', true: item.color }}
            thumbColor="#f4f3f4"
            testID={`service-toggle-${item.id}`}
          />
        </View>

        <View style={styles.serviceDetails}>
          <View style={styles.detailItem}>
            <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Traffic</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{item.traffic}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Bandwidth</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{item.bandwidth}</Text>
          </View>
        </View>

        <View style={styles.serviceActions}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.background }]}
            testID={`service-config-${item.id}`}
          >
            <Settings size={16} color={theme.colors.text} />
            <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>Configure</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.background }]}
            testID={`service-analytics-${item.id}`}
          >
            <ChartBarBig size={16} color={theme.colors.text} />
            <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>Analytics</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderSecurityRule = ({ item }: { item: SecurityRule }) => {
    const ruleColor = item.type === 'allow' ? '#34C759' : '#FF3B30';

    return (
      <View style={[styles.ruleCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`network-rule-${item.id}`}
      >
        <View style={styles.ruleHeader}>
          <View style={styles.ruleInfo}>
            <View style={styles.ruleTitleRow}>
              <Text style={[styles.ruleName, { color: theme.colors.text }]}>{item.name}</Text>
              <View style={[styles.typeBadge, { backgroundColor: `${ruleColor}20` }]}>
                <Text style={[styles.typeText, { color: ruleColor }]}>{item.type.toUpperCase()}</Text>
              </View>
            </View>

            <View style={styles.ruleDetailsGrid}>
              <View style={styles.ruleDetailRow}>
                <Text style={[styles.ruleDetailLabel, { color: theme.colors.secondaryText }]}>Source</Text>
                <Text style={[styles.ruleDetailValue, { color: theme.colors.text }]}>{item.source}</Text>
              </View>
              <View style={styles.ruleDetailRow}>
                <Text style={[styles.ruleDetailLabel, { color: theme.colors.secondaryText }]}>Destination</Text>
                <Text style={[styles.ruleDetailValue, { color: theme.colors.text }]}>{item.destination}</Text>
              </View>
              <View style={styles.ruleDetailRow}>
                <Text style={[styles.ruleDetailLabel, { color: theme.colors.secondaryText }]}>Port</Text>
                <Text style={[styles.ruleDetailValue, { color: theme.colors.text }]}>{item.port}</Text>
              </View>
            </View>
          </View>
          <Switch
            value={item.enabled}
            onValueChange={() => toggleRule(item.id)}
            trackColor={{ false: '#767577', true: ruleColor }}
            thumbColor="#f4f3f4"
            testID={`rule-toggle-${item.id}`}
          />
        </View>
      </View>
    );
  };

  const renderVpnUser = ({ item }: { item: VPNUser }) => {
    const statusColor = item.status === 'connected' ? '#34C759' : item.status === 'pending' ? '#FF9500' : '#8E8E93';
    return (
      <View style={[styles.vpnCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`vpn-user-${item.id}`}
      >
        <View style={styles.vpnHeader}>
          <Lock size={18} color={theme.colors.primary} />
          <Text style={[styles.vpnName, { color: theme.colors.text }]}>{item.name}</Text>
          <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>{item.status.toUpperCase()}</Text>
          </View>
        </View>
        <Text style={[styles.vpnDevice, { color: theme.colors.secondaryText }]}>{item.device}</Text>
        <View style={styles.vpnLocationRow}>
          <MapPin size={14} color={theme.colors.secondaryText} />
          <Text style={[styles.vpnLocation, { color: theme.colors.secondaryText }]}>{item.location}</Text>
        </View>
      </View>
    );
  };

  const renderLoadBalancer = ({ item }: { item: LoadBalancer }) => (
    <View style={[styles.lbCard, { backgroundColor: theme.colors.cardBackground }]}
      testID={`load-balancer-${item.id}`}
    >
      <View style={styles.lbHeader}>
        <Router size={18} color={theme.colors.primary} />
        <Text style={[styles.lbName, { color: theme.colors.text }]}>{item.name}</Text>
      </View>
      <Text style={[styles.lbRegion, { color: theme.colors.secondaryText }]}>{item.region}</Text>
      <View style={styles.lbMetaRow}>
        <Text style={[styles.lbMetaLabel, { color: theme.colors.secondaryText }]}>Algorithm</Text>
        <Text style={[styles.lbMetaValue, { color: theme.colors.text }]}>{item.algorithm}</Text>
      </View>
      <View style={styles.lbMetaRow}>
        <Text style={[styles.lbMetaLabel, { color: theme.colors.secondaryText }]}>Healthy Targets</Text>
        <Text style={[styles.lbMetaValue, { color: theme.colors.text }]}>{item.healthyTargets}/{item.totalTargets}</Text>
      </View>
      <View style={styles.lbMetaRow}>
        <Text style={[styles.lbMetaLabel, { color: theme.colors.secondaryText }]}>Latency</Text>
        <Text style={[styles.lbMetaValue, { color: theme.colors.text }]}>{item.latency}</Text>
      </View>
    </View>
  );

  const renderThreat = ({ item }: { item: ThreatEvent }) => {
    const color = getSeverityColor(item.severity);
    return (
      <View style={[styles.threatCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`threat-${item.id}`}
      >
        <View style={styles.threatHeader}>
          <Radar size={18} color={color} />
          <Text style={[styles.threatRegion, { color: theme.colors.text }]}>{item.region}</Text>
          <View style={[styles.typeBadge, { backgroundColor: `${color}20` }]}>
            <Text style={[styles.typeText, { color }]}>{item.type.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.threatMeta}>
          <Text style={[styles.threatMetaText, { color: theme.colors.secondaryText }]}>Severity</Text>
          <Text style={[styles.threatMetaValue, { color }]}>{item.severity.toUpperCase()}</Text>
        </View>
        <Text style={[styles.threatTimestamp, { color: theme.colors.secondaryText }]}>Detected {item.timestamp}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}
      testID="networking-screen"
    >
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}
        testID="networking-header"
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton} testID="networking-back">
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Networking</Text>
        <TouchableOpacity style={styles.headerButton} testID="networking-audit">
          <Eye size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.metricsSection}>
        <FlatList
          data={networkMetrics}
          renderItem={renderMetric}
          keyExtractor={(item) => item.label}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.metricsContainer}
        />
      </View>

      <View style={styles.tabsContainer}>
        {(['services', 'security', 'monitoring'] as TabKey[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && { backgroundColor: theme.colors.primary }]}
            onPress={() => setSelectedTab(tab)}
            testID={`networking-tab-${tab}`}
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
        {selectedTab === 'services' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Network Services</Text>
            <FlatList
              data={services}
              renderItem={renderService}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.servicesList}
            />

            <View style={styles.subHeader}>
              <Lock size={20} color={theme.colors.primary} />
              <Text style={[styles.subHeaderText, { color: theme.colors.text }]}>VPN Control Center</Text>
            </View>
            <FlatList
              data={vpnUsers}
              renderItem={renderVpnUser}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.vpnList}
            />

            <View style={styles.subHeader}>
              <Server size={20} color={theme.colors.primary} />
              <Text style={[styles.subHeaderText, { color: theme.colors.text }]}>Load Balancers</Text>
            </View>
            <FlatList
              data={loadBalancers}
              renderItem={renderLoadBalancer}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.lbList}
            />
          </View>
        )}

        {selectedTab === 'security' && (
          <View style={styles.section}>
            <View style={styles.securityHeader}>
              <Shield size={24} color={theme.colors.primary} />
              <Text style={[styles.securityHeaderText, { color: theme.colors.text }]}>Security Rules</Text>
            </View>
            <Text style={[styles.securityDescription, { color: theme.colors.secondaryText }]}>
              Zero-trust policies, firewall rules, and automated policy rollbacks.
            </Text>

            <FlatList
              data={rules}
              renderItem={renderSecurityRule}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.rulesList}
            />

            <View style={styles.zeroTrustCard} testID="zero-trust-card">
              <ShieldCheck size={28} color={theme.colors.primary} />
              <Text style={[styles.zeroTrustTitle, { color: theme.colors.text }]}>Zero-Trust Dashboard</Text>
              <View style={styles.zeroTrustStats}>
                <View style={styles.zeroTrustStat}>
                  <Text style={[styles.zeroTrustValue, { color: theme.colors.text }]}>48</Text>
                  <Text style={[styles.zeroTrustLabel, { color: theme.colors.secondaryText }]}>Policies live</Text>
                </View>
                <View style={styles.zeroTrustStat}>
                  <Text style={[styles.zeroTrustValue, { color: '#34C759' }]}>99%</Text>
                  <Text style={[styles.zeroTrustLabel, { color: theme.colors.secondaryText }]}>Compliant sessions</Text>
                </View>
                <View style={styles.zeroTrustStat}>
                  <Text style={[styles.zeroTrustValue, { color: '#FF9500' }]}>3</Text>
                  <Text style={[styles.zeroTrustLabel, { color: theme.colors.secondaryText }]}>Pending reviews</Text>
                </View>
              </View>
              <TouchableOpacity style={[styles.zeroTrustButton, { backgroundColor: theme.colors.primary }]}
                testID="zero-trust-review"
              >
                <KeyRound size={16} color="#FFFFFF" />
                <Text style={styles.zeroTrustButtonText}>Review Policies</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {selectedTab === 'monitoring' && (
          <View style={styles.section}>
            <View style={styles.monitoringPane}>
              <View style={[styles.monitoringCard, { backgroundColor: theme.colors.cardBackground }]}
                testID="traffic-analytics-card"
              >
                <ChartBarBig size={32} color={theme.colors.primary} />
                <Text style={[styles.monitoringTitle, { color: theme.colors.text }]}>Traffic Analytics</Text>
                <Text style={[styles.monitoringDescription, { color: theme.colors.secondaryText }]}>Real-time visibility into logs, metrics, traces, and user journeys.</Text>
                <TouchableOpacity style={[styles.monitoringButton, { backgroundColor: theme.colors.primary }]}>
                  <ChartBarBig size={16} color="#FFFFFF" />
                  <Text style={styles.monitoringButtonText}>Open Observability</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.monitoringCard, { backgroundColor: theme.colors.cardBackground }]}
                testID="ddos-shield-card"
              >
                <CloudLightning size={32} color={theme.colors.primary} />
                <Text style={[styles.monitoringTitle, { color: theme.colors.text }]}>DDoS Shield</Text>
                <Text style={[styles.monitoringDescription, { color: theme.colors.secondaryText }]}>Edge scrubbing centers active in 14 regions with 100Gbps absorb capacity.</Text>
              </View>
            </View>

            <View style={styles.subHeader}>
              <Radar size={20} color={theme.colors.primary} />
              <Text style={[styles.subHeaderText, { color: theme.colors.text }]}>Threat Map</Text>
            </View>
            <FlatList
              data={threatEvents}
              renderItem={renderThreat}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.threatList}
            />

            <View style={styles.worldMap}>
              <GlobeLock size={42} color={theme.colors.primary} />
              <Text style={[styles.worldMapText, { color: theme.colors.secondaryText }]}>Global telemetry overlay with AI-based anomaly detection</Text>
            </View>
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
  metricLabel: { fontSize: 12, marginBottom: 2, textAlign: 'center' },
  metricUnit: { fontSize: 11, marginBottom: 4 },
  metricChange: { fontSize: 12, fontWeight: '600' },
  tabsContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 16, gap: 8 },
  tab: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.05)' },
  tabText: { fontSize: 14, fontWeight: '600' },
  content: { flex: 1, paddingHorizontal: 20 },
  section: { paddingBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
  servicesList: { gap: 16 },
  serviceCard: { padding: 16, borderRadius: 16 },
  serviceHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  serviceIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  serviceInfo: { flex: 1 },
  serviceName: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  serviceStatus: { flexDirection: 'row' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, gap: 4 },
  statusText: { fontSize: 11, fontWeight: '600' },
  serviceDetails: { flexDirection: 'row', gap: 24, marginBottom: 16 },
  detailItem: { flex: 1 },
  detailLabel: { fontSize: 12, marginBottom: 4 },
  detailValue: { fontSize: 14, fontWeight: '600' },
  serviceActions: { flexDirection: 'row', gap: 12 },
  actionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 8, gap: 6 },
  actionButtonText: { fontSize: 13, fontWeight: '600' },
  securityHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  securityHeaderText: { fontSize: 18, fontWeight: '600' },
  securityDescription: { fontSize: 14, marginBottom: 16, lineHeight: 20 },
  rulesList: { gap: 12 },
  ruleCard: { padding: 16, borderRadius: 12 },
  ruleHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ruleInfo: { flex: 1, marginRight: 16 },
  ruleTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  ruleName: { fontSize: 15, fontWeight: '600' },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  typeText: { fontSize: 10, fontWeight: '700' },
  ruleDetailsGrid: { gap: 6 },
  ruleDetailRow: { flexDirection: 'row', justifyContent: 'space-between' },
  ruleDetailLabel: { fontSize: 13 },
  ruleDetailValue: { fontSize: 13, fontWeight: '500', fontFamily: 'monospace' },
  monitoringPane: { gap: 16 },
  monitoringCard: { padding: 24, borderRadius: 16 },
  monitoringTitle: { fontSize: 20, fontWeight: '700', marginTop: 16, marginBottom: 12 },
  monitoringDescription: { fontSize: 14, marginBottom: 20, lineHeight: 20 },
  monitoringButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12, gap: 8 },
  monitoringButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  subHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 24, marginBottom: 12 },
  subHeaderText: { fontSize: 16, fontWeight: '600' },
  vpnList: { gap: 12, paddingBottom: 8 },
  vpnCard: { width: 200, padding: 16, borderRadius: 12, marginRight: 12 },
  vpnHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  vpnName: { fontSize: 15, fontWeight: '600', flex: 1 },
  vpnDevice: { fontSize: 13, marginBottom: 8 },
  vpnLocationRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  vpnLocation: { fontSize: 12 },
  lbList: { gap: 12, paddingBottom: 8 },
  lbCard: { width: 220, padding: 16, borderRadius: 12, marginRight: 12 },
  lbHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  lbName: { fontSize: 15, fontWeight: '600' },
  lbRegion: { fontSize: 13, marginBottom: 8 },
  lbMetaRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  lbMetaLabel: { fontSize: 12 },
  lbMetaValue: { fontSize: 13, fontWeight: '600' },
  zeroTrustCard: { padding: 20, borderRadius: 16, backgroundColor: 'rgba(0,122,255,0.08)', gap: 16, marginTop: 24 },
  zeroTrustTitle: { fontSize: 18, fontWeight: '700' },
  zeroTrustStats: { flexDirection: 'row', justifyContent: 'space-between' },
  zeroTrustStat: { alignItems: 'center', flex: 1 },
  zeroTrustValue: { fontSize: 22, fontWeight: '700' },
  zeroTrustLabel: { fontSize: 12, textAlign: 'center' },
  zeroTrustButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 12, gap: 8 },
  zeroTrustButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  threatList: { gap: 12, paddingBottom: 12 },
  threatCard: { width: 200, padding: 16, borderRadius: 12, marginRight: 12 },
  threatHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  threatRegion: { fontSize: 15, fontWeight: '600', flex: 1 },
  threatMeta: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  threatMetaText: { fontSize: 12 },
  threatMetaValue: { fontSize: 12, fontWeight: '600' },
  threatTimestamp: { fontSize: 12 },
  worldMap: { padding: 24, borderRadius: 16, backgroundColor: 'rgba(0,122,255,0.05)', alignItems: 'center' },
  worldMapText: { marginTop: 8, fontSize: 13, textAlign: 'center', lineHeight: 18 },
});
