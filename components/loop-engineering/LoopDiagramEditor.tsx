/**
 * Interactive Loop Diagram Editor
 * Drag-and-drop editor for creating and editing loop diagrams
 */

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, PanResponder } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import {
  Plus,
  Trash2,
  Save,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Maximize,
  Play,
  Settings,
  Bot,
  Diamond,
  Zap,
  GitBranch,
  Merge,
  Circle,
  Square,
  ArrowRight,
  Layers,
  Grid,
  Move,
  Copy,
  Link,
  Unlink,
} from 'lucide-react-native';

interface DiagramNode {
  id: string;
  type: 'agent' | 'condition' | 'action' | 'merge' | 'split' | 'start' | 'end';
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  config?: Record<string, any>;
}

interface DiagramEdge {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  condition?: string;
}

interface LoopDiagramEditorProps {
  initialNodes?: DiagramNode[];
  initialEdges?: DiagramEdge[];
  onSave?: (nodes: DiagramNode[], edges: DiagramEdge[]) => void;
  onExecute?: (nodes: DiagramNode[], edges: DiagramEdge[]) => void;
  readOnly?: boolean;
}

export const LoopDiagramEditor: React.FC<LoopDiagramEditorProps> = ({
  initialNodes = [],
  initialEdges = [],
  onSave,
  onExecute,
  readOnly = false,
}) => {
  const { theme } = useTheme();
  const [nodes, setNodes] = useState<DiagramNode[]>(initialNodes);
  const [edges, setEdges] = useState<DiagramEdge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<DiagramNode | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<DiagramEdge | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [showNodePalette, setShowNodePalette] = useState(false);
  const [showNodeEditor, setShowNodeEditor] = useState(false);
  const [history, setHistory] = useState<{ nodes: DiagramNode[]; edges: DiagramEdge[] }[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState<string | null>(null);

  const canvasRef = useRef<View>(null);

  useEffect(() => {
    if (historyIndex === -1) {
      setHistory([{ nodes: initialNodes, edges: initialEdges }]);
      setHistoryIndex(0);
    }
  }, []);

  const saveToHistory = () => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ nodes: [...nodes], edges: [...edges] });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      const state = history[historyIndex - 1];
      setNodes([...state.nodes]);
      setEdges([...state.edges]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      const state = history[historyIndex + 1];
      setNodes([...state.nodes]);
      setEdges([...state.edges]);
    }
  };

  const addNode = (type: DiagramNode['type']) => {
    const newNode: DiagramNode = {
      id: `node-${Date.now()}`,
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${nodes.length + 1}`,
      x: 100 + nodes.length * 50,
      y: 100 + nodes.length * 50,
      width: 120,
      height: 80,
    };

    setNodes([...nodes, newNode]);
    saveToHistory();
    setShowNodePalette(false);
  };

  const deleteNode = (nodeId: string) => {
    setNodes(nodes.filter(n => n.id !== nodeId));
    setEdges(edges.filter(e => e.fromNodeId !== nodeId && e.toNodeId !== nodeId));
    saveToHistory();
    setSelectedNode(null);
  };

  const deleteEdge = (edgeId: string) => {
    setEdges(edges.filter(e => e.id !== edgeId));
    saveToHistory();
    setSelectedEdge(null);
  };

  const updateNode = (nodeId: string, updates: Partial<DiagramNode>) => {
    setNodes(nodes.map(n => n.id === nodeId ? { ...n, ...updates } : n));
    saveToHistory();
  };

  const addEdge = (fromNodeId: string, toNodeId: string) => {
    const newEdge: DiagramEdge = {
      id: `edge-${Date.now()}`,
      fromNodeId,
      toNodeId,
    };
    setEdges([...edges, newEdge]);
    saveToHistory();
  };

  const getNodeIcon = (type: DiagramNode['type']) => {
    switch (type) {
      case 'agent': return Bot;
      case 'condition': return Diamond;
      case 'action': return Zap;
      case 'merge': return Merge;
      case 'split': return GitBranch;
      case 'start': return Play;
      case 'end': return Square;
      default: return Circle;
    }
  };

  const getNodeColor = (type: DiagramNode['type']) => {
    switch (type) {
      case 'agent': return '#3B82F6';
      case 'condition': return '#F59E0B';
      case 'action': return '#10B981';
      case 'merge': return '#8B5CF6';
      case 'split': return '#EC4899';
      case 'start': return '#10B981';
      case 'end': return '#EF4444';
      default: return theme.colors.primary;
    }
  };

  const handleNodePress = (node: DiagramNode) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  };

  const handleNodeLongPress = (node: DiagramNode) => {
    if (isConnecting) {
      if (connectionStart && connectionStart !== node.id) {
        addEdge(connectionStart, node.id);
      }
      setIsConnecting(false);
      setConnectionStart(null);
    } else {
      setIsConnecting(true);
      setConnectionStart(node.id);
    }
  };

  const renderNode = (node: DiagramNode) => {
    const Icon = getNodeIcon(node.type);
    const nodeColor = getNodeColor(node.type);
    const isSelected = selectedNode?.id === node.id;
    const isConnectionSource = connectionStart === node.id;

    return (
      <View
        key={node.id}
        style={[
          styles.node,
          {
            left: node.x * scale + offset.x,
            top: node.y * scale + offset.y,
            width: node.width * scale,
            height: node.height * scale,
            backgroundColor: theme.colors.cardBackground,
            borderColor: isSelected ? theme.colors.primary : 
                         isConnectionSource ? '#10B981' : theme.colors.border,
            borderWidth: isSelected || isConnectionSource ? 2 : 1,
          }
        ]}
      >
        <View style={[styles.nodeIcon, { backgroundColor: `${nodeColor}20` }]}>
          <Icon size={16 * scale} color={nodeColor} />
        </View>
        <Text style={[styles.nodeName, { color: theme.colors.text, fontSize: 11 * scale }]} numberOfLines={1}>
          {node.name}
        </Text>
        <Text style={[styles.nodeType, { color: theme.colors.secondaryText, fontSize: 9 * scale }]}>
          {node.type}
        </Text>
      </View>
    );
  };

  const renderEdge = (edge: DiagramEdge) => {
    const fromNode = nodes.find(n => n.id === edge.fromNodeId);
    const toNode = nodes.find(n => n.id === edge.toNodeId);
    
    if (!fromNode || !toNode) return null;

    const isSelected = selectedEdge?.id === edge.id;
    const startX = fromNode.x * scale + offset.x + (fromNode.width * scale) / 2;
    const startY = fromNode.y * scale + offset.y + (fromNode.height * scale);
    const endX = toNode.x * scale + offset.x + (toNode.width * scale) / 2;
    const endY = toNode.y * scale + offset.y;

    return (
      <View
        key={edge.id}
        style={[
          styles.edge,
          {
            left: Math.min(startX, endX),
            top: Math.min(startY, endY),
            width: Math.abs(endX - startX),
            height: Math.abs(endY - startY),
            borderColor: isSelected ? theme.colors.primary : theme.colors.border,
            borderWidth: isSelected ? 2 : 1,
          }
        ]}
      >
        <ArrowRight 
          size={12} 
          color={isSelected ? theme.colors.primary : theme.colors.secondaryText}
          style={{
            position: 'absolute',
            right: -6,
            top: '50%',
            marginTop: -6,
            transform: [{ rotate: endX > startX ? '0deg' : '180deg' }],
          }}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Toolbar */}
      <View style={[styles.toolbar, { backgroundColor: theme.colors.cardBackground, borderBottomColor: theme.colors.border }]}>
        <View style={styles.toolbarLeft}>
          <Grid size={20} color={theme.colors.primary} />
          <Text style={[styles.toolbarTitle, { color: theme.colors.text }]}>Loop Diagram</Text>
        </View>
        
        <View style={styles.toolbarCenter}>
          {!readOnly && (
            <>
              <TouchableOpacity style={[styles.toolbarButton, { backgroundColor: theme.colors.background }]} onPress={undo}>
                <Undo size={18} color={theme.colors.secondaryText} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.toolbarButton, { backgroundColor: theme.colors.background }]} onPress={redo}>
                <Redo size={18} color={theme.colors.secondaryText} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.toolbarButton, { backgroundColor: theme.colors.background }]} 
                onPress={() => setScale(Math.min(scale + 0.1, 2))}
              >
                <ZoomIn size={18} color={theme.colors.secondaryText} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.toolbarButton, { backgroundColor: theme.colors.background }]} 
                onPress={() => setScale(Math.max(scale - 0.1, 0.5))}
              >
                <ZoomOut size={18} color={theme.colors.secondaryText} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.toolbarButton, { backgroundColor: theme.colors.background }]} 
                onPress={() => { setScale(1); setOffset({ x: 0, y: 0 }); }}
              >
                <Maximize size={18} color={theme.colors.secondaryText} />
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.toolbarRight}>
          {!readOnly && (
            <TouchableOpacity 
              style={[styles.toolbarButton, { backgroundColor: theme.colors.primary }]} 
              onPress={() => setShowNodePalette(true)}
            >
              <Plus size={18} color="#fff" />
            </TouchableOpacity>
          )}
          {onSave && (
            <TouchableOpacity style={[styles.toolbarButton, { backgroundColor: '#10B981' }]} onPress={() => onSave(nodes, edges)}>
              <Save size={18} color="#fff" />
            </TouchableOpacity>
          )}
          {onExecute && (
            <TouchableOpacity style={[styles.toolbarButton, { backgroundColor: theme.colors.primary }]} onPress={() => onExecute(nodes, edges)}>
              <Play size={18} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Canvas */}
      <ScrollView 
        style={styles.canvas} 
        contentContainerStyle={styles.canvasContent}
        scrollEnabled={false}
      >
        <View 
          ref={canvasRef}
          style={[styles.diagramCanvas, { 
            width: 2000 * scale,
            height: 2000 * scale,
            backgroundColor: theme.colors.background,
          }]}
        >
          {/* Grid */}
          {Array.from({ length: 20 }).map((_, i) => (
            <View
              key={`h-${i}`}
              style={[
                styles.gridLine,
                {
                  top: i * 100 * scale,
                  left: 0,
                  right: 0,
                  height: 1,
                  backgroundColor: theme.colors.border,
                }
              ]}
            />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <View
              key={`v-${i}`}
              style={[
                styles.gridLine,
                {
                  left: i * 100 * scale,
                  top: 0,
                  bottom: 0,
                  width: 1,
                  backgroundColor: theme.colors.border,
                }
              ]}
            />
          ))}

          {/* Edges */}
          {edges.map(renderEdge)}

          {/* Nodes */}
          {nodes.map(renderNode)}

          {/* Connection indicator */}
          {isConnecting && connectionStart && (
            <View style={[styles.connectionIndicator, { backgroundColor: '#10B981' }]}>
              <Text style={styles.connectionText}>Select target node</Text>
              <TouchableOpacity onPress={() => { setIsConnecting(false); setConnectionStart(null); }}>
                <XCircle size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Node Palette */}
      <Modal visible={showNodePalette} animationType="slide" onRequestClose={() => setShowNodePalette(false)}>
        <View style={[styles.paletteModal, { backgroundColor: theme.colors.background }]}>
          <View style={[styles.paletteHeader, { borderBottomColor: theme.colors.border }]}>
            <Text style={[styles.paletteTitle, { color: theme.colors.text }]}>Add Node</Text>
            <TouchableOpacity onPress={() => setShowNodePalette(false)}>
              <Square size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.paletteContent}>
            {(['agent', 'condition', 'action', 'merge', 'split', 'start', 'end'] as DiagramNode['type'][]).map(type => {
              const Icon = getNodeIcon(type);
              const color = getNodeColor(type);
              return (
                <TouchableOpacity
                  key={type}
                  style={[styles.paletteItem, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}
                  onPress={() => addNode(type)}
                >
                  <View style={[styles.paletteItemIcon, { backgroundColor: `${color}20` }]}>
                    <Icon size={24} color={color} />
                  </View>
                  <Text style={[styles.paletteItemText, { color: theme.colors.text }]}>{type}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Modal>

      {/* Node Editor */}
      <Modal visible={showNodeEditor} animationType="slide" onRequestClose={() => setShowNodeEditor(false)}>
        <View style={[styles.editorModal, { backgroundColor: theme.colors.background }]}>
          <View style={[styles.editorHeader, { borderBottomColor: theme.colors.border }]}>
            <Text style={[styles.editorTitle, { color: theme.colors.text }]}>Edit Node</Text>
            <TouchableOpacity onPress={() => setShowNodeEditor(false)}>
              <Square size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.editorContent}>
            <View style={[styles.editorField, { backgroundColor: theme.colors.cardBackground }]}>
              <Text style={[styles.editorLabel, { color: theme.colors.secondaryText }]}>Name</Text>
              <TextInput
                style={[styles.editorInput, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
                value={selectedNode?.name}
                onChangeText={(text) => selectedNode && updateNode(selectedNode.id, { name: text })}
              />
            </View>

            <View style={[styles.editorField, { backgroundColor: theme.colors.cardBackground }]}>
              <Text style={[styles.editorLabel, { color: theme.colors.secondaryText }]}>Type</Text>
              <Text style={[styles.editorValue, { color: theme.colors.text }]}>{selectedNode?.type}</Text>
            </View>

            {!readOnly && (
              <View style={styles.editorActions}>
                <TouchableOpacity 
                  style={[styles.editorActionButton, { backgroundColor: '#EF4444' }]}
                  onPress={() => {
                    if (selectedNode) {
                      deleteNode(selectedNode.id);
                      setShowNodeEditor(false);
                    }
                  }}
                >
                  <Trash2 size={16} color="#fff" />
                  <Text style={[styles.editorActionText, { color: '#fff' }]}>Delete Node</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>

      {/* Selection Actions */}
      {selectedNode && !readOnly && (
        <View style={[styles.selectionActions, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
          <TouchableOpacity style={styles.selectionButton} onPress={() => setShowNodeEditor(true)}>
            <Settings size={18} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.selectionButton} onPress={() => setIsConnecting(true)}>
            <Link size={18} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.selectionButton} onPress={() => deleteNode(selectedNode.id)}>
            <Trash2 size={18} color="#EF4444" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.selectionButton} onPress={() => setSelectedNode(null)}>
            <XCircle size={18} color={theme.colors.secondaryText} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const XCircle = ({ size, color }: { size: number; color: string }) => (
  <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: color }} />
);

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
  toolbarCenter: {
    flexDirection: 'row',
    gap: 8,
  },
  toolbarRight: {
    flexDirection: 'row',
    gap: 8,
  },
  toolbarTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  toolbarButton: {
    padding: 8,
    borderRadius: 8,
  },
  canvas: {
    flex: 1,
  },
  canvasContent: {
    flexGrow: 1,
  },
  diagramCanvas: {
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    opacity: 0.3,
  },
  node: {
    position: 'absolute',
    borderRadius: 8,
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
    marginBottom: 4,
  },
  nodeName: {
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2,
  },
  nodeType: {
    textAlign: 'center',
  },
  edge: {
    position: 'absolute',
    borderStyle: 'dashed',
  },
  connectionIndicator: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    zIndex: 1000,
  },
  connectionText: {
    color: '#fff',
    fontWeight: '600',
  },
  paletteModal: {
    flex: 1,
  },
  paletteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  paletteTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  paletteContent: {
    padding: 16,
  },
  paletteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  paletteItemIcon: {
    borderRadius: 20,
    padding: 10,
  },
  paletteItemText: {
    fontSize: 16,
    fontWeight: '600',
  },
  editorModal: {
    flex: 1,
  },
  editorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  editorTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  editorContent: {
    padding: 16,
  },
  editorField: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  editorLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
  editorInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  editorValue: {
    fontSize: 14,
  },
  editorActions: {
    marginTop: 16,
  },
  editorActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
  },
  editorActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  selectionActions: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  selectionButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: theme => theme.colors.background,
  },
});
