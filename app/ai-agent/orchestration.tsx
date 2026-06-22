import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Users,
  GitBranch,
  Play,
  Pause,
  RotateCcw,
  CircleCheck,
  CircleAlert,
  Clock,
  ArrowRight,
  Layers,
  Zap,
  Workflow,
  Settings,
  Plus,
  Trash2,
  User,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Types
interface AgentOrchestration {
  id: string;
  name: string;
  description: string;
  agents: string[];
  strategy: 'sequential' | 'parallel' | 'hierarchical';
  status: 'active' | 'paused' | 'failed' | 'completed';
  executions: number;
  successRate: number;
  avgDuration: number;
  lastRun: string;
}

interface OrchestrationStep {
  id: string;
  agent: string;
  action: string;
  dependencies: string[];
  status: 'pending' | 'running' | 'completed' | 'failed';
  duration?: number;
}

// Mock Data
const ORCHESTRATIONS: AgentOrchestration[] = [
  {
    id: '1',
    name: 'Customer Onboarding Flow',
    description: 'Multi-agent process for new customer onboarding',
    agents: ['Sales AI', 'HR AI', 'Support AI'],
    strategy: 'sequential',
    status: 'active',
    executions: 145,
    successRate: 94.5,
    avgDuration: 12.5,
    lastRun: '2 min ago',
  },
  {
    id: '2',
    name: 'Marketing Campaign Launch',
    description: 'Parallel execution for campaign deployment',
    agents: ['Marketing AI', 'Sales AI', 'Analytics AI'],
    strategy: 'parallel',
    status: 'active',
    executions: 89,
    successRate: 91.2,
    avgDuration: 8.3,
    lastRun: '15 min ago',
  },
  {
    id: '3',
    name: 'Issue Resolution Pipeline',
    description: 'Hierarchical escalation for complex issues',
    agents: ['Support AI', 'Sales AI', 'Accounting AI'],
    strategy: 'hierarchical',
    status: 'paused',
    executions: 234,
    successRate: 88.7,
    avgDuration: 18.2,
    lastRun: '1 hour ago',
  },
  {
    id: '4',
    name: 'Employee Hiring Workflow',
    description: 'Cross-department hiring process automation',
    agents: ['HR AI', 'Accounting AI', 'Operations AI'],
    strategy: 'sequential',
    status: 'failed',
    executions: 56,
    successRate: 76.8,
    avgDuration: 25.1,
    lastRun: '3 hours ago',
  },
];

const STEPS: OrchestrationStep[] = [
  { id: '1', agent: 'Sales AI', action: 'Qualify lead', dependencies: [], status: 'completed', duration: 2.5 },
  { id: '2', agent: 'HR AI', action: 'Create employee record', dependencies: ['1'], status: 'running', duration: 4.0 },
  { id: '3', agent: 'Support AI', action: 'Send welcome email', dependencies: ['2'], status: 'pending' },
  { id: '4', agent: 'Accounting AI', action: 'Setup billing', dependencies: ['2'], status: 'pending' },
];

const STRATEGY_ICONS = {
  sequential: ArrowRight,
  parallel: Layers,
  hierarchical: GitBranch,


};
const STATUS_COLORS = {
  active: '#10B981',
  paused: '#F59E0B',
  failed: '#EF4444',
  completed: '#3B82F6',
};

export default function MultiAgentOrchestrationScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [activeTab, setActiveTab] = useState<'workflows' | 'active' | 'history'>('workflows');
  const [selectedOrchestration, setSelectedOrchestration] = useState<AgentOrchestration | null>(null);

  const renderOrchestrationCard = (orch: AgentOrchestration, index: number) => {
    const StrategyIcon = STRATEGY_ICONS[orch.strategy];
    const statusColor = STATUS_COLORS[orch.status];
    const isExpanded = selectedOrchestration?.id === orch.id;

    return (
      <Animated.View
        key={orch.id}
        entering={FadeInUp.delay(index * 50)}
        style={[styles.orchestrationCard, { backgroundColor: colors.card }]}
      >
        <TouchableOpacity
          style={styles.orchHeader}
          onPress={() => setSelectedOrchestration(isExpanded ? null : orch)}
        >
          <View style={[styles.strategyBadge, { backgroundColor: colors.tint + '15' }]}>
            <StrategyIcon size={18} color={colors.tint} />
          </View>

          <View style={styles.orchInfo}>
            <Text style={[styles.orchName, { color: colors.text }]}>
              {orch.name}
            </Text>
            <Text style={[styles.orchDesc, { color: colors.icon }]} numberOfLines={1}>
              {orch.description}
            </Text>
            <View style={styles.agentChips}>
              {orch.agents.slice(0, 3).map((agent, i) => (
                <View key={i} style={[styles.agentChip, { backgroundColor: colors.background }]}>
                  <User size={10} color={colors.icon} />
                  <Text style={[styles.agentChipText, { color: colors.icon }]}>
                    {agent.split(' ')[0]}
                  </Text>
                </View>
              ))}
              {orch.agents.length > 3 && (
                <Text style={[styles.moreText, { color: colors.tint }]}>
                  +{orch.agents.length - 3}
                </Text>
              )}
            </View>
          </View>

          <View style={[styles.statusBadge, { backgroundColor: statusColor + '15' }]}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.statusText, { color: statusColor }]}>
              {orch.status}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.orchMetrics}>
          <View style={styles.metric}>
            <Play size={14} color={colors.icon} />
            <Text style={[styles.metricValue, { color: colors.text }]}>
              {orch.executions}
            </Text>
            <Text style={[styles.metricLabel, { color: colors.icon }]}>runs</Text>
          </View>
          <View style={styles.metric}>
            <CircleCheck size={14} color="#10B981" />
            <Text style={[styles.metricValue, { color: colors.text }]}>
              {orch.successRate}%
            </Text>
            <Text style={[styles.metricLabel, { color: colors.icon }]}>success</Text>
          </View>
          <View style={styles.metric}>
            <Clock size={14} color={colors.icon} />
            <Text style={[styles.metricValue, { color: colors.text }]}>
              {orch.avgDuration}s
            </Text>
            <Text style={[styles.metricLabel, { color: colors.icon }]}>avg</Text>
          </View>
        </View>

        {isExpanded && (
          <Animated.View entering={FadeInUp} style={styles.expandedContent}>
            <Text style={[styles.stepsTitle, { color: colors.text }]}>
              Workflow Steps
            </Text>
            {STEPS.map((step, i) => (
              <View key={step.id} style={styles.stepRow}>
                <View style={[styles.stepNumber, { backgroundColor: colors.tint + '15' }]}>
                  <Text style={[styles.stepNumberText, { color: colors.tint }]}>{i + 1}</Text>
                </View>
                <View style={styles.stepInfo}>
                  <Text style={[styles.stepAgent, { color: colors.text }]}>
                    {step.agent}
                  </Text>
                  <Text style={[styles.stepAction, { color: colors.icon }]}>
                    {step.action}
                  </Text>
                </View>
                <View
                  style={[
                    styles.stepStatus,
                    {
                      backgroundColor:
                        step.status === 'completed'
                          ? '#10B981'
                          : step.status === 'running'
                          ? '#3B82F6'
                          : step.status === 'failed'
                          ? '#EF4444'
                          : colors.icon,
                    },
                  ]}
                >
                  <Text style={styles.stepStatusText}>{step.status}</Text>
                </View>
              </View>
            ))}

            <View style={styles.orchActions}>
              {orch.status === 'active' ? (
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#F59E0B' + '15' }]}>
                  <Pause size={16} color="#F59E0B" />
                  <Text style={[styles.actionBtnText, { color: '#F59E0B' }]}>Pause</Text>
                </TouchableOpacity>
              ) : orch.status === 'paused' ? (
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#10B981' + '15' }]}>
                  <Play size={16} color="#10B981" />
                  <Text style={[styles.actionBtnText, { color: '#10B981' }]}>Resume</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.tint + '15' }]}>
                  <RotateCcw size={16} color={colors.tint} />
                  <Text style={[styles.actionBtnText, { color: colors.tint }]}>Restart</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.background }]}>
                <Settings size={16} color={colors.icon} />
                <Text style={[styles.actionBtnText, { color: colors.icon }]}>Configure</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#EF4444' + '15' }]}>
                <Trash2 size={16} color="#EF4444" />
                <Text style={[styles.actionBtnText, { color: '#EF4444' }]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={28} color={colors.text} />
          </TouchableOpacity>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              Multi-Agent Orchestration
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
              Coordinate agent workflows
            </Text>
          </View>
        </View>
        <TouchableOpacity style={[styles.createButton, { backgroundColor: colors.tint }]}>
          <Plus size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Workflow size={20} color="#3B82F6" />
          <Text style={[styles.statValue, { color: colors.text }]}>12</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Workflows</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Zap size={20} color="#10B981" />
          <Text style={[styles.statValue, { color: colors.text }]}>8</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Active</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <CircleCheck size={20} color="#8B5CF6" />
          <Text style={[styles.statValue, { color: colors.text }]}>524</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Completed</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#EF4444' + '10' }]}>
          <CircleAlert size={20} color="#EF4444" />
          <Text style={[styles.statValue, { color: '#EF4444' }]}>3</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Failed</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'workflows' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('workflows')}
        >
          <Workflow size={16} color={activeTab === 'workflows' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'workflows' ? 'white' : colors.text }]}>
            Workflows
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('active')}
        >
          <Zap size={16} color={activeTab === 'active' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'active' ? 'white' : colors.text }]}>
            Running
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('history')}
        >
          <Clock size={16} color={activeTab === 'history' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'history' ? 'white' : colors.text }]}>
            History
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {activeTab === 'workflows' && (
          <>
            {ORCHESTRATIONS.map((orch, index) => renderOrchestrationCard(orch, index))}

            <TouchableOpacity style={[styles.newWorkflow, { backgroundColor: colors.tint + '15' }]}>
              <Users size={24} color={colors.tint} />
              <View style={styles.newWorkflowText}>
                <Text style={[styles.newWorkflowTitle, { color: colors.tint }]}>
                  Create New Orchestration
                </Text>
                <Text style={[styles.newWorkflowDesc, { color: colors.icon }]}>
                  Connect multiple agents in a workflow
                </Text>
              </View>
              <ArrowRight size={20} color={colors.tint} />
            </TouchableOpacity>
          </>
        )}

        {activeTab === 'active' && (
          <View style={[styles.emptyCard, { backgroundColor: colors.card }]}>
            <Zap size={48} color={colors.tint} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No Active Executions
            </Text>
            <Text style={[styles.emptyText, { color: colors.icon }]}>
              Start a workflow to see live execution status
            </Text>
          </View>
        )}

        {activeTab === 'history' && (
          <View style={[styles.historyCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.historyTitle, { color: colors.text }]}>
              Recent Executions
            </Text>
            {[1, 2, 3].map((_, i) => (
              <View key={i} style={styles.historyRow}>
                <View style={styles.historyLeft}>
                  <View
                    style={[
                      styles.historyStatus,
                      { backgroundColor: i === 0 ? '#10B981' : i === 1 ? '#EF4444' : '#F59E0B' },
                    ]}
                  >
                    <Text style={styles.historyStatusText}>
                      {i === 0 ? '✓' : i === 1 ? '✗' : '◐'}
                    </Text>
                  </View>
                  <View>
                    <Text style={[styles.historyName, { color: colors.text }]}>
                      Customer Onboarding Flow
                    </Text>
                    <Text style={[styles.historyTime, { color: colors.icon }]}>
                      {i === 0 ? '2 min ago' : i === 1 ? '15 min ago' : '1 hour ago'}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.historyDuration, { color: colors.icon }]}>
                  {12 + i * 3}s
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  createButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
  },
  orchestrationCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  orchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  strategyBadge: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  orchInfo: {
    flex: 1,
  },
  orchName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  orchDesc: {
    fontSize: 13,
    marginBottom: 8,
  },
  agentChips: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  agentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  agentChipText: {
    fontSize: 11,
    fontWeight: '500',
  },
  moreText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    gap: 5,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  orchMetrics: {
    flexDirection: 'row',
    backgroundColor: '#00000005',
    borderRadius: 10,
    padding: 12,
    gap: 16,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  metricLabel: {
    fontSize: 11,
  },
  expandedContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  stepsTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: 13,
    fontWeight: '600',
  },
  stepInfo: {
    flex: 1,
  },
  stepAgent: {
    fontSize: 14,
    fontWeight: '500',
  },
  stepAction: {
    fontSize: 12,
    marginTop: 2,
  },
  stepStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  stepStatusText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  orchActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
  newWorkflow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    gap: 12,
  },
  newWorkflowText: {
    flex: 1,
  },
  newWorkflowTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  newWorkflowDesc: {
    fontSize: 13,
  },
  emptyCard: {
    alignItems: 'center',
    padding: 48,
    borderRadius: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
  },
  historyCard: {
    borderRadius: 16,
    padding: 16,
  },
  historyTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 16,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  historyStatus: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyStatusText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  historyName: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  historyTime: {
    fontSize: 12,
  },
  historyDuration: {
    fontSize: 14,
    fontWeight: '500',
  },
});
