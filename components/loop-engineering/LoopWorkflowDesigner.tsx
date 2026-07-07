/**
 * Loop Workflow Designer
 * 
 * Visual drag-and-drop designer for creating loop workflows.
 * Provides an intuitive interface for designing agent coordination patterns.
 */

import React, { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, PanResponder, Modal } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { LoopConfig, LoopNode, LoopCondition } from '@/lib/loop-engineering/types';
import { getDepartmentAgents } from '@/lib/loop-engineering';
import {
  Plus, Trash2, Save, Play, Settings, Bot, Diamond, Zap,
  GitBranch, Merge, Split, ArrowRight, ChevronRight, Layers,
  Target, Clock, CheckCircle, XCircle, Network, Grid
} from 'lucide-react-native';

interface LoopWorkflowDesignerProps {
  initialConfig?: Partial<LoopConfig>;
  onSave: (config: LoopConfig) => void;
  onCancel: () => void;
  departmentId?: string;
  theme: any;
}

export const LoopWorkflowDesigner: React.FC<LoopWorkflowDesignerProps> = ({
  initialConfig,
  onSave,
  onCancel,
  departmentId = 'marketing-growth',
  theme
}) => {
  const [nodes, setNodes] = useState<LoopNode[]>(initialConfig?.nodes || []);
  const [connections, setConnections] = useState<Array<{ from: string; to: string }>>([]);
  const [selectedNode, setSelectedNode] = useState<LoopNode | null>(null);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [showAgentPalette, setShowAgentPalette] = useState(false);
  const [showNodeProperties, setShowNodeProperties] = useState(false);
  const [loopName, setLoopName] = useState(initialConfig?.name || '');
  const [loopDescription, setLoopDescription] = useState(initialConfig?.description || '');

  const availableAgents = getDepartmentAgents(departmentId);

  const nodeTypes = [
    { type: 'agent', icon: Bot, label: 'Agent', color: theme.colors.primary },
    { type: 'condition', icon: Diamond, label: 'Condition', color: theme.colors.accent },
    { type: 'action', icon: Zap, label: 'Action', color: theme.colors.warning },
    { type: 'merge', icon: Merge, label: 'Merge', color: theme.colors.success },
    { type: 'split', icon: Split, label: 'Split', color: theme.colors.error },
  ];

  const addNode = (type: string, agentId?: string) => {
    const newNode: LoopNode = {
      id: `node_${Date.now()}`,
      type: type as any,
      name: `New ${type}`,
      description: `${type} node`,
      agentId: type === 'agent' ? agentId : undefined,
      agentType: type === 'agent' ? 'main' : undefined,
      nextNodes: [],
      position: { x: 100 + Math.random() * 200, y: 100 + Math.random() * 200 }
    };
    setNodes([...nodes, newNode]);
  };

  const deleteNode = (nodeId: string) => {
    setNodes(nodes.filter(n => n.id !== nodeId));
    setConnections(connections.filter(c => c.from !== nodeId && c.to !== nodeId));
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
  };

  const addConnection = (fromNodeId: string, toNodeId: string) => {
    if (fromNodeId === toNodeId) return;
    if (connections.some(c => c.from === fromNodeId && c.to === toNodeId)) return;
    
    setConnections([...connections, { from: fromNodeId, to: toNodeId }]);
    
    // Update node's nextNodes
    setNodes(nodes.map(node => {
      if (node.id === fromNodeId) {
        return {
          ...node,
          nextNodes: [...(node.nextNodes || []), toNodeId]
        };
      }
      return node;
    }));
  };

  const handleNodePress = (node: LoopNode) => {
    setSelectedNode(node);
    setShowNodeProperties(true);
  };

  const handleSave = () => {
    const config: LoopConfig = {
      id: initialConfig?.id || `loop_${Date.now()}`,
      name: loopName,
      description: loopDescription,
      version: '1.0.0',
      status: 'idle',
      goal: initialConfig?.goal || {
        primary: 'Complete workflow',
        successCriteria: [],
        maxIterations: 10
      },
      nodes,
      startNodeId: nodes.find(n => n.type === 'start')?.id || nodes[0]?.id || '',
      endNodeId: nodes.find(n => n.type === 'end')?.id || nodes[nodes.length - 1]?.id,
      settings: initialConfig?.settings || {
        triggerType: 'manual',
        retryPolicy: {
          maxRetries: 3,
          backoffStrategy: 'exponential',
          initialDelay: 1000
        },
        concurrency: 1,
        priority: 'medium'
      },
      integration: initialConfig?.integration || {
        relatedAgents: nodes.filter(n => n.agentId).map(n => n.agentId!)
      },
      metadata: initialConfig?.metadata || {
        createdBy: 'user',
        createdAt: new Date(),
        tags: [],
        category: 'custom'
      }
    };
    onSave(config);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <Pressable onPress={onCancel}>
          <ArrowRight size={24} color={theme.colors.text} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Workflow Designer
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            {nodes.length} nodes · {connections.length} connections
          </Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable onPress={() => setShowAgentPalette(true)}>
            <Plus size={24} color={theme.colors.primary} />
          </Pressable>
          <Pressable onPress={handleSave}>
            <Save size={24} color={theme.colors.success} />
          </Press>
        </View>
      </View>

      {/* Toolbar */}
      <View style={[styles.toolbar, { borderBottomColor: theme.colors.border }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.toolbarContent}>
            {nodeTypes.map((nodeType) => {
              const Icon = nodeType.icon;
              return (
                <Pressable
                  key={nodeType.type}
                  style={[styles.toolbarButton, { backgroundColor: theme.colors.card }]}
                  onPress={() => addNode(nodeType.type)}
                >
                  <Icon size={18} color={nodeType.color} />
                  <Text style={[styles.toolbarButtonText, { color: theme.colors.text }]}>
                    {nodeType.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Canvas */}
      <View style={[styles.canvas, { backgroundColor: theme.colors.cardBackground }]}>
        <Grid
          size={40}
          color={theme.colors.border}
        />
        
        {/* Render connections */}
        {connections.map((connection, index) => {
          const fromNode = nodes.find(n => n.id === connection.from);
          const toNode = nodes.find(n => n.id === connection.to);
          if (!fromNode || !toNode) return null;

          return (
            <ConnectionLine
              key={index}
              from={fromNode.position || { x: 0, y: 0 }}
              to={toNode.position || { x: 0, y: 0 }}
              color={theme.colors.primary}
            />
          );
        })}

        {/* Render nodes */}
        {nodes.map((node) => {
          const nodeType = nodeTypes.find(nt => nt.type === node.type);
          const Icon = nodeType?.icon || Bot;
          const isSelected = selectedNode?.id === node.id;

          return (
            <DraggableNode
              key={node.id}
              node={node}
              position={node.position || { x: 0, y: 0 }}
              icon={Icon}
              color={nodeType?.color || theme.colors.primary}
              isSelected={isSelected}
              onPress={() => handleNodePress(node)}
              onPositionChange={(newPosition) => {
                setNodes(nodes.map(n => 
                  n.id === node.id ? { ...n, position: newPosition } : n
                ));
              }}
              theme={theme}
            />
          );
        })}
      </View>

      {/* Agent Palette Modal */}
      <Modal
        visible={showAgentPalette}
        animationType="slide"
        onRequestClose={() => setShowAgentPalette(false)}
      >
        <AgentPalette
          agents={availableAgents.main}
          onSelectAgent={(agentId) => {
            addNode('agent', agentId);
            setShowAgentPalette(false);
          }}
          onClose={() => setShowAgentPalette(false)}
          theme={theme}
        />
      </Modal>

      {/* Node Properties Modal */}
      <Modal
        visible={showNodeProperties}
        animationType="slide"
        onRequestClose={() => setShowNodeProperties(false)}
      >
        {selectedNode && (
          <NodePropertiesPanel
            node={selectedNode}
            availableAgents={availableAgents.main}
            onUpdate={(updatedNode) => {
              setNodes(nodes.map(n => n.id === updatedNode.id ? updatedNode : n));
              setSelectedNode(updatedNode);
            }}
            onDelete={() => {
              deleteNode(selectedNode.id);
              setShowNodeProperties(false);
            }}
            onClose={() => setShowNodeProperties(false)}
            theme={theme}
          />
        )}
      </Modal>
    </View>
  );
};

// Draggable Node Component
interface DraggableNodeProps {
  node: LoopNode;
  position: { x: number; y: number };
  icon: any;
  color: string;
  isSelected: boolean;
  onPress: () => void;
  onPositionChange: (position: { x: number; y: number }) => void;
  theme: any;
}

const DraggableNode: React.FC<DraggableNodeProps> = ({
  node,
  position,
  icon: Icon,
  color,
  isSelected,
  onPress,
  onPositionChange,
  theme
}) => {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt) => {
        onPositionChange({
          x: evt.nativeEventX,
          y: evt.nativeEventY
        });
      },
      onPanResponderRelease: () => {
        // Final position is already set in onMove
      }
    })
  ).current;

  return (
    <Pressable
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
      onPress={onPress}
      {...panResponder.panHandlers}
    >
      <View style={[styles.nodeIcon, { backgroundColor: `${color}20` }]}>
        <Icon size={20} color={color} />
      </View>
      <Text style={[styles.nodeName, { color: theme.colors.text }]} numberOfLines={1}>
        {node.name}
      </Text>
      <Text style={[styles.nodeType, { color: theme.colors.textSecondary }]}>
        {node.type}
      </Text>
      
      {/* Connection points */}
      <View style={[styles.connectionPoint, styles.inputPoint, { backgroundColor: theme.colors.border }]} />
      <View style={[styles.connectionPoint, styles.outputPoint, { backgroundColor: theme.colors.border }]} />
    </Pressable>
  );
};

// Connection Line Component
interface ConnectionLineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  color: string;
}

const ConnectionLine: React.FC<ConnectionLineProps> = ({ from, to, color }) => {
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const length = Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
  const angle = Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI);

  return (
    <View
      style={[
        styles.connectionLine,
        {
          left: midX,
          top: midY,
          width: length,
          transform: [{ rotate: `${angle}deg` }],
          backgroundColor: color
        }
      ]}
    />
  );
};

// Grid Component
interface GridProps {
  size: number;
  color: string;
}

const Grid: React.FC<GridProps> = ({ size, color }) => {
  const lines = [];
  for (let i = 0; i < 2000; i += size) {
    lines.push(
      <View
        key={`h-${i}`}
        style={[
          styles.gridLine,
          styles.horizontalGridLine,
          {
            top: i,
            backgroundColor: color
          }
        ]}
      />
    );
    lines.push(
      <View
        key={`v-${i}`}
        style={[
          styles.gridLine,
          styles.verticalGridLine,
          {
            left: i,
            backgroundColor: color
          }
        ]}
      />
    );
  }
  return <>{lines}</>;
};

// Agent Palette Component
interface AgentPaletteProps {
  agents: any[];
  onSelectAgent: (agentId: string) => void;
  onClose: () => void;
  theme: any;
}

const AgentPalette: React.FC<AgentPaletteProps> = ({ agents, onSelectAgent, onClose, theme }) => {
  return (
    <View style={[styles.palette, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.paletteHeader, { borderBottomColor: theme.colors.border }]}>
        <Pressable onPress={onClose}>
          <ArrowRight size={24} color={theme.colors.text} />
        </PressView>
        <Text style={[styles.paletteTitle, { color: theme.colors.text }]}>
          Select Agent
        </Text>
        <View style={styles.paletteSpacer} />
      </View>

      <ScrollView style={styles.paletteContent}>
        {agents.map((agent) => (
          <Pressable
            key={agent.id}
            style={[styles.agentCard, { backgroundColor: theme.colors.card }]}
            onPress={() => onSelectAgent(agent.id)}
          >
            <Bot size={24} color={theme.colors.primary} />
            <View style={styles.agentCardInfo}>
              <Text style={[styles.agentCardName, { color: theme.colors.text }]}>
                {agent.name}
              </Text>
              <Text style={[styles.agentCardTitle, { color: theme.colors.textSecondary }]}>
                {agent.title}
              </Text>
            </View>
            <ChevronRight size={20} color={theme.colors.textSecondary} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

// Node Properties Panel
interface NodePropertiesPanelProps {
  node: LoopNode;
  availableAgents: any[];
  onUpdate: (node: LoopNode) => void;
  onDelete: () => void;
  onClose: () => void;
  theme: any;
}

const NodePropertiesPanel: React.FC<NodePropertiesPanelProps> = ({
  node,
  availableAgents,
  onUpdate,
  onDelete,
  onClose,
  theme
}) => {
  const [nodeName, setNodeName] = useState(node.name);
  const [nodeDescription, setNodeDescription] = useState(node.description);
  const [selectedAgent, setSelectedAgent] = useState(node.agentId);

  const handleSave = () => {
    onUpdate({
      ...node,
      name: nodeName,
      description: nodeDescription,
      agentId: selectedAgent
    });
    onClose();
  };

  return (
    <View style={[styles.propertiesPanel, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.propertiesHeader, { borderBottomColor: theme.colors.border }]}>
        <Pressable onPress={onClose}>
          <ArrowRight size={24} color={theme.colors.text} />
        </Pressable>
        <Text style={[styles.propertiesTitle, { color: theme.colors.text }]}>
          Node Properties
        </Text>
        <Pressable onPress={handleSave}>
          <Save size={24} color={theme.colors.success} />
        </Pressable>
      </View>

      <ScrollView style={styles.propertiesContent}>
        <View style={styles.propertySection}>
          <Text style={[styles.propertyLabel, { color: theme.colors.textSecondary }]}>
            Name
          </Text>
          <Text style={[styles.propertyValue, { color: theme.colors.text }]}>
            {nodeName}
          </Text>
        </View>

        <View style={styles.propertySection}>
          <Text style={[styles.propertyLabel, { color: theme.colors.textSecondary }]}>
            Description
          </Text>
          <Text style={[styles.propertyValue, { color: theme.colors.text }]}>
            {nodeDescription}
          </Text>
        </View>

        {node.type === 'agent' && (
          <View style={styles.propertySection}>
            <Text style={[styles.propertyLabel, { color: theme.colors.textSecondary }]}>
              Agent
            </Text>
            <Text style={[styles.propertyValue, { color: theme.colors.primary }]}>
              {selectedAgent || 'None selected'}
            </Text>
          </View>
        )}

        <Pressable
          style={[styles.deleteButton, { backgroundColor: theme.colors.error }]}
          onPress={onDelete}
        >
          <Trash2 size={20} color="#fff" />
          <Text style={styles.deleteButtonText}>Delete Node</Text>
        </Pressable>
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
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  toolbar: {
    padding: 8,
    borderBottomWidth: 1,
  },
  toolbarContent: {
    flexDirection: 'row',
    gap: 8,
  },
  toolbarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  toolbarButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  canvas: {
    flex: 1,
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    opacity: 0.3,
  },
  horizontalGridLine: {
    left: 0,
    right: 0,
    height: 1,
  },
  verticalGridLine: {
    top: 0,
    bottom: 0,
    width: 1,
  },
  node: {
    position: 'absolute',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    width: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nodeIcon: {
    borderRadius: 16,
    padding: 8,
    marginBottom: 8,
  },
  nodeName: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2,
  },
  nodeType: {
    fontSize: 10,
    textAlign: 'center',
  },
  connectionPoint: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  inputPoint: {
    left: -6,
    top: '50%',
    marginTop: -6,
  },
  outputPoint: {
    right: -6,
    top: '50%',
    marginTop: -6,
  },
  connectionLine: {
    position: 'absolute',
    height: 2,
    borderRadius: 1,
    transformOrigin: 'left',
  },
  palette: {
    flex: 1,
  },
  paletteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  paletteTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  paletteSpacer: {
    width: 24,
  },
  paletteContent: {
    flex: 1,
    padding: 16,
  },
  agentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  agentCardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  agentCardName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  agentCardTitle: {
    fontSize: 12,
  },
  propertiesPanel: {
    flex: 1,
  },
  propertiesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  propertiesTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  propertiesContent: {
    flex: 1,
    padding: 16,
  },
  propertySection: {
    marginBottom: 20,
  },
  propertyLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  propertyValue: {
    fontSize: 14,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});