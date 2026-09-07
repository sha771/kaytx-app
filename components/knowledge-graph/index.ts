/**
 * =============================================================================
 * KNOWLEDGE GRAPH 3D - Module Index
 * =============================================================================
 *
 * Exports all components for the 3D circular knowledge graph visualization.
 * Integrates with the existing agent hierarchy mindmap system.
 *
 * @version 3.0.0
 * @lastUpdated 2026-07-22
 */

export { default as KnowledgeGraphCanvas } from './KnowledgeGraphCanvas';
export { default as KnowledgeGraphView } from './KnowledgeGraphView';
export type { GraphCanvasHandle } from './KnowledgeGraphCanvas';
export type { KnowledgeGraphViewProps } from './KnowledgeGraphView';
export {
  KnowledgeGraphDataGenerator,
  generateKnowledgeGraphData,
  resetKnowledgeGraphData,
  polarToCartesian,
  cartesianToPolar,
} from './KnowledgeGraphDataGenerator';

export {
  GraphCommunityDetection,
  GraphShortestPath,
  ForceDirectedLayout,
  GraphPageRank,
  GraphCentrality,
  GraphMST,
  GraphClustering,
} from './GraphAlgorithms';
export type { ForceDirectedConfig } from './GraphAlgorithms';

export {
  EmbeddingGenerator,
  RAGRetrievalEngine,
  TimelineEngine,
  NLQueryEngine,
  PerformanceAnalytics,
} from './KnowledgeGraphEngine';
export type {
  RAGResult,
  TimelineEvent,
  ParsedQuery,
  PerformanceInsight,
} from './KnowledgeGraphEngine';

export type {
  // Core Types
  KnowledgeGraphNode,
  GraphConnection,
  Point3D,
  PolarCoord,
  CameraState,
  
  // Configuration
  LayerConfig,
  RenderConfig,
  LayoutConfig,
  
  // Metrics
  NodeMetrics,
  FrameMetrics,
  PerformanceProfile,
  
  // Knowledge Graph & RAG
  KnowledgeEntry,
  KnowledgeQuery,
  KnowledgeResult,
  RAGConfig,
  VectorCluster,
  NodeEmbedding,
  
  // Enums & Constants
  NodeType,
  NodeStatus,
  AgentCapability,
  RelationshipType,
  DepartmentCategory,
  LayoutAlgorithm,
  
  // Defaults
  DEFAULT_LAYER_CONFIGS,
  DEFAULT_RENDER_CONFIG,
  DEPARTMENT_NAMES,
  EXECUTIVE_ROLES,
  COMMAND_CENTER_ROLES,
  AGENT_SKILLS,
  
  // Events
  GraphEvent,
  GraphAnimation,
  GraphViewState,
} from './types';
