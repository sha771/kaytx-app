/**
 * Real-Time Graph Visualization
 * Live visualization of loop execution with animated updates
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import {
  Activity,
  Play,
  Pause,
  Square,
  RefreshCw,
  Zap,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  LineChart,
  PieChart,
  Layers,
  Network,
  Filter,
  Settings,
  Maximize,
  Download,
  Share2,
} from 'lucide-react-native';

interface GraphNode {
  id: string;
  name: string;
  type: 'agent' | 'condition' | 'action' | 'merge' | 'split';
  status: 'idle' | 'running' | 'completed' | 'failed' | 'waiting';
  position: { x: number; y: number };
  metrics?: {
    executionTime: number;
    iterations: number;
    successRate: number;
  };
}

interface GraphEdge {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  status: 'idle' | 'active' | 'completed';
  dataFlow?: number;
}

interface RealTimeGraphVisualizationProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  onNodePress?: (nodeId: string) => void;
  onEdgePress?: (edgeId: string) => void;
  isExecuting?: boolean;
  executionProgress?: number;
  onToggleExecution?: () => void;
  onRefresh?: () => void;
}

export const RealTimeGraphVisualization: React.FC<RealTimeGraphVisualizationProps> = ({
  nodes,
  edges,
  onNodePress,
  onEdgePress,
  isExecuting = false,
  executionProgress = 0,
  onToggleExecution,
  onRefresh,
}) => {
  const { theme } = useTheme();
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<GraphEdge | null>(null);
  const [viewMode, setViewMode] = useState<'graph' | 'timeline' | 'metrics'>('graph');
  const [animationValues] = useState(() => nodes.reduce((acc, node) => {
    acc[node.id] = new Animated.Value(0);
    return acc;
  }, {} as Record<string, Animated.Value>));

  useEffect(() => {
    // Animate nodes when status changes
    nodes.forEach(node => {
      if (node.status === 'running') {
        Animated.loop(
          Animated.sequence([
            Animated.timing(animationValues[node.id], {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(animationValues[node.id], {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ])
        ).start();
      } else {
        animationValues[node.id].stopAnimation();
        animationValues[node.id].setValue(0);
      }
    });
  }, [nodes]);

  const getNodeStatusColor = (status: GraphNode['status']) => {
    switch (status) {
      case 'running': return '#10B981';
      case 'completed': return '#3B82F6';
      case 'failed': return '#EF4444';
      case 'waiting': return '#F59E0B';
      default: return theme.colors.secondaryText;
    }
  };

  const getEdgeStatusColor = (status: GraphEdge['status']) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'completed': return '#3B82F6';
      default: return theme.colors.border;
    }
  };

  const renderGraphView = () => (
    <View style={styles.graphContainer}>
      {/* Edges */}
      {edges.map(edge => {
        const fromNode = nodes.find(n => n.id === edge.fromNodeId);
        const toNode = nodes.find(n => n.id === edge.toNodeId);
        if (!fromNode || !toNode) return null;

        const midX = (fromNode.position.x + toNode.position.x) / 2;
        const midY = (fromNode.position.y + toNode.position.y) / 2;

        return (
          <View
            key={edge.id}
            style={[
              styles.edge,
              {
                left: midX,
                top: midY,
                width: Math.abs(toNode.position.x - fromNode.position.x),
                height: 2,
                backgroundColor: getEdgeStatusColor(edge.status),
                transform: [{ rotate: `${Math.atan2(toNode.position.y - fromNode.position.y, toNode.position.x - fromNode.position.x)}rad` }],
              }
            ]}
            onPress={() => {
              setSelectedEdge(edge);
              onEdgePress?.(edge.id);
            }}
          >
            {edge.dataFlow !== undefined && (
              <View style={styles.dataFlowIndicator}>
                <View style={[styles.dataFlowDot, { backgroundColor: '#10B981' }]} />
              </View>
            )}
          </View>
        );
      })}

      {/* Nodes */}
      {nodes.map(node => {
        const pulseAnim = animationValues[node.id];
        const isSelected = selectedNode?.id === node.id;

        return (
          <Animated.View
            key={node.id}
            style={[
              styles.node,
              {
                left: node.position.x,
                top: node.position.y,
                backgroundColor: theme.colors.cardBackground,
                borderColor: isSelected ? theme.colors.primary : getNodeStatusColor(node.status),
                borderWidth: isSelected ? 2 : 1,
                opacity: pulseAnim ? pulseAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.7],
                }) : 1,
                transform: [{ scale: pulseAnim ? pulseAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.05],
                }) : 1 }],
              }
            ]}
            onPress={() => {
              setSelectedNode(node);
              onNodePress?.(node.id);
            }}
          >
            {/* Status indicator */}
            <View style={[
              styles.nodeStatusIndicator,
              { backgroundColor: getNodeStatusColor(node.status) }
            ]}>
              {node.status === 'running' && <Activity size={10} color="#fff" />}
              {node.status === 'completed' && <CheckCircle size={10} color="#fff" />}
              {node.status === 'failed' && <XCircle size={10} color="#fff" />}
              {node.status === 'waiting' && <Clock size={10} color="#fff" />}
            </View>

            {/* Node content */}
            <Text style={[styles.nodeName, { color: theme.colors.text }]} numberOfLines={1}>
              {node.name}
            </Text>
            <Text style={[styles.nodeType, { color: theme.colors.secondaryText }]}>
              {node.type}
            </Text>

            {/* Metrics */}
            {node.metrics && (
              <View style={styles.nodeMetrics}>
                <Text style={[styles.metricText, { color: theme.colors.secondaryText }]}>
                  {node.metrics.executionTime}ms
                </Text>
                {node.metrics.iterations > 0 && (
                  <Text style={[styles.metricText, { color: theme.colors.secondaryText }]}>
                    {node.metrics.iterations} iters
                  </Text>
                )}
              </View>
            )}
          </Animated.View>
        );
      })}
    </View>
  );

  const renderTimelineView = () => (
    <ScrollView style={styles.timelineContainer}>
      <View style={styles.timeline}>
        {nodes.map((node, index) => (
          <View key={node.id} style={styles.timelineItem}>
            <View style={styles.timelineLine}>
              <View style={[
                styles.timelineDot,
                { backgroundColor: getNodeStatusColor(node.status) }
              ]} />
              {index < nodes.length - 1 && <View style={[styles.timelineConnector, { backgroundColor: theme.colors.border }]} />}
            </View>
            <View style={[styles.timelineContent, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
              <View style={styles.timelineHeader}>
                <Text style={[styles.timelineNodeName, { color: theme.colors.text }]}>{node.name}</Text>
                <View style={[
                  styles.timelineStatusBadge,
                  { backgroundColor: getNodeStatusColor(node.status) }
                ]}>
                  <Text style={styles.timelineStatusText}>{node.status}</Text>
                </View>
              </View>
              {node.metrics && (
                <View style={styles.timelineMetrics}>
                  <Text style={[styles.timelineMetric, { color: theme.colors.secondaryText }]}>
                    Time: {node.metrics.executionTime}ms
                  </Text>
                  <Text style={[styles.timelineMetric, { color: theme.colors.secondaryText }]}>
                    Iterations: {node.metrics.iterations}
                  </Text>
                  <Text style={[styles.timelineMetric, { color: theme.colors.secondaryText }]}>
                    Success: {(node.metrics.successRate * 100).toFixed(0)}%
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderMetricsView = () => (
    <ScrollView style={styles.metricsContainer}>
      <View style={styles.metricsGrid}>
        <MetricCard
          icon={Activity}
          label="Active Nodes"
          value={nodes.filter(n => n.status === 'running').length}
          theme={theme}
        />
        <MetricCard
          icon={CheckCircle}
          label="Completed"
          value={nodes.filter(n => n.status === 'completed').length}
          theme={theme}
        />
        <MetricCard
          icon={XCircle}
          label="Failed"
          value={nodes.filter(n => n.status === 'failed').length}
          theme={theme}
        />
        <MetricCard
          icon={Clock}
          label="Waiting"
          value={nodes.filter(n => n.status === 'waiting').length}
          theme={theme}
        />
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}>
          <BarChart3 size={20} color={theme.colors.primary} />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Execution Progress</Text>
        </View>
        <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${executionProgress}%`,
                backgroundColor: isExecuting ? '#10B981' : theme.colors.primary,
              }
            ]}
          />
        </View>
        <Text style={[styles.progressText, { color: theme.colors.secondaryText }]}>
          {executionProgress.toFixed(1)}% Complete
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}>
          <LineChart size={20} color={theme.colors.primary} />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Metrics</Text>
        </View>
        
        {nodes.filter(n => n.metrics).map(node => (
          <View key={node.id} style={styles.metricRow}>
            <Text style={[styles.metricLabel, { color: theme.colors.text }]}>{node.name}</Text>
            <View style={styles.metricValues}>
              <Text style={[styles.metricValue, { color: theme.colors.secondaryText }]}>
                {node.metrics?.executionTime}ms
              </Text>
              <Text style={[styles.metricValue, { color: theme.colors.secondaryText }]}>
                {node.metrics?.successRate > 0.8 ? (
                  <TrendingUp size={12} color="#10B981" />
                ) : (
                  <TrendingDown size={12} color="#EF4444" />
                )}
                {(node.metrics?.successRate * 100).toFixed(0)}%
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.cardBackground, borderBottomColor: theme.colors.border }]}>
        <View style={styles.headerLeft}>
          <Network size={20} color={theme.colors.primary} />
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Real-Time Graph</Text>
          {isExecuting && <Activity size={16} color="#10B981" />}
        </View>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: theme.colors.background }]} onPress={onRefresh}>
            <RefreshCw size={18} color={theme.colors.secondaryText} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: theme.colors.background }]}>
            <Filter size={18} color={theme.colors.secondaryText} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: theme.colors.background }]}>
            <Settings size={18} color={theme.colors.secondaryText} />
          </TouchableOpacity>
        </View>
      </View>

      {/* View Mode Tabs */}
      <View style={[styles.tabs, { backgroundColor: theme.colors.cardBackground, borderBottomColor: theme.colors.border }]}>
        {[
          { id: 'graph', icon: Network, label: 'Graph' },
          { id: 'timeline', icon: LineChart, label: 'Timeline' },
          { id: 'metrics', icon: BarChart3, label: 'Metrics' },
        ].map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              viewMode === tab.id && { borderBottomColor: theme.colors.primary }
            ]}
            onPress={() => setViewMode(tab.id as any)}
          >
            <tab.icon
              size={16}
              color={viewMode === tab.id ? theme.colors.primary : theme.colors.secondaryText}
            />
            <Text style={[
              styles.tabText,
              { color: viewMode === tab.id ? theme.colors.primary : theme.colors.secondaryText }
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {viewMode === 'graph' && renderGraphView()}
        {viewMode === 'timeline' && renderTimelineView()}
        {viewMode === 'metrics' && renderMetricsView()}
      </View>

      {/* Execution Control */}
      <View style={[styles.executionControl, { backgroundColor: theme.colors.cardBackground, borderTopColor: theme.colors.border }]}>
        <View style={styles.executionInfo}>
          <Text style={[styles.executionLabel, { color: theme.colors.secondaryText }]}>
            {isExecuting ? 'Executing...' : 'Ready'}
          </Text>
          <Text style={[styles.executionProgress, { color: theme.colors.text }]}>
            {executionProgress.toFixed(1)}%
          </Text>
        </View>
        
        <TouchableOpacity
          style={[
            styles.executionButton,
            { backgroundColor: isExecuting ? '#EF4444' : '#10B981' }
          ]}
          onPress={onToggleExecution}
        >
          {isExecuting ? (
            <Square size={20} color="#fff" />
          ) : (
            <Play size={20} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface MetricCardProps {
  icon: any;
  label: string;
  value: number;
  theme: any;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, label, value, theme }) => (
  <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
    <Icon size={24} color={theme.colors.primary} />
    <Text style={[styles.metricCardLabel, { color: theme.colors.secondaryText }]}>{label}</Text>
    <Text style={[styles.metricCardValue, { color: theme.colors.text }]}>{value}</Text>
  </View>
);

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
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  graphContainer: {
    flex: 1,
    position: 'relative',
  },
  node: {
    position: 'absolute',
    width: 100,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nodeStatusIndicator: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeName: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  nodeType: {
    fontSize: 10,
  },
  nodeMetrics: {
    marginTop: 4,
  },
  metricText: {
    fontSize: 9,
  },
  edge: {
    position: 'absolute',
    height: 2,
    borderRadius: 1,
  },
  dataFlowIndicator: {
    position: 'absolute',
    top: -4,
    left: 0,
  },
  dataFlowDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  timelineContainer: {
    flex: 1,
  },
  timeline: {
    padding: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineLine: {
    alignItems: 'center',
    marginRight: 12,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  timelineConnector: {
    width: 2,
    flex: 1,
    minHeight: 40,
  },
  timelineContent: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timelineNodeName: {
    fontSize: 14,
    fontWeight: '600',
  },
  timelineStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  timelineStatusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  timelineMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  timelineMetric: {
    fontSize: 11,
  },
  metricsContainer: {
    flex: 1,
    padding: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  metricCardLabel: {
    fontSize: 12,
    marginTop: 8,
  },
  metricCardValue: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 4,
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  metricLabel: {
    fontSize: 14,
  },
  metricValues: {
    flexDirection: 'row',
    gap: 12,
  },
  metricValue: {
    fontSize: 13,
  },
  executionControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  executionInfo: {
    flex: 1,
  },
  executionLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  executionProgress: {
    fontSize: 18,
    fontWeight: '700',
  },
  executionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
