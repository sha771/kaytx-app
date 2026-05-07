import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Shield,
  Activity,
  Zap,
  Target,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Crown,
  Sparkles,
  Settings,
  GitBranch,
  Network,
  Bug,
  Eye,
  Layers,
  ShieldAlert,
  Gauge,
  Briefcase
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function ThreatModelerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;
  const [activeTab, setActiveTab] = useState('overview');
  const [strideAnalysis, setStrideAnalysis] = useState(true);
  const [autoModeling, setAutoModeling] = useState(true);
  const [threatIntel, setThreatIntel] = useState(true);

  const stats = [
    { label: 'Threat Models', value: '89', change: '+12', icon: Network, color: '#EF4444', trend: 'up' },
    { label: 'Vulnerabilities Found', value: '234', change: '+45', icon: Bug, color: '#DC2626', trend: 'up' },
    { label: 'Risk Mitigation %', value: '87%', change: '+8%', icon: ShieldAlert, color: '#10B981', trend: 'up' },
    { label: 'Avg Model Time', value: '2.5 hrs', change: '-30 min', icon: Clock, color: '#F59E0B', trend: 'down' },
  ];

  const kpis = [
    { label: 'Model Accuracy', value: '96.5%', target: '95%', status: 'exceeding', icon: CheckCircle2 },
    { label: 'Coverage Rate', value: '94%', target: '90%', status: 'exceeding', icon: Layers },
    { label: 'Risk Identification', value: '98.2%', target: '95%', status: 'exceeding', icon: Eye },
    { label: 'Stakeholder Approval', value: '4.8/5', target: '4.5/5', status: 'exceeding', icon: Activity },
  ];

  const capabilities = [
    'STRIDE Analysis', 'Attack Surface Mapping', 'Data Flow Diagrams', 'Trust Boundary Identification',
    'Threat Scenario Development', 'Risk Assessment', 'Mitigation Strategy', 'Compliance Mapping',
    'Architecture Review', 'Asset Classification', 'Attack Tree Modeling', 'Impact Analysis',
    'Likelihood Scoring', 'Control Gap Analysis', 'Report Generation'
  ];

  const responsibilities = [
    'Conduct STRIDE analysis for system components and data flows',
    'Map attack surfaces to identify potential entry points for threats',
    'Create data flow diagrams showing information movement and storage',
    'Identify trust boundaries where security controls are needed',
    'Develop realistic threat scenarios based on attacker capabilities',
    'Assess risks by combining likelihood and impact factors',
    'Design mitigation strategies for identified threats',
    'Map threats to compliance requirements and control frameworks',
    'Review system architecture for security design flaws',
    'Classify assets based on sensitivity and business value',
    'Model attack trees to understand multi-step attack paths',
    'Analyze potential business impact of successful attacks',
    'Score threat likelihood based on threat intelligence',
    'Identify gaps in existing security controls',
    'Generate comprehensive threat modeling reports'
  ];

  const activities = [
    { action: 'Completed model', target: 'Payment system v2.0', time: '2 hours ago', icon: Network },
    { action: 'Identified threat', target: 'API authentication bypass', time: '4 hours ago', icon: Bug },
    { action: 'Mapped surface', target: 'Cloud infrastructure', time: '6 hours ago', icon: GitBranch },
    { action: 'Reviewed architecture', target: 'Microservices design', time: '1 day ago', icon: Layers },
    { action: 'Generated report', target: 'Quarterly threat model', time: '2 days ago', icon: BarChart3 },
    { action: 'Validated controls', target: 'Data encryption', time: '3 days ago', icon: ShieldAlert },
  ];

  const quickActions = [
    { label: 'New Model', icon: Network, color: '#EF4444' },
    { label: 'STRIDE Analysis', icon: GitBranch, color: '#F59E0B' },
    { label: 'Map Surface', icon: Eye, color: '#10B981' },
    { label: 'Attack Tree', icon: Bug, color: '#DC2626' },
    { label: 'Risk Score', icon: Gauge, color: '#8B5CF6' },
    { label: 'View Reports', icon: BarChart3, color: '#3B82F6' },
    { label: 'Gap Analysis', icon: AlertTriangle, color: '#EC4899' },
    { label: 'Export Model', icon: Layers, color: '#10B981' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={[styles.iconContainer, { backgroundColor: '#DC262615' }]}>
          <Network size={48} color="#DC2626" />
        </View>
        <Text style={[styles.heroTitle, { color: colors.text }]}>AI Threat Modeler</Text>
        <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
          Security threat modeling and risk assessment specialist
        </Text>
        <View style={styles.badgesContainer}>
          <View style={[styles.badge, { backgroundColor: '#34C75920' }]}>
            <Activity size={14} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#DC262620' }]}>
            <Crown size={14} color="#DC2626" />
            <Text style={[styles.badgeText, { color: '#DC2626' }]}>Sub-Agent</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#6366F120' }]}>
            <Sparkles size={14} color="#6366F1" />
            <Text style={[styles.badgeText, { color: '#6366F1' }]}>AI-Powered</Text>
          </View>
        </View>
      </View>

      {/* Parent Agent Navigation */}
      <TouchableOpacity style={[styles.parentCard, { backgroundColor: colors.card }]} onPress={() => router.push('/ai-agent/security/security-architect-enterprise')}>
        <View style={[styles.parentIcon, { backgroundColor: '#DC262615' }]}>
          <Settings size={24} color="#DC2626" />
        </View>
        <View style={styles.parentInfo}>
          <Text style={[styles.parentLabel, { color: colors.textSecondary }]}>Reports to</Text>
          <Text style={[styles.parentName, { color: colors.text }]}>AI Security Architect</Text>
        </View>
        <ArrowRight size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      <View style={styles.tabContainer}>
        {['overview', 'models', 'capabilities', 'settings'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTabTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'overview' && (<>
      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={[styles.statCard, { backgroundColor: colors.card }]}>
            <View style={styles.statHeader}>
              <View style={[styles.statIcon, { backgroundColor: stat.color + '15' }]}>
                <stat.icon size={20} color={stat.color} />
              </View>
              <View style={[styles.changeBadge, { backgroundColor: stat.trend === 'up' ? '#34C75915' : '#FF3B3015' }]}>
                {stat.trend === 'up' ? <TrendingUp size={12} color="#34C759" /> : <TrendingDown size={12} color="#FF3B30" />}
                <Text style={[styles.changeText, { color: stat.trend === 'up' ? '#34C759' : '#FF3B30' }]}>{stat.change}</Text>
              </View>
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* KPIs Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Performance KPIs</Text>
        <View style={styles.kpiGrid}>
          {kpis.map((kpi, index) => (
            <View key={index} style={styles.kpiCard}>
              <View style={styles.kpiHeader}>
                <View style={[styles.kpiIcon, { backgroundColor: '#DC262615' }]}>
                  <kpi.icon size={16} color="#DC2626" />
                </View>
                <View style={[styles.statusBadge, { backgroundColor: kpi.status === 'exceeding' ? '#34C75915' : kpi.status === 'meeting' ? '#007AFF15' : '#FF950015' }]}>
                  <Text style={[styles.statusText, { color: kpi.status === 'exceeding' ? '#34C759' : kpi.status === 'meeting' ? '#007AFF' : '#FF9500' }]}>
                    {kpi.status === 'exceeding' ? 'Exceeding' : kpi.status === 'meeting' ? 'On Track' : 'At Risk'}
                  </Text>
                </View>
              </View>
              <Text style={[styles.kpiValue, { color: colors.text }]}>{kpi.value}</Text>
              <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>{kpi.label}</Text>
              <Text style={[styles.kpiTarget, { color: colors.textSecondary }]}>Target: {kpi.target}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Overview Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Overview</Text>
        <Text style={[styles.overviewText, { color: colors.textSecondary }]}>
          The AI Threat Modeler systematically identifies, analyzes, and documents security threats to systems and 
          applications. Using methodologies like STRIDE, this agent creates comprehensive threat models that inform 
          security architecture decisions and risk mitigation strategies.
        </Text>
      </View>
      </>)}

      {activeTab === 'models' && (<>
      {/* Capabilities Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#EF444415' }]}>
              <Text style={[styles.tagText, { color: '#EF4444' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Responsibilities Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((resp, index) => (
          <View key={index} style={styles.responsibilityItem}>
            <View style={[styles.bullet, { backgroundColor: '#DC2626' }]} />
            <Text style={[styles.responsibilityText, { color: colors.textSecondary }]}>{resp}</Text>
          </View>
        ))}
      </View>

      {/* Activity Feed */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
        {activities.map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: '#DC262615' }]}>
              <activity.icon size={16} color="#DC2626" />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityAction, { color: colors.text }]}>{activity.action}</Text>
              <Text style={[styles.activityTarget, { color: colors.textSecondary }]}>{activity.target}</Text>
            </View>
            <Text style={[styles.activityTime, { color: colors.textSecondary }]}>{activity.time}</Text>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: action.color + '10' }]}>
              <action.icon size={20} color={action.color} />
              <Text style={[styles.actionText, { color: action.color }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      </>)}

      {activeTab === 'capabilities' && (
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>A2A Endpoints</Text>
          {[
            { endpoint: '/consult/threat-modeler', desc: 'Consult on threat modeling' },
            { endpoint: '/threat-modeler/model', desc: 'Create threat model' },
            { endpoint: '/threat-modeler/stride', desc: 'Run STRIDE analysis' },
            { endpoint: '/threat-modeler/report', desc: 'Generate threat model report' },
          ].map((item, index) => (
            <View key={index} style={styles.endpointRow}>
              <Zap size={16} color="#DC2626" />
              <View style={styles.endpointInfo}>
                <Text style={[styles.endpointText, { color: colors.text }]}>{item.endpoint}</Text>
                <Text style={[styles.endpointDesc, { color: colors.textSecondary }]}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'settings' && (
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Configuration</Text>
          
          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: colors.text }]}>STRIDE Analysis</Text>
              <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Enable STRIDE methodology</Text>
            </View>
            <Switch value={strideAnalysis} onValueChange={setStrideAnalysis} trackColor={{ false: '#767577', true: '#DC2626' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Auto-Modeling</Text>
              <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Automatically generate threat models</Text>
            </View>
            <Switch value={autoModeling} onValueChange={setAutoModeling} trackColor={{ false: '#767577', true: '#DC2626' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Threat Intel Integration</Text>
              <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Integrate with threat intelligence feeds</Text>
            </View>
            <Switch value={threatIntel} onValueChange={setThreatIntel} trackColor={{ false: '#767577', true: '#DC2626' }} />
          </View>
        </View>
      )}

      {/* Agent Features */}
      <AgentFeatures agentId="threat-modeler" agentName="AI Threat Modeler" />

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  heroSubtitle: { fontSize: 15, marginTop: 6, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 5 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  badgesContainer: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  iconContainer: { width: 96, height: 96, borderRadius: 48, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  tabContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, gap: 8, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F2F2F7' },
  activeTabTab: { backgroundColor: '#DC2626' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  activeTabTabText: { color: '#fff' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 12 },
  statHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  statIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: 'bold', marginTop: 4 },
  statLabel: { fontSize: 11, marginTop: 4, textAlign: 'center' },
  changeBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, gap: 4 },
  changeText: { fontSize: 11, fontWeight: '600' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  overviewText: { fontSize: 14, lineHeight: 22 },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  kpiCard: { flex: 1, minWidth: '45%', padding: 12, borderRadius: 10, backgroundColor: '#F9FAFB', marginBottom: 8 },
  kpiHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  kpiIcon: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  kpiValue: { fontSize: 18, fontWeight: 'bold' },
  kpiLabel: { fontSize: 12, marginTop: 2 },
  kpiTarget: { fontSize: 11, marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  statusText: { fontSize: 10, fontWeight: '600' },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  responsibilityItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10, gap: 10 },
  bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
  responsibilityText: { flex: 1, fontSize: 13, lineHeight: 18 },
  activityItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityAction: { fontSize: 13, fontWeight: '500' },
  activityTarget: { fontSize: 12, marginTop: 2 },
  activityTime: { fontSize: 11 },
  quickActionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  actionButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, gap: 8, flex: 1, minWidth: '45%' },
  actionText: { fontSize: 13, fontWeight: '500' },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  endpointInfo: { flex: 1 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  endpointDesc: { fontSize: 12, marginTop: 2 },
  featureToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  featureToggleInfo: { flex: 1, paddingRight: 16 },
  featureToggleTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  featureToggleDesc: { fontSize: 12 },
  parentCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 12, gap: 12 },
  parentIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  parentInfo: { flex: 1 },
  parentLabel: { fontSize: 12, marginBottom: 2 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
