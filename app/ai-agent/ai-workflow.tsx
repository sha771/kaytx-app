 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Workflow, Play, Pause, Settings, Plus, Search, ListFilter, Clock, CircleCheck, CircleAlert } from 'lucide-react-native';
import { trpc } from '@/lib/trpc';

interface AIWorkflow {
  id: string;
  name: string;
  status: 'running' | 'paused' | 'stopped' | 'error';
  trigger: string;
  actions: number;
  lastRun: string;
  successRate: number;
  executions: number;
}

export default function AIWorkflowScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data: analytics } = trpc.aiAgents.getAgentAnalytics.useQuery({ timeRange: '7d' });
  const { data: activityData } = trpc.aiAgents.getAgentActivity.useQuery({ limit: 200 });

  const activities = activityData?.activities ?? [];

  const getRelativeTime = (isoTimestamp?: string) => {
    if (!isoTimestamp) return '—';
    const ts = new Date(isoTimestamp).getTime();
    const delta = Date.now() - ts;
    if (delta < 60 * 1000) return 'Just now';
    if (delta < 60 * 60 * 1000) return `${Math.floor(delta / (60 * 1000))} min ago`;
    if (delta < 24 * 60 * 60 * 1000) return `${Math.floor(delta / (60 * 60 * 1000))} hour ago`;
    return `${Math.floor(delta / (24 * 60 * 60 * 1000))} day ago`;
  };

  const workflows: AIWorkflow[] = [];

  // Keep the rest of the UI functional even when per-agent workflow analytics aren't available yet.
  // Use activity stream as the source of truth for listing workflows.
  const workflowActions = (analytics?.topActions && analytics.topActions.length > 0)
    ? analytics.topActions.map((a: any) => a.action).filter(Boolean).slice(0, 25)
    : Array.from(
        new Set(
          activities
            .map((ev: any) => ev.action || ev.eventType)
            .filter(Boolean)
        )
      ).slice(0, 25);

  for (const [idx, actionName] of workflowActions.entries()) {
    const last = activities.find((ev: any) => (ev.action || ev.eventType) === actionName);

    const status: AIWorkflow['status'] =
      last?.status === 'error'
        ? 'error'
        : last?.status === 'processing'
          ? 'running'
          : last
            ? 'paused'
            : 'stopped';

    const triggerFromDetails =
      typeof last?.details?.trigger === 'string'
        ? last.details.trigger
        : typeof last?.details?.source === 'string'
          ? last.details.source
          : typeof last?.eventType === 'string'
            ? last.eventType
            : undefined;

    const trigger = triggerFromDetails ?? 'Event-driven';

    const actionsCount =
      typeof last?.details?.steps === 'number'
        ? last.details.steps
        : typeof last?.details?.actions === 'number'
          ? last.details.actions
          : 3;

    workflows.push({
      id: `workflow-${idx}`,
      name: actionName,
      status,
      trigger,
      actions: actionsCount,
      lastRun: getRelativeTime(last?.timestamp),
      successRate: typeof last?.details?.successRate === 'number' ? last.details.successRate : (analytics?.successRate ?? 0),
      executions: typeof last?.details?.executions === 'number' ? last.details.executions : 0,
    });
  }

  const filteredWorkflows = workflows.filter(w =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.trigger.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalWorkflows = workflows.length;
  const runningCount = workflows.filter(w => w.status === 'running').length;
  const totalExecutions = workflows.reduce((sum, w) => sum + (w.executions || 0), 0);
  const weightedSuccess = totalExecutions
    ? workflows.reduce((sum, w) => sum + (w.successRate * (w.executions || 0)), 0) / totalExecutions
    : 0;

  const getStatusColor = (status: AIWorkflow['status']) => {
    switch (status) {
      case 'running': return '#10B981';
      case 'paused': return '#F59E0B';
      case 'stopped': return '#6B7280';
      case 'error': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: AIWorkflow['status']) => {
    switch (status) {
      case 'running': return <Play size={16} color="#10B981" />;
      case 'paused': return <Pause size={16} color="#F59E0B" />;
      case 'stopped': return <CircleCheck size={16} color="#6B7280" />;
      case 'error': return <CircleAlert size={16} color="#EF4444" />;
      default: return <CircleCheck size={16} color="#6B7280" />;
    }
  };

  const getStatusText = (status: AIWorkflow['status']) => {
    switch (status) {
      case 'running': return 'Running';
      case 'paused': return 'Paused';
      case 'stopped': return 'Stopped';
      case 'error': return 'Error';
      default: return 'Unknown';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'AI Workflow',
          headerStyle: { backgroundColor: '#1F2937' },
          headerTintColor: '#FFFFFF',
        }} 
      />
      
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search workflows..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <ListFilter size={20} color="#3B82F6" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.addButton}>
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Create Workflow</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Workflow size={24} color="#3B82F6" />
            <Text style={styles.statNumber}>{totalWorkflows.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Workflows</Text>
          </View>
          
          <View style={styles.statCard}>
            <Play size={22} color="#10B981" />
            <Text style={styles.statNumber}>{runningCount.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Running</Text>
          </View>
          
          <View style={styles.statCard}>
            <CircleCheck size={22} color="#F59E0B" />
            <Text style={styles.statNumber}>{totalExecutions.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Executions</Text>
          </View>
          
          <View style={styles.statCard}>
            <Clock size={24} color="#8B5CF6" />
            <Text style={styles.statNumber}>{weightedSuccess.toFixed(1)}%</Text>
            <Text style={styles.statLabel}>Success Rate</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Workflows</Text>
          
          {filteredWorkflows.map((workflow) => (
            <TouchableOpacity key={workflow.id} style={styles.workflowCard}>
              <View style={styles.workflowHeader}>
                <View style={styles.workflowInfo}>
                  <Text style={styles.workflowName}>{workflow.name}</Text>
                  <View style={styles.statusContainer}>
                    {getStatusIcon(workflow.status)}
                    <Text style={[styles.statusText, { color: getStatusColor(workflow.status) }]}>
                      {getStatusText(workflow.status)}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.successRateContainer}>
                  <Text style={styles.successRate}>{workflow.successRate}%</Text>
                  <Text style={styles.successRateLabel}>Success</Text>
                </View>
              </View>
              
              <View style={styles.workflowDetails}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Trigger:</Text>
                  <Text style={styles.detailValue}>{workflow.trigger}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Actions:</Text>
                  <Text style={styles.detailValue}>{workflow.actions} steps</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Executions:</Text>
                  <Text style={styles.detailValue}>{workflow.executions}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Last run:</Text>
                  <Text style={styles.detailValue}>{workflow.lastRun}</Text>
                </View>
              </View>
              
              <View style={styles.workflowActions}>
                <TouchableOpacity style={styles.actionButton}>
                  {workflow.status === 'running' ? (
                    <Pause size={16} color="#F59E0B" />
                  ) : (
                    <Play size={16} color="#10B981" />
                  )}
                  <Text style={styles.actionText}>
                    {workflow.status === 'running' ? 'Pause' : 'Start'}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Workflow size={16} color="#3B82F6" />
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Settings size={16} color="#6B7280" />
                  <Text style={styles.actionText}>Settings</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Workflow size={24} color="#3B82F6" />
              <Text style={styles.actionCardText}>Create Workflow</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Play size={24} color="#10B981" />
              <Text style={styles.actionCardText}>Start All</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <CircleCheck size={24} color="#F59E0B" />
              <Text style={styles.actionCardText}>View Logs</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Settings size={24} color="#8B5CF6" />
              <Text style={styles.actionCardText}>Global Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.templates}>
          <Text style={styles.sectionTitle}>Workflow Templates</Text>
          
          <View style={styles.templateList}>
            <TouchableOpacity style={styles.templateCard}>
              <Workflow size={20} color="#3B82F6" />
              <View style={styles.templateInfo}>
                <Text style={styles.templateName}>Customer Support</Text>
                <Text style={styles.templateDescription}>Automated ticket routing and responses</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.templateCard}>
              <CircleCheck size={20} color="#10B981" />
              <View style={styles.templateInfo}>
                <Text style={styles.templateName}>Sales Pipeline</Text>
                <Text style={styles.templateDescription}>Lead qualification and follow-up</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.templateCard}>
              <Clock size={20} color="#F59E0B" />
              <View style={styles.templateInfo}>
                <Text style={styles.templateName}>Marketing Automation</Text>
                <Text style={styles.templateDescription}>Email campaigns and nurturing</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1F2937',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#EBF4FF',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  workflowCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workflowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  workflowInfo: {
    flex: 1,
  },
  workflowName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '500',
  },
  successRateContainer: {
    alignItems: 'flex-end',
  },
  successRate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10B981',
  },
  successRateLabel: {
    fontSize: 10,
    color: '#6B7280',
  },
  workflowDetails: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#1F2937',
  },
  workflowActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  actionText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#4B5563',
  },
  quickActions: {
    marginBottom: 24,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionCardText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    textAlign: 'center',
  },
  templates: {
    marginBottom: 24,
  },
  templateList: {
    gap: 8,
  },
  templateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  templateInfo: {
    marginLeft: 12,
    flex: 1,
  },
  templateName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  templateDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
});
