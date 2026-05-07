import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase,
  CheckCircle, AlertTriangle, FileText, BarChart3,
  MessageSquare, Users, Calendar, FileCheck
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function AuditLiaisonPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [autoSchedule, setAutoSchedule] = useState(true);
  const [responsePrep, setResponsePrep] = useState(true);
  const [findingTracking, setFindingTracking] = useState(true);

  const stats = [
    { label: 'Audits', value: '34', icon: FileCheck, color: '#7C3AED' },
    { label: 'Findings', value: '156', icon: AlertTriangle, color: '#F59E0B' },
    { label: 'Closed', value: '89%', icon: CheckCircle, color: '#10B981' },
    { label: 'Pending', value: '23', icon: Calendar, color: '#EF4444' },
  ];

  const capabilities = [
    { name: 'Audit Scheduling', icon: Calendar, enabled: true },
    { name: 'Finding Response', icon: MessageSquare, enabled: true },
    { name: 'Auditor Comm', icon: Users, enabled: true },
    { name: 'Finding Tracking', icon: AlertTriangle, enabled: true },
    { name: 'Report Review', icon: FileText, enabled: true },
    { name: 'Remediation Coord', icon: CheckCircle, enabled: true },
    { name: 'Meeting Notes', icon: FileCheck, enabled: true },
    { name: 'Status Reports', icon: BarChart3, enabled: true },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#7C3AED20' }]}>
          <MessageSquare size={56} color="#7C3AED" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Audit Liaison</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI Security Compliance Specialist</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#7C3AED22' }]}>
            <Briefcase size={12} color="#7C3AED" />
            <Text style={[styles.badgeText, { color: '#7C3AED' }]}>Liaison</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#10B98122' }]}>
            <CheckCircle size={12} color="#10B981" />
            <Text style={[styles.badgeText, { color: '#10B981' }]}>89% Closed</Text>
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
        {['overview', 'audits', 'capabilities', 'settings'].map((tab) => (
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
              AI Audit Liaison coordinates with external auditors, manages audit schedules, prepares responses to audit 
              findings, and tracks remediation progress to ensure successful compliance audits.
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

      {activeTab === 'audits' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Audit Activities</Text>
          {[
            { id: 'AUD-2024-012', name: 'SOC 2 Type II', auditor: 'Deloitte', status: 'In Progress', findings: '3', color: '#7C3AED' },
            { id: 'AUD-2024-011', name: 'ISO 27001', auditor: 'BSI', status: 'Completed', findings: '0', color: '#10B981' },
            { id: 'AUD-2024-010', name: 'PCI-DSS', auditor: 'QSA Inc', status: 'Remediation', findings: '8', color: '#F59E0B' },
            { id: 'AUD-2024-009', name: 'HIPAA', auditor: 'KPMG', status: 'Scheduled', findings: '-', color: '#3B82F6' },
          ].map((item, index) => (
            <View key={index} style={styles.auditCard}>
              <View style={styles.auditHeader}>
                <View style={[styles.auditIcon, { backgroundColor: item.color + '20' }]}>
                  <FileCheck size={16} color={item.color} />
                </View>
                <Text style={styles.auditName}>{item.name}</Text>
                <Text style={[styles.auditStatus, { color: item.color }]}>{item.status}</Text>
              </View>
              <View style={styles.auditFooter}>
                <Text style={styles.auditMeta}>{item.auditor}</Text>
                <Text style={styles.auditMeta}>{item.findings} findings</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'capabilities' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
          {[
            { endpoint: '/consult/audit-liaison', desc: 'Consult on audit coordination' },
            { endpoint: '/audit-liaison/schedule', desc: 'Schedule audit activities' },
            { endpoint: '/audit-liaison/respond', desc: 'Respond to audit findings' },
            { endpoint: '/audit-liaison/report', desc: 'Generate audit reports' },
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
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Auto-Schedule</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Auto-schedule audit activities</Text>
            </View>
            <Switch value={autoSchedule} onValueChange={setAutoSchedule} trackColor={{ false: '#767577', true: '#7C3AED' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Response Prep</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Auto-prepare audit responses</Text>
            </View>
            <Switch value={responsePrep} onValueChange={setResponsePrep} trackColor={{ false: '#767577', true: '#7C3AED' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Finding Tracking</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Track audit findings</Text>
            </View>
            <Switch value={findingTracking} onValueChange={setFindingTracking} trackColor={{ false: '#767577', true: '#7C3AED' }} />
          </View>
        </View>
      )}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/security/security-compliance-enterprise')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Shield size={24} color="#7C3AED" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI Security Compliance Specialist</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent (139)</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="audit-liaison" agentName="AI Audit Liaison" />
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
  auditCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  auditHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  auditIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  auditName: { flex: 1, fontSize: 14, fontWeight: '600' },
  auditStatus: { fontSize: 13, fontWeight: '600' },
  auditFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  auditMeta: { fontSize: 12, color: '#666' },
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
