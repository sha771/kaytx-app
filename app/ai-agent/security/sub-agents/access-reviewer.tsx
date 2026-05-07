import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase, Eye, 
  CheckCircle, AlertTriangle, BarChart3, Users, Calendar, FileText, ShieldCheck,
  Settings, Filter, Download, Share2
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function AccessReviewerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [autoReviews, setAutoReviews] = useState(true);
  const [certification, setCertification] = useState(true);
  const [orphanDetection, setOrphanDetection] = useState(true);

  const stats = [
    { label: 'Reviews Done', value: '1,234', icon: Eye, color: '#F8BBD9' },
    { label: 'Certified', value: '94%', icon: CheckCircle, color: '#34C759' },
    { label: 'Orphaned', value: '12', icon: AlertTriangle, color: '#FF9500' },
    { label: 'Stale', value: '45', icon: Clock, color: '#FF3B30' },
  ];

  const campaigns = [
    { name: 'Q1 2024 Access Cert', status: 'in-progress', progress: 67, due: '2024-04-15', owners: 45 },
    { name: 'Privileged Access Review', status: 'completed', progress: 100, due: '2024-03-01', owners: 12 },
    { name: 'Application Access', status: 'pending', progress: 0, due: '2024-05-01', owners: 120 },
  ];

  const capabilities = [
    { name: 'Access Reviews', icon: Eye, enabled: true },
    { name: 'Certification', icon: CheckCircle, enabled: true },
    { name: 'Orphan Detection', icon: AlertTriangle, enabled: true },
    { name: 'Stale Access', icon: Clock, enabled: true },
    { name: 'Policy Violations', icon: ShieldCheck, enabled: true },
    { name: 'Attestation', icon: FileText, enabled: true },
    { name: 'Role Mining', icon: BarChart3, enabled: true },
    { name: 'Reporting', icon: FileText, enabled: true },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#F8BBD920' }]}>
          <Eye size={56} color="#F8BBD9" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Access Reviewer</Text>
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
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <CheckCircle size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>94% Certified</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) =>(
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.tabContainer}>
        {['overview', 'campaigns', 'capabilities', 'settings'].map((tab) => (
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
              AI Access Reviewer automates access certification campaigns, detects orphaned accounts, 
              identifies stale access, and ensures continuous compliance with identity governance policies.
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

      {activeTab === 'campaigns' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Review Campaigns</Text>
          {campaigns.map((campaign, index) => (
            <View key={index} style={styles.campaignCard}>
              <View style={styles.campaignHeader}>
                <Text style={styles.campaignName}>{campaign.name}</Text>
                <View style={[styles.campaignStatusBadge, { backgroundColor: campaign.status === 'completed' ? '#34C75920' : campaign.status === 'in-progress' ? '#007AFF20' : '#FF950020' }]}>
                  <Text style={[styles.campaignStatusText, { color: campaign.status === 'completed' ? '#34C759' : campaign.status === 'in-progress' ? '#007AFF' : '#FF9500' }]}>{campaign.status}</Text>
                </View>
              </View>
              <View style={styles.campaignProgressContainer}>
                <View style={styles.campaignProgressBar}>
                  <View style={[styles.campaignProgressFill, { width: campaign.progress + '%', backgroundColor: campaign.status === 'completed' ? '#34C759' : '#F8BBD9' }]} />
                </View>
                <Text style={styles.campaignProgressText}>{campaign.progress}%</Text>
              </View>
              <View style={styles.campaignFooter}>
                <Text style={styles.campaignMeta}>Due: {campaign.due}</Text>
                <Text style={styles.campaignMeta}>Owners: {campaign.owners}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'capabilities' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
          {[
            { endpoint: '/consult/access-reviewer', desc: 'Consult on access review strategies' },
            { endpoint: '/access-reviewer/execute', desc: 'Execute access certification campaigns' },
            { endpoint: '/access-reviewer/analyze', desc: 'Analyze access patterns and risks' },
            { endpoint: '/access-reviewer/detect', desc: 'Detect orphaned and stale accounts' },
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
              <Text style={styles.featureToggleTitle}>Automatic Reviews</Text>
              <Text style={styles.featureToggleDesc}>Schedule and run automated access reviews</Text>
            </View>
            <Switch value={autoReviews} onValueChange={setAutoReviews} trackColor={{ false: '#767577', true: '#F8BBD9' }} />
          </View>
          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={styles.featureToggleTitle}>Certification</Text>
              <Text style={styles.featureToggleDesc}>Enable access certification workflows</Text>
            </View>
            <Switch value={certification} onValueChange={setCertification} trackColor={{ false: '#767577', true: '#F8BBD9' }} />
          </View>
          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={styles.featureToggleTitle}>Orphan Detection</Text>
              <Text style={styles.featureToggleDesc}>Auto-detect orphaned accounts</Text>
            </View>
            <Switch value={orphanDetection} onValueChange={setOrphanDetection} trackColor={{ false: '#767577', true: '#F8BBD9' }} />
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

      <AgentFeatures agentId="access-reviewer" agentName="AI Access Reviewer" />
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
  campaignCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  campaignHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  campaignName: { fontSize: 16, fontWeight: '600', flex: 1 },
  campaignStatusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  campaignStatusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  campaignProgressContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  campaignProgressBar: { flex: 1, height: 8, backgroundColor: '#E5E5EA', borderRadius: 4, marginRight: 12 },
  campaignProgressFill: { height: 8, borderRadius: 4 },
  campaignProgressText: { fontSize: 12, fontWeight: '600', color: '#666' },
  campaignFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  campaignMeta: { fontSize: 12, color: '#666' },
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
