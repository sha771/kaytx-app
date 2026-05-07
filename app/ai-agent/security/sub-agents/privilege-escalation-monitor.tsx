import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase, ShieldAlert, 
  CheckCircle, AlertTriangle, BarChart3, Eye, Lock, FileText, TrendingUp,
  UserX, Ban, Settings
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function PrivilegeEscalationMonitorPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [realTimeMonitoring, setRealTimeMonitoring] = useState(true);
  const [autoRemediation, setAutoRemediation] = useState(true);
  const [behavioralAnalysis, setBehavioralAnalysis] = useState(true);

  const stats = [
    { label: 'Monitored', value: '2,456', icon: Eye, color: '#F8BBD9' },
    { label: 'Detected', value: '23', icon: ShieldAlert, color: '#FF3B30' },
    { label: 'Blocked', value: '18', icon: Ban, color: '#34C759' },
    { label: 'MTTD', value: '2m', icon: Clock, color: '#FF9500' },
  ];

  const alerts = [
    { type: 'suspicious', user: 'jdoe@company.com', action: 'sudo escalation', timestamp: '2 min ago', severity: 'high' },
    { type: 'unauthorized', user: 'admin@company.com', action: 'privilege abuse', timestamp: '15 min ago', severity: 'critical' },
    { type: 'anomaly', user: 'asmith@company.com', action: 'unusual access pattern', timestamp: '1 hour ago', severity: 'medium' },
  ];

  const capabilities = [
    { name: 'Real-time Monitoring', icon: Eye, enabled: true },
    { name: 'Behavioral Analysis', icon: BarChart3, enabled: true },
    { name: 'Anomaly Detection', icon: AlertTriangle, enabled: true },
    { name: 'Auto Remediation', icon: ShieldAlert, enabled: true },
    { name: 'Just-in-Time Access', icon: Clock, enabled: true },
    { name: 'Session Recording', icon: FileText, enabled: true },
    { name: 'Audit Logging', icon: Lock, enabled: true },
    { name: 'Threat Intelligence', icon: TrendingUp, enabled: true },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#F8BBD920' }]}>
          <ShieldAlert size={56} color="#F8BBD9" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Privilege Escalation Monitor</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI Identity Manager</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#F8BBD922' }]}>
            <Briefcase size={12} color="#F8BBD9" />
            <Text style={[styles.badgeText, { color: '#F8BBD9' }]}>Specialist</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF3B3022' }]}>
            <ShieldAlert size={12} color="#FF3B30" />
            <Text style={[styles.badgeText, { color: '#FF3B30' }]}>23 Alerts</Text>
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
            style={[styles.tab, activeTab === tab && [styles.activeTab, { backgroundColor: '#F8BBD9' }]]}
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
              AI Privilege Escalation Monitor continuously tracks privileged access activities, 
              detects anomalous privilege escalation attempts, and provides real-time alerts 
              for immediate response to potential security breaches.
            </Text>
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

      {activeTab === 'alerts' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Alerts</Text>
          {alerts.map((alert, index) => (
            <View key={index} style={styles.alertCard}>
              <View style={styles.alertHeader}>
                <Text style={styles.alertUser}>{alert.user}</Text>
                <View style={[styles.alertSeverityBadge, { backgroundColor: alert.severity === 'critical' ? '#FF3B3020' : alert.severity === 'high' ? '#FF950020' : '#007AFF20' }]}>
                  <Text style={[styles.alertSeverityText, { color: alert.severity === 'critical' ? '#FF3B30' : alert.severity === 'high' ? '#FF9500' : '#007AFF' }]}>{alert.severity}</Text>
                </View>
              </View>
              <Text style={styles.alertAction}>{alert.action}</Text>
              <View style={styles.alertFooter}>
                <Text style={styles.alertMeta}>{alert.timestamp}</Text>
                <Text style={styles.alertMeta}>{alert.type}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'capabilities' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
          {[
            { endpoint: '/consult/privilege-escalation-monitor', desc: 'Consult on privilege monitoring strategies' },
            { endpoint: '/privilege-escalation-monitor/detect', desc: 'Detect privilege escalation attempts' },
            { endpoint: '/privilege-escalation-monitor/analyze', desc: 'Analyze privileged access patterns' },
            { endpoint: '/privilege-escalation-monitor/remediate', desc: 'Auto-remediate suspicious activities' },
          ].map((item, index) => (
            <View key={index} style={styles.endpointRow}>
              <Zap size={16} color="#F8BBD9" />
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
              <Text style={styles.featureToggleTitle}>Real-time Monitoring</Text>
              <Text style={styles.featureToggleDesc}>Monitor privilege activities in real-time</Text>
            </View>
            <Switch value={realTimeMonitoring} onValueChange={setRealTimeMonitoring} trackColor={{ false: '#767577', true: '#F8BBD9' }} />
          </View>
          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={styles.featureToggleTitle}>Auto Remediation</Text>
              <Text style={styles.featureToggleDesc}>Automatically block suspicious activities</Text>
            </View>
            <Switch value={autoRemediation} onValueChange={setAutoRemediation} trackColor={{ false: '#767577', true: '#F8BBD9' }} />
          </View>
          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={styles.featureToggleTitle}>Behavioral Analysis</Text>
              <Text style={styles.featureToggleDesc}>ML-powered user behavior analysis</Text>
            </View>
            <Switch value={behavioralAnalysis} onValueChange={setBehavioralAnalysis} trackColor={{ false: '#767577', true: '#F8BBD9' }} />
          </View>
        </View>
      )}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/security/identity-manager-enterprise')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Shield size={24} color="#F8BBD9" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI Identity Manager</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent (141)</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="privilege-escalation-monitor" agentName="AI Privilege Escalation Monitor" />
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
  activeTab: { backgroundColor: '#F8BBD9' },
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
  alertHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  alertUser: { fontSize: 14, fontWeight: '600', flex: 1 },
  alertSeverityBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  alertSeverityText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  alertAction: { fontSize: 15, fontWeight: '500', marginBottom: 8 },
  alertFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  alertMeta: { fontSize: 12, color: '#666' },
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
