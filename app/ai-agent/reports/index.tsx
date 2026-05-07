import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { FileText, BarChart3, TrendingUp, Clock, Users, Zap, Download, Share2, ChevronRight, Calendar, Filter, PieChart, Activity } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const REPORT_CATEGORIES = [
  {
    id: 'performance',
    name: 'Performance Reports',
    description: 'Agent efficiency, task completion, KPIs',
    icon: BarChart3,
    color: '#3B82F6',
    reports: [
      { id: 'daily', name: 'Daily Performance', frequency: 'Daily' },
      { id: 'weekly', name: 'Weekly Summary', frequency: 'Weekly' },
      { id: 'monthly', name: 'Monthly KPI Report', frequency: 'Monthly' },
      { id: 'quarterly', name: 'Quarterly Review', frequency: 'Quarterly' },
    ]
  },
  {
    id: 'operational',
    name: 'Operational Reports',
    description: 'System uptime, task distribution, workflows',
    icon: Zap,
    color: '#10B981',
    reports: [
      { id: 'uptime', name: 'System Uptime Report', frequency: 'Real-time' },
      { id: 'workflows', name: 'Workflow Efficiency', frequency: 'Weekly' },
      { id: 'tasks', name: 'Task Distribution', frequency: 'Daily' },
      { id: 'bottlenecks', name: 'Bottleneck Analysis', frequency: 'Weekly' },
    ]
  },
  {
    id: 'financial',
    name: 'Financial Reports',
    description: 'Cost savings, ROI, budget utilization',
    icon: TrendingUp,
    color: '#F59E0B',
    reports: [
      { id: 'roi', name: 'ROI Analysis', frequency: 'Monthly' },
      { id: 'savings', name: 'Cost Savings Report', frequency: 'Monthly' },
      { id: 'budget', name: 'Budget Utilization', frequency: 'Weekly' },
      { id: 'forecast', name: 'Financial Forecast', frequency: 'Quarterly' },
    ]
  },
  {
    id: 'team',
    name: 'Team & HR Reports',
    description: 'Agent activity, collaboration, hierarchy',
    icon: Users,
    color: '#8B5CF6',
    reports: [
      { id: 'activity', name: 'Agent Activity Log', frequency: 'Daily' },
      { id: 'collaboration', name: 'Collaboration Report', frequency: 'Weekly' },
      { id: 'hierarchy', name: 'Hierarchy Overview', frequency: 'Monthly' },
      { id: 'utilization', name: 'Resource Utilization', frequency: 'Weekly' },
    ]
  },
];

const SAVED_REPORTS = [
  { id: 1, name: 'Q1 Sales Performance', type: 'Performance', created: '2026-04-01', favorite: true },
  { id: 2, name: 'March Cost Analysis', type: 'Financial', created: '2026-04-02', favorite: true },
  { id: 3, name: 'Weekly Uptime Summary', type: 'Operational', created: '2026-04-05', favorite: false },
];

const QUICK_STATS = [
  { label: 'Reports Generated', value: '1,234', icon: FileText, color: '#3B82F6' },
  { label: 'This Week', value: '48', icon: Calendar, color: '#10B981' },
  { label: 'Scheduled', value: '12', icon: Clock, color: '#F59E0B' },
  { label: 'Favorites', value: '8', icon: PieChart, color: '#8B5CF6' },
];

export default function ReportsIndexPage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Reports</Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              Analytics and insights dashboard
            </Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionBtn}>
              <Download size={20} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Share2 size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          {QUICK_STATS.map((stat, i) => (
            <View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
              <stat.icon size={20} color={stat.color} />
              <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Saved Reports */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Saved Reports</Text>
          <TouchableOpacity>
            <Text style={[styles.viewAll, { color: '#3B82F6' }]}>View All</Text>
          </TouchableOpacity>
        </View>
        {SAVED_REPORTS.map((report) => (
          <TouchableOpacity key={report.id} style={[styles.savedReport, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.reportIcon, { backgroundColor: '#3B82F620' }]}>
              <FileText size={20} color="#3B82F6" />
            </View>
            <View style={styles.reportInfo}>
              <Text style={[styles.reportName, { color: theme.colors.text }]}>{report.name}</Text>
              <Text style={[styles.reportMeta, { color: theme.colors.textSecondary }]}>
                {report.type} • {report.created}
              </Text>
            </View>
            <ChevronRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Report Categories */}
      {REPORT_CATEGORIES.map((category) => (
        <View key={category.id} style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <View style={styles.categoryHeader}>
            <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
              <category.icon size={24} color={category.color} />
            </View>
            <View style={styles.categoryTitle}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>{category.name}</Text>
              <Text style={[styles.categoryDesc, { color: theme.colors.textSecondary }]}>{category.description}</Text>
            </View>
          </View>
          <View style={styles.reportsList}>
            {category.reports.map((report) => (
              <TouchableOpacity key={report.id} style={[styles.reportItem, { backgroundColor: theme.colors.background }]}>
                <View style={styles.reportItemInfo}>
                  <Text style={[styles.reportItemName, { color: theme.colors.text }]}>{report.name}</Text>
                  <View style={[styles.freqBadge, { backgroundColor: category.color + '15' }]}>
                    <Text style={[styles.freqText, { color: category.color }]}>{report.frequency}</Text>
                  </View>
                </View>
                <ChevronRight size={18} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* Custom Report Builder */}
      <TouchableOpacity style={[styles.builderCard, { backgroundColor: '#8B5CF620' }]}>
        <View style={[styles.builderIcon, { backgroundColor: '#8B5CF6' }]}>
          <BarChart3 size={28} color="#fff" />
        </View>
        <View style={styles.builderContent}>
          <Text style={[styles.builderTitle, { color: theme.colors.text }]}>Custom Report Builder</Text>
          <Text style={[styles.builderDesc, { color: theme.colors.textSecondary }]}>
            Create personalized reports with custom metrics
          </Text>
        </View>
        <ChevronRight size={24} color="#8B5CF6" />
      </TouchableOpacity>

      <AgentFeatures agentId="reports-index" agentName="Reports Dashboard" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, borderBottomWidth: 1 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headerTitle: { fontSize: 26, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 14, marginTop: 2 },
  headerActions: { flexDirection: 'row', gap: 8 },
  actionBtn: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000010' },
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: { flex: 1, alignItems: 'center', padding: 12, borderRadius: 12 },
  statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 6 },
  statLabel: { fontSize: 11, marginTop: 2 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  viewAll: { fontSize: 13, fontWeight: '600' },
  savedReport: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 8 },
  reportIcon: { width: 44, height: 44, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  reportInfo: { flex: 1 },
  reportName: { fontSize: 15, fontWeight: '500' },
  reportMeta: { fontSize: 12, marginTop: 2 },
  categoryHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  categoryIcon: { width: 44, height: 44, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  categoryTitle: { flex: 1 },
  categoryDesc: { fontSize: 13, marginTop: 2 },
  reportsList: { gap: 6 },
  reportItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderRadius: 10 },
  reportItemInfo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  reportItemName: { fontSize: 14 },
  freqBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  freqText: { fontSize: 10, fontWeight: '600' },
  builderCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  builderIcon: { width: 52, height: 52, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  builderContent: { flex: 1 },
  builderTitle: { fontSize: 17, fontWeight: '600' },
  builderDesc: { fontSize: 13, marginTop: 2 },
});
