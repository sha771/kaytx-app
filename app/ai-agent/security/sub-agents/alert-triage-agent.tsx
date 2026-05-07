import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase,
  CheckCircle, AlertTriangle, FileText, BarChart3,
  Bell, Filter, PriorityHigh, CheckSquare
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function AlertTriageAgentPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [autoTriage, setAutoTriage] = useState(true);
  const [severityScoring, setSeverityScoring] = useState(true);
  const [autoRouting, setAutoRouting] = useState(true);

  const stats = [
    { label: 'Alerts Triaged', value: '8.2K', icon: Bell, color: '#EF4444' },
    { label: 'False Positives', value: '12%', icon: Filter, color: '#F59E0B' },
    { label: 'Avg Response', value: '23s', icon: Clock, color: '#10B981' },
    { label: 'Accuracy', value: '98.7%', icon: CheckCircle, color: '#3B82F6' },
  ];

  const capabilities = [
    { name: 'Alert Ingestion', icon: Bell, enabled: true },
    { name: 'Auto-Triage', icon: Filter, enabled: true },
    { name: 'Severity Scoring', icon: PriorityHigh, enabled: true },
    { name: 'Alert Routing', icon: ArrowRight, enabled: true },
    { name: 'Deduplication', icon: CheckSquare, enabled: true },
    { name: 'Enrichment', icon: FileText, enabled: true },
    { name: 'SLA Tracking', icon: Clock, enabled: true },
    { name: 'Reporting', icon: BarChart3, enabled: true },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#EF444420' }]}>
          <Bell size={56} color="#EF4444" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Alert Triage Agent</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI Security Analyst</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#EF444422' }]}>
            <Briefcase size={12} color="#EF4444" />
            <Text style={[styles.badgeText, { color: '#EF4444' }]}>Triage</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#10B98122' }]}>
            <CheckCircle size={12} color="#10B981" />
            <Text style={[styles.badgeText, { color: '#10B981' }]}>98.7% Acc</Text>
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
        {['overview', 'alerts', 'capabilities', 'settings'].map((tab) => (
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
              AI Alert Triage Agent automatically prioritizes and categorizes security alerts, reducing alert fatigue 
              and ensuring critical threats receive immediate attention from the appropriate analysts.
            </Text>
          </View>

          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
            <View style={styles.capabilitiesGrid}>
              {capabilities.map((cap, index) => (
                <View key={index} style={[styles.capabilityCard, { backgroundColor: cap.enabled ? '#EF444410' : '#F2F2F7' }]}>
                  <cap.icon size={20} color={cap.enabled ? '#EF4444' : '#999'} />
                  <Text style={[styles.capabilityText, { color: cap.enabled ? theme.colors.text : '#999' }]}>{cap.name}</Text>
                  {cap.enabled && <CheckCircle size={14} color="#34C759" style={styles.capabilityCheck} />}
                </View>
              ))}
            </View>
          </View>
        </>
      )}

      {activeTab === 'alerts' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Alert Triage</Text>
          {[
            { name: 'Brute Force Detection', count: 234, severity: 'High', resolved: '78%', color: '#EF4444' },
            { name: 'Malware Detection', count: 89, severity: 'Critical', resolved: '92%', color: '#DC2626' },
            { name: 'Phishing Attempt', count: 156, severity: 'Medium', resolved: '85%', color: '#F59E0B' },
            { name: 'Port Scan', count: 312, severity: 'Low', resolved: '65%', color: '#3B82F6' },
          ].map((alert, index) => (
            <View key={index} style={styles.alertCard}>
              <View style={styles.alertHeader}>
                <View style={[styles.alertIcon, { backgroundColor: alert.color + '20' }]}>
                  <Bell size={16} color={alert.color} />
                </View>
                <Text style={styles.alertName}>{alert.name}</Text>
                <Text style={[styles.alertSeverity, { color: alert.color }]}>{alert.severity}</Text>
              </View>
              <View style={styles.alertFooter}>
                <Text style={styles.alertMeta}>{alert.count} alerts</Text>
                <Text style={styles.alertMeta}>{alert.resolved} resolved</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'capabilities' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
          {[
            { endpoint: '/consult/alert-triage-agent', desc: 'Consult on alert triage' },
            { endpoint: '/alert-triage-agent/triage', desc: 'Triage alert batch' },
            { endpoint: '/alert-triage-agent/prioritize', desc: 'Prioritize alerts' },
            { endpoint: '/alert-triage-agent/report', desc: 'Generate triage report' },
          ].map((item, index) => (
            <View key={index} style={styles.endpointRow}>
              <Zap size={16} color="#EF4444" />
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
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Auto-Triage</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Automatically triage incoming alerts</Text>
            </View>
            <Switch value={autoTriage} onValueChange={setAutoTriage} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Severity Scoring</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Calculate alert severity scores</Text>
            </View>
            <Switch value={severityScoring} onValueChange={setSeverityScoring} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Auto-Routing</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Route alerts to appropriate analysts</Text>
            </View>
            <Switch value={autoRouting} onValueChange={setAutoRouting} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>
        </View>
      )}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/security/security-analyst-enterprise')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Shield size={24} color="#EF4444" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI Security Analyst</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent (137)</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="alert-triage-agent" agentName="AI Alert Triage Agent" />
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
  activeTab: { backgroundColor: '#EF4444' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  activeTabText: { color: '#fff' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  capabilitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  capabilityCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, gap: 8, flex: 1, minWidth: '45%' },
  capabilityText: { fontSize: 13, fontWeight: '500', flex: 1 },
  capabilityCheck: { marginLeft: 'auto' },
  alertCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  alertHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  alertIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  alertName: { flex: 1, fontSize: 14, fontWeight: '600' },
  alertSeverity: { fontSize: 13, fontWeight: '600' },
  alertFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  alertMeta: { fontSize: 12, color: '#666' },
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
