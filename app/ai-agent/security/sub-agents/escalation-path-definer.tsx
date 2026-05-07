import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase,
  GitBranch, CheckCircle, AlertTriangle, FileText, BarChart3,
  Network, Layers, ArrowUp, Users
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function EscalationPathDefinerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [autoEscalation, setAutoEscalation] = useState(true);
  const [severityRouting, setSeverityRouting] = useState(true);
  const [notificationAlerts, setNotificationAlerts] = useState(true);

  const stats = [
    { label: 'Paths Defined', value: '67', icon: GitBranch, color: '#EF4444' },
    { label: 'Escalations', value: '234', icon: ArrowUp, color: '#F59E0B' },
    { label: 'Avg Response', value: '4 min', icon: Clock, color: '#10B981' },
    { label: 'Accuracy', value: '98%', icon: CheckCircle, color: '#3B82F6' },
  ];

  const escalationPaths = [
    { severity: 'Critical', path: 'L1 → L2 → L3 → CISO', color: '#DC2626', avgTime: '2 min' },
    { severity: 'High', path: 'L1 → L2 → Manager', color: '#F59E0B', avgTime: '5 min' },
    { severity: 'Medium', path: 'L1 → L2', color: '#3B82F6', avgTime: '15 min' },
    { severity: 'Low', path: 'L1 Auto-resolve', color: '#10B981', avgTime: '30 min' },
  ];

  const capabilities = [
    { name: 'Path Definition', icon: GitBranch, enabled: true },
    { name: 'Severity Routing', icon: ArrowUp, enabled: true },
    { name: 'Auto-Escalation', icon: Network, enabled: true },
    { name: 'Notification Mgmt', icon: Users, enabled: true },
    { name: 'SLA Tracking', icon: Clock, enabled: true },
    { name: 'Approval Workflows', icon: CheckCircle, enabled: true },
    { name: 'Impact Analysis', icon: AlertTriangle, enabled: true },
    { name: 'Report Generation', icon: FileText, enabled: true },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#EF444420' }]}>
          <ArrowUp size={56} color="#EF4444" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Escalation Path Definer</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI SOC Manager</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#EF444422' }]}>
            <Briefcase size={12} color="#EF4444" />
            <Text style={[styles.badgeText, { color: '#EF4444' }]}>Definer</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#10B98122' }]}>
            <CheckCircle size={12} color="#10B981" />
            <Text style={[styles.badgeText, { color: '#10B981' }]}>98% Accurate</Text>
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
        {['overview', 'paths', 'capabilities', 'settings'].map((tab) => (
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
              AI Escalation Path Definer creates and manages escalation paths for security incidents, 
              ensuring the right people are notified at the right time based on severity and impact.
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

      {activeTab === 'paths' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Escalation Paths</Text>
          {escalationPaths.map((ep, index) => (
            <View key={index} style={styles.escalationCard}>
              <View style={styles.escalationHeader}>
                <View style={[styles.severityDot, { backgroundColor: ep.color }]} />
                <Text style={[styles.escalationSeverity, { color: ep.color }]}>{ep.severity}</Text>
                <Text style={styles.escalationTime}>{ep.avgTime} avg</Text>
              </View>
              <View style={styles.escalationPath}>
                <Text style={styles.escalationPathText}>{ep.path}</Text>
              </View>
              <View style={styles.escalationProgress}>
                <View style={[styles.progressDot, { backgroundColor: ep.color }]} />
                <View style={[styles.progressLine, { backgroundColor: ep.color + '40' }]} />
                <View style={[styles.progressDot, { backgroundColor: ep.color + '80' }]} />
                <View style={[styles.progressLine, { backgroundColor: ep.color + '20' }]} />
                <View style={[styles.progressDot, { backgroundColor: ep.color + '40' }]} />
              </View>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'capabilities' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
          {[
            { endpoint: '/consult/escalation-path-definer', desc: 'Consult on escalation paths' },
            { endpoint: '/escalation-path-definer/define', desc: 'Define new escalation path' },
            { endpoint: '/escalation-path-definer/trigger', desc: 'Trigger escalation' },
            { endpoint: '/escalation-path-definer/report', desc: 'Generate escalation report' },
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
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Auto-Escalation</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Automatically escalate based on rules</Text>
            </View>
            <Switch value={autoEscalation} onValueChange={setAutoEscalation} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Severity Routing</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Route by severity level</Text>
            </View>
            <Switch value={severityRouting} onValueChange={setSeverityRouting} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Notification Alerts</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Send alerts on escalation events</Text>
            </View>
            <Switch value={notificationAlerts} onValueChange={setNotificationAlerts} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>
        </View>
      )}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/security/soc-manager-enterprise')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Shield size={24} color="#EF4444" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI SOC Manager</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent (136)</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="escalation-path-definer" agentName="AI Escalation Path Definer" />
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
  escalationCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  escalationHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  severityDot: { width: 10, height: 10, borderRadius: 5 },
  escalationSeverity: { fontSize: 14, fontWeight: '700', flex: 1 },
  escalationTime: { fontSize: 12, color: '#666' },
  escalationPath: { marginBottom: 8 },
  escalationPathText: { fontSize: 13, color: '#333', fontFamily: 'monospace' },
  escalationProgress: { flexDirection: 'row', alignItems: 'center', gap: 0 },
  progressDot: { width: 10, height: 10, borderRadius: 5 },
  progressLine: { flex: 1, height: 2 },
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
