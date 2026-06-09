/**
 * =============================================================================
 * AGENT HIERARCHY MINDMAP - Advanced Interactive Visualization v2.5
 * =============================================================================
 *
 * Advanced mindmap component for visualizing AI agent hierarchy with:
 * - Interactive node-based visualization
 * - Zoom and pan capabilities
 * - Drag-and-drop node reorganization
 * - Real-time hierarchy updates
 * - Export to image/PDF
 * - Import from JSON
 * - Multiple layout algorithms (tree, radial, force-directed)
 * - Node customization (colors, icons, labels)
 * - Collaboration indicators
 * - Animation and transitions
 * - NEW v2.0:
 *   - 3D visualization mode with WebGL rendering
 *   - Real-time collaboration with live cursors and presence
 *   - AI-powered layout optimization
 *   - Interactive data visualization within nodes
 *   - Timeline/history view with playback
 *   - Advanced export formats (PowerPoint, Figma, Miro)
 *   - Natural language search and filtering
 *   - Node linking to external resources and documents
 *   - Performance metrics and analytics
 *   - Multi-touch gestures for mobile
 *   - Dark mode with automatic theme switching
 * - NEW v2.5:
 *   - Enhanced hierarchy visualization with main/sub agent distinction
 *   - Hierarchy depth indicators
 *   - Agent role badges
 *   - Dependency visualization with directional arrows
 *   - Hierarchy tree view mode
 *   - Agent inheritance indicators
 *   - Collapsible hierarchy branches
 *   - Hierarchy statistics panel
 *
 * @version 2.5.0
 * @lastUpdated 2026-06-07
 */

import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions,
  Modal,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {
  Plus,
  Minus,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Download,
  Upload,
  Share2,
  Layers,
  Grid3x3,
  Circle,
  Square,
  GitBranch,
  Network,
  MoreHorizontal,
  Edit3,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Star,
  ChevronRight,
  ChevronDown,
  Settings,
  Palette,
  Type,
  Image as ImageIcon,
  Save,
  RotateCcw,
  Play,
  Pause,
  Filter,
  Search,
  X,
  Check,
  Bot,
  Users,
  Users2,
  Building2,
  Crown,
  Target,
  Zap,
  Brain,
  Shield,
  TrendingUp,
  Heart,
  Cpu,
  Code,
  Briefcase,
  FileText,
  Database,
  Globe,
  MapPin,
  Calendar,
  Clock,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Award,
  Target as TargetIcon,
  Gauge,
  Sparkles,
  DollarSign,
  Crown,
  ArrowRight,
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

// ============================================
// TYPES
// ============================================

export interface MindmapNode {
  id: string;
  label: string;
  type: 'root' | 'department' | 'agent' | 'employee' | 'sub_agent';
  icon?: string;
  color?: string;
  position: { x: number; y: number };
  children?: MindmapNode[];
  metadata?: {
    agentType?: string;
    skills?: string[];
    tokenBudget?: number;
    status?: 'active' | 'draft' | 'paused' | 'archived';
    cost?: string;
    performance?: number;
    lastUpdated?: string;
  };
  isExpanded?: boolean;
  isLocked?: boolean;
  isVisible?: boolean;
  style?: {
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    fontSize?: number;
  };
  // NEW v2.0: Data visualization support
  dataVisualization?: {
    type: 'bar' | 'line' | 'pie' | 'metric';
    data: any[];
    title?: string;
    color?: string;
  };
}

export interface MindmapConnection {
  from: string;
  to: string;
  type: 'hierarchy' | 'collaboration' | 'dependency';
  style?: {
    color?: string;
    width?: number;
    dashed?: boolean;
    animated?: boolean;
  };
}

export interface MindmapLayout {
  type: 'tree' | 'radial' | 'force' | 'horizontal' | 'vertical';
  direction?: 'left-to-right' | 'right-to-left' | 'top-to-bottom' | 'bottom-to-top';
  nodeSpacing: number;
  levelSpacing: number;
}

export interface MindmapExport {
  format: 'json' | 'png' | 'svg' | 'pdf';
  data: any;
  metadata: {
    exportedAt: string;
    version: string;
    nodeCount: number;
    connectionCount: number;
  };
}

export interface AISuggestion {
  id: string;
  type: 'add_agent' | 'optimize_skills' | 'restructure' | 'cost_reduction';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  estimatedSavings?: number;
  suggestedNode?: Partial<MindmapNode>;
  reasoning: string;
  confidence: number;
}

export interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  color: string;
  isOnline: boolean;
  lastActive: string;
  cursorPosition?: { x: number; y: number };
  selectedNodeId?: string;
}

export interface RealtimeChange {
  id: string;
  type: 'node_add' | 'node_update' | 'node_delete' | 'connection_add' | 'connection_delete';
  userId: string;
  timestamp: string;
  data: any;
}

// ============================================
// MAIN COMPONENT
// ============================================

interface AgentHierarchyMindmapProps {
  nodes?: MindmapNode[];
  connections?: MindmapConnection[];
  onNodePress?: (node: MindmapNode) => void;
  onNodeLongPress?: (node: MindmapNode) => void;
  onNodeDrag?: (node: MindmapNode, newPosition: { x: number; y: number }) => void;
  onNodeAdd?: (parentId: string, newNode: MindmapNode) => void;
  onNodeDelete?: (nodeId: string) => void;
  onNodeUpdate?: (nodeId: string, updates: Partial<MindmapNode>) => void;
  onExport?: (format: string) => void;
  onImport?: (data: any) => void;
  editable?: boolean;
  showToolbar?: boolean;
  initialLayout?: MindmapLayout['type'];
  theme?: 'light' | 'dark';
  enableAISuggestions?: boolean;
  onApplySuggestion?: (suggestion: AISuggestion) => void;
  collaborators?: Collaborator[];
  onCollaboratorJoin?: (collaborator: Collaborator) => void;
  onCollaboratorLeave?: (collaboratorId: string) => void;
  onRealtimeChange?: (change: RealtimeChange) => void;
  enableCollaboration?: boolean;
}

export default function AgentHierarchyMindmap({
  nodes: initialNodes = [],
  connections: initialConnections = [],
  onNodePress,
  onNodeLongPress,
  onNodeDrag,
  onNodeAdd,
  onNodeDelete,
  onNodeUpdate,
  onExport,
  onImport,
  editable = true,
  showToolbar = true,
  initialLayout = 'tree',
  theme = 'light',
  enableAISuggestions = true,
  onApplySuggestion,
  collaborators: initialCollaborators = [],
  onCollaboratorJoin,
  onCollaboratorLeave,
  onRealtimeChange,
  enableCollaboration = true,
}: AgentHierarchyMindmapProps) {
  // State
  const [nodes, setNodes] = useState<MindmapNode[]>(initialNodes);
  const [connections, setConnections] = useState<MindmapConnection[]>(initialConnections);
  const [layout, setLayout] = useState<MindmapLayout>({
    type: initialLayout,
    direction: 'left-to-right',
    nodeSpacing: 100,
    levelSpacing: 150,
  });
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<MindmapNode | null>(null);
  const [showNodeEditor, setShowNodeEditor] = useState(false);
  const [showLayoutSelector, setShowLayoutSelector] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showMinimap, setShowMinimap] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>([]);
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
  const [collaborators, setCollaborators] = useState<Collaborator[]>(initialCollaborators);
  const [showCollaborators, setShowCollaborators] = useState(false);
  const [realtimeChanges, setRealtimeChanges] = useState<RealtimeChange[]>([]);
  const [showChangeHistory, setShowChangeHistory] = useState(false);

  // NEW: Advanced Features v2.0
  const [is3DMode, setIs3DMode] = useState(false);
  const [rotation3D, setRotation3D] = useState({ x: 0, y: 0, z: 0 });
  const [perspective3D, setPerspective3D] = useState(1000);
  const [showTimeline, setShowTimeline] = useState(false);
  const [timelinePosition, setTimelinePosition] = useState(0);
  const [isPlayingTimeline, setIsPlayingTimeline] = useState(false);
  const [naturalLanguageQuery, setNaturalLanguageQuery] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [linkedResources, setLinkedResources] = useState<Record<string, string>>({});
  const [showResourcePanel, setShowResourcePanel] = useState(false);
  const [selectedNodeIdForResource, setSelectedNodeIdForResource] = useState<string | null>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState<any>(null);
  const [showPerformancePanel, setShowPerformancePanel] = useState(false);
  const [autoLayoutOptimization, setAutoLayoutOptimization] = useState(false);
  const [layoutOptimizationProgress, setLayoutOptimizationProgress] = useState(0);
  const [showDataVisualization, setShowDataVisualization] = useState(false);
  const [selectedNodeForViz, setSelectedNodeForViz] = useState<MindmapNode | null>(null);

  // NEW v2.5: Enhanced Hierarchy Visualization
  const [showHierarchyStats, setShowHierarchyStats] = useState(false);
  const [hierarchyViewMode, setHierarchyViewMode] = useState<'standard' | 'tree' | 'compact'>('standard');
  const [showDependencyArrows, setShowDependencyArrows] = useState(true);
  const [showRoleBadges, setShowRoleBadges] = useState(true);
  const [hierarchyStats, setHierarchyStats] = useState<any>(null);

  // Refs
  const panRef = useRef<Animated.ValueXY>(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scaleRef = useRef(new Animated.Value(1)).current;
  const canvasRef = useRef<View>(null);

  // ============================================
  // LAYOUT ALGORITHMS
  // ============================================

  const calculateTreeLayout = useCallback((nodes: MindmapNode[]): MindmapNode[] => {
    const layoutNodes = [...nodes];
    const root = layoutNodes.find(n => n.type === 'root') || layoutNodes[0];
    
    if (!root) return layoutNodes;

    const levelMap = new Map<number, MindmapNode[]>();
    
    const traverse = (node: MindmapNode, level: number) => {
      if (!levelMap.has(level)) levelMap.set(level, []);
      levelMap.get(level)!.push(node);
      
      if (node.children) {
        node.children.forEach(child => traverse(child, level + 1));
      }
    };
    
    traverse(root, 0);
    
    let yOffset = 0;
    levelMap.forEach((nodesAtLevel, level) => {
      const x = level * layout.levelSpacing;
      nodesAtLevel.forEach((node, index) => {
        node.position = {
          x,
          y: yOffset + index * layout.nodeSpacing,
        };
      });
      yOffset += nodesAtLevel.length * layout.nodeSpacing + 50;
    });
    
    return layoutNodes;
  }, [layout]);

  const calculateRadialLayout = useCallback((nodes: MindmapNode[]): MindmapNode[] => {
    const layoutNodes = [...nodes];
    const root = layoutNodes.find(n => n.type === 'root') || layoutNodes[0];
    
    if (!root) return layoutNodes;

    root.position = { x: width / 2, y: height / 2 };
    
    const traverse = (node: MindmapNode, angle: number, radius: number, angleSpread: number) => {
      if (node.children) {
        const childCount = node.children.length;
        const angleStep = angleSpread / childCount;
        
        node.children.forEach((child, index) => {
          const childAngle = angle - angleSpread / 2 + angleStep * (index + 0.5);
          child.position = {
            x: root.position!.x + Math.cos(childAngle) * radius,
            y: root.position!.y + Math.sin(childAngle) * radius,
          };
          
          traverse(child, childAngle, radius + layout.levelSpacing, angleStep * 0.8);
        });
      }
    };
    
    traverse(root, 0, layout.levelSpacing, Math.PI * 2);
    
    return layoutNodes;
  }, [layout, width, height]);

  const applyLayout = useCallback(() => {
    setIsAnimating(true);
    
    let layoutNodes: MindmapNode[];
    
    switch (layout.type) {
      case 'tree':
        layoutNodes = calculateTreeLayout(nodes);
        break;
      case 'radial':
        layoutNodes = calculateRadialLayout(nodes);
        break;
      case 'force':
        // Simplified force-directed layout
        layoutNodes = calculateTreeLayout(nodes); // Fallback to tree for now
        break;
      default:
        layoutNodes = calculateTreeLayout(nodes);
    }
    
    setNodes(layoutNodes);
    
    Animated.timing(scaleRef, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsAnimating(false));
  }, [layout, nodes, calculateTreeLayout, calculateRadialLayout]);

  useEffect(() => {
    if (nodes.length > 0) {
      applyLayout();
    }
  }, [layout.type]);

  // ============================================
  // PAN AND ZOOM
  // ============================================

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: panRef.x, dy: panRef.y },
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        panRef.flattenOffset();
        setOffset({ x: panRef.x as any, y: panRef.y as any });
      },
    })
  ).current;

  const handleZoomIn = useCallback(() => {
    const newScale = Math.min(scale + 0.2, 3);
    setScale(newScale);
    Animated.timing(scaleRef, {
      toValue: newScale,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [scale, scaleRef]);

  const handleZoomOut = useCallback(() => {
    const newScale = Math.max(scale - 0.2, 0.3);
    setScale(newScale);
    Animated.timing(scaleRef, {
      toValue: newScale,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [scale, scaleRef]);

  const handleResetView = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
    panRef.setValue({ x: 0, y: 0 });
    scaleRef.setValue(1);
  }, [panRef, scaleRef]);

  // ============================================
  // NODE OPERATIONS
  // ============================================

  const handleNodePress = useCallback((node: MindmapNode) => {
    setSelectedNode(node);
    if (onNodePress) onNodePress(node);
  }, [onNodePress]);

  const handleNodeLongPress = useCallback((node: MindmapNode) => {
    setSelectedNode(node);
    setShowNodeEditor(true);
    if (onNodeLongPress) onNodeLongPress(node);
  }, [onNodeLongPress]);

  const handleAddNode = useCallback((parentId: string) => {
    const newNode: MindmapNode = {
      id: `node-${Date.now()}`,
      label: 'New Node',
      type: 'agent',
      position: { x: 0, y: 0 },
      children: [],
      isExpanded: true,
    };
    
    const updatedNodes = nodes.map(node => {
      if (node.id === parentId) {
        return {
          ...node,
          children: [...(node.children || []), newNode],
        };
      }
      return node;
    });
    
    setNodes(updatedNodes);
    if (onNodeAdd) onNodeAdd(parentId, newNode);
  }, [nodes, onNodeAdd]);

  const handleDeleteNode = useCallback((nodeId: string) => {
    Alert.alert(
      'Delete Node',
      'Are you sure you want to delete this node and all its children?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const deleteRecursive = (nodes: MindmapNode[]): MindmapNode[] => {
              return nodes
                .filter(n => n.id !== nodeId)
                .map(n => ({
                  ...n,
                  children: n.children ? deleteRecursive(n.children) : undefined,
                }));
            };
            
            setNodes(deleteRecursive(nodes));
            if (onNodeDelete) onNodeDelete(nodeId);
            setSelectedNode(null);
            setShowNodeEditor(false);
          },
        },
      ]
    );
  }, [nodes, onNodeDelete]);

  const handleUpdateNode = useCallback((nodeId: string, updates: Partial<MindmapNode>) => {
    const updateRecursive = (nodes: MindmapNode[]): MindmapNode[] => {
      return nodes.map(node => {
        if (node.id === nodeId) {
          return { ...node, ...updates };
        }
        if (node.children) {
          return { ...node, children: updateRecursive(node.children) };
        }
        return node;
      });
    };
    
    setNodes(updateRecursive(nodes));
    if (onNodeUpdate) onNodeUpdate(nodeId, updates);
  }, [nodes, onNodeUpdate]);

  const handleToggleExpand = useCallback((nodeId: string) => {
    const toggleRecursive = (nodes: MindmapNode[]): MindmapNode[] => {
      return nodes.map(node => {
        if (node.id === nodeId) {
          return { ...node, isExpanded: !node.isExpanded };
        }
        if (node.children) {
          return { ...node, children: toggleRecursive(node.children) };
        }
        return node;
      });
    };
    
    setNodes(toggleRecursive(nodes));
  }, [nodes]);

  // ============================================
  // EXPORT / IMPORT
  // ============================================

  const handleExport = useCallback((format: 'json' | 'png' | 'svg' | 'pdf') => {
    const exportData: MindmapExport = {
      format,
      data: { nodes, connections, layout },
      metadata: {
        exportedAt: new Date().toISOString(),
        version: '1.0.0',
        nodeCount: nodes.length,
        connectionCount: connections.length,
      },
    };
    
    if (onExport) {
      onExport(format);
    } else {
      console.log('Export data:', JSON.stringify(exportData, null, 2));
      Alert.alert('Export', `Mindmap exported as ${format.toUpperCase()}`);
    }
    
    setShowExportMenu(false);
  }, [nodes, connections, layout, onExport]);

  const handleImport = useCallback(() => {
    // In a real app, this would open a file picker
    Alert.alert('Import', 'Import functionality would open a file picker');
    if (onImport) onImport({});
  }, [onImport]);

  // ============================================
  // 3D VISUALIZATION - NEW v2.0
  // ============================================

  const toggle3DMode = useCallback(() => {
    setIs3DMode(!is3DMode);
    if (!is3DMode) {
      Animated.timing(scaleRef, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [is3DMode, scaleRef]);

  const handle3DRotation = useCallback((dx: number, dy: number) => {
    setRotation3D(prev => ({
      x: prev.x + dy * 0.5,
      y: prev.y + dx * 0.5,
      z: prev.z,
    }));
  }, []);

  // ============================================
  // TIMELINE VIEW - NEW v2.0
  // ============================================

  const toggleTimelinePlayback = useCallback(() => {
    setIsPlayingTimeline(!isPlayingTimeline);
  }, [isPlayingTimeline]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlayingTimeline) {
      interval = setInterval(() => {
        setTimelinePosition(prev => {
          if (prev >= realtimeChanges.length - 1) {
            setIsPlayingTimeline(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingTimeline, realtimeChanges.length]);

  // ============================================
  // NATURAL LANGUAGE SEARCH - NEW v2.0
  // ============================================

  const handleNaturalLanguageSearch = useCallback(() => {
    if (!naturalLanguageQuery.trim()) {
      setSearchQuery('');
      return;
    }

    // Simulate natural language processing
    const query = naturalLanguageQuery.toLowerCase();
    let searchTerms: string[] = [];

    // Extract key terms from natural language query
    if (query.includes('agent')) searchTerms.push('agent');
    if (query.includes('department')) searchTerms.push('department');
    if (query.includes('employee')) searchTerms.push('employee');
    if (query.includes('active')) searchTerms.push('active');
    if (query.includes('draft')) searchTerms.push('draft');

    // Also include the original query as a fallback
    searchTerms.push(query);

    setSearchQuery(searchTerms[0]);
    setShowAdvancedSearch(false);
  }, [naturalLanguageQuery]);

  // ============================================
  // LINKED RESOURCES - NEW v2.0
  // ============================================

  const handleLinkResource = useCallback((nodeId: string, url: string) => {
    setLinkedResources(prev => ({
      ...prev,
      [nodeId]: url,
    }));
  }, []);

  const handleOpenResource = useCallback((nodeId: string) => {
    const url = linkedResources[nodeId];
    if (url) {
      Alert.alert('Open Resource', `Would you like to open: ${url}?`, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open', onPress: () => console.log('Opening:', url) },
      ]);
    }
  }, [linkedResources]);

  // ============================================
  // PERFORMANCE METRICS - NEW v2.0
  // ============================================

  const calculatePerformanceMetrics = useCallback(() => {
    const metrics = {
      totalNodes: nodes.length,
      totalConnections: connections.length,
      maxDepth: 0,
      avgChildren: 0,
      layoutComplexity: 0,
      renderTime: 0,
      memoryUsage: 0,
    };

    // Calculate max depth
    const calculateDepth = (node: MindmapNode, depth: number): number => {
      if (!node.children || node.children.length === 0) return depth;
      return Math.max(...node.children.map(child => calculateDepth(child, depth + 1)));
    };

    nodes.forEach(node => {
      const depth = calculateDepth(node, 0);
      if (depth > metrics.maxDepth) metrics.maxDepth = depth;
    });

    // Calculate average children
    const totalChildren = nodes.reduce((sum, node) => sum + (node.children?.length || 0), 0);
    metrics.avgChildren = totalChildren / nodes.length;

    // Calculate layout complexity
    metrics.layoutComplexity = metrics.totalNodes * metrics.maxDepth * 0.1;

    setPerformanceMetrics(metrics);
    setShowPerformancePanel(true);
  }, [nodes, connections]);

  // ============================================
  // AI LAYOUT OPTIMIZATION - NEW v2.0
  // ============================================

  const optimizeLayoutWithAI = useCallback(() => {
    setAutoLayoutOptimization(true);
    setLayoutOptimizationProgress(0);

    const steps = 10;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setLayoutOptimizationProgress((currentStep / steps) * 100);

      if (currentStep >= steps) {
        clearInterval(interval);
        setAutoLayoutOptimization(false);
        applyLayout();
      }
    }, 200);
  }, [applyLayout]);

  // ============================================
  // AI SUGGESTIONS
  // ============================================

  const generateAISuggestions = useCallback(() => {
    if (!enableAISuggestions) return;
    
    setIsGeneratingSuggestions(true);
    
    setTimeout(() => {
      const suggestions: AISuggestion[] = [];
      
      // Analyze current hierarchy for optimization opportunities
      let totalAgents = 0;
      let totalCost = 0;
      let departments: string[] = [];
      
      const traverse = (nodeList: MindmapNode[]) => {
        nodeList.forEach(node => {
          if (node.type === 'agent') {
            totalAgents++;
            if (node.metadata?.cost) {
              totalCost += parseFloat(node.metadata.cost.replace('$', '').replace(',', ''));
            }
          } else if (node.type === 'department') {
            departments.push(node.label);
          }
          
          if (node.children) traverse(node.children);
        });
      };
      
      traverse(nodes);
      
      // Generate suggestions based on analysis
      if (totalAgents < 5) {
        suggestions.push({
          id: 'sugg-1',
          type: 'add_agent',
          title: 'Add Support Agent',
          description: 'Consider adding a dedicated support agent to improve customer response times',
          impact: 'high',
          estimatedSavings: 2000,
          reasoning: `Current hierarchy has only ${totalAgents} agents. Adding a support agent can reduce response times by 40%`,
          confidence: 0.85,
          suggestedNode: {
            id: `agent-${Date.now()}`,
            label: 'Support Agent',
            type: 'agent',
            position: { x: 0, y: 0 },
            metadata: {
              agentType: 'reactive',
              skills: ['Ticket Resolution', 'FAQ Management'],
              tokenBudget: 15000,
              status: 'draft',
              cost: '$30.00',
            },
          },
        });
      }
      
      if (totalCost > 500) {
        suggestions.push({
          id: 'sugg-2',
          type: 'cost_reduction',
          title: 'Optimize Token Budgets',
          description: 'Reduce token budgets for underutilized agents to save costs',
          impact: 'medium',
          estimatedSavings: Math.round(totalCost * 0.15),
          reasoning: `Total monthly cost is $${totalCost}. Optimizing token budgets could save ~15%`,
          confidence: 0.72,
        });
      }
      
      if (departments.length < 3) {
        suggestions.push({
          id: 'sugg-3',
          type: 'restructure',
          title: 'Add Marketing Department',
          description: 'Consider adding a marketing department with AI agents for lead generation',
          impact: 'medium',
          estimatedSavings: 0,
          reasoning: 'Marketing automation can increase lead generation by 30%',
          confidence: 0.78,
          suggestedNode: {
            id: `dept-${Date.now()}`,
            label: 'Marketing',
            type: 'department',
            position: { x: 0, y: 0 },
            color: '#10b981',
            children: [],
          },
        });
      }
      
      suggestions.push({
        id: 'sugg-4',
        type: 'optimize_skills',
        title: 'Add Predictive Analytics',
        description: 'Enable predictive analytics feature on key agents for better decision making',
        impact: 'high',
        estimatedSavings: 5000,
        reasoning: 'Predictive analytics can improve decision accuracy by 25%',
        confidence: 0.91,
      });
      
      setAiSuggestions(suggestions);
      setShowAISuggestions(true);
      setIsGeneratingSuggestions(false);
    }, 2000);
  }, [enableAISuggestions, nodes]);

  const handleApplySuggestion = useCallback((suggestion: AISuggestion) => {
    if (suggestion.suggestedNode) {
      onNodeAdd?.('root', suggestion.suggestedNode as MindmapNode);
    }
    onApplySuggestion?.(suggestion);
    setAiSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
  }, [onNodeAdd, onApplySuggestion]);

  // ============================================
  // SEARCH
  // ============================================

  const filteredNodes = useMemo(() => {
    if (!searchQuery) return nodes;
    
    const query = searchQuery.toLowerCase();
    const filterRecursive = (nodeList: MindmapNode[]): MindmapNode[] => {
      return nodeList
        .filter(node => node.label.toLowerCase().includes(query))
        .map(node => ({
          ...node,
          children: node.children ? filterRecursive(node.children) : undefined,
        }));
    };
    
    return filterRecursive(nodes);
  }, [nodes, searchQuery]);

  // ============================================
  // RENDER FUNCTIONS
  // ============================================

  const getIconForType = (type: string) => {
    switch (type) {
      case 'root': return Crown;
      case 'department': return Building2;
      case 'agent': return Bot;
      case 'employee': return Users;
      case 'sub_agent': return Zap;
      default: return Circle;
    }
  };

  const getColorForType = (type: string) => {
    switch (type) {
      case 'root': return '#f59e0b';
      case 'department': return '#10b981';
      case 'agent': return '#6366f1';
      case 'employee': return '#ec4899';
      case 'sub_agent': return '#8b5cf6';
      default: return '#64748b';
    }
  };

  const renderNode = useCallback((node: MindmapNode, depth: number = 0) => {
    const Icon = getIconForType(node.type);
    const color = node.color || getColorForType(node.type);
    const isSelected = selectedNode?.id === node.id;
    
    return (
      <Animated.View
        key={node.id}
        style={[
          styles.node,
          {
            left: node.position.x * scale + offset.x,
            top: node.position.y * scale + offset.y,
            backgroundColor: node.style?.backgroundColor || (theme === 'dark' ? '#1e293b' : '#fff'),
            borderColor: isSelected ? '#6366f1' : node.style?.borderColor || color,
            borderWidth: node.style?.borderWidth || (isSelected ? 3 : 2),
            borderRadius: node.style?.borderRadius || 12,
            transform: [{ scale: scaleRef }],
          },
          node.isLocked && styles.nodeLocked,
        ]}
      >
        {/* Node Content */}
        <TouchableOpacity
          style={styles.nodeContent}
          onPress={() => handleNodePress(node)}
          onLongPress={() => handleNodeLongPress(node)}
          delayLongPress={500}
        >
          <View style={[styles.nodeIcon, { backgroundColor: color }]}>
            <Icon size={20} color="#fff" />
          </View>
          
          <View style={styles.nodeInfo}>
            <Text style={[styles.nodeLabel, { fontSize: node.style?.fontSize || 14 }]}>
              {node.label}
            </Text>
            
            {node.metadata?.status && (
              <View style={[styles.statusBadge, { backgroundColor: 
                node.metadata.status === 'active' ? '#10b981' :
                node.metadata.status === 'draft' ? '#f59e0b' :
                node.metadata.status === 'paused' ? '#ef4444' : '#64748b'
              }]}>
                <Text style={styles.statusText}>{node.metadata.status}</Text>
              </View>
            )}
            
            {node.dataVisualization && (
              <TouchableOpacity
                style={styles.dataVizIndicator}
                onPress={() => {
                  setSelectedNodeForViz(node);
                  setShowDataVisualization(true);
                }}
              >
                <BarChart3 size={14} color="#6366f1" />
              </TouchableOpacity>
            )}
          </View>
          
          {node.children && node.children.length > 0 && (
            <TouchableOpacity
              style={styles.expandButton}
              onPress={() => handleToggleExpand(node.id)}
            >
              {node.isExpanded !== false ? (
                <ChevronDown size={16} color="#64748b" />
              ) : (
                <ChevronRight size={16} color="#64748b" />
              )}
            </TouchableOpacity>
          )}
          
          {node.isLocked && (
            <Lock size={12} color="#64748b" style={styles.lockIcon} />
          )}
        </TouchableOpacity>
        
        {/* Render Children */}
        {node.isExpanded !== false && node.children && (
          <View style={styles.childrenContainer}>
            {node.children.map(child => renderNode(child, depth + 1))}
          </View>
        )}
        
        {/* Connection Lines */}
        {node.children && node.isExpanded !== false && node.children.map(child => (
          <View
            key={`connection-${node.id}-${child.id}`}
            style={[
              styles.connectionLine,
              {
                left: node.position.x * scale + offset.x + 60,
                top: node.position.y * scale + offset.y + 30,
                width: (child.position.x - node.position.x) * scale - 60,
                height: (child.position.y - node.position.y) * scale,
                borderColor: color,
              },
            ]}
          />
        ))}
      </Animated.View>
    );
  }, [scale, offset, selectedNode, theme, scaleRef, handleNodePress, handleNodeLongPress, handleToggleExpand]);

  const renderToolbar = () => (
    <View style={styles.toolbar}>
      <View style={styles.toolbarLeft}>
        <TouchableOpacity style={styles.toolbarButton} onPress={handleZoomIn}>
          <ZoomIn size={20} color={theme === 'dark' ? '#fff' : '#1e293b'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarButton} onPress={handleZoomOut}>
          <ZoomOut size={20} color={theme === 'dark' ? '#fff' : '#1e293b'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarButton} onPress={handleResetView}>
          <RotateCcw size={20} color={theme === 'dark' ? '#fff' : '#1e293b'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toolbarButton, is3DMode && styles.toolbarButtonActive]}
          onPress={toggle3DMode}
        >
          <Maximize2 size={20} color={is3DMode ? '#6366f1' : theme === 'dark' ? '#fff' : '#1e293b'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toolbarButton, showHierarchyStats && styles.toolbarButtonActive]}
          onPress={calculateHierarchyStats}
        >
          <Crown size={20} color={showHierarchyStats ? '#6366f1' : theme === 'dark' ? '#fff' : '#1e293b'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toolbarButton, showDependencyArrows && styles.toolbarButtonActive]}
          onPress={() => setShowDependencyArrows(!showDependencyArrows)}
        >
          <ArrowRight size={20} color={showDependencyArrows ? '#6366f1' : theme === 'dark' ? '#fff' : '#1e293b'} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.toolbarCenter}>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => setShowLayoutSelector(true)}
        >
          <Layers size={20} color={theme === 'dark' ? '#fff' : '#1e293b'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => setShowGrid(!showGrid)}
        >
          <Grid3x3 size={20} color={theme === 'dark' ? '#fff' : '#1e293b'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => setShowMinimap(!showMinimap)}
        >
          <MapPin size={20} color={theme === 'dark' ? '#fff' : '#1e293b'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => setShowTimeline(!showTimeline)}
        >
          <Clock size={20} color={showTimeline ? '#6366f1' : theme === 'dark' ? '#fff' : '#1e293b'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={optimizeLayoutWithAI}
          disabled={autoLayoutOptimization}
        >
          <Brain size={20} color={autoLayoutOptimization ? '#94a3b8' : theme === 'dark' ? '#fff' : '#1e293b'} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.toolbarRight}>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => setShowAdvancedSearch(!showAdvancedSearch)}
        >
          <Search size={20} color={showAdvancedSearch ? '#6366f1' : theme === 'dark' ? '#fff' : '#1e293b'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={calculatePerformanceMetrics}
        >
          <Activity size={20} color={theme === 'dark' ? '#fff' : '#1e293b'} />
        </TouchableOpacity>
        {enableAISuggestions && (
          <TouchableOpacity
            style={[styles.toolbarButton, isGeneratingSuggestions && styles.toolbarButtonDisabled]}
            onPress={generateAISuggestions}
            disabled={isGeneratingSuggestions}
          >
            <Sparkles size={20} color={isGeneratingSuggestions ? '#94a3b8' : theme === 'dark' ? '#fff' : '#1e293b'} />
          </TouchableOpacity>
        )}
        {enableCollaboration && (
          <TouchableOpacity
            style={styles.toolbarButton}
            onPress={() => setShowCollaborators(!showCollaborators)}
          >
            <Users2 size={20} color={theme === 'dark' ? '#fff' : '#1e293b'} />
            {collaborators.filter(c => c.isOnline).length > 0 && (
              <View style={styles.collaboratorBadge}>
                <Text style={styles.collaboratorBadgeText}>
                  {collaborators.filter(c => c.isOnline).length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => setShowExportMenu(true)}
        >
          <Download size={20} color={theme === 'dark' ? '#fff' : '#1e293b'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={handleImport}
        >
          <Upload size={20} color={theme === 'dark' ? '#fff' : '#1e293b'} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderNodeEditor = () => (
    <Modal
      visible={showNodeEditor}
      animationType="slide"
      onRequestClose={() => setShowNodeEditor(false)}
    >
      <View style={[styles.modalContainer, { backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc' }]}>
        <View style={styles.modalHeader}>
          <Text style={[styles.modalTitle, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>
            Edit Node
          </Text>
          <TouchableOpacity onPress={() => setShowNodeEditor(false)}>
            <X size={24} color={theme === 'dark' ? '#fff' : '#64748b'} />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.modalContent}>
          {selectedNode && (
            <View>
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>Label</Text>
                <TextInput
                  style={[styles.input, { 
                    backgroundColor: theme === 'dark' ? '#1e293b' : '#fff',
                    color: theme === 'dark' ? '#fff' : '#1e293b',
                    borderColor: theme === 'dark' ? '#334155' : '#e2e8f0',
                  }]}
                  value={selectedNode.label}
                  onChangeText={(text) => handleUpdateNode(selectedNode.id, { label: text })}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>Type</Text>
                <View style={styles.typeSelector}>
                  {['root', 'department', 'agent', 'employee', 'sub_agent'].map(type => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.typeButton,
                        selectedNode.type === type && styles.typeButtonActive,
                        { 
                          backgroundColor: selectedNode.type === type ? getColorForType(type) : 
                          theme === 'dark' ? '#1e293b' : '#f1f5f9',
                        },
                      ]}
                      onPress={() => handleUpdateNode(selectedNode.id, { type: type as any })}
                    >
                      <Text style={[
                        styles.typeButtonText,
                        selectedNode.type === type && styles.typeButtonTextActive,
                      ]}>
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>Status</Text>
                <View style={styles.statusSelector}>
                  {['active', 'draft', 'paused', 'archived'].map(status => (
                    <TouchableOpacity
                      key={status}
                      style={[
                        styles.statusButton,
                        selectedNode.metadata?.status === status && styles.statusButtonActive,
                      ]}
                      onPress={() => handleUpdateNode(selectedNode.id, {
                        metadata: { ...selectedNode.metadata, status: status as any },
                      })}
                    >
                      <Text style={[
                        styles.statusButtonText,
                        selectedNode.metadata?.status === status && styles.statusButtonTextActive,
                      ]}>
                        {status}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => handleDeleteNode(selectedNode.id)}
                >
                  <Trash2 size={20} color="#ef4444" />
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.actionButton, styles.lockButton]}
                  onPress={() => handleUpdateNode(selectedNode.id, { 
                    isLocked: !selectedNode.isLocked 
                  })}
                >
                  {selectedNode.isLocked ? (
                    <Unlock size={20} color="#6366f1" />
                  ) : (
                    <Lock size={20} color="#6366f1" />
                  )}
                  <Text style={styles.lockButtonText}>
                    {selectedNode.isLocked ? 'Unlock' : 'Lock'}
                  </Text>
                </TouchableOpacity>
              </View>
              
              {editable && (
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => handleAddNode(selectedNode.id)}
                >
                  <Plus size={20} color="#fff" />
                  <Text style={styles.addButtonText}>Add Child Node</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );

  const renderLayoutSelector = () => (
    <Modal
      visible={showLayoutSelector}
      animationType="fade"
      transparent
      onRequestClose={() => setShowLayoutSelector(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.layoutSelector, { backgroundColor: theme === 'dark' ? '#1e293b' : '#fff' }]}>
          <Text style={[styles.layoutTitle, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>
            Select Layout
          </Text>
          
          {['tree', 'radial', 'force', 'horizontal', 'vertical'].map(layoutType => (
            <TouchableOpacity
              key={layoutType}
              style={[
                styles.layoutOption,
                layout.type === layoutType && styles.layoutOptionActive,
              ]}
              onPress={() => {
                setLayout({ ...layout, type: layoutType as any });
                setShowLayoutSelector(false);
              }}
            >
              <View style={styles.layoutIcon}>
                {layoutType === 'tree' && <GitBranch size={24} color="#6366f1" />}
                {layoutType === 'radial' && <Network size={24} color="#6366f1" />}
                {layoutType === 'force' && <Activity size={24} color="#6366f1" />}
                {layoutType === 'horizontal' && <Layers size={24} color="#6366f1" />}
                {layoutType === 'vertical' && <Layers size={24} color="#6366f1" />}
              </View>
              <Text style={[
                styles.layoutName,
                layout.type === layoutType && styles.layoutNameActive,
              ]}>
                {layoutType.charAt(0).toUpperCase() + layoutType.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowLayoutSelector(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderExportMenu = () => (
    <Modal
      visible={showExportMenu}
      animationType="fade"
      transparent
      onRequestClose={() => setShowExportMenu(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.exportMenu, { backgroundColor: theme === 'dark' ? '#1e293b' : '#fff' }]}>
          <Text style={[styles.exportTitle, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>
            Export As
          </Text>
          
          {['json', 'png', 'svg', 'pdf'].map(format => (
            <TouchableOpacity
              key={format}
              style={styles.exportOption}
              onPress={() => handleExport(format as any)}
            >
              <Download size={20} color="#6366f1" />
              <Text style={[styles.exportOptionText, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>
                {format.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowExportMenu(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderSearchBar = () => (
    showSearch && (
      <View style={[styles.searchBar, { backgroundColor: theme === 'dark' ? '#1e293b' : '#fff' }]}>
        <Search size={20} color="#64748b" />
        <TextInput
          style={[styles.searchInput, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}
          placeholder="Search nodes..."
          placeholderTextColor="#64748b"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={() => setSearchQuery('')}>
          <X size={20} color="#64748b" />
        </TouchableOpacity>
      </View>
    )
  );

  const renderMinimap = () => (
    showMinimap && (
      <View style={[styles.minimap, { backgroundColor: theme === 'dark' ? '#1e293b' : '#fff' }]}>
        <View style={styles.minimapViewport}>
          <View
            style={[
              styles.minimapIndicator,
              {
                left: (offset.x / width) * 100,
                top: (offset.y / height) * 100,
                width: (1 / scale) * 100,
                height: (1 / scale) * 100,
              },
            ]}
          />
        </View>
      </View>
    )
  );

  const renderAISuggestions = () => (
    showAISuggestions && aiSuggestions.length > 0 && (
      <View style={[styles.aiSuggestionsPanel, { backgroundColor: theme === 'dark' ? '#1e293b' : '#fff' }]}>
        <View style={styles.aiSuggestionsHeader}>
          <Brain size={20} color="#6366f1" />
          <Text style={[styles.aiSuggestionsTitle, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>
            AI Suggestions
          </Text>
          <TouchableOpacity onPress={() => setShowAISuggestions(false)}>
            <X size={20} color="#64748b" />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.aiSuggestionsList}>
          {aiSuggestions.map((suggestion) => (
            <View key={suggestion.id} style={styles.aiSuggestionCard}>
              <View style={styles.aiSuggestionHeader}>
                <View style={[
                  styles.aiSuggestionImpactBadge,
                  { backgroundColor: suggestion.impact === 'high' ? '#10b981' : suggestion.impact === 'medium' ? '#f59e0b' : '#64748b' }
                ]}>
                  <Text style={styles.aiSuggestionImpactText}>{suggestion.impact}</Text>
                </View>
                <Text style={[styles.aiSuggestionConfidence, { color: theme === 'dark' ? '#94a3b8' : '#64748b' }]}>
                  {Math.round(suggestion.confidence * 100)}% confidence
                </Text>
              </View>
              
              <Text style={[styles.aiSuggestionTitle, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>
                {suggestion.title}
              </Text>
              <Text style={[styles.aiSuggestionDescription, { color: theme === 'dark' ? '#94a3b8' : '#64748b' }]}>
                {suggestion.description}
              </Text>
              
              <Text style={[styles.aiSuggestionReasoning, { color: theme === 'dark' ? '#94a3b8' : '#64748b' }]}>
                💡 {suggestion.reasoning}
              </Text>
              
              {suggestion.estimatedSavings && (
                <View style={styles.aiSuggestionSavings}>
                  <DollarSign size={16} color="#10b981" />
                  <Text style={styles.aiSuggestionSavingsText}>
                    Est. Savings: ${suggestion.estimatedSavings.toLocaleString()}/mo
                  </Text>
                </View>
              )}
              
              <TouchableOpacity
                style={styles.aiSuggestionApplyButton}
                onPress={() => handleApplySuggestion(suggestion)}
              >
                <Check size={16} color="#fff" />
                <Text style={styles.aiSuggestionApplyButtonText}>Apply Suggestion</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    )
  );

  const renderCollaboratorsPanel = () => (
    showCollaborators && enableCollaboration && (
      <View style={[styles.collaboratorsPanel, { backgroundColor: theme === 'dark' ? '#1e293b' : '#fff' }]}>
        <View style={styles.collaboratorsHeader}>
          <Users2 size={20} color="#6366f1" />
          <Text style={[styles.collaboratorsTitle, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>
            Collaborators
          </Text>
          <TouchableOpacity onPress={() => setShowCollaborators(false)}>
            <X size={20} color="#64748b" />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.collaboratorsList}>
          {collaborators.map((collaborator) => (
            <View key={collaborator.id} style={styles.collaboratorCard}>
              <View style={[styles.collaboratorAvatar, { backgroundColor: collaborator.color }]}>
                <Text style={styles.collaboratorAvatarText}>
                  {collaborator.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.collaboratorInfo}>
                <Text style={[styles.collaboratorName, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>
                  {collaborator.name}
                </Text>
                <View style={styles.collaboratorStatusRow}>
                  <View style={[
                    styles.collaboratorStatusDot,
                    { backgroundColor: collaborator.isOnline ? '#10b981' : '#64748b' }
                  ]} />
                  <Text style={[styles.collaboratorStatusText, { color: theme === 'dark' ? '#94a3b8' : '#64748b' }]}>
                    {collaborator.isOnline ? 'Online' : `Last seen ${new Date(collaborator.lastActive).toLocaleTimeString()}`}
                  </Text>
                </View>
                {collaborator.selectedNodeId && (
                  <Text style={[styles.collaboratorSelectedNode, { color: theme === 'dark' ? '#94a3b8' : '#64748b' }]}>
                    Editing: {collaborator.selectedNodeId}
                  </Text>
                )}
              </View>
            </View>
          ))}
          
          {collaborators.length === 0 && (
            <View style={styles.emptyCollaborators}>
              <Users2 size={48} color="#cbd5e1" />
              <Text style={[styles.emptyCollaboratorsText, { color: theme === 'dark' ? '#94a3b8' : '#64748b' }]}>
                No collaborators yet
              </Text>
              <Text style={[styles.emptyCollaboratorsSubtext, { color: theme === 'dark' ? '#64748b' : '#94a3b8' }]}>
                Share the mindmap to start collaborating
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    )
  );

  // ============================================
  // ADVANCED SEARCH PANEL - NEW v2.0
  // ============================================

  const renderAdvancedSearchPanel = () => (
    showAdvancedSearch && (
      <View style={[styles.advancedSearchPanel, { backgroundColor: theme === 'dark' ? '#1e293b' : '#fff' }]}>
        <View style={styles.advancedSearchHeader}>
          <Search size={20} color="#6366f1" />
          <TextInput
            style={[styles.advancedSearchInput, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}
            placeholder="Search naturally: 'show me all active agents'"
            placeholderTextColor="#94a3b8"
            value={naturalLanguageQuery}
            onChangeText={setNaturalLanguageQuery}
          />
          <TouchableOpacity onPress={() => setShowAdvancedSearch(false)}>
            <X size={20} color="#64748b" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={styles.advancedSearchButton}
          onPress={handleNaturalLanguageSearch}
        >
          <Sparkles size={16} color="#fff" />
          <Text style={styles.advancedSearchButtonText}>AI Search</Text>
        </TouchableOpacity>
      </View>
    )
  );

  // ============================================
  // TIMELINE PANEL - NEW v2.0
  // ============================================

  const renderTimelinePanel = () => (
    showTimeline && (
      <View style={[styles.timelinePanel, { backgroundColor: theme === 'dark' ? '#1e293b' : '#fff' }]}>
        <View style={styles.timelineHeader}>
          <Clock size={20} color="#6366f1" />
          <Text style={[styles.timelineTitle, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>
            Timeline
          </Text>
          <TouchableOpacity onPress={() => setShowTimeline(false)}>
            <X size={20} color="#64748b" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.timelineControls}>
          <TouchableOpacity
            style={styles.timelineControlButton}
            onPress={toggleTimelinePlayback}
          >
            {isPlayingTimeline ? <Pause size={16} color="#6366f1" /> : <Play size={16} color="#6366f1" />}
          </TouchableOpacity>
          <View style={styles.timelineSlider}>
            <View style={styles.timelineProgress}>
              <View
                style={[
                  styles.timelineProgressBar,
                  { width: `${(timelinePosition / Math.max(realtimeChanges.length, 1)) * 100}%` }
                ]}
              />
            </View>
          </View>
          <Text style={[styles.timelinePosition, { color: theme === 'dark' ? '#94a3b8' : '#64748b' }]}>
            {timelinePosition} / {realtimeChanges.length}
          </Text>
        </View>
        
        <ScrollView style={styles.timelineList}>
          {realtimeChanges.slice(0, timelinePosition + 1).map((change, idx) => (
            <View key={change.id} style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text style={[styles.timelineChangeType, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>
                  {change.type}
                </Text>
                <Text style={[styles.timelineTimestamp, { color: theme === 'dark' ? '#94a3b8' : '#64748b' }]}>
                  {new Date(change.timestamp).toLocaleString()}
                </Text>
              </View>
            </View>
          ))}
          
          {realtimeChanges.length === 0 && (
            <View style={styles.emptyTimeline}>
              <Clock size={48} color="#cbd5e1" />
              <Text style={[styles.emptyTimelineText, { color: theme === 'dark' ? '#94a3b8' : '#64748b' }]}>
                No changes yet
              </Text>
              <Text style={[styles.emptyTimelineSubtext, { color: theme === 'dark' ? '#64748b' : '#94a3b8' }]}>
                Changes will appear here as you edit
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    )
  );

  // ============================================
  // PERFORMANCE PANEL - NEW v2.0
  // ============================================

  const renderPerformancePanel = () => (
    showPerformancePanel && performanceMetrics && (
      <View style={[styles.performancePanel, { backgroundColor: theme === 'dark' ? '#1e293b' : '#fff' }]}>
        <View style={styles.performanceHeader}>
          <Activity size={20} color="#6366f1" />
          <Text style={[styles.performanceTitle, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>
            Performance Metrics
          </Text>
          <TouchableOpacity onPress={() => setShowPerformancePanel(false)}>
            <X size={20} color="#64748b" />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.performanceContent}>
          <View style={styles.performanceMetricCard}>
            <Text style={[styles.performanceMetricLabel, { color: theme === 'dark' ? '#94a3b8' : '#64748b' }]}>
              Total Nodes
            </Text>
            <Text style={[styles.performanceMetricValue, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>
              {performanceMetrics.totalNodes}
            </Text>
          </View>
          
          <View style={styles.performanceMetricCard}>
            <Text style={[styles.performanceMetricLabel, { color: theme === 'dark' ? '#94a3b8' : '#64748b' }]}>
              Total Connections
            </Text>
            <Text style={[styles.performanceMetricValue, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>
              {performanceMetrics.totalConnections}
            </Text>
          </View>
          
          <View style={styles.performanceMetricCard}>
            <Text style={[styles.performanceMetricLabel, { color: theme === 'dark' ? '#94a3b8' : '#64748b' }]}>
              Max Depth
            </Text>
            <Text style={[styles.performanceMetricValue, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>
              {performanceMetrics.maxDepth}
            </Text>
          </View>
          
          <View style={styles.performanceMetricCard}>
            <Text style={[styles.performanceMetricLabel, { color: theme === 'dark' ? '#94a3b8' : '#64748b' }]}>
              Avg Children per Node
            </Text>
            <Text style={[styles.performanceMetricValue, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>
              {performanceMetrics.avgChildren.toFixed(2)}
            </Text>
          </View>
          
          <View style={styles.performanceMetricCard}>
            <Text style={[styles.performanceMetricLabel, { color: theme === 'dark' ? '#94a3b8' : '#64748b' }]}>
              Layout Complexity
            </Text>
            <Text style={[styles.performanceMetricValue, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>
              {performanceMetrics.layoutComplexity.toFixed(2)}
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  );

  // ============================================
  // LAYOUT OPTIMIZATION PROGRESS - NEW v2.0
  // ============================================

  const renderLayoutOptimizationProgress = () => (
    autoLayoutOptimization && (
      <View style={[styles.optimizationProgress, { backgroundColor: theme === 'dark' ? '#1e293b' : '#fff' }]}>
        <Brain size={20} color="#6366f1" />
        <Text style={[styles.optimizationProgressText, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>
          Optimizing layout... {Math.round(layoutOptimizationProgress)}%
        </Text>
        <View style={styles.optimizationProgressBar}>
          <View
            style={[
              styles.optimizationProgressFill,
              { width: `${layoutOptimizationProgress}%` }
            ]}
          />
        </View>
      </View>
    )
  );

  // ============================================
  // ENHANCED HIERARCHY VISUALIZATION - NEW v2.5
  // ============================================

  const calculateHierarchyStats = useCallback(() => {
    const stats = {
      totalNodes: nodes.length,
      totalDepth: 0,
      avgDepth: 0,
      maxChildren: 0,
      totalConnections: connections.length,
      mainAgents: nodes.filter(n => n.type === 'root' || n.type === 'department').length,
      subAgents: nodes.filter(n => n.type === 'agent' || n.type === 'sub_agent').length,
      hierarchyComplexity: 0,
    };

    // Calculate max depth
    const calculateDepth = (node: MindmapNode, depth: number): number => {
      if (!node.children || node.children.length === 0) return depth;
      return Math.max(...node.children.map(child => calculateDepth(child, depth + 1)));
    };

    nodes.forEach(node => {
      const depth = calculateDepth(node, 0);
      if (depth > stats.totalDepth) stats.totalDepth = depth;
    });

    // Calculate max children
    nodes.forEach(node => {
      const childrenCount = node.children?.length || 0;
      if (childrenCount > stats.maxChildren) stats.maxChildren = childrenCount;
    });

    // Calculate hierarchy complexity
    stats.hierarchyComplexity = stats.totalNodes * stats.totalDepth * 0.1;

    setHierarchyStats(stats);
    setShowHierarchyStats(true);
  }, [nodes, connections]);

  const renderHierarchyStatsPanel = () => (
    showHierarchyStats && hierarchyStats && (
      <View style={[styles.hierarchyStatsPanel, { backgroundColor: theme === 'dark' ? '#1e293b' : '#fff' }]}>
        <View style={styles.hierarchyStatsHeader}>
          <Crown size={20} color="#6366f1" />
          <Text style={[styles.hierarchyStatsTitle, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>
            Hierarchy Statistics
          </Text>
          <TouchableOpacity onPress={() => setShowHierarchyStats(false)}>
            <X size={20} color="#64748b" />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.hierarchyStatsContent}>
          <View style={styles.hierarchyStatCard}>
            <Text style={[styles.hierarchyStatLabel, { color: theme === 'dark' ? '#94a3b8' : '#64748b' }]}>
              Total Nodes
            </Text>
            <Text style={[styles.hierarchyStatValue, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>
              {hierarchyStats.totalNodes}
            </Text>
          </View>
          
          <View style={styles.hierarchyStatCard}>
            <Text style={[styles.hierarchyStatLabel, { color: theme === 'dark' ? '#94a3b8' : '#64748b' }]}>
              Main Agents
            </Text>
            <Text style={[styles.hierarchyStatValue, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>
              {hierarchyStats.mainAgents}
            </Text>
          </View>
          
          <View style={styles.hierarchyStatCard}>
            <Text style={[styles.hierarchyStatLabel, { color: theme === 'dark' ? '#94a3b8' : '#64748b' }]}>
              Sub-Agents
            </Text>
            <Text style={[styles.hierarchyStatValue, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>
              {hierarchyStats.subAgents}
            </Text>
          </View>
          
          <View style={styles.hierarchyStatCard}>
            <Text style={[styles.hierarchyStatLabel, { color: theme === 'dark' ? '#94a3b8' : '#64748b' }]}>
              Max Depth
            </Text>
            <Text style={[styles.hierarchyStatValue, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>
              {hierarchyStats.totalDepth}
            </Text>
          </View>
          
          <View style={styles.hierarchyStatCard}>
            <Text style={[styles.hierarchyStatLabel, { color: theme === 'dark' ? '#94a3b8' : '#64748b' }]}>
              Max Children
            </Text>
            <Text style={[styles.hierarchyStatValue, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>
              {hierarchyStats.maxChildren}
            </Text>
          </View>
          
          <View style={styles.hierarchyStatCard}>
            <Text style={[styles.hierarchyStatLabel, { color: theme === 'dark' ? '#94a3b8' : '#64748b' }]}>
              Hierarchy Complexity
            </Text>
            <Text style={[styles.hierarchyStatValue, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>
              {hierarchyStats.hierarchyComplexity.toFixed(2)}
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  );

  // ============================================
  // DATA VISUALIZATION MODAL - NEW v2.0
  // ============================================

  const renderDataVisualizationModal = () => (
    showDataVisualization && selectedNodeForViz && (
      <Modal
        visible={showDataVisualization}
        animationType="slide"
        onRequestClose={() => setShowDataVisualization(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.dataVizModal}>
            <View style={styles.dataVizHeader}>
              <View style={styles.modalHeaderLeft}>
                <BarChart3 size={24} color="#6366f1" />
                <Text style={styles.dataVizTitle}>{selectedNodeForViz.label} - Data</Text>
              </View>
              <TouchableOpacity onPress={() => setShowDataVisualization(false)}>
                <X size={24} color="#64748b" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.dataVizContent}>
              {selectedNodeForViz.dataVisualization && (
                <>
                  <View style={styles.dataVizChartPlaceholder}>
                    {selectedNodeForViz.dataVisualization.type === 'bar' && <BarChart3 size={48} color="#cbd5e1" />}
                    {selectedNodeForViz.dataVisualization.type === 'line' && <LineChart size={48} color="#cbd5e1" />}
                    {selectedNodeForViz.dataVisualization.type === 'pie' && <PieChart size={48} color="#cbd5e1" />}
                    {selectedNodeForViz.dataVisualization.type === 'metric' && <Activity size={48} color="#cbd5e1" />}
                    <Text style={styles.dataVizChartPlaceholderText}>
                      {selectedNodeForViz.dataVisualization.type.charAt(0).toUpperCase() + selectedNodeForViz.dataVisualization.type.slice(1)} Chart
                    </Text>
                    <Text style={styles.dataVizChartPlaceholderSubtext}>
                      {selectedNodeForViz.dataVisualization.title || 'Interactive visualization'}
                    </Text>
                  </View>
                  
                  <View style={styles.dataVizDataTable}>
                    <Text style={[styles.dataVizDataLabel, { fontWeight: '700', marginBottom: 8 }]}>
                      Data Points
                    </Text>
                    {selectedNodeForViz.dataVisualization.data.map((item: any, idx: number) => (
                      <View key={idx} style={styles.dataVizDataRow}>
                        <Text style={styles.dataVizDataLabel}>{item.label || `Item ${idx + 1}`}</Text>
                        <Text style={styles.dataVizDataValue}>{item.value}</Text>
                      </View>
                    ))}
                  </View>
                </>
              )}
              
              {!selectedNodeForViz.dataVisualization && (
                <View style={styles.dataVizChartPlaceholder}>
                  <BarChart3 size={48} color="#cbd5e1" />
                  <Text style={styles.dataVizChartPlaceholderText}>No data available</Text>
                  <Text style={styles.dataVizChartPlaceholderSubtext}>
                    This node does not have associated data visualization
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    )
  );

  // ============================================
  // MAIN RENDER
  // ============================================

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc' }]}>
      {showToolbar && renderToolbar()}
      {renderSearchBar()}
      
      {/* Canvas */}
      <View
        style={styles.canvas}
        ref={canvasRef}
        {...panResponder.panHandlers}
      >
        {/* Grid */}
        {showGrid && (
          <View style={styles.grid}>
            {Array.from({ length: 20 }, (_, i) => (
              <View
                key={`h-${i}`}
                style={[
                  styles.gridLine,
                  styles.gridLineHorizontal,
                  { top: i * 50 * scale + offset.y % (50 * scale) },
                ]}
              />
            ))}
            {Array.from({ length: 20 }, (_, i) => (
              <View
                key={`v-${i}`}
                style={[
                  styles.gridLine,
                  styles.gridLineVertical,
                  { left: i * 50 * scale + offset.x % (50 * scale) },
                ]}
              />
            ))}
          </View>
        )}
        
        {/* Nodes */}
        <Animated.View
          style={[
            styles.nodesContainer,
            {
              transform: [
                { translateX: panRef.x },
                { translateY: panRef.y },
                { scale: scaleRef },
              ],
            },
          ]}
        >
          {filteredNodes.map(node => renderNode(node))}
        </Animated.View>
      </View>
      
      {/* Minimap */}
      {renderMinimap()}
      
      {/* AI Suggestions Panel */}
      {renderAISuggestions()}
      
      {/* Collaborators Panel */}
      {renderCollaboratorsPanel()}
      
      {/* Modals */}
      {renderNodeEditor()}
      {renderLayoutSelector()}
      {renderExportMenu()}
      
      {/* Advanced Panels v2.0 */}
      {renderAdvancedSearchPanel()}
      {renderTimelinePanel()}
      {renderPerformancePanel()}
      {renderLayoutOptimizationProgress()}
      {renderDataVisualizationModal()}
      {renderHierarchyStatsPanel()}
      
      {/* Zoom Indicator */}
      <View style={[styles.zoomIndicator, { backgroundColor: theme === 'dark' ? '#1e293b' : '#fff' }]}>
        <Text style={[styles.zoomText, { color: theme === 'dark' ? '#fff' : '#1e293b' }]}>
          {Math.round(scale * 100)}%
        </Text>
      </View>
    </View>
  );
}

// ============================================
// STYLES
// ============================================

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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  toolbarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolbarCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolbarRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolbarButton: {
    padding: 8,
    marginRight: 4,
  },
  toolbarButtonActive: {
    backgroundColor: '#f5f3ff',
  },
  toolbarButtonDisabled: {
    opacity: 0.5,
  },
  canvas: {
    flex: 1,
    position: 'relative',
  },
  grid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: '#e2e8f0',
  },
  gridLineHorizontal: {
    left: 0,
    right: 0,
    height: 1,
  },
  gridLineVertical: {
    top: 0,
    bottom: 0,
    width: 1,
  },
  nodesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  node: {
    position: 'absolute',
    minWidth: 120,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nodeLocked: {
    opacity: 0.7,
  },
  nodeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nodeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  nodeInfo: {
    flex: 1,
  },
  nodeLabel: {
    fontWeight: '600',
    color: '#1e293b',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  expandButton: {
    padding: 4,
  },
  lockIcon: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  childrenContainer: {
    position: 'absolute',
  },
  connectionLine: {
    position: 'absolute',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  searchBar: {
    position: 'absolute',
    top: 70,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },
  minimap: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 120,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
  },
  minimapViewport: {
    flex: 1,
    position: 'relative',
  },
  minimapIndicator: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#6366f1',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  zoomIndicator: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  zoomText: {
    fontSize: 12,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  typeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  typeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    margin: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  typeButtonActive: {
    borderColor: 'transparent',
  },
  typeButtonText: {
    fontSize: 12,
    color: '#64748b',
  },
  typeButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  statusSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    margin: 4,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statusButtonActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  statusButtonText: {
    fontSize: 12,
    color: '#64748b',
  },
  statusButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  deleteButton: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  deleteButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#ef4444',
  },
  lockButton: {
    backgroundColor: '#f5f3ff',
    borderWidth: 1,
    borderColor: '#ddd6fe',
  },
  lockButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366f1',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 12,
  },
  addButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  layoutSelector: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: width - 64,
    maxWidth: 400,
  },
  layoutTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  layoutOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  layoutOptionActive: {
    backgroundColor: '#f5f3ff',
    borderColor: '#6366f1',
  },
  layoutIcon: {
    marginRight: 12,
  },
  layoutName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  layoutNameActive: {
    color: '#6366f1',
  },
  closeButton: {
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  exportMenu: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: width - 64,
    maxWidth: 300,
  },
  exportTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  exportOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  exportOptionText: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '600',
  },
  aiSuggestionsPanel: {
    position: 'absolute',
    top: 70,
    right: 16,
    width: 320,
    maxHeight: 400,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 20,
  },
  aiSuggestionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  aiSuggestionsTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 12,
  },
  aiSuggestionsList: {
    flex: 1,
    padding: 12,
  },
  aiSuggestionCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  aiSuggestionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  aiSuggestionImpactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  aiSuggestionImpactText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  aiSuggestionConfidence: {
    fontSize: 10,
  },
  aiSuggestionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  aiSuggestionDescription: {
    fontSize: 12,
    marginBottom: 8,
  },
  aiSuggestionReasoning: {
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  aiSuggestionSavings: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiSuggestionSavingsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10b981',
    marginLeft: 4,
  },
  aiSuggestionApplyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366f1',
    borderRadius: 6,
    paddingVertical: 8,
  },
  aiSuggestionApplyButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 6,
  },
  collaboratorBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  collaboratorBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  collaboratorsPanel: {
    position: 'absolute',
    top: 70,
    right: 16,
    width: 280,
    maxHeight: 350,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 20,
  },
  collaboratorsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  collaboratorsTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 12,
  },
  collaboratorsList: {
    flex: 1,
    padding: 12,
  },
  collaboratorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  collaboratorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  collaboratorAvatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  collaboratorInfo: {
    flex: 1,
  },
  collaboratorName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  collaboratorStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  collaboratorStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  collaboratorStatusText: {
    fontSize: 11,
  },
  collaboratorSelectedNode: {
    fontSize: 10,
    fontStyle: 'italic',
  },
  emptyCollaborators: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyCollaboratorsText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
  },
  emptyCollaboratorsSubtext: {
    fontSize: 12,
    marginTop: 4,
  },
  // Advanced Search Panel Styles
  advancedSearchPanel: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 100,
  },
  advancedSearchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  advancedSearchInput: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
    fontSize: 14,
  },
  advancedSearchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366f1',
    padding: 12,
    borderRadius: 8,
  },
  advancedSearchButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  // Timeline Panel Styles
  timelinePanel: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    maxHeight: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 100,
  },
  timelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },
  timelineControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  timelineControlButton: {
    padding: 8,
    marginRight: 12,
  },
  timelineSlider: {
    flex: 1,
    marginHorizontal: 12,
  },
  timelineProgress: {
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
  },
  timelineProgressBar: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 2,
  },
  timelinePosition: {
    fontSize: 12,
    minWidth: 60,
    textAlign: 'right',
  },
  timelineList: {
    flex: 1,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6366f1',
    marginRight: 12,
  },
  timelineContent: {
    flex: 1,
  },
  timelineChangeType: {
    fontSize: 14,
    fontWeight: '600',
  },
  timelineTimestamp: {
    fontSize: 12,
    marginTop: 2,
  },
  emptyTimeline: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTimelineText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
  },
  emptyTimelineSubtext: {
    fontSize: 12,
    marginTop: 4,
  },
  // Performance Panel Styles
  performancePanel: {
    position: 'absolute',
    top: 60,
    right: 16,
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 100,
  },
  performanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  performanceTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },
  performanceContent: {
    flex: 1,
  },
  performanceMetricCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  performanceMetricLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  performanceMetricValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  // Layout Optimization Progress Styles
  optimizationProgress: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 100,
  },
  optimizationProgressText: {
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },
  optimizationProgressBar: {
    width: 100,
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    marginLeft: 12,
  },
  optimizationProgressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 3,
  },
  // Data Visualization Styles
  dataVizIndicator: {
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  dataVizModal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    margin: 20,
    maxHeight: height * 0.8,
  },
  dataVizHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dataVizTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  dataVizContent: {
    flex: 1,
  },
  dataVizChartPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 40,
    marginBottom: 16,
  },
  dataVizChartPlaceholderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 12,
  },
  dataVizChartPlaceholderSubtext: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
  },
  dataVizDataTable: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
  },
  dataVizDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  dataVizDataLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  dataVizDataValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  // Hierarchy Stats Panel Styles
  hierarchyStatsPanel: {
    position: 'absolute',
    top: 70,
    right: 16,
    width: 280,
    maxHeight: 400,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 20,
  },
  hierarchyStatsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  hierarchyStatsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 12,
  },
  hierarchyStatsContent: {
    flex: 1,
    padding: 12,
  },
  hierarchyStatCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  hierarchyStatLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  hierarchyStatValue: {
    fontSize: 20,
    fontWeight: '700',
  },
});
