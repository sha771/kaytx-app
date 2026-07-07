/**
 * Agent Loop Integration Component
 * 
 * Integrates loop engineering capabilities directly into agent pages.
 * Shows suggested loops, allows creating agent-specific workflows,
 * and displays agent's role in existing loops.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Modal } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { AIEmployee } from '@/constants/aiEmployees';
import { 
  getSuggestedLoopsForAgent, 
  createBasicLoopConfig,
  getDepartmentAgents 
} from '@/lib/loop-engineering';
import { LoopGraphVisualization } from '@/components/loop-engineering/LoopGraphVisualization';
import {
  Network, Plus, Play, ChevronRight, Zap, Target, Layers,
  Clock, CheckCircle, Activity, ArrowRight, Settings
} from 'lucide-react-native';

interface AgentLoopIntegrationProps {
  agent: AIEmployee;
  theme: any;
}

export const AgentLoopIntegration: React.FC<AgentLoopIntegrationProps> = ({ agent, theme }) => {
  const [suggestedLoops, setSuggestedLoops] = useState<any[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedLoop, setSelectedLoop] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'suggested' | 'create' | 'active'>('suggested');

  useEffect(() => {
    loadSuggestedLoops();
  }, [agent.id]);

  const loadSuggestedLoops = () => {
    const suggestions = getSuggestedLoopsForAgent(agent.id);
    setSuggestedLoops(suggestions);
  };

  const handleCreateFromTemplate = (template: any) => {
    setSelectedLoop(template);
    setShowCreateModal(true);
  };

  const handleStartLoop = async (loopConfig: any) => {
    console.log('Starting loop for agent:', agent.id, loopConfig);
    // In real implementation, execute the loop
    setShowCreateModal(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <View style={styles.headerContent}>
          <Network size={24} color={theme.colors.primary} />
          <View>
            <Text style={[styles.title, { color: theme.colors.text }]}>
              Loop Engineering
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              Automated workflows for {agent.name}
            </Text>
          </View>
        </View>
        <Pressable
          style={[styles.createButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => setShowCreateModal(true)}
        >
          <Plus size={18} color="#fff" />
          <Text style={styles.createButtonText}>Create Loop</Text>
        </Pressable>
      </View>

      {/* Tabs */}
      <View style={[styles.tabs, { borderBottomColor: theme.colors.border }]}>
        {['suggested', 'create', 'active'].map((tab) => (
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
        {activeTab === 'suggested' && (
          <SuggestedLoopsTab
            suggestedLoops={suggestedLoops}
            onSelectLoop={handleCreateFromTemplate}
            theme={theme}
          />
        )}

        {activeTab === 'create' && (
          <CreateLoopTab
            agent={agent}
            onCreateLoop={handleStartLoop}
            theme={theme}
          />
        )}

        {activeTab === 'active' && (
          <ActiveLoopsTab
            agentId={agent.id}
            theme={theme}
          />
        )}
      </ScrollView>

      {/* Create Loop Modal */}
      <Modal
        visible={showCreateModal}
        animationType="slide"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <CreateLoopModal
          agent={agent}
          template={selectedLoop}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleStartLoop}
          theme={theme}
        />
      </Modal>
    </View>
  );
};

// Suggested Loops Tab
interface SuggestedLoopsTabProps {
  suggestedLoops: any[];
  onSelectLoop: (loop: any) => void;
  theme: any;
}

const SuggestedLoopsTab: React.FC<SuggestedLoopsTabProps> = ({ suggestedLoops, onSelectLoop, theme }) => {
  if (suggestedLoops.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Network size={48} color={theme.colors.textSecondary} />
        <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
          No suggested workflows yet
        </Text>
        <Text style={[styles.emptySubtext, { color: theme.colors.textSecondary }]}>
          Create custom loops or wait for system suggestions
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.tabContent}>
      {suggestedLoops.map((loop) => (
        <Pressable
          key={loop.id}
          style={[styles.loopCard, { backgroundColor: theme.colors.card }]}
          onPress={() => onSelectLoop(loop)}
        >
          <View style={styles.loopCardHeader}>
            <View style={styles.loopCardTitle}>
              {loop.category === 'coordination' && <Layers size={20} color={theme.colors.primary} />}
              {loop.category === 'optimization' && <Target size={20} color={theme.colors.accent} />}
              {loop.category === 'automation' && <Zap size={20} color={theme.colors.warning} />}
              <Text style={[styles.loopName, { color: theme.colors.text }]}>
                {loop.name}
              </Text>
            </View>
            <ChevronRight size={20} color={theme.colors.textSecondary} />
          </View>
          
          <Text style={[styles.loopDescription, { color: theme.colors.textSecondary }]}>
            {loop.description}
          </Text>
          
          <View style={styles.loopMeta}>
            <View style={styles.metaItem}>
              <Activity size={14} color={theme.colors.textSecondary} />
              <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                {loop.requiredAgents.length} agents
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Clock size={14} color={theme.colors.textSecondary} />
              <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                {loop.config.settings?.priority || 'medium'} priority
              </Text>
            </View>
          </View>

          {loop.exampleUseCases && loop.exampleUseCases.length > 0 && (
            <View style={styles.useCases}>
              <Text style={[styles.useCasesTitle, { color: theme.colors.textSecondary }]}>
                Use cases:
              </Text>
              {loop.exampleUseCases.slice(0, 2).map((useCase: string, index: number) => (
                <Text key={index} style={[styles.useCaseItem, { color: theme.colors.textSecondary }]}>
                  • {useCase}
                </Text>
              ))}
            </View>
          )}
        </Pressable>
      ))}
    </View>
  );
};

// Create Loop Tab
interface CreateLoopTabProps {
  agent: AIEmployee;
  onCreateLoop: (config: any) => void;
  theme: any;
}

const CreateLoopTab: React.FC<CreateLoopTabProps> = ({ agent, onCreateLoop, theme }) => {
  const [selectedAgents, setSelectedAgents] = useState<any[]>([agent]);
  const [loopName, setLoopName] = useState('');
  const [loopDescription, setLoopDescription] = useState('');

  const departmentAgents = getDepartmentAgents(
    agent.hierarchy?.department?.toLowerCase().replace(' & ', '-') || 'marketing-growth'
  );

  const handleToggleAgent = (toggleAgent: any) => {
    if (selectedAgents.find(a => a.id === toggleAgent.id)) {
      setSelectedAgents(prev => prev.filter(a => a.id !== toggleAgent.id));
    } else {
      setSelectedAgents(prev => [...prev, toggleAgent]);
    }
  };

  const handleCreate = () => {
    const loopConfig = createBasicLoopConfig(
      loopName || `${agent.name} Workflow`,
      loopDescription || `Automated workflow coordinated by ${agent.name}`,
      selectedAgents,
      'Complete workflow successfully'
    );
    onCreateLoop(loopConfig);
  };

  return (
    <View style={styles.tabContent}>
      <View style={[styles.formSection, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Loop Configuration
        </Text>
        
        <View style={styles.formField}>
          <Text style={[styles.fieldLabel, { color: theme.colors.text }]}>
            Loop Name
          </Text>
          <Text style={[styles.fieldInput, { 
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.border,
            color: theme.colors.text
          }]}>
            {loopName || `${agent.name} Workflow`}
          </Text>
        </View>

        <View style={styles.formField}>
          <Text style={[styles.fieldLabel, { color: theme.colors.text }]}>
            Description
          </Text>
          <Text style={[styles.fieldInput, styles.textArea, { 
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.border,
            color: theme.colors.text
          }]}>
            {loopDescription || `Automated workflow coordinated by ${agent.name}`}
          </Text>
        </View>
      </View>

      <View style={[styles.formSection, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Select Agents
        </Text>
        
        <ScrollView style={styles.agentsList}>
          {departmentAgents.main.map((deptAgent) => (
            <Pressable
              key={deptAgent.id}
              style={[
                styles.agentItem,
                {
                  backgroundColor: selectedAgents.find(a => a.id === deptAgent.id)
                    ? `${theme.colors.primary}20`
                    : theme.colors.background,
                  borderColor: selectedAgents.find(a => a.id === deptAgent.id)
                    ? theme.colors.primary
                    : theme.colors.border
                }
              ]}
              onPress={() => handleToggleAgent(deptAgent)}
            >
              <View style={styles.agentItemInfo}>
                <Text style={[styles.agentItemName, { color: theme.colors.text }]}>
                  {deptAgent.name}
                </Text>
                <Text style={[styles.agentItemType, { color: theme.colors.textSecondary }]}>
                  {deptAgent.type}
                </Text>
              </View>
              {selectedAgents.find(a => a.id === deptAgent.id) && (
                <CheckCircle size={20} color={theme.colors.primary} />
              )}
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <Pressable
        style={[styles.createButton, { backgroundColor: theme.colors.primary }]}
        onPress={handleCreate}
      >
        <Play size={20} color="#fff" />
        <Text style={styles.createButtonText}>Create & Start Loop</Text>
      </Pressable>
    </View>
  );
};

// Active Loops Tab
interface ActiveLoopsTabProps {
  agentId: string;
  theme: any;
}

const ActiveLoopsTab: React.FC<ActiveLoopsTabProps> = ({ agentId, theme }) => {
  // In real implementation, fetch active loops for this agent
  const activeLoops: any[] = [];

  if (activeLoops.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Activity size={48} color={theme.colors.textSecondary} />
        <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
          No active loops
        </Text>
        <Text style={[styles.emptySubtext, { color: theme.colors.textSecondary }]}>
          Create a loop to see it here
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.tabContent}>
      {activeLoops.map((loop) => (
        <View key={loop.id} style={[styles.loopCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.loopName, { color: theme.colors.text }]}>
            {loop.name}
          </Text>
          <Text style={[styles.loopDescription, { color: theme.colors.textSecondary }]}>
            {loop.description}
          </Text>
        </View>
      ))}
    </View>
  );
};

// Create Loop Modal
interface CreateLoopModalProps {
  agent: AIEmployee;
  template?: any;
  onClose: () => void;
  onCreate: (config: any) => void;
  theme: any;
}

const CreateLoopModal: React.FC<CreateLoopModalProps> = ({ agent, template, onClose, onCreate, theme }) => {
  const [loopName, setLoopName] = useState(template?.config.name || `${agent.name} Workflow`);
  const [loopDescription, setLoopDescription] = useState(template?.config.description || '');

  const handleCreate = () => {
    const loopConfig = template ? {
      ...template.config,
      name: loopName,
      description: loopDescription
    } : {
      id: `loop_${Date.now()}`,
      name: loopName,
      description: loopDescription,
      version: '1.0.0',
      status: 'idle' as const,
      goal: {
        primary: 'Complete workflow successfully',
        successCriteria: [],
        maxIterations: 10
      },
      nodes: [],
      startNodeId: '',
      settings: {
        triggerType: 'manual' as const,
        retryPolicy: {
          maxRetries: 3,
          backoffStrategy: 'exponential' as const,
          initialDelay: 1000
        },
        concurrency: 1,
        priority: 'medium' as const
      },
      integration: {
        relatedAgents: [agent.id]
      },
      metadata: {
        createdBy: 'user',
        createdAt: new Date(),
        tags: ['custom'],
        category: 'custom'
      }
    };
    onCreate(loopConfig);
  };

  return (
    <View style={[styles.modal, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.modalHeader, { borderBottomColor: theme.colors.border }]}>
        <Pressable onPress={onClose}>
          <ArrowRight size={24} color={theme.colors.text} />
        </Pressable>
        <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
          {template ? 'Customize Template' : 'Create Loop'}
        </Text>
        <Pressable onPress={handleCreate}>
          <CheckCircle size={24} color={theme.colors.success} />
        </Pressable>
      </View>

      <ScrollView style={styles.modalContent}>
        <View style={styles.formField}>
          <Text style={[styles.fieldLabel, { color: theme.colors.text }]}>
            Loop Name
          </Text>
          <Text style={[styles.fieldInput, { 
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
            color: theme.colors.text
          }]}>
            {loopName}
          </Text>
        </View>

        <View style={styles.formField}>
          <Text style={[styles.fieldLabel, { color: theme.colors.text }]}>
            Description
          </Text>
          <Text style={[styles.fieldInput, styles.textArea, { 
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
            color: theme.colors.text
          }]}>
            {loopDescription}
          </Text>
        </View>

        {template && (
          <View style={[styles.templatePreview, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.previewTitle, { color: theme.colors.text }]}>
              Template Preview
            </Text>
            <Text style={[styles.previewText, { color: theme.colors.textSecondary }]}>
              Based on: {template.name}
            </Text>
            <Text style={[styles.previewText, { color: theme.colors.textSecondary }]}>
              Category: {template.category}
            </Text>
            <Text style={[styles.previewText, { color: theme.colors.textSecondary }]}>
              Required Agents: {template.requiredAgents.length}
            </Text>
          </View>
        )}
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
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createButtonText: {
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
    fontSize: 13,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 16,
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
    marginBottom: 12,
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
    fontSize: 15,
    fontWeight: '600',
  },
  loopDescription: {
    fontSize: 13,
    marginBottom: 12,
    lineHeight: 18,
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
    fontSize: 11,
  },
  useCases: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  useCasesTitle: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 6,
  },
  useCaseItem: {
    fontSize: 11,
    marginBottom: 2,
  },
  formSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  formField: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6,
  },
  fieldInput: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    fontSize: 14,
  },
  textArea: {
    height: 80,
    paddingTop: 12,
  },
  agentsList: {
    maxHeight: 300,
  },
  agentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  agentItemInfo: {
    flex: 1,
  },
  agentItemName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  agentItemType: {
    fontSize: 11,
  },
  modal: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  templatePreview: {
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  previewText: {
    fontSize: 13,
    marginBottom: 4,
  },
});