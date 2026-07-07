/**
 * Hierarchy Loop Integration
 * Integrates agent hierarchy visualization with loop execution
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { AgentHierarchyVisualization } from './AgentHierarchyVisualization';
import { RealTimeGraphVisualization } from './RealTimeGraphVisualization';
import { LoopEngineeringManager } from '@/lib/loop-engineering';
import { AgentHierarchy } from '@/lib/loop-engineering/hierarchical-agents';
import { LoopGoal } from '@/lib/loop-engineering/autonomous-loop';
import {
  GitBranch,
  Network,
  Activity,
  Play,
  Pause,
  Settings,
  Layers,
  Zap,
  ChevronDown,
  ChevronRight,
  Filter,
  Search,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  BarChart3,
} from 'lucide-react-native';

interface AgentNode {
  id: string;
  name: string;
  role: 'orchestrator' | 'manager' | 'worker' | 'specialist';
  level: number;
  status: 'active' | 'idle' | 'busy' | 'offline';
  children: AgentNode[];
  capabilities: string[];
  loopConfig?: {
    active: boolean;
    iterations: number;
    lastExecution?: Date;
    goals: LoopGoal[];
  };
  metrics?: {
    executions: number;
    successRate: number;
    avgDuration: number;
  };
}

interface HierarchyLoopIntegrationProps {
  hierarchy: AgentNode;
  onExecuteLoop?: (nodeId: string) => void;
  onStopLoop?: (nodeId: string) => void;
}

export const HierarchyLoopIntegration: React.FC<HierarchyLoopIntegrationProps> = ({
  hierarchy,
  onExecuteLoop,
  onStopLoop,
}) => {
  const { theme } = useTheme();
  const [viewMode, setViewMode] = useState<'hierarchy' | 'graph' | 'combined'>('combined');
  const [selectedNode, setSelectedNode] = useState<AgentNode | null>(null);
  const [loopManager] = useState(() => new LoopEngineeringManager());
  const [activeLoops, setActiveLoops] = useState<Set<string>>(new Set());
  const [loopHistory, setLoopHistory] = useState<Map<string, any>>(new Map());

  const handleExecuteLoop = async (nodeId: string) => {
    setActiveLoops(prev => new Set([...prev, nodeId]));
    onExecuteLoop?.(nodeId);

    // Simulate loop execution
    const goals: LoopGoal[] = [
      {
        id: 'quality',
        description: 'High quality output',
        type: 'quality',
        targetValue: 0.9,
        threshold: 0.8,
      },
    ];

    try {
      const iterations = await loopManager.executeAutonomousLoop(
        `loop-${nodeId}`,
        nodeId,
        { query: 'Execute task' },
        goals,
        async (input, iteration) => {
          await new Promise(resolve => setTimeout(resolve, 500));
          return {
            data: input,
            analysis: `Iteration ${iteration}`,
            quality: 0.5 + (iteration * 0.1),
          };
        }
      );

      setLoopHistory(prev => new Map([...prev, [nodeId, iterations]]));
    } catch (error) {
      console.error('Loop execution failed:', error);
    } finally {
      setActiveLoops(prev => {
        const next = new Set(prev);
        next.delete(nodeId);
        return next;
      });
    }
  };

  const handleStopLoop = (nodeId: string) => {
    loopManager.stopLoop(`loop-${nodeId}`);
    setActiveLoops(prev => {
      const next = new Set(prev);
      next.delete(nodeId);
      return next;
    });
    onStopLoop?.(nodeId);
  };

  const convertToGraphNodes = (node: AgentNode, position: { x: number; y: number } = { x: 50, y: 50 }) => {
    const graphNodes = [
      {
        id: node.id,
        name: node.name,
        type: node.role === 'orchestrator' ? 'agent' : 'action',
        status: activeLoops.has(node.id) ? 'running' : node.status === 'active' ? 'idle' : 'offline',
        position,
        metrics: node.metrics,
      },
    ];

    let childY = position.y + 120;
    node.children.forEach((child, index) => {
      const childX = position.x + (index - (node.children.length - 1) / 2) * 150;
      graphNodes.push(...convertToGraphNodes(child, { x: childX, y: childY }));
    });

    return graphNodes;
  };

  const convertToGraphEdges = (node: AgentNode) => {
    const edges = [];
    node.children.forEach(child => {
      edges.push({
        id: `${node.id}-${child.id}`,
        fromNodeId: node.id,
        toNodeId: child.id,
        status: activeLoops.has(child.id) ? 'active' : 'idle',
      });
      edges.push(...convertToGraphEdges(child));
    });
    return edges;
  };

  const graphNodes = convertToGraphNodes(hierarchy);
  const graphEdges = convertToGraphEdges(hierarchy);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.cardBackground, borderBottomColor: theme.colors.border }]}>
        <View style={styles.headerLeft}>
          <Layers size={20} color={theme.colors.primary} />
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Hierarchy & Loops</Text>
        </View>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: theme.colors.background }]}>
            <Search size={18} color={theme.colors.secondaryText} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: theme.colors.background }]}>
            <Filter size={18} color={theme.colors.secondaryText} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: theme.colors.background }]}>
            <Settings size={18} color={theme.colors.secondaryText} />
          </TouchableOpacity>
        </View>
      </View>

      {/* View Mode Selector */}
      <View style={[styles.viewModeSelector, { backgroundColor: theme.colors.cardBackground, borderBottomColor: theme.colors.border }]}>
        {[
          { id: 'hierarchy', icon: GitBranch, label: 'Hierarchy' },
          { id: 'graph', icon: Network, label: 'Graph' },
          { id: 'combined', icon: Layers, label: 'Combined' },
        ].map(mode => (
          <TouchableOpacity
            key={mode.id}
            style={[
              styles.viewModeButton,
              viewMode === mode.id && { backgroundColor: theme.colors.primary }
            ]}
            onPress={() => setViewMode(mode.id as any)}
          >
            <mode.icon
              size={16}
              color={viewMode === mode.id ? '#fff' : theme.colors.secondaryText}
            />
            <Text style={[
              styles.viewModeButtonText,
              { color: viewMode === mode.id ? '#fff' : theme.colors.secondaryText }
            ]}>
              {mode.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {viewMode === 'hierarchy' && (
          <AgentHierarchyVisualization
            hierarchy={hierarchy}
            onNodePress={(node) => setSelectedNode(node)}
            onExecuteLoop={handleExecuteLoop}
            onStopLoop={handleStopLoop}
            showMetrics={true}
            showLoopStatus={true}
          />
        )}

        {viewMode === 'graph' && (
          <RealTimeGraphVisualization
            nodes={graphNodes}
            edges={graphEdges}
            onNodePress={(nodeId) => {
              const findNode = (n: AgentNode): AgentNode | null => {
                if (n.id === nodeId) return n;
                for (const child of n.children) {
                  const found = findNode(child);
                  if (found) return found;
                }
                return null;
              };
              setSelectedNode(findNode(hierarchy));
            }}
            isExecuting={activeLoops.size > 0}
            executionProgress={activeLoops.size > 0 ? 50 : 0}
            onToggleExecution={() => {
              if (selectedNode) {
                if (activeLoops.has(selectedNode.id)) {
                  handleStopLoop(selectedNode.id);
                } else {
                  handleExecuteLoop(selectedNode.id);
                }
              }
            }}
          />
        )}

        {viewMode === 'combined' && (
          <View style={styles.combinedView}>
            <View style={styles.combinedHierarchy}>
              <Text style={[styles.combinedSectionTitle, { color: theme.colors.text }]}>
                <GitBranch size={16} color={theme.colors.primary} />
                Agent Hierarchy
              </Text>
              <AgentHierarchyVisualization
                hierarchy={hierarchy}
                onNodePress={(node) => setSelectedNode(node)}
                onExecuteLoop={handleExecuteLoop}
                onStopLoop={handleStopLoop}
                showMetrics={false}
                showLoopStatus={true}
                compact={true}
              />
            </View>

            <View style={styles.combinedGraph}>
              <Text style={[styles.combinedSectionTitle, { color: theme.colors.text }]}>
                <Network size={16} color={theme.colors.primary} />
                Execution Graph
              </Text>
              <RealTimeGraphVisualization
                nodes={graphNodes}
                edges={graphEdges}
                isExecuting={activeLoops.size > 0}
                executionProgress={activeLoops.size > 0 ? 50 : 0}
              />
            </View>
          </View>
        )}
      </ScrollView>

      {/* Selected Node Details */}
      {selectedNode && (
        <View style={[styles.nodeDetails, { backgroundColor: theme.colors.cardBackground, borderTopColor: theme.colors.border }]}>
          <View style={styles.nodeDetailsHeader}>
            <View style={styles.nodeDetailsInfo}>
              <Text style={[styles.nodeDetailsName, { color: theme.colors.text }]}>{selectedNode.name}</Text>
              <Text style={[styles.nodeDetailsRole, { color: theme.colors.secondaryText }]}>
                {selectedNode.role} • Level {selectedNode.level}
              </Text>
            </View>
            <TouchableOpacity onPress={() => setSelectedNode(null)}>
              <ChevronDown size={20} color={theme.colors.secondaryText} />
            </TouchableOpacity>
          </View>

          <View style={styles.nodeDetailsActions}>
            {selectedNode.loopConfig && (
              <>
                {!activeLoops.has(selectedNode.id) ? (
                  <TouchableOpacity
                    style={[styles.actionButton, styles.executeButton, { backgroundColor: '#10B981' }]}
                    onPress={() => handleExecuteLoop(selectedNode.id)}
                  >
                    <Play size={16} color="#fff" />
                    <Text style={[styles.actionButtonText, { color: '#fff' }]}>Execute Loop</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[styles.actionButton, styles.stopButton, { backgroundColor: '#EF4444' }]}
                    onPress={() => handleStopLoop(selectedNode.id)}
                  >
                    <Pause size={16} color="#fff" />
                    <Text style={[styles.actionButtonText, { color: '#fff' }]}>Stop Loop</Text>
                  </TouchableOpacity>
                )}
              </>
            )}

            {selectedNode.metrics && (
              <View style={styles.metricsSummary}>
                <View style={styles.metricSummaryItem}>
                  <Activity size={14} color={theme.colors.secondaryText} />
                  <Text style={[styles.metricSummaryText, { color: theme.colors.text }]}>
                    {selectedNode.metrics.executions}
                  </Text>
                </View>
                <View style={styles.metricSummaryItem}>
                  <CheckCircle size={14} color={theme.colors.secondaryText} />
                  <Text style={[styles.metricSummaryText, { color: theme.colors.text }]}>
                    {(selectedNode.metrics.successRate * 100).toFixed(0)}%
                  </Text>
                </View>
                <View style={styles.metricSummaryItem}>
                  <Clock size={14} color={theme.colors.secondaryText} />
                  <Text style={[styles.metricSummaryText, { color: theme.colors.text }]}>
                    {Math.round(selectedNode.metrics.avgDuration / 1000)}s
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      )}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
  },
  viewModeSelector: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    gap: 8,
  },
  viewModeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewModeButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  combinedView: {
    padding: 16,
    gap: 16,
  },
  combinedHierarchy: {
    minHeight: 300,
  },
  combinedGraph: {
    minHeight: 300,
  },
  combinedSectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  nodeDetails: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  nodeDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  nodeDetailsInfo: {
    flex: 1,
  },
  nodeDetailsName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  nodeDetailsRole: {
    fontSize: 12,
  },
  nodeDetailsActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  executeButton: {
    backgroundColor: '#10B981',
  },
  stopButton: {
    backgroundColor: '#EF4444',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricsSummary: {
    flexDirection: 'row',
    gap: 16,
  },
  metricSummaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricSummaryText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
