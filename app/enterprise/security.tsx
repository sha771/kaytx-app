 
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Switch,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Shield,
  Lock,
  Key,
  Smartphone,
  Globe,
  UserCheck,
  TriangleAlert,
  CircleCheck,
  Settings,
  Plus,
  X,
  Info,
  Eye,
  Clock,
  ShieldCheck,
  KeyRound,
  Bot,
  Bug,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface SecurityFeature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: 'authentication' | 'access' | 'network' | 'monitoring';
  icon: React.ComponentType<any>;
  color: string;
}

interface IPWhitelistEntry {
  id: string;
  ip: string;
  description: string;
  addedBy: string;
  addedDate: string;
  lastUsed: string;
}

interface SSOProvider {
  id: string;
  name: string;
  type: 'saml' | 'oauth' | 'oidc';
  status: 'active' | 'inactive' | 'configuring';
  users: number;
  icon: React.ComponentType<any>;
  color: string;
}

interface KeyVault {
  id: string;
  name: string;
  keys: number;
  rotation: string;
  status: 'healthy' | 'rotating';
}

interface VulnerabilityFinding {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium';
  service: string;
  eta: string;
}

interface ThreatInsight {
  id: string;
  title: string;
  signal: string;
  action: string;
  status: 'watching' | 'mitigated';
}

const securityFeatures: SecurityFeature[] = [
  { id: '1', name: 'Two-Factor Authentication', description: 'Require 2FA for all user logins', enabled: true, category: 'authentication', icon: Smartphone, color: '#007AFF' },
  { id: '2', name: 'Single Sign-On (SSO)', description: 'Enable SSO with corporate identity providers', enabled: true, category: 'authentication', icon: Key, color: '#34C759' },
  { id: '3', name: 'IP Whitelisting', description: 'Restrict access to specific IP addresses', enabled: false, category: 'network', icon: Globe, color: '#FF9500' },
  { id: '4', name: 'Session Management', description: 'Automatic session timeout and management', enabled: true, category: 'access', icon: Clock, color: '#AF52DE' },
  { id: '5', name: 'Access Monitoring', description: 'Real-time monitoring of access patterns', enabled: true, category: 'monitoring', icon: Eye, color: '#FF3B30' },
  { id: '6', name: 'Role-Based Access Control', description: 'Fine-grained permission management', enabled: true, category: 'access', icon: UserCheck, color: '#5AC8FA' },
];

const ipWhitelist: IPWhitelistEntry[] = [
  { id: '1', ip: '192.168.1.100', description: 'Corporate HQ Network', addedBy: 'admin@company.com', addedDate: '2024-01-15', lastUsed: '5 min ago' },
  { id: '2', ip: '10.0.0.0/24', description: 'Remote Office VPN', addedBy: 'it@company.com', addedDate: '2024-01-10', lastUsed: '1 hour ago' },
  { id: '3', ip: '203.0.113.0/24', description: 'Partner API Access', addedBy: 'security@company.com', addedDate: '2024-01-05', lastUsed: '3 hours ago' },
];

const ssoProviders: SSOProvider[] = [
  { id: '1', name: 'Okta', type: 'saml', status: 'active', users: 1245, icon: Shield, color: '#007AFF' },
  { id: '2', name: 'Azure AD', type: 'oidc', status: 'active', users: 847, icon: Lock, color: '#34C759' },
  { id: '3', name: 'Google Workspace', type: 'oauth', status: 'inactive', users: 0, icon: Globe, color: '#8E8E93' },
];

const keyVaults: KeyVault[] = [
  { id: 'vault-1', name: 'Primary KMS', keys: 248, rotation: '48h', status: 'healthy' },
  { id: 'vault-2', name: 'Payments HSM', keys: 62, rotation: '24h', status: 'rotating' },
  { id: 'vault-3', name: 'Dev Sandbox', keys: 44, rotation: '7d', status: 'healthy' },
];

const vulnerabilityFindings: VulnerabilityFinding[] = [
  { id: 'vuln-1', title: 'OpenSSL CVE-2024-1234', severity: 'critical', service: 'edge gateway', eta: 'Fixing · 2h' },
  { id: 'vuln-2', title: 'JWT misconfiguration', severity: 'high', service: 'auth-api', eta: 'Rollout · 6h' },
  { id: 'vuln-3', title: 'Deprecated cipher suite', severity: 'medium', service: 'legacy proxy', eta: 'Backlog' },
];

const threatInsights: ThreatInsight[] = [
  { id: 'threat-1', title: 'New device login anomaly', signal: '3x risk score', action: 'Challenge w/ MFA', status: 'watching' },
  { id: 'threat-2', title: 'Botnet targeting signup API', signal: '17% spike', action: 'Rate-limit + WAF', status: 'mitigated' },
];

type TabKey = 'features' | 'sso' | 'ip-whitelist' | 'mfa' | 'ops';

export default function SecurityScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<TabKey>('features');
  const [features, setFeatures] = useState(securityFeatures);
  const [showAddIP, setShowAddIP] = useState(false);
  const [newIP, setNewIP] = useState('');
  const [newIPDescription, setNewIPDescription] = useState('');

  useEffect(() => {
    console.log('[SecurityScreen] Selected tab:', selectedTab);
  }, [selectedTab]);

  const toggleFeature = (id: string) => {
    setFeatures((prev) => prev.map((feature) =>
      feature.id === id ? { ...feature, enabled: !feature.enabled } : feature
    ));
    console.log('[SecurityScreen] Toggled feature', id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#34C759';
      case 'inactive': return '#8E8E93';
      case 'configuring': return '#FF9500';
      case 'healthy': return '#34C759';
      case 'rotating': return '#FF9500';
      default: return theme.colors.secondaryText;
    }
  };

  const renderFeature = ({ item }: { item: SecurityFeature }) => {
    const IconComponent = item.icon;

    return (
      <View style={[styles.featureCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`security-feature-${item.id}`}
      >
        <View style={styles.featureHeader}>
          <View style={[styles.featureIcon, { backgroundColor: `${item.color}20` }]}>
            <IconComponent size={24} color={item.color} />
          </View>
          <View style={styles.featureInfo}>
            <Text style={[styles.featureName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.featureDescription, { color: theme.colors.secondaryText }]}>
              {item.description}
            </Text>
            <View style={[styles.categoryBadge, { backgroundColor: theme.colors.background }]}>
              <Text style={[styles.categoryText, { color: item.color }]}>
                {item.category.replace('-', ' ').toUpperCase()}
              </Text>
            </View>
          </View>
          <Switch
            value={item.enabled}
            onValueChange={() => toggleFeature(item.id)}
            trackColor={{ false: '#767577', true: item.color }}
            thumbColor="#f4f3f4"
            testID={`feature-toggle-${item.id}`}
          />
        </View>
      </View>
    );
  };

  const renderSSOProvider = ({ item }: { item: SSOProvider }) => {
    const IconComponent = item.icon;
    const statusColor = getStatusColor(item.status);

    return (
      <View style={[styles.ssoCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`sso-provider-${item.id}`}
      >
        <View style={styles.ssoHeader}>
          <View style={[styles.ssoIcon, { backgroundColor: `${item.color}20` }]}>
            <IconComponent size={28} color={item.color} />
          </View>
          <View style={styles.ssoInfo}>
            <Text style={[styles.ssoName, { color: theme.colors.text }]}>{item.name}</Text>
            <View style={styles.ssoMeta}>
              <View style={[styles.typeBadge, { backgroundColor: theme.colors.background }]}>
                <Text style={[styles.typeText, { color: theme.colors.text }]}>{item.type.toUpperCase()}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
                <Text style={[styles.statusText, { color: statusColor }]}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.ssoStats}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{item.users}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Active Users</Text>
          </View>
          <TouchableOpacity 
            style={[styles.configureButton, { backgroundColor: theme.colors.primary }]}
            testID={`configure-sso-${item.id}`}
          >
            <Settings size={16} color="#FFFFFF" />
            <Text style={styles.configureButtonText}>Configure</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderIPEntry = ({ item }: { item: IPWhitelistEntry }) => (
    <View style={[styles.ipCard, { backgroundColor: theme.colors.cardBackground }]}
      testID={`ip-entry-${item.id}`}
    >
      <View style={styles.ipHeader}>
        <View style={styles.ipInfo}>
          <View style={[styles.ipBadge, { backgroundColor: theme.colors.background }]}
          >
            <Globe size={16} color={theme.colors.primary} />
            <Text style={[styles.ipAddress, { color: theme.colors.text }]}>{item.ip}</Text>
          </View>
          <Text style={[styles.ipDescription, { color: theme.colors.secondaryText }]}>
            {item.description}
          </Text>
        </View>
        <TouchableOpacity style={styles.deleteButton} testID={`remove-ip-${item.id}`}>
          <X size={18} color="#FF3B30" />
        </TouchableOpacity>
      </View>

      <View style={styles.ipMeta}>
        <View style={styles.ipMetaItem}>
          <Text style={[styles.ipMetaLabel, { color: theme.colors.secondaryText }]}>Added by</Text>
          <Text style={[styles.ipMetaValue, { color: theme.colors.text }]}>{item.addedBy}</Text>
        </View>
        <View style={styles.ipMetaItem}>
          <Text style={[styles.ipMetaLabel, { color: theme.colors.secondaryText }]}>Added</Text>
          <Text style={[styles.ipMetaValue, { color: theme.colors.text }]}>{item.addedDate}</Text>
        </View>
        <View style={styles.ipMetaItem}>
          <Text style={[styles.ipMetaLabel, { color: theme.colors.secondaryText }]}>Last Used</Text>
          <Text style={[styles.ipMetaValue, { color: theme.colors.text }]}>{item.lastUsed}</Text>
        </View>
      </View>
    </View>
  );

  const renderKeyVault = ({ item }: { item: KeyVault }) => {
    const statusColor = getStatusColor(item.status);
    return (
      <View style={[styles.keyCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`key-vault-${item.id}`}
      >
        <View style={styles.keyHeader}>
          <KeyRound size={18} color={theme.colors.primary} />
          <Text style={[styles.keyName, { color: theme.colors.text }]}>{item.name}</Text>
          <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>{item.status.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.keyMetaRow}>
          <Text style={[styles.keyMetaLabel, { color: theme.colors.secondaryText }]}>Keys</Text>
          <Text style={[styles.keyMetaValue, { color: theme.colors.text }]}>{item.keys}</Text>
        </View>
        <View style={styles.keyMetaRow}>
          <Text style={[styles.keyMetaLabel, { color: theme.colors.secondaryText }]}>Rotation</Text>
          <Text style={[styles.keyMetaValue, { color: theme.colors.text }]}>{item.rotation}</Text>
        </View>
      </View>
    );
  };

  const renderVulnerability = ({ item }: { item: VulnerabilityFinding }) => {
    const color = item.severity === 'critical' ? '#FF3B30' : item.severity === 'high' ? '#FF9500' : '#34C759';
    return (
      <View style={[styles.vulnCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`vulnerability-${item.id}`}
      >
        <View style={styles.vulnHeader}>
          <Bug size={18} color={color} />
          <Text style={[styles.vulnTitle, { color: theme.colors.text }]}>{item.title}</Text>
          <View style={[styles.statusBadge, { backgroundColor: `${color}20` }]}>
            <Text style={[styles.statusText, { color }]}>{item.severity.toUpperCase()}</Text>
          </View>
        </View>
        <Text style={[styles.vulnService, { color: theme.colors.secondaryText }]}>{item.service}</Text>
        <Text style={[styles.vulnEta, { color: theme.colors.secondaryText }]}>ETA {item.eta}</Text>
      </View>
    );
  };

  const renderThreat = ({ item }: { item: ThreatInsight }) => {
    const color = item.status === 'mitigated' ? '#34C759' : '#FF9500';
    return (
      <View style={[styles.threatCard, { backgroundColor: theme.colors.cardBackground }]}
        testID={`threat-insight-${item.id}`}
      >
        <View style={styles.threatHeader}>
          <Bot size={18} color={color} />
          <Text style={[styles.threatTitle, { color: theme.colors.text }]}>{item.title}</Text>
        </View>
        <Text style={[styles.threatSignal, { color: theme.colors.secondaryText }]}>{item.signal}</Text>
        <Text style={[styles.threatAction, { color: theme.colors.secondaryText }]}>{item.action}</Text>
        <View style={[styles.statusBadge, { backgroundColor: `${color}20`, alignSelf: 'flex-start' }]}>
          <Text style={[styles.statusText, { color }]}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}
      testID="security-screen"
    >
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}
        testID="security-header"
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton} testID="security-back-button">
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Security Settings</Text>
        <TouchableOpacity style={styles.headerButton} testID="security-info-button">
          <Info size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        {(['features', 'sso', 'ip-whitelist', 'mfa', 'ops'] as TabKey[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && { backgroundColor: theme.colors.primary }]}
            onPress={() => setSelectedTab(tab)}
            testID={`security-tab-${tab}`}
          >
            <Text
              style={[
                styles.tabText,
                { color: selectedTab === tab ? 'white' : theme.colors.secondaryText },
              ]}
            >
              {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'features' && (
          <View style={styles.section}>
            <View style={styles.overviewCard}>
              <ShieldCheck size={32} color={theme.colors.primary} />
              <Text style={[styles.overviewTitle, { color: theme.colors.text }]}>Security Features</Text>
              <Text style={[styles.overviewDescription, { color: theme.colors.secondaryText }]}>Configure enterprise-grade security features for your organization</Text>
            </View>

            <FlatList
              data={features}
              renderItem={renderFeature}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.featuresList}
            />
          </View>
        )}

        {selectedTab === 'sso' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>SSO Providers</Text>
              <TouchableOpacity 
                style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
                testID="add-sso-provider"
              >
                <Plus size={16} color="#FFFFFF" />
                <Text style={styles.addButtonText}>Add Provider</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={ssoProviders}
              renderItem={renderSSOProvider}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.ssoList}
            />
          </View>
        )}

        {selectedTab === 'ip-whitelist' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>IP Whitelist</Text>
              <TouchableOpacity 
                style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
                onPress={() => setShowAddIP(!showAddIP)}
                testID="add-ip-button"
              >
                <Plus size={16} color="#FFFFFF" />
                <Text style={styles.addButtonText}>Add IP</Text>
              </TouchableOpacity>
            </View>

            {showAddIP && (
              <View style={[styles.addIPForm, { backgroundColor: theme.colors.cardBackground }]}
                testID="ip-form"
              >
                <TextInput
                  style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text }]}
                  placeholder="IP Address (e.g., 192.168.1.1 or 10.0.0.0/24)"
                  placeholderTextColor={theme.colors.secondaryText}
                  value={newIP}
                  onChangeText={setNewIP}
                />
                <TextInput
                  style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text }]}
                  placeholder="Description"
                  placeholderTextColor={theme.colors.secondaryText}
                  value={newIPDescription}
                  onChangeText={setNewIPDescription}
                />
                <View style={styles.formButtons}>
                  <TouchableOpacity 
                    style={[styles.formButton, { backgroundColor: theme.colors.border }]}
                    onPress={() => {
                      setShowAddIP(false);
                      setNewIP('');
                      setNewIPDescription('');
                    }}
                  >
                    <Text style={[styles.formButtonText, { color: theme.colors.text }]}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.formButton, { backgroundColor: theme.colors.primary }]}
                    testID="submit-ip-button"
                  >
                    <Text style={[styles.formButtonText, { color: '#FFFFFF' }]}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <FlatList
              data={ipWhitelist}
              renderItem={renderIPEntry}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.ipList}
            />
          </View>
        )}

        {selectedTab === 'mfa' && (
          <View style={styles.section}>
            <View style={styles.mfaCard}>
              <Smartphone size={48} color={theme.colors.primary} />
              <Text style={[styles.mfaTitle, { color: theme.colors.text }]}>Multi-Factor Authentication</Text>
              <Text style={[styles.mfaDescription, { color: theme.colors.secondaryText }]}>MFA is enabled organization-wide. All users are required to use 2FA for login.</Text>

              <View style={styles.mfaStats}>
                <View style={styles.mfaStat}>
                  <CircleCheck size={24} color="#34C759" />
                  <Text style={[styles.mfaStatValue, { color: theme.colors.text }]}>98%</Text>
                  <Text style={[styles.mfaStatLabel, { color: theme.colors.secondaryText }]}>Enrolled</Text>
                </View>
                <View style={styles.mfaStat}>
                  <TriangleAlert size={24} color="#FF9500" />
                  <Text style={[styles.mfaStatValue, { color: theme.colors.text }]}>2%</Text>
                  <Text style={[styles.mfaStatLabel, { color: theme.colors.secondaryText }]}>Pending</Text>
                </View>
              </View>

              <TouchableOpacity 
                style={[styles.mfaButton, { backgroundColor: theme.colors.primary }]}
                testID="view-mfa-settings"
              >
                <Text style={styles.mfaButtonText}>View MFA Settings</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {selectedTab === 'ops' && (
          <View style={styles.section}>
            <View style={styles.subHeader}>
              <KeyRound size={20} color={theme.colors.primary} />
              <Text style={[styles.subHeaderText, { color: theme.colors.text }]}>Encryption Key Manager</Text>
            </View>
            <FlatList
              data={keyVaults}
              renderItem={renderKeyVault}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.keyList}
            />

            <View style={styles.subHeader}>
              <Bug size={20} color={theme.colors.primary} />
              <Text style={[styles.subHeaderText, { color: theme.colors.text }]}>Vulnerability Radar</Text>
            </View>
            <FlatList
              data={vulnerabilityFindings}
              renderItem={renderVulnerability}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.vulnList}
            />

            <View style={styles.subHeader}>
              <Bot size={20} color={theme.colors.primary} />
              <Text style={[styles.subHeaderText, { color: theme.colors.text }]}>Threat Detection AI</Text>
            </View>
            <FlatList
              data={threatInsights}
              renderItem={renderThreat}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.threatList}
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
    flexWrap: 'wrap',
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
  content: { flex: 1, paddingHorizontal: 20 },
  section: { paddingBottom: 20 },
  overviewCard: {
    backgroundColor: 'rgba(0,122,255,0.1)',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  overviewTitle: { fontSize: 20, fontWeight: '700', marginTop: 12, marginBottom: 8 },
  overviewDescription: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 18, fontWeight: '600' },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  addButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  featuresList: { gap: 12 },
  featureCard: { padding: 16, borderRadius: 12 },
  featureHeader: { flexDirection: 'row', alignItems: 'center' },
  featureIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  featureInfo: { flex: 1, marginRight: 12 },
  featureName: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  featureDescription: { fontSize: 14, marginBottom: 8, lineHeight: 18 },
  categoryBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start' },
  categoryText: { fontSize: 10, fontWeight: '600' },
  ssoList: { gap: 16 },
  ssoCard: { padding: 16, borderRadius: 12 },
  ssoHeader: { flexDirection: 'row', marginBottom: 16 },
  ssoIcon: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  ssoInfo: { flex: 1, justifyContent: 'center' },
  ssoName: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  ssoMeta: { flexDirection: 'row', gap: 8 },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  typeText: { fontSize: 11, fontWeight: '600' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, flexDirection: 'row', alignItems: 'center', gap: 4 },
  statusText: { fontSize: 11, fontWeight: '600' },
  ssoStats: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  statLabel: { fontSize: 12 },
  configureButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, gap: 6 },
  configureButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  addIPForm: { padding: 16, borderRadius: 12, marginBottom: 16 },
  input: { height: 44, borderRadius: 8, paddingHorizontal: 12, marginBottom: 12, fontSize: 14 },
  formButtons: { flexDirection: 'row', gap: 12 },
  formButton: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  formButtonText: { fontSize: 14, fontWeight: '600' },
  ipList: { gap: 12 },
  ipCard: { padding: 16, borderRadius: 12 },
  ipHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  ipInfo: { flex: 1 },
  ipBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, gap: 6, alignSelf: 'flex-start', marginBottom: 8 },
  ipAddress: { fontSize: 14, fontWeight: '600', fontFamily: 'monospace' },
  ipDescription: { fontSize: 14 },
  deleteButton: { padding: 4 },
  ipMeta: { flexDirection: 'row', justifyContent: 'space-between' },
  ipMetaItem: { flex: 1 },
  ipMetaLabel: { fontSize: 11, marginBottom: 4 },
  ipMetaValue: { fontSize: 12, fontWeight: '600' },
  mfaCard: { backgroundColor: 'rgba(0,122,255,0.1)', padding: 32, borderRadius: 16, alignItems: 'center' },
  mfaTitle: { fontSize: 20, fontWeight: '700', marginTop: 16, marginBottom: 12 },
  mfaDescription: { fontSize: 14, textAlign: 'center', marginBottom: 24, lineHeight: 20 },
  mfaStats: { flexDirection: 'row', gap: 32, marginBottom: 24 },
  mfaStat: { alignItems: 'center' },
  mfaStatValue: { fontSize: 32, fontWeight: '700', marginTop: 8, marginBottom: 4 },
  mfaStatLabel: { fontSize: 13 },
  mfaButton: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  mfaButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  subHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 24, marginBottom: 12 },
  subHeaderText: { fontSize: 16, fontWeight: '600' },
  keyList: { gap: 12, paddingBottom: 12 },
  keyCard: { width: 200, padding: 16, borderRadius: 12, marginRight: 12 },
  keyHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  keyName: { fontSize: 15, fontWeight: '600', flex: 1 },
  keyMetaRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  keyMetaLabel: { fontSize: 12 },
  keyMetaValue: { fontSize: 13, fontWeight: '600' },
  vulnList: { gap: 12 },
  vulnCard: { padding: 16, borderRadius: 12 },
  vulnHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  vulnTitle: { fontSize: 15, fontWeight: '600', flex: 1 },
  vulnService: { fontSize: 13, marginBottom: 4 },
  vulnEta: { fontSize: 12 },
  threatList: { gap: 12, paddingBottom: 12 },
  threatCard: { width: 220, padding: 16, borderRadius: 12, marginRight: 12 },
  threatHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  threatTitle: { fontSize: 15, fontWeight: '600' },
  threatSignal: { fontSize: 13, marginBottom: 4 },
  threatAction: { fontSize: 12, marginBottom: 6 },
});
