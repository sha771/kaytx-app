import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase,
  Database, Lock, CheckCircle, AlertTriangle, BarChart3,
  Tag, FolderOpen, FileText, Eye, Globe
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function DataClassificationEnforcerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [autoClassification, setAutoClassification] = useState(true);
  const [enforcementMode, setEnforcementMode] = useState(true);
  const [auditLogging, setAuditLogging] = useState(true);

  const stats = [
    { label: 'Data Assets', value: '1,247', icon: Database, color: '#6366F1' },
    { label: 'Classified', value: '1,189', icon: CheckCircle, color: '#10B981' },
    { label: 'Unclassified', value: '58', icon: AlertTriangle, color: '#F59E0B' },
    { label: 'Violations', value: '3', icon: Eye, color: '#EF4444' },
  ];

  const classifications = [
    { level: 'Top Secret', count: 42, color: '#DC2626', icon: Lock },
    { level: 'Confidential', count: 187, color: '#F59E0B', icon: Shield },
    { level: 'Internal', count: 534, color: '#3B82F6', icon: FolderOpen },
    { level: 'Public', count: 484, color: '#10B981', icon: Globe },
  ];

  const capabilities = [
    { name: 'Auto-Classification', icon: Tag, enabled: true },
    { name: 'Label Enforcement', icon: Lock, enabled: true },
    { name: 'Data Discovery', icon: Database, enabled: true },
    { name: 'Policy Enforcement', icon: Shield, enabled: true },
    { name: 'Audit Logging', icon: FileText, enabled: true },
    { name: 'Violation Detection', icon: AlertTriangle, enabled: true },
    { name: 'Compliance Reporting', icon: BarChart3, enabled: true },
    { name: 'Access Control', icon: Eye, enabled: true },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#6366F120' }]}>
          <Database size={56} color="#6366F1" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Data Classification Enforcer</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI VP Privacy</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#6366F122' }]}>
            <Briefcase size={12} color="#6366F1" />
            <Text style={[styles.badgeText, { color: '#6366F1' }]}>Enforcer</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#10B98122' }]}>
            <CheckCircle size={12} color="#10B981" />
            <Text style={[styles.badgeText, { color: '#10B981' }]}>1,189 Classified</Text>
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
        {['overview', 'classifications', 'capabilities', 'settings'].map((tab) => (
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
              AI Data Classification Enforcer automatically classifies data assets and enforces labeling policies, 
              ensuring sensitive data is properly tagged and handled according to organizational policies.
            </Text>
          </View>

          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
            <View style={styles.capabilitiesGrid}>
              {capabilities.map((cap, index) => (
                <View key={index} style={[styles.capabilityCard, { backgroundColor: cap.enabled ? '#6366F110' : '#F2F2F7' }]}>
                  <cap.icon size={20} color={cap.enabled ? '#6366F1' : '#999'} />
                  <Text style={[styles.capabilityText, { color: cap.enabled ? theme.colors.text : '#999' }]}>{cap.name}</Text>
                  {cap.enabled && <CheckCircle size={14} color="#34C759" style={styles.capabilityCheck} />}
                </View>
              ))}
            </View>
          </View>
        </>
      )}

      {activeTab === 'classifications' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Classification Levels</Text>
          {classifications.map((cls, index) => (
            <View key={index} style={styles.classificationCard}>
              <View style={styles.classificationHeader}>
                <View style={[styles.classificationIcon, { backgroundColor: cls.color + '20' }]}>
                  <cls.icon size={20} color={cls.color} />
                </View>
                <Text style={styles.classificationName}>{cls.level}</Text>
                <Text style={[styles.classificationCount, { color: cls.color }]}>{cls.count} assets</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'capabilities' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
          {[
            { endpoint: '/consult/data-classification-enforcer', desc: 'Consult on classification' },
            { endpoint: '/data-classification-enforcer/classify', desc: 'Classify data asset' },
            { endpoint: '/data-classification-enforcer/enforce', desc: 'Enforce classification policy' },
            { endpoint: '/data-classification-enforcer/report', desc: 'Generate classification report' },
          ].map((item, index) => (
            <View key={index} style={styles.endpointRow}>
              <Zap size={16} color="#6366F1" />
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
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Auto-Classification</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Automatically classify new data</Text>
            </View>
            <Switch value={autoClassification} onValueChange={setAutoClassification} trackColor={{ false: '#767577', true: '#6366F1' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Enforcement Mode</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Enforce classification policies</Text>
            </View>
            <Switch value={enforcementMode} onValueChange={setEnforcementMode} trackColor={{ false: '#767577', true: '#6366F1' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Audit Logging</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Log all classification events</Text>
            </View>
            <Switch value={auditLogging} onValueChange={setAuditLogging} trackColor={{ false: '#767577', true: '#6366F1' }} />
          </View>
        </View>
      )}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/security/vp-privacy-enterprise')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Shield size={24} color="#6366F1" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI VP Privacy</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent (134)</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="data-classification-enforcer" agentName="AI Data Classification Enforcer" />
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
  activeTab: { backgroundColor: '#6366F1' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  activeTabText: { color: '#fff' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  capabilitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  capabilityCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, gap: 8, flex: 1, minWidth: '45%' },
  capabilityText: { fontSize: 13, fontWeight: '500', flex: 1 },
  capabilityCheck: { marginLeft: 'auto' },
  classificationCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  classificationHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  classificationIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  classificationName: { flex: 1, fontSize: 15, fontWeight: '600' },
  classificationCount: { fontSize: 13, fontWeight: '600' },
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
