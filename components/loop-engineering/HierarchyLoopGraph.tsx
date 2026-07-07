/**
 * Hierarchy Loop Graph Visualization
 * 
 * Advanced graph visualization that integrates loop engineering
 * with the existing agent hierarchy, showing how loops fit within
 * the organizational structure.
 */

import React, { useMemo, useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Modal } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { LoopGraph, LoopNode, LoopConfig } from '@/lib/loop-engineering/types';
import { getAgentHierarchy } from '@/constants/aiAgentHierarchy';
import {
  Bot, ChevronRight, ArrowRight, Layers, Network, 
  Diamond, Zap, Play, Circle, CheckCircle, XCircle,
  Clock, Activity, Target, GitBranch, Merge, Split
} from 'lucide-react-native';

interface HierarchyLoopGraphProps {
  loop: LoopConfig;
  onNodePress?: (nodeId: string) => void;
  onAgentPress?: (agentId: string) => void;
  executionState?: Map<string, 'running' | 'completed' | 'failed' | 'pending'>;
  showHierarchy?: boolean;
  compact?: boolean;
}

export const HierarchyLoopGraph: React.FC<HierarchyLoopGraphProps> = ({
  loop,
  onNodePress,
  onAgentPress,
  executionState,
  showHierarchy = true,
  compact = false
}) => {
  const { theme } = useTheme();
  const [selectedNode, setSelectedNode] = useState<LoopNode | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'workflow' | 'hierarchy' | 'combined'>('combined');

  // Calculate positions for different visualization modes
  const { workflowPositions, hierarchyPositions, combinedPositions } = useMemo(() => {
    return calculateGraphPositions(loop, showHierarchy, compact);
  }, [loop, showHierarchy, compact]);

  const currentPositions = viewMode === 'workflow' ? workflowPositions :
                          viewMode === 'hierarchy' ? hierarchyPositions :
                          combinedPositions;

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'agent': return Bot;
      case 'condition': return Diamond;
      case 'action': return Zap;
      case 'merge': return Merge;
      case 'split': return Split;
      case 'start': return Play;
      case 'end': return Circle;
      default: return Layers;
    }
  };

  const getNodeColor = (nodeId: string, type: string) => {
    const state = executionState?.get(nodeId);
    if (state === 'running') return theme.colors.warning;
    if (state === 'completed') return theme.colors.success;
    if (state === 'failed') return theme.colors.error;
    if (state === 'pending') return theme.colors.textSecondary;
    
    switch (type) {
      case 'agent': return theme.colors.primary;
      case 'condition': return theme.colors.accent;
      case 'action': return theme.colors.warning;
      case 'start': return theme.colors.success;
      case 'end': return theme.colors.error;
      default: return theme.colors.textSecondary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* View Mode Selector */}
      <View style={[styles.viewModeSelector, { borderBottomColor: theme.colors.border }]}>
        {(['workflow', 'hierarchy', 'combined'] as const).map((mode) => (
          <Pressable
            key={mode}
            style={[
              styles.viewModeButton,
              viewMode === mode && { backgroundColor: theme.colors.primary }
            ]}
            onPress={() => setViewMode(mode)}
          >
            <Text
              style={[
                styles.viewModeButtonText,
                { color: viewMode === mode ? '#fff' : theme.colors.textSecondary }
              ]}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Graph Visualization */}
      <ScrollView 
        horizontal 
        vertical 
        style={styles.graphScrollView}
        contentContainerStyle={styles.graphContent}
      >
        <View style={[styles.graphContainer, { 
          width: Math.max(800, loop.nodes.length * (compact ? 120 : 180)),
          height: Math.max(400, Object.keys(currentPositions).length * 100)
        }]}>
          {/* Render Connection Lines */}
          {renderConnectionLines(loop, currentPositions, theme)}

          {/* Render Nodes */}
          {loop.nodes.map((node) => {
            const position = currentPositions[node.id];
            if (!position) return null;

            const Icon = getNodeIcon(node.type);
            const isSelected = selectedNode?.id === node.id;
            const nodeColor = getNodeColor(node.id, node.type);

            return (
              <Pressable
                key={node.id}
                style={[
                  styles.node,
                  {
                    left: position.x,
                    top: position.y,
                    borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                    backgroundColor: theme.colors.card,
                    borderWidth: isSelected ? 2 : 1,
                    width: compact ? 100 : 140,
                    height: compact ? 70 : 100
                  }
                ]}
                onPress={() => {
                  setSelectedNode(node);
                  onNodePress?.(node.id);
                  if (node.agentId) {
                    onAgentPress?.(node.agentId);
                  }
                }}
              >
                <View style={[styles.nodeIcon, { backgroundColor: `${nodeColor}20` }]}>
                  <Icon size={compact ? 16 : 20} color={nodeColor} />
                </View>
                
                {!compact && (
                  <>
                    <Text style={[styles.nodeName, { color: theme.colors.text }]} numberOfLines={1}>
                      {node.name}
                    </Text>
                    <Text style={[styles.nodeType, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                      {node.type}
                    </Text>
                  </>
                )}

                {executionState && (
                  <View style={[styles.statusIndicator, { backgroundColor: nodeColor }]}>
                    {executionState.get(node.id) === 'running' && <Clock size={8} color="#fff" />}
                    {executionState.get(node.id) === 'completed' && <CheckCircle size={8} color="#fff" />}
                    {executionState.get(node.id) === 'failed' && <XCircle size={8} color="#fff" />}
                  </View>
                )}

                {node.agentId && viewMode !== 'workflow' && (
                  <View style={[styles.hierarchyBadge, { backgroundColor: theme.colors.primary }]}>
                    <Layers size={10} color="#fff" />
                  </View>
                )}
              </Pressable>
            );
          })}

          {/* Render Hierarchy Context */}
          {viewMode !== 'workflow' && showHierarchy && (
            <HierarchyContextOverlay
              loop={loop}
              positions={currentPositions}
              theme={theme}
              onAgentPress={onAgentPress}
            />
          )}
        </View>
      </ScrollView>

      {/* Legend */}
      <View style={[styles.legend, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <View style={styles.legendSection}>
          <Text style={[styles.legendTitle, { color: theme.colors.text }]}>Node Types</Text>
          <View style={styles.legendItems}>
            <LegendItem icon={Bot} label="Agent" color={theme.colors.primary} />
            <LegendItem icon={Diamond} label="Condition" color={theme.colors.accent} />
            <LegendItem icon={Zap} label="Action" color={theme.colors.warning} />
            <LegendItem icon={Play} label="Start" color={theme.colors.success} />
            <LegendItem icon={Circle} label="End" color={theme.colors.error} />
          </View>
        </View>
        
        <View style={styles.legendSection}>
          <Text style={[styles.legendTitle, { color: theme.colors.text }]}>Execution Status</Text>
          <View style={styles.legendItems}>
            <LegendItem icon={Activity} label="Running" color={theme.colors.warning} />
            <LegendItem icon={CheckCircle} label="Completed" color={theme.colors.success} />
            <LegendItem icon={XCircle} label="Failed" color={theme.colors.error} />
            <LegendItem icon={Clock} label="Pending" color={theme.colors.textSecondary} />
          </View>
        </View>
      </View>

      {/* Node Detail Modal */}
      {selectedNode && (
        <Modal
          visible={true}
          animationType="slide"
          onRequestClose={() => setSelectedNode(null)}
        >
          <NodeDetailModal
            node={selectedNode}
            loop={loop}
            onClose={() => setSelectedNode(null)}
            theme={theme}
          />
        </Modal>
      )}
    </View>
  );
};

// Hierarchy Context Overlay
interface HierarchyContextOverlayProps {
  loop: LoopConfig;
  positions: Record<string, { x: number; y: number }>;
  theme: any;
  onAgentPress?: (agentId: string) => void;
}

const HierarchyContextOverlay: React.FC<HierarchyContextOverlayProps> = ({
  loop,
  positions,
  theme,
  onAgentPress
}) => {
  const [hierarchyData, setHierarchyData] = useState<any>(null);

  useEffect(() => {
    // Get hierarchy context for agents in the loop
    const hierarchyContext: any = {};
    loop.nodes.forEach(node => {
      if (node.agentId) {
        const hierarchy = getAgentHierarchy(node.agentId);
        hierarchyContext[node.agentId] = hierarchy;
      }
    });
    setHierarchyData(hierarchyContext);
  }, [loop]);

  if (!hierarchyData) return null;

  return (
    <>
      {Object.entries(hierarchyData).map(([agentId, hierarchy]: [string, any]) => {
        const nodePosition = positions[loop.nodes.find(n => n.agentId === agentId)?.id || ''];
        if (!nodePosition) return null;

        return (
          <View
            key={agentId}
            style={[
              styles.hierarchyContext,
              {
                left: nodePosition.x + 150,
                top: nodePosition.y,
                backgroundColor: theme.colors.card,
                borderColor: theme.colors.border
              }
            ]}
          >
            {hierarchy.mainAgent && (
              <View style={styles.hierarchyItem}>
                <Text style={[styles.hierarchyLabel, { color: theme.colors.textSecondary }]}>
                  Main:
                </Text>
                <Text style={[styles.hierarchyValue, { color: theme.colors.primary }]}>
                  {hierarchy.mainAgent.name}
                </Text>
              </View>
            )}
            {hierarchy.subAgents && hierarchy.subAgents.length > 0 && (
              <View style={styles.hierarchyItem}>
                <Text style={[styles.hierarchyLabel, { color: theme.colors.textSecondary }]}>
                  Sub-agents: {hierarchy.subAgents.length}
                </Text>
              </View>
            )}
          </View>
        );
      })}
    </>
  );
};

// Node Detail Modal
interface NodeDetailModalProps {
  node: LoopNode;
  loop: LoopConfig;
  onClose: () => void;
  theme: any;
}

const NodeDetailModal: React.FC<NodeDetailModalProps> = ({ node, loop, onClose, theme }) => {
  const hierarchy = node.agentId ? getAgentHierarchy(node.agentId) : null;

  return (
    <View style={[styles.modal, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.modalHeader, { borderBottomColor: theme.colors.border }]}>
        <Pressable onPress={onClose}>
          <ArrowRight size={24} color={theme.colors.text} />
        </Press>
        <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
          {node.name}
        </Text>
        <View style={styles.modalActions}>
          {node.agentId && (
            <Pressable>
              <Bot size={24} color={theme.colors.primary} />
            </Pressable>
          )}
        </View>
      </View>

      <ScrollView style={styles.modalContent}>
        <View style={[styles.detailSection, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
            Type
          </Text>
          <Text style={[styles.detailValue, { color: theme.colors.text }]}>
            {node.type}
          </Text>
        </View>

        <View style={[styles.detailSection, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
            Description
          </Text>
          <Text style={[styles.detailValue, { color: theme.colors.text }]}>
            {node.description}
          </Text>
        </View>

        {node.agentId && (
          <View style={[styles.detailSection, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
              Agent
            </Text>
            <Text style={[styles.detailValue, { color: theme.colors.primary }]}>
              {node.agentId}
            </Text>
          </View>
        )}

        {node.agentId && hierarchy && (
          <View style={[styles.detailSection, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
              Hierarchy Context
            </Text>
            {hierarchy.mainAgent && (
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                Main: {hierarchy.mainAgent.name}
              </Text>
            )}
            {hierarchy.subAgents && hierarchy.subAgents.length > 0 && (
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                {hierarchy.subAgents.length} sub-agents
              </Text>
            )}
          </View>
        )}

        {node.conditions && node.conditions.length > 0 && (
          <View style={[styles.detailSection, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
              Conditions ({node.conditions.length})
            </Text>
            {node.conditions.map((condition, index) => (
              <View key={condition.id} style={styles.conditionItem}>
                <Text style={[styles.conditionName, { color: theme.colors.text }]}>
                  {condition.name}
                </Text>
                <Text style={[styles.conditionDesc, { color: theme.colors.textSecondary }]}>
                  {condition.description}
                </Text>
              </View>
            ))}
          </View>
        )}

        {node.nextNodes && node.nextNodes.length > 0 && (
          <View style={[styles.detailSection, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
              Next Nodes ({node.nextNodes.length})
            </Text>
            {node.nextNodes.map((nextNodeId, index) => {
              const nextNode = loop.nodes.find(n => n.id === nextNodeId);
              return (
                <Text key={index} style={[styles.detailValue, { color: theme.colors.text }]}>
                  {nextNode?.name || nextNodeId}
                </Text>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

// Legend Item Component
interface LegendItemProps {
  icon: any;
  label: string;
  color: string;
}

const LegendItem: React.FC<LegendItemProps> = ({ icon: Icon, label, color }) => {
  const { theme } = useTheme();
  
  return (
    <View style={styles.legendItem}>
      <Icon size={14} color={color} />
      <Text style={[styles.legendItemText, { color: theme.colors.textSecondary }]}>
        {label}
      </Text>
    </View>
  );
};

// Calculate graph positions for different view modes
function calculateGraphPositions(
  loop: LoopConfig,
  showHierarchy: boolean,
  compact: boolean
): {
  workflowPositions: Record<string, { x: number; y: number }>;
  hierarchyPositions: Record<string, { x: number; y: number }>;
  combinedPositions: Record<string, { x: number; y: number }>;
} {
  const workflowPositions: Record<string, { x: number; y: number }> = {};
  const hierarchyPositions: Record<string, { x: number; y: number }> = {};
  const combinedPositions: Record<string, { x: number; y: number }> = {};

  const nodeWidth = compact ? 100 : 140;
  const nodeHeight = compact ? 70 : 100;
  const horizontalSpacing = compact ? 40 : 80;
  const verticalSpacing = compact ? 30 : 60;

  // Calculate workflow positions (left-to-right flow)
  const levels = new Map<number, string[]>();
  const nodeLevels = new Map<string, number>();

  loop.nodes.forEach(node => {
    const incomingEdges = loop.nodes.filter(n => n.nextNodes?.includes(node.id));
    const level = incomingEdges.length > 0 
      ? Math.max(...incomingEdges.map(e => {
          const sourceLevel = nodeLevels.get(e.id) || 0;
          return sourceLevel + 1;
        }))
      : 0;
    
    nodeLevels.set(node.id, level);
    if (!levels.has(level)) {
      levels.set(level, []);
    }
    levels.get(level)!.push(node.id);
  });

  levels.forEach((nodeIds, level) => {
    const levelWidth = nodeIds.length * (nodeWidth + horizontalSpacing);
    const startX = 50;
    
    nodeIds.forEach((nodeId, index) => {
      workflowPositions[nodeId] = {
        x: startX + index * (nodeWidth + horizontalSpacing),
        y: 50 + level * (nodeHeight + verticalSpacing)
      };
    });
  });

  // Calculate hierarchy positions (grouped by agent hierarchy)
  const agentGroups = new Map<string, string[]>();
  loop.nodes.forEach(node => {
    if (node.agentId) {
      const hierarchy = getAgentHierarchy(node.agentId);
      const groupKey = hierarchy.mainAgent?.id || 'ungrouped';
      if (!agentGroups.has(groupKey)) {
        agentGroups.set(groupKey, []);
      }
      agentGroups.get(groupKey)!.push(node.id);
    } else {
      if (!agentGroups.has('ungrouped')) {
        agentGroups.set('ungrouped', []);
      }
      agentGroups.get('ungrouped')!.push(node.id);
    }
  });

  let groupY = 50;
  agentGroups.forEach((nodeIds, groupKey) => {
    nodeIds.forEach((nodeId, index) => {
      hierarchyPositions[nodeId] = {
        x: 50 + index * (nodeWidth + horizontalSpacing),
        y: groupY
      };
    });
    groupY += nodeHeight + verticalSpacing + 40;
  });

  // Combined positions (workflow with hierarchy context)
  Object.assign(combinedPositions, workflowPositions);

  return { workflowPositions, hierarchyPositions, combinedPositions };
}

// Render connection lines between nodes
function renderConnectionLines(
  loop: LoopConfig,
  positions: Record<string, { x: number; y: number }>,
  theme: any
) {
  const lines: React.ReactNode[] = [];
  const nodeWidth = 140;
  const nodeHeight = 100;

  loop.nodes.forEach(node => {
    if (node.nextNodes) {
      const startPos = positions[node.id];
      if (!startPos) return;

      node.nextNodes.forEach(nextNodeId => {
        const endPos = positions[nextNodeId];
        if (!endPos) return;

        const midX = (startPos.x + endPos.x) / 2;
        const midY = (startPos.y + endPos.y) / 2;

        lines.push(
          <View
            key={`${node.id}-${nextNodeId}`}
            style={[
              styles.connectionLine,
              {
                left: startPos.x + nodeWidth / 2,
                top: startPos.y + nodeHeight,
                width: Math.abs(endPos.x - startPos.x),
                height: Math.abs(endPos.y - startPos.y),
                borderColor: theme.colors.border
              }
            ]}
          />
        );
      });
    }
  });

  return <>{lines}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewModeSelector: {
    flexDirection: 'row',
    padding: 8,
    gap: 8,
    borderBottomWidth: 1,
  },
  viewModeButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewModeButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  graphScrollView: {
    flex: 1,
  },
  graphContent: {
    padding: 20,
  },
  graphContainer: {
    position: 'relative',
  },
  connectionLine: {
    position: 'absolute',
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  node: {
    position: 'absolute',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nodeIcon: {
    borderRadius: 16,
    padding: 6,
    marginBottom: 6,
  },
  nodeName: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2,
  },
  nodeType: {
    fontSize: 9,
    textAlign: 'center',
  },
  statusIndicator: {
    position: 'absolute',
    top: 6,
    right: 6,
    borderRadius: 8,
    padding: 3,
  },
  hierarchyBadge: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    borderRadius: 8,
    padding: 3,
  },
  hierarchyContext: {
    position: 'absolute',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    minWidth: 120,
    zIndex: 10,
  },
  hierarchyItem: {
    marginBottom: 4,
  },
  hierarchyLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  hierarchyValue: {
    fontSize: 11,
    fontWeight: '500',
  },
  legend: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendSection: {
    flex: 1,
  },
  legendTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendItemText: {
    fontSize: 10,
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
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  detailSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    marginBottom: 2,
  },
  conditionItem: {
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  conditionName: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  conditionDesc: {
    fontSize: 11,
  },
});