import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  GitBranch,
  Plus,
  Minus,
  ArrowRight,
  Play,
  Pause,
  Save,
  Trash2,
  Settings,
  Check,
  X,
  ArrowUp,
  ArrowDown,
  Workflow,
  Zap,
  Timer,
  Bell,
  MessageSquare,
  Database,
  User,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import {
  allAgents,
  agentCategories,
} from '@/constants/aiAgentHierarchy';

interface WorkflowStep {
  id: string;
  agentId: string;
  action: string;
  condition?: string;
  delay?: number;
  notify?: boolean;
  nextSteps: string[];
}

interface AgentWorkflow {
  id: string;
  name: string;
  description: string;
  trigger: string;
  steps: WorkflowStep[];
  enabled: boolean;
  category: string;
}

export default function WorkflowBuilderScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [workflows, setWorkflows] = useState<AgentWorkflow[]>([
    {
      id: 'wf-1',
      name: 'Lead to Customer Conversion',
      description: 'Automatically process leads from capture to close',
      trigger: 'new_lead',
      enabled: true,
      category: 'sales',
      steps: [
        { id: 's1', agentId: 'ai-lead-qualifier', action: 'qualify_lead', nextSteps: ['s2'], notify: true },
        { id: 's2', agentId: 'ai-sales-development', action: 'contact_lead', delay: 300, nextSteps: ['s3'] },
        { id: 's3', agentId: 'ai-appointment-setter', action: 'schedule_demo', condition: 'qualified', nextSteps: ['s4'] },
        { id: 's4', agentId: 'ai-closer', action: 'close_deal', nextSteps: [] },
      ],
    },
    {
      id: 'wf-2',
      name: 'Customer Support Escalation',
      description: 'Route support tickets through proper channels',
      trigger: 'new_ticket',
      enabled: true,
      category: 'customer-experience',
      steps: [
        { id: 's1', agentId: 'ai-ticket-resolution', action: 'analyze_ticket', nextSteps: ['s2', 's3'] },
        { id: 's2', agentId: 'ai-customer-support', action: 'auto_resolve', condition: 'simple', nextSteps: [] },
        { id: 's3', agentId: 'ai-complaint-handling', action: 'escalate', condition: 'complex', nextSteps: ['s4'] },
        { id: 's4', agentId: 'ai-receptionist', action: 'notify_manager', nextSteps: [] },
      ],
    },
    {
      id: 'wf-3',
      name: 'Financial Report Generation',
      description: 'Automated monthly financial reporting',
      trigger: 'scheduled',
      enabled: false,
      category: 'accounting',
      steps: [
        { id: 's1', agentId: 'ai-bookkeeper', action: 'collect_transactions', nextSteps: ['s2'] },
        { id: 's2', agentId: 'ai-financial-analyst', action: 'generate_report', nextSteps: ['s3'] },
        { id: 's3', agentId: 'ai-audit-compliance', action: 'verify_accuracy', nextSteps: ['s4'] },
        { id: 's4', agentId: 'ai-treasury', action: 'distribute_report', notify: true, nextSteps: [] },
      ],
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showBuilder, setShowBuilder] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState<AgentWorkflow | null>(null);
  const [newStepAgent, setNewStepAgent] = useState('');

  const filteredWorkflows = workflows.filter(wf => 
    !selectedCategory || wf.category === selectedCategory
  );

  const getAgentName = (agentId: string) => {
    const agent = allAgents.find(a => a.id === agentId);
    return agent?.name || agentId;
  };

  const getAgentColor = (agentId: string) => {
    const agent = allAgents.find(a => a.id === agentId);
    return agent?.color || colors.primary;
  };

  const WorkflowBuilder = ({ workflow }: { workflow: AgentWorkflow }) => {
    const [localWorkflow, setLocalWorkflow] = useState(workflow);

    const addStep = () => {
      if (!newStepAgent) return;
      const newStep: WorkflowStep = {
        id: `s${Date.now()}`,
        agentId: newStepAgent,
        action: 'custom_action',
        nextSteps: [],
      };
      setLocalWorkflow({
        ...localWorkflow,
        steps: [...localWorkflow.steps, newStep],
      });
      setNewStepAgent('');
    };

    const removeStep = (stepId: string) => {
      setLocalWorkflow({
        ...localWorkflow,
        steps: localWorkflow.steps.filter(s => s.id !== stepId),
      });
    };

    const saveWorkflow = () => {
      setWorkflows(prev => prev.map(w => w.id === localWorkflow.id ? localWorkflow : w));
      setShowBuilder(false);
      setEditingWorkflow(null);
    };

    return (
      <View style={[styles.builderModal, { backgroundColor: colors.card }]}>
        <View style={styles.builderHeader}>
          <TouchableOpacity onPress={() => { setShowBuilder(false); setEditingWorkflow(null); }}>
            <X size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.builderTitle, { color: colors.text }]}>Edit Workflow</Text>
          <TouchableOpacity onPress={saveWorkflow}>
            <Check size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.builderContent}>
          <View style={styles.builderSection}>
            <Text style={[styles.builderLabel, { color: colors.text + '60' }]}>Workflow Name</Text>
            <TextInput
              style={[styles.builderInput, { color: colors.text, backgroundColor: colors.border + '30' }]}
              value={localWorkflow.name}
              onChangeText={(v) => setLocalWorkflow({ ...localWorkflow, name: v })}
            />
          </View>

          <View style={styles.builderSection}>
            <Text style={[styles.builderLabel, { color: colors.text + '60' }]}>Description</Text>
            <TextInput
              style={[styles.builderInput, { color: colors.text, backgroundColor: colors.border + '30', height: 60 }]}
              value={localWorkflow.description}
              onChangeText={(v) => setLocalWorkflow({ ...localWorkflow, description: v })}
              multiline
            />
          </View>

          <View style={styles.builderSection}>
            <Text style={[styles.builderLabel, { color: colors.text + '60' }]}>Trigger</Text>
            <View style={styles.triggerOptions}>
              {['new_lead', 'new_ticket', 'scheduled', 'manual', 'api_call'].map(trigger => (
                <TouchableOpacity
                  key={trigger}
                  style={[styles.triggerChip, localWorkflow.trigger === trigger && { backgroundColor: colors.primary }]}
                  onPress={() => setLocalWorkflow({ ...localWorkflow, trigger })}
                >
                  <Text style={[styles.triggerText, { color: localWorkflow.trigger === trigger ? '#fff' : colors.text }]}>
                    {trigger.replace('_', ' ')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Text style={[styles.stepsTitle, { color: colors.text }]}>Workflow Steps</Text>

          {localWorkflow.steps.map((step, index) => (
            <View key={step.id} style={[styles.stepCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <View style={styles.stepHeader}>
                <View style={[styles.stepNumber, { backgroundColor: getAgentColor(step.agentId) }]}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={[styles.stepAgentName, { color: colors.text }]}>{getAgentName(step.agentId)}</Text>
                <TouchableOpacity onPress={() => removeStep(step.id)}>
                  <Trash2 size={18} color="#EF4444" />
                </TouchableOpacity>
              </View>

              <View style={styles.stepDetails}>
                <View style={styles.stepField}>
                  <Text style={[styles.fieldLabel, { color: colors.text + '60' }]}>Action</Text>
                  <TextInput
                    style={[styles.fieldInput, { color: colors.text, backgroundColor: colors.border + '30' }]}
                    value={step.action}
                    onChangeText={(v) => {
                      const newSteps = [...localWorkflow.steps];
                      newSteps[index] = { ...step, action: v };
                      setLocalWorkflow({ ...localWorkflow, steps: newSteps });
                    }}
                  />
                </View>

                <View style={styles.stepField}>
                  <Text style={[styles.fieldLabel, { color: colors.text + '60' }]}>Condition (optional)</Text>
                  <TextInput
                    style={[styles.fieldInput, { color: colors.text, backgroundColor: colors.border + '30' }]}
                    value={step.condition || ''}
                    onChangeText={(v) => {
                      const newSteps = [...localWorkflow.steps];
                      newSteps[index] = { ...step, condition: v };
                      setLocalWorkflow({ ...localWorkflow, steps: newSteps });
                    }}
                    placeholder="e.g., qualified"
                    placeholderTextColor={colors.text + '40'}
                  />
                </View>

                <View style={styles.stepRow}>
                  <View style={[styles.stepField, { flex: 1 }]}>
                    <Text style={[styles.fieldLabel, { color: colors.text + '60' }]}>Delay (sec)</Text>
                    <TextInput
                      style={[styles.fieldInput, { color: colors.text, backgroundColor: colors.border + '30' }]}
                      value={String(step.delay || 0)}
                      onChangeText={(v) => {
                        const newSteps = [...localWorkflow.steps];
                        newSteps[index] = { ...step, delay: parseInt(v) || 0 };
                        setLocalWorkflow({ ...localWorkflow, steps: newSteps });
                      }}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={[styles.notifyToggle, step.notify && { backgroundColor: colors.primary + '20' }]}>
                    <Bell size={16} color={step.notify ? colors.primary : colors.text + '40'} />
                    <Text style={[styles.notifyText, { color: step.notify ? colors.primary : colors.text + '60' }]}>
                      Notify
                    </Text>
                  </View>
                </View>
              </View>

              {index < localWorkflow.steps.length - 1 && (
                <View style={styles.stepConnector}>
                  <ArrowDown size={20} color={colors.text + '40'} />
                </View>
              )}
            </View>
          ))}

          <View style={styles.addStepSection}>
            <Text style={[styles.builderLabel, { color: colors.text + '60' }]}>Add Agent to Workflow</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.agentSelector}>
              {allAgents.map(agent => (
                <TouchableOpacity
                  key={agent.id}
                  style={[styles.agentOption, newStepAgent === agent.id && { backgroundColor: agent.color + '30', borderColor: agent.color }]}
                  onPress={() => setNewStepAgent(agent.id)}
                >
                  <agent.icon size={20} color={agent.color} />
                  <Text style={[styles.agentOptionText, { color: colors.text }]} numberOfLines={1}>
                    {agent.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity 
              style={[styles.addStepButton, { backgroundColor: colors.primary }]} 
              onPress={addStep}
              disabled={!newStepAgent}
            >
              <Plus size={20} color="#fff" />
              <Text style={styles.addStepText}>Add Step</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Workflow size={22} color={colors.primary} />
            <Text style={[styles.headerTitle, { color: colors.text }]}>Workflow Builder</Text>
          </View>
          <TouchableOpacity onPress={() => {
            const newWorkflow: AgentWorkflow = {
              id: `wf-${Date.now()}`,
              name: 'New Workflow',
              description: '',
              trigger: 'manual',
              category: 'all',
              enabled: false,
              steps: [],
            };
            setWorkflows([...workflows, newWorkflow]);
            setEditingWorkflow(newWorkflow);
            setShowBuilder(true);
          }}>
            <Plus size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Category Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          <TouchableOpacity
            style={[styles.filterChip, !selectedCategory && { backgroundColor: colors.primary }]}
            onPress={() => setSelectedCategory('')}
          >
            <Text style={[styles.filterText, { color: !selectedCategory ? '#fff' : colors.text }]}>All</Text>
          </TouchableOpacity>
          {agentCategories.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.filterChip, selectedCategory === cat.id && { backgroundColor: cat.color }]}
              onPress={() => setSelectedCategory(selectedCategory === cat.id ? '' : cat.id)}
            >
              <Text style={[styles.filterText, { color: selectedCategory === cat.id ? '#fff' : colors.text }]}>
                {cat.label.split(' ')[0]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors.primary + '15' }]}>
            <Workflow size={20} color={colors.primary} />
            <Text style={[styles.statValue, { color: colors.primary }]}>{workflows.length}</Text>
            <Text style={[styles.statLabel, { color: colors.text + '60' }]}>Workflows</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#10B981' + '15' }]}>
            <Play size={20} color="#10B981" />
            <Text style={[styles.statValue, { color: '#10B981' }]}>{workflows.filter(w => w.enabled).length}</Text>
            <Text style={[styles.statLabel, { color: colors.text + '60' }]}>Active</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#8B5CF6' + '15' }]}>
            <User size={20} color="#8B5CF6" />
            <Text style={[styles.statValue, { color: '#8B5CF6' }]}>
              {workflows.reduce((acc, w) => acc + w.steps.length, 0)}
            </Text>
            <Text style={[styles.statLabel, { color: colors.text + '60' }]}>Steps</Text>
          </View>
        </View>

        {/* Workflow List */}
        <Text style={[styles.sectionTitle, { color: colors.text + '60' }]}>WORKFLOWS</Text>
        {filteredWorkflows.map((workflow, index) => (
          <Animated.View entering={FadeInUp.delay(index * 50)} key={workflow.id}>
            <View style={[styles.workflowCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.workflowHeader}>
                <View style={styles.workflowInfo}>
                  <Text style={[styles.workflowName, { color: colors.text }]}>{workflow.name}</Text>
                  <Text style={[styles.workflowDesc, { color: colors.text + '60' }]}>{workflow.description}</Text>
                </View>
                <TouchableOpacity 
                  style={[styles.statusToggle, workflow.enabled && { backgroundColor: '#10B981' }]}
                  onPress={() => {
                    setWorkflows(workflows.map(w => w.id === workflow.id ? { ...w, enabled: !w.enabled } : w));
                  }}
                >
                  <Text style={[styles.statusText, { color: workflow.enabled ? '#fff' : colors.text + '60' }]}>
                    {workflow.enabled ? 'ON' : 'OFF'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.workflowMeta}>
                <View style={styles.metaItem}>
                  <Zap size={14} color={colors.text + '40'} />
                  <Text style={[styles.metaText, { color: colors.text + '60' }]}>{workflow.trigger}</Text>
                </View>
                <View style={styles.metaItem}>
                  <GitBranch size={14} color={colors.text + '40'} />
                  <Text style={[styles.metaText, { color: colors.text + '60' }]}>{workflow.steps.length} steps</Text>
                </View>
              </View>

              {/* Step Preview */}
              <View style={styles.stepPreview}>
                {workflow.steps.slice(0, 3).map((step, idx) => (
                  <React.Fragment key={step.id}>
                    <View style={[styles.miniStep, { backgroundColor: getAgentColor(step.agentId) + '20' }]}>
                      <Text style={[styles.miniStepText, { color: getAgentColor(step.agentId) }]} numberOfLines={1}>
                        {getAgentName(step.agentId).split(' ').slice(0, 2).join(' ')}
                      </Text>
                    </View>
                    {idx < Math.min(workflow.steps.length, 3) - 1 && (
                      <ArrowRight size={14} color={colors.text + '40'} />
                    )}
                  </React.Fragment>
                ))}
                {workflow.steps.length > 3 && (
                  <Text style={[styles.moreSteps, { color: colors.text + '60' }]}>+{workflow.steps.length - 3}</Text>
                )}
              </View>

              <View style={styles.workflowActions}>
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: colors.primary + '15' }]}
                  onPress={() => { setEditingWorkflow(workflow); setShowBuilder(true); }}
                >
                  <Settings size={16} color={colors.primary} />
                  <Text style={[styles.actionText, { color: colors.primary }]}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionButton, workflow.enabled && { backgroundColor: '#10B981' + '15' }]}
                  onPress={() => Alert.alert('Run Workflow', `Execute "${workflow.name}" now?`)}
                >
                  <Play size={16} color={workflow.enabled ? '#10B981' : colors.text + '40'} />
                  <Text style={[styles.actionText, { color: workflow.enabled ? '#10B981' : colors.text + '40' }]}>
                    Run
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: '#EF4444' + '15' }]}
                  onPress={() => {
                    Alert.alert('Delete Workflow', `Delete "${workflow.name}"?`, [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Delete', style: 'destructive', onPress: () => setWorkflows(workflows.filter(w => w.id !== workflow.id)) }
                    ]);
                  }}
                >
                  <Trash2 size={16} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Workflow Builder Modal */}
      {showBuilder && editingWorkflow && <WorkflowBuilder workflow={editingWorkflow} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { borderBottomWidth: 1 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  backButton: { padding: 4 },
  headerTitleContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  filterScroll: { paddingHorizontal: 16, paddingBottom: 12 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, marginRight: 8, backgroundColor: '#00000008' },
  filterText: { fontSize: 13, fontWeight: '500' },
  content: { padding: 16 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  statCard: { flex: 1, padding: 14, borderRadius: 12, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '700', marginTop: 4 },
  statLabel: { fontSize: 11, marginTop: 2 },
  sectionTitle: { fontSize: 12, fontWeight: '700', letterSpacing: 0.5, marginBottom: 12 },
  workflowCard: { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 12 },
  workflowHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 },
  workflowInfo: { flex: 1, marginRight: 12 },
  workflowName: { fontSize: 16, fontWeight: '600' },
  workflowDesc: { fontSize: 13, marginTop: 2 },
  statusToggle: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, backgroundColor: '#00000008' },
  statusText: { fontSize: 11, fontWeight: '700' },
  workflowMeta: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12 },
  stepPreview: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 12 },
  miniStep: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  miniStepText: { fontSize: 11, fontWeight: '500' },
  moreSteps: { fontSize: 11 },
  workflowActions: { flexDirection: 'row', gap: 8 },
  actionButton: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, flex: 1, justifyContent: 'center' },
  actionText: { fontSize: 13, fontWeight: '600' },
  builderModal: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100 },
  builderHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#00000010' },
  builderTitle: { fontSize: 18, fontWeight: '600' },
  builderContent: { flex: 1, padding: 16 },
  builderSection: { marginBottom: 20 },
  builderLabel: { fontSize: 12, fontWeight: '600', marginBottom: 8, textTransform: 'uppercase' },
  builderInput: { padding: 12, borderRadius: 10, fontSize: 15 },
  triggerOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  triggerChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: '#00000008' },
  triggerText: { fontSize: 13, fontWeight: '500', textTransform: 'capitalize' },
  stepsTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  stepCard: { borderRadius: 12, borderWidth: 1, padding: 14, marginBottom: 8 },
  stepHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  stepNumber: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  stepNumberText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  stepAgentName: { flex: 1, fontSize: 15, fontWeight: '600' },
  stepDetails: { marginLeft: 38 },
  stepField: { marginBottom: 10 },
  fieldLabel: { fontSize: 12, marginBottom: 4 },
  fieldInput: { padding: 10, borderRadius: 8, fontSize: 14 },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  notifyToggle: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, backgroundColor: '#00000008' },
  notifyText: { fontSize: 12, fontWeight: '500' },
  stepConnector: { alignItems: 'center', marginVertical: 8 },
  addStepSection: { marginTop: 20, paddingTop: 20, borderTopWidth: 1, borderTopColor: '#00000010' },
  agentSelector: { marginTop: 10, marginBottom: 12 },
  agentOption: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, backgroundColor: '#00000008', marginRight: 8, borderWidth: 1, borderColor: 'transparent' },
  agentOptionText: { fontSize: 13, fontWeight: '500', maxWidth: 120 },
  addStepButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 14, borderRadius: 12 },
  addStepText: { color: '#fff', fontSize: 15, fontWeight: '600' },
});
