import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase,
  FileSearch, AlertTriangle, CheckCircle, FileText, BarChart3,
  Globe, Lock, Users, Scale
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function PrivacyImpactAssessorPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [autoAssessment, setAutoAssessment] = useState(true);
  const [gdprCompliance, setGdprCompliance] = useState(true);
  const [privacyAlerts, setPrivacyAlerts] = useState(true);

  const stats = [
    { label: 'PIAs Completed', value: '67', icon: FileSearch, color: '#14B8A6' },
    { label: 'High Risk', value: '8', icon: AlertTriangle, color: '#EF4444' },
    { label: 'Approved', value: '52', icon: CheckCircle, color: '#10B981' },
    { label: 'Pending', value: '7', icon: Clock, color: '#F59E0B' },
  ];

  const pias = [
    { id: 'PIA-2024-015', project: 'Customer Data Platform', risk: 'medium', status: 'approved', framework: 'GDPR', date: '2024-05-12' },
    { id: 'PIA-2024-014', project: 'Mobile App Update', risk: 'high', status: 'under_review', framework: 'CCPA', date: '2024-04-28' },
    { id: 'PIA-2024-012', project: 'AI Analytics Engine', risk: 'high', status: 'approved', framework: 'GDPR', date: '2024-04-15' },
    { id: 'PIA-2024-010', project: 'Email Marketing System', risk: 'low', status: 'approved', framework: 'CAN-SPAM', date: '2024-03-22' },
  ];

  const capabilities = [
    { name: 'Data Flow Analysis', icon: Globe, enabled: true },
    { name: 'Risk Identification', icon: AlertTriangle, enabled: true },
    { name: 'Compliance Mapping', icon: Scale, enabled: true },
    { name: 'Mitigation Planning', icon: Shield, enabled: true },
    { name: 'Stakeholder Review', icon: Users, enabled: true },
    { name: 'Report Generation', icon: FileText, enabled: true },
    { name: 'Remediation Tracking', icon: BarChart3, enabled: true },
    { name: 'Privacy Controls', icon: Lock, enabled: true },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#14B8A620' }]}>
          <FileSearch size={56} color="#14B8A6" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Privacy Impact Assessor</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI VP Privacy</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#14B8A622' }]}>
            <Briefcase size={12} color="#14B8A6" />
            <Text style={[styles.badgeText, { color: '#14B8A6' }]}>Specialist</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#10B98122' }]}>
            <CheckCircle size={12} color="#10B981" />
            <Text style={[styles.badgeText, { color: '#10B981' }]}>67 PIAs</Text>
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
        {['overview', 'pias', 'capabilities', 'settings'].map((tab) => (
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
              AI Privacy Impact Assessor conducts Privacy Impact Assessments (PIAs) for new projects and systems, 
              identifying privacy risks and ensuring compliance with GDPR, CCPA, and other privacy regulations.
            </Text>
          </View>

          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
            <View style={styles.capabilitiesGrid}>
              {capabilities.map((cap, index) => (
                <View key={index} style={[styles.capabilityCard, { backgroundColor: cap.enabled ? '#14B8A610' : '#F2F2F7' }]}>
                  <cap.icon size={20} color={cap.enabled ? '#14B8A6' : '#999'} />
                  <Text style={[styles.capabilityText, { color: cap.enabled ? theme.colors.text : '#999' }]}>{cap.name}</Text>
                  {cap.enabled && <CheckCircle size={14} color="#34C759" style={styles.capabilityCheck} />}
                </View>
              ))}
            </View>
          </View>
        </>
      )}

      {activeTab === 'pias' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Privacy Impact Assessments</Text>
          {pias.map((pia, index) => (
            <View key={index} style={styles.piaCard}>
              <View style={styles.piaHeader}>
                <View style={styles.piaIdBadge}>
                  <Text style={styles.piaId}>{pia.id}</Text>
                </View>
                <Text style={styles.piaTitle} numberOfLines={1}>{pia.project}</Text>
                <View style={[styles.riskBadge, { backgroundColor: pia.risk === 'high' ? '#DC262620' : pia.risk === 'medium' ? '#F59E0B20' : '#10B98120' }]}>
                  <Text style={[styles.riskText, { color: pia.risk === 'high' ? '#DC2626' : pia.risk === 'medium' ? '#F59E0B' : '#10B981' }]}>{pia.risk}</Text>
                </View>
              </View>
              <View style={styles.piaFooter}>
                <View style={styles.piaMeta}>
                  <Activity size={12} color="#666" />
                  <Text style={[styles.piaStatus, { color: pia.status === 'approved' ? '#10B981' : '#F59E0B' }]}>{pia.status.replace('_', ' ')}</Text>
                </View>
                <View style={styles.piaMeta}>
                  <Scale size={12} color="#666" />
                  <Text style={styles.piaMetaText}>{pia.framework}</Text>
                </View>
                <View style={styles.piaMeta}>
                  <Clock size={12} color="#666" />
                  <Text style={styles.piaMetaText}>{pia.date}</Text>
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
            { endpoint: '/consult/privacy-impact-assessor', desc: 'Consult on PIA requirements' },
            { endpoint: '/privacy-impact-assessor/assess', desc: 'Conduct privacy assessment' },
            { endpoint: '/privacy-impact-assessor/report', desc: 'Generate PIA report' },
            { endpoint: '/privacy-impact-assessor/remediate', desc: 'Track remediation actions' },
          ].map((item, index) => (
            <View key={index} style={styles.endpointRow}>
              <Zap size={16} color="#14B8A6" />
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
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Auto-Assessment</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Automatically assess new projects</Text>
            </View>
            <Switch value={autoAssessment} onValueChange={setAutoAssessment} trackColor={{ false: '#767577', true: '#14B8A6' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>GDPR Compliance</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Enforce GDPR requirements</Text>
            </View>
            <Switch value={gdprCompliance} onValueChange={setGdprCompliance} trackColor={{ false: '#767577', true: '#14B8A6' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Privacy Alerts</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Alert on high privacy risks</Text>
            </View>
            <Switch value={privacyAlerts} onValueChange={setPrivacyAlerts} trackColor={{ false: '#767577', true: '#14B8A6' }} />
          </View>
        </View>
      )}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/security/vp-privacy-enterprise')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Shield size={24} color="#14B8A6" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI VP Privacy</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent (134)</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="privacy-impact-assessor" agentName="AI Privacy Impact Assessor" />
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
  activeTab: { backgroundColor: '#14B8A6' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  activeTabText: { color: '#fff' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  capabilitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  capabilityCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, gap: 8, flex: 1, minWidth: '45%' },
  capabilityText: { fontSize: 13, fontWeight: '500', flex: 1 },
  capabilityCheck: { marginLeft: 'auto' },
  piaCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  piaHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  piaIdBadge: { backgroundColor: '#F3F4F6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  piaId: { fontSize: 11, fontWeight: '600', color: '#6B7280' },
  piaTitle: { flex: 1, fontSize: 14, fontWeight: '500' },
  riskBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  riskText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  piaFooter: { flexDirection: 'row', gap: 16 },
  piaMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  piaStatus: { fontSize: 12, fontWeight: '500', textTransform: 'capitalize' },
  piaMetaText: { fontSize: 12, color: '#666' },
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
