import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase, Wrench, 
  CheckCircle, AlertTriangle, BarChart3, Eye, FileText, Lightbulb, ShieldCheck,
  Settings, Filter, Download, Share2, Play, Pause, RefreshCw
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function RemediationAdvisorPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [autoRemediation, setAutoRemediation] = useState(true);
  const [priorityScoring, setPriorityScoring] = useState(true);
  const [trackingEnabled, setTrackingEnabled] = useState(true);

  const stats = [
    { label: 'Advice Given', value: '1,234', icon: Lightbulb, color: '#F48FB1' },
    { label: 'Remediated', value: '89%', icon: CheckCircle, color: '#34C759' },
    { label: 'Avg Time', value: '4.2d', icon: Clock, color: '#FF9500' },
    { label: 'Patched', value: '892', icon: ShieldCheck, color: '#007AFF' },
  ];

  const remediations = [
    { id: 'REM-2024-0156', vuln: 'SQL Injection', priority: 'Critical', status: 'in-progress', eta: '2 days', owner: 'Dev Team' },
    { id: 'REM-2024-0155', vuln: 'XSS Vulnerability', priority: 'High', status: 'pending', eta: '5 days', owner: 'Security Team' },
    { id: 'REM-2024-0154', vuln: 'Insecure Cookies', priority: 'Medium', status: 'completed', eta: 'Done', owner: 'Dev Team' },
    { id: 'REM-2024-0153', vuln: 'Missing Headers', priority: 'Low', status: 'scheduled', eta: '14 days', owner: 'Ops Team' },
  ];

  const capabilities = [
    { name: 'Auto Remediation', icon: Wrench, enabled: true },
    { name: 'Priority Scoring', icon: BarChart3, enabled: true },
    { name: 'Step-by-Step Guide', icon: FileText, enabled: true },
    { name: 'Progress Tracking', icon: Eye, enabled: true },
    { name: 'Risk Assessment', icon: AlertTriangle, enabled: true },
    { name: 'Patch Validation', icon: CheckCircle, enabled: true },
    { name: 'SLA Monitoring', icon: Clock, enabled: true },
    { name: 'Reporting', icon: FileText, enabled: true },
  ];

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'Critical': return '#C62828';
      case 'High': return '#FF3B30';
      case 'Medium': return '#FF9500';
      case 'Low': return '#34C759';
      default: return '#666';
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#F48FB120' }]}>
          <Wrench size={56} color="#F48FB1" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Remediation Advisor</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI Penetration Tester</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#F48FB122' }]}>
            <Briefcase size={12} color="#F48FB1" />
            <Text style={[styles.badgeText, { color: '#F48FB1' }]}>Specialist</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <CheckCircle size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>89% Fixed</Text>
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
        {['overview', 'remediations', 'capabilities', 'settings'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && [styles.activeTab, { backgroundColor: '#F48FB1' }]]}
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
              AI Remediation Advisor provides actionable remediation guidance for discovered vulnerabilities. 
              Automatically prioritizes fixes based on risk, generates step-by-step remediation procedures, 
              and tracks remediation progress to completion.
            </Text>
          </View>

          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
            <View style={styles.capabilitiesGrid}>
              {capabilities.map((cap, index) => (
                <View key={index} style={[styles.capabilityCard, { backgroundColor: cap.enabled ? '#F48FB1' + '10' : '#F2F2F7' }]}>
                  <cap.icon size={20} color={cap.enabled ? '#F48FB1' : '#999'} />
                  <Text style={[styles.capabilityText, { color: cap.enabled ? theme.colors.text : '#999' }]}>{cap.name}</Text>
                  {cap.enabled && <CheckCircle size={14} color="#34C759" style={styles.capabilityCheck} />}
                </View>
              ))}
            </View>
          </View>
        </>
      )}

      {activeTab === 'remediations' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Remediations</Text>
          {remediations.map((rem) => (
            <View key={rem.id} style={[styles.remCard, { borderLeftColor: getPriorityColor(rem.priority) }]}>
              <View style={styles.remHeader}>
                <Text style={styles.remId}>{rem.id}</Text>
                <View style={[styles.remPriorityBadge, { backgroundColor: getPriorityColor(rem.priority) + '20' }]}>
                  <Text style={[styles.remPriorityText, { color: getPriorityColor(rem.priority) }]}>{rem.priority}</Text>
                </View>
              </View>
              <Text style={styles.remVuln}>{rem.vuln}</Text>
              <View style={styles.remMeta}>
                <Text style={styles.remMetaText}>Status: {rem.status}</Text>
                <Text style={styles.remMetaText}>ETA: {rem.eta}</Text>
                <Text style={styles.remMetaText}>Owner: {rem.owner}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'capabilities' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
          {[
            { endpoint: '/consult/remediation-advisor', desc: 'Consult on remediation strategies' },
            { endpoint: '/remediation-advisor/execute', desc: 'Execute remediation workflows' },
            { endpoint: '/remediation-advisor/analyze', desc: 'Analyze vulnerability remediation needs' },
            { endpoint: '/remediation-advisor/track', desc: 'Track remediation progress' },
          ].map((item, index) => (
            <View key={index} style={styles.endpointRow}>
              <Zap size={16} color="#F48FB1" />
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
              <Text style={styles.featureToggleTitle}>Auto-Remediation</Text>
              <Text style={styles.featureToggleDesc}>Enable automatic remediation for low-risk issues</Text>
            </View>
            <Switch value={autoRemediation} onValueChange={setAutoRemediation} trackColor={{ false: '#767577', true: '#F48FB1' }} />
          </View>
          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={styles.featureToggleTitle}>Priority Scoring</Text>
              <Text style={styles.featureToggleDesc}>Auto-prioritize based on risk and business impact</Text>
            </View>
            <Switch value={priorityScoring} onValueChange={setPriorityScoring} trackColor={{ false: '#767577', true: '#F48FB1' }} />
          </View>
          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={styles.featureToggleTitle}>Progress Tracking</Text>
              <Text style={styles.featureToggleDesc}>Track and report on remediation progress</Text>
            </View>
            <Switch value={trackingEnabled} onValueChange={setTrackingEnabled} trackColor={{ false: '#767577', true: '#F48FB1' }} />
          </View>
        </View>
      )}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/security/penetration-tester-enterprise')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Shield size={24} color="#F48FB1" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI Penetration Tester</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent (140)</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="remediation-advisor" agentName="AI Remediation Advisor" />
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
  activeTab: { backgroundColor: '#F48FB1' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  activeTabText: { color: '#fff' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  capabilitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  capabilityCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, gap: 8, flex: 1, minWidth: '45%' },
  capabilityText: { fontSize: 13, fontWeight: '500', flex: 1 },
  capabilityCheck: { marginLeft: 'auto' },
  remCard: { padding: 16, borderRadius: 12, borderLeftWidth: 4, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  remHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  remId: { fontSize: 13, fontWeight: '600', color: '#666' },
  remPriorityBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  remPriorityText: { fontSize: 11, fontWeight: '700' },
  remVuln: { fontSize: 15, fontWeight: '600', marginBottom: 8 },
  remMeta: { flexDirection: 'row', gap: 16 },
  remMetaText: { fontSize: 12, color: '#666' },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  endpointInfo: { flex: 1 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  endpointDesc: { fontSize: 12, marginTop: 2 },
  featureToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  featureToggleInfo: { flex: 1, paddingRight: 16 },
  featureToggleTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  featureToggleDesc: { fontSize: 12, color: '#666' },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
