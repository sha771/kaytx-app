/**
 * =============================================================================
 * KNOWLEDGE GRAPH 3D VIEW - Main Integration Component
 * =============================================================================
 *
 * Primary integration component that combines:
 * - 3D Circular Knowledge Graph Canvas (WebGL/SVG accelerated)
 * - RAG Knowledge Graph overlay with semantic visualization
 * - Layer control panel
 * - Search/filter functionality
 * - Performance metrics display
 * - Node detail panel
 *
 * @version 3.0.0
 * @lastUpdated 2026-07-22
 */

import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TextInput,
  Animated,
  Modal,
  Platform,
  StatusBar,
} from 'react-native';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  X,
  Layers,
  Eye,
  EyeOff,
  Bot,
  Crown,
  Building2,
  Zap,
  Users,
  Network,
  BarChart3,
  Activity,
  TrendingUp,
  Gauge,
  Shield,
  Star,
  Clock,
  DollarSign,
  Cpu,
  Globe,
  Filter,
  Download,
  Share2,
  Settings,
  RefreshCw,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Info,
  Target,
  Award,
  Sparkles,
  Brain,
  BookOpen,
  GitBranch,
  Circle,
  Play,
  Pause,
  Hexagon,
} from 'lucide-react-native';

import KnowledgeGraphCanvas, { GraphCanvasHandle } from './KnowledgeGraphCanvas';
import {
  KnowledgeGraphNode,
  GraphConnection,
  CameraState,
  LayerConfig,
  DEFAULT_LAYER_CONFIGS,
  RenderConfig,
  DEFAULT_RENDER_CONFIG,
  FrameMetrics,
  DepartmentCategory,
  NodeStatus,
  NodeType,
} from './types';
import {
  generateKnowledgeGraphData,
  KnowledgeGraphDataGenerator,
} from './KnowledgeGraphDataGenerator';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ============================================
// LAYER ICON MAP
// ============================================

const LAYER_ICONS: Record<number, React.ComponentType<any>> = {
  0: Crown,
  1: Network,
  2: Building2,
  3: Bot,
  4: Zap,
};

const LAYER_LABELS: Record<number, string> = {
  0: 'Executive Core',
  1: 'Command Center',
  2: 'Departments',
  3: 'Main Agents',
  4: 'Sub-Agents',
};

// ============================================
// CATEGORY COLORS
// ============================================

const CATEGORY_COLORS: Record<string, string> = {
  executive: '#f59e0b',
  technology: '#6366f1',
  product: '#8b5cf6',
  operations: '#10b981',
  finance: '#f59e0b',
  marketing: '#ec4899',
  sales: '#f97316',
  customer_success: '#14b8a6',
  hr: '#f43f5e',
  legal: '#6b7280',
  strategy: '#a855f7',
  design: '#d946ef',
  data: '#0ea5e9',
  security: '#ef4444',
  infrastructure: '#64748b',
  research: '#06b6d4',
  innovation: '#8b5cf6',
  communications: '#84cc16',
  partnerships: '#22c55e',
  supply_chain: '#eab308',
  manufacturing: '#78716c',
  quality: '#0d9488',
  training: '#a3e635',
  support: '#2dd4bf',
  analytics: '#38bdf8',
  intelligence: '#818cf8',
  compliance: '#92400e',
};

// ============================================
// MAIN COMPONENT
// ============================================

export interface KnowledgeGraphViewProps {
  width?: number;
  height?: number;
  onNodePress?: (node: KnowledgeGraphNode) => void;
  onBackPress?: () => void;
  showHeader?: boolean;
  showToolbar?: boolean;
  showLayerPanel?: boolean;
  showStatsPanel?: boolean;
  showSearch?: boolean;
  autoGenerate?: boolean;
  nodes?: KnowledgeGraphNode[];
  connections?: GraphConnection[];
}

const KnowledgeGraphView: React.FC<KnowledgeGraphViewProps> = ({
  width = SCREEN_WIDTH,
  height = SCREEN_HEIGHT,
  onNodePress,
  onBackPress,
  showHeader = true,
  showToolbar = true,
  showLayerPanel = true,
  showStatsPanel = true,
  showSearch = true,
  autoGenerate = true,
  nodes: externalNodes,
  connections: externalConnections,
}) => {
  // ============================================
  // REFS
  // ============================================

  const canvasRef = useRef<GraphCanvasHandle>(null);

  // ============================================
  // STATE
  // ============================================

  // Data
  const [graphData, setGraphData] = useState<{
    nodes: KnowledgeGraphNode[];
    connections: GraphConnection[];
  }>({
    nodes: externalNodes || [],
    connections: externalConnections || [],
  });

  // UI State
  const [selectedNode, setSelectedNode] = useState<KnowledgeGraphNode | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [highlightedNodeIds, setHighlightedNodeIds] = useState<string[]>([]);
  const [visibleLayers, setVisibleLayers] = useState<number[]>(
    DEFAULT_LAYER_CONFIGS.map(l => l.index)
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showLayerControl, setShowLayerControl] = useState(false);
  const [showNodeDetail, setShowNodeDetail] = useState(false);
  const [showMetricsOverlay, setShowMetricsOverlay] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [showRAGPanel, setShowRAGPanel] = useState(false);
  const [showKnowledgePanel, setShowKnowledgePanel] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  // Filter state
  const [filterByType, setFilterByType] = useState<NodeType[]>([]);
  const [filterByStatus, setFilterByStatus] = useState<NodeStatus[]>([]);
  const [filterByDept, setFilterByDept] = useState<DepartmentCategory[]>([]);
  const [showGeneratingAnimation, setShowGeneratingAnimation] = useState(false);

  // Statistics
  const [stats, setStats] = useState({
    totalNodes: 0,
    totalConnections: 0,
    executives: 0,
    departments: 0,
    mainAgents: 0,
    subAgents: 0,
    activeNodes: 0,
    avgPerformance: 0,
  });

  // Animation for entrance
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // ============================================
  // GENERATE DATA
  // ============================================

  useEffect(() => {
    if (autoGenerate && graphData.nodes.length === 0) {
      setIsGenerating(true);
      setShowGeneratingAnimation(true);

      // Use requestAnimationFrame to prevent UI blocking
      setTimeout(() => {
        const data = generateKnowledgeGraphData();
        setGraphData(data);

        // Calculate stats
        const execs = data.nodes.filter(n => n.type === 'executive').length;
        const depts = data.nodes.filter(n => n.type === 'department').length;
        const mainAgents = data.nodes.filter(n => n.type === 'main_agent').length;
        const subAgents = data.nodes.filter(n => n.type === 'sub_agent').length;
        const active = data.nodes.filter(n => n.status === 'active').length;
        const avgPerf = data.nodes.reduce((sum, n) => sum + n.metrics.performance, 0) / data.nodes.length;

        setStats({
          totalNodes: data.nodes.length,
          totalConnections: data.connections.length,
          executives: execs,
          departments: depts,
          mainAgents,
          subAgents,
          activeNodes: active,
          avgPerformance: Math.round(avgPerf * 10) / 10,
        });

        setIsGenerating(false);
        setShowGeneratingAnimation(false);

        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
      }, 100);
    }
  }, [autoGenerate]);

  // ============================================
  // SEARCH LOGIC
  // ============================================

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return graphData.nodes
      .filter(n =>
        n.label.toLowerCase().includes(query) ||
        n.skills.some(s => s.toLowerCase().includes(query)) ||
        n.metadata.tags.some(t => t.toLowerCase().includes(query)) ||
        n.id.toLowerCase().includes(query)
      )
      .slice(0, 20)
      .map(n => ({
        node: n,
        relevance: n.label.toLowerCase().includes(query) ? 1 : 0.5,
      }))
      .sort((a, b) => b.relevance - a.relevance);
  }, [searchQuery, graphData.nodes]);

  // ============================================
  // HANDLERS
  // ============================================

  const handleNodePress = useCallback((node: KnowledgeGraphNode) => {
    setSelectedNode(node);
    setShowNodeDetail(true);
    setHighlightedNodeIds([node.id, ...node.childrenIds]);
    onNodePress?.(node);
  }, [onNodePress]);

  const handleBackgroundPress = useCallback(() => {
    setSelectedNode(null);
    setShowNodeDetail(false);
    setHighlightedNodeIds([]);
  }, []);

  const handleToggleLayer = useCallback((layerIndex: number) => {
    setVisibleLayers(prev => {
      if (prev.includes(layerIndex)) {
        return prev.filter(i => i !== layerIndex);
      }
      return [...prev, layerIndex].sort();
    });
  }, []);

  const handleZoomIn = useCallback(() => {
    canvasRef.current?.zoomIn();
  }, []);

  const handleZoomOut = useCallback(() => {
    canvasRef.current?.zoomOut();
  }, []);

  const handleResetCamera = useCallback(() => {
    canvasRef.current?.resetCamera();
  }, []);

  const handleAutoRotate = useCallback(() => {
    const next = !isAutoRotating;
    setIsAutoRotating(next);
    canvasRef.current?.autoRotate(next);
  }, [isAutoRotating]);

  const handleFocusNode = useCallback((nodeId: string) => {
    canvasRef.current?.focusOnNode(nodeId);
    const node = graphData.nodes.find(n => n.id === nodeId);
    if (node) {
      setSelectedNode(node);
      setShowNodeDetail(true);
      setHighlightedNodeIds([node.id]);
    }
  }, [graphData.nodes]);

  const handleSearchSelect = useCallback((nodeId: string) => {
    handleFocusNode(nodeId);
    setShowSearchBar(false);
    setSearchQuery('');
  }, [handleFocusNode]);

  const handleRegenerate = useCallback(() => {
    setIsGenerating(true);
    setShowGeneratingAnimation(true);

    setTimeout(() => {
      const data = generateKnowledgeGraphData();
      setGraphData(data);

      const execs = data.nodes.filter(n => n.type === 'executive').length;
      const depts = data.nodes.filter(n => n.type === 'department').length;
      const mainAgents = data.nodes.filter(n => n.type === 'main_agent').length;
      const subAgents = data.nodes.filter(n => n.type === 'sub_agent').length;
      const active = data.nodes.filter(n => n.status === 'active').length;
      const avgPerf = data.nodes.reduce((sum, n) => sum + n.metrics.performance, 0) / data.nodes.length;

      setStats({
        totalNodes: data.nodes.length,
        totalConnections: data.connections.length,
        executives: execs,
        departments: depts,
        mainAgents,
        subAgents,
        activeNodes: active,
        avgPerformance: Math.round(avgPerf * 10) / 10,
      });

      setIsGenerating(false);
      setShowGeneratingAnimation(false);
      canvasRef.current?.resetCamera();
    }, 100);
  }, []);

  const handleExport = useCallback(() => {
    const data = JSON.stringify({
      nodes: graphData.nodes,
      connections: graphData.connections,
      exportDate: new Date().toISOString(),
      version: '3.0.0',
    }, null, 2);

    // In a real app, this would trigger a file download
    console.log('[KnowledgeGraph] Export:', data.substring(0, 200) + '...');
  }, [graphData]);

  // ============================================
  // FILTERED NODES
  // ============================================

  const filteredNodes = useMemo(() => {
    let result = graphData.nodes;

    if (filterByType.length > 0) {
      result = result.filter(n => filterByType.includes(n.type));
    }
    if (filterByStatus.length > 0) {
      result = result.filter(n => filterByStatus.includes(n.status));
    }
    if (filterByDept.length > 0) {
      result = result.filter(n => filterByDept.includes(n.category));
    }

    return result;
  }, [graphData.nodes, filterByType, filterByStatus, filterByDept]);

  // ============================================
  // RENDER: GENERATING ANIMATION
  // ============================================

  const renderGeneratingOverlay = () => {
    if (!showGeneratingAnimation) return null;

    return (
      <View style={styles.generatingOverlay}>
        <View style={styles.generatingContainer}>
          <View style={styles.generatingIcon}>
            <Brain size={48} color="#6366f1" />
          </View>
          <Text style={styles.generatingTitle}>Generating Knowledge Graph</Text>
          <Text style={styles.generatingSubtitle}>
            Building 6,000+ nodes across 5 layers...
          </Text>
          <View style={styles.generatingDots}>
            {[0, 1, 2].map(i => (
              <View
                key={i}
                style={[
                  styles.dot,
                  {
                    animationDelay: `${i * 0.2}s`,
                    opacity: 0.3 + i * 0.3,
                  },
                ]}
              />
            ))}
          </View>
        </View>
      </View>
    );
  };

  // ============================================
  // RENDER: HEADER
  // ============================================

  const renderHeader = () => {
    if (!showHeader) return null;

    return (
      <View style={styles.header}>
        {onBackPress && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <ChevronLeft size={24} color="#94a3b8" />
          </TouchableOpacity>
        )}

        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>3D Knowledge Graph</Text>
          <Text style={styles.headerSubtitle}>
            {stats.totalNodes.toLocaleString()} nodes · {stats.totalConnections.toLocaleString()} connections
          </Text>
        </View>

        <View style={styles.headerActions}>
          {showSearch && (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => setShowSearchBar(!showSearchBar)}
            >
              <Search size={20} color="#94a3b8" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setShowMetricsOverlay(!showMetricsOverlay)}
          >
            <BarChart3 size={20} color="#94a3b8" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleExport}>
            <Download size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // ============================================
  // RENDER: SEARCH BAR
  // ============================================

  const renderSearchBar = () => {
    if (!showSearchBar) return null;

    return (
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={18} color="#64748b" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search agents, departments, skills..."
            placeholderTextColor="#64748b"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={18} color="#64748b" />
            </TouchableOpacity>
          )}
        </View>

        {searchResults.length > 0 && (
          <View style={styles.searchResults}>
            <ScrollView
              style={styles.searchResultsScroll}
              showsVerticalScrollIndicator={false}
            >
              {searchResults.map(({ node, relevance }) => (
                <TouchableOpacity
                  key={node.id}
                  style={styles.searchResultItem}
                  onPress={() => handleSearchSelect(node.id)}
                >
                  <View style={[styles.searchResultIcon, { backgroundColor: node.color }]}>
                    <Bot size={16} color="#fff" />
                  </View>
                  <View style={styles.searchResultInfo}>
                    <Text style={styles.searchResultLabel}>{node.label}</Text>
                    <Text style={styles.searchResultType}>
                      {node.type.replace('_', ' ')} · {node.metadata.department}
                    </Text>
                  </View>
                  <View style={styles.searchResultRelevance}>
                    <Text style={styles.searchResultScore}>
                      {Math.round(relevance * 100)}%
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {searchQuery.length > 0 && searchResults.length === 0 && (
          <View style={styles.searchNoResults}>
            <Text style={styles.searchNoResultsText}>No results found</Text>
          </View>
        )}
      </View>
    );
  };

  // ============================================
  // RENDER: TOOLBAR
  // ============================================

  const renderToolbar = () => {
    if (!showToolbar) return null;

    return (
      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.toolbarButton} onPress={handleZoomIn}>
          <ZoomIn size={22} color="#cbd5e1" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.toolbarButton} onPress={handleZoomOut}>
          <ZoomOut size={22} color="#cbd5e1" />
        </TouchableOpacity>

        <View style={styles.toolbarDivider} />

        <TouchableOpacity style={styles.toolbarButton} onPress={handleResetCamera}>
          <RotateCcw size={20} color="#cbd5e1" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toolbarButton, isAutoRotating && styles.toolbarButtonActive]}
          onPress={handleAutoRotate}
        >
          {isAutoRotating ? (
            <Pause size={20} color="#6366f1" />
          ) : (
            <Play size={20} color="#cbd5e1" />
          )}
        </TouchableOpacity>

        <View style={styles.toolbarDivider} />

        <TouchableOpacity
          style={[styles.toolbarButton, showLayerControl && styles.toolbarButtonActive]}
          onPress={() => setShowLayerControl(!showLayerControl)}
        >
          <Layers size={20} color={showLayerControl ? '#6366f1' : '#cbd5e1'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toolbarButton, showRAGPanel && styles.toolbarButtonActive]}
          onPress={() => setShowRAGPanel(!showRAGPanel)}
        >
          <Brain size={20} color={showRAGPanel ? '#6366f1' : '#cbd5e1'} />
        </TouchableOpacity>

        <View style={styles.toolbarDivider} />

        <TouchableOpacity style={styles.toolbarButton} onPress={handleRegenerate}>
          <RefreshCw size={20} color="#cbd5e1" />
        </TouchableOpacity>
      </View>
    );
  };

  // ============================================
  // RENDER: LAYER CONTROL
  // ============================================

  const renderLayerControl = () => {
    if (!showLayerControl) return null;

    return (
      <View style={styles.layerPanel}>
        <Text style={styles.layerPanelTitle}>Visible Layers</Text>
        {DEFAULT_LAYER_CONFIGS.map((layer) => {
          const isVisible = visibleLayers.includes(layer.index);
          const LayerIcon = LAYER_ICONS[layer.index] || Circle;

          return (
            <TouchableOpacity
              key={layer.index}
              style={styles.layerItem}
              onPress={() => handleToggleLayer(layer.index)}
            >
              <View style={[styles.layerIcon, { backgroundColor: layer.color, opacity: isVisible ? 1 : 0.4 }]}>
                <LayerIcon size={14} color="#fff" />
              </View>
              <View style={styles.layerInfo}>
                <Text style={[styles.layerName, !isVisible && styles.layerDisabled]}>
                  {LAYER_LABELS[layer.index]}
                </Text>
                <Text style={styles.layerCount}>
                  {stats.totalNodes > 0 ? (
                    layer.index === 0 ? stats.executives :
                    layer.index === 1 ? DEFAULT_LAYER_CONFIGS[layer.index].nodeCount :
                    layer.index === 2 ? stats.departments :
                    layer.index === 3 ? stats.mainAgents :
                    stats.subAgents
                  ) : 0} nodes
                </Text>
              </View>
              <View style={[styles.layerVisibility, isVisible && styles.layerVisible]}>
                {isVisible ? (
                  <Eye size={16} color="#10b981" />
                ) : (
                  <EyeOff size={16} color="#64748b" />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  // ============================================
  // RENDER: FILTER PANEL
  // ============================================

  const renderFilterPanel = () => {
    if (!showFilterPanel) return null;

    return (
      <View style={styles.filterPanel}>
        <View style={styles.filterPanelHeader}>
          <Text style={styles.filterPanelTitle}>Filters</Text>
          <TouchableOpacity onPress={() => setShowFilterPanel(false)}>
            <X size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.filterPanelContent}>
          <Text style={styles.filterSectionTitle}>Node Type</Text>
          {(['executive', 'command_center', 'department', 'main_agent', 'sub_agent'] as NodeType[]).map(type => (
            <TouchableOpacity
              key={type}
              style={[styles.filterChip, filterByType.includes(type) && styles.filterChipActive]}
              onPress={() => {
                setFilterByType(prev =>
                  prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
                );
              }}
            >
              <Text style={[styles.filterChipText, filterByType.includes(type) && styles.filterChipTextActive]}>
                {type.replace('_', ' ')}
              </Text>
            </TouchableOpacity>
          ))}

          <Text style={[styles.filterSectionTitle, { marginTop: 16 }]}>Status</Text>
          {(['active', 'draft', 'paused', 'archived'] as NodeStatus[]).map(status => (
            <TouchableOpacity
              key={status}
              style={[styles.filterChip, filterByStatus.includes(status) && styles.filterChipActive]}
              onPress={() => {
                setFilterByStatus(prev =>
                  prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
                );
              }}
            >
              <Text style={[styles.filterChipText, filterByStatus.includes(status) && styles.filterChipTextActive]}>
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  // ============================================
  // RENDER: STATS PANEL
  // ============================================

  const renderStatsPanel = () => {
    if (!showStatsPanel) return null;

    return (
      <View style={styles.statsPanel}>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Bot size={20} color="#6366f1" />
            <Text style={styles.statNumber}>{stats.totalNodes.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Nodes</Text>
          </View>
          <View style={styles.statCard}>
            <Network size={20} color="#22d3ee" />
            <Text style={styles.statNumber}>{stats.totalConnections.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Connections</Text>
          </View>
          <View style={styles.statCard}>
            <Building2 size={20} color="#10b981" />
            <Text style={styles.statNumber}>{stats.departments}</Text>
            <Text style={styles.statLabel}>Departments</Text>
          </View>
          <View style={styles.statCard}>
            <Activity size={20} color="#f43f5e" />
            <Text style={styles.statNumber}>{stats.avgPerformance}%</Text>
            <Text style={styles.statLabel}>Avg. Performance</Text>
          </View>
        </View>
      </View>
    );
  };

  // ============================================
  // RENDER: METRICS OVERLAY
  // ============================================

  const renderMetricsOverlay = () => {
    if (!showMetricsOverlay) return null;

    return (
      <View style={styles.metricsOverlay}>
        <View style={styles.metricsPanel}>
          <View style={styles.metricsHeader}>
            <Text style={styles.metricsTitle}>Performance Metrics</Text>
            <TouchableOpacity onPress={() => setShowMetricsOverlay(false)}>
              <X size={20} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.metricsContent}>
            <View style={styles.metricRow}>
              <View style={styles.metricIcon}>
                <Cpu size={18} color="#6366f1" />
              </View>
              <View style={styles.metricInfo}>
                <Text style={styles.metricLabel}>Total Nodes</Text>
                <Text style={styles.metricValue}>{stats.totalNodes.toLocaleString()}</Text>
              </View>
              <Text style={styles.metricBadge}>{stats.totalNodes > 6000 ? 'OPTIMAL' : 'SCALING'}</Text>
            </View>

            <View style={styles.metricRow}>
              <View style={styles.metricIcon}>
                <Network size={18} color="#22d3ee" />
              </View>
              <View style={styles.metricInfo}>
                <Text style={styles.metricLabel}>Connections</Text>
                <Text style={styles.metricValue}>{stats.totalConnections.toLocaleString()}</Text>
              </View>
              <Text style={[styles.metricBadge, styles.metricBadgeGreen]}>ACTIVE</Text>
            </View>

            <View style={styles.metricRow}>
              <View style={styles.metricIcon}>
                <Activity size={18} color="#10b981" />
              </View>
              <View style={styles.metricInfo}>
                <Text style={styles.metricLabel}>Active Nodes</Text>
                <Text style={styles.metricValue}>{stats.activeNodes.toLocaleString()}</Text>
              </View>
              <Text style={styles.metricBadge}>
                {Math.round((stats.activeNodes / stats.totalNodes) * 100)}%
              </Text>
            </View>

            <View style={styles.metricRow}>
              <View style={styles.metricIcon}>
                <Gauge size={18} color="#f59e0b" />
              </View>
              <View style={styles.metricInfo}>
                <Text style={styles.metricLabel}>Avg Performance</Text>
                <Text style={styles.metricValue}>{stats.avgPerformance}%</Text>
              </View>
              <View style={styles.performanceBar}>
                <View
                  style={[
                    styles.performanceFill,
                    { width: `${stats.avgPerformance}%` },
                  ]}
                />
              </View>
            </View>

            <View style={styles.metricRow}>
              <View style={styles.metricIcon}>
                <Building2 size={18} color="#8b5cf6" />
              </View>
              <View style={styles.metricInfo}>
                <Text style={styles.metricLabel}>Departments</Text>
                <Text style={styles.metricValue}>{stats.departments}</Text>
              </View>
              <Text style={styles.metricBadge}>48 TOTAL</Text>
            </View>

            <View style={styles.metricRow}>
              <View style={styles.metricIcon}>
                <Crown size={18} color="#f59e0b" />
              </View>
              <View style={styles.metricInfo}>
                <Text style={styles.metricLabel}>Executives</Text>
                <Text style={styles.metricValue}>{stats.executives}</Text>
              </View>
              <Text style={styles.metricBadge}>C-SUITE</Text>
            </View>

            <View style={styles.metricRow}>
              <View style={styles.metricIcon}>
                <Bot size={18} color="#6366f1" />
              </View>
              <View style={styles.metricInfo}>
                <Text style={styles.metricLabel}>Main Agents</Text>
                <Text style={styles.metricValue}>{stats.mainAgents}</Text>
              </View>
              <Text style={styles.metricBadge}>200 ACTIVE</Text>
            </View>

            <View style={styles.metricRow}>
              <View style={styles.metricIcon}>
                <Zap size={18} color="#8b5cf6" />
              </View>
              <View style={styles.metricInfo}>
                <Text style={styles.metricLabel}>Sub-Agents</Text>
                <Text style={styles.metricValue}>{stats.subAgents.toLocaleString()}</Text>
              </View>
              <Text style={styles.metricBadge}>{Math.round((stats.subAgents / stats.totalNodes) * 100)}%</Text>
            </View>

            <View style={styles.metricsDivider} />

            <Text style={styles.metricsArchitectureTitle}>Architecture</Text>
            <View style={styles.metricsArchRow}>
              <Text style={styles.metricsArchLabel}>Layout</Text>
              <Text style={styles.metricsArchValue}>5-Layer Concentric</Text>
            </View>
            <View style={styles.metricsArchRow}>
              <Text style={styles.metricsArchLabel}>Algorithm</Text>
              <Text style={styles.metricsArchValue}>Circular + Polar Coordinate</Text>
            </View>
            <View style={styles.metricsArchRow}>
              <Text style={styles.metricsArchLabel}>Projection</Text>
              <Text style={styles.metricsArchValue}>3D Perspective (FOV: 600)</Text>
            </View>
            <View style={styles.metricsArchRow}>
              <Text style={styles.metricsArchLabel}>Performance</Text>
              <Text style={styles.metricsArchValue}>LOD + Frustum Culling</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  };

  // ============================================
  // RENDER: RAG KNOWLEDGE PANEL
  // ============================================

  const renderRAGPanel = () => {
    if (!showRAGPanel) return null;

    return (
      <View style={styles.ragPanel}>
        <View style={styles.ragPanelHeader}>
          <Brain size={20} color="#a855f7" />
          <Text style={styles.ragPanelTitle}>RAG Knowledge Graph</Text>
          <TouchableOpacity onPress={() => setShowRAGPanel(false)}>
            <X size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.ragPanelContent}>
          <View style={styles.ragSection}>
            <Text style={styles.ragSectionTitle}>Vector Space</Text>
            <Text style={styles.ragSectionDesc}>
              Semantic embeddings dimension: 128
            </Text>
            <View style={styles.ragMetricRow}>
              <Text style={styles.ragMetricLabel}>Embedding Model</Text>
              <Text style={styles.ragMetricValue}>text-embedding-3-large</Text>
            </View>
            <View style={styles.ragMetricRow}>
              <Text style={styles.ragMetricLabel}>Similarity Threshold</Text>
              <Text style={styles.ragMetricValue}>0.75</Text>
            </View>
            <View style={styles.ragMetricRow}>
              <Text style={styles.ragMetricLabel}>Top-K Retrieval</Text>
              <Text style={styles.ragMetricValue}>10</Text>
            </View>
          </View>

          <View style={styles.ragSection}>
            <Text style={styles.ragSectionTitle}>Knowledge Sources</Text>
            {getUniqueSources(graphData.nodes).slice(0, 8).map(source => (
              <View key={source} style={styles.ragSourceItem}>
                <BookOpen size={14} color="#a855f7" />
                <Text style={styles.ragSourceText}>{source}</Text>
              </View>
            ))}
          </View>

          <View style={styles.ragSection}>
            <Text style={styles.ragSectionTitle}>Graph Algorithms</Text>
            <View style={styles.ragAlgoRow}>
              <Text style={styles.ragAlgoLabel}>PageRank</Text>
              <View style={styles.ragAlgoBar}>
                <View style={[styles.ragAlgoFill, { width: '85%' }]} />
              </View>
            </View>
            <View style={styles.ragAlgoRow}>
              <Text style={styles.ragAlgoLabel}>Betweenness</Text>
              <View style={styles.ragAlgoBar}>
                <View style={[styles.ragAlgoFill, { width: '62%' }]} />
              </View>
            </View>
            <View style={styles.ragAlgoRow}>
              <Text style={styles.ragAlgoLabel}>Closeness</Text>
              <View style={styles.ragAlgoBar}>
                <View style={[styles.ragAlgoFill, { width: '73%' }]} />
              </View>
            </View>
            <View style={styles.ragAlgoRow}>
              <Text style={styles.ragAlgoLabel}>Community Detection</Text>
              <View style={styles.ragAlgoBar}>
                <View style={[styles.ragAlgoFill, { width: '91%' }]} />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  // ============================================
  // RENDER: NODE DETAIL PANEL
  // ============================================

  const renderNodeDetail = () => {
    if (!showNodeDetail || !selectedNode) return null;

    return (
      <View style={styles.nodeDetailPanel}>
        <View style={styles.nodeDetailHeader}>
          <View style={[styles.nodeDetailIcon, { backgroundColor: selectedNode.color }]}>
            <Bot size={24} color="#fff" />
          </View>
          <View style={styles.nodeDetailTitleSection}>
            <Text style={styles.nodeDetailTitle}>{selectedNode.label}</Text>
            <Text style={styles.nodeDetailType}>
              {selectedNode.type.replace('_', ' ').toUpperCase()}
            </Text>
          </View>
          <TouchableOpacity onPress={() => { setShowNodeDetail(false); setHighlightedNodeIds([]); }}>
            <X size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.nodeDetailContent}>
          {/* Status & Category */}
          <View style={styles.nodeDetailSection}>
            <View style={styles.nodeDetailRow}>
              <Text style={styles.nodeDetailLabel}>Status</Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: selectedNode.status === 'active' ? '#10b981' : 
                   selectedNode.status === 'draft' ? '#f59e0b' : '#64748b' }
              ]}>
                <Text style={styles.statusBadgeText}>{selectedNode.status}</Text>
              </View>
            </View>
            <View style={styles.nodeDetailRow}>
              <Text style={styles.nodeDetailLabel}>Department</Text>
              <Text style={styles.nodeDetailValue}>{selectedNode.metadata.department}</Text>
            </View>
            <View style={styles.nodeDetailRow}>
              <Text style={styles.nodeDetailLabel}>Depth</Text>
              <Text style={styles.nodeDetailValue}>Layer {selectedNode.layerIndex}</Text>
            </View>
            <View style={styles.nodeDetailRow}>
              <Text style={styles.nodeDetailLabel}>Children</Text>
              <Text style={styles.nodeDetailValue}>{selectedNode.childrenIds.length}</Text>
            </View>
          </View>

          {/* Metrics */}
          <View style={styles.nodeDetailSection}>
            <Text style={styles.nodeDetailSectionTitle}>Performance Metrics</Text>
            <View style={styles.nodeMetricRow}>
              <Text style={styles.nodeMetricLabel}>Performance</Text>
              <View style={styles.nodeMetricBar}>
                <View style={[styles.nodeMetricFill, { width: `${selectedNode.metrics.performance}%`, backgroundColor: '#6366f1' }]} />
              </View>
              <Text style={styles.nodeMetricValue}>{selectedNode.metrics.performance}%</Text>
            </View>
            <View style={styles.nodeMetricRow}>
              <Text style={styles.nodeMetricLabel}>Reliability</Text>
              <View style={styles.nodeMetricBar}>
                <View style={[styles.nodeMetricFill, { width: `${selectedNode.metrics.reliability}%`, backgroundColor: '#10b981' }]} />
              </View>
              <Text style={styles.nodeMetricValue}>{selectedNode.metrics.reliability}%</Text>
            </View>
            <View style={styles.nodeMetricRow}>
              <Text style={styles.nodeMetricLabel}>Efficiency</Text>
              <View style={styles.nodeMetricBar}>
                <View style={[styles.nodeMetricFill, { width: `${selectedNode.metrics.efficiency}%`, backgroundColor: '#22d3ee' }]} />
              </View>
              <Text style={styles.nodeMetricValue}>{selectedNode.metrics.efficiency}%</Text>
            </View>
            <View style={styles.nodeMetricRow}>
              <Text style={styles.nodeMetricLabel}>Uptime</Text>
              <View style={styles.nodeMetricBar}>
                <View style={[styles.nodeMetricFill, { width: `${selectedNode.metrics.uptime}%`, backgroundColor: '#10b981' }]} />
              </View>
              <Text style={styles.nodeMetricValue}>{selectedNode.metrics.uptime.toFixed(1)}%</Text>
            </View>
          </View>

          {/* Capabilities */}
          {selectedNode.capabilities.length > 0 && (
            <View style={styles.nodeDetailSection}>
              <Text style={styles.nodeDetailSectionTitle}>Capabilities</Text>
              <View style={styles.nodeCapabilities}>
                {selectedNode.capabilities.map(cap => (
                  <View key={cap} style={styles.capabilityChip}>
                    <Sparkles size={12} color="#a855f7" />
                    <Text style={styles.capabilityText}>{cap}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Skills */}
          {selectedNode.skills.length > 0 && (
            <View style={styles.nodeDetailSection}>
              <Text style={styles.nodeDetailSectionTitle}>Skills</Text>
              <View style={styles.skillsList}>
                {selectedNode.skills.map(skill => (
                  <View key={skill} style={styles.skillChip}>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Graph Centrality */}
          <View style={styles.nodeDetailSection}>
            <Text style={styles.nodeDetailSectionTitle}>Graph Centrality</Text>
            <View style={styles.nodeDetailRow}>
              <Text style={styles.nodeDetailLabel}>PageRank</Text>
              <Text style={styles.nodeDetailValue}>{selectedNode.pageRank.toFixed(3)}</Text>
            </View>
            <View style={styles.nodeDetailRow}>
              <Text style={styles.nodeDetailLabel}>Betweenness</Text>
              <Text style={styles.nodeDetailValue}>{selectedNode.betweennessCentrality.toFixed(3)}</Text>
            </View>
            <View style={styles.nodeDetailRow}>
              <Text style={styles.nodeDetailLabel}>Closeness</Text>
              <Text style={styles.nodeDetailValue}>{selectedNode.closenessCentrality.toFixed(3)}</Text>
            </View>
            <View style={styles.nodeDetailRow}>
              <Text style={styles.nodeDetailLabel}>Centrality</Text>
              <Text style={styles.nodeDetailValue}>{selectedNode.centralityScore.toFixed(3)}</Text>
            </View>
          </View>

          {/* RAG Info */}
          <View style={styles.nodeDetailSection}>
            <Text style={styles.nodeDetailSectionTitle}>RAG Retrieval</Text>
            <View style={styles.nodeDetailRow}>
              <Text style={styles.nodeDetailLabel}>Retrieval Score</Text>
              <Text style={styles.nodeDetailValue}>{selectedNode.retrievalScore.toFixed(2)}</Text>
            </View>
            <View style={styles.nodeDetailRow}>
              <Text style={styles.nodeDetailLabel}>Context Window</Text>
              <Text style={styles.nodeDetailValue}>{selectedNode.contextWindow.toLocaleString()} tokens</Text>
            </View>
            <View style={styles.nodeDetailRow}>
              <Text style={styles.nodeDetailLabel}>Knowledge Sources</Text>
              <Text style={styles.nodeDetailValue}>{selectedNode.knowledgeSources.length}</Text>
            </View>
          </View>

          {/* Tags */}
          {selectedNode.metadata.tags.length > 0 && (
            <View style={styles.nodeDetailSection}>
              <Text style={styles.nodeDetailSectionTitle}>Tags</Text>
              <View style={styles.tagsList}>
                {selectedNode.metadata.tags.map(tag => (
                  <View key={tag} style={styles.tagChip}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    );
  };

  // ============================================
  // RENDER: MAIN
  // ============================================

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a1a" />

      {/* Header */}
      {renderHeader()}

      {/* Search Bar */}
      {renderSearchBar()}

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* 3D Canvas */}
        <Animated.View style={[styles.canvasContainer, { opacity: fadeAnim }]}>
          <KnowledgeGraphCanvas
            ref={canvasRef}
            nodes={filteredNodes}
            connections={graphData.connections}
            width={width}
            height={height - (showHeader ? 50 : 0) - (showStatsPanel ? 72 : 0)}
            onNodePress={handleNodePress}
            onBackgroundPress={handleBackgroundPress}
            selectedNodeId={selectedNode?.id || null}
            hoveredNodeId={hoveredNodeId}
            highlightedNodeIds={highlightedNodeIds}
            visibleLayers={visibleLayers}
            searchQuery={searchQuery}
            showLabels={true}
            enableAutoRotate={isAutoRotating}
            autoRotateSpeed={0.3}
          />
        </Animated.View>

        {/* Toolbar */}
        {renderToolbar()}

        {/* Layer Control */}
        {renderLayerControl()}

        {/* Filter Panel */}
        {renderFilterPanel()}

        {/* RAG Panel */}
        {renderRAGPanel()}

        {/* Node Detail Panel */}
        {renderNodeDetail()}
      </View>

      {/* Bottom Stats */}
      {renderStatsPanel()}

      {/* Metrics Overlay */}
      {renderMetricsOverlay()}

      {/* Generating Overlay */}
      {renderGeneratingOverlay()}
    </SafeAreaView>
  );
};

// ============================================
// HELPER FUNCTIONS
// ============================================

const getUniqueSources = (nodes: KnowledgeGraphNode[]): string[] => {
  const sources = new Set<string>();
  nodes.forEach(n => n.knowledgeSources.forEach(s => sources.add(s)));
  return Array.from(sources);
};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  mainContent: {
    flex: 1,
    position: 'relative',
  },
  canvasContainer: {
    flex: 1,
  },

  // ========== HEADER ==========
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'rgba(10,10,26,0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
    zIndex: 100,
  },
  backButton: {
    padding: 4,
    marginRight: 8,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f1f5f9',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginLeft: 4,
  },

  // ========== SEARCH ==========
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    zIndex: 200,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30,41,59,0.95)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(99,102,241,0.3)',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#f1f5f9',
    padding: 0,
  },
  searchResults: {
    marginTop: 8,
    backgroundColor: 'rgba(30,41,59,0.98)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    maxHeight: 300,
    overflow: 'hidden',
  },
  searchResultsScroll: {
    maxHeight: 300,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  searchResultIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  searchResultInfo: {
    flex: 1,
  },
  searchResultLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#f1f5f9',
  },
  searchResultType: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
    textTransform: 'capitalize',
  },
  searchResultRelevance: {
    marginLeft: 8,
  },
  searchResultScore: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366f1',
  },
  searchNoResults: {
    padding: 20,
    alignItems: 'center',
  },
  searchNoResultsText: {
    fontSize: 13,
    color: '#64748b',
  },

  // ========== TOOLBAR ==========
  toolbar: {
    position: 'absolute',
    right: 12,
    top: 80,
    backgroundColor: 'rgba(15,23,42,0.9)',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    zIndex: 50,
  },
  toolbarButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  toolbarButtonActive: {
    backgroundColor: 'rgba(99,102,241,0.15)',
  },
  toolbarDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginHorizontal: 8,
    marginVertical: 4,
  },

  // ========== LAYER PANEL ==========
  layerPanel: {
    position: 'absolute',
    left: 12,
    top: 80,
    backgroundColor: 'rgba(15,23,42,0.95)',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    width: 220,
    zIndex: 50,
  },
  layerPanelTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  layerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  layerIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  layerInfo: {
    flex: 1,
    marginLeft: 10,
  },
  layerName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#f1f5f9',
  },
  layerDisabled: {
    opacity: 0.4,
  },
  layerCount: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  layerVisibility: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  layerVisible: {
    backgroundColor: 'rgba(16,185,129,0.15)',
  },

  // ========== FILTER PANEL ==========
  filterPanel: {
    position: 'absolute',
    left: 12,
    top: 80,
    backgroundColor: 'rgba(15,23,42,0.97)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    width: 240,
    maxHeight: 400,
    zIndex: 50,
  },
  filterPanelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  filterPanelTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#f1f5f9',
  },
  filterPanelContent: {
    padding: 16,
  },
  filterSectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginRight: 6,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  filterChipActive: {
    backgroundColor: 'rgba(99,102,241,0.2)',
    borderWidth: 1,
    borderColor: '#6366f1',
  },
  filterChipText: {
    fontSize: 12,
    color: '#94a3b8',
    textTransform: 'capitalize',
  },
  filterChipTextActive: {
    color: '#818cf8',
    fontWeight: '600',
  },

  // ========== STATS ==========
  statsPanel: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(10,10,26,0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statCard: {
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#f1f5f9',
    marginTop: 4,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  statLabel: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 2,
  },

  // ========== NODE DETAIL ==========
  nodeDetailPanel: {
    position: 'absolute',
    right: 12,
    top: 80,
    backgroundColor: 'rgba(15,23,42,0.97)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    width: 300,
    maxHeight: SCREEN_HEIGHT * 0.7,
    zIndex: 50,
  },
  nodeDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  nodeDetailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeDetailTitleSection: {
    flex: 1,
    marginLeft: 12,
  },
  nodeDetailTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#f1f5f9',
  },
  nodeDetailType: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 2,
    letterSpacing: 1,
  },
  nodeDetailContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  nodeDetailSection: {
    marginBottom: 16,
  },
  nodeDetailSectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  nodeDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  nodeDetailLabel: {
    fontSize: 13,
    color: '#94a3b8',
  },
  nodeDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#f1f5f9',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
    textTransform: 'capitalize',
  },

  nodeMetricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  nodeMetricLabel: {
    fontSize: 12,
    color: '#94a3b8',
    width: 80,
  },
  nodeMetricBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 3,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  nodeMetricFill: {
    height: '100%',
    borderRadius: 3,
  },
  nodeMetricValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#f1f5f9',
    width: 40,
    textAlign: 'right',
  },

  nodeCapabilities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  capabilityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(168,85,247,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    marginRight: 6,
    marginBottom: 6,
  },
  capabilityText: {
    fontSize: 11,
    color: '#a855f7',
    fontWeight: '600',
    marginLeft: 4,
    textTransform: 'capitalize',
  },

  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillChip: {
    backgroundColor: 'rgba(99,102,241,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  skillText: {
    fontSize: 11,
    color: '#818cf8',
    fontWeight: '500',
  },

  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagChip: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 11,
    color: '#64748b',
  },

  // ========== METRICS OVERLAY ==========
  metricsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 300,
  },
  metricsPanel: {
    backgroundColor: 'rgba(15,23,42,0.98)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    width: SCREEN_WIDTH * 0.85,
    maxHeight: SCREEN_HEIGHT * 0.75,
    overflow: 'hidden',
  },
  metricsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  metricsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f1f5f9',
  },
  metricsContent: {
    padding: 20,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 12,
  },
  metricIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricInfo: {
    flex: 1,
    marginLeft: 12,
  },
  metricLabel: {
    fontSize: 12,
    color: '#94a3b8',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#f1f5f9',
    marginTop: 2,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  metricBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6366f1',
    backgroundColor: 'rgba(99,102,241,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  metricBadgeGreen: {
    color: '#10b981',
    backgroundColor: 'rgba(16,185,129,0.1)',
  },
  performanceBar: {
    width: 60,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  performanceFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 3,
  },
  metricsDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginVertical: 16,
  },
  metricsArchitectureTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  metricsArchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  metricsArchLabel: {
    fontSize: 12,
    color: '#94a3b8',
  },
  metricsArchValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#f1f5f9',
  },

  // ========== RAG PANEL ==========
  ragPanel: {
    position: 'absolute',
    left: 12,
    top: 80,
    backgroundColor: 'rgba(15,23,42,0.97)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(168,85,247,0.2)',
    width: 280,
    maxHeight: SCREEN_HEIGHT * 0.7,
    zIndex: 50,
  },
  ragPanelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  ragPanelTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#f1f5f9',
    marginLeft: 8,
  },
  ragPanelContent: {
    padding: 16,
  },
  ragSection: {
    marginBottom: 20,
  },
  ragSectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#a855f7',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  ragSectionDesc: {
    fontSize: 11,
    color: '#64748b',
    marginBottom: 12,
  },
  ragMetricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  ragMetricLabel: {
    fontSize: 12,
    color: '#94a3b8',
  },
  ragMetricValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#f1f5f9',
  },
  ragSourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  ragSourceText: {
    fontSize: 12,
    color: '#cbd5e1',
    marginLeft: 8,
  },
  ragAlgoRow: {
    marginBottom: 8,
  },
  ragAlgoLabel: {
    fontSize: 11,
    color: '#94a3b8',
    marginBottom: 4,
  },
  ragAlgoBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  ragAlgoFill: {
    height: '100%',
    backgroundColor: '#a855f7',
    borderRadius: 2,
  },

  // ========== GENERATING OVERLAY ==========
  generatingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(10,10,26,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 500,
  },
  generatingContainer: {
    alignItems: 'center',
  },
  generatingIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(99,102,241,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  generatingTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#f1f5f9',
    marginBottom: 8,
  },
  generatingSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  generatingDots: {
    flexDirection: 'row',
    marginTop: 24,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#6366f1',
    marginHorizontal: 4,
  },
});

export default KnowledgeGraphView;