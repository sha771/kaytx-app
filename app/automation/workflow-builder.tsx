 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Workflow, Plus, Play, Pause, Settings, Zap, GitBranch, Clock, ChevronRight } from 'lucide-react-native';

interface WorkflowStep {
  id: string;
  name: string;
  type: 'trigger' | 'action' | 'condition';
  status: 'active' | 'inactive' | 'error';
  description: string;
}

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  steps: number;
  isActive: boolean;
  executions: number;
}

export default function WorkflowBuilder() {
  const [activeTab, setActiveTab] = useState<'builder' | 'templates' | 'history'>('builder');
  const [workflows] = useState<WorkflowTemplate[]>([
    { id: '1', name: 'Lead Qualification', description: 'Automatically qualify and route new leads', category: 'Sales', steps: 5, isActive: true, executions: 234 },
    { id: '2', name: 'Customer Onboarding', description: 'Send welcome emails and setup accounts', category: 'Customer Success', steps: 8, isActive: true, executions: 156 },
    { id: '3', name: 'Invoice Processing', description: 'Process and send invoices automatically', category: 'Finance', steps: 6, isActive: false, executions: 89 },
  ]);
  const [workflowSteps] = useState<WorkflowStep[]>([
    { id: '1', name: 'New Lead Trigger', type: 'trigger', status: 'active', description: 'When a new lead is created' },
    { id: '2', name: 'Check Lead Score', type: 'condition', status: 'active', description: 'If lead score > 70' },
    { id: '3', name: 'Assign to Sales Rep', type: 'action', status: 'active', description: 'Assign to available sales rep' },
    { id: '4', name: 'Send Welcome Email', type: 'action', status: 'active', description: 'Send personalized welcome email' },
  ]);

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'trigger': return <Zap size={16} color="#4ecdc4" />;
      case 'action': return <Play size={16} color="#45b7d1" />;
      case 'condition': return <GitBranch size={16} color="#f39c12" />;
      default: return <Settings size={16} color="#666" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#27ae60';
      case 'inactive': return '#95a5a6';
      case 'error': return '#e74c3c';
      default: return '#666';
    }
  };

  const renderBuilder = () => (
    <View style={styles.tabContent}>
      <View style={styles.builderHeader}>
        <Text style={styles.sectionTitle}>Workflow Builder</Text>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Workflow</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.workflowCanvas}>
        <Text style={styles.canvasTitle}>Current Workflow: Lead Qualification</Text>
        
        {workflowSteps.map((step, index) => (
          <View key={step.id} style={styles.workflowStep}>
            <View style={styles.stepHeader}>
              <View style={styles.stepIcon}>
                {getStepIcon(step.type)}
              </View>
              <View style={styles.stepInfo}>
                <Text style={styles.stepName}>{step.name}</Text>
                <Text style={styles.stepDescription}>{step.description}</Text>
              </View>
              <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(step.status) }]} />
            </View>
            {index < workflowSteps.length - 1 && (
              <View style={styles.stepConnector} />
            )}
          </View>
        ))}

        <TouchableOpacity style={styles.addStepButton}>
          <Plus size={20} color="#4ecdc4" />
          <Text style={styles.addStepText}>Add Step</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stepTypes}>
        <Text style={styles.sectionTitle}>Available Steps</Text>
        <View style={styles.stepTypeGrid}>
          <TouchableOpacity style={styles.stepTypeCard}>
            <Zap size={24} color="#4ecdc4" />
            <Text style={styles.stepTypeText}>Triggers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.stepTypeCard}>
            <Play size={24} color="#45b7d1" />
            <Text style={styles.stepTypeText}>Actions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.stepTypeCard}>
            <GitBranch size={24} color="#f39c12" />
            <Text style={styles.stepTypeText}>Conditions</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderTemplates = () => (
    <View style={styles.tabContent}>
      <View style={styles.templatesHeader}>
        <Text style={styles.sectionTitle}>Workflow Templates</Text>
        <TouchableOpacity style={styles.createButton}>
          <Plus size={16} color="#fff" />
          <Text style={styles.createButtonText}>Create New</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search templates..."
          placeholderTextColor="#666"
        />
      </View>

      {workflows.map((workflow) => (
        <View key={workflow.id} style={styles.templateCard}>
          <View style={styles.templateHeader}>
            <View style={styles.templateInfo}>
              <Text style={styles.templateName}>{workflow.name}</Text>
              <Text style={styles.templateCategory}>{workflow.category}</Text>
            </View>
            <View style={styles.templateActions}>
              <TouchableOpacity style={[
                styles.statusToggle, 
                { backgroundColor: workflow.isActive ? '#27ae60' : '#95a5a6' }
              ]}>
                {workflow.isActive ? <Play size={16} color="#fff" /> : <Pause size={16} color="#fff" />}
              </TouchableOpacity>
            </View>
          </View>
          
          <Text style={styles.templateDescription}>{workflow.description}</Text>
          
          <View style={styles.templateStats}>
            <View style={styles.templateStat}>
              <Text style={styles.statValue}>{workflow.steps}</Text>
              <Text style={styles.statLabel}>Steps</Text>
            </View>
            <View style={styles.templateStat}>
              <Text style={styles.statValue}>{workflow.executions}</Text>
              <Text style={styles.statLabel}>Executions</Text>
            </View>
            <View style={styles.templateStat}>
              <Text style={styles.statValue}>{workflow.isActive ? 'Active' : 'Inactive'}</Text>
              <Text style={styles.statLabel}>Status</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderHistory = () => (
    <View style={styles.tabContent}>
      <View style={styles.historyHeader}>
        <Text style={styles.sectionTitle}>Execution History</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.historyStats}>
        <View style={styles.historyStat}>
          <Text style={styles.historyStatValue}>1,247</Text>
          <Text style={styles.historyStatLabel}>Total Executions</Text>
        </View>
        <View style={styles.historyStat}>
          <Text style={styles.historyStatValue}>98.5%</Text>
          <Text style={styles.historyStatLabel}>Success Rate</Text>
        </View>
        <View style={styles.historyStat}>
          <Text style={styles.historyStatValue}>2.3s</Text>
          <Text style={styles.historyStatLabel}>Avg Duration</Text>
        </View>
      </View>

      <View style={styles.executionList}>
        {[1, 2, 3, 4, 5].map((item) => (
          <View key={item} style={styles.executionItem}>
            <View style={styles.executionInfo}>
              <Text style={styles.executionWorkflow}>Lead Qualification</Text>
              <Text style={styles.executionTime}>2 minutes ago</Text>
            </View>
            <View style={styles.executionStatus}>
              <View style={[styles.statusDot, { backgroundColor: '#27ae60' }]} />
              <Text style={styles.executionStatusText}>Success</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Workflow Builder',
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#fff',
        }} 
      />
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'builder' && styles.activeTab]}
          onPress={() => setActiveTab('builder')}
        >
          <Workflow size={20} color={activeTab === 'builder' ? '#4ecdc4' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'builder' && styles.activeTabText]}>Builder</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'templates' && styles.activeTab]}
          onPress={() => setActiveTab('templates')}
        >
          <Settings size={20} color={activeTab === 'templates' ? '#4ecdc4' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'templates' && styles.activeTabText]}>Templates</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Clock size={20} color={activeTab === 'history' ? '#4ecdc4' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>History</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'builder' && renderBuilder()}
        {activeTab === 'templates' && renderTemplates()}
        {activeTab === 'history' && renderHistory()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#2a2a2a',
  },
  tabText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#4ecdc4',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 16,
  },
  builderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#4ecdc4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  workflowCanvas: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  canvasTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  workflowStep: {
    marginBottom: 16,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    padding: 12,
    borderRadius: 8,
  },
  stepIcon: {
    marginRight: 12,
  },
  stepInfo: {
    flex: 1,
  },
  stepName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  stepDescription: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  stepConnector: {
    width: 2,
    height: 16,
    backgroundColor: '#4ecdc4',
    marginLeft: 20,
    marginVertical: 4,
  },
  addStepButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#4ecdc4',
    borderStyle: 'dashed',
  },
  addStepText: {
    color: '#4ecdc4',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  stepTypes: {
    marginBottom: 24,
  },
  stepTypeGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepTypeCard: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  stepTypeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
  templatesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4ecdc4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  templateCard: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  templateInfo: {
    flex: 1,
  },
  templateName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  templateCategory: {
    color: '#4ecdc4',
    fontSize: 12,
    marginTop: 2,
  },
  templateActions: {
    flexDirection: 'row',
  },
  statusToggle: {
    padding: 8,
    borderRadius: 6,
  },
  templateDescription: {
    color: '#666',
    fontSize: 14,
    marginBottom: 12,
  },
  templateStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  templateStat: {
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statLabel: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterButton: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  historyStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  historyStat: {
    alignItems: 'center',
  },
  historyStatValue: {
    color: '#4ecdc4',
    fontSize: 20,
    fontWeight: '700',
  },
  historyStatLabel: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  executionList: {
    gap: 12,
  },
  executionItem: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  executionInfo: {
    flex: 1,
  },
  executionWorkflow: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  executionTime: {
    color: '#666',
    fontSize: 14,
    marginTop: 2,
  },
  executionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  executionStatusText: {
    color: '#27ae60',
    fontSize: 14,
    fontWeight: '500',
  },
});
