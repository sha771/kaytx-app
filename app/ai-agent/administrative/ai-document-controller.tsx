import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Clipboard, Activity, Star, CircleCheckBig, TrendingUp, TrendingDown, DollarSign, BarChart3, Shield, ArrowRight, Users, Zap, FileText, Target, Brain, Briefcase, Eye, Globe, Calendar, Megaphone, FileStack, Archive, Lock, FileSearch, History } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function AiDocumentControllerPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Documents', value: '45.2K', icon: FileStack, color: '#CFD8DC', change: '+2.1K' },
    { label: 'Versions', value: '12.8K', icon: History, color: '#B0BEC5', change: '+456' },
    { label: 'Archives', value: '18.5K', icon: Archive, color: '#90A4AE', change: '+892' },
    { label: 'Access Ctrl', value: '100%', icon: Lock, color: '#78909C', change: '0%' },
  ];

  const kpis = [
    { label: 'Version Accuracy', value: '99.9%', trend: 'up' },
    { label: 'Retrieval Time', value: '1.2s', trend: 'down' },
    { label: 'Compliance', value: '100%', trend: 'up' },
    { label: 'Archive Efficiency', value: '98%', trend: 'up' },
  ];

  const capabilities = ['Version Management','Archive Organization','Access Control','Document Tracking','Retention Management','Compliance Monitoring','Security Enforcement','Audit Trail','Search & Retrieval','Workflow Integration','Metadata Management','Permissions Management','Backup & Recovery','Document Lifecycle','Policy Enforcement'];

  const responsibilities = [
    'Manage document versions and ensure users always access the latest version',
    'Organize document archives with systematic categorization and indexing',
    'Control document access with role-based permissions and security policies',
    'Track document usage, modifications, and distribution across the organization',
    'Manage document retention schedules and disposal policies',
    'Monitor compliance with document management regulations and standards',
    'Enforce security policies to protect sensitive and confidential documents',
    'Maintain comprehensive audit trails for all document activities',
    'Enable fast and accurate document search and retrieval capabilities',
    'Integrate document workflows with business processes and approvals',
    'Manage document metadata for improved organization and discoverability',
    'Administer user permissions and document access rights',
    'Implement backup and recovery procedures for document protection',
    'Manage complete document lifecycle from creation to archival',
    'Enforce document policies consistently across all departments'
  ];

  const activities = [
    { time: '2 min ago', text: 'Version updated: Q4 financial report v3.2 released', icon: History, type: 'version' },
    { time: '18 min ago', text: 'Archive organized: 2,300 documents categorized and indexed', icon: Archive, type: 'archive' },
    { time: '1 hour ago', text: 'Access policy applied: Confidential docs restricted to C-suite', icon: Lock, type: 'access' },
    { time: '2 hours ago', text: 'Audit completed: 100% compliance with document retention policy', icon: Shield, type: 'audit' },
    { time: '4 hours ago', text: 'Search index rebuilt: 45K documents indexed, avg query 1.2s', icon: FileSearch, type: 'search' },
    { time: '6 hours ago', text: 'Backup completed: All document archives backed up successfully', icon: Archive, type: 'backup' },
  ];

  const quickActions = [
    { label: 'Versions', icon: History }, { label: 'Archives', icon: Archive },
    { label: 'Access', icon: Lock }, { label: 'Search', icon: FileSearch },
    { label: 'Audit', icon: Shield }, { label: 'Reports', icon: BarChart3 },
    { label: 'Policy', icon: FileText }, { label: 'Backup', icon: Archive },
  ];

  const typeColors: Record<string, string> = { version: '#CFD8DC', archive: '#B0BEC5', access: '#90A4AE', audit: '#78909C', search: '#607D8B', backup: '#546E7A' };

  const subAgents = [
    { name: 'AI Version Manager', id: 'version-manager', icon: History, desc: 'Document versioning, change tracking & version control', color: '#CFD8DC' },
    { name: 'AI Archive Organizer', id: 'archive-organizer', icon: Archive, desc: 'Document categorization, indexing & archival automation', color: '#B0BEC5' },
    { name: 'AI Access Controller', id: 'access-controller', icon: Lock, desc: 'Permission management, access control & security policies', color: '#90A4AE' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#CFD8DC18' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#CFD8DC25' }]}>
          <Clipboard size={48} color="#78909C" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Document Controller</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Administrative Division — Controller Level</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#78909C22' }]}><Briefcase size={12} color="#78909C" /><Text style={[styles.badgeText, { color: '#78909C' }]}>Controller</Text></View>
          <View style={[styles.badge, { backgroundColor: '#90A4AE22' }]}><Clipboard size={12} color="#90A4AE" /><Text style={[styles.badgeText, { color: '#90A4AE' }]}>Documents</Text></View>
          <View style={[styles.badge, { backgroundColor: '#607D8B22' }]}><Brain size={12} color="#607D8B" /><Text style={[styles.badgeText, { color: '#607D8B' }]}>AI-Powered</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => { const StatIcon = stat.icon; return (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <StatIcon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statChange, { color: stat.change.startsWith('+') ? '#34C759' : '#FF3B30' }]}>{stat.change}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        )})}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance KPIs</Text>
        <View style={styles.kpiGrid}>
          {kpis.map((kpi, index) => (
            <View key={index} style={[styles.kpiCard, { backgroundColor: theme.colors.background }]}>
              <Text style={[styles.kpiValue, { color: theme.colors.text }]}>{kpi.value}</Text>
              <Text style={[styles.kpiLabel, { color: theme.colors.textSecondary }]}>{kpi.label}</Text>
              <View style={[styles.trendBadge, { backgroundColor: (kpi.trend === 'up' || (kpi.trend === 'down' && kpi.label === 'Retrieval Time') ? '#34C759' : '#FF3B30') + '22' }]}>
                {kpi.trend === 'up' || (kpi.trend === 'down' && kpi.label === 'Retrieval Time') ? <TrendingUp size={10} color="#34C759" /> : <TrendingDown size={10} color="#FF3B30" />}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The AI Document Controller manages the complete document lifecycle from creation to archival. This controller-level agent ensures version control, maintains organized archives, and enforces strict access controls while maintaining 100% compliance with document management policies and regulatory requirements.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#CFD8DC18' }]}>
              <Text style={[styles.tagText, { color: '#78909C' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#78909C" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Activity Feed</Text>
        {activities.map((act, index) => { const ActIcon = act.icon; return (
          <View key={index} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: (typeColors[act.type] || '#8E8E93') + '20' }]}>
              <ActIcon size={14} color={typeColors[act.type] || '#8E8E93'} />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
            <View style={[styles.activityBadge, { backgroundColor: (typeColors[act.type] || '#8E8E93') + '15' }]}>
              <Text style={[styles.activityBadgeText, { color: typeColors[act.type] || '#8E8E93' }]}>{act.type}</Text>
            </View>
          </View>
        )})}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        {subAgents.map((sub, index) => (
          <TouchableOpacity key={index} onPress={() => router.push(`/ai-agent/administrative/sub-agents/${sub.id}`)} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.subAgentIcon, { backgroundColor: sub.color + '15' }]}>
              <sub.icon size={20} color={sub.color} />
            </View>
            <View style={styles.subAgentInfo}>
              <Text style={[styles.subAgentName, { color: theme.colors.text }]}>{sub.name}</Text>
              <Text style={[styles.subAgentDesc, { color: theme.colors.textSecondary }]}>{sub.desc}</Text>
            </View>
            <ArrowRight size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#CFD8DC12' }]}>
              <action.icon size={24} color="#78909C" />
              <Text style={[styles.actionText, { color: '#78909C' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="ai-document-controller" agentName="AI Document Controller" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', marginTop: 16, gap: 8 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  statChange: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  statLabel: { fontSize: 11, marginTop: 4 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 8 },
  kpiCard: { flex: 1, minWidth: '45%', padding: 14, borderRadius: 12, position: 'relative' },
  kpiValue: { fontSize: 20, fontWeight: 'bold' },
  kpiLabel: { fontSize: 12, marginTop: 4 },
  trendBadge: { position: 'absolute', top: 10, right: 10, padding: 4, borderRadius: 8 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
  activityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  activityBadgeText: { fontSize: 10, fontWeight: '600', textTransform: 'capitalize' },
  subAgentCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 10, gap: 12 },
  subAgentIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  subAgentInfo: { flex: 1 },
  subAgentName: { fontSize: 15, fontWeight: '600' },
  subAgentDesc: { fontSize: 12, marginTop: 2 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 8 },
});
