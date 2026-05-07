import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { 
  Key, Eye, Users, ArrowUp, Shield, Lock, Fingerprint, Activity, Star,
  ChevronRight, CheckCircle, BarChart3, AlertTriangle, Settings, Filter,
  UserCheck, UserX, Clock, Globe, RefreshCw, ShieldCheck, Target
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const SubAgentCard = ({ title, description, icon: Icon, status, onPress, color }: any) => (
  <TouchableOpacity style={[styles.subAgentCard, { backgroundColor: '#fff', borderLeftColor: color, borderLeftWidth: 4 }]} onPress={onPress}>
    <View style={styles.subAgentHeader}>
      <View style={[styles.subAgentIconWrap, { backgroundColor: color + '15' }]}>
        <Icon size={24} color={color} />
      </View>
      <View style={styles.subAgentStatus}>
        <View style={[styles.statusDot, { backgroundColor: status === 'active' ? '#34C759' : '#FF9500' }]} />
        <Text style={styles.statusText}>{status === 'active' ? 'Active' : 'Standby'}</Text>
      </View>
    </View>
    <Text style={styles.subAgentTitle}>{title}</Text>
    <Text style={styles.subAgentDesc} numberOfLines={2}>{description}</Text>
    <View style={styles.subAgentFooter}>
      <Text style={[styles.subAgentLink, { color }]}>Configure</Text>
      <ChevronRight size={16} color={color} />
    </View>
  </TouchableOpacity>
);

const MetricCard = ({ title, value, change, icon: Icon, color }: any) => (
  <View style={[styles.metricCard, { backgroundColor: '#fff' }]}>
    <View style={[styles.metricIconWrap, { backgroundColor: color + '15' }]}>
      <Icon size={20} color={color} />
    </View>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricTitle}>{title}</Text>
    <Text style={[styles.metricChange, { color: change.startsWith('+') ? '#34C759' : change.startsWith('-') ? '#FF3B30' : '#666' }]}>{change}</Text>
  </View>
);

const FeatureToggle = ({ title, description, enabled, onToggle }: any) => (
  <View style={styles.featureToggle}>
    <View style={styles.featureToggleInfo}>
      <Text style={styles.featureToggleTitle}>{title}</Text>
      <Text style={styles.featureToggleDesc}>{description}</Text>
    </View>
    <Switch value={enabled} onValueChange={onToggle} trackColor={{ false: '#767577', true: '#F8BBD9' }} />
  </View>
);

export default function IdentityManagerEnterprisePage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [accessReviews, setAccessReviews] = useState(true);
  const [roleModeling, setRoleModeling] = useState(true);
  const [privilegeMonitoring, setPrivilegeMonitoring] = useState(true);
  const [identityLifecycle, setIdentityLifecycle] = useState(true);

  const stats = [
    { label: 'Identities', value: '45K', icon: Users, color: '#F8BBD9' },
    { label: 'Access Reviews', value: '156', icon: Eye, color: '#FF9500' },
    { label: 'Roles', value: '234', icon: Users, enabled: true, color: '#007AFF' },
    { label: 'MFA Rate', value: '98%', icon: ShieldCheck, color: '#34C759' },
  ];

  const metrics = [
    { title: 'Orphaned', value: '12', change: '-3', icon: UserX, color: '#FF3B30' },
    { title: 'Privileged', value: '89', change: '+2', icon: ArrowUp, color: '#FF9500' },
    { title: 'Stale Access', value: '45', change: '-12', icon: Clock, color: '#007AFF' },
    { title: 'Certified', value: '94%', change: '+1%', icon: CheckCircle, color: '#34C759' },
  ];

  const subAgents = [
    { 
      title: 'AI Access Reviewer', 
      description: 'Automates periodic access reviews and certification campaigns',
      icon: Eye, 
      status: 'active',
      color: '#F8BBD9',
      route: '/ai-agent/security/sub-agents/access-reviewer'
    },
    { 
      title: 'AI Role Modeler', 
      description: 'Analyzes and optimizes role definitions and entitlements',
      icon: Users, 
      status: 'active',
      color: '#FCE4EC',
      route: '/ai-agent/security/sub-agents/role-modeler'
    },
    { 
      title: 'AI Privilege Escalation Monitor', 
      description: 'Monitors and alerts on privilege escalation attempts and abuse',
      icon: ArrowUp, 
      status: 'active',
      color: '#FFF0F5',
      route: '/ai-agent/security/sub-agents/privilege-escalation-monitor'
    },
  ];

  const capabilities = [
    { name: 'Identity Governance', icon: Shield, enabled: true },
    { name: 'Access Reviews', icon: Eye, enabled: true },
    { name: 'Role Management', icon: Users, enabled: true },
    { name: 'Privileged Access', icon: Lock, enabled: true },
    { name: 'Lifecycle Mgmt', icon: RefreshCw, enabled: true },
    { name: 'SSO/OIDC', icon: Globe, enabled: true },
    { name: 'MFA/Step-Up', icon: Fingerprint, enabled: true },
    { name: 'Zero Trust', icon: Target, enabled: true },
  ];

  const recentReviews = [
    { campaign: 'Q1 2024 Access Cert', status: 'in-progress', progress: 67, due: '2024-04-15', owners: 45 },
    { campaign: 'Privileged Access Review', status: 'completed', progress: 100, due: '2024-03-01', owners: 12 },
    { campaign: 'Application Access', status: 'pending', progress: 0, due: '2024-05-01', owners: 120 },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { backgroundColor: '#F8BBD9' + '12' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#F8BBD9' + '25' }]}>
          <Key size={48} color="#F8BBD9" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Identity Manager</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Identity & Access Management
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C759' + '22' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#F8BBD9' + '22' }]}>
            <Star size={12} color="#F8BBD9" />
            <Text style={[styles.badgeText, { color: '#F8BBD9' }]}>Manager</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF9500' + '22' }]}>
            <Users size={12} color="#FF9500" />
            <Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Sub-Agents</Text>
          </View>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {['overview', 'sub-agents', 'reviews', 'settings'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && [styles.activeTab, { backgroundColor: '#F8BBD9' }]]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>IAM Metrics</Text>
            <View style={styles.metricsGrid}>
              {metrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </View>
          </View>

          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
            <View style={styles.capabilitiesGrid}>
              {capabilities.map((cap, index) => (
                <View key={index} style={[styles.capabilityCard, { backgroundColor: cap.enabled ? '#F8BBD9' + '10' : '#F2F2F7' }]}>
                  <cap.icon size={20} color={cap.enabled ? '#F8BBD9' : '#999'} />
                  <Text style={[styles.capabilityText, { color: cap.enabled ? theme.colors.text : '#999' }]}>{cap.name}</Text>
                  {cap.enabled && <CheckCircle size={14} color="#34C759" style={styles.capabilityCheck} />}
                </View>
              ))}
            </View>
          </View>
        </>
      )}

      {/* Sub-Agents Tab */}
      {activeTab === 'sub-agents' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Assigned Sub-Agents (3)</Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>
            AI agents reporting to Identity Manager
          </Text>
          <View style={styles.subAgentsGrid}>
            {subAgents.map((agent, index) => (
              <SubAgentCard
                key={index}
                {...agent}
                onPress={() => router.push(agent.route as any)}
              />
            ))}
          </View>
        </View>
      )}

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Access Reviews</Text>
          {recentReviews.map((review, index) => (
            <View key={index} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewName}>{review.campaign}</Text>
                <View style={[styles.reviewStatusBadge, { backgroundColor: review.status === 'completed' ? '#34C75920' : review.status === 'in-progress' ? '#007AFF20' : '#FF950020' }]}>
                  <Text style={[styles.reviewStatusText, { color: review.status === 'completed' ? '#34C759' : review.status === 'in-progress' ? '#007AFF' : '#FF9500' }]}>{review.status}</Text>
                </View>
              </View>
              <View style={styles.reviewProgressContainer}>
                <View style={styles.reviewProgressBar}>
                  <View style={[styles.reviewProgressFill, { width: review.progress + '%', backgroundColor: review.status === 'completed' ? '#34C759' : '#F8BBD9' }]} />
                </View>
                <Text style={styles.reviewProgressText}>{review.progress}%</Text>
              </View>
              <View style={styles.reviewFooter}>
                <Text style={styles.reviewMeta}>Due: {review.due}</Text>
                <Text style={styles.reviewMeta}>Owners: {review.owners}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Configuration</Text>
          <FeatureToggle
            title="Automated Access Reviews"
            description="Schedule and run access certification campaigns"
            enabled={accessReviews}
            onToggle={setAccessReviews}
          />
          <FeatureToggle
            title="Role Modeling"
            description="AI-powered role optimization and analysis"
            enabled={roleModeling}
            onToggle={setRoleModeling}
          />
          <FeatureToggle
            title="Privilege Escalation Monitor"
            description="Monitor and alert on privilege abuse"
            enabled={privilegeMonitoring}
            onToggle={setPrivilegeMonitoring}
          />
          <FeatureToggle
            title="Identity Lifecycle"
            description="Automate identity provisioning and deprovisioning"
            enabled={identityLifecycle}
            onToggle={setIdentityLifecycle}
          />
        </View>
      )}

      <AgentFeatures agentId="identity-manager" agentName="Identity Manager" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500', textAlign: 'center' },
  badgesRow: { flexDirection: 'row', marginTop: 16, gap: 8 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4 },
  tabContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, gap: 8, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F2F2F7' },
  activeTab: { backgroundColor: '#F8BBD9' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  activeTabText: { color: '#fff' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  sectionSubtitle: { fontSize: 13, marginBottom: 16, marginTop: -10 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  metricIconWrap: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  metricValue: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  metricTitle: { fontSize: 12, color: '#666', marginBottom: 4 },
  metricChange: { fontSize: 12, fontWeight: '600' },
  capabilitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  capabilityCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, gap: 8, flex: 1, minWidth: '45%' },
  capabilityText: { fontSize: 13, fontWeight: '500', flex: 1 },
  capabilityCheck: { marginLeft: 'auto' },
  subAgentsGrid: { gap: 12 },
  subAgentCard: { padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  subAgentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  subAgentIconWrap: { width: 44, height: 44, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  subAgentStatus: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 12, color: '#666' },
  subAgentTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  subAgentDesc: { fontSize: 12, color: '#666', marginBottom: 12 },
  subAgentFooter: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  subAgentLink: { fontSize: 13, fontWeight: '600' },
  reviewCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  reviewName: { fontSize: 16, fontWeight: '600', flex: 1 },
  reviewStatusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  reviewStatusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  reviewProgressContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  reviewProgressBar: { flex: 1, height: 8, backgroundColor: '#E5E5EA', borderRadius: 4, marginRight: 12 },
  reviewProgressFill: { height: 8, borderRadius: 4 },
  reviewProgressText: { fontSize: 12, fontWeight: '600', color: '#666' },
  reviewFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  reviewMeta: { fontSize: 12, color: '#666' },
  featureToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  featureToggleInfo: { flex: 1, paddingRight: 16 },
  featureToggleTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  featureToggleDesc: { fontSize: 12, color: '#666' },
});
