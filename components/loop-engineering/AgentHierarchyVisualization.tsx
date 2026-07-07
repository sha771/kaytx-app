/**
 * Comprehensive Agent Hierarchy Visualization
 * Interactive tree visualization for agent hierarchies with loop engineering integration
 */

import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import {
  ChevronDown,
  ChevronRight,
  Users,
  Bot,
  Zap,
  Layers,
  Network,
  Activity,
  Settings,
  MoreVertical,
  Play,
  Pause,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  SortAsc,
  GitBranch,
  Circle,
  CheckCircle,
  XCircle,
  Clock,
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
  };
  metrics?: {
    executions: number;
    successRate: number;
    avgDuration: number;
  };
}

interface AgentHierarchyVisualizationProps {
  hierarchy: AgentNode;
  onNodePress?: (node: AgentNode) => void;
  onNodeLongPress?: (node: AgentNode) => void;
  onExecuteLoop?: (nodeId: string) => void;
  onStopLoop?: (nodeId: string) => void;
  onEditNode?: (node: AgentNode) => void;
  onDeleteNode?: (nodeId: string) => void;
  onAddChild?: (parentId: string) => void;
  showMetrics?: boolean;
  showLoopStatus?: boolean;
  compact?: boolean;
}

export const AgentHierarchyVisualization: React.FC<AgentHierarchyVisualizationProps> = ({
  hierarchy,
  onNodePress,
  onNodeLongPress,
  onExecuteLoop,
  onStopLoop,
  onEditNode,
  onDeleteNode,
  onAddChild,
  showMetrics = true,
  showLoopStatus = true,
  compact = false,
}) => {
  const { theme } = useTheme();
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set([hierarchy.id]));
  const [selectedNode, setSelectedNode] = useState<AgentNode | null>(null);
  const [viewMode, setViewMode] = useState<'tree' | 'org-chart' | 'mind-map'>('tree');

  const toggleExpand = (nodeId: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  const getNodeIcon = (role: AgentNode['role'], status: AgentNode['status']) => {
    switch (role) {
      case 'orchestrator':
        return Network;
      case 'manager':
        return Layers;
      case 'worker':
        return Bot;
      case 'specialist':
        return Zap;
      default:
        return Circle;
    }
  };

  const getNodeColor = (role: AgentNode['role'], status: AgentNode['status']) => {
    if (status === 'offline') return theme.colors.textSecondary;
    if (status === 'busy') return '#F59E0B';
    if (status === 'idle') return '#10B981';
    
    switch (role) {
      case 'orchestrator':
        return '#8B5CF6';
      case 'manager':
        return '#3B82F6';
      case 'worker':
        return '#10B981';
      case 'specialist':
        return '#F59E0B';
      default:
        return theme.colors.primary;
    }
  };

  const renderTreeNode = (node: AgentNode, depth: number = 0): React.ReactNode => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children.length > 0;
    const Icon = getNodeIcon(node.role, node.status);
    const nodeColor = getNodeColor(node.role, node.status);

    return (
      <View key={node.id} style={{ marginLeft: depth * 20 }}>
        <TouchableOpacity
          style={[
            styles.nodeContainer,
            { 
              backgroundColor: theme.colors.cardBackground,
              borderColor: selectedNode?.id === node.id ? theme.colors.primary : theme.colors.border,
            }
          ]}
          onPress={() => {
            setSelectedNode(node);
            onNodePress?.(node);
          }}
          onLongPress={() => {
            setSelectedNode(node);
            onNodeLongPress?.(node);
          }}
        >
          {/* Expand/Collapse Button */}
          {hasChildren && (
            <TouchableOpacity
              style={styles.expandButton}
              onPress={() => toggleExpand(node.id)}
            >
              {isExpanded ? (
                <ChevronDown size={16} color={theme.colors.secondaryText} />
              ) : (
                <ChevronRight size={16} color={theme.colors.secondaryText} />
              )}
            </TouchableOpacity>
          )}

          {/* Node Icon */}
          <View style={[styles.nodeIcon, { backgroundColor: `${nodeColor}20` }]}>
            <Icon size={compact ? 16 : 20} color={nodeColor} />
          </View>

          {/* Node Info */}
          <View style={styles.nodeInfo}>
            <Text style={[styles.nodeName, { color: theme.colors.text }]} numberOfLines={1}>
              {node.name}
            </Text>
            <View style={styles.nodeMeta}>
              <Text style={[styles.nodeRole, { color: theme.colors.secondaryText }]}>
                {node.role}
              </Text>
              <View style={[styles.statusDot, { backgroundColor: nodeColor }]} />
            </View>
          </View>

          {/* Loop Status */}
          {showLoopStatus && node.loopConfig && (
            <View style={styles.loopStatus}>
              {node.loopConfig.active ? (
                <Activity size={14} color="#10B981" />
              ) : (
                <Circle size={14} color={theme.colors.secondaryText} />
              )}
              {node.loopConfig.iterations > 0 && (
                <Text style={[styles.iterationCount, { color: theme.colors.secondaryText }]}>
                  {node.loopConfig.iterations}
                </Text>
              )}
            </View>
          )}

          {/* Actions */}
          <TouchableOpacity style={styles.moreButton}>
            <MoreVertical size={16} color={theme.colors.secondaryText} />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Metrics */}
        {showMetrics && node.metrics && !compact && (
          <View style={[styles.metricsContainer, { backgroundColor: theme.colors.background }]}>
            <View style={styles.metricItem}>
              <Activity size={12} color={theme.colors.secondaryText} />
              <Text style={[styles.metricText, { color: theme.colors.secondaryText }]}>
                {node.metrics.executions}
              </Text>
            </View>
            <View style={styles.metricItem}>
              <CheckCircle size={12} color={theme.colors.secondaryText} />
              <Text style={[styles.metricText, { color: theme.colors.secondaryText }]}>
                {(node.metrics.successRate * 100).toFixed(0)}%
              </Text>
            </View>
            <View style={styles.metricItem}>
              <Clock size={12} color={theme.colors.secondaryText} />
              <Text style={[styles.metricText, { color: theme.colors.secondaryText }]}>
                {Math.round(node.metrics.avgDuration / 1000)}s
              </Text>
            </View>
          </View>
        )}

        {/* Children */}
        {hasChildren && isExpanded && (
          <View style={styles.childrenContainer}>
            {node.children.map(child => renderTreeNode(child, depth + 1))}
          </View>
        )}
      </View>
    );
  };

  const renderOrgChart = (node: AgentNode, level: number = 0): React.ReactNode => {
    const Icon = getNodeIcon(node.role, node.status);
    const nodeColor = getNodeColor(node.role, node.status);

    return (
      <View key={node.id} style={styles.orgChartLevel}>
        <View style={[
          styles.orgChartNode,
          { 
            backgroundColor: theme.colors.cardBackground,
            borderColor: selectedNode?.id === node.id ? theme.colors.primary : theme.colors.border,
          }
        ]}>
          <View style={[styles.orgChartIcon, { backgroundColor: `${nodeColor}20` }]}>
            <Icon size={24} color={nodeColor} />
          </View>
          <Text style={[styles.orgChartName, { color: theme.colors.text }]}>{node.name}</Text>
          <Text style={[styles.orgChartRole, { color: theme.colors.secondaryText }]}>{node.role}</Text>
          
          {showLoopStatus && node.loopConfig && (
            <View style={styles.orgChartLoopStatus}>
              {node.loopConfig.active ? (
                <Activity size={12} color="#10B981" />
              ) : (
                <Circle size={12} color={theme.colors.secondaryText} />
              )}
            </View>
          )}

          <TouchableOpacity
            style={styles.orgChartActionButton}
            onPress={() => {
              setSelectedNode(node);
              onNodePress?.(node);
            }}
          >
            <MoreVertical size={16} color={theme.colors.secondaryText} />
          </TouchableOpacity>
        </View>

        {node.children.length > 0 && (
          <View style={styles.orgChartChildren}>
            {node.children.map(child => renderOrgChart(child, level + 1))}
          </View>
        )}
      </View>
    );
  };

  const renderMindMap = (node: AgentNode, position: { x: number; y: number } = { x: 50, y: 50 }): React.ReactNode => {
    const Icon = getNodeIcon(node.role, node.status);
    const nodeColor = getNodeColor(node.role, node.status);

    return (
      <View key={node.id} style={[
        styles.mindMapNode,
        {
          left: position.x,
          top: position.y,
          backgroundColor: theme.colors.cardBackground,
          borderColor: selectedNode?.id === node.id ? theme.colors.primary : theme.colors.border,
        }
      ]}>
        <View style={[styles.mindMapIcon, { backgroundColor: `${nodeColor}20` }]}>
          <Icon size={20} color={nodeColor} />
        </View>
        <Text style={[styles.mindMapName, { color: theme.colors.text }]}>{node.name}</Text>
        <Text style={[styles.mindMapRole, { color: theme.colors.secondaryText }]}>{node.role}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Toolbar */}
      <View style={[styles.toolbar, { backgroundColor: theme.colors.cardBackground, borderBottomColor: theme.colors.border }]}>
        <View style={styles.toolbarLeft}>
          <GitBranch size={20} color={theme.colors.primary} />
          <Text style={[styles.toolbarTitle, { color: theme.colors.text }]}>Agent Hierarchy</Text>
        </View>
        
        <View style={styles.toolbarRight}>
          <TouchableOpacity style={[styles.toolbarButton, { backgroundColor: theme.colors.background }]}>
            <Search size={18} color={theme.colors.secondaryText} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.toolbarButton, { backgroundColor: theme.colors.background }]}>
            <Filter size={18} color={theme.colors.secondaryText} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.toolbarButton, { backgroundColor: theme.colors.background }]}>
            <SortAsc size={18} color={theme.colors.secondaryText} />
          </TouchableOpacity>
        </View>
      </View>

      {/* View Mode Selector */}
      <View style={[styles.viewModeSelector, { backgroundColor: theme.colors.cardBackground, borderBottomColor: theme.colors.border }]}>
        {[
          { id: 'tree', icon: GitBranch, label: 'Tree' },
          { id: 'org-chart', icon: Network, label: 'Org Chart' },
          { id: 'mind-map', icon: Layers, label: 'Mind Map' },
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
        {viewMode === 'tree' && renderTreeNode(hierarchy)}
        {viewMode === 'org-chart' && (
          <ScrollView horizontal style={styles.orgChartContainer}>
            <View style={styles.orgChartWrapper}>
              {renderOrgChart(hierarchy)}
            </View>
          </ScrollView>
        )}
        {viewMode === 'mind-map' && (
          <View style={styles.mindMapContainer}>
            {renderMindMap(hierarchy)}
          </View>
        )}
      </ScrollView>

      {/* Node Detail Modal */}
      {selectedNode && (
        <Modal
          visible={true}
          animationType="slide"
          onRequestClose={() => setSelectedNode(null)}
        >
          <View style={[styles.modal, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.modalHeader, { borderBottomColor: theme.colors.border }]}>
              <TouchableOpacity onPress={() => setSelectedNode(null)}>
                <ChevronDown size={24} color={theme.colors.text} />
              </TouchableOpacity>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                {selectedNode.name}
              </Text>
              <View style={styles.modalActions}>
                {onEditNode && (
                  <TouchableOpacity onPress={() => onEditNode(selectedNode)}>
                    <Edit size={20} color={theme.colors.primary} />
                  </TouchableOpacity>
                )}
                {onDeleteNode && (
                  <TouchableOpacity onPress={() => onDeleteNode(selectedNode.id)}>
                    <Trash2 size={20} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <ScrollView style={styles.modalContent}>
              <View style={[styles.detailSection, { backgroundColor: theme.colors.cardBackground }]}>
                <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Role</Text>
                <Text style={[styles.detailValue, { color: theme.colors.text }]}>{selectedNode.role}</Text>
              </View>

              <View style={[styles.detailSection, { backgroundColor: theme.colors.cardBackground }]}>
                <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Status</Text>
                <View style={styles.statusRow}>
                  <View style={[styles.statusDot, { backgroundColor: getNodeColor(selectedNode.role, selectedNode.status) }]} />
                  <Text style={[styles.detailValue, { color: theme.colors.text }]}>{selectedNode.status}</Text>
                </View>
              </View>

              <View style={[styles.detailSection, { backgroundColor: theme.colors.cardBackground }]}>
                <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Capabilities</Text>
                {selectedNode.capabilities.map((cap, index) => (
                  <Text key={index} style={[styles.detailValue, { color: theme.colors.text }]}>
                    • {cap}
                  </Text>
                ))}
              </View>

              {selectedNode.metrics && (
                <View style={[styles.detailSection, { backgroundColor: theme.colors.cardBackground }]}>
                  <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Metrics</Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                    Executions: {selectedNode.metrics.executions}
                  </Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                    Success Rate: {(selectedNode.metrics.successRate * 100).toFixed(1)}%
                  </Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                    Avg Duration: {Math.round(selectedNode.metrics.avgDuration / 1000)}s
                  </Text>
                </View>
              )}

              {selectedNode.loopConfig && (
                <View style={[styles.detailSection, { backgroundColor: theme.colors.cardBackground }]}>
                  <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Loop Configuration</Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                    Active: {selectedNode.loopConfig.active ? 'Yes' : 'No'}
                  </Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                    Iterations: {selectedNode.loopConfig.iterations}
                  </Text>
                  {selectedNode.loopConfig.lastExecution && (
                    <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                      Last: {new Date(selectedNode.loopConfig.lastExecution).toLocaleString()}
                    </Text>
                  )}
                </View>
              )}

              <View style={styles.actionButtons}>
                {onExecuteLoop && selectedNode.loopConfig && (
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
                    onPress={() => {
                      onExecuteLoop(selectedNode.id);
                      setSelectedNode(null);
                    }}
                  >
                    <Play size={16} color="#fff" />
                    <Text style={[styles.actionButtonText, { color: '#fff' }]}>Execute Loop</Text>
                  </TouchableOpacity>
                )}

                {onStopLoop && selectedNode.loopConfig?.active && (
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: '#EF4444' }]}
                    onPress={() => {
                      onStopLoop(selectedNode.id);
                      setSelectedNode(null);
                    }}
                  >
                    <Pause size={16} color="#fff" />
                    <Text style={[styles.actionButtonText, { color: '#fff' }]}>Stop Loop</Text>
                  </TouchableOpacity>
                )}

                {onAddChild && (
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: theme.colors.background, borderColor: theme.colors.border, borderWidth: 1 }]}
                    onPress={() => {
                      onAddChild(selectedNode.id);
                      setSelectedNode(null);
                    }}
                  >
                    <Plus size={16} color={theme.colors.primary} />
                    <Text style={[styles.actionButtonText, { color: theme.colors.primary }]}>Add Child</Text>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  toolbarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toolbarTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  toolbarRight: {
    flexDirection: 'row',
    gap: 8,
  },
  toolbarButton: {
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  viewModeButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  nodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 4,
  },
  expandButton: {
    marginRight: 8,
  },
  nodeIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  nodeInfo: {
    flex: 1,
  },
  nodeName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  nodeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  nodeRole: {
    fontSize: 11,
    textTransform: 'capitalize',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  loopStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: 8,
  },
  iterationCount: {
    fontSize: 10,
    fontWeight: '600',
  },
  moreButton: {
    padding: 4,
  },
  metricsContainer: {
    flexDirection: 'row',
    gap: 12,
    padding: 8,
    marginLeft: 56,
    marginTop: 4,
    borderRadius: 6,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricText: {
    fontSize: 11,
  },
  childrenContainer: {
    marginTop: 4,
  },
  orgChartContainer: {
    flex: 1,
  },
  orgChartWrapper: {
    padding: 20,
    minWidth: 800,
  },
  orgChartLevel: {
    alignItems: 'center',
  },
  orgChartNode: {
    width: 140,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    marginVertical: 8,
  },
  orgChartIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  orgChartName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  orgChartRole: {
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 8,
  },
  orgChartLoopStatus: {
    marginBottom: 8,
  },
  orgChartActionButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  orgChartChildren: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
  mindMapContainer: {
    flex: 1,
    position: 'relative',
    minHeight: 400,
  },
  mindMapNode: {
    position: 'absolute',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    minWidth: 100,
  },
  mindMapIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  mindMapName: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2,
  },
  mindMapRole: {
    fontSize: 10,
    textAlign: 'center',
  },
  modal: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 16,
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  detailSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
  detailValue: {
    fontSize: 14,
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
