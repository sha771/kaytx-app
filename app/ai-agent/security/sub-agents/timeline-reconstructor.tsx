import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase,
  CheckCircle, AlertTriangle, FileText, BarChart3,
  Clock3, Calendar, History, Timer
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function TimelineReconstructorPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [autoReconstruct, setAutoReconstruct] = useState(true);
  const [eventCorrelation, setEventCorrelation] = useState(true);
  const [visualTimeline, setVisualTimeline] = useState(true);

  const stats = [
    { label: 'Timelines', value: '234', icon: Clock3, color: '#0891B2' },
    { label: 'Events', value: '45.2K', icon: History, color: '#F59E0B' },
    { label: 'Accuracy', value: '98.7%', icon: CheckCircle, color: '#10B981' },
    { label: 'Avg Duration', value: '4.2h', icon: Timer, color: '#3B82F6' },
  ];

  const capabilities = [
    { name: 'Event Correlation', icon: Clock3, enabled: true },
    { name: 'Log Synthesis', icon: FileText, enabled: true },
    { name: 'Timeline Visualization', icon: BarChart3, enabled: true },
    { name: 'Attack Path Mapping', icon: History, enabled: true },
    { name: 'Timezone Normalization', icon: Clock, enabled: true },
    { name: 'Gap Analysis', icon: AlertTriangle, enabled: true },
    { name: 'Export Reports', icon: ArrowRight, enabled: true },
    { name: 'IOC Mapping', icon: Target, enabled: true },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#0891B220' }]}>
          <Clock3 size={56} color="#0891B2" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Timeline Reconstructor</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI Incident Responder</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#0891B222' }]}>
            <Briefcase size={12} color="#0891B2" />
            <Text style={[styles.badgeText, { color: '#0891B2' }]}>Reconstructor</Text>
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
        {['overview', 'timelines', 'capabilities', 'settings'].map((tab) => (
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
              AI Timeline Reconstructor correlates events from multiple sources to create comprehensive incident timelines, 
              enabling analysts to understand attack progression and identify root causes.
            </Text>
          </View>

          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
            <View style={styles.capabilitiesGrid}>
              {capabilities.map((cap, index) => (
                <View key={index} style={[styles.capabilityCard, { backgroundColor: cap.enabled ? '#0891B210' : '#F2F2F7' }]}>
                  <cap.icon size={20} color={cap.enabled ? '#0891B2' : '#999'} />
                  <Text style={[styles.capabilityText, { color: cap.enabled ? theme.colors.text : '#999' }]}>{cap.name}</Text>
                  {cap.enabled && <CheckCircle size={14} color="#34C759" style={styles.capabilityCheck} />}
                </View>
              ))}
            </View>
          </View>
        </>
      )}

      {activeTab === 'timelines' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Timelines</Text>
          {[
            { id: 'TL-2024-001', name: 'Ransomware Incident', events: '1,234', duration: '4.2h', status: 'Complete', color: '#0891B2' },
            { id: 'TL-2024-002', name: 'Phishing Campaign', events: '567', duration: '2.1h', status: 'Complete', color: '#10B981' },
            { id: 'TL-2024-003', name: 'Data Exfiltration', events: '892', duration: '6.5h', status: 'In Progress', color: '#F59E0B' },
            { id: 'TL-2024-004', name: 'Privilege Escalation', events: '423', duration: '1.8h', status: 'Complete', color: '#3B82F6' },
          ].map((item, index) => (
            <View key={index} style={styles.timelineCard}>
              <View style={styles.timelineHeader}>
                <View style={[styles.timelineIcon, { backgroundColor: item.color + '20' }]}>
                  <Clock3 size={16} color={item.color} />
                </View>
                <Text style={styles.timelineId}>{item.id}</Text>
                <Text style={[styles.timelineStatus, { color: item.color }]}>{item.status}</Text>
              </View>
              <Text style={styles.timelineName}>{item.name}</Text>
              <View style={styles.timelineFooter}>
                <Text style={styles.timelineMeta}>{item.events} events</Text>
                <Text style={styles.timelineMeta}>{item.duration}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'capabilities' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
          {[
            { endpoint: '/consult/timeline-reconstructor', desc: 'Consult on timeline reconstruction' },
            { endpoint: '/timeline-reconstructor/reconstruct', desc: 'Reconstruct incident timeline' },
            { endpoint: '/timeline-reconstructor/analyze', desc: 'Analyze timeline events' },
            { endpoint: '/timeline-reconstructor/export', desc: 'Export timeline report' },
          ].map((item, index) => (
            <View key={index} style={styles.endpointRow}>
              <Zap size={16} color="#0891B2" />
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
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Auto-Reconstruct</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Auto-reconstruct on incident</Text>
            </View>
            <Switch value={autoReconstruct} onValueChange={setAutoReconstruct} trackColor={{ false: '#767577', true: '#0891B2' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Event Correlation</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Correlate events across sources</Text>
            </View>
            <Switch value={eventCorrelation} onValueChange={setEventCorrelation} trackColor={{ false: '#767577', true: '#0891B2' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Visual Timeline</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Generate visual timeline charts</Text>
            </View>
            <Switch value={visualTimeline} onValueChange={setVisualTimeline} trackColor={{ false: '#767577', true: '#0891B2' }} />
          </View>
        </View>
      )}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/security/incident-responder-enterprise')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Shield size={24} color="#0891B2" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI Incident Responder</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent (138)</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="timeline-reconstructor" agentName="AI Timeline Reconstructor" />
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
  activeTab: { backgroundColor: '#0891B2' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  activeTabText: { color: '#fff' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  capabilitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  capabilityCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, gap: 8, flex: 1, minWidth: '45%' },
  capabilityText: { fontSize: 13, fontWeight: '500', flex: 1 },
  capabilityCheck: { marginLeft: 'auto' },
  timelineCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  timelineHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  timelineIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  timelineId: { flex: 1, fontSize: 14, fontWeight: '600' },
  timelineStatus: { fontSize: 13, fontWeight: '600' },
  timelineName: { fontSize: 14, marginBottom: 8 },
  timelineFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  timelineMeta: { fontSize: 12, color: '#666' },
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
