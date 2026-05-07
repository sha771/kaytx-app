import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase,
  Handshake, CheckCircle, AlertTriangle, Users, FileText,
  Bell, Globe, BarChart3, Scale
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function ConsentManagerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [autoCollection, setAutoCollection] = useState(true);
  const [consentEnforcement, setConsentEnforcement] = useState(true);
  const [expiryAlerts, setExpiryAlerts] = useState(true);

  const stats = [
    { label: 'Active Consents', value: '2,847', icon: Handshake, color: '#EC4899' },
    { label: 'Expired', value: '156', icon: Clock, color: '#F59E0B' },
    { label: 'Revoked', value: '23', icon: AlertTriangle, color: '#EF4444' },
    { label: 'Compliance', value: '99%', icon: Scale, color: '#10B981' },
  ];

  const consentTypes = [
    { type: 'Marketing', active: 1245, expired: 45, framework: 'GDPR', icon: Bell },
    { type: 'Data Processing', active: 892, expired: 67, framework: 'CCPA', icon: FileText },
    { type: 'Third-party Sharing', active: 234, expired: 28, framework: 'GDPR', icon: Globe },
    { type: 'Analytics', active: 476, expired: 16, framework: 'CCPA', icon: BarChart3 },
  ];

  const capabilities = [
    { name: 'Consent Collection', icon: Handshake, enabled: true },
    { name: 'Preference Management', icon: Users, enabled: true },
    { name: 'Expiry Tracking', icon: Clock, enabled: true },
    { name: 'Revocation Handling', icon: AlertTriangle, enabled: true },
    { name: 'Compliance Reporting', icon: Scale, enabled: true },
    { name: 'Multi-region Support', icon: Globe, enabled: true },
    { name: 'Audit Trail', icon: FileText, enabled: true },
    { name: 'Notification Engine', icon: Bell, enabled: true },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#EC489920' }]}>
          <Handshake size={56} color="#EC4899" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Consent Manager</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI VP Privacy</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#EC489922' }]}>
            <Briefcase size={12} color="#EC4899" />
            <Text style={[styles.badgeText, { color: '#EC4899' }]}>Manager</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#10B98122' }]}>
            <Handshake size={12} color="#10B981" />
            <Text style={[styles.badgeText, { color: '#10B981' }]}>2,847 Consents</Text>
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
        {['overview', 'consents', 'capabilities', 'settings'].map((tab) => (
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
              AI Consent Manager manages user consent lifecycle across all data processing activities, 
              ensuring compliance with GDPR, CCPA, and other privacy regulations through automated tracking.
            </Text>
          </View>

          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
            <View style={styles.capabilitiesGrid}>
              {capabilities.map((cap, index) => (
                <View key={index} style={[styles.capabilityCard, { backgroundColor: cap.enabled ? '#EC489910' : '#F2F2F7' }]}>
                  <cap.icon size={20} color={cap.enabled ? '#EC4899' : '#999'} />
                  <Text style={[styles.capabilityText, { color: cap.enabled ? theme.colors.text : '#999' }]}>{cap.name}</Text>
                  {cap.enabled && <CheckCircle size={14} color="#34C759" style={styles.capabilityCheck} />}
                </View>
              ))}
            </View>
          </View>
        </>
      )}

      {activeTab === 'consents' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Consent Types</Text>
          {consentTypes.map((ct, index) => (
            <View key={index} style={styles.consentCard}>
              <View style={styles.consentHeader}>
                <View style={[styles.consentIcon, { backgroundColor: '#EC489920' }]}>
                  <ct.icon size={18} color="#EC4899" />
                </View>
                <Text style={styles.consentType}>{ct.type}</Text>
                <View style={styles.frameworkBadge}>
                  <Text style={styles.frameworkText}>{ct.framework}</Text>
                </View>
              </View>
              <View style={styles.consentFooter}>
                <View style={styles.consentMetric}>
                  <CheckCircle size={12} color="#10B981" />
                  <Text style={styles.consentValue}>{ct.active} active</Text>
                </View>
                <View style={styles.consentMetric}>
                  <Clock size={12} color="#F59E0B" />
                  <Text style={styles.consentValue}>{ct.expired} expired</Text>
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
            { endpoint: '/consult/consent-manager', desc: 'Consult on consent management' },
            { endpoint: '/consent-manager/collect', desc: 'Collect user consent' },
            { endpoint: '/consent-manager/revoke', desc: 'Process consent revocation' },
            { endpoint: '/consent-manager/report', desc: 'Generate compliance report' },
          ].map((item, index) => (
            <View key={index} style={styles.endpointRow}>
              <Zap size={16} color="#EC4899" />
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
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Automatically collect consent</Text>
            </View>
            <Switch value={autoCollection} onValueChange={setAutoCollection} trackColor={{ false: '#767577', true: '#EC4899' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Consent Enforcement</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Enforce consent before processing</Text>
            </View>
            <Switch value={consentEnforcement} onValueChange={setConsentEnforcement} trackColor={{ false: '#767577', true: '#EC4899' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: theme.colors.text }]}>Expiry Alerts</Text>
              <Text style={[styles.featureToggleDesc, { color: theme.colors.textSecondary }]}>Alert on expiring consents</Text>
            </View>
            <Switch value={expiryAlerts} onValueChange={setExpiryAlerts} trackColor={{ false: '#767577', true: '#EC4899' }} />
          </View>
        </View>
      )}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/security/vp-privacy-enterprise')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Shield size={24} color="#EC4899" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI VP Privacy</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent (134)</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="consent-manager" agentName="AI Consent Manager" />
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
  activeTab: { backgroundColor: '#EC4899' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  activeTabText: { color: '#fff' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  capabilitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  capabilityCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, gap: 8, flex: 1, minWidth: '45%' },
  capabilityText: { fontSize: 13, fontWeight: '500', flex: 1 },
  capabilityCheck: { marginLeft: 'auto' },
  consentCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  consentHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  consentIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  consentType: { flex: 1, fontSize: 14, fontWeight: '600' },
  frameworkBadge: { backgroundColor: '#F3F4F6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  frameworkText: { fontSize: 11, fontWeight: '600', color: '#6B7280' },
  consentFooter: { flexDirection: 'row', gap: 20 },
  consentMetric: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  consentValue: { fontSize: 13, color: '#666' },
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
