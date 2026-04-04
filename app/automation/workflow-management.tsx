import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Zap, Play, Pause, Settings, Plus, BarChart3, Clock, CheckCircle, AlertCircle } from 'lucide-react-native';

const workflows = [
  { 
    id: 1, 
    name: 'Lead Nurturing Campaign', 
    status: 'active', 
    triggers: 3, 
    actions: 7, 
    executions: 245,
    successRate: 94,
    lastRun: '2 hours ago'
  },
  { 
    id: 2, 
    name: 'Customer Onboarding', 
    status: 'active', 
    triggers: 2, 
    actions: 5, 
    executions: 89,
    successRate: 98,
    lastRun: '1 hour ago'
  },
  { 
    id: 3, 
    name: 'Invoice Reminder', 
    status: 'paused', 
    triggers: 1, 
    actions: 3, 
    executions: 156,
    successRate: 87,
    lastRun: '1 day ago'
  },
];

const recentExecutions = [
  { id: 1, workflow: 'Lead Nurturing Campaign', status: 'success', time: '5 minutes ago', duration: '2.3s' },
  { id: 2, workflow: 'Customer Onboarding', status: 'success', time: '12 minutes ago', duration: '1.8s' },
  { id: 3, workflow: 'Invoice Reminder', status: 'failed', time: '1 hour ago', duration: '0.5s' },
  { id: 4, workflow: 'Lead Nurturing Campaign', status: 'success', time: '2 hours ago', duration: '2.1s' },
];

const templates = [
  { id: 1, name: 'Email Marketing Sequence', category: 'Marketing', uses: 1234 },
  { id: 2, name: 'Customer Support Ticket', category: 'Support', uses: 856 },
  { id: 3, name: 'Sales Pipeline Management', category: 'Sales', uses: 642 },
  { id: 4, name: 'Social Media Posting', category: 'Marketing', uses: 423 },
];

export default function WorkflowManagementScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'active' | 'paused' | 'draft'>('all');

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || workflow.status === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleWorkflow = (workflowId: number) => {
    console.log('Toggling workflow:', workflowId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'paused': return '#F59E0B';
      case 'draft': return '#6B7280';
      case 'success': return '#10B981';
      case 'failed': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return CheckCircle;
      case 'failed': return AlertCircle;
      default: return Clock;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Workflow Management',
          headerStyle: { backgroundColor: '#7C3AED' },
          headerTintColor: '#FFFFFF',
        }} 
      />
      
      <ScrollView style={styles.content}>
        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workflow Overview</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Active Workflows</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>1,234</Text>
              <Text style={styles.statLabel}>Total Executions</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>94%</Text>
              <Text style={styles.statLabel}>Success Rate</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>2.1s</Text>
              <Text style={styles.statLabel}>Avg Duration</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionButton}>
              <Plus size={24} color="#7C3AED" />
              <Text style={styles.actionText}>Create Workflow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Zap size={24} color="#7C3AED" />
              <Text style={styles.actionText}>Browse Templates</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <BarChart3 size={24} color="#7C3AED" />
              <Text style={styles.actionText}>View Analytics</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Settings size={24} color="#7C3AED" />
              <Text style={styles.actionText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search and Filter */}
        <View style={styles.section}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search workflows..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          
          <View style={styles.filterTabs}>
            {['all', 'active', 'paused', 'draft'].map((category) => (
              <TouchableOpacity
                key={category}
                style={[styles.filterTab, selectedCategory === category && styles.activeFilterTab]}
                onPress={() => setSelectedCategory(category as any)}
              >
                <Text style={[styles.filterTabText, selectedCategory === category && styles.activeFilterTabText]}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Workflows List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Workflows</Text>
          {filteredWorkflows.map((workflow) => (
            <View key={workflow.id} style={styles.workflowCard}>
              <View style={styles.workflowHeader}>
                <View style={styles.workflowInfo}>
                  <Text style={styles.workflowName}>{workflow.name}</Text>
                  <View style={styles.workflowMeta}>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(workflow.status) }]}>
                      <Text style={styles.statusText}>{workflow.status}</Text>
                    </View>
                    <Text style={styles.lastRun}>Last run: {workflow.lastRun}</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  style={styles.toggleButton}
                  onPress={() => toggleWorkflow(workflow.id)}
                >
                  {workflow.status === 'active' ? 
                    <Pause size={20} color="#F59E0B" /> : 
                    <Play size={20} color="#10B981" />
                  }
                </TouchableOpacity>
              </View>
              
              <View style={styles.workflowStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{workflow.triggers}</Text>
                  <Text style={styles.statText}>Triggers</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{workflow.actions}</Text>
                  <Text style={styles.statText}>Actions</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{workflow.executions}</Text>
                  <Text style={styles.statText}>Executions</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{workflow.successRate}%</Text>
                  <Text style={styles.statText}>Success</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Recent Executions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Executions</Text>
          {recentExecutions.map((execution) => {
            const StatusIcon = getStatusIcon(execution.status);
            return (
              <View key={execution.id} style={styles.executionCard}>
                <StatusIcon size={20} color={getStatusColor(execution.status)} />
                <View style={styles.executionInfo}>
                  <Text style={styles.executionWorkflow}>{execution.workflow}</Text>
                  <Text style={styles.executionTime}>{execution.time}</Text>
                </View>
                <View style={styles.executionMeta}>
                  <Text style={[styles.executionStatus, { color: getStatusColor(execution.status) }]}>
                    {execution.status}
                  </Text>
                  <Text style={styles.executionDuration}>{execution.duration}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Workflow Templates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Templates</Text>
          {templates.map((template) => (
            <View key={template.id} style={styles.templateCard}>
              <View style={styles.templateInfo}>
                <Text style={styles.templateName}>{template.name}</Text>
                <Text style={styles.templateCategory}>{template.category}</Text>
              </View>
              <View style={styles.templateMeta}>
                <Text style={styles.templateUses}>{template.uses} uses</Text>
                <TouchableOpacity style={styles.useTemplateButton}>
                  <Text style={styles.useTemplateText}>Use Template</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginTop: 8,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterTabs: {
    flexDirection: 'row',
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  activeFilterTab: {
    backgroundColor: '#7C3AED',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeFilterTabText: {
    color: '#FFFFFF',
  },
  workflowCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
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
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  workflowInfo: {
    flex: 1,
  },
  workflowName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  workflowMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  lastRun: {
    fontSize: 12,
    color: '#6B7280',
  },
  toggleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  workflowStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  executionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  executionInfo: {
    flex: 1,
  },
  executionWorkflow: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  executionTime: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  executionMeta: {
    alignItems: 'flex-end',
  },
  executionStatus: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  executionDuration: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  templateCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    flex: 1,
  },
  templateName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  templateCategory: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  templateMeta: {
    alignItems: 'flex-end',
  },
  templateUses: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  useTemplateButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  useTemplateText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});