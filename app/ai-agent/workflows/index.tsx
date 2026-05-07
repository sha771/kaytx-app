import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Workflow, Play, Pause, RotateCcw, CheckCircle2, Clock, Zap, GitBranch, Layers, Plus, Settings, ChevronRight, Activity, AlertCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const WORKFLOW_STATUS = {
  active: { label: 'Active', color: '#10B981', icon: Play },
  paused: { label: 'Paused', color: '#F59E0B', icon: Pause },
  completed: { label: 'Completed', color: '#3B82F6', icon: CheckCircle2 },
  failed: { label: 'Failed', color: '#EF4444', icon: AlertCircle },
};

const WORKFLOWS = [
  { id: 1, name: 'Lead Qualification Pipeline', status: 'active', steps: 5, completed: 3, lastRun: '2 min ago', automation: true },
  { id: 2, name: 'Customer Onboarding Flow', status: 'active', steps: 8, completed: 8, lastRun: '1 hour ago', automation: true },
  { id: 3, name: 'Content Publishing Queue', status: 'paused', steps: 4, completed: 1, lastRun: '3 hours ago', automation: false },
  { id: 4, name: 'Data Sync Workflow', status: 'active', steps: 6, completed: 6, lastRun: '30 min ago', automation: true },
  { id: 5, name: 'Invoice Processing', status: 'completed', steps: 5, completed: 5, lastRun: '2 hours ago', automation: true },
  { id: 6, name: 'HR Review Cycle', status: 'paused', steps: 7, completed: 2, lastRun: '1 day ago', automation: false },
];

const WORKFLOW_TEMPLATES = [
  { id: 'sales', name: 'Sales Pipeline', description: 'Lead to close automation', icon: Zap, color: '#E65100', steps: 6 },
  { id: 'support', name: 'Support Ticket', description: 'Ticket lifecycle management', icon: Activity, color: '#007AFF', steps: 5 },
  { id: 'marketing', name: 'Campaign Launch', description: 'Multi-channel campaign', icon: GitBranch, color: '#F43F5E', steps: 8 },
  { id: 'hr', name: 'Employee Onboarding', description: 'New hire process flow', icon: Layers, color: '#EC4899', steps: 10 },
  { id: 'finance', name: 'Month-End Close', description: 'Financial closing process', icon: CheckCircle2, color: '#10B981', steps: 12 },
  { id: 'custom', name: 'Custom Workflow', description: 'Build from scratch', icon: Plus, color: '#8B5CF6', steps: 0 },
];

const WORKFLOW_STATS = [
  { label: 'Active', value: '12', color: '#10B981' },
  { label: 'Paused', value: '3', color: '#F59E0B' },
  { label: 'Completed', value: '156', color: '#3B82F6' },
  { label: 'Failed', value: '2', color: '#EF4444' },
];

export default function WorkflowsIndexPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [filter, setFilter] = useState('all');

  const filteredWorkflows = filter === 'all' ? WORKFLOWS : WORKFLOWS.filter(w => w.status === filter);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Workflows</Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              Automation and process management
            </Text>
          </View>
          <TouchableOpacity style={[styles.createBtn, { backgroundColor: '#8B5CF6' }]}>
            <Plus size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {WORKFLOW_STATS.map((stat, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setFilter(stat.label.toLowerCase())}
              style={[styles.statCard, { backgroundColor: filter === stat.label.toLowerCase() ? stat.color + '20' : theme.colors.card || '#F2F2F7' }]}
            >
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Active Workflows */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            {filter === 'all' ? 'All Workflows' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Workflows`}
          </Text>
          {filter !== 'all' && (
            <TouchableOpacity onPress={() => setFilter('all')}>
              <Text style={[styles.clearFilter, { color: '#3B82F6' }]}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.workflowList}>
          {filteredWorkflows.map((workflow) => {
            const statusConfig = WORKFLOW_STATUS[workflow.status as keyof typeof WORKFLOW_STATUS];
            const progress = (workflow.completed / workflow.steps) * 100;
            return (
              <TouchableOpacity key={workflow.id} style={[styles.workflowCard, { backgroundColor: theme.colors.background }]}>
                <View style={styles.workflowHeader}>
                  <View style={[styles.statusBadge, { backgroundColor: statusConfig.color + '20' }]}>
                    <statusConfig.icon size={14} color={statusConfig.color} />
                    <Text style={[styles.statusText, { color: statusConfig.color }]}>{statusConfig.label}</Text>
                  </View>
                  {workflow.automation && (
                    <View style={[styles.autoBadge, { backgroundColor: '#8B5CF620' }]}>
                      <Zap size={12} color="#8B5CF6" />
                      <Text style={[styles.autoText, { color: '#8B5CF6' }]}>Auto</Text>
                    </View>
                  )}
                </View>
                <Text style={[styles.workflowName, { color: theme.colors.text }]}>{workflow.name}</Text>
                <View style={styles.progressContainer}>
                  <View style={[styles.progressBar, { backgroundColor: theme.colors.border || '#E5E5EA' }]}>
                    <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: statusConfig.color }]} />
                  </View>
                  <Text style={[styles.progressText, { color: theme.colors.textSecondary }]}>
                    {workflow.completed}/{workflow.steps} steps
                  </Text>
                </View>
                <View style={styles.workflowFooter}>
                  <Clock size={14} color={theme.colors.textSecondary} />
                  <Text style={[styles.lastRun, { color: theme.colors.textSecondary }]}>{workflow.lastRun}</Text>
                  <View style={styles.workflowActions}>
                    {workflow.status === 'active' ? (
                      <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#F59E0B20' }]}>
                        <Pause size={16} color="#F59E0B" />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#10B98120' }]}>
                        <Play size={16} color="#10B981" />
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#3B82F620' }]}>
                      <RotateCcw size={16} color="#3B82F6" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Templates */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Workflow Templates</Text>
        <View style={styles.templateGrid}>
          {WORKFLOW_TEMPLATES.map((template) => (
            <TouchableOpacity key={template.id} style={[styles.templateCard, { backgroundColor: theme.colors.background }]}>
              <View style={[styles.templateIcon, { backgroundColor: template.color + '20' }]}>
                <template.icon size={24} color={template.color} />
              </View>
              <Text style={[styles.templateName, { color: theme.colors.text }]}>{template.name}</Text>
              <Text style={[styles.templateDesc, { color: theme.colors.textSecondary }]}>{template.description}</Text>
              {template.steps > 0 && (
                <Text style={[styles.templateSteps, { color: template.color }]}>{template.steps} steps</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Workflow Analytics */}
      <TouchableOpacity style={[styles.analyticsCard, { backgroundColor: '#3B82F620' }]}>
        <View style={[styles.analyticsIcon, { backgroundColor: '#3B82F6' }]}>
          <Activity size={24} color="#fff" />
        </View>
        <View style={styles.analyticsContent}>
          <Text style={[styles.analyticsTitle, { color: theme.colors.text }]}>Workflow Analytics</Text>
          <Text style={[styles.analyticsDesc, { color: theme.colors.textSecondary }]}>
            View detailed performance metrics
          </Text>
        </View>
        <ChevronRight size={24} color="#3B82F6" />
      </TouchableOpacity>

      <AgentFeatures agentId="workflows-index" agentName="Workflows Dashboard" />
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
  createBtn: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: { flex: 1, alignItems: 'center', padding: 12, borderRadius: 12 },
  statValue: { fontSize: 22, fontWeight: 'bold' },
  statLabel: { fontSize: 11, marginTop: 2 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  clearFilter: { fontSize: 13, fontWeight: '600' },
  workflowList: { gap: 10 },
  workflowCard: { padding: 14, borderRadius: 14 },
  workflowHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, gap: 4 },
  statusText: { fontSize: 11, fontWeight: '600' },
  autoBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, gap: 3 },
  autoText: { fontSize: 10, fontWeight: '600' },
  workflowName: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  progressContainer: { marginBottom: 10 },
  progressBar: { height: 6, borderRadius: 3, marginBottom: 6 },
  progressFill: { height: '100%', borderRadius: 3 },
  progressText: { fontSize: 12 },
  workflowFooter: { flexDirection: 'row', alignItems: 'center' },
  lastRun: { fontSize: 12, marginLeft: 4, flex: 1 },
  workflowActions: { flexDirection: 'row', gap: 6 },
  actionBtn: { width: 32, height: 32, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  templateGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  templateCard: { width: '48%', padding: 14, borderRadius: 12 },
  templateIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  templateName: { fontSize: 14, fontWeight: '600', marginBottom: 2 },
  templateDesc: { fontSize: 11, lineHeight: 16 },
  templateSteps: { fontSize: 11, marginTop: 6, fontWeight: '600' },
  analyticsCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  analyticsIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  analyticsContent: { flex: 1 },
  analyticsTitle: { fontSize: 16, fontWeight: '600' },
  analyticsDesc: { fontSize: 13, marginTop: 2 },
});
