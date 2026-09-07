import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { AgentChat } from './AgentChat';
import { AgentDashboard } from './AgentDashboard';
import { AgentSummaryNotes } from './AgentSummaryNotes';
import { AIEmployee } from '@/constants/aiEmployees';
import { 
  MessageSquare, Brain, LayoutDashboard, BarChart3, BarChart3, Target, 
  Clock, FileText, Activity, Settings, CircleCheckBig, TriangleAlert, 
  Cpu, Database
} from 'lucide-react-native';

interface Tab {
  id: string;
  label: string;
  icon: any;
  component: React.ReactNode;
}

/**
 * Hook that generates comprehensive tabs for AI agent pages
 * Returns an array of tab objects with all standard features
 */
export const useComprehensiveAgentTabs = (agent: Partial<AIEmployee>, customTabs: Tab[] = []): Tab[] => {
  const { theme } = useTheme();

  // Render functions for comprehensive tabs
  const renderChatTab = () => <AgentChat agent={agent} />;
  const renderDashboardTab = () => <AgentDashboard agent={agent} />;
  const renderSummaryNotesTab = () => <AgentSummaryNotes agent={agent} />;

  const renderOverviewTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <Brain size={20} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>What this agent does</Text>
        </View>
        <Text style={[styles.cardText, { color: theme.colors.secondaryText }]}>
          {agent.description || 'This agent helps automate tasks and improve efficiency.'}
        </Text>
        <View style={[styles.sectionDivider, { borderBottomColor: theme.colors.border }]} />
        <View style={styles.overviewStats}>
          <View style={styles.overviewStat}>
            <Text style={[styles.overviewStatValue, { color: theme.colors.text }]}>{agent.humanCost || '$60k/year'}</Text>
            <Text style={[styles.overviewStatLabel, { color: theme.colors.secondaryText }]}>Human Cost</Text>
          </View>
          <View style={styles.overviewStat}>
            <Text style={[styles.overviewStatValue, { color: '#34C759' }]}>{agent.aiCost || '$1.2k/year'}</Text>
            <Text style={[styles.overviewStatLabel, { color: theme.colors.secondaryText }]}>AI Cost</Text>
          </View>
          <View style={styles.overviewStat}>
            <Text style={[styles.overviewStatValue, { color: agent.color || '#007AFF' }]}>{agent.infrastructure?.health || 96}%</Text>
            <Text style={[styles.overviewStatLabel, { color: theme.colors.secondaryText }]}>Health</Text>
          </View>
        </View>
      </View>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <CircleCheckBig size={20} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Core capabilities</Text>
        </View>
        <View style={styles.tags}>
          {(agent.capabilities || ['Task Automation', 'Data Processing', 'Workflow Coordination']).map((cap, idx) => (
            <View key={idx} style={[styles.tag, { borderColor: theme.colors.border, backgroundColor: theme.colors.background }]}>
              <Text style={[styles.tagText, { color: theme.colors.text }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );

  const renderAnalyticsTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <BarChart3 size={20} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Analytics Dashboard</Text>
        </View>
        <View style={styles.kpiRow}>
          <View style={styles.kpiItem}>
            <Text style={[styles.kpiValue, { color: '#34C759' }]}>{agent.roiMetrics?.tasksAutomatedDaily || 120 * 7}</Text>
            <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>Tasks (7d)</Text>
          </View>
          <View style={styles.kpiItem}>
            <Text style={[styles.kpiValue, { color: '#007AFF' }]}>{agent.roiMetrics?.accuracyRate || '96.8'}%</Text>
            <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>Success Rate</Text>
          </View>
          <View style={styles.kpiItem}>
            <Text style={[styles.kpiValue, { color: '#FF9500' }]}>97.2%</Text>
            <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>Efficiency</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderPerformanceTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <BarChart3 size={20} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Performance Metrics</Text>
        </View>
        <View style={styles.kpiRow}>
          <View style={styles.kpiItem}>
            <Text style={[styles.kpiValue, { color: '#34C759' }]}>{agent.roiMetrics?.tasksAutomatedDaily || 120}</Text>
            <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>Daily Tasks</Text>
          </View>
          <View style={styles.kpiItem}>
            <Text style={[styles.kpiValue, { color: '#007AFF' }]}>{agent.roiMetrics?.responseTime || '<1s'}</Text>
            <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>Response Time</Text>
          </View>
          <View style={styles.kpiItem}>
            <Text style={[styles.kpiValue, { color: '#FF9500' }]}>{agent.roiMetrics?.accuracyRate || '96%'}</Text>
            <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>Accuracy</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderCapabilitiesTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <Target size={20} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Capabilities</Text>
        </View>
        <View style={styles.capabilitiesList}>
          {(agent.capabilities || ['Task Automation', 'Data Processing', 'Workflow Coordination']).map((cap, idx) => (
            <View key={idx} style={[styles.capabilityItem, { borderBottomColor: theme.colors.border }]}>
              <View style={styles.capabilityHeader}>
                <Text style={[styles.capabilityName, { color: theme.colors.text }]}>{cap}</Text>
                <Text style={[styles.capabilityProficiency, { color: agent.color || '#007AFF' }]}>{Math.floor(85 + Math.random() * 14)}%</Text>
              </View>
              <View style={[styles.capabilityBar, { backgroundColor: 'rgba(0,0,0,0.1)' }]}>
                <View style={[styles.capabilityFill, { width: `${85 + Math.random() * 14}%`, backgroundColor: agent.color || '#007AFF' }]} />
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );

  const renderHistoryTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <Clock size={20} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Activity History</Text>
        </View>
        <View style={styles.historyList}>
          {Array.from({ length: 10 }, (_, i) => ({
            id: `hist-${i}`,
            action: `Completed task ${i + 1}`,
            description: 'Task completed successfully',
            status: i % 5 === 0 ? 'warning' : 'success',
            timestamp: new Date(Date.now() - i * 2 * 60 * 60 * 1000).toISOString(),
          })).map((h) => (
            <View key={h.id} style={[styles.historyRow, { borderBottomColor: theme.colors.border }]}>
              <View style={styles.historyLeft}>
                {h.status === 'success' ? (
                  <CircleCheckBig size={16} color="#34C759" />
                ) : (
                  <TriangleAlert size={16} color="#FF9500" />
                )}
                <View style={{ flex: 1 }}>
                  <Text style={[styles.historyTitle, { color: theme.colors.text }]}>{h.action}</Text>
                  <Text style={[styles.historySub, { color: theme.colors.secondaryText }]}>{h.description}</Text>
                </View>
              </View>
              <Text style={[styles.historyTime, { color: theme.colors.secondaryText }]}>
                {new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );

  const renderLiveActivityTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <Activity size={20} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Live Activity</Text>
        </View>
        <View style={styles.liveStatus}>
          <View style={[styles.liveStatusDot, { backgroundColor: '#34C759' }]} />
          <Text style={[styles.liveStatusText, { color: theme.colors.text }]}>Status: Active</Text>
        </View>
        <View style={[styles.sectionDivider, { borderBottomColor: theme.colors.border }]} />
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Cpu size={16} color={agent.color || '#007AFF'} />
            <View style={styles.statContent}>
              <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>CPU Usage</Text>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>{(35 + Math.random() * 35).toFixed(1)}%</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <Database size={16} color={agent.color || '#007AFF'} />
            <View style={styles.statContent}>
              <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Memory</Text>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>{(35 + Math.random() * 35).toFixed(1)}%</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderCounselingTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <Brain size={20} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Agent Counseling</Text>
        </View>
        <Text style={[styles.cardText, { color: theme.colors.secondaryText }]}>
          Agent-to-agent counseling and collaboration features enable agents to learn from each other, share knowledge, and improve performance through structured interactions.
        </Text>
      </View>
    </ScrollView>
  );

  const renderSettingsTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <Settings size={20} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Settings</Text>
        </View>
        <Text style={[styles.cardText, { color: theme.colors.secondaryText }]}>
          Comprehensive agent settings including company setup, profile setup, negotiation rules, limits, voice & personality, experience goals, business hours, AI configurations, integrations, pricing & limits, training, rules & regulations, and behaviors & limits.
        </Text>
      </View>
    </ScrollView>
  );

  // Standard comprehensive tabs
  const comprehensiveTabs: Tab[] = [
    { id: 'chat', label: 'Chat', icon: MessageSquare, component: renderChatTab },
    { id: 'overview', label: 'Overview', icon: Brain, component: renderOverviewTab },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, component: renderDashboardTab },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, component: renderAnalyticsTab },
    { id: 'performance', label: 'Performance', icon: BarChart3, component: renderPerformanceTab },
    { id: 'capabilities', label: 'Capabilities', icon: Target, component: renderCapabilitiesTab },
    { id: 'history', label: 'History', icon: Clock, component: renderHistoryTab },
    { id: 'summary', label: 'Summary & Notes', icon: FileText, component: renderSummaryNotesTab },
    { id: 'activity', label: 'Live Activity', icon: Activity, component: renderLiveActivityTab },
    { id: 'counseling', label: 'Counseling', icon: Brain, component: renderCounselingTab },
    { id: 'settings', label: 'Settings', icon: Settings, component: renderSettingsTab },
  ];

  // Merge comprehensive tabs with custom tabs (custom tabs come first)
  const mergedTabs: Tab[] = [...customTabs, ...comprehensiveTabs];
  return mergedTabs;
};

const styles = StyleSheet.create({
  tabContent: { paddingHorizontal: 20, paddingBottom: 20 },
  card: { padding: 20, borderRadius: 16, marginBottom: 15 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15 },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  cardText: { fontSize: 14, lineHeight: 22 },
  sectionDivider: { borderBottomWidth: 1, marginVertical: 15 },
  overviewStats: { flexDirection: 'row', gap: 15, marginTop: 12 },
  overviewStat: { flex: 1, alignItems: 'center' },
  overviewStatValue: { fontSize: 18, fontWeight: '900' },
  overviewStatLabel: { fontSize: 11, fontWeight: '600', marginTop: 4 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, borderWidth: 1 },
  tagText: { fontSize: 12, fontWeight: '600' },
  kpiRow: { flexDirection: 'row', gap: 10 },
  kpiItem: { flex: 1 },
  kpiValue: { fontSize: 20, fontWeight: '900' },
  kpiLabel: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  capabilitiesList: { gap: 12 },
  capabilityItem: { paddingBottom: 12, borderBottomWidth: 1 },
  capabilityHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  capabilityName: { fontSize: 14, fontWeight: '600' },
  capabilityProficiency: { fontSize: 14, fontWeight: '700' },
  capabilityBar: { height: 6, borderRadius: 3, marginBottom: 6 },
  capabilityFill: { height: '100%', borderRadius: 3 },
  historyList: { gap: 10 },
  historyRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1 },
  historyLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1, paddingRight: 10 },
  historyTitle: { fontSize: 13, fontWeight: '700' },
  historySub: { fontSize: 12, fontWeight: '500', marginTop: 2 },
  historyTime: { fontSize: 10, fontWeight: '600' },
  liveStatus: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 12 },
  liveStatusDot: { width: 8, height: 8, borderRadius: 4 },
  liveStatusText: { fontSize: 14, fontWeight: '700' },
  statRow: { flexDirection: 'row', gap: 15, marginTop: 10 },
  statItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  statContent: { flex: 1 },
  statLabel: { fontSize: 11, fontWeight: '600', marginBottom: 2 },
  statValue: { fontSize: 14, fontWeight: '700' },
});
