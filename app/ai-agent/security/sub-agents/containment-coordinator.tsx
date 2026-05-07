import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase,
  CheckCircle, AlertTriangle, FileText, BarChart3,
  ShieldOff, Power, Lock, WifiOff
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function ContainmentCoordinatorPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [autoContainment, setAutoContainment] = useState(true);
  const [networkIsolation, setNetworkIsolation] = useState(true);
  const [accountLockdown, setAccountLockdown] = useState(true);

  const stats = [
    { label: 'Containments', value: '456', icon: ShieldOff, color: '#DC2626' },
    { label: 'Avg Response', value: '12s', icon: Clock, color: '#10B981' },
    { label: 'Success Rate', value: '99.4%', icon: CheckCircle, color: '#3B82F6' },
    { label: 'Active', value: '8', icon: Power, color: '#F59E0B' },
  ];

  const capabilities = [
    { name: 'Host Isolation', icon: WifiOff, enabled: true },
    { name: 'Account Lockdown', icon: Lock, enabled: true },
    { name: 'Network Block', icon: ShieldOff, enabled: true },
    { name: 'Process Kill', icon: Power, enabled: true },
    { name: 'Service Disable', icon: Shield, enabled: true },
    { name: 'Registry Edit', icon: FileText, enabled: true },
    { name: 'Quarantine', icon: AlertTriangle, enabled: true },
    { name: 'Rollback', icon: ArrowRight, enabled: true },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#DC262620' }]}>
          <ShieldOff size={56} color="#DC2626" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Containment Coordinator</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI Incident Responder</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#DC262622' }]}>
            <Briefcase size={12} color="#DC2626" />
            <Text style={[styles.badgeText, { color: '#DC2626' }]}>Coordinator</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#10B98122' }]}>
            <CheckCircle size={12} color="#10B981" />
            <Text style={[styles.badgeText, { color: '#10B981' }]}>99.4% Rate</Text>
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
        {['overview', 'actions', 'capabilities', 'settings'].map((tab) => (
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
              AI Containment Coordinator rapidly isolates affected systems, disables compromised accounts, and blocks 
              malicious network traffic to contain security incidents and prevent lateral movement.
            </Text>
          </View>

          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
            <View style={styles.capabilitiesGrid}>
              {capabilities.map((cap, index) => (
                <View key={index} style={[styles.capabilityCard, { backgroundColor: cap.enabled ? '#DC262610' : '#F2F2F7' }]}>
                  <cap.icon size={20} color={cap.enabled ? '#DC2626' : '#999'} />
                  <Text style={[styles.capabilityText, { color: cap.enabled ? theme.colors.text : '#999' }]}>{cap.name}</Text>
                  {cap.enabled && <CheckCircle size={14} color="#34C759" style={styles.capabilityCheck} />}
                </View>
              ))}
            </View>
          </View>
        </>
      )}

      {activeTab === 'actions' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Containment Actions</Text>
          {[
            { action: 'Host Isolation', target: 'WORKSTATION-042', status: 'Active', time: '2 min ago', color: '#DC2626' },
            { action: 'Account Lockdown', target: 'jsmith@company.com', status: 'Completed', time: '15 min ago', color: '#10B981' },
            { action: 'Network Block', target: '192.168.1.45', status: 'Active', time: '28 min ago', color: '#DC2626' },
            { action: 'Process Kill', target: 'malware.exe', status: 'Completed', time: '1 hr ago', color: '#10B981' },
          ].map((item, index) => (
            <View key={index} style={styles.actionCard}>
              <View style={styles.actionHeader}>
                <View style={[styles.actionIcon, { backgroundColor: item.color + '20' }]}>
                  <ShieldOff size={16} color={item.color} />
                </View>
                <Text style={styles.actionName}>{item.action}</Text>
                <Text style={[styles.actionStatus, { color: item.color }]}>{item.status}</Text>
              </View>
              <View style={styles.actionFooter}>
                <Text style={styles.actionTarget}>{item.target}</Text>
                <Text style={styles.actionTime}>{item.time}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'capabilities' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
          {[
            { endpoint: '/consult/containment-coordinator', desc: 'Consult on containment' },
            { endpoint: '/containment-coordinator/isolate', desc: 'Isolate host' },
            { endpoint: '/containment-coordinator/lockdown', desc: 'Lockdown account' },
            { endpoint: '/containment-coordinator/release', desc: 'Release containment' },
          ].map((item, index) => (
            <View key={index} style={styles.endpointRow}>
              <Zap size={16} color="#DC2626" />
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
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Auto-Containment</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Auto-contain high severity incidents</Text>
            </View>
            <Switch value={autoContainment} onValueChange={setAutoContainment} trackColor={{ false: '#767577', true: '#DC2626' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Network Isolation</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Isolate compromised networks</Text>
            </View>
            <Switch value={networkIsolation} onValueChange={setNetworkIsolation} trackColor={{ false: '#767577', true: '#DC2626' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Account Lockdown</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Auto-lock compromised accounts</Text>
            </View>
            <Switch value={accountLockdown} onValueChange={setAccountLockdown} trackColor={{ false: '#767577', true: '#DC2626' }} />
          </View>
        </View>
      )}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/security/incident-responder-enterprise')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Shield size={24} color="#DC2626" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI Incident Responder</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent (138)</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="containment-coordinator" agentName="AI Containment Coordinator" />
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
  activeTab: { backgroundColor: '#DC2626' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  activeTabText: { color: '#fff' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  capabilitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  capabilityCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, gap: 8, flex: 1, minWidth: '45%' },
  capabilityText: { fontSize: 13, fontWeight: '500', flex: 1 },
  capabilityCheck: { marginLeft: 'auto' },
  actionCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  actionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  actionIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  actionName: { flex: 1, fontSize: 14, fontWeight: '600' },
  actionStatus: { fontSize: 13, fontWeight: '600' },
  actionFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  actionTarget: { fontSize: 12, color: '#666' },
  actionTime: { fontSize: 12, color: '#666' },
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
