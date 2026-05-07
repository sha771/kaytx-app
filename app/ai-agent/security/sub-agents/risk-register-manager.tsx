import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase,
  ClipboardList, AlertTriangle, CheckCircle, BarChart3, FileText,
  TrendingUp, TrendingDown, Calendar
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function RiskRegisterManagerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [autoTracking, setAutoTracking] = useState(true);
  const [riskAlerts, setRiskAlerts] = useState(true);
  const [executiveReporting, setExecutiveReporting] = useState(true);

  const stats = [
    { label: 'Total Risks', value: '342', icon: ClipboardList, color: '#8B5CF6' },
    { label: 'High Severity', value: '28', icon: AlertTriangle, color: '#EF4444' },
    { label: 'Mitigated', value: '156', icon: CheckCircle, color: '#10B981' },
    { label: 'Under Review', value: '47', icon: FileText, color: '#F59E0B' },
  ];

  const risks = [
    { id: 'R-1042', title: 'Data Center Outage', severity: 'high', status: 'active', owner: 'IT Ops', date: '2024-05-15' },
    { id: 'R-1038', title: 'Third-party Breach', severity: 'critical', status: 'mitigated', owner: 'Security', date: '2024-04-22' },
    { id: 'R-1029', title: 'Compliance Gap', severity: 'medium', status: 'under_review', owner: 'Compliance', date: '2024-03-18' },
    { id: 'R-1015', title: 'Insider Threat', severity: 'high', status: 'active', owner: 'HR/Security', date: '2024-02-10' },
  ];

  const capabilities = [
    { name: 'Risk Identification', icon: AlertTriangle, enabled: true },
    { name: 'Impact Assessment', icon: BarChart3, enabled: true },
    { name: 'Mitigation Tracking', icon: CheckCircle, enabled: true },
    { name: 'Owner Assignment', icon: Target, enabled: true },
    { name: 'Status Monitoring', icon: Activity, enabled: true },
    { name: 'Report Generation', icon: FileText, enabled: true },
    { name: 'Trend Analysis', icon: TrendingUp, enabled: true },
    { name: 'Compliance Mapping', icon: Shield, enabled: true },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#8B5CF620' }]}>
          <ClipboardList size={56} color="#8B5CF6" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Risk Register Manager</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI VP Governance & Risk</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#8B5CF622' }]}>
            <Briefcase size={12} color="#8B5CF6" />
            <Text style={[styles.badgeText, { color: '#8B5CF6' }]}>Manager</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#EF444422' }]}>
            <AlertTriangle size={12} color="#EF4444" />
            <Text style={[styles.badgeText, { color: '#EF4444' }]}>342 Risks</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.tabContainer}>
        {['overview', 'risks', 'capabilities', 'settings'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'overview' && (
        <>
          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
            <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
              AI Risk Register Manager maintains the organization's risk register, tracking identified risks, 
              mitigation status, ownership, and compliance with risk management frameworks.
            </Text>
          </View>

          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
            <View style={styles.capabilitiesGrid}>
              {capabilities.map((cap, index) => (
                <View key={index} style={[styles.capabilityCard, { backgroundColor: cap.enabled ? '#8B5CF610' : '#F2F2F7' }]}>
                  <cap.icon size={20} color={cap.enabled ? '#8B5CF6' : '#999'} />
                  <Text style={[styles.capabilityText, { color: cap.enabled ? theme.colors.text : '#999' }]}>{cap.name}</Text>
                  {cap.enabled && <CheckCircle size={14} color="#34C759" style={styles.capabilityCheck} />}
                </View>
              ))}
            </View>
          </View>
        </>
      )}

      {activeTab === 'risks' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Risk Register</Text>
          {risks.map((risk, index) => (
            <View key={index} style={styles.riskCard}>
              <View style={styles.riskHeader}>
                <View style={styles.riskIdBadge}>
                  <Text style={styles.riskId}>{risk.id}</Text>
                </View>
                <Text style={styles.riskTitle} numberOfLines={1}>{risk.title}</Text>
                <View style={[styles.severityBadge, { backgroundColor: risk.severity === 'critical' ? '#DC262620' : risk.severity === 'high' ? '#EF444420' : '#F59E0B20' }]}>
                  <Text style={[styles.severityText, { color: risk.severity === 'critical' ? '#DC2626' : risk.severity === 'high' ? '#EF4444' : '#F59E0B' }]}>{risk.severity}</Text>
                </View>
              </View>
              <View style={styles.riskFooter}>
                <View style={styles.riskMeta}>
                  <Activity size={12} color="#666" />
                  <Text style={[styles.riskStatus, { color: risk.status === 'mitigated' ? '#10B981' : risk.status === 'active' ? '#EF4444' : '#F59E0B' }]}>{risk.status.replace('_', ' ')}</Text>
                </View>
                <View style={styles.riskMeta}>
                  <Target size={12} color="#666" />
                  <Text style={styles.riskMetaText}>{risk.owner}</Text>
                </View>
                <View style={styles.riskMeta}>
                  <Calendar size={12} color="#666" />
                  <Text style={styles.riskMetaText}>{risk.date}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'capabilities' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
          {[
            { endpoint: '/consult/risk-register-manager', desc: 'Consult on risk register' },
            { endpoint: '/risk-register-manager/register', desc: 'Register a new risk' },
            { endpoint: '/risk-register-manager/update', desc: 'Update risk status' },
            { endpoint: '/risk-register-manager/report', desc: 'Generate risk reports' },
          ].map((item, index) => (
            <View key={index} style={styles.endpointRow}>
              <Zap size={16} color="#8B5CF6" />
              <View style={styles.endpointInfo}>
                <Text style={[styles.endpointText, { color: theme.colors.text }]}>{item.endpoint}</Text>
                <Text style={[styles.endpointDesc, { color: theme.colors.textSecondary }]}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'settings' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Configuration</Text>
          
          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Auto-Tracking</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Automatically track risk changes</Text>
            </View>
            <Switch value={autoTracking} onValueChange={setAutoTracking} trackColor={{ false: '#767577', true: '#8B5CF6' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Risk Alerts</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Alert on high severity risks</Text>
            </View>
            <Switch value={riskAlerts} onValueChange={setRiskAlerts} trackColor={{ false: '#767577', true: '#8B5CF6' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Executive Reporting</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Generate executive reports</Text>
            </View>
            <Switch value={executiveReporting} onValueChange={setExecutiveReporting} trackColor={{ false: '#767577', true: '#8B5CF6' }} />
          </View>
        </View>
      )}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/security/vp-governance-risk-enterprise')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Shield size={24} color="#8B5CF6" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI VP Governance & Risk</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent (133)</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="risk-register-manager" agentName="AI Risk Register Manager" />
      <View style={{ height: 40 }} />
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
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4, textAlign: 'center' },
  tabContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, gap: 8, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F2F2F7' },
  activeTab: { backgroundColor: '#8B5CF6' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  activeTabText: { color: '#fff' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  capabilitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  capabilityCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, gap: 8, flex: 1, minWidth: '45%' },
  capabilityText: { fontSize: 13, fontWeight: '500', flex: 1 },
  capabilityCheck: { marginLeft: 'auto' },
  riskCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  riskHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  riskIdBadge: { backgroundColor: '#F3F4F6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  riskId: { fontSize: 11, fontWeight: '600', color: '#6B7280' },
  riskTitle: { flex: 1, fontSize: 14, fontWeight: '500' },
  severityBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  severityText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  riskFooter: { flexDirection: 'row', gap: 16 },
  riskMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  riskStatus: { fontSize: 12, fontWeight: '500', textTransform: 'capitalize' },
  riskMetaText: { fontSize: 12, color: '#666' },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  endpointInfo: { flex: 1 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  endpointDesc: { fontSize: 12, marginTop: 2 },
  featureToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  featureToggleInfo: { flex: 1, paddingRight: 16 },
  featureToggleTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  featureToggleDesc: { fontSize: 12 },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
