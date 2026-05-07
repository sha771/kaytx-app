import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Database, Cloud, Download, Upload, Shield, Trash2, Archive, RefreshCw, ChevronRight, HardDrive, FolderOpen, FileText, Search, Clock } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const STORAGE_STATS = {
  used: '78.5 GB',
  total: '100 GB',
  percent: 78.5,
  breakdown: [
    { label: 'Agent Data', value: '32 GB', color: '#3B82F6', percent: 41 },
    { label: 'Logs & Analytics', value: '24 GB', color: '#10B981', percent: 31 },
    { label: 'Documents', value: '15 GB', color: '#F59E0B', percent: 19 },
    { label: 'Backups', value: '7.5 GB', color: '#8B5CF6', percent: 9 },
  ]
};

const DATA_ACTIONS = [
  { id: 'export', name: 'Export Data', icon: Download, color: '#3B82F6', description: 'Download your data in various formats' },
  { id: 'import', name: 'Import Data', icon: Upload, color: '#10B981', description: 'Bulk import from external sources' },
  { id: 'backup', name: 'Manual Backup', icon: Cloud, color: '#8B5CF6', description: 'Create instant backup snapshot' },
  { id: 'archive', name: 'Archive Old Data', icon: Archive, color: '#F59E0B', description: 'Move old data to cold storage' },
  { id: 'cleanup', name: 'Data Cleanup', icon: Trash2, color: '#EF4444', description: 'Remove unused and duplicate data' },
];

const DATA_POLICIES = [
  { id: 'retention', name: 'Data Retention', value: '90 days', icon: Clock },
  { id: 'encryption', name: 'Encryption', value: 'AES-256', icon: Shield },
  { id: 'backup-freq', name: 'Backup Frequency', value: 'Daily', icon: RefreshCw },
  { id: 'location', name: 'Data Location', value: 'US-East', icon: HardDrive },
];

export default function DataManagementPage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.headerIconWrap, { backgroundColor: '#3B82F620' }]}>
          <Database size={40} color="#3B82F6" />
        </View>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Data Management</Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Storage, backups, and data policies
        </Text>
      </View>

      {/* Storage Overview */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Storage Overview</Text>
        <View style={styles.storageCard}>
          <View style={styles.storageHeader}>
            <View>
              <Text style={[styles.storageUsed, { color: theme.colors.text }]}>{STORAGE_STATS.used}</Text>
              <Text style={[styles.storageTotal, { color: theme.colors.textSecondary }]}>of {STORAGE_STATS.total} used</Text>
            </View>
            <View style={[styles.storagePercentBadge, { backgroundColor: STORAGE_STATS.percent > 80 ? '#EF444420' : '#10B98120' }]}>
              <Text style={[styles.storagePercentText, { color: STORAGE_STATS.percent > 80 ? '#EF4444' : '#10B981' }]}>
                {STORAGE_STATS.percent}%
              </Text>
            </View>
          </View>
          <View style={styles.storageBar}>
            <View style={[styles.storageFill, { width: `${STORAGE_STATS.percent}%`, backgroundColor: STORAGE_STATS.percent > 80 ? '#EF4444' : '#3B82F6' }]} />
          </View>
          <View style={styles.storageBreakdown}>
            {STORAGE_STATS.breakdown.map((item) => (
              <View key={item.label} style={styles.breakdownItem}>
                <View style={styles.breakdownHeader}>
                  <View style={[styles.breakdownDot, { backgroundColor: item.color }]} />
                  <Text style={[styles.breakdownLabel, { color: theme.colors.text }]}>{item.label}</Text>
                  <Text style={[styles.breakdownValue, { color: theme.colors.textSecondary }]}>{item.value}</Text>
                </View>
                <View style={styles.breakdownBar}>
                  <View style={[styles.breakdownFill, { width: `${item.percent}%`, backgroundColor: item.color }]} />
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Data Actions</Text>
        <View style={styles.actionsGrid}>
          {DATA_ACTIONS.map((action) => (
            <TouchableOpacity key={action.id} style={[styles.actionCard, { backgroundColor: action.color + '15' }]}>
              <View style={[styles.actionIcon, { backgroundColor: action.color + '25' }]}>
                <action.icon size={24} color={action.color} />
              </View>
              <Text style={[styles.actionName, { color: theme.colors.text }]}>{action.name}</Text>
              <Text style={[styles.actionDesc, { color: theme.colors.textSecondary }]}>{action.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Data Policies */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Data Policies</Text>
        {DATA_POLICIES.map((policy) => (
          <TouchableOpacity key={policy.id} style={[styles.policyCard, { backgroundColor: theme.colors.background }]}>
            <View style={styles.policyInfo}>
              <policy.icon size={20} color={theme.colors.textSecondary} />
              <Text style={[styles.policyName, { color: theme.colors.text }]}>{policy.name}</Text>
            </View>
            <Text style={[styles.policyValue, { color: '#3B82F6' }]}>{policy.value}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Data Browser */}
      <TouchableOpacity style={[styles.browserCard, { backgroundColor: '#8B5CF620' }]}>
        <View style={[styles.browserIcon, { backgroundColor: '#8B5CF6' }]}>
          <FolderOpen size={24} color="#fff" />
        </View>
        <View style={styles.browserContent}>
          <Text style={[styles.browserTitle, { color: theme.colors.text }]}>Data Browser</Text>
          <Text style={[styles.browserDesc, { color: theme.colors.textSecondary }]}>
            Browse, search, and manage your data
          </Text>
        </View>
        <ChevronRight size={24} color="#8B5CF6" />
      </TouchableOpacity>

      <AgentFeatures agentId="data-management" agentName="Data Management" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', paddingVertical: 30, paddingHorizontal: 20, borderBottomWidth: 1 },
  headerIconWrap: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  headerTitle: { fontSize: 26, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 14, marginTop: 6, textAlign: 'center' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  storageCard: { padding: 16, backgroundColor: '#00000005', borderRadius: 12 },
  storageHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  storageUsed: { fontSize: 28, fontWeight: 'bold' },
  storageTotal: { fontSize: 13, marginTop: 2 },
  storagePercentBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  storagePercentText: { fontSize: 14, fontWeight: '600' },
  storageBar: { height: 8, backgroundColor: '#E5E5EA', borderRadius: 4, marginBottom: 20 },
  storageFill: { height: '100%', borderRadius: 4 },
  storageBreakdown: { gap: 12 },
  breakdownItem: { gap: 6 },
  breakdownHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  breakdownDot: { width: 10, height: 10, borderRadius: 5 },
  breakdownLabel: { flex: 1, fontSize: 14 },
  breakdownValue: { fontSize: 13 },
  breakdownBar: { height: 4, backgroundColor: '#E5E5EA', borderRadius: 2, marginLeft: 18 },
  breakdownFill: { height: '100%', borderRadius: 2 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  actionCard: { width: '48%', padding: 14, borderRadius: 12 },
  actionIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  actionName: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  actionDesc: { fontSize: 11, lineHeight: 16 },
  policyCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderRadius: 10, marginBottom: 8 },
  policyInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  policyName: { fontSize: 15 },
  policyValue: { fontSize: 14, fontWeight: '600' },
  browserCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  browserIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  browserContent: { flex: 1 },
  browserTitle: { fontSize: 16, fontWeight: '600' },
  browserDesc: { fontSize: 13, marginTop: 2 },
});
