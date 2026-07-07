/**
 * Loop Manager Component
 * 
 * Main UI for creating, managing, and monitoring loops.
 * Provides controls for loop execution, configuration, and monitoring.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, Modal } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { LoopConfig, LoopExecution, LoopStatus, LoopTemplate } from '@/lib/loop-engineering/types';
import { loopExecutionEngine } from '@/lib/loop-engineering/execution-engine';
import { LoopGraphVisualization } from './LoopGraphVisualization';
import {
  Play, Pause, Square, Settings, Plus, Trash2, Copy, Save,
  Clock, CheckCircle, XCircle, AlertCircle, TrendingUp, BarChart3,
  Layers, Network, Zap, Target, FileText, Activity, ChevronRight
} from 'lucide-react-native';

interface LoopManagerProps {
  departmentId?: string;
  availableAgents: Array<{ id: string; name: string; type: string }>;
  templates?: LoopTemplate[];
}

export const LoopManager: React.FC<LoopManagerProps> = ({
  departmentId,
  availableAgents,
  templates = []
}) => {
  const { theme } = useTheme();
  const [loops, setLoops] = useState<LoopConfig[]>([]);
  const [executions, setExecutions] = useState<LoopExecution[]>([]);
  const [selectedLoop, setSelectedLoop] = useState<LoopConfig | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'loops' | 'executions' | 'templates'>('loops');

  useEffect(() => {
    loadLoops();
    loadExecutions();
  }, [departmentId]);

  const loadLoops = () => {
    // In real implementation, load from API/storage
    setLoops([]);
  };

  const loadExecutions = () => {
    // In real implementation, load from API/storage
    setExecutions(loopExecutionEngine.getActiveExecutions());
  };

  const handleStartLoop = async (loop: LoopConfig) => {
    const execution = await loopExecutionEngine.startLoop(loop, {});
    setExecutions(prev => [...prev, execution]);
    setSelectedLoop(loop);
    setActiveTab('executions');
  };

  const handlePauseExecution = (executionId: string) => {
    loopExecutionEngine.pauseExecution(executionId);
    loadExecutions();
  };

  const handleResumeExecution = async (executionId: string) => {
    await loopExecutionEngine.resumeExecution(executionId);
    loadExecutions();
  };

  const handleStopExecution = (executionId: string) => {
    loopExecutionEngine.stopExecution(executionId);
    loadExecutions();
  };

  const handleDeleteLoop = (loopId: string) => {
    setLoops(prev => prev.filter(l => l.id !== loopId));
  };

  const handleDuplicateLoop = (loop: LoopConfig) => {
    const newLoop = {
      ...loop,
      id: `loop_${Date.now()}`,
      name: `${loop.name} (Copy)`,
      metadata: {
        ...loop.metadata,
        createdAt: new Date(),
        createdBy: 'current_user'
      }
    };
    setLoops(prev => [...prev, newLoop]);
  };

  const getStatusIcon = (status: LoopStatus) => {
    switch (status) {
      case 'running': return Activity;
      case 'completed': return CheckCircle;
      case 'failed': return XCircle;
      case 'paused': return Pause;
      default: return Clock;
    }
  };

  const getStatusColor = (status: LoopStatus) => {
    switch (status) {
      case 'running': return theme.colors.warning;
      case 'completed': return theme.colors.success;
      case 'failed': return theme.colors.error;
      case 'paused': return theme.colors.accent;
      default: return theme.colors.textSecondary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Loop Engineering
        </Text>
        <View style={styles.headerActions}>
          <Pressable
            style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => setShowTemplateModal(true)}
          >
            <Plus size={20} color="#fff" />
            <Text style={styles.actionButtonText}>From Template</Text>
          </Pressable>
          <Pressable
            style={[styles.actionButton, { backgroundColor: theme.colors.success }]}
            onPress={() => setShowCreateModal(true)}
          >
            <Plus size={20} color="#fff" />
            <Text style={styles.actionButtonText}>New Loop</Text>
          </Pressable>
        </View>
      </View>

      {/* Tabs */}
      <View style={[styles.tabs, { borderBottomColor: theme.colors.border }]}>
        {['loops', 'executions', 'templates'].map((tab) => (
          <Pressable
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && { borderBottomColor: theme.colors.primary }
            ]}
            onPress={() => setActiveTab(tab as any)}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === tab ? theme.colors.primary : theme.colors.textSecondary }
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {activeTab === 'loops' && (
          <LoopsList
            loops={loops}
            selectedLoop={selectedLoop}
            onSelectLoop={setSelectedLoop}
            onStartLoop={handleStartLoop}
            onDeleteLoop={handleDeleteLoop}
            onDuplicateLoop={handleDuplicateLoop}
            getStatusIcon={getStatusIcon}
            getStatusColor={getStatusColor}
            theme={theme}
          />
        )}

        {activeTab === 'executions' && (
          <ExecutionsList
            executions={executions}
            onPause={handlePauseExecution}
            onResume={handleResumeExecution}
            onStop={handleStopExecution}
            getStatusIcon={getStatusIcon}
            getStatusColor={getStatusColor}
            theme={theme}
          />
        )}

        {activeTab === 'templates' && (
          <TemplatesList
            templates={templates}
            onSelectTemplate={(template) => {
              // Create loop from template
              setShowTemplateModal(false);
            }}
            theme={theme}
          />
        )}
      </ScrollView>

      {/* Loop Detail Panel */}
      {selectedLoop && (
        <LoopDetailPanel
          loop={selectedLoop}
          onClose={() => setSelectedLoop(null)}
          onStartLoop={handleStartLoop}
          availableAgents={availableAgents}
          theme={theme}
        />
      )}

      {/* Create Loop Modal */}
      <Modal
        visible={showCreateModal}
        animationType="slide"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <CreateLoopModal
          onClose={() => setShowCreateModal(false)}
          availableAgents={availableAgents}
          onCreateLoop={(loop) => {
            setLoops(prev => [...prev, loop]);
            setShowCreateModal(false);
          }}
          theme={theme}
        />
      </Modal>
    </View>
  );
};

// Loops List Component
interface LoopsListProps {
  loops: LoopConfig[];
  selectedLoop: LoopConfig | null;
  onSelectLoop: (loop: LoopConfig) => void;
  onStartLoop: (loop: LoopConfig) => void;
  onDeleteLoop: (loopId: string) => void;
  onDuplicateLoop: (loop: LoopConfig) => void;
  getStatusIcon: (status: LoopStatus) => any;
  getStatusColor: (status: LoopStatus) => string;
  theme: any;
}

const LoopsList: React.FC<LoopsListProps> = ({
  loops,
  selectedLoop,
  onSelectLoop,
  onStartLoop,
  onDeleteLoop,
  onDuplicateLoop,
  getStatusIcon,
  getStatusColor,
  theme
}) => {
  if (loops.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Network size={48} color={theme.colors.textSecondary} />
        <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
          No loops created yet
        </Text>
        <Text style={[styles.emptySubtext, { color: theme.colors.textSecondary }]}>
          Create your first loop to automate agent workflows
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      {loops.map((loop) => {
        const StatusIcon = getStatusIcon(loop.status);
        return (
          <Pressable
            key={loop.id}
            style={[
              styles.loopCard,
              {
                backgroundColor: theme.colors.card,
                borderColor: selectedLoop?.id === loop.id ? theme.colors.primary : theme.colors.border,
                borderWidth: selectedLoop?.id === loop.id ? 2 : 1
              }
            ]}
            onPress={() => onSelectLoop(loop)}
          >
            <View style={styles.loopCardHeader}>
              <View style={styles.loopCardTitle}>
                <StatusIcon size={20} color={getStatusColor(loop.status)} />
                <Text style={[styles.loopName, { color: theme.colors.text }]}>
                  {loop.name}
                </Text>
              </View>
              <View style={styles.loopCardActions}>
                <Pressable onPress={() => onStartLoop(loop)}>
                  <Play size={16} color={theme.colors.success} />
                </Pressable>
                <Pressable onPress={() => onDuplicateLoop(loop)}>
                  <Copy size={16} color={theme.colors.textSecondary} />
                </Pressable>
                <Pressable onPress={() => onDeleteLoop(loop.id)}>
                  <Trash2 size={16} color={theme.colors.error} />
                </Pressable>
              </View>
            </View>
            
            <Text style={[styles.loopDescription, { color: theme.colors.textSecondary }]}>
              {loop.description}
            </Text>
            
            <View style={styles.loopMeta}>
              <View style={styles.metaItem}>
                <Layers size={14} color={theme.colors.textSecondary} />
                <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                  {loop.nodes.length} nodes
                </Text>
              </View>
              <View style={styles.metaItem}>
                <Target size={14} color={theme.colors.textSecondary} />
                <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                  {loop.goal.successCriteria.length} criteria
                </Text>
              </View>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

// Executions List Component
interface ExecutionsListProps {
  executions: LoopExecution[];
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  onStop: (id: string) => void;
  getStatusIcon: (status: LoopStatus) => any;
  getStatusColor: (status: LoopStatus) => string;
  theme: any;
}

const ExecutionsList: React.FC<ExecutionsListProps> = ({
  executions,
  onPause,
  onResume,
  onStop,
  getStatusIcon,
  getStatusColor,
  theme
}) => {
  if (executions.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Activity size={48} color={theme.colors.textSecondary} />
        <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
          No active executions
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      {executions.map((execution) => {
        const StatusIcon = getStatusIcon(execution.status);
        return (
          <View
            key={execution.id}
            style={[styles.executionCard, { backgroundColor: theme.colors.card }]}
          >
            <View style={styles.executionHeader}>
              <View style={styles.executionTitle}>
                <StatusIcon size={20} color={getStatusColor(execution.status)} />
                <Text style={[styles.executionId, { color: theme.colors.text }]}>
                  {execution.id}
                </Text>
              </View>
              <View style={styles.executionActions}>
                {execution.status === 'running' && (
                  <Pressable onPress={() => onPause(execution.id)}>
                    <Pause size={16} color={theme.colors.warning} />
                  </Pressable>
                )}
                {execution.status === 'paused' && (
                  <Pressable onPress={() => onResume(execution.id)}>
                    <Play size={16} color={theme.colors.success} />
                  </Pressable>
                )}
                <Pressable onPress={() => onStop(execution.id)}>
                  <Square size={16} color={theme.colors.error} />
                </Pressable>
              </View>
            </View>

            <View style={styles.executionMetrics}>
              <View style={styles.metric}>
                <Clock size={14} color={theme.colors.textSecondary} />
                <Text style={[styles.metricText, { color: theme.colors.textSecondary }]}>
                  {execution.currentIteration} iterations
                </Text>
              </View>
              <View style={styles.metric}>
                <Zap size={14} color={theme.colors.textSecondary} />
                <Text style={[styles.metricText, { color: theme.colors.textSecondary }]}>
                  {execution.metrics.successfulSteps} successful
                </Text>
              </View>
              <View style={styles.metric}>
                <TrendingUp size={14} color={theme.colors.textSecondary} />
                <Text style={[styles.metricText, { color: theme.colors.textSecondary }]}>
                  {Math.round(execution.metrics.totalExecutionTime / 1000)}s
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

// Templates List Component
interface TemplatesListProps {
  templates: LoopTemplate[];
  onSelectTemplate: (template: LoopTemplate) => void;
  theme: any;
}

const TemplatesList: React.FC<TemplatesListProps> = ({ templates, onSelectTemplate, theme }) => {
  if (templates.length === 0) {
    return (
      <View style={styles.emptyState}>
        <FileText size={48} color={theme.colors.textSecondary} />
        <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
          No templates available
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      {templates.map((template) => (
        <Pressable
          key={template.id}
          style={[styles.templateCard, { backgroundColor: theme.colors.card }]}
          onPress={() => onSelectTemplate(template)}
        >
          <Text style={[styles.templateName, { color: theme.colors.text }]}>
            {template.name}
          </Text>
          <Text style={[styles.templateDescription, { color: theme.colors.textSecondary }]}>
            {template.description}
          </Text>
          <View style={styles.templateMeta}>
            <Text style={[styles.templateCategory, { color: theme.colors.primary }]}>
              {template.category}
            </Text>
            <ChevronRight size={16} color={theme.colors.textSecondary} />
          </View>
        </Pressable>
      ))}
    </View>
  );
};

// Loop Detail Panel Component
interface LoopDetailPanelProps {
  loop: LoopConfig;
  onClose: () => void;
  onStartLoop: (loop: LoopConfig) => void;
  availableAgents: Array<{ id: string; name: string; type: string }>;
  theme: any;
}

const LoopDetailPanel: React.FC<LoopDetailPanelProps> = ({
  loop,
  onClose,
  onStartLoop,
  availableAgents,
  theme
}) => {
  return (
    <Modal
      visible={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={[styles.detailPanel, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.detailHeader, { borderBottomColor: theme.colors.border }]}>
          <Pressable onPress={onClose}>
            <ChevronRight size={24} color={theme.colors.text} />
          </Pressable>
          <Text style={[styles.detailTitle, { color: theme.colors.text }]}>
            {loop.name}
          </Text>
          <Pressable onPress={() => onStartLoop(loop)}>
            <Play size={24} color={theme.colors.success} />
          </Pressable>
        </View>

        <ScrollView style={styles.detailContent}>
          <View style={[styles.detailSection, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Description
            </Text>
            <Text style={[styles.sectionText, { color: theme.colors.textSecondary }]}>
              {loop.description}
            </Text>
          </View>

          <View style={[styles.detailSection, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Goal
            </Text>
            <Text style={[styles.sectionText, { color: theme.colors.textSecondary }]}>
              {loop.goal.primary}
            </Text>
          </View>

          <View style={[styles.detailSection, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Workflow
            </Text>
            <Text style={[styles.sectionText, { color: theme.colors.textSecondary }]}>
              Graph visualization would be rendered here
            </Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

// Create Loop Modal Component
interface CreateLoopModalProps {
  onClose: () => void;
  availableAgents: Array<{ id: string; name: string; type: string }>;
  onCreateLoop: (loop: LoopConfig) => void;
  theme: any;
}

const CreateLoopModal: React.FC<CreateLoopModalProps> = ({
  onClose,
  availableAgents,
  onCreateLoop,
  theme
}) => {
  const [loopName, setLoopName] = useState('');
  const [loopDescription, setLoopDescription] = useState('');

  const handleCreate = () => {
    const newLoop: LoopConfig = {
      id: `loop_${Date.now()}`,
      name: loopName,
      description: loopDescription,
      version: '1.0.0',
      status: 'idle',
      goal: {
        primary: 'Default goal',
        successCriteria: [],
        maxIterations: 10
      },
      nodes: [],
      startNodeId: '',
      settings: {
        triggerType: 'manual',
        retryPolicy: {
          maxRetries: 3,
          backoffStrategy: 'exponential',
          initialDelay: 1000
        },
        concurrency: 1,
        priority: 'medium'
      },
      integration: {
        relatedAgents: []
      },
      metadata: {
        createdBy: 'current_user',
        createdAt: new Date(),
        tags: [],
        category: 'custom'
      }
    };

    onCreateLoop(newLoop);
  };

  return (
    <View style={[styles.createModal, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.createHeader, { borderBottomColor: theme.colors.border }]}>
        <Pressable onPress={onClose}>
          <XCircle size={24} color={theme.colors.text} />
        </Pressable>
        <Text style={[styles.createTitle, { color: theme.colors.text }]}>
          Create New Loop
        </Text>
        <Pressable onPress={handleCreate}>
          <Save size={24} color={theme.colors.success} />
        </Pressable>
      </View>

      <ScrollView style={styles.createContent}>
        <View style={styles.formField}>
          <Text style={[styles.fieldLabel, { color: theme.colors.text }]}>
            Loop Name
          </Text>
          <TextInput
            style={[styles.fieldInput, { 
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
              color: theme.colors.text
            }]}
            value={loopName}
            onChangeText={setLoopName}
            placeholder="Enter loop name"
          />
        </View>

        <View style={styles.formField}>
          <Text style={[styles.fieldLabel, { color: theme.colors.text }]}>
            Description
          </Text>
          <TextInput
            style={[styles.fieldInput, styles.textArea, { 
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
              color: theme.colors.text
            }]}
            value={loopDescription}
            onChangeText={setLoopDescription}
            placeholder="Enter loop description"
            multiline
            numberOfLines={4}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
    gap: 12,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  loopCard: {
    borderRadius: 12,
    padding: 16,
  },
  loopCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  loopCardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loopName: {
    fontSize: 16,
    fontWeight: '600',
  },
  loopCardActions: {
    flexDirection: 'row',
    gap: 12,
  },
  loopDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  loopMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
  executionCard: {
    borderRadius: 12,
    padding: 16,
  },
  executionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  executionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  executionId: {
    fontSize: 14,
    fontWeight: '600',
  },
  executionActions: {
    flexDirection: 'row',
    gap: 12,
  },
  executionMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricText: {
    fontSize: 12,
  },
  templateCard: {
    borderRadius: 12,
    padding: 16,
  },
  templateName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  templateDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  templateMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  templateCategory: {
    fontSize: 12,
    fontWeight: '500',
  },
  detailPanel: {
    flex: 1,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  detailContent: {
    flex: 1,
    padding: 16,
  },
  detailSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  createModal: {
    flex: 1,
  },
  createHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  createTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  createContent: {
    flex: 1,
    padding: 16,
  },
  formField: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  fieldInput: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    fontSize: 14,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});