import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { FileText, Search, Filter, Calendar, Clock, User, Shield, AlertCircle, CheckCircle2, Info, Download, ChevronDown } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const LOG_LEVELS = [
  { id: 'all', name: 'All Levels', color: '#3B82F6' },
  { id: 'info', name: 'Info', color: '#3B82F6' },
  { id: 'warning', name: 'Warning', color: '#F59E0B' },
  { id: 'error', name: 'Error', color: '#EF4444' },
  { id: 'success', name: 'Success', color: '#10B981' },
];

const AUDIT_LOGS = [
  { id: 1, timestamp: '2026-05-05 03:42:15', level: 'info', user: 'system', action: 'Agent Activated', target: 'Sales Rep Pro', details: 'Auto-activation triggered by schedule', source: 'scheduler' },
  { id: 2, timestamp: '2026-05-05 03:38:22', level: 'success', user: 'admin@kaytx.ai', action: 'Workflow Completed', target: 'Lead Qualification', details: 'Successfully processed 150 leads', source: 'workflow-engine' },
  { id: 3, timestamp: '2026-05-05 03:35:10', level: 'warning', user: 'system', action: 'High Load Detected', target: 'Marketing AI', details: 'Processing queue exceeded 80% capacity', source: 'monitoring' },
  { id: 4, timestamp: '2026-05-05 03:30:45', level: 'info', user: 'api-key-xxx', action: 'API Call', target: '/v1/agents/status', details: 'Status check from external system', source: 'api-gateway' },
  { id: 5, timestamp: '2026-05-05 03:28:00', level: 'error', user: 'system', action: 'Task Failed', target: 'Data Sync Job', details: 'Connection timeout to external database', source: 'task-runner' },
  { id: 6, timestamp: '2026-05-05 03:25:33', level: 'success', user: 'hr-manager@kaytx.ai', action: 'Settings Updated', target: 'Agent Preferences', details: 'Modified notification settings', source: 'admin-panel' },
  { id: 7, timestamp: '2026-05-05 03:20:18', level: 'info', user: 'system', action: 'Backup Completed', target: 'Database', details: 'Daily backup finished successfully', source: 'backup-service' },
  { id: 8, timestamp: '2026-05-05 03:15:42', level: 'warning', user: 'security@kaytx.ai', action: 'Login Attempt', target: 'Admin Panel', details: 'Multiple failed login attempts detected', source: 'auth-service' },
];

const LOG_STATS = {
  total: 15678,
  today: 234,
  errors: 12,
  warnings: 45,
};

const LevelIcon = ({ level }: { level: string }) => {
  const icons = {
    info: Info,
    warning: AlertCircle,
    error: AlertCircle,
    success: CheckCircle2,
  };
  const Icon = icons[level as keyof typeof icons] || Info;
  const colors = {
    info: '#3B82F6',
    warning: '#F59E0B',
    error: '#EF4444',
    success: '#10B981',
  };
  return <Icon size={16} color={colors[level as keyof typeof colors] || '#3B82F6'} />;
};

export default function AuditLogsPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const filteredLogs = AUDIT_LOGS.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || log.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Audit Logs</Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              System activity and event history
            </Text>
          </View>
          <TouchableOpacity style={styles.downloadBtn}>
            <Download size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{LOG_STATS.total.toLocaleString()}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Total Logs</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{LOG_STATS.today}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Today</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#EF444420' }]}>
            <Text style={[styles.statValue, { color: '#EF4444' }]}>{LOG_STATS.errors}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Errors</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#F59E0B20' }]}>
            <Text style={[styles.statValue, { color: '#F59E0B' }]}>{LOG_STATS.warnings}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Warnings</Text>
          </View>
        </View>
      </View>

      {/* Filters */}
      <View style={[styles.filterSection, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {/* Search */}
        <View style={[styles.searchBar, { backgroundColor: theme.colors.background }]}>
          <Search size={18} color={theme.colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search logs..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Level Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.levelFilter}>
          {LOG_LEVELS.map((level) => (
            <TouchableOpacity
              key={level.id}
              onPress={() => setSelectedLevel(level.id)}
              style={[
                styles.levelChip,
                { backgroundColor: selectedLevel === level.id ? level.color + '20' : theme.colors.background },
                selectedLevel === level.id && { borderColor: level.color, borderWidth: 1 }
              ]}
            >
              <Text style={[styles.levelText, { color: selectedLevel === level.id ? level.color : theme.colors.textSecondary }]}>
                {level.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Date Filter */}
        <View style={styles.dateFilter}>
          <TouchableOpacity style={[styles.dateBtn, { backgroundColor: theme.colors.background }]}>
            <Calendar size={16} color={theme.colors.textSecondary} />
            <Text style={[styles.dateText, { color: theme.colors.textSecondary }]}>Last 24 hours</Text>
            <ChevronDown size={14} color={theme.colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterBtn, { backgroundColor: theme.colors.background }]}>
            <Filter size={16} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Logs List */}
      <View style={[styles.logsSection, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.logsCount, { color: theme.colors.textSecondary }]}>
          Showing {filteredLogs.length} logs
        </Text>
        <View style={styles.logsList}>
          {filteredLogs.map((log) => (
            <TouchableOpacity key={log.id} style={[styles.logItem, { backgroundColor: theme.colors.background }]}>
              <View style={styles.logHeader}>
                <View style={[styles.levelBadge, { backgroundColor: LOG_LEVELS.find(l => l.id === log.level)?.color + '20' }]}>
                  <LevelIcon level={log.level} />
                  <Text style={[styles.levelName, { color: LOG_LEVELS.find(l => l.id === log.level)?.color }]}>
                    {log.level.toUpperCase()}
                  </Text>
                </View>
                <View style={styles.timestamp}>
                  <Clock size={12} color={theme.colors.textSecondary} />
                  <Text style={[styles.timestampText, { color: theme.colors.textSecondary }]}>{log.timestamp}</Text>
                </View>
              </View>
              <View style={styles.logContent}>
                <Text style={[styles.actionText, { color: theme.colors.text }]}>{log.action}</Text>
                <Text style={[styles.targetText, { color: theme.colors.textSecondary }]}>{log.target}</Text>
                <Text style={[styles.detailsText, { color: theme.colors.textSecondary }]}>{log.details}</Text>
              </View>
              <View style={styles.logFooter}>
                <View style={styles.userInfo}>
                  <User size={12} color={theme.colors.textSecondary} />
                  <Text style={[styles.userText, { color: theme.colors.textSecondary }]}>{log.user}</Text>
                </View>
                <View style={[styles.sourceBadge, { backgroundColor: theme.colors.background }]}>
                  <Text style={[styles.sourceText, { color: theme.colors.textSecondary }]}>{log.source}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Load More */}
      <TouchableOpacity style={[styles.loadMore, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.loadMoreText, { color: '#3B82F6' }]}>Load More Logs</Text>
      </TouchableOpacity>

      <AgentFeatures agentId="audit-logs" agentName="Audit Logs" />
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
  downloadBtn: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000010' },
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: { flex: 1, alignItems: 'center', padding: 12, borderRadius: 12 },
  statValue: { fontSize: 20, fontWeight: 'bold' },
  statLabel: { fontSize: 11, marginTop: 2 },
  filterSection: { marginHorizontal: 16, marginVertical: 16, padding: 16, borderRadius: 16 },
  searchBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, height: 44, borderRadius: 10, marginBottom: 12 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15 },
  levelFilter: { marginBottom: 12 },
  levelChip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, marginRight: 8 },
  levelText: { fontSize: 13, fontWeight: '500' },
  dateFilter: { flexDirection: 'row', gap: 8 },
  dateBtn: { flexDirection: 'row', alignItems: 'center', flex: 1, paddingHorizontal: 12, height: 40, borderRadius: 10, gap: 8 },
  dateText: { fontSize: 13 },
  filterBtn: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  logsSection: { marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  logsCount: { fontSize: 13, marginBottom: 12 },
  logsList: { gap: 10 },
  logItem: { padding: 14, borderRadius: 12 },
  logHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  levelBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, gap: 4 },
  levelName: { fontSize: 10, fontWeight: '700' },
  timestamp: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  timestampText: { fontSize: 11 },
  logContent: { marginBottom: 10 },
  actionText: { fontSize: 15, fontWeight: '600' },
  targetText: { fontSize: 13, marginTop: 2 },
  detailsText: { fontSize: 12, marginTop: 4, lineHeight: 18 },
  logFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  userInfo: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  userText: { fontSize: 11 },
  sourceBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  sourceText: { fontSize: 10 },
  loadMore: { marginHorizontal: 16, marginBottom: 16, padding: 14, borderRadius: 12, alignItems: 'center' },
  loadMoreText: { fontSize: 14, fontWeight: '600' },
});
