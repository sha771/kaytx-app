import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase,
  CheckCircle, AlertTriangle, FileText, BarChart3,
  FolderOpen, HardDrive, Database, Archive
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function EvidenceCollectorPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [autoCollection, setAutoCollection] = useState(true);
  const [chainOfCustody, setChainOfCustody] = useState(true);
  const [forensicImages, setForensicImages] = useState(true);

  const stats = [
    { label: 'Evidence Items', value: '1,234', icon: Archive, color: '#7C3AED' },
    { label: 'Collections', value: '89', icon: FolderOpen, color: '#F59E0B' },
    { label: 'Chain Integrity', value: '100%', icon: CheckCircle, color: '#10B981' },
    { label: 'Storage Used', value: '2.4TB', icon: HardDrive, color: '#3B82F6' },
  ];

  const capabilities = [
    { name: 'Memory Capture', icon: Database, enabled: true },
    { name: 'Disk Imaging', icon: HardDrive, enabled: true },
    { name: 'Log Collection', icon: FileText, enabled: true },
    { name: 'Network Capture', icon: Archive, enabled: true },
    { name: 'Chain of Custody', icon: CheckCircle, enabled: true },
    { name: 'Evidence Tagging', icon: FolderOpen, enabled: true },
    { name: 'Secure Storage', icon: Archive, enabled: true },
    { name: 'Export/Import', icon: ArrowRight, enabled: true },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#7C3AED20' }]}>
          <FolderOpen size={56} color="#7C3AED" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Evidence Collector</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI Incident Responder</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#7C3AED22' }]}>
            <Briefcase size={12} color="#7C3AED" />
            <Text style={[styles.badgeText, { color: '#7C3AED' }]}>Collector</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#10B98122' }]}>
            <CheckCircle size={12} color="#10B981" />
            <Text style={[styles.badgeText, { color: '#10B981' }]}>100% Chain</Text>
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
        {['overview', 'evidence', 'capabilities', 'settings'].map((tab) => (
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
              AI Evidence Collector gathers forensically sound evidence from compromised systems, maintains chain of custody, 
              and securely stores digital artifacts for investigation and legal proceedings.
            </Text>
          </View>

          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
            <View style={styles.capabilitiesGrid}>
              {capabilities.map((cap, index) => (
                <View key={index} style={[styles.capabilityCard, { backgroundColor: cap.enabled ? '#7C3AED10' : '#F2F2F7' }]}>
                  <cap.icon size={20} color={cap.enabled ? '#7C3AED' : '#999'} />
                  <Text style={[styles.capabilityText, { color: cap.enabled ? theme.colors.text : '#999' }]}>{cap.name}</Text>
                  {cap.enabled && <CheckCircle size={14} color="#34C759" style={styles.capabilityCheck} />}
                </View>
              ))}
            </View>
          </View>
        </>
      )}

      {activeTab === 'evidence' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Evidence Collections</Text>
          {[
            { id: 'EV-2024-001', type: 'Memory Dump', size: '4.2GB', status: 'Verified', date: '2 hrs ago', color: '#7C3AED' },
            { id: 'EV-2024-002', type: 'Disk Image', size: '512GB', status: 'Processing', date: '5 hrs ago', color: '#F59E0B' },
            { id: 'EV-2024-003', type: 'Network Logs', size: '12GB', status: 'Archived', date: '1 day ago', color: '#3B82F6' },
            { id: 'EV-2024-004', type: 'Event Logs', size: '890MB', status: 'Verified', date: '2 days ago', color: '#10B981' },
          ].map((item, index) => (
            <View key={index} style={styles.evidenceCard}>
              <View style={styles.evidenceHeader}>
                <View style={[styles.evidenceIcon, { backgroundColor: item.color + '20' }]}>
                  <Archive size={16} color={item.color} />
                </View>
                <Text style={styles.evidenceId}>{item.id}</Text>
                <Text style={[styles.evidenceStatus, { color: item.color }]}>{item.status}</Text>
              </View>
              <View style={styles.evidenceFooter}>
                <Text style={styles.evidenceMeta}>{item.type} • {item.size}</Text>
                <Text style={styles.evidenceTime}>{item.date}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'capabilities' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
          {[
            { endpoint: '/consult/evidence-collector', desc: 'Consult on evidence collection' },
            { endpoint: '/evidence-collector/capture', desc: 'Capture evidence' },
            { endpoint: '/evidence-collector/verify', desc: 'Verify evidence integrity' },
            { endpoint: '/evidence-collector/export', desc: 'Export evidence' },
          ].map((item, index) => (
            <View key={index} style={styles.endpointRow}>
              <Zap size={16} color="#7C3AED" />
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
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Auto-Collection</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Auto-collect evidence on incident</Text>
            </View>
            <Switch value={autoCollection} onValueChange={setAutoCollection} trackColor={{ false: '#767577', true: '#7C3AED' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Chain of Custody</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Maintain chain of custody</Text>
            </View>
            <Switch value={chainOfCustody} onValueChange={setChainOfCustody} trackColor={{ false: '#767577', true: '#7C3AED' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Forensic Images</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Create forensic disk images</Text>
            </View>
            <Switch value={forensicImages} onValueChange={setForensicImages} trackColor={{ false: '#767577', true: '#7C3AED' }} />
          </View>
        </View>
      )}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/security/incident-responder-enterprise')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Shield size={24} color="#7C3AED" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI Incident Responder</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent (138)</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="evidence-collector" agentName="AI Evidence Collector" />
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
  activeTab: { backgroundColor: '#7C3AED' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  activeTabText: { color: '#fff' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  capabilitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  capabilityCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, gap: 8, flex: 1, minWidth: '45%' },
  capabilityText: { fontSize: 13, fontWeight: '500', flex: 1 },
  capabilityCheck: { marginLeft: 'auto' },
  evidenceCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  evidenceHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  evidenceIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  evidenceId: { flex: 1, fontSize: 14, fontWeight: '600' },
  evidenceStatus: { fontSize: 13, fontWeight: '600' },
  evidenceFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  evidenceMeta: { fontSize: 12, color: '#666' },
  evidenceTime: { fontSize: 12, color: '#666' },
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
