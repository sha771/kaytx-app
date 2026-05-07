import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase,
  TrendingUp, TrendingDown, Crown, Sparkles, Settings,
  Map, FileCheck, BarChart3, CheckCircle2, Scale, Globe,
  ShieldCheck, Layers, Link2, FileText
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function FrameworkMapperPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;
  const [activeTab, setActiveTab] = useState('overview');
  const [autoMapping, setAutoMapping] = useState(true);
  const [complianceTracking, setComplianceTracking] = useState(true);
  const [evidenceMapping, setEvidenceMapping] = useState(true);

  const stats = [
    { label: 'Frameworks', value: '12', change: '+2', icon: Map, color: '#EF4444', trend: 'up' },
    { label: 'Controls Mapped', value: '1,456', change: '+234', icon: Layers, color: '#F59E0B', trend: 'up' },
    { label: 'Compliance %', value: '94%', change: '+5%', icon: Scale, color: '#10B981', trend: 'up' },
    { label: 'Gaps Found', value: '23', change: '-12', icon: AlertTriangle, color: '#3B82F6', trend: 'down' },
  ];

  const kpis = [
    { label: 'Mapping Accuracy', value: '98.5%', target: '95%', status: 'exceeding', icon: Map },
    { label: 'Coverage Rate', value: '94%', target: '90%', status: 'exceeding', icon: Layers },
    { label: 'Gap Resolution', value: '3.2 days', target: '7 days', status: 'exceeding', icon: Clock },
    { label: 'Evidence Linkage', value: '99.1%', target: '95%', status: 'exceeding', icon: Link2 },
  ];

  const frameworks = [
    { name: 'SOC 2', controls: 87, compliance: 96, color: '#10B981' },
    { name: 'ISO 27001', controls: 114, compliance: 92, color: '#3B82F6' },
    { name: 'PCI DSS', controls: 78, compliance: 98, color: '#F59E0B' },
    { name: 'HIPAA', controls: 54, compliance: 89, color: '#8B5CF6' },
    { name: 'NIST CSF', controls: 108, compliance: 94, color: '#EF4444' },
  ];

  const capabilities = [
    'Framework Mapping', 'Control Identification', 'Compliance Tracking', 'Evidence Correlation',
    'Gap Analysis', 'Risk Assessment', 'Control Inheritance', 'Audit Support',
    'Policy Alignment', 'Control Optimization', 'Cross-Framework Mapping', 'Continuous Monitoring',
    'Regulatory Mapping', 'Control Testing', 'Compliance Reporting'
  ];

  const responsibilities = [
    'Map security controls to compliance framework requirements',
    'Identify gaps between current controls and framework mandates',
    'Track compliance status across multiple frameworks',
    'Correlate evidence to specific control requirements',
    'Maintain control-to-framework mapping documentation',
    'Support audit preparation with compliance evidence',
    'Map controls across multiple frameworks for efficiency',
    'Identify control inheritance and dependencies',
    'Align security policies to framework requirements',
    'Track remediation progress for compliance gaps',
    'Support regulatory examinations with mapping data',
    'Generate compliance reports for stakeholders',
    'Map technical controls to policy statements',
    'Support continuous compliance monitoring',
    'Facilitate control optimization for multiple frameworks'
  ];

  const activities = [
    { action: 'Mapped controls', target: 'SOC 2 to ISO 27001', time: '1 hour ago', icon: Map },
    { action: 'Tracked compliance', target: '94% - NIST CSF', time: '2 hours ago', icon: Scale },
    { action: 'Identified gaps', target: '23 control gaps', time: '4 hours ago', icon: AlertTriangle },
    { action: 'Linked evidence', target: '1,234 evidence items', time: '6 hours ago', icon: Link2 },
    { action: 'Generated report', target: 'Q1 compliance report', time: '1 day ago', icon: FileText },
    { action: 'Resolved gap', target: 'Access control - resolved', time: '2 days ago', icon: CheckCircle2 },
  ];

  const quickActions = [
    { label: 'Map Framework', icon: Map, color: '#EF4444' },
    { label: 'Find Gaps', icon: AlertTriangle, color: '#F59E0B' },
    { label: 'Track Compliance', icon: Scale, color: '#10B981' },
    { label: 'Link Evidence', icon: Link2, color: '#3B82F6' },
    { label: 'View Reports', icon: BarChart3, color: '#8B5CF6' },
    { label: 'Audit Prep', icon: FileCheck, color: '#EC4899' },
    { label: 'Controls', icon: Layers, color: '#6366F1' },
    { label: 'Status', icon: ShieldCheck, color: '#F59E0B' },
  ];

  const AlertTriangle = ({ size, color }: { size: number; color: string }) => (
    <View style={{ width: size, height: size * 0.9, borderRadius: 2, backgroundColor: color }}>
      <Text style={{ color: '#fff', fontSize: size * 0.6, fontWeight: 'bold', textAlign: 'center', marginTop: size * 0.1 }}>!</Text>
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={[styles.iconContainer, { backgroundColor: '#EF444415' }]}>
          <Map size={48} color="#EF4444" />
        </View>
        <Text style={[styles.heroTitle, { color: colors.text }]}>AI Framework Mapper</Text>
        <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
          Compliance framework mapping and control alignment specialist
        </Text>
        <View style={styles.badgesContainer}>
          <View style={[styles.badge, { backgroundColor: '#34C75920' }]}>
            <Activity size={14} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#EF444420' }]}>
            <Crown size={14} color="#EF4444" />
            <Text style={[styles.badgeText, { color: '#EF4444' }]}>Sub-Agent</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#6366F120' }]}>
            <Sparkles size={14} color="#6366F1" />
            <Text style={[styles.badgeText, { color: '#6366F1' }]}>AI-Powered</Text>
          </View>
        </View>
      </View>

      {/* Parent Agent Navigation */}
      <TouchableOpacity style={[styles.parentCard, { backgroundColor: colors.card }]} onPress={() => router.push('/ai-agent/security/security-compliance-specialist-enterprise')}>
        <View style={[styles.parentIcon, { backgroundColor: '#EF444415' }]}>
          <Settings size={24} color="#EF4444" />
        </View>
        <View style={styles.parentInfo}>
          <Text style={[styles.parentLabel, { color: colors.textSecondary }]}>Reports to</Text>
          <Text style={[styles.parentName, { color: colors.text }]}>AI Security Compliance Specialist</Text>
        </View>
        <ArrowRight size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      <View style={styles.tabContainer}>
        {['overview', 'frameworks', 'capabilities', 'settings'].map((tab) => (
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
                <View style={[styles.kpiIcon, { backgroundColor: '#EF444415' }]}>
                  <kpi.icon size={16} color="#EF4444" />
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
          The AI Framework Mapper automatically maps security controls to compliance frameworks, tracks 
          compliance status, identifies gaps, and correlates evidence to control requirements.
        </Text>
      </View>
      </>)}

      {activeTab === 'frameworks' && (<>
      {/* Frameworks */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Compliance Frameworks</Text>
        {frameworks.map((fw, index) => (
          <View key={index} style={styles.frameworkCard}>
            <View style={styles.frameworkHeader}>
              <View style={[styles.frameworkIcon, { backgroundColor: fw.color + '15' }]}>
                <Map size={20} color={fw.color} />
              </View>
              <View style={styles.frameworkInfo}>
                <Text style={[styles.frameworkName, { color: colors.text }]}>{fw.name}</Text>
                <Text style={[styles.frameworkControls, { color: colors.textSecondary }]}>{fw.controls} controls</Text>
              </View>
              <View style={styles.frameworkCompliance}>
                <Text style={[styles.complianceValue, { color: fw.color }]}>{fw.compliance}%</Text>
                <Text style={[styles.complianceLabel, { color: colors.textSecondary }]}>compliant</Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: fw.compliance + '%', backgroundColor: fw.color }]} />
            </View>
          </View>
        ))}
      </View>

      {/* Activity Feed */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
        {activities.map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: '#EF444415' }]}>
              <activity.icon size={16} color="#EF4444" />
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

      {activeTab === 'capabilities' && (<>
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
            <View style={[styles.bullet, { backgroundColor: '#EF4444' }]} />
            <Text style={[styles.responsibilityText, { color: colors.textSecondary }]}>{resp}</Text>
          </View>
        ))}
      </View>

      {/* A2A Endpoints */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>A2A Endpoints</Text>
        {[
          { endpoint: '/consult/framework-mapper', desc: 'Consult on framework mapping' },
          { endpoint: '/framework-mapper/map', desc: 'Map controls to framework' },
          { endpoint: '/framework-mapper/gaps', desc: 'Identify compliance gaps' },
          { endpoint: '/framework-mapper/report', desc: 'Generate compliance report' },
        ].map((item, index) => (
          <View key={index} style={styles.endpointRow}>
            <Zap size={16} color="#EF4444" />
            <View style={styles.endpointInfo}>
              <Text style={[styles.endpointText, { color: colors.text }]}>{item.endpoint}</Text>
              <Text style={[styles.endpointDesc, { color: colors.textSecondary }]}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </View>
      </>)}

      {activeTab === 'settings' && (
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Configuration</Text>
          
          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Auto-Mapping</Text>
              <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Automatically map controls</Text>
            </View>
            <Switch value={autoMapping} onValueChange={setAutoMapping} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Compliance Tracking</Text>
              <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Track compliance status</Text>
            </View>
            <Switch value={complianceTracking} onValueChange={setComplianceTracking} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Evidence Mapping</Text>
              <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Link evidence to controls</Text>
            </View>
            <Switch value={evidenceMapping} onValueChange={setEvidenceMapping} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>
        </View>
      )}

      {/* Agent Features */}
      <AgentFeatures agentId="framework-mapper" agentName="AI Framework Mapper" />

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, borderBottomWidth: 1 },
  iconContainer: { width: 96, height: 96, borderRadius: 48, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  heroSubtitle: { fontSize: 15, marginTop: 6, fontWeight: '500' },
  badgesContainer: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 5 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  parentCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 12, gap: 12 },
  parentIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  parentInfo: { flex: 1 },
  parentLabel: { fontSize: 12, marginBottom: 2 },
  parentName: { fontSize: 16, fontWeight: '600' },
  tabContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, gap: 8, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F2F2F7' },
  activeTabTab: { backgroundColor: '#EF4444' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  activeTabTabText: { color: '#fff' },
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
  frameworkCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  frameworkHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  frameworkIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  frameworkInfo: { flex: 1, marginLeft: 12 },
  frameworkName: { fontSize: 16, fontWeight: '600' },
  frameworkControls: { fontSize: 12, marginTop: 2 },
  frameworkCompliance: { alignItems: 'flex-end' },
  complianceValue: { fontSize: 18, fontWeight: 'bold' },
  complianceLabel: { fontSize: 11 },
  progressBar: { height: 6, backgroundColor: '#E5E5EA', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  activityItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityAction: { fontSize: 13, fontWeight: '500' },
  activityTarget: { fontSize: 12, marginTop: 2 },
  activityTime: { fontSize: 11 },
  quickActionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  actionButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, gap: 8, flex: 1, minWidth: '45%' },
  actionText: { fontSize: 13, fontWeight: '500' },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  responsibilityItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10, gap: 10 },
  bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
  responsibilityText: { flex: 1, fontSize: 13, lineHeight: 18 },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  endpointInfo: { flex: 1 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  endpointDesc: { fontSize: 12, marginTop: 2 },
  featureToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  featureToggleInfo: { flex: 1, paddingRight: 16 },
  featureToggleTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  featureToggleDesc: { fontSize: 12 },
});
