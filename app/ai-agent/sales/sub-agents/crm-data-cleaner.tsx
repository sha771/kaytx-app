import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Activity, TrendingUp, TrendingDown, Target, ArrowRight, Briefcase,
  Brain, BarChart3, DollarSign, Database, CheckCircle, AlertTriangle,
  FileText, Settings, Trash2, RefreshCw
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const PARENT_AGENT = { id: 'sales-ops-manager', name: 'AI Sales Operations Manager', route: '/ai-agent/sales/sales-ops-manager', icon: BarChart3, color: '#FF9500' };

export default function CrmDataCleanerPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Records Cleaned', value: '42K', icon: Database, color: '#007AFF', change: '+8K' },
    { label: 'Duplicates Found', value: '1.2K', icon: Trash2, color: '#FF3B30', change: '-340' },
    { label: 'Data Accuracy', value: '98.4%', icon: CheckCircle, color: '#34C759', change: '+1.2%' },
    { label: 'Fields Updated', value: '18K', icon: RefreshCw, color: '#FF9500', change: '+3K' },
  ];

  const kpis = [
    { label: 'Data Health Score', value: '98.4%', trend: 'up' },
    { label: 'Duplicate Rate', value: '0.3%', trend: 'down' },
    { label: 'Completeness', value: '96%', trend: 'up' },
    { label: 'Stale Records', value: '142', trend: 'down' },
  ];

  const capabilities = [
    'Deduplication', 'Data Enrichment', 'Format Standardization', 'Merge Detection',
    'Stale Data Flagging', 'Field Validation', 'Auto-correction', 'Relationship Cleanup',
    'Import Hygiene', 'Schema Validation', 'Orphan Detection', 'Compliance Scrub'
  ];

  const responsibilities = [
    'CRM record deduplication using fuzzy matching and AI-powered merge detection',
    'Data enrichment through third-party integration and auto-fill of missing fields',
    'Format standardization for names, addresses, phones, and emails across records',
    'Stale data flagging and automated outreach for re-verification',
    'Field validation and constraint enforcement for data integrity',
    'Auto-correction of common data entry errors and formatting issues',
    'Relationship and association cleanup for contact-account linking',
    'Import hygiene validation for bulk data loads and migrations',
    'Schema validation to ensure data conforms to CRM field requirements',
    'Orphan record detection and re-association to correct parent records',
    'Compliance data scrubbing for GDPR and privacy regulation adherence',
    'Automated data quality scoring and dashboard reporting'
  ];

  const activities = [
    { time: '3 min ago', text: 'Deduplicated 340 records across 3 regions', icon: Database, type: 'dedup' },
    { time: '18 min ago', text: 'Data enrichment batch: 2.4K records updated', icon: RefreshCw, type: 'enrichment' },
    { time: '35 min ago', text: 'Stale data flagged: 142 records need re-verification', icon: AlertTriangle, type: 'flag' },
    { time: '1 hour ago', text: 'Format standardization: 8K phone numbers corrected', icon: CheckCircle, type: 'standard' },
    { time: '2 hours ago', text: 'Orphan detection: 28 records re-linked to accounts', icon: Database, type: 'cleanup' },
    { time: '3 hours ago', text: 'Compliance scrub: 56 records sanitized for GDPR', icon: Trash2, type: 'compliance' },
  ];

  const quickActions = [
    { label: 'Deduplicate', icon: Database },
    { label: 'Enrich', icon: RefreshCw },
    { label: 'Validate', icon: CheckCircle },
    { label: 'Flag Stale', icon: AlertTriangle },
    { label: 'Merge', icon: Trash2 },
    { label: 'Scrub', icon: Trash2 },
    { label: 'Reports', icon: FileText },
    { label: 'Settings', icon: Settings },
  ];

  const typeColors: Record<string, string> = {
    dedup: '#007AFF', enrichment: '#34C759', flag: '#FF9500', standard: '#5856D6', cleanup: '#AF52DE', compliance: '#FF2D55',
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#007AFF18' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#007AFF25' }]}>
          <Database size={48} color="#007AFF" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI CRM Data Cleaner</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Data Quality • Sales Operations</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Live</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Briefcase size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#007AFF22' }]}><Database size={12} color="#007AFF" /><Text style={[styles.badgeText, { color: '#007AFF' }]}>42K Cleaned</Text></View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}><Brain size={12} color="#AF52DE" /><Text style={[styles.badgeText, { color: '#AF52DE' }]}>AI-Powered</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => {
          const StatIcon = stat.icon;
          return (
            <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
              <StatIcon size={22} color={stat.color} />
              <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
              <Text style={[styles.statChange, { color: stat.change.startsWith('+') || stat.change.startsWith('-') ? (stat.label.includes('Duplicate') || stat.label.includes('Stale') ? (stat.change.startsWith('-') ? '#34C759' : '#FF3B30') : (stat.change.startsWith('+') ? '#34C759' : '#FF3B30')) : '#8E8E93' }]}>{stat.change}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
            </View>
          );
        })}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance KPIs</Text>
        <View style={styles.kpiGrid}>
          {kpis.map((kpi, index) => (
            <View key={index} style={[styles.kpiCard, { backgroundColor: theme.colors.background }]}>
              <Text style={[styles.kpiValue, { color: theme.colors.text }]}>{kpi.value}</Text>
              <Text style={[styles.kpiLabel, { color: theme.colors.textSecondary }]}>{kpi.label}</Text>
              <View style={[styles.trendBadge, { backgroundColor: (kpi.trend === 'up' ? '#34C759' : '#FF3B30') + '22' }]}>
                {kpi.trend === 'up' ? <TrendingUp size={10} color="#34C759" /> : <TrendingDown size={10} color="#FF3B30" />}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The AI CRM Data Cleaner ensures data quality across the sales CRM through automated deduplication, enrichment, validation, and compliance scrubbing. It maintains data accuracy, reduces stale records, and ensures the CRM remains a trusted source of truth for the entire sales organization.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#007AFF18' }]}>
              <Text style={[styles.tagText, { color: '#007AFF' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <View style={[styles.bulletPoint, { backgroundColor: '#007AFF' }]} />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Activity Feed</Text>
        {activities.map((act, index) => {
          const ActIcon = act.icon;
          return (
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
          );
        })}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => {
            const ActionIcon = action.icon;
            return (
              <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#007AFF12' }]}>
                <ActionIcon size={22} color="#007AFF" />
                <Text style={[styles.actionText, { color: '#007AFF' }]}>{action.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push(PARENT_AGENT.route)} style={[styles.parentCard, { backgroundColor: theme.colors.background }]}>
          <PARENT_AGENT.icon size={24} color={PARENT_AGENT.color} />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>{PARENT_AGENT.name}</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Operations Agent • Sales Division</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="crm-data-cleaner" agentName="AI CRM Data Cleaner" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', marginTop: 16, gap: 8, flexWrap: 'wrap', justifyContent: 'center' },
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
  bulletPoint: { width: 6, height: 6, borderRadius: 3 },
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 10 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
  activityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  activityBadgeText: { fontSize: 10, fontWeight: '600', textTransform: 'capitalize' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  actionText: { fontSize: 12, fontWeight: '600', marginTop: 8 },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
