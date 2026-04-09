 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Zap, Plus, Edit2, Play, Pause, BarChart3, Clock, CheckCircle } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'draft';
  triggers: number;
  actions: number;
  executions: number;
  successRate: number;
  lastRun: string;
  category: string;
}

export default function WorkflowAutomationScreen() {
  const insets = useSafeAreaInsets();
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'New Lead Welcome Sequence',
      description: 'Send welcome email and assign to sales rep when new lead is created',
      status: 'active',
      triggers: 1,
      actions: 3,
      executions: 1245,
      successRate: 98.5,
      lastRun: '5 minutes ago',
      category: 'Sales',
    },
    {
      id: '2',
      name: 'Deal Stage Notifications',
      description: 'Notify team when deal moves to negotiation stage',
      status: 'active',
      triggers: 2,
      actions: 2,
      executions: 892,
      successRate: 100,
      lastRun: '1 hour ago',
      category: 'CRM',
    },
    {
      id: '3',
      name: 'Customer Onboarding',
      description: 'Automated onboarding tasks and check-ins for new customers',
      status: 'paused',
      triggers: 1,
      actions: 5,
      executions: 543,
      successRate: 95.2,
      lastRun: '2 days ago',
      category: 'Support',
    },
    {
      id: '4',
      name: 'Monthly Report Generation',
      description: 'Generate and email monthly performance reports to stakeholders',
      status: 'active',
      triggers: 1,
      actions: 4,
      executions: 12,
      successRate: 100,
      lastRun: '5 days ago',
      category: 'Analytics',
    },
  ]);

  const toggleWorkflow = (id: string) => {
    setWorkflows(workflows.map(w => 
      w.id === id 
        ? { ...w, status: w.status === 'active' ? 'paused' : 'active' }
        : w
    ));
  };

  const activeCount = workflows.filter(w => w.status === 'active').length;
  const totalExecutions = workflows.reduce((sum, w) => sum + w.executions, 0);
  const avgSuccessRate = (workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length).toFixed(1);

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Workflow Automation',
          headerStyle: { backgroundColor: '#0A0F1E' },
          headerTintColor: '#FFFFFF',
        }}
      />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Workflows</Text>
            <Text style={styles.headerSubtitle}>{activeCount} active workflows</Text>
          </View>
          <TouchableOpacity style={styles.createButton}>
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.createButtonText}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Zap size={18} color="#F59E0B" />
          <Text style={styles.statValue}>{totalExecutions.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Total Runs</Text>
        </View>
        <View style={styles.statCard}>
          <CheckCircle size={18} color="#10B981" />
          <Text style={styles.statValue}>{avgSuccessRate}%</Text>
          <Text style={styles.statLabel}>Success Rate</Text>
        </View>
        <View style={styles.statCard}>
          <BarChart3 size={18} color="#60A5FA" />
          <Text style={styles.statValue}>{workflows.length}</Text>
          <Text style={styles.statLabel}>Workflows</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {workflows.map((workflow) => (
          <View key={workflow.id} style={styles.workflowCard}>
            <View style={styles.workflowHeader}>
              <View style={styles.workflowIcon}>
                <Zap size={20} color={workflow.status === 'active' ? '#10B981' : '#6B7280'} />
              </View>
              <View style={styles.workflowInfo}>
                <Text style={styles.workflowName}>{workflow.name}</Text>
                <Text style={styles.workflowDescription}>{workflow.description}</Text>
              </View>
            </View>

            <View style={styles.workflowMeta}>
              <View style={[
                styles.statusBadge,
                workflow.status === 'active' && styles.statusBadgeActive,
                workflow.status === 'paused' && styles.statusBadgePaused,
                workflow.status === 'draft' && styles.statusBadgeDraft,
              ]}>
                <Text style={[
                  styles.statusText,
                  workflow.status === 'active' && styles.statusTextActive,
                  workflow.status === 'paused' && styles.statusTextPaused,
                  workflow.status === 'draft' && styles.statusTextDraft,
                ]}>
                  {workflow.status.toUpperCase()}
                </Text>
              </View>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{workflow.category}</Text>
              </View>
            </View>

            <View style={styles.workflowStats}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{workflow.triggers}</Text>
                <Text style={styles.statLabel2}>Triggers</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{workflow.actions}</Text>
                <Text style={styles.statLabel2}>Actions</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{workflow.executions}</Text>
                <Text style={styles.statLabel2}>Executions</Text>
              </View>
              <View style={styles.stat}>
                <Text style={[styles.statNumber, { color: '#10B981' }]}>{workflow.successRate}%</Text>
                <Text style={styles.statLabel2}>Success</Text>
              </View>
            </View>

            <View style={styles.workflowFooter}>
              <View style={styles.lastRun}>
                <Clock size={12} color="#9CA3AF" />
                <Text style={styles.lastRunText}>Last run: {workflow.lastRun}</Text>
              </View>
              <View style={styles.workflowActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <BarChart3 size={16} color="#60A5FA" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Edit2 size={16} color="#F59E0B" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => toggleWorkflow(workflow.id)}
                >
                  {workflow.status === 'active' ? (
                    <Pause size={16} color="#EF4444" />
                  ) : (
                    <Play size={16} color="#10B981" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.createCard}>
          <Plus size={32} color="#60A5FA" />
          <Text style={styles.createCardTitle}>Create New Workflow</Text>
          <Text style={styles.createCardDescription}>Automate your business processes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1E',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#60A5FA',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
  },
  createButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statsRow: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1F2937',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  workflowCard: {
    backgroundColor: '#1F2937',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
  },
  workflowHeader: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 12,
  },
  workflowIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  workflowInfo: {
    flex: 1,
  },
  workflowName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  workflowDescription: {
    fontSize: 13,
    color: '#9CA3AF',
    lineHeight: 18,
  },
  workflowMeta: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  statusBadgeActive: {
    backgroundColor: '#1A3A2E',
  },
  statusBadgePaused: {
    backgroundColor: '#3A2E1A',
  },
  statusBadgeDraft: {
    backgroundColor: '#2E2E3A',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusTextActive: {
    color: '#10B981',
  },
  statusTextPaused: {
    color: '#F59E0B',
  },
  statusTextDraft: {
    color: '#9CA3AF',
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#374151',
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#60A5FA',
  },
  workflowStats: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#374151',
    marginBottom: 12,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel2: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  workflowFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastRun: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  lastRunText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  workflowActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createCard: {
    backgroundColor: '#1F2937',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 32,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#374151',
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  createCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 12,
  },
  createCardDescription: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 4,
  },
});
