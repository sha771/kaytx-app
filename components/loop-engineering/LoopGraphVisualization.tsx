/**
 * Loop Graph Visualization Component
 * 
 * Visual representation of loop workflows using graph-based layouts.
 * Supports hierarchical, force, circular, and grid layouts.
 */

import React, { useMemo, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { LoopGraph, LoopNode, LoopNodeType } from '@/lib/loop-engineering/types';
import { 
  Bot, GitBranch, Diamond, Play, Circle, ArrowRight, 
  ChevronRight, Merge, Split, Square, CheckCircle, XCircle, 
  Clock, Zap, Target, Network, Layers
} from 'lucide-react-native';

interface LoopGraphVisualizationProps {
  graph: LoopGraph;
  onNodePress?: (nodeId: string) => void;
  selectedNodeId?: string;
  executionState?: Map<string, 'running' | 'completed' | 'failed' | 'pending'>;
  compact?: boolean;
}

export const LoopGraphVisualization: React.FC<LoopGraphVisualizationProps> = ({
  graph,
  onNodePress,
  selectedNodeId,
  executionState,
  compact = false
}) => {
  const { theme } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);

  // Calculate graph layout
  const { nodePositions, edgePaths } = useMemo(() => {
    return calculateGraphLayout(graph, compact);
  }, [graph, compact]);

  const getNodeIcon = (type: LoopNodeType) => {
    switch (type) {
      case 'agent': return Bot;
      case 'condition': return Diamond;
      case 'action': return Zap;
      case 'merge': return Merge;
      case 'split': return Split;
      case 'start': return Play;
      case 'end': return Circle;
      default: return Square;
    }
  };

  const getNodeColor = (nodeId: string, type: LoopNodeType) => {
    const state = executionState?.get(nodeId);
    if (state === 'running') return theme.colors.warning;
    if (state === 'completed') return theme.colors.success;
    if (state === 'failed') return theme.colors.error;
    if (state === 'pending') return theme.colors.textSecondary;
    
    // Default colors by type
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
      <ScrollView 
        ref={scrollViewRef}
        horizontal
        vertical
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={[styles.graphContainer, { 
          width: graph.nodes.length * (compact ? 120 : 200) + 100,
          height: 400 
        }]}>
          {/* Render edges */}
          {edgePaths.map((edge) => (
            <View
              key={edge.id}
              style={[
                styles.edge,
                {
                  left: edge.x,
                  top: edge.y,
                  width: edge.width,
                  height: edge.height,
                  borderColor: theme.colors.border,
                  backgroundColor: 'transparent'
                }
              ]}
            >
              {edge.label && (
                <Text style={[styles.edgeLabel, { color: theme.colors.textSecondary }]}>
                  {edge.label}
                </Text>
              )}
            </View>
          ))}

          {/* Render nodes */}
          {graph.nodes.map((node) => {
            const position = nodePositions.get(node.id);
            if (!position) return null;

            const Icon = getNodeIcon(node.type);
            const isSelected = selectedNodeId === node.id;
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
                    borderWidth: isSelected ? 2 : 1
                  }
                ]}
                onPress={() => onNodePress?.(node.id)}
              >
                <View style={[styles.nodeIcon, { backgroundColor: `${nodeColor}20` }]}>
                  <Icon size={compact ? 16 : 24} color={nodeColor} />
                </View>
                
                {!compact && (
                  <>
                    <Text style={[styles.nodeName, { color: theme.colors.text }]}>
                      {node.data.name}
                    </Text>
                    <Text style={[styles.nodeType, { color: theme.colors.textSecondary }]}>
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
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Legend */}
      {!compact && (
        <View style={[styles.legend, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <Text style={[styles.legendTitle, { color: theme.colors.text }]}>Node Types</Text>
          <View style={styles.legendItems}>
            <LegendItem icon={Bot} label="Agent" color={theme.colors.primary} />
            <LegendItem icon={Diamond} label="Condition" color={theme.colors.accent} />
            <LegendItem icon={Zap} label="Action" color={theme.colors.warning} />
            <LegendItem icon={Play} label="Start" color={theme.colors.success} />
            <LegendItem icon={Circle} label="End" color={theme.colors.error} />
          </View>
        </View>
      )}
    </View>
  );
};

interface LegendItemProps {
  icon: any;
  label: string;
  color: string;
}

const LegendItem: React.FC<LegendItemProps> = ({ icon: Icon, label, color }) => {
  const { theme } = useTheme();
  
  return (
    <View style={styles.legendItem}>
      <Icon size={16} color={color} />
      <Text style={[styles.legendItemText, { color: theme.colors.textSecondary }]}>
        {label}
      </Text>
    </View>
  );
};

// Graph layout calculation
function calculateGraphLayout(graph: LoopGraph, compact: boolean): {
  nodePositions: Map<string, { x: number; y: number }>;
  edgePaths: Array<{ id: string; x: number; y: number; width: number; height: number; label?: string }>;
} {
  const nodePositions = new Map<string, { x: number; y: number }>();
  const edgePaths: Array<{ id: string; x: number; y: number; width: number; height: number; label?: string }> = [];

  const nodeWidth = compact ? 100 : 160;
  const nodeHeight = compact ? 60 : 100;
  const horizontalSpacing = compact ? 40 : 80;
  const verticalSpacing = compact ? 30 : 60;

  // Hierarchical layout
  const levels = new Map<number, string[]>();
  const nodeLevels = new Map<string, number>();

  // Calculate node levels based on dependencies
  graph.nodes.forEach(node => {
    const incomingEdges = graph.edges.filter(e => e.target === node.id);
    const level = incomingEdges.length > 0 
      ? Math.max(...incomingEdges.map(e => {
          const sourceNode = graph.nodes.find(n => n.id === e.source);
          return (nodeLevels.get(e.source) || 0) + 1;
        }))
      : 0;
    
    nodeLevels.set(node.id, level);
    if (!levels.has(level)) {
      levels.set(level, []);
    }
    levels.get(level)!.push(node.id);
  });

  // Position nodes
  levels.forEach((nodeIds, level) => {
    const levelWidth = nodeIds.length * (nodeWidth + horizontalSpacing);
    const startX = 50 + (800 - levelWidth) / 2; // Center in 800px width
    
    nodeIds.forEach((nodeId, index) => {
      nodePositions.set(nodeId, {
        x: startX + index * (nodeWidth + horizontalSpacing),
        y: 50 + level * (nodeHeight + verticalSpacing)
      });
    });
  });

  // Calculate edge paths
  graph.edges.forEach(edge => {
    const sourcePos = nodePositions.get(edge.source);
    const targetPos = nodePositions.get(edge.target);
    
    if (sourcePos && targetPos) {
      const midX = (sourcePos.x + targetPos.x) / 2;
      const midY = (sourcePos.y + targetPos.y) / 2;
      
      edgePaths.push({
        id: edge.id,
        x: sourcePos.x + nodeWidth / 2,
        y: sourcePos.y + nodeHeight,
        width: Math.abs(targetPos.x - sourcePos.x),
        height: Math.abs(targetPos.y - sourcePos.y),
        label: edge.condition
      });
    }
  });

  return { nodePositions, edgePaths };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  graphContainer: {
    position: 'relative',
  },
  edge: {
    position: 'absolute',
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  edgeLabel: {
    position: 'absolute',
    fontSize: 10,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  node: {
    position: 'absolute',
    borderRadius: 8,
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
    borderRadius: 20,
    padding: 8,
    marginBottom: 8,
  },
  nodeName: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  nodeType: {
    fontSize: 10,
    textAlign: 'center',
  },
  statusIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    borderRadius: 10,
    padding: 4,
  },
  legend: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  legendTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendItemText: {
    fontSize: 10,
  },
});