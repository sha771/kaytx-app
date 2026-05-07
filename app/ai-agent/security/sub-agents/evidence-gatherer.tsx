import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase,
  CheckCircle, AlertTriangle, FileText, BarChart3,
  FolderSearch, FileCheck, ClipboardList, Search
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function EvidenceGathererPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [autoGather, setAutoGather] = useState(true);
  const [evidenceValidation, setEvidenceValidation] = useState(true);
  const [autoArchive, setAutoArchive] = useState(true);

  const stats = [
    { label: 'Evidence Items', value: '4,567', icon: FolderSearch, color: '#D97706' },
    { label: 'Collections', value: '234', icon: ClipboardList, color: '#059669' },
    { label: 'Validated', value: '98%', icon: FileCheck, color: '#10B981' },
    { label: 'Pending', value: '89', icon: Search, color: '#EF4444' },
  ];

  const capabilities = [
    { name: 'Auto-Collection', icon: FolderSearch, enabled: true },
    { name: 'Evidence Validation', icon: FileCheck, enabled: true },
    { name: 'Document Gathering', icon: FileText, enabled: true },
    { name: 'Screenshot Capture', icon: ClipboardList, enabled: true },
    { name: 'Log Collection', icon: BarChart3, enabled: true },
    { name: 'Configuration Review', icon: Search, enabled: true },
    { name: 'Archive Management', icon: FolderSearch, enabled: true },
    { name: 'Export Reports', icon: ArrowRight, enabled: true },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#D9770620' }]}>
          <FolderSearch size={56} color="#D97706" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Evidence Gatherer</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI Security Compliance Specialist</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#D9770622' }]}>
            <Briefcase size={12} color="#D97706" />
            <Text style={[styles.badgeText, { color: '#D97706' }]}>Gatherer</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#10B98122' }]}>
            <CheckCircle size={12} color="#10B981" />
            <Text style={[styles.badgeText, { color: '#10B981' }]}>98% Validated</Text>
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
              AI Evidence Gatherer automatically collects, validates, and organizes compliance evidence from across 
              the organization, ensuring audit-ready documentation for all regulatory requirements.
            </Text>
          </View>

          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
            <View style={styles.capabilitiesGrid}>
              {capabilities.map((cap, index) => (
                <View key={index} style={[styles.capabilityCard, { backgroundColor: cap.enabled ? '#D9770610' : '#F2F2F7' }]}>
                  <cap.icon size={20} color={cap.enabled ? '#D97706' : '#999'} />
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
            { id: 'EV-2024-089', type: 'Access Logs', items: '1,234', status: 'Validated', date: '1 day ago', color: '#10B981' },
            { id: 'EV-2024-090', type: 'Config Snapshots', items: '567', status: 'Pending', date: '2 days ago', color: '#F59E0B' },
            { id: 'EV-2024-091', type: 'Screenshots', items: '890', status: 'Validated', date: '3 days ago', color: '#10B981' },
            { id: 'EV-2024-092', type: 'Policy Docs', items: '45', status: 'Review', date: '5 days ago', color: '#3B82F6' },
          ].map((item, index) => (
            <View key={index} style={styles.evidenceCard}>
              <View style={styles.evidenceHeader}>
                <View style={[styles.evidenceIcon, { backgroundColor: item.color + '20' }]}>
                  <FolderSearch size={16} color={item.color} />
                </View>
                <Text style={styles.evidenceId}>{item.id}</Text>
                <Text style={[styles.evidenceStatus, { color: item.color }]}>{item.status}</Text>
              </View>
              <View style={styles.evidenceFooter}>
                <Text style={styles.evidenceMeta}>{item.type} • {item.items} items</Text>
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
            { endpoint: '/consult/evidence-gatherer', desc: 'Consult on evidence gathering' },
            { endpoint: '/evidence-gatherer/collect', desc: 'Collect compliance evidence' },
            { endpoint: '/evidence-gatherer/validate', desc: 'Validate evidence' },
            { endpoint: '/evidence-gatherer/export', desc: 'Export evidence package' },
          ].map((item, index) => (
            <View key={index} style={styles.endpointRow}>
              <Zap size={16} color="#D97706" />
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
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Auto-Gather</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Auto-gather compliance evidence</Text>
            </View>
            <Switch value={autoGather} onValueChange={setAutoGather} trackColor={{ false: '#767577', true: '#D97706' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Evidence Validation</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Validate evidence automatically</Text>
            </View>
            <Switch value={evidenceValidation} onValueChange={setEvidenceValidation} trackColor={{ false: '#767577', true: '#D97706' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Auto-Archive</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Archive evidence automatically</Text>
            </View>
            <Switch value={autoArchive} onValueChange={setAutoArchive} trackColor={{ false: '#767577', true: '#D97706' }} />
          </View>
        </View>
      )}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/security/security-compliance-enterprise')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Shield size={24} color="#D97706" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI Security Compliance Specialist</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent (139)</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="evidence-gatherer" agentName="AI Evidence Gatherer" />
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
  activeTab: { backgroundColor: '#D97706' },
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
